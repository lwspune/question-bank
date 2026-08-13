-- 0077_questions_kind_exam_created_idx.sql
--
-- The /browse list index. `question_kind` was missing from every PUBLIC index,
-- and that one gap was the whole of the remaining /browse latency.
--
-- MEASURED, not reasoned about (2026-08-13, EXPLAIN ANALYZE TIMING OFF as anon):
--
--   filter            before              after       buffers
--   ---------------   -----------------   ---------   ----------------
--   kind + exam       1,986 ms            5.3 ms      6,669 -> 432
--   kind only         4,454 ms            228 ms      17,403 -> 484
--
-- Those two shapes were 34.5 of the 35.6 minutes of database time this query
-- family consumed in ~4 days (1,335 and 553 calls respectively).
--
-- WHAT WAS ACTUALLY SLOW. Not the sort — that was a 28 kB top-N heapsort, i.e.
-- free, and the 2026-08-05 two-phase fix had already removed the disk spill. The
-- cost was that `questions_public_filters_idx` covers (visibility, exam_id,
-- subject_id, created_at) but NOT question_kind, so answering "NDA PYQs" pulled
-- 9,224 candidate rows from the index and then opened the HEAP for every one of
-- them purely to test question_kind, discarding 4,364. That is an Index Scan
-- with a Filter, and no amount of vacuuming helps it — only a covering index.
--
-- THE EVIDENCE WAS ALREADY IN THE DATABASE. An identical query shape filtered by
-- subtopic_id + question_kind runs at 5.9 ms across 12,736 calls, because
-- questions_subtopic_kind_idx happens to cover both columns. Same shape, ~350x
-- apart, one variable. This index applies that to the exam axis; the measured
-- 5.3 ms lands almost exactly on the 5.9 ms the natural experiment predicted.
--
-- COLUMN ORDER IS LOAD-BEARING. question_kind FIRST, not exam_id:
--   * (question_kind, exam_id, created_at ...) serves BOTH shapes — with exam
--     bound the remaining order is exactly the ORDER BY, so no sort at all; with
--     only kind bound it is still an index-only scan feeding a free top-N sort.
--   * (exam_id, question_kind, ...) would serve only the exam-bound shape and
--     leave the kind-only query — the slower of the two — unimproved.
-- The trailing source_row + id make it cover the full sort key, and the partial
-- WHERE visibility = 'PUBLIC' matches the anon RLS predicate (the same trick the
-- existing public partial indexes use) and keeps it to 3.2 MB.
--
-- COST: the 17th index on the most heavily-written table here, 3.2 MB (total
-- index size 31 -> 34 MB). Every ingest now maintains one more index. That trade
-- was declined once before on write-amplification grounds and is being taken now
-- only because the read side was measured rather than assumed. If a future ingest
-- shows real slowdown, this is a candidate to drop — 15x/36x fewer buffers is the
-- benefit it has to keep justifying.
--
-- BUILT WITH `CONCURRENTLY` IN PRODUCTION so no writes were blocked. It is
-- written WITHOUT that keyword here because migration replay wraps statements in
-- a transaction and CONCURRENTLY cannot run inside one; a fresh or test database
-- has no concurrent traffic to protect. The resulting index is identical either
-- way — CONCURRENTLY is a build strategy, not part of the definition.
--
-- A concurrent build can also fail and leave an INVALID index behind, which is
-- unused but must be dropped rather than ignored. Checked after this one:
-- indisvalid = true, indisready = true.

CREATE INDEX IF NOT EXISTS questions_public_kind_exam_created_idx
  ON public.questions (question_kind, exam_id, created_at DESC, source_row, id)
  WHERE visibility = 'PUBLIC';

COMMENT ON INDEX public.questions_public_kind_exam_created_idx IS
  'The /browse list index: PYQ/Practice + exam + the full sort key, PUBLIC only. question_kind must stay the leading column — it is what lets the kind-only query use this too. See migration 0077.';
