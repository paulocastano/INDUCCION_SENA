import React, { useState } from 'react';
import { Station, Question, ApprenticeProfile } from '../types/induction';
import { InteractiveSymbols } from './InteractiveSymbols';
import { HymnSection } from './HymnSection';
import { StagesExplorer } from './StagesExplorer';
import { CaseSimulator } from './CaseSimulator';
import { ValuesExplorer } from './ValuesExplorer';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  Award,
  Sparkles,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StationDetailProps {
  station: Station;
  profile: ApprenticeProfile;
  onBack: () => void;
  onCompleteStation: (stationId: number, score: number) => void;
  onNextStation?: () => void;
}

export const StationDetail: React.FC<StationDetailProps> = ({
  station,
  profile,
  onBack,
  onCompleteStation,
  onNextStation
}) => {
  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  const isAlreadyCompleted = profile.completedStations.includes(station.id);
  const currentTopic = station.topics[activeTopicIndex] || station.topics[0];

  const handleSelectAnswer = (qId: number, optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    station.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const pct = Math.round((correctCount / station.quiz.length) * 100);
    setQuizScore(pct);
    setQuizSubmitted(true);

    if (pct >= 50) {
      onCompleteStation(station.id, pct);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // Confetti fallback
      }
    }
  };

  const handleRetryQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Ruta de Inducción</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <Clock className="w-3.5 h-3.5" />
          <span>Tiempo estimado: ~{station.estimatedMinutes} min</span>
        </div>
      </div>

      {/* Station Banner */}
      <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-6 md:p-8 shadow-2xl transition-colors duration-200 text-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2d145c] pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span className="font-mono font-bold text-[#00f2fe]">Estación {station.number}</span>
              <span aria-hidden="true">·</span>
              <span>{station.category}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {station.title}
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              {station.shortDesc}
            </p>
          </div>

          <div>
            {isAlreadyCompleted ? (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Estación Aprobada</span>
              </div>
            ) : (
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <span>Lee los módulos y resuelve el reto final</span>
              </div>
            )}
          </div>
        </div>

        {/* Topic Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 dark:border-slate-800">
          {station.topics.map((t, idx) => {
            const isActive = activeTopicIndex === idx;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTopicIndex(idx)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 dark:bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {t.title}
              </button>
            );
          })}
        </div>

        {/* Active Topic Content */}
        <div className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {currentTopic.title}
            </h3>
            {currentTopic.keyHighlight && (
              <span className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-md border border-emerald-100 dark:border-emerald-800 hidden sm:inline-block">
                {currentTopic.keyHighlight}
              </span>
            )}
          </div>

          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {currentTopic.summary}
          </p>

          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/80 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800">
            {currentTopic.content.map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Tool Specific to the Station */}
      {station.id === 1 && (
        <div className="space-y-6">
          <ValuesExplorer />
        </div>
      )}

      {station.id === 2 && (
        <div className="space-y-8">
          <InteractiveSymbols />
          <HymnSection />
        </div>
      )}

      {station.id === 3 && (
        <div className="space-y-6">
          <StagesExplorer />
        </div>
      )}

      {station.id === 4 && (
        <div className="space-y-6">
          <CaseSimulator />
        </div>
      )}

      {station.id === 5 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6 transition-colors duration-200">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Ecosistema Integral de Oportunidades
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Beneficios Clave del Aprendiz SENA
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white text-sm block">Póliza Médica 24/7</span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Cobertura gratuita contra accidentes personales en centro de formación, salidas pedagógicas y durante toda tu etapa productiva.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white text-sm block">Apoyos de Sostenimiento</span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Convocatorias periódicas para aprendices estratos 1 y 2 que no cuenten con contrato de aprendizaje, para apoyar transporte y alimentación.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white text-sm block">SENNOVA y WorldSkills</span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Semilleros de investigación tecnológica, patentes, robótica y competencias nacionales e internacionales de destreza laboral.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Station Diagnostic Quiz */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6 transition-colors duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Verificación Pedagógica
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Reto de la Estación {station.number}
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {station.quiz.length} Preguntas
          </span>
        </div>

        <div className="space-y-6">
          {station.quiz.map((q, qIndex) => {
            const selectedOpt = selectedAnswers[q.id];

            return (
              <div key={q.id} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    #{qIndex + 1}
                  </span>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    {q.question}
                  </h4>
                </div>

                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    let style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300';

                    if (quizSubmitted) {
                      if (optIdx === q.correctIndex) {
                        style = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 font-medium';
                      } else if (isSelected && optIdx !== q.correctIndex) {
                        style = 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800 text-red-950 dark:text-red-200';
                      } else {
                        style = 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-60';
                      }
                    } else if (isSelected) {
                      style = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 dark:border-emerald-500 text-emerald-950 dark:text-emerald-200 font-medium';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectAnswer(q.id, optIdx)}
                        className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm flex items-start gap-2.5 transition-all cursor-pointer ${style}`}
                      >
                        <span className="font-mono font-bold shrink-0 text-slate-400 dark:text-slate-500">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 mt-2">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Retroalimentación: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit or Result Action */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            {quizSubmitted && (
              <div className="text-xs">
                <span className="text-slate-500 dark:text-slate-400">Puntaje obtenido: </span>
                <span className={`font-mono font-bold text-sm ${quizScore >= 50 ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  {quizScore}%
                </span>
                <span className="ml-2 font-medium text-slate-700 dark:text-slate-300">
                  {quizScore >= 50 ? '— ¡Estación Aprobada con éxito!' : '— Te invitamos a repasar los conceptos.'}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!quizSubmitted ? (
              <button
                disabled={Object.keys(selectedAnswers).length < station.quiz.length}
                onClick={handleSubmitQuiz}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                Comprobar Respuestas
              </button>
            ) : (
              <>
                <button
                  onClick={handleRetryQuiz}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  Reintentar Reto
                </button>
                {onNextStation && (
                  <button
                    onClick={onNextStation}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 rounded-lg transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Siguiente Estación</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
