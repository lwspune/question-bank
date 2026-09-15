-- 0100_student_performance_subtopic_weightage.sql
--
-- Re-grains `get_student_performance`'s weightage from CHAPTER to SUBTOPIC.
-- Everything else in the function is byte-identical to 0099; read that file's
-- header for why the whole payload is one jsonb row and why this RPC makes no
-- judgement about correctness.
--
-- WHY. The projected-score card could rank chapters and nothing finer, so
-- "Matrices & Determinants, 10.3 of 23.1 marks" was as specific as the advice
-- got. The performance side already reaches subtopic (`SubtopicRow`); only the
-- BANK side stopped at chapter, so the finer level was one GROUP BY column away.
--
-- WHY NOT IMPORT nda-tracker's TABLE. It has one: NDA_SUBTOPIC_SHARES, 111 rows.
-- Its own header states the source -- "PYQ Vault's NDA Maths taxonomy ... as of
-- 2026-05-17" -- so it is a hand-transcribed copy of THIS bank, frozen, and
-- covering a single subject. NDA Maths has since gone 2,160 -> 2,280. Deriving
-- it here is live and covers every subject a student has touched, which is the
-- same argument migration 0099 already made for the chapter counts.
--
-- GRAIN, AND WHY ONLY ONE. Chapter totals are SUMMED from these rows in the pure
-- core rather than returned alongside them. A pooled figure is derivable from
-- per-row detail and never the reverse (the rule question_item_stats follows),
-- and two independently-supplied totals are two chances to disagree behind one
-- UI toggle. The parity is pinned by test: feeding one row per chapter must
-- leave every chapter number identical.
--
-- COST, MEASURED AFTER APPLYING (the pre-flight estimate of ~9% was low; this
-- is the real figure). Against the heaviest student on production the weightage
-- array goes 278 -> 1,257 rows and 22 kB -> 155 kB, so +133 kB, which is +11.7%
-- of the payload as it stood before. `facts` is still 1,074 kB of the 1,270 kB
-- total -- weightage is not close to being the expensive part. The read is the
-- same single index scan over `questions` with one more column in its GROUP BY.
--
-- The version of this file APPLIED to production carries the pre-flight ~9% in
-- its comment; the executable SQL is identical and only this note was corrected.
--
-- NULL SUBTOPICS. Zero of 34,676 PUBLIC PYQ rows have one today. The LEFT JOIN
-- below keeps it that way VISIBLY -- see the comment at the CTE.

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
    SELECT e.name AS exam, s.name AS subject, c.name AS chapter,
           -- LEFT JOIN + coalesce, not an inner join. Today zero of 34,676
           -- PUBLIC PYQs carry a null subtopic, so this changes nothing; if one
           -- ever does, an inner join would drop its marks out of the pool
           -- SILENTLY and every other subtopic's share would quietly inflate.
           -- A visible label is a question someone can answer.
           coalesce(t.name, '(unclassified)') AS subtopic,
           count(*)::int AS q
    FROM public.questions qq
    JOIN public.exams e    ON e.id = qq.exam_id
    JOIN public.subjects s ON s.id = qq.subject_id
    JOIN public.chapters c ON c.id = qq.chapter_id
    LEFT JOIN public.subtopics t ON t.id = qq.subtopic_id
    WHERE qq.question_kind = 'pyq'
      AND qq.visibility = 'PUBLIC'
      AND qq.subject_id IN (SELECT DISTINCT subject_id FROM keyed)
    GROUP BY 1, 2, 3, 4
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
        'exam', wt.exam, 'subject', wt.subject, 'chapter', wt.chapter,
        'subtopic', wt.subtopic, 'q', wt.q
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
