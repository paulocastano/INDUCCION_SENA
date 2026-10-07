import React, { useState } from 'react';
import { ApprenticeProfile } from '../types/induction';
import { COLOMBIAN_REGIONALS, SAMPLE_CENTERS, SAMPLE_PROGRAMS } from '../data/senaInductionData';
import { User, X, Check, Award, BookOpen, MapPin, Building, ShieldCheck } from 'lucide-react';

interface ProfileModalProps {
  profile: ApprenticeProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (updated: Partial<ApprenticeProfile>) => void;
  onOpenCertificate: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSaveProfile,
  onOpenCertificate
}) => {
  const [name, setName] = useState(profile.name);
  const [documentType, setDocumentType] = useState(profile.documentType);
  const [documentNumber, setDocumentNumber] = useState(profile.documentNumber);
  const [ficha, setFicha] = useState(profile.ficha || '');
  const [email, setEmail] = useState(profile.email || '');
  const [regional, setRegional] = useState(profile.regional);
  const [center, setCenter] = useState(profile.center);
  const [program, setProgram] = useState(profile.program);
  const [programType, setProgramType] = useState(profile.programType);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      name: name.trim(),
      documentType,
      documentNumber: documentNumber.trim(),
      ficha: ficha.trim(),
      email: email.trim(),
      regional,
      center: center.trim(),
      program: program.trim(),
      programType
    });
    onClose();
  };

  const completedCount = profile.completedStations.length;
  const progressPct = Math.round((completedCount / 5) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full flex flex-col shadow-xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Pasaporte y Perfil del Aprendiz
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configura tus datos para la expedición de tu certificado oficial
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          
          {/* Induction Passport Status Widget */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Estado de Inducción</span>
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                {progressPct}% ({completedCount}/5 Estaciones)
              </span>
            </div>

            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-slate-500 dark:text-slate-400">
                {profile.inductionCompleted
                  ? 'Acreditación culminada'
                  : 'Faltan estaciones por completar'}
              </span>
              {profile.inductionCompleted && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCertificate();
                  }}
                  className="font-semibold text-emerald-800 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Ver Certificado</span>
                </button>
              )}
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nombre Completo del Aprendiz
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 transition-all text-slate-800 dark:text-slate-100"
            />
          </div>

          {/* Document Type & Number */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5 col-span-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Tipo Doc.
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 text-slate-800 dark:text-slate-100"
              >
                <option value="CC">C.C.</option>
                <option value="TI">T.I.</option>
                <option value="CE">C.E.</option>
                <option value="PEP">P.E.P.</option>
              </select>
            </div>

            <div className="space-y-1.5 col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Número de Documento
              </label>
              <input
                type="text"
                required
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Ficha & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Ficha de Caracterización
              </label>
              <input
                type="text"
                required
                placeholder="Ej. 2874102"
                value={ficha}
                onChange={(e) => setFicha(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 text-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Correo Institucional / Personal
              </label>
              <input
                type="email"
                required
                placeholder="aprendiz@misena.edu.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Regional */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Regional SENA
            </label>
            <select
              value={regional}
              onChange={(e) => setRegional(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 text-slate-800 dark:text-slate-100"
            >
              {COLOMBIAN_REGIONALS.map((reg) => (
                <option key={reg} value={reg}>
                  Regional {reg}
                </option>
              ))}
            </select>
          </div>

          {/* Training Center */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Centro de Formación
            </label>
            <input
              type="text"
              required
              list="centers-list"
              value={center}
              onChange={(e) => setCenter(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 text-slate-800 dark:text-slate-100"
            />
            <datalist id="centers-list">
              {SAMPLE_CENTERS.map((c, i) => (
                <option key={i} value={c} />
              ))}
            </datalist>
          </div>

          {/* Program & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Programa de Formación
              </label>
              <input
                type="text"
                required
                list="programs-list"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 text-slate-800 dark:text-slate-100"
              />
              <datalist id="programs-list">
                {SAMPLE_PROGRAMS.map((p, i) => (
                  <option key={i} value={p} />
                ))}
              </datalist>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Nivel
              </label>
              <select
                value={programType}
                onChange={(e) => setProgramType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 text-slate-800 dark:text-slate-100"
              >
                <option value="Tecnólogo">Tecnólogo</option>
                <option value="Técnico">Técnico</option>
                <option value="Operario">Operario</option>
                <option value="Especialización Tecnológica">Especialización</option>
              </select>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Guardar Cambios
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
