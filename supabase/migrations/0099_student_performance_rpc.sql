-- 0099_student_performance_rpc.sql
--
-- The /dashboard/students/[id]/performance diagnosis: every per-question fact
-- for ONE student, in a single round trip.
--
-- WHY RETURNS jsonb (not RETURNS TABLE): the heaviest student on production has
-- 3,569 answer rows and 2,091 distinct (attempt, subtopic) pairs — both past the
-- PostgREST 1000-row cap, which truncates with no error. A set-returning RPC
-- inherits that cap (the roster RPC 0098 pages around it); one jsonb row does
-- not. Precedent: get_activity_shape (0053).
--
-- WHY IT MAKES NO JUDGEMENT: this function joins and projects. It does NOT
-- decide whether an answer is correct, which attempt counts, or how a subtopic
-- is weighted. Correctness is decided ONCE in the app, by verdictFor
-- (src/lib/mocks/answers.ts) — the same helper gradeMock and getAttemptReview
-- share. A second implementation in SQL is exactly the two-renderer drift this
-- repo has already paid for twice; scripts/itemstats/rollup-vault.ts sets the
-- precedent of reading rows and judging in TypeScript.
--
-- WHY ONE REQUIRED PARAMETER: an optional p_subject/p_exam would be the
-- migration-0068 anti-pattern (an `is null or col = param` predicate makes a
-- language-sql body plan ONCE, generically, and demotes every predicate to a
-- filter). Filtering happens in the pure core instead, which also makes the
-- subject switch free of a round trip.
--
-- FOUR RESPONSE STATES, NOT THREE. `facts` is built from the mock's `questions`
-- SNAPSHOT left-joined to attempt_answers, so every question of the paper is
-- present and the absence of an answer row is itself the datum:
--     row + answer      -> answered (correct or wrong, decided in TS)
--     row, no answer    -> seen and left blank
--     NO ROW AT ALL     -> never reached  (`rc: false`)
-- Only 240 of 606 graded attempts wrote a row for every question (avg 62.7% of
-- the paper), so collapsing the last two would report "weak in Conics" for a
-- student who simply ran out of time at Q80.
--
-- RETAKES AND ABANDONED ATTEMPTS ARE RETURNED, NOT FILTERED. 23% of graded
-- attempts are a retake and the review screen shows the answers, so they are
-- contaminated evidence — but "2 retakes excluded" is a line the page owes the
-- reader, and a filter applied here would be invisible and untestable. That
-- policy lives in the pure core with the rest of the judgement.
--
-- PAYLOAD, MEASURED on production rather than estimated: avg 151 kB, p95
-- 567 kB, max 1,086 kB (the heaviest student: 32 attempts, 4,500 facts), at
-- 235 ms and all shared-buffer hits — no read, no spill. Taxonomy names are
-- interned into `dims` and referenced by integer index; the two uuids per fact
-- are what dominate the rest, and they stay because the wrong-answer audit
-- links to the question. Nulls are deliberately NOT stripped: an explicit
-- `"k": null` is a missing answer key, which verdictFor treats as
-- do-not-penalise, and that is worth seeing in a payload dump.
--
-- SECURITY DEFINER + REVOKE-from-public + GRANT-to-service_role: reads across
-- another user's own-row-RLS data (attempts, answers), so it must be callable
-- ONLY by the service-role admin client. The page is superadmin-gated.
-- search_path pinned to '' (advisor 0011); every reference fully qualified.

