-- 0063_written_papers.sql
--
-- Foundation for WRITTEN (board-format) papers — the second Papers sub-tab,
-- alongside the existing MCQ-based builder.
--
-- WHY SO LITTLE SQL: a written paper is an ordinary `papers` row whose sections
-- are SLOTS ("Q.1 (A)") rather than SUBJECTS ("English"). Membership already
-- lives in paper_questions (paper_id, question_id, section_key, position), so
-- slot filing, concurrent adds, drag-reorder and the finalize snapshot are
-- reused verbatim. Only two things are genuinely new: paper-level header data,
-- and a per-question sourcing hint.
--
-- 1. papers.paper_meta — header fields for a written paper (board, std, subject,
--    variant, duration, max marks, instructions, school name) plus an EXPLICIT
--    `kind` discriminator. Explicit, not inferred from whether the sections
--    happen to carry marks: a half-filled custom template would make inference
--    flip a paper's mode mid-edit and leave the renderer's branch ambiguous.
--    NULL reads as 'mcq', so every paper built before written mode is untouched.
--
-- 2. questions.nominal_marks — an INDICATIVE "how big is this question" hint
--    used to source candidates for a marks-weighted slot and to soft-warn when a
--    teacher drops a 1-mark question into a 4-mark slot.
--
--    THIS IS NOT THE PRINTED MARK. Printed marks live on the paper's slot
--    (section_template.marksEach) because the SAME question is legitimately
--    worth 3 marks in one paper and 4 in another — a value on the question row
--    could never be right for both. Keep the two axes separate.
--
--    WHY NOT REUSE questions.marks: that column already has a different writer
--    (applyMockSync, from the sibling MHT_CET_AI app) and a different meaning
--    (per-question MCQ scoring weight). Two writers with two semantics on one
--    column is how a sync silently overwrites a teacher's tagging. A separate
--    nullable column costs one migration and removes the whole failure mode.
--
--    Populated where it is FREE: derivable from question_number slot provenance
--    for the Class 10 SSC PYQs, and captured at ingest going forward. Everything
--    else stays NULL, and sourcing degrades gracefully rather than depending on
--    complete coverage.
--
-- No new RLS policies: both are plain columns on tables whose existing policies
-- already govern reads and writes (questions content writes are superadmin-only
-- per 0056; the backfill runs service-role).

ALTER TABLE public.papers
  ADD COLUMN paper_meta jsonb;

-- Guard the discriminator at the DB level, not only in app code — a bad `kind`
-- would send the paper down the wrong renderer.
ALTER TABLE public.papers
  ADD CONSTRAINT papers_paper_meta_kind_check
  CHECK (
    paper_meta IS NULL
    OR paper_meta->>'kind' IN ('mcq', 'written')
  );

COMMENT ON COLUMN public.papers.paper_meta IS
  'Written-paper header data + explicit kind discriminator (mcq|written). NULL reads as mcq.';

ALTER TABLE public.questions
  ADD COLUMN nominal_marks numeric;

ALTER TABLE public.questions
  ADD CONSTRAINT questions_nominal_marks_positive
  CHECK (nominal_marks IS NULL OR nominal_marks > 0);

COMMENT ON COLUMN public.questions.nominal_marks IS
  'Indicative question size for written-paper slot sourcing + soft-warn. NEVER printed — printed marks come from the paper slot. Distinct from questions.marks (MCQ scoring weight, written by applyMockSync).';

-- No index: sourcing always filters by exam/subject/chapter first, which is
-- already indexed and far more selective than a marks value. Add one only if a
-- real query plan asks for it.
