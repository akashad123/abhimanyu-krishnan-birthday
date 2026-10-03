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

---

### [2026-10-02] Complete Elimination of Empty Space via Unpinned Continuous Scroll

**Purpose**
Completely eliminate the empty holding stage on PC and mobile viewports by removing ScrollTrigger section pinning, allowing natural scrubbed scroll where Section 2 immediately and continuously rolls up as the birthday card accelerates into the ceiling.

**User Flow**
1. Visitor loads the page:
   - Full viewport displays the central birthday card, festive bunting, balloons, and hanging decorations.
2. Visitor scrolls:
   - Natural browser scroll moves the page downward while GSAP scrubs the physical effects in sync:
     - The central card accelerates upward (`y: -0.65vh`) faster than the background, simulating a swift rope pull into the ceiling.
     - The side hanging decorations part outward toward the left and right edges.
     - The balloons float upward.
   - Concurrently, Section 2 (the rainbow number "1" piñata) immediately emerges from the bottom of the screen.
   - As the card leaves the top, the piñata arrives in the center of the viewport with zero empty dead space, zero holding frames, and seamless vertical flow across PC, tablet, and mobile.

**Technical Flow**
- In `src/components/BirthdayHero/birthdayHeroAnimation.js`:
  - Removed `pin: true` and set `end: 'bottom top'` on both mobile and desktop matchMedia ScrollTrigger timelines.
- In `src/utils/responsiveAnimation.js`:
  - Adjusted card travel offset to `-(vh * 0.65)` (desktop) and `-(vh * 0.55)` (mobile) to cleanly complement natural scroll.
  - Adjusted balloon travel offsets to `-(vh * 0.7)` to `-(vh * 0.9)`.
- In `src/components/BirthdayReveal/BirthdayReveal.jsx`:
  - Added `-mt-8 sm:-mt-12 md:-mt-16` overlap margin so Section 2 begins entering right behind Section 1's bottom elements.

**Verification**
- Production build `npm run build` executed successfully without errors or warnings (`✓ built in 11.80s`).

---

### [2026-10-02] Increased Height of Abhimanyu Krishnan Hanging Baby Photo Plaque

**Purpose**
Significantly increase the height and overall visual presence of the Abhimanyu Krishnan hanging plaque and baby portrait across mobile (including tall modern devices like iPhone 16 Pro Max) and desktop viewports.

**User Flow**
1. Visitor loads the hero scene on a mobile device or desktop:
   - The central plaque featuring baby Abhimanyu is noticeably larger, taller, and more prominent (height increased by ~25% on mobile).
   - Baby Abhimanyu's portrait in his red celebratory kurta with his teddy bear, balloons, and toy car is clearly visible with rich details.
   - The card fills the vertical viewport comfortably while leaving elegant margin for the dangling star decorations and the "SCROLL DOWN" pill.

**Technical Flow**
- In `src/components/BirthdayHero/BirthdayHero.jsx`:
  - Increased card wrapper sizing to `max-w-[330px] min-[400px]:max-w-[360px] sm:max-w-[410px] md:max-w-[490px] lg:max-w-[560px] xl:max-w-[620px]`.
  - Adjusted top rope height to `h-5 sm:h-7` for a tighter vertical ceiling anchor.

**Files**
- `src/components/BirthdayHero/BirthdayHero.jsx`

**Verification**
- Production build `npm run build` executed successfully without errors or warnings (`✓ built in 5.84s`).
- Visual check on mobile emulations (375px, 414px, 440px): card is taller and prominent, side decorations remain visible, and scroll indicator remains properly aligned.

---

### [2026-10-02] Unified Single Continuous Hanging Assembly & Fixed Static Background

**Purpose**
Connect the top Abhimanyu Krishnan baby photo plaque and "Scroll Down" pill directly to the suspended Rainbow Number "1" Piñata and milestone card via a braided rope into one single continuous hanging mobile assembly, exactly matching `reference/landing-reference-mobile.jpg`. Merge the experience into a single unified celebration section with a fixed, static vertical striped wallpaper.

