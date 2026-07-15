-- 0057_branch_members.sql
--
-- Teacher <-> branch assignment (many-to-many) + branch-scoped paper/batch access.
--
-- A TEACHER is assigned to one or more branches (branch_members). Their reach is
-- then scoped to those branches: they only SEE and EDIT batches + papers that
-- belong to their branch(es) (or that they created). ADMINs keep full org-wide
-- access; SUPERADMIN is out of the paper-building picture (org staff build
-- papers). Assignments are managed by the org ADMIN.
--
-- The junction is the right shape (one row per assignment) — "one or more
-- branches" = multiple rows, never an array.

CREATE TABLE public.branch_members (
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  branch_id  uuid NOT NULL REFERENCES public.branches(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, branch_id)
);
CREATE INDEX branch_members_branch_idx ON public.branch_members (branch_id);

ALTER TABLE public.branch_members ENABLE ROW LEVEL SECURITY;

-- Read: any member of the branch's org (admins manage; a teacher can read their
-- own scope). Write: org ADMIN on a branch in their org — defense-in-depth; the
-- admin UI actually writes via the service-role members path.
CREATE POLICY "branch_members_select_org" ON public.branch_members
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.branches b
      WHERE b.id = branch_members.branch_id AND b.org_id = private.current_user_org_id()
    )
  );

CREATE POLICY "branch_members_write_admin" ON public.branch_members
  FOR ALL TO authenticated
  USING (
    private.current_user_is_admin()
    AND EXISTS (
      SELECT 1 FROM public.branches b
      WHERE b.id = branch_members.branch_id AND b.org_id = private.current_user_org_id()
    )
  )
  WITH CHECK (
    private.current_user_is_admin()
    AND EXISTS (
      SELECT 1 FROM public.branches b
      WHERE b.id = branch_members.branch_id AND b.org_id = private.current_user_org_id()
    )
  );

-- The set of branch_ids the current user is assigned to (empty for admins, who
-- are covered by the is_admin() branch of the scoped policies below).
CREATE OR REPLACE FUNCTION private.current_user_branch_ids()
  RETURNS uuid[] LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
  select coalesce(array_agg(branch_id), '{}'::uuid[])
  from public.branch_members where user_id = auth.uid()
$function$;

-- ── batches: scope teachers to their branches ─────────────────────────────────
-- Admin: all org batches. Teacher: batches in their branch(es), or self-created.
DROP POLICY "batches_select_org"    ON public.batches;
DROP POLICY "batches_insert_editor" ON public.batches;
DROP POLICY "batches_update_editor" ON public.batches;

CREATE POLICY "batches_select_scoped" ON public.batches
  FOR SELECT TO authenticated
  USING (
    org_id = private.current_user_org_id() AND (
      private.current_user_is_admin()
      OR created_by = auth.uid()
      OR branch_id = ANY (private.current_user_branch_ids())
    )
  );

-- Insert: an admin can file a batch anywhere in the org; a teacher only under a
-- branch they're assigned to (no unbranched/org-wide batches for teachers).
CREATE POLICY "batches_insert_scoped" ON public.batches
  FOR INSERT TO authenticated
  WITH CHECK (
    org_id = private.current_user_org_id()
    AND private.current_user_can_edit_questions()
    AND (
      private.current_user_is_admin()
      OR branch_id = ANY (private.current_user_branch_ids())
    )
  );

CREATE POLICY "batches_update_scoped" ON public.batches
  FOR UPDATE TO authenticated
  USING (
    org_id = private.current_user_org_id()
    AND private.current_user_can_edit_questions()
    AND (
      private.current_user_is_admin()
      OR created_by = auth.uid()
      OR branch_id = ANY (private.current_user_branch_ids())
    )
  )
  WITH CHECK (
    org_id = private.current_user_org_id()
    AND private.current_user_can_edit_questions()
    AND (
      private.current_user_is_admin()
      OR branch_id = ANY (private.current_user_branch_ids())
    )
  );
-- DELETE policy (batches_delete_creator_or_admin) is unchanged — creator or admin.

-- ── papers: scope teachers to their branches (via the batch's branch) ─────────
-- A paper's branch is its batch's branch. Admin: all org papers. Teacher: papers
-- whose batch is in their branch(es), or that they created (incl. un-batched).
DROP POLICY "papers_select_org"    ON public.papers;
DROP POLICY "papers_update_editor" ON public.papers;

CREATE POLICY "papers_select_scoped" ON public.papers
  FOR SELECT TO authenticated
  USING (
    org_id = private.current_user_org_id() AND (
      private.current_user_is_admin()
      OR created_by = auth.uid()
      OR EXISTS (
        SELECT 1 FROM public.batches b
        WHERE b.id = papers.batch_id
          AND b.branch_id = ANY (private.current_user_branch_ids())
      )
    )
  );

CREATE POLICY "papers_update_scoped" ON public.papers
  FOR UPDATE TO authenticated
  USING (
    org_id = private.current_user_org_id()
    AND private.current_user_can_edit_questions()
    AND (
      private.current_user_is_admin()
      OR created_by = auth.uid()
      OR EXISTS (
        SELECT 1 FROM public.batches b
        WHERE b.id = papers.batch_id
          AND b.branch_id = ANY (private.current_user_branch_ids())
      )
    )
  )
  WITH CHECK (
    org_id = private.current_user_org_id()
    AND private.current_user_can_edit_questions()
  );
-- INSERT (papers_insert_editor: org + can_edit_questions) is unchanged — a teacher
-- creates a paper as themselves (created_by) and can only link it to a batch they
-- can see (setPaperBatch validates via an RLS-scoped select). DELETE unchanged.
