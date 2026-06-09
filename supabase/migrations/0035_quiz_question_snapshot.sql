-- 0035_quiz_question_snapshot.sql
--
-- Make a recorded quiz IMMUTABLE by snapshotting its questions at assemble time,
-- instead of re-deriving them from the live quiz_atoms pool on every read.
--
-- WHY: `quizzes` + `quiz_atoms_map` stored only atom REFERENCES, and the
-- dashboard read each question's options LIVE through the map. So when an atom
-- already in a quiz was re-harvested/re-classified (e.g. a bundle-formula `auto`
-- atom split into `needs_review` slots, options → null), the quiz re-rendered a
-- question with NO options. A snapshot decouples display from the pool: the quiz
-- shows exactly what was assembled (and pushed to nda-tracker), so the two apps
-- can't drift and a later atom change can't break a recorded quiz.
--
-- `quiz_atoms_map` STAYS — it's still the coverage ledger (which atoms have been
-- used, so re-assembly doesn't repeat). It's just no longer the display source.
--
-- `questions` shape (the dashboard QuizQuestionView): a JSON array of
--   { position, stem, options: {A,B,C,D}, answer, conceptSlug }.
-- `theme` is snapshotted too (was derived live from the mapped atoms).

ALTER TABLE public.quizzes
  ADD COLUMN questions jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN theme      text;
