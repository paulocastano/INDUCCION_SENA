/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ApprenticeProfile, Station } from './types/induction';
import { INDUCTION_STATIONS } from './data/senaInductionData';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { InductionDashboardView } from './components/InductionDashboardView';
import { InductionRoadmap } from './components/InductionRoadmap';
import { StationDetail } from './components/StationDetail';
import { InteractiveSymbols } from './components/InteractiveSymbols';
import { HymnSection } from './components/HymnSection';
import { CaseSimulator } from './components/CaseSimulator';
import { RegulationHub } from './components/RegulationHub';
import { ApprenticesRegistryView } from './components/ApprenticesRegistryView';
import { VirtualTutor } from './components/VirtualTutor';
import { InductionCertificate } from './components/InductionCertificate';
import { ProfileModal } from './components/ProfileModal';
import { UnifiedEvaluationModule } from './components/UnifiedEvaluationModule';
import { AdminAuthModal } from './components/AdminAuthModal';
import { SenaEmblem } from './components/SenaEmblem';
import { ExternalLink, Menu, X } from 'lucide-react';

const STORAGE_KEY = 'sena_apprentice_profile_v1';
const THEME_STORAGE_KEY = 'sena_induction_theme_mode';

const DEFAULT_PROFILE: ApprenticeProfile = {
  name: 'Alejandro Morales Gómez',
  documentType: 'CC',
  documentNumber: '1020456789',
  program: 'Análisis y Desarrollo de Software (ADSO)',
  programType: 'Tecnólogo',
  regional: 'Antioquia',
  center: 'Centro de Tecnología de la Manufactura Avanzada',
  avatarSeed: 'aprendiz_sena_1',
  completedStations: [1],
  quizScores: { 1: 100 },
  inductionCompleted: false
};

