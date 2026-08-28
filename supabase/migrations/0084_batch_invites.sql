-- 0084_batch_invites.sql
--
-- Teacher-initiated enrollment: invite by email, student accepts.
--
-- WHY INVITE + ACCEPT. This is the industry-standard shape — Google Classroom,
-- Canvas, GitHub organisations and Slack all use it, and Classroom in
-- particular offers exactly the two mechanisms this project now has (an email
-- invite AND a join code). The ACCEPT step is not ceremony: enrollment exposes
-- a person's exam performance to an institute, so the consent has to come from
-- them and not from whoever typed their address.
--
-- KEYED ON EMAIL, NOT user_id — and that is what makes it work for someone who
-- has not signed up yet. There is deliberately NO binding step at signup: when
-- a student opens /account we look up pending invites matching their email.
-- Stateless, no signup hook, no pending-row migration.
--
-- THAT IS ONLY SAFE BECAUSE EMAIL IS VERIFIED. Measured at build time: 156 of
-- 156 accounts have email_confirmed_at set, so nobody can hold an address they
-- do not control and claim someone else's invite. If email confirmation is ever
-- turned off for signups, THIS TABLE'S SECURITY MODEL BREAKS — the accept path
-- must then verify identity some other way.
--
-- NEVER REVEAL WHETHER AN ADDRESS HAS AN ACCOUNT. The invite is stored, and the
-- caller told "invitation sent", whether or not the email belongs to a
-- registered user. Branching the response would let any teacher probe who is
-- registered on the platform.
--
-- WRITES ARE SERVICE-ROLE ONLY, like batch_enrollments (0083): creating an
-- invite needs email normalisation + batch-scope checks, and ACCEPTING needs
-- the server to confirm the signed-in user's email matches the invite. RLS
-- cannot express either. The SELECT policy below is defence-in-depth for the
-- teacher's own listing.

CREATE TABLE public.batch_invites (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id     uuid NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  email        text NOT NULL,
  invited_by   uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  status       text NOT NULL DEFAULT 'pending',
  created_at   timestamptz NOT NULL DEFAULT now(),
  expires_at   timestamptz NOT NULL DEFAULT now() + interval '30 days',
  responded_at timestamptz,
  CONSTRAINT batch_invites_status_check
    CHECK (status IN ('pending', 'accepted', 'declined', 'revoked')),
  -- Enforce the normalisation the service does. An invite stored with any
  -- uppercase would be matched by NOTHING at accept time and would sit pending
  -- forever, looking sent — a silent failure the DB can rule out outright.
  CONSTRAINT batch_invites_email_lowercase CHECK (email = lower(email)),
  CONSTRAINT batch_invites_email_not_blank CHECK (length(btrim(email)) > 0),
  -- Re-inviting the same address to the same batch updates the existing row
  -- rather than stacking duplicates.
  UNIQUE (batch_id, email)
);

-- The student-side lookup: "any pending invite for this address". Partial,
-- because a resolved invite is never read this way.
CREATE INDEX batch_invites_pending_email_idx
  ON public.batch_invites (email) WHERE status = 'pending';

ALTER TABLE public.batch_invites ENABLE ROW LEVEL SECURITY;

-- Read: staff of the batch, scoped exactly like batches_select_scoped (0057),
-- so a teacher can never see invites for a batch they cannot see. The STUDENT
-- does not read through RLS — /account resolves their invites server-side by
-- verified email, which avoids depending on a JWT claim for authorization.
CREATE POLICY "batch_invites_select_staff" ON public.batch_invites
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.batches b
      WHERE b.id = batch_invites.batch_id
        AND b.org_id = private.current_user_org_id()
        AND (
          private.current_user_is_admin()
          OR b.created_by = auth.uid()
          OR b.branch_id = ANY (private.current_user_branch_ids())
        )
    )
  );

-- No INSERT / UPDATE / DELETE policies: see the header.
