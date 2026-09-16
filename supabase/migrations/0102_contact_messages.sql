-- 0102_contact_messages.sql
--
-- Public "contact" messages from the /about page.
--
-- WHY A TABLE AND NOT A `mailto:`: measured 2026-09-16, pyqvault.com has NO MX
-- RECORD, so mail addressed to the brand inbox does not land somewhere wrong —
-- it BOUNCES. Every `mailto:` on the site therefore rests on an inbox that may
-- not accept mail, and a correction from someone holding the actual paper is
-- exactly the message we cannot afford to lose. A row does not depend on email
-- delivery, so this channel works whatever DNS says. (The ops notification in
-- the route is best-effort ON TOP of the row, never instead of it.)
--
-- WHY NOT REUSE teacher_access_requests (0060): that queue is an ONBOARDING
-- pipeline — its statuses are new/contacted/provisioned/declined and its UI
-- offers "provision this org". A student reporting a wrong answer key is not a
-- lead, and filing them together would put a correction in a queue whose only
-- actions are sales actions. Same shape, different lifecycle, separate table.
--
-- WHY service-role-only (RLS enabled, NO policies): this is a public write, but
-- an anon INSERT policy on a table holding contact details invites spam and an
-- anon SELECT would expose the whole queue. Instead POST /api/contact validates
-- (incl. a honeypot) + rate-limits + writes with the service-role client, and
-- the superadmin triage view reads via service-role too. Mirrors 0060 and the
-- entitlements axis (0026): RLS-on-with-no-policy = locked to everyone except
-- service_role, and advisor-clean because RLS IS enabled.
--
-- Phone is stored canonical (91XXXXXXXXXX) via normalizeMobile, matching
-- student_profiles / quiz_leads / teacher_access_requests so a sender can be
-- correlated by number later. It is NULLABLE and deliberately NOT unique:
-- unlike the teacher-lead form, email is the required channel here (see
-- src/lib/contact/validate.ts for why the two forms differ).

CREATE TABLE public.contact_messages (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  email       text NOT NULL,
  phone       text,
  message     text NOT NULL,
  status      text NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'read', 'replied', 'spam')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Triage list orders newest-first.
CREATE INDEX contact_messages_created_idx
  ON public.contact_messages (created_at DESC);

-- RLS enabled with NO policies -> only the service-role client can read/write.
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
