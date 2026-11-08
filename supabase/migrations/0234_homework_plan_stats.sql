-- 0234_homework_plan_stats.sql
--
-- Each homework plan's days, questions and chapters, counted in Postgres
-- (2026-11-08).
--
-- WHY. The /homework hub and exam pages print those three numbers per plan,
-- and listPublishedPlans got them by reading EVERY item of every plan listed
-- (39,685 rows across 31 plans), each with its question's chapter, then
-- counting in JS. The plan page called it too, for its side menu, so each plan
-- page render read all 31 plans. Paged with OFFSET, the chapter lookup also ran
-- for every skipped row. Measured in pg_stat_statements over 36 hours: 1,473
-- calls, 76 MB each, 109 GB, 21% of all database reads and the top statement
-- by time. The plan page now reads getPlanLinks instead (no counts); this
-- serves the two pages that print them.
--
-- SAME RULES as lib/homework/query.ts toSummary had:
--   days      = the plan's last day;
--   questions = slots, a case study's parts counted once (sub = 1);
--   chapters  = distinct chapter NAMES among those slots' questions that the
--               caller can see.
-- SECURITY INVOKER, so RLS still decides: an unpublished plan has no rows
-- (homework_plan_items_read_published), and a question gone PRIVATE since the
-- plan was built drops out of the chapter count, exactly as the embed did.
-- A plan with no items has no row; the caller reads that as zeros.
--
-- COST. One pass: items by plan, hash-joined to the visible questions. About
-- 23k buffers for all 31 plans (measured 2026-11-08), against several GB per
-- hub render before. The hub and exam pages are cached for a day.

CREATE OR REPLACE FUNCTION public.homework_plan_stats(p_plan_ids uuid[])
RETURNS TABLE (plan_id uuid, days integer, questions integer, chapters integer)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT i.plan_id,
         max(i.day)::integer,
         (count(*) FILTER (WHERE i.sub = 1))::integer,
         (count(DISTINCT c.name) FILTER (WHERE i.sub = 1))::integer
    FROM public.homework_plan_items i
    LEFT JOIN public.questions q ON q.id = i.question_id
    LEFT JOIN public.chapters c ON c.id = q.chapter_id
   WHERE i.plan_id = ANY (p_plan_ids)
   GROUP BY i.plan_id;
$$;

REVOKE ALL ON FUNCTION public.homework_plan_stats(uuid[]) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.homework_plan_stats(uuid[]) TO anon, authenticated, service_role;
