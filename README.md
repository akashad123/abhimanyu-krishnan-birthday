# Freelance Client 5 — Abhimanyu Krishnan

Static-first first-birthday memory album with Supabase-backed anonymous photo uploads.

## Start Here

Read:

1. `GEMINI.md`
2. `PRD.md`
3. `DESIGN.md`
4. `ARCHITECTURE.md`
5. `RULES.md`
6. `PHASES.md`
7. `DOCUMENTATION_PROTOCOL.md`

Then inspect the actual source/assets before coding.

## Key Requirement

This is a static memory album for Abhimanyu Krishnan's first birthday, son of Praveen and Leeba.

## Photo Upload Architecture

The current requirement is: **simple upload button, no login**.

Supabase is approved for this specific requirement. Uploaded photos are stored in a public `memories` bucket and lightweight metadata is stored in `public.memories`.

Because there is no login, uploads are public. The UI must validate image type and size and provide clear feedback.

Setup instructions are in `docs/SUPABASE_SETUP.md`.

## Documentation

The project uses Markdown files as its human-readable system knowledge.

The AI agent must update relevant documentation after meaningful implementation changes.

Important: the files do not update themselves merely by existing. The agent must perform the synchronization step defined in `GEMINI.md` and `DOCUMENTATION_PROTOCOL.md`.
