import React from 'react';
import BuntingGarland from '../components/BuntingGarland';
import FloatingBalloons from '../components/FloatingBalloons';
import PaperClouds from '../components/PaperClouds';
import ScatteredStars from '../components/ScatteredStars';
import ScrollDownIndicator from '../components/ScrollDownIndicator';
import { APP_CONFIG } from '../config/appConfig';

/**
 * LandingHero Section
 * Represents the first viewport experience up to the "Scroll Down" element.
 * Faithful to the approved mobile-first reference while providing an intentional
 * desktop/tablet composition with floating balloons, clouds, and hanging ropes.
 */
export const LandingHero = () => {
  return (
    <section
      id={APP_CONFIG.sections.hero}
      className="relative min-h-[92vh] sm:min-h-screen bg-striped-wallpaper flex flex-col items-center justify-between pt-4 pb-8 px-4 overflow-hidden"
    >
      {/* Top Festive Bunting Garland */}
      <BuntingGarland />

      {/* Decorative Atmosphere: Clouds, Balloons & Stars */}
      <PaperClouds />
      <FloatingBalloons />
      <ScatteredStars />

      {/* Main Composition Anchor */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto flex flex-col items-center mt-6 sm:mt-10">
        
        {/* Hanging Plaque Artwork */}
        <div className="relative w-full flex flex-col items-center drop-shadow-2xl">
          <img
            src="/decorations/hero-plaque.jpg"
            alt="One Whole Year of Abhimanyu Krishnan — First Birthday Plaque"
            className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] object-contain rounded-[42px] transition-transform duration-500 hover:scale-[1.01]"
            loading="eager"
            fetchPriority="high"
          />

          {/* Interactive Scroll Down CTA hanging below the plaque */}
          <div className="-mt-8 sm:-mt-10 z-20">
            <ScrollDownIndicator targetId={APP_CONFIG.sections.pinata} />
          </div>
        </div>

      </div>

      {/* Bottom breathing space connecting to the next section */}
      <div className="h-4 sm:h-6" />
    </section>
  );
};

export default LandingHero;
