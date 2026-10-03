# Changelog

Developer-facing record of meaningful changes.

## Unreleased

- Initial project documentation and AI-agent operating rules created.
- Phase 1 Foundation implemented: Vite + React 18 + Tailwind CSS + GSAP setup.
- Established design tokens, fonts (`Fredoka`, `Quicksand`, `Caveat`), striped wallpaper, and celebration colors.
- Built responsive components: `BuntingGarland`, `RopeSegment`, `FloatingBalloons`, `PaperClouds`, `ScatteredStars`, `ScrollDownIndicator`.
- Built sections: `LandingHero` (viewport up to Scroll Down), `PinataSection` (hanging 1 milestone), `MemoryGallery` (photography-first album with lightbox), and `UploadSection` (no-login client-validated modal).
- Scaffolding for Supabase Storage & metadata integration with safe fallback.
- Added git configuration, `.gitignore` excluding `.env`, and code-splitting configuration.
- Removed top navbar completely as requested.
- Integrated official responsive artwork pairs: `abhi-mob.png` & `abhi-pc.png` for landing hero, and `pinata-mob.png` & `pinata-pc.png` for the hanging 1 milestone.
- Populated Memory Gallery with real verified photo of baby Abhimanyu in red kurta.
- Converted Landing Hero and Pinata sections to full-bleed responsive background images (`bg-hero-artwork` and `bg-pinata-artwork`), removing foreground image tags and synthetic stripes.
- Implemented cinematic scroll-driven opening animation using independent transparent PNG layers (bunting, clouds, card, left/right decorations, balloons, stars) and master GSAP timeline.
- Card pulls upward smoothly via top rope (`y: 0 -> -105vh`) on scroll.
- Left and right hanging decorations part outward toward screen edges.
- Individual balloons float upward with organic staggered vertical and horizontal offsets.
- Number "1" rainbow piñata section features subtle continuous physical rope pendulum swinging motion.
- Full responsive support with `gsap.matchMedia()` and `prefers-reduced-motion` accessibility compliance.
- Anchored all hanging elements (central card, left & right hanging clouds/stars, rainbow number 1 piñata) to originate directly from the top ceiling (`top: 0`) using `.braided-rope`.
- Implemented natural idle pendulum swinging motion (`rotation`, `transformOrigin: 'top center'`) on hanging card and both hanging clouds/stars.
- Adopted dual-wrapper architecture separating continuous idle swaying from scroll-triggered translations.
- Scaled mobile card width (`max-w-[275px]`) so side parting decorations remain clearly visible on narrow mobile viewports.
- Enlarged central baby card across all breakpoints (`max-w` up to 580px) and elevated on PC viewports so baby Abhimanyu is clearly visible and centered.
- Added natural left-to-right idle swinging to the U-shaped festive bunting garland.
- Accelerated hero balloon floats to travel rapidly and fly all the way up off the screen.
- Removed redundant static top background clouds from landing hero.
- Added up-and-left float to Section 2 orange balloon, up-and-right to green balloon, and outward left/right drift to Section 2 paper clouds.
- Reduced pinning scroll duration by >50% (`end: '+=55%'` mobile, `+=60%'` desktop) to eliminate dead scroll distance and empty gaps between Section 1 and Section 2.
- Set continuous `bg-striped-wallpaper` on `<main>` wrapper to eliminate white spaces during scroll transitions.
- Adjusted Section 2 layout from `justify-content: space-between` to `flex-start` with tight, balanced card spacing.
- Completely removed section pinning (`pin: false`, `end: 'bottom top'`) to allow natural, uninterrupted scroll flow where Section 2 rolls up immediately as the birthday card accelerates into the ceiling, eliminating the empty gap on PC and mobile.
- Added negative top overlap margin to Section 2 for seamless vertical continuity.
- Increased height and width of the central Abhimanyu Krishnan baby photo plaque on mobile (`max-w-[330px]` to `max-w-[360px]`) and desktop (`max-w-[620px]`).
- Connected the top Abhimanyu Krishnan baby photo plaque and "Scroll Down" pill directly to the Rainbow Number "1" Piñata and milestone card via a braided rope into one single continuous hanging mobile assembly, exactly matching the reference design.
- Unified the celebration experience into a single section (`BirthdayHero`), eliminating the separate `BirthdayReveal` section and all disjointed scroll gaps.
- Set `background-attachment: fixed` on the vertical striped celebration wallpaper to keep the background completely static while the hanging mobile and decorations move smoothly over it.
- Preserved physical integrity of the hanging chain during scroll by removing artificial upward translation on the plaque and keeping the scroll CTA intact.
- Guaranteed 100% stationary background using a dedicated `fixed inset-0` wallpaper layer in `App.jsx`, preventing background scrolling across all browsers.
- Restored GSAP upward pull animation on the Abhimanyu Krishnan birthday card plaque and "Scroll Down" CTA button.
- Added celebratory GSAP entrance and sway animations to the Rainbow Number "1" Piñata and "Turning The Big One!" milestone card.
- Fixed balloon animation glitch by decoupling scroll translation from idle wobble using dual wrappers, smoothly gliding balloons aside off the screen.
- Pinned festive bunting garland to top ceiling (`position: sticky; top: 0; z-35`) framing the celebration.
- Adjusted side hanging clouds and stars to slowly and gracefully part to the left and right with downward resistance so they remain clearly visible throughout the scroll.
- Removed intermediate rope piece below "Scroll Down" button and joined the Rainbow Number "1" Piñata directly to the downside of the Scroll Down pill.
- Eliminated vertical displacement offsets (`y`) on the Piñata and milestone card in GSAP so the entire hanging column moves as one unified continuous structure above the background without breaking or separating.
- Implemented multi-layered viewport-level static fixed background on `body`, in `index.html` via `#static-celebration-background`, and in `App.jsx`, ensuring the striped wallpaper remains 100% stationary across all browsers and devices.
- Removed all GSAP animations (scroll tween and idle sway) from the hanging Number "1" Piñata per user request.
- Implemented the "12 Months of Our Little One" memory section styled according to reference `reference/memories-section.jpeg` with colorful playful header, 12 monthly polaroid milestone cards, interactive high-resolution lightbox modal with next/prev navigation, and community memory upload support.
- Eliminated empty vertical gap between the "Turning The Big One!" milestone card and the "12 Months of Our Little One" section by removing artificial upward card translation in GSAP, tightening container padding, and seamlessly connecting the sections via overlapping floor cloud transitions.
- Added photo deletion and undo option (`deleteMemory` and `restoreMemory` in `useMemories.js`, top-right corner delete button on milestone and guest cards in `MemoryGallery.jsx`, lightbox delete action, and upload preview clear/undo button in `UploadSection.jsx`).
- Implemented floating Undo toast notification with 6-second timer to restore deleted photos instantly.
- Added "Bathakkah Invites" branding to `Footer.jsx` featuring official monogram logo (`/logo.png`) and tagline *"your story, beautifully invited"*.
- Adjusted vertical spacing between "Turning the Big One!" milestone card and "12 Months of Our Little One" memories section (`mt-6 sm:mt-8`), introducing the requested subtle, elegant gap.
- Replaced the 12 milestone photos in the "12 Months of Our Little One" memory section with baby Abhimanyu's genuine photos (`1.jpeg` to `12.jpeg` from `reference/` copied into `public/memories/`).
- Removed the trash icon from the "12 Months of Our Little One" milestone cards and lightbox, making the 12-month timeline strictly static and permanent without Supabase connection.
- Preserved Supabase integration and trash/undo deletion functionality exclusively for "Moments Shared with Love" (guest & family memories uploaded through the website).
- Fixed footer visibility issue by adding `relative z-20 w-full` to `Footer.jsx` and setting background layer to `-z-10` in `App.jsx`, resolving CSS stacking context where the fixed striped wallpaper was rendering over the unpositioned footer.
- Cleared orphaned background node process and rebound Vite dev server directly to `http://localhost:3000`.
- Fixed persistent photo deletion issue by integrating `localStorage` deletion persistence layer in `useMemories.js` (`addDeletedId`, `removeDeletedId`, and state initialization filtering), guaranteeing deleted photos never reappear upon page refresh.
- Removed description/taglines from the 12 milestone cards in the "12 Months of Our Little One" section per user request, displaying solely the baby's photo and the month label (e.g., `01 month`, `02 months`), while also removing the generic intro paragraph description for a cleaner, photo-first presentation.
- Fixed milestone photo hover scaling by switching to valid Tailwind `group-hover:scale-110` (from invalid uncompiled `scale-108`), restoring active smooth image zoom on hover while maintaining stationary card boundaries.
- Added "Glossy Photo Sheen" subtle diagonal light shimmer sweep (`bg-gradient-to-r from-transparent via-white/20 to-transparent`) and soft border tint on the photo frame for an attractive photographic effect.
- Implemented celebratory Option B hover pop-ups on the 12-month milestone cards: added a crisp 3px celebratory border outline (`border-3`) cycling through the celebration theme colors (`#4E93CB` blue, `#DE5347` red, `#E5A93C` yellow, `#55A46D` green) and animated party decoration stickers that spring up on hover (festive balloon at top-left, celebration toy drum at bottom-right, and golden star at top-right) with smooth scaling and 0 card displacement.




