-- 0021_question_concept_tags.sql
--
-- RECREATED 2026-08-06. This migration was applied to production via the
-- Supabase MCP on 2026-05-17 (the /notes concept-tags build) but its .sql file
-- was never committed — the same defect class as 0066 (recreated 2026-08-03).
-- Discovered when replaying the migration chain into the dedicated TEST
-- project: 0056 failed on the missing table. Reconstructed faithfully from the
-- LIVE production schema (columns/constraints/indexes via pg_constraint +
-- pg_indexes) and from 0023, which documents itself as "Mirrors 0021 exactly";
-- the write policy is named tags_admin_write because 0056 DROPs it by that
-- name, and its pre-0056 body matches 0023's admin-write shape.
--
-- Per-question concept tags: the vertical axis (technique within a subtopic)
-- of the two-axis tagging model — see CLAUDE.md "Design axes". Keyed on the
-- editorial (subtopic_slug, concept_slug) pair from the /notes TS modules; no
-- FK to taxonomy because notes slugs are code, not DB rows.

CREATE TABLE public.question_concept_tags (
  question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  subtopic_slug text NOT NULL,
  concept_slug text NOT NULL,
  tagged_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  tagged_at timestamptz NOT NULL DEFAULT now(),
  tagged_by_llm boolean NOT NULL DEFAULT false,
  PRIMARY KEY (question_id, subtopic_slug, concept_slug)
);

CREATE INDEX question_concept_tags_concept_lookup
  ON public.question_concept_tags (subtopic_slug, concept_slug);

ALTER TABLE public.question_concept_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY tags_read_public_questions
  ON public.question_concept_tags
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM public.questions q
      WHERE q.id = question_concept_tags.question_id
        AND q.visibility = 'PUBLIC'::visibility
    )
  );

CREATE POLICY tags_read_own_org_private
  ON public.question_concept_tags
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.questions q
      WHERE q.id = question_concept_tags.question_id
        AND q.visibility = 'PRIVATE'::visibility
        AND q.org_id = private.current_user_org_id()
    )
  );

-- Superseded by 0056 (drops this and repoints writes to
-- private.current_user_can_edit_content()); recreated here so the chain replays.
CREATE POLICY tags_admin_write
  ON public.question_concept_tags
  FOR ALL
  TO authenticated
  USING (
    private.current_user_is_admin()
    AND EXISTS (
      SELECT 1 FROM public.questions q
      WHERE q.id = question_concept_tags.question_id
        AND q.org_id = private.current_user_org_id()
    )
  )
  WITH CHECK (
    private.current_user_is_admin()
    AND EXISTS (
      SELECT 1 FROM public.questions q
      WHERE q.id = question_concept_tags.question_id
        AND q.org_id = private.current_user_org_id()
    )
  );
