import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  getResponsiveSideMovement,
  getBalloonAsideDistance,
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
    buntingRef,
    cloudAsideLeftRef,
    cloudAsideRightRef,
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

    // Idle gentle float on balloon inner containers (slower, gentle floating rhythm)
    if (balloonRedInnerRef?.current) {
      gsap.to(balloonRedInnerRef.current, {
        y: -10,
        rotation: 2.5,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (balloonYellowInnerRef?.current) {
      gsap.to(balloonYellowInnerRef.current, {
        y: -12,
        rotation: -2.5,
        duration: 5.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (balloonBlueInnerRef?.current) {
      gsap.to(balloonBlueInnerRef.current, {
        y: -10,
        rotation: -2,
        duration: 5.0,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (balloonGreenInnerRef?.current) {
      gsap.to(balloonGreenInnerRef.current, {
        y: -12,
        rotation: 2.5,
        duration: 5.4,
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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom 20%',
        scrub: 1.2,
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
          y: isMobile ? 100 : 130,
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
          y: isMobile ? 100 : 130,
          opacity: 0.95,
          ease: 'none',
        },
        0
      );
    }

    // 3. Balloons smoothly move aside and gently drift top at a slower, relaxed pace
    // Left balloons move aside to the LEFT
    if (balloonRedRef?.current) {
      tl.to(
        balloonRedRef.current,
        {
          x: -asideDist,
          y: -45,
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
          y: -35,
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
          y: -45,
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
          y: -35,
          opacity: 0.4,
          ease: 'power1.out',
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

    // 6. Mid-hero side clouds smoothly move aside to the left and right on scroll
    if (cloudAsideLeftRef?.current) {
      tl.to(
        cloudAsideLeftRef.current,
        {
          x: -asideDist * 1.15,
          opacity: 0.15,
          ease: 'power1.out',
        },
        0
      );
    }

    if (cloudAsideRightRef?.current) {
      tl.to(
        cloudAsideRightRef.current,
        {
          x: asideDist * 1.15,
          opacity: 0.15,
          ease: 'power1.out',
        },
        0
      );
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
