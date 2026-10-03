import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, Heart, X, ZoomIn, Sparkles, ChevronLeft, ChevronRight, Trash2, RotateCcw, PartyPopper } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { APP_CONFIG } from '../config/appConfig';
import { MONTHLY_MILESTONES } from '../data/initialMemories';
import { PartyDrum } from '../components/PartyDrum';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// 24 Radial Confetti Streamers & Shapes for the Piñata Explosion
const CONFETTI_PIECES = Array.from({ length: 24 }).map((_, i) => {
  const angle = (i / 24) * 2 * Math.PI + (i % 2 === 0 ? 0.08 : -0.08);
  const baseDist = 170 + (i % 5) * 35;
  const colors = ['#DE5347', '#E5A93C', '#4E93CB', '#55A46D', '#9C27B0', '#FF7043'];
  const shapes = ['rect', 'circle', 'ribbon'];
  return {
    id: i,
    color: colors[i % colors.length],
    shape: shapes[i % shapes.length],
    targetX: Math.cos(angle) * baseDist,
    targetY: Math.sin(angle) * baseDist,
    rotation: (i % 2 === 0 ? 1 : -1) * (180 + i * 25),
  };
});

// 8 Exploding Stars shooting in radial starburst directions
const STAR_BURST = [
  { id: 1, angle: 0, dist: 220, img: '/decorations/layers/star-yellow.png' },
  { id: 2, angle: Math.PI / 4, dist: 240, img: '/decorations/layers/star-blue.png' },
  { id: 3, angle: Math.PI / 2, dist: 210, img: '/decorations/layers/star-red.png' },
  { id: 4, angle: (3 * Math.PI) / 4, dist: 250, img: '/decorations/layers/star-yellow.png' },
  { id: 5, angle: Math.PI, dist: 220, img: '/decorations/layers/star-blue.png' },
  { id: 6, angle: (5 * Math.PI) / 4, dist: 240, img: '/decorations/layers/star-red.png' },
  { id: 7, angle: (3 * Math.PI) / 2, dist: 210, img: '/decorations/layers/star-yellow.png' },
  { id: 8, angle: (7 * Math.PI) / 4, dist: 250, img: '/decorations/layers/star-blue.png' },
];

/**
 * MemoryGallery Section — "12 Months of Our Little One"
 * 
 * Features the celebratory Number "1" Piñata Explosion:
 * - Hanging Number "1" Piñata suspended from the ceiling rope.
 * - Triggered by scroll or interactive click ("Pop the Piñata!").
 * - Explosive burst: party drums with drumsticks, flying balloons, stars, and colorful confetti!
 * - From the CENTER of the explosion, the "12 Months of Our Little One" section expands outward!
 * - 12 Monthly polaroid milestone photo cards matching client reference `reference/memories-section.jpeg`.
 * - High-resolution lightbox preview, delete/undo photo option, guest memories, and upload modal.
 */
