-- 0147_board_paper_parts.sql
--
-- Maharashtra board papers on /question-papers (2026-10-10), two changes to 0146.
--
-- 1. A QUESTION IN PARTS. A Maharashtra paper prints marks for a whole
--    question, "Q. 31 [4]", even when the question is set in parts ("(i) derive
--    ..., (ii) calculate ..."), and the paper does not say how the 4 divide. 89
--    HSC questions and many SSC ones are set this way. Splitting the marks would
--    be invented, so a part names its question (`part_of`, an earlier position)
--    and carries no marks; the question's first item carries them for the whole.
--    Every item is exactly one of: a question with marks, or a part without.
--
-- 2. ONE PAPER, TWO BANK SUBJECTS. The SSC "History and Political Science"
--    paper is one 40-mark paper, but the bank files its questions under History
--    and under Political Science. 0146's guard required an item's question to be
--    of the paper's subject, which refuses that paper. The guard now requires the
--    paper's EXAM (and PUBLIC), which is what keeps a paper honest; the builder
--    still checks each paper's subjects against the source it was built from.

ALTER TABLE public.board_paper_items
  ADD COLUMN part_of smallint CHECK (part_of IS NULL OR (part_of >= 1 AND part_of < position));

ALTER TABLE public.board_paper_items ALTER COLUMN marks DROP NOT NULL;
ALTER TABLE public.board_paper_items DROP CONSTRAINT board_paper_items_marks_check;
ALTER TABLE public.board_paper_items
  ADD CONSTRAINT board_paper_items_marks_or_part
    CHECK ((part_of IS NULL AND marks IS NOT NULL AND marks > 0) OR (part_of IS NOT NULL AND marks IS NULL));

CREATE OR REPLACE FUNCTION private.board_paper_item_guard()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  v_paper public.board_papers%ROWTYPE;
  v_ok boolean;
BEGIN
  SELECT * INTO v_paper FROM public.board_papers WHERE id = NEW.paper_id;
  -- Exam, not subject (0147): one SSC paper spans History and Political Science.
  SELECT (q.visibility = 'PUBLIC' AND q.exam_id = v_paper.exam_id)
    INTO v_ok
    FROM public.questions q WHERE q.id = NEW.question_id;
  IF v_ok IS NOT TRUE THEN
    RAISE EXCEPTION 'board paper %: question % is not a PUBLIC question of this paper''s exam',
      v_paper.slug, NEW.question_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.board_paper_replace(p_paper jsonb, p_items jsonb)
RETURNS integer
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  v_id uuid;
  v_count integer;
BEGIN
  INSERT INTO public.board_papers AS b (
    exam_id, subject_id, slug, group_slug, set_number, year, sitting, paper_code,
    title, total_marks, duration_minutes, sections, published
  ) VALUES (
    (p_paper->>'examId')::uuid, (p_paper->>'subjectId')::uuid, p_paper->>'slug', p_paper->>'groupSlug',
    (p_paper->>'setNumber')::smallint, (p_paper->>'year')::integer, p_paper->>'sitting', p_paper->>'paperCode',
    p_paper->>'title', (p_paper->>'totalMarks')::numeric, (p_paper->>'durationMinutes')::integer,
    COALESCE(p_paper->'sections', '[]'::jsonb), COALESCE((p_paper->>'published')::boolean, false)
  )
  ON CONFLICT (exam_id, slug) DO UPDATE SET
    subject_id = EXCLUDED.subject_id, group_slug = EXCLUDED.group_slug, set_number = EXCLUDED.set_number,
    year = EXCLUDED.year, sitting = EXCLUDED.sitting, paper_code = EXCLUDED.paper_code,
    title = EXCLUDED.title, total_marks = EXCLUDED.total_marks, duration_minutes = EXCLUDED.duration_minutes,
    sections = EXCLUDED.sections, published = EXCLUDED.published, updated_at = now()
  RETURNING b.id INTO v_id;

  DELETE FROM public.board_paper_items WHERE paper_id = v_id;
  INSERT INTO public.board_paper_items
    (paper_id, position, printed_number, section, marks, alternative_to, case_key, question_id, part_of)
  SELECT v_id, (i->>'position')::smallint, i->>'printedNumber', i->>'section', (i->>'marks')::numeric,
         (i->>'alternativeTo')::smallint, i->>'caseKey', (i->>'questionId')::uuid, (i->>'partOf')::smallint
    FROM jsonb_array_elements(p_items) AS i;
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

REVOKE ALL ON FUNCTION public.board_paper_replace(jsonb, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.board_paper_replace(jsonb, jsonb) TO service_role;
