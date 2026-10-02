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
