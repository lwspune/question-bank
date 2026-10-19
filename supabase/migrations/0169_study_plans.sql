-- 0169_study_plans.sql
--
-- A student's week plan, made by V (study-partner Phase 3, 2026-10-19). The
-- student asks V to plan their week; V reads their exam date, weak chapters,
-- due drill questions, the exam's chapter shares and their weekly goal, and
-- saves one task a day for the next seven days (lib/chat/weekPlan.ts). The
-- plan is shown only inside V, and "my plan" shows it again.
--
-- NO DONE COLUMN. A task is ticked from what the student did, read from
-- user_activity at view time (drill_completed, mock_submitted, practice in
-- the chapter): a stored tick would be a second copy of the log, free to
-- disagree with it (the weekly_goal rule, 0113).
--
-- One plan per student per start day: planning again the same day replaces
-- it (upsert on user_id, starts_on); older weeks are kept, so whether plans
-- are followed can be read later.
--
-- `items` is a JSON array of 1 to 7 tasks, each { day 0-6, kind, path, ... };
-- its shape is checked in lib/chat/weekPlan.ts (parsePlanItems) on the way in
-- and on the way out, and the size here.
--
-- RLS: own rows only, read and written with the student's own login (the
-- typed route's server client), so no service role is involved.

CREATE TABLE public.study_plans (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  starts_on  date NOT NULL,
  exam_slug  text NOT NULL CHECK (char_length(exam_slug) BETWEEN 1 AND 64),
  subject    text CHECK (subject IS NULL OR char_length(subject) <= 120),
  items      jsonb NOT NULL CHECK (jsonb_typeof(items) = 'array' AND jsonb_array_length(items) BETWEEN 1 AND 7),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, starts_on)
);

CREATE INDEX study_plans_user_starts_idx ON public.study_plans (user_id, starts_on DESC);

ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "study_plans_select_own"
  ON public.study_plans
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "study_plans_insert_own"
  ON public.study_plans
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "study_plans_update_own"
  ON public.study_plans
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
