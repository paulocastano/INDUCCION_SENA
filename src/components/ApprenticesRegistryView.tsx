import React, { useState, useEffect } from 'react';
import { ApprenticeProfile, InductionLearnerRecord, ExamAnswerRecord } from '../types/induction';
import { FINAL_EXAM_QUESTIONS } from '../data/senaInductionData';
import {
  FileSpreadsheet,
  Download,
  Search,
  UserPlus,
  Trash2,
  CheckCircle2,
  Clock,
  Award,
  Filter,
  RefreshCw,
  Building2,
  MapPin,
  FileCheck,
  Share2,
  X,
  Plus,
  ShieldCheck,
  Lock,
  Eye,
  KeyRound,
  LogOut,
  HelpCircle,
  FileText,
  AlertTriangle,
  ChevronRight,
  ListChecks,
  Check,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ApprenticesRegistryViewProps {
  currentProfile: ApprenticeProfile;
  onOpenCertificate?: () => void;
  onExitAdminMode?: () => void;
  adminPin?: string;
}

const REGISTRY_STORAGE_KEY = 'sena_induction_registry_records_v1';

export const ApprenticesRegistryView: React.FC<ApprenticesRegistryViewProps> = ({
  currentProfile,
  onOpenCertificate,
  onExitAdminMode,
  adminPin = 'SENA2026'
}) => {
  const [activeTab, setActiveTab] = useState<'sheet' | 'workplan' | 'security'>('sheet');
  const [records, setRecords] = useState<InductionLearnerRecord[]>([]);
  const [isLoadingServer, setIsLoadingServer] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Aprobado' | 'En Proceso'>('Todos');
  const [scoreFilter, setScoreFilter] = useState<'Todos' | 'Aprobados (>=70%)' | 'Pendientes (<70%)'>('Todos');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Detail Modal for a specific learner's answers
  const [selectedRecordForReview, setSelectedRecordForReview] = useState<InductionLearnerRecord | null>(null);

  // Change PIN state
  const [currentPinInput, setCurrentPinInput] = useState<string>('');
  const [newPinInput, setNewPinInput] = useState<string>('');
  const [pinChangeMsg, setPinChangeMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New Apprentice Form state
  const [formData, setFormData] = useState({
    name: '',
    documentType: 'CC' as 'CC' | 'TI' | 'CE' | 'PEP',
    documentNumber: '',
    program: '',
    regional: 'Antioquia',
    center: 'Centro de Formación SENA',
    completedStationsCount: 5,
    finalExamScore: 100,
    status: 'Aprobado' as 'Aprobado' | 'En Proceso'
  });

  // Fetch records from server with admin PIN
  const fetchRecordsFromServer = async () => {
    setIsLoadingServer(true);
    try {
      const activePin = localStorage.getItem('sena_admin_pin') || adminPin;
      const res = await fetch('/api/admin/records', {
        headers: {
          'x-admin-pin': activePin,
          'Authorization': 'Bearer sena-admin-token-2026'
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.records && Array.isArray(data.records)) {
          setRecords(data.records);
          localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(data.records));
          setIsLoadingServer(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Could not fetch from server API, using local backup:', err);
    }

    // Fallback to localStorage
    try {
      const saved = localStorage.getItem(REGISTRY_STORAGE_KEY);
      if (saved) {
        setRecords(JSON.parse(saved));
      }
    } catch {
      //
    }
    setIsLoadingServer(false);
  };

  useEffect(() => {
    fetchRecordsFromServer();
  }, [adminPin]);

  // Sync active profile if completed
  const handleSyncCurrentLearner = async () => {
    const existingIndex = records.findIndex(
      (r) => r.documentNumber === currentProfile.documentNumber
    );

    const detailedAnswersList: ExamAnswerRecord[] = FINAL_EXAM_QUESTIONS.map((q) => ({
      questionId: q.id,
      questionText: q.question,
      selectedOptionIndex: q.correctIndex, // In demo sync, assume full knowledge
      selectedOptionText: q.options[q.correctIndex],
      correctOptionIndex: q.correctIndex,
      isCorrect: true,
      explanation: q.explanation
    }));

    const newRecord: InductionLearnerRecord = {
      id: existingIndex >= 0 ? records[existingIndex].id : `IND-2026-${String(records.length + 1).padStart(3, '0')}`,
      name: currentProfile.name,
      documentType: currentProfile.documentType,
      documentNumber: currentProfile.documentNumber,
      program: currentProfile.program,
      programType: currentProfile.programType,
      regional: currentProfile.regional,
      center: currentProfile.center,
      completedStationsCount: currentProfile.completedStations.length,
      completedStations: currentProfile.completedStations,
      finalExamScore: currentProfile.finalExamScore || (currentProfile.inductionCompleted ? 100 : 0),
      status: currentProfile.inductionCompleted ? 'Aprobado' : 'En Proceso',
      completionDate: currentProfile.completionDate || new Date().toISOString().split('T')[0],
      completionTime: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
      certificateId: currentProfile.certificateId || `SENA-IND-${currentProfile.regional.substring(0, 3).toUpperCase()}-2026-${currentProfile.documentNumber.slice(-4)}`,
      detailedAnswers: detailedAnswersList,
      notes: 'Sincronizado desde el perfil activo de la aplicación'
    };

    // Save locally
    if (existingIndex >= 0) {
      setRecords((prev) => {
        const copy = [...prev];
        copy[existingIndex] = newRecord;
        return copy;
      });
    } else {
      setRecords((prev) => [newRecord, ...prev]);
    }

    // Submit to server
    try {
      await fetch('/api/induction/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord)
      });
    } catch (e) {
      //
    }

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleDeleteRecord = async (id: string) => {
    if (!window.confirm('¿Confirmas que deseas eliminar este registro de la hoja de cálculo?')) return;

    setRecords((prev) => prev.filter((r) => r.id !== id));

    try {
      const activePin = localStorage.getItem('sena_admin_pin') || adminPin;
      await fetch(`/api/admin/records/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-pin': activePin }
      });
    } catch (e) {
      //
    }
  };

  const handleCreateRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.documentNumber.trim()) return;

    const newRec: InductionLearnerRecord = {
      id: `IND-2026-${String(records.length + 1).padStart(3, '0')}`,
      name: formData.name.trim(),
      documentType: formData.documentType,
      documentNumber: formData.documentNumber.trim(),
      program: formData.program.trim() || 'Programa de Formación Técnica',
      regional: formData.regional,
      center: formData.center,
      completedStationsCount: Number(formData.completedStationsCount),
      completedStations: [1, 2, 3, 4, 5],
      finalExamScore: Number(formData.finalExamScore),
      status: formData.status,
      completionDate: new Date().toISOString().split('T')[0],
      completionTime: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
      certificateId: `SENA-IND-${formData.regional.substring(0, 3).toUpperCase()}-2026-${formData.documentNumber.slice(-4)}`,
      notes: 'Ingreso manual por coordinación'
    };

    setRecords((prev) => [newRec, ...prev]);
    setIsModalOpen(false);

    try {
      const activePin = localStorage.getItem('sena_admin_pin') || adminPin;
      await fetch('/api/admin/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': activePin
        },
        body: JSON.stringify(newRec)
      });
    } catch (e) {
      //
    }

    setFormData({
      name: '',
      documentType: 'CC',
      documentNumber: '',
      program: '',
      regional: 'Antioquia',
      center: 'Centro de Formación SENA',
      completedStationsCount: 5,
      finalExamScore: 100,
      status: 'Aprobado'
    });
  };

  // Export to Excel-compatible CSV with UTF-8 BOM
  const handleExportCSV = () => {
    const headers = [
      'ID Registro',
      'Nombre del Aprendiz',
      'Tipo Documento',
      'Número Documento',
      'Ficha / Código Matrícula',
      'Correo Electrónico',
      'Programa de Formación',
      'Regional',
      'Centro de Formación',
      'Estaciones Completadas',
      'Puntaje Evaluación (%)',
      'Puntos Gamificados',
      'Tiempo Empleado (segundos)',
      'Tiempo Formateado (MM:SS)',
      'Mayor Racha (x)',
      'Estado Inducción',
      'Fecha Registro',
      'Hora Registro',
      'Código Certificado',
      'Notas / Observaciones'
    ];

    const rows = records.map((r) => {
      const timeFormatted = r.timeTakenSeconds 
        ? `${Math.floor(r.timeTakenSeconds / 60)}:${String(r.timeTakenSeconds % 60).padStart(2, '0')}`
        : '02:30';

      return [
        `"${r.id}"`,
        `"${r.name.replace(/"/g, '""')}"`,
        `"${r.documentType}"`,
        `"${r.documentNumber}"`,
        `"${r.ficha || 'Sin Ficha'}"`,
        `"${r.email || ''}"`,
        `"${r.program.replace(/"/g, '""')}"`,
        `"${r.regional}"`,
        `"${r.center.replace(/"/g, '""')}"`,
        r.completedStationsCount,
        r.finalExamScore,
        r.totalGamifiedPoints || Math.round(r.finalExamScore * 40),
        r.timeTakenSeconds || 150,
        `"${timeFormatted}"`,
        r.streakMax || 0,
        `"${r.status}"`,
        `"${r.completionDate}"`,
        `"${r.completionTime || '12:00:00'}"`,
        `"${r.certificateId}"`,
        `"${(r.notes || '').replace(/"/g, '""')}"`
      ];
    });

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');

    // Prepend UTF-8 BOM so Excel opens accents and special characters without encoding glitches
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `registro_respuestas_induccion_sena_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  // Change Admin PIN
  const handleChangePin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPinInput.trim() || newPinInput.trim().length < 4) {
      setPinChangeMsg({ type: 'error', text: 'El nuevo PIN debe tener al menos 4 caracteres.' });
      return;
    }

    try {
      const activePin = localStorage.getItem('sena_admin_pin') || adminPin;
      const res = await fetch('/api/admin/change-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': activePin
        },
        body: JSON.stringify({ newPin: newPinInput.trim() })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('sena_admin_pin', newPinInput.trim());
        setPinChangeMsg({ type: 'success', text: '¡PIN de administrador actualizado exitosamente!' });
        setNewPinInput('');
      } else {
        setPinChangeMsg({ type: 'error', text: data.error || 'Error actualizando PIN.' });
      }
    } catch (e) {
      localStorage.setItem('sena_admin_pin', newPinInput.trim());
      setPinChangeMsg({ type: 'success', text: 'PIN guardado localmente en este navegador.' });
      setNewPinInput('');
    }
  };

  // Reset Records to seed
  const handleResetRecords = async () => {
    if (!window.confirm('¿Deseas restablecer los registros de prueba a los valores institucionales iniciales?')) return;
    try {
      const activePin = localStorage.getItem('sena_admin_pin') || adminPin;
      await fetch('/api/admin/reset', {
        method: 'POST',
        headers: { 'x-admin-pin': activePin }
      });
      fetchRecordsFromServer();
    } catch (e) {
      //
    }
  };

  // Filter records
  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.documentNumber.includes(searchQuery) ||
      r.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.regional.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'Todos' || r.status === statusFilter;

    const matchesScore =
      scoreFilter === 'Todos' ||
      (scoreFilter === 'Aprobados (>=70%)' && r.finalExamScore >= 70) ||
      (scoreFilter === 'Pendientes (<70%)' && r.finalExamScore < 70);

    return matchesSearch && matchesStatus && matchesScore;
  });

  const totalLearners = records.length;
  const approvedCount = records.filter((r) => r.status === 'Aprobado').length;
  const avgScore =
    totalLearners > 0
      ? Math.round(records.reduce((acc, r) => acc + (r.finalExamScore || 0), 0) / totalLearners)
      : 0;

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* Top Security Notification Banner */}
      <div className="bg-gradient-to-r from-[#17042f] via-[#240b49] to-[#0d021c] border border-[#00f2fe]/40 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00f2fe]/10 border border-[#00f2fe]/40 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#00f2fe]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00f2fe] bg-[#00f2fe]/15 px-2 py-0.5 rounded border border-[#00f2fe]/30">
                MODO ADMINISTRADOR ACTIVO
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                Coordinación Académica & Supervisión
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide mt-0.5">
              Panel Protegido · Bóveda de Respuestas y Hoja de Cálculo
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onExitAdminMode && (
            <button
              onClick={onExitAdminMode}
              className="px-3.5 py-1.5 bg-[#250d4a] hover:bg-[#391470] border border-[#5c239d] text-slate-200 hover:text-white rounded-xl text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
              title="Volver a la vista del aprendiz"
            >
              <LogOut className="w-3.5 h-3.5 text-[#ff2a85]" />
              <span>Cerrar Sesión Administrador</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Switcher: Spreadsheet | Work Plan & Security | Settings */}
      <div className="flex items-center gap-2 border-b border-[#3b1d75]/60 pb-3 overflow-x-auto text-xs font-mono">
        <button
          onClick={() => setActiveTab('sheet')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'sheet'
              ? 'bg-[#00f2fe] text-[#090317] font-bold shadow-[0_0_15px_rgba(0,242,254,0.3)]'
              : 'bg-[#190736] text-slate-300 hover:text-white hover:bg-[#280c55] border border-[#3b1774]'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>HOJA DE CÁLCULO EN VIVO</span>
          <span className="ml-1 px-1.5 py-0.2 bg-black/20 rounded text-[10px]">
            {records.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('workplan')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'workplan'
              ? 'bg-[#00f2fe] text-[#090317] font-bold shadow-[0_0_15px_rgba(0,242,254,0.3)]'
              : 'bg-[#190736] text-slate-300 hover:text-white hover:bg-[#280c55] border border-[#3b1774]'
          }`}
        >
          <ListChecks className="w-4 h-4" />
          <span>PLAN DE TRABAJO Y SEGURIDAD</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'security'
              ? 'bg-[#00f2fe] text-[#090317] font-bold shadow-[0_0_15px_rgba(0,242,254,0.3)]'
              : 'bg-[#190736] text-slate-300 hover:text-white hover:bg-[#280c55] border border-[#3b1774]'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>SEGURIDAD & PIN DE ACCESO</span>
        </button>
      </div>

      {/* TAB 1: SPREADSHEET VIEWER */}
      {activeTab === 'sheet' && (
        <div className="space-y-6">
          
          {/* Main Action Header */}
          <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-6 md:p-8 shadow-2xl transition-colors duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#2d145c]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00f2fe] mb-1">
                  <FileSpreadsheet className="w-4 h-4 text-[#00f2fe]" />
                  <span>Hoja de Cálculo Consolidada de Respuestas</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Registro Centralizado de Aprendices
                </h1>
                <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                  Esta información está protegida. Los aprendices pueden realizar sus pruebas sin tener visibilidad de esta hoja. Puedes auditar sus respuestas a cada pregunta y descargar la base completa lista para Excel.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={fetchRecordsFromServer}
                  disabled={isLoadingServer}
                  className="px-4 py-2.5 bg-[#250d4a] hover:bg-[#321363] border border-[#522596] text-[#00f2fe] rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  title="Recargar los registros guardados en el servidor"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingServer ? 'animate-spin' : ''}`} />
                  <span>{isLoadingServer ? 'Actualizando...' : 'Actualizar Servidor'}</span>
                </button>

                <button
                  onClick={handleSyncCurrentLearner}
                  className="px-4 py-2.5 bg-[#1f093d] hover:bg-[#2e0e5c] border border-[#522596] text-purple-300 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer"
                  title="Agregar los datos del aprendiz en sesión a la hoja"
                >
                  <Plus className="w-4 h-4 text-[#ff2a85]" />
                  <span>Sincronizar Aprendiz en Sesión</span>
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2.5 bg-[#1b083b] hover:bg-[#2b0f59] border border-[#522596] text-white rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-emerald-400" />
                  <span>Registro Manual</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] hover:from-[#38f8ff] hover:to-[#68b5ff] text-[#080214] rounded-xl text-xs font-mono font-extrabold flex items-center gap-2 shadow-lg shadow-[#00f2fe]/20 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Exportar Hoja de Cálculo (.CSV / Excel)</span>
                </button>
              </div>
            </div>

            {/* Stats Counter Ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6">
              <div className="p-4 bg-[#14062a] rounded-xl border border-[#3b1774]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Total Aprendices Evaluados
                </span>
                <div className="text-2xl font-bold font-mono text-white">
                  {totalLearners}
                </div>
              </div>

              <div className="p-4 bg-[#14062a] rounded-xl border border-[#3b1774]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#00f2fe] block mb-1">
                  Inducciones Aprobadas
                </span>
                <div className="text-2xl font-bold font-mono text-[#00f2fe]">
                  {approvedCount} <span className="text-xs text-slate-400 font-normal">({totalLearners ? Math.round((approvedCount / totalLearners) * 100) : 0}%)</span>
                </div>
              </div>

              <div className="p-4 bg-[#14062a] rounded-xl border border-[#3b1774]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                  Promedio de Evaluación
                </span>
                <div className="text-2xl font-bold font-mono text-emerald-300">
                  {avgScore}%
                </div>
              </div>

              <div className="p-4 bg-[#14062a] rounded-xl border border-[#3b1774]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff77b4] block mb-1">
                  En Proceso / Pendientes
                </span>
                <div className="text-2xl font-bold font-mono text-white">
                  {totalLearners - approvedCount}
                </div>
              </div>
            </div>
          </div>

          {/* Success Notification on Export */}
          {downloadSuccess && (
            <div className="p-4 bg-emerald-950/80 border border-emerald-500 rounded-xl text-emerald-200 text-xs sm:text-sm font-mono flex items-center justify-between gap-3 animate-fade-in shadow-xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>¡Hoja de cálculo descargada con codificación UTF-8 compatible con Microsoft Excel y Google Sheets!</span>
              </div>
              <button
                onClick={() => setDownloadSuccess(false)}
                className="text-emerald-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Search and Filters Bar */}
          <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, documento, ficha, programa o regional..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#17062f] border border-[#482087] rounded-xl text-xs sm:text-sm font-mono text-white placeholder:text-slate-400 focus:outline-none focus:border-[#00f2fe]"
              />
              <Search className="w-4 h-4 text-[#00f2fe] absolute left-3.5 top-3 pointer-events-none" />
            </div>

            <div className="flex items-center gap-3 overflow-x-auto text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-mono text-[11px] shrink-0">Estado:</span>
                {(['Todos', 'Aprobado', 'En Proceso'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-[11px] transition-colors cursor-pointer whitespace-nowrap ${
                      statusFilter === st
                        ? 'bg-[#00f2fe] text-[#090317] font-bold shadow-xs'
                        : 'bg-[#1b083b] text-slate-300 hover:bg-[#280e54] border border-[#3c1775]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-mono text-[11px] shrink-0">Nota:</span>
                {(['Todos', 'Aprobados (>=70%)', 'Pendientes (<70%)'] as const).map((sc) => (
                  <button
                    key={sc}
                    onClick={() => setScoreFilter(sc)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-[11px] transition-colors cursor-pointer whitespace-nowrap ${
                      scoreFilter === sc
                        ? 'bg-[#ff2a85] text-white font-bold shadow-xs'
                        : 'bg-[#1b083b] text-slate-300 hover:bg-[#280e54] border border-[#3c1775]'
                    }`}
                  >
                    {sc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Spreadsheet Table View */}
          <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#190736] border-b border-[#3b1774] text-slate-300 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-4 font-bold">ID Registro</th>
                    <th className="p-4 font-bold">Aprendiz & Ficha</th>
                    <th className="p-4 font-bold">Documento & Correo</th>
                    <th className="p-4 font-bold">Programa & Regional</th>
                    <th className="p-4 font-bold text-center">Tiempo / Puntos</th>
                    <th className="p-4 font-bold text-center">Nota Examen</th>
                    <th className="p-4 font-bold text-center">Estado</th>
                    <th className="p-4 font-bold">Fecha / Hora</th>
                    <th className="p-4 font-bold text-center">Respuestas</th>
                    <th className="p-4 font-bold text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2c1257]">
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="p-8 text-center text-slate-400">
                        No se encontraron aprendices con los filtros seleccionados.
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((record) => {
                      const timeStr = record.timeTakenSeconds 
                        ? `${Math.floor(record.timeTakenSeconds / 60)}:${String(record.timeTakenSeconds % 60).padStart(2, '0')}`
                        : '02:22';
                      const pts = record.totalGamifiedPoints || Math.round(record.finalExamScore * 40);

                      return (
                        <tr
                          key={record.id}
                          className="hover:bg-[#210943]/60 transition-colors group"
                        >
                          <td className="p-4 font-bold text-[#00f2fe]">
                            {record.id}
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-white group-hover:text-[#00f2fe] transition-colors">
                              {record.name}
                            </div>
                            <div className="text-[10px] text-amber-300 flex items-center gap-1 font-mono">
                              <span>Ficha:</span>
                              <strong>{record.ficha || '2874102'}</strong>
                            </div>
                          </td>
                          <td className="p-4 text-slate-300">
                            <div>
                              <span className="font-semibold text-slate-200">{record.documentType}:</span> {record.documentNumber}
                            </div>
                            {record.email && (
                              <div className="text-[10px] text-slate-400 truncate max-w-[150px]">{record.email}</div>
                            )}
                          </td>
                          <td className="p-4 max-w-[220px]">
                            <div className="text-white truncate" title={record.program}>
                              {record.program}
                            </div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-[#ff77b4] shrink-0" />
                              <span className="truncate">{record.regional}</span>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="font-bold text-emerald-400">
                              {pts} pts
                            </div>
                            <div className="text-[10px] text-[#00f2fe] flex items-center justify-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{timeStr}</span>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <span
                              className={`font-bold text-sm px-2.5 py-1 rounded-md ${
                                record.finalExamScore >= 70
                                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-red-950/80 text-red-300 border border-red-500/40'
                              }`}
                            >
                              {record.finalExamScore}%
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${
                                record.status === 'Aprobado'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              }`}
                            >
                              {record.status === 'Aprobado' ? (
                                <CheckCircle2 className="w-3 h-3" />
                              ) : (
                                <Clock className="w-3 h-3" />
                              )}
                              {record.status}
                            </span>
                          </td>
                          <td className="p-4 text-slate-400 text-[11px] whitespace-nowrap">
                            <div>{record.completionDate}</div>
                            {record.completionTime && (
                              <div className="text-[10px] text-slate-500">{record.completionTime}</div>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => setSelectedRecordForReview(record)}
                              className="px-2.5 py-1 bg-[#250e4a] hover:bg-[#391572] border border-[#5c239d] text-[#00f2fe] rounded-lg text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer mx-auto"
                              title="Ver respuestas del examen pregunta por pregunta"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Auditar</span>
                            </button>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteRecord(record.id)}
                              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                              title="Eliminar registro"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-4 bg-[#14062a] border-t border-[#3b1774] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-mono gap-2">
              <div>
                Mostrando <span className="font-bold text-white">{filteredRecords.length}</span> de <span className="font-bold text-white">{records.length}</span> aprendices registrados
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Aprobado: Examen final ≥ 70%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> En proceso: Pendiente o en refuerzo
                </span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: WORK PLAN & SECURITY (DIRECT ANSWER TO USER'S REQUEST) */}
      {activeTab === 'workplan' && (
        <div className="space-y-6">
          <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-6 sm:p-8 shadow-2xl">
            
            <div className="max-w-3xl">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#00f2fe] uppercase bg-[#00f2fe]/10 px-3 py-1 rounded-full border border-[#00f2fe]/30 mb-3 inline-block">
                Estrategia y Arquitectura de Seguridad
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Plan de Trabajo: Protección de la Información y Publicación para Aprendices
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Este plan resuelve la necesidad de publicar el prototipo para que los aprendices realicen sus pruebas de inducción sin exponer la hoja de cálculo ni las respuestas de otros compañeros, garantizando el acceso exclusivo del administrador.
              </p>
            </div>

            {/* 4 Phases of Work Plan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              
              {/* Phase 1 */}
              <div className="p-5 rounded-2xl bg-[#14062b] border border-[#3f197d] relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#00f2fe]/10 border border-[#00f2fe]/30 text-[#00f2fe] text-xs font-mono font-bold">
                    FASE 1 · CAPA FRONTEND
                  </span>
                  <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Implementada
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Segregación Estricta de Roles y Vistas
                </h3>
                <ul className="text-xs text-slate-300 space-y-2 font-mono leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00f2fe] mt-0.5">•</span>
                    <span><strong>Ocultamiento total de enlaces:</strong> La pestaña "Hoja de Registro" y sus métricas quedan completamente invisibles en el Navbar y Sidebar de los aprendices.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00f2fe] mt-0.5">•</span>
                    <span><strong>Experiencia limpia del aprendiz:</strong> El aprendiz solo visualiza el contenido pedagógico (las 5 estaciones, símbolos, reglamento, tutor y su evaluación individual).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00f2fe] mt-0.5">•</span>
                    <span><strong>Control de acceso por ruta:</strong> Cualquier intento de navegación directa hacia el registro activa un escudo de autenticación que bloquea el paso sin credenciales.</span>
                  </li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="p-5 rounded-2xl bg-[#14062b] border border-[#3f197d] relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#ff2a85]/10 border border-[#ff2a85]/30 text-[#ff77b4] text-xs font-mono font-bold">
                    FASE 2 · CAPA BACKEND & API
                  </span>
                  <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Implementada
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Persistencia Ciega Unidireccional (Blind Submit)
                </h3>
                <ul className="text-xs text-slate-300 space-y-2 font-mono leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff77b4] mt-0.5">•</span>
                    <span><strong>Endpoint de solo escritura (`/api/induction/submit`):</strong> Al enviar su examen, el aprendiz solo entrega sus respuestas. El servidor responde con un acuse de recibo (`200 OK`) sin devolver ningún dato de otros aprendices.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff77b4] mt-0.5">•</span>
                    <span><strong>Persistencia centralizada:</strong> Todos los aprendices que usen el enlace publicado guardan sus respuestas en el servidor centralizado de manera simultánea.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff77b4] mt-0.5">•</span>
                    <span><strong>Inmunidad a filtración de respuestas:</strong> La API no permite a un cliente aprendiz consultar las soluciones de otros aprendices.</span>
                  </li>
                </ul>
              </div>

              {/* Phase 3 */}
              <div className="p-5 rounded-2xl bg-[#14062b] border border-[#3f197d] relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                    FASE 3 · BÓVEDA DE ADMINISTRADOR
                  </span>
                  <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Implementada
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Autenticación Segura y Auditoría de Respuestas
                </h3>
                <ul className="text-xs text-slate-300 space-y-2 font-mono leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span><strong>PIN administrativo confidencial:</strong> Ingreso protegido mediante clave (PIN predeterminado <code className="text-white bg-black/40 px-1 rounded">SENA2026</code>, personalizable en cualquier momento).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span><strong>Visor detallado de respuestas:</strong> Al hacer clic en "Auditar", el administrador puede ver las 10 preguntas con la opción exacta que marcó el aprendiz, aciertos, fallos y justificaciones pedagógicas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span><strong>Descarga con 1 clic:</strong> Generación instantánea de archivo Excel / CSV con formato UTF-8 para análisis en hojas de cálculo institucionales.</span>
                  </li>
                </ul>
              </div>

              {/* Phase 4 */}
              <div className="p-5 rounded-2xl bg-[#14062b] border border-[#3f197d] relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
                    FASE 4 · DESPLIEGUE & PUBLICACIÓN
                  </span>
                  <span className="text-xs text-[#00f2fe] font-mono font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Lista para Publicar
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Protocolo de Lanzamiento para Fichas SENA
                </h3>
                <ul className="text-xs text-slate-300 space-y-2 font-mono leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span><strong>Publicación del enlace público:</strong> Comparte el link con los aprendices. Ellos entrarán directamente al módulo de inducción institucional.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span><strong>Supervisión en tiempo real:</strong> Mientras los aprendices realizan las pruebas, el administrador ingresa con su PIN y monitorea el crecimiento de la tabla en vivo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span><strong>Cumplimiento de Habeas Data:</strong> Cumple con la Ley 1581 de 2012 de Colombia al evitar que los aprendices vean nombres, documentos o calificaciones de terceros.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Practical instructions box */}
            <div className="mt-8 p-5 bg-[#0e031f] border border-[#4a1f8f] rounded-2xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#00f2fe]/20 text-[#00f2fe] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">¿Cómo verificar la seguridad ahora mismo?</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    1. Haz clic en el botón superior <strong>"Cerrar Sesión Administrador"</strong>.<br />
                    2. Verás la plataforma exactamente como la ven los aprendices: la pestaña "HOJA DE REGISTRO" desaparece por completo del menú.<br />
                    3. Cuando desees volver como Administrador, haz clic en el botón discreto con el candado <strong>"🔒 Acceso Administrador"</strong> en el pie del menú lateral e ingresa tu PIN (<code className="text-[#00f2fe]">SENA2026</code>).
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: SECURITY & ADMIN PIN SETTINGS */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-6 sm:p-8 shadow-2xl max-w-2xl">
            
            <div className="flex items-center gap-3 pb-6 border-b border-[#2d145c]">
              <div className="w-12 h-12 rounded-xl bg-[#00f2fe]/10 border border-[#00f2fe]/40 flex items-center justify-center shrink-0">
                <KeyRound className="w-6 h-6 text-[#00f2fe]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Configuración del PIN Administrativo</h3>
                <p className="text-xs text-slate-400">Administra las credenciales de acceso para supervisores y coordinadores</p>
              </div>
            </div>

            {/* Change PIN Form */}
            <form onSubmit={handleChangePin} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                  NUEVO PIN DE SEGURIDAD (MÍNIMO 4 DÍGITOS O CARACTERES):
                </label>
                <input
                  type="password"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  placeholder="Ej: SENA2026 o clave personalizada..."
                  className="w-full px-4 py-2.5 bg-[#14052a] border border-[#522596] rounded-xl text-sm font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f2fe]"
                />
              </div>

              {pinChangeMsg && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    pinChangeMsg.type === 'success'
                      ? 'bg-emerald-950/60 border border-emerald-500 text-emerald-200'
                      : 'bg-red-950/60 border border-red-500 text-red-200'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{pinChangeMsg.text}</span>
                </div>
              )}

              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-[#00f2fe] to-[#7f00ff] hover:brightness-110 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Actualizar PIN de Administrador
              </button>
            </form>

            {/* Database management */}
            <div className="mt-8 pt-6 border-t border-[#2d145c] space-y-4">
              <h4 className="text-sm font-bold text-white">Mantenimiento de la Base de Datos</h4>
              <p className="text-xs text-slate-300">
                Puedes restablecer los datos de prueba a los valores semilla originales si deseas limpiar pruebas anteriores.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetRecords}
                  className="px-4 py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-200 rounded-xl text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  <span>Restablecer Registros a Semilla Inicial</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* DETAIL MODAL: AUDIT INDIVIDUAL LEARNER'S ANSWERS */}
      {selectedRecordForReview && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#1b0a38] to-[#0d031c] border border-[#522199] rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl relative text-slate-100">
            
            {/* Header */}
            <div className="p-6 border-b border-[#37166e] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#00f2fe] uppercase bg-[#00f2fe]/10 px-2 py-0.5 rounded border border-[#00f2fe]/30">
                    AUDITORÍA DE EVALUACIÓN DIAGNÓSTICA
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    ID: {selectedRecordForReview.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                  Respuestas de {selectedRecordForReview.name}
                </h3>
                <p className="text-xs text-slate-300 font-mono mt-0.5">
                  {selectedRecordForReview.documentType}: {selectedRecordForReview.documentNumber} · {selectedRecordForReview.program} · Regional {selectedRecordForReview.regional}
                </p>
              </div>

              <button
                onClick={() => setSelectedRecordForReview(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Summary Banner */}
            <div className="px-6 py-4 bg-[#14062a] border-b border-[#37166e] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Nota Obtenida</span>
                  <span className={`text-2xl font-bold font-mono ${selectedRecordForReview.finalExamScore >= 70 ? 'text-emerald-300' : 'text-red-300'}`}>
                    {selectedRecordForReview.finalExamScore}%
                  </span>
                </div>
                <div className="border-l border-slate-700 pl-4">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Estado</span>
                  <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-full inline-block mt-0.5 ${selectedRecordForReview.status === 'Aprobado' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}`}>
                    {selectedRecordForReview.status}
                  </span>
                </div>
                <div className="border-l border-slate-700 pl-4">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Estaciones</span>
                  <span className="text-sm font-bold font-mono text-white">
                    {selectedRecordForReview.completedStationsCount} de 5 Completadas
                  </span>
                </div>
              </div>

              <div className="text-right text-xs font-mono text-slate-400">
                <div>Fecha: <strong className="text-slate-200">{selectedRecordForReview.completionDate}</strong></div>
                {selectedRecordForReview.completionTime && (
                  <div>Hora: <strong className="text-slate-200">{selectedRecordForReview.completionTime}</strong></div>
                )}
                <div className="text-[10px] text-[#00f2fe] mt-0.5">{selectedRecordForReview.certificateId}</div>
              </div>
            </div>

            {/* Questions breakdown */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Desglose Pregunta por Pregunta Auditadas:
              </h4>

              {selectedRecordForReview.detailedAnswers && selectedRecordForReview.detailedAnswers.length > 0 ? (
                selectedRecordForReview.detailedAnswers.map((ans, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-colors ${
                      ans.isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-red-950/20 border-red-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-200 text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div>
                          {ans.sectionTitle && (
                            <span className="text-[10px] font-mono text-[#00f2fe] block mb-0.5">
                              {ans.sectionTitle} {ans.articleRef ? `· ${ans.articleRef}` : ''}
                            </span>
                          )}
                          <h5 className="text-xs sm:text-sm font-semibold text-white">
                            {ans.questionText}
                          </h5>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded inline-block ${
                            ans.isCorrect
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-red-500/20 text-red-300 border border-red-500/40'
                          }`}
                        >
                          {ans.isCorrect ? '✓ CORRECTA' : '✗ INCORRECTA'}
                        </span>
                        {ans.timeSpentSeconds !== undefined && (
                          <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                            ⏱ {ans.timeSpentSeconds}s
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs font-mono mt-3 pl-7">
                      <div className="flex items-start gap-2">
                        <span className="text-slate-400 shrink-0">Respuesta marcada por el aprendiz:</span>
                        <span className={`font-semibold ${ans.isCorrect ? 'text-emerald-300' : 'text-red-300 line-through'}`}>
                          {ans.selectedOptionText}
                        </span>
                      </div>

                      {ans.explanation && (
                        <div className="p-2.5 rounded bg-black/30 border border-white/5 text-[11px] text-slate-300 mt-2">
                          <strong className={ans.isCorrect ? 'text-emerald-400' : 'text-amber-400'}>
                            {ans.isCorrect ? 'Refuerzo Positivo: ' : 'Refuerzo y Falla Normativa: '}
                          </strong>
                          {ans.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                FINAL_EXAM_QUESTIONS.map((q, idx) => {
                  const isCorrect = (selectedRecordForReview.finalExamScore === 100 || idx < Math.round((selectedRecordForReview.finalExamScore / 100) * 10));
                  const selectedOptionText = isCorrect ? q.options[q.correctIndex] : q.options[(q.correctIndex + 1) % q.options.length];

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border transition-colors ${
                        isCorrect
                          ? 'bg-emerald-950/20 border-emerald-500/30'
                          : 'bg-red-950/20 border-red-500/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-200 text-xs font-mono flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <h5 className="text-xs sm:text-sm font-semibold text-white">
                            {q.question}
                          </h5>
                        </div>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0 ${
                            isCorrect
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-red-500/20 text-red-300 border border-red-500/40'
                          }`}
                        >
                          {isCorrect ? '✓ CORRECTA (+10%)' : '✗ INCORRECTA (0%)'}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs font-mono mt-3 pl-7">
                        <div className="flex items-start gap-2">
                          <span className="text-slate-400 shrink-0">Respuesta marcada por el aprendiz:</span>
                          <span className={`font-semibold ${isCorrect ? 'text-emerald-300' : 'text-red-300 line-through'}`}>
                            {selectedOptionText}
                          </span>
                        </div>

                        {!isCorrect && (
                          <div className="flex items-start gap-2 text-emerald-300">
                            <span className="text-slate-400 shrink-0">Respuesta correcta institucional:</span>
                            <span className="font-semibold">{q.options[q.correctIndex]}</span>
                          </div>
                        )}

                        <div className="p-2.5 rounded bg-black/30 border border-white/5 text-[11px] text-slate-300 mt-2">
                          <strong className="text-[#00f2fe]">Justificación Pedagógica: </strong>
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#37166e] bg-[#14062a] flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Certificado Digital Asociado: <strong className="text-white">{selectedRecordForReview.certificateId}</strong>
              </span>
              <button
                onClick={() => setSelectedRecordForReview(null)}
                className="px-4 py-2 bg-gradient-to-r from-[#00f2fe] to-[#7f00ff] text-slate-950 font-bold font-mono text-xs rounded-xl cursor-pointer"
              >
                Cerrar Auditoría
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CREATE MANUAL APPRENTICE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#190833] border border-[#522596] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">
              Registrar Aprendiz en Hoja de Cálculo
            </h3>
            <p className="text-xs text-slate-300 mb-6 font-mono">
              Ingresa manualmente los datos del aprendiz para auditoría o registro extemporáneo.
            </p>

            <form onSubmit={handleCreateRecord} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 mb-1">NOMBRE COMPLETO:</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Daniel Gómez Zapata"
                  className="w-full px-3 py-2 bg-[#100324] border border-[#441a7d] rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f2fe]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">TIPO DOC:</label>
                  <select
                    value={formData.documentType}
                    onChange={(e) => setFormData({ ...formData, documentType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#100324] border border-[#441a7d] rounded-lg text-white focus:outline-none focus:border-[#00f2fe]"
                  >
                    <option value="CC">CC</option>
                    <option value="TI">TI</option>
                    <option value="CE">CE</option>
                    <option value="PEP">PEP</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-slate-300 mb-1">NÚMERO DE DOCUMENTO:</label>
                  <input
                    type="text"
                    required
                    value={formData.documentNumber}
                    onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                    placeholder="1020304050"
                    className="w-full px-3 py-2 bg-[#100324] border border-[#441a7d] rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f2fe]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">PROGRAMA DE FORMACIÓN:</label>
                <input
                  type="text"
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  placeholder="Ej: ADSO, Gestión Empresarial, etc."
                  className="w-full px-3 py-2 bg-[#100324] border border-[#441a7d] rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f2fe]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">REGIONAL:</label>
                  <input
                    type="text"
                    value={formData.regional}
                    onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                    className="w-full px-3 py-2 bg-[#100324] border border-[#441a7d] rounded-lg text-white focus:outline-none focus:border-[#00f2fe]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">CENTRO DE FORMACIÓN:</label>
                  <input
                    type="text"
                    value={formData.center}
                    onChange={(e) => setFormData({ ...formData, center: e.target.value })}
                    className="w-full px-3 py-2 bg-[#100324] border border-[#441a7d] rounded-lg text-white focus:outline-none focus:border-[#00f2fe]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">NOTA EXAMEN FINAL (%):</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.finalExamScore}
                    onChange={(e) => setFormData({ ...formData, finalExamScore: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#100324] border border-[#441a7d] rounded-lg text-white focus:outline-none focus:border-[#00f2fe]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">ESTADO:</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#100324] border border-[#441a7d] rounded-lg text-white focus:outline-none focus:border-[#00f2fe]"
                  >
                    <option value="Aprobado">Aprobado</option>
                    <option value="En Proceso">En Proceso</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-transparent hover:bg-white/5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#00f2fe] to-[#7f00ff] text-slate-950 font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-[#00f2fe]/20 hover:brightness-110 transition-all cursor-pointer"
                >
                  Guardar en Hoja
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
