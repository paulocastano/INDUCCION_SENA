import React from 'react';
import { ApprenticeProfile } from '../types/induction';
import { User, Award, Moon, Sun, Bell, Sparkles } from 'lucide-react';
import { SENA_OFFICIAL_PATH } from './SenaEmblem';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  profile: ApprenticeProfile;
  onOpenProfile: () => void;
  onOpenCertificate: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  isAdmin?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  profile,
  onOpenProfile,
  onOpenCertificate,
  darkMode,
  onToggleTheme,
  isAdmin = false
}) => {
  const completedCount = profile.completedStations.length;
  const progressPct = Math.round((completedCount / 5) * 100);

  return (
    <header className="sticky top-0 z-50 bg-[#120524]/90 dark:bg-[#0c0317]/95 backdrop-blur-md border-b border-[#37166e]/60 transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Official SENA Brand title with 30% larger logo */}
        <button
          onClick={() => onNavigate('home')}
          className="text-left group flex items-center gap-3 focus-visible:outline-none cursor-pointer"
        >
          <div className="w-[42px] h-[42px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform p-0.5">
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 1000 1000"
              className="w-full h-full text-[#00f2fe] drop-shadow-[0_0_8px_rgba(0,242,254,0.5)] fill-current"
              aria-label="Logo Oficial SENA"
            >
              <path d={SENA_OFFICIAL_PATH} />
            </svg>
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold font-mono tracking-wider text-white group-hover:text-[#00f2fe] transition-colors block leading-tight">
              SENA INDUCCIÓN
            </span>
            <span className="text-[10px] font-mono text-[#00f2fe] tracking-widest uppercase hidden sm:block">
              VALOR INSTITUCIONAL 2026
            </span>
          </div>
        </button>

        {/* Zone 2: Futuristic Top Navigation Breadcrumbs (Directly matching header tabs from image) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono font-medium tracking-wider text-slate-300">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors uppercase hover:text-[#00f2fe] cursor-pointer ${
              currentView === 'home'
                ? 'text-[#00f2fe] font-bold border-b-2 border-[#00f2fe] pb-1'
                : 'text-slate-400'
            }`}
          >
            PANEL
          </button>
          <button
            onClick={() => onNavigate('stations')}
            className={`transition-colors uppercase hover:text-[#00f2fe] cursor-pointer ${
              currentView === 'stations'
                ? 'text-[#00f2fe] font-bold border-b-2 border-[#00f2fe] pb-1'
                : 'text-slate-400'
            }`}
          >
            5 ESTACIONES
          </button>
          <button
            onClick={() => onNavigate('symbols')}
            className={`transition-colors uppercase hover:text-[#00f2fe] cursor-pointer ${
              currentView === 'symbols'
                ? 'text-[#00f2fe] font-bold border-b-2 border-[#00f2fe] pb-1'
                : 'text-slate-400'
            }`}
          >
            SÍMBOLOS
          </button>
          <button
            onClick={() => onNavigate('regulation')}
            className={`transition-colors uppercase hover:text-[#00f2fe] cursor-pointer ${
              currentView === 'regulation'
                ? 'text-[#00f2fe] font-bold border-b-2 border-[#00f2fe] pb-1'
                : 'text-slate-400'
            }`}
          >
            REGLAMENTO
          </button>
          <button
            onClick={() => onNavigate('exam')}
            className={`transition-colors uppercase hover:text-[#00f2fe] cursor-pointer flex items-center gap-1.5 ${
              currentView === 'exam'
                ? 'text-[#00f2fe] font-bold border-b-2 border-[#00f2fe] pb-1'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>EVALUACIÓN</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#ff2a85] text-white font-bold">35P</span>
          </button>
          {isAdmin && (
            <button
              onClick={() => onNavigate('registry')}
              className={`transition-colors uppercase hover:text-[#00f2fe] cursor-pointer flex items-center gap-1.5 ${
                currentView === 'registry'
                  ? 'text-[#00f2fe] font-bold border-b-2 border-[#00f2fe] pb-1'
                  : 'text-amber-300 hover:text-amber-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
              <span>HOJA ADMIN</span>
            </button>
          )}
          <button
            onClick={() => onNavigate('tutor')}
            className={`transition-colors uppercase hover:text-[#00f2fe] cursor-pointer ${
              currentView === 'tutor'
                ? 'text-[#00f2fe] font-bold border-b-2 border-[#00f2fe] pb-1'
                : 'text-slate-400'
            }`}
          >
            TUTOR
          </button>
        </nav>

        {/* Zone 3: Actions + Theme Toggle + Certificate Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {profile.inductionCompleted ? (
            <button
              onClick={onOpenCertificate}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-white bg-gradient-to-r from-[#ff2a85] to-[#7f00ff] rounded-lg shadow-[0_0_15px_rgba(255,42,133,0.4)] hover:brightness-110 transition-all cursor-pointer whitespace-nowrap"
            >
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">DIPLOMA OFICIAL</span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="text-[#00f2fe] font-bold tabular-nums">{progressPct}%</span>
              <div className="w-16 h-2 bg-[#250d4a] rounded-full overflow-hidden border border-[#3b1970]">
                <div
                  className="h-full bg-gradient-to-r from-[#00f2fe] to-[#ff2a85] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}

          {/* Learner Profile Quick Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-slate-200 bg-[#250e4a] hover:bg-[#341466] border border-[#481c8f] rounded-lg transition-colors cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-[#00f2fe]" />
            <span className="max-w-[90px] sm:max-w-[110px] truncate">{profile.name}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label={darkMode ? 'Cambiar tema' : 'Cambiar tema'}
            title={darkMode ? 'Tema Neón Violeta Activo' : 'Alternar contraste'}
            className="p-2 text-slate-300 bg-[#250e4a] hover:bg-[#341466] border border-[#481c8f] rounded-lg transition-all cursor-pointer flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#00f2fe]"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-90" />
            ) : (
              <Moon className="w-4 h-4 text-[#00f2fe] transition-transform duration-300 -rotate-12 hover:rotate-0" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
