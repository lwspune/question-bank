-- 0115_mock_assignments.sql
--
-- A teacher assigns a published mock to a batch with a due date.
-- ENGAGEMENT_SPEC.md C1 — the user's decision (2026-09-24): a new table, not a
-- due date on `papers` (a paper is a Word download, so completion could not
-- be measured) and not a column on `mock_tests` (a mock is global; the
-- assignment is per cohort).
--
-- DEADLINE PULL, NEVER RANK PULL. The row carries WHEN, not how anyone did:
-- students see "Due Sunday" on /me and the mock page, the teacher sees who has
-- sat it. There is no score here and no ordering of students — the engagement
-- gate forbids leaderboards for this cohort, and this is the mechanic that
-- gets the pull without the ranking.
--
-- WHY ONE ROW PER (batch, mock). Assigning the same paper to the same cohort
-- twice is a mistake, not a feature; editing the due date is an UPDATE.
--
-- RLS mirrors 0083 exactly. A student reads the assignments of batches they
-- are enrolled in — nothing else, because an assignment names a cohort. Staff
-- read and write through the same scope batches_select_scoped (0057) gives
-- them: org admins everywhere in the org, a teacher only the batches they
-- created or whose branch they are assigned to. The student arm leads with
-- auth.uid() so the common read exits before touching `batches`.
--
-- ON DELETE CASCADE both ways: a deleted batch or an unpublished-and-deleted
-- mock takes its assignments with it; an assignment is not a record worth
-- preserving without either end.

CREATE TABLE public.mock_assignments (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id     uuid NOT NULL REFERENCES public.batches(id)    ON DELETE CASCADE,
  mock_id      uuid NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
  due_at       timestamptz NOT NULL,
  note         text,
  assigned_by  uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT mock_assignments_note_len_chk CHECK (note IS NULL OR char_length(note) <= 200),
  CONSTRAINT mock_assignments_batch_mock_key UNIQUE (batch_id, mock_id)
);

-- "What is due for this batch, soonest first" — the roster page's read.
CREATE INDEX mock_assignments_batch_due_idx ON public.mock_assignments (batch_id, due_at);

ALTER TABLE public.mock_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "mock_assignments_select_enrolled_or_staff" ON public.mock_assignments
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.batch_enrollments e
      WHERE e.batch_id = mock_assignments.batch_id
        AND e.user_id = auth.uid()
    )
    OR (
      private.current_user_org_id() IS NOT NULL
      AND EXISTS (
        SELECT 1 FROM public.batches b
        WHERE b.id = mock_assignments.batch_id
          AND b.org_id = private.current_user_org_id()
          AND (
            private.current_user_is_admin()
            OR b.created_by = auth.uid()
            OR b.branch_id = ANY (private.current_user_branch_ids())
          )
      )
    )
  );

-- Writes: staff of the batch, with the paper-builder role (ADMIN or TEACHER).
-- The same predicate three times rather than a helper, so a reader of this
-- file sees the whole rule — the 0083 precedent.
CREATE POLICY "mock_assignments_insert_staff" ON public.mock_assignments
  FOR INSERT TO authenticated
  WITH CHECK (
    private.current_user_can_edit_questions()
    AND EXISTS (
      SELECT 1 FROM public.batches b
      WHERE b.id = mock_assignments.batch_id
        AND b.org_id = private.current_user_org_id()
        AND (
          private.current_user_is_admin()
          OR b.created_by = auth.uid()
          OR b.branch_id = ANY (private.current_user_branch_ids())
        )
    )
  );

CREATE POLICY "mock_assignments_update_staff" ON public.mock_assignments
  FOR UPDATE TO authenticated
  USING (
    private.current_user_can_edit_questions()
    AND EXISTS (
      SELECT 1 FROM public.batches b
      WHERE b.id = mock_assignments.batch_id
        AND b.org_id = private.current_user_org_id()
        AND (
          private.current_user_is_admin()
          OR b.created_by = auth.uid()
          OR b.branch_id = ANY (private.current_user_branch_ids())
        )
    )
  )
  WITH CHECK (
    private.current_user_can_edit_questions()
    AND EXISTS (
      SELECT 1 FROM public.batches b
      WHERE b.id = mock_assignments.batch_id
        AND b.org_id = private.current_user_org_id()
        AND (
          private.current_user_is_admin()
          OR b.created_by = auth.uid()
          OR b.branch_id = ANY (private.current_user_branch_ids())
        )
    )
  );

CREATE POLICY "mock_assignments_delete_staff" ON public.mock_assignments
  FOR DELETE TO authenticated
  USING (
    private.current_user_can_edit_questions()
    AND EXISTS (
      SELECT 1 FROM public.batches b
      WHERE b.id = mock_assignments.batch_id
        AND b.org_id = private.current_user_org_id()
        AND (
          private.current_user_is_admin()
          OR b.created_by = auth.uid()
          OR b.branch_id = ANY (private.current_user_branch_ids())
        )
    )
  );
