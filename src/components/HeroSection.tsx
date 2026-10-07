import React from 'react';
import { ApprenticeProfile } from '../types/induction';
import { SenaEmblem } from './SenaEmblem';
import { ArrowRight, Compass, ShieldCheck, GraduationCap } from 'lucide-react';

interface HeroSectionProps {
  profile: ApprenticeProfile;
  onStartInduction: () => void;
  onOpenExam: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onStartInduction,
  onOpenExam
}) => {
  const completedCount = profile.completedStations.length;
  const isCompleted = profile.inductionCompleted;

  return (
    <div className="relative bg-gradient-to-b from-white via-slate-50 to-slate-100/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      
      {/* Decorative institutional geometric backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/60 dark:bg-emerald-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-amber-100/50 dark:bg-amber-600/15 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Prose Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed clean metadata kicker (Zero-Pill discipline) */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              <span>Servicio Nacional de Aprendizaje</span>
              <span aria-hidden="true">·</span>
              <span>Inducción Integral</span>
              <span aria-hidden="true">·</span>
              <span>Colombia</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
              Apropia el valor institucional y transforma el futuro de Colombia
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              ¡Bienvenido, <span className="font-semibold text-slate-900 dark:text-white">{profile.name}</span>! Te damos la bienvenida oficial a la institución más querida del país. Recorre las 5 estaciones formativas, comprende tus derechos y deberes, y obtén tu Pasaporte Oficial de Inducción SENA.
            </p>

            {/* Program and Center Context Card */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
              <div>
                <span className="text-slate-400 dark:text-slate-500 block font-medium">Programa de Formación:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm truncate block mt-0.5">
                  {profile.program}
                </span>
                <span className="text-slate-500 dark:text-slate-400 mt-0.5 block">{profile.programType}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block font-medium">Centro & Regional:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm truncate block mt-0.5">
                  {profile.center}
                </span>
                <span className="text-slate-500 dark:text-slate-400 mt-0.5 block">Regional {profile.regional}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartInduction}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-600 dark:bg-emerald-600 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-500 transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-emerald-500 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>{completedCount === 0 ? 'Iniciar Ruta de Inducción' : 'Continuar Ruta Formativa'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenExam}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>{isCompleted ? 'Ver Certificación Oficial' : 'Evaluación Final'}</span>
              </button>
            </div>

            {/* Quantitative Institutional Proof */}
            <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">1957</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Fundado por Rodolfo Martínez Tono</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">33</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Regionales en toda Colombia</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Educación pública y gratuita</div>
              </div>
            </div>

          </div>

          {/* Right Stage: Interactive Institutional Emblem Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <SenaEmblem className="w-12 h-14" variant="shield" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Mística y Valor SENA</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Saber · Saber Hacer · Saber Ser</p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              {/* Progress Summary Card inside */}
              <div className="py-5 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Progreso de la Inducción</span>
                  <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-400 tabular-nums">
                    {completedCount} de 5 Estaciones ({Math.round((completedCount / 5) * 100)}%)
                  </span>
                </div>
                
                {/* Visual Step Dots */}
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((stId) => {
                    const done = profile.completedStations.includes(stId);
                    return (
                      <div
                        key={stId}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          done ? 'bg-emerald-600 dark:bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'
                        }`}
                        title={`Estación ${stId}: ${done ? 'Completada' : 'Pendiente'}`}
                      />
                    );
                  })}
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 pt-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg p-3 border border-slate-100 dark:border-slate-750">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Estatus del Aprendiz:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {isCompleted ? 'Inducción Acreditada' : 'En Formación Inicial'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Reglamento Vigente:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Acuerdo 007 de 2012</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Aseguramiento Médico:</span>
                    <span className="font-medium text-emerald-700 dark:text-emerald-400 font-semibold">Póliza 24/7 Activa</span>
                  </div>
                </div>
              </div>

              {/* Quote from founder */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs italic text-slate-500 dark:text-slate-400">
                “En el SENA se forjan los hombres y mujeres libres que transforman con su trabajo el destino de Colombia.”
                <span className="block not-italic font-semibold text-slate-700 dark:text-slate-300 text-[11px] mt-1">
                  — Rodolfo Martínez Tono, Fundador del SENA
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
