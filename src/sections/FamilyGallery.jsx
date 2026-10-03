import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
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
 * - No internal buttons / swipe needed — the main page scroll drives everything.
 *
 * Visual:
 * - No white card box — blends seamlessly with the page cream background (#FCFAF6).
 * - Fade-out gradients at the top/bottom of both panels use the exact cream colour.
 * - Active photo: full-size, accent border, shadow.
 * - Neighbour photos: scaled-down, dimmed, peeking above / below.
 */

/** Celebration accent colours cycling per photo */
const ACCENT_COLORS = ['#4E93CB', '#DE5347', '#E5A93C', '#55A46D'];

/** Page cream-light colour (matches bg-theme-creamLight in tailwind.config) */
const CREAM = '#FCFAF6';

/** Carousel layout constants */
const CARD_H    = 180;           // px — height of each photo card
const CARD_GAP  = 12;            // px — gap between cards
const CARD_UNIT = CARD_H + CARD_GAP; // 192 px per slot
const VISIBLE_H = 530;           // px — clip-container height for the strip

/** Left text drum constants */
const TEXT_H    = 52;            // px — height of each text row
const TEXT_VIS  = VISIBLE_H;     // same visible height as strip

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
  const total        = FAMILY_PHOTOS.length;

  /* ──────────────────── GSAP scroll-pin ──────────────────── */

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Allow ScrollTrigger to recalculate after any layout changes
    ScrollTrigger.refresh();

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      // Give each photo ~60 % of a viewport worth of scrolling room
      end: () => `+=${(total - 1) * window.innerHeight * 0.65}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,

      // Snap to each photo step
      snap: {
        snapTo: 1 / (total - 1),
        duration: { min: 0.25, max: 0.55 },
        delay: 0.04,
        ease: 'power2.inOut',
      },

      onUpdate: (self) => {
        const next = Math.round(self.progress * (total - 1));
        if (next !== activeIdxRef.current) {
          activeIdxRef.current = next;
          setActiveIdx(next);
        }
      },
    });

    return () => {
      st.kill();
    };
  }, [total]);

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

  /* ──────────────────── Derived values ───────────────────── */

  // TranslateY values to keep active items centred in their clipping containers
  const stripTY = offset(activeIdx, CARD_UNIT, VISIBLE_H, CARD_H / 2);
  const textTY  = offset(activeIdx, TEXT_H,    TEXT_VIS,  TEXT_H  / 2);

  const accentColor = ACCENT_COLORS[activeIdx % ACCENT_COLORS.length];

  /* ──────────────────── Render ────────────────────────────── */

  return (
    <section
      id={APP_CONFIG.sections.family}
      ref={sectionRef}
      className="relative z-30 bg-theme-creamLight pt-6 sm:pt-10 pb-16 sm:pb-24"
    >
      {/* ── Section Header ── */}
      <div className="max-w-5xl mx-auto px-3 sm:px-6">
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-10 sm:mb-14">
          <div className="h-px bg-theme-rope/30 flex-1 max-w-[100px] sm:max-w-[160px]" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-red/10 text-theme-red text-xs font-display font-semibold">
            <Heart size={14} className="fill-theme-red" />
            <span>Family &amp; Loved Ones</span>
          </div>
          <div className="h-px bg-theme-rope/30 flex-1 max-w-[100px] sm:max-w-[160px]" />
        </div>

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img src="/decorations/layers/star-yellow.png" alt="" className="w-5 sm:w-7 h-auto animate-pulse" aria-hidden="true" />
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-theme-sky/20 text-theme-navy font-display font-semibold text-xs border border-theme-sky/30 bg-white/80">
              <Sparkles size={13} className="text-theme-sky fill-theme-sky" />
              <span>Family Photo Album</span>
            </div>
            <img src="/decorations/layers/star-blue.png" alt="" className="w-5 sm:w-7 h-auto animate-pulse" aria-hidden="true" />
          </div>

          <h2 className="font-display font-extrabold text-3xl min-[400px]:text-4xl sm:text-5xl tracking-tight mb-1 drop-shadow-sm">
            <span className="text-[#DE5347]">FA</span>
            <span className="text-[#E5A93C]">MI</span>
            <span className="text-[#4E93CB]">LY </span>
            <span className="text-[#55A46D]">MO</span>
            <span className="text-[#DE5347]">ME</span>
            <span className="text-[#4E93CB]">NTS</span>
          </h2>

          <p className="font-display font-bold text-xs sm:text-sm md:text-base text-theme-navy/80 uppercase tracking-widest">
            Surrounded by Love &amp; Warmth
          </p>
        </div>
      </div>

      {/* ── Two-Panel Carousel (no card box — blends with page bg) ── */}
      <div className="max-w-3xl mx-auto px-3 sm:px-6">
        <div className="relative flex gap-0">

          {/* ── LEFT: Text Drum / Wheel (desktop & tablet only) ── */}
          <div
            className="hidden md:block relative shrink-0 select-none"
            style={{ width: 210, height: TEXT_VIS, overflow: 'hidden' }}
          >
            {/* Top cream fade */}
            <div
              className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
              style={{
                height: 130,
                background: `linear-gradient(to bottom, ${CREAM} 0%, transparent 100%)`,
              }}
            />
            {/* Bottom cream fade */}
            <div
              className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
              style={{
                height: 130,
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
                  <div
                    key={photo.id}
                    style={{
                      height: TEXT_H,
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: isActive ? 20 : 28,
                      paddingRight: 16,
                      gap: 10,
                      opacity: dist === 0 ? 1 : dist === 1 ? 0.46 : dist === 2 ? 0.24 : 0.09,
                      transition: 'opacity 0.5s ease',
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
                  </div>
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
            style={{ height: VISIBLE_H }}
          >
            {/* Top cream fade */}
            <div
              className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
              style={{
                height: 110,
                background: `linear-gradient(to bottom, ${CREAM} 0%, transparent 100%)`,
              }}
            />
            {/* Bottom cream fade */}
            <div
              className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
              style={{
                height: 110,
                background: `linear-gradient(to top, ${CREAM} 0%, transparent 100%)`,
              }}
            />

            {/* Overflow clip */}
            <div style={{ height: VISIBLE_H, overflow: 'hidden', position: 'relative' }}>
              {/* Scrolling photo track */}
              <div
                style={{
                  position: 'relative',
                  height: total * CARD_UNIT,
                  transform: `translateY(${stripTY}px)`,
                  transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  willChange: 'transform',
                }}
              >
                {FAMILY_PHOTOS.map((photo, idx) => {
                  const dist       = Math.abs(idx - activeIdx);
                  const isActive   = dist === 0;
                  const scale      = isActive ? 1 : dist === 1 ? 0.88 : dist === 2 ? 0.76 : 0.62;
                  const opacity    = isActive ? 1 : dist === 1 ? 0.62 : dist === 2 ? 0.35 : dist === 3 ? 0.14 : 0.03;
                  const cardColor  = ACCENT_COLORS[idx % ACCENT_COLORS.length];

                  return (
                    <div
                      key={photo.id}
                      onClick={() => isActive && setLightboxIdx(idx)}
                      style={{
                        position: 'absolute',
                        top: idx * CARD_UNIT,
                        left: 10,
                        right: 10,
                        height: CARD_H,
                        borderRadius: 14,
                        overflow: 'hidden',
                        cursor: isActive ? 'pointer' : 'default',

                        transform: `scale(${scale})`,
                        transformOrigin: 'center center',
                        opacity,
                        transition: 'transform 0.55s ease, opacity 0.55s ease, box-shadow 0.4s ease',

                        border: isActive
                          ? `2.5px solid ${cardColor}`
                          : '2.5px solid transparent',
                        boxShadow: isActive
                          ? '0 10px 36px rgba(0,0,0,0.20)'
                          : '0 2px 10px rgba(0,0,0,0.06)',
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
                        loading={dist <= 2 ? 'eager' : 'lazy'}
                      />

                      {/* Active label overlay */}
                      {isActive && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '24px 14px 10px',
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
        <div className="md:hidden flex items-center justify-between mt-4 px-1">
          <span className="font-display font-bold text-sm" style={{ color: accentColor }}>
            Moment {String(activeIdx + 1).padStart(2, '0')}
          </span>
          <span className="font-body text-xs text-theme-navy/45">
            {activeIdx + 1} / {total}
          </span>
        </div>

        {/* ── Progress dots ── */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {FAMILY_PHOTOS.map((_, idx) => {
            const dist     = Math.abs(idx - activeIdx);
            const isActive = idx === activeIdx;
            return (
              <div
                key={idx}
                className="rounded-full transition-all duration-400"
                style={{
                  width:           isActive ? 28 : dist === 1 ? 8 : 5,
                  height:          6,
                  backgroundColor: isActive
                    ? ACCENT_COLORS[activeIdx % ACCENT_COLORS.length]
                    : dist <= 2 ? '#c4b8a8' : '#ddd5c8',
                  opacity: dist > 4 ? 0.3 : 1,
                }}
              />
            );
          })}
        </div>

        {/* ── Scroll hint ── */}
        <p className="text-center mt-4 font-body text-xs text-theme-navy/40 tracking-wide">
          scroll to explore family moments
        </p>
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