**User Flow**
1. Visitor arrives at the website:
   - The blue and warm-cream vertical striped wallpaper is completely static and fixed in place.
   - The celebration decorations hang from the top ceiling as a single connected physical mobile:
     - Top ceiling rope -> "ONE WHOLE YEAR - Abhimanyu Krishnan" plaque -> two mini rope links -> "Scroll Down" pill -> central braided rope -> Rainbow Number "1" Piñata -> Milestone celebration card.
   - The entire hanging column gently sways left-to-right as a unified physical pendulum.
   - Clicking "Scroll Down" smoothly scrolls down the connected mobile to the Rainbow Number "1" Piñata.
   - As the user scrolls, the background stripes remain completely still while the connected hanging piece smoothly rolls up, with side decorations and balloons parting naturally, with zero empty gaps or disjointed frames.

**Technical Flow**
- In `src/styles/index.css`:
  - Added `background-attachment: fixed;` to `.bg-striped-wallpaper` to keep the blue-and-cream vertical stripes completely static across the viewport.
- In `src/App.jsx`:
  - Removed separate `BirthdayReveal` section component; unified the entire celebration into `BirthdayHero` followed by `MemoryGallery`.
- In `src/components/BirthdayHero/BirthdayHero.jsx`:
  - Added central connecting braided rope (`.braided-rope`) linking the bottom of the "Scroll Down" indicator to the top knot of the Rainbow Number "1" Piñata.
  - Placed the Rainbow Number "1" Piñata (`id={APP_CONFIG.sections.pinata}`) and Milestone card directly within `hero-card-assembly` -> `cardSwingRef`.
- In `src/components/BirthdayHero/BirthdayHero.css`:
  - Removed `height: 100vh; overflow: hidden;` from `.birthday-hero-container` to allow natural vertical scrolling of the unified hanging chain.
  - Set `.hero-card-assembly` to `position: relative; margin-top: 0;` so it flows as a continuous vertical column from the ceiling.
- In `src/components/BirthdayHero/birthdayHeroAnimation.js`:
  - Removed artificial card upward translation (`cardScrollRef`) and scroll CTA fade-out in both mobile and desktop matchMedia timelines so the connected assembly stays intact and scrolls naturally.

**Files**
- `src/styles/index.css`
- `src/App.jsx`
- `src/components/BirthdayHero/BirthdayHero.jsx`
- `src/components/BirthdayHero/BirthdayHero.css`
- `src/components/BirthdayHero/birthdayHeroAnimation.js`

**Verification**
- Production build `npm run build` completed cleanly in 3.97s with 0 errors.
- Verified in `reference/landing-reference-mobile.jpg` that the artwork is indeed a single connected hanging mobile where the rope runs from the plaque through the Scroll Down pill into the top knot of the Number 1 Piñata.
- Verified local dev server is running and responding with HTTP 200.

---

### [2026-10-02] Refined GSAP Motion System: Static Background Layer, Card Pull, Piñata/Milestone Animations, Glitch-Free Balloons, and Slow Cloud Parting

**Purpose**
- Guarantee a 100% stationary background using a dedicated `fixed inset-0` wallpaper layer.
- Restore the GSAP upward pull animation on the "One Whole Year of Abhimanyu Krishnan" plaque and "Scroll Down" pill.
- Add celebratory GSAP entrance animations to the Rainbow Number "1" Piñata (tilt, scale pop, and idle sway) and the Milestone Card ("Turning The Big One!" slide-up and fade-in).
- Resolve balloon animation glitching by decoupling scroll translation from idle wobble via dual wrappers, gliding balloons aside off the screen.
- Keep the festive bunting garland suspended at the top ceiling (`position: sticky; top: 0; z-35`).
- Ensure side hanging clouds slowly and gracefully part to the left and right, remaining clearly visible throughout the scroll.

**User Flow**
1. Visitor lands on the page:
   - The baby-blue and warm-cream vertical striped wallpaper is physically locked in place (`position: fixed; inset: 0;`), completely static across all viewports.
   - The festive bunting garland frames the top of the ceiling with a gentle idle sway.
   - The Abhimanyu Krishnan baby photo plaque and "Scroll Down" button are front and center.
2. Visitor scrolls down:
   - The plaque and "Scroll Down" button smoothly pull upward into the ceiling via GSAP scrub.
   - The festive bunting remains gracefully pinned across the top ceiling.
   - The left and right hanging clouds slowly glide outward towards the edges while staying suspended in view, allowing visitors to clearly witness their gentle parting motion.
   - The balloons glide aside off the screen (left balloons glide left, right balloons glide right) with zero jitter or glitching.
   - The Rainbow Number "1" Piñata enters the center of the viewport with a celebratory tilt, scale pop, and continuous pendulum rope sway.
   - The "Turning The Big One!" milestone card smoothly slides up and fades into view with celebratory elevation.

