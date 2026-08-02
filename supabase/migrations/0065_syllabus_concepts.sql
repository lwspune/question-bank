-- 0065 — syllabus concept map + per-exam applicability.
--
-- WHY THIS IS NOT chapters/subtopics: those tables are the BANK's taxonomy —
-- a subtopic exists there only because we own questions filed under it, and the
-- tree is per-exam. This table is the SYLLABUS as stated, independent of whether
-- any question exists. That difference is the whole point: "in the syllabus and
-- we have nothing" is a gap, and the bank taxonomy structurally cannot express it.
--
-- Spine = the Maharashtra State Board Std XI + XII Chemistry textbooks (the books
-- actually taught), captured at the books' own numbered-section grain. Other
-- subjects/sources can be added without a migration — `subject` and `source` are
-- plain columns, not enums.

create table if not exists public.syllabus_concepts (
  id           uuid        primary key default gen_random_uuid(),
  -- 11 or 12. Kept as a number, not a text label, so ordering is natural.
  class        smallint    not null,
  subject      text        not null,
  -- Which syllabus document/book this concept was read out of.
  source       text        not null default 'MH State Board',
  chapter_no   smallint    not null,
  chapter_name text        not null,
  -- The book's own printed section number ('1.2.3'). Text, not numeric: the
  -- books skip numbers and use lettered suffixes, and it must stay findable
  -- in the physical book.
  section_no   text        not null,
  concept      text        not null,
  -- Reading order within (source, class).
  seq          integer     not null,
  created_at   timestamptz not null default now(),
  constraint syllabus_concepts_class_chk    check (class between 9 and 12),
  constraint syllabus_concepts_subject_len  check (char_length(subject) between 1 and 60),
  constraint syllabus_concepts_source_len   check (char_length(source) between 1 and 60),
  constraint syllabus_concepts_section_len  check (char_length(section_no) between 1 and 20),
  constraint syllabus_concepts_concept_len  check (char_length(concept) between 1 and 300),
  -- Re-running the seed must not duplicate a concept.
  constraint syllabus_concepts_uniq unique (source, class, subject, section_no)
);

comment on table public.syllabus_concepts is
  'Syllabus-as-stated concept map (State Board Std XI/XII Chemistry spine). Independent of the question bank: a concept exists here whether or not any question does.';

create index if not exists syllabus_concepts_lookup_idx
  on public.syllabus_concepts (subject, class, chapter_no, seq);

-- Per-exam applicability of a concept.
--
-- THE LOAD-BEARING RULE: the ABSENCE of a row means NOT YET ASSESSED — it does
-- NOT mean "out of syllabus". "Out of syllabus" is recorded explicitly as
-- status='not'. Collapsing those two states would make an unreviewed exam look
-- like it needs nothing, which is exactly the failure 0062 was shaped to avoid.
create table if not exists public.syllabus_concept_exams (
  concept_id uuid        not null references public.syllabus_concepts(id) on delete cascade,
  -- Syllabus authority: 'NDA', 'JEE Mains', 'MHT-CET', 'CBSE Class 12',
  -- 'MH State Board'. Free text rather than an FK to exams(): a syllabus
  -- authority is not always a bank exam, and the list grows by review pass,
  -- not by migration. Validated by the seed script.
  exam       text        not null,
  -- full    = in the exam's syllabus as taught here
  -- partial = only some of the concept is required, or it is met elsewhere
  --           (e.g. CET meets concentration terms in the Std XII Solutions chapter)
  -- not     = explicitly reviewed and out of syllabus
  status     text        not null,
  note       text,
  created_at timestamptz not null default now(),
  primary key (concept_id, exam),
  constraint syllabus_concept_exams_status_chk check (status in ('full', 'partial', 'not')),
  constraint syllabus_concept_exams_exam_len   check (char_length(exam) between 1 and 40),
  constraint syllabus_concept_exams_note_len   check (note is null or char_length(note) <= 500)
);

comment on table public.syllabus_concept_exams is
  'Per-exam applicability of a syllabus concept. NO ROW = not yet assessed; out-of-syllabus is the explicit status ''not''.';

create index if not exists syllabus_concept_exams_exam_idx
  on public.syllabus_concept_exams (exam, status);

alter table public.syllabus_concepts      enable row level security;
alter table public.syllabus_concept_exams enable row level security;

-- Read: open. This is public syllabus reference data with nothing to withhold.
drop policy if exists syllabus_concepts_read on public.syllabus_concepts;
create policy syllabus_concepts_read
  on public.syllabus_concepts for select using (true);

drop policy if exists syllabus_concept_exams_read on public.syllabus_concept_exams;
create policy syllabus_concept_exams_read
  on public.syllabus_concept_exams for select using (true);

-- Write: superadmin only, matching every CONTENT write since 0056. This is
-- can_edit_CONTENT (superadmin), NOT can_edit_questions (admin OR teacher,
-- which gates paper building) — do not conflate them.
drop policy if exists syllabus_concepts_write on public.syllabus_concepts;
create policy syllabus_concepts_write
  on public.syllabus_concepts for all
  using (private.current_user_can_edit_content())
  with check (private.current_user_can_edit_content());

drop policy if exists syllabus_concept_exams_write on public.syllabus_concept_exams;
create policy syllabus_concept_exams_write
  on public.syllabus_concept_exams for all
  using (private.current_user_can_edit_content())
  with check (private.current_user_can_edit_content());
