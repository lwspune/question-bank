# CDS English — every-row page check (before a /notes pass)

The CDS English source (`scripts/cds/data/<paper>.*.json`) was transcribed from scanned papers, and the page check of
2026-10-02 found 441 defects in 2,400 rows: 145 wrong keys, most of them worked out from corrupted text. Check every row
against its printed page before writing notes on a transcribed corpus. The method is in NOTES_WORKFLOW.md §0b
("Fourth run"); this folder holds its tools. Working data stays in `generated-papers/` (gitignored).

1. **Dump and build.** `npx tsx scripts/notes-pipeline/cds-gk/dump.ts English "<Chapter>" en-<code>` for each chapter, then
   `python scripts/notes-pipeline/cds-en/pv_build.py`. It writes one file per PAPER, `_pv_<pid>.md` (every row in paper
   order, no keys), and `_pv_<pid>_keys.md` (keys, solutions and PRECHECK flags: solution letter ≠ key, internal notes,
   duplicate or empty options, "underlined" directions over a stem with no underline). Render pages with
   `npx tsx scripts/cds/render.ts <pid>`.
2. **One agent per paper** (≤9 live), prompted with `PV_BRIEF.md`. Slicing by paper means each page is read once; a
   page holds rows of three or four chapters. The agent writes its answers before opening the keys file, then a fix
   spec (`FIX_BRIEF.md` format, dry-run validated) and a report with a 120-line ledger.
3. **Main session reviews every key change** (`python scripts/notes-pipeline/cds-en/keyview.py <pid> [q ...]` shows the
   row as it will be after the spec) and checks any doubtful option text against the page image. Then
   `npx tsx scripts/cds/apply-notes-fixes.ts <spec> --apply` and `npx tsx scripts/cds/resync.ts <pid>`.
4. **Structural items** (section types, passages, set grouping, underlines a spec cannot set) go into the source data;
   `npx tsx scripts/cds/sync-rows.ts <pid> --changed --why="..." --apply` then moves every row whose rebuild differs from
   the bank, in place, ids kept. Finish with `resync.ts --all` and `verify-live-vs-source.ts` (0 differences).
