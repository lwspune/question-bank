-- 0190_tutor_interest.sql
--
-- "Tutor" interest check (owner, 2026-10-27). A Tutor button in the header
-- opens /tutor, which asks three one-tap questions and stores the answers
-- here. Nothing is sold or booked: this measures demand for 1:1 tutoring
-- before any of it is built.
--
--   1. Student or Teacher?
--   2. Student: "Looking for 1:1 tutoring?" Teacher: "Would you like to teach
--      1:1?" Yes/No. A No ends the flow and is still stored.
--   3. On a Yes only: Online / Offline / Either.
--
-- So one page counts both sides: students who want a tutor and teachers who
-- would be one.
--
-- WHY NO CONTACT DETAILS: the owner wanted the simplest version; the page
-- promises an announcement, not a call, so it asks for nothing it would have to
-- act on. A signed-in answer carries user_id, which is enough to reach them if
-- tutoring opens.
--
-- WHY service-role-only (RLS enabled, NO policies): a public write. POST
-- /api/tutor-interest rate-limits per IP and writes with the service role;
-- the /dashboard/growth readout reads with it. Same model as contact_messages
-- (0102).
--
-- ONE ROW PER ACCOUNT, MANY SIGNED-OUT ROWS: UNIQUE (user_id) lets NULLs
-- repeat, so a signed-in visitor's second answer replaces the first (upsert on
-- user_id) while signed-out answers each add a row. Signed-out counts are
-- therefore a ceiling on distinct people; the readout says so.
--
-- from_section: the first path segment of the page the Tutor button was
-- tapped on ("notes", "mock", ...), the same value the funnel event carries.
-- exam_slug: the visitor's qb_exam cookie, checked against the exam registry
-- in the route; the CHECK only bounds its length.

CREATE TABLE public.tutor_interest (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role          text NOT NULL CHECK (role IN ('student', 'teacher')),
  wants         boolean NOT NULL,
  mode          text CHECK (mode IN ('online', 'offline', 'either')),
  from_section  text CHECK (from_section ~ '^[a-z0-9-]{1,40}$'),
  exam_slug     text CHECK (char_length(exam_slug) BETWEEN 1 AND 64),
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  -- A mode exactly when the answer is Yes.
  CONSTRAINT tutor_interest_mode_iff_wants CHECK (wants = (mode IS NOT NULL))
);

COMMENT ON TABLE public.tutor_interest IS
  'Answers to the /tutor interest check (1:1 tutoring demand). Service-role only; see migration 0190.';

CREATE INDEX tutor_interest_created_idx ON public.tutor_interest (created_at DESC);

-- RLS enabled with NO policies -> only the service-role client can read/write.
ALTER TABLE public.tutor_interest ENABLE ROW LEVEL SECURITY;