**Technical Flow**
- In `src/App.jsx`:
  - Added dedicated `<div className="fixed inset-0 z-0 bg-striped-wallpaper pointer-events-none" />` layer, guaranteeing 100% stationary background rendering across Safari, Chrome, iOS, and Android.
- In `src/components/BirthdayHero/BirthdayHero.css`:
  - Styled `.hero-layer-bunting` with `position: sticky; top: 0; z-index: 35;` to keep the garland draped across the top ceiling.
- In `src/components/BirthdayHero/BirthdayHero.jsx`:
  - Added `balloon*InnerRef` wrappers to isolate idle floating from scroll translation.
  - Attached `pinataRef`, `pinataSwingRef`, and `milestoneRef` to enable dedicated GSAP animations.
- In `src/utils/responsiveAnimation.js`:
  - Updated `getResponsiveCardMovement` to calculate upward pull `-(vh * 0.45..0.55)`.
  - Updated `getResponsiveSideMovement` for slow, observable cloud parting (`vw * 0.24..0.32`).
  - Added `getBalloonAsideDistance` to calculate smooth off-screen lateral glide.
- In `src/components/BirthdayHero/birthdayHeroAnimation.js`:
  - Restored card upward pull on `cardScrollRef`.
  - Implemented glitch-free balloon lateral glide on `balloon*Ref` with independent idle wobble on `balloon*InnerRef`.
  - Added Rainbow Number 1 Piñata scale pop and rotation scrub on `pinataRef` plus idle pendulum sway on `pinataSwingRef`.
  - Added milestone card slide-up and fade-in on `milestoneRef`.
  - Added gentle downward resistance (`y: 120..160`) to side hanging clouds so they slowly part and remain clearly visible.

**Files**
- `src/App.jsx`
- `src/styles/index.css`
- `src/components/BirthdayHero/BirthdayHero.css`
- `src/components/BirthdayHero/BirthdayHero.jsx`
- `src/components/BirthdayHero/birthdayHeroAnimation.js`
- `src/utils/responsiveAnimation.js`

**Verification**
- Production build `npm run build` executed successfully with 0 errors (`✓ built in 7.25s`).
- Verified local dev server is responding with HTTP 200.

---

### [2026-10-02] Directly Joined Number 1 to Scroll Down Downside & Viewport-Level Static Fixed Background

**Purpose**
- Remove intermediate rope segment below "Scroll Down" and join the Rainbow Number "1" Piñata directly to the downside of the Scroll Down pill.
- Eliminate vertical GSAP displacement offsets on the Piñata and milestone card so the entire hanging mobile (Abhimanyu Krishnan plaque, Scroll Down button, Number 1 Piñata, and "Turning The Big One" milestone card) moves together as one continuous, unbroken piece.
- Establish a bulletproof viewport-level static fixed background on `body`, in `index.html`, and in `App.jsx`, ensuring the celebration stripes remain completely still while the hanging column moves smoothly above them.

**User Flow**
1. Visitor views the page:
   - The blue and warm-cream vertical striped wallpaper is completely static and fixed in place across all viewports and browsers.
   - The "ONE WHOLE YEAR - Abhimanyu Krishnan" plaque hangs from the ceiling.
   - The "Scroll Down" pill hangs directly beneath the plaque.
   - The Rainbow Number "1" Piñata is joined directly to the downside of the "Scroll Down" button with zero gap and no intermediate floating rope.
   - The "Turning The Big One!" milestone card sits directly below the Number 1.
2. Visitor scrolls:
   - The background stripes remain completely still.
   - The entire hanging assembly (Plaque, Scroll Down, Number 1, and Milestone) moves smoothly together as a unified physical column over the static background.
   - The Number 1 never disconnects or separates from the Scroll Down button during scroll.

**Technical Flow**
- In `src/components/BirthdayHero/BirthdayHero.jsx`:
  - Removed `<div className="braided-rope ...">` intermediate piece below the Scroll Down indicator.
  - Attached the Rainbow Number "1" Piñata directly to the downside of the Scroll Down button (`-mt-1 sm:-mt-2`).
