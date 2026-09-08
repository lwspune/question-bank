-- 0093_vocab_school_fields_required.sql
--
-- The half of 0092 that could not be applied with it: a Part 1 row must carry
-- BOTH class columns, and every other part must carry NEITHER.
--
-- IT IS DEFERRED RATHER THAN OPTIONAL. When 0092 added the columns, the 676
-- rows already in Part 1 held NULL, so this CHECK could not hold until
-- `migrate-school-classes.ts` had re-filed them. Applying it with 0092 would
-- have failed outright against real data -- or, worse, passed silently against
-- the EMPTY test project and failed only on a later replay.
--
-- BOTH DIRECTIONS MATTER. Without the second arm, "no class recorded" and "not
-- a school word" would look identical, and a Part 1 row that lost its rung
-- would read as a Part 2 row rather than as a defect. That is the
-- absence-becomes-an-assertion failure this project keeps re-learning, so the
-- constraint says both things or it says nothing useful.

ALTER TABLE public.vocab_entries
  ADD CONSTRAINT vocab_entries_school_fields_match_part
  CHECK (
    (part =  'school' AND school_class IS NOT NULL AND school_source IS NOT NULL)
    OR
    (part <> 'school' AND school_class IS     NULL AND school_source IS     NULL)
  );
