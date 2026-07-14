-- 0055_branches.sql
--
-- Branch as a FIRST-CLASS entity (supersedes the free-text `batches.branch`
-- label from 0054). A branch is a physical location/campus within an org
-- (e.g. "FC Road", "Kothrud"). It becomes a real entity because teachers will
-- be ASSIGNED to one or more branches (branch_members, a later slice) — you
-- can't reliably attach a person to a free-text label.
--
-- HIERARCHY: Platform -> Org -> Branch -> Batch. A batch now belongs to a
-- branch (batches.branch_id) instead of carrying a text label.
--
-- ADMIN owns branch management (create/rename/archive/delete) for their own org;
-- superadmin manages any org's branches through the server-side console
-- (service-role, bypasses RLS). RLS mirrors the org-scoped pattern: read = any
-- org member; write = org ADMIN. Cascade from organizations so the test-org
-- sweep cleans fixtures with no teardown change.
--
-- SAFE TO RESHAPE 0054's batch: there are ZERO batches in prod (verified before
-- writing this), so the `branch` text column is dropped and replaced by
-- `branch_id` with no data to migrate.

CREATE TABLE public.branches (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id      uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name        text NOT NULL,
  archived    boolean NOT NULL DEFAULT false,
  created_by  uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT branches_name_not_blank CHECK (length(btrim(name)) > 0),
  CONSTRAINT branches_org_name_key UNIQUE (org_id, name)
);

CREATE INDEX branches_org_active_idx ON public.branches (org_id, archived, name);

-- ── rework batches: text label -> branch entity (0054 -> 0055) ────────────────
-- Drop the old (org, branch-text, name) uniqueness + the text column, add the FK.
DROP INDEX IF EXISTS public.batches_org_branch_name_key;
ALTER TABLE public.batches DROP COLUMN IF EXISTS branch;
ALTER TABLE public.batches
  ADD COLUMN branch_id uuid REFERENCES public.branches(id) ON DELETE SET NULL;

-- A cohort name is unique within its (org, branch). COALESCE a sentinel so two
-- UNBRANCHED batches can't share a name either (NULLs would be distinct).
CREATE UNIQUE INDEX batches_org_branch_name_key
  ON public.batches (org_id, COALESCE(branch_id, '00000000-0000-0000-0000-000000000000'::uuid), name);

CREATE INDEX batches_branch_idx ON public.batches (branch_id) WHERE branch_id IS NOT NULL;

ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;

-- Read: any member of the owning org.
CREATE POLICY "branches_select_org" ON public.branches
  FOR SELECT TO authenticated
  USING (org_id = private.current_user_org_id());

-- Insert/Update/Delete: org ADMIN in their own org (admins own branch mgmt).
CREATE POLICY "branches_insert_admin" ON public.branches
  FOR INSERT TO authenticated
  WITH CHECK (
    org_id = private.current_user_org_id()
    AND private.current_user_is_admin()
  );

CREATE POLICY "branches_update_admin" ON public.branches
  FOR UPDATE TO authenticated
  USING (
    org_id = private.current_user_org_id()
    AND private.current_user_is_admin()
  )
  WITH CHECK (
    org_id = private.current_user_org_id()
    AND private.current_user_is_admin()
  );

CREATE POLICY "branches_delete_admin" ON public.branches
  FOR DELETE TO authenticated
  USING (
    org_id = private.current_user_org_id()
    AND private.current_user_is_admin()
  );
