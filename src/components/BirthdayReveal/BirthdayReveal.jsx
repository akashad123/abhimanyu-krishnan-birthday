import React, { useRef, useEffect } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { initBirthdayRevealAnimation } from './birthdayRevealAnimation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { APP_CONFIG } from '../../config/appConfig';
import './BirthdayReveal.css';

/**
 * BirthdayReveal Component (Second Section)
 * Features the large rainbow-fringed hanging number "1" piñata physically
 * suspended from the rope with subtle natural swinging physics, floating balloons,
 * paper clouds, and a milestone card welcoming visitors to the memory album.
 */
export const BirthdayReveal = () => {
  const sectionRef = useRef(null);
  const pinataScrollRef = useRef(null);
  const pinataSwingRef = useRef(null);
  const cardRef = useRef(null);
  const balloonLeftRef = useRef(null);
  const balloonRightRef = useRef(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const cleanup = initBirthdayRevealAnimation(
      {
        sectionRef,
        pinataScrollRef,
        pinataSwingRef,
        cardRef,
        balloonLeftRef,
        balloonRightRef,
      },
      prefersReducedMotion
    );

    return cleanup;
  }, [prefersReducedMotion]);

  return (
    <section
      id={APP_CONFIG.sections.pinata}
      ref={sectionRef}
      className="birthday-reveal-container bg-striped-wallpaper pt-0 pb-12 px-4"
    >
      {/* Background Decorative Cloud Highlights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <img
          src="/decorations/layers/cloud-left.png"
          alt=""
          className="absolute top-12 -left-12 w-48 sm:w-64 opacity-85"
        />
        <img
          src="/decorations/layers/cloud-right.png"
          alt=""
          className="absolute top-28 -right-12 w-52 sm:w-72 opacity-85"
        />
      </div>

      {/* Flanking Balloons around the Piñata */}
      <div
        ref={balloonLeftRef}
        className="pinata-balloon-left w-16 sm:w-20 md:w-24 drop-shadow-xl pointer-events-none"
      >
        <img
          src="/decorations/layers/balloon-yellow.png"
          alt="Celebration Balloon"
          className="w-full h-auto object-contain"
          loading="lazy"
        />
      </div>

      <div
        ref={balloonRightRef}
        className="pinata-balloon-right w-16 sm:w-20 md:w-24 drop-shadow-xl pointer-events-none"
      >
        <img
          src="/decorations/layers/balloon-green.png"
          alt="Celebration Balloon"
          className="w-full h-auto object-contain"
          loading="lazy"
        />
      </div>

      {/* Main Suspended Number 1 Piñata hanging from top ceiling */}
      <div
        ref={pinataScrollRef}
        className="pinata-wrapper relative z-10 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[390px] mx-auto mt-0"
      >
        <div
          ref={pinataSwingRef}
          className="flex flex-col items-center w-full"
          style={{ transformOrigin: 'top center' }}
        >
          {/* Braided Rope extending directly from the top ceiling */}
          <div className="braided-rope w-3 sm:w-3.5 md:w-4 h-6 sm:h-10 md:h-12 -mb-1" />
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
        ref={cardRef}
        className="relative z-20 w-full max-w-sm sm:max-w-md bg-theme-creamLight/95 backdrop-blur-md border-2 border-theme-rope/40 rounded-3xl p-6 sm:p-7 text-center shadow-paper mt-6 mb-2"
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

      {/* Floor Cloud Accents */}
      <div className="absolute -bottom-10 inset-x-0 pointer-events-none flex justify-between z-10 opacity-95">
        <img
          src="/decorations/layers/cloud-left.png"
          alt=""
          className="w-48 sm:w-72 -ml-8 object-contain"
        />
        <img
          src="/decorations/layers/cloud-right.png"
          alt=""
          className="w-56 sm:w-80 -mr-8 object-contain"
        />
      </div>
    </section>
  );
};

export default BirthdayReveal;
