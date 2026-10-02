# Documentation Synchronization Protocol

## Purpose

The Markdown files are project knowledge, not decoration.

They must remain synchronized with the actual codebase.

## Important Limitation

Markdown files alone do not automatically update themselves.

The AI coding agent must be explicitly instructed to update them after implementation. `GEMINI.md` contains that instruction.

If Antigravity provides an automation/hook mechanism in the future, it may be used to enforce this protocol. Until then, documentation synchronization is an agent workflow requirement.

## Required Updates

### New Feature

Update:

- FEATURE_LOG.md
- ARCHITECTURE.md if technical flow changed
- DESIGN.md if visual behavior changed
- PRD.md if requirements changed
- MEMORY.md if an important decision was made

### Architecture Change

Update:

- ARCHITECTURE.md
- FEATURE_LOG.md
- MEMORY.md

### Requirement Change

Update:

- PRD.md
- PHASES.md if development sequence changes
- FEATURE_LOG.md if already implemented behavior changes

### Design Change

Update:

- DESIGN.md
- FEATURE_LOG.md

### Phase Progress

Update:

- PHASES.md

## Definition of Done

A meaningful feature is NOT complete until:

1. Code is implemented.
2. Relevant verification is performed.
3. Documentation is synchronized.
4. The final response reports what changed.
