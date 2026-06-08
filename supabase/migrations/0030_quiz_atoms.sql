-- 0030_quiz_atoms.sql
--
-- The "Quiz Factory" atom pool. Each row is one harvested candidate Level-1
-- recall MCQ, derived from the /notes ConceptUnits (see scripts/quiz/atoms.ts —
-- the JSON it writes seeds this table; the column set mirrors the QuizAtom type).
--
-- GLOBAL CONTENT, NOT org-scoped — exactly like taxonomy + question_concept_tags
-- (see CLAUDE.md "org-scoping global content"): a quiz atom belongs to a /notes
-- concept, not an org. So there is NO org_id. Curation reads are admin-only;
-- WRITES ARE SERVICE-ROLE ONLY (the harvest/sync script + future admin actions),
-- same trust model as public.entitlements (0026).
--
-- Two correctness tiers live in `status`:
--   'auto'         — key AND distractors correct by construction (reference rows,
--                    formula recall). Shippable without review.
--   'needs_review' — key correct, distractors not finalized (practiceSet/selfCheck
--                    candidates, or a trap "spot the mistake" seed).
--   'verified'     — a human/LLM verify pass confirmed exactly one correct option.
--
-- `source_fingerprint` = sha1 of the source notes content. On re-sync, a changed
-- fingerprint means the /notes concept was edited → the atom is refreshed and any
-- prior 'verified' state is dropped (re-verify). `atom_key` is the natural key
-- (conceptSlug:kind:index) the sync upserts on, so re-harvest is idempotent.

CREATE TABLE public.quiz_atoms (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  atom_key             text NOT NULL UNIQUE,
  exam                 text NOT NULL,
  subject_route        text NOT NULL,
  chapter_slug         text NOT NULL,
  subtopic_slug        text NOT NULL,
  concept_slug         text NOT NULL,
  source_kind          text NOT NULL
                         CHECK (source_kind IN ('formula','reference','practiceSet','selfCheck','trap')),
  source_index         int  NOT NULL,
  stem                 text NOT NULL,
  correct              text NOT NULL DEFAULT '',
  options              jsonb,
  answer               text CHECK (answer IN ('A','B','C','D')),
  candidate_distractors text[] NOT NULL DEFAULT '{}',
  trap_hints           text[] NOT NULL DEFAULT '{}',
  distractor_source    text,
  status               text NOT NULL DEFAULT 'needs_review'
                         CHECK (status IN ('auto','needs_review','verified')),
  looks_mcq_clean      boolean NOT NULL DEFAULT false,
  source_fingerprint   text NOT NULL,
  time_estimate_sec    int  NOT NULL DEFAULT 45,
  verified_at          timestamptz,
  verified_by          uuid REFERENCES auth.users(id),
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now()
);

-- Coverage / staleness lookups by concept; assembly filters by chapter + status.
CREATE INDEX quiz_atoms_concept_idx ON public.quiz_atoms (concept_slug);
CREATE INDEX quiz_atoms_chapter_idx ON public.quiz_atoms (subject_route, chapter_slug);
CREATE INDEX quiz_atoms_status_idx  ON public.quiz_atoms (status);

ALTER TABLE public.quiz_atoms ENABLE ROW LEVEL SECURITY;

-- Admins (any org member with ADMIN) may read the pool for curation. Anon /
-- students / teachers cannot — atoms are not student-facing content.
CREATE POLICY "quiz_atoms_select_admin"
  ON public.quiz_atoms
  FOR SELECT
  TO authenticated
  USING (private.current_user_is_admin());

-- No INSERT/UPDATE/DELETE policies: writes are service-role only.
