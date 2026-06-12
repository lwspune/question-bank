-- Distinguish PYQ questions from practice questions.
--
-- The product is PYQ-first ("PYQ Vault"): /browse, the paper builder, guides,
-- notes, and the quiz factory all assume the corpus is past-year questions.
-- PYQ-ness was, until now, only implied by `pyq_year IS NOT NULL` — fragile,
-- because it conflates "practice" with "a PYQ whose year we don't know".
--
-- This column makes the distinction explicit so we can ingest non-PYQ practice
-- banks (e.g. the NDA Maths practice book) without polluting PYQ counts or any
-- downstream PYQ-only surface. New rows default to 'pyq', so every existing
-- row + every existing ingest path (Excel upload, sync, JEE) is unchanged.
-- Practice ingests set 'practice' explicitly (a post-commit UPDATE by
-- upload_job_id, mirroring how JEE sets visibility).
create type question_kind as enum ('pyq', 'practice');

alter table questions
  add column question_kind question_kind not null default 'pyq';

comment on column questions.question_kind is
  'Whether this is a past-year question (default) or a practice question. PYQ-only surfaces (guides, notes, quiz factory) filter on this; /browse exposes it as a toggle.';

-- Practice rows are the selective slice; pyq is the overwhelming majority, so a
-- plain index serves the "show me practice" filter without bloating pyq scans.
create index questions_question_kind_idx on questions(org_id, question_kind);
