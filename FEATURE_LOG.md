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

**Verification**
Production build `npm run build` executed successfully without errors or warnings (`✓ built in 5.33s`).

---

### [2026-10-02] Cinematic Scroll-Driven Opening Animation (Multi-Layer GSAP)

**Purpose**
Implement a handcrafted, multi-layer physical celebration opening animation controlled entirely by scroll position using GSAP + ScrollTrigger and `gsap.matchMedia()`, transitioning seamlessly into the rainbow number "1" piñata reveal section.

**User Flow**
1. Visitor loads the page and sees the centered "ONE WHOLE YEAR - Abhimanyu Krishnan" plaque suspended from the rope, flanked by hanging decorations, floating balloons, clouds, and bunting garland.
2. As the user scrolls down, the scene behaves like a real physical decoration being pulled apart:
   - The main birthday card moves upward smoothly as if pulled by the rope (`y: 0 -> -105vh`).
   - Left decoration parts toward the left margin with subtle swing (`x: 0 -> -38vw`, tilt: `-5deg`).
   - Right decoration parts toward the right margin with subtle swing (`x: 0 -> +38vw`, tilt: `+5deg`).
   - Individual balloons (red, yellow, blue, green) float upward with organic staggered vertical and horizontal offsets.
   - Bunting and clouds create depth through subtle parallax.
3. Continuing the scroll reveals the second section: the large rainbow-fringed number "1" piñata physically suspended from a rope with natural pendulum swinging physics, and the milestone celebration card leading into the memory gallery.

**Technical Flow**
- Extracted and prepared independent transparent PNG layers from client sticker sheet and artwork into `src/assets/birthday/common/` and `public/decorations/layers/`.
- Created modular architecture:
  - `src/components/BirthdayHero/BirthdayHero.jsx` & `BirthdayHero.css`
  - `src/components/BirthdayHero/birthdayHeroAnimation.js`
  - `src/components/BirthdayReveal/BirthdayReveal.jsx` & `BirthdayReveal.css`
  - `src/components/BirthdayReveal/birthdayRevealAnimation.js`
  - `src/utils/responsiveAnimation.js`
- Master GSAP timeline with `ScrollTrigger` pinning (`pin: true, scrub: 1, anticipatePin: 1`).
- Responsive adaptation via `gsap.matchMedia()` for mobile (`<768px`) and desktop (`>=768px`).
- Supported `prefers-reduced-motion` for accessibility.

**Files**
- `src/utils/responsiveAnimation.js`
- `src/components/BirthdayHero/BirthdayHero.jsx`
- `src/components/BirthdayHero/BirthdayHero.css`
- `src/components/BirthdayHero/birthdayHeroAnimation.js`
- `src/components/BirthdayReveal/BirthdayReveal.jsx`
- `src/components/BirthdayReveal/BirthdayReveal.css`
- `src/components/BirthdayReveal/birthdayRevealAnimation.js`
- `src/App.jsx`
- `src/assets/birthday/`
- `public/decorations/layers/`

**Verification**
Production build `npm run build` executed successfully without errors or warnings (`✓ built in 4.27s`).

---

### [2026-10-02] Ceiling-Anchored Ropes, Dual-Wrapper Idle Pendulum Sway & Side Decoration Visibility

**Purpose**
Ensure all suspended festive elements (central card, left & right hanging cloud/star assemblies, and rainbow number "1" piñata) physically anchor directly at the top ceiling (`top: 0`), ensure the left and right parting decorations remain clearly visible on mobile screens, and add organic left-to-right idle pendulum swinging motion to all hanging elements.

**User Flow**
1. Visitor loads the page:
   - Real braided ropes originate seamlessly from the top edge (`top: 0`) of the screen down to the central birthday card and both flanking decorations.
   - The hanging Abhimanyu Krishnan birthday card, the left hanging cloud + star, and the right hanging cloud + star gently sway left-to-right with realistic physical pendulum motion.
   - The side hanging decorations are clearly visible on mobile viewports (proper spacing and card proportion).
