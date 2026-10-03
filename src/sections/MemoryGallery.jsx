import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Crown, ZoomIn } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { MONTHLY_MILESTONES } from '../data/initialMemories';

/**
 * Days count and start day offset for each of the 12 milestone months
 * Gives an authentic, charming mini-calendar look for every single month.
 */
const MONTH_CALENDAR_DATA = [
  { days: 31, startDay: 2 }, // Month 01
  { days: 29, startDay: 5 }, // Month 02
  { days: 31, startDay: 6 }, // Month 03
  { days: 30, startDay: 2 }, // Month 04
  { days: 31, startDay: 4 }, // Month 05
  { days: 30, startDay: 0 }, // Month 06
  { days: 31, startDay: 2 }, // Month 07
  { days: 31, startDay: 5 }, // Month 08
  { days: 30, startDay: 1 }, // Month 09
  { days: 31, startDay: 3 }, // Month 10
  { days: 30, startDay: 6 }, // Month 11
  { days: 31, startDay: 1 }, // Month 12
];

/**
 * Realistic Metallic Golden Spiral Binding Rings
 * 10 double-wire brass/golden loops across the top of the desk calendar.
 */
const SpiralBinding = () => {
  const loops = Array.from({ length: 10 });
  return (
    <div className="relative z-30 flex justify-between px-6 sm:px-10 -mb-4 pointer-events-none select-none">
      {loops.map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          {/* Top arch loop */}
          <div
            className="w-3 sm:w-3.5 h-7 sm:h-8 rounded-full border-[2.5px] sm:border-[3px] shadow-sm transform -rotate-3"
            style={{
              borderColor: '#C5A059',
              background: 'linear-gradient(135deg, #F5E6C8 0%, #D4AF37 40%, #8C6A24 100%)',
              boxShadow: '0 3px 6px rgba(0,0,0,0.18), inset 0 1px 1px rgba(255,255,255,0.6)',
            }}
          />
          {/* Punched hole on paper */}
          <div className="w-2 sm:w-2.5 h-2.5 sm:h-3 rounded-full bg-[#3D2C1E]/30 -mt-2.5 shadow-inner" />
        </div>
      ))}
    </div>
  );
};

/**
 * Mini Monthly Calendar Grid
 * Recreates the exact monthly days matrix from reference `abi-12month-ref.jpeg`.
 */
const MiniCalendar = ({ monthIndex }) => {
  const data = MONTH_CALENDAR_DATA[monthIndex % MONTH_CALENDAR_DATA.length];
  const { days, startDay } = data;
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Fill calendar cells
  const cells = [];
  for (let i = 0; i < startDay; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= days; d++) {
    cells.push(d);
  }

  return (
    <div className="select-none font-mono text-[9px] sm:text-[10px] leading-tight text-[#6D5D4D] text-right">
      {/* Header */}
      <div className="grid grid-cols-7 gap-1 text-center font-bold text-[#DE5347] mb-0.5 border-b border-[#E8DCCB] pb-0.5">
        {daysOfWeek.map((d, i) => (
          <span key={i} className="w-3.5 text-center">
            {d}
          </span>
        ))}
      </div>
      {/* Grid */}
      <div className="grid grid-cols-7 gap-x-1 gap-y-0.5 text-center">
        {cells.map((cell, idx) => (
          <span
            key={idx}
            className={`w-3.5 text-center font-medium ${
              cell === 1 ? 'font-bold text-[#DE5347]' : cell ? 'text-[#5A4A3B]' : 'text-transparent'
            }`}
          >
            {cell || '·'}
          </span>
        ))}
      </div>
    </div>
  );
};

/**
 * Cute Teddy Bear Sticker Component
 * Recreates the sweet teddy bear sitting at the bottom-left of the calendar card.
 */
