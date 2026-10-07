import React, { useState } from 'react';
import {
  REGULATION_CASES,
  REGULATION_ARTICLES,
  DUE_PROCESS_STEPS,
  LEARNER_PROCEDURES
} from '../data/senaInductionData';
import { DilemmaCase, RegulationArticle, LearnerProcedure, DueProcessStep } from '../types/induction';
import {
  Scale,
  Search,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ChevronRight,
  RotateCcw,
  BookOpen,
  FileText,
  Clock,
  ShieldCheck,
  UserCheck,
  Award,
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  Filter,
  Check,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface RegulationHubProps {
  initialTab?: 'cases' | 'articles' | 'procedures' | 'due_process';
  onBackToRoute?: () => void;
  onGoToExam?: () => void;
}

export const RegulationHub: React.FC<RegulationHubProps> = ({
  initialTab = 'cases',
  onBackToRoute,
  onGoToExam
}) => {
  const [activeTab, setActiveTab] = useState<'cases' | 'articles' | 'procedures' | 'due_process'>(initialTab);

  // States for Dilemmas Simulator
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);
  const [selectedCaseFilter, setSelectedCaseFilter] = useState<string>('todos');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [caseScores, setCaseScores] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState<number>(0);

  // States for Articles Directory
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticleCategory, setSelectedArticleCategory] = useState<string>('todos');
  const [expandedArticle, setExpandedArticle] = useState<string | null>('Artículo 7');

  // States for Procedures Guide
  const [selectedProcedureId, setSelectedProcedureId] = useState<string>(LEARNER_PROCEDURES[0].id);

  // States for Due Process Tracker
  const [selectedStepNumber, setSelectedStepNumber] = useState<number>(1);

  // Filtered cases
  const filteredCases = REGULATION_CASES.filter((c) => {
    if (selectedCaseFilter === 'todos') return true;
    return c.category === selectedCaseFilter;
  });

  const activeCase: DilemmaCase = filteredCases[currentCaseIndex] || filteredCases[0] || REGULATION_CASES[0];

  const handleSelectCaseOption = (idx: number) => {
    if (showFeedback) return;
    setSelectedOption(idx);
    setShowFeedback(true);

    const isCorrect = activeCase.options[idx].isCorrect;
    if (isCorrect && !caseScores[activeCase.id]) {
      setScore((prev) => prev + 1);
      setCaseScores((prev) => ({ ...prev, [activeCase.id]: true }));
    } else if (!caseScores[activeCase.id]) {
      setCaseScores((prev) => ({ ...prev, [activeCase.id]: false }));
    }
  };

  const handleNextCase = () => {
    if (currentCaseIndex < filteredCases.length - 1) {
      setCurrentCaseIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  const handlePrevCase = () => {
    if (currentCaseIndex > 0) {
      setCurrentCaseIndex((prev) => prev - 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  const handleResetCases = () => {
    setCurrentCaseIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setCaseScores({});
  };

  // Filtered articles
  const filteredArticles = REGULATION_ARTICLES.filter((item) => {
    const matchesCat = selectedArticleCategory === 'todos' || item.category === selectedArticleCategory;
    const matchesQuery =
      item.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keyRule.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const activeProcedure: LearnerProcedure =
    LEARNER_PROCEDURES.find((p) => p.id === selectedProcedureId) || LEARNER_PROCEDURES[0];

  const activeDueProcessStep: DueProcessStep =
    DUE_PROCESS_STEPS.find((s) => s.step === selectedStepNumber) || DUE_PROCESS_STEPS[0];

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* Header Banner */}
      <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-6 md:p-8 shadow-2xl transition-colors duration-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#2d145c]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00f2fe] mb-1">
              <Scale className="w-4 h-4 text-[#00f2fe]" />
              <span>Reglamento del Aprendiz SENA · Acuerdo 007 de 2012</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Marco Normativo, Convivencia y Garantías
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Comprende a fondo tus derechos, deberes fundamentales, prohibiciones, trámites de novedades, incapacidades médicas (EPS), contrato de aprendizaje (Ley 789), representación en eventos de innovación y el debido proceso ante el Comité de Evaluación.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 bg-[#200a42]/80 rounded-xl border border-[#482087] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00f2fe]/20 text-[#00f2fe] flex items-center justify-center font-bold text-xs font-mono">
                {score}
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Dilemas Resueltos</span>
                <span className="text-xs font-bold text-white">{score} de {REGULATION_CASES.length} superados</span>
              </div>
            </div>

            {onGoToExam && (
              <button
                onClick={onGoToExam}
                className="px-4 py-2.5 bg-gradient-to-r from-[#ff2a85] to-[#7f00ff] hover:brightness-110 text-white rounded-xl font-mono font-bold text-xs shadow-[0_0_15px_rgba(255,42,133,0.35)] flex items-center gap-2 cursor-pointer transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>IR A EVALUACIÓN (35 PREGUNTAS)</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Interactive Hub Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-6">
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-4 py-3 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'cases'
                ? 'bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-[#0a0317] shadow-lg shadow-[#00f2fe]/20'
                : 'bg-[#1b083b]/60 text-slate-300 hover:bg-[#270e54] border border-[#37166e]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>1. CASOS Y DILEMAS ({REGULATION_CASES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-3 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'articles'
                ? 'bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-[#0a0317] shadow-lg shadow-[#00f2fe]/20'
                : 'bg-[#1b083b]/60 text-slate-300 hover:bg-[#270e54] border border-[#37166e]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>2. COMPENDIO DE ARTÍCULOS</span>
          </button>

          <button
            onClick={() => setActiveTab('procedures')}
            className={`px-4 py-3 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'procedures'
                ? 'bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-[#0a0317] shadow-lg shadow-[#00f2fe]/20'
                : 'bg-[#1b083b]/60 text-slate-300 hover:bg-[#270e54] border border-[#37166e]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>3. GUÍA DE TRÁMITES ({LEARNER_PROCEDURES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('due_process')}
            className={`px-4 py-3 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'due_process'
                ? 'bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-[#0a0317] shadow-lg shadow-[#00f2fe]/20'
                : 'bg-[#1b083b]/60 text-slate-300 hover:bg-[#270e54] border border-[#37166e]'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>4. DEBIDO PROCESO (5 ETAPAS)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SIMULADOR DE DILEMAS Y CASOS REALES */}
      {/* ========================================================================= */}
      {activeTab === 'cases' && (
        <div className="space-y-6">
          
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-mono text-[11px] shrink-0 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-[#00f2fe]" /> Filtrar por tema:
            </span>
            {[
              { id: 'todos', label: 'Todos los casos' },
              { id: 'salud', label: 'Incapacidades & Salud' },
              { id: 'academico', label: 'Académico, Zajuna & IA' },
              { id: 'contrato', label: 'Contrato Aprendizaje' },
              { id: 'innovacion', label: 'SenaSoft & SENNOVA' },
              { id: 'debido_proceso', label: 'Debido Proceso' },
              { id: 'convivencia', label: 'Convivencia & SST' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setSelectedCaseFilter(f.id);
                  setCurrentCaseIndex(0);
                  setSelectedOption(null);
                  setShowFeedback(false);
                }}
                className={`px-3 py-1.5 rounded-full font-mono font-medium transition-all cursor-pointer whitespace-nowrap text-[11px] ${
                  selectedCaseFilter === f.id
                    ? 'bg-[#00f2fe] text-[#090317] font-bold shadow-xs'
                    : 'bg-[#1e0a3d] text-slate-300 hover:bg-[#2b1057] border border-[#3c1775]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Dilemma Card */}
          <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-6 md:p-8 shadow-2xl space-y-6">
            
            {/* Top Bar of the Case */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#2d145c] gap-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 bg-[#00f2fe]/20 text-[#00f2fe] text-[11px] font-mono font-bold rounded-md border border-[#00f2fe]/40">
                  Dilema #{activeCase.id}
                </span>
                {activeCase.badge && (
                  <span className="px-2.5 py-1 bg-[#ff2a85]/20 text-[#ff77b4] text-[11px] font-mono font-bold rounded-md border border-[#ff2a85]/40">
                    {activeCase.badge}
                  </span>
                )}
                <span className="text-xs text-slate-400">
                  Caso {currentCaseIndex + 1} de {filteredCases.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevCase}
                  disabled={currentCaseIndex === 0}
                  className="px-3 py-1 bg-[#1e0a3d] hover:bg-[#2c1059] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-xs font-mono text-slate-300 transition-colors cursor-pointer"
                >
                  Anterior
                </button>
                <button
                  onClick={handleNextCase}
                  disabled={currentCaseIndex === filteredCases.length - 1}
                  className="px-3 py-1 bg-[#1e0a3d] hover:bg-[#2c1059] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-xs font-mono text-slate-300 transition-colors cursor-pointer"
                >
                  Siguiente
                </button>
                <button
                  onClick={handleResetCases}
                  className="p-1.5 bg-[#1e0a3d] hover:bg-[#2c1059] text-slate-300 rounded-lg transition-colors cursor-pointer"
                  title="Reiniciar simulador"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Situation Header */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {activeCase.title}
              </h3>
              <p className="text-sm text-slate-300 mt-3 p-4 bg-[#14062a] rounded-xl border border-[#3b1774] leading-relaxed">
                {activeCase.situation}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00f2fe] block">
                ¿Cuál es la actuación reglamentaria correcta según el Acuerdo 007 de 2012?
              </span>

              {activeCase.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let optStyle =
                  'bg-[#190736] hover:bg-[#250d4d] border-[#3e197a] text-slate-200';

                if (showFeedback) {
                  if (opt.isCorrect) {
                    optStyle =
                      'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/30';
                  } else if (isSelected && !opt.isCorrect) {
                    optStyle =
                      'bg-rose-950/70 border-rose-500 text-rose-200 shadow-md shadow-rose-900/30';
                  } else {
                    optStyle = 'bg-[#15052e]/50 border-slate-800 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectCaseOption(idx)}
                    disabled={showFeedback}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all duration-200 flex items-start gap-3 cursor-pointer ${optStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-mono font-bold border border-current mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt.text}</span>
                    {showFeedback && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {showFeedback && isSelected && !opt.isCorrect && (
                      <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Regulation Article Explanation */}
            {showFeedback && selectedOption !== null && (
              <div
                className={`p-5 rounded-xl border space-y-3 animate-fade-in ${
                  activeCase.options[selectedOption].isCorrect
                    ? 'bg-emerald-950/50 border-emerald-600/70 text-emerald-100'
                    : 'bg-rose-950/50 border-rose-600/70 text-rose-100'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {activeCase.options[selectedOption].isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>¡Respuesta Reglamentaria Correcta!</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-rose-400" />
                      <span>Actuación Inexacta o Contraria a la Norma</span>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-sm leading-relaxed">
                  {activeCase.options[selectedOption].feedback}
                </p>

                <div className="pt-2 border-t border-current/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#00f2fe]" />
                    <span className="text-slate-300">
                      Fundamento Normativo: <strong className="text-white">{activeCase.options[selectedOption].regulationRef}</strong>
                    </span>
                  </div>

                  {currentCaseIndex < filteredCases.length - 1 && (
                    <button
                      onClick={handleNextCase}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00f2fe] text-[#090317] font-bold rounded-lg hover:bg-[#38f8ff] transition-colors cursor-pointer"
                    >
                      <span>Siguiente Caso</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: COMPENDIO NORMATIVO POR ARTÍCULOS */}
      {/* ========================================================================= */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          
          {/* Search & Category Filter */}
          <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-5 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por artículo, término clave (ej. incapacidad, plagio, carné, comité, contrato)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#17062f] border border-[#482087] rounded-xl text-xs sm:text-sm font-mono text-white placeholder:text-slate-400 focus:outline-none focus:border-[#00f2fe]"
                />
                <Search className="w-4 h-4 text-[#00f2fe] absolute left-3.5 top-3 pointer-events-none" />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>{filteredArticles.length} artículos encontrados</span>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'derechos', label: 'Derechos & Estímulos' },
                { id: 'deberes', label: 'Deberes & SST' },
                { id: 'prohibiciones', label: 'Prohibiciones' },
                { id: 'tramites', label: 'Trámites & Novedades' },
                { id: 'faltas', label: 'Faltas & Sanciones' },
                { id: 'debido_proceso', label: 'Debido Proceso' },
                { id: 'representacion', label: 'Representatividad' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedArticleCategory(c.id)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                    selectedArticleCategory === c.id
                      ? 'bg-[#00f2fe] text-[#090317] font-bold shadow-xs'
                      : 'bg-[#1b083b] text-slate-300 hover:bg-[#280e54] border border-[#3c1775]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((art) => {
              const isExpanded = expandedArticle === art.article;

              return (
                <div
                  key={art.article}
                  className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-5 shadow-xl space-y-3 transition-all hover:border-[#00f2fe]/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-[#00f2fe]/20 text-[#00f2fe] text-[10px] font-mono font-bold rounded">
                          {art.chapter}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-slate-400">
                          {art.article}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {art.title}
                      </h4>
                    </div>

                    <span className="px-2 py-1 rounded bg-[#2a1054] text-[10px] font-mono uppercase text-slate-300 border border-[#482087] shrink-0">
                      {art.category}
                    </span>
                  </div>

                  <div className="p-3 bg-[#130528] rounded-xl border border-[#391570] text-xs text-slate-200 leading-relaxed font-mono">
                    <strong className="text-[#00f2fe] block mb-1">Regla de Oro:</strong>
                    {art.keyRule}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {art.content}
                  </p>

                  {art.practicalTip && (
                    <div className="pt-2 border-t border-[#2d145c] flex items-start gap-2 text-[11px] text-amber-300/90">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Consejo para el Aprendiz:</strong> {art.practicalTip}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: GUÍAS DE TRÁMITES Y NOVEDADES DEL APRENDIZ */}
      {/* ========================================================================= */}
      {activeTab === 'procedures' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Procedures Selector Column */}
            <div className="space-y-3 lg:col-span-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00f2fe] block mb-2">
                Selecciona el trámite a consultar:
              </span>

              {LEARNER_PROCEDURES.map((p) => {
                const isSelected = p.id === selectedProcedureId;

                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProcedureId(p.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#2a0e5c] to-[#1c0840] border-[#00f2fe] text-white shadow-lg'
                        : 'bg-[#190736] hover:bg-[#230b4b] border-[#391570] text-slate-300'
                    }`}
                  >
                    <div>
                      <span className="px-2 py-0.5 bg-[#00f2fe]/20 text-[#00f2fe] text-[10px] font-mono font-bold rounded">
                        {p.badge}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1.5">
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                        {p.triggerCondition}
                      </p>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'rotate-90 text-[#00f2fe]' : 'text-slate-500'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Procedure Detail View */}
            <div className="lg:col-span-2 cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-6 md:p-8 shadow-2xl space-y-6">
              
              <div className="border-b border-[#2d145c] pb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-1 bg-[#00f2fe]/20 text-[#00f2fe] text-xs font-mono font-bold rounded-md border border-[#00f2fe]/40">
                    {activeProcedure.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeProcedure.regulationRef}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {activeProcedure.title}
                </h3>
              </div>

              {/* Conditions and Deadlines Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#130528] rounded-xl border border-[#3b1774]">
                  <span className="text-[10px] font-mono uppercase text-[#00f2fe] font-bold block mb-1">
                    Causal o Situación:
                  </span>
                  <p className="text-slate-200">{activeProcedure.triggerCondition}</p>
                </div>

                <div className="p-3 bg-[#130528] rounded-xl border border-[#3b1774]">
                  <span className="text-[10px] font-mono uppercase text-[#ff2a85] font-bold block mb-1">
                    Plazo Máximo Improrrogable:
                  </span>
                  <p className="text-slate-200">{activeProcedure.deadlines}</p>
                </div>
              </div>

              {/* Step by Step Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Pasos Oficiales del Procedimiento:
                </h4>

                <div className="space-y-2.5">
                  {activeProcedure.steps.map((st, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 bg-[#17062f] rounded-xl border border-[#3f197d] flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#00f2fe]/20 text-[#00f2fe] font-mono font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                        {sIdx + 1}
                      </div>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Tip */}
              <div className="p-4 bg-gradient-to-r from-[#200940] to-[#140529] rounded-xl border border-[#6b2ebd]/50 text-xs text-amber-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white mb-0.5">Advertencia Reglamentaria:</strong>
                  {activeProcedure.legalTip}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: DEBIDO PROCESO Y COMITÉ DE EVALUACIÓN (5 ETAPAS) */}
      {/* ========================================================================= */}
      {activeTab === 'due_process' && (
        <div className="space-y-6">
          
          <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-6 md:p-8 shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00f2fe] block mb-1">
                Capítulo VIII · Artículos 30 al 34 del Acuerdo 007 de 2012
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Flujograma del Debido Proceso y Comité de Evaluación
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Ningún aprendiz del SENA puede ser objeto de sanción sin que se surta el debido proceso constitucional. Haz clic en cada etapa para conocer plazos perentorios, derechos y actores involucrados.
              </p>
            </div>

            {/* Stepper Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
              {DUE_PROCESS_STEPS.map((s) => {
                const isSelected = s.step === selectedStepNumber;

                return (
                  <button
                    key={s.step}
                    onClick={() => setSelectedStepNumber(s.step)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#00f2fe]/20 to-[#2c0e5e] border-[#00f2fe] text-white shadow-lg'
                        : 'bg-[#190736] hover:bg-[#250d4f] border-[#391570] text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="w-5 h-5 rounded-full bg-[#00f2fe]/20 text-[#00f2fe] text-xs font-mono font-bold flex items-center justify-center">
                        {s.step}
                      </span>
                      <span className="text-[10px] font-mono text-[#00f2fe]">
                        Paso {s.step}
                      </span>
                    </div>
                    <span className="text-xs font-bold block text-white line-clamp-1">
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Step Detailed Card */}
            <div className="p-6 bg-[#130528] rounded-xl border border-[#441a87] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2d145c] pb-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#00f2fe]">
                    {activeDueProcessStep.phase}
                  </span>
                  <h4 className="text-lg font-bold text-white mt-0.5">
                    {activeDueProcessStep.title}
                  </h4>
                </div>

                <div className="px-3.5 py-1.5 bg-[#250b4a] rounded-lg border border-[#4d2094] text-xs font-mono text-amber-300 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Plazo: <strong>{activeDueProcessStep.timeLimit}</strong></span>
                </div>
              </div>

              {/* Actors */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-slate-400 font-mono text-[11px]">Actores que intervienen:</span>
                {activeDueProcessStep.actors.map((actor, aIdx) => (
                  <span
                    key={aIdx}
                    className="px-2.5 py-1 bg-[#200a40] text-slate-200 rounded-md border border-[#3b1772] font-mono text-[11px]"
                  >
                    {actor}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#190736] p-4 rounded-xl border border-[#37166e]">
                {activeDueProcessStep.description}
              </p>

              {/* Apprentice Rights in this phase */}
              <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-600/50 text-xs text-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-emerald-100 font-bold mb-0.5">Garantía y Derecho del Aprendiz:</strong>
                  {activeDueProcessStep.apprenticeRights}
                </div>
              </div>

              {/* Stepper Navigation */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setSelectedStepNumber((prev) => Math.max(1, prev - 1))}
                  disabled={selectedStepNumber === 1}
                  className="px-4 py-2 bg-[#1b083b] hover:bg-[#280e54] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-xs font-mono text-slate-300 transition-colors cursor-pointer"
                >
                  ← Etapa Anterior
                </button>

                <button
                  onClick={() => setSelectedStepNumber((prev) => Math.min(5, prev + 1))}
                  disabled={selectedStepNumber === 5}
                  className="px-4 py-2 bg-[#00f2fe] text-[#090317] font-bold hover:bg-[#38f8ff] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-xs font-mono transition-colors cursor-pointer"
                >
                  Siguiente Etapa →
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
