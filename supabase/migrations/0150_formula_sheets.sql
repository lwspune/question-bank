-- 0150_formula_sheets.sql — the chapter formula sheet download (2026-10-10)
--
-- WHAT: a /notes chapter's formula sheet (every formula box, reference table
-- and trap, from the same derivation the on-screen revision sheet reads) can
-- be downloaded as a branded PDF. The pass rule of the paper and key applies,
-- plus ONE free sheet per account, apart from the one free paper (the owner's
-- call: students asked for formulas to download more than for anything else).
--
-- TWO THINGS LAND HERE:
--
-- 1. free_formula_sheets — the one free sheet. Mirrors free_downloads
--    (0131/0139): user_id is the primary key, so once-only is a property of
--    the table, not of a route; `sheet` records WHICH chapter so the same sheet
--    again (a re-download) stays free while a different chapter meets the pass
--    offer. Its own table rather than a column on free_downloads because the
--    two free files are independent: taking the free paper must not spend the
--    free sheet, and a row per file keeps each claim an INSERT that either wins
--    or loses, the race-safe shape the paper uses.
--
-- 2. export_events gains mode 'formula' + kind 'formula' + `formula_sheet`
--    ("<subjectRoute>/<chapterSlug>"), as 0136/0143/0146 did for past papers,
--    homework days and board papers. A chapter is editorial content, so naming
--    it is safe, and it answers the question the feature exists to answer:
--    which sheets do people take, free and paid. The sheet is text, not a
--    foreign key: chapters live in the code registry, not in a table.
--
-- RLS: students read their own free-sheet row (the download box asks the
-- server, which reads with the user's JWT); nobody writes it through
-- PostgREST. export_events keeps its zero-policy posture (0104).

CREATE TABLE public.free_formula_sheets (
  user_id    uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  -- "formula:<subjectRoute>/<chapterSlug>" (lib/export/formulaSheet.ts formulaSheetKey).
  sheet      text NOT NULL CHECK (char_length(sheet) BETWEEN 9 AND 260),
  created_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.free_formula_sheets IS
  'The one free formula sheet per account (migration 0150), apart from the one free paper (free_downloads). The primary key is the once-only rule; `sheet` names the chapter so a re-download stays free. Written only by the download route (service role).';

ALTER TABLE public.free_formula_sheets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "free_formula_sheets_select_own"
  ON public.free_formula_sheets
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- ── Downloads ───────────────────────────────────────────────────────────────

ALTER TABLE public.export_events
  DROP CONSTRAINT export_events_kind_ck,
  ADD CONSTRAINT export_events_kind_ck CHECK (kind IN ('paper', 'key', 'tags', 'ppt', 'formula'));

ALTER TABLE public.export_events
  DROP CONSTRAINT export_events_mode_check,
  ADD CONSTRAINT export_events_mode_check
    CHECK (mode IN ('cart', 'filters', 'mock', 'homework', 'board_paper', 'formula'));

ALTER TABLE public.export_events
  ADD COLUMN formula_sheet text CHECK (formula_sheet IS NULL OR char_length(formula_sheet) <= 250),
  ADD CONSTRAINT export_events_formula_sheet_only_for_formula
    CHECK (formula_sheet IS NULL OR mode = 'formula');

CREATE INDEX export_events_formula_sheet_idx ON public.export_events (formula_sheet)
  WHERE formula_sheet IS NOT NULL;
