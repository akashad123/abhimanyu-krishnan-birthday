import React, { useRef, useEffect } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
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
 * - Left and right hanging paper decorations suspended from the top ceiling
 * - Individual floating balloons (red, yellow, blue, green)
 * - Centered "ONE WHOLE YEAR" Abhimanyu Krishnan birthday plaque hanging from top ceiling
 * - Natural physical pendulum swaying on all hanging decorations
 * - Scroll-driven upward card pull and outward side parting
 */
export const BirthdayHero = () => {
  const sectionRef = useRef(null);

  // Card refs (scroll translation & idle pendulum swing)
  const cardScrollRef = useRef(null);
  const cardSwingRef = useRef(null);

  // Piñata and milestone refs
  const pinataRef = useRef(null);
  const pinataSwingRef = useRef(null);
  const milestoneRef = useRef(null);

  // Left decoration refs
  const leftDecoScrollRef = useRef(null);
  const leftDecoSwingRef = useRef(null);

  // Right decoration refs
  const rightDecoScrollRef = useRef(null);
  const rightDecoSwingRef = useRef(null);

  // Balloons outer (scroll) & inner (idle) refs
  const balloonRedRef = useRef(null);
  const balloonRedInnerRef = useRef(null);
  const balloonYellowRef = useRef(null);
  const balloonYellowInnerRef = useRef(null);
  const balloonBlueRef = useRef(null);
  const balloonBlueInnerRef = useRef(null);
  const balloonGreenRef = useRef(null);
  const balloonGreenInnerRef = useRef(null);

  // Celebration Drums outer (scroll) & inner (idle) refs
  const drumRightRef = useRef(null);
  const drumRightInnerRef = useRef(null);
  const drumLeftRef = useRef(null);
  const drumLeftInnerRef = useRef(null);

  // Other layer refs
  const buntingRef = useRef(null);
  const cloudsFgRef = useRef(null);
  const scrollCtaRef = useRef(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const cleanup = initBirthdayHeroAnimation(
      {
        sectionRef,
        cardScrollRef,
        cardSwingRef,
        pinataRef,
        pinataSwingRef,
        milestoneRef,
        leftDecoScrollRef,
        leftDecoSwingRef,
        rightDecoScrollRef,
        rightDecoSwingRef,
        balloonRedRef,
        balloonRedInnerRef,
        balloonYellowRef,
        balloonYellowInnerRef,
        balloonBlueRef,
        balloonBlueInnerRef,
        balloonGreenRef,
        balloonGreenInnerRef,
        drumRightRef,
        drumRightInnerRef,
        drumLeftRef,
        drumLeftInnerRef,
        buntingRef,
        cloudsFgRef,
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
      className="birthday-hero-container"
    >
      {/* Layer 1: Top Bunting Garland */}
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

      {/* Layer 3: Left Hanging Decoration (Hangs from Top Ceiling) */}
      <div
        ref={leftDecoScrollRef}
        className="hero-side-assembly-left"
      >
        <div
          ref={leftDecoSwingRef}
          className="flex flex-col items-center"
          style={{ transformOrigin: 'top center' }}
        >
          {/* Braided Rope extending directly from the top */}
          <div className="braided-rope w-2.5 sm:w-3.5 h-16 sm:h-24 md:h-32" />

          {/* Cloud with Dangling Golden Star */}
          <div className="relative -mt-2">
            <img
              src="/decorations/layers/cloud-right.png"
              alt="Hanging Cloud Decoration"
              className="w-24 sm:w-36 md:w-44 lg:w-52 h-auto object-contain drop-shadow-lg"
              loading="eager"
            />
            <img
              src="/decorations/layers/star-yellow.png"
              alt="Hanging Star"
              className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-8 sm:w-11 md:w-14 drop-shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Layer 4: Right Hanging Decoration (Hangs from Top Ceiling) */}
      <div
        ref={rightDecoScrollRef}
        className="hero-side-assembly-right"
      >
        <div
          ref={rightDecoSwingRef}
          className="flex flex-col items-center"
          style={{ transformOrigin: 'top center' }}
        >
          {/* Braided Rope extending directly from the top */}
          <div className="braided-rope w-2.5 sm:w-3.5 h-16 sm:h-24 md:h-32" />

          {/* Cloud with Dangling Blue Star */}
          <div className="relative -mt-2">
            <img
              src="/decorations/layers/cloud-right.png"
              alt="Hanging Cloud Decoration"
              className="w-24 sm:w-36 md:w-44 lg:w-52 h-auto object-contain drop-shadow-lg -scale-x-100"
              loading="eager"
            />
            <img
              src="/decorations/layers/star-blue.png"
              alt="Hanging Star"
              className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-8 sm:w-11 md:w-14 drop-shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Layer 5: Independent Floating Balloons */}
      {/* Red Balloon - Left Mid */}
      <div
        ref={balloonRedRef}
        className="hero-layer hero-layer-balloon top-[44%] left-3 sm:left-10 md:left-20 w-16 sm:w-20 md:w-24 drop-shadow-xl"
      >
        <div ref={balloonRedInnerRef} className="w-full h-full">
          <img
            src="/decorations/layers/balloon-red.png"
            alt="Red Celebration Balloon"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>
      </div>

      {/* Yellow Balloon - Left Lower */}
      <div
        ref={balloonYellowRef}
        className="hero-layer hero-layer-balloon top-[68%] left-2 sm:left-8 md:left-16 w-14 sm:w-18 md:w-22 drop-shadow-xl"
      >
        <div ref={balloonYellowInnerRef} className="w-full h-full">
          <img
            src="/decorations/layers/balloon-yellow.png"
            alt="Yellow Celebration Balloon"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>
      </div>

      {/* Blue Balloon - Right Mid */}
      <div
        ref={balloonBlueRef}
        className="hero-layer hero-layer-balloon top-[42%] right-3 sm:right-10 md:right-20 w-16 sm:w-20 md:w-24 drop-shadow-xl"
      >
        <div ref={balloonBlueInnerRef} className="w-full h-full">
          <img
            src="/decorations/layers/balloon-blue.png"
            alt="Blue Celebration Balloon"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>
      </div>

      {/* Green Balloon - Right Lower */}
      <div
        ref={balloonGreenRef}
        className="hero-layer hero-layer-balloon top-[66%] right-2 sm:right-8 md:right-16 w-14 sm:w-18 md:w-22 drop-shadow-xl"
      >
        <div ref={balloonGreenInnerRef} className="w-full h-full">
          <img
            src="/decorations/layers/balloon-green.png"
            alt="Green Celebration Balloon"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>
      </div>

      {/* Layer 5B: Celebration Party Toy Drums (Interactive 3D Celebratory Decor) */}
      {/* Right Celebration Drum */}
      <div
        ref={drumRightRef}
        className="hero-layer hero-layer-drum top-[73%] sm:top-[71%] md:top-[69%] right-2 sm:right-6 md:right-14 lg:right-24 w-18 sm:w-24 md:w-30 lg:w-36 drop-shadow-2xl"
      >
        <div ref={drumRightInnerRef} className="w-full h-full">
          <img
            src="/decorations/layers/drum.png"
            alt="First Birthday Celebration Toy Drum"
            className="w-full h-auto object-contain hover:scale-105 transition-transform"
            loading="eager"
          />
        </div>
      </div>

      {/* Left Celebration Drum */}
      <div
        ref={drumLeftRef}
        className="hero-layer hero-layer-drum top-[75%] sm:top-[73%] md:top-[71%] left-2 sm:left-6 md:left-12 lg:left-20 w-16 sm:w-22 md:w-28 lg:w-32 drop-shadow-2xl"
      >
        <div ref={drumLeftInnerRef} className="w-full h-full">
          <img
            src="/decorations/layers/drum.png"
            alt="First Birthday Celebration Toy Drum"
            className="w-full h-auto object-contain -scale-x-100 hover:scale-105 transition-transform"
            loading="eager"
          />
        </div>
      </div>

      {/* Layer 6: Main Birthday Card Assembly hanging from Top Ceiling */}
      <div
        ref={cardScrollRef}
        className="hero-card-assembly"
      >
        <div
          ref={cardSwingRef}
          className="flex flex-col items-center w-full"
          style={{ transformOrigin: 'top center' }}
        >
          {/* Braided Rope extending from the top ceiling down to the card's knot */}
          <div className="braided-rope w-3.5 sm:w-4 md:w-4.5 h-5 sm:h-7 md:h-5 lg:h-6" />

          {/* Central Card with Baby Abhimanyu Krishnan */}
          <div className="relative w-full max-w-[330px] min-[400px]:max-w-[360px] sm:max-w-[410px] md:max-w-[490px] lg:max-w-[560px] xl:max-w-[620px] -mt-1 px-1">
            <img
              src="/decorations/layers/birthday-card.png"
              alt="One Whole Year of Abhimanyu Krishnan — First Birthday Plaque"
              className="w-full h-auto object-contain drop-shadow-2xl"
              loading="eager"
            />

            {/* Suspended Scroll Down CTA */}
            <div
              ref={scrollCtaRef}
              className="-mt-5 sm:-mt-7 md:-mt-8 lg:-mt-10 z-20 flex justify-center"
            >
              <ScrollDownIndicator targetId={APP_CONFIG.sections.pinata} />
            </div>
          </div>

          {/* Connected Suspended Rainbow Number 1 Piñata — joined directly to scroll down downside */}
          <div
            id={APP_CONFIG.sections.pinata}
            ref={pinataRef}
            className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[390px] mx-auto -mt-1 sm:-mt-2"
          >
            <div
              ref={pinataSwingRef}
              className="w-full h-auto flex justify-center"
              style={{ transformOrigin: 'top center' }}
            >
              <img
                src="/decorations/layers/pinata.png"
                alt="Abhimanyu Krishnan Number 1 Rainbow Piñata"
                className="w-full h-auto object-contain drop-shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>

          {/* Milestone Celebratory Card */}
          <div
            ref={milestoneRef}
            className="relative z-20 w-full max-w-sm sm:max-w-md bg-theme-creamLight/95 backdrop-blur-md border-2 border-theme-rope/40 rounded-3xl p-6 sm:p-7 text-center shadow-paper mt-5 sm:mt-6 mb-0"
          >
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
      </div>

      {/* Layer 7: Foreground Floor Paper Clouds tightly framing the bottom transition */}
      <div
        ref={cloudsFgRef}
        className="relative -mt-20 sm:-mt-28 pointer-events-none flex justify-between z-25 opacity-95 w-full"
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
