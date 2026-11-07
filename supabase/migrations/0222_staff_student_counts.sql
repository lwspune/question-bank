-- 0222_staff_student_counts.sql
--
-- The staff view of a student's /me (/dashboard/students/[id]/me, 2026-11-07).
--
-- /me reads two numbers through functions that count "the caller":
--   get_own_week_study_days (0219): study days since Monday 00:00 IST
--   get_own_answer_totals   (0132): Answered and Right across every surface
-- Both filter on auth.uid(), so a superadmin calling them gets THEIR OWN
-- numbers, and the student's /me shown to staff would carry the wrong ones.
--
-- These two functions are the same SQL with the student named by parameter.
-- They are SECURITY DEFINER (user_activity and mock_attempts are own-row by
-- RLS, so a definer is what lets them read another student's rows) and gated
-- on private.current_user_is_superadmin(): anyone else gets 42501, never an
-- empty student, the 0110 rule (a refusal must not look like a student who did
-- nothing).
--
-- WHY A COPY OF THE SQL rather than redefining the 0219/0132 functions as
-- wrappers over a shared private one: the own-functions are on every /me and
-- every header pulse, and rewriting a hot shipped function to save twenty
-- lines is the larger risk. Drift between each pair is caught by
-- tests/staff-student-counts.integration.test.ts, which asserts the staff
-- count EQUALS the student's own count on the same rows. Change one, change
-- both.
--
-- Superadmin only, matching /dashboard/students (platform-wide data). A
-- teacher's view of their own batch students is a later, separate decision.

CREATE OR REPLACE FUNCTION public.get_student_week_study_days_for_staff(
  p_user_id uuid,
  p_since timestamptz,
  p_sitting_kinds text[],
  p_min_answers integer
)
RETURNS integer
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_days integer;
BEGIN
  IF (SELECT auth.uid()) IS NULL OR NOT private.current_user_is_superadmin() THEN
    RAISE EXCEPTION 'not authorized to read this student' USING ERRCODE = '42501';
  END IF;

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
    WHERE u.user_id = p_user_id
      AND u.created_at >= p_since
      AND (u.kind = ANY (p_sitting_kinds) OR u.kind IN ('question_practiced', 'answer_wrong', 'answer_correct'))
  ),
  days AS (
    SELECT d
    FROM acts
    GROUP BY d
    HAVING bool_or(is_sitting) OR count(*) FILTER (WHERE is_answer) >= GREATEST(p_min_answers, 1)
  )
  SELECT count(*)::integer INTO v_days FROM days;

  RETURN v_days;
END;
$$;

REVOKE ALL ON FUNCTION public.get_student_week_study_days_for_staff(uuid, timestamptz, text[], integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_week_study_days_for_staff(uuid, timestamptz, text[], integer) TO authenticated;

COMMENT ON FUNCTION public.get_student_week_study_days_for_staff(uuid, timestamptz, text[], integer) IS
  'get_own_week_study_days for a named student, superadmin only (42501 otherwise). Same SQL as 0219; keep the two in step.';

CREATE OR REPLACE FUNCTION public.get_student_answer_totals_for_staff(p_user_id uuid)
RETURNS TABLE (answered bigint, right_answers bigint)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF (SELECT auth.uid()) IS NULL OR NOT private.current_user_is_superadmin() THEN
    RAISE EXCEPTION 'not authorized to read this student' USING ERRCODE = '42501';
  END IF;

  RETURN QUERY
  WITH mocks AS (
    SELECT COALESCE(sum(a.correct_count + a.wrong_count), 0)::bigint AS answered,
           COALESCE(sum(a.correct_count), 0)::bigint AS right_answers
    FROM public.mock_attempts a
    WHERE a.user_id = p_user_id
      AND a.status IN ('submitted', 'expired')
  ),
  acts AS (
    SELECT
      (count(*) FILTER (WHERE u.kind = 'question_practiced' AND u.metadata ? 'correct')
       + count(*) FILTER (WHERE u.kind IN ('answer_wrong', 'answer_correct')
                            AND u.metadata->>'surface' = 'drill'))::bigint AS answered,
      (count(*) FILTER (WHERE u.kind = 'question_practiced' AND u.metadata->>'correct' = 'true')
       + count(*) FILTER (WHERE u.kind = 'answer_correct' AND u.metadata->>'surface' = 'drill'))::bigint
        AS right_answers
    FROM public.user_activity u
    WHERE u.user_id = p_user_id
      AND u.kind IN ('question_practiced', 'answer_wrong', 'answer_correct')
  )
  SELECT mocks.answered + acts.answered, mocks.right_answers + acts.right_answers
  FROM mocks, acts;
END;
$$;

REVOKE ALL ON FUNCTION public.get_student_answer_totals_for_staff(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_answer_totals_for_staff(uuid) TO authenticated;

COMMENT ON FUNCTION public.get_student_answer_totals_for_staff(uuid) IS
  'get_own_answer_totals for a named student, superadmin only (42501 otherwise). Same SQL as 0132; keep the two in step.';
