-- 0272_class_interest_spi.sql
--
-- /classes offers SPI too (owner, 2026-11-18): the Services Preparatory
-- Institute entrance, Class 10 and NDA-bound, so it sits with the defence
-- courses in src/lib/classes/interest.ts (CLASS_COURSES).
--
-- The courses CHECK from 0265 lists the allowed slugs, so without this a lead
-- that ticks SPI would pass the app's validation and be refused by the INSERT.
-- WIDENING only: every existing row already satisfies the new list, so the
-- re-add validates instantly and nothing is rewritten.

ALTER TABLE public.class_interest DROP CONSTRAINT class_interest_courses_check;

ALTER TABLE public.class_interest
  ADD CONSTRAINT class_interest_courses_check
  CHECK (cardinality(courses) >= 1
         AND courses <@ ARRAY['nda', 'cds', 'afcat', 'spi', 'mht-cet', 'jee', 'board-10', 'board-12', 'ssc-cgl']::text[]);
