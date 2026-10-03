import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { FAMILY_PHOTOS } from '../data/initialMemories';

/**
 * Celebratory 4-color matching palettes for hover pop-ups and 3px border outlines
 * Cycles harmoniously with the project's primary celebration colors.
 */
const FAMILY_DECOR_PALETTES = [
  { borderClass: 'group-hover:border-[#4E93CB]', balloon: '/decorations/layers/balloon-blue.png', star: '/decorations/layers/star-yellow.png' },
  { borderClass: 'group-hover:border-[#DE5347]', balloon: '/decorations/layers/balloon-red.png', star: '/decorations/layers/star-blue.png' },
  { borderClass: 'group-hover:border-[#E5A93C]', balloon: '/decorations/layers/balloon-yellow.png', star: '/decorations/layers/star-red.png' },
  { borderClass: 'group-hover:border-[#55A46D]', balloon: '/decorations/layers/balloon-green.png', star: '/decorations/layers/star-yellow.png' },
];

/**
 * FamilyGallery Section — "Family Moments: Surrounded by Love & Warmth"
 * 
 * Features:
 * - 15 genuine family photographs with baby Abhimanyu, parents Praveen & Leeba, and loved ones
 * - 5-column balanced desktop layout (3 rows of 5), 3-column tablet (5 rows of 3), 2-column mobile
 * - Celebratory 3-pixel themed border outline and smooth photo scale zoom on hover
 * - Interactive high-resolution lightbox modal with keyboard navigation (Escape, Left, Right)
 * - Cohesive typography and festive styling consistent with the 12 Months Milestone Album
 */
