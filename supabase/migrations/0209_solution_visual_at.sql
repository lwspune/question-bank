-- 0209_solution_visual_at — when a question's animated solution went on
-- (2026-10-31).
--
-- WHY. A visual records no date, so a reveal cannot be told apart as "shown
-- an animation" or "before it had one". Asked how many students could have
-- seen an animation, the count included 89 reveals on 2026-10-24, when only the
-- 3 pilot visuals existed.
--
-- THE RULE, set by a trigger so every write path obeys it (visuals:run, the
-- other sessions' batch runs, a hand fix in SQL), never by the writer:
--   - a visual goes on a question that had none   -> now()
--   - the visual is rebuilt (visuals:run --replace) -> the date is KEPT, since
--     the question showed an animation throughout
--   - the visual is removed                         -> NULL
--   - a date sent by the writer is ignored
-- The trigger fires only when solution_visual or solution_visual_at is in the
-- UPDATE's column list, so ordinary question edits never run it.
--
-- NOT BACKFILLED (owner, 2026-10-31: count from the push). The ~6,850 visuals
-- written before this stay NULL, meaning "date unknown", not "no visual".

ALTER TABLE public.questions ADD COLUMN solution_visual_at timestamptz;

COMMENT ON COLUMN public.questions.solution_visual_at IS
  'When solution_visual first went on this question (kept on a rebuild, NULL when removed); set by trigger questions_stamp_solution_visual_at only. NULL with a visual = added before 2026-10-31, date unknown. Migration 0209.';

CREATE OR REPLACE FUNCTION private.stamp_solution_visual_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.solution_visual IS NULL THEN
    NEW.solution_visual_at := NULL;
  ELSIF TG_OP = 'INSERT' OR OLD.solution_visual IS NULL THEN
    NEW.solution_visual_at := now();
  ELSE
    NEW.solution_visual_at := OLD.solution_visual_at;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER questions_stamp_solution_visual_at
  BEFORE INSERT OR UPDATE OF solution_visual, solution_visual_at ON public.questions
  FOR EACH ROW EXECUTE FUNCTION private.stamp_solution_visual_at();
