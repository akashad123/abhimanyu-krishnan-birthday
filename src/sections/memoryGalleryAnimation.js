import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes rich celebratory GSAP animations for the "12 Months of Our Little One"
 * milestone photo album section.
 * 
 * Features:
 * - Playful bouncy entrance for the celebratory header letters & twinkling stars
 * - Staggered polaroid scrapbook cascade for the 12 milestone photo cards
 * - Natural physical angles settling into place as the user scrolls
 * - Idle floating celebration stars in the album margins
 * - Responsive adaptation: simplified lightweight flow on mobile, full spring cascade on desktop
 * - Full reduced-motion accessibility support
 * 
 * @param {Object} refs - DOM element refs
 * @param {boolean} prefersReducedMotion - User accessibility motion preference
 * @returns {Function} Cleanup function to revert GSAP animations
 */
export function initMemoryGalleryAnimation(refs, prefersReducedMotion = false) {
  const {
    sectionRef,
    headerRef,
    titleLettersRef,
    starLeftRef,
    starRightRef,
    gridRef,
    milestoneCardsRef,
    floatingDecoLeftRef,
    floatingDecoRightRef,
    guestSectionRef,
  } = refs;

  if (!sectionRef?.current || prefersReducedMotion) {
    return () => {};
  }

  const ctx = gsap.context(() => {
    // 1. Idle float for margin celebratory stars
    if (floatingDecoLeftRef?.current) {
      gsap.to(floatingDecoLeftRef.current, {
        y: -14,
        rotation: 8,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (floatingDecoRightRef?.current) {
      gsap.to(floatingDecoRightRef.current, {
        y: -16,
        rotation: -8,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // 2. Responsive matchMedia
    const mm = gsap.matchMedia();

    // Mobile (< 768px): Lightweight, snappy entrance
    mm.add('(max-width: 767px)', () => {
      // Header reveal
      if (headerRef?.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 12 Cards cascade reveal
      const cards = milestoneCardsRef.current?.filter(Boolean) || [];
      if (cards.length > 0 && gridRef?.current) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 30,
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.04,
            ease: 'back.out(1.2)',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    });

    // Tablet & Desktop (>= 768px): Full celebratory scrapbook cascade
    mm.add('(min-width: 768px)', () => {
      // Header reveal with letter wave & star spin
      if (headerRef?.current) {
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            once: true,
          },
        });

        if (starLeftRef?.current && starRightRef?.current) {
          headerTl.fromTo(
            [starLeftRef.current, starRightRef.current],
            { scale: 0, rotation: -90, opacity: 0 },
            { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.8)' }
          );
        }

        const letters = titleLettersRef.current?.filter(Boolean) || [];
        if (letters.length > 0) {
          headerTl.fromTo(
            letters,
            { y: 28, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, stagger: 0.035, duration: 0.45, ease: 'back.out(2)' },
            '-=0.3'
          );
        }
      }

      // 12 Cards polaroid scrapbook reveal with gentle settling angles
      const cards = milestoneCardsRef.current?.filter(Boolean) || [];
      if (cards.length > 0 && gridRef?.current) {
        const angles = [-2.5, 1.8, -1.5, 2.2, -1.8, 1.5, -2.2, 1.8, -1.5, 2, -1.8, 1.5];

        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 50,
            scale: 0.88,
            rotation: (i) => angles[i % angles.length],
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.7,
            stagger: 0.065,
            ease: 'back.out(1.3)',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    });

    // 3. Guest Memories Section reveal if present
    if (guestSectionRef?.current) {
      gsap.fromTo(
        guestSectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: guestSectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }
  }, sectionRef);

  return () => ctx.revert();
}

export default initMemoryGalleryAnimation;
