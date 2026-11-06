-- 0220_exam_twins.sql — "Asked in NDA" under a board question (2026-11-06)
--
-- WHY. Teachers tell students "the board book is the foundation for NDA, CET,
-- JEE and NEET". The owner wants that shown with evidence, on the question the
-- student is studying: a line under a board question saying which entrance
-- past papers asked the same question, the same with new numbers, or a similar
-- one, and a count per chapter. A pilot (NDA Matrices vs the Maharashtra XI and
-- XII books, 406 board questions, every pair read by the main session) found
-- 139 board questions with an NDA twin and 60 of NDA's 181 Matrices questions
-- (33%) with a board twin.
--
-- WHAT. One row per settled pair: the source question (the board side), the
-- target question (an entrance exam's past question), the kind and a one-line
-- reason. Pairs are proposed by agents and settled by a person
-- (scripts/cross-exam/README.md); they are written only by the service role.
--
-- THE KINDS (the page words them; src/lib/crossExam/summary.ts):
--   exact    the same question; only wording or format differ
--   numbers  the same question with new numbers or another matrix
--   similar  the same specific task, so one worked example teaches both
--
-- RULES THE DATABASE KEEPS, because the line is a claim about a real exam:
--   * the target is a past-paper question (question_kind 'pyq'): a practice
--     question is never "asked in NDA";
--   * the two questions belong to different exams;
--   * both are PUBLIC when the link is written, and a reader sees a link only
--     while both still are (a question made private later hides its links);
--   * a deleted question takes its links with it.
-- Source and target are not tied to board / entrance exams in SQL: which exams
-- count as boards is EXAM_REGISTRY's (`board`), in code, and the reverse view
-- (an NDA question showing its textbook twin) reads the same rows.
--
-- Primary key (source, target): one verdict per pair; a re-review replaces it.
-- The target index serves that reverse view and the ON DELETE CASCADE.

CREATE TABLE public.exam_twins (
  source_question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  target_question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('exact', 'numbers', 'similar')),
  why text NOT NULL CHECK (length(btrim(why)) BETWEEN 1 AND 200),
  review_run text NOT NULL CHECK (length(btrim(review_run)) BETWEEN 1 AND 80),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (source_question_id, target_question_id),
  CHECK (source_question_id <> target_question_id)
);

CREATE INDEX exam_twins_target_idx ON public.exam_twins (target_question_id);

COMMENT ON TABLE public.exam_twins IS
  'Settled links from a board question to an entrance exam''s past question it matches (exact / numbers / similar). Read by /board and /homework for the "Asked in NDA" line. Service-role writes only; see migration 0220.';

CREATE OR REPLACE FUNCTION private.exam_twins_guard()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  s public.questions%ROWTYPE;
  t public.questions%ROWTYPE;
BEGIN
  SELECT * INTO s FROM public.questions WHERE id = NEW.source_question_id;
  SELECT * INTO t FROM public.questions WHERE id = NEW.target_question_id;
  IF t.question_kind IS DISTINCT FROM 'pyq' THEN
    RAISE EXCEPTION 'exam twin target % is not a past-paper question', NEW.target_question_id;
  END IF;
  IF s.exam_id = t.exam_id THEN
    RAISE EXCEPTION 'exam twin % -> % links two questions of the same exam', NEW.source_question_id, NEW.target_question_id;
  END IF;
  IF s.visibility IS DISTINCT FROM 'PUBLIC' OR t.visibility IS DISTINCT FROM 'PUBLIC' THEN
    RAISE EXCEPTION 'exam twin % -> % needs both questions public', NEW.source_question_id, NEW.target_question_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER exam_twins_guard
  BEFORE INSERT OR UPDATE ON public.exam_twins
  FOR EACH ROW EXECUTE FUNCTION private.exam_twins_guard();

ALTER TABLE public.exam_twins ENABLE ROW LEVEL SECURITY;

CREATE POLICY exam_twins_read_public ON public.exam_twins
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (SELECT 1 FROM public.questions s WHERE s.id = source_question_id AND s.visibility = 'PUBLIC')
    AND EXISTS (SELECT 1 FROM public.questions t WHERE t.id = target_question_id AND t.visibility = 'PUBLIC')
  );
