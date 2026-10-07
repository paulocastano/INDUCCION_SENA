import React, { useState } from 'react';
import { SYMBOL_SECTORS } from '../data/senaInductionData';
import { SenaEmblem } from './SenaEmblem';
import { Layers, Compass, Flag, Shield, Info, CheckCircle2 } from 'lucide-react';

export const InteractiveSymbols: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'escudo' | 'bandera' | 'caminante'>('escudo');
  const [selectedSector, setSelectedSector] = useState<string>('primario');

  const currentSectorData = SYMBOL_SECTORS.find((s) => s.id === selectedSector) || SYMBOL_SECTORS[0];

  return (
    <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-6 md:p-8 shadow-2xl transition-colors duration-200 text-slate-100">
      
      {/* Tab Selector Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d145c] pb-5 mb-6">
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00f2fe]">
            Identidad Gráfica y Heráldica
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Los Símbolos Sagrados del SENA
          </h3>
        </div>

        <div className="inline-flex p-1 bg-[#130526] border border-[#341466] rounded-lg">
          <button
            onClick={() => setActiveTab('escudo')}
            className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-md transition-all cursor-pointer ${
              activeTab === 'escudo'
                ? 'bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-[#090317] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            El Escudo
          </button>
          <button
            onClick={() => setActiveTab('bandera')}
            className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-md transition-all cursor-pointer ${
              activeTab === 'bandera'
                ? 'bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-[#090317] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            La Bandera
          </button>
          <button
            onClick={() => setActiveTab('caminante')}
            className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-md transition-all cursor-pointer ${
              activeTab === 'caminante'
                ? 'bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-[#090317] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            El Caminante
          </button>
        </div>
      </div>

      {/* Tab 1: El Escudo con sus 3 Sectores Económicos */}
      {activeTab === 'escudo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Interactive Shield Stage */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <div className="relative p-6">
              <SenaEmblem className="w-48 h-56 transition-transform duration-300" variant="shield" />
            </div>

            <div className="text-center mt-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block">
                Escudo Oficial de la República
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                Diseñado para condensar la fuerza productiva colombiana
              </span>
            </div>
          </div>

          {/* Interactive Sector Selector & Explanations */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                El escudo del SENA es una obra heráldica que representa los tres sectores de la economía colombiana. Haz clic en cada sector para comprender su simbolismo y aporte al país:
              </p>

              {/* Sector Selector Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
                {SYMBOL_SECTORS.map((sector) => {
                  const isSelected = sector.id === selectedSector;
                  return (
                    <button
                      key={sector.id}
                      onClick={() => setSelectedSector(sector.id)}
                      className={`text-left p-3 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/60 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {sector.name.split(' ')[0]} {sector.name.split(' ')[1]}
                      </div>
                      <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium truncate mt-0.5">
                        {sector.symbolElement}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Sector Deep Dive Box */}
            <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {currentSectorData.name}
                </span>
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                  Elemento: {currentSectorData.symbolElement}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentSectorData.description}
              </p>

              <div className="pt-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                  Misión formativa en este sector:
                </span>
                {currentSectorData.impact}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Tab 2: La Bandera Institucional */}
      {activeTab === 'bandera' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-slate-100/70 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
            {/* Realistic stylized institutional flag canvas */}
            <div className="w-64 h-40 bg-white rounded-md shadow-md border border-slate-300 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-100/40 via-transparent to-slate-200/30 pointer-events-none" />
              <SenaEmblem className="w-20 h-24 relative z-10" variant="shield" />
            </div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-3">
              Bandera Oficial del SENA (Fondo Blanco)
            </span>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Significado de la Bandera Blanca Institucional
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              La bandera del SENA se compone de un paño completamente blanco con el escudo institucional centrado en verde bosque tradicional.
            </p>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">
                  El Color Blanco (Paz y Reconciliación):
                </span>
                Simboliza la tranquilidad, la paz duradera y la libertad de pensamiento. El SENA concibe la educación técnica y laboral como el instrumento más eficaz para construir convivencia pacífica en todos los territorios de Colombia.
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">
                  El Color Verde (Esperanza y Desarrollo):
                </span>
                Representa la vitalidad de la naturaleza colombiana, la esperanza de la juventud y el renacimiento económico de las familias a través del trabajo productivo.
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 3: El Caminante (Isotipo) */}
      {activeTab === 'caminante' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="p-6 bg-emerald-700 dark:bg-emerald-600 text-white rounded-2xl shadow-sm flex items-center justify-center">
              <SenaEmblem className="w-28 h-28" variant="walker" />
            </div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-3">
              El Isotipo del Aprendiz Caminante
            </span>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              El Aprendiz como Protagonista de su Propio Destino
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              El logotipo del SENA sintetiza la silueta estilizada de un ser humano erguido dando un paso firme hacia adelante sobre un sendero de oportunidades.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  La Postura Erguida
                </span>
                Representa la dignidad humana del trabajador, la autoconfianza y la preparación integral que adquiere en las aulas y talleres del SENA.
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  El Paso Adelante
                </span>
                Refleja el dinamismo, la innovación constante y el coraje de no rendirse frente a las dificultades socioeconómicas.
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 sm:col-span-2">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  El Sendero de Oportunidades
                </span>
                La línea horizontal inferior simboliza la plataforma de oportunidades laborales y formativas que el Estado garantiza sin costo a todos los colombianos.
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
