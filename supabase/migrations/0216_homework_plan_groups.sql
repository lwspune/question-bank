-- 0216_homework_plan_groups.sql
--
-- A homework plan's groups in the database (2026-11-04), so a student can see
-- every question of a repeat or a type ("This type asked 8 times: See all 8").
--
-- Until now the groups lived only in the plan builder's data files
-- (scripts/homework/data/*.json); the database kept just the note printed above
-- each question. The owner asked to see all the questions of a type, which the
-- site could not list without them.
--
-- homework_plan_groups: one row per repeat or type, numbered from 1 within its
-- plan (the number is in the page address, /homework/<plan>/group/<n>).
-- homework_plan_group_questions: every question of a group, a case study's
-- parts numbered by `sub`, with the paper it came from. CASCADE on a question
-- delete, unlike the plan items' RESTRICT: the items ARE the plan, a group's
-- list is a view, and an ingest repair must not be blocked by every sibling
-- wording too (the items' RESTRICT already blocks it for printed questions).
-- homework_plan_items.group_n: the group a slot stands for, null for a
-- question asked once with no type.
--
-- Read like the plans: only a published plan's groups. Written only through
-- homework_replace_items, which now replaces the plan's items AND groups in one
-- transaction, so a rebuild never leaves items pointing at old groups. The
-- third argument defaults to none, so a two-argument call clears the groups.

CREATE TABLE public.homework_plan_groups (
  plan_id uuid NOT NULL REFERENCES public.homework_plans(id) ON DELETE CASCADE,
  n integer NOT NULL CHECK (n >= 1),
  tier text NOT NULL CHECK (tier IN ('repeat', 'type')),
  label text NOT NULL CHECK (length(btrim(label)) BETWEEN 1 AND 300),
  sittings text[] NOT NULL CHECK (cardinality(sittings) >= 1),
  PRIMARY KEY (plan_id, n)
);

CREATE TABLE public.homework_plan_group_questions (
  plan_id uuid NOT NULL,
  n integer NOT NULL,
  position smallint NOT NULL CHECK (position >= 1),
  sub smallint NOT NULL DEFAULT 1 CHECK (sub >= 1),
  question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  sitting text NOT NULL CHECK (length(btrim(sitting)) BETWEEN 1 AND 60),
  PRIMARY KEY (plan_id, n, position, sub),
  FOREIGN KEY (plan_id, n) REFERENCES public.homework_plan_groups(plan_id, n) ON DELETE CASCADE
);

CREATE INDEX homework_plan_group_questions_question_idx ON public.homework_plan_group_questions (question_id);

ALTER TABLE public.homework_plan_items
  ADD COLUMN group_n integer,
  ADD CONSTRAINT homework_plan_items_group_fk
    FOREIGN KEY (plan_id, group_n) REFERENCES public.homework_plan_groups(plan_id, n);

-- A group may list only PUBLIC questions of its plan's exam and subject, the
-- rule the plan items keep.
CREATE OR REPLACE FUNCTION private.homework_group_question_guard()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  v_ok boolean;
BEGIN
  SELECT (q.visibility = 'PUBLIC' AND q.exam_id = p.exam_id AND q.subject_id = p.subject_id)
    INTO v_ok
    FROM public.homework_plans p, public.questions q
   WHERE p.id = NEW.plan_id AND q.id = NEW.question_id;
  IF v_ok IS NOT TRUE THEN
    RAISE EXCEPTION 'homework: question % is not a PUBLIC question of this plan''s exam and subject', NEW.question_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER homework_plan_group_questions_guard
  BEFORE INSERT OR UPDATE ON public.homework_plan_group_questions
  FOR EACH ROW EXECUTE FUNCTION private.homework_group_question_guard();

ALTER TABLE public.homework_plan_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homework_plan_group_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY homework_plan_groups_read_published ON public.homework_plan_groups
  FOR SELECT TO anon, authenticated
  USING (EXISTS (SELECT 1 FROM public.homework_plans p WHERE p.id = plan_id AND p.published));

CREATE POLICY homework_plan_group_questions_read_published ON public.homework_plan_group_questions
  FOR SELECT TO anon, authenticated
  USING (EXISTS (SELECT 1 FROM public.homework_plans p WHERE p.id = plan_id AND p.published));

DROP FUNCTION public.homework_replace_items(uuid, jsonb);

CREATE FUNCTION public.homework_replace_items(p_plan_id uuid, p_items jsonb, p_groups jsonb DEFAULT '[]'::jsonb)
RETURNS integer
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  v_count integer;
BEGIN
  DELETE FROM public.homework_plan_items WHERE plan_id = p_plan_id;
  DELETE FROM public.homework_plan_groups WHERE plan_id = p_plan_id;

  INSERT INTO public.homework_plan_groups (plan_id, n, tier, label, sittings)
  SELECT p_plan_id, (g->>'n')::integer, g->>'tier', g->>'label',
         ARRAY(SELECT jsonb_array_elements_text(g->'sittings'))
    FROM jsonb_array_elements(p_groups) AS g;

  INSERT INTO public.homework_plan_group_questions (plan_id, n, position, sub, question_id, sitting)
  SELECT p_plan_id, (g->>'n')::integer, (m->>'position')::smallint, COALESCE((m->>'sub')::smallint, 1),
         (m->>'questionId')::uuid, m->>'sitting'
    FROM jsonb_array_elements(p_groups) AS g,
         jsonb_array_elements(g->'members') AS m;

  INSERT INTO public.homework_plan_items (plan_id, day, position, sub, question_id, part, note, group_n)
  SELECT p_plan_id, (i->>'day')::integer, (i->>'position')::smallint, COALESCE((i->>'sub')::smallint, 1),
         (i->>'questionId')::uuid, (i->>'part')::smallint, i->>'note', (i->>'group')::integer
    FROM jsonb_array_elements(p_items) AS i;
  GET DIAGNOSTICS v_count = ROW_COUNT;
  UPDATE public.homework_plans SET updated_at = now() WHERE id = p_plan_id;
  RETURN v_count;
END;
$$;

REVOKE ALL ON FUNCTION public.homework_replace_items(uuid, jsonb, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.homework_replace_items(uuid, jsonb, jsonb) TO service_role;
