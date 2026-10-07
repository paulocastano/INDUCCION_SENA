import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageSquare, ArrowLeft } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}

const PRESET_QUESTIONS = [
  '¿Cómo justifico una inasistencia médica según el reglamento?',
  '¿Cuáles son las 5 alternativas para realizar mi Etapa Productiva?',
  '¿Qué cobertura me brinda la póliza de accidentes del SENA?',
  '¿Qué significan los tres elementos del escudo del SENA?',
  '¿Cuál es la diferencia entre SofiaPlus y la plataforma Zajuna?'
];

interface VirtualTutorProps {
  onBack?: () => void;
}

export const VirtualTutor: React.FC<VirtualTutorProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'tutor',
      text: '¡Hola, estimado aprendiz! Soy tu Tutor Virtual de Inducción SENA. Estoy aquí para orientarte en cualquier duda sobre el valor institucional, los símbolos patrios, el Reglamento del Aprendiz (Acuerdo 007 de 2012), las alternativas de etapa productiva o las plataformas SofiaPlus y Zajuna. ¿Qué deseas consultar hoy?',
      timestamp: 'Ahora'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query.trim() })
      });

      if (!response.ok) {
        throw new Error('Error al conectar con el servidor.');
      }

      const data = await response.json();
      const tutorMsg: ChatMessage = {
        id: `t-${Date.now()}`,
        sender: 'tutor',
        text: data.reply || 'No fue posible obtener respuesta en este momento.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } catch {
      // Offline / network fallback with verified institutional answer
      const tutorMsg: ChatMessage = {
        id: `t-${Date.now()}`,
        sender: 'tutor',
        text: 'Como aprendiz del SENA, recuerda que de acuerdo con el Acuerdo 007 de 2012, cuentas con deberes y derechos claramente establecidos. Para trámites académicos como inasistencias dispones de tres (3) días hábiles para justificar formalmente ante tu instructor y coordinación académica.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        {onBack ? (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la ruta</span>
          </button>
        ) : (
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            Acompañamiento Pedagógico Continuo
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Tutor Institucional Activo</span>
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="cyber-glass-panel rounded-2xl border border-[#3b1d75]/60 shadow-2xl flex flex-col h-[600px] overflow-hidden transition-colors duration-200 text-slate-100">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-[#2d145c] bg-[#14062a]/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#00f2fe] to-[#7f00ff] text-slate-950 flex items-center justify-center font-bold shadow-[0_0_10px_rgba(0,242,254,0.4)]">
              <Bot className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono text-white tracking-wide">
                Guía Institucional SENA
              </h3>
              <p className="text-[11px] font-mono text-[#00f2fe]">
                Orientación sobre Reglamento, FPI, Alternativas y Vida del Aprendiz
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Acuerdo 007 / 2012
          </span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                      : 'bg-emerald-600 dark:bg-emerald-500 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-slate-900 dark:bg-emerald-700 text-white rounded-tr-none'
                      : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <span
                    className={`block text-[10px] mt-1 font-mono ${
                      isUser ? 'text-slate-400 dark:text-emerald-200 text-right' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-bounce" />
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                <span>Consultando normatividad y valor institucional...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Pills */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide shrink-0">
            Dudas frecuentes:
          </span>
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400 rounded-md text-slate-700 dark:text-slate-300 hover:text-emerald-800 dark:hover:text-emerald-400 text-[11px] whitespace-nowrap transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe tu consulta sobre el reglamento, etapas o símbolos SENA..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
