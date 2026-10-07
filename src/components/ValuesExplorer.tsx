import React, { useState } from 'react';
import { SENA_VALUES } from '../data/senaInductionData';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const ValuesExplorer: React.FC = () => {
  const [activeValueIndex, setActiveValueIndex] = useState<number>(0);

  const activeValue = SENA_VALUES[activeValueIndex];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6 transition-colors duration-200">
      
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
          Código de Integridad SENA
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Los 7 Valores Éticos del Aprendiz
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          El valor institucional no se limita a saber operar maquinaria o escribir código; radica en la calidad humana, la honestidad y el compromiso con la sociedad.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Values List Buttons */}
        <div className="lg:col-span-5 space-y-2">
          {SENA_VALUES.map((val, idx) => {
            const isSelected = activeValueIndex === idx;
            return (
              <button
                key={val.name}
                onClick={() => setActiveValueIndex(idx)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/60 text-slate-900 dark:text-white font-semibold shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{val.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{val.tagline}</div>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Active Value Showcase */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-700">
            <span className="text-xs font-bold font-mono text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
              Valor #{activeValueIndex + 1}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Práctica formativa diaria
            </span>
          </div>

          <h4 className="text-xl font-bold text-slate-900 dark:text-white">
            {activeValue.name}
          </h4>

          <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/70 dark:border-slate-700 inline-block">
            “{activeValue.tagline}”
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {activeValue.detail}
          </p>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">
              ¿Cómo lo vives tú como aprendiz en el ambiente de aprendizaje?
            </span>
            <p>
              Llegando puntual a tus sesiones, escuchando las opiniones de tus compañeros de ficha, cuidando las herramientas y computadores, y entregando tus evidencias a tiempo con honestidad académica.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
