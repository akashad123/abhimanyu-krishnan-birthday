import React from 'react';
import { Heart } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

/**
 * Footer Component
 * Warm, celebratory closing note honoring Abhimanyu Krishnan's first birthday
 * and his loving parents Praveen & Leeba.
 * 
 * Features:
 * - Organic multi-layered wave transition matching the theme and app.haikei.app reference
 * - Monogram AK emblem
 * - Parents note with heart badge
 * - Bathakkah Invites branding with official monogram logo
 */
export const Footer = () => {
  return (
    <footer className="relative z-20 w-full text-center">
      {/* Organic Celebratory Wave Transition into Footer matching app.haikei.app reference */}
      <div className="relative w-full overflow-hidden leading-none pointer-events-none -mb-1">
        <svg
          viewBox="0 0 1440 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-20 min-[400px]:h-28 sm:h-36 md:h-44 lg:h-52"
          preserveAspectRatio="none"
        >
          {/* Base background matching CommunityMemories creamLight (#FCFAF6) */}
          <rect width="1440" height="280" fill="#FCFAF6" />

          {/* Layer 1: Translucent Sky Blue Wave (#5299D3, 40% opacity) */}
          <path
            d="M0,135 C180,135 320,95 480,95 C680,95 780,175 940,175 C1080,175 1180,85 1320,85 C1380,85 1415,115 1440,135 L1440,280 L0,280 Z"
            fill="#5299D3"
            fillOpacity="0.4"
          />

          {/* Layer 2: Main Solid Sky Blue Wave (#5299D3, matching site theme) */}
          <path
            d="M0,160 C200,160 340,115 500,115 C700,115 800,190 960,190 C1100,190 1190,105 1330,105 C1390,105 1420,130 1440,150 L1440,280 L0,280 Z"
            fill="#5299D3"
          />

          {/* Layer 3: Foreground Footer Cream Wave (#F8F5EE matching footer background) */}
          <path
            d="M0,185 C220,185 360,140 520,140 C720,140 820,215 980,215 C1120,215 1200,130 1340,130 C1390,130 1420,150 1440,170 L1440,280 L0,280 Z"
            fill="#F8F5EE"
          />
        </svg>
      </div>

      {/* Main Footer Body Canvas */}
      <div className="bg-theme-cream pt-2 pb-12 sm:pb-16 px-4">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {/* Monogram emblem */}
          <div className="w-12 h-12 rounded-full bg-theme-sky/20 border-2 border-theme-sky flex items-center justify-center text-theme-navy font-display font-bold text-lg mb-3 shadow-sm">
            AK
          </div>

          <h3 className="font-display font-bold text-xl sm:text-2xl text-theme-navy mb-1">
            {APP_CONFIG.childName}
          </h3>

          <p className="text-xs sm:text-sm text-theme-ropeDark font-medium mb-4">
            Celebrating 1 Year of Love, Laughter & Joy
          </p>

          {/* Parents Note */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/70 border border-theme-rope/20 text-xs sm:text-sm text-theme-navy font-body mb-6">
            <span>With love & blessings,</span>
            <strong className="font-semibold text-theme-blue">{APP_CONFIG.parentsName}</strong>
            <Heart size={13} className="text-theme-red fill-theme-red" />
          </div>

          <p className="text-[11px] text-theme-navy/40 mb-6">
            Digital Memory Album &bull; {new Date().getFullYear()}
          </p>

          {/* Bathakkah Invites Branding */}
          <div className="pt-6 border-t border-theme-rope/20 flex flex-col items-center w-full max-w-sm">
            <div className="flex items-center gap-2.5 mb-1">
              <img
                src="/logo.png"
                alt="Bathakkah Invites Logo"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-contain shadow-sm"
                loading="lazy"
              />
              <span className="font-display font-bold text-base sm:text-lg text-theme-navy tracking-tight">
                Bathakkah Invites
              </span>
            </div>
            <p className="text-xs text-theme-navy/70 font-body italic">
              your story, beautifully invited
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
