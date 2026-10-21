-- 0175_answer_sheet_marks.sql
--
-- Checked answer sheets, second version (2026-10-21): every question that lost
-- marks names WHY, and the student gets their own pages back with the
-- grader's marks on them (ticks, crosses, circles, short notes, each
-- question's score) plus a report PDF. Brought over from nda-tracker's homework
-- grading (its migrations 20261016114402, 20261016120808, 20261016130100),
-- where these were shaped on 60+ real hand-ins.
--
-- WHY A CAUSE. The report adds the lost marks up by cause ("-6 concept gaps,
-- -2 slips"), says what fixing the slips is worth, and builds its "what to
-- focus on" list from them (lib/answerSheets/paperReport.ts). One cause per
-- question that lost marks; concept and incomplete also name the topic to work
-- on. The rule that a loss NEEDS a cause is added NOT VALID: it binds every
-- grade saved from now on, and the one sheet graded before (2026-10-12) stays
-- as it was. A regrade of it must add causes, which is right.
--
-- WHY MARKS IN THE DATABASE, NOT ONLY ON THE IMAGES. The marked page images
-- are what the student sees (<user>/<submission>/marked/NN.jpg in the private
-- `answer-sheets` bucket, uploaded by scripts/grading/commit.ts exactly as the
-- grader previewed them), but the marks are also kept as rows so a regrade
-- starts from them and the page can never disagree with the grade: the commit
-- refuses a scored question without exactly one score mark. Positions are
-- percent of the PREPARED page (upright, PDFs split: scripts/grading/pages.py).
-- The shape rules repeat lib/answerSheets/pageMarks.ts (MARK_KINDS,
-- MAX_NOTE_CHARS, MAX_MARKED_PAGES).
--
-- PAGE TURNS. A phone photo without a rotation tag arrives sideways, and the
-- grader turns it (grading:rotate) before placing marks. The marks are saved
-- on the TURNED page, so each page's quarter-turns are saved too: a regrade
-- pulls the scans again and must turn them the same way before the saved marks
-- mean anything (found running the pipeline end to end, 2026-10-21).
--
-- PURGE. The marked images go with the scans 30 days after grading (the
-- promise at upload and on /privacy); the grade, its causes and these rows stay.

ALTER TABLE public.answer_grades
  ADD COLUMN cause text,
  ADD COLUMN topic text;

ALTER TABLE public.answer_grades
  ADD CONSTRAINT answer_grades_cause_kind
    CHECK (cause IS NULL OR cause IN ('concept', 'incomplete', 'careless', 'misread', 'mcq')),
  -- A cause only where marks were lost.
  ADD CONSTRAINT answer_grades_cause_on_loss
    CHECK (cause IS NULL OR (outcome = 'scored' AND awarded < max_marks)),
  ADD CONSTRAINT answer_grades_topic
    CHECK (topic IS NULL OR (cause IS NOT NULL AND length(btrim(topic)) BETWEEN 1 AND 60));

-- A loss names its cause; a concept or incomplete cause names its topic.
-- coalesce(..., false): a NULL comparison would otherwise pass the CHECK.
ALTER TABLE public.answer_grades
  ADD CONSTRAINT answer_grades_cause_required CHECK (
    coalesce(outcome <> 'scored' OR awarded >= max_marks OR cause IS NOT NULL, false)
    AND (cause IS NULL OR cause NOT IN ('concept', 'incomplete') OR topic IS NOT NULL)
  ) NOT VALID;

COMMENT ON COLUMN public.answer_grades.cause IS
  'Why marks were lost (0175): concept, incomplete, careless, misread or mcq. Required on a scored question below its maximum for grades saved from 0175 on; NULL on the one sheet graded before.';
COMMENT ON COLUMN public.answer_grades.topic IS
  'What to relearn (concept) or show (incomplete), at most 60 characters, written for the student (0175).';

ALTER TABLE public.answer_submissions
  ADD COLUMN marked_pages smallint,
  ADD COLUMN page_turns smallint[],
  ADD CONSTRAINT answer_submissions_marked_pages
    CHECK (marked_pages IS NULL OR (marked_pages BETWEEN 1 AND 60 AND status = 'graded')),
  -- One quarter-turn count (0 to 3, clockwise) per marked page.
  ADD CONSTRAINT answer_submissions_page_turns
    CHECK (page_turns IS NULL OR (
      marked_pages IS NOT NULL
      AND cardinality(page_turns) = marked_pages
      AND page_turns <@ ARRAY[0, 1, 2, 3]::smallint[]
    ));

COMMENT ON COLUMN public.answer_submissions.page_turns IS
  'Each prepared page''s quarter-turns clockwise from the scan (0175), so a regrade turns the pages the same way before the saved marks are placed on them.';
COMMENT ON COLUMN public.answer_submissions.marked_pages IS
  'How many marked pages were uploaded to <user>/<submission>/marked/ (0175). NULL on a sheet graded before. The images are purged with the scans (scans_deleted_at); this count stays.';

CREATE TABLE public.answer_page_marks (
  submission_id uuid NOT NULL,
  seq smallint NOT NULL CHECK (seq >= 1),
  position smallint NOT NULL,
  page smallint NOT NULL CHECK (page BETWEEN 1 AND 60),
  kind text NOT NULL CHECK (kind IN ('tick', 'cross', 'circle', 'note', 'score')),
  x numeric(4,1) NOT NULL CHECK (x BETWEEN 0 AND 100),
  y numeric(4,1) NOT NULL CHECK (y BETWEEN 0 AND 100),
  w numeric(4,1),
  h numeric(4,1),
  text text,
  to_x numeric(4,1) CHECK (to_x BETWEEN 0 AND 100),
  to_y numeric(4,1) CHECK (to_y BETWEEN 0 AND 100),
  PRIMARY KEY (submission_id, seq),
  -- A mark belongs to a graded question. A (re)grade replaces the grade rows,
  -- and their marks go with them.
  CONSTRAINT answer_page_marks_grade FOREIGN KEY (submission_id, position)
    REFERENCES public.answer_grades (submission_id, position) ON DELETE CASCADE,
  -- Each kind carries only its own fields. coalesce(..., false): a NULL size
  -- or text must fail, and a bare comparison on NULL would pass the CHECK.
  CONSTRAINT answer_page_marks_size CHECK (CASE
    WHEN kind = 'circle' THEN coalesce(w > 0 AND w <= 100 AND h > 0 AND h <= 100, false)
    ELSE w IS NULL AND h IS NULL END),
  CONSTRAINT answer_page_marks_text CHECK (CASE
    WHEN kind = 'note' THEN coalesce(length(btrim(text)) BETWEEN 1 AND 80, false)
    ELSE text IS NULL END),
  CONSTRAINT answer_page_marks_to CHECK ((to_x IS NULL) = (to_y IS NULL) AND (to_x IS NULL OR kind = 'note'))
);

CREATE INDEX answer_page_marks_grade ON public.answer_page_marks (submission_id, position);

COMMENT ON TABLE public.answer_page_marks IS
  'Ticks, crosses, circles, notes and score marks on a checked answer sheet''s prepared pages (migration 0175). Written only by answer_grade_commit, with the grade.';

ALTER TABLE public.answer_page_marks ENABLE ROW LEVEL SECURITY;

CREATE POLICY answer_page_marks_select_own ON public.answer_page_marks
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.answer_submissions s WHERE s.id = submission_id AND s.user_id = auth.uid()));

