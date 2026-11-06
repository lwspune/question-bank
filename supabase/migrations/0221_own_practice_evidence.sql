-- 0221: get_own_practice_evidence(), the student's own PRACTICE answers, one
-- row per question, for the mastery map (/me/map), over an inner
-- get_student_practice_evidence(p_user_id) that only service_role may call.
--
-- WHY. The map read only the first sitting of each mock (get_own_performance,
-- 0099/0100/0110). On 2026-11-06, 846 students had graded practice answers
-- (20,055 of them) and 596 of those had never sat a mock, so they saw an empty
-- map; and a mistake fixed in the drill never moved a dot, although the map
-- says "Fixing mistakes moves the dots" and the homepage says the map "changes
-- because of what you fix". The TypeScript core (lib/performance/practice.ts)
-- folds these rows into the map's bands; this function only reads them.
--
-- WHAT COUNTS as an answer is 0165's rule for practice, per question:
--   a question_practiced row that carries a verdict (an option was picked on a
--   graded surface: bank, board, question of the day, V), or a drill answer
--   (answer_wrong / answer_correct with surface 'drill').
-- Left out on purpose:
--   - a reveal with NO verdict: the answer was read, not given, so it says
--     nothing about whether the student knew it;
--   - the answer_wrong / answer_correct rows a BANK pick writes beside its
--     reveal row (drill fuel): the reveal row already carries that verdict;
--   - a mock's own answer_wrong (no surface): mocks reach the map through
--     get_own_performance, with their timing and marks.
-- THE LATEST ANSWER wins (owner, 2026-11-06), so a fixed mistake counts as
-- fixed. Ties on created_at cannot disagree: rows written together describe
-- the same pick.
--
-- SHAPE mirrors get_student_performance: interned names (dense_rank over the
-- NAME, so two ids sharing a name collapse to one label) and short row keys
--   q questionId  e/s/c/t index into dims.exams/subjects/chapters/subtopics
--   ok right/wrong  at when.
-- Multiple-select questions (0215) are left out, as the performance core
-- leaves them out of mocks: one picked letter cannot describe a tick set.
-- A question with no subtopic has no dot to colour, so it is left out too.
--
-- TWO FUNCTIONS, the 0099/0110 split. The inner one takes the user id and is
-- granted to service_role ALONE, so `npm run map:smoke` can drive the real
-- query over real students. The student calls the wrapper, which takes NO
-- argument and passes auth.uid(): there is no parameter for a caller to
-- tamper with. One scan of the student's rows
-- (user_activity_user_kind_time_idx), aggregated in Postgres, so no PostgREST
-- row cap can truncate it.

