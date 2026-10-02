# Project Memory

This file contains important accumulated project decisions.

## Confirmed

- Project is a static first-birthday memory album.
- Child: Abhimanyu Krishnan.
- Parents: Praveen and Leeba.
- React is the intended frontend technology.
- Tailwind CSS or a better styling approach may be used.
- GSAP and/or Framer Motion may be used.
- Animations are required.
- Photography and memories are the core experience.
- Supabase is approved for persistent photo uploads.
- No login/authentication is required for the upload flow.
- The upload interface should be simple and unobtrusive.

## Important Decisions

- Supabase is the approved persistence layer for uploaded memory photos.
- Public/no-login uploads are an explicit requirement and therefore carry a documented abuse/spam trade-off.
- The supplied reference is mobile-first and should drive the opening visual language without being stretched onto desktop.
- Styling rule exception: Rounded/pill borders, scalloped badge motifs, and soft playful shapes are explicitly approved to match the baby-theme visual reference; sharp square corners are not enforced.
- Scaffolding stack chosen: React 18 + Vite + Tailwind CSS + GSAP.
- Remote repository configured: `https://github.com/akashad123/abhimanyu-krishnan-birthday.git`.

## Resolved Questions

- **Border radius**: Confirmed that rounded/pill borders, scalloped badges, and soft playful shapes guide the visual language rather than sharp 0-radius borders.
- **Missing Docs/Skills**: Confirmed to proceed using existing project documentation and standard tooling without waiting for additional custom skills.
- **Supabase credentials**: Will be provided by user when ready; app runs with graceful fallback when credentials are not yet supplied.
- **Visual progression**: First viewport represents visual experience up to the "Scroll Down" element; scrolling reveals the hanging "1" piñata as the next visual moment.

## Do Not Assume

If a detail is not recorded here, PRD.md, DESIGN.md, ARCHITECTURE.md, RULES.md, or the existing implementation, do not treat it as confirmed.
