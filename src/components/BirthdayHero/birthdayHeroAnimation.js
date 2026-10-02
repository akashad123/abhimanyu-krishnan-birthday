import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  getResponsiveCardMovement,
  getResponsiveSideMovement,
  getBalloonMovement,
  getCloudParallax,
} from '../../utils/responsiveAnimation';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes the master ScrollTrigger timeline for the Birthday Hero scene.
 * Uses gsap.matchMedia() to compute responsive values for mobile, tablet, and desktop.
 * 
 * @param {Object} refs - DOM element refs for each independent layer
 * @param {boolean} prefersReducedMotion - User accessibility motion preference
 * @returns {Function} Cleanup function to revert the GSAP context
 */
export function initBirthdayHeroAnimation(refs, prefersReducedMotion = false) {
  const {
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
  } = refs;

  if (!sectionRef?.current) return () => {};

  // If user prefers reduced motion, maintain clean static presentation without pinning/movement
  if (prefersReducedMotion) {
    return () => {};
  }

  const mm = gsap.matchMedia();

  // 1. Mobile devices (< 768px)
  mm.add('(max-width: 767px)', () => {
    const balloons = getBalloonMovement();
    const clouds = getCloudParallax();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=120%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // 1. Main Birthday Plaque pulled upward
    if (cardRef?.current) {
      tl.to(
        cardRef.current,
        {
          y: () => getResponsiveCardMovement(true),
          rotation: -1,
          ease: 'none',
        },
        0
      );
    }

    // 2. Left hanging decoration moves toward left margin
    if (leftDecoRef?.current) {
      tl.to(
        leftDecoRef.current,
        {
          x: () => -getResponsiveSideMovement(true),
          rotation: -5,
          opacity: 0.7,
          ease: 'none',
        },
        0
      );
    }

    // 3. Right hanging decoration moves toward right margin
    if (rightDecoRef?.current) {
      tl.to(
        rightDecoRef.current,
        {
          x: () => getResponsiveSideMovement(true),
          rotation: 5,
          opacity: 0.7,
          ease: 'none',
        },
        0
      );
    }

    // 4. Staggered individual balloon vertical floats
    if (balloonRedRef?.current) {
      tl.to(
        balloonRedRef.current,
        {
          y: balloons.red.y,
          x: balloons.red.x,
          rotation: balloons.red.rot,
          ease: 'none',
        },
        0
      );
    }

    if (balloonYellowRef?.current) {
      tl.to(
        balloonYellowRef.current,
        {
          y: balloons.yellow.y,
          x: balloons.yellow.x,
          rotation: balloons.yellow.rot,
          ease: 'none',
        },
        0
      );
    }

    if (balloonBlueRef?.current) {
      tl.to(
        balloonBlueRef.current,
        {
          y: balloons.blue.y,
          x: balloons.blue.x,
          rotation: balloons.blue.rot,
          ease: 'none',
        },
        0
      );
    }

    if (balloonGreenRef?.current) {
      tl.to(
        balloonGreenRef.current,
        {
          y: balloons.green.y,
          x: balloons.green.x,
          rotation: balloons.green.rot,
          ease: 'none',
        },
        0
      );
    }

    // 5. Bunting & clouds subtle depth parallax
    if (buntingRef?.current) {
      tl.to(buntingRef.current, { y: -25, opacity: 0.85, ease: 'none' }, 0);
    }

    if (cloudsFgRef?.current) {
      tl.to(cloudsFgRef.current, { y: clouds.fg, ease: 'none' }, 0);
    }

    if (cloudsBgRef?.current) {
      tl.to(cloudsBgRef.current, { y: clouds.bg, ease: 'none' }, 0);
    }

    // 6. Scroll CTA fades out early
    if (scrollCtaRef?.current) {
      tl.to(scrollCtaRef.current, { opacity: 0, y: 30, ease: 'none' }, 0);
    }

    return () => tl.kill();
  });

  // 2. Tablet, Desktop, & Large screens (>= 768px)
  mm.add('(min-width: 768px)', () => {
    const balloons = getBalloonMovement();
    const clouds = getCloudParallax();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=140%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // 1. Main Birthday Plaque pulled upward
    if (cardRef?.current) {
      tl.to(
        cardRef.current,
        {
          y: () => getResponsiveCardMovement(false),
          rotation: -1.5,
          ease: 'none',
        },
        0
      );
    }

    // 2. Left hanging decoration moves left with subtle swing
    if (leftDecoRef?.current) {
      tl.to(
        leftDecoRef.current,
        {
          x: () => -getResponsiveSideMovement(false),
          rotation: -6,
          opacity: 0.75,
          ease: 'none',
        },
        0
      );
    }

    // 3. Right hanging decoration moves right with subtle swing
    if (rightDecoRef?.current) {
      tl.to(
        rightDecoRef.current,
        {
          x: () => getResponsiveSideMovement(false),
          rotation: 6,
          opacity: 0.75,
          ease: 'none',
        },
        0
      );
    }

    // 4. Staggered individual balloon vertical floats
    if (balloonRedRef?.current) {
      tl.to(
        balloonRedRef.current,
        {
          y: balloons.red.y * 1.15,
          x: balloons.red.x * 1.2,
          rotation: balloons.red.rot,
          ease: 'none',
        },
        0
      );
    }

    if (balloonYellowRef?.current) {
      tl.to(
        balloonYellowRef.current,
        {
          y: balloons.yellow.y * 1.1,
          x: balloons.yellow.x * 1.2,
          rotation: balloons.yellow.rot,
          ease: 'none',
        },
        0
      );
    }

    if (balloonBlueRef?.current) {
      tl.to(
        balloonBlueRef.current,
        {
          y: balloons.blue.y * 1.2,
          x: balloons.blue.x * 1.2,
          rotation: balloons.blue.rot,
          ease: 'none',
        },
        0
      );
    }

    if (balloonGreenRef?.current) {
      tl.to(
        balloonGreenRef.current,
        {
          y: balloons.green.y * 1.15,
          x: balloons.green.x * 1.2,
          rotation: balloons.green.rot,
          ease: 'none',
        },
        0
      );
    }

    // 5. Bunting & clouds subtle depth parallax
    if (buntingRef?.current) {
      tl.to(buntingRef.current, { y: -35, opacity: 0.85, ease: 'none' }, 0);
    }

    if (cloudsFgRef?.current) {
      tl.to(cloudsFgRef.current, { y: clouds.fg * 1.2, ease: 'none' }, 0);
    }

    if (cloudsBgRef?.current) {
      tl.to(cloudsBgRef.current, { y: clouds.bg * 1.2, ease: 'none' }, 0);
    }

    // 6. Scroll CTA fades out early
    if (scrollCtaRef?.current) {
      tl.to(scrollCtaRef.current, { opacity: 0, y: 40, ease: 'none' }, 0);
    }

    return () => tl.kill();
  });

  return () => {
    mm.revert();
  };
}

export default initBirthdayHeroAnimation;