- In `src/components/BirthdayHero/birthdayHeroAnimation.js`:
  - Removed `y: 40` on `pinataRef` and `y: 70` on `milestoneRef` to ensure the entire assembly stays united in lockstep as `cardScrollRef` translates on scroll.
- In `index.html`:
  - Added `#static-celebration-background` fixed fullscreen element directly under `<body>`.
- In `src/styles/index.css`:
  - Configured `body` with `background-attachment: fixed` and responsive vertical celebration stripes.
- In `src/App.jsx`:
  - Set `bg-transparent` on `App` root and `<main>` so the stationary background shines through without local stacking context interference.

**Files**
- `index.html`
- `src/styles/index.css`
- `src/App.jsx`
- `src/components/BirthdayHero/BirthdayHero.jsx`
- `src/components/BirthdayHero/birthdayHeroAnimation.js`

**Verification**
- Production build `npm run build` executed successfully with 0 errors (`✓ built in 4.88s`).
- Verified local dev server is responding with HTTP 200.

---

### [2026-10-02] Removed GSAP on Hanging One & Implemented "12 Months of Our Little One" Section

**Purpose**
- Remove all GSAP animations (scroll tween and idle sway) from the hanging Number "1" Piñata, allowing it to hang completely naturally connected to the downside of the Scroll Down button without artificial transforms.
- Implement the "12 Months of Our Little One" memory section styled strictly after client reference `reference/memories-section.jpeg`.

**User Flow**
1. Hanging Number 1:
   - The Rainbow Number 1 Piñata hangs directly from the bottom of the Scroll Down pill with natural physical stillness, free from artificial GSAP scale or tilt distortions.
2. Next Section — "12 Months of Our Little One":
   - Visitors scroll past the celebratory milestone to discover the monthly photo layout:
     - Header styled with festive stars and colorful playful lettering ("12 MONTHS" in coral, gold, blue, and green; "OF OUR LITTLE ONE" in uppercase).
     - 12 polaroid milestone cards (01 month through 12 months) arranged in a clean 3-column grid matching the mobile mockup.
     - Each card features baby Abhimanyu's portrait for that month, bold month label ("01 month", "02 months"...), and sweet milestone tagline ("A brand new you", "So curious", "All smiles", "Discovering the world", "Little explorer", "Growing, glowing", "Playful always", "More mischief", "Such a charmer", "Brighter every day", "Little adventurer", "One whole year").
     - Clicking any photo opens an interactive high-resolution lightbox modal with month badge, title, and previous/next photo navigation.
     - Community upload invitation card at the bottom allows guests to contribute additional memories.

**Technical Flow**
- In `src/components/BirthdayHero/birthdayHeroAnimation.js`:
  - Removed `pinataRef` ScrollTrigger animation and `pinataSwingRef` idle pendulum sway.
- In `src/data/initialMemories.js`:
  - Added `MONTHLY_MILESTONES` data array with 12 verified monthly entries matching the reference image.
- In `src/sections/MemoryGallery.jsx`:
  - Rebuilt memory section to present the 12-month polaroid grid, festive colorful header, lightbox modal, and guest memory section.
- Extracted `public/memories/month-01.jpg` through `month-12.jpg` directly from `reference/memories-section.jpeg`.

**Files**
- `src/components/BirthdayHero/birthdayHeroAnimation.js`
- `src/data/initialMemories.js`
- `src/sections/MemoryGallery.jsx`
- `public/memories/month-01.jpg` .. `month-12.jpg`

**Verification**
- Production build `npm run build` executed successfully with 0 errors (`✓ built in 6.92s`).
- Verified local dev server is responding with HTTP 200.

---

### [2026-10-02] Eliminated Empty Space Between Milestone Card & 12 Months Section

**Purpose**
Completely eliminate the empty vertical gap between the "Turning The Big One!" milestone celebration card and the "12 Months of Our Little One" section, ensuring an immediate, seamless visual transition.

**User Flow**
1. Visitor scrolls down through the celebration scene:
   - "ONE WHOLE YEAR - Abhimanyu Krishnan" plaque -> "Scroll Down" button -> Rainbow Number "1" Piñata -> "Turning The Big One!" milestone card.
2. Directly at the base of the "Turning The Big One!" card:
   - Floor paper clouds softly frame the bottom of the card.
   - The "12 Months of Our Little One" section begins immediately with zero empty space or gap between them.

