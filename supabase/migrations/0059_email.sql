-- 0059_email.sql
--
-- The outbound-email spine: a send LOG + the consent axis. First email-dispatch
-- capability in the project (ROADMAP: "Custom SMTP (Resend) — now a real need").
-- Provider is Resend, called by raw fetch from a service-role script — see
-- src/lib/email/ + scripts/email/send-next-mock.ts.
--
-- WHY a send log (and not the sibling English AI Tutor's two timestamps on
-- profiles): that app stamps `last_reminder_sent` AFTER its send loop, so a
-- mid-loop crash re-sends everything on the next run, and there is no record of
-- what was sent to whom. Here every attempt — sent OR failed — is one immutable
-- row, and `dedupe_key` is the idempotency contract.
--
-- WHY the dedupe_key is a full UNIQUE (not partial): the 0052 lesson — a partial
-- unique index is NOT targetable by PostgREST ON CONFLICT (42P10). Every email
-- row carries a key (unlike user_activity's nullable one), so this is a plain
-- NOT NULL UNIQUE.
--
-- The KEY CARRIES THE POLICY, so re-running the script is safe and the cadence
-- is enforced in data rather than in a code branch:
--   next_mock:{userId}:{mockId}  → never recommend the SAME mock twice. An
--                                  ignored pick walks down the catalogue on the
--                                  next run (2026 Apr → 2025 Sep → ...).
--   first_mock:{userId}          → ONE activation email per person, EVER. If
--                                  they don't bite, they're not interested by
--                                  email. No mockId in the key = no nagging.
--
-- WHY email consent lives on student_profiles (not a new table): it is per-
-- student profile data written by the student, exactly like whatsapp_opt_in
-- (0050) — same own-row policies, same table, one fewer join.
--
-- WHY opt-OUT (default false) rather than opt-IN: these are product nudges to
-- users who registered an account and took (or declined to take) a mock, not
-- cold marketing. Opt-in would start reach at zero — nobody has opted in yet.
-- Every email carries a one-click unsubscribe honored in the selection query.

CREATE TABLE public.email_sends (
  id          uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind        text        NOT NULL,
  to_email    text        NOT NULL,
  subject     text        NOT NULL,
  ref_id      text,                                  -- the recommended mock's id
  ref_kind    text,                                  -- 'mock_test'
  dedupe_key  text        NOT NULL,
  provider_id text,                                  -- Resend message id (sent only)
  status      text        NOT NULL,
  error       text,                                  -- provider error body (failed only)
  metadata    jsonb       NOT NULL DEFAULT '{}'::jsonb,
  created_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT email_sends_dedupe_key UNIQUE (dedupe_key),
  CONSTRAINT email_sends_kind_ck CHECK (kind IN ('next_mock', 'first_mock')),
  CONSTRAINT email_sends_status_ck CHECK (status IN ('sent', 'failed')),
  -- Coherence: a sent row carries no error; a failed row carries no provider id.
  CONSTRAINT email_sends_status_coherent_ck CHECK (
    (status = 'sent' AND error IS NULL) OR
    (status = 'failed' AND provider_id IS NULL)
  )
);

-- The cooldown scan: "when did we last email this user?" (per-user, newest first).
CREATE INDEX email_sends_user_time_idx
  ON public.email_sends (user_id, created_at DESC);

ALTER TABLE public.email_sends ENABLE ROW LEVEL SECURITY;

-- Own-row READ only: a student can see what we sent them (transparency), and
-- nothing else. Deliberately NO insert/update/delete policy → the send log is
-- append-only and service-role-written; a student can neither forge a send nor
-- erase one to dodge the cooldown/dedupe.
CREATE POLICY "email_sends_select_own"
  ON public.email_sends FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- ── Consent axis ────────────────────────────────────────────────────────────
-- Table-level RLS already covers new columns (the 0048/0049/0050 precedent), so
-- the existing own-row SELECT/INSERT/UPDATE policies apply: a student can flip
-- their own opt-out from /account without a new policy.
ALTER TABLE public.student_profiles
  ADD COLUMN email_opt_out      boolean NOT NULL DEFAULT false,
  -- Unguessable per-student unsubscribe capability. Present on every row so the
  -- link can be built without a login; rotating it invalidates old links.
  ADD COLUMN unsubscribe_token  uuid    NOT NULL DEFAULT gen_random_uuid();

-- The unsubscribe route looks a student up BY TOKEN — unique so the lookup is a
-- single indexed row and a collision can never unsubscribe the wrong person.
CREATE UNIQUE INDEX student_profiles_unsubscribe_token_idx
  ON public.student_profiles (unsubscribe_token);
