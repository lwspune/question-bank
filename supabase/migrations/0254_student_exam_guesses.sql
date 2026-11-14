-- 0254_student_exam_guesses.sql
--
-- The exam we GUESS for a student who never chose one (owner, 2026-11-14).
-- 1,260 students on www who signed up before 2026-11-13 had no exam; their
-- Home could not offer Start next, the study plan or their exam's mocks. Their
-- practice (80%+ of 3+ answers in one exam) or the page they first landed on
-- names it: tested against students who DID choose, 94% and 92% right.
-- Home shows the guess as "Your exam: X (our guess)" with Correct and Change.
--
-- WHY NOT target_exams: that column means the student CHOSE the exam, and
-- /account, rosters, the leads feed, emails and the "Did you clear it?"
-- results question all read it that way. A guess written there becomes a
-- false claim on every one of them. So it lives here, and only Home reads it.
--
-- WHY A TABLE, not columns on student_profiles: students UPDATE their own
-- profile row (0045), so a guess there could be rewritten by its subject.
-- Here a student can only READ their own row; the daily job
-- (scripts/profile/infer-exams.ts) and POST /api/profile/exam-guess write it
-- with the service role.
--
-- KEPT after the student chooses: comparing the guess with what they later
-- picked is how its accuracy is measured. A student who taps Change is not
-- shown the guess again (card_answer = 'change').
--
-- card_seen_at: when the card first came into view, so the readout has a
-- denominator (taps / students who saw it). Reset when the guess changes to a
-- different exam, since the card they saw named the old one.

CREATE TABLE public.student_exam_guesses (
  user_id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  -- An exam slug (examContext.ts), validated app-side like target_exams.
  exam             text NOT NULL CHECK (exam ~ '^[a-z0-9-]{2,40}$'),
  source           text NOT NULL CHECK (source IN ('practice', 'landing')),
  guessed_at       timestamptz NOT NULL DEFAULT now(),
  card_seen_at     timestamptz,
  card_answer      text CHECK (card_answer IN ('correct', 'change')),
  card_answered_at timestamptz,
  -- An answer exactly when it has a time.
  CONSTRAINT student_exam_guesses_answer_iff_time CHECK ((card_answer IS NULL) = (card_answered_at IS NULL))
);

COMMENT ON TABLE public.student_exam_guesses IS
  'The exam guessed for a student with no target_exams, and their answer to the Home card. Read own row; service-role writes. Migration 0254.';

ALTER TABLE public.student_exam_guesses ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.student_exam_guesses FROM anon, authenticated;
GRANT SELECT ON public.student_exam_guesses TO authenticated;

CREATE POLICY student_exam_guesses_select_own ON public.student_exam_guesses
  FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));
