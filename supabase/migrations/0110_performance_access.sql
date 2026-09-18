-- 0110_performance_access.sql
--
-- Opens the student-performance diagnosis (0099) to the two audiences it was
-- always built for, and registers the per-attempt report email.
--
-- WHY TWO THIN WRAPPERS RATHER THAN THREE COPIES OF THE BODY: 0099's
-- get_student_performance is 200 lines of joins and jsonb_build_object. A
-- second implementation is exactly the two-renderer drift this repo has paid
-- for twice (the docx solution-table contract, the /browse vs Word reveal), so
-- the body stays in ONE place and these wrappers differ only in WHO they let
-- ask. They are SECURITY DEFINER and owned by postgres, which is what lets them
-- call a function granted to service_role alone.
--
-- WHY get_own_performance TAKES NO ARGUMENT: a p_user_id parameter on a
-- student-callable function is an authorization decision handed to the caller.
-- With no parameter there is nothing to tamper with — auth.uid() is the
-- identity, read server-side, and a student can only ever ask about themselves.
-- The 0099 header anticipated exactly this ("it will call
-- fetchStudentPerformance with the ANON client and the viewer's own id").
--
-- WHY THE STAFF WRAPPER IS NOT SIMPLY "org member": a teacher is branch-scoped
-- (migration 0057) and an org can run several branches. The gate is therefore
--   superadmin                                    -> any student
--   org ADMIN                                     -> any student enrolled in a
--                                                    batch of THEIR org
--   TEACHER                                       -> only students in a batch
--                                                    whose branch is theirs
-- and enrolment is the consent record: the batch-invite email (0084) tells the
-- student in as many words that accepting lets that institute's teachers see
-- their mock results, and leaving the batch ends it. No enrolment, no access —
-- which is why a self-serve student with no batch stays invisible to every
-- teacher on the platform.
--
-- WHY IT RAISES RATHER THAN RETURNING EMPTY: an empty payload is a fact about
-- the student ("never sat a paper"). A refusal is a fact about the caller.
-- Collapsing them would make an authorization bug look like an inactive
-- student, which is the kind of failure nobody reports.

-- ── the report email's kind ─────────────────────────────────────────────────
-- 'mock_report' joins the 0059 allowlist. ref_kind carries 'mock_attempt' (not
-- 'mock_test'): the report is about ONE sitting, and the dedupe key
-- `mock_report:{attemptId}` is what makes a re-run unable to mail twice about
-- the same paper.
ALTER TABLE public.email_sends DROP CONSTRAINT email_sends_kind_ck;
ALTER TABLE public.email_sends ADD CONSTRAINT email_sends_kind_ck
  CHECK (kind IN ('next_mock', 'first_mock', 'mock_report'));

-- ── the student's own performance ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_own_performance()
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, private, pg_temp
AS $$
  SELECT public.get_student_performance(auth.uid());
$$;

REVOKE ALL ON FUNCTION public.get_own_performance() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_own_performance() TO authenticated, service_role;

COMMENT ON FUNCTION public.get_own_performance() IS
  'The calling student''s own performance payload. No parameter by design: the identity is auth.uid(), never the caller''s claim about it.';

-- ── a staff member's view of one of their students ──────────────────────────
CREATE OR REPLACE FUNCTION public.get_student_performance_for_staff(p_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, private, pg_temp
AS $$
DECLARE
  v_allowed boolean := false;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not authenticated' USING ERRCODE = '42501';
  END IF;

  IF private.current_user_is_superadmin() THEN
    v_allowed := true;
  ELSIF private.current_user_org_id() IS NOT NULL THEN
    SELECT EXISTS (
      SELECT 1
      FROM public.batch_enrollments be
      JOIN public.batches b ON b.id = be.batch_id
      WHERE be.user_id = p_user_id
        AND b.org_id = private.current_user_org_id()
        -- An ADMIN sees every branch of their org; a TEACHER only the branches
        -- they are assigned to. A batch with a NULL branch_id predates 0055 and
        -- is org-wide, so it stays admin-only rather than defaulting open.
        AND (
          private.current_user_is_admin()
          OR (b.branch_id IS NOT NULL AND b.branch_id = ANY (private.current_user_branch_ids()))
        )
    ) INTO v_allowed;
  END IF;

  IF NOT v_allowed THEN
    RAISE EXCEPTION 'not authorized to read this student' USING ERRCODE = '42501';
  END IF;

  RETURN public.get_student_performance(p_user_id);
END;
$$;

REVOKE ALL ON FUNCTION public.get_student_performance_for_staff(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_student_performance_for_staff(uuid) TO authenticated, service_role;

COMMENT ON FUNCTION public.get_student_performance_for_staff(uuid) IS
  'One student''s performance payload for staff. Superadmin: anyone. Admin: their org''s enrolled students. Teacher: their branches'' enrolled students. Raises 42501 otherwise — a refusal must not look like an empty student.';
