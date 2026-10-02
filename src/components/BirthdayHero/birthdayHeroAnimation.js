import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  getResponsiveCardMovement,
  getResponsiveSideMovement,
  getBalloonMovement,
  getCloudParallax,
} from '../../utils/responsiveAnimation';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes the master ScrollTrigger timeline and natural idle pendulum sway
 * for the Birthday Hero scene.
 * 
 * @param {Object} refs - DOM element refs
 * @param {boolean} prefersReducedMotion - User accessibility motion preference
 * @returns {Function} Cleanup function to revert GSAP animations
 */
export function initBirthdayHeroAnimation(refs, prefersReducedMotion = false) {
  const {
    sectionRef,
    cardScrollRef,
    cardSwingRef,
    leftDecoScrollRef,
    leftDecoSwingRef,
    rightDecoScrollRef,
    rightDecoSwingRef,
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

  if (prefersReducedMotion) {
    return () => {};
  }

  // 1. Natural idle pendulum swaying left-to-right for hanging decorations
  const ctx = gsap.context(() => {
    // Main card gently sways left to right like a real suspended plaque
    if (cardSwingRef?.current) {
      gsap.to(cardSwingRef.current, {
        rotation: 2.2,
        transformOrigin: 'top center',
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Left hanging cloud & star sways left to right
    if (leftDecoSwingRef?.current) {
      gsap.to(leftDecoSwingRef.current, {
        rotation: -3.2,
        transformOrigin: 'top center',
        duration: 4.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Right hanging cloud & star sways left to right
    if (rightDecoSwingRef?.current) {
      gsap.to(rightDecoSwingRef.current, {
        rotation: 3.2,
        transformOrigin: 'top center',
        duration: 4.0,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Idle gentle float on balloons
    if (balloonRedRef?.current) {
      gsap.to(balloonRedRef.current, {
        y: -10,
        rotation: 2,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (balloonBlueRef?.current) {
      gsap.to(balloonBlueRef.current, {
        y: -14,
        rotation: -2,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, sectionRef);

  // 2. Responsive ScrollTrigger timeline using matchMedia()
  const mm = gsap.matchMedia();

  // Mobile layout (< 768px)
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

    // 1. Main Birthday Plaque pulled straight UPWARD
    if (cardScrollRef?.current) {
      tl.to(
        cardScrollRef.current,
        {
          y: () => getResponsiveCardMovement(true),
          ease: 'none',
        },
        0
      );
    }

    // 2. Left hanging decoration parts outward to the LEFT
    if (leftDecoScrollRef?.current) {
      tl.to(
        leftDecoScrollRef.current,
        {
          x: () => -getResponsiveSideMovement(true),
          opacity: 0.8,
          ease: 'none',
        },
        0
      );
    }

    // 3. Right hanging decoration parts outward to the RIGHT
    if (rightDecoScrollRef?.current) {
      tl.to(
        rightDecoScrollRef.current,
        {
          x: () => getResponsiveSideMovement(true),
          opacity: 0.8,
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

    // 6. Scroll CTA fades away early
    if (scrollCtaRef?.current) {
      tl.to(scrollCtaRef.current, { opacity: 0, y: 25, ease: 'none' }, 0);
    }

    return () => tl.kill();
  });

  // Desktop & Tablet layout (>= 768px)
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

    // 1. Main Birthday Plaque pulled straight UPWARD
    if (cardScrollRef?.current) {
      tl.to(
        cardScrollRef.current,
        {
          y: () => getResponsiveCardMovement(false),
          ease: 'none',
        },
        0
      );
    }

    // 2. Left hanging decoration parts outward to the LEFT
    if (leftDecoScrollRef?.current) {
      tl.to(
        leftDecoScrollRef.current,
        {
          x: () => -getResponsiveSideMovement(false),
          opacity: 0.85,
          ease: 'none',
        },
        0
      );
    }

    // 3. Right hanging decoration parts outward to the RIGHT
    if (rightDecoScrollRef?.current) {
      tl.to(
        rightDecoScrollRef.current,
        {
          x: () => getResponsiveSideMovement(false),
          opacity: 0.85,
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

    // 6. Scroll CTA fades away early
    if (scrollCtaRef?.current) {
      tl.to(scrollCtaRef.current, { opacity: 0, y: 35, ease: 'none' }, 0);
    }

    return () => tl.kill();
  });

  return () => {
    ctx.revert();
    mm.revert();
  };
}

export default initBirthdayHeroAnimation;