const TeddyBearSticker = () => (
  <svg
    viewBox="0 0 100 110"
    className="w-11 sm:w-14 h-auto drop-shadow-sm pointer-events-none select-none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Body */}
    <ellipse cx="50" cy="72" rx="26" ry="24" fill="#E8B87A" stroke="#C89658" strokeWidth="2.5" />
    <ellipse cx="50" cy="74" rx="16" ry="15" fill="#FCE4C0" />
    {/* Feet / Paws */}
    <ellipse cx="28" cy="88" rx="12" ry="9" fill="#E8B87A" stroke="#C89658" strokeWidth="2" />
    <circle cx="28" cy="87" r="5" fill="#FCE4C0" />
    <ellipse cx="72" cy="88" rx="12" ry="9" fill="#E8B87A" stroke="#C89658" strokeWidth="2" />
    <circle cx="72" cy="87" r="5" fill="#FCE4C0" />
    {/* Hands / Arms */}
    <ellipse cx="28" cy="64" rx="8" ry="12" fill="#E8B87A" stroke="#C89658" strokeWidth="2" transform="rotate(20 28 64)" />
    <ellipse cx="72" cy="64" rx="8" ry="12" fill="#E8B87A" stroke="#C89658" strokeWidth="2" transform="rotate(-20 72 64)" />
    {/* Ears */}
    <circle cx="32" cy="30" r="11" fill="#E8B87A" stroke="#C89658" strokeWidth="2" />
    <circle cx="32" cy="30" r="6" fill="#FCE4C0" />
    <circle cx="68" cy="30" r="11" fill="#E8B87A" stroke="#C89658" strokeWidth="2" />
    <circle cx="68" cy="30" r="6" fill="#FCE4C0" />
    {/* Head */}
    <circle cx="50" cy="42" r="22" fill="#E8B87A" stroke="#C89658" strokeWidth="2.5" />
    {/* Snout */}
    <ellipse cx="50" cy="48" rx="11" ry="8" fill="#FCE4C0" />
    <ellipse cx="50" cy="44" rx="4" ry="3" fill="#4A3423" />
    {/* Mouth */}
    <path d="M47 50 Q50 53 53 50" stroke="#4A3423" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* Eyes */}
    <circle cx="41" cy="38" r="2.5" fill="#362518" />
    <circle cx="42" cy="37" r="0.8" fill="#FFFFFF" />
    <circle cx="59" cy="38" r="2.5" fill="#362518" />
    <circle cx="60" cy="37" r="0.8" fill="#FFFFFF" />
    {/* Cute Blue Bow Tie */}
    <path d="M44 57 L38 52 L38 62 Z" fill="#6EA4D8" stroke="#4E84B8" strokeWidth="1.5" />
    <path d="M56 57 L62 52 L62 62 Z" fill="#6EA4D8" stroke="#4E84B8" strokeWidth="1.5" />
    <circle cx="50" cy="57" r="3.5" fill="#4E84B8" />
  </svg>
);

/**
 * Cute Hot Air Balloon with Teddy Bear
 * Recreates the whimsical balloon on the top-right of the reference header.
 */
const HotAirBalloon = () => (
  <svg
    viewBox="0 0 120 160"
    className="w-16 sm:w-24 md:w-28 h-auto drop-shadow-md select-none pointer-events-none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Balloon Body */}
    <ellipse cx="60" cy="60" rx="46" ry="52" fill="#FDFBF7" stroke="#A9C7DF" strokeWidth="2" />
    {/* Color Stripes */}
    <path d="M60 8 C40 18 30 40 30 65 C30 85 45 106 60 112 C75 106 90 85 90 65 C90 40 80 18 60 8 Z" fill="#7CB3DE" opacity="0.8" />
    <path d="M60 8 C48 18 42 40 42 65 C42 85 52 106 60 112 C68 106 78 85 78 65 C78 40 72 18 60 8 Z" fill="#FFF9EB" />
    {/* Ropes */}
    <line x1="38" y1="108" x2="48" y2="128" stroke="#9E8772" strokeWidth="1.5" />
    <line x1="82" y1="108" x2="72" y2="128" stroke="#9E8772" strokeWidth="1.5" />
    {/* Basket */}
    <rect x="44" y="128" width="32" height="24" rx="5" fill="#D8B58A" stroke="#B08D64" strokeWidth="1.5" />
    {/* Little Teddy in Basket */}
    <circle cx="60" cy="126" r="10" fill="#E8B87A" stroke="#C89658" strokeWidth="1.2" />
    <circle cx="53" cy="120" r="3.5" fill="#E8B87A" />
    <circle cx="67" cy="120" r="3.5" fill="#E8B87A" />
    <ellipse cx="60" cy="128" rx="4" ry="3" fill="#FCE4C0" />
    <circle cx="57" cy="125" r="1" fill="#3D2C1E" />
    <circle cx="63" cy="125" r="1" fill="#3D2C1E" />
    <circle cx="60" cy="127" r="1" fill="#3D2C1E" />
  </svg>
);

