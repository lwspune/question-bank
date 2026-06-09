-- 0033_public_quizzes.sql
--
-- Public lead-magnet quiz funnel. Two changes:
--
-- 1. quizzes.public_slug — NULL = private (the default; internal/pushed quizzes
--    stay unreachable anonymously). When an admin "Publishes to public", this is
--    set to a clean, unique URL slug, which is BOTH the public gate
--    (public_slug IS NOT NULL) AND the shareable address /quiz/<public_slug>.
--    Deliberately a separate column from `status` (which is occupied by the
--    nda-tracker delivery lifecycle draft→pushed) so making a quiz public never
--    collides with its push state.
--
-- 2. quiz_leads — captures a cold visitor at the reward moment (name + mobile +
--    consent) after they take a public quiz. NEVER touches quiz_attempts /
--    student analytics (those live in the separate nda-tracker app). Identity
--    here is the MOBILE (PYQ Vault accounts are email-keyed and carry no phone),
--    so a lead can't be auto-matched to an account — that's fine, the funnel
--    targets NEW prospects; the sales team works the mobile.
--
--    Retakes are welcome, not duplicated: UNIQUE(quiz_id, mobile) + an upsert
--    that bumps `attempts`, refreshes the latest score/answers, and keeps
--    `best_score` + immutable `first_seen_at`. So one row per person-per-quiz,
--    with the retake count as a lead-quality signal.
--
-- WRITES ARE SERVICE-ROLE ONLY (no insert policy) — the anon submit endpoint
-- inserts via the service-role admin client, exactly like entitlements (0026).
-- Admins SELECT for the /dashboard/leads view via private.current_user_is_admin().

ALTER TABLE public.quizzes
  ADD COLUMN public_slug text UNIQUE;

CREATE TABLE public.quiz_leads (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id         uuid REFERENCES public.quizzes(id) ON DELETE SET NULL,
  name            text NOT NULL,
  mobile          text NOT NULL,
  score           int  NOT NULL DEFAULT 0,
  best_score      int  NOT NULL DEFAULT 0,
  attempts        int  NOT NULL DEFAULT 1,
  correct         int  NOT NULL DEFAULT 0,
  incorrect       int  NOT NULL DEFAULT 0,
  not_attempted   int  NOT NULL DEFAULT 0,
  total           int  NOT NULL DEFAULT 0,
  answers         jsonb NOT NULL DEFAULT '{}'::jsonb,
  utm_source      text,
  consent_at      timestamptz NOT NULL DEFAULT now(),
  first_seen_at   timestamptz NOT NULL DEFAULT now(),
  last_attempt_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (quiz_id, mobile)
);

-- Sales dashboard rolls leads up by mobile (one person, N quizzes); index it.
CREATE INDEX quiz_leads_mobile_idx ON public.quiz_leads (mobile);
CREATE INDEX quiz_leads_quiz_idx   ON public.quiz_leads (quiz_id);

ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;

-- Admins read leads for the /dashboard/leads view. Anon writes go through the
-- service-role submit endpoint (which bypasses RLS by design); no write policy.
CREATE POLICY "quiz_leads_select_admin"
  ON public.quiz_leads
  FOR SELECT
  TO authenticated
  USING (private.current_user_is_admin());
