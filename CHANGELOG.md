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
- Replaced the abrupt flat horizontal divider between the hero and memory gallery with an organic, multi-layered SVG wave transition based on user reference (`app.haikei.app`), featuring exact matching sky-blue (`#5299D3`) and warm cream (`#FCFAF6`) waves, with "Milestone Photo Album: 12 Months of Our Little One" positioned gracefully on top of the wave.
- Lowered the multi-layered organic wave transition starting position by removing negative top margin from `MemoryGallery.jsx` (`-mt-6 sm:-mt-10 md:-mt-14` -> `pt-2 sm:pt-4 md:pt-6`) and adding balanced bottom padding to `BirthdayHero.css` (`pb-10 sm:pb-14 md:pb-16`), ensuring the "Turning The Big One!" milestone card sits cleanly above the wave and feels like it is standing proud on the striped wallpaper without any overlap.
- Removed the "SCROLL DOWN" indicator pill and ref from the landing page (`BirthdayHero.jsx`) below the baby photo plaque per user request, allowing the rainbow number 1 piñata to connect seamlessly below the plaque.
- Removed the "Explore The Memory Album" scroll link CTA button from the "Turning The Big One!" milestone card, centering the milestone text ("365 days of baby giggles, tiny footsteps, curious eyes, and endless love with Abhimanyu Krishnan") with clean, balanced card borders.
- Softened and slowed down all upward animations in `birthdayHeroAnimation.js`: increased ScrollTrigger scrub smoothing (`scrub: 1.2`), reduced upward scroll balloon displacement (`y: -140` -> `y: -45` and `y: -100` -> `y: -35`), lengthened timeline scroll span (`end: 'bottom 20%'`), and increased idle floating balloon durations (4.8s to 5.4s), making the hero elements rise at a relaxed, gentle, and graceful pace.
- Created dedicated Family Photo Section (`FamilyGallery.jsx`) displaying all 15 genuine client family photos (`Family 1.jpeg` to `Family 15.jpeg` copied and organized into `public/family/family-01.jpeg` .. `family-15.jpeg`).
- Styled Family Photo section with cohesive celebratory elements matching the 12 Months album: multi-colored "FAMILY MOMENTS" header, 3px cycling border outlines, smooth photo zoom, glossy light sheen, and full interactive high-resolution lightbox modal with keyboard and next/previous navigation.
- Relocated the "Album of Baby Abhimanyu — Add a Memory to the Album" upload invitation card and guest memories section into a dedicated component (`CommunityMemories.jsx`), positioned as the final section directly before the Footer per user screenshot and instruction.
- Reconfigured responsive photo grids for both "Milestone Photo Album: 12 Months of Our Little One" and "Family Moments" to show exactly 3 photos per row on desktop PC (`sm:grid-cols-3`) and 2 photos per row on mobile phones (`grid-cols-2`), producing perfectly balanced symmetrical rows (4 rows of 3 for milestones, 5 rows of 3 for family photos) with substantially larger, clearer photo displays across all viewports.
- Integrated multi-layered organic wave transition into `Footer.jsx` based on user's `app.haikei.app` reference, replacing the flat horizontal divider line (`border-t-2 border-theme-rope/20`) before the Footer. Styled with celebratory theme colors (translucent sky-blue `#5299D3`, solid sky-blue `#5299D3`, and footer cream `#F8F5EE`), creating a seamless organic flow from the "Have a Photo of Baby Abhimanyu?" upload section into the Footer.
- Implemented Delete Confirmation Modal dialog ("Yes" / "No" pop-up) in `CommunityMemories.jsx`: clicking the trash icon on a guest memory card or inside the lightbox triggers an accessible confirmation pop-up (`z-[70]`) featuring a warning trash icon, photo thumbnail preview, "No, Keep it", and "Yes, Delete" buttons, with Escape key and backdrop dismissal. Preserved the subsequent floating Undo toast notification.
- Removed the redundant and confusing "Community Memories" pill badge and decorative divider line from `src/sections/CommunityMemories.jsx`, directly transitioning from the Family Moments section into the "Moments Shared with Love" uploaded photo album.
- Updated `FamilyGallery.jsx`: completely removed "Family & Loved Ones" ribbon divider, raised "Family Photo Album" / "FAMILY MOMENTS" title to center of the viewport, removed "scroll to explore family moments" hint text while preserving progress dots, made progress dots and drum items clickable, and added a "Skip to 15th Photo" fast-forward button allowing visitors to instantly skip through to the final photo and continue scrolling.
- Fixed leftover blue-white wallpaper stripes area on mobile phones, iPad minis, and iPad Pros: wrapped album sections in `App.jsx` with `bg-theme-creamLight`, configured `FamilyGallery` with `min-h-screen min-h-[100dvh]` and vertical centering, and explicitly styled GSAP `st.spacer.style.backgroundColor = CREAM` to eliminate background wallpaper bleed during and after pinning.
- Fixed "Skip to 15th Photo" button visibility on PC desktop: resized carousel strip (`VISIBLE_H = 360`, `CARD_H = 150`, `CARD_UNIT = 162`) and tightened section spacing so the entire section (~530px total) fits 100% inside any PC or laptop screen without clipping, and added a companion quick-skip pill in the header.
- Fixed mobile hero physical rope connections in `BirthdayHero.jsx`: joined the central hanging rope all the way to the top ceiling (`top: 0`) through the bunting down to the card bow (eliminating the floating cut-off gap), added a vertical braided rope segment from the bottom of the birthday card directly to the white circular "Scroll Down" button, and connected the button directly into the Piñata rope below it for a finished, seamless hanging mobile experience on mobile devices.

## [2026-10-03] � fix: PC balloons, mobile rope, back-to-1st button, AK logo removal

