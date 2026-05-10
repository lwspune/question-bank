-- 0010_sync_metadata.sql
--
-- Phase B of the public-product pivot. Adds five nullable metadata columns
-- on `questions` to capture provenance + scoring + performance signal from
-- mocks published by sibling apps (initially MHT_CET_AI).
--
-- All nullable + no defaults — existing rows keep working without backfill.
-- No RLS changes: the new fields piggy-back on the existing read policies
-- (PUBLIC visibility is already readable by anon).

alter table questions
  add column pyq_year       int,
  add column marks          numeric,
  add column neg_marks      numeric,
  add column attempt_stats  jsonb,
  add column source_mock_id text,
  add column source_app     text;

comment on column questions.pyq_year       is 'Previous-year-question year, populated when the source flagged it as PYQ.';
comment on column questions.marks          is 'Per-question marks for correct answer (positive scoring).';
comment on column questions.neg_marks      is 'Per-question negative marking magnitude (positive number).';
comment on column questions.attempt_stats  is 'Aggregate {count, correctPct} across all student attempts at the source app. Merged across multiple syncs of the same content_hash.';
comment on column questions.source_mock_id is 'Most recent contributing mock id from the source app (last-write-wins). For "browse from this upload" deep-links.';
comment on column questions.source_app     is 'Identifier of the publishing app (e.g. "MHT_CET_AI"). Forward-compat for multi-publisher contracts.';
