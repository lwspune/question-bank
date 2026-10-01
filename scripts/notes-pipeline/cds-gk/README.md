# CDS General Knowledge notes pipeline

Tools for writing `/notes` for a CDS General Knowledge subject (first used for CDS Chemistry,
2026-10-01). The method is NOTES_WORKFLOW.md; this file is the per-chapter checklist and what
each tool does. Run from the repo root. Working files (`_cdsk_<code>.*`, `_reg-*.json`,
`_tag-*.json`) go in `generated-papers/`, which is gitignored.

**Source of record.** A GK row's taxonomy lives in `scripts/cds-gs/data/<paper>.questions.json`
and `scripts/cds-gs/catalog.json`; its solution reasoning in `data/<paper>.answers.json`. Every
tool below writes those AND the bank, so a rebuild cannot undo a change.

## Per chapter, in order

1. `npx tsx scripts/notes-pipeline/cds-gk/dump.ts <Subject> "<Chapter>" <code>` and read every
   row with its solution. Re-derive each key; list defective rows (never featured).
2. Write the vocabulary order and the teaching pages (NOTES_WORKFLOW step 0). Write a re-cut plan
   in `scripts/cds-gs/reshape/<chapter>.ts`; dry-run `scripts/cds-gs/reshape.ts`, then `--apply`.
   A row that belongs to ANOTHER chapter goes through `scripts/cds-gs/refile.ts <paper> --map=<file>`.
3. Solution repairs: `scripts/cds-gs/fix-solutions.ts <spec.json>` (dry run, then `--apply`).
4. Re-dump, author `src/app/notes/<route>/<chapter>/_data/` (pages + `chapter.ts`): plain-text
   fields without LaTeX, intro opens on a bank fact, ≥12 traps per chapter, every table cell filled.
   **Count every number from the dump with a one-line script before writing it** ("three of them
   from 2025 (I)", "asked twice"). The intro-count gate checks only "N questions" claims, never a
   year or a repeat count, and two such hand counts were wrong in the first seven chapters.
   **No practice rep or self-check may restate its concept's featured PYQ** (NOTES_ARC_LEDGER
   class 1): practice renders before the featured question, so "Which allotrope conducts?" above
   a featured "Which allotropes conduct?" turns the transfer test into a re-read. notes:lint only
   catches number overlap, so read each concept's reps against its featured row by eye.
5. `python scripts/notes-pipeline/cds-gk/register.py <spec.json>` (index.ts, route pages, subject
   landing, registry entry). Then `npx tsx scripts/notes-pipeline/jee/tag-chapter.ts <tag.json>`
   (100% of rows) and `npm run notes:order`.
6. `sh scripts/notes-pipeline/cds-gk/probe.sh <route> <chapter>` — all of step 4 of the workflow.
   Fix every finding, then read the chapter against NOTES_ARC_LEDGER.md's eight classes.
7. Commit. At the end of a batch: one full `npm run gate` on the tip, `npm run seo:dates`,
   `npm run stats`, ARCHITECTURE.md lines, a CLAUDE.md digest + DECISIONS_HISTORY.md long form,
   then merge the stacked branches in order.

| Tool | What it does | Writes? |
|---|---|---|
| `dump.ts` | A chapter's PUBLIC rows → `_cdsk_<code>.json` (tagger shape) + `.md` (readable) | No |
| `../../cds-gs/reshape.ts` | Re-cut one chapter's subtopics: bank, catalog.json, questions.json | With `--apply` |
| `../../cds-gs/refile.ts` | Move rows to another chapter; `--map` reads a one-off map | With `--apply` |
| `../../cds-gs/fix-solutions.ts` | Rewrite a solution's reasoning, keeping its provenance bracket | With `--apply` |
| `register.py` | Register a chapter (index.ts, routes, landing, registry) | Files only |
| `probe.sh` | Every step-4 probe for one chapter | No |
