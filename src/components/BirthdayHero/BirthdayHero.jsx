import React, { useRef, useEffect } from 'react';
import ScrollDownIndicator from '../ScrollDownIndicator';
import { initBirthdayHeroAnimation } from './birthdayHeroAnimation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { APP_CONFIG } from '../../config/appConfig';
import './BirthdayHero.css';

/**
 * BirthdayHero Component
 * Implements the layered, physical celebration scene with independent image layers:
 * - Striped wallpaper background
 * - Top bunting garland
 * - Left and right hanging paper decorations
 * - Individual floating balloons (red, yellow, blue, green)
 * - Centered "ONE WHOLE YEAR" Abhimanyu Krishnan birthday plaque with top rope
 * - Suspended Scroll Down indicator
 * Controlled smoothly by GSAP ScrollTrigger timeline.
 */
export const BirthdayHero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const leftDecoRef = useRef(null);
  const rightDecoRef = useRef(null);
  const balloonRedRef = useRef(null);
  const balloonYellowRef = useRef(null);
  const balloonBlueRef = useRef(null);
  const balloonGreenRef = useRef(null);
  const buntingRef = useRef(null);
  const cloudsFgRef = useRef(null);
  const cloudsBgRef = useRef(null);
  const scrollCtaRef = useRef(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const cleanup = initBirthdayHeroAnimation(
      {
        sectionRef,
        cardRef,
        leftDecoRef,
        rightDecoRef,
        balloonRedRef,
        balloonYellowRef,
        balloonBlueRef,
        balloonGreenRef,
        buntingRef,
        cloudsFgRef,
        cloudsBgRef,
        scrollCtaRef,
      },
      prefersReducedMotion
    );

    return cleanup;
  }, [prefersReducedMotion]);

  return (
    <section
      id={APP_CONFIG.sections.hero}
      ref={sectionRef}
      className="birthday-hero-container bg-striped-wallpaper"
    >
      {/* Layer 1: Background Decorative Paper Clouds */}
      <div
        ref={cloudsBgRef}
        className="hero-layer hero-layer-clouds inset-0 w-full h-full pointer-events-none"
      >
        <img
          src="/decorations/layers/cloud-left.png"
          alt=""
          className="absolute top-16 -left-10 w-44 sm:w-64 md:w-80 opacity-90 drop-shadow-sm"
          aria-hidden="true"
        />
        <img
          src="/decorations/layers/cloud-right.png"
          alt=""
          className="absolute top-24 -right-12 w-52 sm:w-72 md:w-96 opacity-90 drop-shadow-sm"
          aria-hidden="true"
        />
      </div>

      {/* Layer 2: Top Bunting Garland */}
      <div
        ref={buntingRef}
        className="hero-layer hero-layer-bunting flex justify-center"
      >
        <img
          src="/decorations/layers/bunting.png"
          alt="Festive Bunting"
          className="w-full max-w-[1400px] h-auto object-contain drop-shadow-md"
          loading="eager"
        />
      </div>

      {/* Layer 3: Left Hanging Decoration */}
      <div
        ref={leftDecoRef}
        className="hero-layer hero-layer-side-left w-36 sm:w-48 md:w-60 lg:w-72"
      >
        <img
          src="/decorations/layers/left-decoration.png"
          alt="Hanging Cloud Decoration"
          className="w-full h-auto object-contain drop-shadow-lg"
          loading="eager"
        />
      </div>

      {/* Layer 4: Right Hanging Decoration */}
      <div
        ref={rightDecoRef}
        className="hero-layer hero-layer-side-right w-36 sm:w-48 md:w-60 lg:w-72"
      >
        <img
          src="/decorations/layers/right-decoration.png"
          alt="Hanging Cloud Decoration"
          className="w-full h-auto object-contain drop-shadow-lg"
          loading="eager"
        />
      </div>

      {/* Layer 5: Independent Floating Balloons */}
      {/* Red Balloon - Left Mid */}
      <div
        ref={balloonRedRef}
        className="hero-layer hero-layer-balloon top-[48%] left-4 sm:left-12 md:left-20 w-16 sm:w-20 md:w-24 drop-shadow-xl"
      >
        <img
          src="/decorations/layers/balloon-red.png"
          alt="Red Celebration Balloon"
          className="w-full h-auto object-contain"
          loading="eager"
        />
      </div>

      {/* Yellow Balloon - Left Lower */}
      <div
        ref={balloonYellowRef}
        className="hero-layer hero-layer-balloon top-[68%] left-2 sm:left-8 md:left-16 w-14 sm:w-18 md:w-22 drop-shadow-xl"
      >
        <img
          src="/decorations/layers/balloon-yellow.png"
          alt="Yellow Celebration Balloon"
          className="w-full h-auto object-contain"
          loading="eager"
        />
      </div>

      {/* Blue Balloon - Right Mid */}
      <div
        ref={balloonBlueRef}
        className="hero-layer hero-layer-balloon top-[44%] right-4 sm:right-12 md:right-20 w-16 sm:w-20 md:w-24 drop-shadow-xl"
      >
        <img
          src="/decorations/layers/balloon-blue.png"
          alt="Blue Celebration Balloon"
          className="w-full h-auto object-contain"
          loading="eager"
        />
      </div>

      {/* Green Balloon - Right Lower */}
      <div
        ref={balloonGreenRef}
        className="hero-layer hero-layer-balloon top-[66%] right-2 sm:right-8 md:right-16 w-14 sm:w-18 md:w-22 drop-shadow-xl"
      >
        <img
          src="/decorations/layers/balloon-green.png"
          alt="Green Celebration Balloon"
          className="w-full h-auto object-contain"
          loading="eager"
        />
      </div>

      {/* Layer 6: Main Birthday Card (Abhimanyu Krishnan Plaque) */}
      <div
        ref={cardRef}
        className="hero-layer-card relative z-10 w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px] mx-auto px-4 mt-2 sm:mt-4"
      >
        <img
          src="/decorations/layers/birthday-card.png"
          alt="One Whole Year of Abhimanyu Krishnan — First Birthday Plaque"
          className="w-full h-auto object-contain drop-shadow-2xl"
          loading="eager"
          fetchPriority="high"
        />

        {/* Suspended Scroll Down CTA */}
        <div
          ref={scrollCtaRef}
          className="-mt-6 sm:-mt-8 md:-mt-10 z-20"
        >
          <ScrollDownIndicator targetId={APP_CONFIG.sections.pinata} />
        </div>
      </div>

      {/* Layer 7: Foreground Floor Paper Clouds */}
      <div
        ref={cloudsFgRef}
        className="hero-layer inset-x-0 -bottom-8 pointer-events-none flex justify-between z-20 opacity-95"
      >
        <img
          src="/decorations/layers/cloud-left.png"
          alt=""
          className="w-48 sm:w-72 md:w-96 -ml-10 object-contain drop-shadow-lg"
          aria-hidden="true"
        />
        <img
          src="/decorations/layers/cloud-right.png"
          alt=""
          className="w-56 sm:w-80 md:w-[440px] -mr-12 object-contain drop-shadow-lg"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

export default BirthdayHero;
