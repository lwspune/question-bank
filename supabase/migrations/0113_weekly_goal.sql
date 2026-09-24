-- 0113_weekly_goal.sql
--
-- The weekly sittings goal (ENGAGEMENT_SPEC.md §A3). A student-chosen target
-- for finished sittings per week — mock, drill, notes checkpoint or public
-- quiz — shown as a progress ring on /me and in the header menu.
--
-- WHY A WEEK, NOT A DAY. The engagement gate prefers goal-progress over daily
-- streaks for this cohort, and the measured cadence (2026-09-18) is `mixed`:
-- median inter-visit gap 2.0 days. A daily streak shows a zero to half of
-- these students on every visit; a weekly target fits both shapes.
--
-- NULLABLE ON PURPOSE. Null means "not chosen": the UI shows the default (3,
-- src/lib/goals/weekly.ts) as a suggestion and says so. Writing the default
-- into the column would turn a suggestion into a claim the student never made
-- (the same rule as unknown acquisition never being stored as "direct").
--
-- The CHECK mirrors MIN/MAX_WEEKLY_GOAL in src/lib/goals/weekly.ts. RLS is
-- table-level (0045): own-row read + update, inherited, no change.
--
-- No progress column. "Sittings this week" is a COUNT over user_activity
-- (append-only, migration 0052) from Monday 00:00 IST, computed at read time —
-- a stored counter would be a second copy of the log, free to disagree with it.

ALTER TABLE public.student_profiles
  ADD COLUMN weekly_goal smallint;

ALTER TABLE public.student_profiles
  ADD CONSTRAINT student_profiles_weekly_goal_chk
    CHECK (weekly_goal IS NULL OR (weekly_goal BETWEEN 1 AND 14));
