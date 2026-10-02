import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

/**
 * PinataSection Component
 * Uses the official milestone celebration artwork as the direct background image:
 * - Desktop/PC screens (>=768px): pinata-pc.png
 * - Mobile screens (<768px): pinata-mob.png
 * Features the milestone message and scroll CTA at the bottom leading to the memory gallery.
 */
export const PinataSection = () => {
  return (
    <section
      id={APP_CONFIG.sections.pinata}
      className="relative min-h-screen w-full bg-pinata-artwork flex flex-col justify-end items-center pb-8 sm:pb-12 px-4 overflow-hidden shadow-inner"
    >
      {/* Milestone Card positioned at bottom */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md bg-theme-creamLight/95 backdrop-blur-md border-2 border-theme-rope/40 rounded-3xl p-6 sm:p-7 text-center shadow-paper mb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-yellow/20 text-theme-navy font-display font-semibold text-xs mb-3">
          <Sparkles size={14} className="text-theme-yellow" />
          <span>Milestone Celebration</span>
        </div>

        <h2 className="font-display font-bold text-2xl sm:text-3xl text-theme-navy mb-2">
          Turning The Big One!
        </h2>

        <p className="font-body text-sm sm:text-base text-theme-navy/80 leading-relaxed mb-5">
          365 days of baby giggles, tiny footsteps, curious eyes, and endless love with{' '}
          <strong className="text-theme-blue font-semibold">{APP_CONFIG.childName}</strong>.
        </p>

        <a
          href={`#${APP_CONFIG.sections.memories}`}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-theme-blue hover:bg-theme-navy text-white font-display font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-theme-blue/30"
        >
          <span>Explore The Memory Album</span>
          <ChevronDown size={16} />
        </a>
      </div>
    </section>
  );
};

export default PinataSection;
