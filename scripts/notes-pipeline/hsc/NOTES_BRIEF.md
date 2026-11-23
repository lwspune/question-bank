# Board /notes (Maharashtra HSC Class 12): the chapter agent's brief

One agent drafts the notes for ONE HSC chapter. **It reads and drafts; the main session decides
and writes.** Written 2026-11-23 for the first board notes (owner chose full notes for boards, in
the same template as entrance notes). Adapted from `scripts/notes-pipeline/neet/NOTES_BRIEF_PC.md`.

**The format and depth model** is HSC Physics Current Electricity:
`src/app/notes/mh-hsc-12-physics/current-electricity/_data/*` (four page files + `chapter.ts`;
`index.ts` is written by the main session) and its tag map `generated-papers/_tag-hscp-ce.json`.
Read all of them before writing anything.

**The content source** is the MHT-CET notes chapter of the same name, named in your task message
(`src/app/notes/mht-cet-<subject>/<slug>/`). MHT-CET is set from the same Balbharati books, so use it
for ideas, definitions and worked examples. But every count, year, featured question and page comes
from YOUR HSC dump, the CET pages are older (they carry em dashes and terse prose, which you must
not copy), and CET is an MCQ exam while the board is mostly written answers. Re-check every fact you
carry over. Never reuse a CET slug.

Your task message gives: the subject, the exact DB chapter name, the route
(`mh-hsc-12-<subject>`), the chapter slug, the page prefix `<prefix>` (pages are `<prefix>-<word>`),
the concept prefix `<cprefix>` (concepts are `<cprefix>-<word>`) and `<CONST>`.

Your chapter's dump is `generated-papers/_cdsk_<prefix>.md` (one block per row: id prefix,
`PRACTICE |` for a TEXTBOOK row, sitting, Q#, difficulty, current subtopic, `IMG` when the row has a
figure, stem, options with the key starred when it is an MCQ, model answer) and
`_cdsk_<prefix>.json` (full ids, `kind`, `year`, `difficulty`, `subtopic`, `image`).
`kind: "pyq"` = a board past-paper question; `kind: "practice"` = a textbook exercise or solved
example. The `number` field says which (`Ex Q.13`, `Solved Ex.9.3`, `Q. 26`).

**Keep tool output small.** Read files in chunks of about 150 lines. Never `cat` a whole dump.
Name any scratch file with your prefix (`generated-papers/_scratch-<prefix>-*`): other agents are
writing in the same folder.

## Hard limits

- Write ONLY: `src/app/notes/<route>/<slug>/_data/<page>.ts` and `chapter.ts` (no `index.ts`, no
  route pages), `generated-papers/_tag-<prefix>.json`, `generated-papers/_prep-<prefix>.md`, and
  your own scratch files.
- Never: any DB write, `tag-chapter.ts`, git, `src/lib/notes/chapters.ts`, `src/lib/notes/bookOrder.ts`,
  any `scripts/*/data/*` file, any other folder.
- Read-only commands are fine. Once at the end, `npx tsc --noEmit -p .` (only errors in YOUR files
  matter; other agents are writing in parallel).
- **Write every `.ts` file with the Write tool (or Edit), never through a shell heredoc, `sed` or a
  Python string.** The shell eats backslashes, and a TS string with `\(` instead of `\\(` loses its maths.

## The pages are the existing subtopics

Do NOT re-cut. Each DB subtopic of the chapter is one page, with `subtopicName` = the subtopic's
exact name. The subtopics are the textbook's own sections and also live in the pipelines' source
files, so moving a row is the main session's call. Put the pages in the textbook's teaching order
(the section order of the Balbharati chapter; foundations first).

If a row plainly belongs to another page of this chapter or to another chapter, do NOT move it:
tag it where it is (under the concept nearest its skill) and list it in the report as a refile
candidate, with one line of why.

## Every row is checked, every row is tagged

- **Solve every numerical row yourself before reading its model answer**, board and textbook alike:
  do the arithmetic. For an MCQ, solve before looking at the starred option. List every row where
  your answer differs, with your working and confidence (HIGH / MED / LOW).
- **Read every written model answer** against what the textbook teaches. List any that is wrong,
  incomplete for its marks, or does not answer the question asked, with a corrected answer in the
  report. A `[Textbook misprint ...]` or `[Textbook answer-key error ...]` bracket at the start of a
  solution is deliberate; check that it is right, do not remove it.
- A key or model-answer change is never yours to make: report it.
- **Tag every row of the dump, board and textbook, exactly once**, under a concept of the page that
  is its current DB subtopic. `"expect"` in the tag map = the number of rows in the dump.

## Per chapter, in order

