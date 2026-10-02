import React, { useState } from 'react';
import { Camera, Heart, X, ZoomIn, Calendar } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

/**
 * MemoryGallery Section
 * Photography-first memory album gallery presenting curated family photographs
 * and community-uploaded memories in a warm, storybook layout.
 */
export const MemoryGallery = ({ memories = [], onOpenUpload }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section
      id={APP_CONFIG.sections.memories}
      className="relative py-16 sm:py-24 px-4 bg-theme-creamLight border-t-4 border-theme-rope/20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-sky/15 text-theme-navy font-display font-semibold text-xs mb-3">
            <Heart size={13} className="text-theme-red fill-theme-red" />
            <span>Little Moments, Big Memories</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-theme-navy tracking-tight mb-3">
            The Memory Album
          </h2>

          <p className="font-body text-sm sm:text-base text-theme-navy/75 leading-relaxed">
            Every smile, milestone, and sweet memory of {APP_CONFIG.childName}&apos;s first magical year,
            lovingly shared by family and friends.
          </p>
        </div>

        {/* Gallery Grid */}
        {memories.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white/70 rounded-3xl border-2 border-dashed border-theme-rope/30 max-w-md mx-auto">
            <Camera size={36} className="mx-auto text-theme-rope mb-3 opacity-60" />
            <h3 className="font-display font-semibold text-lg text-theme-navy mb-1">
              No Memories Added Yet
            </h3>
            <p className="text-xs sm:text-sm text-theme-navy/70 mb-5">
              Be the first to add a cherished photo of baby Abhimanyu!
            </p>
            <button
              type="button"
              onClick={onOpenUpload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-theme-red text-white font-display font-semibold text-sm shadow hover:bg-theme-redDark transition-colors"
            >
              <Camera size={16} />
              <span>Add The First Memory</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {memories.map((item, idx) => (
              <div
                key={item.id || idx}
                className="group relative bg-white rounded-3xl p-3 sm:p-4 shadow-paper hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 border border-theme-cream"
              >
                {/* Photo Container with rounded frame */}
                <div
                  className="relative aspect-square sm:aspect-[4/5] overflow-hidden rounded-2xl bg-theme-cream cursor-pointer"
                  onClick={() => setSelectedPhoto(item)}
                >
                  <img
                    src={item.public_url}
                    alt={item.caption || item.alt || `${APP_CONFIG.childName} memory`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-theme-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 bg-white/90 rounded-full text-theme-navy shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn size={18} />
                    </span>
                  </div>
                </div>

                {/* Photo Caption & Info */}
                <div className="pt-3 px-1">
                  <p className="font-display font-medium text-sm sm:text-base text-theme-navy truncate">
                    {item.caption || `${APP_CONFIG.childName} — 1st Birthday`}
                  </p>
                  {item.created_at && (
                    <p className="flex items-center gap-1 text-[11px] text-theme-navy/50 font-medium mt-0.5">
                      <Calendar size={11} />
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Upload Invitation Card */}
        <div className="mt-14 sm:mt-20 max-w-xl mx-auto text-center bg-white/90 border-2 border-theme-sky/30 rounded-3xl p-8 shadow-paper">
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

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-theme-cream text-theme-navy hover:bg-theme-red hover:text-white transition-colors z-10"
              aria-label="Close photo preview"
            >
              <X size={20} />
            </button>

            <div className="max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl bg-theme-cream/50">
              <img
                src={selectedPhoto.public_url}
                alt={selectedPhoto.caption || `${APP_CONFIG.childName} full memory`}
                className="max-h-[70vh] w-auto object-contain rounded-2xl"
              />
            </div>

            <div className="mt-4 text-center">
              <h4 className="font-display font-semibold text-lg text-theme-navy">
                {selectedPhoto.caption || `${APP_CONFIG.childName} — 1st Birthday`}
              </h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MemoryGallery;
