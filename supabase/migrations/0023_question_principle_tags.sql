-- 0023_question_principle_tags.sql
--
-- Cross-topic principle tags. Separate table from question_concept_tags (0021)
-- because principles and concepts live on different design axes (horizontal vs
-- vertical) per the CLAUDE.md "Design axes" wall — sharing UI is fine, sharing
-- schema flattens the distinction.
--
-- A tag means: this question invokes the principle as its solving lever. Used
-- as the single source of truth for the /guide/nda-maths principle drill counts
-- and "Drill the N questions →" CTAs (which now resolve to /browse?principle=).
--
-- RLS inherits question visibility — anon reads tags only on PUBLIC questions;
-- authed org members additionally see own-org PRIVATE tags; ADMIN writes scoped
-- to own-org questions. Mirrors 0021 exactly.

CREATE TABLE public.question_principle_tags (
  question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  principle_slug text NOT NULL,
  tagged_by uuid REFERENCES auth.users(id),
  tagged_at timestamptz NOT NULL DEFAULT now(),
  tagged_by_llm boolean NOT NULL DEFAULT false,
  PRIMARY KEY (question_id, principle_slug)
);

CREATE INDEX question_principle_tags_principle_lookup
  ON public.question_principle_tags (principle_slug);

ALTER TABLE public.question_principle_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY principle_tags_read_public_questions
  ON public.question_principle_tags
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM public.questions q
      WHERE q.id = question_principle_tags.question_id
        AND q.visibility = 'PUBLIC'::visibility
    )
  );

CREATE POLICY principle_tags_read_own_org_private
  ON public.question_principle_tags
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.questions q
      WHERE q.id = question_principle_tags.question_id
        AND q.visibility = 'PRIVATE'::visibility
        AND q.org_id = private.current_user_org_id()
    )
  );

CREATE POLICY principle_tags_admin_write
  ON public.question_principle_tags
  FOR ALL
  TO authenticated
  USING (
    private.current_user_is_admin()
    AND EXISTS (
      SELECT 1 FROM public.questions q
      WHERE q.id = question_principle_tags.question_id
        AND q.org_id = private.current_user_org_id()
    )
  )
  WITH CHECK (
    private.current_user_is_admin()
    AND EXISTS (
      SELECT 1 FROM public.questions q
      WHERE q.id = question_principle_tags.question_id
        AND q.org_id = private.current_user_org_id()
    )
  );