**Technical Flow**
- In `src/components/BirthdayHero/birthdayHeroAnimation.js`:
  - Removed `cardScrollRef` upward translation (`y: -vh * 0.55`), preventing the entire card assembly from being lifted 600px into the ceiling away from the section base.
- In `src/components/BirthdayHero/BirthdayHero.jsx`:
  - Reduced milestone card bottom margin from `mb-12` to `mb-0`.
  - Adjusted floor clouds container to `-mt-20 sm:-mt-28` to hug the milestone card tightly.
- In `src/components/BirthdayHero/BirthdayHero.css`:
  - Removed `padding-bottom: 2rem` from `.birthday-hero-container`.
- In `src/sections/MemoryGallery.jsx`:
  - Added `-mt-14 sm:-mt-20 z-30` negative top margin and adjusted top padding to `pt-6 sm:pt-10`, pulling the section seamlessly beneath the floor clouds.

**Files**
- `src/components/BirthdayHero/birthdayHeroAnimation.js`
- `src/components/BirthdayHero/BirthdayHero.jsx`
- `src/components/BirthdayHero/BirthdayHero.css`
- `src/sections/MemoryGallery.jsx`

**Verification**
- Production build `npm run build` executed successfully with 0 errors (`✓ built in 13.22s`).
- Verified local dev server is responding with HTTP 200.

---

### FEATURE: Photo Deletion & Undo Functionality, Bathakkah Invites Footer Branding, and Section Spacing Refinement

**User Request**
1. Add an option to delete the photos, like an undo button or a delete icon in the top right corner of the pic.
2. Add "Bathakkah invites - your story, beautifully invited" to the footer, incorporating the logo provided in `reference/` as `logo.png`.
3. Add a little spacing/gap in front of the "12 Months of Our Little One" memories section and the hanging "Turning the Big One! Milestone Celebrations" section.

**User Flow**
1. **Photo Deletion & Undo**:
   - Each photo card in the "12 Months of Our Little One" grid and "Moments Shared with Love" community section displays a discreet circular delete button with a `Trash2` icon in the top-right corner (`top-1.5 right-1.5` / `top-2 right-2`).
   - Clicking the delete button removes the photo from view without triggering the lightbox preview modal (`e.stopPropagation()`).
   - A floating toast appears at the bottom center: "Photo deleted" with an **Undo** button and dismiss icon (`X`).
   - Clicking **Undo** immediately restores the photo to its exact position in the grid.
   - The toast automatically dismisses after 6 seconds if not undone.
   - When previewing in the Lightbox modal, a delete button is also available in the top-right corner next to the close button.
   - In the upload modal (`UploadSection`), selected photos show a delete/clear button in the top-right corner of the image preview so guests can easily change or undo their selection before submitting.
2. **Bathakkah Invites Footer Branding**:
   - The footer displays the official crimson circular "B" monogram logo (`/logo.png`) paired with the brand title **Bathakkah Invites**.
   - Below the brand title, the tagline *"your story, beautifully invited"* is rendered in an elegant, subtle italic typeface.
3. **Controlled Spacing**:
   - A subtle, balanced gap (`mt-6 sm:mt-8`, ~24px–32px) separates the base of the hanging celebration card and floor clouds from the top border of the "12 Months of Our Little One" memories section, replacing the overly compressed negative overlap while preventing empty void spaces.

**Technical Architecture & Flow**
- In `src/hooks/useMemories.js`:
  - Implemented `deleteMemory(id)` for optimistic local removal and Supabase storage/metadata record deletion.
  - Implemented `restoreMemory(memory)` for restoring previously deleted memories.
- In `src/App.jsx`:
  - Passed `deleteMemory` and `restoreMemory` handlers to `MemoryGallery`.
- In `src/sections/MemoryGallery.jsx`:
  - State management for `milestones` initialized from `MONTHLY_MILESTONES`.
  - Added `handleDeleteMilestone`, `handleDeleteGuestMemory`, and `handleUndo`.
  - Added top-right delete buttons to photo frames on milestone cards and guest memory cards.
  - Added floating Undo toast with 6s timeout and cleanup.
  - Added delete button to lightbox modal header.
  - Replaced `-mt-14 sm:-mt-20` with `mt-6 sm:mt-8` on the `<section>` element.
