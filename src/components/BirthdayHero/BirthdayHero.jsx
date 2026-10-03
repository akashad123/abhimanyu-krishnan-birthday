import React, { useRef, useEffect } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import { initBirthdayHeroAnimation } from './birthdayHeroAnimation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { APP_CONFIG } from '../../config/appConfig';
import './BirthdayHero.css';

/**
 * BirthdayHero Component
 * Implements the layered, physical celebration scene with independent image layers:
 * - Striped wallpaper background (fixed, always visible)
 * - Top bunting garland — shown on mobile & tablet, hidden on PC (lg+)
 * - Left and right hanging paper cloud+star decorations suspended from the top ceiling
 * - Individual floating balloons (red, yellow, blue, green)
 * - Centered "ONE WHOLE YEAR" Abhimanyu Krishnan birthday plaque hanging directly from top ceiling
 *   (no stub rope — the card image itself has the rope and bow drawn in)
 * - Rainbow Number 1 Piñata connected below the card
 * - Scroll Down chevron button between card and piñata
 * - Milestone Celebratory Card at the bottom
 * - Natural pendulum swaying on all hanging decorations
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

  // Other layer refs
  const buntingRef = useRef(null);
  const cloudAsideLeftRef = useRef(null);
  const cloudAsideRightRef = useRef(null);

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
        buntingRef,
        cloudAsideLeftRef,
        cloudAsideRightRef,
      },
      prefersReducedMotion
    );

    return cleanup;
  }, [prefersReducedMotion]);

  /** Smooth-scrolls down to the memories section */
  const handleScrollDown = () => {
    const target = document.getElementById(APP_CONFIG.sections.memories);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id={APP_CONFIG.sections.hero}
      ref={sectionRef}
      className="birthday-hero-container"
    >
      {/* Layer 1: Bunting Garland — removed per user request (not shown on any device) */}

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
          {/* Braided Rope extending directly from the top ceiling
              — taller on desktop so the cloud visibly hangs from the very top edge */}
          <div className="braided-rope w-2.5 sm:w-3.5 h-16 sm:h-24 md:h-36 lg:h-48" />

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
          {/* Braided Rope extending directly from the top ceiling
              — taller on desktop so the cloud visibly hangs from the very top edge */}
          <div className="braided-rope w-2.5 sm:w-3.5 h-16 sm:h-24 md:h-36 lg:h-48" />

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
        className="hero-layer hero-layer-balloon top-[40%] left-3 sm:left-10 md:left-16 lg:left-[8%] xl:left-[10%] w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 drop-shadow-xl"
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
        className="hero-layer hero-layer-balloon top-[62%] left-2 sm:left-8 md:left-12 lg:left-[5%] xl:left-[7%] w-14 sm:w-16 md:w-20 lg:w-24 xl:w-28 drop-shadow-xl"
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
        className="hero-layer hero-layer-balloon top-[38%] right-3 sm:right-10 md:right-16 lg:right-[8%] xl:right-[10%] w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 drop-shadow-xl"
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
        className="hero-layer hero-layer-balloon top-[60%] right-2 sm:right-8 md:right-12 lg:right-[5%] xl:right-[7%] w-14 sm:w-16 md:w-20 lg:w-24 xl:w-28 drop-shadow-xl"
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

      {/* Mid-Hero Side Clouds flanking Scroll Down & Piñata (moves aside on scroll) */}
      {/* Left Cloud */}
      <div
        ref={cloudAsideLeftRef}
        className="hero-layer top-[44%] sm:top-[42%] -left-8 sm:-left-12 md:-left-16 w-36 min-[400px]:w-44 sm:w-60 md:w-72 lg:w-80 pointer-events-none drop-shadow-xl z-15"
      >
        <img
          src="/decorations/layers/cloud-left.png"
          alt=""
          className="w-full h-auto object-contain"
          aria-hidden="true"
        />
      </div>

      {/* Right Cloud */}
      <div
        ref={cloudAsideRightRef}
        className="hero-layer top-[52%] sm:top-[50%] -right-8 sm:-right-12 md:-right-16 w-40 min-[400px]:w-48 sm:w-64 md:w-76 lg:w-88 pointer-events-none drop-shadow-xl z-15"
      >
        <img
          src="/decorations/layers/cloud-right.png"
          alt=""
          className="w-full h-auto object-contain"
          aria-hidden="true"
        />
      </div>

      {/*
       * Layer 6: Main Birthday Card Assembly
       * position: relative keeps it in document flow so the section has natural height,
       * which is required for GSAP ScrollTrigger to correctly measure scroll distance.
       * The card image (birthday-card.png) already includes the rope and bow at the top —
       * no extra rope stub is needed here.
       */}
      <div
        ref={cardScrollRef}
        className="hero-card-assembly"
      >
        <div
          ref={cardSwingRef}
          className="flex flex-col items-center w-full"
          style={{ transformOrigin: 'top center' }}
        >
          {/* Braided Rope extending from the top ceiling to the card's knot — mobile & iPad only.
              On PC (lg+) the birthday-card.png image already has the rope and bow drawn in.
              Height is generous so it fully bridges the gap between the bunting bottom and
              the visual knot drawn inside the card PNG (which has ~15% transparent top padding). */}
          <div className="braided-rope w-3 sm:w-3.5 md:w-4 h-20 sm:h-24 md:h-36 -mb-6 sm:-mb-7 md:-mb-10 z-10 lg:hidden" />

          {/* Central Card with Baby Abhimanyu Krishnan */}
          <div className="relative w-full max-w-[300px] min-[400px]:max-w-[330px] sm:max-w-[390px] md:max-w-[450px] lg:max-w-[370px] xl:max-w-[410px] px-1 z-10">
            <img
              src="/decorations/layers/birthday-card.png"
              alt="One Whole Year of Abhimanyu Krishnan — First Birthday Plaque"
              className="w-full h-auto object-contain drop-shadow-2xl"
              loading="eager"
            />
          </div>

          {/* Braided Rope connecting bottom of Birthday Plaque to the Scroll Down button */}
          <div className="braided-rope w-2.5 sm:w-3 h-6 sm:h-7 -mt-2 -mb-1 z-10" />

          {/* Connected Scroll Down button — white circular button sitting directly on the hanging rope */}
          <button
            type="button"
            onClick={handleScrollDown}
            aria-label="Scroll down to the memory album"
            className="relative z-20 flex flex-col items-center group focus:outline-none cursor-pointer -my-0.5"
          >
            <span className="font-display font-bold text-[9px] sm:text-[10px] text-theme-navy/70 tracking-widest uppercase bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-full mb-1 group-hover:text-theme-blue transition-colors shadow-2xs">
              Scroll Down
            </span>
            <span className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm border-2 border-theme-rope/40 shadow-md group-hover:bg-theme-sky/20 group-hover:border-theme-blue/50 transition-all">
              <ChevronDown size={15} className="text-theme-navy/75 group-hover:text-theme-blue transition-colors" />
            </span>
          </button>

          {/* Connected Suspended Rainbow Number 1 Piñata — joined directly below the scroll CTA */}
          <div
            id={APP_CONFIG.sections.pinata}
            ref={pinataRef}
            className="relative z-10 w-full max-w-[250px] sm:max-w-[310px] md:max-w-[360px] lg:max-w-[260px] xl:max-w-[290px] mx-auto -mt-1 sm:-mt-1.5"
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

          {/* Milestone Celebratory Card — Standing cleanly above the wave */}
          <div
            ref={milestoneRef}
            className="relative z-20 w-full max-w-[280px] sm:max-w-md lg:max-w-xs xl:max-w-sm bg-theme-creamLight/95 backdrop-blur-md border-2 border-theme-rope/40 rounded-3xl p-4 sm:p-7 lg:p-5 text-center shadow-paper mt-4 sm:mt-6 lg:mt-3 mb-8 sm:mb-12 md:mb-16 lg:mb-8"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-yellow/20 text-theme-navy font-display font-semibold text-xs mb-2 sm:mb-3">
              <Sparkles size={14} className="text-theme-yellow" />
              <span>Milestone Celebration</span>
            </div>

            <h2 className="font-display font-bold text-xl sm:text-3xl lg:text-2xl text-theme-navy mb-1 sm:mb-2">
              Turning The Big One!
            </h2>

            <p className="font-body text-xs sm:text-base text-theme-navy/80 leading-relaxed mb-0">
              365 days of baby giggles, tiny footsteps, curious eyes, and endless love with{' '}
              <strong className="text-theme-blue font-semibold">{APP_CONFIG.childName}</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BirthdayHero;
