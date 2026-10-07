import React from 'react';

interface SenaEmblemProps {
  className?: string;
  variant?: 'shield' | 'walker' | 'official' | 'compact';
}

export const SENA_OFFICIAL_PATH = "M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6 c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6 c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3 c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1 l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4 c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2 c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1 l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z M280.6,268.9 l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z M557.5,269c0,0-51.9,0-77.9,0l0,137.7 l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7 l13.9,24.9l68.8,0L874,269.2L805.6,269.2z M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z M10.6,445.6l0.5,75l280.1-1 c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9 c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699 c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z";

export const SenaEmblem: React.FC<SenaEmblemProps> = ({ className = 'w-12 h-12', variant = 'shield' }) => {
  if (variant === 'walker' || variant === 'official') {
    // Official SENA master vector logotype with head, SENA text and walker legs
    return (
      <svg
        viewBox="0 0 1000 1000"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Logo Oficial SENA"
      >
        <path d={SENA_OFFICIAL_PATH} />
      </svg>
    );
  }

  // The official SENA heraldic shield representation with the 3 economic sectors
  return (
    <svg
      viewBox="0 0 120 140"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Escudo Oficial del SENA"
    >
      <defs>
        <linearGradient id="senaGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#39A900" />
          <stop offset="100%" stopColor="#256B00" />
        </linearGradient>
      </defs>

      {/* Outer Shield Boundary */}
      <path
        d="M60 6 L106 18 C106 68 96 112 60 134 C24 112 14 68 14 18 Z"
        fill="url(#senaGreenGrad)"
        stroke="#ffffff"
        strokeWidth="3"
      />

      {/* Inner White Field */}
      <path
        d="M60 14 L98 24 C98 64 90 104 60 124 C30 104 22 64 22 24 Z"
        fill="#ffffff"
      />

      {/* Top Left: Sector Primario (Coffee & Wheat / Coffee Bean) */}
      <g transform="translate(36, 40) scale(0.65)">
        {/* Coffee branch with beans */}
        <path d="M12 2 C18 10 18 20 12 30 C6 20 6 10 12 2 Z" fill="#39A900" />
        <path d="M12 2 C8 15 16 18 12 30" stroke="#256B00" strokeWidth="1.5" fill="none" />
        <circle cx="8" cy="12" r="3.5" fill="#FC7323" />
        <circle cx="16" cy="18" r="3.5" fill="#FC7323" />
        <circle cx="9" cy="24" r="3" fill="#FC7323" />
      </g>

      {/* Top Right: Sector Secundario (Industrial Cog / Gear wheel) */}
      <g transform="translate(68, 36) scale(0.7)">
        {/* Cog teeth */}
        <circle cx="16" cy="16" r="10" fill="#00324D" />
        <circle cx="16" cy="16" r="5" fill="#ffffff" />
        {/* Cog cogs */}
        <rect x="14" y="2" width="4" height="6" fill="#00324D" />
        <rect x="14" y="24" width="4" height="6" fill="#00324D" />
        <rect x="2" y="14" width="6" height="4" fill="#00324D" />
        <rect x="24" y="14" width="6" height="4" fill="#00324D" />
      </g>

      {/* Bottom Center: Sector Terciario (Caduceus / Torch of wisdom & services) */}
      <g transform="translate(50, 70) scale(0.7)">
        {/* Caduceus rod */}
        <line x1="14" y1="2" x2="14" y2="44" stroke="#00324D" strokeWidth="2.5" />
        <circle cx="14" cy="2" r="3" fill="#FC7323" />
        {/* Wings */}
        <path d="M14 6 C6 4 2 12 8 16 C12 18 14 14 14 14" fill="none" stroke="#39A900" strokeWidth="2" />
        <path d="M14 6 C22 4 26 12 20 16 C16 18 14 14 14 14" fill="none" stroke="#39A900" strokeWidth="2" />
        {/* Entwined ribbon / snake */}
        <path d="M8 22 C14 26 20 22 14 30 C8 36 20 40 14 44" fill="none" stroke="#00324D" strokeWidth="1.8" />
      </g>

      {/* Bottom Label Ribbon */}
      <path d="M38 126 L60 134 L82 126 Z" fill="#256B00" />
    </svg>
  );
};
