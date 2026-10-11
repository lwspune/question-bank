-- 0153_answer_sheets.sql
--
-- Checked answer sheets (2026-10-11): a student writes a board past paper from
-- /question-papers on paper, uploads photos or a PDF, and gets marks for every
-- question with what earned them and what was missing, within 48 hours.
--
-- HOW IT IS GRADED. By hand, in a chat session, one submission per session,
-- against scripts/grading/GRADING.md (the playbook that collects every learning).
-- scripts/grading/pull.ts writes the brief, the grader fills grade.json,
-- scripts/grading/commit.ts checks it (lib/answerSheets/grade.ts) and calls
-- answer_grade_commit. Free while the grading rules are being shaped: one
-- submission per student per IST day.
--
-- WHY THE GRADE COPIES THE QUESTION'S NUMBER AND MARKS. board_paper_replace
-- deletes and re-inserts a paper's items on every rebuild (0146), so a grade
-- cannot point at an item row. It keeps the printed number and the maximum it
-- was graded against; `awarded <= max_marks` is then a CHECK on the row itself.
--
-- RULES THE DATABASE ENFORCES:
--   * marks between 0 and the question's maximum, in halves; marks only on a
--     scored question;
--   * the total is summed HERE from the rows, never taken from the caller, and
--     may not pass the paper's maximum (answer_grade_commit);
--   * one submitted-or-graded sheet per student per IST day; a REJECTED sheet
--     (unreadable, wrong paper) does not use the day up;
--   * at most one unfinished upload per student;
--   * a status carries exactly the fields it needs (state CHECK).
--
-- SCANS. Private bucket `answer-sheets`, no storage policies at all: the
-- browser uploads through signed links the start route issues (a 25-page PDF
-- is far over Vercel's 4.5 MB request limit), and only the service role reads.
-- The bucket repeats the per-file size and type limits so a link cannot store
-- anything else. Scans are deleted 30 days after grading
-- (scripts/grading/purge.ts sets scans_deleted_at); the grade stays.
--
-- ACCESS. A student reads their own submissions and grades. All writes are the
-- service role's (routes and scripts), except a "question this grade" row,
-- which a student inserts on their own graded sheet and can never resolve.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('answer-sheets', 'answer-sheets', false, 20971520,
        ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE TABLE public.answer_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  -- RESTRICT: a paper someone has written is never deleted out from under them.
  board_paper_id uuid NOT NULL REFERENCES public.board_papers(id) ON DELETE RESTRICT,
  status text NOT NULL DEFAULT 'uploading' CHECK (status IN ('uploading', 'submitted', 'graded', 'rejected')),
  file_count smallint NOT NULL CHECK (file_count BETWEEN 1 AND 40),
  consent_at timestamptz NOT NULL,
  ist_day date NOT NULL DEFAULT ((now() AT TIME ZONE 'Asia/Kolkata')::date),
  created_at timestamptz NOT NULL DEFAULT now(),
  submitted_at timestamptz,
  graded_at timestamptz,
  regraded_at timestamptz,
  total_awarded numeric,
  total_max numeric,
  went_well text CHECK (went_well IS NULL OR length(btrim(went_well)) BETWEEN 1 AND 1500),
  next_steps text CHECK (next_steps IS NULL OR length(btrim(next_steps)) BETWEEN 1 AND 1500),
  rejected_reason text CHECK (rejected_reason IS NULL OR length(btrim(rejected_reason)) BETWEEN 1 AND 300),
  scans_deleted_at timestamptz,
  CONSTRAINT answer_submissions_state CHECK (
    (status = 'uploading' AND submitted_at IS NULL AND graded_at IS NULL
      AND total_awarded IS NULL AND rejected_reason IS NULL)
    OR (status = 'submitted' AND submitted_at IS NOT NULL AND graded_at IS NULL
      AND total_awarded IS NULL AND rejected_reason IS NULL)
    OR (status = 'graded' AND submitted_at IS NOT NULL AND graded_at IS NOT NULL
      AND total_awarded IS NOT NULL AND total_max IS NOT NULL
      AND total_awarded >= 0 AND total_awarded <= total_max
      AND went_well IS NOT NULL AND next_steps IS NOT NULL AND rejected_reason IS NULL)
    OR (status = 'rejected' AND submitted_at IS NOT NULL AND graded_at IS NOT NULL
      AND rejected_reason IS NOT NULL AND total_awarded IS NULL)
  )
);

-- One free sheet a day; a rejected one frees the day (the student fixes the photos and sends again).
CREATE UNIQUE INDEX answer_submissions_one_a_day
  ON public.answer_submissions (user_id, ist_day) WHERE status IN ('submitted', 'graded');
CREATE UNIQUE INDEX answer_submissions_one_uploading
  ON public.answer_submissions (user_id) WHERE status = 'uploading';
CREATE INDEX answer_submissions_queue ON public.answer_submissions (submitted_at) WHERE status = 'submitted';
CREATE INDEX answer_submissions_user ON public.answer_submissions (user_id, created_at DESC);
CREATE INDEX answer_submissions_paper ON public.answer_submissions (board_paper_id);

COMMENT ON TABLE public.answer_submissions IS
  'A student''s uploaded answer sheet for one board paper and its grading state (migration 0153). Written by the service role only.';

CREATE TABLE public.answer_grades (
  submission_id uuid NOT NULL REFERENCES public.answer_submissions(id) ON DELETE CASCADE,
  position smallint NOT NULL CHECK (position >= 1),
  printed_number text NOT NULL CHECK (length(btrim(printed_number)) BETWEEN 1 AND 40),
  question_id uuid REFERENCES public.questions(id) ON DELETE SET NULL,
  max_marks numeric NOT NULL CHECK (max_marks > 0),
  outcome text NOT NULL CHECK (outcome IN ('scored', 'not_attempted', 'not_counted')),
  awarded numeric,
  earned text CHECK (earned IS NULL OR length(btrim(earned)) BETWEEN 1 AND 1000),
  missing text CHECK (missing IS NULL OR length(btrim(missing)) BETWEEN 1 AND 1000),
  PRIMARY KEY (submission_id, position),
  CONSTRAINT answer_grades_marks CHECK (
    (outcome = 'scored' AND awarded IS NOT NULL AND awarded >= 0 AND awarded <= max_marks
      AND awarded * 2 = floor(awarded * 2))
    OR (outcome <> 'scored' AND awarded IS NULL)
  )
);

CREATE INDEX answer_grades_question ON public.answer_grades (question_id);

COMMENT ON TABLE public.answer_grades IS
  'One graded question of an answer sheet (migration 0153). Copies the printed number and maximum it was graded against, since paper items are rebuilt.';

CREATE TABLE public.answer_grade_disputes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- The submission, not the grade row: a regrade replaces the rows, the question stays.
  submission_id uuid NOT NULL REFERENCES public.answer_submissions(id) ON DELETE CASCADE,
  position smallint NOT NULL CHECK (position >= 1),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message text NOT NULL CHECK (length(btrim(message)) BETWEEN 5 AND 1000),
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  resolution text CHECK (resolution IS NULL OR length(btrim(resolution)) BETWEEN 1 AND 1000),
  CONSTRAINT answer_grade_disputes_resolved CHECK ((resolved_at IS NULL) = (resolution IS NULL)),
  UNIQUE (submission_id, position)
);

