-- 0215: a mock answer can be a SET of options (multiple-select questions, 0214).
--
-- UCEED Part A carries multiple-select questions (question_format 'msq'): the student ticks
-- every option they think is correct. selected_label holds one letter, so a tick set needs
-- its own column, the same way 0087 gave numeric answers numeric_response rather than
-- widening selected_label to free text.
--
-- WHY AN ARRAY rather than one row per tick: a row is one question of one attempt, and every
-- reader (palette, grader, review, roster RPCs) reads one row per question. An array keeps
-- that shape; a child table would make each of them join and regroup.
--
-- The CHECKS keep three things true at the database:
--   * only A-E (0179's alphabet), never empty: an empty set IS unanswered, and unanswered is
--     stored as NULL, the meaning the other two columns already give it (the palette reads
--     "all null" as not answered);
--   * no letter twice (a doubled tick would score twice under partial credit);
--   * at most one KIND of response per row, replacing 0087's two-column check.

ALTER TABLE public.attempt_answers
  ADD COLUMN IF NOT EXISTS selected_labels text[];

-- A CHECK cannot hold a subquery, so "no letter twice" lives in an immutable helper, in the
-- private schema PostgREST does not expose.
CREATE OR REPLACE FUNCTION private.text_array_has_no_repeats(a text[])
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path = ''
AS $$
  SELECT cardinality(a) = (SELECT count(DISTINCT x) FROM unnest(a) AS x)
$$;

ALTER TABLE public.attempt_answers
  DROP CONSTRAINT IF EXISTS attempt_answers_selected_labels_check;
ALTER TABLE public.attempt_answers
  ADD CONSTRAINT attempt_answers_selected_labels_check
  CHECK (
    selected_labels IS NULL
    OR (
      cardinality(selected_labels) BETWEEN 1 AND 5
      AND selected_labels <@ ARRAY['A', 'B', 'C', 'D', 'E']
      AND private.text_array_has_no_repeats(selected_labels)
    )
  );

ALTER TABLE public.attempt_answers
  DROP CONSTRAINT IF EXISTS attempt_answers_one_response;
ALTER TABLE public.attempt_answers
  ADD CONSTRAINT attempt_answers_one_response
  CHECK (num_nonnulls(selected_label, numeric_response, selected_labels) <= 1);

COMMENT ON COLUMN public.attempt_answers.selected_labels IS
  'The options a student ticked on a multiple-select question (A-E, no repeats, never empty). Exclusive with selected_label and numeric_response; all three null means unanswered.';

-- The graded attempt keeps the partly right count beside correct / wrong / skipped (owner,
-- 2026-11-04: "its own 'partly right' count"). Zero for every paper without multiple-select.
ALTER TABLE public.mock_attempts
  ADD COLUMN IF NOT EXISTS partial_count integer NOT NULL DEFAULT 0
  CHECK (partial_count >= 0);

COMMENT ON COLUMN public.mock_attempts.partial_count IS
  'Multiple-select answers that earned partial credit (some right options ticked, no wrong one). Counted apart from correct_count and wrong_count.';
