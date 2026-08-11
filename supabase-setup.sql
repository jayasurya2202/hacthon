-- Run this in Supabase SQL editor
create extension if not exists "pgcrypto";

create table if not exists assessments (
  id uuid default gen_random_uuid() primary key,
  company_name text not null,
  score int not null,
  comment text,
  estimated_weekly_income text,
  contact_email text,
  created_at timestamptz default now()
);
