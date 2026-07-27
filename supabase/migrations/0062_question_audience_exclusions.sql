-- 0062 — cross-exam syllabus-fit screen (EXCLUSION list).
--
-- Records JEE Mains questions that a student taught the NDA ∪ CET syllabus
-- CANNOT solve, because the question demands a technique neither syllabus
-- teaches (similarity/conjugation, 3x3 Cayley-Hamilton, eigenvalues, ...).
--
-- Deliberately an exclusion list, not a verdict-per-question table: the union
-- of the two syllabi covers nearly all of JEE Maths, so ~95% of questions pass
-- and only the failures carry information (12 of 251 in the first chapter
-- screened). "Which chapters have been adjudicated at all" is NOT stored here
-- -- it lives in src/lib/relevance/config.ts (REVIEWED_CHAPTERS), so that
-- "passed" and "never looked at" stay distinguishable.

create table if not exists public.question_audience_exclusions (
  question_id   uuid        not null references public.questions(id) on delete cascade,
  -- Cohort slug. One today ('nda-cet'); the column exists so a second cohort
  -- (NDA-only, CET-only) needs no migration -- verdicts do NOT transfer between
  -- cohorts, since a tool taught by only one exam passes the union and fails
  -- the singleton.
  audience      text        not null default 'nda-cet',
  -- Which out-of-syllabus technique the question requires. Free text rather
  -- than a CHECK'd enum: the tool list grows per chapter screened, and a DB
  -- enum would mean a migration per chapter. Validated against
  -- src/lib/relevance/config.ts BLOCKING_TOOLS by the commit script.
  blocking_tool text        not null,
  note          text,
  created_at    timestamptz not null default now(),
  primary key (question_id, audience),
  constraint question_audience_exclusions_audience_len
    check (char_length(audience) between 1 and 40),
  constraint question_audience_exclusions_tool_len
    check (char_length(blocking_tool) between 1 and 60),
  constraint question_audience_exclusions_note_len
    check (note is null or char_length(note) <= 500)
);

comment on table public.question_audience_exclusions is
  'JEE questions NOT answerable on a given cohort''s syllabus. Exclusion list; reviewed scope lives in src/lib/relevance/config.ts.';

-- The /browse filter reads every exclusion for one audience.
create index if not exists question_audience_exclusions_audience_idx
  on public.question_audience_exclusions (audience);

alter table public.question_audience_exclusions enable row level security;

-- Read: open to everyone. This is metadata about PUBLIC questions and the
-- filter is a public /browse control, so there is nothing to withhold.
drop policy if exists question_audience_exclusions_read on public.question_audience_exclusions;
create policy question_audience_exclusions_read
  on public.question_audience_exclusions
  for select
  using (true);

-- Write: superadmin only, matching every other CONTENT write since 0056.
-- Note this is can_edit_CONTENT (superadmin) and NOT can_edit_questions
-- (admin OR teacher, which gates paper building) -- do not conflate them.
drop policy if exists question_audience_exclusions_write on public.question_audience_exclusions;
create policy question_audience_exclusions_write
  on public.question_audience_exclusions
  for all
  using (private.current_user_can_edit_content())
  with check (private.current_user_can_edit_content());
