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
