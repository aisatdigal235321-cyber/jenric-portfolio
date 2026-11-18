-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run.

-- 1. Projects table: one row per video in your portfolio
create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  category      text not null default 'Commercial',   -- e.g. Commercial, Music Video, UGC, Short Film
  client        text,
  description   text,
  video_url     text not null,                         -- public URL of the video in Storage
  thumbnail_url text,                                  -- optional poster image
  tools         text[] default '{}',                   -- e.g. {Higgsfield, Premiere Pro, After Effects}
  duration      text,                                  -- e.g. 0:30
  aspect_ratio  text default '16:9',                   -- 16:9, 9:16, 1:1
  year          int default extract(year from now()),
  featured      boolean default false,                 -- the featured one plays in the hero
  sort_order    int default 0,
  created_at    timestamptz default now()
);

-- Style decides which section a video appears in: 'realistic' or 'animated' (Pixar-style 3D).
-- Safe to run again on a table you already created.
alter table public.projects
  add column if not exists style text not null default 'realistic'
  check (style in ('realistic', 'animated'));

-- 2. Anyone visiting the site can read projects, nobody can change them from the site
alter table public.projects enable row level security;

drop policy if exists "Public can view projects" on public.projects;
create policy "Public can view projects"
  on public.projects for select
  to anon, authenticated
  using (true);

-- 3. Public storage bucket for videos and thumbnails
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

drop policy if exists "Public can view portfolio files" on storage.objects;
create policy "Public can view portfolio files"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'portfolio');

-- 4. Example row (edit or delete). Replace the URLs with your own from Storage.
-- insert into public.projects (style, title, category, client, description, video_url, thumbnail_url, tools, duration, aspect_ratio, featured, sort_order)
-- values (
--   'realistic', 'Night Market Ad', 'Commercial', 'Personal project',
--   'A 30-second spec ad built from AI-generated stills animated into video, then cut and graded.',
--   'https://YOUR-PROJECT.supabase.co/storage/v1/object/public/portfolio/night-market.mp4',
--   'https://YOUR-PROJECT.supabase.co/storage/v1/object/public/portfolio/night-market.jpg',
--   array['Higgsfield','Premiere Pro'], '0:30', '16:9', true, 1
-- );
