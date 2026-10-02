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
      red: { y: -200, x: -15, rot: -5 },
      yellow: { y: -160, x: 12, rot: 4 },
      blue: { y: -260, x: -10, rot: -3 },
      green: { y: -220, x: 18, rot: 6 },
    };
  }

  const vh = window.innerHeight;
  return {
    red: {
      y: -(vh * 0.28),
      x: -18,
      rot: -4,
    },
    yellow: {
      y: -(vh * 0.20),
      x: 14,
      rot: 5,
    },
    blue: {
      y: -(vh * 0.34),
      x: -12,
      rot: -3,
    },
    green: {
      y: -(vh * 0.26),
      x: 20,
      rot: 6,
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
