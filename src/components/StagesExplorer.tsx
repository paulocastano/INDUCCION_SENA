import React, { useState } from 'react';
import { PRODUCTIVE_STAGE_ALTERNATIVES } from '../data/senaInductionData';
import { Briefcase, BookOpen, Clock, Check, HelpCircle } from 'lucide-react';

export const StagesExplorer: React.FC = () => {
  const [selectedAlt, setSelectedAlt] = useState<string>('contrato_aprendizaje');

  const currentAlt = PRODUCTIVE_STAGE_ALTERNATIVES.find((a) => a.id === selectedAlt) || PRODUCTIVE_STAGE_ALTERNATIVES[0];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-8 transition-colors duration-200">
      
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
          Formación Profesional Integral (FPI)
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Etapa Lectiva vs. Etapa Productiva
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          El ciclo de formación en el SENA es dual y complementario: primero adquieres y perfeccionas tus competencias en ambientes de aprendizaje, y luego las aplicas en el sector real.
        </p>
      </div>

      {/* Side-by-side Dual Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Etapa Lectiva */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Fase 1</span>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Aulas & Talleres</span>
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Etapa Lectiva</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Período en el cual el aprendiz desarrolla las competencias técnicas y transversales del programa mediante guías de aprendizaje, proyectos formativos y prácticas en talleres simulados.
          </p>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-700">
            <li className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Acompañamiento continuo de Instructores técnicos</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Carga de evidencias en plataforma Zajuna LMS</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Evaluación de competencias: A (Aprobado) o D (Deficiente)</span>
            </li>
          </ul>
        </div>

        {/* Etapa Productiva */}
        <div className="p-6 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase">Fase 2</span>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Mundo Laboral Real</span>
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Etapa Productiva (6 meses)</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Período de seis meses continuos donde el aprendiz aplica, complementa y consolida sus conocimientos en un entorno productivo real como requisito de grado.
          </p>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 pt-2 border-t border-emerald-200/60 dark:border-emerald-800/60">
            <li className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Seguimiento periódico de un instructor asignado</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Cobertura de ARL obligatoria (Riesgos Laborales)</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Bitácoras de seguimiento quincenales obligatorias</span>
            </li>
          </ul>
        </div>

      </div>

      {/* The 5 Productive Alternatives Deep Dive */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            Las 5 Alternativas Oficiales para Realizar la Etapa Productiva
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Selecciona una alternativa para conocer su funcionamiento, cobertura y a quién va dirigida:
          </p>
        </div>

        {/* Alternatives Segmented Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {PRODUCTIVE_STAGE_ALTERNATIVES.map((alt) => {
            const isSelected = alt.id === selectedAlt;
            return (
              <button
                key={alt.id}
                onClick={() => setSelectedAlt(alt.id)}
                className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-slate-900 dark:text-white font-semibold shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span className="text-xs block truncate">{alt.title}</span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block mt-0.5 truncate font-normal">
                  {alt.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Alternative Details Box */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/80 dark:border-slate-700">
            <div>
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block">
                {currentAlt.badge}
              </span>
              <h5 className="text-lg font-bold text-slate-900 dark:text-white">
                {currentAlt.title}
              </h5>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>{currentAlt.duration}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {currentAlt.description}
          </p>

          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white block mb-1">
              Perfil idóneo o recomendado:
            </span>
            {currentAlt.bestFor}
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
            * Importante: Toda alternativa debe ser concertada y aprobada formalmente ante la Coordinación Académica de tu Centro antes de comenzar labores.
          </div>
        </div>
      </div>

    </div>
  );
};
