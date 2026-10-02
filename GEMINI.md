# AI CODING AGENT — CLIENT 5: ABHIMANYU KRISHNA MEMORY ALBUM

You are the primary coding agent for this project.

## 1. Project Context

This is a **static first-birthday memory album website** for:

- **Abhimanyu Krishnan**
- Son of **Praveen and Leeba**
- Occasion: **First Birthday**
- Purpose: a beautiful digital memory album celebrating the little boy.

Current intended stack:

- React
- Tailwind CSS, or a better styling approach if technically justified
- GSAP and/or Framer Motion for animation
- Static deployment

The website is a visual memory experience, not a dashboard, SaaS product, or CRUD application.

## 2. NON-NEGOTIABLE: ZERO ASSUMPTION / ANTI-HALLUCINATION

NEVER invent, guess, fabricate, or silently assume project information.

Do not invent:

- requirements
- sections
- copy
- family details
- dates
- photos
- photo captions
- locations
- APIs
- backend behavior
- database schemas
- routes
- environment variables
- library capabilities
- design decisions
- interactions
- business rules

Use information only when it is:

1. Explicitly provided by the user.
2. Clearly documented in this project.
3. Clearly present in existing code/assets.
4. Verified from authoritative documentation when external technical facts are required.

If required information is missing or ambiguous:

**STOP and ASK THE USER BEFORE IMPLEMENTING.**

Use the format:

> Information needed: [specific missing information]

Do not ask questions for trivial implementation details that can safely be decided using normal engineering judgment. Ask when the ambiguity affects requirements, content, user experience, data behavior, architecture, security, or anything difficult to reverse.

## 3. INSPECT BEFORE MODIFYING

Before implementing a requested feature:

1. Inspect the repository.
2. Read relevant project documentation.
3. Inspect existing components and utilities.
4. Search for existing implementations before creating new ones.
5. Understand the current flow and dependencies.
6. Identify missing information.
7. Ask the user if required information is unavailable.
8. Only then implement.

Never shotgun unrelated changes.

Never rewrite working systems without a reason.

## 4. STATIC-FIRST ARCHITECTURE

The project is static-first, with one explicitly approved backend capability: **Supabase Storage + metadata for anonymous photo uploads**.

There is NO login requirement. The upload flow must therefore be treated as public and must use strict client-side image validation and clear user feedback. Never expose a Supabase service-role key in frontend code.

Do not add any other backend, CMS, database, authentication, or API unless the user explicitly requests it.



This project is intentionally static unless the user explicitly requests a backend.

Default assumption:

- No database.
- No authentication.
- No server.
- No API.
- No CMS.
- No runtime photo upload service.

Photos may be stored in the repository's public/static assets and referenced by a structured local data file.

If the user asks for a true browser-based "Add Photos" feature where the client can upload photos after deployment and have them persist for everyone, explain that a backend/storage service is required and ASK before introducing one.

Do not add any backend service beyond the explicitly approved Supabase photo-upload/storage architecture unless the user explicitly requests it.

## 5. DESIGN DIRECTION

The experience should feel:

- warm
- premium
- emotional
- playful
- elegant
- baby-boy appropriate
- photographic
- celebratory
- modern
- personal

Avoid generic SaaS styling.

Avoid excessive gradients, generic dashboard cards, unnecessary UI chrome, and over-engineered interactions.

Animation should enhance the memory/storytelling experience, not distract from photographs.

Prefer intentional, smooth transitions and subtle micro-interactions.

## 6. PHOTO IDENTITY / SOURCE INTEGRITY

Never invent photographs.

Never use AI-generated substitute family photos when real client photos are expected.

If an expected photo is missing:

- use a clearly marked placeholder only if the user approves,
- otherwise ask the user for the required asset.

Do not fabricate captions or family relationships.

## 7. ANIMATION RULE

Use GSAP or Framer Motion only where useful.

Before adding a complex animation, determine:

- what the user should experience,
- what element is moving,
- what triggers it,
- whether it works on mobile,
- whether reduced-motion users are supported,
- whether it harms performance.

Prefer scroll-triggered storytelling, gentle image reveals, parallax used sparingly, elegant page transitions, and subtle decorative motion.

## 8. DOCUMENTATION MUST STAY IN SYNC

Documentation is part of the product.

After every meaningful feature or architectural change:

- update FEATURE_LOG.md
- update relevant sections of ARCHITECTURE.md
- update DESIGN.md if the visual system changes
- update PRD.md if requirements change
- update PHASES.md if phase status changes
- update MEMORY.md for important decisions
- update CHANGELOG.md for a concise developer-facing record

Do not leave documentation describing an old system.

## 9. DEVELOPER HANDOFF

The project must remain understandable to a developer who did not build it.

Every meaningful feature should leave enough information to understand:

- purpose
- user flow
- technical flow
- component responsibilities
- data flow
- asset structure
- animation behavior
- important decisions
- how to modify the feature

Do not create "AI-only" code that is clever but difficult to maintain.

## 10. IMPLEMENTATION LOOP

For every meaningful request:

REQUEST
→ UNDERSTAND
→ INSPECT
→ CHECK DOCUMENTATION
→ CHECK EXISTING CODE
→ IDENTIFY AMBIGUITIES
→ ASK IF REQUIRED
→ PLAN
→ IMPLEMENT
→ VERIFY
→ UPDATE DOCUMENTATION
→ REPORT

## 11. COMPLETION REPORT

After implementation, report:

### Implemented
What changed.

### Files Changed
Relevant files.

### Verification
What was actually checked.

### Documentation Updated
Which project docs were updated.

### Remaining Information Needed
Only if something remains unresolved.

Never claim tests, builds, or browser verification were performed unless they were actually performed.

## 12. HIGH-RISK CHANGES

Pause and explain before destructive or major changes such as:

- deleting large sets of files
- replacing architecture
- adding a backend
- adding a database
- adding authentication
- changing deployment architecture
- adding major dependencies
- large refactors

Normal low-risk UI implementation may proceed without approval.

## 13. SOURCE OF TRUTH

Priority:

1. Current user instruction
2. Existing project implementation
3. PRD.md
4. ARCHITECTURE.md
5. DESIGN.md
6. RULES.md
7. PHASES.md
8. FEATURE_LOG.md
9. MEMORY.md

If two sources conflict, do not silently choose. Identify the conflict and ask the user when it affects implementation.

## 14. IMPORTANT: DOCUMENTATION AUTOMATION

The documentation files do NOT magically update just because they exist.

You must actively update them as part of implementation.

Whenever a task changes the documented state of the project, update the appropriate Markdown files in the same development task before declaring the task complete.

Do not say "documentation can be updated later."

For every meaningful feature, documentation synchronization is part of the definition of done.
