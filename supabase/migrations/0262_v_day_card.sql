-- 0262_v_day_card.sql
--
-- V's "Your day" card (2026-11-15, owner): the first time a student opens V
-- on a new day, a card stands in for V's greeting with what they did on their
-- last day and one thing for today (lib/chat/dayCard.ts, no AI call).
--
-- Why: "How's my progress" (0191) was opened by 31 students in 18 days, 55%
-- took a next step, but only 7 opened it on a second day. A card waiting when
-- they open V is the test of whether it can become a daily habit (growth
-- experiment "v-day-card").
--
-- get_own_day_card(p_exam_id): practice answers per India day in the 30 days
-- before today, with each day's most-answered chapter. The same answer rule
-- as 0191/0165 (an option picked on a graded surface, or a drill answer);
-- mock answers come from get_own_performance in the server and are added to
-- the same days there. p_exam_id NULL picks the exam with the most answers in
-- the window, and the chosen id and name come back, like 0191. Today is left
-- out: the card is about the days before.
--
-- Everything else on the card reuses reads that exist: the drill's events
-- (fixed and waiting), get_own_performance (chapter bands) and the board
-- plan's own read (lib/path).
--
-- SECURITY INVOKER, auth.uid() only: no user id is taken, and user_activity's
-- own-row policy applies on top. One range scan of the student's answer rows
-- (user_activity_user_kind_time_idx), aggregated here, so no PostgREST row
-- cap applies. Read-only; nothing is written.

CREATE OR REPLACE FUNCTION public.get_own_day_card(p_exam_id uuid)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  WITH me AS (SELECT auth.uid() AS id),
  bounds AS (
    SELECT (date_trunc('day', now() AT TIME ZONE 'Asia/Kolkata') AT TIME ZONE 'Asia/Kolkata') AS today_start
  ),
  answers AS (
    SELECT
      u.created_at,
      CASE WHEN u.ref_id ~ '^[0-9a-fA-F-]{36}$' THEN u.ref_id::uuid END AS question_id,
      COALESCE(
        (u.kind = 'question_practiced' AND u.metadata->>'correct' = 'true')
        OR (u.kind = 'answer_correct' AND u.metadata->>'surface' = 'drill'),
        false
      ) AS is_right
    FROM public.user_activity u, me, bounds b
    WHERE u.user_id = me.id
      AND u.kind IN ('question_practiced', 'answer_wrong', 'answer_correct')
      AND u.created_at >= b.today_start - interval '30 days'
      AND u.created_at < b.today_start
      AND (
        (u.kind = 'question_practiced' AND u.metadata ? 'correct')
        OR (u.kind IN ('answer_wrong', 'answer_correct') AND u.metadata->>'surface' = 'drill')
      )
  ),
  placed AS (
    SELECT
      (a.created_at AT TIME ZONE 'Asia/Kolkata')::date AS day,
      a.is_right,
      q.exam_id,
      q.chapter_id
    FROM answers a
    JOIN public.questions q ON q.id = a.question_id
  ),
  chosen AS (
    SELECT COALESCE(
      p_exam_id,
      (SELECT p.exam_id FROM placed p GROUP BY p.exam_id ORDER BY count(*) DESC, p.exam_id LIMIT 1)
    ) AS exam_id
  ),
  mine AS (
    SELECT p.* FROM placed p, chosen c WHERE p.exam_id = c.exam_id
  ),
  per_day AS (
    SELECT m.day, count(*) AS answered, count(*) FILTER (WHERE m.is_right) AS right_n
    FROM mine m
    GROUP BY m.day
  ),
  per_chapter AS (
    SELECT
      m.day,
      ch.name,
      count(*) AS answered,
      row_number() OVER (PARTITION BY m.day ORDER BY count(*) DESC, ch.name) AS rk
    FROM mine m
    JOIN public.chapters ch ON ch.id = m.chapter_id
    GROUP BY m.day, ch.name
  )
  SELECT jsonb_build_object(
    'exam_id', c.exam_id,
    'exam_name', (SELECT e.name FROM public.exams e WHERE e.id = c.exam_id),
    'days', COALESCE((
      SELECT jsonb_agg(
        jsonb_build_object(
          'day', to_char(d.day, 'YYYY-MM-DD'),
          'answered', d.answered,
          'right', d.right_n,
          'top_chapter', t.name,
          'top_answered', COALESCE(t.answered, 0)
        )
        ORDER BY d.day
      )
      FROM per_day d
      LEFT JOIN per_chapter t ON t.day = d.day AND t.rk = 1
    ), '[]'::jsonb)
  )
  FROM chosen c;
$$;

-- Supabase grants new functions to anon and authenticated BY NAME, so a bare
-- REVOKE FROM PUBLIC leaves them callable (advisors 0028/0029).
REVOKE ALL ON FUNCTION public.get_own_day_card(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_own_day_card(uuid) TO authenticated, service_role;
