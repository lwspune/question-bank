-- 0224_tutor_price_me_card.sql
--
-- The tutoring price question on /me (owner, 2026-11-07), for the students
-- who said Yes on /tutor BEFORE the price test (migration 0223) and so were
-- never shown a price: 47 signed-in accounts, 42 of them active in the last
-- week. The owner will not contact them, so /me asks, and they answer in the
-- card itself rather than on /tutor (each extra page loses people).
--
--   price_snoozed_until  "Not now" on the card puts it away until this time
--                        (a week). Stored on the account, not in the browser,
--                        so it holds on every device the student uses.
--   price_answered_from  'tutor' or 'me': where the price answer was given,
--                        so the readout can see whether the place changes the
--                        answer. Set with an answer, never without one.
--
-- Additive and nullable: every existing row stays valid; the table keeps its
-- 0190 access (RLS on, no policies, service role only).

ALTER TABLE public.tutor_interest
  ADD COLUMN price_snoozed_until timestamptz,
  ADD COLUMN price_answered_from text;

ALTER TABLE public.tutor_interest
  ADD CONSTRAINT tutor_interest_price_answered_from_valid
    CHECK (
      price_answered_from IS NULL
      OR (price_answered_from IN ('tutor', 'me') AND (price_answer IS NOT NULL OR teacher_rate IS NOT NULL))
    );

COMMENT ON COLUMN public.tutor_interest.price_snoozed_until IS
  '"Not now" on the /me price card hides it until this time (a week). Migration 0224.';
COMMENT ON COLUMN public.tutor_interest.price_answered_from IS
  'Where the price answer was given: tutor (/tutor) or me (the /me card). Migration 0224.';
