-- Abhimanyu Krishnan Memory Album
-- Supabase setup for anonymous photo uploads.
-- IMPORTANT: No login is used. Anyone who can access the upload UI can submit a photo.

create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  public_url text,
  caption text,
  created_at timestamptz not null default now()
);

alter table public.memories enable row level security;

create policy "public can read memories"
on public.memories
for select
to anon, authenticated
using (true);

create policy "public can create memories"
on public.memories
for insert
to anon, authenticated
with check (true);

create policy "public can delete memories"
on public.memories
for delete
to anon, authenticated
using (true);

-- Create the bucket from the Supabase Dashboard if your project does not
-- support bucket creation through SQL in your environment.
-- Bucket name: memories
-- Public: ON (required for simple public gallery URLs)

-- Storage policies: intentionally open for this no-login requirement.
-- Restrict the client UI to image/* and enforce a file-size limit in code.
create policy "public can upload memory images"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'memories');

create policy "public can view memory images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'memories');

create policy "public can delete memory images"
on storage.objects
for delete
to anon, authenticated
using (bucket_id = 'memories');
