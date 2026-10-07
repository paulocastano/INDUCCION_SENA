import React, { useState, useEffect, useRef } from 'react';
import { HYMN_STANZAS } from '../data/senaInductionData';
import { AnthemSynthesizer } from '../utils/audioHymn';
import { Play, Pause, RotateCcw, Volume2, BookOpen, Music } from 'lucide-react';

export const HymnSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeStanza, setActiveStanza] = useState<number>(0);
  const [activeLine, setActiveLine] = useState<number>(0);
  const synthRef = useRef<AnthemSynthesizer | null>(null);

  useEffect(() => {
    synthRef.current = new AnthemSynthesizer(
      (sIdx, lIdx) => {
        setActiveStanza(sIdx);
        setActiveLine(lIdx);
      },
      () => {
        setIsPlaying(false);
        setActiveStanza(0);
        setActiveLine(0);
      }
    );

    return () => {
      if (synthRef.current) {
        synthRef.current.stop();
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (!synthRef.current) return;

    if (isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
    } else {
      synthRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    if (synthRef.current) {
      synthRef.current.stop();
      setIsPlaying(false);
      setActiveStanza(0);
      setActiveLine(0);
    }
  };

  const currentStanzaData = HYMN_STANZAS[activeStanza] || HYMN_STANZAS[0];

  return (
    <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 p-6 md:p-8 shadow-2xl transition-colors duration-200 text-slate-100">
      
      {/* Header with unboxed metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#2d145c] mb-6 gap-3">
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00f2fe]">
            Música de Daniel Marlez · Letra de Luis Alfredo Sánchez
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Himno Oficial del SENA
          </h3>
        </div>

        {/* Audio Player Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePlay}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pausar Marcha</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Escuchar Melodía Guiada</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            title="Reiniciar reproducción"
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Stanza Selection & Synchronized Lyrics */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {HYMN_STANZAS.map((stanza, sIdx) => {
              const isSelected = activeStanza === sIdx;
              return (
                <button
                  key={stanza.number}
                  onClick={() => {
                    setActiveStanza(sIdx);
                    setActiveLine(0);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {stanza.number === 0 ? 'Coro' : `Estrofa ${stanza.number}`}
                </button>
              );
            })}
          </div>

          {/* Stanza display box */}
          <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-700">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {currentStanzaData.title}
              </span>
              {isPlaying && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 animate-pulse">
                  <Music className="w-3.5 h-3.5" />
                  <span>Sincronizando notas</span>
                </div>
              )}
            </div>

            <div className="space-y-3 font-serif text-base sm:text-lg">
              {currentStanzaData.lines.map((line, lIdx) => {
                const isLineActive = isPlaying && activeStanza === currentStanzaData.number && activeLine === lIdx;
                return (
                  <p
                    key={lIdx}
                    className={`transition-all duration-200 px-3 py-1.5 rounded-lg ${
                      isLineActive
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 font-bold translate-x-1 shadow-xs border border-emerald-300 dark:border-emerald-700'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Pedagogical analysis of stanza */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold text-sm">
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Sentido Formativo del {currentStanzaData.title}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentStanzaData.context}
            </p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 space-y-2">
              <span className="font-semibold text-slate-700 dark:text-slate-200 block">
                Protocolo Institucional SENA:
              </span>
              <p>
                Al entonar el Himno en actos solemnes de inducción, comités o graduaciones, los aprendices se ponen de pie en posición de respeto, con la mirada erguida y cantando con orgullo y disciplina cívica.
              </p>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed">
            <span className="font-bold block mb-1">
              ¿Sabías qué?
            </span>
            La expresión <em>“transformémosle el mundo en flor”</em> resume el anhelo de los fundadores del SENA de convertir a Colombia en una tierra fértil de oportunidades y dignidad obrera a través de la educación técnica.
          </div>
        </div>

      </div>

    </div>
  );
};