export const FamilyGallery = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setSelectedItem(FAMILY_PHOTOS[index]);
  };

  const handleCloseLightbox = () => {
    setSelectedItem(null);
    setLightboxIndex(null);
  };

  const handlePrev = (e) => {
    e?.stopPropagation?.();
    if (lightboxIndex > 0) {
      handleOpenLightbox(lightboxIndex - 1);
    } else {
      handleOpenLightbox(FAMILY_PHOTOS.length - 1);
    }
  };

  const handleNext = (e) => {
    e?.stopPropagation?.();
    if (lightboxIndex < FAMILY_PHOTOS.length - 1) {
      handleOpenLightbox(lightboxIndex + 1);
    } else {
      handleOpenLightbox(0);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedItem) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, lightboxIndex]);

  return (
    <section
      id={APP_CONFIG.sections.family}
      className="relative z-30 bg-theme-creamLight pt-6 sm:pt-10 pb-16 sm:pb-24 px-3 sm:px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Soft Decorative Ribbon Divider separating 12 Months Milestone from Family Section */}
        <div className="flex items-center justify-center gap-3 mb-10 sm:mb-14">
          <div className="h-px bg-theme-rope/30 flex-1 max-w-[100px] sm:max-w-[160px]" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-red/10 text-theme-red text-xs font-display font-semibold">
            <Heart size={14} className="fill-theme-red" />
            <span>Family & Loved Ones</span>
          </div>
          <div className="h-px bg-theme-rope/30 flex-1 max-w-[100px] sm:max-w-[160px]" />
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          {/* Decorative Stars & Tag */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <img
              src="/decorations/layers/star-yellow.png"
              alt=""
              className="w-5 sm:w-7 h-auto animate-pulse drop-shadow-sm"
              aria-hidden="true"
            />
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-theme-sky/20 text-theme-navy font-display font-semibold text-xs border border-theme-sky/30 shadow-sm backdrop-blur-sm bg-white/80">
              <Sparkles size={13} className="text-theme-sky fill-theme-sky" />
              <span>Family Photo Album</span>
            </div>
            <img
              src="/decorations/layers/star-blue.png"
              alt=""
              className="w-5 sm:w-7 h-auto animate-pulse drop-shadow-sm"
              aria-hidden="true"
            />
          </div>

          {/* Main Title: "FAMILY MOMENTS" in celebratory colors matching the 12 Months header */}
          <h2 className="font-display font-extrabold text-3xl min-[400px]:text-4xl sm:text-5xl tracking-tight mb-1 drop-shadow-sm">
            <span className="text-[#DE5347]">FA</span>
            <span className="text-[#E5A93C]">MI</span>
            <span className="text-[#4E93CB]">LY </span>
            <span className="text-[#55A46D]">MO</span>
            <span className="text-[#DE5347]">ME</span>
            <span className="text-[#4E93CB]">NTS</span>
          </h2>

          {/* Subtitle */}
          <p className="font-display font-bold text-xs sm:text-sm md:text-base text-theme-navy/80 uppercase tracking-widest">
            Surrounded by Love & Warmth
          </p>
        </div>

        {/* 15 Family Photos Grid: 2 columns on mobile, 3 on tablet, 5 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 min-[400px]:gap-3.5 sm:gap-5 md:gap-6">
          {FAMILY_PHOTOS.map((item, idx) => {
            const palette = FAMILY_DECOR_PALETTES[idx % FAMILY_DECOR_PALETTES.length];

            return (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(idx)}
                className="group cursor-pointer bg-white rounded-2xl sm:rounded-3xl p-2 min-[400px]:p-2.5 sm:p-3 shadow-paper border border-theme-cream flex flex-col justify-between"
              >
                {/* Photo Frame & Celebratory Hover Effects Wrapper */}
                <div className="relative">
                  {/* Photo Frame with 3-Pixel Outline and Smooth Inner Photo Zoom */}
                  <div
                    className={`relative aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl bg-amber-50/40 border-3 border-transparent ${palette.borderClass} transition-colors duration-300 shadow-sm`}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />

                    {/* Subtle Glossy Photo Light Sweep */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>

                  {/* Pop-up Celebration Elements on Hover */}
                  {/* 1. Festive Balloon popping up at Top-Left */}
                  <div className="absolute -top-3.5 -left-2.5 sm:-top-4 sm:-left-3 pointer-events-none opacity-0 scale-0 -translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out delay-75 z-20 drop-shadow-md">
                    <img
                      src={palette.balloon}
                      alt=""
                      className="w-6 min-[400px]:w-7 sm:w-8 h-auto transform -rotate-12"
                      aria-hidden="true"
                    />
                  </div>

                  {/* 2. Celebration Party Drum popping up at Bottom-Right */}
                  <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-2.5 pointer-events-none opacity-0 scale-0 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out delay-150 z-20 drop-shadow-md">
                    <img
                      src="/decorations/layers/drum.png"
                      alt=""
                      className="w-6 min-[400px]:w-7 sm:w-8 h-auto transform rotate-12"
                      aria-hidden="true"
                    />
                  </div>

                  {/* 3. Celebration Star popping up at Top-Right */}
                  <div className="absolute -top-2.5 -right-2 sm:-top-3 sm:-right-2 pointer-events-none opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 rotate-0 group-hover:rotate-12 transition-all duration-300 ease-out delay-100 z-20 drop-shadow-sm">
                    <img
                      src={palette.star}
                      alt=""
                      className="w-4 sm:w-5 h-auto animate-pulse"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Subtle photo index label */}
                <div className="pt-2 sm:pt-2.5 text-center px-0.5 pb-0.5">
                  <p className="font-display leading-tight text-xs text-theme-navy/70">
                    <span className="font-semibold text-theme-navy">Moment </span>
                    <span className="font-bold text-[#DE5347]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* High-Resolution Lightbox Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={handleCloseLightbox}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
              <button
                type="button"
                onClick={handleCloseLightbox}
                className="p-1.5 sm:p-2 rounded-full bg-theme-cream hover:bg-theme-rope/30 text-theme-navy transition-colors focus:outline-none"
                aria-label="Close photo preview"
              >
                <X size={20} />
              </button>
            </div>

            {/* Lightbox Image Container */}
            <div className="relative aspect-[4/5] sm:aspect-[4/3] w-full max-h-[72vh] rounded-2xl overflow-hidden bg-black/5 flex items-center justify-center">
              <img
                src={selectedItem.image}
                alt={selectedItem.alt}
                className="max-h-full max-w-full object-contain"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 hover:bg-white text-theme-navy shadow-lg transition-transform hover:scale-110 focus:outline-none"
                aria-label="Previous photo"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 hover:bg-white text-theme-navy shadow-lg transition-transform hover:scale-110 focus:outline-none"
                aria-label="Next photo"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Lightbox Caption & Counter */}
            <div className="mt-4 flex items-center justify-between px-2">
              <div>
                <p className="font-display font-bold text-base sm:text-lg text-theme-navy">
                  {APP_CONFIG.childName} — Family Moments
                </p>
                <p className="font-body text-xs sm:text-sm text-theme-navy/60">
                  Photo {lightboxIndex + 1} of {FAMILY_PHOTOS.length}
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
