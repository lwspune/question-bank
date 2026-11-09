-- 0247_study_circle_interest.sql
--
-- Study-circle button test (owner, 2026-11-09). A card on Home asks "Study
-- with your friends?": you and up to 4 friends you already know would see each
-- other's week. No chat, no scores, no ranking. It is NOT built: this measures
-- demand before any of it is, the way /tutor did (0190).
--
-- WHY NOT A STRANGER-MATCHING CIRCLE: a Class 10 student is about 15. Matching
-- strangers who can message each other is a child-safety risk we cannot
-- moderate, and the DPDP Act wants verifiable parental consent for an
-- under-18's data. The pool is also too thin (29 students answered CBSE
-- Class 10 questions in the 30 days to 2026-11-09). So the idea under test is
-- friends-only, and this table holds no friend, contact or message data.
--
-- WHY A "SEEN" ROW: a tap count alone has no denominator. The card posts once
-- when it first comes into view, so the readout is Yes / students who saw it.
-- The answer then updates the same row (upsert on user_id).
--
-- stage + exams: copied from the student's profile when the row is written,
-- so the readout can split out Class 9-10 students without a join, and stays
-- as it was if they later change their profile.
--
-- WHY service-role-only (RLS enabled, NO policies): POST /api/study-circle
-- rate-limits and writes with the service role; the Home read and the growth
-- readout read with it. Same model as tutor_interest (0190).

CREATE TABLE public.study_circle_interest (
  user_id      uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  shown_at     timestamptz NOT NULL DEFAULT now(),
  answer       text CHECK (answer IN ('yes', 'no')),
  answered_at  timestamptz,
  stage        text CHECK (stage IN ('class-9-10', 'class-11', 'class-12', 'dropper', 'college')),
  exams        text[] NOT NULL DEFAULT '{}' CHECK (cardinality(exams) <= 10),
  -- An answer exactly when it has a time.
  CONSTRAINT study_circle_interest_answer_iff_time CHECK ((answer IS NULL) = (answered_at IS NULL))
);

COMMENT ON TABLE public.study_circle_interest IS
  'Study-circle demand test on Home: who saw the card and their Yes/No. Service-role only; see migration 0247.';

-- RLS enabled with NO policies -> only the service-role client can read/write.
ALTER TABLE public.study_circle_interest ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.study_circle_interest FROM anon, authenticated;
