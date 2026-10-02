import React from 'react';
import FloatingBalloons from '../components/FloatingBalloons';
import PaperClouds from '../components/PaperClouds';
import ScatteredStars from '../components/ScatteredStars';
import { ChevronDown, Sparkles } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

/**
 * PinataSection Component
 * Reveals the next visual moment from the reference: the hanging "1" piñata
 * suspended from the rope with colorful fringed paper layers, floating balloons,
 * and clouds as the visitor scrolls down.
 */
export const PinataSection = () => {
  return (
    <section
      id={APP_CONFIG.sections.pinata}
      className="relative min-h-screen bg-striped-wallpaper flex flex-col items-center justify-between pt-2 pb-12 px-4 overflow-hidden"
    >
      {/* Background Decorative Atmosphere */}
      <PaperClouds />
      <FloatingBalloons />
      <ScatteredStars />

      {/* Centerpiece Pinata Visual */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto flex flex-col items-center">
        
        {/* Suspended Number 1 Pinata Artwork */}
        <div className="relative w-full flex flex-col items-center drop-shadow-2xl">
          <img
            src="/decorations/pinata-milestone.jpg"
            alt="Abhimanyu Krishnan Number 1 Birthday Pinata"
            className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] object-contain rounded-[42px] transition-transform duration-500 hover:scale-[1.01]"
            loading="lazy"
          />
        </div>

        {/* Milestone Card */}
        <div className="mt-6 sm:mt-8 w-full max-w-sm sm:max-w-md bg-theme-creamLight/95 backdrop-blur-sm border-2 border-theme-rope/40 rounded-3xl p-6 sm:p-7 text-center shadow-paper">
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
      </div>

      <div className="h-4 sm:h-6" />
    </section>
  );
};

export default PinataSection;
