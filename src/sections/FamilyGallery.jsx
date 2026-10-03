import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, Sparkles, X, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { FAMILY_PHOTOS } from '../data/initialMemories';

/**
 * FamilyGallery — Vertical Drum-Scroll Carousel
 *
 * Layout (inspired by user reference):
 * ┌─────────────────┬───────────────────┐
 * │  LEFT: Text     │  RIGHT: Photos    │
 * │  drum/wheel     │  vertical strip   │
 * │  list — active  │  center = active  │
 * │  item is large  │  top/bottom peek  │
 * │  & colored.     │  in, scaled down  │
 * │  Others fade.   │  and dimmed.      │
 * └─────────────────┴───────────────────┘
 *
 * Interaction:
 * - Swipe up/down on the photo strip
 * - Click arrow buttons (top/bottom right)
 * - Click a partially-visible neighbor photo → jump to it
 * - Click the active photo → open full-screen lightbox
 * - Keyboard: ArrowUp / ArrowDown
 * - Left text list items are clickable to jump to any photo
 */

/** Celebration accent colors cycling per photo */
const ACCENT_COLORS = ['#4E93CB', '#DE5347', '#E5A93C', '#55A46D'];

/** Carousel layout constants */
const CARD_H     = 180; // px — height of each photo card in the strip
const CARD_GAP   = 12;  // px — gap between cards
const CARD_UNIT  = CARD_H + CARD_GAP; // 192px per slot
const VISIBLE_H  = 530; // px — total visible height of the carousel panels

/** Left text list constants */
const TEXT_ITEM_H  = 52;  // px — height of each text item row
const TEXT_VISIBLE_H = VISIBLE_H; // same height as photo strip

/**
 * Calculate the translateY needed to vertically center the active item
 * within a fixed-height overflow:hidden container.
 *
 * @param {number} activeIdx  - index of active item
 * @param {number} itemH      - height of each item (px)
 * @param {number} visibleH   - container visible height (px)
 * @returns {number} translateY in px
 */
const centerOffset = (activeIdx, itemH, visibleH) =>
  visibleH / 2 - activeIdx * itemH - itemH / 2;