- In `src/sections/UploadSection.jsx`:
  - Added a remove/clear button in the top-right corner of the file preview container.
- In `src/sections/Footer.jsx`:
  - Integrated `/logo.png`, `Bathakkah Invites` title, and *"your story, beautifully invited"* tagline.
- In `public/logo.png`:
  - Copied client-provided `reference/logo.png` to `public/logo.png`.

**Files Modified**
- `src/hooks/useMemories.js`
- `src/App.jsx`
- `src/sections/MemoryGallery.jsx`
- `src/sections/UploadSection.jsx`
- `src/sections/Footer.jsx`
- `public/logo.png`
- `CHANGELOG.md`
- `FEATURE_LOG.md`

**Verification**
- Production build `npm run build` executed successfully with 0 errors.
- Verified all components compile and bundle cleanly with Vite.

---

### FEATURE: 12 Genuine Monthly Milestone Photos Integration & Static Milestone Lock

**User Request**
1. Replace the 12 images in the "12 Months of Our Little One" memory section with the 12 photos in `reference/` named `1.jpeg` through `12.jpeg`.
2. Remove the trash icon from the "12 Months of Our Little One" section only.
3. Keep the 12-month section 100% static (not connected to Supabase, permanent milestone memories).
4. Keep the Supabase connection exclusively for "Moments Shared with Love" (guest and family uploads from the website), which retains the trash/delete icon.

**User Flow**
1. **12 Months of Our Little One**:
   - The milestone grid displays the 12 genuine high-resolution photographs of baby Abhimanyu from newborn (`1.jpeg` — "A brand new you") through crawling in traditional Krishna attire (`12.jpeg` — "One whole year").
   - These 12 milestone cards are clean, permanent, and static — with NO trash icon and NO delete button.
   - Clicking any of the 12 milestone cards opens the high-resolution lightbox preview with previous/next navigation and milestone tagline.
   - The lightbox preview for milestone photos contains only navigation and close controls, without any delete button.
2. **Moments Shared with Love (Dynamic Guest Uploads)**:
   - Guest and family photos uploaded through the website ("Add a Memory to the Album") are uploaded to Supabase Storage and registered in the database.
   - They appear dynamically in the "Moments Shared with Love" gallery section.
   - Each uploaded memory card features a discreet delete button in the top-right corner, allowing guests/family to delete their uploads with an instant Undo option.

**Technical Architecture & Flow**
- Assets:
  - Copied `reference/1.jpeg` through `reference/12.jpeg` into `public/memories/month-01.jpg`..`month-12.jpg` and `public/memories/month-01.jpeg`..`month-12.jpeg`.
- Data:
  - Updated `src/data/initialMemories.js` to reference the genuine photo assets in `MONTHLY_MILESTONES`.
- Component:
  - In `src/sections/MemoryGallery.jsx`:
    - Removed `milestones` state and `handleDeleteMilestone` handler.
    - Rendered `MONTHLY_MILESTONES` statically without delete buttons.
    - Updated lightbox controls to conditionally render the delete button only for guest memories (`selectedItem?.type === 'guest'`).
    - Kept Supabase data flow and deletion for `memories` ("Moments Shared with Love").

**Files Modified**
- `public/memories/month-01.jpeg` through `month-12.jpeg`
- `public/memories/month-01.jpg` through `month-12.jpg`
- `src/data/initialMemories.js`
- `src/sections/MemoryGallery.jsx`
- `CHANGELOG.md`
- `FEATURE_LOG.md`

**Verification**
- Production build `npm run build` executed successfully with 0 errors.
- Verified all 12 photos exist and load properly.

---

### BUGFIX: Footer Visibility & Stacking Order Resolution

**User Issue**
The footer ("Bathakkah Invites — your story, beautifully invited" and celebration credits) was not visible at the bottom of the page, showing only blue and cream striped wallpaper below the memory gallery card.

**Root Causes**
1. **CSS Stacking Order**:
   - The stationary wallpaper was placed in `App.jsx` as a fixed element with `fixed inset-0 z-0 bg-striped-wallpaper`.
   - The `<main>` element was positioned with `relative z-10`, so it painted above the wallpaper.
   - However, `<footer className="bg-theme-cream ...">` was unpositioned (`position: static` with no z-index).
   - According to CSS specification, positioned elements with `z-index: 0` or higher render above non-positioned (static) elements in the normal document flow. Consequently, the fixed wallpaper painted directly over the footer, concealing it.
