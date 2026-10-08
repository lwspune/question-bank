-- 0139_free_download_paper_key.sql
--
-- The free download becomes ONE PAPER, not one file (2026-10-07): the
-- Question Paper AND its Answer Key for the same questions.
--
-- WHY. 0131 gave one free FILE. Between 2026-10-04 and 10-07, 7 of the 8
-- students who used it took the Question Paper, then met the pass offer the
-- same minute they asked for its Answer Key. None opened checkout. The free
-- sample ended on its most frustrating page: questions with no answers.
--
-- HOW. `set_key` records WHICH paper the free download was for, named by what
-- the request names (lib/export/freePaper.ts `paperKey`): "mock:<slug>" for a
-- past paper, "ids:<hash>" for a selection, "filters:<hash>" for a filtered
-- paper. A request for the same key is free again (its other file, or a
-- re-download); any other paper meets the pass. The once-per-account rule is
-- unchanged: `user_id` stays the primary key.
--
-- EXISTING ROWS keep NULL, and a NULL key matches nothing, so the accounts
-- that used the old one-file download keep the rule they had (owner's call:
-- no second free paper for them).
--
-- Additive and nullable: the code before this migration never reads the
-- column, so applying it before or after the deploy is safe. The code after
-- it does read it, so apply it FIRST.

ALTER TABLE public.free_downloads
  ADD COLUMN set_key text CHECK (set_key IS NULL OR length(set_key) <= 200);

COMMENT ON COLUMN public.free_downloads.set_key IS
  'Which paper the free download was for (lib/export/freePaper.ts paperKey). NULL = the pre-2026-10-07 one-file download.';
