import React from 'react';
import { ChevronDown } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

/**
 * ScrollDownIndicator Component
 * Renders the suspended pill-shaped "Scroll Down" indicator button.
 * Suspended by two rope links below the main plaque in the reference image.
 */
export const ScrollDownIndicator = ({ targetId = APP_CONFIG.sections.pinata }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Two suspending mini ropes connecting from the plaque above */}
      <div className="flex justify-between w-28 sm:w-32 px-4 -mt-1 z-10">
        <div
          className="w-2.5 h-6 bg-theme-rope border-x border-theme-ropeDark shadow-inner"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #8F6433 0, #8F6433 3px, #DFC08E 3px, #DFC08E 6px)',
          }}
        />
        <div
          className="w-2.5 h-6 bg-theme-rope border-x border-theme-ropeDark shadow-inner"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #8F6433 0, #8F6433 3px, #DFC08E 3px, #DFC08E 6px)',
          }}
        />
      </div>

      {/* Pill Badge Container */}
      <a
        href={`#${targetId}`}
        onClick={handleClick}
        className="group relative inline-flex items-center justify-center px-6 py-2 rounded-full bg-theme-creamLight border-4 border-theme-cream shadow-paper hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-theme-sky/40"
        aria-label="Scroll down to the celebratory milestone"
      >
        {/* Inner red decorative outline */}
        <div className="absolute inset-1 rounded-full border-2 border-theme-red pointer-events-none" />

        {/* Content */}
        <div className="relative flex items-center gap-2 py-0.5 px-2">
          {/* Left decorative mark */}
          <span className="text-theme-red font-display font-bold text-xs tracking-tighter">
            ⪦
          </span>

          <span className="font-display font-bold text-theme-red text-base sm:text-lg tracking-wide uppercase">
            {APP_CONFIG.scrollDownText}
          </span>

          {/* Right decorative mark */}
          <span className="text-theme-red font-display font-bold text-xs tracking-tighter">
            ⪧
          </span>
        </div>

        {/* Floating downward pulse chevron */}
        <div className="absolute -bottom-2.5 text-theme-red bg-white rounded-full shadow-sm p-0.5 group-hover:translate-y-0.5 transition-transform">
          <ChevronDown size={14} strokeWidth={3} />
        </div>
      </a>
    </div>
  );
};

export default ScrollDownIndicator;
