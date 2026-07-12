-- 0051_user_feedback.sql
--
-- Phase 4 of the staggered data-collection plan: "voice of user" — periodic NPS
-- + always-available feature requests. APPEND-ONLY (one row per submission, so
-- the trend over time is the signal — unlike mock_feedback's one-row-per-attempt).
-- Own-row RLS (student writes their own via JWT); admin rollups read service-role.
--
-- Exit feedback was deferred: it needs an off-platform (email/WhatsApp) dispatch
-- pipeline that isn't built, and there's no account-deletion flow to host an
-- in-app version.

CREATE TABLE public.user_feedback (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind        text NOT NULL CHECK (kind IN ('nps', 'feature')),
  score       integer CHECK (score IS NULL OR (score >= 0 AND score <= 10)),
  message     text CHECK (message IS NULL OR char_length(message) <= 1000),
  created_at  timestamptz NOT NULL DEFAULT now(),
  -- Coherence: NPS carries a score; a feature request carries a message.
  CONSTRAINT user_feedback_shape_chk CHECK (
    (kind = 'nps' AND score IS NOT NULL) OR
    (kind = 'feature' AND message IS NOT NULL)
  )
);

-- Own-row history read + the NPS cooldown lookup (latest nps per user).
CREATE INDEX user_feedback_user_kind_idx
  ON public.user_feedback (user_id, kind, created_at DESC);

ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;

-- A student reads only their own feedback.
CREATE POLICY "user_feedback_select_own"
  ON public.user_feedback
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- A student may append their own feedback (pins user_id to the JWT).
CREATE POLICY "user_feedback_insert_own"
  ON public.user_feedback
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- No UPDATE/DELETE: append-only. Admin rollups read via the service-role client.
