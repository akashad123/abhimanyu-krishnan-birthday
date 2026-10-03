import React from 'react';

/**
 * PartyDrum Component
 * Celebratory illustrated party snare drum with crossed drumsticks
 * and floating musical notes in first-birthday celebration theme colors.
 * Used during the Number "1" Piñata explosion sequence.
 */
export const PartyDrum = ({ className = '', size = 72 }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none pointer-events-none drop-shadow-xl ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
      >
        <defs>
          {/* Drum Shell Gradient */}
          <linearGradient id="drumShell" x1="20" y1="40" x2="100" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#DE5347" />
            <stop offset="0.5" stopColor="#E54335" />
            <stop offset="1" stopColor="#B3281E" />
          </linearGradient>

          {/* Drumhead Gradient */}
          <linearGradient id="drumHead" x1="60" y1="20" x2="60" y2="45" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFDF9" />
            <stop offset="1" stopColor="#F5EFE6" />
          </linearGradient>

          {/* Golden Rim Gradient */}
          <linearGradient id="goldRim" x1="20" y1="20" x2="100" y2="25" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE082" />
            <stop offset="0.5" stopColor="#E5A93C" />
            <stop offset="1" stopColor="#C48822" />
          </linearGradient>

          {/* Stick Wood Gradient */}
          <linearGradient id="stickWood" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE8C2" />
            <stop offset="1" stopColor="#D4A373" />
          </linearGradient>
        </defs>

        {/* Floating Musical Notes (Left & Right) */}
        {/* Note 1 (Yellow) */}
        <g className="animate-bounce" style={{ animationDuration: '2s' }}>
          <path
            d="M18 22 C18 18 22 15 25 15 L28 14 L28 26 C26 25 22 25 20 27 C18 29 18 31 21 32 C24 33 28 31 28 28 L28 20"
            fill="#E5A93C"
          />
        </g>
        {/* Note 2 (Blue) */}
        <g className="animate-pulse" style={{ animationDuration: '1.8s' }}>
          <path
            d="M96 16 C96 13 99 11 102 11 L105 10 L105 21 C103 20 100 20 98 22 C96 24 96 26 99 27 C102 28 105 26 105 23 L105 16"
            fill="#4E93CB"
          />
        </g>

        {/* Crossed Drumstick Left */}
        <path
          d="M16 102 L98 22"
          stroke="url(#stickWood)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="98" cy="22" r="5" fill="#FFE082" />

        {/* Crossed Drumstick Right */}
        <path
          d="M104 102 L22 22"
          stroke="url(#stickWood)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="22" cy="22" r="5" fill="#FFE082" />

        {/* Drum Base Shadow */}
        <ellipse cx="60" cy="85" rx="38" ry="12" fill="#2C3E50" fillOpacity="0.25" />

        {/* Drum Shell Cylinder */}
        <path
          d="M22 36 L22 78 C22 86 39 92 60 92 C81 92 98 86 98 78 L98 36 Z"
          fill="url(#drumShell)"
        />

        {/* Criss-Cross Tension Cord Lines (Zig-Zag) */}
        <path
          d="M26 38 L42 88 L58 38 L74 88 L90 38"
          stroke="#FFFDF9"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.85"
        />

        {/* Tension Adjuster Beads */}
        <circle cx="42" cy="86" r="3" fill="#E5A93C" />
        <circle cx="58" cy="40" r="3" fill="#E5A93C" />
        <circle cx="74" cy="86" r="3" fill="#E5A93C" />

        {/* Bottom Rim */}
        <ellipse
          cx="60"
          cy="78"
          rx="38"
          ry="10"
          stroke="url(#goldRim)"
          strokeWidth="4"
          fill="none"
        />

        {/* Top Drumhead (White/Cream Skin) */}
        <ellipse
          cx="60"
          cy="36"
          rx="38"
          ry="11"
          fill="url(#drumHead)"
          stroke="url(#goldRim)"
          strokeWidth="4"
        />

        {/* Subtle Drumhead Highlight */}
        <ellipse
          cx="60"
          cy="36"
          rx="28"
          ry="7"
          fill="#FFFFFF"
          fillOpacity="0.4"
        />

        {/* Sound Vibrations / Sparkles */}
        <circle cx="12" cy="62" r="2.5" fill="#E5A93C" />
        <circle cx="108" cy="62" r="2.5" fill="#E5A93C" />
        <circle cx="60" cy="14" r="2" fill="#DE5347" />
      </svg>
    </div>
  );
};

export default PartyDrum;
