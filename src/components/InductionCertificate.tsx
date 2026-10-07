import React from 'react';
import { ApprenticeProfile } from '../types/induction';
import { SenaEmblem } from './SenaEmblem';
import { Award, Printer, Download, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

interface InductionCertificateProps {
  profile: ApprenticeProfile;
  onBack: () => void;
}

export const InductionCertificate: React.FC<InductionCertificateProps> = ({
  profile,
  onBack
}) => {
  const currentDate = profile.completionDate || new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const certFolio = profile.certificateId || `SENA-IND-${profile.regional.substring(0, 3).toUpperCase()}-2026-${profile.documentNumber.slice(-4)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top action controls (hidden when printing) */}
      <div className="no-print flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la plataforma</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar como PDF</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Paper Container */}
      <div className="bg-white p-8 sm:p-14 rounded-2xl shadow-lg border-8 border-double border-emerald-900/30 relative text-slate-900 overflow-hidden">
        
        {/* Decorative corner emblems */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-emerald-800" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-emerald-800" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-emerald-800" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-emerald-800" />

        {/* Certificate Content */}
        <div className="text-center space-y-6 relative z-10 max-w-3xl mx-auto">
          
          {/* Header Logos & Titles */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <SenaEmblem className="w-16 h-20" variant="shield" />
            <div>
              <div className="text-xs tracking-[0.25em] uppercase font-bold text-slate-500">
                República de Colombia
              </div>
              <div className="text-lg sm:text-xl font-bold tracking-wide text-emerald-900 uppercase mt-0.5">
                Servicio Nacional de Aprendizaje — SENA
              </div>
              <div className="text-xs font-semibold text-slate-500 tracking-wider uppercase mt-1">
                Regional {profile.regional} · {profile.center}
              </div>
            </div>
          </div>

          {/* Certificate Award Title */}
          <div className="py-2">
            <span className="text-xs tracking-[0.3em] uppercase text-emerald-800 font-semibold block mb-1">
              Constancia Oficial de Acreditación
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Certificado de Inducción Institucional
            </h1>
          </div>

          <div className="text-sm text-slate-600">
            Hace constar que el aprendiz:
          </div>

          {/* Learner Name & Document */}
          <div className="py-2">
            <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-emerald-950 tracking-tight">
              {profile.name}
            </div>
            <div className="text-xs font-mono text-slate-600 mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <span><strong>Documento:</strong> {profile.documentType} No. {profile.documentNumber}</span>
              {profile.ficha && <span><strong>Ficha:</strong> {profile.ficha}</span>}
              {profile.email && <span className="text-emerald-800"><strong>Correo:</strong> {profile.email}</span>}
            </div>
          </div>

          {/* Purpose Statement */}
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl mx-auto">
            Ha cursado, comprendido y aprobado satisfactoriamente todos los módulos de la <strong>Semana de Inducción SENA</strong>, demostrando apropiación cabal de los <strong>Símbolos Patrios e Institucionales</strong>, la <strong>Historia y Misión</strong>, los principios de la <strong>Formación Profesional Integral (FPI)</strong>, las alternativas de la <strong>Etapa Productiva</strong> y la evaluación estandarizada de 35 preguntas del <strong>Reglamento del Aprendiz (Acuerdo 007 de 2012)</strong>.
          </p>

          {/* Program Information Box & Academic Performance Badges */}
          <div className="space-y-2 max-w-xl mx-auto">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/90 text-xs text-slate-700 inline-block w-full">
              <span className="font-semibold text-slate-900 block text-sm">
                Programa de Formación: {profile.program} ({profile.programType})
              </span>
              <div className="flex flex-wrap items-center justify-between text-slate-500 mt-1 text-[11px] gap-2">
                <span>Regional {profile.regional} — {profile.center}</span>
                <span>SofiaPlus & Zajuna LMS · Modalidad Regular</span>
              </div>
            </div>

            {/* Performance Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
              <div className="px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-300 text-emerald-800 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Evaluación: {profile.finalExamScore ? `${profile.finalExamScore}%` : '100%'} (35/35 Pts)</span>
              </div>
              {profile.totalGamifiedPoints ? (
                <div className="px-3 py-1 bg-amber-50 rounded-lg border border-amber-300 text-amber-900 font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Puntuación Gamificada: {profile.totalGamifiedPoints} PTS</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Verification Folio & Signatures */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 items-end border-t border-slate-200">
            
            {/* Signature 1 */}
            <div className="text-center space-y-1">
              <div className="w-36 mx-auto border-b border-slate-400 pb-1 font-serif italic text-xs text-slate-500">
                Firma Digital Certificada
              </div>
              <div className="text-[11px] font-bold text-slate-800">
                Subdirección de Centro
              </div>
              <div className="text-[10px] text-slate-400">
                Centro de Formación SENA
              </div>
            </div>

            {/* Verification Stamp / Seal */}
            <div className="hidden sm:flex flex-col items-center justify-center space-y-1">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-emerald-700 flex flex-col items-center justify-center text-emerald-800 p-1">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
                <span className="text-[8px] font-bold tracking-tighter uppercase">Válido</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 tabular-nums">
                {currentDate}
              </span>
            </div>

            {/* Signature 2 */}
            <div className="text-center space-y-1">
              <div className="w-36 mx-auto border-b border-slate-400 pb-1 font-serif italic text-xs text-slate-500">
                Firma Digital Certificada
              </div>
              <div className="text-[11px] font-bold text-slate-800">
                Coordinación Académica
              </div>
              <div className="text-[10px] text-slate-400">
                Bienestar al Aprendiz
              </div>
            </div>

          </div>

          {/* Footer Security Folio */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono border-t border-slate-100">
            <span>Folio Único: {certFolio}</span>
            <span>Verificación en línea: senasofiaplus.edu.co</span>
            <span>Resolución 007 / Inducción Integral</span>
          </div>

        </div>

      </div>

    </div>
  );
};
