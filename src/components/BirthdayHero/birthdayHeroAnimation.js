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

    // Idle gentle floating and rhythmic rocking for Celebration Party Drums
    if (drumRightInnerRef?.current) {
      gsap.to(drumRightInnerRef.current, {
        y: -9,
        rotation: 3.5,
        duration: 3.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (drumLeftInnerRef?.current) {
      gsap.to(drumLeftInnerRef.current, {
        y: -9,
        rotation: -3.5,
        duration: 3.5,
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
   * As the user scrolls down, all decorations (bunting, balloons, drums, side clouds)
   * gracefully move aside, upward, and away, fading completely out of view.
   * 
   * @param {boolean} isMobile - True if mobile layout
   * @returns {gsap.core.Timeline}
   */
  const createHeroScrollTimeline = (isMobile) => {
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

    // 1. Top Bunting garland moves up and away as user scrolls down
    if (buntingRef?.current) {
      tl.to(
        buntingRef.current,
        {
          y: -130,
          opacity: 0,
          ease: 'power1.in',
        },
        0
      );
    }

    // 2. Side hanging clouds & stars part completely toward the outer edges and fade away
    if (leftDecoScrollRef?.current) {
      tl.to(
        leftDecoScrollRef.current,
        {
          x: () => -(isMobile ? 260 : 440),
          y: 60,
          scale: 0.75,
          opacity: 0,
          ease: 'power1.in',
        },
        0
      );
    }

    if (rightDecoScrollRef?.current) {
      tl.to(
        rightDecoScrollRef.current,
        {
          x: () => (isMobile ? 260 : 440),
          y: 60,
          scale: 0.75,
          opacity: 0,
          ease: 'power1.in',
        },
        0
      );
    }

    // 3. Balloons smoothly swoop upward and outward into the sky, completely going away
    // Left balloons (Red & Yellow) fly away to the left and up
    if (balloonRedRef?.current) {
      tl.to(
        balloonRedRef.current,
        {
          x: () => -(isMobile ? 260 : 450),
          y: -360,
          rotation: -30,
          scale: 0.5,
          opacity: 0,
          ease: 'power1.in',
        },
        0
      );
    }

    if (balloonYellowRef?.current) {
      tl.to(
        balloonYellowRef.current,
        {
          x: () => -(isMobile ? 290 : 490),
          y: -320,
          rotation: -25,
          scale: 0.5,
          opacity: 0,
          ease: 'power1.in',
        },
        0
      );
    }

    // Right balloons (Blue & Green) fly away to the right and up
    if (balloonBlueRef?.current) {
      tl.to(
        balloonBlueRef.current,
        {
          x: () => (isMobile ? 260 : 450),
          y: -360,
          rotation: 30,
          scale: 0.5,
          opacity: 0,
          ease: 'power1.in',
        },
        0
      );
    }

    if (balloonGreenRef?.current) {
      tl.to(
        balloonGreenRef.current,
        {
          x: () => (isMobile ? 290 : 490),
          y: -320,
          rotation: 25,
          scale: 0.5,
          opacity: 0,
          ease: 'power1.in',
        },
        0
      );
    }

    // 4. Celebration Party Drums roll and drift outward and down off-screen
    if (drumRightRef?.current) {
      tl.to(
        drumRightRef.current,
        {
          x: () => (isMobile ? 240 : 400),
          y: 280,
          rotation: 45,
          scale: 0.6,
          opacity: 0,
          ease: 'power1.in',
        },
        0
      );
    }

    if (drumLeftRef?.current) {
      tl.to(
        drumLeftRef.current,
        {
          x: () => -(isMobile ? 240 : 400),
          y: 280,
          rotation: -45,
          scale: 0.6,
          opacity: 0,
          ease: 'power1.in',
        },
        0
      );
    }

    // 5. Celebratory GSAP entrance for the Milestone Card ("Turning The Big One!")
    if (milestoneRef?.current) {
      tl.fromTo(
        milestoneRef.current,
        {
          opacity: 0.35,
          scale: 0.96,
        },
        {
          opacity: 1,
          scale: 1,
          ease: 'power1.out',
          duration: 0.4,
        },
        0.45
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
