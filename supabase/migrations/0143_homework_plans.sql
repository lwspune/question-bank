-- 0143_homework_plans.sql
--
-- Daily homework plans (2026-10-09).
--
-- WHY. A teacher sets five board questions a day, and the order matters: the
-- questions the board asked again come first, highest count first, then the
-- question types it keeps asking, then everything asked once. That order comes
-- from a reviewed repeat analysis (which questions are the SAME question in a
-- later paper), which no query can reproduce, so it is stored. /homework lists
-- the days and /api/export prints any one of them as Word or PDF.
--
-- SHAPE. A plan is one exam + one subject (MH HSC 12 Mathematics first, CBSE
-- Class 12 Physics and Chemistry next). An item is one question on one day at
-- one position, with the line printed above it ("Asked 6 times: Mar 2016, ...").
--
-- RULES THE DATABASE ENFORCES (the app and the plan builder check them too):
--   * a question appears once per plan (UNIQUE);
--   * a day holds at most per_day questions (trigger: position <= per_day);
--   * an item's question is PUBLIC and belongs to the plan's exam and subject
--     (trigger), since the page and the download are public;
--   * a question in a plan cannot be deleted (ON DELETE RESTRICT). An ingest
--     repair that deletes and re-commits a row stops with an FK error naming
--     this table, rather than leaving a day one question short. Re-point the
--     plan (scripts/homework/build-plan.ts --apply), then repair.
--
-- ACCESS. Everyone may read a PUBLISHED plan and its items; nothing else is
-- readable. There are no write policies: plans are written by the service-role
-- plan builder only, through homework_replace_items (one transaction).
--
-- export_events gains mode 'homework' and the plan + day downloaded, in the
-- shape 0136 gave past papers: the question this answers is which plans and
-- days teachers and students actually take.

CREATE TABLE public.homework_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' AND length(slug) <= 80),
  exam_id uuid NOT NULL REFERENCES public.exams(id),
  subject_id uuid NOT NULL REFERENCES public.subjects(id),
  title text NOT NULL CHECK (length(btrim(title)) BETWEEN 1 AND 120),
  summary text NOT NULL DEFAULT '' CHECK (length(summary) <= 500),
  per_day smallint NOT NULL DEFAULT 5 CHECK (per_day BETWEEN 1 AND 20),
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.homework_plan_items (
  plan_id uuid NOT NULL REFERENCES public.homework_plans(id) ON DELETE CASCADE,
  day integer NOT NULL CHECK (day >= 1),
  position smallint NOT NULL CHECK (position >= 1),
  question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE RESTRICT,
  -- 1 = asked again, 2 = a type the board keeps asking, 3 = asked once.
  part smallint NOT NULL CHECK (part IN (1, 2, 3)),
  note text NOT NULL CHECK (length(btrim(note)) BETWEEN 1 AND 300),
  PRIMARY KEY (plan_id, day, position),
  UNIQUE (plan_id, question_id)
);

CREATE INDEX homework_plan_items_question_idx ON public.homework_plan_items (question_id);

CREATE OR REPLACE FUNCTION private.homework_item_guard()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  v_plan public.homework_plans%ROWTYPE;
  v_ok boolean;
BEGIN
  SELECT * INTO v_plan FROM public.homework_plans WHERE id = NEW.plan_id;
  IF NEW.position > v_plan.per_day THEN
    RAISE EXCEPTION 'homework: day % position % exceeds % questions a day', NEW.day, NEW.position, v_plan.per_day;
  END IF;
  SELECT (q.visibility = 'PUBLIC' AND q.exam_id = v_plan.exam_id AND q.subject_id = v_plan.subject_id)
    INTO v_ok
    FROM public.questions q WHERE q.id = NEW.question_id;
  IF v_ok IS NOT TRUE THEN
    RAISE EXCEPTION 'homework: question % is not a PUBLIC question of this plan''s exam and subject', NEW.question_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER homework_plan_items_guard
  BEFORE INSERT OR UPDATE ON public.homework_plan_items
  FOR EACH ROW EXECUTE FUNCTION private.homework_item_guard();

ALTER TABLE public.homework_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homework_plan_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY homework_plans_read_published ON public.homework_plans
  FOR SELECT TO anon, authenticated USING (published);

CREATE POLICY homework_plan_items_read_published ON public.homework_plan_items
  FOR SELECT TO anon, authenticated
  USING (EXISTS (SELECT 1 FROM public.homework_plans p WHERE p.id = plan_id AND p.published));

-- Replace a plan's items in ONE transaction: the builder never leaves a plan
-- half old, half new. Service role only.
CREATE OR REPLACE FUNCTION public.homework_replace_items(p_plan_id uuid, p_items jsonb)
RETURNS integer
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  v_count integer;
BEGIN
  DELETE FROM public.homework_plan_items WHERE plan_id = p_plan_id;
  INSERT INTO public.homework_plan_items (plan_id, day, position, question_id, part, note)
  SELECT p_plan_id, (i->>'day')::integer, (i->>'position')::smallint, (i->>'questionId')::uuid,
         (i->>'part')::smallint, i->>'note'
    FROM jsonb_array_elements(p_items) AS i;
  GET DIAGNOSTICS v_count = ROW_COUNT;
  UPDATE public.homework_plans SET updated_at = now() WHERE id = p_plan_id;
  RETURN v_count;
END;
$$;

REVOKE ALL ON FUNCTION public.homework_replace_items(uuid, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.homework_replace_items(uuid, jsonb) TO service_role;

ALTER TABLE public.export_events
  DROP CONSTRAINT export_events_mode_check,
  ADD CONSTRAINT export_events_mode_check CHECK (mode IN ('cart', 'filters', 'mock', 'homework'));

ALTER TABLE public.export_events
  ADD COLUMN homework_plan_id uuid REFERENCES public.homework_plans(id) ON DELETE SET NULL,
  ADD COLUMN homework_day integer CHECK (homework_day IS NULL OR homework_day >= 1),
  ADD CONSTRAINT export_events_homework_only_for_homework
    CHECK ((homework_plan_id IS NULL AND homework_day IS NULL) OR mode = 'homework');

CREATE INDEX export_events_homework_idx ON public.export_events (homework_plan_id)
  WHERE homework_plan_id IS NOT NULL;
