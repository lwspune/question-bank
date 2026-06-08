-- 0031_quizzes.sql
--
-- Assembled daily quizzes — the "record" of what we built + pushed (the question
-- the user asked: keep a quiz record on the PYQ Vault side, distinct from
-- nda-tracker which owns DELIVERY: batch, publish, attempts, scores).
--
--   quizzes        — one row per daily quiz. `id` is the SAME uuid pushed to
--                    nda-tracker (deterministic from `slug` via slugToUuid), so
--                    this row links 1:1 to the delivered quiz. `status` tracks
--                    OUR side only (draft → pushed); nda-tracker owns 'published'.
--   quiz_atoms_map — the ordered atoms that make up a quiz. Coverage ("has this
--                    atom gone out already?") is a JOIN here, not a hand lint.
--
-- Same access model as quiz_atoms (0030) + entitlements (0026): admin-read,
-- service-role-only writes. Global content, no org_id.

CREATE TABLE public.quizzes (
  id             uuid PRIMARY KEY,                       -- = slugToUuid(slug) = pushed id
  slug           text NOT NULL UNIQUE,
  exam           text NOT NULL,
  subject        text NOT NULL,
  title          text NOT NULL,
  chapter        text NOT NULL,
  marking        jsonb NOT NULL DEFAULT '{"correct":1,"wrong":0}'::jsonb,
  status         text NOT NULL DEFAULT 'draft'
                   CHECK (status IN ('draft','pushed','published','archived')),
  scheduled_date date,
  pushed_at      timestamptz,
  created_by     uuid REFERENCES auth.users(id),
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.quiz_atoms_map (
  quiz_id   uuid NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  atom_id   uuid NOT NULL REFERENCES public.quiz_atoms(id) ON DELETE RESTRICT,
  position  int  NOT NULL,
  PRIMARY KEY (quiz_id, position),
  UNIQUE (quiz_id, atom_id)               -- an atom appears at most once per quiz
);

CREATE INDEX quiz_atoms_map_atom_idx ON public.quiz_atoms_map (atom_id); -- coverage lookups

ALTER TABLE public.quizzes        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_atoms_map ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quizzes_select_admin"
  ON public.quizzes
  FOR SELECT TO authenticated
  USING (private.current_user_is_admin());

CREATE POLICY "quiz_atoms_map_select_admin"
  ON public.quiz_atoms_map
  FOR SELECT TO authenticated
  USING (private.current_user_is_admin());

-- No INSERT/UPDATE/DELETE policies on either table: writes are service-role only.
