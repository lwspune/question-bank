-- 0155_export_events_exam_subject.sql
--
-- Log which exam and subject a download was for (2026-10-13).
--
-- WHY. The biggest group of student downloads is a custom paper built on
-- /browse (80 of 161 by 2026-10-13), and those rows carry nothing about what
-- was in them: 0104 left out the filter set and question ids on purpose, a
-- teacher's built paper being a sensitive record. That left the plainest
-- product question unanswerable: which exams do students download for. The
-- exam and subject are taxonomy, not a paper, so recording them keeps 0104's
-- line where it was.
--
-- SHAPE. Read off the questions actually exported (lib/export/exportTaxonomy),
-- on every mode, so one query answers "which exams" across custom papers, past
-- papers, board papers and homework alike. NULL means the paper mixed exams (a
-- cart can) or subjects, or the row predates this migration; never a guess. A
-- subject row belongs to one exam, so subject_id is set only with exam_id.
--
-- SAFE. Two nullable columns, ON DELETE SET NULL so a taxonomy cleanup never
-- blocks on, or erases, download history. Existing rows stay NULL: what they
-- contained was never stored, so they cannot be filled in.

ALTER TABLE public.export_events
  ADD COLUMN exam_id uuid REFERENCES public.exams(id) ON DELETE SET NULL,
  ADD COLUMN subject_id uuid REFERENCES public.subjects(id) ON DELETE SET NULL,
  ADD CONSTRAINT export_events_subject_needs_exam
    CHECK (subject_id IS NULL OR exam_id IS NOT NULL);

CREATE INDEX export_events_exam_idx ON public.export_events (exam_id)
  WHERE exam_id IS NOT NULL;
