import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { FAMILY_PHOTOS } from '../data/initialMemories';

/**
 * FamilyGallery — 3D Coverflow Horizontal Carousel
 *
 * Layout inspired by the user's reference: a centered photo carousel where:
 * - The active (center) card is large, fully visible, and brightly lit
 * - Left and right neighbor cards peek in — scaled down, dimmed, and slightly rotated
 * - Smooth drag/swipe on touch devices and click-nav arrows on desktop
 * - Progress dots below to indicate current position
 * - Full lightbox modal on card tap/click
 * - Fully responsive across mobile, tablet, and desktop
 */

/** Theme color palette cycling for card accent borders */
const ACCENT_COLORS = ['#4E93CB', '#DE5347', '#E5A93C', '#55A46D'];

export const FamilyGallery = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  // Touch/drag state
  const dragStartX = useRef(null);
  const isDragging = useRef(false);
  const total = FAMILY_PHOTOS.length;

  /* ─────────────────────────────── navigation ─────────────────────────── */

  const goTo = useCallback((idx) => {
    setActiveIdx(Math.max(0, Math.min(total - 1, idx)));
  }, [total]);

  const goPrev = useCallback(() => goTo(activeIdx - 1), [activeIdx, goTo]);
  const goNext = useCallback(() => goTo(activeIdx + 1), [activeIdx, goTo]);

  /* ─────────────────────────────── touch drag ─────────────────────────── */

  const handleDragStart = (e) => {
    dragStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    isDragging.current = true;
  };

  const handleDragEnd = (e) => {
    if (!isDragging.current || dragStartX.current === null) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const delta = dragStartX.current - endX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? goNext() : goPrev();
    }
    isDragging.current = false;
    dragStartX.current = null;
  };

  /* ─────────────────────────────── keyboard ───────────────────────────── */

  useEffect(() => {
    const onKey = (e) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') setLightboxOpen(false);
        if (e.key === 'ArrowLeft') setLightboxIdx((i) => (i - 1 + total) % total);
        if (e.key === 'ArrowRight') setLightboxIdx((i) => (i + 1) % total);
        return;
      }
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, goPrev, goNext, total]);

  /* ─────────────────────────────── lightbox ───────────────────────────── */

  const openLightbox = (idx) => {
    setLightboxIdx(idx);
    setLightboxOpen(true);
  };

  /* ─────────────────────────── card positioning ───────────────────────── */

  /**
   * Calculate per-card transform values based on distance from active index.
   * dist = 0  → center card (full size, fully visible)
   * dist = ±1 → neighbor card (scaled down, dimmed, rotated)
   * dist = ±2 → edge card (barely peeking)
   * dist > 2  → hidden
   */
  const getCardStyle = (idx) => {
    const dist = idx - activeIdx;
    const absDist = Math.abs(dist);

    if (absDist > 2) {
      return { opacity: 0, transform: 'translateX(0) scale(0.45)', zIndex: 0, pointerEvents: 'none' };
    }

    // Horizontal offset — center card at 0%, neighbors peek in from sides
    const xPercent = dist * 78; // each neighbor shifts 78% from center
    const scale = absDist === 0 ? 1 : absDist === 1 ? 0.72 : 0.52;
    const opacity = absDist === 0 ? 1 : absDist === 1 ? 0.65 : 0.3;
    const rotateY = dist === 0 ? 0 : dist > 0 ? -22 : 22;
    const zIndex = 10 - absDist;

    return {
      transform: `translateX(${xPercent}%) scale(${scale}) perspective(900px) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      pointerEvents: absDist === 0 ? 'auto' : 'auto',
    };
  };

  /* ─────────────────────────────── render ────────────────────────────── */

  return (
    <section
      id={APP_CONFIG.sections.family}
      className="relative z-30 bg-theme-creamLight pt-6 sm:pt-10 pb-16 sm:pb-24 px-0"
    >
      <div className="max-w-5xl mx-auto px-3 sm:px-6">
        {/* ── Decorative Divider ── */}
        <div className="flex items-center justify-center gap-3 mb-10 sm:mb-14">
          <div className="h-px bg-theme-rope/30 flex-1 max-w-[100px] sm:max-w-[160px]" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-red/10 text-theme-red text-xs font-display font-semibold">
            <Heart size={14} className="fill-theme-red" />
            <span>Family &amp; Loved Ones</span>
          </div>
          <div className="h-px bg-theme-rope/30 flex-1 max-w-[100px] sm:max-w-[160px]" />
        </div>

        {/* ── Section Header ── */}
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

      {/* ── 3D Coverflow Carousel ── */}
      <div className="relative w-full overflow-hidden select-none">
        {/* Track — all cards are positioned relative to this container */}
        <div
          className="relative flex items-center justify-center"
          style={{ height: 'clamp(340px, 58vw, 560px)' }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {FAMILY_PHOTOS.map((photo, idx) => {
            const style = getCardStyle(idx);
            const accentColor = ACCENT_COLORS[idx % ACCENT_COLORS.length];
            const isActive = idx === activeIdx;

            return (
              <div
                key={photo.id}
                className="absolute"
                style={{
                  ...style,
                  width: 'clamp(200px, 42vw, 380px)',
                  transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.55s ease',
                }}
              >
                {/* Card Frame */}
                <div
                  onClick={() => isActive ? openLightbox(idx) : goTo(idx)}
                  className="relative w-full overflow-hidden shadow-2xl cursor-pointer"
                  style={{
                    borderRadius: '20px',
                    border: isActive ? `3px solid ${accentColor}` : '3px solid transparent',
                    transition: 'border-color 0.4s ease',
                    aspectRatio: '4/5',
                    background: '#f5f0e8',
                  }}
                >
                  {/* Photo */}
                  <img
                    src={photo.image}
                    alt={photo.alt}
                    className="w-full h-full object-cover object-center"
                    loading={Math.abs(idx - activeIdx) <= 2 ? 'eager' : 'lazy'}
                    style={{
                      transform: isActive ? 'scale(1)' : 'scale(1.04)',
                      transition: 'transform 0.55s ease',
                    }}
                  />

                  {/* Active card — subtle gloss sweep overlay */}
                  {isActive && (
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%)',
                      }}
                    />
                  )}

                  {/* Active card — bottom gradient with label */}
                  <div
                    className="absolute bottom-0 left-0 right-0 px-4 py-3"
                    style={{
                      background: isActive
                        ? 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)'
                        : 'transparent',
                      transition: 'background 0.4s ease',
                    }}
                  >
                    {isActive && (
                      <p className="text-white font-display font-semibold text-sm drop-shadow-sm">
                        Moment <span style={{ color: accentColor }} className="font-bold">{String(idx + 1).padStart(2, '0')}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Left / Right Arrow Navigation ── */}
        <button
          type="button"
          onClick={goPrev}
          disabled={activeIdx === 0}
          aria-label="Previous photo"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-white/85 hover:bg-white text-theme-navy shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={activeIdx === total - 1}
          aria-label="Next photo"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-white/85 hover:bg-white text-theme-navy shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* ── Progress Dots ── */}
      <div className="flex items-center justify-center gap-1.5 mt-6 sm:mt-8 px-6">
        {/* Show max 15 dots compactly */}
        {FAMILY_PHOTOS.map((_, idx) => {
          const distance = Math.abs(idx - activeIdx);
          const isActive = idx === activeIdx;
          const accentColor = ACCENT_COLORS[activeIdx % ACCENT_COLORS.length];

          return (
            <button
              key={idx}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Go to photo ${idx + 1}`}
              className="transition-all duration-300 rounded-full focus:outline-none"
              style={{
                width: isActive ? '28px' : distance === 1 ? '8px' : '5px',
                height: isActive ? '8px' : distance === 1 ? '8px' : '5px',
                backgroundColor: isActive ? accentColor : distance === 1 ? '#c8b9a0' : '#d9cfc2',
                opacity: distance > 3 ? 0.35 : 1,
              }}
            />
          );
        })}
      </div>

      {/* ── Photo counter ── */}
      <p className="text-center mt-3 font-display font-semibold text-xs text-theme-navy/50 tracking-widest">
        {String(activeIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </p>

      {/* ────────────────────────────── Lightbox Modal ────────────────────── */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-1.5 sm:p-2 rounded-full bg-theme-cream hover:bg-theme-rope/30 text-theme-navy transition-colors focus:outline-none"
                aria-label="Close photo preview"
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
                aria-label="Previous photo"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                onClick={() => setLightboxIdx((i) => (i + 1) % total)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 hover:bg-white text-theme-navy shadow-lg transition-transform hover:scale-110 focus:outline-none"
                aria-label="Next photo"
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
                  Photo {lightboxIdx + 1} of {total}
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
