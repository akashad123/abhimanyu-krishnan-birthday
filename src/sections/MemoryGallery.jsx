import React, { useState, useEffect } from 'react';
import { X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { MONTHLY_MILESTONES } from '../data/initialMemories';

/**
 * MemoryGallery Section — "12 Months of Our Little One"
 * 
 * Styled according to client reference `reference/memories-section.jpeg`:
 * - Organic multi-layer wave header transition
 * - Playful colorful header with floating celebration stars
 * - 12 Monthly polaroid photo milestone cards (01 month to 12 months)
 * - 2 photos per row on mobile phones, 3 photos per row on desktop PC
 * - Celebratory 3-pixel themed border outline and smooth photo scale zoom on hover
 * - Interactive photo lightbox modal for high-resolution viewing
 */
const MILESTONE_DECOR_PALETTES = [
  { borderClass: 'group-hover:border-[#4E93CB]', balloon: '/decorations/layers/balloon-blue.png', star: '/decorations/layers/star-yellow.png' },
  { borderClass: 'group-hover:border-[#DE5347]', balloon: '/decorations/layers/balloon-red.png', star: '/decorations/layers/star-blue.png' },
  { borderClass: 'group-hover:border-[#E5A93C]', balloon: '/decorations/layers/balloon-yellow.png', star: '/decorations/layers/star-red.png' },
  { borderClass: 'group-hover:border-[#55A46D]', balloon: '/decorations/layers/balloon-green.png', star: '/decorations/layers/star-yellow.png' },
];

export const MemoryGallery = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setSelectedItem(MONTHLY_MILESTONES[index]);
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
      handleOpenLightbox(MONTHLY_MILESTONES.length - 1);
    }
  };

  const handleNext = (e) => {
    e?.stopPropagation?.();
    if (lightboxIndex < MONTHLY_MILESTONES.length - 1) {
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
      id={APP_CONFIG.sections.memories}
      className="relative z-30 pt-2 sm:pt-4 md:pt-6"
    >
      {/* Organic Celebratory Wave Transition from Blue Striped Sky to Cream Photo Album */}
      <div className="relative w-full overflow-hidden leading-none pointer-events-none -mb-1">
        <svg
          viewBox="0 0 1440 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-24 min-[400px]:h-32 sm:h-44 md:h-56 lg:h-64"
          preserveAspectRatio="none"
        >
          {/* Layer 1: Translucent Blue Wave (#5299D3, 40% opacity) */}
          <path
            d="M0,80 C180,80 280,10 440,10 C620,10 720,130 900,130 C1060,130 1170,40 1300,40 C1380,40 1415,60 1440,70 L1440,280 L0,280 Z"
            fill="#5299D3"
            fillOpacity="0.4"
          />
          {/* Layer 2: Main Exact Blue Wave (#5299D3 solid, matching wallpaper blue) */}
          <path
            d="M0,110 C200,110 310,35 470,35 C660,35 760,160 940,160 C1100,160 1200,65 1335,65 C1395,65 1425,85 1440,95 L1440,280 L0,280 Z"
            fill="#5299D3"
          />
          {/* Layer 3: Foreground Cream-White Wave (#FCFAF6 matching album background) */}
          <path
            d="M0,145 C240,145 340,70 500,70 C700,70 800,190 980,190 C1130,190 1230,105 1360,105 C1410,105 1430,120 1440,125 L1440,280 L0,280 Z"
            fill="#FCFAF6"
          />
        </svg>
      </div>

      {/* Main Memory Album Content Canvas */}
      <div className="bg-theme-creamLight pt-0 pb-12 sm:pb-16 px-3 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header: Resting right on top of the wave */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 -mt-14 min-[400px]:-mt-18 sm:-mt-24 md:-mt-32 relative z-20">
            {/* Decorative Stars & Tag */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <img
                src="/decorations/layers/star-yellow.png"
                alt=""
                className="w-5 sm:w-7 h-auto animate-pulse drop-shadow-sm"
                aria-hidden="true"
              />
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-theme-yellow/20 text-theme-navy font-display font-semibold text-xs border border-theme-yellow/30 shadow-sm backdrop-blur-sm bg-white/80">
                <Sparkles size={13} className="text-theme-yellow fill-theme-yellow" />
                <span>Milestone Photo Album</span>
              </div>
              <img
                src="/decorations/layers/star-blue.png"
                alt=""
                className="w-5 sm:w-7 h-auto animate-pulse drop-shadow-sm"
                aria-hidden="true"
              />
            </div>

            {/* Main Title: "12 MONTHS" in celebratory colors matching the reference */}
            <h2 className="font-display font-extrabold text-3xl min-[400px]:text-4xl sm:text-5xl tracking-tight mb-1 drop-shadow-sm">
              <span className="text-[#DE5347]">12 </span>
              <span className="tracking-wider">
                <span className="text-[#E5A93C]">M</span>
                <span className="text-[#4E93CB]">O</span>
                <span className="text-[#55A46D]">N</span>
                <span className="text-[#DE5347]">T</span>
                <span className="text-[#4E93CB]">H</span>
                <span className="text-[#E5A93C]">S</span>
              </span>
            </h2>

            {/* Subtitle: "OF OUR LITTLE ONE" */}
            <p className="font-display font-bold text-xs sm:text-sm md:text-base text-theme-navy/80 uppercase tracking-widest">
              OF OUR LITTLE ONE
            </p>
          </div>

          {/* 12 Months Grid: 2 photos in one row on mobile phones, 3 photos in one row on desktop PC */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-5 md:gap-6">
            {MONTHLY_MILESTONES.map((item, idx) => {
              const palette = MILESTONE_DECOR_PALETTES[idx % MILESTONE_DECOR_PALETTES.length];

              return (
                <div
                  key={item.monthNumber}
                  onClick={() => handleOpenLightbox(idx)}
                  className="group cursor-pointer bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 shadow-paper border border-theme-cream flex flex-col justify-between"
                >
                  {/* Photo Frame & Pop-up Celebrations Wrapper */}
                  <div className="relative">
                    {/* Photo Frame with 3-Pixel Outline and Smooth Inner Photo Zoom */}
                    <div
                      className={`relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl bg-amber-50/40 border-3 border-transparent ${palette.borderClass} transition-colors duration-300 shadow-sm`}
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
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

                  {/* Month Label */}
                  <div className="pt-2 sm:pt-2.5 text-center px-0.5 pb-0.5">
                    <p className="font-display leading-tight text-xs sm:text-sm">
                      <span className="font-bold text-[#DE5347]">{item.monthNumber} </span>
                      <span className="font-semibold text-theme-navy">
                        {item.monthNumber === '01' ? 'month' : 'months'}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
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
                className="p-1.5 sm:p-2 rounded-full bg-theme-cream text-theme-navy hover:bg-theme-red hover:text-white transition-colors shadow-sm focus:outline-none"
                aria-label="Close photo preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 text-theme-navy hover:bg-theme-blue hover:text-white transition-all z-20 shadow-md hover:scale-110 focus:outline-none"
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 text-theme-navy hover:bg-theme-blue hover:text-white transition-all z-20 shadow-md hover:scale-110 focus:outline-none"
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>

            {/* Photo Display */}
            <div className="max-h-[65vh] flex items-center justify-center overflow-hidden rounded-2xl bg-theme-cream/40">
              <img
                src={selectedItem.image}
                alt={selectedItem.alt}
                className="max-h-[65vh] w-auto object-contain rounded-2xl"
              />
            </div>

            {/* Photo Info */}
            <div className="mt-4 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-theme-yellow/20 text-theme-navy font-display font-semibold text-xs mb-1.5">
                {APP_CONFIG.childName} — Milestone
              </span>
              <h4 className="font-display font-bold text-lg sm:text-xl text-theme-navy">
                {selectedItem.monthLabel}
              </h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MemoryGallery;
