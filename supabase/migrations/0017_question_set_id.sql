-- Adds set_id to questions for grouping NDA/CUET-style "set" questions
-- (one passage shared across N questions). The label is scoped per upload
-- (format: "<upload_job_id>:<excel-set-label>") so reusing the same Excel
-- label "S1" in different uploads does not accidentally cross-link.
--
-- NULL for standalone questions. Backward compatible — existing rows stay
-- NULL until they are re-uploaded with a Set column.
--
-- Partial index: only set rows participate in any lookup; the predicate
-- keeps the index tight.

ALTER TABLE public.questions ADD COLUMN set_id text NULL;

CREATE INDEX questions_set_id_idx
  ON public.questions (set_id)
  WHERE set_id IS NOT NULL;

COMMENT ON COLUMN public.questions.set_id IS
  'Internal label grouping question-set siblings. Format: "<upload_job_id>:<excel-set-label>" — scoped per upload. NULL for standalone questions.';
