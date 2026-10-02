import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import LandingHero from './sections/LandingHero';
import PinataSection from './sections/PinataSection';
import MemoryGallery from './sections/MemoryGallery';
import UploadSection from './sections/UploadSection';
import Footer from './sections/Footer';
import { useMemories } from './hooks/useMemories';
import { useReducedMotion } from './hooks/useReducedMotion';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const { memories, uploadMemory, isConfigured } = useMemories();
  const prefersReducedMotion = useReducedMotion();
  const mainRef = useRef(null);

  // Purposeful GSAP animations that adapt dynamically
  useEffect(() => {
    // If user prefers reduced motion, skip movement animations
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Gentle floating animation on decorative balloons
      gsap.to('.animate-float-slow', {
        y: -12,
        rotation: 2,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Subtle scroll reveal for the Pinata section
      gsap.from('#pinata img', {
        scrollTrigger: {
          trigger: '#pinata',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0.85,
        duration: 1.2,
        ease: 'power2.out',
      });
    }, mainRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={mainRef} className="min-h-screen flex flex-col font-body text-theme-navy bg-theme-cream">
      {/* Sticky Top Header */}
      <Header onOpenUpload={() => setIsUploadOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Viewport 1: First-birthday hero up to "Scroll Down" */}
        <LandingHero />

        {/* Viewport 2: Revealed on scroll — Hanging "1" Piñata Milestone */}
        <PinataSection />

        {/* Viewport 3: Memory Album Photography Gallery */}
        <MemoryGallery
          memories={memories}
          onOpenUpload={() => setIsUploadOpen(true)}
        />
      </main>

      {/* Celebratory Footer */}
      <Footer />

      {/* Anonymous Photo Upload Modal */}
      <UploadSection
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={uploadMemory}
        isConfigured={isConfigured}
      />
    </div>
  );
}

export default App;
