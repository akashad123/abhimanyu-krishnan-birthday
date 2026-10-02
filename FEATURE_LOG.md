# Feature Log

This file records implemented project features.

## Format

For every meaningful feature:

### [DATE] Feature Name

**Purpose**
What it does.

**User Flow**
How a visitor interacts with it.

**Technical Flow**
How the implementation works.

**Files**
Relevant files.

**Verification**
What was actually tested.

**Documentation**
Which docs were updated.

---

## Initial Project Setup

Initial requirements update — supplied mobile visual reference incorporated; project identity corrected to **Abhimanyu Krishnan**; Supabase anonymous photo-upload architecture approved; responsive mobile-first requirement added.

---

### [2026-10-02] Phase 1 — Foundation Setup

**Purpose**
Initialize the complete React frontend foundation, styling system, design tokens, asset structure, and Supabase integration scaffolding.

**User Flow**
Visitor accesses the site and sees the celebratory striped theme, bunting garland, floating balloons, paper clouds, and central hanging birthday plaque up to the "Scroll Down" button. Clicking "Scroll Down" smoothly scrolls to the hanging "1" pinata section, followed by the memory gallery and upload modal.

**Technical Flow**
- Vite + React 18 configured with Tailwind CSS and Google Fonts (`Fredoka`, `Quicksand`, `Caveat`).
- Centralized configuration in `src/config/appConfig.js`.
- Modular SVG and CSS decorative elements (bunting, ropes, balloons, clouds, stars).
- Extracted and prepared high-fidelity reference visual assets in `public/decorations/` and initial verified baby photo in `public/memories/`.
- Safe Supabase client (`src/lib/supabaseClient.js`) and data hook (`src/hooks/useMemories.js`) with client-side image MIME and size validation.
- Rollup code-splitting for vendor, animation, and Supabase chunks.

**Files**
- `package.json`
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `index.html`
- `.gitignore`
- `.env`
- `src/config/appConfig.js`
- `src/lib/supabaseClient.js`
- `src/hooks/useReducedMotion.js`
- `src/hooks/useMemories.js`
- `src/data/initialMemories.js`
- `src/components/Header.jsx`
- `src/components/BuntingGarland.jsx`
- `src/components/RopeSegment.jsx`
- `src/components/FloatingBalloons.jsx`
- `src/components/PaperClouds.jsx`
- `src/components/ScatteredStars.jsx`
- `src/components/ScrollDownIndicator.jsx`
- `src/sections/LandingHero.jsx`
- `src/sections/PinataSection.jsx`
- `src/sections/MemoryGallery.jsx`
- `src/sections/UploadSection.jsx`
- `src/sections/Footer.jsx`
- `src/App.jsx`
- `src/main.jsx`

**Verification**
Production build `npm run build` executed successfully without errors or warnings (`✓ built in 6.01s`).

**Documentation**
Updated `PHASES.md`, `MEMORY.md`, `CHANGELOG.md`, `ARCHITECTURE.md`, `DESIGN.md`, and `FEATURE_LOG.md`.

---

### [2026-10-02] Responsive Client Visual Assets & Navbar Removal

**Purpose**
Remove the top website navbar to preserve uninterrupted storytelling and integrate the client's official high-resolution assets:
- `abhi-mob.png` for mobile devices (<768px)
- `abhi-pc.png` for desktop/PC devices (>=768px)
- `pinata-mob.png` & `pinata-pc.png` for the hanging "1" milestone section
- Real photograph of baby Abhimanyu in red kurta in `public/memories/abhimanyu-baby.jpg`.

**User Flow**
Visitor lands directly into the visual experience without any website navbar chrome. On mobile phones, the full portrait composition displays; on desktop/laptop, the 16:9 widescreen composition displays. Clicking "Scroll Down" scrolls smoothly to the matching responsive hanging "1" piñata section.

**Technical Flow**
- Replaced `<Header>` navbar with pure full-viewport hero.
- Utilized HTML5 `<picture>` and `<source media="(min-width: 768px)">` for zero-layout-shift responsive asset delivery.
- Updated `LandingHero.jsx` and `PinataSection.jsx` to load `abhi-mob`/`abhi-pc` and `pinata-mob`/`pinata-pc`.
- Updated `src/data/initialMemories.js` to feature the real baby Abhimanyu photo in the red kurta.

**Files**
- `src/App.jsx`
- `src/sections/LandingHero.jsx`
- `src/sections/PinataSection.jsx`
- `src/data/initialMemories.js`
- `public/decorations/abhi-mob.png`
- `public/decorations/abhi-pc.png`
- `public/decorations/pinata-mob.png`
- `public/decorations/pinata-pc.png`
- `public/memories/abhimanyu-baby.jpg`

**Verification**
`npm run build` completed successfully (`✓ built in 12.23s`).

---

### [2026-10-02] Full-Bleed Responsive Background Image Layout

**Purpose**
Set `abhi-pc.png` (desktop) and `abhi-mob.png` (mobile) as the direct full-bleed background images of the Landing Hero section, and `pinata-pc.png` (desktop) and `pinata-mob.png` (mobile) as the direct background images of the Pinata Section, removing foreground image wrappers and separate stripe overlays.

**User Flow**
The visitor experiences complete full-screen, edge-to-edge celebratory visual backdrops:
- Landing viewport: Full-screen `abhi-pc`/`abhi-mob` artwork with baby Abhimanyu and celebratory board, with the interactive "Scroll Down" CTA hovering at the bottom.
- Pinata milestone viewport: Full-screen `pinata-pc`/`pinata-mob` artwork with the milestone celebration card and "Explore The Memory Album" CTA at the bottom.

**Technical Flow**
- Added `.bg-hero-artwork` and `.bg-pinata-artwork` responsive CSS utility classes in `src/styles/index.css`.
- Configured media queries for `(min-width: 768px)` to switch between PC landscape and Mobile portrait backgrounds automatically.
- Removed foreground `<picture>`/`<img>` elements and synthetic background stripes from both sections.
- Updated GSAP ScrollTrigger selector in `src/App.jsx` to smoothly animate the milestone card entry.

**Files**
- `src/styles/index.css`
- `src/sections/LandingHero.jsx`
- `src/sections/PinataSection.jsx`
- `src/App.jsx`

**Verification**
Production build `npm run build` executed successfully without errors or warnings (`✓ built in 5.33s`).





