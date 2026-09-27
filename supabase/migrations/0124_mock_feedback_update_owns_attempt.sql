-- 0124_mock_feedback_update_owns_attempt.sql
--
-- Close a gap in 0050's UPDATE policy on mock_feedback.
--
-- 0050 checked attempt ownership on INSERT (the parent attempt must belong to
-- the student) but the UPDATE policy checked only `user_id = auth.uid()`. So a
-- student could write their own rating, then UPDATE its attempt_id to point at
-- ANOTHER student's attempt — as long as that attempt had no rating yet (the
-- attempt_id UNIQUE refuses the rest). The row would then count in that other
-- attempt's per-mock rollup. Nothing in the app does this (the route upserts on
-- the student's own attempt id), so it needed a direct REST call; but RLS is the
-- boundary here, not the route.
--
-- Fix: the UPDATE's WITH CHECK now carries the same EXISTS the INSERT has, so
-- the row after the update must still sit on an attempt the student owns. The
-- legitimate re-tap (an upsert that changes rating/comment on the student's own
-- attempt) passes unchanged. Pinned by tests/mocks-rls.test.ts.

DROP POLICY IF EXISTS "mock_feedback_update_own" ON public.mock_feedback;

CREATE POLICY "mock_feedback_update_own"
  ON public.mock_feedback
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.mock_attempts a
      WHERE a.id = attempt_id AND a.user_id = auth.uid()
    )
  );
