-- 0191_v_progress_card.sql
--
-- V's "How's my progress" card (2026-10-27, owner), which replaces the "Plan
-- my week" button. 20 students tapped that in its first week; of the 63
-- chapter days their 19 plans held, 5 were done, and one student ever asked to
-- see a plan again. The card shows a student where they stand instead, built
-- from their own numbers by lib/chat/progressCard.ts (no AI call).
--
-- 1. chat_settings.progress_enabled: its own switch at /dashboard/chat, so the
--    card can be turned off without a deploy. Default TRUE, unlike 0168/0170:
--    the card makes no AI call and writes nothing, so it needs no ramp.
--
-- 2. get_own_progress_card(p_exam_id): the numbers no existing read gives.
--    The rest of the card reuses get_own_performance (mocks, chapter bands)
--    and the drill's own ladder (fixed, due).
--      week / prev   practice outside mocks in this exam, the last 7 days in
--                    India (today included) and the 7 before: 0165's rule
--                    (an option picked on a graded surface, or a drill answer).
--      chapters      EVERY chapter of the exam, with the distinct questions
--                    answered in it outside mocks (all time, same rule), so
--                    the card can say "12 of 40 chapters started".
--      notes         the notes chapters opened in the last 30 days, as
--                    '<subjectRoute>/<chapterSlug>' from the reading beacon
--                    (surface_viewed 'notes', metadata.path, since 2026-10-19).
--                    Every exam: the card keeps the ones of its exam, by the
--                    notes nav index, which SQL does not have.
--    p_exam_id NULL picks the exam with the most practice answers, for a
--    student with no exam on the profile and no mock; the chosen id and name
--    come back so the card can label itself.
--
-- SECURITY INVOKER, auth.uid() only, like 0165: no user id is taken, and
-- user_activity's own-row policy applies on top. One scan of the student's
-- answer rows (user_activity_user_kind_time_idx) plus a primary-key join to
-- questions, aggregated here, so no PostgREST row cap applies.
--
-- APPLY BEFORE THE CODE THAT READS IT DEPLOYS: readChatSettings selects
-- progress_enabled, and a failed read falls back to the defaults, which switch
-- V's AI off for everyone.

alter table public.chat_settings
  add column if not exists progress_enabled boolean not null default true;

comment on column public.chat_settings.progress_enabled is
  'V''s "How''s my progress" button and card (0191). No AI call.';

CREATE OR REPLACE FUNCTION public.get_own_progress_card(p_exam_id uuid)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  WITH me AS (SELECT auth.uid() AS id),
  day AS (
    SELECT (date_trunc('day', now() AT TIME ZONE 'Asia/Kolkata') AT TIME ZONE 'Asia/Kolkata') AS start
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
    FROM public.user_activity u, me
    WHERE u.user_id = me.id
      AND u.kind IN ('question_practiced', 'answer_wrong', 'answer_correct')
      AND (
        (u.kind = 'question_practiced' AND u.metadata ? 'correct')
        OR (u.kind IN ('answer_wrong', 'answer_correct') AND u.metadata->>'surface' = 'drill')
      )
  ),
  placed AS (
    SELECT a.created_at, a.question_id, a.is_right, q.exam_id, q.chapter_id
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
  per_chapter AS (
    SELECT m.chapter_id, count(DISTINCT m.question_id) AS answered
    FROM mine m
    GROUP BY m.chapter_id
  ),
  notes AS (
    SELECT DISTINCT split_part(u.metadata->>'path', '/', 3) || '/' || split_part(u.metadata->>'path', '/', 4) AS chapter
    FROM public.user_activity u, me
    WHERE u.user_id = me.id
      AND u.kind = 'surface_viewed'
      AND u.metadata->>'surface' = 'notes'
      AND u.created_at >= now() - interval '30 days'
      AND split_part(u.metadata->>'path', '/', 4) <> ''
  )
  SELECT jsonb_build_object(
    'exam_id', c.exam_id,
    'exam_name', (SELECT e.name FROM public.exams e WHERE e.id = c.exam_id),
    'week', (
      SELECT jsonb_build_object('answered', count(*), 'right', count(*) FILTER (WHERE m.is_right))
      FROM mine m, day d WHERE m.created_at >= d.start - interval '6 days'
    ),
    'prev', (
      SELECT jsonb_build_object('answered', count(*), 'right', count(*) FILTER (WHERE m.is_right))
      FROM mine m, day d
      WHERE m.created_at >= d.start - interval '13 days' AND m.created_at < d.start - interval '6 days'
    ),
    'chapters', COALESCE((
      SELECT jsonb_agg(
        jsonb_build_object('id', ch.id, 'name', ch.name, 'subject', s.name, 'answered', COALESCE(pc.answered, 0))
        ORDER BY s.name, ch.name
      )
      FROM public.chapters ch
      JOIN public.subjects s ON s.id = ch.subject_id
      LEFT JOIN per_chapter pc ON pc.chapter_id = ch.id
      WHERE s.exam_id = c.exam_id
    ), '[]'::jsonb),
    'notes', COALESCE((SELECT jsonb_agg(n.chapter ORDER BY n.chapter) FROM notes n), '[]'::jsonb)
  )
  FROM chosen c;
$$;

-- Supabase grants new functions to anon and authenticated BY NAME, so a bare
-- REVOKE FROM PUBLIC leaves them callable (advisors 0028/0029).
REVOKE ALL ON FUNCTION public.get_own_progress_card(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_own_progress_card(uuid) TO authenticated, service_role;
