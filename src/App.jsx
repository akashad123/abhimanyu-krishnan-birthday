import React, { useState } from 'react';
import BirthdayHero from './components/BirthdayHero/BirthdayHero';
import BirthdayReveal from './components/BirthdayReveal/BirthdayReveal';
import MemoryGallery from './sections/MemoryGallery';
import UploadSection from './sections/UploadSection';
import Footer from './sections/Footer';
import { useMemories } from './hooks/useMemories';

export function App() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const { memories, uploadMemory, isConfigured } = useMemories();

  return (
    <div className="min-h-screen flex flex-col font-body text-theme-navy bg-theme-cream overflow-x-hidden">
      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Cinematic Scroll-Driven Opening Scene */}
        <BirthdayHero />

        {/* Section 2: Revealed on scroll — Hanging Rainbow Number "1" Piñata */}
        <BirthdayReveal />

        {/* Section 3: Photography-First Memory Album */}
        <MemoryGallery
          memories={memories}
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
