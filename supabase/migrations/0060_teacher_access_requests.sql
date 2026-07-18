-- 0060_teacher_access_requests.sql
--
-- Public "request teacher access" leads. When a teacher hits the download gate
-- on /browse (downloads are staff-only as of 2026-07-18), they land on
-- /request-access and submit this form; a superadmin then onboards their org +
-- provisions them at /superadmin.
--
-- WHY service-role-only (RLS enabled, NO policies): this is a public write, but
-- exposing an anon INSERT policy on a table that stores contact details invites
-- spam and lets anyone read back the queue. Instead the POST /api/teacher-access
-- route validates + rate-limits + writes with the service-role client (which
-- bypasses RLS by design), and the superadmin triage view reads via service-role
-- too. Mirrors the entitlements axis (migration 0026): writes are service-role
-- only, there is no client read/write surface. RLS-on-with-no-policy = locked to
-- everyone except service_role — advisor-clean (RLS is enabled).
--
-- Contact fields are nullable individually; the route enforces "name + at least
-- one of email/mobile + consent" in application code. Mobile is stored canonical
-- (91XXXXXXXXXX) via normalizeMobile, matching student_profiles/quiz_leads, and
-- is deliberately NOT unique (a coaching centre may share one number).

CREATE TABLE public.teacher_access_requests (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  institute   text,
  email       text,
  mobile      text,
  city        text,
  message     text,
  consent     boolean NOT NULL DEFAULT false,
  status      text NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'provisioned', 'declined')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Triage list orders newest-first.
CREATE INDEX teacher_access_requests_created_idx
  ON public.teacher_access_requests (created_at DESC);

-- RLS enabled with NO policies → only the service-role client can read/write.
-- The public form writes through POST /api/teacher-access (service-role); the
-- superadmin queue reads through service-role. No anon/authenticated surface.
ALTER TABLE public.teacher_access_requests ENABLE ROW LEVEL SECURITY;
