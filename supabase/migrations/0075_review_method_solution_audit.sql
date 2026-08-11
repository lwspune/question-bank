-- 0075_review_method_solution_audit.sql
--
-- Add `solution_audit` to the question_reviews method vocabulary.
--
-- WHY A SEVENTH METHOD RATHER THAN REUSING blind_rederivation. A pre-print paper
-- review is usually a READ-THROUGH: read the stored solution, check it coheres,
-- flag what looks wrong. That is genuinely weaker evidence than an independent
-- re-derivation, and this bank has already paid to learn the difference — the
-- 2026-06-03 audit found that most wrong keys were STEALTH wrong keys, whose
-- solutions are internally consistent and simply wrong. A read-through cannot
-- catch those by construction. Recording one as blind_rederivation would
-- overstate evidence inside the audit trail, which is the exact failure this
-- table exists to prevent, one level up.
--
-- AND THE DISTINCTION IS LOAD-BEARING, not descriptive: it decides what a later
-- pass may SKIP. A question confirmed by blind re-derivation is done; one
-- confirmed by a read-through must still be shown to a blind pass. Without two
-- methods you either re-derive everything (no benefit from the record) or skip
-- questions that were only skimmed (false confidence). See
-- src/lib/reviews/coverage.ts.
--
-- `method` is CHECK'd text rather than a Postgres enum precisely so extending it
-- is an append here plus an append in src/lib/reviews/types.ts — the same
-- reasoning migration 0052 gives for user_activity.kind.

ALTER TABLE public.question_reviews
  DROP CONSTRAINT question_reviews_method_ck;

ALTER TABLE public.question_reviews
  ADD CONSTRAINT question_reviews_method_ck CHECK (method IN (
    'blind_rederivation',
    'source_key_crosscheck',
    'textbook_answer_key',
    'structural_probe',
    'report_triage',
    -- Read-through of the stored solution for coherence, WITHOUT independent
    -- re-derivation. Cheap breadth; cannot catch a stealth wrong key.
    'solution_audit'
  ));