2. When the visitor scrolls down:
   - The central card is pulled straight upward via its top rope.
   - The left hanging decoration parts outward to the left edge while continuing its physical sway.
   - The right hanging decoration parts outward to the right edge while continuing its physical sway.
3. Arriving at the second section:
   - The large rainbow number "1" piñata hangs seamlessly from the top ceiling of the section (`top: 0`) and gently swings back and forth like a real suspended party piñata.

**Technical Flow**
- Added `.braided-rope` utility class in `src/styles/index.css` with realistic linear-gradient braid texture, lighting, and shadow.
- Built dedicated top-ceiling assemblies in `src/components/BirthdayHero/BirthdayHero.css` (`.hero-card-assembly`, `.hero-side-assembly-left`, `.hero-side-assembly-right`) anchored to `top: 0`.
- Implemented **Dual-Wrapper Architecture** for GSAP:
  - Outer wrapper controls scroll translation (`x`, `y` via ScrollTrigger timeline).
  - Inner wrapper controls continuous idle pendulum swinging (`rotation` around `transformOrigin: 'top center'` via `sine.inOut` yoyo loops), preventing GSAP property collision.
- Adjusted card max-width on mobile (`max-w-[275px]` scaling up to `400px` on desktop) ensuring left and right clouds/stars have ample visible clearance on 375px-440px mobile viewports.
- Anchored the number "1" piñata in `BirthdayReveal` to `top: 0` with top ceiling braided-rope extension and dual-wrapper pendulum sway.

**Files**
- `src/styles/index.css`
- `src/components/BirthdayHero/BirthdayHero.jsx`
- `src/components/BirthdayHero/BirthdayHero.css`
- `src/components/BirthdayHero/birthdayHeroAnimation.js`
- `src/components/BirthdayReveal/BirthdayReveal.jsx`
- `src/components/BirthdayReveal/birthdayRevealAnimation.js`

**Verification**
- Production build `npm run build` executed successfully without errors or warnings (`✓ built in 37.90s`).
- Visual positioning verified: braided ropes anchor at `top: 0` for all hanging elements; side decorations remain visible in mobile emulators (440px); continuous pendulum sway operates smoothly alongside scroll-driven translations.

---

### [2026-10-02] Hero Card Enlargement, Bunting Garland Sway, Rapid Balloon Exit & Section 2 Directional Motion

**Purpose**
Enlarge the baby card and elevate it on PC viewports so baby Abhimanyu is prominent and clearly visible; add natural idle swaying to the main U-shaped bunting garland; accelerate the 4 hero balloons so they fly all the way up and off-screen; remove static background clouds; add directional up-left/up-right floating to Section 2 balloons; and animate Section 2 clouds to move outward left and right.

**User Flow**
1. Hero Landing Page:
   - The central plaque featuring baby Abhimanyu is significantly larger (`max-w` up to 580px) and elevated on desktop so his photo, smile, and details are prominent and clear.
   - The colorful U-shaped bunting banner sways gently left and right like festive party pennants fluttering in a light breeze.
   - The redundant static clouds behind the top corners have been removed.
2. Scroll Transition:
   - When scrolling down, the red & yellow/orange balloons on the left and the blue & green balloons on the right accelerate upward rapidly (`y: -1.25vh` to `-1.5vh`), flying completely off the top of the screen.
3. Section 2 (Piñata Reveal):
   - The orange/yellow balloon floats up and left.
   - The green balloon floats up and right.
   - The paper clouds on the left and right drift outward to the left and right sides.

**Technical Flow**
- In `src/components/BirthdayHero/BirthdayHero.jsx` and `BirthdayHero.css`:
  - Increased card breakpoint widths: `max-w-[290px] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[530px] xl:max-w-[580px]`.
  - Tightened desktop rope length to `h-5 lg:h-6` with `@media (min-width: 1024px) { top: -8px }` elevation.
  - Removed `cloudsBgRef` layer.
- In `src/utils/responsiveAnimation.js`:
  - Increased balloon scroll offsets to `red: -1.25vh`, `yellow: -1.45vh`, `blue: -1.3vh`, `green: -1.5vh` with outward rotation.