CREATE OR REPLACE FUNCTION public.get_student_performance(p_user_id uuid)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $fn$
  WITH att AS (
    SELECT a.id, a.mock_id, a.started_at, a.submitted_at, a.status,
           a.score, a.max_score
    FROM public.mock_attempts a
    WHERE a.user_id = p_user_id
  ),
  -- Attempts that carry evidence. An in-progress attempt still appears in
  -- `attempts` (the page reports "N in progress") but contributes no facts:
  -- it has not been graded, so its answers are not yet an outcome.
  graded AS (
    SELECT * FROM att WHERE status IN ('submitted', 'expired') AND score IS NOT NULL
  ),
  snap AS (
    SELECT g.id AS attempt_id,
           (e.value ->> 'position')::int      AS position,
           (e.value ->> 'questionId')::uuid   AS question_id,
           e.value ->> 'sectionKey'           AS section_key,
           coalesce((e.value ->> 'grace')::boolean, false) AS grace,
           -- Per-question marks come from the snapshot, never from a constant.
           -- The projection needs the real neg:correct ratio, and MHT-CET's is
           -- ZERO — hardcoding NDA's 0.33 (as nda-tracker does, correctly for
           -- its single exam) would penalise a CET student for wrong answers
           -- that cost them nothing. Same class of defect as the mock
           -- instructions screen that told CET students to skip if unsure.
           (e.value ->> 'marks')::numeric     AS marks,
           (e.value ->> 'negMarks')::numeric  AS neg_marks
    FROM graded g
    JOIN public.mock_tests m ON m.id = g.mock_id
    CROSS JOIN LATERAL jsonb_array_elements(m.questions) e
  ),
  keyed AS (
    SELECT s.attempt_id, s.position, s.question_id, s.section_key, s.grace,
           s.marks, s.neg_marks,
           q.subject_id, q.chapter_id, q.subtopic_id,
           q.difficulty::text AS difficulty,
           q.question_format::text AS fmt,
           q.numeric_answer,
           (SELECT o.label FROM public.options o
             WHERE o.question_id = q.id AND o.is_correct LIMIT 1) AS key_label
    FROM snap s
    JOIN public.questions q ON q.id = s.question_id
  ),
  -- Interned taxonomy. dense_rank over the NAME (not the id) so two ids that
  -- somehow share a name collapse to one label rather than rendering twice.
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
  ),
  -- Bank weightage for the (exam, subject) pairs this student has actually
  -- touched. Derived LIVE from the corpus on purpose: nda-tracker's
  -- NDA_FREQ_BY_SUBJECT is a hand-transcribed copy of this same bank frozen at
  -- 2026-05-17, and the bank has grown since. A frozen share is a claim with an
  -- expiry date; a derived one cannot go stale.
  wt AS (
    SELECT e.name AS exam, s.name AS subject, c.name AS chapter, count(*)::int AS q
    FROM public.questions qq
    JOIN public.exams e    ON e.id = qq.exam_id
    JOIN public.subjects s ON s.id = qq.subject_id
    JOIN public.chapters c ON c.id = qq.chapter_id
    WHERE qq.question_kind = 'pyq'
      AND qq.visibility = 'PUBLIC'
      AND qq.subject_id IN (SELECT DISTINCT subject_id FROM keyed)
    GROUP BY 1, 2, 3
  )
  SELECT jsonb_build_object(
    'userId', p_user_id,
    'attempts', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
        'attemptId',      a.id,
        'mockSlug',       m.slug,
        'mockTitle',      m.title,
        'examName',       e.name,
        'paperCode',      m.paper_code,
        'pyqYear',        m.pyq_year,
        'source',         m.source,
        'scope',          m.scope,
        'sections',       m.sections,
        'totalQuestions', m.total_questions,
        'totalMarks',     m.total_marks,
        'durationSecs',   m.duration_secs,
        'status',         a.status,
        'startedAt',      a.started_at,
        'submittedAt',    a.submitted_at,
        'score',          a.score,
        'maxScore',       a.max_score
      ) ORDER BY a.started_at)
      FROM att a
      JOIN public.mock_tests m ON m.id = a.mock_id
      JOIN public.exams e ON e.id = m.exam_id
    ), '[]'::jsonb),
    'dims', jsonb_build_object(
      'subjects',  coalesce((SELECT jsonb_agg(s.name ORDER BY s.idx)
                               FROM (SELECT DISTINCT name, idx FROM subj) s), '[]'::jsonb),
      'chapters',  coalesce((SELECT jsonb_agg(c.name ORDER BY c.idx)
                               FROM (SELECT DISTINCT name, idx FROM chap) c), '[]'::jsonb),
      'subtopics', coalesce((SELECT jsonb_agg(t.name ORDER BY t.idx)
                               FROM (SELECT DISTINCT name, idx FROM subt) t), '[]'::jsonb)
    ),
    -- Short keys: this array IS the payload. a=attemptId p=position
    -- q=questionId, s/c/t = subject/chapter/subtopic index into dims,
    -- d=difficulty, f=format, k=key label, kn=key numeric, r=response label,
    -- rn=response numeric, g=grace, ts=seconds on the question,
    -- rc=REACHED (an answer row exists at all).
    'facts', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
        'a',  k.attempt_id,
        'p',  k.position,
        'q',  k.question_id,
        's',  subj.idx,
        'c',  chap.idx,
        't',  subt.idx,
        'd',  k.difficulty,
        'f',  k.fmt,
        'k',  k.key_label,
        'kn', k.numeric_answer,
        'r',  aa.selected_label,
        'rn', aa.numeric_response,
        'g',  k.grace,
        'm',  k.marks,
        'nm', k.neg_marks,
        'ts', coalesce(aa.time_spent_secs, 0),
        'rc', (aa.attempt_id IS NOT NULL)
      ) ORDER BY k.attempt_id, k.position)
      FROM keyed k
      JOIN subj ON subj.id = k.subject_id
      JOIN chap ON chap.id = k.chapter_id
      JOIN subt ON subt.id = k.subtopic_id
      LEFT JOIN public.attempt_answers aa
             ON aa.attempt_id = k.attempt_id AND aa.question_id = k.question_id
    ), '[]'::jsonb),
    'weightage', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
        'exam', wt.exam, 'subject', wt.subject, 'chapter', wt.chapter, 'q', wt.q
      ) ORDER BY wt.exam, wt.subject, wt.q DESC)
      FROM wt
    ), '[]'::jsonb)
  );
$fn$;

-- Revoke from PUBLIC *and* the Supabase default-privilege roles by name — a bare
-- REVOKE FROM PUBLIC leaves the explicit anon/authenticated grants Supabase adds
-- to new public functions (advisors 0028/0029 flag those). Only service_role may
-- call it; the page uses the service-role client behind a superadmin gate.
REVOKE ALL ON FUNCTION public.get_student_performance(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_performance(uuid) TO service_role;
