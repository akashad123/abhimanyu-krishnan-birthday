import React from 'react';
import { Heart } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

/**
 * Footer Component
 * Warm, celebratory closing note honoring Abhimanyu Krishnan's first birthday
 * and his loving parents Praveen & Leeba.
 */
export const Footer = () => {
  return (
    <footer className="relative z-20 w-full bg-theme-cream py-12 px-4 border-t-2 border-theme-rope/20 text-center">
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
    </footer>
  );
};

export default Footer;
