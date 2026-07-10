-- 0044_mocks.sql
--
-- PYQ MOCK TESTS — real past papers served whole as timed, auto-graded online
-- tests. A mock is NOT a blueprint-sampled mix: it is exactly the PYQs of one
-- sitting (exam, paper, year, month) in original order ("use PYQPs as is").
--
-- THREE tables, two axes of ownership:
--   mock_tests      — the paper + its exam-pattern config. Built by the
--                     reconstruction script (scripts/mocks), SERVICE-ROLE writes
--                     only (like entitlements 0026 — a student JWT can never forge
--                     a mock). Readable by anyone once published.
--   mock_attempts   — one student sitting. USER-scoped (auth.uid()), own-row RLS.
--                     Retakes = multiple rows; a partial unique index caps a
--                     student at ONE in-progress attempt per mock.
--   attempt_answers — per-question response, authorized via the parent attempt.
--
-- questions (jsonb on mock_tests) is the IMMUTABLE ordered snapshot of question
-- REFS only — [{position, question_id, section_key, marks, neg_marks}] — exactly
-- like quizzes.questions (0035) / papers.finalized_snapshot (0039). Question
-- CONTENT is rendered live from public.questions at delivery (PYQs are stable +
-- PUBLIC), so math/tables/images reuse the /browse render path; the answer key
-- is read server-side at submit for grading, never shipped to the browser.
--
-- expires_at = started_at + duration_secs, stamped at insert. The runner derives
-- remaining time from it (refresh-resistant) and auto-submits when it passes.

-- ── mock_tests ───────────────────────────────────────────────────────────────
CREATE TABLE public.mock_tests (
  id              uuid PRIMARY KEY,                 -- deterministic slugToUuid(slug)
  slug            text NOT NULL UNIQUE,             -- e.g. "nda-2024-sep-maths"
  exam_id         uuid NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  paper_code      text NOT NULL,                    -- "maths" | "gat"
  pyq_year        integer NOT NULL,
  pyq_month       text,                             -- "Apr" | "Sep" | null
  title           text NOT NULL,
  duration_secs   integer NOT NULL,
  marking         jsonb NOT NULL,                   -- {"correct":2.5,"wrong":-0.83}
  sections        jsonb NOT NULL DEFAULT '[]'::jsonb,
  questions       jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_questions integer NOT NULL,
  total_marks     numeric NOT NULL,
  status          text NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft', 'published', 'archived')),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- Published-mock list, newest sitting first.
CREATE INDEX mock_tests_list_idx
  ON public.mock_tests (exam_id, status, pyq_year DESC);

-- ── mock_attempts ────────────────────────────────────────────────────────────
CREATE TABLE public.mock_attempts (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mock_id        uuid NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
  user_id        uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  started_at     timestamptz NOT NULL DEFAULT now(),
  expires_at     timestamptz NOT NULL,
  submitted_at   timestamptz,
  status         text NOT NULL DEFAULT 'in_progress'
                   CHECK (status IN ('in_progress', 'submitted', 'expired')),
  score          numeric,
  max_score      numeric,
  correct_count  integer,
  wrong_count    integer,
  skipped_count  integer,
  section_scores jsonb,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

-- A student's attempt history for a mock, newest first.
CREATE INDEX mock_attempts_user_mock_idx
  ON public.mock_attempts (user_id, mock_id, started_at DESC);

-- At most ONE live attempt per (student, mock). Retakes are allowed only once the
-- prior attempt is submitted/expired (partial index ignores terminal rows).
CREATE UNIQUE INDEX mock_attempts_one_active
  ON public.mock_attempts (mock_id, user_id)
  WHERE status = 'in_progress';

-- ── attempt_answers ──────────────────────────────────────────────────────────
CREATE TABLE public.attempt_answers (
  attempt_id     uuid NOT NULL REFERENCES public.mock_attempts(id) ON DELETE CASCADE,
  question_id    uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  selected_label text CHECK (selected_label IN ('A', 'B', 'C', 'D')),
  is_flagged     boolean NOT NULL DEFAULT false,
  time_spent_secs integer NOT NULL DEFAULT 0,
  updated_at     timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (attempt_id, question_id)
);

ALTER TABLE public.mock_tests      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_attempts   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempt_answers ENABLE ROW LEVEL SECURITY;

-- ── mock_tests RLS ───────────────────────────────────────────────────────────
-- Read: anyone (anon + authenticated) may see PUBLISHED mocks (the catalogue is
-- public for discoverability; TAKING one still requires an account via the
-- attempt tables below). Writes: service-role only (no policy) — the
-- reconstruction script + admin actions use the service-role client, which
-- bypasses RLS by design.
CREATE POLICY "mock_tests_select_published" ON public.mock_tests
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

-- ── mock_attempts RLS ────────────────────────────────────────────────────────
-- Own-row only. Insert is additionally gated on the target mock being published,
-- so an attempt can't be opened against a draft/archived paper. No DELETE policy:
-- attempt history is preserved (retakes add rows, never replace).
CREATE POLICY "mock_attempts_select_own" ON public.mock_attempts
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "mock_attempts_insert_own" ON public.mock_attempts
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.mock_tests m
      WHERE m.id = mock_attempts.mock_id
        AND m.status = 'published'
    )
  );

CREATE POLICY "mock_attempts_update_own" ON public.mock_attempts
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ── attempt_answers RLS ──────────────────────────────────────────────────────
-- Authorize via the parent attempt's owner (mirrors paper_questions → papers).
CREATE POLICY "attempt_answers_all_own" ON public.attempt_answers
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.mock_attempts a
      WHERE a.id = attempt_answers.attempt_id
        AND a.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.mock_attempts a
      WHERE a.id = attempt_answers.attempt_id
        AND a.user_id = auth.uid()
    )
  );
