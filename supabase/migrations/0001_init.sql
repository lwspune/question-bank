-- Enums
create type role as enum ('ADMIN', 'TEACHER');
create type difficulty as enum ('EASY', 'MODERATE', 'HARD');
create type option_label as enum ('A', 'B', 'C', 'D');
create type upload_status as enum ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- Organizations (tenants)
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

-- Org members (joins to Supabase auth.users)
create table org_members (
  org_id uuid not null references organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role role not null default 'TEACHER',
  created_at timestamptz not null default now(),
  primary key (org_id, user_id)
);
create index org_members_user_id_idx on org_members(user_id);

-- Taxonomy (global, shared across orgs)
create table exams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

create table subjects (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references exams(id) on delete cascade,
  name text not null,
  unique (exam_id, name)
);

create table chapters (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references subjects(id) on delete cascade,
  name text not null,
  order_index int not null default 0,
  unique (subject_id, name)
);

create table subtopics (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references chapters(id) on delete cascade,
  name text not null,
  unique (chapter_id, name)
);

-- Questions (org-scoped)
create table questions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  exam_id uuid not null references exams(id) on delete restrict,
  subject_id uuid not null references subjects(id) on delete restrict,
  chapter_id uuid not null references chapters(id) on delete restrict,
  subtopic_id uuid references subtopics(id) on delete set null,
  context text,
  text text not null,
  difficulty difficulty not null,
  solution text,
  content_hash text not null,
  source_file text,
  source_row int,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  unique (org_id, content_hash)
);
create index questions_filter_idx on questions(org_id, exam_id, subject_id, chapter_id);
create index questions_difficulty_idx on questions(org_id, difficulty);

-- Options (4 per question, exactly one correct)
create table options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references questions(id) on delete cascade,
  label option_label not null,
  text text not null,
  is_correct boolean not null default false,
  unique (question_id, label)
);

-- Upload jobs (audit trail for Excel uploads)
create table upload_jobs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  filename text not null,
  status upload_status not null default 'PENDING',
  total_rows int not null default 0,
  inserted int not null default 0,
  skipped int not null default 0,
  errors_json jsonb,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  finished_at timestamptz
);
create index upload_jobs_org_idx on upload_jobs(org_id, created_at desc);
