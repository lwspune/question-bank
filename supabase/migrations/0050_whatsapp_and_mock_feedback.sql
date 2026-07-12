-- 0050_whatsapp_and_mock_feedback.sql
--
-- Phase 3 of the staggered data-collection plan: open a channel + start a
-- feedback loop, both at the high-intent mock-result moment.
--
-- (1) WhatsApp opt-in on student_profiles — CAPTURE ONLY. This records the
--     student's opt-in + the ask-once gate; actual WhatsApp message dispatch is
--     a separate integration NOT built here (like Razorpay sat dormant).
-- (2) mock_feedback — the 1-tap post-mock difficulty rating (+ optional comment).
--     Append-ish: one row per attempt (upsert), own-row RLS + parent-attempt
--     ownership, mirroring attempt_answers (0044).

-- ── (1) WhatsApp opt-in ───────────────────────────────────────────────────────
ALTER TABLE public.student_profiles
  ADD COLUMN whatsapp_opt_in      boolean NOT NULL DEFAULT false,
  -- Stamped on EITHER decision (opt-in or "no thanks") → ask exactly once,
  -- same shape as onboarded_at.
  ADD COLUMN whatsapp_prompted_at timestamptz;

-- ── (2) mock_feedback ─────────────────────────────────────────────────────────
CREATE TABLE public.mock_feedback (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id  uuid NOT NULL UNIQUE REFERENCES public.mock_attempts(id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating      text NOT NULL CHECK (rating IN ('too_easy','just_right','too_hard')),
  comment     text CHECK (comment IS NULL OR char_length(comment) <= 500),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Per-mock rollups on the admin dashboard read by attempt; the attempt_id UNIQUE
-- already indexes the upsert key.

ALTER TABLE public.mock_feedback ENABLE ROW LEVEL SECURITY;

-- A student reads only their own feedback rows.
CREATE POLICY "mock_feedback_select_own"
  ON public.mock_feedback
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- A student may leave feedback ONLY on their own attempt (pins user_id to the
-- JWT AND requires the parent attempt to belong to them — the attempt_answers
-- EXISTS pattern).
CREATE POLICY "mock_feedback_insert_own"
  ON public.mock_feedback
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.mock_attempts a
      WHERE a.id = attempt_id AND a.user_id = auth.uid()
    )
  );

-- A student may correct their own feedback (the upsert path).
CREATE POLICY "mock_feedback_update_own"
  ON public.mock_feedback
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- No DELETE policy: feedback isn't user-deletable (cascade on attempt/user
-- deletion handles cleanup). Admin rollups read via the service-role client.
