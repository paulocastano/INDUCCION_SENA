import React from 'react';
import { Station, ApprenticeProfile } from '../types/induction';
import { CheckCircle2, Clock, BookOpen, ArrowRight, Sparkles, Trophy } from 'lucide-react';

interface InductionRoadmapProps {
  stations: Station[];
  profile: ApprenticeProfile;
  onSelectStation: (station: Station) => void;
  onOpenExam: () => void;
}

export const InductionRoadmap: React.FC<InductionRoadmapProps> = ({
  stations,
  profile,
  onSelectStation,
  onOpenExam
}) => {
  const completedCount = profile.completedStations.length;
  const allStationsCompleted = completedCount === stations.length;

  return (
    <section className="py-4 max-w-7xl mx-auto space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-[#3b1d75]/50 gap-4">
        <div>
          <div className="text-xs font-mono font-bold text-[#00f2fe] uppercase tracking-wider mb-1">
            RUTA METODOLÓGICA OBLIGATORIA
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Las 5 Estaciones de la Inducción SENA
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Cada estación aborda un pilar fundamental de la vida del aprendiz. Completa la lectura interactiva y la trivia diagnóstica de cada una para habilitar la certificación final.
          </p>
        </div>

        {/* Status indicator unboxed text */}
        <div className="text-right">
          <div className="text-xs font-mono text-slate-400">
            <span>Avance general</span>
            <span aria-hidden="true" className="mx-1">·</span>
            <span className="font-semibold text-[#00f2fe]">{completedCount} de 5 estaciones</span>
          </div>
          <div className="text-sm font-mono font-semibold text-slate-200 mt-0.5">
            {allStationsCompleted ? '¡Ruta formativa completada!' : 'En proceso de aprendizaje'}
          </div>
        </div>
      </div>

      {/* Grid of 5 Stations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stations.map((station, index) => {
          const isCompleted = profile.completedStations.includes(station.id);
          const score = profile.quizScores[station.id];

          return (
            <div
              key={station.id}
              className={`cyber-glass-panel rounded-2xl border transition-all duration-300 flex flex-col justify-between p-6 shadow-xl ${
                isCompleted
                  ? 'border-[#00f2fe]/60 shadow-[0_0_20px_rgba(0,242,254,0.15)]'
                  : 'border-[#3b1d75]/50 hover:border-[#7f00ff]/60 hover:shadow-[0_0_15px_rgba(127,0,255,0.2)]'
              }`}
            >
              <div>
                {/* Station Number & Category unboxed text */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#00f2fe]">ESTACIÓN {station.number}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{station.category}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#ff2a85]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{station.estimatedMinutes} min</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {station.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {station.shortDesc}
                </p>

                {/* Station Topics Highlights */}
                <div className="space-y-1.5 py-3 border-t border-[#2d145c] text-xs font-mono text-slate-300">
                  {station.topics.map((t) => (
                    <div key={t.id} className="flex items-start gap-1.5">
                      <span className="text-[#00f2fe] font-bold leading-none mt-1">›</span>
                      <span className="text-slate-200">{t.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action and Score */}
              <div className="pt-4 mt-2 border-t border-[#2d145c] flex items-center justify-between">
                <div>
                  {isCompleted ? (
                    <div className="flex items-center gap-1.5 text-xs text-[#00f2fe] font-mono font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#00f2fe]" />
                      <span>Aprobada {score ? `(${score}%)` : ''}</span>
                    </div>
                  ) : (
                    <span className="text-xs font-mono text-slate-500 font-medium">Pendiente</span>
                  )}
                </div>

                <button
                  onClick={() => onSelectStation(station)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-semibold rounded-lg transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-[#260e4d] text-[#00f2fe] hover:bg-[#391572] border border-[#481c8f]'
                      : 'bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-[#090317] hover:brightness-110 shadow-[0_0_12px_rgba(0,242,254,0.3)]'
                  }`}
                >
                  <span>{isCompleted ? 'Repasar' : 'Ingresar'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}

        {/* 6th Card: Final Exam & Certification Box */}
        <div className="bg-gradient-to-br from-[#1b0838] to-[#2c0d59] text-white rounded-2xl p-6 flex flex-col justify-between shadow-2xl border border-[#ff2a85]/40 relative overflow-hidden">
          
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#ff2a85]/20 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-3">
              <span className="font-bold text-[#ff2a85]">PASO FINAL</span>
              <span className="text-[#00f2fe]">10 PREGUNTAS</span>
            </div>

            <div className="w-10 h-10 rounded-lg bg-[#ff2a85]/20 text-[#ff2a85] flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(255,42,133,0.3)]">
              <Trophy className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2 leading-snug">
              Evaluación y Pasaporte de Inducción
            </h3>

            <p className="text-xs text-slate-200 leading-relaxed mb-4">
              Demuestra tu apropiación del valor institucional SENA. Al superar el examen con el 70% o más, se expedirá tu Certificado Oficial de Inducción con firma y código de verificación.
            </p>

            <div className="text-xs font-mono text-slate-300 space-y-1 py-2 border-t border-[#3b1d75]/50">
              <div>• Requisito: Completar las 5 estaciones.</div>
              <div>• Aprobación: Mínimo 7 de 10 respuestas.</div>
              <div>• Diploma Oficial descargable en PDF.</div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#3b1d75]/60">
            <button
              onClick={onOpenExam}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-bold text-white bg-gradient-to-r from-[#ff2a85] to-[#7f00ff] hover:brightness-110 rounded-lg shadow-[0_0_15px_rgba(255,42,133,0.4)] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {profile.inductionCompleted
                  ? 'VER CERTIFICADO OFICIAL'
                  : allStationsCompleted
                  ? 'PRESENTAR EVALUACIÓN'
                  : 'PRESENTAR EVALUACIÓN'}
              </span>
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};
