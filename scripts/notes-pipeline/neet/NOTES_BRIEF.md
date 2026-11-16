# NEET /notes: the chapter agent's brief

One agent prepares and drafts the notes for ONE NEET chapter. **It reads and drafts; the main
session decides and writes.** Adapted from `scripts/notes-pipeline/cds-gk/NOTES_BRIEF.md`
(2026-11-15, NEET Botany first). The method is NOTES_WORKFLOW.md (sections 0, 1, 1b) and the eight
defect classes of NOTES_ARC_LEDGER.md.

**The format model** is NEET Botany Cell: The Unit of Life (shipped 2026-11-15, at NEET depth):
`src/app/notes/neet-botany/cell-unit-of-life/_data/*` (page files + `chapter.ts`; `index.ts` is
written by the main session), and the tag-map shape in `generated-papers/_tag-cdsch-at.json`.
Read them before writing anything. CDS Biology Cell Biology (`src/app/notes/cds-biology/cell-biology/`)
is the older, shallower model; do not copy its depth. **NEET is deeper than CDS:** NEET asks NCERT Class XI/XII facts
line by line, often as "select the correct statements A-D" or match-the-columns. Teach at NCERT
depth: the tables must hold the exact NCERT facts the questions turn on (names, numbers, sequences,
examples, exceptions), not a general-knowledge summary.

Your task message gives: the subject, the exact DB chapter name, your `<code>`, the route
(`neet-botany` or `neet-zoology`), the chapter slug, the subtopic prefix `<prefix>` (pages are
`<prefix>-<word>`), the concept prefix `<cprefix>` (concepts are `<cprefix>-<word>`) and `<CONST>`.

Your chapter's dump is `generated-papers/_cdsk_<code>.md` (one block per row: id prefix,
`PRACTICE |` for a practice row, sitting, Q#, difficulty, current subtopic, stem, options with the
key starred, solution) and `_cdsk_<code>.json` (full ids, `kind`).

**Keep tool output small.** Read files in chunks of about 150 lines. Never `cat` a whole dump.
Name any scratch file with your code (`generated-papers/_scratch-<code>-*.txt`): other agents are
writing in the same folder.

## Hard limits

- Write ONLY: `src/app/notes/<route>/<slug>/_data/<page>.ts` and `chapter.ts` (no `index.ts`, no
  route pages: the main session's register step writes those), `generated-papers/_plan-<code>.json`,
  `generated-papers/_tag-<prefix>.json`, `generated-papers/_prep-<code>.md`, and your own scratch files.
- Never: `--apply`, any DB write, `tag-chapter.ts`, git, `src/lib/notes/chapters.ts`,
  `scripts/neet/data/*`, `scripts/pariksha/data/*`, any other folder.
- Read-only commands are fine: the dry run `npx tsx scripts/neet/retax.ts generated-papers/_plan-<code>.json`
  (no `--apply`: it only reads), and once at the end `npx tsc --noEmit -p .` (only errors in YOUR
  files matter; other agents are writing in parallel).

## Two kinds of row

- **Past-year (pyq) rows** are the notes' evidence. Their keys are NTA's, and the solutions were
  transcribed from the coaching booklet's worked answers. The risk is a transcription slip (options
  read in the wrong order, a word dropped from a statement), not a derivation error. So **solve every
  pyq row yourself before you look at the starred option**, from NCERT. List every row where your
  answer differs, with reasoning and how sure you are (HIGH / MED / LOW), and say whether the starred
  option's TEXT could be a mis-slot. List rows flawed as printed and solutions that are wrong or do
  not explain the key (with a corrected explanation in the report). A key change is never yours to
  make: report it.
- **Practice rows** (`PRACTICE |` in the dump, coaching tests) are never tagged or featured. They
  share the chapter's subtopics, so you still place every one of them on a page (a quick read of
  the stem is enough). Report a practice row only if its key is plainly wrong.
- **Never feature** these rows (NTA dropped or made a bonus; their stored key is a placeholder):
  `3fb985a4`, `99dc8e34`, `7b653f8a`. Tag them like any other row.

The 2024 syllabus: NMC dropped some topics in 2024. When a topic's questions all predate 2024, say
how recent they are, counted from the dump ("none since 2022"), not as a syllabus claim.

## Per chapter, in order

