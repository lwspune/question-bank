-- 0258_user_role.sql
--
-- "Are you a teacher or a student?" -- the answer, on the student's profile.
--
-- WHY: the download box is the third-largest signup route (273 accounts made
-- 1 Oct - 1 Nov 2026), but only 37% of those accounts ever studied, against
-- 100% of accounts whose first act was answering a question. Some are teachers
-- (worth a different offer), some are students who wanted one file. Nothing
-- told them apart: the only labels were 96 answers to the tutor-interest form
-- (7 teachers), too few to test a behaviour rule against. So each download
-- box asks once, in one line under its download buttons, and this stores it.
--
-- WHY on student_profiles, not user_metadata: it is read in SQL (readouts,
-- rosters) beside the other profile answers, and the CHECKs below must bind
-- every write path, which metadata cannot.
--
-- The two CHECKs are the rules that matter:
--   * the role is 'teacher' or 'student', nothing else (no free text: the
--     question has two buttons);
--   * a role always carries the time it was given (the readout splits answers
--     by when and from which box), and a time never stands without a role.
-- The answer may be changed (an update); the question is asked only while the
-- role is NULL (lib/profile/userRole.ts shouldAskRole).
--
-- RLS: unchanged. The student writes their own row through the existing
-- own-row insert/update policies (0045); staff never see the question.
--
-- BACKFILL: the tutor-interest form already asked the same question (role is
-- 'teacher' | 'student' there). Each account's latest answer seeds its row,
-- dated when they gave it. Owner OK'd 2026-11-15. Idempotent: only rows still
-- without a role are written, so a replay changes nothing.

ALTER TABLE public.student_profiles
  ADD COLUMN IF NOT EXISTS user_role text,
  ADD COLUMN IF NOT EXISTS user_role_at timestamptz;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'student_profiles_user_role_check') THEN
    ALTER TABLE public.student_profiles
      ADD CONSTRAINT student_profiles_user_role_check
      CHECK (user_role IS NULL OR user_role IN ('teacher', 'student'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'student_profiles_user_role_at_check') THEN
    ALTER TABLE public.student_profiles
      ADD CONSTRAINT student_profiles_user_role_at_check
      CHECK ((user_role IS NULL) = (user_role_at IS NULL));
  END IF;
END $$;

-- Seed from the tutor-interest form: each account's latest answer.
WITH latest AS (
  SELECT DISTINCT ON (ti.user_id) ti.user_id, ti.role, ti.created_at
  FROM public.tutor_interest ti
  JOIN auth.users u ON u.id = ti.user_id
  WHERE ti.user_id IS NOT NULL AND ti.role IN ('teacher', 'student')
  ORDER BY ti.user_id, ti.created_at DESC
)
INSERT INTO public.student_profiles AS sp (user_id, user_role, user_role_at)
SELECT user_id, role, created_at FROM latest
ON CONFLICT (user_id) DO UPDATE
  SET user_role = EXCLUDED.user_role, user_role_at = EXCLUDED.user_role_at
  WHERE sp.user_role IS NULL;
