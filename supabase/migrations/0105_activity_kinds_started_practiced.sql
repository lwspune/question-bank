-- 0105_activity_kinds_started_practiced.sql
--
-- Two new activity kinds. Both close a hole the PMF readout (/dashboard/pmf)
-- made visible; the CHECK here is the DB-level backstop for the allowlist in
-- src/lib/activity/events.ts, extended exactly as 0052's header prescribes.
--
-- 'mock_started' — mock_submitted fires only on SUBMIT, so a student who opened
-- a paper and walked away left no trace in the spine at all. Measured before
-- this migration: 33 students had started a mock and had zero activity rows, and
-- 26% of 722 attempts never resolved. Abandonment was therefore invisible to
-- every surface that reads user_activity, and those students were being counted
-- as having done nothing. Emitted ONLY on a genuinely new attempt — a resume
-- must not re-fire it, or a student who reloads inflates their own history.
--
-- 'question_practiced' — revealing an answer on /browse or /board. This is the
-- big one: the question bank is 70k of the ~72k rows in this database and
-- recorded NOTHING when used, so "mocks are the most-used feature" could never
-- be distinguished from "mocks are the only measured feature". Revealing is a
-- discrete act of retrieval practice (the student tried, then checked), which
-- is why it clears the engagement principles gate where a "page viewed" event
-- would not — viewing is not learning, and it would be high-volume noise.
--
-- SIGNED-IN ONLY, and that is a decision rather than a limitation. Attributing
-- practice to an anonymous visitor over time requires minting a persistent
-- device identifier, which is behavioural monitoring of an audience that is
-- largely under 18 (India's DPDP Act treats children's data as its own
-- category). Aggregate anonymous volume is already approximated by Vercel
-- Analytics. The trade is: we measure the minority we can measure honestly.
--
-- Both are genuine learning actions with no vanity component — no streak, no
-- points, nothing awarded for merely showing up.

ALTER TABLE public.user_activity DROP CONSTRAINT user_activity_kind_ck;

ALTER TABLE public.user_activity ADD CONSTRAINT user_activity_kind_ck CHECK (kind IN (
  'mock_submitted',
  'mock_started',
  'answer_wrong',
  'answer_correct',
  'chapter_mastered',
  'note_checkpoint',
  'question_bookmarked',
  'question_practiced',
  'quiz_taken',
  'drill_completed'
));

-- question_practiced is the highest-volume kind by construction (one row per
-- revealed question, vs one per submitted paper), and every read of it is
-- "which questions/chapters get practised" or "did this student practise".
-- The existing (user_id, created_at) index serves the second; this serves the
-- first without a sequential scan once the table grows.
CREATE INDEX user_activity_kind_ref_idx
  ON public.user_activity (kind, ref_id)
  WHERE ref_id IS NOT NULL;
