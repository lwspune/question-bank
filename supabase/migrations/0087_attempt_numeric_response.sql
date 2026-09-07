-- 0087 — a mock answer can be a VALUE, not only an option label.
--
-- WHY: JEE Mains Paper 1 carries a Section B of numeric-answer (NAT) questions —
-- no options at all, the key living in `questions.numeric_answer` (migration
-- 0061). Every mock shipped before this one was 100% MCQ, so `attempt_answers`
-- had exactly one answer column and 0044 constrained it to four letters:
--
--     selected_label text CHECK (selected_label IN ('A','B','C','D'))
--
-- A student's answer of 17280 is therefore rejected BY THE DATABASE, and no
-- amount of application code can work around it.
--
-- WHY A NEW COLUMN rather than widening selected_label to free text — widening
-- is the smaller diff and the worse change:
--   * it would store "17280" in a column named *label*, read as a letter by
--     grading, the palette and the review page, so the type stops describing
--     the data;
--   * it DELETES the existing guard for all 163 already-shipped mocks in order
--     to serve the new ones — a real loss for no gain;
--   * it makes the two answer kinds indistinguishable, and a student typing "3"
--     on an MCQ is a different event from choosing option C;
--   * `numeric` matches questions.numeric_answer exactly (both unconstrained
--     precision/scale), so the comparison is like-for-like and storage
--     introduces no rounding of its own.
--
-- Additive and nullable: all existing answer rows are untouched and every MCQ
-- path is byte-identical. No RLS change — the policies key on attempt_id
-- ownership, not on columns.

ALTER TABLE public.attempt_answers
  ADD COLUMN IF NOT EXISTS numeric_response numeric;

-- A response is EITHER an option OR a value, never both. Three states stay
-- legible: both null = unanswered (the meaning the table already had), exactly
-- one non-null = answered, both non-null = incoherent and refused. Same
-- coherence-CHECK pattern as 0046 (notes_progress) and 0051 (user_feedback).
--
-- NOTE it does NOT require one to be non-null: an unanswered row is created the
-- moment a student merely VISITS a question, so that both/null state is the
-- normal one and the palette depends on it.
ALTER TABLE public.attempt_answers
  DROP CONSTRAINT IF EXISTS attempt_answers_one_response;
ALTER TABLE public.attempt_answers
  ADD CONSTRAINT attempt_answers_one_response
  CHECK (NOT (selected_label IS NOT NULL AND numeric_response IS NOT NULL));

COMMENT ON COLUMN public.attempt_answers.numeric_response IS
  'The value a student typed for a numeric-answer (JEE Section-B) question. Mutually exclusive with selected_label; both null means unanswered.';
