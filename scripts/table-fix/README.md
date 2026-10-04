# scripts/table-fix: rebuild tables stored as dashed grids

`npm run audit:text` class **DASHED_TABLE** finds a table that pandoc wrote as a
"simple" or "multiline" table, a dashed ASCII grid, instead of a GFM
pipe-table. Nothing in this bank parses one, so the reader sees a wall of
dashes with every math cell on its own line. The first batch (2026-10-04,
29 questions across MHT-CET 2025, JEE 2021-23 and four NDA mocks) was reported
by a student from a /notes worked example.

## The stored text cannot be repaired by itself

The ingest collapsed whitespace, so the column boundaries are gone: `2 k k 2 k 4 k k`
is five cells or eight. Rebuild every table from the source paper:
`pandoc "<paper>.docx" -t gfm --wrap=none` prints it as a real table (cells
with display math come out as ```` ``` math ```` blocks). Source folders are
in each pipeline's `config.ts` and in CLAUDE.md.

## One batch

1. Run `npm run audit:text` and note the DASHED_TABLE rows.
2. Write each replacement into `manifest.json` (or generate it, as the first
   batch did with a script in `generated-papers/table-repair/`). One entry per
   field: `field` is `text`, `context`, `solution` or `option:<label>`; `to`
   is the new table. `from` is optional and defaults to the table itself
   (first to last run of 8+ dashes); give it when the table is not bounded by
   dash runs, or when text next to it must go too.
   - Use `\(...\)` in cells, never `\[...\]`: a display-math cell forces the
     whole column into display style.
   - A GFM table needs a header row. When the source has none, add the
     shortest honest header and say so in `note`.
   - An option cannot hold a GFM table (options render through
     `KatexRenderer`). Use a two-row KaTeX `array` with `\hline`; Word export
     turns it into a matrix.
3. Dry run: `npx tsx scripts/table-fix/apply.ts`. It prints one line per
   question and writes a before/after page to
   `generated-papers/table-fix/<batch>.html`. Read every pair.
4. NDA mock rows are refused until `scripts/nda-mock/config.ts` carries the
   same text as an errata entry (`stem`, `context` or `options`). Copy the
   full new value from `generated-papers/table-fix/<batch>.values.json`: an
   errata entry replaces the WHOLE field, not just the table.
5. Apply: `npx tsx scripts/table-fix/apply.ts --apply`. The rows' prior state is
   saved once to `backup/<batch>.before.json`. Re-running is safe: a fixed
   field is skipped.
6. Re-run `npm run audit:text` and confirm DASHED_TABLE is 0.

## Who owns the hash

- **MHT-CET**: hashes the source text at ingest and never rehashes. The
  database edit is the only change; the manifest is its record.
- **JEE stems**: the tool writes `scripts/jee/papers/<id>.json`
  `stemOverrides` and recomputes `content_hash` as `resync.ts` does. JEE
  solutions are not hashed and not re-applied, so they are database only.
- **NDA mocks**: stem or option edits recompute `content_hash` as `resync.ts`
  does; the errata entry (step 4) is what keeps a later resync from undoing
  the fix. Do not run `resync.ts` to apply a batch: Mock 1 and Mock 3 already
  hold hand fixes that their extraction lacks, and a resync would revert them.
