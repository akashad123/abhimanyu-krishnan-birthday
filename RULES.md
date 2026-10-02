# Project Rules

## Scope

This is a static-first first-birthday memory album with Supabase used only for the explicitly requested persistent photo-upload capability.

## Rules

1. Supabase is approved only for the photo upload/storage requirement.
2. Do not add additional backend services or databases beyond the approved Supabase memory storage architecture.
3. Do not invent family information.
4. Do not invent photo captions.
5. Do not use fake client photos as if they were real.
6. Keep animations purposeful.
7. Optimize images.
8. Preserve responsive behavior.
9. Support reduced motion.
10. Reuse components before creating duplicates.
11. Keep code readable for future developers.
12. Update documentation after meaningful changes.
13. Do not add dependencies without a reason.
14. Do not silently change the visual direction.
15. Do not perform large unrelated refactors during feature work.
16. Do not expose a Supabase service-role key in frontend code.
17. The no-login upload flow must validate image type and size before upload.
