-- 0048_student_profile_onboarding.sql
--
-- Grow student_profiles (0045) from a mobile-only row into the general
-- post-signup profile the table's comment always anticipated ("currently just
-- the contact mobile"). Adds the first STAGGERED intent-capture fields, shown
-- once right after sign-up: which exam(s) the student is preparing for + their
-- stage. See the 2026-07-12 progressive-data-collection plan.
--
-- The onboarding screen creates/updates this row BEFORE any mock has captured a
-- mobile, so `mobile` becomes nullable. Widening only — existing rows keep their
-- number, and needsMobile() (mobile IS NULL) is unaffected.

ALTER TABLE public.student_profiles ALTER COLUMN mobile DROP NOT NULL;

ALTER TABLE public.student_profiles
  -- Exam slugs (examContext.ts registry), validated app-side like the qb_exam
  -- cookie — soft refs, no FK. Default '{}' so reads never handle NULL arrays.
  ADD COLUMN target_exams text[] NOT NULL DEFAULT '{}',
  -- Self-reported stage of preparation. Closed enum → a CHECK below (mirrors the
  -- STAGES constant in src/lib/profile/onboarding.ts).
  ADD COLUMN stage        text,
  -- The gate signal: stamped on BOTH Continue and Skip so we ask exactly once.
  -- NULL (incl. pre-existing mobile-only rows) ⇒ the student still sees the
  -- skippable intent screen once, which opportunistically captures their exam.
  ADD COLUMN onboarded_at timestamptz;

ALTER TABLE public.student_profiles
  ADD CONSTRAINT student_profiles_stage_chk
  CHECK (stage IS NULL OR stage IN ('class-9-10','class-11','class-12','dropper','college'));

-- No RLS change: the 0045 own-row SELECT/INSERT/UPDATE policies are table-level
-- and already cover the new columns. A student writes only their own row.