- In `src/components/BirthdayHero/birthdayHeroAnimation.js`:
  - Added continuous sine wave sway to `buntingRef.current` (`rotation: 1.2`, `x: 8`, `transformOrigin: 'top center'`).
  - Accelerated balloon animation in GSAP timeline with `duration: 0.65` and `ease: 'power1.in'`.
- In `src/components/BirthdayReveal/BirthdayReveal.jsx` & `birthdayRevealAnimation.js`:
  - Added refs for left and right clouds (`cloudLeftRef`, `cloudRightRef`).
  - Added up-and-left idle & reveal motion for left orange balloon (`x: -18, y: -24` idle, `x: -40, y: -50` entrance).
  - Added up-and-right idle & reveal motion for right green balloon (`x: 18, y: -24` idle, `x: 40, y: -50` entrance).
  - Added outward drift for left cloud (`x: -28` idle, `x: -45` entrance) and right cloud (`x: 28` idle, `x: 45` entrance).

**Files**
- `src/utils/responsiveAnimation.js`
- `src/components/BirthdayHero/BirthdayHero.jsx`
- `src/components/BirthdayHero/BirthdayHero.css`
- `src/components/BirthdayHero/birthdayHeroAnimation.js`
- `src/components/BirthdayReveal/BirthdayReveal.jsx`
- `src/components/BirthdayReveal/birthdayRevealAnimation.js`

**Verification**
- Production build `npm run build` executed successfully without errors or warnings (`✓ built in 3.80s`).

---

### [2026-10-02] Elimination of Section 1–2 Gap & White Space / Seamless Flow

**Purpose**
Eliminate the dead scroll distance, white spaces, and vertical gaps between Frame 1 (BirthdayHero) and Frame 2 (BirthdayReveal), creating a seamless, tight physical reveal transition where Section 2 immediately enters as the central card pulls upward.

**User Flow**
1. Visitor scrolls down from the opening hero scene:
   - The central card pulls up swiftly and smoothly without requiring a long, dragging scroll.
   - The moment the card clears the top of the viewport, the rainbow number "1" piñata and the milestone card roll immediately into view.
   - The blue-and-cream vertical striped wallpaper is continuous with zero white flashes, blank cream gaps, or dead empty space.
   - Inside Section 2, the piñata, balloons, and milestone card form a tight, balanced, cohesive celebratory vignette.

**Technical Flow**
- In `src/App.jsx`:
  - Added `bg-striped-wallpaper` to `<main>` wrapper so the background wallpaper continues unbroken across the entire transition between sections.
- In `src/components/BirthdayHero/birthdayHeroAnimation.js`:
  - Reduced ScrollTrigger pinning distance from `+=120%` (mobile) / `+=140%` (desktop) down to `+=55%` (mobile) / `+=60%` (desktop) with `scrub: 0.6`.
  - This eliminates over 50% of empty pinned dead scroll time.
- In `src/utils/responsiveAnimation.js`:
  - Adjusted foreground cloud parallax to stay grounded at the bottom of Section 1 rather than lifting upward to reveal empty space below.
- In `src/components/BirthdayReveal/BirthdayReveal.css` & `BirthdayReveal.jsx`:
  - Changed container layout from `justify-content: space-between` to `justify-content: flex-start`, removing the huge vertical gap between the piñata and the milestone card.
  - Adjusted milestone card top margin to `mt-2 sm:mt-4 md:mt-5 mb-8`.

**Files**
- `src/App.jsx`
- `src/components/BirthdayHero/birthdayHeroAnimation.js`
- `src/utils/responsiveAnimation.js`
- `src/components/BirthdayReveal/BirthdayReveal.css`
- `src/components/BirthdayReveal/BirthdayReveal.jsx`

**Verification**
- Production build `npm run build` executed successfully without errors or warnings (`✓ built in 19.34s`).
- Verified seamless scroll: card exits and Section 2 immediately enters with continuous striped wallpaper and tight cohesive layout.
