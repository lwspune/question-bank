-- 0149: student exam results — the public results wall and the "did you clear
-- it?" check students are asked after a result is announced (2026-10-10).
--
-- Why: nine PYQ Vault students cleared the NDA 2 2026 written exam, and the
-- owner wants their names on the site, then the same for every exam's result.
-- Two tables:
--   result_announcements  one row per announced result (exam, sitting, stage)
--                         and the window in which students are asked about it.
--   student_results       one row per student per announcement: their answer,
--                         the name they want shown, their consent, and whether
--                         staff have reviewed and published it.
--
-- Nothing publishes itself. A student's "yes" lands unpublished; a superadmin
-- reviews it, because we cannot verify a result. The six names entered at
-- launch are source 'staff' (the owner had the students' consent already).
--
-- Who can read what:
--   * anon + students read published names ONLY, and only the name columns:
--     no user_id, no answer from an unpublished row. Column grants enforce the
--     columns, the RLS policy the rows.
--   * A student's own answer is written and read through a server route with
--     the service role, after the route has checked the session. So students
--     get NO insert/update grant here at all: they can never touch `published`.
--
-- Guards in the table, whatever writes it:
--   * a shown name holds no digit, "_" or "@", so an account handle such as
--     "Panda_74" cannot be published by mistake;
--   * a row can be shown only when the answer is "cleared" and the student
--     agreed, and published only when it can be shown.

CREATE TABLE public.result_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid NOT NULL REFERENCES public.exams(id),
  sitting text NOT NULL CHECK (length(btrim(sitting)) BETWEEN 1 AND 40),
  stage text NOT NULL CHECK (stage IN ('written', 'ssb', 'final')),
  announced_on date NOT NULL,
  ask_until date NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (ask_until >= announced_on),
  UNIQUE (exam_id, sitting, stage)
);

ALTER TABLE public.result_announcements ENABLE ROW LEVEL SECURITY;

-- An announcement is public information.
CREATE POLICY result_announcements_read ON public.result_announcements
  FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.student_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_id uuid NOT NULL REFERENCES public.result_announcements(id) ON DELETE CASCADE,
  -- A deleted account takes its result with it.
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  outcome text NOT NULL CHECK (outcome IN ('cleared', 'not_cleared', 'did_not_appear', 'dismissed')),
  display_name text CHECK (
    display_name IS NULL
    OR (length(btrim(display_name)) BETWEEN 2 AND 60 AND display_name !~ '[0-9_@]')
  ),
  show_publicly boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT false,
  source text NOT NULL DEFAULT 'self' CHECK (source IN ('self', 'staff')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (announcement_id, user_id),
  CHECK (NOT show_publicly OR (outcome = 'cleared' AND display_name IS NOT NULL)),
  CHECK (NOT published OR show_publicly)
);

CREATE INDEX student_results_published_idx ON public.student_results (announcement_id) WHERE published;
CREATE INDEX student_results_user_idx ON public.student_results (user_id);

ALTER TABLE public.student_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY student_results_read_published ON public.student_results
  FOR SELECT TO anon, authenticated USING (published);

REVOKE ALL ON public.student_results FROM anon, authenticated;
GRANT SELECT (id, announcement_id, display_name, published, created_at)
  ON public.student_results TO anon, authenticated;