1. **Read every row and its model answer** (see above).
2. **Write the pages** (one file per page plus `chapter.ts`), copying the model's shape:
   - Exports `<CONST>_<PAGE>_NOTE` and `<CONST>_CHAPTER`. Page file names are the last word of the
     page slug (`hscp-ce-kirchhoff` → `kirchhoff.ts`).
   - `chapterName` is the exact DB chapter name; `title` is "<chapter name>: Maharashtra HSC <Subject>".
   - 2-4 concepts a page. Most Physics and physical Chemistry concepts are `kind: "formula"` with a
     `formula` and an `authoredExample`. Use `kind: "reference"` with a `table` for "distinguish
     between" answers, lists of uses, advantages, sources of error, properties and named facts.
   - **Write for the board exam.** Most board questions ask the student to state, define, derive,
     explain with a diagram, distinguish or calculate. So:
     - worked examples are laid out as a full board answer: Given, Formula, Substitution with units,
       Answer with unit;
     - a concept the board asks to DERIVE carries the derivation's outline in its `definition`,
       one step a line, in the textbook's labelling (check the model answers for it);
     - traps include where marks are lost: a missing unit, no diagram where one is asked, a
       definition without its condition, a "distinguish" point that covers one side only.
   - Every concept features one of its own tagged rows (`pyqExampleId`, the FULL uuid). Prefer a
     board (pyq) row; use a textbook row only when the concept has no board row. Prefer a row
     without a figure when one fits as well. Never feature a row you dispute. A reference table
     row may carry `pyqExampleId` and a `noteAmber` naming the year ("Board 2024 asked ...").
   - **Four rungs, four different problems:** the authored example, the self-check, the practice
     reps and the featured question must differ. **No practice rep or self-check may restate its
     concept's featured question** (same set-up with new numbers counts as restating; a featured
     "explain" question may sit beside numeric reps). No trap may quote the featured question's numbers.
   - Practice reps and self-checks are SELF-CONTAINED (no "the above", no "it") and test only what
     the page has taught.
   - **Check every number you write** by working it again (a one-line script is fine). A wrong
     worked answer is the worst defect a notes page can have.
   - At least 12 traps per chapter, each stating the mistake and the right fact.
   - **Only facts you are sure the Balbharati textbook states.** When unsure, leave it out and name
     it in the report.
