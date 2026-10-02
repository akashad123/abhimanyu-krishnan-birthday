import React from 'react';
import ScrollDownIndicator from '../components/ScrollDownIndicator';
import { APP_CONFIG } from '../config/appConfig';

/**
 * LandingHero Section
 * Displays the client's official celebration artwork featuring baby Abhimanyu Krishnan:
 * - Mobile screens (<768px): Uses /decorations/abhi-mob.png (portrait mobile composition)
 * - Desktop/PC screens (>=768px): Uses /decorations/abhi-pc.png (widescreen landscape composition)
 * Suspends the interactive "Scroll Down" CTA button leading smoothly to the milestone piñata section.
 */
export const LandingHero = () => {
  return (
    <section
      id={APP_CONFIG.sections.hero}
      className="relative min-h-screen bg-striped-wallpaper flex flex-col items-center justify-between pb-6 overflow-hidden"
    >
      {/* Visual Composition Container */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center">
        <picture className="w-full flex justify-center items-center">
          {/* PC / Desktop landscape version */}
          <source media="(min-width: 768px)" srcSet="/decorations/abhi-pc.png" />
          {/* Mobile portrait version */}
          <img
            src="/decorations/abhi-mob.png"
            alt="One Whole Year of Abhimanyu Krishnan — First Birthday"
            className="w-full max-h-[85vh] sm:max-h-[90vh] md:max-h-[92vh] w-auto object-contain drop-shadow-2xl mx-auto"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Suspended Scroll Down CTA */}
        <div className="-mt-8 sm:-mt-10 md:-mt-12 z-20">
          <ScrollDownIndicator targetId={APP_CONFIG.sections.pinata} />
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
