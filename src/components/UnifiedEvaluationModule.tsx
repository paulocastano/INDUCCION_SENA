import React, { useState, useEffect, useRef } from 'react';
import { ApprenticeProfile, ExamAnswerRecord } from '../types/induction';
import {
  REGULATION_SECTIONS,
  REGULATION_SECTION_QUESTIONS,
  RegulationExamQuestion,
  RegulationSectionInfo
} from '../data/regulationExamData';
import {
  COLOMBIAN_REGIONALS,
  SAMPLE_CENTERS,
  SAMPLE_PROGRAMS
} from '../data/senaInductionData';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Clock,
  Zap,
  Flame,
  Trophy,
  Scale,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  User,
  Mail,
  Hash,
  BookOpen,
  ArrowRight,
  Check,
  RefreshCw,
  FileSpreadsheet,
  Download,
  Share2,
  ExternalLink,
  Volume2,
  VolumeX,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface UnifiedEvaluationModuleProps {
  profile: ApprenticeProfile;
  onUpdateProfile: (updated: ApprenticeProfile) => void;
  onPassExam: (scorePct: number) => void;
  onViewCertificate: () => void;
  onGoToAdmin?: () => void;
}

interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  maskedDocument: string;
  ficha: string;
  program: string;
  regional: string;
  finalExamScore: number;
  totalGamifiedPoints: number;
  timeTakenSeconds: number;
  streakMax: number;
  status: string;
}

