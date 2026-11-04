-- 0213_board_revision_sheets.sql
--
-- Log a /board chapter's quick-revision sheet download (2026-11-03).
--
-- WHY. Each MH HSC 12 (then CBSE 12) /board chapter gains a Revision tab: the
-- chapter's must-know points, formulas, derivations, diagrams, the board's
-- most-asked questions and the mistakes that cost marks. The page is free to
-- read; its PDF comes with the Premium Pass, with NO free first copy (owner),
-- unlike the formula sheet (0150). The log answers which chapters' sheets are
-- downloaded, so a row names the sheet.
--
-- SHAPE. kind 'revision', mode 'revision', and a new `revision_sheet` column
-- holding "<examSlug>/<subjectRoute>/<chapterSlug>" (the sheet's registry key;
-- editorial content, so naming it is safe), allowed on a revision row only.
-- No free-sheet table: there is no free copy to claim.
--
-- SAFE. Widens two CHECKs and adds a nullable column. Existing rows satisfy
-- every new constraint (none has a revision_sheet). Apply BEFORE the code
-- ships: the route's log write would otherwise fail its CHECK (the write is
-- best-effort, so the download would still serve, but the row would be lost).

ALTER TABLE public.export_events
  DROP CONSTRAINT export_events_kind_ck,
  ADD CONSTRAINT export_events_kind_ck
    CHECK (kind IN ('paper', 'key', 'tags', 'ppt', 'formula', 'revision'));

ALTER TABLE public.export_events
  DROP CONSTRAINT export_events_mode_check,
  ADD CONSTRAINT export_events_mode_check
    CHECK (mode IN ('cart', 'filters', 'mock', 'homework', 'board_paper', 'formula', 'top_pyqs', 'revision'));

ALTER TABLE public.export_events
  ADD COLUMN revision_sheet text
    CHECK (revision_sheet IS NULL OR char_length(revision_sheet) <= 250),
  ADD CONSTRAINT export_events_revision_sheet_only_for_revision
    CHECK (revision_sheet IS NULL OR mode = 'revision');

COMMENT ON COLUMN public.export_events.revision_sheet IS
  'The /board revision sheet downloaded, as "<examSlug>/<subjectRoute>/<chapterSlug>", on a mode=''revision'' row only (migration 0213).';