- **BirthdayHero**: Balloons (red/yellow/blue/green) restored on PC � fixed overflow-y:clip?visible that was clipping them; added proper lg/xl sizing classes
- **BirthdayHero**: Top braided ceiling rope is now lg:hidden (mobile + iPad only). PC already has rope drawn into the card image
- **FamilyGallery**: Added 'Back to 1st Photo' button (with ChevronUp) when activeIdx === total-1; navigates back up via goTo(0)
- **Footer**: Removed AK circular monogram badge � all other footer content preserved
- Build: ? 0 errors, 1650 modules, commit 89dfea6

## [2026-10-03] - feat: remove photo gradients, align header to top on mobile, expand photo height on mobile & tablets

- **FamilyGallery**: Removed top and bottom fade gradient overlays from the photo strip so photos render crisp and clean without white overlays
- **FamilyGallery**: Positioned the 'Family Photo Album' header at the top of the mobile screen (justify-start pt-3), eliminating excess top whitespace
- **FamilyGallery**: Expanded photo card height on mobile (< 640px) to dynamically adapt up to 490px and on tablet/iPad up to 520px, while strictly maintaining the existing 330/360px layout on desktop PC
- Build: verified clean build with 0 errors

## [2026-10-03] - fix: eliminate mobile scroll photo jumping bug in FamilyGallery

- **FamilyGallery**: Eliminated mobile scroll photo jumping/sliding bug by rendering photos inside a stationary stationary frame that smoothly cross-fades in place on mobile/tablet instead of sliding a 7,650px track
- **FamilyGallery**: Disabled anticipatePin on mobile to eliminate premature scroll jumps when transitioning from Milestone Photo Album into Family Moments
- **FamilyGallery**: Disabled touch-conflicting snap on mobile viewports while keeping desktop snap and vertical drum scroll intact
- Build: verified clean build with 0 errors

## [2026-10-03] - feat: implement 12-month desk calendar carousel from reference image

- **MemoryGallery**: Recreated the desk stand flip calendar carousel faithfully matching client reference \eference/abi-12month-ref.jpeg\`n- **Visuals**: Added 10 metallic golden spiral binding rings, wooden easel desk stand, framed baby photo with crown/heart stickers, cute teddy bear illustration, large bold month counter, and miniature monthly calendar days grid
- **Interactivity**: Smooth 3D page flip animation, circular arrow navigation buttons (< and >), keyboard arrow navigation, touch swipe support for mobile/tablet, quick month jump bar (1m to 12m), and full-size photo lightbox modal
- Scope: Only \src/sections/MemoryGallery.jsx\ modified per explicit user instruction to prevent regressions
- Build: verified clean build with 0 errors

## [2026-10-03] - feat: background music with auto-pause on app close, family gallery navigation stability, and baby photo upload card

- **BackgroundMusic**: Added floating music player with Web Audio API celebratory music box chime, complete with automatic pause on mobile app close, tab minimize, or screen lock via \isibilitychange\ and \pagehide\`n- **FamilyGallery**: Fixed 15th photo and 1st photo navigation overlapping/interlapping bug by bounding target scroll inside the pin span and instantly setting active index, preventing premature unpinning
- **CommunityMemories**: Raised the section directly to the ending of Family Moments on mobile, closing the dead gap after the 15th photo
- **CommunityMemories**: Added framed photo of Baby Abhimanyu with camera badge on the \Have a Photo of Baby Abhimanyu? Add a Memory to the Album\ card
- Build: verified clean build with 0 errors

## [2026-10-03] - fix: complete resolution of beginning and end boundary bugs in FamilyGallery

- **FamilyGallery (Scroll Lifecycle)**: Added complete onEnter, onLeave, onEnterBack, and onLeaveBack callbacks to ensure active index is rock-solid when entering or re-entering from either direction
- **FamilyGallery (Step Distribution)**: Replaced asymmetric Math.round() with uniform Math.floor(p * total) mapping, giving all 15 photos (especially the 1st and 15th) equal, generous scroll durations without premature unpinning
- **FamilyGallery (Navigation & Skip)**: Added isNavigatingRef scroll-lock and instant behavior: 'auto' positioning safely at exact interval centers (idx + 0.5) / total, eliminating the 6,000px smooth-scroll momentum overshoot, unpin flicker, and intermediate photo flashing
- **FamilyGallery (Mobile Resize & Stability)**: Enabled ScrollTrigger.config({ ignoreMobileResize: true }) to eliminate address bar hide/show jitter on mobile devices; set anticipatePin: 0, snap: false, and removed preventOverlaps and fastScrollEnd
- **FamilyGallery (Preloading & Lightbox)**: Preloaded all 15 authentic family photos into browser memory with loading='eager' and decoding='async'; imported missing Heart icon to prevent lightbox runtime crash
- Build: verified clean build with 0 errors (1,651 modules in 14.17s)

## [2026-10-03] - fix: enforce uniform 4:3 photo frame size across all 12 monthly milestones

- **MemoryGallery (Uniform Photo Frame)**: Fixed photo frame sizing fluctuation where portrait photos (Month 1, 2, 12) rendered taller and landscape photos (Month 4, 5) shrank / stringed; corrected arbitrary Tailwind bracket syntax to `aspect-[4/3]` and added inline `style={{ aspectRatio: '4 / 3' }}` to guarantee standard, identical dimensions across all 12 calendar pages
- **Initial Memories (Focal Coordinates)**: Added calibrated `objectPosition` coordinates to each milestone in `MONTHLY_MILESTONES` so Baby Abhimanyu's face and features are beautifully centered in the uniform 4:3 frame without clipping
- Build: verified clean build with 0 errors (1,651 modules in 12.80s)
