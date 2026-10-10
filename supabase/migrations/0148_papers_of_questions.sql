-- 0148: papers_of_questions — which published past paper each question came from.
--
-- Why: a question card's blue source pill ("MPSC Group B & C Prelims · 2017 ·
-- Group C · 28 May 2017 · Q52") is the thing students tap, and Clarity showed
-- them tapping it again and again. It only opened and closed the card. From
-- 2026-10-10 it opens the paper itself, so the page needs, for the 25 questions
-- it shows, the paper each one sits in.
--
-- Two kinds of paper, both already public to anyone:
--   mock  — a whole past paper served as a timed test (/mock/<slug>):
--           status 'published', source 'pyq', scope 'full'. Chapter tests and
--           assembled practice papers are NOT the paper the pill names, so they
--           are left out.
--   board — a printed board paper on /question-papers (migration 0146),
--           published only.
--
-- SECURITY INVOKER on purpose: the caller's own RLS decides what it may see
-- (mock_tests_select_published, board_papers_read_published,
-- board_paper_items_read_published), so this exposes nothing a plain select
-- could not. It exists to do the jsonb unnest in Postgres instead of shipping
-- every mock's question list to the page.
--
-- The page checks each row's year against the year the pill prints and drops a
-- mismatch, so a stale or odd row can never send a student to the wrong paper.
-- No question sits in more than one paper today (measured 2026-10-10); if one
-- ever does, the page keeps the first row, ordered here mock first, then by slug.

CREATE OR REPLACE FUNCTION public.papers_of_questions(p_ids uuid[])
RETURNS TABLE (
  question_id uuid,
  kind text,
  slug text,
  year integer,
  exam_name text,
  subject_name text
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT * FROM (
    SELECT (e->>'questionId')::uuid AS question_id,
           'mock'::text AS kind,
           m.slug,
           m.pyq_year AS year,
           NULL::text AS exam_name,
           NULL::text AS subject_name
      FROM public.mock_tests m
      CROSS JOIN LATERAL jsonb_array_elements(m.questions) e
     WHERE m.status = 'published'
       AND m.source = 'pyq'
       AND m.scope = 'full'
       AND m.pyq_year IS NOT NULL
       AND (e->>'questionId')::uuid = ANY (p_ids)
    UNION ALL
    SELECT i.question_id,
           'board'::text,
           p.group_slug,
           p.year,
           x.name,
           s.name
      FROM public.board_paper_items i
      JOIN public.board_papers p ON p.id = i.paper_id AND p.published
      JOIN public.exams x ON x.id = p.exam_id
      JOIN public.subjects s ON s.id = p.subject_id
     WHERE i.question_id = ANY (p_ids)
  ) r
  ORDER BY r.question_id, r.kind DESC, r.slug;
$$;

REVOKE ALL ON FUNCTION public.papers_of_questions(uuid[]) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.papers_of_questions(uuid[]) TO anon, authenticated, service_role;
