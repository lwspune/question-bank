-- 0024_question_reports.sql
--
-- User-submitted reports on questions: "wrong answer," "typo," "broken image,"
-- "wrong taxonomy," etc. Logged-in users (TEACHER or ADMIN) can file reports
-- on any question they can see; anon cannot file in-app reports (footer
-- mailto remains the anon fallback). ADMIN users triage reports for their
-- own org's questions on /dashboard/reports.
--
-- `org_id` is denormalized from `questions.org_id` at INSERT time by the
-- application helper (`createReport`). Denormalizing lets the admin triage
-- list query use a simple `WHERE org_id = ? AND status = 'open'` against
-- an index, no JOIN. The helper is the only writer, so drift risk is low;
-- if a question is reparented across orgs (not a current code path), the
-- helper would need to backfill. Trade made for query simplicity.
--
-- Anti-spam: one OPEN report per (reported_by, question_id) via a partial
-- unique index — prevents repeat submissions while a report is unresolved.
-- The user can file a NEW report once the previous is resolved/wont-fix.

CREATE TYPE public.report_category AS ENUM (
  'wrong-answer',
  'typo-or-formatting',
  'broken-image',
  'wrong-taxonomy',
  'duplicate',
  'wrong-pyq-year',
  'incorrect-solution',
  'other'
);

CREATE TYPE public.report_status AS ENUM (
  'open',
  'in-review',
  'resolved',
  'wont-fix',
  'duplicate'
);

CREATE TABLE public.question_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  reported_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  org_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
  category public.report_category NOT NULL,
  details text CHECK (length(details) <= 2000),
  status public.report_status NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  resolved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  resolution_note text CHECK (length(resolution_note) <= 2000)
);

CREATE INDEX question_reports_question_lookup
  ON public.question_reports (question_id);

CREATE INDEX question_reports_triage_queue
  ON public.question_reports (org_id, status, created_at DESC);

-- One open report per (user, question). Resolved reports allow a new one.
CREATE UNIQUE INDEX one_open_report_per_user_per_question
  ON public.question_reports (reported_by, question_id)
  WHERE status = 'open';

ALTER TABLE public.question_reports ENABLE ROW LEVEL SECURITY;

-- INSERT: any authenticated user, must report-as-self. Helper layer enforces
-- that org_id matches the question's org (RLS can't easily express that
-- without a SECURITY DEFINER function, and we own the write path).
CREATE POLICY question_reports_insert
  ON public.question_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (reported_by = auth.uid());

-- SELECT: reporter sees own reports + admin sees triage queue for own org.
CREATE POLICY question_reports_reporter_read_own
  ON public.question_reports
  FOR SELECT
  TO authenticated
  USING (reported_by = auth.uid());

CREATE POLICY question_reports_admin_read_org
  ON public.question_reports
  FOR SELECT
  TO authenticated
  USING (
    private.current_user_is_admin()
    AND org_id = private.current_user_org_id()
  );

-- UPDATE: ADMIN only, scoped to own org. Used for status transitions
-- (open → in-review → resolved/wont-fix/duplicate) + resolution_note.
CREATE POLICY question_reports_admin_update_org
  ON public.question_reports
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

-- No DELETE policy — reports are kept for audit. To "remove" a report
-- in practice, set status = 'wont-fix' or 'duplicate' with a note.
