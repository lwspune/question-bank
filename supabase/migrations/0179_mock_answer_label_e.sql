-- 0179_mock_answer_label_e.sql
--
-- Mock answers and item statistics may carry option 'E' (2026-10-23).
--
-- WHY. IMAT prints five options, A to E. 0140 let a question STORE an E
-- option and deliberately left two A-D checks for when IMAT mocks were built
-- (NICHE_SITES_SPEC.md P1.5). They are being built now, so:
--   - attempt_answers.selected_label (0044): a student who picks E would
--     otherwise meet a CHECK violation, and lose the answer;
--   - question_item_stats.key_at_measurement (0095): the weekly
--     `itemstats:rollup` reads every mock response, so the first E-keyed
--     question in a sitting would fail the whole run.
--
-- SAFE. Each check is replaced by a WIDER one in the same transaction, so
-- every existing row (all A-D) still satisfies it and nothing is rewritten.
-- quiz_atoms.answer stays A-D: quizzes are four-option by construction.
-- Reversible: put the A-D lists back, once no row holds an 'E'.

ALTER TABLE public.attempt_answers
  DROP CONSTRAINT attempt_answers_selected_label_check,
  ADD CONSTRAINT attempt_answers_selected_label_check
    CHECK (selected_label IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE public.question_item_stats
  DROP CONSTRAINT question_item_stats_key_at_measurement_check,
  ADD CONSTRAINT question_item_stats_key_at_measurement_check
    CHECK (key_at_measurement IN ('A', 'B', 'C', 'D', 'E'));
