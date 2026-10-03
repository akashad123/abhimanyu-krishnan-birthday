import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, X, ChevronLeft, ChevronRight, ChevronUp, FastForward } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { FAMILY_PHOTOS } from '../data/initialMemories';

gsap.registerPlugin(ScrollTrigger);

/**
 * FamilyGallery — Scroll-Pinned Vertical Drum Carousel
 *
 * Behaviour:
 * - When the section enters the viewport the page scroll is captured (section pins).
 * - Each increment of scroll advances ONE photo (snap-to-step via ScrollTrigger).
 * - After all 15 photos the pin releases and normal page scroll resumes.
 * - The left text drum and right photo strip both animate from the scroll progress.
 * - Fast-forward "Skip to 15th Photo" button allows jumping straight to the end without scrolling all 15.
 *
 * Visual:
 * - Blends seamlessly with the page cream background (#FCFAF6).
 * - Fade-out gradients at the top/bottom of both panels use the exact cream colour.
 * - Active photo: full-size, accent border, shadow.
 * - Neighbour photos: scaled-down, dimmed, peeking above / below.
 */

/** Celebration accent colours cycling per photo */
const ACCENT_COLORS = ['#4E93CB', '#DE5347', '#E5A93C', '#55A46D'];

/** Page cream-light colour (matches bg-theme-creamLight in tailwind.config) */
const CREAM = '#FCFAF6';

/** Carousel layout constants — one photo at a time, filling the visible container */
const CARD_H    = 330;           // px — height of each photo card (fills most of VISIBLE_H)
const CARD_GAP  = 20;            // px — spacing between cards (invisible since non-active are opacity:0)
const CARD_UNIT = CARD_H + CARD_GAP; // 350 px per slot
const VISIBLE_H = 360;           // px — clip-container height for the strip

/** Left text drum constants */
const TEXT_H    = 44;            // px — height of each text row
const TEXT_VIS  = VISIBLE_H;     // 360 px — same visible height as strip

/**
 * Returns the translateY that centres the active item inside a clipping container.
 *
 * @param {number} idx      – active index
 * @param {number} itemH    – slot height (item + gap for strip; item only for text)
 * @param {number} visible  – clip-container height
 */
const calcOffset = (idx, itemH, visible) =>
  visible / 2 - idx * itemH - (idx === 0 ? CARD_H : itemH) / 2;

// Simpler uniform formula:
const offset = (idx, unit, visible, halfItem) =>
  visible / 2 - idx * unit - halfItem;

