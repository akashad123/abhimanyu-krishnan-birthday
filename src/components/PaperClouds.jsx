import React from 'react';

/**
 * PaperClouds Component
 * Layered paper-cut clouds placed along the margins.
 * Recreates the whimsical sky & storybook atmosphere from the visual reference.
 */
export const PaperClouds = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {/* Top Left Cloud */}
      <div className="absolute top-12 -left-10 sm:-left-6 opacity-95 drop-shadow-md">
        <CloudSvg scale={0.9} />
      </div>

      {/* Top Right Cloud */}
      <div className="absolute top-24 -right-12 sm:-right-8 opacity-90 drop-shadow-md">
        <CloudSvg scale={1.1} />
      </div>

      {/* Mid Left Cloud */}
      <div className="absolute top-[45%] -left-12 sm:-left-8 opacity-90 drop-shadow-sm">
        <CloudSvg scale={1} />
      </div>

      {/* Mid Right Cloud */}
      <div className="absolute top-[50%] -right-10 sm:-right-6 opacity-95 drop-shadow-md">
        <CloudSvg scale={0.95} />
      </div>

      {/* Bottom Left Cloud */}
      <div className="absolute top-[72%] -left-8 sm:-left-4 opacity-90 drop-shadow-sm">
        <CloudSvg scale={0.85} />
      </div>

      {/* Bottom Right Cloud */}
      <div className="absolute top-[75%] -right-8 sm:-right-4 opacity-90 drop-shadow-sm">
        <CloudSvg scale={0.9} />
      </div>

      {/* Base Floor Cloud Cluster */}
      <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-4 opacity-95 drop-shadow-lg">
        <CloudSvg scale={1.2} />
        <CloudSvg scale={1.4} />
        <CloudSvg scale={1.2} />
      </div>
    </div>
  );
};

const CloudSvg = ({ scale = 1 }) => {
  const w = 140 * scale;
  const h = 80 * scale;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 140 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 65 H115 C128 65 138 55 138 42 C138 30 128 20 116 20 C114 20 112 21 110 22 C105 10 93 2 79 2 C63 2 50 12 46 26 C43 25 40 24 37 24 C23 24 12 35 12 48 C12 50 12 51 13 53 C7 56 3 61 3 65 H25 Z"
        fill="#FFFFFF"
        stroke="#EFE9DC"
        strokeWidth="1.5"
      />
      {/* Soft inner contour for 3D papercraft depth */}
      <path
        d="M30 63 H110 C120 63 128 56 128 46 C128 37 121 30 112 30 C103 16 88 12 76 12 C64 12 52 19 48 30 C38 30 28 38 28 48 C28 55 33 61 40 63"
        fill="#FCFAF6"
        opacity="0.8"
      />
    </svg>
  );
};

export default PaperClouds;