export const FamilyGallery = () => {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const dragStartY = useRef(null);
  const total = FAMILY_PHOTOS.length;

  /* ─────────────── navigation helpers ─────────────── */

  const goTo = useCallback(
    (idx) => setActiveIdx(Math.max(0, Math.min(total - 1, idx))),
    [total]
  );

  const goPrev = useCallback(() => goTo(activeIdx - 1), [activeIdx, goTo]);
  const goNext = useCallback(() => goTo(activeIdx + 1), [activeIdx, goTo]);

  /* ─────────────── touch / swipe ──────────────────── */

  const handleTouchStart = (e) => {
    dragStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (dragStartY.current === null) return;
    const delta = dragStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) > 35) delta > 0 ? goNext() : goPrev();
    dragStartY.current = null;
  };

  /* ─────────────── keyboard ───────────────────────── */

  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIdx !== null) {
        if (e.key === 'Escape')      setLightboxIdx(null);
        if (e.key === 'ArrowLeft')   setLightboxIdx((i) => (i - 1 + total) % total);
        if (e.key === 'ArrowRight')  setLightboxIdx((i) => (i + 1) % total);
        return;
      }
      if (e.key === 'ArrowUp')   goPrev();
      if (e.key === 'ArrowDown') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, goPrev, goNext, total]);

  /* ─────────────── derived values ─────────────────── */

  // translateY so the active photo card is vertically centered in the strip
  const stripTranslateY = centerOffset(activeIdx, CARD_UNIT, VISIBLE_H);
  // translateY so the active text item is vertically centered in the text panel
  const textTranslateY  = centerOffset(activeIdx, TEXT_ITEM_H, TEXT_VISIBLE_H);

  const accentColor = ACCENT_COLORS[activeIdx % ACCENT_COLORS.length];

  /* ─────────────── render ─────────────────────────── */

  return (
    <section
      id={APP_CONFIG.sections.family}
      className="relative z-30 bg-theme-creamLight pt-6 sm:pt-10 pb-16 sm:pb-24"
    >
      {/* ── Section Header ── */}
      <div className="max-w-5xl mx-auto px-3 sm:px-6">
        {/* Decorative Divider */}
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

      {/* ── Main Two-Panel Carousel ── */}
      <div className="max-w-3xl mx-auto px-3 sm:px-6">
        <div
          className="relative flex rounded-3xl overflow-hidden shadow-paper"
          style={{
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.5)',
          }}
        >

          {/* ── LEFT PANEL: Drum Text List (hidden on mobile) ── */}
          <div
            className="hidden md:block relative shrink-0 select-none"
            style={{ width: 210, height: TEXT_VISIBLE_H, overflow: 'hidden' }}
          >
            {/* Top fade-out gradient */}
            <div
              className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
              style={{
                height: 120,
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.97) 0%, transparent 100%)',
              }}
            />
            {/* Bottom fade-out gradient */}
            <div
              className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
              style={{
                height: 120,
                background: 'linear-gradient(to top, rgba(255,255,255,0.97) 0%, transparent 100%)',
              }}
            />

            {/* Scrolling text track */}
            <div
              style={{
                transform: `translateY(${textTranslateY}px)`,
                transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'transform',
                paddingTop: 0,
              }}
            >
              {FAMILY_PHOTOS.map((photo, idx) => {
                const dist    = Math.abs(idx - activeIdx);
                const isActive = dist === 0;
                const color   = ACCENT_COLORS[idx % ACCENT_COLORS.length];

                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => goTo(idx)}
                    className="w-full text-left focus:outline-none"
                    style={{
                      height: TEXT_ITEM_H,
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: isActive ? 20 : 28,
                      paddingRight: 16,
                      gap: 10,
                      opacity: dist === 0 ? 1 : dist === 1 ? 0.48 : dist === 2 ? 0.26 : 0.1,
                      transition: 'opacity 0.5s ease, font-size 0.4s ease, padding 0.3s ease',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Active item left accent bar */}
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
                        fontSize: isActive ? '1rem' : dist === 1 ? '0.87rem' : '0.78rem',
                        fontWeight: isActive ? 700 : dist === 1 ? 500 : 400,
                        color: isActive ? color : '#2C3E6A',
                        transition: 'color 0.4s ease, font-size 0.4s ease, font-weight 0.3s ease',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.3,
                      }}
                    >
                      Moment {String(idx + 1).padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Vertical Separator Line (desktop only) ── */}
          <div
            className="hidden md:block shrink-0 self-stretch"
            style={{ width: 1, backgroundColor: 'rgba(0,0,0,0.07)' }}
          />

          {/* ── RIGHT PANEL: Vertical Photo Strip ── */}
          <div
            className="relative flex-1"
            style={{ height: VISIBLE_H }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top fade-out */}
            <div
              className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
              style={{
                height: 100,
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.92) 0%, transparent 100%)',
              }}
            />
            {/* Bottom fade-out */}
            <div
              className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
              style={{
                height: 100,
                background: 'linear-gradient(to top, rgba(255,255,255,0.92) 0%, transparent 100%)',
              }}
            />

            {/* Overflow clip container */}
            <div
              className="relative"
              style={{ height: VISIBLE_H, overflow: 'hidden' }}
            >
              {/* Scrolling photo track */}
              <div
                style={{
                  /* Total height needed to absolutely position all cards */
                  position: 'relative',
                  height: total * CARD_UNIT,
                  transform: `translateY(${stripTranslateY}px)`,
                  transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  willChange: 'transform',
                }}
              >
                {FAMILY_PHOTOS.map((photo, idx) => {
                  const dist     = Math.abs(idx - activeIdx);
                  const isActive = dist === 0;
                  const scale    = isActive ? 1 : dist === 1 ? 0.88 : dist === 2 ? 0.76 : 0.62;
                  const opacity  = isActive ? 1 : dist === 1 ? 0.62 : dist === 2 ? 0.35 : dist === 3 ? 0.15 : 0.04;
                  const cardColor = ACCENT_COLORS[idx % ACCENT_COLORS.length];

                  return (
                    <div
                      key={photo.id}
                      onClick={() => isActive ? setLightboxIdx(idx) : goTo(idx)}
                      style={{
                        position: 'absolute',
                        top: idx * CARD_UNIT,
                        left: 10,
                        right: 10,
                        height: CARD_H,
                        borderRadius: 14,
                        overflow: 'hidden',
                        cursor: 'pointer',

                        /* Scale & opacity animate together */
                        transform: `scale(${scale})`,
                        transformOrigin: 'center center',
                        opacity,
                        transition: 'transform 0.55s ease, opacity 0.55s ease, box-shadow 0.4s ease',

                        /* Active card gets accent border + stronger shadow */
                        border: isActive
                          ? `2.5px solid ${cardColor}`
                          : '2.5px solid transparent',
                        boxShadow: isActive
                          ? `0 10px 36px rgba(0,0,0,0.20)`
                          : '0 2px 10px rgba(0,0,0,0.07)',
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
                          /* Subtle scale-in on active */
                          transform: isActive ? 'scale(1)' : 'scale(1.04)',
                          transition: 'transform 0.55s ease',
                          display: 'block',
                        }}
                        loading={dist <= 2 ? 'eager' : 'lazy'}
                      />

                      {/* Active card label overlay */}
                      {isActive && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '20px 14px 10px',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.50) 0%, transparent 100%)',
                          }}
                        >
                          <p style={{ color: '#fff', fontFamily: 'inherit', fontSize: '0.8rem', fontWeight: 600 }}>
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

            {/* ── Up / Down arrow buttons ── */}
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIdx === 0}
              aria-label="Previous photo"
              className="absolute right-3 sm:right-4 top-3 sm:top-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-theme-navy shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed focus:outline-none"
            >
              <ChevronUp size={18} />
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={activeIdx === total - 1}
              aria-label="Next photo"
              className="absolute right-3 sm:right-4 bottom-3 sm:bottom-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-theme-navy shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed focus:outline-none"
            >
              <ChevronDown size={18} />
            </button>
          </div>
        </div>

        {/* ── Mobile: current moment label + counter ── */}
        <div className="md:hidden flex items-center justify-between mt-4 px-2">
          <span
            className="font-display font-bold text-sm"
            style={{ color: accentColor }}
          >
            Moment {String(activeIdx + 1).padStart(2, '0')}
          </span>
          <span className="font-body text-xs text-theme-navy/45">
            {activeIdx + 1} / {total}
          </span>
        </div>

        {/* ── Progress dots ── */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {FAMILY_PHOTOS.map((_, idx) => {
            const dist = Math.abs(idx - activeIdx);
            const isActive = idx === activeIdx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Go to Moment ${idx + 1}`}
                className="focus:outline-none transition-all duration-300 rounded-full"
                style={{
                  width:  isActive ? 28 : dist === 1 ? 8 : 5,
                  height: 6,
                  backgroundColor: isActive
                    ? ACCENT_COLORS[activeIdx % ACCENT_COLORS.length]
                    : dist <= 2 ? '#c4b8a8' : '#ddd5c8',
                  opacity: dist > 4 ? 0.3 : 1,
                }}
              />
            );
          })}
        </div>
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
            {/* Close button */}
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

            {/* Lightbox image */}
            <div className="relative aspect-[4/5] sm:aspect-[4/3] w-full max-h-[72vh] rounded-2xl overflow-hidden bg-black/5 flex items-center justify-center">
              <img
                src={FAMILY_PHOTOS[lightboxIdx].image}
                alt={FAMILY_PHOTOS[lightboxIdx].alt}
                className="max-h-full max-w-full object-contain"
              />

              {/* Prev */}
              <button
                type="button"
                onClick={() => setLightboxIdx((i) => (i - 1 + total) % total)}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 hover:bg-white text-theme-navy shadow-lg transition-transform hover:scale-110 focus:outline-none"
                aria-label="Previous"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Next */}
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