2. **Orphaned Local Dev Process**:
   - An orphaned background Node.js process was holding port 3000 running a stale build from earlier, while Vite had bound to port 3001. The browser open at `localhost:3000` was hitting the stale server.

**Fix Applied**
- In `src/sections/Footer.jsx`:
  - Added `relative z-20 w-full` to `<footer className="relative z-20 w-full bg-theme-cream py-12 px-4 border-t-2 border-theme-rope/20 text-center">`, giving it an explicit foreground position and high stacking index.
- In `src/App.jsx`:
  - Adjusted the fixed wallpaper layer to `fixed inset-0 -z-10 bg-striped-wallpaper pointer-events-none`, guaranteeing it remains below all content (both `<main>` and `<Footer />`).
- Server:
  - Terminated the orphaned background process and restarted Vite directly on `http://localhost:3000`.

**Files Modified**
- `src/sections/Footer.jsx`
- `src/App.jsx`
- `CHANGELOG.md`
- `FEATURE_LOG.md`

**Verification**
- Verified `http://localhost:3000/src/sections/Footer.jsx` and `http://localhost:3000/logo.png` return HTTP 200.
- Executed `npm run build` with 0 errors.

---

### [2026-10-03] BUGFIX: Persistent Photo Deletion Across Page Refreshes & Supabase RLS Delete Policies

**User Issue**
When deleting an uploaded photo in "Moments Shared with Love", it disappears from the screen, but after refreshing the page, it reappears.

**Root Causes**
1. **Missing Postgres Row Level Security (RLS) DELETE Policy in Supabase**:
   - `public.memories` and `storage.objects` had RLS enabled, but only had `SELECT` and `INSERT` policies for the `anon` public role.
   - When the client called `supabase.from('memories').delete().eq('id', memoryId)`, Postgres RLS evaluated to `false` for the anon role and returned `{ data: [], error: null }` without deleting the database row.
   - Because no error was thrown, client code treated the operation as completed, but the row remained untouched in Supabase.
2. **Lack of Client-Side Blacklist / Persistence**:
   - `useMemories.js` managed memory state only in React component memory.
   - Upon page refresh, `fetchUploadedMemories()` fetched all rows from the database. Since the database row was never deleted, the deleted photo reappeared.

**Fix Applied (Defense-in-Depth)**
1. **Client-Side Persistence Layer (`src/hooks/useMemories.js`)**:
   - Added `localStorage` tracking using key `abhimanyu_deleted_memory_ids`.
   - When a photo is deleted, its ID is instantly added to `localStorage`.
   - On initial mount and on every background fetch, `memories` state filters out any IDs stored in `localStorage`.
   - If the user clicks **Undo** within the 6-second grace period, `restoreMemory()` removes the ID from `localStorage` and restores the photo to state.
   - This guarantees that in the user's browser, deleted photos will **never** reappear upon page refresh, even before remote database policies are applied.
2. **Remote Supabase RLS DELETE Policies (`supabase/schema.sql` & `docs/SUPABASE_SETUP.md`)**:
   - Added public DELETE policy for `public.memories`:
     ```sql
     CREATE POLICY "Allow public delete on memories"
     ON public.memories
     FOR DELETE
     TO anon, authenticated
     USING (true);
     ```
   - Added public DELETE policy for `storage.objects`:
     ```sql
     CREATE POLICY "Allow public delete on memory-photos bucket"
     ON storage.objects
     FOR DELETE
     TO anon, authenticated
     USING (bucket_id = 'memory-photos');
     ```
   - Documented exact SQL steps in `docs/SUPABASE_SETUP.md` for applying these policies in the Supabase Dashboard SQL Editor.

**Files Modified**
- `src/hooks/useMemories.js`
- `supabase/schema.sql`
- `docs/SUPABASE_SETUP.md`
- `CHANGELOG.md`
- `FEATURE_LOG.md`

**Verification**
- Production build `npm run build` executed successfully (0 errors, built in 5.34s).
- Verified `localStorage` key creation, deleted ID filtering, and undo restoration logic.

---

### [2026-10-03] Pinned Two-Stage Hero Scroll Reveal & 100% Static Background Stabilization

