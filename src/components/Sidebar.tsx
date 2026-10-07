import React, { useState } from 'react';
import { ApprenticeProfile } from '../types/induction';
import { SenaEmblem } from './SenaEmblem';
import {
  LayoutDashboard,
  Compass,
  Flag,
  Scale,
  Bot,
  GraduationCap,
  Award,
  Search,
  ChevronRight,
  Sparkles,
  UserCheck,
  FileSpreadsheet,
  Lock,
  ShieldCheck,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  profile: ApprenticeProfile;
  onOpenProfile: () => void;
  onOpenCertificate: () => void;
  onOpenExam: () => void;
  isAdmin?: boolean;
  onOpenAdminAuth?: () => void;
  onExitAdminMode?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  profile,
  onOpenProfile,
  onOpenCertificate,
  onOpenExam,
  isAdmin = false,
  onOpenAdminAuth,
  onExitAdminMode
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const completedCount = profile.completedStations.length;
  const progressPct = Math.round((completedCount / 5) * 100);

  // Note: 'registry' (Hoja de cálculo) is ONLY displayed if the user is authenticated as Admin.
  // Apprentices do NOT have visibility of the spreadsheet or other learners' records.
  const navItems = [
    { id: 'home', label: 'PANEL GENERAL', icon: LayoutDashboard },
    { id: 'stations', label: '5 ESTACIONES', icon: Compass },
    { id: 'symbols', label: 'SÍMBOLOS E HIMNO', icon: Flag },
    { id: 'regulation', label: 'REGLAMENTO & CASOS', icon: Scale },
    ...(isAdmin ? [{ id: 'registry', label: 'HOJA DE CÁLCULO (ADMIN)', icon: FileSpreadsheet }] : []),
    { id: 'tutor', label: 'TUTOR VIRTUAL', icon: Bot },
    { id: 'exam', label: 'EVALUACIÓN Y RANKING', icon: GraduationCap },
    { id: 'certificate', label: 'MI CERTIFICADO', icon: Award }
  ];

  const filteredItems = navItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="w-72 bg-gradient-to-b from-[#190833] via-[#110524] to-[#0a0217] border-r border-[#3b1d75]/50 flex flex-col justify-between shrink-0 shadow-2xl relative z-40 select-none">
      
      {/* Top Profile / Luminous Avatar Section (Directly inspired by reference image) */}
      <div className="p-6 flex flex-col items-center text-center border-b border-[#2d145c]/60 relative overflow-hidden">
        
        {/* Ambient radial glow */}
        <div className="absolute top-2 w-48 h-48 bg-[#9b51e0]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Luminous Glowing Circular Avatar Ring */}
        <div className="relative mb-4 cursor-pointer group" onClick={onOpenProfile} title="Editar Perfil del Aprendiz">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#00f2fe] via-[#7f00ff] to-[#ff2a85] cyber-glow-ring flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#1f0b3d] to-[#0c031a] flex items-center justify-center overflow-hidden relative">
              <SenaEmblem className="w-12 h-12 text-[#00f2fe] drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]" variant="walker" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#ff2a85]/20 to-transparent pointer-events-none" />
            </div>
          </div>
          {/* Status badge pill */}
          <span className="absolute bottom-0 right-1 w-5 h-5 bg-[#00f2fe] text-[#0a0217] rounded-full flex items-center justify-center shadow-lg border-2 border-[#190833] text-[10px] font-bold">
            ✓
          </span>
        </div>

        {/* Apprentice Identity Prose */}
        <h3 className="text-sm font-bold text-white tracking-wider uppercase drop-shadow-sm truncate max-w-[220px]">
          {profile.name}
        </h3>
        <p className="text-[11px] font-mono text-[#00f2fe] tracking-wide mt-0.5 truncate max-w-[220px]">
          {profile.programType} · {profile.regional}
        </p>
        <p className="text-[10px] text-slate-400 truncate max-w-[220px] mt-0.5">
          {profile.program}
        </p>

        {/* Search Bar matching reference pill style */}
        <div className="w-full mt-5 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="BUSCAR MÓDULO..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#250d4a]/70 border border-[#4a2291]/60 rounded-full text-[11px] font-mono tracking-wider text-slate-200 placeholder:text-[#8c6bc7] focus:outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe]/40 transition-all"
          />
          <Search className="w-3.5 h-3.5 text-[#00f2fe] absolute left-3 top-2.5 pointer-events-none" />
        </div>

      </div>

      {/* Navigation Menu with Layered Horizontal Glass Stripes & Active Ribbon Tab */}
      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {filteredItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;

          if (isActive) {
            // Active state: The iconic cyan-to-violet pointed ribbon tab from reference image ("APPS" tab)
            return (
              <div
                key={item.id}
                className="relative my-1"
              >
                <button
                  onClick={() => {
                    if (item.id === 'exam') {
                      onOpenExam();
                    } else if (item.id === 'certificate') {
                      onOpenCertificate();
                    } else {
                      onNavigate(item.id);
                    }
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#00f2fe] via-[#4facfe] to-[#7f00ff] text-slate-950 font-bold text-xs tracking-wider cyber-active-tab shadow-[0_0_20px_rgba(0,242,254,0.4)] cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-950" />
                    <span className="font-mono">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-950 mr-2" />
                </button>
              </div>
            );
          }

          // Inactive state: Layered dark-glass stripe with hover glow
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'exam') {
                  onOpenExam();
                } else if (item.id === 'certificate') {
                  onOpenCertificate();
                } else {
                  onNavigate(item.id);
                }
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#200d40]/40 hover:bg-[#30135c]/70 border border-[#3b1970]/30 hover:border-[#6a2cbd]/50 text-slate-300 hover:text-white text-xs font-mono tracking-wider transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-[#a370f7] group-hover:text-[#00f2fe] transition-colors" />
                <span>{item.label}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </button>
          );
        })}
      </nav>

      {/* Bottom Mini Status Ribbon */}
      <div className="p-4 border-t border-[#260f4a]/70 bg-[#0d031c]/90">
        <div className="flex items-center justify-between text-[11px] font-mono mb-2">
          <span className="text-slate-400">INDUCCIÓN SENA</span>
          <span className="text-[#00f2fe] font-bold">{progressPct}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#250d4a] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00f2fe] via-[#9b51e0] to-[#ff2a85] transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 font-mono">
          <span>{completedCount}/5 ESTACIONES</span>
          <button
            onClick={onOpenCertificate}
            className="text-[#ff2a85] hover:text-[#ff65a9] font-bold hover:underline cursor-pointer"
          >
            {profile.inductionCompleted ? 'VER DIPLOMA' : 'PENDIENTE'}
          </button>
        </div>

        {/* Discrete Administrator Access button or Active Mode indicator */}
        <div className="mt-3 pt-2.5 border-t border-[#260f4a]">
          {isAdmin ? (
            <div className="flex items-center justify-between bg-[#1f0a38] border border-[#522199] rounded-lg p-2 text-[10px] font-mono">
              <div className="flex items-center gap-1.5 text-[#00f2fe] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ADMIN ACTIVO</span>
              </div>
              {onExitAdminMode && (
                <button
                  onClick={onExitAdminMode}
                  className="text-slate-400 hover:text-white hover:underline flex items-center gap-1 cursor-pointer"
                  title="Salir del modo administrador"
                >
                  <LogOut className="w-3 h-3 text-[#ff2a85]" />
                  <span>Salir</span>
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAdminAuth}
              className="w-full py-1.5 px-2.5 rounded-lg bg-[#140628]/60 hover:bg-[#230b44] border border-[#37166e]/40 hover:border-[#00f2fe]/40 text-slate-400 hover:text-[#00f2fe] text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              title="Portal restringido para instructores y coordinadores"
            >
              <Lock className="w-3 h-3 text-[#00f2fe]" />
              <span>Portal Administrador</span>
            </button>
          )}
        </div>
      </div>

    </aside>
  );
};