3. **Counts.** Every year, count and repeat you write is COUNTED from the dump with a one-line
   script, never estimated. The intro and `whyItMatters` may state a number followed directly by
   "questions" ONLY for the chapter total (all rows) or one page's total; say board and textbook
   subsets in words or with the number not directly before "questions" ("Thirty-three were set in
   board papers", "eleven of them from board papers"). `whyItMatters` says how many questions the
   page has, how many came from board papers and what the board asked, with years.
4. **The intro** (`chapter.ts`): the first sentence states the bank fact (total questions, the
   textbook and the board's papers with the year range); then what the board asks in this chapter
   and how marks are won; do not list the pages (the cards below do); over 260 characters, under
   200 words. Add a `cardBlurb` (one sentence naming what the pages cover, 8-40 words).
5. **The tag map** `generated-papers/_tag-<prefix>.json`, the model map's shape:
   `"dump": "_cdsk_<prefix>.json"`, `"prefix"`, `"expect"` (all rows), `"exam": "Maharashtra HSC Class 12"`,
   `"subtopics"` (page slug → exact DB subtopic name), `"concepts"` ([page slug, concept slug,
   "8hex 8hex ..."]).
6. **The report** `generated-papers/_prep-<prefix>.md`, under 100 lines: rows where your answer
   differs from the key or model answer (working + confidence), wrong or thin model answers (with a
   correction), refile candidates, the page list with board/textbook counts, the featured row per
   concept, anything you are unsure of.

## Typecheck and the textbook PDF (learned on Physics, 2026-11-23)

- Do NOT run the full `npx tsc --noEmit -p .`: several agents at once run out of memory. Typecheck only
  your files with a scratch tsconfig `generated-papers/_scratch-<prefix>-tsconfig.json` that extends
  `../tsconfig.json` and lists only your `_data` files in `"include"`; delete it after.
- Your task message names the chapter's textbook PDF. Read it (`pdftotext "<pdf>" - | grep -i ...`,
  small outputs) to confirm facts, wording and the section order BEFORE you write them; drop what the
  book does not support. A board question on something the present book does not teach (older papers):
  teach it from the book's own ideas, and say in that concept which years asked it and that the
  present book does not cover it, so the student gives it less time.

## Mathematics (added 2026-11-23, HSC Maths)

- **Checking scope.** Board rows (`kind: "pyq"`): solve every one before reading its answer. Textbook
  rows passed the earlier book-answer-key cross-check, so: solve every textbook MCQ, every row you
  feature, and at least one in five of the rest (spread across pages); report any wrong answer.
- **Big chapters** (300 to 400 rows): place rows on concepts with a small script keyed on each row's
  subtopic (its page) and words in the stem; glance at the stems a rule does not place cleanly. Every
  row is still tagged exactly once, on its own subtopic's page.
- **A page with one or two rows** gets one or two concepts; every concept must feature one of its own
  rows. A teaching-only concept with no row of its own is allowed ONLY as `kind: "formula"` with no
  `pyqExampleId` (a foundation), never as a reference table.
- **Notation.** Maths always in `\\(...\\)` with LaTeX commands, never Unicode maths symbols inside it
  (write `\\land`, `\\lor`, `\\sim`, `\\to`, `\\leftrightarrow`, `\\int`, `\\sqrt{}`, `\\theta`).
  Plain-text fields take words ("p and q", "integral of x squared").
- **Worked examples as board solutions:** the steps a full-marks answer shows (formula or rule used,
  substitution, simplification, the final answer boxed in words), not a shortcut. For "show that" and
  proofs, every step on its own line.
- **Content source** is the MHT-CET Maths notes chapter named in your task message (MHT-CET is an MCQ
  exam; the board wants written working, so keep the ideas, rewrite the worked examples board-style).

## Chemistry (added 2026-11-23, HSC Chemistry)

- **Checking scope.** Board rows: solve or check every one before reading its answer. Textbook rows:
  every MCQ, every numerical, every row you feature, and at least one in five of the written rest.
- **Physical chapters** (Solid State to Chemical Kinetics): numericals as board answers (Given,
  Formula, Substitution with units, Answer with unit, the book's significant figures). Derivations the
  board asks for go in the concept's `definition`, one step a line, in the book's symbols.
- **Inorganic and organic chapters:** a reaction is written in maths with `\\text{}` formulas and the
  condition over the arrow: `\\(\\text{C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{conc. H}_2\\text{SO}_4,\\ 443\\ \\text{K}} \\text{C}_2\\text{H}_4 + \\text{H}_2\\text{O}\\)`.
  NEVER `\\ce{}` (KaTeX here has no mhchem). Named reactions are taught with the book's own example.
  "Give reasons", "distinguish", "convert" and "test for" answers suit reference tables or short
  worked examples; uses, properties and colours suit reference tables.
- **Structures cannot be drawn.** Give condensed formulas or words; prefer a featured row whose answer
  needs no structure figure; a row whose answer is a figure is still tagged.
- **Plain-text fields** take Unicode formulas (H₂SO₄, Fe³⁺, ΔG°), never LaTeX.
- **Four different rungs (learned on Maths):** notes:lint compares NUMBERS, so a worked example or
  self-check that reuses the featured question's numbers (same concentrations, same masses, same
  compound with the same data) is flagged even when the wording differs. Pick other numbers and,
  for organic rungs, another compound.
- A correction you report for a textbook row whose answer the book prints wrongly goes as a
  `[Textbook answer-key error: ...]` or `[Textbook misprint: ...]` bracket at the START of the
  solution, never the end.
- **Content source** is the MHT-CET Chemistry notes chapter named in your task message; its pages
  carry em dashes, terse prose and MCQ shortcuts: keep the facts you can confirm in the book, rewrite
  everything else board-style.

## Text rules (gates fail on these)

- Plain-text fields take NO LaTeX and no `**`: `title`, `oneLineDefinition`, `whyItMatters`,
  `concept.name`, `formula.label`, table `columns`. Use words or Unicode there (I = neAv, n², Ω).
- Everywhere else maths is `\\(...\\)` inside TS strings (double backslashes), including practice
  answers and trap bodies. Never `\\iff`. Simple units and numbers may stay plain ("2 Ω", "60 cm").
- A `formula.symbols` entry is `{ symbol: "\\(n\\)", meaning: "plain words" }`.
- **No em dashes, en dashes, " - " or " -- " used as dashes anywhere you write.** Use a full stop,
  colon, comma or brackets. A range like "2016 to 2026" is fine; a minus sign inside maths is fine.
- Simple English: short sentences, everyday words, the way a good teacher talks to a Class 12 student.
- Fill every table cell with a real value; drop a row rather than leave a blank or a dash.
- `definition` may use `- ` bullets and `**bold**`. Never end a bullet mid-sentence.

Final message (short): the files written, pages and concepts, rows you dispute with one line each,
wrong model answers, refile candidates, and uncertainties.
