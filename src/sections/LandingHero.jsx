import React from 'react';
import ScrollDownIndicator from '../components/ScrollDownIndicator';
import { APP_CONFIG } from '../config/appConfig';

/**
 * LandingHero Section
 * Uses the official celebration artwork as the direct background image:
 * - Desktop/PC screens (>=768px): abhi-pc.png
 * - Mobile screens (<768px): abhi-mob.png
 * Suspends the interactive "Scroll Down" CTA button leading smoothly to the milestone piñata section.
 */
export const LandingHero = () => {
  return (
    <section
      id={APP_CONFIG.sections.hero}
      className="relative min-h-screen w-full bg-hero-artwork flex flex-col justify-end items-center pb-8 sm:pb-12 overflow-hidden shadow-inner"
    >
      {/* Interactive Scroll Down CTA hovering at the bottom */}
      <div className="z-20 transform hover:scale-105 transition-transform duration-300">
        <ScrollDownIndicator targetId={APP_CONFIG.sections.pinata} />
      </div>
    </section>
  );
};

export default LandingHero;
