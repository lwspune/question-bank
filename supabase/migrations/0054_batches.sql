-- 0054_batches.sql
--
-- Cohort batches for per-batch paper building.
--
-- A batch is a student COHORT within an org (e.g. "NDA 2026 Morning"). "branch"
-- is a FREE-TEXT label on the batch (e.g. "FC Road", "Kothrud") — deliberately
-- NOT its own entity: orgs manage branches as a label, not a table (Org -> Batch,
-- branch is an attribute). A paper optionally belongs to a batch (papers.batch_id).
--
-- THE POINT: when a teacher builds a paper for a batch, the builder SOFT-WARNS
-- if a candidate question was already used in ANOTHER paper for the SAME batch —
-- so a question isn't repeated for that cohort. The warning is per-batch BY
-- CONSTRUCTION (getQuestionUsage filters paper_questions -> papers by batch_id);
-- the same question MAY still be reused across DIFFERENT batches. Scope of
-- non-repetition = per batch. Enforcement = soft-warn (never blocks an add).
--
-- NO EXPOSURE LEDGER: "used for this batch" derives from the existing
-- paper_questions junction joined to papers on batch_id — there's no new
-- write-path or ledger to keep in sync (finalize keeps the junction rows intact).
--
-- RLS mirrors papers (0039): read = any org member; insert/update = org editors
-- (ADMIN or TEACHER); delete = creator or ADMIN. Cascade from organizations so
-- the test-org sweep in tests/global-teardown.ts cleans fixtures with no
-- teardown change (deleting a test org cascades batches; papers.batch_id SET NULL).

CREATE TABLE public.batches (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id      uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name        text NOT NULL,
  branch      text,                                    -- free-text label, e.g. "FC Road"
  exam_id     uuid REFERENCES public.exams(id) ON DELETE SET NULL,
  archived    boolean NOT NULL DEFAULT false,          -- past cohort: hidden from selectors, link preserved
  created_by  uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT batches_name_not_blank CHECK (length(btrim(name)) > 0)
);

-- A cohort name is unique within its org + branch. COALESCE so two UNBRANCHED
-- batches can't share a name either (NULLs would otherwise be distinct).
CREATE UNIQUE INDEX batches_org_branch_name_key
  ON public.batches (org_id, COALESCE(branch, ''), name);

-- Org's batches, active-first then name (the selector + management list).
CREATE INDEX batches_org_active_idx ON public.batches (org_id, archived, name);

-- A paper optionally targets ONE batch. SET NULL on delete: deleting a batch
-- leaves its papers intact (they become un-batched / org-wide) — never cascades
-- away a finalized paper. batch_id IS NULL = today's org-wide paper (unchanged).
ALTER TABLE public.papers
  ADD COLUMN batch_id uuid REFERENCES public.batches(id) ON DELETE SET NULL;

CREATE INDEX papers_batch_idx ON public.papers (batch_id) WHERE batch_id IS NOT NULL;

ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;

-- Read: any member of the owning org.
CREATE POLICY "batches_select_org" ON public.batches
  FOR SELECT TO authenticated
  USING (org_id = private.current_user_org_id());

-- Insert/Update: org editors (ADMIN or TEACHER) in their own org.
CREATE POLICY "batches_insert_editor" ON public.batches
  FOR INSERT TO authenticated
  WITH CHECK (
    org_id = private.current_user_org_id()
    AND private.current_user_can_edit_questions()
  );

CREATE POLICY "batches_update_editor" ON public.batches
  FOR UPDATE TO authenticated
  USING (
    org_id = private.current_user_org_id()
    AND private.current_user_can_edit_questions()
  )
  WITH CHECK (
    org_id = private.current_user_org_id()
    AND private.current_user_can_edit_questions()
  );

-- Delete a batch: its creator or an org ADMIN (a guardrail against a teacher
-- nuking a colleague's cohort — enforced at the DB, not just the app layer).
CREATE POLICY "batches_delete_creator_or_admin" ON public.batches
  FOR DELETE TO authenticated
  USING (
    org_id = private.current_user_org_id()
    AND (private.current_user_is_admin() OR created_by = auth.uid())
  );
