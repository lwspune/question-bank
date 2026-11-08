-- 0238_mock_question_papers.sql
--
-- Which published past paper each question sits in, kept as a list instead of
-- unpacked from every paper on every read (2026-11-08).
--
-- WHY. papers_of_questions (0148) backs the source pill on every /browse page
-- and /questions chapter page: for the ~25 questions shown, which past paper
-- is each one from. It found them by unpacking the question list of all 496
-- published full past papers (47,466 entries) and keeping the matches: ~2,770
-- buffers and ~175 ms a page, 1,637 calls and ~31 GB read in the 36 hours to
-- 2026-11-08.
--
-- A GIN index on mock_tests.questions was tried first and REJECTED: the
-- planner mis-costs the containment test on this table and scanned all 496
-- papers once per id anyway (41,101 buffers in a join, 43,339 fenced in a
-- LATERAL; measured inside a rolled-back transaction on production).
--
-- HOW. mock_question_papers holds (question_id, mock_id) for every question of
-- every published, whole, past-year paper. A row trigger on mock_tests rewrites
-- a paper's rows whenever its questions, status, source, scope or year change;
-- deleting a paper cascades. Papers are written rarely and a few at a time, so
-- the trigger costs nothing a reader notices. papers_of_questions now joins
-- the list on question_id (primary key) and reads each matching paper's slug
-- and year by primary key: a few dozen index lookups a page.
--
-- SAME RESULTS, pinned by tests/papers-of-questions.integration.test.ts
-- (written against 0148, passing there first): published + source 'pyq' +
-- scope 'full' only; a question in two papers returns both; same columns and
-- order. A question id that appears twice in one paper yields one row (0148
-- yielded two; no paper does that).
--
-- SECURITY. The list says only which published paper a question is in, which
-- the paper itself already shows to anyone, so it is readable by all. No
-- policy allows a write; only the SECURITY DEFINER trigger writes it.
-- papers_of_questions stays SECURITY INVOKER.
-- No foreign key to questions: a paper may name a question that was later
-- removed, and that must not block saving the paper (0148 tolerated it too).

CREATE TABLE public.mock_question_papers (
  question_id uuid NOT NULL,
  mock_id uuid NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
  PRIMARY KEY (question_id, mock_id)
);

CREATE INDEX mock_question_papers_mock_idx ON public.mock_question_papers (mock_id);

ALTER TABLE public.mock_question_papers ENABLE ROW LEVEL SECURITY;

CREATE POLICY mock_question_papers_read ON public.mock_question_papers
  FOR SELECT TO anon, authenticated USING (true);

REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.mock_question_papers FROM anon, authenticated;
GRANT SELECT ON public.mock_question_papers TO anon, authenticated;

CREATE OR REPLACE FUNCTION private.mock_question_papers_sync()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    DELETE FROM public.mock_question_papers WHERE mock_id = OLD.id;
  END IF;
  IF NEW.status = 'published' AND NEW.source = 'pyq' AND NEW.scope = 'full' AND NEW.pyq_year IS NOT NULL THEN
    INSERT INTO public.mock_question_papers (question_id, mock_id)
    SELECT DISTINCT (e->>'questionId')::uuid, NEW.id
      FROM jsonb_array_elements(NEW.questions) e
     WHERE e->>'questionId' IS NOT NULL
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NULL;
END;
$$;

REVOKE ALL ON FUNCTION private.mock_question_papers_sync() FROM PUBLIC;

CREATE TRIGGER mock_tests_question_papers_ins
  AFTER INSERT ON public.mock_tests
  FOR EACH ROW EXECUTE FUNCTION private.mock_question_papers_sync();

CREATE TRIGGER mock_tests_question_papers_upd
  AFTER UPDATE OF questions, status, source, scope, pyq_year ON public.mock_tests
  FOR EACH ROW EXECUTE FUNCTION private.mock_question_papers_sync();

-- Every published past paper, once.
INSERT INTO public.mock_question_papers (question_id, mock_id)
SELECT DISTINCT (e->>'questionId')::uuid, m.id
  FROM public.mock_tests m
  CROSS JOIN LATERAL jsonb_array_elements(m.questions) e
 WHERE m.status = 'published' AND m.source = 'pyq' AND m.scope = 'full' AND m.pyq_year IS NOT NULL
   AND e->>'questionId' IS NOT NULL
ON CONFLICT DO NOTHING;

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
    SELECT x.question_id,
           'mock'::text AS kind,
           m.slug,
           m.pyq_year AS year,
           NULL::text AS exam_name,
           NULL::text AS subject_name
      FROM public.mock_question_papers x
      JOIN public.mock_tests m ON m.id = x.mock_id
     WHERE x.question_id = ANY (p_ids)
       -- The list holds only these; restated so a stale row can never leak a draft.
       AND m.status = 'published'
       AND m.source = 'pyq'
       AND m.scope = 'full'
       AND m.pyq_year IS NOT NULL
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
