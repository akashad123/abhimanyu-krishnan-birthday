/**
 * Responsive Animation Utilities
 * Calculates viewport-relative coordinates and dynamic transform values
 * for GSAP ScrollTrigger timelines. Adapts smoothly across mobile, tablet,
 * laptop, desktop, and ultra-wide screens without hardcoded pixel jumps.
 */

/**
 * Returns dynamic vertical distance for the main birthday plaque card
 * to travel upward as if being pulled by the top rope.
 * 
 * @param {boolean} isMobile - True if screen width is under 768px
 * @returns {number} Distance in pixels to move upward (negative value)
 */
export function getResponsiveCardMovement(isMobile = false) {
  if (typeof window === 'undefined') return -800;
  const vh = window.innerHeight;
  // Move card completely past the top of the viewport
  return -(vh * (isMobile ? 1.05 : 1.12));
}

/**
 * Returns dynamic horizontal distance for side hanging decorations
 * to part outward toward screen edges.
 * 
 * @param {boolean} isMobile - True if screen width is under 768px
 * @returns {number} Distance in pixels to travel outward
 */
export function getResponsiveSideMovement(isMobile = false) {
  if (typeof window === 'undefined') return 300;
  const vw = window.innerWidth;
  // On mobile move further relative to width; on desktop travel comfortably to margins
  return isMobile ? vw * 0.48 : vw * 0.38;
}

/**
 * Returns customized vertical and horizontal float offsets for each balloon
 * to ensure organic, staggered movement rather than uniform sliding.
 */
export function getBalloonMovement() {
  if (typeof window === 'undefined') {
    return {
      red: { y: -900, x: -35, rot: -8 },
      yellow: { y: -1100, x: -25, rot: 8 },
      blue: { y: -950, x: 35, rot: 6 },
      green: { y: -1150, x: 25, rot: -8 },
    };
  }

  const vh = window.innerHeight;
  return {
    red: {
      y: -(vh * 1.25),
      x: -35,
      rot: -8,
    },
    yellow: {
      y: -(vh * 1.45),
      x: -25,
      rot: 8,
    },
    blue: {
      y: -(vh * 1.30),
      x: 35,
      rot: 6,
    },
    green: {
      y: -(vh * 1.50),
      x: 25,
      rot: -8,
    },
  };
}

/**
 * Returns parallax offsets for layered background clouds
 */
export function getCloudParallax() {
  if (typeof window === 'undefined') return { fg: -80, bg: -30 };
  const vh = window.innerHeight;
  return {
    fg: -(vh * 0.14),
    bg: -(vh * 0.06),
  };
}
