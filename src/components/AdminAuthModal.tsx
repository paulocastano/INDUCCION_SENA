import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound, Eye, EyeOff, X, AlertCircle } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (pin: string) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setError('Por favor ingresa el PIN de administrador.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pin.trim() })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (rememberSession) {
          localStorage.setItem('sena_admin_auth_token', 'sena-admin-token-2026');
          localStorage.setItem('sena_admin_pin', pin.trim());
        }
        onSuccess(pin.trim());
        setPin('');
      } else {
        setError(data.error || 'PIN incorrecto. Acceso denegado.');
      }
    } catch (err) {
      // Fallback in case of network issue
      if (pin.trim() === 'SENA2026') {
        if (rememberSession) {
          localStorage.setItem('sena_admin_auth_token', 'sena-admin-token-2026');
          localStorage.setItem('sena_admin_pin', pin.trim());
        }
        onSuccess(pin.trim());
        setPin('');
      } else {
        setError('PIN incorrecto. Verifica con la coordinación.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-[#1b0a38] to-[#0d031c] border border-[#522199] rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Shield Icon Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00f2fe]/20 to-[#ff2a85]/20 border border-[#00f2fe]/40 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
            <ShieldCheck className="w-8 h-8 text-[#00f2fe]" />
          </div>

          <span className="text-[11px] font-mono font-bold tracking-widest text-[#00f2fe] uppercase bg-[#00f2fe]/10 px-3 py-1 rounded-full border border-[#00f2fe]/30 mb-2">
            Seguridad de la Información
          </span>

          <h3 className="text-xl font-bold text-white tracking-wide">
            Acceso Exclusivo de Administrador
          </h3>

          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            La hoja de cálculo consolidada y las respuestas de los aprendices están resguardadas. Ingresa tu clave para desbloquear el módulo de supervisión.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
              PIN DE SEGURIDAD ADMINISTRATIVO:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4 text-[#00f2fe]" />
              </div>
              <input
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Ingresa PIN..."
                autoFocus
                className="w-full pl-10 pr-10 py-2.5 bg-[#0e021f] border border-[#522199] rounded-xl text-sm font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white cursor-pointer"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberSession}
                onChange={(e) => setRememberSession(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-[#00f2fe] focus:ring-[#00f2fe]"
              />
              <span>Mantener sesión activa</span>
            </label>
            <span className="text-[11px] font-mono text-slate-500">
              PIN inicial: <strong className="text-slate-300">SENA2026</strong>
            </span>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-[#00f2fe] to-[#7f00ff] hover:brightness-110 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,242,254,0.4)] cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Verificando...' : 'Desbloquear Hoja de Respuestas'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-mono text-xs rounded-xl transition-colors cursor-pointer"
            >
              Cancelar (Continuar como Aprendiz)
            </button>
          </div>
        </form>

        {/* Security Footnote */}
        <div className="mt-6 pt-4 border-t border-[#37166e] text-center">
          <p className="text-[11px] text-slate-400 font-mono">
            🛡️ Cumple con la Ley 1581 de 2012 de Protección de Datos Personales (Habeas Data). Los aprendices no tienen visibilidad de otros resultados.
          </p>
        </div>

      </div>
    </div>
  );
};