CREATE INDEX answer_grade_disputes_open ON public.answer_grade_disputes (created_at) WHERE resolved_at IS NULL;

COMMENT ON TABLE public.answer_grade_disputes IS
  'A student''s "question this grade" on one question of their graded sheet (migration 0153). Resolved by the grading session.';

ALTER TABLE public.answer_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answer_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answer_grade_disputes ENABLE ROW LEVEL SECURITY;

CREATE POLICY answer_submissions_select_own ON public.answer_submissions
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY answer_grades_select_own ON public.answer_grades
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.answer_submissions s WHERE s.id = submission_id AND s.user_id = auth.uid()));

CREATE POLICY answer_grade_disputes_select_own ON public.answer_grade_disputes
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY answer_grade_disputes_insert_own ON public.answer_grade_disputes
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND resolved_at IS NULL
    AND resolution IS NULL
    AND EXISTS (
      SELECT 1
        FROM public.answer_submissions s
        JOIN public.answer_grades g ON g.submission_id = s.id
       WHERE s.id = submission_id
         AND s.user_id = auth.uid()
         AND s.status = 'graded'
         AND g.position = answer_grade_disputes.position
    )
  );

-- Save a grade: replace the rows, sum the total HERE, refuse a total over the
-- paper's maximum, and mark the sheet graded, in one transaction. Accepts a
-- sheet already graded (a regrade after a question raised). Service role only.
CREATE OR REPLACE FUNCTION public.answer_grade_commit(
  p_submission uuid, p_grades jsonb, p_went_well text, p_next_steps text
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
  SELECT total_marks INTO v_max FROM public.board_papers WHERE id = v_sub.board_paper_id;

  DELETE FROM public.answer_grades WHERE submission_id = p_submission;
  INSERT INTO public.answer_grades
    (submission_id, position, printed_number, question_id, max_marks, outcome, awarded, earned, missing)
  SELECT p_submission, (g->>'position')::smallint, g->>'printedNumber', (g->>'questionId')::uuid,
         (g->>'maxMarks')::numeric, g->>'outcome', (g->>'awarded')::numeric,
         NULLIF(btrim(g->>'earned'), ''), NULLIF(btrim(g->>'missing'), '')
    FROM jsonb_array_elements(p_grades) AS g;

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
    next_steps = btrim(p_next_steps)
  WHERE id = p_submission;
  RETURN v_total;
END;
$$;

REVOKE ALL ON FUNCTION public.answer_grade_commit(uuid, jsonb, text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.answer_grade_commit(uuid, jsonb, text, text) TO service_role;

-- Turn a sheet away (unreadable, wrong paper, blank). Frees the student's day.
CREATE OR REPLACE FUNCTION public.answer_submission_reject(p_submission uuid, p_reason text)
RETURNS void
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  UPDATE public.answer_submissions
     SET status = 'rejected', graded_at = now(), rejected_reason = btrim(p_reason)
   WHERE id = p_submission AND status = 'submitted';
  IF NOT FOUND THEN
    RAISE EXCEPTION 'answer sheet % is not waiting to be graded', p_submission;
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.answer_submission_reject(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.answer_submission_reject(uuid, text) TO service_role;

-- The "your sheet is checked" email (scripts/grading/commit.ts).
ALTER TABLE public.email_sends DROP CONSTRAINT email_sends_kind_ck;
ALTER TABLE public.email_sends ADD CONSTRAINT email_sends_kind_ck
  CHECK (kind IN ('next_mock', 'first_mock', 'mock_report', 'due_nudge', 'welcome', 'answer_report'));
