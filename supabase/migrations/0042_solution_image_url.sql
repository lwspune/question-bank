-- 0042: solution_image_url — an optional per-question solution diagram.
--
-- Some questions (esp. State Board geometry — pair-of-lines / locus / triangle
-- constructions) read far better with a 2-D sketch alongside the model answer.
-- ~20% of the State Board "Pair of Straight Lines" subjective solutions were
-- flagged as materially clearer with a diagram (see the 2026-07-03 Decisions
-- entry + [[state-board-ingestion]]).
--
-- This reuses the existing image path (uploadImage → storage → publicImageUrl
-- render + downloadImage for the docx ImageRun) — the only new surface is this
-- one nullable column. It renders in the "Show model answer" reveal on /browse
-- and in the answer-key SOLUTION block only (never in the question paper, which
-- would leak the answer). Nullable + append-only: every existing row is
-- unaffected, and MCQ rows may carry one too.
ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS solution_image_url text;
