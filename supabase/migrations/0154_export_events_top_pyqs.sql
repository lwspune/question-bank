-- 0154_export_events_top_pyqs.sql
--
-- Log a chapter's Top 10 PYQs download (2026-10-13).
--
-- WHY. Every /board chapter whose subject has a published homework plan now
-- carries a "Top 10 PYQs" tab: the first ten questions of that chapter in the
-- plan's order (asked again, most-asked first, then the types the board keeps
-- asking, then the rest), downloadable as a paper and its answer key through
-- /api/export. The question the log answers is which chapters people take, so
-- a download names the plan AND the chapter. Nothing is stored for the list
-- itself: it is read from homework_plan_items, so it can never disagree with
-- the homework days.
--
-- SHAPE. mode 'top_pyqs'. The plan goes in the existing homework_plan_id; a
-- new chapter_id names the chapter. A Top 10 is not a day, so homework_day
-- stays NULL on it, and chapter_id is allowed on a top_pyqs row only.
--
-- SAFE. Adds a mode and a nullable column; widens one CHECK. Existing rows
-- satisfy every new constraint (none has a chapter_id).

ALTER TABLE public.export_events
  DROP CONSTRAINT export_events_mode_check,
  ADD CONSTRAINT export_events_mode_check
    CHECK (mode IN ('cart', 'filters', 'mock', 'homework', 'board_paper', 'formula', 'top_pyqs'));

ALTER TABLE public.export_events
  DROP CONSTRAINT export_events_homework_only_for_homework,
  ADD CONSTRAINT export_events_homework_only_for_homework
    CHECK (
      (homework_plan_id IS NULL AND homework_day IS NULL)
      OR mode = 'homework'
      OR (mode = 'top_pyqs' AND homework_day IS NULL)
    );

ALTER TABLE public.export_events
  ADD COLUMN chapter_id uuid REFERENCES public.chapters(id) ON DELETE SET NULL,
  ADD CONSTRAINT export_events_chapter_only_for_top_pyqs
    CHECK (chapter_id IS NULL OR mode = 'top_pyqs');

CREATE INDEX export_events_chapter_idx ON public.export_events (chapter_id)
  WHERE chapter_id IS NOT NULL;
