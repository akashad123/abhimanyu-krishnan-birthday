import React, { useState, useRef } from 'react';
import { Camera, Heart, X, ZoomIn, Sparkles, ChevronLeft, ChevronRight, Trash2, RotateCcw } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { MONTHLY_MILESTONES } from '../data/initialMemories';

/**
 * MemoryGallery Section — "12 Months of Our Little One"
 * 
 * Styled according to client reference `reference/memories-section.jpeg`:
 * - Playful colorful header with floating celebration stars
 * - 12 Monthly polaroid photo milestone cards (01 month to 12 months)
 * - Individual month taglines ("A brand new you", "So curious", "All smiles", etc.)
 * - Delete icon / Undo functionality on guest & family celebration memories
 * - Interactive photo lightbox modal for high-resolution viewing
 * - Seamless support for guest-contributed celebration memories
 * - Anonymous client-side validated upload modal invitation
 */
export const MemoryGallery = ({
  memories = [],
  onDeleteMemory,
  onRestoreMemory,
  onOpenUpload,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [undoState, setUndoState] = useState(null);
  const undoTimerRef = useRef(null);

  // Combine static monthly milestones and guest memories for lightbox navigation
  const allLightboxItems = [
    ...MONTHLY_MILESTONES.map((m) => ({
      id: m.monthNumber,
      type: 'milestone',
      title: `${m.monthLabel} — ${m.tagline}`,
      subtitle: m.tagline,
      badge: m.monthLabel,
      image: m.image,
      alt: m.alt,
      raw: m,
    })),
    ...memories.map((m) => ({
      id: m.id,
      type: 'guest',
      title: m.caption || `${APP_CONFIG.childName} — 1st Birthday`,
      subtitle: m.created_at ? new Date(m.created_at).toLocaleDateString() : 'Celebration Memory',
      badge: 'Guest Memory',
      image: m.public_url,
      alt: m.caption || `${APP_CONFIG.childName} memory`,
      raw: m,
    })),
  ];

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setSelectedItem(allLightboxItems[index]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (lightboxIndex > 0) {
      handleOpenLightbox(lightboxIndex - 1);
    } else {
      handleOpenLightbox(allLightboxItems.length - 1);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (lightboxIndex < allLightboxItems.length - 1) {
      handleOpenLightbox(lightboxIndex + 1);
    } else {
      handleOpenLightbox(0);
    }
  };

  // Delete guest/uploaded memory handler (Moments Shared with Love only)
  const handleDeleteGuestMemory = async (item) => {
    if (!onDeleteMemory) return;

    const deleted = await onDeleteMemory(item.id);
    if (!deleted) return;

    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);

    setUndoState({
      type: 'guest',
      item: deleted,
      label: item.caption || 'Memory photo',
    });

    undoTimerRef.current = setTimeout(() => {
      setUndoState(null);
    }, 6000);
  };

  // Undo delete handler for guest memories
  const handleUndo = () => {
    if (!undoState) return;

    if (undoState.type === 'guest' && onRestoreMemory) {
      onRestoreMemory(undoState.item);
    }

    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setUndoState(null);
  };

  return (
    <section
      id={APP_CONFIG.sections.memories}
      className="relative pt-8 sm:pt-12 pb-16 sm:pb-24 px-3 sm:px-6 bg-theme-creamLight border-t-4 border-theme-rope/25 shadow-inner mt-6 sm:mt-8 z-30"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header: Styled after reference/memories-section.jpeg */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          {/* Decorative Stars & Tag */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <img
              src="/decorations/layers/star-yellow.png"
              alt=""
              className="w-5 sm:w-7 h-auto animate-pulse"
              aria-hidden="true"
            />
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-theme-yellow/20 text-theme-navy font-display font-semibold text-xs">
              <Sparkles size={13} className="text-theme-yellow fill-theme-yellow" />
              <span>Milestone Photo Album</span>
            </div>
            <img
              src="/decorations/layers/star-blue.png"
              alt=""
              className="w-5 sm:w-7 h-auto animate-pulse"
              aria-hidden="true"
            />
          </div>

          {/* Main Title: "12 MONTHS" in celebratory colors matching the reference */}
          <h2 className="font-display font-extrabold text-3xl min-[400px]:text-4xl sm:text-5xl tracking-tight mb-1">
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
          <p className="font-display font-bold text-xs sm:text-sm md:text-base text-theme-navy/80 uppercase tracking-widest mb-3">
            OF OUR LITTLE ONE
          </p>

          <p className="font-body text-xs sm:text-sm md:text-base text-theme-navy/70 leading-relaxed max-w-lg mx-auto">
            A whole year of sweet baby giggles, tiny footsteps, curious eyes, and endless love with{' '}
            <strong className="text-theme-blue font-semibold">{APP_CONFIG.childName}</strong>.
          </p>
        </div>

        {/* 12 Months Grid: 3 columns on mobile matching reference, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 min-[400px]:gap-3 sm:gap-5 md:gap-6">
          {MONTHLY_MILESTONES.map((item, idx) => (
            <div
              key={item.monthNumber}
              onClick={() => handleOpenLightbox(idx)}
              className="group cursor-pointer bg-white rounded-2xl sm:rounded-3xl p-2 min-[400px]:p-2.5 sm:p-3.5 shadow-paper hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-theme-sky/40 border border-theme-cream flex flex-col justify-between"
            >
              {/* Photo Frame (Static Curated Photo) */}
              <div className="relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl bg-amber-50/40 border border-theme-cream/80">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Subtle Hover Zoom Overlay */}
                <div className="absolute inset-0 bg-theme-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="p-1.5 sm:p-2 bg-white/95 rounded-full text-theme-navy shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn size={14} className="sm:w-4 sm:h-4" />
                  </span>
                </div>
              </div>

              {/* Month Label & Tagline matching reference */}
              <div className="pt-2 sm:pt-2.5 text-center px-0.5">
                <p className="font-display leading-tight text-xs sm:text-sm">
                  <span className="font-bold text-[#DE5347]">{item.monthNumber} </span>
                  <span className="font-semibold text-theme-navy">
                    {item.monthNumber === '01' ? 'month' : 'months'}
                  </span>
                </p>

                <p className="font-body text-[10px] min-[400px]:text-[11px] sm:text-xs text-theme-navy/65 italic leading-tight mt-0.5 truncate">
                  {item.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Optional Community / Guest Memories Section */}
        {memories.length > 0 && (
          <div className="mt-16 sm:mt-20 pt-10 border-t-2 border-theme-rope/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-sky/15 text-theme-navy font-display font-semibold text-xs mb-2">
                <Heart size={13} className="text-theme-red fill-theme-red" />
                <span>Guest & Family Memories</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-theme-navy">
                Moments Shared with Love
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {memories.map((item, idx) => (
                <div
                  key={item.id || idx}
                  onClick={() => handleOpenLightbox(MONTHLY_MILESTONES.length + idx)}
                  className="group cursor-pointer bg-white rounded-2xl p-2.5 sm:p-3 shadow-paper hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-theme-cream"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-theme-cream">
                    <img
                      src={item.public_url}
                      alt={item.caption || `${APP_CONFIG.childName} memory`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Delete / Undo Icon in top right corner of the pic */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteGuestMemory(item);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-theme-red text-theme-navy/70 hover:text-white shadow-md transition-all transform hover:scale-110 z-20 focus:outline-none"
                      title="Delete photo"
                      aria-label="Delete memory photo"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="pt-2 px-1 text-center">
                    <p className="font-display font-medium text-xs sm:text-sm text-theme-navy truncate">
                      {item.caption || `${APP_CONFIG.childName} — 1st Birthday`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Upload Invitation Card */}
        <div className="mt-14 sm:mt-20 max-w-xl mx-auto text-center bg-white/95 border-2 border-theme-sky/30 rounded-3xl p-6 sm:p-8 shadow-paper">
          <span className="inline-block p-3 rounded-full bg-theme-sky/15 text-theme-sky mb-3">
            <Camera size={26} />
          </span>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-theme-navy mb-2">
            Have a Photo of Baby Abhimanyu?
          </h3>
          <p className="font-body text-xs sm:text-sm text-theme-navy/70 mb-5 max-w-md mx-auto">
            Upload your favorite picture from the celebration directly into the album. No account or password required!
          </p>
          <button
            type="button"
            onClick={onOpenUpload}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-theme-red hover:bg-theme-redDark text-white font-display font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Camera size={18} />
            <span>Add a Memory to the Album</span>
          </button>
        </div>
      </div>

      {/* Floating Undo Notification Toast */}
      {undoState && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 bg-theme-navy/95 backdrop-blur-md text-white text-xs sm:text-sm rounded-full shadow-2xl border border-white/20">
          <span>Photo deleted</span>
          <button
            type="button"
            onClick={handleUndo}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-theme-yellow hover:bg-amber-400 text-theme-navy font-display font-bold rounded-full text-xs transition-colors shadow-sm"
          >
            <RotateCcw size={13} />
            <span>Undo</span>
          </button>
          <button
            type="button"
            onClick={() => setUndoState(null)}
            className="p-1 text-white/60 hover:text-white transition-colors"
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* High-Resolution Lightbox Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header controls: Delete (for guest memories only) & Close buttons */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 z-20">
              {selectedItem?.type === 'guest' && (
                <button
                  type="button"
                  onClick={() => {
                    const itemToDelete = selectedItem;
                    setSelectedItem(null);
                    handleDeleteGuestMemory(itemToDelete.raw);
                  }}
                  className="p-2 rounded-full bg-theme-cream text-theme-navy/70 hover:bg-theme-red hover:text-white transition-colors shadow-sm"
                  title="Delete photo"
                  aria-label="Delete photo"
                >
                  <Trash2 size={16} />
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-full bg-theme-cream text-theme-navy hover:bg-theme-red hover:text-white transition-colors shadow-sm"
                aria-label="Close photo preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-theme-navy hover:bg-theme-blue hover:text-white transition-colors z-20 shadow-md"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-theme-navy hover:bg-theme-blue hover:text-white transition-colors z-20 shadow-md"
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
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
                {selectedItem.badge}
              </span>
              <h4 className="font-display font-bold text-lg sm:text-xl text-theme-navy">
                {selectedItem.title}
              </h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MemoryGallery;
