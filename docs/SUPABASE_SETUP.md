# Supabase Setup — Anonymous Memory Uploads

## Why Supabase is used

The website is still a React frontend, but uploaded photos must persist after the browser is closed and be visible to future visitors. That requires persistent cloud storage.

Supabase provides:

- Storage for the actual image files.
- A `memories` table for lightweight metadata.
- Public read access for the gallery.
- Anonymous upload access because the user explicitly requested **no login**.

## Important security/UX trade-off

Because there is no login, the upload endpoint is intentionally public. Anyone who can reach the upload interface can submit an image.

The implementation should therefore include:

- image MIME/type validation
- client-side file-size limit
- clear upload errors
- upload progress/feedback
- generated unique filenames
- no executable file types
- no HTML/SVG uploads unless explicitly approved

If the client later wants private/family-only uploads, authentication or a protected upload mechanism must be introduced.

## Setup

1. Create a Supabase project.
2. Create a Storage bucket named `memories` and make it public for the current public-gallery requirement.
3. Run `supabase/schema.sql` in the SQL editor.
4. Copy `.env.example` to `.env`.
5. Add the project's Supabase URL and anon key.
6. Never put a service-role key in the React application.

## Upload flow

```text
Visitor
  ↓
Add a Memory
  ↓
Select image
  ↓
Validate image
  ↓
Supabase Storage: memories bucket
  ↓
Create metadata row
  ↓
Gallery refresh
```

## No login

Do not add an authentication screen unless the user explicitly requests one.