/**
 * Cute Pastel Rainbow
 * Recreates the rainbow illustration on the top-left of the reference header.
 */
const PastelRainbow = () => (
  <svg
    viewBox="0 0 140 100"
    className="w-16 sm:w-24 md:w-28 h-auto drop-shadow-sm select-none pointer-events-none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Arcs */}
    <path d="M20 75 A50 50 0 0 1 120 75" stroke="#E58F7F" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.9" />
    <path d="M28 75 A42 42 0 0 1 112 75" stroke="#E9C168" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.9" />
    <path d="M36 75 A34 34 0 0 1 104 75" stroke="#87BBA2" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.9" />
    <path d="M44 75 A26 26 0 0 1 96 75" stroke="#7BA6D6" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.9" />
    {/* Clouds at feet */}
    <circle cx="22" cy="76" r="12" fill="#FFFFFF" opacity="0.95" />
    <circle cx="32" cy="72" r="14" fill="#FFFFFF" opacity="0.95" />
    <circle cx="42" cy="78" r="10" fill="#FFFFFF" opacity="0.95" />
    <circle cx="118" cy="76" r="12" fill="#FFFFFF" opacity="0.95" />
    <circle cx="108" cy="72" r="14" fill="#FFFFFF" opacity="0.95" />
    <circle cx="98" cy="78" r="10" fill="#FFFFFF" opacity="0.95" />
  </svg>
);

/**
 * MemoryGallery Section — Desk Stand Calendar Carousel
 * Faithfully recreating `abi-12month-ref.jpeg`:
 * - Colorful playful title: "ONE WHOLE YEAR OF Abhimanyu Krishnan"
 * - Subtitle pill: "12 MONTHS • 12 MOMENTS • A LIFETIME OF LOVE"
 * - Desk easel stand with 10 golden spiral binding loops
 * - Authentic calendar card with baby milestone photo, crown/heart stickers, month badge, and mini days grid
 * - Smooth 3D page flip animation with touch swipe, keyboard arrows, and quick month jumping
 * - Interactive high-resolution lightbox
 */
