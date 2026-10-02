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
  if (typeof window === 'undefined') return -500;
  const vh = window.innerHeight;
  // Pull card assembly smoothly upward into ceiling
  return -(vh * (isMobile ? 0.45 : 0.55));
}

/**
 * Returns dynamic horizontal distance for side hanging decorations
 * to slowly part outward toward screen edges.
 * 
 * @param {boolean} isMobile - True if screen width is under 768px
 * @returns {number} Distance in pixels to travel outward
 */
export function getResponsiveSideMovement(isMobile = false) {
  if (typeof window === 'undefined') return 200;
  const vw = window.innerWidth;
  // Slowly and gracefully part to sides so motion is clearly observable
  return isMobile ? vw * 0.32 : vw * 0.24;
}

/**
 * Returns horizontal distance for balloons to glide aside off-screen.
 * 
 * @param {boolean} isMobile - True if screen width is under 768px
 * @returns {number} Distance in pixels to move aside
 */
export function getBalloonAsideDistance(isMobile = false) {
  if (typeof window === 'undefined') return 250;
  const vw = window.innerWidth;
  return isMobile ? Math.max(vw * 0.42, 220) : Math.max(vw * 0.38, 280);
}

/**
 * Returns parallax offsets for layered foreground clouds
 */
export function getCloudParallax() {
  if (typeof window === 'undefined') return { fg: 20, bg: -20 };
  const vh = window.innerHeight;
  return {
    fg: vh * 0.04, // Grounded drift rather than lifting upward to create empty bottom gap
    bg: -(vh * 0.04),
  };
}
