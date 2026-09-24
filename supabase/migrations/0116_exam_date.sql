-- 0116_exam_date.sql
--
-- The student's own exam date — the OVERRIDE half of derive-with-override
-- (ENGAGEMENT_SPEC.md C3, the user's decision 2026-09-24).
--
-- The DERIVED half is a committed TS calendar beside the exam registry
-- (src/lib/exam/calendar.ts), gated by a test that fails once a sitting is
-- stale, so it needs no table. This column exists for the student it is wrong
-- for: a Class 11 student aiming at a later sitting, a repeater, an exam whose
-- date moved for them. When set and in the future it wins; when null or past,
-- the calendar applies.
--
-- A DATE, not a timestamp: an exam has a day, and the countdown is in IST
-- calendar days. Nullable and never defaulted: a suggestion stored as a value
-- becomes a claim the student never made (the weekly_goal rule, 0113).
--
-- RLS is table-level (0045): own-row read + update, inherited, no change.

ALTER TABLE public.student_profiles
  ADD COLUMN exam_date date;
