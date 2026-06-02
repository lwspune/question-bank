-- 0028_concept_reports.sql
--
-- User-submitted reports on /notes CONCEPTS (the atomic teaching units inside
-- a subtopic note): "incorrect content," "confusing explanation," "typo,"
-- "broken visualization," "wrong worked example," etc. Logged-in users file
-- reports on any concept they can read; anon cannot file in-app reports (the
-- concept-card mailto remains the anon fallback). ADMINs triage on
-- /dashboard/notes-reports.
--
-- Why a SEPARATE table from question_reports:
--   A concept is NOT a DB row — it's TS editorial content identified by the
--   globally-unique (subtopic_slug, concept_slug) pair (see the notes
--   `ConceptUnit.slug` contract). So there's no FK to point a question-report
--   row at. This table stores that slug pair plus a denormalized breadcrumb
--   (exam/subject/chapter/subtopic/concept names) and the route segments
--   (subject_route, chapter_slug) so a triage row is self-describing and links
--   to the live concept anchor even if the concept is later removed from TS.
--
-- Org model (taxonomy is GLOBAL — no org_id on exams/subjects/chapters/
-- subtopics): a concept has no owning org in the schema. We route the report
-- to the org that owns the BANK QUESTIONS the concept teaches — `org_id` is
-- resolved by the application helper (`createConceptReport`) from a PUBLIC
-- question in the concept's subtopic and denormalized here. This mirrors the
-- question-report model ("goes to the admins who own the content") and is
-- unambiguous today (one org owns all PUBLIC questions).
--
-- Status enum is REUSED from migration 0024 (public.report_status) — the
-- open → in-review → resolved/wont-fix/duplicate lifecycle is identical.
--
-- Anti-spam: one OPEN report per (reported_by, subtopic_slug, concept_slug)
-- via a partial unique index. A new report is allowed once the prior resolves.

CREATE TYPE public.concept_report_category AS ENUM (
  'incorrect-content',
  'confusing-explanation',
  'typo-or-formatting',
  'broken-visualization',
  'wrong-example',
  'other'
);

CREATE TABLE public.concept_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subtopic_slug text NOT NULL,
  concept_slug text NOT NULL,
  -- Denormalized breadcrumb + route segments for self-describing triage rows.
  exam_name text NOT NULL,
  subject_name text NOT NULL,
  chapter_name text NOT NULL,
  subtopic_name text NOT NULL,
  concept_name text NOT NULL,
  subject_route text NOT NULL,
  chapter_slug text NOT NULL,
  reported_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  org_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
  category public.concept_report_category NOT NULL,
  details text CHECK (length(details) <= 2000),
  status public.report_status NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  resolved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  resolution_note text CHECK (length(resolution_note) <= 2000)
);

CREATE INDEX concept_reports_concept_lookup
  ON public.concept_reports (subtopic_slug, concept_slug);

CREATE INDEX concept_reports_triage_queue
  ON public.concept_reports (org_id, status, created_at DESC);

-- One open report per (user, concept). Resolved reports allow a new one.
CREATE UNIQUE INDEX one_open_report_per_user_per_concept
  ON public.concept_reports (reported_by, subtopic_slug, concept_slug)
  WHERE status = 'open';

ALTER TABLE public.concept_reports ENABLE ROW LEVEL SECURITY;

-- INSERT: any authenticated user, must report-as-self. The helper layer sets
-- org_id from the concept's subtopic questions (RLS can't express that without
-- a SECURITY DEFINER function, and we own the write path).
CREATE POLICY concept_reports_insert
  ON public.concept_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (reported_by = auth.uid());

-- SELECT: reporter sees own reports + admin sees triage queue for own org.
CREATE POLICY concept_reports_reporter_read_own
  ON public.concept_reports
  FOR SELECT
  TO authenticated
  USING (reported_by = auth.uid());

CREATE POLICY concept_reports_admin_read_org
  ON public.concept_reports
  FOR SELECT
  TO authenticated
  USING (
    private.current_user_is_admin()
    AND org_id = private.current_user_org_id()
  );

-- UPDATE: ADMIN only, scoped to own org. Status transitions + resolution_note.
CREATE POLICY concept_reports_admin_update_org
  ON public.concept_reports
  FOR UPDATE
  TO authenticated
  USING (
    private.current_user_is_admin()
    AND org_id = private.current_user_org_id()
  )
  WITH CHECK (
    private.current_user_is_admin()
    AND org_id = private.current_user_org_id()
  );

-- No DELETE policy — reports are kept for audit (set status = 'wont-fix' /
-- 'duplicate' with a note to "remove" in practice).
