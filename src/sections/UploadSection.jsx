import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, X, Image as ImageIcon, Loader2, Trash2 } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

/**
 * UploadSection Modal Component
 * Provides the simple, no-login anonymous memory upload flow.
 * Performs client-side image type and file-size validation before uploading
 * directly to the Supabase Storage bucket and writing metadata.
 */
export const UploadSection = ({ isOpen, onClose, onUpload, isConfigured }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'uploading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Handle file selection with validation
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset status
    setStatus('idle');
    setErrorMessage('');

    // 1. Validate MIME type
    if (!APP_CONFIG.storage.allowedMimeTypes.includes(file.type)) {
      setErrorMessage('Please select a valid image file (JPEG, PNG, or WebP).');
      setStatus('error');
      return;
    }

    // 2. Validate File Size
    if (file.size > APP_CONFIG.storage.maxFileSizeBytes) {
      const maxMb = APP_CONFIG.storage.maxFileSizeBytes / (1024 * 1024);
      setErrorMessage(`The selected image is too large. Maximum allowed size is ${maxMb}MB.`);
      setStatus('error');
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMessage('Please choose a photograph to upload.');
      setStatus('error');
      return;
    }

    try {
      setStatus('uploading');
      setErrorMessage('');
      await onUpload(selectedFile, caption);
      setStatus('success');
      setTimeout(() => {
        handleReset();
        onClose();
      }, 1800);
    } catch (err) {
      console.error('Upload failed:', err);
      setStatus('error');
      setErrorMessage(err.message || 'An error occurred while uploading. Please try again.');
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setCaption('');
    setStatus('idle');
    setErrorMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => {
        if (status !== 'uploading') onClose();
      }}
    >
      <div
        className="relative max-w-lg w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border-2 border-theme-cream"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={status === 'uploading'}
          className="absolute top-5 right-5 p-2 rounded-full text-theme-navy/60 hover:text-theme-navy hover:bg-theme-cream transition-colors disabled:opacity-50"
          aria-label="Close upload modal"
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-theme-red/10 text-theme-red mb-2">
            <UploadCloud size={24} />
          </div>
          <h3 className="font-display font-bold text-2xl text-theme-navy">
            Add a Cherished Memory
          </h3>
          <p className="text-xs sm:text-sm text-theme-navy/70 mt-1">
            Share a sweet moment with {APP_CONFIG.childName} — no login needed!
          </p>
        </div>

        {/* Supabase unconfigured warning fallback */}
        {!isConfigured && (
          <div className="mb-5 p-3.5 bg-theme-yellow/15 border border-theme-yellow/50 rounded-2xl flex items-start gap-2.5 text-xs text-theme-navy/90">
            <AlertCircle size={16} className="text-theme-yellow flex-shrink-0 mt-0.5" />
            <p>
              <strong>Supabase Setup Required:</strong> To enable live persistent uploads, add your Supabase URL and anon key to the project&apos;s <code className="bg-white/80 px-1 py-0.5 rounded">.env</code> file.
            </p>
          </div>
        )}

        {/* Success State */}
        {status === 'success' ? (
          <div className="text-center py-8">
            <CheckCircle2 size={48} className="mx-auto text-theme-green mb-3 animate-bounce" />
            <h4 className="font-display font-bold text-xl text-theme-navy mb-1">
              Memory Uploaded!
            </h4>
            <p className="text-xs sm:text-sm text-theme-navy/70">
              Thank you for contributing to {APP_CONFIG.childName}&apos;s first birthday album.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* File Drag / Drop / Picker area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group cursor-pointer border-2 border-dashed border-theme-rope/40 hover:border-theme-sky rounded-2xl p-6 text-center bg-theme-creamLight/50 hover:bg-theme-creamLight transition-all"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={APP_CONFIG.storage.allowedMimeTypes.join(',')}
                onChange={handleFileChange}
                className="hidden"
                disabled={status === 'uploading'}
              />

              {previewUrl ? (
                <div className="relative inline-block max-h-48 overflow-hidden rounded-xl">
                  <img
                    src={previewUrl}
                    alt="Memory preview"
                    className="max-h-48 w-auto object-contain rounded-xl"
                  />
                  {/* Delete / Undo selected photo button in top right corner */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-theme-red text-theme-navy/80 hover:text-white shadow-md transition-all transform hover:scale-110 z-10"
                    title="Remove selected photo"
                    aria-label="Remove selected photo"
                  >
                    <Trash2 size={15} />
                  </button>
                  <p className="mt-2 text-xs text-theme-navy/60 font-medium">
                    Click to change photo
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="p-3 rounded-full bg-theme-sky/15 text-theme-sky group-hover:scale-110 transition-transform mb-2">
                    <ImageIcon size={28} />
                  </span>
                  <p className="font-display font-semibold text-sm text-theme-navy">
                    Click to browse your photos
                  </p>
                  <p className="text-[11px] text-theme-navy/50 mt-1">
                    JPEG, PNG, or WebP up to 10MB
                  </p>
                </div>
              )}
            </div>

            {/* Optional Caption input */}
            <div>
              <label
                htmlFor="memory-caption"
                className="block text-xs font-semibold text-theme-navy mb-1"
              >
                Caption or Note (Optional)
              </label>
              <input
                id="memory-caption"
                type="text"
                placeholder="e.g. Crawling with his favorite toys!"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={120}
                disabled={status === 'uploading'}
                className="w-full px-4 py-2 text-sm rounded-xl border border-theme-rope/30 focus:outline-none focus:ring-2 focus:ring-theme-sky/50 bg-white"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-theme-red/10 border border-theme-red/30 flex items-start gap-2 text-xs text-theme-redDark">
                <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={status === 'uploading'}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-theme-navy/70 hover:text-theme-navy hover:bg-theme-cream transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!selectedFile || status === 'uploading'}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-theme-red hover:bg-theme-redDark text-white font-display font-semibold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'uploading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Uploading Memory...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud size={16} />
                    <span>Add to Album</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
