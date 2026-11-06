-- 0219_week_study_days.sql
--
-- The weekly goal counts STUDY DAYS (2026-11-06; owner OK'd after a 360 read).
--
-- WHY. Since 0113 the goal counted finished sittings only: a graded mock, a
-- completed drill, a notes checkpoint, a quiz. Most practice happens in the
-- bank and on /board, which counted nothing, so the /me ring sat at 0 for 178
-- of the 219 students who opened /me in the week of 2026-11-02, and 99 of
-- those 178 had practised that week. The rule's purpose ("never a start, never
-- a reveal: those are cheap to fire") still holds, so a day of practice counts
-- only with ten real answers.
--
-- THE RULE. An IST day since `p_since` is a study day when it holds a finished
-- sitting (any kind in `p_sitting_kinds`) or at least `p_min_answers` answers.
-- An answer is 0165's: a `question_practiced` row carrying the server's
-- verdict (`correct`, written only when an option was tapped), or a drill
-- `answer_wrong` / `answer_correct`. A bare reveal never counts. The kinds and
-- the threshold are passed in from src/lib/goals/weekly.ts, so the rule is
-- stated once, in code, and this function only counts.
--
-- WHY A FUNCTION. Counting distinct days needs a GROUP BY; a PostgREST row
-- payload would hit the 1000-row cap on a busy week (CLAUDE.md pitfall).
-- SECURITY INVOKER over own-row RLS, plus an explicit auth.uid() filter (in an
-- initplan, 0218's pattern), so it can only ever count the caller's rows.
--
-- The goal is now days, so a week holds seven at most: the CHECK tightens from
-- 1..14 to 1..7, mirroring MAX_WEEKLY_GOAL. No stored goal is above 7
-- (2026-11-06: 1 at 2, 1 at 3, 2 at 5, 11 at 7).

CREATE OR REPLACE FUNCTION public.get_own_week_study_days(
  p_since timestamptz,
  p_sitting_kinds text[],
  p_min_answers integer
)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  WITH acts AS (
    SELECT
      (u.created_at AT TIME ZONE 'Asia/Kolkata')::date AS d,
      u.kind = ANY (p_sitting_kinds) AS is_sitting,
      COALESCE(
        (u.kind = 'question_practiced' AND u.metadata ? 'correct')
        OR (u.kind IN ('answer_wrong', 'answer_correct') AND u.metadata->>'surface' = 'drill'),
        false
      ) AS is_answer
    FROM public.user_activity u
    WHERE u.user_id = (SELECT auth.uid())
      AND u.created_at >= p_since
      AND (u.kind = ANY (p_sitting_kinds) OR u.kind IN ('question_practiced', 'answer_wrong', 'answer_correct'))
  ),
  days AS (
    SELECT d
    FROM acts
    GROUP BY d
    HAVING bool_or(is_sitting) OR count(*) FILTER (WHERE is_answer) >= GREATEST(p_min_answers, 1)
  )
  SELECT count(*)::integer FROM days;
$$;

-- Supabase grants new functions to anon and authenticated BY NAME, so a bare
-- REVOKE FROM PUBLIC leaves them callable (advisors 0028/0029).
REVOKE ALL ON FUNCTION public.get_own_week_study_days(timestamptz, text[], integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_own_week_study_days(timestamptz, text[], integer) TO authenticated, service_role;

ALTER TABLE public.student_profiles
  DROP CONSTRAINT student_profiles_weekly_goal_chk,
  ADD CONSTRAINT student_profiles_weekly_goal_chk
    CHECK (weekly_goal IS NULL OR (weekly_goal BETWEEN 1 AND 7));
