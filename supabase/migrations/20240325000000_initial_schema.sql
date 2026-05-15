-- 20240325000000_initial_schema.sql

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. Categories Table (Update)
alter table categories add column if not exists color text default '#0066FF';

-- 2. Tags Table
create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz default now()
);

-- 3. Posts Table (Update/Create)
-- Since the existing table has a different structure, we'll ensure columns match the request.
alter table posts add column if not exists featured_image_alt text;
alter table posts add column if not exists author_name text default 'Agbasionwe Emmanuel Chiemelie';
alter table posts add column if not exists status text default 'draft'; -- draft, published, scheduled
alter table posts add column if not exists is_featured boolean default false;
alter table posts add column if not exists helpful_yes integer default 0;
alter table posts add column if not exists helpful_no integer default 0;
alter table posts add column if not exists seo_title text;
alter table posts add column if not exists seo_description text;
alter table posts add column if not exists canonical_url text;
alter table posts add column if not exists og_image text;
alter table posts add column if not exists focus_keyword text;
alter table posts add column if not exists scheduled_at timestamptz;
alter table posts add column if not exists published_at timestamptz;
alter table posts add column if not exists updated_at timestamptz default now();

-- Handle renaming or mapping if necessary, but the user provided a full schema.
-- We'll keep existing columns for now to avoid data loss, but ensure the new ones are there.
-- If 'featured' existed, map it to 'is_featured'
do $$ 
begin 
  if exists (select 1 from information_schema.columns where table_name='posts' and column_name='featured') then
    update posts set is_featured = featured;
  end if;
end $$;

-- 4. Post Tags Junction
create table if not exists post_tags (
  post_id uuid references posts(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

-- 5. FAQs Table
create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  question text not null,
  answer text not null,
  order_index integer default 0,
  created_at timestamptz default now()
);

-- 6. Comments Table (Update)
alter table comments add column if not exists parent_id uuid references comments(id);
alter table comments add column if not exists author_email text;
alter table comments add column if not exists status text default 'pending'; -- pending, approved, spam

-- 7. Page Views Log
create table if not exists page_views (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  ip_hash text,
  user_agent text,
  viewed_at timestamptz default now()
);

-- 8. Media Library
create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  url text not null,
  size integer,
  width integer,
  height integer,
  alt_text text,
  uploaded_at timestamptz default now()
);

-- 9. Newsletter Subscribers
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  status text default 'active',
  subscribed_at timestamptz default now()
);

-- 10. Settings Table
create table if not exists settings (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);

-- Enable RLS on all new tables
alter table tags enable row level security;
alter table post_tags enable row level security;
alter table faqs enable row level security;
alter table page_views enable row level security;
alter table media enable row level security;
alter table subscribers enable row level security;
alter table settings enable row level security;

-- RLS Policies

-- Posts: Public can view published posts
create policy "Public can view published posts" on posts
  for select using (status = 'published');

create policy "Admins have full access to posts" on posts
  for all to authenticated using (true);

-- Categories: Public can view
create policy "Public can view categories" on categories
  for select using (true);

create policy "Admins have full access to categories" on categories
  for all to authenticated using (true);

-- Tags: Public can view
create policy "Public can view tags" on tags
  for select using (true);

create policy "Admins have full access to tags" on tags
  for all to authenticated using (true);

-- Post Tags: Public can view
create policy "Public can view post_tags" on post_tags
  for select using (true);

create policy "Admins have full access to post_tags" on post_tags
  for all to authenticated using (true);

-- FAQs: Public can view
create policy "Public can view faqs" on faqs
  for select using (true);

create policy "Admins have full access to faqs" on faqs
  for all to authenticated using (true);

-- Comments: Public can view approved, anyone can insert
create policy "Public can view approved comments" on comments
  for select using (status = 'approved');

create policy "Anyone can insert comments" on comments
  for insert with check (true);

create policy "Admins have full access to comments" on comments
  for all to authenticated using (true);

-- Page Views: Anyone can insert, only admins can view
create policy "Anyone can insert page views" on page_views
  for insert with check (true);

create policy "Admins can view page views" on page_views
  for select to authenticated using (true);

-- Media: Public can view, admins can CRUD
create policy "Public can view media" on media
  for select using (true);

create policy "Admins can manage media" on media
  for all to authenticated using (true);

-- Subscribers: Anyone can subscribe, admins can manage
create policy "Anyone can subscribe" on subscribers
  for insert with check (true);

create policy "Admins can manage subscribers" on subscribers
  for all to authenticated using (true);

-- Settings: Public can view, admins can manage
create policy "Public can view settings" on settings
  for select using (true);

create policy "Admins can manage settings" on settings
  for all to authenticated using (true);