-- 0285_class_offer_more_courses.sql
--
-- The /me class offer (0282) asked about two courses: the SPI crash course
-- (Class 10 students) and offline NDA classes. On 2026-11-23 the owner moved
-- the header's Classes button into the avatar menu and widened the card, so a
-- student is asked about the course for their main exam: MHT-CET, JEE, CDS,
-- AFCAT, 12th Board or SSC CGL as well. One card per student, ever; the rule
-- lives in src/lib/classes/meOffer.ts (pickClassOffer).
--
-- This widens only the CHECK on class_offer_answers.offer, to the list in
-- CLASS_OFFER_SLUGS (meOffer.ts). Each value is a /classes course slug, so
-- record_class_offer_yes (0282) needs no change: it already puts p_offer into
-- class_interest.courses and orders courses by the full /classes list. 10th
-- Board stays out: a Class 10 student is asked about SPI.
--
-- Rollback: put the two-value CHECK back (after deleting rows outside it).

ALTER TABLE public.class_offer_answers
  DROP CONSTRAINT class_offer_answers_offer_check,
  ADD CONSTRAINT class_offer_answers_offer_check
    CHECK (offer IN ('spi', 'nda', 'mht-cet', 'jee', 'cds', 'afcat', 'board-12', 'ssc-cgl'));
