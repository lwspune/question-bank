# SPI /notes: the draft agent's brief

One agent drafts the notes for one or a few SPI chapters. **It reads and drafts; the main session
decides and writes.** The method is NOTES_WORKFLOW.md (sections 0, 1, 1b) and the eight defect
classes of NOTES_ARC_LEDGER.md. This file is the contract. The finished model is SPI Probability:
`src/app/notes/spi-maths/probability/_data/*`, its plan `scripts/spi/reshape/probability.ts`, and its tag
map `generated-papers/_tag-spi-pr.json`. Read all three before writing anything.

Work in `C:\Users\vilas\Downloads\qb-spi-notes` (a git worktree). Every chapter's row is in
`scripts/spi/notes-manifest.json` (subject, DB chapter name, URL slug, `abbr`). Its dump is
`generated-papers/_cdsk_spi<abbr>.md` (readable: id prefix, source, Q#, difficulty, current subtopic,
stem, options with the key starred, solution) and `.json` (full ids).

**Keep tool output small.** Read files in chunks of about 150 lines. Never `cat` a whole dump.

## Hard limits

- Write ONLY: `scripts/spi/reshape/<slug>.ts`, `src/app/notes/<route>/<slug>/_data/<page>.ts` and
  `chapter.ts` (no `index.ts`, no route pages: the main session's register step writes those),
  `generated-papers/_tag-spi-<abbr>.json`, `generated-papers/_prep-spi-<abbr>.md`.
- Never: `--apply`, any DB write, `tag-chapter.ts`, git, `src/lib/notes/chapters.ts`, any other folder.
- Read-only commands are fine: the dry run `npx tsx scripts/spi/reshape.ts scripts/spi/reshape/<slug>.ts`
  and, once at the end, `npx tsc --noEmit -p .` (only errors in YOUR files matter; other agents are
  writing in parallel).

## Per chapter, in order

1. **Read every row and its solution.** Solve every key yourself, as printed. List in the report any
   row whose key you dispute (with the full derivation), any row flawed as printed (ambiguous wording,
   two right options, `notice:` in the solution), and any solution with a real error. A flawed or
   disputed row is never featured.
2. **Re-cut into teaching pages** (NOTES_WORKFLOW step 0). The ingest filed rows under many one-off
   subtopics; cut them by TECHNIQUE into about 2-6 pages of roughly 5-25 rows, in teaching order
   (foundations first; a page may only use what earlier pages taught). A tiny chapter can be one page.
   Subtopic names are short, plain Title Case nouns ("Coins and a Single Die"). Write the plan file in
   the Probability plan's shape, every row by its 8-character id prefix, `expected` and `total` filled in,
   then run the dry run until it ends `DRY RUN COMPLETE`. A refusal naming `<paper> Q<n>: no target`
   is a repeat block with no bank row: read that block in `scripts/spi/transcripts/<paper>.txt` and add it
   to `extra`.
3. **Write the pages** (one file per page plus `chapter.ts`), copying the Probability files' shape:
   - Subtopic slugs `spi-<abbr>-<word>`, concept slugs `spi<abbr><2 letters>-<word>` (Probability:
     `spi-pr-coins-die`, `spiprcd-classical`). Export names `SPI_<ABBR>_<PAGE>_NOTE` and
     `SPI_<CHAPTER>_CHAPTER`.
   - `chapterName` is the exact DB chapter name; each `subtopicName` is the plan's exact target name.
   - 2-4 concepts a page. `kind: "formula"` (needs `authoredExample`) for a technique, `kind: "reference"`
     (needs a `table`) for named facts: recall subjects (GK, History, Polity, Biology, Geography, much of
     English) are mostly reference concepts. A formula-variant foundation concept may have no featured
     question and no tagged rows; every other concept needs both.
   - Every concept that has tagged rows features one of them (`pyqExampleId`, the FULL uuid from the
     `.json` dump), from its own page, never a flawed or disputed row. Prefer a 2022 past-paper row
     (the dump's source says `SPI Entrance Examination 2022`) when one fits.
   - **Four rungs, four different problems:** worked example, self-check, practice reps and the featured
     question must all differ, and none may reuse the featured question's numbers or wording. Author
     the worked example first, from scratch.
   - Practice reps and self-checks are SELF-CONTAINED (no "the above", no "it"): each is lifted into a
     shuffled quiz alone. No practice rep may test a fact the page has not taught.
   - At least 12 traps per chapter (a short chapter: as many as it honestly has, at least one a concept),
     each stating the mistake and the right fact without pointing at another item.
   - Every number you write is re-derived. Every count you state (in `whyItMatters`, the intro) is
     counted from the plan, not estimated.
4. **The intro** (`chapter.ts`): the first sentence states a bank fact ("Statistics has 48 questions in
   the SPI bank, ..."); do not list the pages (the cards below it do); over 260 characters, under 200
   words. SPI's notes count practice and past-paper questions together, so "N questions" means all of
   them. Only the 2022 paper is a past paper; everything else is a sample paper or an LWS mock: never
   call a practice question a PYQ or "asked in SPI".
5. **The tag map** `generated-papers/_tag-spi-<abbr>.json`, the Probability map's shape with
   `"exam": "SPI"`, `"dump": "_cdsk_spi<abbr>.json"`, every PUBLIC row of the chapter exactly once, under
   a concept of the page its plan puts it on.
6. **The report** `generated-papers/_prep-spi-<abbr>.md`: disputed keys and flawed rows (with
   derivations), solution errors, the page cut with counts, the featured row per concept, anything you
   are unsure of. Under 80 lines.

## Text rules (gates fail on these)

- Plain-text fields take NO LaTeX and no `**`: `title`, `oneLineDefinition`, `whyItMatters`,
  `concept.name`, `formula.label`, table `columns`. Use words or Unicode there.
- Maths elsewhere is `\\(...\\)` inside TS strings (double backslashes). Never `\\iff`.
- **No em dashes, en dashes, " - " or " -- " used as dashes anywhere in the text.** Use a full stop, colon,
  comma or brackets. (A table cell or range like "6 to 15" is fine.)
- Simple English: short sentences, everyday words, the way a good teacher talks to a Class 10 student.
- Fill every reference-table cell with a real value; drop a row rather than dash it.
- `definition` may use `- ` bullets and `**bold**`; `formula.latex` holds every recallable formula the
  concept teaches; a pure method stays out of `formula.latex`.

Final message: the files written, pages and concepts per chapter, disputed keys, and uncertainties.