export const MemoryGallery = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next'); // 'next' | 'prev'
  const [selectedItem, setSelectedItem] = useState(null);
  const [touchStart, setTouchStart] = useState(null);

  const total = MONTHLY_MILESTONES.length; // 12
  const activeMilestone = MONTHLY_MILESTONES[activeIdx];

  /* ──────────────────── Navigation Handlers ───────────────── */

  const goToMonth = useCallback(
    (targetIdx, dir = 'next') => {
      if (isFlipping || targetIdx === activeIdx) return;
      setFlipDirection(dir);
      setIsFlipping(true);

      // Halfway through flip, change the content
      setTimeout(() => {
        setActiveIdx(targetIdx);
      }, 240);

      // End flip animation
      setTimeout(() => {
        setIsFlipping(false);
      }, 520);
    },
    [activeIdx, isFlipping]
  );

  const handlePrev = useCallback(() => {
    const nextIdx = (activeIdx - 1 + total) % total;
    goToMonth(nextIdx, 'prev');
  }, [activeIdx, total, goToMonth]);

  const handleNext = useCallback(() => {
    const nextIdx = (activeIdx + 1) % total;
    goToMonth(nextIdx, 'next');
  }, [activeIdx, total, goToMonth]);

  /* ──────────────────── Keyboard Navigation ───────────────── */

  useEffect(() => {
    const onKey = (e) => {
      if (selectedItem) return; // Lightbox handles its own keys
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedItem, handlePrev, handleNext]);

  /* ──────────────────── Touch Swipe Navigation ────────────── */

  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 45) {
      handleNext(); // Swiped left -> Next
    } else if (diff < -45) {
      handlePrev(); // Swiped right -> Prev
    }
    setTouchStart(null);
  };

  return (
    <section
      id={APP_CONFIG.sections.memories}
      className="relative z-30 pt-2 sm:pt-4 md:pt-6 bg-transparent"
    >
      {/* ── Top Organic Celebratory Wave Transition from Hero ── */}
      <div className="relative w-full overflow-hidden leading-none pointer-events-none -mb-1">
        <svg
          viewBox="0 0 1440 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-24 min-[400px]:h-32 sm:h-44 md:h-56 lg:h-64"
          preserveAspectRatio="none"
        >
          {/* Layer 1: Translucent Blue Wave */}
          <path
            d="M0,80 C180,80 280,10 440,10 C620,10 720,130 900,130 C1060,130 1170,40 1300,40 C1380,40 1415,60 1440,70 L1440,280 L0,280 Z"
            fill="#5299D3"
            fillOpacity="0.4"
          />
          {/* Layer 2: Main Solid Sky Blue Wave */}
          <path
            d="M0,110 C200,110 310,35 470,35 C660,35 760,160 940,160 C1100,160 1200,65 1335,65 C1395,65 1425,85 1440,95 L1440,280 L0,280 Z"
            fill="#5299D3"
          />
          {/* Layer 3: Foreground Cream Wave */}
          <path
            d="M0,145 C240,145 340,70 500,70 C700,70 800,190 980,190 C1130,190 1230,105 1360,105 C1410,105 1430,120 1440,125 L1440,280 L0,280 Z"
            fill="#FCFAF6"
          />
        </svg>
      </div>

      {/* ── Main Memory Section Canvas matching reference ── */}
      <div className="bg-theme-creamLight pt-0 pb-16 sm:pb-20 px-3 sm:px-6 relative">
        <div className="max-w-5xl mx-auto flex flex-col items-center">

          {/* ── Section Header matching `abi-12month-ref.jpeg` ── */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 -mt-14 min-[400px]:-mt-18 sm:-mt-24 md:-mt-32 relative z-20 w-full">
            {/* Whimsical illustrations flanking header on tablet/desktop */}
            <div className="relative flex items-center justify-center">
              {/* Left Rainbow Illustration */}
              <div className="hidden sm:block absolute -left-12 md:-left-20 -top-6 transform -rotate-6">
                <PastelRainbow />
              </div>

              {/* Center Title Content */}
              <div className="flex flex-col items-center">
                {/* Crown Icon */}
                <div className="inline-flex items-center justify-center mb-1 text-[#D4AF37] animate-pulse">
                  <Crown size={24} className="fill-[#E5A93C] text-[#C5A059]" />
                </div>

                {/* Subheading: "ONE WHOLE YEAR OF" */}
                <p className="font-display font-semibold text-xs min-[400px]:text-sm sm:text-base text-[#7C6E5D] tracking-[0.25em] uppercase mb-1">
                  O N E &nbsp; W H O L E &nbsp; Y E A R &nbsp; O F
                </p>

                {/* Main Name: Playful colorful font matching reference */}
                <h2 className="font-display font-extrabold text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl tracking-tight mb-2.5 drop-shadow-sm select-none">
                  <span className="text-[#4E89B8]">A</span>
                  <span className="text-[#2D5276]">b</span>
                  <span className="text-[#E08470]">h</span>
                  <span className="text-[#D69E3D]">i</span>
                  <span className="text-[#5E9E78]">m</span>
                  <span className="text-[#C86350]">a</span>
                  <span className="text-[#3B73A4]">n</span>
                  <span className="text-[#E2A838]">y</span>
                  <span className="text-[#264462]">u </span>
                  <span className="text-[#4D779A]">K</span>
                  <span className="text-[#DC7161]">r</span>
                  <span className="text-[#6B9E78]">i</span>
                  <span className="text-[#D9856A]">s</span>
                  <span className="text-[#4E93CB]">h</span>
                  <span className="text-[#DBA33C]">n</span>
                  <span className="text-[#CF6553]">a</span>
                  <span className="text-[#365A7C]">n</span>
                </h2>

                {/* Pill Ribbon: "12 MONTHS • 12 MOMENTS • A LIFETIME OF LOVE" */}
                <div className="inline-flex items-center px-4 sm:px-6 py-1.5 rounded-full bg-[#F3ECE1] border border-[#E4D8C5] shadow-xs text-[#7A6B58] font-display font-bold text-[10px] sm:text-xs tracking-wider uppercase">
                  <span>12 MONTHS &bull; 12 MOMENTS &bull; A LIFETIME OF LOVE</span>
                </div>
              </div>

              {/* Right Hot Air Balloon Illustration */}
              <div className="hidden sm:block absolute -right-12 md:-right-20 -top-8 transform rotate-3">
                <HotAirBalloon />
              </div>
            </div>
          </div>

          {/* ── THE DESK CALENDAR CAROUSEL STAND ── */}
          <div
            className="relative w-full max-w-[360px] min-[400px]:max-w-[400px] sm:max-w-[480px] md:max-w-[540px] mx-auto select-none"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Wooden Easel Legs / Desk Stand behind the calendar */}
            <div
              className="absolute -inset-x-3 -top-2 -bottom-3 rounded-3xl bg-gradient-to-b from-[#E7D6BE] via-[#D8C19F] to-[#BFA47F] shadow-2xl border-2 border-[#AA8F69] -z-10 transform"
              style={{
                boxShadow: '0 20px 45px rgba(60, 40, 20, 0.22), 0 6px 15px rgba(0,0,0,0.12)',
              }}
            />

            {/* Wooden Base Plaque at Bottom */}
            <div
              className="absolute -inset-x-5 -bottom-5 h-8 sm:h-10 rounded-2xl bg-gradient-to-b from-[#ECDDC6] to-[#CBB08C] border-2 border-[#B3966F] shadow-lg -z-20"
              style={{
                boxShadow: '0 12px 28px rgba(60, 40, 20, 0.28)',
              }}
            />

            {/* Spiral Binding Loops across top */}
            <SpiralBinding />

            {/* Left Navigation Arrow Button */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={isFlipping}
              className="absolute -left-4 sm:-left-7 md:-left-10 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-theme-navy shadow-lg border border-[#E5DAC8] flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 cursor-pointer disabled:opacity-60 focus:outline-none"
              aria-label="Previous month"
              title="Previous month (or left arrow key)"
            >
              <ChevronLeft size={22} className="text-[#3E4F6D]" />
            </button>

            {/* Right Navigation Arrow Button */}
            <button
              type="button"
              onClick={handleNext}
              disabled={isFlipping}
              className="absolute -right-4 sm:-right-7 md:-right-10 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-theme-navy shadow-lg border border-[#E5DAC8] flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 cursor-pointer disabled:opacity-60 focus:outline-none"
              aria-label="Next month"
              title="Next month (or right arrow key)"
            >
              <ChevronRight size={22} className="text-[#3E4F6D]" />
            </button>

            {/* ── THE CALENDAR PAGE CARD ── */}
            <div
              className="relative w-full bg-[#FFFDF9] rounded-2xl sm:rounded-3xl border border-[#EDE2D2] p-4 sm:p-5 pt-6 sm:pt-7 shadow-inner overflow-hidden"
              style={{
                perspective: '1200px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Animated Flipping Page Container */}
              <div
                style={{
                  transformOrigin: 'top center',
                  transition: isFlipping
                    ? 'transform 0.26s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.26s ease'
                    : 'transform 0.26s ease-out, opacity 0.26s ease',
                  transform: isFlipping
                    ? flipDirection === 'next'
                      ? 'rotateX(-24deg) scale(0.97)'
                      : 'rotateX(24deg) scale(0.97)'
                    : 'rotateX(0deg) scale(1)',
                  opacity: isFlipping ? 0.45 : 1,
                }}
              >
                {/* ── 1. The Framed Baby Photo ── */}
                <div
                  onClick={() => setSelectedItem(activeMilestone)}
                  className="relative group cursor-pointer aspect-4/3 sm:aspect-16/11 w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#F2EDE4] border-2 border-[#E8DDCD] shadow-sm hover:shadow-md transition-shadow"
                  title="Click to view full photo"
                >
                  <img
                    src={activeMilestone.image}
                    alt={activeMilestone.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="eager"
                  />

                  {/* Decorative Sticker: Golden Crown top-left of photo */}
                  <div className="absolute top-2.5 left-2.5 pointer-events-none drop-shadow-md">
                    <Crown size={22} className="text-[#D4AF37] fill-[#F6D06F] transform -rotate-12" />
                  </div>

                  {/* Decorative Sticker: Cute Pink Heart bottom-right of photo */}
                  <div className="absolute bottom-2.5 right-2.5 pointer-events-none drop-shadow-md">
                    <Heart size={20} className="text-[#E07A70] fill-[#F9A8A0] transform rotate-12" />
                  </div>

                  {/* Subtle Zoom Hint Overlay */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 font-display font-semibold text-xs backdrop-blur-2xs">
                    <ZoomIn size={16} />
                    <span>View Photo</span>
                  </div>
                </div>

                {/* ── 2. Information Strip Below Photo ── */}
                <div className="flex items-center justify-between mt-3 sm:mt-4 pt-1 px-1">
                  {/* Left: Cute Teddy Bear & Month Number */}
                  <div className="flex items-center gap-2 sm:gap-3.5">
                    {/* Illustrated Teddy Bear Sticker */}
                    <TeddyBearSticker />

                    {/* Big Bold Month Number + "MONTH" label */}
                    <div className="flex flex-col">
                      <span className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#224870] leading-none tracking-tight">
                        {activeMilestone.monthNumber}
                      </span>
                      <span className="font-display font-extrabold text-[11px] sm:text-xs text-[#DC6B4F] tracking-widest uppercase mt-0.5">
                        {activeMilestone.monthNumber === '01' ? 'MONTH' : 'MONTHS'}
                      </span>
                    </div>
                  </div>

                  {/* Right: Miniature Monthly Calendar Matrix */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <MiniCalendar monthIndex={activeIdx} />
                    <Heart size={14} className="text-[#DE5347] fill-[#DE5347]/30 transform rotate-12 self-end mb-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. Quick Month Selector Jump Bar (1 to 12) ── */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-xl mx-auto px-2">
            {MONTHLY_MILESTONES.map((item, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={item.monthNumber}
                  type="button"
                  onClick={() => goToMonth(idx, idx > activeIdx ? 'next' : 'prev')}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-display font-semibold transition-all cursor-pointer focus:outline-none ${
                    isActive
                      ? 'bg-theme-navy text-white shadow-sm scale-105'
                      : 'bg-white/80 hover:bg-white text-theme-navy/70 border border-theme-cream hover:border-theme-navy/30'
                  }`}
                  aria-label={`Go to month ${item.monthNumber}`}
                >
                  <span>{parseInt(item.monthNumber, 10)}m</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Full-Resolution Photo Lightbox Modal ── */}
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
            {/* Close Button */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="p-1.5 sm:p-2 rounded-full bg-theme-cream text-theme-navy hover:bg-theme-red hover:text-white transition-colors shadow-sm focus:outline-none cursor-pointer"
                aria-label="Close photo preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Arrows inside Lightbox */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const nextIdx = (activeIdx - 1 + total) % total;
                setActiveIdx(nextIdx);
                setSelectedItem(MONTHLY_MILESTONES[nextIdx]);
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 text-theme-navy hover:bg-theme-blue hover:text-white transition-all z-20 shadow-md hover:scale-110 focus:outline-none cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const nextIdx = (activeIdx + 1) % total;
                setActiveIdx(nextIdx);
                setSelectedItem(MONTHLY_MILESTONES[nextIdx]);
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 text-theme-navy hover:bg-theme-blue hover:text-white transition-all z-20 shadow-md hover:scale-110 focus:outline-none cursor-pointer"
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
                {APP_CONFIG.childName} &bull; Milestone
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
