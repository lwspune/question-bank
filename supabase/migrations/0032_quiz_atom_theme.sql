-- 0032_quiz_atom_theme.sql
--
-- Theme classification for quiz atoms, so daily quizzes can be FOCUSED (a
-- "Formulas" quiz, a "Traps" quiz, a "Properties" quiz) instead of a forced mix.
-- A daily recall drill works better with one clear objective per day; the
-- exam-simulation job belongs to the mock tests, not these.
--
--   formula      — "which is the formula for X?" (from formula concepts)
--   fact         — named-fact recall (from reference tables)
--   trap         — "spot the common mistake" (from concept traps)
--   computation  — a worked numeric result (practiceSet/selfCheck) — the default
--   property     — a stated identity/rule rather than a number (e.g. De Morgan,
--                  "for mutually-exclusive events P(A∩B)=0"). Refined from
--                  'computation' by hand during the per-chapter approval pass.
--
-- The harvester assigns a default theme by source_kind; backfilled here for the
-- rows already synced. NULL is allowed (treated as eligible for a "mixed" quiz).

ALTER TABLE public.quiz_atoms
  ADD COLUMN theme text
    CHECK (theme IN ('formula', 'property', 'computation', 'fact', 'trap'));

UPDATE public.quiz_atoms
SET theme = CASE source_kind
  WHEN 'formula'   THEN 'formula'
  WHEN 'reference' THEN 'fact'
  WHEN 'trap'      THEN 'trap'
  ELSE 'computation'            -- practiceSet, selfCheck
END;

CREATE INDEX quiz_atoms_theme_idx ON public.quiz_atoms (subject_route, chapter_slug, theme, status);
