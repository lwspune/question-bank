-- 0231_profile_focus_exam.sql
--
-- The exam focus on /me and /performance (2026-11-08, owner).
--
-- A student with two or more exams picks which one their Home and Performance
-- tabs are about: close to an exam they want that exam's mistakes, mocks and
-- weak spots, not a mix of every exam they once ticked. 785 of 2,558 student
-- profiles list two or more exams. The choice is saved on their own profile
-- row, so it holds on the next visit and on another device (a cookie would
-- not). Reads and writes go through the existing own-row RLS policies (0045).
--
-- VALUES. NULL: never chosen; the app defaults to the exam they practised most
-- recently (lib/me/focus.ts). 'all': they chose to see every exam. Otherwise
-- one of their own target_exams.
--
-- THE DATABASE KEEPS IT HONEST, not just the API:
--   * the CHECK refuses a focus that is not 'all' or one of the student's own
--     exams, so no write path can leave a focus the student cannot see;
--   * the trigger clears a focus whose exam leaves target_exams. Without it,
--     removing that exam on /account would FAIL on the CHECK, over a setting
--     the student may have forgotten about. Clearing is the safe direction:
--     the app falls back to the most recent exam.
-- Alternative rejected: a separate table keyed by user. One nullable column on
-- the row the profile is already read from costs no extra read.

ALTER TABLE public.student_profiles
  ADD COLUMN focus_exam text;

CREATE OR REPLACE FUNCTION private.student_profiles_clear_stale_focus()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.focus_exam IS NOT NULL
     AND NEW.focus_exam <> 'all'
     AND NOT (NEW.focus_exam = ANY (COALESCE(NEW.target_exams, ARRAY[]::text[])))
     AND NEW.target_exams IS DISTINCT FROM OLD.target_exams THEN
    NEW.focus_exam := NULL;
  END IF;
  RETURN NEW;
END;
$$;

-- BEFORE the CHECK is evaluated, and only when target_exams is written: a
-- direct write of a bad focus (target_exams unchanged) still fails the CHECK.
CREATE TRIGGER student_profiles_clear_stale_focus
  BEFORE UPDATE OF target_exams ON public.student_profiles
  FOR EACH ROW EXECUTE FUNCTION private.student_profiles_clear_stale_focus();

ALTER TABLE public.student_profiles
  ADD CONSTRAINT student_profiles_focus_exam_valid
  CHECK (focus_exam IS NULL OR focus_exam = 'all' OR focus_exam = ANY (target_exams));
