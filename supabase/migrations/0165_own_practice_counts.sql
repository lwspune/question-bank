-- 0165: get_own_practice_counts(), a student's own practice outside mocks,
-- split into today, the last 7 days and all time.
--
-- WHY. V's my_progress tool (lib/chat/progress.ts, 2026-10-16) read mock
-- results only. On 2026-10-17 at 00:49 IST a student who had answered 328
-- bank questions that evening asked V "today how many question i solved?"
-- and was told V could not see it and should take a mock first. Most students
-- here practise in the bank and the board reader and never sit a mock, so the
-- tool answered them all the same way.
--
-- WHAT COUNTS is exactly 0132's get_own_answer_totals (the "N answered"
-- milestones), minus the mocks:
--   answered = a question_practiced row that carries a verdict (an option was
--              picked on a graded surface), plus a drill answer
--              (answer_wrong / answer_correct with surface 'drill');
--   right    = the same, where the verdict was right.
-- The answer_wrong / answer_correct rows a BANK pick writes beside its reveal
-- row are drill fuel, already counted by the reveal row, so they are left out
-- here as they are in 0132. One more figure that 0132 does not have:
--   revealed = a question_practiced row with NO verdict: an answer read
--              without picking (a written answer in the board reader, a guide
--              worked example). Without it a student who read 101 board
--              solutions would be told they had answered nothing.
-- Counts are answers, not distinct questions: the milestones count the same.
--
-- THE DAY IS INDIA'S. 'today' starts at midnight in Asia/Kolkata, 'week' six
-- days before that (seven calendar days, today included). Computed here, not
-- passed in, so the function takes no argument at all, like get_own_performance:
-- there is nothing for a caller to tamper with, and auth.uid() decides whose rows.
--
-- SECURITY INVOKER: user_activity's own-row SELECT policy applies on top of the
-- auth.uid() filter. One scan of the student's rows (user_activity_user_kind_time_idx),
-- aggregated in Postgres, so no PostgREST row cap can truncate it.

CREATE OR REPLACE FUNCTION public.get_own_practice_counts()
RETURNS TABLE (span text, answered bigint, right_answers bigint, revealed bigint)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  WITH me AS (SELECT auth.uid() AS id),
  day AS (
    SELECT (date_trunc('day', now() AT TIME ZONE 'Asia/Kolkata') AT TIME ZONE 'Asia/Kolkata') AS start
  ),
  spans AS (
    SELECT 'today'::text AS span, d.start AS since, 1 AS ord FROM day d
    UNION ALL SELECT 'week', d.start - interval '6 days', 2 FROM day d
    UNION ALL SELECT 'all', NULL::timestamptz, 3
  ),
  acts AS (
    SELECT
      u.created_at,
      COALESCE(
        (u.kind = 'question_practiced' AND u.metadata ? 'correct')
        OR (u.kind IN ('answer_wrong', 'answer_correct') AND u.metadata->>'surface' = 'drill'),
        false
      ) AS is_answer,
      COALESCE(
        (u.kind = 'question_practiced' AND u.metadata->>'correct' = 'true')
        OR (u.kind = 'answer_correct' AND u.metadata->>'surface' = 'drill'),
        false
      ) AS is_right,
      COALESCE(u.kind = 'question_practiced' AND NOT (u.metadata ? 'correct'), false) AS is_revealed
    FROM public.user_activity u, me
    WHERE u.user_id = me.id
      AND u.kind IN ('question_practiced', 'answer_wrong', 'answer_correct')
  )
  SELECT
    s.span,
    count(*) FILTER (WHERE a.is_answer)::bigint,
    count(*) FILTER (WHERE a.is_right)::bigint,
    count(*) FILTER (WHERE a.is_revealed)::bigint
  FROM spans s
  LEFT JOIN acts a ON s.since IS NULL OR a.created_at >= s.since
  GROUP BY s.span, s.ord
  ORDER BY s.ord;
$$;

-- Supabase grants new functions to anon and authenticated BY NAME, so a bare
-- REVOKE FROM PUBLIC leaves them callable (advisors 0028/0029). Anon has no
-- auth.uid() and would only ever get zeros, but it has no reason to call this.
REVOKE ALL ON FUNCTION public.get_own_practice_counts() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_own_practice_counts() TO authenticated, service_role;
