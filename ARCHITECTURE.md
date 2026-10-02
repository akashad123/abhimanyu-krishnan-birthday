# Architecture

## Current Architecture

Static React frontend.

Expected high-level structure:

```text
Browser
  |
  v
React Application
  |
  +-- UI Components
  |
  +-- Sections
  |
  +-- Animation Layer
  |
  +-- Local Memory Data
  |
  +-- Static Image Assets
```

Supabase is used as the backend/storage layer for persistent anonymous photo uploads. The React application remains the primary frontend and there is no authentication.

## Recommended Structure

```text
src/
  components/
  sections/
  data/
  hooks/
  lib/
  styles/

public/
  memories/
  decorations/
```

Exact structure may change if implementation provides a better maintainable approach.

## Memory Data Flow

Recommended:

```text
public/memories/*.webp|jpg|png
        |
        v
memory data/config
        |
        v
MemoryGallery / MemorySection
        |
        v
Animated presentation
```

The memory data should contain only information actually known/approved.

Example conceptual model:

```js
{
  id: "memory-01",
  src: "/memories/example.webp",
  alt: "Approved description",
  caption: "Approved caption"
}
```

Do not fabricate real metadata.

## Supabase Architecture

```text
React Upload UI
      |
      +--> Supabase Storage (`memories` bucket)
      |
      +--> `public.memories` metadata table
      |
      v
Memory Gallery
```

The browser uses the Supabase anonymous/public client credentials only. A service-role key must never be shipped to the browser.

## Photo Storage Decision

### Static/developer-managed photos

Allowed for initial/curated content. Photos live with the website assets and are deployed with the application.

### Runtime client upload

Implemented through Supabase Storage + metadata table. No login is used.

Future authentication/protected storage is NOT included unless explicitly requested.

Potential future protected architecture could include:

```text
Admin/Upload UI
      |
      v
Upload API / Storage SDK
      |
      v
Cloud Object Storage
      |
      v
Database / metadata
      |
      v
Public Gallery
```

Do not implement this architecture unless explicitly requested.

## Animation Architecture

Keep animation logic close to the component/section it controls unless shared behavior justifies a reusable animation utility.

Avoid one giant animation file.

## State

Prefer local React state for simple UI interactions.

Do not add global state management unless a real requirement emerges.

## Dependencies

Use the minimum dependency set needed.

Animation stack:
- **GSAP (`gsap` + `@gsap/react`)**: Selected and configured for timeline/scroll-heavy storytelling, ScrollTrigger sequencing, hanging rope micro-physics, and smooth scroll reveals. Respects user motion preferences via `useReducedMotion`.


## Deployment

Static hosting is expected.

Deployment platform is currently not specified.
