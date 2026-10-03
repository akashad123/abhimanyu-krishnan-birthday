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
    pinataStageRef,
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
    cloudsFgRef,
  } = refs;

  if (!sectionRef?.current) return () => {};

  if (prefersReducedMotion) {
    if (cardScrollRef?.current) gsap.set(cardScrollRef.current, { y: 0, opacity: 1 });
    if (pinataStageRef?.current) gsap.set(pinataStageRef.current, { y: 0, opacity: 1 });
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

    // Number 1 Piñata gently sways like a real suspended festive piñata
    if (pinataSwingRef?.current) {
      gsap.to(pinataSwingRef.current, {
        rotation: -2.8,
        transformOrigin: 'top center',
        duration: 3.4,
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

    // Initial positioning:
    // Stage 1 (Abhimanyu Krishnan tag) starts centered in viewport
    // Stage 2 (Turning The Big One) starts below viewport
    if (cardScrollRef?.current) {
      gsap.set(cardScrollRef.current, { y: 0, opacity: 1 });
    }
    if (pinataStageRef?.current) {
      gsap.set(pinataStageRef.current, {
        y: isMobile ? '85vh' : '95vh',
        opacity: 0,
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'birthdayHeroTrigger',
        trigger: sectionRef.current,
        start: 'top top',
        end: isMobile ? '+=80%' : '+=100%',
        pin: true,
        anticipatePin: 1,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    // 1. "this Abhimanyu Krishnan only, that tag, should go up"
    // The Abhimanyu Krishnan card tag and scroll down smoothly glide UP into the ceiling
    if (cardScrollRef?.current) {
      tl.to(
        cardScrollRef.current,
        {
          y: isMobile ? '-85vh' : '-95vh',
          opacity: 0,
          ease: 'power1.inOut',
        },
        0
      );
    }

    // 2. "and the turning the big one should also come up"
    // The Number 1 Piñata and Turning The Big One card smoothly glide UP into center view
    if (pinataStageRef?.current) {
      tl.to(
        pinataStageRef.current,
        {
          y: '0vh',
          opacity: 1,
          ease: 'power1.inOut',
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
          y: -40,
          opacity: 0.35,
          ease: 'power1.out',
        },
        0
      );
    }

    if (balloonYellowRef?.current) {
      tl.to(
        balloonYellowRef.current,
        {
          x: -(asideDist * 1.1),
          y: -30,
          opacity: 0.35,
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
          y: -40,
          opacity: 0.35,
          ease: 'power1.out',
        },
        0
      );
    }

    if (balloonGreenRef?.current) {
      tl.to(
        balloonGreenRef.current,
        {
          x: asideDist * 1.1,
          y: -30,
          opacity: 0.35,
          ease: 'power1.out',
        },
        0
      );
    }

    // 4. Side hanging clouds slowly and gracefully part towards the edges
    if (leftDecoScrollRef?.current) {
      tl.to(
        leftDecoScrollRef.current,
        {
          x: () => -getResponsiveSideMovement(isMobile),
          opacity: 0.85,
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
          opacity: 0.85,
          ease: 'none',
        },
        0
      );
    }

    // 5. Playful entrance pop for the Number 1 Piñata as it takes center stage
    if (pinataRef?.current) {
      tl.fromTo(
        pinataRef.current,
        {
          scale: 0.92,
          rotation: -3,
        },
        {
          scale: 1.0,
          rotation: 0,
          ease: 'back.out(1.4)',
          duration: 0.4,
        },
        0.4
      );
    }

    // 6. Foreground floor clouds subtle grounded drift
    if (cloudsFgRef?.current) {
      tl.to(cloudsFgRef.current, { y: 15, ease: 'none' }, 0);
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
