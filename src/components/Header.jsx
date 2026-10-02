import React from 'react';
import { Camera, Heart, Sparkles } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

/**
 * Header Component
 * Subtle, warm navigation header that stays unobtrusive so the photography
 * and celebratory artwork remain the center of attention.
 */
export const Header = ({ onOpenUpload }) => {
  return (
    <header className="sticky top-0 z-40 bg-theme-cream/85 backdrop-blur-md border-b border-theme-cream border-opacity-70 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Child Monogram / Title */}
        <a
          href={`#${APP_CONFIG.sections.hero}`}
          className="flex items-center gap-2 group text-theme-navy focus:outline-none"
        >
          <span className="w-8 h-8 rounded-full bg-theme-sky/20 border border-theme-sky flex items-center justify-center text-theme-navy font-display font-bold text-sm group-hover:scale-105 transition-transform">
            AK
          </span>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm sm:text-base tracking-wide text-theme-navy group-hover:text-theme-blue transition-colors">
              {APP_CONFIG.childName}
            </span>
            <span className="text-[10px] sm:text-xs text-theme-ropeDark font-medium -mt-0.5">
              {APP_CONFIG.occasion}
            </span>
          </div>
        </a>

        {/* Quick Nav & Upload CTA */}
        <nav className="flex items-center gap-3 sm:gap-4">
          <a
            href={`#${APP_CONFIG.sections.memories}`}
            className="text-xs sm:text-sm font-semibold text-theme-navy hover:text-theme-sky transition-colors px-2.5 py-1.5 rounded-full hover:bg-white/60"
          >
            Memories
          </a>

          {/* Simple "Add a Memory" button without login */}
          <button
            type="button"
            onClick={onOpenUpload}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-theme-red hover:bg-theme-redDark text-white text-xs sm:text-sm font-display font-semibold shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-theme-red/50"
          >
            <Camera size={14} className="sm:w-4 sm:h-4" />
            <span>Add a Memory</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
