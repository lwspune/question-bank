-- 0235_homework_plan_counts.sql
--
-- Each homework plan carries its own days, questions and chapters, kept up to
-- date by triggers on its items (2026-11-08). Replaces 0234's
-- homework_plan_stats, which 0236 drops (split out so this migration only
-- adds).
--
-- WHY. The /homework hub and exam pages print those three numbers per plan.
-- They were counted in JS from every item of every plan (39,685 rows, 31
-- plans), which with the plan page's side menu was 21% of all database reads
-- (pg_stat_statements, 36 hours to 2026-11-08). 0234 moved the counting into a
-- SQL function, and that failed on its first real call: the hub's 500 was
-- "canceling statement due to statement timeout". A function's query is
-- planned without seeing the plan list it is given, and the plan it got
-- touched 161,163 buffers in 4.1 s against anon's 3 s limit. The best plan,
-- with the list in hand, still read every PUBLIC question once (~23k
-- buffers, ~1.7 s cold). A number that changes only when the plan builder
-- runs should not be recomputed on every read, so it is stored.
--
-- HOW. Statement-level AFTER triggers on homework_plan_items (one per event:
-- transition tables allow only one) recount just the plans the statement
-- touched. homework_replace_items is one DELETE then one INSERT, so a rebuild
-- recounts its plan twice: one plan's items by primary key, a few thousand
-- index lookups, paid once by the builder instead of by every visitor.
-- The counts commit or roll back with the items they describe.
--
-- SAME RULES as lib/homework/query.ts toSummary had:
--   day_count      = the plan's last day (0 with no items);
--   question_count = slots, a case study's parts counted once (sub = 1);
--   chapter_count  = distinct chapter names among those slots' PUBLIC questions.
-- One difference, accepted: the old count ran as the reader, so a question set
-- PRIVATE after the plan was built dropped out of chapter_count at once. Now it
-- drops out at the plan's next rebuild. homework_replace_items admits PUBLIC
-- questions only, and the page's item list still hides the question at once.
--
-- SECURITY. The recount is SECURITY DEFINER in `private` (not exposed by
-- PostgREST) so it can update homework_plans whoever wrote the items; nobody
-- but the service role can write items (0143). The columns are readable with
-- the plan, through homework_plans_read_published.

ALTER TABLE public.homework_plans
  ADD COLUMN day_count integer NOT NULL DEFAULT 0 CHECK (day_count >= 0),
  ADD COLUMN question_count integer NOT NULL DEFAULT 0 CHECK (question_count >= 0),
  ADD COLUMN chapter_count integer NOT NULL DEFAULT 0 CHECK (chapter_count >= 0);

CREATE OR REPLACE FUNCTION private.homework_plan_recount(p_plan_ids uuid[])
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  UPDATE public.homework_plans p
     SET day_count = c.day_count,
         question_count = c.question_count,
         chapter_count = c.chapter_count
    FROM (
      SELECT pl.id,
             coalesce(max(i.day), 0)::integer AS day_count,
             (count(i.plan_id) FILTER (WHERE i.sub = 1))::integer AS question_count,
             (count(DISTINCT ch.name) FILTER (WHERE i.sub = 1 AND q.visibility = 'PUBLIC'))::integer AS chapter_count
        FROM public.homework_plans pl
        LEFT JOIN public.homework_plan_items i ON i.plan_id = pl.id
        LEFT JOIN public.questions q ON q.id = i.question_id
        LEFT JOIN public.chapters ch ON ch.id = q.chapter_id
       WHERE pl.id = ANY (p_plan_ids)
       GROUP BY pl.id
    ) c
   WHERE p.id = c.id;
$$;

CREATE OR REPLACE FUNCTION private.homework_plan_items_recount()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM private.homework_plan_recount(ARRAY(SELECT DISTINCT plan_id FROM gone));
  ELSIF TG_OP = 'UPDATE' THEN
    -- An update may move a row between plans: recount both sides.
    PERFORM private.homework_plan_recount(ARRAY(
      SELECT plan_id FROM gone UNION SELECT plan_id FROM changed));
  ELSE
    PERFORM private.homework_plan_recount(ARRAY(SELECT DISTINCT plan_id FROM changed));
  END IF;
  RETURN NULL;
END;
$$;

REVOKE ALL ON FUNCTION private.homework_plan_recount(uuid[]) FROM PUBLIC;
REVOKE ALL ON FUNCTION private.homework_plan_items_recount() FROM PUBLIC;

CREATE TRIGGER homework_plan_items_recount_ins
  AFTER INSERT ON public.homework_plan_items
  REFERENCING NEW TABLE AS changed
  FOR EACH STATEMENT EXECUTE FUNCTION private.homework_plan_items_recount();

CREATE TRIGGER homework_plan_items_recount_del
  AFTER DELETE ON public.homework_plan_items
  REFERENCING OLD TABLE AS gone
  FOR EACH STATEMENT EXECUTE FUNCTION private.homework_plan_items_recount();

CREATE TRIGGER homework_plan_items_recount_upd
  AFTER UPDATE ON public.homework_plan_items
  REFERENCING OLD TABLE AS gone NEW TABLE AS changed
  FOR EACH STATEMENT EXECUTE FUNCTION private.homework_plan_items_recount();

-- Every existing plan, once.
SELECT private.homework_plan_recount(ARRAY(SELECT id FROM public.homework_plans));
