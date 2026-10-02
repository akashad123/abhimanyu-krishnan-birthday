import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes animations for the Rainbow Number "1" Piñata Reveal Section.
 * Implements a natural, subtle physical swinging motion suspended from the rope
 * and a smooth scroll-triggered entry.
 * 
 * @param {Object} refs - DOM element refs
 * @param {boolean} prefersReducedMotion - User accessibility motion preference
 * @returns {Function} Cleanup function
 */
export function initBirthdayRevealAnimation(refs, prefersReducedMotion = false) {
  const { sectionRef, pinataRef, cardRef, balloonLeftRef, balloonRightRef } = refs;

  if (!sectionRef?.current) return () => {};

  if (prefersReducedMotion) {
    return () => {};
  }

  const ctx = gsap.context(() => {
    // 1. Subtle, natural pendulum rope swing for the Number "1" Piñata
    if (pinataRef?.current) {
      gsap.to(pinataRef.current, {
        rotation: 2.2,
        transformOrigin: 'top center',
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // 2. Smooth entrance animation as user scrolls into the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    if (pinataRef?.current) {
      tl.from(
        pinataRef.current,
        {
          y: -40,
          opacity: 0.9,
          duration: 1.2,
          ease: 'power2.out',
        },
        0
      );
    }

    if (cardRef?.current) {
      tl.from(
        cardRef.current,
        {
          y: 35,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        },
        0.3
      );
    }

    if (balloonLeftRef?.current) {
      tl.from(
        balloonLeftRef.current,
        {
          y: 20,
          opacity: 0.8,
          duration: 1.4,
          ease: 'power1.out',
        },
        0.2
      );
    }

    if (balloonRightRef?.current) {
      tl.from(
        balloonRightRef.current,
        {
          y: 20,
          opacity: 0.8,
          duration: 1.4,
          ease: 'power1.out',
        },
        0.2
      );
    }
  }, sectionRef);

  return () => ctx.revert();
}

export default initBirthdayRevealAnimation;