1. **Read every row and its solution** (see above).
2. **Re-cut into teaching pages** (NOTES_WORKFLOW step 0). The ingest gave nearly every row its own
   subtopic. Cut the chapter into pages a student learns in NCERT order, foundations first: about
   3-8 pages of roughly 8-25 pyq rows (a small chapter may be one or two pages). Page names are
   short, plain Title Case nouns. Write `generated-papers/_plan-<code>.json`:
   ```json
   { "dump": "_cdsk_<code>.json", "subject": "Botany", "chapter": "<exact DB name>",
     "pages": { "Page Name": "8hex 8hex ...", "...": "..." },
     "refile": { "8hex": { "subject": "Botany", "chapter": "<another chapter>", "subtopic": "<page name there>", "why": "..." } } }
   ```
   EVERY row of the dump (pyq and practice) goes on exactly one page or in `refile`. `refile` is for
   a row that belongs to a different NCERT chapter; its chapter must be in `NEET_CHAPTERS` in
   `scripts/neet/config.ts`. Run the dry run until it ends "dry run: nothing written".
3. **Write the pages** (one file per page plus `chapter.ts`), copying the model's shape:
   - Exports `<CONST>_<PAGE>_NOTE` and `<CONST>_CHAPTER`.
   - `chapterName` is the exact DB chapter name; each `subtopicName` is the plan's exact page name.
     `title` is "<short chapter name>: NEET <Subject>".
   - 2-4 concepts a page. Most concepts are `kind: "reference"` with a `table`; `kind: "formula"`
     (needs `authoredExample`) only for a real calculation (e.g. Mendelian ratios, population growth,
     RQ, ATP counts).
   - Every concept features one of its own tagged pyq rows (`pyqExampleId`, the FULL uuid from the
     `.json` dump), never a disputed, flawed or never-feature row. A table row may also carry
     `pyqExampleId` and a `noteAmber` naming the sitting that asked it ("NEET 2025: ...").
   - **Four rungs, four different problems:** self-check, practice reps and the featured question
     must differ. **No practice rep or self-check may restate its concept's featured PYQ.** Read each
     concept's reps against its featured row before you finish.
   - Practice reps and self-checks are SELF-CONTAINED (no "the above", no "it"): each is lifted into a
     shuffled quiz alone. No rep may test a fact the page has not taught.
   - At least 12 traps per chapter (a chapter under ~25 pyq rows: as many as it honestly has, at
     least one per concept), each stating the mistake and the right fact without pointing at another item.
   - **Only facts you are sure NCERT states.** A list member added from memory (Living World put Salim
     Ali among NCERT's unit-opening biologists; he is not one) is worse than a shorter list. When
     unsure, leave the row out and name it in the report.
   - Every year, count and repeat you write ("asked three times", "two of them from 2024") is COUNTED
     from the dump with a one-line script, never estimated.
4. **The intro** (`chapter.ts`): the first sentence states a bank fact ("Cell Cycle and Cell
   Division has 38 past-year questions in NEET Botany, from 2021 to 2026, ..."), counting only the
   pyq rows your plan keeps in the chapter; do not list the pages (the cards below do); over 260
   characters, under 200 words. Add a `cardBlurb` (one sentence naming what the pages cover). The 8
   papers are NEET 2021-2026 plus Re-NEET 2024 and Re-NEET 2026.
5. **The tag map** `generated-papers/_tag-<prefix>.json`, the model map's shape,
   `"dump": "_cdsk_<code>.json"`, `"expect"` = the number of pyq rows tagged: **every pyq row the plan
   keeps in the chapter exactly once, no practice row, no refiled row**, under a concept of the page
   its plan puts it on.
6. **The report** `generated-papers/_prep-<code>.md`, under 100 lines: disputed keys (derivation +
   confidence + mis-slot?), flawed rows, solution problems, refiles, the page cut with pyq/practice
   counts, the featured row per concept, anything you are unsure of.

## Text rules (gates fail on these)

- Plain-text fields take NO LaTeX and no `**`: `title`, `oneLineDefinition`, `whyItMatters`,
  `concept.name`, `formula.label`, table `columns`. Use words or Unicode there.
- Maths elsewhere is `\\(...\\)` inside TS strings (double backslashes). Never `\\iff`. Chemical
  formulae in body text: `\\(\\text{CO}_2\\)` or plain "CO₂".
- A `formula.symbols` legend entry is either plain words or wrapped maths (`\\(m\\)`); a bare
  `\\text{...}` there fails notes:latex.
- **No em dashes, en dashes, " - " or " -- " used as dashes anywhere you write.** Use a full stop,
  colon, comma or brackets. (A range like "2021 to 2026" is fine.)
- No apostrophes, quotes or `>` inside JSX if you ever write any (you should not need to).
- Simple English: short sentences, everyday words, the way a good teacher talks to a Class 11 student.
  Scientific names in italics with `*Genus species*` in body fields.
- Fill every table cell with a real value; drop a row rather than leave a blank or a dash.
- `definition` may use `- ` bullets and `**bold**`.

Final message (short): the files written, pages and concepts, disputed keys with one line each,
flawed rows, refile candidates, and uncertainties.
