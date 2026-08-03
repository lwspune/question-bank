-- 0066 — where a concept is covered, not just whether it is.
--
-- 0065 gave syllabus_concept_exams a `status` (full | partial | not): a VERDICT.
-- A teacher answering "I have this NCERT section, where is it in my State Board
-- book?" needs a POINTER, which a verdict cannot carry. `covered_by` holds the
-- target section refs as authored, comma-separated, e.g. "11.4, 11.5" or
-- "XI:2.5, XII:1.2" — the XI:/XII: prefix marks a cross-YEAR mapping, which is
-- the common case here (NCERT teaches Thermodynamics in Class 11; the State
-- Board holds it until Std XII).
--
-- Kept as free text rather than a junction table on purpose: the refs are
-- authored per book edition, are read as a unit, and are never joined on in SQL
-- — resolution to titles happens in `src/lib/syllabus/query.ts` against the
-- concept rows of whichever book the row's `exam` column names.
--
-- NOTE: this was applied to production on 2026-08-02 via the Supabase MCP but
-- the file was not written at the time; recreated 2026-08-03 so a fresh
-- checkout reproduces the schema. Idempotent, so re-applying is safe.

alter table public.syllabus_concept_exams
  add column if not exists covered_by text;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.syllabus_concept_exams'::regclass
      and conname = 'syllabus_concept_exams_covered_by_len'
  ) then
    alter table public.syllabus_concept_exams
      add constraint syllabus_concept_exams_covered_by_len
      check (covered_by is null or char_length(covered_by) <= 200);
  end if;
end $$;

comment on column public.syllabus_concept_exams.covered_by is
  'Section refs in the target book, comma-separated. "XI:"/"XII:" prefixes a cross-year ref; bare refs default to the row concept''s own class.';
