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
  const {
    sectionRef,
    pinataScrollRef,
    pinataSwingRef,
    cardRef,
    balloonLeftRef,
    balloonRightRef,
    cloudLeftRef,
    cloudRightRef,
  } = refs;

  if (!sectionRef?.current) return () => {};

  if (prefersReducedMotion) {
    return () => {};
  }

  const ctx = gsap.context(() => {
    // 1. Natural pendulum rope swing for the Number "1" Piñata
    if (pinataSwingRef?.current) {
      gsap.to(pinataSwingRef.current, {
        rotation: 2.2,
        transformOrigin: 'top center',
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // 2. Orange/Yellow Balloon floats up and left
    if (balloonLeftRef?.current) {
      gsap.to(balloonLeftRef.current, {
        y: -24,
        x: -18,
        rotation: -5,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // 3. Green Balloon floats up and right
    if (balloonRightRef?.current) {
      gsap.to(balloonRightRef.current, {
        y: -24,
        x: 18,
        rotation: 5,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // 4. Two side paper clouds drift left and right
    if (cloudLeftRef?.current) {
      gsap.to(cloudLeftRef.current, {
        x: -28,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (cloudRightRef?.current) {
      gsap.to(cloudRightRef.current, {
        x: 28,
        duration: 5.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // 5. Entrance and scroll reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    if (pinataScrollRef?.current) {
      tl.from(
        pinataScrollRef.current,
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

    // Orange balloon moves up and left on reveal
    if (balloonLeftRef?.current) {
      tl.from(
        balloonLeftRef.current,
        {
          y: 50,
          x: 40,
          opacity: 0.6,
          duration: 1.4,
          ease: 'power2.out',
        },
        0.2
      );
    }

    // Green balloon moves up and right on reveal
    if (balloonRightRef?.current) {
      tl.from(
        balloonRightRef.current,
        {
          y: 50,
          x: -40,
          opacity: 0.6,
          duration: 1.4,
          ease: 'power2.out',
        },
        0.2
      );
    }

    // Clouds drift outward to left and right on reveal
    if (cloudLeftRef?.current) {
      tl.from(
        cloudLeftRef.current,
        {
          x: 45,
          opacity: 0.4,
          duration: 1.6,
          ease: 'power2.out',
        },
        0.1
      );
    }

    if (cloudRightRef?.current) {
      tl.from(
        cloudRightRef.current,
        {
          x: -45,
          opacity: 0.4,
          duration: 1.6,
          ease: 'power2.out',
        },
        0.1
      );
    }
  }, sectionRef);

  return () => ctx.revert();
}

export default initBirthdayRevealAnimation;
