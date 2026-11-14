-- 0253_exam_feature_coverage.sql
--
-- get_exam_feature_coverage(): one read for /dashboard/exam-features, which
-- puts each exam's features beside how many students picked it, so the next
-- notes chapter, guide or mock set goes where the students are. Asked for on
-- 2026-11-14 after a hand-built table showed 5 of the 10 most-picked exams
-- had no notes.
--
-- Returns jsonb {exams: [...], students: [...]}:
--   exams    one row per exams.name: PUBLIC questions by kind, questions with
--            an animated solution, platform mocks (published full / published
--            chapter-or-section / draft), published homework plans and board
--            papers, NDA-twin links on either side, and distinct students who
--            started one of its platform mocks.
--   students one row per target slug in student_profiles.target_exams: the
--            students who picked it, and those of them with any user_activity
--            row in the last 30 days.
-- "Student" means not staff: no org_members row and no platform_admins row,
-- the same exclusion the growth and PMF readouts use, plus platform staff.
--
-- Notes, guides, Learn, the board reader and bilingual papers are CODE facts
-- (registries in src/), joined in src/lib/examFeatures/build.ts, so they are
-- not here.
--
-- Cost, measured before writing: the questions aggregate is one parallel seq
-- scan, ~117 ms (EXPLAIN ANALYZE, TIMING OFF), sort in memory (27 kB); every
-- other input is a few thousand rows.
--
-- Posture as get_growth_snapshot / get_pmf_snapshot: SECURITY DEFINER,
-- search_path pinned, EXECUTE for service_role only, read from a
-- superadmin-gated page with the service-role client.

CREATE OR REPLACE FUNCTION public.get_exam_feature_coverage()
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  WITH staff AS (
    SELECT user_id FROM public.org_members
    UNION
    SELECT user_id FROM public.platform_admins
  ),
  q AS (
    SELECT exam_id,
           count(*) FILTER (WHERE question_kind = 'pyq') AS pyq,
           count(*) FILTER (WHERE question_kind = 'practice') AS practice,
           count(*) FILTER (WHERE solution_visual IS NOT NULL) AS animated
    FROM public.questions
    WHERE visibility = 'PUBLIC'
    GROUP BY exam_id
  ),
  m AS (
    SELECT exam_id,
           count(*) FILTER (WHERE status = 'published' AND scope = 'full') AS full_mocks,
           count(*) FILTER (WHERE status = 'published' AND scope = 'sectional') AS section_mocks,
           count(*) FILTER (WHERE status = 'draft') AS draft_mocks
    FROM public.mock_tests
    WHERE owner_id IS NULL
    GROUP BY exam_id
  ),
  takers AS (
    SELECT mt.exam_id, count(DISTINCT a.user_id) AS mock_takers
    FROM public.mock_attempts a
    JOIN public.mock_tests mt ON mt.id = a.mock_id
    WHERE mt.owner_id IS NULL
      AND NOT EXISTS (SELECT 1 FROM staff s WHERE s.user_id = a.user_id)
    GROUP BY mt.exam_id
  ),
  hw AS (
    SELECT exam_id, count(*) AS homework
    FROM public.homework_plans
    WHERE published
    GROUP BY exam_id
  ),
  bp AS (
    SELECT exam_id, count(*) AS board_papers
    FROM public.board_papers
    WHERE published
    GROUP BY exam_id
  ),
  tw_src AS (
    SELECT qq.exam_id, count(DISTINCT x.source_question_id) AS n
    FROM public.exam_twins x
    JOIN public.questions qq ON qq.id = x.source_question_id
    GROUP BY qq.exam_id
  ),
  tw_tgt AS (
    SELECT qq.exam_id, count(DISTINCT x.target_question_id) AS n
    FROM public.exam_twins x
    JOIN public.questions qq ON qq.id = x.target_question_id
    GROUP BY qq.exam_id
  ),
  active AS (
    SELECT DISTINCT user_id
    FROM public.user_activity
    WHERE created_at > now() - interval '30 days'
  ),
  picks AS (
    SELECT t.slug,
           count(DISTINCT p.user_id) AS students,
           count(DISTINCT p.user_id) FILTER (WHERE EXISTS (SELECT 1 FROM active a WHERE a.user_id = p.user_id)) AS active30
    FROM public.student_profiles p
    CROSS JOIN LATERAL unnest(p.target_exams) AS t(slug)
    WHERE NOT EXISTS (SELECT 1 FROM staff s WHERE s.user_id = p.user_id)
    GROUP BY t.slug
  )
  SELECT jsonb_build_object(
    'exams', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'exam_name', e.name,
        'pyq', COALESCE(q.pyq, 0),
        'practice', COALESCE(q.practice, 0),
        'animated', COALESCE(q.animated, 0),
        'full_mocks', COALESCE(m.full_mocks, 0),
        'section_mocks', COALESCE(m.section_mocks, 0),
        'draft_mocks', COALESCE(m.draft_mocks, 0),
        'homework', COALESCE(hw.homework, 0),
        'board_papers', COALESCE(bp.board_papers, 0),
        'twins_source', COALESCE(tw_src.n, 0),
        'twins_target', COALESCE(tw_tgt.n, 0),
        'mock_takers', COALESCE(takers.mock_takers, 0)
      ) ORDER BY e.name)
      FROM public.exams e
      LEFT JOIN q ON q.exam_id = e.id
      LEFT JOIN m ON m.exam_id = e.id
      LEFT JOIN takers ON takers.exam_id = e.id
      LEFT JOIN hw ON hw.exam_id = e.id
      LEFT JOIN bp ON bp.exam_id = e.id
      LEFT JOIN tw_src ON tw_src.exam_id = e.id
      LEFT JOIN tw_tgt ON tw_tgt.exam_id = e.id
    ), '[]'::jsonb),
    'students', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('slug', slug, 'students', students, 'active30', active30) ORDER BY slug)
      FROM picks
    ), '[]'::jsonb)
  );
$$;

REVOKE ALL ON FUNCTION public.get_exam_feature_coverage() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_exam_feature_coverage() TO service_role;