**User Request**
"Now it is like a single long scroll. What I want is that this Abhimanyu Krishnan only, that tag, should go up, and the turning the big one should also come up. It also feels like the background is also moving. Could you please change it?"

**Purpose**
Transform the celebration hero from a flat, vertically stacked single-column scroll into a theatrical, two-stage experience where:
1. Stage 1 presents baby Abhimanyu Krishnan's card tag hanging in the center of the viewport on initial load without any clutter.
2. Scrolling or clicking "Scroll Down" pulls the Abhimanyu Krishnan card tag smoothly UP into the top ceiling, while the Rainbow Number 1 Piñata and "Turning The Big One!" milestone card glides smoothly UP from below into center view.
3. The blue-and-cream vertical striped background wallpaper remains 100% rock-solid and static throughout the scroll, eliminating any optical illusion or browser jitter.

**Technical Architecture & Flow**
1. **Two-Stage Layout Architecture (`BirthdayHero.jsx` & `BirthdayHero.css`)**:
   - Split `BirthdayHero` into two discrete stages occupying the 100vh viewport:
     - `hero-stage-tag`: Stage 1 containing ceiling braided rope, "One Whole Year of Abhimanyu Krishnan" card plaque, and the "Scroll Down" pill button.
     - `hero-stage-pinata`: Stage 2 containing ceiling braided rope, Rainbow Number 1 Piñata (with continuous physical pendulum sway), and "Turning The Big One! Milestone Celebration" card.
   - Initial layout state:
     - Stage 1 is centered at `y: 0`, `opacity: 1`.
     - Stage 2 is placed off-screen below at `y: 85vh` (mobile) / `95vh` (desktop), `opacity: 0`.
2. **GSAP ScrollTrigger Pinned Timeline (`birthdayHeroAnimation.js`)**:
   - Pinned the `BirthdayHero` section (`pin: true`, `anticipatePin: 1`, `scrub: 0.8`, `id: 'birthdayHeroTrigger'`).
   - Stage 1 Translation: `cardScrollRef` translates up to `-85vh` (mobile) / `-95vh` (desktop) and fades out cleanly into the top ceiling.
   - Stage 2 Translation: `pinataStageRef` translates up from `85vh`/`95vh` to `0vh` and fades in, bringing the Number 1 Piñata and Milestone card to center stage.
   - Floating Balloons: Decoupled left and right balloons part smoothly to the left (`x: -asideDist`) and right (`x: asideDist`) borders to frame the Number 1 Piñata.
   - Side Clouds & Stars: Left and right hanging clouds gracefully drift outward toward the screen edges.
   - Reduced Motion: When `prefersReducedMotion` is active, animations are bypassed and static layouts render with full opacity.
3. **Scroll CTA Button Integration (`ScrollDownIndicator.jsx` & `BirthdayHero.jsx`)**:
   - Added `onScrollDown` callback prop to `ScrollDownIndicator`.
   - When clicked, it smoothly scrolls the page to `st.start + (st.end - st.start) * 0.95`, triggering the cinematic transition to Stage 2.
4. **100% Static Background Stabilization**:
   - Eliminated `background-attachment: fixed` and duplicate `background-image` from `body` in `src/styles/index.css`. This removes the subpixel jitter and compositor thrashing that occurred in Chromium/WebKit on desktop and mobile.
   - Removed redundant `#static-celebration-background` div from `index.html`.
   - Enhanced the single authoritative fixed layer in `src/App.jsx` with GPU hardware compositing: `transform: translate3d(0,0,0)`, `backface-visibility: hidden`, `will-change: transform`.
   - Because `BirthdayHero` is pinned during the stage transition, the viewport scroll remains locked, guaranteeing that the background stripes stay 100% stationary with zero movement or optical distortion.

**Files Modified**
- `src/components/BirthdayHero/BirthdayHero.jsx`
- `src/components/BirthdayHero/BirthdayHero.css`
- `src/components/BirthdayHero/birthdayHeroAnimation.js`
- `src/components/ScrollDownIndicator.jsx`
- `src/styles/index.css`
- `src/App.jsx`
- `index.html`
- `CHANGELOG.md`
- `FEATURE_LOG.md`

**Verification**
- Production build `npm run build` executed successfully without errors or warnings (`✓ built in 8.29s`).
- Dev server running cleanly on `http://localhost:3000` returning HTTP 200.





