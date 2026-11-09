-- 0248: PUBLIC past-year questions per exam per year, for the /browse exam
-- showcase (2026-11-09).
--
-- WHY: each card in the carousel at the top of the bare /browse page draws a
-- small "questions by year" chart for its exam. Nothing returned that grain:
-- get_pyq_years (0019/0067) gives the distinct years of the WHOLE bank, and
-- public_question_counts (0237) gives exam x kind with no year.
--
-- WHY THE INDEX: measured on production before writing this file, the grouped
-- read below ran as an Index Scan on questions_question_kind_idx and then read
-- the table for pyq_year and visibility: 20,125 buffers, 7.9 s (EXPLAIN
-- ANALYZE, TIMING OFF), far past anon's 3 s statement_timeout. 0237's count of
-- the same rows without the year is an Index Only Scan on
-- questions_public_chapter_idx in 155 ms, because every column it needs is in
-- that index. This partial index does the same for (exam_id, pyq_year): it
-- holds only PUBLIC pyq rows that carry a year (~75k of ~122k), about 1.5 MB
-- next to that index's 1.9 MB, and turns the read into an index-only scan.
--
-- ALTERNATIVES REJECTED:
--   * Running the slow read with the service role and a longer timeout, once
--     a day: an 8 s heap read on the shared Micro host is the shape that has
--     caused statement timeouts here before, and a build can trigger it too.
--   * A summary table refreshed by a cron: a second copy of the counts that
--     can go stale, for a read the index makes cheap.
--
-- Same shape and grants as 0237: SECURITY INVOKER, so RLS still decides what
-- a caller counts (anon sees PUBLIC only, which is all this asks for). The
-- page caches the result for a day (lib/exam/pyqYearCounts.ts).
--
-- Additive only: a new function and a new index. Safe to apply before the
-- code that reads it ships.

CREATE INDEX IF NOT EXISTS questions_public_pyq_exam_year_idx
  ON public.questions (exam_id, pyq_year)
  WHERE visibility = 'PUBLIC' AND question_kind = 'pyq' AND pyq_year IS NOT NULL;

CREATE OR REPLACE FUNCTION public.public_pyq_year_counts()
RETURNS TABLE (exam_id uuid, pyq_year integer, questions integer)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT q.exam_id, q.pyq_year, count(*)::integer
    FROM public.questions q
   WHERE q.visibility = 'PUBLIC'
     AND q.question_kind = 'pyq'
     AND q.pyq_year IS NOT NULL
   GROUP BY q.exam_id, q.pyq_year;
$$;

COMMENT ON FUNCTION public.public_pyq_year_counts() IS
  'PUBLIC pyq questions per exam per pyq_year, for the /browse exam showcase charts. Index-only via questions_public_pyq_exam_year_idx (0248). RLS-scoped (security invoker).';

REVOKE ALL ON FUNCTION public.public_pyq_year_counts() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.public_pyq_year_counts() TO anon, authenticated, service_role;
