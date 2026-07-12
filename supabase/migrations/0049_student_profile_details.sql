-- 0049_student_profile_details.sql
--
-- Phase 2 of the staggered data-collection plan: the never-gated /account
-- profile fields a student fills at their own pace (medium, stream, city, goal).
-- All nullable — nothing is ever required; the /account completion meter is a
-- nudge, not a gate. Mirrors the closed-enum CHECKs to the constants in
-- src/lib/profile/fields.ts. RLS is table-level (0045) → inherited, no change.

ALTER TABLE public.student_profiles
  ADD COLUMN medium          text, -- language of instruction (hindi|english)
  ADD COLUMN academic_stream text, -- pcm|pcb|pcmb|commerce|arts
  ADD COLUMN city            text,
  ADD COLUMN goal            text; -- short free-text aspiration, e.g. "Clear NDA 2026"

ALTER TABLE public.student_profiles
  ADD CONSTRAINT student_profiles_medium_chk
    CHECK (medium IS NULL OR medium IN ('hindi','english')),
  ADD CONSTRAINT student_profiles_stream_chk
    CHECK (academic_stream IS NULL OR academic_stream IN ('pcm','pcb','pcmb','commerce','arts')),
  -- Length guards at the DB boundary (app also trims/caps in fields.ts).
  ADD CONSTRAINT student_profiles_city_len_chk
    CHECK (city IS NULL OR char_length(city) <= 80),
  ADD CONSTRAINT student_profiles_goal_len_chk
    CHECK (goal IS NULL OR char_length(goal) <= 200);
