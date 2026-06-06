-- Teaching order for subtopics.
--
-- Chapters already carry an `order_index` (0001_init.sql); subtopics did not,
-- so the /browse filter sidebar and the question list could only fall back to
-- volume (count desc). This column lets a chapter expose its subtopics in the
-- pedagogical order it is taught — sourced today from each /notes chapter's
-- `subtopicOrder` (see scripts/sync-subtopic-order.ts).
--
-- NULLABLE, default NULL (deliberately NOT `0` like chapters): NULL means
-- "no teaching order set", which sorts LAST in both the JS facet sort
-- (`orderIndex ?? Infinity`) and the SQL question sort (`nullsFirst: false`).
-- A `0` default would sort an un-ordered subtopic ahead of a position-1 one.
-- So every subtopic outside the ~11 noted chapters keeps the historical
-- count-desc behaviour with zero change.
alter table subtopics add column order_index int;

comment on column subtopics.order_index is
  'Pedagogical teaching order within the chapter (1-based). NULL = unset → sorts last. Populated for /notes chapters by scripts/sync-subtopic-order.ts.';