CREATE OR REPLACE FUNCTION public.get_student_practice_evidence(p_user_id uuid)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $fn$
  WITH ev AS (
    SELECT u.ref_id,
           u.created_at,
           CASE WHEN u.kind = 'question_practiced'
                THEN u.metadata ->> 'correct' = 'true'
                ELSE u.kind = 'answer_correct'
           END AS ok
    FROM public.user_activity u
    WHERE u.user_id = p_user_id
      AND (
        (u.kind = 'question_practiced' AND u.metadata ? 'correct')
        OR (u.kind IN ('answer_wrong', 'answer_correct') AND u.metadata ->> 'surface' = 'drill')
      )
  ),
  latest AS (
    -- The cast sits inside a CASE so it can never run on a ref_id that is not
    -- a uuid, whatever order the planner evaluates conditions in.
    SELECT DISTINCT ON (ev.ref_id)
           CASE WHEN ev.ref_id ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
                THEN ev.ref_id::uuid
           END AS qid,
           ev.created_at,
           ev.ok
    FROM ev
    ORDER BY ev.ref_id, ev.created_at DESC
  ),
  keyed AS (
    SELECT l.qid, l.created_at, l.ok,
           q.exam_id, q.subject_id, q.chapter_id, q.subtopic_id
    FROM latest l
    JOIN public.questions q ON q.id = l.qid
    WHERE l.qid IS NOT NULL
      AND l.ok IS NOT NULL
      AND q.subtopic_id IS NOT NULL
      AND q.question_format <> 'msq'
  ),
  ex AS (
    SELECT x.exam_id AS id, e.name,
           (dense_rank() OVER (ORDER BY e.name))::int - 1 AS idx
    FROM (SELECT DISTINCT exam_id FROM keyed) x
    JOIN public.exams e ON e.id = x.exam_id
  ),
  subj AS (
    SELECT x.subject_id AS id, s.name,
           (dense_rank() OVER (ORDER BY s.name))::int - 1 AS idx
    FROM (SELECT DISTINCT subject_id FROM keyed) x
    JOIN public.subjects s ON s.id = x.subject_id
  ),
  chap AS (
    SELECT x.chapter_id AS id, c.name,
           (dense_rank() OVER (ORDER BY c.name))::int - 1 AS idx
    FROM (SELECT DISTINCT chapter_id FROM keyed) x
    JOIN public.chapters c ON c.id = x.chapter_id
  ),
  subt AS (
    SELECT x.subtopic_id AS id, t.name,
           (dense_rank() OVER (ORDER BY t.name))::int - 1 AS idx
    FROM (SELECT DISTINCT subtopic_id FROM keyed) x
    JOIN public.subtopics t ON t.id = x.subtopic_id
  )
  SELECT jsonb_build_object(
    'dims', jsonb_build_object(
      'exams',     coalesce((SELECT jsonb_agg(d.name ORDER BY d.idx) FROM (SELECT DISTINCT name, idx FROM ex) d), '[]'::jsonb),
      'subjects',  coalesce((SELECT jsonb_agg(d.name ORDER BY d.idx) FROM (SELECT DISTINCT name, idx FROM subj) d), '[]'::jsonb),
      'chapters',  coalesce((SELECT jsonb_agg(d.name ORDER BY d.idx) FROM (SELECT DISTINCT name, idx FROM chap) d), '[]'::jsonb),
      'subtopics', coalesce((SELECT jsonb_agg(d.name ORDER BY d.idx) FROM (SELECT DISTINCT name, idx FROM subt) d), '[]'::jsonb)
    ),
    'rows', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
        'q',  k.qid,
        'e',  ex.idx,
        's',  subj.idx,
        'c',  chap.idx,
        't',  subt.idx,
        'ok', k.ok,
        'at', k.created_at
      ) ORDER BY k.created_at)
      FROM keyed k
      JOIN ex   ON ex.id   = k.exam_id
      JOIN subj ON subj.id = k.subject_id
      JOIN chap ON chap.id = k.chapter_id
      JOIN subt ON subt.id = k.subtopic_id
    ), '[]'::jsonb)
  );
$fn$;

-- Revoke from PUBLIC *and* the Supabase roles by name (a bare REVOKE FROM
-- PUBLIC leaves the grants Supabase adds to new public functions; advisors
-- 0028/0029).
REVOKE ALL ON FUNCTION public.get_student_practice_evidence(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_practice_evidence(uuid) TO service_role;

COMMENT ON FUNCTION public.get_student_practice_evidence(uuid) IS
  'One student''s practice answers, the latest per question. service_role only; students call get_own_practice_evidence().';

-- The student's own. No parameter: the identity is auth.uid(), read here.
CREATE OR REPLACE FUNCTION public.get_own_practice_evidence()
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $fn$
  SELECT public.get_student_practice_evidence(auth.uid());
$fn$;

REVOKE ALL ON FUNCTION public.get_own_practice_evidence() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_own_practice_evidence() TO authenticated, service_role;

COMMENT ON FUNCTION public.get_own_practice_evidence() IS
  'The calling student''s own practice answers, the latest per question, for the mastery map. No parameter: the identity is auth.uid().';
