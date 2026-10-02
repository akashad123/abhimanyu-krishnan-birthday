import React from 'react';

/**
 * ScatteredStars Component
 * Renders small celebratory star accents scattered across the background.
 * Colors: Yellow (#F5B738), Coral Red (#E65046), and Sky Blue (#5299D3).
 */
export const ScatteredStars = ({ className = '' }) => {
  const stars = [
    { top: '10%', left: '88%', color: '#F5B738', size: 22 },
    { top: '22%', left: '8%', color: '#65A765', size: 18 },
    { top: '28%', left: '86%', color: '#5299D3', size: 20 },
    { top: '38%', left: '6%', color: '#F5B738', size: 24 },
    { top: '48%', left: '92%', color: '#E65046', size: 18 },
    { top: '56%', left: '26%', color: '#F5B738', size: 26 },
    { top: '58%', left: '66%', color: '#E65046', size: 20 },
    { top: '70%', left: '7%', color: '#5299D3', size: 19 },
    { top: '74%', left: '21%', color: '#F5B738', size: 22 },
    { top: '72%', left: '68%', color: '#F5B738', size: 24 },
    { top: '65%', left: '90%', color: '#C89F6B', size: 18 },
    { top: '88%', left: '88%', color: '#F5B738', size: 26 },
    { top: '86%', left: '5%', color: '#E65046', size: 20 },
  ];

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {stars.map((star, idx) => (
        <div
          key={idx}
          className="absolute drop-shadow-sm transition-transform duration-500 hover:rotate-12 hover:scale-125"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        >
          <svg viewBox="0 0 24 24" fill={star.color}>
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default ScatteredStars;