export const MemoryGallery = ({
  memories = [],
  onDeleteMemory,
  onRestoreMemory,
  onOpenUpload,
}) => {
  const [milestones, setMilestones] = useState(MONTHLY_MILESTONES);
  const [selectedItem, setSelectedItem] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [undoState, setUndoState] = useState(null);
  const [isExploded, setIsExploded] = useState(false);
  const undoTimerRef = useRef(null);

  // Animation DOM Refs
  const sectionRef = useRef(null);
  const pinataAssemblyRef = useRef(null);
  const pinataSwingRef = useRef(null);
  const pinataImgRef = useRef(null);
  const badgeRef = useRef(null);
  const shockwaveRef = useRef(null);
  const drumLeftRef = useRef(null);
  const drumRightRef = useRef(null);
  const balloonRedRef = useRef(null);
  const balloonBlueRef = useRef(null);
  const balloonYellowRef = useRef(null);
  const balloonGreenRef = useRef(null);
  const starsContainerRef = useRef(null);
  const confettiContainerRef = useRef(null);
  const galleryContainerRef = useRef(null);

  const hasExplodedRef = useRef(false);
  const timelineRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Combine monthly milestones and guest memories for lightbox navigation
  const allLightboxItems = [
    ...milestones.map((m) => ({
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

  // Delete milestone photo handler
  const handleDeleteMilestone = (item) => {
    const itemIndex = milestones.findIndex((m) => m.monthNumber === item.monthNumber);
    if (itemIndex === -1) return;

    const removedItem = milestones[itemIndex];
    setMilestones((prev) => prev.filter((m) => m.monthNumber !== item.monthNumber));

    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);

    setUndoState({
      type: 'milestone',
      item: removedItem,
      index: itemIndex,
      label: `${removedItem.monthLabel} milestone`,
    });

    undoTimerRef.current = setTimeout(() => {
      setUndoState(null);
    }, 6000);
  };

  // Delete guest/uploaded memory handler
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

  // Undo delete handler
  const handleUndo = () => {
    if (!undoState) return;

    if (undoState.type === 'milestone') {
      setMilestones((prev) => {
        const next = [...prev];
        next.splice(undoState.index, 0, undoState.item);
        return next;
      });
    } else if (undoState.type === 'guest' && onRestoreMemory) {
      onRestoreMemory(undoState.item);
    }

    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setUndoState(null);
  };

  // Set up the GSAP Piñata Explosion Timeline
  useEffect(() => {
    if (!sectionRef.current) return;

    // Accessibility: Reduced motion skips explosion animations and reveals gallery immediately
    if (prefersReducedMotion) {
      hasExplodedRef.current = true;
      setIsExploded(true);
      if (galleryContainerRef.current) {
        gsap.set(galleryContainerRef.current, { scale: 1, opacity: 1, filter: 'none' });
      }
      return;
    }

    const isMobile = window.innerWidth < 768;

    // 1. Natural idle pendulum swing on the suspended Piñata before explosion
    let idleTween = null;
    if (pinataSwingRef.current) {
      idleTween = gsap.to(pinataSwingRef.current, {
        rotation: 2.2,
        transformOrigin: 'top center',
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Initial states for explosion elements
    if (galleryContainerRef.current && !hasExplodedRef.current) {
      gsap.set(galleryContainerRef.current, {
        scale: 0.12,
        opacity: 0,
        transformOrigin: 'top center',
        filter: 'blur(10px)',
      });
    }

    // 2. Build Master Explosion Timeline
    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        if (idleTween) idleTween.pause();
      },
      onComplete: () => {
        hasExplodedRef.current = true;
        setIsExploded(true);
      },
    });

    // Step A: Piñata rattles & quivers with anticipation (0.0s - 0.25s)
    if (pinataImgRef.current) {
      tl.to(pinataImgRef.current, {
        rotation: -7,
        scale: 1.07,
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }

    // Step B: Shockwave flash expanding from center (0.22s)
    if (shockwaveRef.current) {
      tl.fromTo(
        shockwaveRef.current,
        { scale: 0.1, opacity: 1 },
        {
          scale: isMobile ? 2.6 : 3.8,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
        },
        0.22
      );
    }

    // Step C: Number 1 Piñata bursts open & dissolves into the burst (0.25s)
    if (pinataImgRef.current) {
      tl.to(
        pinataImgRef.current,
        {
          scale: isMobile ? 1.7 : 2.1,
          opacity: 0,
          filter: 'blur(10px)',
          duration: 0.35,
          ease: 'power2.out',
        },
        0.25
      );
    }

    if (badgeRef.current) {
      tl.to(badgeRef.current, { scale: 0.8, opacity: 0, duration: 0.22, ease: 'power2.in' }, 0.25);
    }

    // Step D: Party Drums shoot outward with musical celebration (0.26s)
    if (drumLeftRef.current) {
      tl.fromTo(
        drumLeftRef.current,
        { x: 0, y: 0, scale: 0.2, opacity: 0, rotation: 0 },
        {
          x: isMobile ? -125 : -280,
          y: isMobile ? -50 : -80,
          scale: isMobile ? 0.95 : 1.3,
          opacity: 1,
          rotation: -40,
          duration: 0.75,
          ease: 'back.out(1.5)',
        },
        0.26
      );
    }

    if (drumRightRef.current) {
      tl.fromTo(
        drumRightRef.current,
        { x: 0, y: 0, scale: 0.2, opacity: 0, rotation: 0 },
        {
          x: isMobile ? 125 : 280,
          y: isMobile ? 45 : 70,
          scale: isMobile ? 0.95 : 1.3,
          opacity: 1,
          rotation: 35,
          duration: 0.75,
          ease: 'back.out(1.5)',
        },
        0.26
      );
    }

    // Step E: Colorful Balloons shoot outward into the sky (0.28s)
    if (balloonRedRef.current) {
      tl.fromTo(
        balloonRedRef.current,
        { x: 0, y: 0, scale: 0.2, opacity: 0 },
        {
          x: isMobile ? -130 : -270,
          y: isMobile ? -160 : -250,
          scale: isMobile ? 0.85 : 1.2,
          opacity: 0.95,
          rotation: -25,
          duration: 0.85,
          ease: 'power2.out',
        },
        0.28
      );
    }

    if (balloonBlueRef.current) {
      tl.fromTo(
        balloonBlueRef.current,
        { x: 0, y: 0, scale: 0.2, opacity: 0 },
        {
          x: isMobile ? 130 : 270,
          y: isMobile ? -170 : -260,
          scale: isMobile ? 0.9 : 1.25,
          opacity: 0.95,
          rotation: 25,
          duration: 0.88,
          ease: 'power2.out',
        },
        0.28
      );
    }

    if (balloonYellowRef.current) {
      tl.fromTo(
        balloonYellowRef.current,
        { x: 0, y: 0, scale: 0.2, opacity: 0 },
        {
          x: isMobile ? -120 : -230,
          y: isMobile ? 130 : 180,
          scale: isMobile ? 0.8 : 1.1,
          opacity: 0.9,
          rotation: -15,
          duration: 0.8,
          ease: 'power2.out',
        },
        0.3
      );
    }

    if (balloonGreenRef.current) {
      tl.fromTo(
        balloonGreenRef.current,
        { x: 0, y: 0, scale: 0.2, opacity: 0 },
        {
          x: isMobile ? 120 : 230,
          y: isMobile ? 140 : 190,
          scale: isMobile ? 0.8 : 1.1,
          opacity: 0.9,
          rotation: 20,
          duration: 0.82,
          ease: 'power2.out',
        },
        0.3
      );
    }

    // Step F: Starburst & Confetti radial spray (0.28s)
    if (starsContainerRef.current) {
      tl.fromTo(
        starsContainerRef.current.children,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.02,
          duration: 0.65,
          ease: 'power2.out',
        },
        0.28
      );
    }

    if (confettiContainerRef.current) {
      tl.fromTo(
        confettiContainerRef.current.children,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.015,
          duration: 0.7,
          ease: 'power2.out',
        },
        0.28
      );
    }

    // Step G: EMERGENCE OF "12 MONTHS OF OUR LITTLE ONE" FROM THE CENTER (0.36s)
    if (galleryContainerRef.current) {
      tl.fromTo(
        galleryContainerRef.current,
        {
          scale: 0.12,
          opacity: 0,
          filter: 'blur(10px)',
        },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'back.out(1.18)',
        },
        0.36
      );
    }

    // Step H: Monthly milestone cards blossom into view (0.6s)
    tl.fromTo(
      '.monthly-milestone-card',
      { opacity: 0, scale: 0.88, y: 25 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.035,
        duration: 0.45,
        ease: 'power2.out',
      },
      0.6
    );

    // Step I: Flying explosion particles gently float away & fade (1.1s - 1.8s)
    if (drumLeftRef.current && drumRightRef.current) {
      tl.to(
        [drumLeftRef.current, drumRightRef.current],
        { opacity: 0, y: '+=50', duration: 0.6, ease: 'power1.in' },
        1.2
      );
    }

    if (balloonRedRef.current && balloonBlueRef.current && balloonYellowRef.current && balloonGreenRef.current) {
      tl.to(
        [balloonRedRef.current, balloonBlueRef.current, balloonYellowRef.current, balloonGreenRef.current],
        { opacity: 0, y: '-=100', duration: 0.7, ease: 'power1.in' },
        1.3
      );
    }

    if (starsContainerRef.current) {
      tl.to(starsContainerRef.current, { opacity: 0, duration: 0.5 }, 1.3);
    }

    if (confettiContainerRef.current) {
      tl.to(confettiContainerRef.current, { opacity: 0, y: '+=50', duration: 0.6 }, 1.25);
    }

    timelineRef.current = tl;

    // 3. ScrollTrigger: Automatically explode when the user scrolls to the section
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 65%',
      onEnter: () => {
        if (!hasExplodedRef.current && timelineRef.current) {
          timelineRef.current.play();
        }
      },
    });

    return () => {
      if (idleTween) idleTween.kill();
      if (tl) tl.kill();
      st.kill();
    };
  }, [prefersReducedMotion]);

  // Interactive Click / Tap Trigger
  const handlePop = useCallback(() => {
    if (!hasExplodedRef.current && timelineRef.current) {
      timelineRef.current.play();
    }
  }, []);

  // Replay Trigger
  const handleReplay = useCallback(() => {
    hasExplodedRef.current = false;
    setIsExploded(false);
    if (timelineRef.current) {
      // Smooth scroll back to top of the Piñata
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        timelineRef.current.restart();
      }, 350);
    }
  }, []);

  return (
    <section
      id={APP_CONFIG.sections.pinata}
      ref={sectionRef}
      className="relative pt-4 sm:pt-6 pb-16 sm:pb-24 px-3 sm:px-6 bg-theme-creamLight border-t-4 border-theme-rope/25 shadow-inner mt-4 sm:mt-6 z-30 overflow-hidden"
    >
      {/* ======================================================== */}
      {/* EXPLOSION STAGE: Hanging Number "1" Piñata, Drums, Balloons, Confetti */}
      {/* ======================================================== */}
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Hanging Ceiling Braided Rope leading down from the Scroll Down button above */}
        {!isExploded && (
          <div className="braided-rope w-3.5 sm:w-4 h-6 sm:h-10 mx-auto -mt-2 mb-1" />
        )}

        {/* The Hanging Number 1 Piñata & Milestone Card (Before Explosion) */}
        {!isExploded && (
          <div
            ref={pinataAssemblyRef}
            onClick={handlePop}
            className="relative z-30 flex flex-col items-center max-w-md mx-auto py-1 text-center cursor-pointer group select-none"
          >
            {/* Suspended Number 1 Piñata with natural gentle idle sway */}
            <div
              ref={pinataSwingRef}
              className="relative w-full max-w-[240px] sm:max-w-[300px] md:max-w-[340px] mx-auto py-1 transition-transform duration-300 group-hover:scale-105"
              style={{ transformOrigin: 'top center' }}
            >
              <img
                ref={pinataImgRef}
                src="/decorations/layers/pinata.png"
                alt="Abhimanyu Krishnan Number 1 Rainbow Piñata"
                className="w-full h-auto object-contain drop-shadow-2xl"
                loading="eager"
              />
            </div>

            {/* Celebratory Milestone Badge & Pop Piñata CTA Button */}
            <div
              ref={badgeRef}
              className="mt-3 bg-white/95 backdrop-blur-md border-2 border-theme-rope/40 rounded-3xl p-5 sm:p-6 shadow-paper max-w-sm mx-auto"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-yellow/20 text-theme-navy font-display font-semibold text-xs mb-2">
                <Sparkles size={14} className="text-theme-yellow fill-theme-yellow" />
                <span>Milestone Celebration</span>
              </div>

              <h2 className="font-display font-bold text-xl sm:text-2xl text-theme-navy mb-1.5">
                Turning The Big One!
              </h2>

              <p className="font-body text-xs sm:text-sm text-theme-navy/80 leading-relaxed mb-4">
                365 days of baby giggles, tiny footsteps, and pure joy with{' '}
                <strong className="text-theme-blue font-semibold">{APP_CONFIG.childName}</strong>.
              </p>

              {/* Pop Action Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePop();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-theme-red hover:bg-theme-redDark text-white font-display font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 animate-pulse"
              >
                <PartyPopper size={16} />
                <span>Pop The Piñata! 🎈</span>
              </button>
            </div>
          </div>
        )}

        {/* Hidden Explosion Arsenal (Drums, Balloons, Stars, Confetti, Shockwave) */}
        {/* Shockwave Burst Flash */}
        <div
          ref={shockwaveRef}
          className="absolute top-32 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-30 opacity-0 scale-0"
          style={{
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle, rgba(255,224,130,0.95) 0%, rgba(222,83,71,0.6) 45%, rgba(255,255,255,0) 75%)',
          }}
        />

        {/* Exploding Drums */}
        {/* Left Party Drum */}
        <div
          ref={drumLeftRef}
          className="absolute top-36 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-35 opacity-0 scale-0"
        >
          <PartyDrum size={window.innerWidth < 768 ? 64 : 88} />
        </div>

        {/* Right Party Drum */}
        <div
          ref={drumRightRef}
          className="absolute top-36 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-35 opacity-0 scale-0"
        >
          <PartyDrum size={window.innerWidth < 768 ? 64 : 88} />
        </div>

        {/* Exploding Balloons */}
        {/* Red Balloon (Top Left) */}
        <div
          ref={balloonRedRef}
          className="absolute top-36 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 sm:w-24 pointer-events-none z-35 opacity-0 scale-0 drop-shadow-xl"
        >
          <img
            src="/decorations/layers/balloon-red.png"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Blue Balloon (Top Right) */}
        <div
          ref={balloonBlueRef}
          className="absolute top-36 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 sm:w-24 pointer-events-none z-35 opacity-0 scale-0 drop-shadow-xl"
        >
          <img
            src="/decorations/layers/balloon-blue.png"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Yellow Balloon (Bottom Left) */}
        <div
          ref={balloonYellowRef}
          className="absolute top-36 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 sm:w-20 pointer-events-none z-35 opacity-0 scale-0 drop-shadow-xl"
        >
          <img
            src="/decorations/layers/balloon-yellow.png"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Green Balloon (Bottom Right) */}
        <div
          ref={balloonGreenRef}
          className="absolute top-36 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 sm:w-20 pointer-events-none z-35 opacity-0 scale-0 drop-shadow-xl"
        >
          <img
            src="/decorations/layers/balloon-green.png"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Radial Starburst Container */}
        <div
          ref={starsContainerRef}
          className="absolute top-36 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-34"
        >
          {STAR_BURST.map((star) => {
            const isMob = typeof window !== 'undefined' && window.innerWidth < 768;
            const dist = isMob ? star.dist * 0.55 : star.dist;
            const x = Math.cos(star.angle) * dist;
            const y = Math.sin(star.angle) * dist;
            return (
              <div
                key={star.id}
                className="absolute top-0 left-0 w-6 sm:w-8 pointer-events-none drop-shadow-md"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <img src={star.img} alt="" className="w-full h-auto object-contain" />
              </div>
            );
          })}
        </div>

        {/* Radial Confetti Particles Container */}
        <div
          ref={confettiContainerRef}
          className="absolute top-36 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-33"
        >
          {CONFETTI_PIECES.map((piece) => {
            const isMob = typeof window !== 'undefined' && window.innerWidth < 768;
            const x = isMob ? piece.targetX * 0.55 : piece.targetX;
            const y = isMob ? piece.targetY * 0.55 : piece.targetY;
            return (
              <div
                key={piece.id}
                className="absolute top-0 left-0 pointer-events-none shadow-sm"
                style={{
                  backgroundColor: piece.color,
                  width: piece.shape === 'rect' ? '12px' : piece.shape === 'ribbon' ? '6px' : '9px',
                  height: piece.shape === 'rect' ? '7px' : piece.shape === 'ribbon' ? '16px' : '9px',
                  borderRadius: piece.shape === 'circle' ? '50%' : '1px',
                  transform: `translate(${x}px, ${y}px) rotate(${piece.rotation}deg)`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 2: "12 MONTHS OF OUR LITTLE ONE" COMING FROM CENTER */}
      {/* ======================================================== */}
      <div
        id={APP_CONFIG.sections.memories}
        ref={galleryContainerRef}
        className="max-w-5xl mx-auto w-full transition-all duration-300"
        style={{ transformOrigin: 'top center' }}
      >
        {/* Section Header: Styled after reference/memories-section.jpeg */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 pt-2">
          {/* Decorative Stars, Tag & Replay Action */}
          <div className="flex items-center justify-center gap-3 mb-2 flex-wrap">
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

            {/* Replay Piñata Explosion Button */}
            {isExploded && (
              <button
                type="button"
                onClick={handleReplay}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-theme-sky/20 hover:bg-theme-sky/35 text-theme-navy font-display font-semibold text-xs transition-colors ml-2 shadow-sm"
                title="Watch the piñata explode again"
              >
                <RotateCcw size={12} />
                <span>Pop Again! 🎉</span>
              </button>
            )}
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
          {milestones.map((item, idx) => (
            <div
              key={item.monthNumber}
              onClick={() => handleOpenLightbox(idx)}
              className="monthly-milestone-card group cursor-pointer bg-white rounded-2xl sm:rounded-3xl p-2 min-[400px]:p-2.5 sm:p-3.5 shadow-paper hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-theme-sky/40 border border-theme-cream flex flex-col justify-between"
            >
              {/* Photo Frame */}
              <div className="relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl bg-amber-50/40 border border-theme-cream/80">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Delete / Undo Icon in top right corner of the pic */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteMilestone(item);
                  }}
                  className="absolute top-1.5 right-1.5 min-[400px]:top-2 min-[400px]:right-2 p-1.5 rounded-full bg-white/90 hover:bg-theme-red text-theme-navy/70 hover:text-white shadow-md transition-all transform hover:scale-110 z-20 focus:outline-none"
                  title="Delete photo"
                  aria-label={`Delete ${item.monthLabel} photo`}
                >
                  <Trash2 size={13} className="min-[400px]:w-3.5 min-[400px]:h-3.5" />
                </button>

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
                  onClick={() => handleOpenLightbox(milestones.length + idx)}
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
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 bg-theme-navy/95 backdrop-blur-md text-white text-xs sm:text-sm rounded-full shadow-2xl border border-white/20 animate-fade-in">
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
            {/* Header controls: Delete & Close buttons */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 z-20">
              <button
                type="button"
                onClick={() => {
                  const itemToDelete = selectedItem;
                  setSelectedItem(null);
                  if (itemToDelete?.type === 'milestone') {
                    handleDeleteMilestone(itemToDelete.raw);
                  } else if (itemToDelete?.type === 'guest') {
                    handleDeleteGuestMemory(itemToDelete.raw);
                  }
                }}
                className="p-2 rounded-full bg-theme-cream text-theme-navy/70 hover:bg-theme-red hover:text-white transition-colors shadow-sm"
                title="Delete photo"
                aria-label="Delete photo"
              >
                <Trash2 size={16} />
              </button>
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
