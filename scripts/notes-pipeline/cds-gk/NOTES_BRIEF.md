# CDS General Knowledge /notes: the chapter agent's brief

One agent prepares and drafts the notes for ONE CDS General Knowledge chapter. **It reads and
drafts; the main session decides and writes.** The method is NOTES_WORKFLOW.md (sections 0, 1, 1b),
the per-chapter checklist in this folder's README.md, and the eight defect classes of
NOTES_ARC_LEDGER.md. This file is the contract (first used 2026-10-22 for the History, Geography,
Polity, Physics, Economics and Biology notes; adapted from `scripts/spi/NOTES_BRIEF.md`).

**The finished model** is CDS Chemistry Atomic Structure: `src/app/notes/cds-chemistry/atomic-structure/_data/*`,
its plan `scripts/cds-gs/reshape/atomic-structure.ts`, its tag map `generated-papers/_tag-cdsch-at.json`.
Read all three before writing anything. The finished SPI History chapters
(`src/app/notes/spi-history/*/_data/`) show history tables in time order.

Your chapter's dump is `generated-papers/_cdsk_<code>.md` (readable: id prefix, sitting, Q#,
difficulty, current subtopic, stem, options with the key starred, solution) and `.json` (full ids).

**Keep tool output small.** Read files in chunks of about 150 lines. Never `cat` a whole dump.
Name any scratch file with your code (`generated-papers/_scratch-<code>-*.txt`): other agents are
writing in the same folder.

## Hard limits

- Write ONLY: `scripts/cds-gs/reshape/<slug>.ts`, `src/app/notes/<route>/<slug>/_data/<page>.ts` and
  `chapter.ts` (no `index.ts`, no route pages: the main session's register step writes those),
  `generated-papers/_tag-<prefix>.json`, `generated-papers/_fixsol-<code>.json`,
  `generated-papers/_prep-<code>.md`, and your own scratch files.
- Never: `--apply`, any DB write, `tag-chapter.ts`, `fix-solutions.ts --apply`, git,
  `src/lib/notes/chapters.ts`, `scripts/cds-gs/data/*` or `catalog.json`, any other folder.
- Read-only commands are fine: the dry runs `npx tsx scripts/cds-gs/reshape.ts scripts/cds-gs/reshape/<slug>.ts`
  and `npx tsx scripts/cds-gs/fix-solutions.ts generated-papers/_fixsol-<code>.json`, and once at the
  end `npx tsc --noEmit -p .` (only errors in YOUR files matter; other agents are writing in parallel).

## The keys are derived, so check every one

UPSC published no GK key before 2026 (II). Every answer in this bank came from two blind
derivations, and when one paper could finally be scored against UPSC's key, a single pass got
**109 of 119** right. Agreement between the two passes does not make a key right. So:

1. **Solve every row yourself before you look at the starred option**, from what the NCERT
   (Class 6-12) and standard books say. Two misses on the scored paper turned on the textbook's own
   wording rather than the fact, so prefer the NCERT phrasing when the options are close.
2. List every row whose key you dispute, with the reasoning and how sure you are (HIGH / MED / LOW).
   Say whether the starred option's TEXT could be a mis-slot (the right text under the wrong letter):
   the main session checks those against the booklet page.
3. List every row flawed as printed: two defensible options, none right, a statement code whose
   "only" makes every option wrong, a stem that depends on a date the paper never gives.
4. List every solution with a real error or one that does not explain why the key is right, and
   write its replacement into `_fixsol-<code>.json`:
   `[{"paper": "2019-1", "number": 7, "reasoning": "...", "why": "..."}]`. The paper id is the
   sitting's year and session: "CDS (I) 2019" is `2019-1`, "CDS (II) 2016" is `2016-2`. The reasoning
   is plain prose, no square brackets (the tool keeps the provenance bracket itself). Dry-run it.
   **A key change is never written here**: it goes in the report only.

A disputed or flawed row is never featured, and no note states a disputed fact either way until the
main session has decided.

## Per chapter, in order

1. **Read every row and its solution** (see above).
2. **Re-cut into teaching pages** (NOTES_WORKFLOW step 0). The ingest filed rows under catalogue
   subtopics; cut them into pages a student learns in order: for History by period and then theme,
   for the others by idea, foundations first. About 3-10 pages of roughly 8-25 rows; a small chapter
   may be one or two. Subtopic names are short, plain Title Case nouns. Write the plan in the Atomic
   Structure plan's shape (`subject`, `chapter` = the exact DB names; `whole` maps a current subtopic
   to a page; `byPrefix` places single rows by their 8-character id prefix), with `expected` and
   `total` filled in, and run the dry run until it ends cleanly. **A row that belongs to a different
   CHAPTER** (filed in the wrong one) is not moved by the plan: keep it on the nearest page and list
   it in the report under "refile".
