-- ============================================================
-- SparkApp Database Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ============================================================
-- CONTENT TABLES (managed by admin)
-- ============================================================

create table if not exists programs (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  subject      text not null,
  grade        text not null,           -- e.g. "Grade 8"
  state        text not null,           -- e.g. "Texas"
  county       text not null,           -- e.g. "Fort Bend County"
  district     text,                    -- e.g. "Fort Bend ISD"
  description  text,
  source_url   text,
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists study_days (
  id                   uuid primary key default gen_random_uuid(),
  program_id           uuid not null references programs(id) on delete cascade,
  day_number           int not null check (day_number between 1 and 30),
  week_number          int not null check (week_number between 1 and 5),
  title                text not null,
  topic                text not null,
  overview             text,
  key_concepts         jsonb not null default '[]',   -- array of strings
  learning_objectives  jsonb not null default '[]',   -- array of strings
  created_at           timestamptz not null default now(),
  unique (program_id, day_number)
);

create table if not exists resources (
  id            uuid primary key default gen_random_uuid(),
  study_day_id  uuid not null references study_days(id) on delete cascade,
  title         text not null,
  url           text not null,
  resource_type text not null check (resource_type in ('video','article','interactive','pdf','website')),
  source        text not null,    -- e.g. "Khan Academy", "CK-12", "NASA"
  description   text,
  order_index   int not null default 0,
  created_at    timestamptz not null default now()
);

create table if not exists quiz_questions (
  id             uuid primary key default gen_random_uuid(),
  study_day_id   uuid not null references study_days(id) on delete cascade,
  question       text not null,
  question_type  text not null check (question_type in ('single','mcq','true_false')),
  options        jsonb not null default '[]',   -- array of { id, text }
  correct_answer jsonb not null,                -- for single/true_false: string; for mcq: array of strings
  explanation    text,
  points         int not null default 10,
  order_index    int not null default 0,
  created_at     timestamptz not null default now()
);

create table if not exists experiments (
  id           uuid primary key default gen_random_uuid(),
  study_day_id uuid not null references study_days(id) on delete cascade,
  title        text not null,
  description  text,
  materials    jsonb not null default '[]',  -- array of strings
  steps        jsonb not null default '[]',  -- array of strings
  safety_notes text,
  bonus_points int not null default 25,
  created_at   timestamptz not null default now()
);

create table if not exists achievement_levels (
  id          uuid primary key default gen_random_uuid(),
  program_id  uuid not null references programs(id) on delete cascade,
  name        text not null,          -- e.g. "Super-Achiever"
  min_points  int not null default 0,
  badge_icon  text not null default '🏆',
  description text,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- USER TABLES
-- ============================================================

create table if not exists enrollments (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  program_id  uuid not null references programs(id) on delete cascade,
  enrolled_at timestamptz not null default now(),
  unique (user_id, program_id)
);

create table if not exists user_progress (
  id                       uuid primary key default gen_random_uuid(),
  user_id                  uuid not null references auth.users(id) on delete cascade,
  program_id               uuid not null references programs(id) on delete cascade,
  study_day_id             uuid not null references study_days(id) on delete cascade,
  is_lesson_complete       boolean not null default false,
  lesson_completed_at      timestamptz,
  quiz_score               int,                  -- raw points awarded from quiz
  quiz_max_points          int,                  -- total possible quiz points
  quiz_completed_at        timestamptz,
  experiment_completed     boolean not null default false,
  experiment_completed_at  timestamptz,
  experiment_bonus_points  int not null default 0,
  total_points             int not null default 0,
  updated_at               timestamptz not null default now(),
  unique (user_id, study_day_id)
);

-- User profiles (extends auth.users)
create table if not exists profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  is_admin     boolean not null default false,
  created_at   timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists idx_study_days_program on study_days(program_id, day_number);
create index if not exists idx_resources_day on resources(study_day_id, order_index);
create index if not exists idx_quiz_questions_day on quiz_questions(study_day_id, order_index);
create index if not exists idx_experiments_day on experiments(study_day_id);
create index if not exists idx_achievement_levels_program on achievement_levels(program_id, min_points);
create index if not exists idx_enrollments_user on enrollments(user_id);
create index if not exists idx_user_progress_user_program on user_progress(user_id, program_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table programs           enable row level security;
alter table study_days         enable row level security;
alter table resources          enable row level security;
alter table quiz_questions     enable row level security;
alter table experiments        enable row level security;
alter table achievement_levels enable row level security;
alter table enrollments        enable row level security;
alter table user_progress      enable row level security;
alter table profiles           enable row level security;

-- Profiles
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Content tables: readable by all authenticated users
create policy "Authenticated users can read programs"
  on programs for select to authenticated
  using (is_published = true or (select is_admin from profiles where id = auth.uid()));

create policy "Admins can manage programs"
  on programs for all to authenticated
  using ((select is_admin from profiles where id = auth.uid()))
  with check ((select is_admin from profiles where id = auth.uid()));

create policy "Authenticated users can read study_days"
  on study_days for select to authenticated using (true);
create policy "Admins can manage study_days"
  on study_days for all to authenticated
  using ((select is_admin from profiles where id = auth.uid()))
  with check ((select is_admin from profiles where id = auth.uid()));

create policy "Authenticated users can read resources"
  on resources for select to authenticated using (true);
create policy "Admins can manage resources"
  on resources for all to authenticated
  using ((select is_admin from profiles where id = auth.uid()))
  with check ((select is_admin from profiles where id = auth.uid()));

create policy "Authenticated users can read quiz_questions"
  on quiz_questions for select to authenticated using (true);
create policy "Admins can manage quiz_questions"
  on quiz_questions for all to authenticated
  using ((select is_admin from profiles where id = auth.uid()))
  with check ((select is_admin from profiles where id = auth.uid()));

create policy "Authenticated users can read experiments"
  on experiments for select to authenticated using (true);
create policy "Admins can manage experiments"
  on experiments for all to authenticated
  using ((select is_admin from profiles where id = auth.uid()))
  with check ((select is_admin from profiles where id = auth.uid()));

create policy "Authenticated users can read achievement_levels"
  on achievement_levels for select to authenticated using (true);
create policy "Admins can manage achievement_levels"
  on achievement_levels for all to authenticated
  using ((select is_admin from profiles where id = auth.uid()))
  with check ((select is_admin from profiles where id = auth.uid()));

-- Enrollments: users manage their own
create policy "Users can view own enrollments"
  on enrollments for select using (auth.uid() = user_id);
create policy "Users can enroll themselves"
  on enrollments for insert with check (auth.uid() = user_id);
create policy "Users can unenroll themselves"
  on enrollments for delete using (auth.uid() = user_id);
create policy "Admins can view all enrollments"
  on enrollments for select to authenticated
  using ((select is_admin from profiles where id = auth.uid()));

-- User progress: strict user isolation
create policy "Users can view own progress"
  on user_progress for select using (auth.uid() = user_id);
create policy "Users can insert own progress"
  on user_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress"
  on user_progress for update using (auth.uid() = user_id);
create policy "Admins can view all progress"
  on user_progress for select to authenticated
  using ((select is_admin from profiles where id = auth.uid()));
