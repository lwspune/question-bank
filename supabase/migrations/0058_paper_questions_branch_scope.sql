-- 0058_paper_questions_branch_scope.sql
--
-- Close the last branch-scoping gap from 0057. That migration branch-scoped the
-- papers + batches SELECT/UPDATE policies, but left `paper_questions` writes
-- org-scoped (`can_edit_questions()` + paper-in-own-org). So a teacher who knew a
-- paper id OUTSIDE their branch could in principle add/remove its questions — a
-- blind-write edge (the UI never surfaces such papers, and the papers SELECT
-- policy hides them, so it's not a visible leak, but it wasn't fully sealed).
--
-- Fix: require the parent paper be one the caller can actually access — the same
-- predicate as papers_update_scoped (admin OR own OR the paper's batch's branch
-- is one of mine). Admins are unaffected (is_admin branch); a teacher can only
-- touch questions on their own / their-branch papers. No data change.

DROP POLICY "paper_questions_write_editor" ON public.paper_questions;

CREATE POLICY "paper_questions_write_scoped" ON public.paper_questions
  FOR ALL TO authenticated
  USING (
    private.current_user_can_edit_questions()
    AND EXISTS (
      SELECT 1 FROM public.papers p
      WHERE p.id = paper_questions.paper_id
        AND p.org_id = private.current_user_org_id()
        AND (
          private.current_user_is_admin()
          OR p.created_by = auth.uid()
          OR EXISTS (
            SELECT 1 FROM public.batches b
            WHERE b.id = p.batch_id
              AND b.branch_id = ANY (private.current_user_branch_ids())
          )
        )
    )
  )
  WITH CHECK (
    private.current_user_can_edit_questions()
    AND EXISTS (
      SELECT 1 FROM public.papers p
      WHERE p.id = paper_questions.paper_id
        AND p.org_id = private.current_user_org_id()
        AND (
          private.current_user_is_admin()
          OR p.created_by = auth.uid()
          OR EXISTS (
            SELECT 1 FROM public.batches b
            WHERE b.id = p.batch_id
              AND b.branch_id = ANY (private.current_user_branch_ids())
          )
        )
    )
  );
