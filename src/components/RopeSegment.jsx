import React from 'react';

/**
 * RopeSegment Component
 * Renders a braided decorative rope with optional knotted loops.
 * Used to suspend the birthday plaque, scroll indicator, and number 1 piñata.
 */
export const RopeSegment = ({
  height = 'h-16',
  hasTopKnot = false,
  hasBottomKnot = false,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Top Knot */}
      {hasTopKnot && (
        <div className="relative z-10 w-9 h-9 flex items-center justify-center -mb-2">
          {/* Decorative SVG knot */}
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-md">
            <ellipse cx="20" cy="20" rx="14" ry="10" fill="#BF9056" stroke="#8F6433" strokeWidth="2.5" />
            <circle cx="14" cy="20" r="5" fill="#DFC08E" stroke="#8F6433" strokeWidth="2" />
            <circle cx="26" cy="20" r="5" fill="#DFC08E" stroke="#8F6433" strokeWidth="2" />
            <path d="M12 16 Q 20 25 28 16" stroke="#8F6433" strokeWidth="2.5" fill="none" />
          </svg>
        </div>
      )}

      {/* Braided Rope Body */}
      <div
        className={`w-4 ${height} relative bg-gradient-to-r from-theme-ropeDark via-theme-rope to-theme-ropeDark shadow-sm`}
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #8F6433 0,
            #8F6433 5px,
            #DFC08E 5px,
            #DFC08E 10px,
            #BF9056 10px,
            #BF9056 15px
          )`,
          borderRadius: '2px',
        }}
      />

      {/* Bottom Knot */}
      {hasBottomKnot && (
        <div className="relative z-10 w-9 h-9 flex items-center justify-center -mt-2">
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-md">
            <ellipse cx="20" cy="20" rx="14" ry="10" fill="#BF9056" stroke="#8F6433" strokeWidth="2.5" />
            <circle cx="14" cy="20" r="5" fill="#DFC08E" stroke="#8F6433" strokeWidth="2" />
            <circle cx="26" cy="20" r="5" fill="#DFC08E" stroke="#8F6433" strokeWidth="2" />
            <path d="M12 24 Q 20 15 28 24" stroke="#8F6433" strokeWidth="2.5" fill="none" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default RopeSegment;
