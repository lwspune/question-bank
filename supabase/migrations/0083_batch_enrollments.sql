-- 0083_batch_enrollments.sql
--
-- Batch ROSTER: which students belong to which cohort.
--
-- WHY THIS EXISTS. Until now a batch was a NAME ONLY — a label on a paper that
-- drives the per-batch question-repeat warning (0054). There was no way to say
-- who is IN "NDA 2026 Morning", so no teacher could see how their own students
-- were doing. Every performance surface is superadmin-only and platform-wide.
--
-- THE BOOTSTRAP PROBLEM THIS SOLVES. A student is defined by the ABSENCE of an
-- org_members row — they belong to no org. So "this org's students" is not a
-- set that can be queried, and a staff-facing student PICKER is impossible: it
-- would list every student on the platform, including other orgs'. Enrollment
-- therefore cannot start from a directory. It starts from IDENTITY (an invite
-- to a known email — 0084; or a join code the student enters — 0085), and the
-- roster is the OUTPUT of that, not its input.
--
-- ENROLLMENT IS NOT MEMBERSHIP. This deliberately does NOT write org_members.
-- A student stays org-less: nothing changes about what they can see or do, and
-- the org-less-student model the whole RLS design rests on is untouched. The
-- row is a ONE-WAY visibility grant — staff may read that student's mock
-- results. Being per-batch rather than per-org, a student can legitimately be
-- enrolled at two institutes at once.
--
-- NO INSERT POLICY — THIS IS THE LOAD-BEARING CHOICE. Joining is authorized by
-- something only the server can check: a valid invite, or a valid join code.
-- RLS cannot express "did they present the code", so an INSERT policy of
-- `user_id = auth.uid()` would let any student enroll into any batch id they
-- obtained and skip the check entirely. Writes are service-role only, through a
-- route that verifies the grant. Same locked pattern as entitlements (0026) and
-- platform_admins (0056): RLS on, no write policy.

CREATE TABLE public.batch_enrollments (
  batch_id  uuid NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  user_id   uuid NOT NULL REFERENCES auth.users(id)     ON DELETE CASCADE,
  joined_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (batch_id, user_id)
);

-- The PK covers (batch_id, ...) for "who is in this batch". The reverse lookup
-- — "which batches is this user in" — is what the mock_attempts policy below
-- runs on EVERY attempt read, so it needs its own index.
CREATE INDEX batch_enrollments_user_idx ON public.batch_enrollments (user_id);

ALTER TABLE public.batch_enrollments ENABLE ROW LEVEL SECURITY;

-- Read: the student sees their own enrollments; staff see their batches'
-- rosters. The staff arm mirrors batches_select_scoped (0057) EXACTLY so a
-- teacher's reach here can never exceed the batches they can already see.
CREATE POLICY "batch_enrollments_select_own_or_staff" ON public.batch_enrollments
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.batches b
      WHERE b.id = batch_enrollments.batch_id
        AND b.org_id = private.current_user_org_id()
        AND (
          private.current_user_is_admin()
          OR b.created_by = auth.uid()
          OR b.branch_id = ANY (private.current_user_branch_ids())
        )
    )
  );

-- Delete: a student can LEAVE (it is their data, and a revocable grant is what
-- makes the consent real), and staff can remove someone from their own batch.
CREATE POLICY "batch_enrollments_delete_own_or_staff" ON public.batch_enrollments
  FOR DELETE TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.batches b
      WHERE b.id = batch_enrollments.batch_id
        AND b.org_id = private.current_user_org_id()
        AND (
          private.current_user_is_admin()
          OR b.created_by = auth.uid()
          OR b.branch_id = ANY (private.current_user_branch_ids())
        )
    )
  );

-- No INSERT and no UPDATE policy: see the header. Joins are service-role writes
-- behind a grant check; an enrollment is created and deleted, never edited.

-- ── mock_attempts: let a student's own staff read their results ───────────────
-- ADDITIVE. Policies are permissive (OR'd), so the existing own-row policy is
-- untouched and a student's access cannot narrow — asserted in the RLS tests.
--
-- Scope is the ENTIRE attempt history of an enrolled student, not just attempts
-- after joined_at: an institute wants the baseline it is being asked to improve,
-- and the student consented by accepting. Access ends the moment the enrollment
-- row goes (leave or removal), which is what keeps that defensible.
--
-- COST. `current_user_org_id()` is NULL for a student — every account with no
-- org_members row — so for the overwhelming majority of reads this policy exits
-- on a NULL test before touching a table. Leading with that guard is deliberate:
-- this project has already had an RLS predicate turn a hot read into a seq scan
-- (0082).
CREATE POLICY "mock_attempts_select_staff_of_enrolled" ON public.mock_attempts
  FOR SELECT TO authenticated
  USING (
    private.current_user_org_id() IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.batch_enrollments e
      JOIN public.batches b ON b.id = e.batch_id
      WHERE e.user_id = mock_attempts.user_id
        AND b.org_id = private.current_user_org_id()
        AND (
          private.current_user_is_admin()
          OR b.created_by = auth.uid()
          OR b.branch_id = ANY (private.current_user_branch_ids())
        )
    )
  );
