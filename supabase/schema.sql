-- Jalankan di Supabase SQL Editor setelah meninjau kebijakan akses.
create extension if not exists pgcrypto;

create type public.order_status as enum (
  'pending_payment',
  'proof_uploaded',
  'paid',
  'cancelled'
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_date date,
  location text,
  sport text,
  description text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.photos (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  preview_key text not null,
  original_key text not null,
  price_idr integer not null check (price_idr >= 0),
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  buyer_name text not null,
  buyer_email text not null,
  buyer_phone text,
  total_idr integer not null check (total_idr >= 0),
  status public.order_status not null default 'pending_payment',
  proof_key text,
  paid_at timestamptz,
  admin_note text,
  created_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  photo_id uuid not null references public.photos(id),
  unit_price_idr integer not null check (unit_price_idr >= 0),
  unique(order_id, photo_id)
);

-- Private storage buckets must be created in Supabase Storage:
-- `photo-previews` (read access can be public if every image is watermarked),
-- `photo-originals` (PRIVATE; never enable public access),
-- `payment-proofs` (PRIVATE; admin-only access).
-- IMPORTANT: Do not expose the service-role key in browser code.
-- Do not permit customers to update orders.status or paid_at.
-- Production order creation, proof upload, payment approval, and signed download URLs
-- must run through authenticated server-side handlers with validation and rate limits.
