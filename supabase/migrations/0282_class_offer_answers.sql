-- 0282_class_offer_answers.sql
--
-- The class offer on /me (owner, 2026-11-22). Home asks Class 10 students
-- "Are you looking for an SPI crash course?" and NDA students "Are you looking
-- for offline NDA classes?" (both in Pune), with Yes · No · Know more. A Yes
-- asks for the mobile and city and becomes a lead in class_interest (0265),
-- so it lands on /dashboard/classes with every other lead.
--
-- class_offer_answers: one row per account per offer.
--   shown_at     the card first came into view (the readout's denominator;
--                a tap count alone has none, as study_circle_interest, 0247)
--   more_at      the last "Know more" tap (opens the exam's syllabus page;
--                the card stays, so this is NOT an answer)
--   answer       'yes' or 'no'; either hides the card for good
--   answered_at  set exactly with an answer
--
-- record_class_offer_yes: the lead and the answer in ONE transaction, so a
-- Yes is never stored without its lead or the other way round. On a mobile
-- that already has a lead it ADDS the course rather than replacing the list
-- (POST /api/class-interest replaces it; here a student who asked about CDS on
-- /classes must not lose CDS by saying Yes to NDA), in the /classes course
-- order (the 0272 CHECK's list, which is CLASS_COURSES' order), and it never
-- touches called_at or created_at, so the team's "called" tick and the first
-- date stay. The name is kept when the account has none.
--
-- WHY service-role-only (RLS enabled, NO policies; function not granted to
-- anon or authenticated): POST /api/me/class-offer checks the session,
-- rate-limits and writes with the service role; the /me loader and the
-- readout read with it. Same model as class_interest (0265).

CREATE TABLE public.class_offer_answers (
  user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  offer        text NOT NULL CHECK (offer IN ('spi', 'nda')),
  shown_at     timestamptz NOT NULL DEFAULT now(),
  more_at      timestamptz,
  answer       text CHECK (answer IN ('yes', 'no')),
  answered_at  timestamptz,
  PRIMARY KEY (user_id, offer),
  CONSTRAINT class_offer_answers_answer_iff_time CHECK ((answer IS NULL) = (answered_at IS NULL))
);

COMMENT ON TABLE public.class_offer_answers IS
  'The /me class offer (SPI crash course, offline NDA classes): who saw it, Know more taps, Yes/No. Service-role only; see migration 0282.';

ALTER TABLE public.class_offer_answers ENABLE ROW LEVEL SECURITY;

CREATE FUNCTION public.record_class_offer_yes(
  p_user_id   uuid,
  p_offer     text,
  p_name      text,
  p_city      text,
  p_is_pune   boolean,
  p_mobile    text,
  p_exam_slug text
) RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.class_interest
    (user_id, name, courses, city, is_pune, mobile, consent, from_section, exam_slug, updated_at)
  VALUES
    (p_user_id, p_name, ARRAY[p_offer], p_city, p_is_pune, p_mobile, true, 'me', p_exam_slug, now())
  ON CONFLICT (mobile) DO UPDATE SET
    user_id      = EXCLUDED.user_id,
    name         = COALESCE(EXCLUDED.name, class_interest.name),
    courses      = (
      SELECT array_agg(c ORDER BY array_position(
               ARRAY['nda', 'cds', 'afcat', 'spi', 'mht-cet', 'jee', 'board-10', 'board-12', 'ssc-cgl']::text[], c))
      FROM (SELECT DISTINCT unnest(class_interest.courses || EXCLUDED.courses) AS c) t
    ),
    city         = EXCLUDED.city,
    is_pune      = EXCLUDED.is_pune,
    consent      = true,
    from_section = EXCLUDED.from_section,
    exam_slug    = COALESCE(EXCLUDED.exam_slug, class_interest.exam_slug),
    updated_at   = now();

  INSERT INTO public.class_offer_answers (user_id, offer, answer, answered_at)
  VALUES (p_user_id, p_offer, 'yes', now())
  ON CONFLICT (user_id, offer) DO UPDATE SET answer = 'yes', answered_at = now();
END;
$$;

REVOKE ALL ON FUNCTION public.record_class_offer_yes(uuid, text, text, text, boolean, text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_class_offer_yes(uuid, text, text, text, boolean, text, text) TO service_role;
