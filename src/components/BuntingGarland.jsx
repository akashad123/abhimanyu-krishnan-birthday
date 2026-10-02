import React from 'react';

/**
 * BuntingGarland Component
 * Celebratory triangular party flags draped across the top of the viewport.
 * Matches the festive bunting in the approved reference image.
 */
export const BuntingGarland = () => {
  // Vibrant celebration flag colors matching the reference
  const flagColors = [
    '#E65046', // Red
    '#F5B738', // Yellow
    '#65A765', // Green
    '#5299D3', // Sky Blue
    '#F28482', // Coral
    '#F5B738', // Yellow
    '#5299D3', // Sky Blue
    '#E65046', // Red
    '#65A765', // Green
    '#F28482', // Coral
    '#5299D3', // Sky Blue
    '#F5B738', // Yellow
  ];

  return (
    <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-20" aria-hidden="true">
      <svg
        className="w-full h-14 sm:h-20 md:h-24"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Curved string line */}
        <path
          d="M0 20 Q 300 70, 600 40 T 1200 20"
          stroke="#C89F6B"
          strokeWidth="3"
          strokeDasharray="4 2"
        />

        {/* Bunting flags */}
        {flagColors.map((color, index) => {
          const x = index * 100 + 10;
          // Approximate curve y
          const t = x / 1200;
          const y = 20 + 35 * Math.sin(t * Math.PI);
          return (
            <polygon
              key={index}
              points={`${x},${y} ${x + 80},${y} ${x + 40},${y + 70}`}
              fill={color}
              className="drop-shadow-sm opacity-95 transition-transform hover:scale-105"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default BuntingGarland;
