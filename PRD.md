# Product Requirements Document

## Product

Abhimanyu Krishnan — First Birthday Memory Album

## Known Facts

- Child: Abhimanyu Krishnan
- Parents: Praveen and Leeba
- Occasion: First Birthday
- Website type: Static memory album
- Primary purpose: Present photographs and memories beautifully.
- Animations are required.
- React is the intended frontend technology.
- Tailwind CSS or a better styling approach may be used.
- GSAP and/or Framer Motion may be used for animation.

## Product Vision

Create a premium, emotional, visually rich digital memory album that celebrates Abhimanyu Krishnan's first birthday through photographs, storytelling, typography, and carefully designed motion.

## Target Experience

The visitor should feel as though they are moving through a curated visual memory book rather than browsing a conventional website.

## Core Requirements

1. Responsive website.
2. Baby-boy-oriented visual identity.
3. First-birthday celebration theme.
4. Photography-first presentation.
5. Beautiful animated transitions.
6. Memory/photo gallery.
7. Easy way for the developer/client workflow to add new photos to the static project.
8. Fast loading and mobile-friendly behavior.
9. Accessible interaction and reduced-motion consideration.
10. Maintainable project structure.

## Responsive / Reference Requirement

The supplied visual reference is a tall mobile-first composition. The landing experience must be designed mobile-first while also receiving a deliberate desktop/laptop composition. Do not simply scale the mobile artwork up.

The first viewport should reproduce the approved visual storytelling direction through the Scroll Down CTA. Scrolling should reveal the next hanging/pinata-style visual moment with animation.

## Photo Requirement

The project should support a structured local-photo workflow.

Recommended static approach:

- Put photos in `public/memories/`.
- Maintain photo metadata in a local data file.
- Render the gallery from that data.

This makes adding a photo a controlled project change without requiring a backend.

## Supabase Photo Upload Requirement

The user explicitly requested a simple photo upload button with **no login**. Supabase is therefore part of the approved architecture for persistent photo uploads.

The upload feature should be simple and non-admin: choose an image, validate it, upload it to Supabase Storage, store lightweight metadata, and make it available in the memory gallery.

Because there is no login, the upload endpoint is public. This trade-off must be documented and the implementation must restrict accepted file types and size at the application layer.

## Important Clarification: "Add Photos"

There are two different meanings:

### Current approved workflow

The project now supports a **live upload workflow through Supabase** with no login.

The client can use a simple **Add a Memory** upload button. The implementation should keep this unobtrusive and place it where it fits the story best, with the end of the album as the default preferred location unless the final design makes a middle placement more natural.

No authentication is required.

### Static fallback

Developer-managed images can still be bundled in `public/memories/` for initial/default content.

## Out of Scope Unless Requested

- Authentication
- Admin dashboard
- Database
- User accounts
- CMS
- Cloud photo storage
- Guestbook
- Comments
- RSVP
- Payments
- Messaging
- Analytics
- Backend API

## Open Questions

These must be clarified before implementation if they materially affect the result:

- Exact page/section structure
- Exact birthday date, if it should be displayed
- Final photo count
- Final copy/text
- Preferred color palette
- Whether music is required
- Whether video is required
- Whether a countdown is required
- Final deployment platform
- Exact logo/monogram requirements

## Acceptance Criteria

- Site communicates first-birthday memory-album purpose immediately.
- Real supplied photos can be inserted without restructuring the application.
- Animations are smooth and purposeful.
- Mobile layout is intentionally designed, not merely compressed.
- No invented personal information appears.
- Project documentation reflects the final implementation.
- A future developer can understand how the memory gallery and animations work.
