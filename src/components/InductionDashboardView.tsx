import React, { useState } from 'react';
import { ApprenticeProfile, Station } from '../types/induction';
import {
  Compass,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  BookOpen,
  Scale,
  Clock,
  Layers,
  Activity
} from 'lucide-react';

interface InductionDashboardViewProps {
  profile: ApprenticeProfile;
  stations: Station[];
  onSelectStation: (station: Station) => void;
  onOpenExam: () => void;
  onOpenCertificate: () => void;
}

export const InductionDashboardView: React.FC<InductionDashboardViewProps> = ({
  profile,
  stations,
  onSelectStation,
  onOpenExam,
  onOpenCertificate
}) => {
  const [activeTab, setActiveTab] = useState<'saber' | 'hacer' | 'ser'>('saber');
  const [selectedDay, setSelectedDay] = useState<number>(14);

  const completedCount = profile.completedStations.length;
  const progressPct = Math.round((completedCount / 5) * 100);

  // Detailed schedule map for the SENA induction days
  const SCHEDULE_DAYS: Record<number, { title: string; focus: string; tag: string; color: string }> = {
    1: { title: 'Día 1: Bienvenida e Identidad SENA', focus: 'Apertura oficial, reseña de Rodolfo Martínez Tono (1957) y sentido de pertenencia.', tag: 'IDENTIDAD', color: '#00f2fe' },
    2: { title: 'Día 2: Símbolos Institucionales', focus: 'Apropiación del Escudo, la Bandera blanca y el Himno oficial del SENA.', tag: 'SÍMBOLOS', color: '#ff2a85' },
    3: { title: 'Día 3: Metodología FPI y Alternativas', focus: 'Formación por Proyectos (Saber, Saber Hacer, Saber Ser) y 5 opciones de etapa productiva.', tag: 'FPI', color: '#9b51e0' },
    4: { title: 'Día 4: Derechos, Deberes y SST', focus: 'Reglamento del Aprendiz (Acuerdo 007 de 2012), carné institucional y prevención.', tag: 'NORMATIVA', color: '#00f2fe' },
    5: { title: 'Día 5: Debido Proceso y Evaluación', focus: 'Comité de Evaluación y Seguimiento, garantías procesales y examen final oficial.', tag: 'EVALUACIÓN', color: '#ff2a85' }
  };

  const calendarDays = [
    { num: 1, label: 'D' }, { num: 2, label: 'L' }, { num: 3, label: 'M' },
    { num: 4, label: 'M' }, { num: 5, label: 'J' }, { num: 6, label: 'V' }, { num: 7, label: 'S' },
    { num: 8, label: 'D' }, { num: 9, label: 'L' }, { num: 10, label: 'M' },
    { num: 11, label: 'M' }, { num: 12, label: 'J' }, { num: 13, label: 'V' }, { num: 14, label: 'S', active: true },
    { num: 15, label: 'D' }, { num: 16, label: 'L' }, { num: 17, label: 'M' },
    { num: 18, label: 'M' }, { num: 19, label: 'J' }, { num: 20, label: 'V' }, { num: 21, label: 'S' }
  ];

  const currentSchedule = SCHEDULE_DAYS[((selectedDay - 1) % 5) + 1] || SCHEDULE_DAYS[1];

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* 1. TOP METRIC RIBBONS (Directly inspired by top cyan bar in image: 2,988 · 2,564 · 20,345) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        
        {/* Ribbon 1 */}
        <div className="relative overflow-hidden rounded-xl p-4 bg-gradient-to-r from-[#00f2fe]/90 to-[#4facfe]/80 text-[#090317] shadow-lg flex items-center justify-between">
          <div className="z-10">
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase opacity-80 block">
              COBERTURA NACIONAL
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight mt-0.5">
              33 REGIONALES
            </div>
            <span className="text-[11px] font-medium opacity-90 block mt-0.5">
              Formación profesional en los 32 departamentos
            </span>
          </div>
          <Compass className="w-10 h-10 text-[#090317]/25 shrink-0 z-0 mr-2" />
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/20 rounded-full blur-xl" />
        </div>

        {/* Ribbon 2 */}
        <div className="relative overflow-hidden rounded-xl p-4 bg-gradient-to-r from-[#4facfe]/90 to-[#00f2fe]/80 text-[#090317] shadow-lg flex items-center justify-between">
          <div className="z-10">
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase opacity-80 block">
              MODELO PÚBLICO
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight mt-0.5">
              100% GRATUITO
            </div>
            <span className="text-[11px] font-medium opacity-90 block mt-0.5">
              Sin costo ni intermediarios para los colombianos
            </span>
          </div>
          <ShieldCheck className="w-10 h-10 text-[#090317]/25 shrink-0 z-0 mr-2" />
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/20 rounded-full blur-xl" />
        </div>

        {/* Ribbon 3 */}
        <div className="relative overflow-hidden rounded-xl p-4 bg-gradient-to-r from-[#00f2fe]/90 to-[#7f00ff]/80 text-[#090317] shadow-lg flex items-center justify-between">
          <div className="z-10">
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase opacity-80 block">
              TRAYECTORIA HISTÓRICA
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight mt-0.5">
              1957 — 2026
            </div>
            <span className="text-[11px] font-medium opacity-90 block mt-0.5">
              Fundado por Rodolfo Martínez Tono
            </span>
          </div>
          <Award className="w-10 h-10 text-[#090317]/25 shrink-0 z-0 mr-2" />
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/20 rounded-full blur-xl" />
        </div>

      </div>

      {/* 2. THE FUTURISTIC SPLINE WAVE VISUALIZER (Recreating the wave graph with nodes from image) */}
      <div className="cyber-glass-panel rounded-2xl p-6 border border-[#3b1d75]/60 relative overflow-hidden shadow-2xl">
        
        {/* Subtle background ambient blur */}
        <div className="absolute top-0 right-1/4 w-96 h-48 bg-[#9b51e0]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Wave Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2d145c]/80 mb-6">
          <div>
            <span className="text-[11px] font-mono text-[#00f2fe] uppercase tracking-widest block font-bold">
              FORMACIÓN PROFESIONAL INTEGRAL (FPI)
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2 mt-0.5">
              <span>Curva de Apropiación Formativa SENA</span>
              <Activity className="w-5 h-5 text-[#ff2a85]" />
            </h2>
          </div>

          {/* Interactive dimension selector */}
          <div className="inline-flex p-1 bg-[#15072c] rounded-lg border border-[#37166e]">
            <button
              onClick={() => setActiveTab('saber')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                activeTab === 'saber'
                  ? 'bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-[#0a0217] font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SABER (Teoría)
            </button>
            <button
              onClick={() => setActiveTab('hacer')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                activeTab === 'hacer'
                  ? 'bg-gradient-to-r from-[#ff2a85] to-[#f857a6] text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SABER HACER (Técnica)
            </button>
            <button
              onClick={() => setActiveTab('ser')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                activeTab === 'ser'
                  ? 'bg-gradient-to-r from-[#9b51e0] to-[#7f00ff] text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SABER SER (Ética)
            </button>
          </div>
        </div>

        {/* Wave Canvas Grid & Right Telemetry Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Wave Canvas SVG (Matches reference graphic with waves, grid lines, glowing dot nodes) */}
          <div className="lg:col-span-9 relative">
            
            {/* Coordinate grid lines matching image */}
            <div className="relative h-56 sm:h-64 w-full">
              
              {/* Grid Y Axis Labels */}
              <div className="absolute left-0 top-0 bottom-6 w-10 flex flex-col justify-between text-[10px] font-mono text-[#7b51b3]">
                <span>100%</span>
                <span>80%</span>
                <span>60%</span>
                <span>40%</span>
                <span>20%</span>
                <span>0%</span>
              </div>

              {/* Grid Horizontal Guide Lines */}
              <div className="absolute left-10 right-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
                <div className="border-b border-[#2e135e]/40 w-full" />
                <div className="border-b border-[#2e135e]/40 w-full" />
                <div className="border-b border-[#2e135e]/40 w-full" />
                <div className="border-b border-[#2e135e]/40 w-full" />
                <div className="border-b border-[#2e135e]/40 w-full" />
                <div className="border-b border-[#2e135e]/60 w-full" />
              </div>

              {/* The Master SVG Waveform matching the exact aesthetic in image */}
              <svg
                viewBox="0 0 600 200"
                preserveAspectRatio="none"
                className="absolute left-10 right-0 top-0 h-[calc(100%-24px)] w-[calc(100%-40px)]"
              >
                <defs>
                  {/* Cyan to Violet Wave Gradient */}
                  <linearGradient id="waveGradCyan" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.45" />
                    <stop offset="60%" stopColor="#7f00ff" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#ff2a85" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Pink to Amber Wave Gradient */}
                  <linearGradient id="waveGradPink" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff2a85" stopOpacity="0.35" />
                    <stop offset="50%" stopColor="#f857a6" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#120426" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Background Secondary Wave */}
                <path
                  d="M0,170 C80,140 140,50 220,110 C300,165 380,40 460,80 C520,110 570,90 600,120 L600,200 L0,200 Z"
                  fill="url(#waveGradPink)"
                />

                {/* Foreground Primary Wave */}
                <path
                  d="M0,180 C70,160 120,40 200,90 C280,140 340,30 440,60 C510,80 560,130 600,100 L600,200 L0,200 Z"
                  fill="url(#waveGradCyan)"
                />

                {/* Primary Wave High-Contrast Crest Line */}
                <path
                  d="M0,180 C70,160 120,40 200,90 C280,140 340,30 440,60 C510,80 560,130 600,100"
                  fill="none"
                  stroke="#00f2fe"
                  strokeWidth="2.5"
                  className="drop-shadow-[0_0_8px_rgba(0,242,254,0.8)]"
                />

                {/* Secondary Wave Crest Line */}
                <path
                  d="M0,170 C80,140 140,50 220,110 C300,165 380,40 460,80 C520,110 570,90 600,120"
                  fill="none"
                  stroke="#ff2a85"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="drop-shadow-[0_0_6px_rgba(255,42,133,0.7)]"
                />

                {/* Glowing Nodes (Representing milestone checkpoints in the reference image) */}
                <circle cx="120" cy="50" r="5" fill="#ffffff" stroke="#00f2fe" strokeWidth="3" className="drop-shadow-[0_0_8px_#00f2fe]" />
                <circle cx="200" cy="90" r="5" fill="#ffffff" stroke="#ff2a85" strokeWidth="3" className="drop-shadow-[0_0_8px_#ff2a85]" />
                <circle cx="340" cy="30" r="6" fill="#ffffff" stroke="#00f2fe" strokeWidth="3" className="drop-shadow-[0_0_10px_#00f2fe]" />
                <circle cx="440" cy="60" r="5" fill="#ffffff" stroke="#f857a6" strokeWidth="3" className="drop-shadow-[0_0_8px_#f857a6]" />
                <circle cx="560" cy="115" r="4" fill="#ffffff" stroke="#00f2fe" strokeWidth="2.5" />
              </svg>

              {/* Grid X Axis Timeline Labels */}
              <div className="absolute left-10 right-0 bottom-0 flex justify-between text-[10px] font-mono text-[#8a5cc4]">
                <span>1. INDUCCIÓN</span>
                <span>2. SÍMBOLOS</span>
                <span>3. FPI LECTIVA</span>
                <span>4. REGLAMENTO</span>
                <span>5. PRODUCTIVA</span>
                <span>6. CERTIFICACIÓN</span>
              </div>

            </div>

          </div>

          {/* Right Telemetry Widget (Matches the 30° weather/telemetry box in reference image) */}
          <div className="lg:col-span-3 bg-[#170830]/90 rounded-xl p-4 border border-[#3b1970] flex flex-col justify-between space-y-4 shadow-inner">
            
            <div className="flex items-center justify-between pb-2 border-b border-[#2d145c]">
              <span className="text-[10px] font-mono text-[#00f2fe] uppercase tracking-wider font-bold">
                ESTADO DEL APRENDIZ
              </span>
              <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-ping" />
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
                  {progressPct}%
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  ÍNDICE FORMATIVO
                </div>
              </div>

              {/* Vertical Soundwave / Telemetry Bars from reference image */}
              <div className="flex items-end gap-1 h-9">
                <div className="w-1.5 h-4 bg-[#00f2fe] rounded-full" />
                <div className="w-1.5 h-7 bg-[#4facfe] rounded-full" />
                <div className="w-1.5 h-9 bg-[#ff2a85] rounded-full" />
                <div className="w-1.5 h-6 bg-[#9b51e0] rounded-full" />
                <div className="w-1.5 h-3 bg-[#00f2fe] rounded-full" />
              </div>
            </div>

            <div className="space-y-1.5 text-[11px] font-mono border-t border-[#2d145c] pt-3">
              <div className="flex justify-between text-slate-400">
                <span>Póliza 24/7:</span>
                <span className="text-[#00f2fe] font-bold">ACTIVA</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Zajuna LMS:</span>
                <span className="text-emerald-400 font-bold">EN LÍNEA</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Acuerdo:</span>
                <span className="text-slate-200">007 / 2012</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 3. LOWER 3-COLUMN MODULAR WIDGET GRID (Matching bottom half of reference image!) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* WIDGET 1: 80% Circular Gauge & Colorful Vertical Bars (Matches left card in image) */}
        <div className="cyber-glass-panel rounded-2xl p-6 border border-[#3b1d75]/60 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#2d145c]">
              <span className="text-xs font-mono font-bold text-[#00f2fe] uppercase tracking-wider">
                APROPIACIÓN INSTITUCIONAL
              </span>
              <span className="text-[10px] font-mono text-slate-400">ESTACIÓN 01-03</span>
            </div>

            {/* Circular Progress Gauge 80% */}
            <div className="my-5 flex flex-col items-center justify-center relative">
              <div className="w-32 h-32 rounded-full border-4 border-[#321261] flex items-center justify-center relative shadow-[0_0_25px_rgba(0,242,254,0.25)]">
                {/* SVG Progress Circle */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    stroke="#250d4a"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    stroke="url(#cyanCircleGrad)"
                    strokeWidth="8"
                    strokeDasharray="276"
                    strokeDashoffset={276 - (276 * (progressPct || 80)) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="cyanCircleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00f2fe" />
                      <stop offset="100%" stopColor="#ff2a85" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-extrabold font-mono text-white tracking-tight">
                    {progressPct || 80}%
                  </span>
                  <span className="text-[9px] font-mono text-[#00f2fe] uppercase">
                    COMPLETO
                  </span>
                </div>
              </div>
            </div>

            {/* Multi-color vertical bar chart matching image */}
            <div className="pt-2 border-t border-[#2d145c] space-y-2">
              <span className="text-[11px] font-mono text-slate-300 block">
                Nivel por Competencia:
              </span>
              <div className="flex items-end justify-between h-20 px-2 pt-2 bg-[#120524]/60 rounded-lg border border-[#2d145c]">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-14 bg-gradient-to-t from-[#ff2a85] to-[#f857a6] rounded-t-sm" />
                  <span className="text-[9px] font-mono text-slate-400">HIST</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-11 bg-gradient-to-t from-[#00f2fe] to-[#4facfe] rounded-t-sm" />
                  <span className="text-[9px] font-mono text-slate-400">SÍMB</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-16 bg-gradient-to-t from-[#9b51e0] to-[#7f00ff] rounded-t-sm" />
                  <span className="text-[9px] font-mono text-slate-400">FPI</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-9 bg-gradient-to-t from-[#ff8a00] to-[#e52e71] rounded-t-sm" />
                  <span className="text-[9px] font-mono text-slate-400">REGL</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-12 bg-gradient-to-t from-[#00f2fe] to-[#00c9ff] rounded-t-sm" />
                  <span className="text-[9px] font-mono text-slate-400">BIEN</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={() => onSelectStation(stations[0])}
              className="w-full py-2 bg-[#260e4d] hover:bg-[#391572] border border-[#481c8f] text-xs font-mono text-[#00f2fe] font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>EXPLORAR MÓDULO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* WIDGET 2: 60% Circular Gauge & Horizontal Sliders (Matches middle card in image) */}
        <div className="cyber-glass-panel rounded-2xl p-6 border border-[#3b1d75]/60 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#2d145c]">
              <span className="text-xs font-mono font-bold text-[#ff2a85] uppercase tracking-wider">
                REGULACIÓN & CONVIVENCIA
              </span>
              <span className="text-[10px] font-mono text-slate-400">ACUERDO 007</span>
            </div>

            {/* Circular Progress Gauge 60% */}
            <div className="my-5 flex flex-col items-center justify-center relative">
              <div className="w-32 h-32 rounded-full border-4 border-[#321261] flex items-center justify-center relative shadow-[0_0_25px_rgba(255,42,133,0.25)]">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    stroke="#250d4a"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    stroke="url(#pinkCircleGrad)"
                    strokeWidth="8"
                    strokeDasharray="276"
                    strokeDashoffset={276 - (276 * 60) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                  <defs>
                    <linearGradient id="pinkCircleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff2a85" />
                      <stop offset="100%" stopColor="#7f00ff" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-extrabold font-mono text-white tracking-tight">
                    60%
                  </span>
                  <span className="text-[9px] font-mono text-[#ff2a85] uppercase">
                    EN PROCESO
                  </span>
                </div>
              </div>
            </div>

            {/* Horizontal neon status sliders from reference image */}
            <div className="pt-2 border-t border-[#2d145c] space-y-2.5">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-300">
                  <span>Asistencia reglamentaria (3 días)</span>
                  <span className="text-[#00f2fe]">100%</span>
                </div>
                <div className="h-1.5 w-full bg-[#200d40] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00f2fe] w-full" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-300">
                  <span>Porte de Carné institucional</span>
                  <span className="text-[#ff2a85]">85%</span>
                </div>
                <div className="h-1.5 w-full bg-[#200d40] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#ff2a85] to-[#f857a6] w-[85%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-300">
                  <span>Entrega de evidencias en Zajuna</span>
                  <span className="text-[#9b51e0]">75%</span>
                </div>
                <div className="h-1.5 w-full bg-[#200d40] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#9b51e0] to-[#7f00ff] w-[75%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={() => onSelectStation(stations[3])}
              className="w-full py-2 bg-[#260e4d] hover:bg-[#391572] border border-[#481c8f] text-xs font-mono text-[#ff2a85] font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>SIMULAR CASOS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* WIDGET 3: Calendar & Activity Ledger (Matches right card in image with JULY calendar!) */}
        <div className="cyber-glass-panel rounded-2xl p-6 border border-[#3b1d75]/60 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#2d145c]">
              <span className="text-xs font-mono font-bold text-[#00f2fe] uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#00f2fe]" />
                <span>SEMANA DE INDUCCIÓN</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">CRONOGRAMA</span>
            </div>

            {/* Glowing Calendar Grid matching the "JULY" widget in reference image */}
            <div className="my-4 p-3 bg-[#130526] rounded-xl border border-[#30135c]">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-white mb-2 px-1">
                <span className="text-[#ff2a85]">‹</span>
                <span className="tracking-widest">CRONOGRAMA INDUCCIÓN</span>
                <span className="text-[#ff2a85]">›</span>
              </div>

              {/* Days header bar (Cyan band from reference image) */}
              <div className="grid grid-cols-7 gap-1 text-center py-1 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-[#0a0217] text-[10px] font-mono font-extrabold rounded-md mb-2">
                <span>D</span><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span>
              </div>

              {/* Calendar Days Matrix */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono">
                {calendarDays.slice(0, 21).map((day, dIdx) => {
                  const isCurrent = day.num === selectedDay;
                  return (
                    <button
                      key={dIdx}
                      onClick={() => setSelectedDay(day.num)}
                      className={`py-1 rounded transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#ff2a85] text-white font-bold shadow-[0_0_8px_#ff2a85]'
                          : 'text-slate-400 hover:text-white hover:bg-[#250e4a]'
                      }`}
                    >
                      {day.num}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Activity Ledger connected to selected calendar day */}
            <div className="space-y-2 text-[11px] font-mono border-t border-[#2d145c] pt-3 text-slate-300">
              <div className="p-2.5 rounded-lg bg-[#180733] border border-[#3e1b70] space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-white font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentSchedule.color }} />
                    {currentSchedule.title}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ backgroundColor: `${currentSchedule.color}20`, color: currentSchedule.color }}>
                    {currentSchedule.tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {currentSchedule.focus}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 pt-1">
                <span>Día seleccionado: <strong>{selectedDay}</strong></span>
                <span className="text-[#00f2fe]">Jornada de Inducción</span>
              </div>
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={onOpenExam}
              className="w-full py-2 bg-gradient-to-r from-[#ff2a85] to-[#7f00ff] text-white font-mono font-bold text-xs rounded-lg shadow-[0_0_15px_rgba(255,42,133,0.4)] hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>TEST DE EVALUACIÓN FINAL</span>
            </button>
          </div>
        </div>

      </div>

      {/* 4. QUICK STATIONS ACCESS TILES */}
      <div className="cyber-glass-panel rounded-2xl p-6 border border-[#3b1d75]/60 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#2d145c]">
          <div>
            <span className="text-[11px] font-mono text-[#00f2fe] uppercase tracking-wider font-bold">
              ESTACIONES DE INDUCCIÓN
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
              Ruta Formativa de Aprendizaje
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {completedCount} de 5 Aprobadas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {stations.map((st) => {
            const isDone = profile.completedStations.includes(st.id);
            return (
              <button
                key={st.id}
                onClick={() => onSelectStation(st)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                  isDone
                    ? 'bg-[#1b0938] border-[#00f2fe]/50 hover:border-[#00f2fe] shadow-[0_0_12px_rgba(0,242,254,0.15)]'
                    : 'bg-[#14062a]/80 border-[#3b1970]/50 hover:border-[#6a2cbd] hover:bg-[#200a40]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                    <span className="text-[#00f2fe] font-bold">ESTACIÓN {st.number}</span>
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00f2fe]" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-2 group-hover:text-[#00f2fe] transition-colors">
                    {st.title}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-[#2e135e]/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>~{st.estimatedMinutes} MIN</span>
                  <span className="text-[#ff2a85] group-hover:translate-x-1 transition-transform">›</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
