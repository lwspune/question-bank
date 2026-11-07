-- 0223_tutor_price.sql
--
-- The tutoring PRICE test (owner, 2026-11-07), on the /tutor interest check
-- (migration 0190). 52 students said Yes to 1:1 tutoring in its first ten
-- days, well past the 20 the experiment asked for, but a Yes cost them
-- nothing. The owner will not contact them, so the price is asked on /tutor
-- itself: after a Yes, a student sees ONE price for a 1-hour 1:1 session
-- (499, 749 or 999 rupees, fixed per account by a hash of its id, decided by
-- the server) and answers Yes, "only if it cost less" (then picks a lower
-- amount, or none), or No. A teacher who would teach says what they would
-- charge. The Yes answers from before this test are asked when they return.
--
-- Why one price per student and not a menu: a menu pulls every answer to the
-- cheapest option. Why the three prices are read against each other: "I would
-- book" runs well ahead of paying, so the DROP between prices is the signal.
--
-- price_shown is written with a student Yes (POST /api/tutor-interest), before
-- the price is shown, so a student who leaves at the price is still counted
-- as having seen it. A returning Yes gets it when they answer.
--
-- Rules, as CHECKs (the route's validator mirrors them, src/lib/tutor/price.ts):
--   * a price only for a student Yes, and only one of the three;
--   * an answer only to a price shown; a lower amount only with "cheaper",
--     and below the price;
--   * a rate only from a teacher Yes, one of four bands.
-- All columns are nullable and additive: every existing row stays valid, and
-- the table keeps its 0190 access (RLS on, no policies, service role only).

ALTER TABLE public.tutor_interest
  ADD COLUMN price_shown       integer,
  ADD COLUMN price_answer      text,
  ADD COLUMN price_would_pay   integer,
  ADD COLUMN teacher_rate      text,
  ADD COLUMN price_answered_at timestamptz;

ALTER TABLE public.tutor_interest
  ADD CONSTRAINT tutor_interest_price_shown_valid
    CHECK (price_shown IS NULL OR (price_shown IN (499, 749, 999) AND role = 'student' AND wants)),
  ADD CONSTRAINT tutor_interest_price_answer_valid
    CHECK (price_answer IS NULL OR (price_answer IN ('yes', 'cheaper', 'no') AND price_shown IS NOT NULL)),
  ADD CONSTRAINT tutor_interest_would_pay_valid
    CHECK (
      price_would_pay IS NULL
      OR (price_answer = 'cheaper' AND price_would_pay > 0 AND price_would_pay < price_shown)
    ),
  ADD CONSTRAINT tutor_interest_teacher_rate_valid
    CHECK (
      teacher_rate IS NULL
      OR (teacher_rate IN ('under-500', '500-750', '750-1000', 'over-1000') AND role = 'teacher' AND wants)
    );

COMMENT ON COLUMN public.tutor_interest.price_shown IS
  'Price (rupees) of a 1-hour 1:1 session shown to this student after a Yes: 499, 749 or 999, fixed per account. Migration 0223.';
COMMENT ON COLUMN public.tutor_interest.price_answer IS
  'Would they book at price_shown: yes, cheaper (only if it cost less) or no. NULL = not answered. Migration 0223.';
COMMENT ON COLUMN public.tutor_interest.price_would_pay IS
  'After "cheaper": the lower amount picked, below price_shown. NULL = not sure. Migration 0223.';
COMMENT ON COLUMN public.tutor_interest.teacher_rate IS
  'A teacher Yes: what they would charge for a 1-hour session, as a band. Migration 0223.';