export const FamilyGallery = () => {
  const [activeIdx, setActiveIdx]    = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const sectionRef   = useRef(null);
  const activeIdxRef = useRef(0);       // avoids stale-closure in ScrollTrigger
  const stRef        = useRef(null);
  const total        = FAMILY_PHOTOS.length;

  /* ──────────────────── GSAP scroll-pin ──────────────────── */

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Small delay so the DOM and layout fully settle before ScrollTrigger measures heights.
    // Critical on mobile where layout paint can be deferred.
    const initTimer = setTimeout(() => {
      ScrollTrigger.refresh();

      const isDesktop = window.innerWidth >= 1024;

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        // Give each photo responsive scroll travel (0.6 viewport on desktop, 0.45 on mobile)
        end: () => `+=${(total - 1) * window.innerHeight * (isDesktop ? 0.6 : 0.45)}`,
        pin: true,
        pinSpacing: true,
        // Disable anticipatePin on mobile to eliminate premature jump after Milestone section
        anticipatePin: isDesktop ? 1 : 0,
        // Recalculate positions on any viewport resize (fixes mobile browser chrome show/hide)
        invalidateOnRefresh: true,
        // Prevent overlapping pins from fighting each other
        preventOverlaps: true,
        // Snap back to nearest step quickly when fast-scrolling
        fastScrollEnd: true,

        // Snap to each photo step on desktop mousewheel, disable touch fight on mobile
        snap: isDesktop
          ? {
              snapTo: 1 / (total - 1),
              duration: { min: 0.25, max: 0.55 },
              delay: 0.04,
              ease: 'power2.inOut',
            }
          : false,

        onUpdate: (self) => {
          const next = Math.round(self.progress * (total - 1));
          if (next !== activeIdxRef.current) {
            activeIdxRef.current = next;
            setActiveIdx(next);
          }
        },

        // When scrolling back past the start, reset to photo 1 cleanly
        onLeaveBack: () => {
          activeIdxRef.current = 0;
          setActiveIdx(0);
        },
      });

      // Ensure the pin-spacer has solid cream background to eliminate any stripe bleed
      if (st.spacer) {
        st.spacer.style.backgroundColor = CREAM;
      }

      stRef.current = st;
    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (stRef.current) {
        stRef.current.kill();
        stRef.current = null;
      }
    };
  }, [total]);

  /* ──────────────────── Navigation & Skip Handlers ───────── */

  const goTo = useCallback(
    (idx) => {
      const targetIdx = Math.max(0, Math.min(total - 1, idx));
      if (stRef.current && typeof stRef.current.start === 'number' && typeof stRef.current.end === 'number') {
        const targetScroll =
          stRef.current.start + (targetIdx / (total - 1)) * (stRef.current.end - stRef.current.start);
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth',
        });
      } else {
        setActiveIdx(targetIdx);
      }
    },
    [total]
  );

  const handleSkipToLast = () => {
    goTo(total - 1);
  };

  /* ──────────────────── Keyboard (lightbox only) ─────────── */

  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIdx === null) return;
      if (e.key === 'Escape')      setLightboxIdx(null);
      if (e.key === 'ArrowLeft')   setLightboxIdx((i) => (i - 1 + total) % total);
      if (e.key === 'ArrowRight')  setLightboxIdx((i) => (i + 1) % total);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, total]);

  /* ──────────────────── Responsive card dimensions ──────────── */

  /**
   * Compute card height and visible container height based on viewport dimensions.
   * - Mobile (< 640px): expanded tall photo adapted to screen height, positioned near top
   * - Tablet (640px–1023px, iPad / iPad Pro): comfortably large photo (up to 520px)
   * - Desktop (≥ 1024px): strictly 330/360 unchanged
   */
  const getCardDims = () => {
    if (typeof window === 'undefined') return { cardH: 330, visibleH: 360 };
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Desktop (≥ 1024px): keep original 330/360 unchanged
    if (w >= 1024) {
      return { cardH: 330, visibleH: 360, isDesktop: true };
    }

    // Tablet / iPad / iPad Pro (640px to 1023px)
    if (w >= 640) {
      const tabH = Math.min(520, Math.max(380, Math.round(h * 0.52)));
      return { cardH: tabH, visibleH: tabH + 20, isDesktop: false };
    }

    // Mobile (< 640px): expanded height, filling mobile screen below top header
    const mobH = Math.min(490, Math.max(360, Math.round(h * 0.53)));
    return { cardH: mobH, visibleH: mobH + 16, isDesktop: false };
  };

  const [cardDims, setCardDims] = useState(getCardDims);

  useEffect(() => {
    const onResize = () => setCardDims(getCardDims());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isDesktop = cardDims.isDesktop;
  const cardH    = cardDims.cardH;
  const cardUnit = cardH + CARD_GAP;      // CARD_GAP = 20 (unchanged)
  const visibleH = cardDims.visibleH;

  /* ──────────────────── Derived values ───────────────────── */

  // TranslateY values to keep active items centred in their clipping containers
  const stripTY = offset(activeIdx, cardUnit, visibleH, cardH / 2);
  const textTY  = offset(activeIdx, TEXT_H,   TEXT_VIS, TEXT_H  / 2);

  const accentColor = ACCENT_COLORS[activeIdx % ACCENT_COLORS.length];

  /* ──────────────────── Render ────────────────────────────── */

  return (
    <section
      id={APP_CONFIG.sections.family}
      ref={sectionRef}
      className="relative z-30 bg-theme-creamLight min-h-screen min-h-[100dvh] w-full flex flex-col justify-start md:justify-center items-center pt-3 sm:pt-5 md:py-6 pb-4 sm:pb-6 overflow-hidden"
    >
      {/* ── Section Header (At the top on mobile) ── */}
      <div className="max-w-5xl mx-auto px-3 sm:px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-1.5 sm:mb-3">
          <div className="flex items-center justify-center gap-2 mb-1">
            <img src="/decorations/layers/star-yellow.png" alt="" className="w-4 sm:w-5 h-auto animate-pulse" aria-hidden="true" />
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-theme-sky/20 text-theme-navy font-display font-semibold text-xs border border-theme-sky/30 bg-white/80">
              <Sparkles size={12} className="text-theme-sky fill-theme-sky" />
              <span>Family Photo Album</span>
            </div>
            <img src="/decorations/layers/star-blue.png" alt="" className="w-4 sm:w-5 h-auto animate-pulse" aria-hidden="true" />

            {/* Quick Skip pill in header for instant desktop accessibility */}
            {activeIdx < total - 1 && (
              <button
                type="button"
                onClick={handleSkipToLast}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 hover:bg-theme-navy text-theme-navy hover:text-white border border-theme-navy/20 font-display font-semibold text-[11px] transition-all shadow-xs focus:outline-none cursor-pointer"
                title="Skip to 15th photo"
              >
                <span>Skip to 15th</span>
                <FastForward size={11} className="text-theme-red" />
              </button>
            )}
          </div>

          <h2 className="font-display font-extrabold text-2xl min-[400px]:text-3xl sm:text-4xl tracking-tight mb-0.5 drop-shadow-sm">
            <span className="text-[#DE5347]">FA</span>
            <span className="text-[#E5A93C]">MI</span>
            <span className="text-[#4E93CB]">LY </span>
            <span className="text-[#55A46D]">MO</span>
            <span className="text-[#DE5347]">ME</span>
            <span className="text-[#4E93CB]">NTS</span>
          </h2>

          <p className="font-display font-bold text-[11px] sm:text-xs text-theme-navy/70 uppercase tracking-widest">
            Surrounded by Love &amp; Warmth
          </p>
        </div>
      </div>

      {/* ── Two-Panel Carousel (no card box — blends with page bg) ── */}
      <div className="max-w-3xl mx-auto px-3 sm:px-6 w-full">
        <div className="relative flex gap-0 justify-center">

          {/* ── LEFT: Text Drum / Wheel (desktop & tablet only) ── */}
          <div
            className="hidden md:block relative shrink-0 select-none"
            style={{ width: 190, height: TEXT_VIS, overflow: 'hidden' }}
          >
            {/* Top cream fade */}
            <div
              className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
              style={{
                height: 85,
                background: `linear-gradient(to bottom, ${CREAM} 0%, transparent 100%)`,
              }}
            />
            {/* Bottom cream fade */}
            <div
              className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
              style={{
                height: 85,
                background: `linear-gradient(to top, ${CREAM} 0%, transparent 100%)`,
              }}
            />

            {/* Scrolling text track */}
            <div
              style={{
                transform: `translateY(${textTY}px)`,
                transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'transform',
              }}
            >
              {FAMILY_PHOTOS.map((photo, idx) => {
                const dist     = Math.abs(idx - activeIdx);
                const isActive = dist === 0;
                const color    = ACCENT_COLORS[idx % ACCENT_COLORS.length];

                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => goTo(idx)}
                    className="w-full text-left focus:outline-none cursor-pointer"
                    style={{
                      height: TEXT_H,
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: isActive ? 20 : 28,
                      paddingRight: 16,
                      gap: 10,
                      opacity: dist === 0 ? 1 : dist === 1 ? 0.46 : dist === 2 ? 0.24 : 0.09,
                      transition: 'opacity 0.5s ease',
                      background: 'transparent',
                      border: 'none',
                    }}
                  >
                    {/* Active accent bar */}
                    {isActive && (
                      <span
                        style={{
                          display: 'inline-block',
                          width: 4,
                          height: 22,
                          borderRadius: 2,
                          backgroundColor: color,
                          flexShrink: 0,
                          transition: 'background-color 0.4s ease',
                        }}
                      />
                    )}

                    <span
                      className="font-display"
                      style={{
                        fontSize:   isActive ? '1rem'   : dist === 1 ? '0.87rem' : '0.78rem',
                        fontWeight: isActive ? 700      : dist === 1 ? 500       : 400,
                        color:      isActive ? color    : '#2C3E6A',
                        transition: 'color 0.4s ease, font-size 0.4s ease, font-weight 0.3s ease',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      Moment {String(idx + 1).padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Vertical Separator (desktop only) ── */}
          <div
            className="hidden md:block shrink-0 self-stretch"
            style={{ width: 1, backgroundColor: 'rgba(0,0,0,0.07)' }}
          />

          {/* ── RIGHT: Vertical Photo Strip ── */}
          <div
            className="relative flex-1"
            style={{ height: visibleH }}
          >
            {/* No top/bottom fade overlays — single photo fills the container */}

            {/* Overflow clip */}
            <div style={{ height: visibleH, overflow: 'hidden', position: 'relative' }}>
              {/* Scrolling photo track on desktop; stationary frame on mobile/tablet */}
              <div
                style={isDesktop ? {
                  position: 'relative',
                  height: total * cardUnit,
                  transform: `translateY(${stripTY}px)`,
                  transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  willChange: 'transform',
                } : {
                  position: 'relative',
                  height: visibleH,
                  width: '100%',
                }}
              >
                {FAMILY_PHOTOS.map((photo, idx) => {
                  const isActive  = idx === activeIdx;
                  const cardColor = ACCENT_COLORS[idx % ACCENT_COLORS.length];

                  return (
                    <div
                      key={photo.id}
                      onClick={() => isActive && setLightboxIdx(idx)}
                      style={isDesktop ? {
                        position: 'absolute',
                        top: idx * cardUnit,
                        left: 10,
                        right: 10,
                        height: cardH,
                        borderRadius: 14,
                        overflow: 'hidden',
                        cursor: isActive ? 'pointer' : 'default',
                        pointerEvents: isActive ? 'auto' : 'none',
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 0.4s ease, box-shadow 0.4s ease',
                        border: isActive ? `2.5px solid ${cardColor}` : '2.5px solid transparent',
                        boxShadow: isActive ? '0 10px 36px rgba(0,0,0,0.20)' : 'none',
                      } : {
                        position: 'absolute',
                        top: 0,
                        left: 4,
                        right: 4,
                        height: cardH,
                        borderRadius: 16,
                        overflow: 'hidden',
                        cursor: isActive ? 'pointer' : 'default',
                        pointerEvents: isActive ? 'auto' : 'none',
                        opacity: isActive ? 1 : 0,
                        zIndex: isActive ? 10 : 0,
                        transition: 'opacity 0.35s ease, box-shadow 0.35s ease',
                        border: isActive ? `2.5px solid ${cardColor}` : '2.5px solid transparent',
                        boxShadow: isActive ? '0 10px 36px rgba(0,0,0,0.20)' : 'none',
                      }}
                    >
                      <img
                        src={photo.image}
                        alt={photo.alt}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          display: 'block',
                        }}
                        loading={Math.abs(idx - activeIdx) <= 2 ? 'eager' : 'lazy'}
                      />

                      {/* Active label overlay */}
                      {isActive && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '32px 14px 12px',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 100%)',
                            pointerEvents: 'none',
                          }}
                        >
                          <p style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>
                            Moment{' '}
                            <span style={{ color: cardColor, fontWeight: 700 }}>
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile: current moment label ── */}
        <div className="md:hidden flex items-center justify-between mt-2.5 px-1">
          <span className="font-display font-bold text-sm" style={{ color: accentColor }}>
            Moment {String(activeIdx + 1).padStart(2, '0')}
          </span>
          <span className="font-body text-xs text-theme-navy/45">
            {activeIdx + 1} / {total}
          </span>
        </div>

        {/* ── Progress dots ── */}
        <div className="flex items-center justify-center gap-1.5 mt-3 sm:mt-3.5">
          {FAMILY_PHOTOS.map((_, idx) => {
            const dist     = Math.abs(idx - activeIdx);
            const isActive = idx === activeIdx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Go to photo ${idx + 1}`}
                className="rounded-full transition-all duration-300 focus:outline-none cursor-pointer"
                style={{
                  width:           isActive ? 26 : dist === 1 ? 7 : 5,
                  height:          5,
                  backgroundColor: isActive
                    ? ACCENT_COLORS[activeIdx % ACCENT_COLORS.length]
                    : dist <= 2 ? '#c4b8a8' : '#ddd5c8',
                  opacity: dist > 4 ? 0.3 : 1,
                  border: 'none',
                  padding: 0,
                }}
              />
            );
          })}
        </div>

        {/* ── Button to Skip Through to the 15th (Last) Photo ── */}
        {activeIdx < total - 1 && (
          <div className="flex justify-center mt-2.5 sm:mt-3">
            <button
              type="button"
              onClick={handleSkipToLast}
              className="group inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/95 hover:bg-theme-navy text-theme-navy hover:text-white border border-theme-navy/20 hover:border-theme-navy font-display font-semibold text-xs sm:text-sm transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              title="Skip to 15th photo"
              aria-label="Skip through to 15th photo"
            >
              <span>Skip to 15th Photo</span>
              <FastForward size={13} className="text-theme-red group-hover:text-theme-yellow transition-colors" />
            </button>
          </div>
        )}

        {/* ── Button to Return to 1st Photo (shown when on the last photo) ── */}
        {activeIdx === total - 1 && (
          <div className="flex justify-center mt-2.5 sm:mt-3">
            <button
              type="button"
              onClick={() => goTo(0)}
              className="group inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/95 hover:bg-theme-navy text-theme-navy hover:text-white border border-theme-navy/20 hover:border-theme-navy font-display font-semibold text-xs sm:text-sm transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              title="Back to 1st photo"
              aria-label="Go back to the 1st photo"
            >
              <ChevronUp size={13} className="text-theme-blue group-hover:text-theme-yellow transition-colors" />
              <span>Back to 1st Photo</span>
            </button>
          </div>
        )}
      </div>

      {/* ────────────────── Lightbox Modal ────────────────── */}
      {lightboxIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightboxIdx(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
              <button
                type="button"
                onClick={() => setLightboxIdx(null)}
                className="p-1.5 sm:p-2 rounded-full bg-theme-cream hover:bg-theme-rope/30 text-theme-navy transition-colors focus:outline-none"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/5] sm:aspect-[4/3] w-full max-h-[72vh] rounded-2xl overflow-hidden bg-black/5 flex items-center justify-center">
              <img
                src={FAMILY_PHOTOS[lightboxIdx].image}
                alt={FAMILY_PHOTOS[lightboxIdx].alt}
                className="max-h-full max-w-full object-contain"
              />

              <button
                type="button"
                onClick={() => setLightboxIdx((i) => (i - 1 + total) % total)}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 hover:bg-white text-theme-navy shadow-lg transition-transform hover:scale-110 focus:outline-none"
                aria-label="Previous"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                onClick={() => setLightboxIdx((i) => (i + 1) % total)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 hover:bg-white text-theme-navy shadow-lg transition-transform hover:scale-110 focus:outline-none"
                aria-label="Next"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Caption */}
            <div className="mt-4 flex items-center justify-between px-2">
              <div>
                <p className="font-display font-bold text-base sm:text-lg text-theme-navy">
                  {APP_CONFIG.childName} — Family Moments
                </p>
                <p className="font-body text-xs sm:text-sm text-theme-navy/60">
                  Moment {lightboxIdx + 1} of {total}
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-yellow/20 text-theme-navy text-xs font-display font-semibold">
                <Heart size={13} className="text-theme-red fill-theme-red" />
                <span>Family Love</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FamilyGallery;
