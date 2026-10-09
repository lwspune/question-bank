-- 0144_homework_item_parts.sql
--
-- A homework slot may hold several parts (2026-10-09).
--
-- WHY. A CBSE case study is ONE board question (one passage, 4-5 parts) but
-- the bank stores each part as its own row. The owner's call: a case study
-- fills one of a day's five slots, as the board numbers it, with the passage
-- printed once above its parts. 0143 keyed an item on (plan, day, position),
-- one row per slot, so a slot could not hold parts.
--
-- HOW. `sub` numbers the parts of a slot from 1; a plain question is sub 1.
-- The key becomes (plan, day, position, sub). The per-day limit still counts
-- POSITIONS (the 0143 trigger checks position <= per_day), so a case study
-- does not eat five slots. homework_replace_items reads `sub` and defaults it
-- to 1, so a caller written for 0143 keeps working.
--
-- SAFE. Every existing row gets sub = 1, which keeps the old key unique.

ALTER TABLE public.homework_plan_items
  ADD COLUMN sub smallint NOT NULL DEFAULT 1 CHECK (sub >= 1);

ALTER TABLE public.homework_plan_items
  DROP CONSTRAINT homework_plan_items_pkey,
  ADD PRIMARY KEY (plan_id, day, position, sub);

CREATE OR REPLACE FUNCTION public.homework_replace_items(p_plan_id uuid, p_items jsonb)
RETURNS integer
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  v_count integer;
BEGIN
  DELETE FROM public.homework_plan_items WHERE plan_id = p_plan_id;
  INSERT INTO public.homework_plan_items (plan_id, day, position, sub, question_id, part, note)
  SELECT p_plan_id, (i->>'day')::integer, (i->>'position')::smallint, COALESCE((i->>'sub')::smallint, 1),
         (i->>'questionId')::uuid, (i->>'part')::smallint, i->>'note'
    FROM jsonb_array_elements(p_items) AS i;
  GET DIAGNOSTICS v_count = ROW_COUNT;
  UPDATE public.homework_plans SET updated_at = now() WHERE id = p_plan_id;
  RETURN v_count;
END;
$$;

REVOKE ALL ON FUNCTION public.homework_replace_items(uuid, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.homework_replace_items(uuid, jsonb) TO service_role;