-- Save a grade and its page marks in one transaction. Replaces 0153's version,
-- which took no marks: dropped, so no caller can save a grade without them.
DROP FUNCTION public.answer_grade_commit(uuid, jsonb, text, text);

CREATE FUNCTION public.answer_grade_commit(
  p_submission uuid, p_grades jsonb, p_went_well text, p_next_steps text,
  p_marks jsonb, p_marked_pages smallint, p_page_turns smallint[]
)
RETURNS numeric
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  v_sub public.answer_submissions%ROWTYPE;
  v_max numeric;
  v_total numeric;
BEGIN
  SELECT * INTO v_sub FROM public.answer_submissions WHERE id = p_submission FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'answer sheet % not found', p_submission;
  END IF;
  IF v_sub.status NOT IN ('submitted', 'graded') THEN
    RAISE EXCEPTION 'answer sheet % is %, so it cannot be graded', p_submission, v_sub.status;
  END IF;
  IF p_marked_pages IS NULL OR p_marked_pages NOT BETWEEN 1 AND 60 THEN
    RAISE EXCEPTION 'answer sheet %: marked pages must be 1 to 60, not %', p_submission, p_marked_pages;
  END IF;
  IF p_page_turns IS NULL OR cardinality(p_page_turns) <> p_marked_pages THEN
    RAISE EXCEPTION 'answer sheet %: give one page turn per marked page (%)', p_submission, p_marked_pages;
  END IF;
  SELECT total_marks INTO v_max FROM public.board_papers WHERE id = v_sub.board_paper_id;

  -- The old marks go with the old grade rows (ON DELETE CASCADE).
  DELETE FROM public.answer_grades WHERE submission_id = p_submission;
  INSERT INTO public.answer_grades
    (submission_id, position, printed_number, question_id, max_marks, outcome, awarded, earned, missing, cause, topic)
  SELECT p_submission, (g->>'position')::smallint, g->>'printedNumber', (g->>'questionId')::uuid,
         (g->>'maxMarks')::numeric, g->>'outcome', (g->>'awarded')::numeric,
         NULLIF(btrim(g->>'earned'), ''), NULLIF(btrim(g->>'missing'), ''),
         NULLIF(btrim(g->>'cause'), ''), NULLIF(btrim(g->>'topic'), '')
    FROM jsonb_array_elements(p_grades) AS g;

  INSERT INTO public.answer_page_marks
    (submission_id, seq, position, page, kind, x, y, w, h, text, to_x, to_y)
  SELECT p_submission, m.n::smallint, (m.v->>'position')::smallint, (m.v->>'page')::smallint, m.v->>'kind',
         (m.v->>'x')::numeric, (m.v->>'y')::numeric, (m.v->>'w')::numeric, (m.v->>'h')::numeric,
         NULLIF(btrim(m.v->>'text'), ''), (m.v->>'toX')::numeric, (m.v->>'toY')::numeric
    FROM jsonb_array_elements(COALESCE(p_marks, '[]'::jsonb)) WITH ORDINALITY AS m(v, n);

  IF EXISTS (SELECT 1 FROM public.answer_page_marks WHERE submission_id = p_submission AND page > p_marked_pages) THEN
    RAISE EXCEPTION 'answer sheet %: a mark is on a page past the % marked page(s)', p_submission, p_marked_pages;
  END IF;
  -- The page agrees with the grade: one score mark per scored question; a
  -- question not attempted has no marks; an answer not counted only notes.
  IF EXISTS (
    SELECT 1 FROM public.answer_grades g
     WHERE g.submission_id = p_submission
       AND (SELECT count(*) FROM public.answer_page_marks k
             WHERE k.submission_id = g.submission_id AND k.position = g.position AND k.kind = 'score')
           <> CASE WHEN g.outcome = 'scored' THEN 1 ELSE 0 END
  ) THEN
    RAISE EXCEPTION 'answer sheet %: every scored question needs exactly one score mark, and any other none', p_submission;
  END IF;
  IF EXISTS (
    SELECT 1 FROM public.answer_page_marks k
      JOIN public.answer_grades g ON g.submission_id = k.submission_id AND g.position = k.position
     WHERE k.submission_id = p_submission
       AND (g.outcome = 'not_attempted' OR (g.outcome = 'not_counted' AND k.kind <> 'note'))
  ) THEN
    RAISE EXCEPTION 'answer sheet %: a question not attempted takes no marks, and one not counted only a note', p_submission;
  END IF;

  SELECT COALESCE(sum(awarded), 0) INTO v_total
    FROM public.answer_grades WHERE submission_id = p_submission AND outcome = 'scored';
  IF v_total > v_max THEN
    RAISE EXCEPTION 'answer sheet %: total % is over the paper''s maximum %', p_submission, v_total, v_max;
  END IF;

  UPDATE public.answer_submissions SET
    status = 'graded',
    graded_at = COALESCE(graded_at, now()),
    regraded_at = CASE WHEN v_sub.status = 'graded' THEN now() ELSE NULL END,
    total_awarded = v_total,
    total_max = v_max,
    went_well = btrim(p_went_well),
    next_steps = btrim(p_next_steps),
    marked_pages = p_marked_pages,
    page_turns = p_page_turns
  WHERE id = p_submission;
  RETURN v_total;
END;
$$;

REVOKE ALL ON FUNCTION public.answer_grade_commit(uuid, jsonb, text, text, jsonb, smallint, smallint[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.answer_grade_commit(uuid, jsonb, text, text, jsonb, smallint, smallint[]) TO service_role;
