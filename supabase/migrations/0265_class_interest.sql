-- 0265_class_interest.sql
--
-- Offline classes in Pune: leads from /classes (owner, 2026-11-16). It replaces
-- the 1:1 tutoring interest check (/tutor, migration 0190): online tutoring is
-- hard to build, and the owner runs offline classes in Pune, so the form asks
-- what would fill them and leaves a number for the team to call back.
--
--   courses   one or more of NDA, CDS, AFCAT, MHT-CET, JEE, 10th Board, 12th Board, SSC CGL
--   city      Pune (offered first) or another city the visitor types
--   mobile    canonical 91XXXXXXXXXX, with consent to be called
--   name      optional (a signed-in account's name is used when left empty)
--
-- WHY ANYONE MAY ANSWER (owner's choice): a parent may have no account, and the
-- phone number is the lead, as with quiz_leads (0033). The route rate-limits
-- per IP before reading the body.
--
-- ONE LEAD PER MOBILE: UNIQUE (mobile), and the route upserts on it, so the same
-- number twice updates one lead rather than adding a duplicate call. The route's
-- row never carries called_at or created_at, so a resubmission keeps the team's
-- "called" tick and the first date; a signed-out resubmission carries no user_id,
-- so it cannot unlink a lead an account already owns.
--
-- WHY service-role-only (RLS enabled, NO policies): names and phone numbers.
-- POST /api/class-interest writes with the service role; /dashboard/classes and
-- POST /api/admin/class-leads (the "called" tick) read and write with it after a
-- superadmin check. Same model as tutor_interest (0190).
--
-- The CHECKs mirror src/lib/classes/interest.ts (validateClassInterest), so the
-- app refuses a bad answer with a clear message and the database refuses one
-- that slips past it. is_pune is stored, not derived at read, so the list can
-- sort and count Pune first with no string matching; the CHECK keeps it honest.

CREATE TABLE public.class_interest (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name          text CHECK (char_length(name) BETWEEN 1 AND 80),
  courses       text[] NOT NULL
                CONSTRAINT class_interest_courses_check
                CHECK (cardinality(courses) >= 1
                       AND courses <@ ARRAY['nda', 'cds', 'afcat', 'mht-cet', 'jee', 'board-10', 'board-12', 'ssc-cgl']::text[]),
  city          text NOT NULL CHECK (char_length(city) BETWEEN 1 AND 80),
  is_pune       boolean NOT NULL,
  mobile        text NOT NULL UNIQUE CHECK (mobile ~ '^91[6-9][0-9]{9}$'),
  consent       boolean NOT NULL CHECK (consent),
  from_section  text CHECK (from_section ~ '^[a-z0-9-]{1,40}$'),
  exam_slug     text CHECK (char_length(exam_slug) BETWEEN 1 AND 64),
  called_at     timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT class_interest_is_pune_iff_city CHECK (is_pune = (lower(city) = 'pune'))
);

COMMENT ON TABLE public.class_interest IS
  'Leads for offline classes in Pune from /classes (name, courses, city, mobile, consent). Service-role only; see migration 0265.';

CREATE INDEX class_interest_created_idx ON public.class_interest (created_at DESC);
CREATE INDEX class_interest_user_idx ON public.class_interest (user_id) WHERE user_id IS NOT NULL;

-- RLS enabled with NO policies -> only the service-role client can read/write.
ALTER TABLE public.class_interest ENABLE ROW LEVEL SECURITY;
