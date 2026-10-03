import React, { useState, useRef, useEffect } from 'react';
import { Camera, Heart, Trash2, RotateCcw, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

/**
 * CommunityMemories Section — "Moments Shared with Love" & Upload Invitation
 * Positioned as the final section before the Footer.
 * 
 * Features:
 * - Community/guest contributed celebration memories
 * - Consistent 2-column mobile / 3-column desktop layout
 * - Interactive lightbox with next/prev navigation
 * - Client-side deletion with persistent undo toast
 * - Warm celebratory "Have a Photo of Baby Abhimanyu? Add a Memory to the Album" invitation card
 */
export const CommunityMemories = ({
  memories = [],
  onDeleteMemory,
  onRestoreMemory,
  onOpenUpload,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState(null);
  const [undoState, setUndoState] = useState(null);
  const undoTimerRef = useRef(null);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setSelectedItem(memories[index]);
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
      handleOpenLightbox(memories.length - 1);
    }
  };

  const handleNext = (e) => {
    e?.stopPropagation?.();
    if (lightboxIndex < memories.length - 1) {
      handleOpenLightbox(lightboxIndex + 1);
    } else {
      handleOpenLightbox(0);
    }
  };

  // Keyboard navigation for lightbox and delete confirmation modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (deleteConfirmItem) {
        if (e.key === 'Escape') setDeleteConfirmItem(null);
        return;
      }
      if (!selectedItem) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, lightboxIndex, deleteConfirmItem]);

  // Delete guest/uploaded memory handler
  const handleDeleteGuestMemory = async (item) => {
    if (!onDeleteMemory) return;

    const deleted = await onDeleteMemory(item.id);
    if (!deleted) return;

    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);

    setUndoState({
      item: deleted,
      label: item.caption || 'Memory photo',
    });

    undoTimerRef.current = setTimeout(() => {
      setUndoState(null);
    }, 6000);
  };

  // Undo delete handler
  const handleUndo = () => {
    if (!undoState) return;

    if (onRestoreMemory) {
      onRestoreMemory(undoState.item);
    }

    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setUndoState(null);
  };

  return (
    <section
      id={APP_CONFIG.sections.upload}
      className="relative z-30 bg-theme-creamLight pt-6 sm:pt-10 pb-10 sm:pb-14 px-3 sm:px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Soft Decorative Divider */}
        <div className="flex items-center justify-center gap-3 mb-10 sm:mb-14">
          <div className="h-px bg-theme-rope/30 flex-1 max-w-[100px] sm:max-w-[160px]" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-sky/20 text-theme-navy text-xs font-display font-semibold">
            <Camera size={14} className="text-theme-sky" />
            <span>Community Memories</span>
          </div>
          <div className="h-px bg-theme-rope/30 flex-1 max-w-[100px] sm:max-w-[160px]" />
        </div>

        {/* Optional Community / Guest Memories Grid (if any photos uploaded) */}
        {memories.length > 0 && (
          <div className="mb-14 sm:mb-20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-sky/15 text-theme-navy font-display font-semibold text-xs mb-2">
                <Heart size={13} className="text-theme-red fill-theme-red" />
                <span>Guest & Family Memories</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-theme-navy">
                Moments Shared with Love
              </h3>
            </div>

            {/* 2 columns on mobile, 3 columns on tablet and desktop PC */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-5 md:gap-6">
              {memories.map((item, idx) => (
                <div
                  key={item.id || idx}
                  onClick={() => handleOpenLightbox(idx)}
                  className="group cursor-pointer bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-paper hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-theme-cream"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-theme-cream">
                    <img
                      src={item.public_url}
                      alt={item.caption || `${APP_CONFIG.childName} memory`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Delete Icon in top right corner of the pic */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirmItem(item);
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

        {/* Upload Invitation Card: Positioned at the last before the Footer */}
        <div className="max-w-xl mx-auto text-center bg-white/95 border-2 border-theme-sky/30 rounded-3xl p-6 sm:p-8 shadow-paper">
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-theme-red hover:bg-theme-redDark text-white font-display font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-theme-red/30"
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

      {/* High-Resolution Lightbox Modal for Guest Memories */}
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
            {/* Header controls: Delete & Close buttons */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 z-20">
              <button
                type="button"
                onClick={() => {
                  setDeleteConfirmItem(selectedItem);
                }}
                className="p-2 rounded-full bg-theme-cream text-theme-navy/70 hover:bg-theme-red hover:text-white transition-colors shadow-sm"
                title="Delete photo"
                aria-label="Delete photo"
              >
                <Trash2 size={16} />
              </button>
              <button
                type="button"
                onClick={handleCloseLightbox}
                className="p-2 rounded-full bg-theme-cream text-theme-navy hover:bg-theme-red hover:text-white transition-colors shadow-sm"
                aria-label="Close photo preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Arrows */}
            {memories.length > 1 && (
              <>
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
              </>
            )}

            {/* Photo Display */}
            <div className="max-h-[65vh] flex items-center justify-center overflow-hidden rounded-2xl bg-theme-cream/40">
              <img
                src={selectedItem.public_url}
                alt={selectedItem.caption || `${APP_CONFIG.childName} memory`}
                className="max-h-[65vh] w-auto object-contain rounded-2xl"
              />
            </div>

            {/* Photo Info */}
            <div className="mt-4 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-theme-sky/20 text-theme-navy font-display font-semibold text-xs mb-1.5">
                Guest Memory
              </span>
              <h4 className="font-display font-bold text-lg sm:text-xl text-theme-navy">
                {selectedItem.caption || `${APP_CONFIG.childName} — 1st Birthday`}
              </h4>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal (Yes / No pop-up) */}
      {deleteConfirmItem && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="delete-confirm-title"
          aria-describedby="delete-confirm-desc"
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setDeleteConfirmItem(null)}
        >
          <div
            className="relative max-w-sm w-full bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-theme-cream text-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Warning Trash Icon Circle */}
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center text-theme-red shadow-inner">
              <Trash2 size={26} />
            </div>

            <h3
              id="delete-confirm-title"
              className="font-display font-bold text-xl sm:text-2xl text-theme-navy mb-2"
            >
              Delete this photo?
            </h3>

            <p
              id="delete-confirm-desc"
              className="font-body text-xs sm:text-sm text-theme-navy/70 mb-4"
            >
              Are you sure you want to delete this memory? It will be removed from the album.
            </p>

            {/* Thumbnail Preview */}
            {deleteConfirmItem.public_url && (
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl overflow-hidden border-2 border-theme-cream shadow-sm bg-theme-cream">
                <img
                  src={deleteConfirmItem.public_url}
                  alt="Selected preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Action Buttons: No / Yes */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmItem(null)}
                className="flex-1 py-2.5 px-4 rounded-full border-2 border-gray-200 hover:border-gray-300 font-display font-semibold text-sm text-theme-navy hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                No, Keep it
              </button>
              <button
                type="button"
                onClick={async () => {
                  const itemToDelete = deleteConfirmItem;
                  setDeleteConfirmItem(null);
                  if (selectedItem && selectedItem.id === itemToDelete.id) {
                    handleCloseLightbox();
                  }
                  await handleDeleteGuestMemory(itemToDelete);
                }}
                className="flex-1 py-2.5 px-4 rounded-full bg-theme-red hover:bg-theme-redDark text-white font-display font-bold text-sm shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-theme-red/50"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CommunityMemories;