export const UnifiedEvaluationModule: React.FC<UnifiedEvaluationModuleProps> = ({
  profile,
  onUpdateProfile,
  onPassExam,
  onViewCertificate,
  onGoToAdmin
}) => {
  // Navigation phase: 'registration' | 'testing' | 'results' | 'leaderboard'
  const [phase, setPhase] = useState<'registration' | 'testing' | 'results' | 'leaderboard'>('registration');

  // Learner input form state (matching spreadsheet columns)
  const [formData, setFormData] = useState({
    name: profile.name || '',
    documentType: profile.documentType || 'CC',
    documentNumber: profile.documentNumber || '',
    ficha: profile.ficha || '2874102',
    email: profile.email || 'aprendiz@misena.edu.co',
    program: profile.program || SAMPLE_PROGRAMS[0],
    programType: profile.programType || 'Tecnólogo',
    regional: profile.regional || 'Antioquia',
    center: profile.center || SAMPLE_CENTERS[0]
  });

  // Test question states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<Set<number>>(new Set());
  
  // Real-time chronometers
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [questionSeconds, setQuestionSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Gamification metrics
  const [points, setPoints] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [speedBonusesEarned, setSpeedBonusesEarned] = useState<number>(0);
  const [recentAnswerFeedback, setRecentAnswerFeedback] = useState<{
    qId: number;
    isCorrect: boolean;
    speedBonus: number;
    timeSpent: number;
  } | null>(null);

  // Answer records log for spreadsheet sync
  const [answerLogs, setAnswerLogs] = useState<ExamAnswerRecord[]>([]);

  // Sound effects toggle
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Leaderboard data from backend
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState<boolean>(false);
  const [isSubmittingToCloud, setIsSubmittingToCloud] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  // Filter for sections in test
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('all');

  // Questions to display based on filter
  const activeQuestions = selectedSectionFilter === 'all'
    ? REGULATION_SECTION_QUESTIONS
    : REGULATION_SECTION_QUESTIONS.filter((q) => q.sectionId === selectedSectionFilter);

  const currentQ: RegulationExamQuestion = activeQuestions[currentQuestionIndex] || activeQuestions[0];
  const currentSection = REGULATION_SECTIONS.find((s) => s.id === currentQ.sectionId) || REGULATION_SECTIONS[0];

  // Sound synthesis utility using Web Audio API
  const playSoundEffect = (type: 'correct' | 'wrong' | 'complete') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'correct') {
        // High, cheerful ascending chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'wrong') {
        // Gentle low educational chord
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'complete') {
        // Fanfare chord
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.08 + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.45);
        });
      }
    } catch {
      // Audio fallback
    }
  };

  // Stopwatch timer effect
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTotalSeconds((prev) => prev + 1);
        setQuestionSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  // Fetch leaderboard from server
  const loadLeaderboard = async () => {
    setIsLoadingLeaderboard(true);
    try {
      const res = await fetch('/api/induction/leaderboard');
      if (res.ok) {
        const data = await res.json();
        if (data.leaderboard && Array.isArray(data.leaderboard)) {
          setLeaderboard(data.leaderboard);
        }
      }
    } catch (err) {
      console.warn('Could not load leaderboard:', err);
    } finally {
      setIsLoadingLeaderboard(false);
    }
  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  // Format seconds into MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  };

  // Start exam from registration
  const handleStartExam = () => {
    // Sync profile
    const updated: ApprenticeProfile = {
      ...profile,
      name: formData.name.trim(),
      documentType: formData.documentType as any,
      documentNumber: formData.documentNumber.trim(),
      ficha: formData.ficha.trim(),
      email: formData.email.trim(),
      program: formData.program,
      programType: formData.programType as any,
      regional: formData.regional,
      center: formData.center
    };
    onUpdateProfile(updated);

    // Reset test metrics
    setAnswers({});
    setAnsweredQuestionIds(new Set());
    setAnswerLogs([]);
    setCurrentQuestionIndex(0);
    setTotalSeconds(0);
    setQuestionSeconds(0);
    setPoints(0);
    setStreak(0);
    setMaxStreak(0);
    setSpeedBonusesEarned(0);
    setRecentAnswerFeedback(null);
    setIsTimerRunning(true);
    setPhase('testing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select option for current question
  const handleAnswerSelect = (optionIndex: number) => {
    if (answers[currentQ.id] !== undefined) return; // Already answered

    const timeSpent = questionSeconds;
    const isCorrect = optionIndex === currentQ.correctIndex;
    
    // Calculate speed bonus: max +50 pts if under 10s, +30 if under 20s, +15 if under 30s
    let speedBonus = 0;
    if (isCorrect) {
      if (timeSpent <= 8) speedBonus = 50;
      else if (timeSpent <= 15) speedBonus = 35;
      else if (timeSpent <= 25) speedBonus = 20;
      else speedBonus = 10;
    }

    // Streak bonus
    const newStreak = isCorrect ? streak + 1 : 0;
    const streakBonus = isCorrect ? Math.min(newStreak * 10, 50) : 0;

    const basePoints = isCorrect ? 100 : 0;
    const roundPoints = basePoints + speedBonus + streakBonus;

    setAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }));
    setAnsweredQuestionIds((prev) => new Set([...prev, currentQ.id]));
    setPoints((prev) => prev + roundPoints);
    setStreak(newStreak);
    if (newStreak > maxStreak) setMaxStreak(newStreak);
    if (speedBonus > 0) setSpeedBonusesEarned((prev) => prev + speedBonus);

    // Record answer log for spreadsheet
    const newLog: ExamAnswerRecord = {
      questionId: currentQ.id,
      sectionId: currentQ.sectionId,
      sectionTitle: currentQ.sectionTitle,
      articleRef: currentQ.articleRef,
      questionText: currentQ.question,
      selectedOptionIndex: optionIndex,
      selectedOptionText: currentQ.options[optionIndex],
      correctOptionIndex: currentQ.correctIndex,
      isCorrect,
      explanation: isCorrect ? currentQ.positiveReinforcement : currentQ.mistakeAnalysis,
      positiveFeedback: currentQ.positiveReinforcement,
      mistakeAnalysis: currentQ.mistakeAnalysis,
      timeSpentSeconds: timeSpent
    };

    setAnswerLogs((prev) => [...prev.filter((l) => l.questionId !== currentQ.id), newLog]);

    setRecentAnswerFeedback({
      qId: currentQ.id,
      isCorrect,
      speedBonus,
      timeSpent
    });

    if (isCorrect) {
      playSoundEffect('correct');
      // Gentle micro-confetti for streak >= 3
      if (newStreak >= 3) {
        try {
          confetti({
            particleCount: 25,
            spread: 50,
            origin: { y: 0.7 }
          });
        } catch {}
      }
    } else {
      playSoundEffect('wrong');
    }
  };

  // Advance to next question or complete test
  const handleNextQuestion = () => {
    setQuestionSeconds(0);
    setRecentAnswerFeedback(null);

    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleFinishExam();
    }
  };

  // Complete the evaluation and calculate full score
  const handleFinishExam = async () => {
    setIsTimerRunning(false);
    playSoundEffect('complete');

    // Calculate score
    const totalQ = activeQuestions.length;
    const correctCount = Object.entries(answers).filter(([qId, selectedIdx]) => {
      const q = REGULATION_SECTION_QUESTIONS.find((item) => item.id === Number(qId));
      return q && selectedIdx === q.correctIndex;
    }).length;

    const scorePct = Math.round((correctCount / totalQ) * 100);
    const passed = scorePct >= 70;

    // Breakdown per section
    const sectionBreakdown: Record<string, { correct: number; total: number; scorePct: number }> = {};
    REGULATION_SECTIONS.forEach((sec) => {
      const secQuestions = REGULATION_SECTION_QUESTIONS.filter((q) => q.sectionId === sec.id);
      const secCorrect = secQuestions.filter((q) => answers[q.id] === q.correctIndex).length;
      sectionBreakdown[sec.id] = {
        correct: secCorrect,
        total: secQuestions.length,
        scorePct: Math.round((secCorrect / (secQuestions.length || 1)) * 100)
      };
    });

    const certId = `SENA-IND-${(formData.regional || 'ANT').substring(0, 3).toUpperCase()}-2026-${String(formData.documentNumber).slice(-4)}`;

    // Update profile
    const updatedProfile: ApprenticeProfile = {
      ...profile,
      finalExamScore: scorePct,
      totalGamifiedPoints: points,
      timeTakenSeconds: totalSeconds,
      inductionCompleted: passed,
      completionDate: new Date().toISOString().split('T')[0],
      certificateId: certId
    };
    onUpdateProfile(updatedProfile);

    if (passed) {
      onPassExam(scorePct);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}
    }

    // Submit to server backend (Hoja de cálculo / Persistent Store)
    setIsSubmittingToCloud(true);
    try {
      const response = await fetch('/api/induction/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          documentType: formData.documentType,
          documentNumber: formData.documentNumber,
          ficha: formData.ficha,
          email: formData.email,
          program: formData.program,
          programType: formData.programType,
          regional: formData.regional,
          center: formData.center,
          completedStationsCount: 5,
          completedStations: [1, 2, 3, 4, 5],
          finalExamScore: scorePct,
          totalGamifiedPoints: points,
          timeTakenSeconds: totalSeconds,
          speedBonusTotal: speedBonusesEarned,
          streakMax: maxStreak,
          accuracyPct: scorePct,
          sectionBreakdown,
          status: passed ? 'Aprobado' : 'En Proceso',
          certificateId: certId,
          detailedAnswers: answerLogs,
          notes: `Evaluación unificada del reglamento SENA: ${correctCount}/${totalQ} aciertos en ${formatTime(totalSeconds)}`
        })
      });

      if (response.ok) {
        setSubmissionSuccess(true);
        loadLeaderboard();
      }
    } catch (err) {
      console.warn('Could not post to /api/induction/submit:', err);
    } finally {
      setIsSubmittingToCloud(false);
    }

    setPhase('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Restart / Retake test
  const handleRestart = () => {
    setAnswers({});
    setAnsweredQuestionIds(new Set());
    setAnswerLogs([]);
    setCurrentQuestionIndex(0);
    setTotalSeconds(0);
    setQuestionSeconds(0);
    setPoints(0);
    setStreak(0);
    setMaxStreak(0);
    setSpeedBonusesEarned(0);
    setRecentAnswerFeedback(null);
    setSubmissionSuccess(false);
    setIsTimerRunning(true);
    setPhase('testing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate results statistics
  const totalQuestionsCount = activeQuestions.length;
  const correctCount = Object.entries(answers).filter(([qId, idx]) => {
    const q = REGULATION_SECTION_QUESTIONS.find((item) => item.id === Number(qId));
    return q && idx === q.correctIndex;
  }).length;
  const finalScorePct = totalQuestionsCount > 0 ? Math.round((correctCount / totalQuestionsCount) * 100) : 0;
  const isPassed = finalScorePct >= 70;

  // Active question feedback state
  const isCurrentAnswered = answers[currentQ.id] !== undefined;
  const currentSelectedOption = answers[currentQ.id];
  const isCurrentCorrect = isCurrentAnswered && currentSelectedOption === currentQ.correctIndex;

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* ======================================================== */}
      {/* TOP HEADER: Unified Module Banner                         */}
      {/* ======================================================== */}
      <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/70 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-gradient-to-br from-[#00f2fe]/10 via-[#7f00ff]/20 to-[#ff2a85]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00f2fe] mb-1.5">
              <Scale className="w-4 h-4 text-[#00f2fe]" />
              <span>Módulo Unificado de Evaluación Institucional · Acuerdo 007 de 2012</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Evaluación Gamificada del Aprendiz SENA</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/40 font-mono font-bold hidden sm:inline-block">
                35 Preguntas (5 por Sección)
              </span>
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Mide tu apropiación del Reglamento del Aprendiz con retroalimentación inmediata, reloj de precisión temporal, bonificaciones por velocidad y un ranking gamificado institucional guardado directamente en la base de datos oficial.
            </p>
          </div>

          {/* Quick tab switcher & sound toggle */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-[#1e0a40]/90 p-1 rounded-xl border border-[#481c8f] flex items-center text-xs font-mono">
              <button
                onClick={() => setPhase('registration')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  phase === 'registration'
                    ? 'bg-[#00f2fe] text-[#0b031c] font-bold shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                1. Registro
              </button>
              <button
                onClick={() => {
                  if (answeredQuestionIds.size > 0 || isTimerRunning) setPhase('testing');
                  else handleStartExam();
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  phase === 'testing'
                    ? 'bg-[#00f2fe] text-[#0b031c] font-bold shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                2. Evaluación
              </button>
              <button
                onClick={() => setPhase('leaderboard')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  phase === 'leaderboard'
                    ? 'bg-[#ff2a85] text-white font-bold shadow-[0_0_12px_rgba(255,42,133,0.4)]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-amber-300" />
                <span>3. Ranking</span>
              </button>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Silenciar efectos de sonido' : 'Activar efectos de sonido'}
              className="p-2.5 rounded-xl bg-[#250d4a] hover:bg-[#351466] border border-[#481c8f] text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00f2fe]" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* PHASE 1: REGISTRATION / LEARNER DATA INPUT               */}
      {/* ======================================================== */}
      {phase === 'registration' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Registration Form */}
          <div className="lg:col-span-8 cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#2d145c] pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-[#00f2fe] font-bold tracking-wider">Paso 1 de 3</span>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Datos del Aprendiz para la Hoja Oficial de Resultados
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Esta información se vinculará a tus respuestas, tiempo registrado y ranking institucional.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#200a42] border border-[#482087] text-xs font-mono text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Acceso Seguro Aprendiz</span>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleStartExam();
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Nombre Completo */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#00f2fe]" />
                    <span>Nombres y Apellidos Completos *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej: Alejandro Morales Gómez"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#190833] border border-[#3b1d75] text-white text-xs font-sans placeholder-slate-500 focus:outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe] transition-all"
                  />
                </div>

                {/* Correo Electrónico */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#00f2fe]" />
                    <span>Correo Institucional / Personal *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="amorales@misena.edu.co"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#190833] border border-[#3b1d75] text-white text-xs font-sans placeholder-slate-500 focus:outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe] transition-all"
                  />
                </div>

                {/* Tipo de Documento */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-semibold">
                    Tipo de Documento *
                  </label>
                  <select
                    value={formData.documentType}
                    onChange={(e) => setFormData({ ...formData, documentType: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#190833] border border-[#3b1d75] text-white text-xs font-sans focus:outline-none focus:border-[#00f2fe] transition-all"
                  >
                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                    <option value="TI">Tarjeta de Identidad (TI)</option>
                    <option value="CE">Cédula de Extranjería (CE)</option>
                    <option value="PEP">Permiso Especial / PPT</option>
                  </select>
                </div>

                {/* Número de Documento */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-semibold">
                    Número de Documento *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.documentNumber}
                    onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                    placeholder="1020456789"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#190833] border border-[#3b1d75] text-white text-xs font-sans placeholder-slate-500 focus:outline-none focus:border-[#00f2fe] transition-all"
                  />
                </div>

                {/* Ficha de Caracterización */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-amber-400" />
                    <span>Número de Ficha / Código de Matrícula *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ficha}
                    onChange={(e) => setFormData({ ...formData, ficha: e.target.value })}
                    placeholder="Ej: 2874102"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#190833] border border-[#3b1d75] text-white text-xs font-mono placeholder-slate-500 focus:outline-none focus:border-[#00f2fe] transition-all"
                  />
                </div>

                {/* Nivel de Formación */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-semibold">
                    Nivel del Programa *
                  </label>
                  <select
                    value={formData.programType}
                    onChange={(e) => setFormData({ ...formData, programType: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#190833] border border-[#3b1d75] text-white text-xs font-sans focus:outline-none focus:border-[#00f2fe] transition-all"
                  >
                    <option value="Tecnólogo">Tecnólogo</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Operario">Operario / Auxiliar</option>
                    <option value="Especialización Tecnológica">Especialización Tecnológica</option>
                  </select>
                </div>

                {/* Programa de Formación */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#00f2fe]" />
                    <span>Programa de Formación *</span>
                  </label>
                  <input
                    list="programs-list"
                    type="text"
                    required
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    placeholder="Selecciona o escribe tu programa..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#190833] border border-[#3b1d75] text-white text-xs font-sans placeholder-slate-500 focus:outline-none focus:border-[#00f2fe] transition-all"
                  />
                  <datalist id="programs-list">
                    {SAMPLE_PROGRAMS.map((prog, idx) => (
                      <option key={idx} value={prog} />
                    ))}
                  </datalist>
                </div>

                {/* Regional */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-semibold">
                    Regional SENA *
                  </label>
                  <select
                    value={formData.regional}
                    onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#190833] border border-[#3b1d75] text-white text-xs font-sans focus:outline-none focus:border-[#00f2fe] transition-all"
                  >
                    {COLOMBIAN_REGIONALS.map((reg, idx) => (
                      <option key={idx} value={reg}>{reg}</option>
                    ))}
                  </select>
                </div>

                {/* Centro de Formación */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-semibold">
                    Centro de Formación *
                  </label>
                  <input
                    list="centers-list"
                    type="text"
                    required
                    value={formData.center}
                    onChange={(e) => setFormData({ ...formData, center: e.target.value })}
                    placeholder="Centro de Formación..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#190833] border border-[#3b1d75] text-white text-xs font-sans placeholder-slate-500 focus:outline-none focus:border-[#00f2fe] transition-all"
                  />
                  <datalist id="centers-list">
                    {SAMPLE_CENTERS.map((c, idx) => (
                      <option key={idx} value={c} />
                    ))}
                  </datalist>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#2d145c]">
                <div className="text-xs text-slate-400 font-mono">
                  ⏱ El reloj comenzará a contar automáticamente al presionar iniciar.
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#00f2fe] via-[#7f00ff] to-[#ff2a85] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Iniciar Evaluación y Cronómetro</span>
                </button>
              </div>
            </form>
          </div>

          {/* Side Info Panel: Structure & Rules */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Gamification Rules Card */}
            <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Sistema de Puntuación Gamificada</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#1f0b3d]/80 border border-[#482087] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                    +100
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Acierto Normativo</h4>
                    <p className="text-slate-300 text-[11px] mt-0.5">100 puntos base por cada respuesta correcta.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#1f0b3d]/80 border border-[#482087] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00f2fe]/20 text-[#00f2fe] flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                    +50
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Bono de Velocidad</h4>
                    <p className="text-slate-300 text-[11px] mt-0.5">Hasta +50 puntos extras por responder en menos de 10 segundos.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#1f0b3d]/80 border border-[#482087] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#ff2a85]/20 text-[#ff2a85] flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                    🔥
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Racha Imparable</h4>
                    <p className="text-slate-300 text-[11px] mt-0.5">Multiplicadores acumulativos al encadenar respuestas sin errores.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#1f0b3d]/80 border border-[#482087] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                    70%
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Criterio de Certificación</h4>
                    <p className="text-slate-300 text-[11px] mt-0.5">Mínimo 70% de aciertos para expedir el Diploma Oficial.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sections Summary */}
            <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-6 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase text-[#00f2fe] tracking-wider">
                7 Secciones del Reglamento Incluidas
              </h3>
              <div className="space-y-1.5 text-xs text-slate-300">
                {REGULATION_SECTIONS.map((sec) => (
                  <div key={sec.id} className="flex items-center justify-between py-1 border-b border-[#2d145c]/50">
                    <span className="truncate pr-2">{sec.number}. {sec.title}</span>
                    <span className="font-mono text-[10px] text-cyan-300 font-bold shrink-0">5 preguntas</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* PHASE 2: TESTING MODE (CHRONOMETER & LIVE REINFORCEMENT) */}
      {/* ======================================================== */}
      {phase === 'testing' && (
        <div className="space-y-6">
          
          {/* Live Chronometer & Gamification HUD Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            
            {/* Total Chronometer */}
            <div className="cyber-glass-panel rounded-xl border border-[#3b1d75]/80 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00f2fe]/20 text-[#00f2fe] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Tiempo Total</span>
                <span className="text-lg sm:text-xl font-mono font-extrabold text-[#00f2fe] tabular-nums">
                  {formatTime(totalSeconds)}
                </span>
              </div>
            </div>

            {/* Per-Question Stopwatch */}
            <div className="cyber-glass-panel rounded-xl border border-[#3b1d75]/80 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">En esta pregunta</span>
                <span className="text-lg sm:text-xl font-mono font-extrabold text-amber-300 tabular-nums">
                  {questionSeconds}s
                </span>
              </div>
            </div>

            {/* Score Points HUD */}
            <div className="cyber-glass-panel rounded-xl border border-[#3b1d75]/80 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Puntuación</span>
                <span className="text-lg sm:text-xl font-mono font-extrabold text-emerald-400 tabular-nums">
                  {points} pts
                </span>
              </div>
            </div>

            {/* Streak Counter */}
            <div className="cyber-glass-panel rounded-xl border border-[#3b1d75]/80 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ff2a85]/20 text-[#ff2a85] flex items-center justify-center font-bold">
                <Flame className={`w-5 h-5 ${streak >= 2 ? 'animate-bounce text-[#ff2a85]' : ''}`} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Racha Actual</span>
                <span className="text-lg sm:text-xl font-mono font-extrabold text-[#ff2a85] tabular-nums">
                  {streak}x {streak >= 3 ? '🔥' : ''}
                </span>
              </div>
            </div>

          </div>

          {/* Section Progress Bar */}
          <div className="cyber-glass-panel rounded-xl border border-[#3b1d75]/60 p-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between text-xs font-mono gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#00f2fe]/20 text-[#00f2fe] font-bold">
                  {currentSection.chapter}
                </span>
                <span className="text-white font-bold">{currentSection.title}</span>
                <span className="text-slate-400 text-[11px]">({currentSection.articlesCovered})</span>
              </div>

              <div className="text-slate-300">
                Pregunta <strong className="text-[#00f2fe] font-mono">{currentQuestionIndex + 1}</strong> de{' '}
                <strong className="text-white font-mono">{activeQuestions.length}</strong>
              </div>
            </div>

            {/* Progress line */}
            <div className="w-full h-2 rounded-full bg-[#1e0a40] overflow-hidden border border-[#3b1d75]/60">
              <div
                className="h-full bg-gradient-to-r from-[#00f2fe] via-[#7f00ff] to-[#ff2a85] transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + (isCurrentAnswered ? 1 : 0)) / activeQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card & Interactive Choices */}
          <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/70 p-6 sm:p-8 space-y-6">
            
            {/* Question prompt */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Fundamento Normativo: <strong className="text-[#00f2fe]">{currentQ.articleRef}</strong>
                </span>
                {questionSeconds <= 10 && !isCurrentAnswered && (
                  <span className="text-[11px] font-mono font-bold text-amber-300 animate-pulse flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>¡Bono de velocidad activo (+50 pts)!</span>
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {currentQ.question}
              </h3>
            </div>

            {/* Options list */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = currentSelectedOption === optIdx;
                const isCorrectOption = optIdx === currentQ.correctIndex;

                let optClass = 'bg-[#180833] border-[#3b1d75] text-slate-200 hover:border-[#00f2fe]/60 hover:bg-[#220a47]';

                if (isCurrentAnswered) {
                  if (isCorrectOption) {
                    optClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
                  } else if (isSelected && !isCorrectOption) {
                    optClass = 'bg-red-950/80 border-red-500 text-red-100 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-shake';
                  } else {
                    optClass = 'bg-[#120524]/50 border-[#2d145c]/40 text-slate-500 opacity-50';
                  }
                } else if (isSelected) {
                  optClass = 'bg-[#220a47] border-[#00f2fe] text-white';
                }

                return (
                  <button
                    key={optIdx}
                    disabled={isCurrentAnswered}
                    onClick={() => handleAnswerSelect(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-all cursor-pointer relative overflow-hidden ${optClass}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-[#250d4a] border border-[#482087] flex items-center justify-center font-mono font-bold text-xs shrink-0 text-[#00f2fe]">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 leading-snug">{opt}</span>

                    {isCurrentAnswered && isCorrectOption && (
                      <span className="text-emerald-400 font-bold shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </span>
                    )}

                    {isCurrentAnswered && isSelected && !isCorrectOption && (
                      <span className="text-red-400 font-bold shrink-0">
                        <AlertTriangle className="w-5 h-5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ======================================================== */}
            {/* DYNAMIC REINFORCEMENT BANNER (POSITIVE OR EDUCATIONAL)   */}
            {/* ======================================================== */}
            {isCurrentAnswered && (
              <div
                className={`p-5 rounded-xl border transition-all duration-300 space-y-3 ${
                  isCurrentCorrect
                    ? 'bg-emerald-950/70 border-emerald-500/80 text-emerald-200'
                    : 'bg-amber-950/70 border-amber-500/80 text-amber-200'
                }`}
              >
                {/* Header feedback */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {isCurrentCorrect ? (
                      <>
                        <Sparkles className="w-5 h-5 text-emerald-400 animate-spin" />
                        <span className="text-emerald-300">¡Refuerzo Positivo Institucional!</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-5 h-5 text-amber-400 animate-pulse" />
                        <span className="text-amber-300">¡Identificación de Falla y Refuerzo Pedagógico!</span>
                      </>
                    )}
                  </div>

                  {isCurrentCorrect && (
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        +100 PTS Base
                      </span>
                      {recentAnswerFeedback && recentAnswerFeedback.speedBonus > 0 && (
                        <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                          +{recentAnswerFeedback.speedBonus} Velocidad ⚡
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Explanation text */}
                <div className="text-xs sm:text-sm leading-relaxed">
                  {isCurrentCorrect ? (
                    <p>{currentQ.positiveReinforcement}</p>
                  ) : (
                    <div className="space-y-2">
                      <p>
                        <strong className="text-amber-300">¿Dónde estuvo la falla? </strong>
                        {currentQ.mistakeAnalysis}
                      </p>
                      <p className="text-[11px] text-amber-300/90 font-mono">
                        Norma aplicable: {currentQ.regulationBasis}
                      </p>
                    </div>
                  )}
                </div>

                {/* Proceed button */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#ff2a85] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>
                      {currentQuestionIndex < activeQuestions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar y Calificar'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* PHASE 3: RESULTS & PERFORMANCE REPORT                    */}
      {/* ======================================================== */}
      {phase === 'results' && (
        <div className="space-y-6">
          
          {/* Main Result Card */}
          <div
            className={`cyber-glass-panel rounded-2xl border p-6 sm:p-8 space-y-6 ${
              isPassed ? 'border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'border-amber-500/60'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2d145c]">
              <div>
                <span className="text-xs font-mono uppercase text-[#00f2fe] font-bold tracking-wider">
                  Resultados Oficiales de Inducción
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  {isPassed ? `¡Felicitaciones, ${formData.name}!` : `Evaluación Presentada, ${formData.name}`}
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Ficha: <strong className="font-mono text-white">{formData.ficha}</strong> · Programa: {formData.program} · Regional {formData.regional}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-5 py-3 rounded-2xl bg-[#1d0a3d] border border-[#482087] text-center">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Puntaje Final</span>
                  <span className={`text-3xl font-mono font-black ${isPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {finalScorePct}%
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-[#190833] border border-[#3b1d75] space-y-1">
                <span className="text-slate-400 block text-[10px]">Aciertos</span>
                <span className="text-xl font-bold text-white">{correctCount} / {totalQuestionsCount}</span>
              </div>

              <div className="p-4 rounded-xl bg-[#190833] border border-[#3b1d75] space-y-1">
                <span className="text-slate-400 block text-[10px]">Tiempo Total</span>
                <span className="text-xl font-bold text-[#00f2fe]">{formatTime(totalSeconds)}</span>
              </div>

              <div className="p-4 rounded-xl bg-[#190833] border border-[#3b1d75] space-y-1">
                <span className="text-slate-400 block text-[10px]">Puntos Gamificados</span>
                <span className="text-xl font-bold text-emerald-400">{points} pts</span>
              </div>

              <div className="p-4 rounded-xl bg-[#190833] border border-[#3b1d75] space-y-1">
                <span className="text-slate-400 block text-[10px]">Mayor Racha</span>
                <span className="text-xl font-bold text-[#ff2a85]">{maxStreak}x seguidos</span>
              </div>
            </div>

            {/* Cloud Storage Confirmation Indicator */}
            <div className="p-4 rounded-xl bg-[#1b0a38] border border-[#482087] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-5 h-5 text-[#00f2fe]" />
                <div>
                  <span className="font-bold text-white">Registro en Hoja Oficial del Administrador: </span>
                  <span className="text-slate-300">
                    {submissionSuccess ? 'Guardado exitosamente con respuestas detalladas y tiempos.' : 'Procesando sincronización en servidor...'}
                  </span>
                </div>
              </div>

              {onGoToAdmin && (
                <button
                  onClick={onGoToAdmin}
                  className="px-3 py-1.5 rounded-lg bg-[#270f4d] hover:bg-[#38166d] border border-[#52239c] text-xs font-mono text-[#00f2fe] transition-colors cursor-pointer"
                >
                  Ver como Administrador
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {isPassed ? (
                <button
                  onClick={onViewCertificate}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#7f00ff] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,42,133,0.4)] hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Descargar Diploma de Inducción</span>
                </button>
              ) : null}

              <button
                onClick={() => setPhase('leaderboard')}
                className="px-5 py-3 rounded-xl bg-[#200a42] hover:bg-[#2e105e] border border-[#482087] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Ver Mi Posición en el Ranking</span>
              </button>

              <button
                onClick={handleRestart}
                className="px-5 py-3 rounded-xl bg-[#180730] hover:bg-[#250d4a] border border-[#3b1d75] text-slate-300 hover:text-white font-mono text-xs transition-all cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar para Mejorar Puntos y Tiempo</span>
              </button>
            </div>

          </div>

          {/* Section Breakdown Radar / Grid */}
          <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-6 space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase text-[#00f2fe] tracking-wider">
              Desglose de Aprobación por Secciones del Reglamento
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {REGULATION_SECTIONS.map((sec) => {
                const secQuestions = REGULATION_SECTION_QUESTIONS.filter((q) => q.sectionId === sec.id);
                const secCorrect = secQuestions.filter((q) => answers[q.id] === q.correctIndex).length;
                const secPct = Math.round((secCorrect / (secQuestions.length || 1)) * 100);

                return (
                  <div key={sec.id} className="p-4 rounded-xl bg-[#190833] border border-[#3b1d75] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white truncate pr-2">{sec.title}</span>
                      <span className={`font-mono font-bold ${secPct >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {secPct}%
                      </span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-[#200a42] overflow-hidden">
                      <div
                        className={`h-full ${secPct >= 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${secPct}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>{secCorrect} de {secQuestions.length} correctas</span>
                      <span>{sec.articlesCovered}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* PHASE 4: GAMIFIED LEADERBOARD (RANKING INSTITUCIONAL)    */}
      {/* ======================================================== */}
      {phase === 'leaderboard' && (
        <div className="space-y-6">
          
          {/* Leaderboard Header */}
          <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2d145c]">
              <div>
                <span className="text-xs font-mono uppercase text-[#00f2fe] font-bold tracking-wider flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Ranking de Excelencia Normativa</span>
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
                  Tabla de Clasificación de Aprendices
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Puntuaciones ordenadas por aciertos normativos, velocidad de respuesta y rachas sin errores.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={loadLeaderboard}
                  className="px-3.5 py-2 rounded-xl bg-[#200a42] hover:bg-[#301063] border border-[#482087] text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLeaderboard ? 'animate-spin' : ''}`} />
                  <span>Actualizar</span>
                </button>

                <button
                  onClick={() => setPhase('registration')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#ff2a85] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Presentar Test
                </button>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#3b1d75] text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-3">Puesto</th>
                    <th className="py-3 px-3">Aprendiz</th>
                    <th className="py-3 px-3">Ficha</th>
                    <th className="py-3 px-3">Programa / Regional</th>
                    <th className="py-3 px-3 text-right">Puntos Gamificados</th>
                    <th className="py-3 px-3 text-right">Tiempo</th>
                    <th className="py-3 px-3 text-right">Aciertos (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2d145c]/60">
                  {leaderboard.map((learner) => {
                    const isTop1 = learner.rank === 1;
                    const isTop2 = learner.rank === 2;
                    const isTop3 = learner.rank === 3;

                    return (
                      <tr
                        key={learner.id}
                        className={`hover:bg-[#200a42]/50 transition-colors ${
                          learner.name.toLowerCase() === formData.name.toLowerCase()
                            ? 'bg-[#00f2fe]/10 border-l-2 border-[#00f2fe]'
                            : ''
                        }`}
                      >
                        {/* Rank Badge */}
                        <td className="py-3.5 px-3 font-mono font-bold">
                          {isTop1 && <span className="text-xl">🥇</span>}
                          {isTop2 && <span className="text-xl">🥈</span>}
                          {isTop3 && <span className="text-xl">🥉</span>}
                          {!isTop1 && !isTop2 && !isTop3 && (
                            <span className="text-slate-400">#{learner.rank}</span>
                          )}
                        </td>

                        {/* Name */}
                        <td className="py-3.5 px-3 font-medium text-white">
                          <div className="flex items-center gap-2">
                            <span>{learner.name}</span>
                            {learner.rank <= 3 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                                Top {learner.rank}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Ficha */}
                        <td className="py-3.5 px-3 font-mono text-slate-300">
                          {learner.ficha || '2874102'}
                        </td>

                        {/* Program & Regional */}
                        <td className="py-3.5 px-3 text-slate-300">
                          <div className="truncate max-w-[220px]">{learner.program}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{learner.regional}</div>
                        </td>

                        {/* Total Gamified Points */}
                        <td className="py-3.5 px-3 text-right font-mono font-extrabold text-emerald-400">
                          {learner.totalGamifiedPoints.toLocaleString()} pts
                        </td>

                        {/* Time Taken */}
                        <td className="py-3.5 px-3 text-right font-mono text-[#00f2fe]">
                          {formatTime(learner.timeTakenSeconds)}
                        </td>

                        {/* Final Score % */}
                        <td className="py-3.5 px-3 text-right font-mono font-bold">
                          <span
                            className={`px-2 py-0.5 rounded ${
                              learner.finalExamScore >= 70
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {learner.finalExamScore}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
