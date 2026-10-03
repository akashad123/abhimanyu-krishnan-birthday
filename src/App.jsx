import React, { useState } from 'react';
import BirthdayHero from './components/BirthdayHero/BirthdayHero';
import MemoryGallery from './sections/MemoryGallery';
import FamilyGallery from './sections/FamilyGallery';
import CommunityMemories from './sections/CommunityMemories';
import UploadSection from './sections/UploadSection';
import Footer from './sections/Footer';
import BackgroundMusic from './components/AudioPlayer/BackgroundMusic';
import { useMemories } from './hooks/useMemories';

export function App() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const { memories, uploadMemory, deleteMemory, restoreMemory, isConfigured } = useMemories();

  return (
    <div className="relative min-h-screen flex flex-col font-body text-theme-navy bg-transparent overflow-x-hidden">
      {/* Truly Fixed Static Striped Background — Guaranteed 100% stationary on all devices */}
      <div
        className="fixed inset-0 -z-10 bg-striped-wallpaper pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Content Sections scrolling over the fixed background */}
      <main className="relative z-10 flex-1 bg-transparent">
        {/* Unified Celebration Scene (Plaque -> Rope -> Number 1 Piñata -> Milestone) */}
        <BirthdayHero />

        {/* Section 2: 12 Months of Our Little One (2 on mobile, 3 on desktop) */}
        <MemoryGallery />

        {/* Continuous Solid Cream Canvas for Album Sections — guarantees zero background stripe bleed during pin */}
        <div className="relative z-20 bg-theme-creamLight">
          {/* Section 3: Dedicated Family Moments Photo Album (Scroll-pinned drum carousel) */}
          <FamilyGallery />

          {/* Section 4: Community Memories & Upload Invitation Card (Last before Footer) */}
          <CommunityMemories
            memories={memories}
            onDeleteMemory={deleteMemory}
            onRestoreMemory={restoreMemory}
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        </div>
      </main>

      {/* Celebratory Closing Footer */}
      <Footer />

      {/* Anonymous Memory Upload Modal */}
      <UploadSection
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={uploadMemory}
        isConfigured={isConfigured}
      />
      {/* Floating Background Music Control with Auto-Pause on App Close */}
      <BackgroundMusic />
    </div>
  );
}

export default App;