3. **Write the pages** (one file per page plus `chapter.ts`), copying the model's shape:
   - Slugs and names come from your task message (subtopic `<prefix>-<word>`, concept
     `<cprefix>-<word>`, exports `<CONST>_<PAGE>_NOTE` and `<CONST>_CHAPTER`).
   - `chapterName` is the exact DB chapter name; each `subtopicName` is the plan's exact target name.
     `title` is "<short chapter name>: CDS <Subject>".
   - 2-4 concepts a page. These are recall subjects, so most concepts are `kind: "reference"` with a
     `table` (named facts, in time order for history); `kind: "formula"` (needs `authoredExample`) only
     for a real technique or law (Physics, Economics measures).
   - Every concept features one of its own tagged rows (`pyqExampleId`, the FULL uuid from the
     `.json` dump), never a disputed or flawed row. A table row may also carry `pyqExampleId` and a
     `noteAmber` naming the sitting that asked it ("CDS 2025 (I): ...").
   - **Four rungs, four different problems:** self-check, practice reps and the featured question
     must differ. **No practice rep or self-check may restate its concept's featured PYQ** (practice
     renders before the featured question, so a near-copy turns the test into a re-read). Read each
     concept's reps against its featured row before you finish.
   - Practice reps and self-checks are SELF-CONTAINED (no "the above", no "it"): each is lifted into a
     shuffled quiz alone. No rep may test a fact the page has not taught.
   - At least 12 traps per chapter (a chapter under ~25 rows: as many as it honestly has, at least
     one per concept), each stating the mistake and the right fact without pointing at another item.
   - Every year, count and repeat you write ("asked three times", "two of them from 2024") is COUNTED
     from the dump with a one-line script, never estimated. Two hand counts were wrong in Chemistry.
4. **The intro** (`chapter.ts`): the first sentence states a bank fact ("Ancient India has 120
   past-year questions in CDS General Knowledge, from 2016 (II) to 2026 (II), ..."); do not list the
   pages (the cards below do); over 260 characters, under 200 words. Add a `cardBlurb` (one sentence
   naming what the pages cover). Never write "120 questions" for a paper size: it reads as a count.
5. **The tag map** `generated-papers/_tag-<prefix>.json`, the model map's shape, `"dump": "_cdsk_<code>.json"`,
   every PUBLIC row of the chapter exactly once, under a concept of the page its plan puts it on.
6. **The report** `generated-papers/_prep-<code>.md`, under 100 lines: disputed keys (derivation +
   confidence + mis-slot?), flawed rows, solution fixes written, refile candidates, the page cut with
   counts, the featured row per concept, anything you are unsure of.

## Text rules (gates fail on these)

- Plain-text fields take NO LaTeX and no `**`: `title`, `oneLineDefinition`, `whyItMatters`,
  `concept.name`, `formula.label`, table `columns`. Use words or Unicode there.
- Maths elsewhere is `\\(...\\)` inside TS strings (double backslashes). Never `\\iff`.
- **No em dashes, en dashes, " - " or " -- " used as dashes anywhere you write.** Use a full stop,
  colon, comma or brackets. (A range like "1757 to 1764" is fine; DB chapter names that contain a
  dash are copied as they are.)
- Simple English: short sentences, everyday words, the way a good teacher talks to a Class 10 student.
- Fill every table cell with a real value; drop a row rather than leave a blank or a dash.
- `definition` may use `- ` bullets and `**bold**`.

Final message (short): the files written, pages and concepts, disputed keys with one line each,
flawed rows, refile candidates, and uncertainties.
