-- 0237_public_question_counts.sql
--
-- PUBLIC questions per exam and kind, in one read (2026-11-08).
--
-- WHY. Three callers counted the same thing one exam at a time:
--   lib/exam/allExamStats.ts       two head counts per exam, 50 at once, per
--                                  cache refill (homepage, /about, /exams);
--   lib/questions/defaultViewCounts.ts  one per exam, 25 at once, hourly
--                                  (the /browse exam pills);
--   lib/chat/context.ts            one over the whole bank on EVERY V message,
--                                  uncached.
-- In pg_stat_statements over 36 hours to 2026-11-08 they were ~20% of all
-- query time: each count is cheap (an index-only scan), but 25-50 arriving at
-- once queue behind each other, so the per-exam counts averaged 580 ms with a
-- 2.9 s worst case, close to anon's 3 s limit. The questions table being
-- un-vacuumed made each one read the heap too (0233).
--
-- One GROUP BY over the PUBLIC rows answers all three: 47 rows, an
-- index-only scan of questions_public_chapter_idx, 229 buffers and 56 ms as
-- anon (measured 2026-11-08, after 0233's vacuum).
--
-- An exam or kind with no PUBLIC question has NO row; callers read that as 0.
-- An EMPTY result is a failure (the bank is never empty) and callers throw on
-- it, so a cache never keeps zeros (the 2026-10-08 "0 questions" incident).
--
-- SECURITY INVOKER with an explicit visibility filter: anon's RLS would add
-- the same filter, and a signed-in org member gets PUBLIC counts too rather
-- than their org's PRIVATE rows mixed in.

CREATE OR REPLACE FUNCTION public.public_question_counts()
RETURNS TABLE (exam_id uuid, question_kind text, questions integer)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT q.exam_id, q.question_kind::text, count(*)::integer
    FROM public.questions q
   WHERE q.visibility = 'PUBLIC'
   GROUP BY q.exam_id, q.question_kind;
$$;

REVOKE ALL ON FUNCTION public.public_question_counts() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.public_question_counts() TO anon, authenticated, service_role;
