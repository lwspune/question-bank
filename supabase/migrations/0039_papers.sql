-- 0039_papers.sql
--
-- Collaborative paper builder. Multiple teachers in one org assemble a single
-- exam paper together (a GAT paper, a Maths paper, etc.). The org IS the
-- collaboration boundary: any TEACHER/ADMIN in the org can open + contribute to
-- any of the org's papers. Section assignment is a SOFT hint, never a lock.
--
-- WHY A JUNCTION TABLE (paper_questions), not a question_ids[] array on papers:
-- two teachers adding to the same section concurrently must not clobber each
-- other. Each add is one independent INSERT row, so there is no read-modify-
-- write lost-update window. PRIMARY KEY (paper_id, question_id) stops a
-- double-add and makes concurrent adds idempotent via ON CONFLICT DO NOTHING.
-- This mirrors quiz_atoms_map (0031) — membership is a JOIN, not an array.
--
-- LIFECYCLE: status='draft' is the live, mutable, junction-table representation.
-- On finalize, the resolved questions are frozen onto papers.finalized_snapshot
-- (jsonb) — exactly like quizzes.questions (0035) — so a later bank edit can't
-- silently mutate a paper that was already printed. Reopen clears the snapshot.
--
-- section_template (jsonb): an ordered list of sections, e.g.
--   [{ "key": "english", "label": "English", "targetCount": 50, "assignedTo": [] }]
-- Fully editable per paper (add / rename / delete / retarget subjects).
-- assignedTo is a soft "who's working this" hint — never enforced server-side.
--
-- ACCESS: org-scoped, like PRIVATE questions. Reads = any org member; writes
-- (paper + membership) = org editors (ADMIN or TEACHER). Deleting a whole paper
-- = its creator or an ADMIN. All FKs cascade from organizations, so the
-- test-data org-sweep in tests/global-teardown.ts cleans fixtures with NO
-- teardown change (deleting a test org cascades papers -> paper_questions).

CREATE TABLE public.papers (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id             uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  exam_id            uuid REFERENCES public.exams(id) ON DELETE SET NULL,
  title              text NOT NULL,
  status             text NOT NULL DEFAULT 'draft'
                       CHECK (status IN ('draft', 'finalized')),
  section_template   jsonb NOT NULL DEFAULT '[]'::jsonb,
  finalized_snapshot jsonb,
  finalized_at       timestamptz,
  created_by         uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);

-- Org's paper list, most-recently-touched first.
CREATE INDEX papers_org_idx ON public.papers (org_id, updated_at DESC);

CREATE TABLE public.paper_questions (
  paper_id    uuid NOT NULL REFERENCES public.papers(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  section_key text NOT NULL DEFAULT '',
  position    double precision NOT NULL DEFAULT 0,  -- fractional, drag-reorder without renumber
  added_by    uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  added_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (paper_id, question_id)               -- a question appears once per paper
);

-- Render a paper grouped by section, each section in position order.
CREATE INDEX paper_questions_section_idx
  ON public.paper_questions (paper_id, section_key, position);

ALTER TABLE public.papers          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paper_questions ENABLE ROW LEVEL SECURITY;

-- ── papers ──────────────────────────────────────────────────────────────────
-- Read: any member of the owning org. Insert/Update: org editors. Delete a
-- whole paper: its creator or an ADMIN (a guardrail against a teacher nuking a
-- colleague's paper — enforced at the DB, not just the app layer).

CREATE POLICY "papers_select_org" ON public.papers
  FOR SELECT TO authenticated
  USING (org_id = private.current_user_org_id());

CREATE POLICY "papers_insert_editor" ON public.papers
  FOR INSERT TO authenticated
  WITH CHECK (
    org_id = private.current_user_org_id()
    AND private.current_user_can_edit_questions()
  );

CREATE POLICY "papers_update_editor" ON public.papers
  FOR UPDATE TO authenticated
  USING (
    org_id = private.current_user_org_id()
    AND private.current_user_can_edit_questions()
  )
  WITH CHECK (
    org_id = private.current_user_org_id()
    AND private.current_user_can_edit_questions()
  );

CREATE POLICY "papers_delete_creator_or_admin" ON public.papers
  FOR DELETE TO authenticated
  USING (
    org_id = private.current_user_org_id()
    AND (private.current_user_is_admin() OR created_by = auth.uid())
  );

-- ── paper_questions ─────────────────────────────────────────────────────────
-- Authorize via the parent paper's org. Read: any org member. Write: org
-- editors on a paper in their own org (mirrors the "org write options" FOR ALL
-- shape — the parent paper's org_id is the boundary).

CREATE POLICY "paper_questions_select_org" ON public.paper_questions
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.papers p
      WHERE p.id = paper_questions.paper_id
        AND p.org_id = private.current_user_org_id()
    )
  );

CREATE POLICY "paper_questions_write_editor" ON public.paper_questions
  FOR ALL TO authenticated
  USING (
    private.current_user_can_edit_questions()
    AND EXISTS (
      SELECT 1 FROM public.papers p
      WHERE p.id = paper_questions.paper_id
        AND p.org_id = private.current_user_org_id()
    )
  )
  WITH CHECK (
    private.current_user_can_edit_questions()
    AND EXISTS (
      SELECT 1 FROM public.papers p
      WHERE p.id = paper_questions.paper_id
        AND p.org_id = private.current_user_org_id()
    )
  );
