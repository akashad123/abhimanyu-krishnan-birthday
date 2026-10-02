import React from 'react';

/**
 * FloatingBalloons Component
 * Renders decorative celebration balloons inspired by the visual reference.
 * Balloon colors: sky blue, coral red, sunshine yellow, and sage green with curly ribbons.
 */
export const FloatingBalloons = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {/* Top Left Balloon - Yellow/Gold */}
      <div className="absolute top-28 -left-6 sm:left-4 md:left-12 lg:left-24 animate-pulse duration-1000">
        <BalloonSvg color="#F5B738" highlight="#FDF0CD" width="58" height="74" />
      </div>

      {/* Mid Left Balloon - Warm Red */}
      <div className="absolute top-[52%] left-2 sm:left-8 md:left-20">
        <BalloonSvg color="#E65046" highlight="#F9D4D1" width="66" height="84" />
      </div>

      {/* Bottom Left Balloon - Pastel Yellow */}
      <div className="absolute top-[82%] left-3 sm:left-10 md:left-28">
        <BalloonSvg color="#F7C85B" highlight="#FFF5DC" width="62" height="78" />
      </div>

      {/* Top Right Balloon - Sky Blue & Gold Pair */}
      <div className="absolute top-20 right-2 sm:right-6 md:right-16 lg:right-28 flex gap-1">
        <div className="mt-4">
          <BalloonSvg color="#F5B738" highlight="#FDF0CD" width="46" height="60" />
        </div>
        <BalloonSvg color="#5299D3" highlight="#D0E6F7" width="54" height="68" />
      </div>

      {/* Mid Right Balloon - Sky Blue */}
      <div className="absolute top-[48%] right-3 sm:right-10 md:right-24">
        <BalloonSvg color="#5299D3" highlight="#D0E6F7" width="64" height="82" />
      </div>

      {/* Bottom Right Balloon - Sage Green */}
      <div className="absolute top-[78%] right-4 sm:right-12 md:right-32">
        <BalloonSvg color="#65A765" highlight="#D9EBD9" width="60" height="76" />
      </div>
    </div>
  );
};

// Reusable SVG Balloon with shaded highlight, knot, and curled ribbon
const BalloonSvg = ({ color, highlight, width = '60', height = '76' }) => {
  return (
    <div className="relative flex flex-col items-center drop-shadow-md transition-transform duration-700 hover:scale-105">
      <svg
        width={width}
        height={height}
        viewBox="0 0 60 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id={`grad-${color.replace('#', '')}`}
            cx="35%"
            cy="35%"
            r="65%"
            fx="30%"
            fy="30%"
          >
            <stop offset="0%" stopColor={highlight} />
            <stop offset="60%" stopColor={color} />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
          </radialGradient>
        </defs>
        {/* Balloon Body */}
        <ellipse
          cx="30"
          cy="34"
          rx="27"
          ry="33"
          fill={`url(#grad-${color.replace('#', '')})`}
        />
        {/* Balloon Knot */}
        <polygon points="26,67 34,67 30,73" fill={color} />
        {/* Curled Ribbon String */}
        <path
          d="M30 73 Q 24 85 36 98 T 28 118"
          stroke="#C89F6B"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default FloatingBalloons;
