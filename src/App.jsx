import React, { useState } from 'react';
import BirthdayHero from './components/BirthdayHero/BirthdayHero';
import MemoryGallery from './sections/MemoryGallery';
import UploadSection from './sections/UploadSection';
import Footer from './sections/Footer';
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

        {/* Section 2: Photography-First Memory Album */}
        <MemoryGallery
          memories={memories}
          onDeleteMemory={deleteMemory}
          onRestoreMemory={restoreMemory}
          onOpenUpload={() => setIsUploadOpen(true)}
        />
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
    </div>
  );
}

export default App;