export default function App() {
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // LocalStorage fallback
    }
    return DEFAULT_PROFILE;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        return savedTheme === 'dark';
      }
      return true; // Default to the cyber-violet dark aesthetic from the reference image
    } catch {
      return true;
    }
  });

  const [isBlurring, setIsBlurring] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Administrator Access State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem('sena_admin_auth_token'));
    } catch {
      return false;
    }
  });
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);
  const [adminPin, setAdminPin] = useState<string>(() => {
    try {
      return localStorage.getItem('sena_admin_pin') || 'SENA2026';
    } catch {
      return 'SENA2026';
    }
  });

  // Protected navigation: block apprentices from directly viewing the registry/spreadsheet
  const handleNavigate = (view: string) => {
    if (view === 'registry' && !isAdminAuthenticated) {
      setIsAdminAuthModalOpen(true);
      return;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminAuthSuccess = (pin: string) => {
    setIsAdminAuthenticated(true);
    setAdminPin(pin);
    setIsAdminAuthModalOpen(false);
    setCurrentView('registry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitAdminMode = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('sena_admin_auth_token');
    } catch {
      //
    }
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync dark mode class on document element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, darkMode ? 'dark' : 'light');
    } catch {
      // LocalStorage handling
    }
  }, [darkMode]);

  // Sync profile to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // LocalStorage handling
    }
  }, [profile]);

  // Toggle dark mode with transition blur wash effect
  const handleToggleTheme = () => {
    setIsBlurring(true);
    setDarkMode((prev) => !prev);
    setTimeout(() => {
      setIsBlurring(false);
    }, 450);
  };

  const handleSelectStation = (station: Station) => {
    setSelectedStation(station);
    setCurrentView('station');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteStation = (stationId: number, score: number) => {
    setProfile((prev) => {
      const updatedCompleted = prev.completedStations.includes(stationId)
        ? prev.completedStations
        : [...prev.completedStations, stationId];

      return {
        ...prev,
        completedStations: updatedCompleted,
        quizScores: {
          ...prev.quizScores,
          [stationId]: score
        }
      };
    });
  };

  const handlePassFinalExam = (scorePct: number) => {
    setProfile((prev) => ({
      ...prev,
      finalExamScore: scorePct,
      inductionCompleted: true,
      completionDate: new Date().toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      certificateId: `SENA-IND-${prev.regional.substring(0, 3).toUpperCase()}-2026-${prev.documentNumber.slice(-4)}`
    }));
  };

  const handleSaveProfile = (updated: Partial<ApprenticeProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updated
    }));
  };

  const handleNextStationFromDetail = () => {
    if (!selectedStation) return;
    const currentIndex = INDUCTION_STATIONS.findIndex((s) => s.id === selectedStation.id);
    if (currentIndex >= 0 && currentIndex < INDUCTION_STATIONS.length - 1) {
      handleSelectStation(INDUCTION_STATIONS[currentIndex + 1]);
    } else {
      handleNavigate('exam');
    }
  };

  return (
    <div className={`min-h-screen bg-[#0e041d] dark:bg-[#090214] text-slate-100 flex flex-col font-sans transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      
      {/* Full-screen Blur Wash Overlay when toggling theme */}
      {isBlurring && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[100] backdrop-blur-md bg-slate-950/20 dark:bg-black/30 pointer-events-none theme-blur-active"
        />
      )}

      {/* Top Navbar adhering to Top Bar Contract with theme toggle */}
      <div className="no-print">
        <Navbar
          currentView={currentView}
          onNavigate={handleNavigate}
          profile={profile}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenCertificate={() => setCurrentView('certificate')}
          darkMode={darkMode}
          onToggleTheme={handleToggleTheme}
          isAdmin={isAdminAuthenticated}
        />
      </div>

      {/* Mobile Drawer Toggle Button */}
      <div className="lg:hidden no-print px-4 py-2 bg-[#170630] border-b border-[#37166e] flex items-center justify-between text-xs font-mono">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="flex items-center gap-2 text-[#00f2fe] font-bold"
        >
          {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>{mobileSidebarOpen ? 'CERRAR MENÚ' : 'MENÚ LATERAL'}</span>
        </button>
        <span className="text-slate-400">APRENDIZ: {profile.name.split(' ')[0]}</span>
      </div>

      {/* Master 2-Column Layout (Matching the exact architecture of reference image) */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto relative overflow-hidden">
        
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex shrink-0 no-print">
          <Sidebar
            currentView={currentView}
            onNavigate={handleNavigate}
            profile={profile}
            onOpenProfile={() => setIsProfileOpen(true)}
            onOpenCertificate={() => setCurrentView('certificate')}
            onOpenExam={() => handleNavigate('exam')}
            isAdmin={isAdminAuthenticated}
            onOpenAdminAuth={() => setIsAdminAuthModalOpen(true)}
            onExitAdminMode={handleExitAdminMode}
          />
        </div>

        {/* Mobile Slide-in Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex">
            <div className="relative">
              <Sidebar
                currentView={currentView}
                onNavigate={(view) => {
                  setMobileSidebarOpen(false);
                  handleNavigate(view);
                }}
                profile={profile}
                onOpenProfile={() => {
                  setMobileSidebarOpen(false);
                  setIsProfileOpen(true);
                }}
                onOpenCertificate={() => {
                  setMobileSidebarOpen(false);
                  setCurrentView('certificate');
                }}
                onOpenExam={() => {
                  setMobileSidebarOpen(false);
                  handleNavigate('exam');
                }}
                isAdmin={isAdminAuthenticated}
                onOpenAdminAuth={() => {
                  setMobileSidebarOpen(false);
                  setIsAdminAuthModalOpen(true);
                }}
                onExitAdminMode={() => {
                  setMobileSidebarOpen(false);
                  handleExitAdminMode();
                }}
              />
            </div>
            <div
              className="flex-1"
              onClick={() => setMobileSidebarOpen(false)}
            />
          </div>
        )}

        {/* Main Workspace Stage */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto w-full">
          
          {currentView === 'home' && (
            <InductionDashboardView
              profile={profile}
              stations={INDUCTION_STATIONS}
              onSelectStation={handleSelectStation}
              onOpenExam={() => {
                handleNavigate('exam');
              }}
              onOpenCertificate={() => setCurrentView('certificate')}
            />
          )}

          {currentView === 'stations' && (
            <div className="space-y-6">
              <InductionRoadmap
                stations={INDUCTION_STATIONS}
                profile={profile}
                onSelectStation={handleSelectStation}
                onOpenExam={() => {
                  handleNavigate('exam');
                }}
              />
            </div>
          )}

          {currentView === 'station' && selectedStation && (
            <StationDetail
              station={selectedStation}
              profile={profile}
              onBack={() => setCurrentView('home')}
              onCompleteStation={handleCompleteStation}
              onNextStation={handleNextStationFromDetail}
            />
          )}

          {currentView === 'symbols' && (
            <div className="space-y-8">
              <InteractiveSymbols />
              <HymnSection />
            </div>
          )}

          {currentView === 'regulation' && (
            <div className="space-y-8">
              <RegulationHub onGoToExam={() => handleNavigate('exam')} />
            </div>
          )}

          {currentView === 'registry' && (
            <div className="space-y-8">
              {isAdminAuthenticated ? (
                <ApprenticesRegistryView
                  currentProfile={profile}
                  onOpenCertificate={() => setCurrentView('certificate')}
                  onExitAdminMode={handleExitAdminMode}
                  adminPin={adminPin}
                />
              ) : (
                <div className="p-8 text-center bg-[#17062f] border border-[#3b1774] rounded-2xl max-w-lg mx-auto shadow-2xl">
                  <div className="w-12 h-12 rounded-xl bg-[#00f2fe]/10 border border-[#00f2fe]/40 text-[#00f2fe] flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">🛡️</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    Acceso Restringido a Administradores
                  </h3>
                  <p className="text-xs text-slate-300 font-mono mb-6 leading-relaxed">
                    Por seguridad de la información y cumplimiento de privacidad, la hoja de cálculo de respuestas está protegida. Ingresa tu clave para continuar.
                  </p>
                  <button
                    onClick={() => setIsAdminAuthModalOpen(true)}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#00f2fe] to-[#7f00ff] text-slate-950 font-bold font-mono text-xs rounded-xl shadow-lg cursor-pointer hover:brightness-110"
                  >
                    Desbloquear con PIN de Administrador
                  </button>
                </div>
              )}
            </div>
          )}

          {currentView === 'exam' && (
            <UnifiedEvaluationModule
              profile={profile}
              onUpdateProfile={handleSaveProfile}
              onPassExam={handlePassFinalExam}
              onViewCertificate={() => setCurrentView('certificate')}
              onGoToAdmin={() => handleNavigate('registry')}
            />
          )}

          {currentView === 'tutor' && (
            <VirtualTutor onBack={() => setCurrentView('home')} />
          )}

          {currentView === 'certificate' && (
            <InductionCertificate
              profile={profile}
              onBack={() => setCurrentView('home')}
            />
          )}

        </div>

      </div>

      {/* Modals */}
      <ProfileModal
        profile={profile}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onSaveProfile={handleSaveProfile}
        onOpenCertificate={() => setCurrentView('certificate')}
      />

      {/* Admin Authentication Security Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => {
          setIsAdminAuthModalOpen(false);
          if (currentView === 'registry' && !isAdminAuthenticated) {
            setCurrentView('home');
          }
        }}
        onSuccess={handleAdminAuthSuccess}
      />

      {/* Futuristic Cyber Footer */}
      <footer className="no-print bg-[#0b0216] border-t border-[#2d1259] text-xs text-slate-400 py-6 mt-12 transition-colors duration-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SenaEmblem className="w-6 h-7 text-[#00f2fe]" variant="official" />
            <div>
              <span className="font-semibold text-slate-200 font-mono tracking-wide">
                Servicio Nacional de Aprendizaje — SENA
              </span>
              <p className="text-[11px] text-slate-500 font-mono">
                Ministerio del Trabajo · República de Colombia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <a
              href="https://senasofiaplus.edu.co"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00f2fe] transition-colors flex items-center gap-1"
            >
              <span>SofiaPlus</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://zajuna.sena.edu.co"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00f2fe] transition-colors flex items-center gap-1"
            >
              <span>Zajuna LMS</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => setCurrentView('tutor')}
              className="hover:text-[#00f2fe] transition-colors cursor-pointer"
            >
              Tutor Institucional
            </button>
            {isAdminAuthenticated ? (
              <button
                onClick={handleExitAdminMode}
                className="text-[#ff2a85] hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-bold"
              >
                <span>Salir de Admin</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAdminAuthModalOpen(true)}
                className="text-slate-400 hover:text-[#00f2fe] transition-colors cursor-pointer flex items-center gap-1"
                title="Acceso restringido para coordinadores e instructores"
              >
                <span>Acceso Docente</span>
              </button>
            )}
          </div>

          <div className="text-[11px] font-mono text-slate-500">
            Acuerdo 007 de 2012 · Inducción Integral SENA
          </div>
        </div>
      </footer>

    </div>
  );
}
