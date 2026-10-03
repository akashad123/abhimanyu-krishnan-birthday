import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  getResponsiveSideMovement,
  getBalloonAsideDistance,
  getCloudParallax,
} from '../../utils/responsiveAnimation';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes the master ScrollTrigger timeline and natural idle pendulum sway
 * for the unified Birthday Hero celebration scene.
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
    balloonRedInnerRef,
    balloonYellowRef,
    balloonYellowInnerRef,
    balloonBlueRef,
    balloonBlueInnerRef,
    balloonGreenRef,
    balloonGreenInnerRef,
    buntingRef,
    cloudsFgRef,
  } = refs;

  if (!sectionRef?.current) return () => {};

  if (prefersReducedMotion) {
    return () => {};
  }

  // 1. Natural idle pendulum swaying left-to-right for suspended hanging decorations
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


    // Top bunting garland sways gently left to right across top ceiling
    if (buntingRef?.current) {
      gsap.to(buntingRef.current, {
        rotation: 1.2,
        x: 6,
        transformOrigin: 'top center',
        duration: 4.6,
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

    // Idle gentle float on balloon inner containers (prevents transform clash with scroll)
    if (balloonRedInnerRef?.current) {
      gsap.to(balloonRedInnerRef.current, {
        y: -10,
        rotation: 2.5,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (balloonYellowInnerRef?.current) {
      gsap.to(balloonYellowInnerRef.current, {
        y: -12,
        rotation: -2.5,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (balloonBlueInnerRef?.current) {
      gsap.to(balloonBlueInnerRef.current, {
        y: -10,
        rotation: -2,
        duration: 3.0,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (balloonGreenInnerRef?.current) {
      gsap.to(balloonGreenInnerRef.current, {
        y: -12,
        rotation: 2.5,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, sectionRef);

  // 2. Responsive ScrollTrigger timeline using matchMedia()
  const mm = gsap.matchMedia();

  /**
   * Builds the scroll timeline for mobile (< 768px) and desktop (>= 768px).
   * 
   * @param {boolean} isMobile - True if mobile layout
   * @returns {gsap.core.Timeline}
   */
  const createHeroScrollTimeline = (isMobile) => {
    const asideDist = getBalloonAsideDistance(isMobile);
    const clouds = getCloudParallax();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });


    // 2. Side hanging clouds slowly and gracefully part towards the edges
    // Subtle downward resistance keeps them visible longer in upper view
    if (leftDecoScrollRef?.current) {
      tl.to(
        leftDecoScrollRef.current,
        {
          x: () => -getResponsiveSideMovement(isMobile),
          y: isMobile ? 120 : 160,
          opacity: 0.95,
          ease: 'none',
        },
        0
      );
    }

    if (rightDecoScrollRef?.current) {
      tl.to(
        rightDecoScrollRef.current,
        {
          x: () => getResponsiveSideMovement(isMobile),
          y: isMobile ? 120 : 160,
          opacity: 0.95,
          ease: 'none',
        },
        0
      );
    }

    // 3. Balloons smoothly move aside off the screen without glitching
    // Left balloons move aside to the LEFT
    if (balloonRedRef?.current) {
      tl.to(
        balloonRedRef.current,
        {
          x: -asideDist,
          y: -140,
          opacity: 0.4,
          ease: 'power1.out',
        },
        0
      );
    }

    if (balloonYellowRef?.current) {
      tl.to(
        balloonYellowRef.current,
        {
          x: -(asideDist * 1.08),
          y: -100,
          opacity: 0.4,
          ease: 'power1.out',
        },
        0
      );
    }

    // Right balloons move aside to the RIGHT
    if (balloonBlueRef?.current) {
      tl.to(
        balloonBlueRef.current,
        {
          x: asideDist,
          y: -140,
          opacity: 0.4,
          ease: 'power1.out',
        },
        0
      );
    }

    if (balloonGreenRef?.current) {
      tl.to(
        balloonGreenRef.current,
        {
          x: asideDist * 1.08,
          y: -100,
          opacity: 0.4,
          ease: 'power1.out',
        },
        0
      );
    }


    // 6. Foreground floor clouds subtle parallax
    if (cloudsFgRef?.current) {
      tl.to(cloudsFgRef.current, { y: -clouds.fg, ease: 'none' }, 0);
    }

    return tl;
  };

  // Mobile layout (< 768px)
  mm.add('(max-width: 767px)', () => {
    const tl = createHeroScrollTimeline(true);
    return () => tl.kill();
  });

  // Desktop & Tablet layout (>= 768px)
  mm.add('(min-width: 768px)', () => {
    const tl = createHeroScrollTimeline(false);
    return () => tl.kill();
  });

  return () => {
    ctx.revert();
    mm.revert();
  };
}

export default initBirthdayHeroAnimation;
