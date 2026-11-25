# Board /notes (CBSE Class 12): the chapter agent's brief

One agent drafts the notes for ONE CBSE Class 12 chapter. **It reads and drafts; the main session
decides and writes.** Written 2026-11-25 (owner: "complete cbse 12th boards notes for pcm similar to
hsc end to end"). Adapted from `scripts/notes-pipeline/hsc/NOTES_BRIEF.md`, which built the
Maharashtra HSC Class 12 notes on 2026-11-23.

**The format and depth model** is HSC Physics Current Electricity:
`src/app/notes/mh-hsc-12-physics/current-electricity/_data/*` (four page files + `chapter.ts`;
`index.ts` is written by the main session). Read `chapter.ts` and two page files before writing
anything. Same types (`src/app/notes/_types.ts`), same shape, same tone.

**The content source** is the JEE Mains notes chapter named in your task message
(`src/app/notes/jee-mains-<subject>/<slug>/`). JEE Main is set from the same NCERT books, so use it
for ideas, definitions and worked examples. But every count, year, featured question and page comes
from YOUR CBSE dump; the JEE pages are an MCQ exam's notes (shortcuts, option tricks, older prose
with em dashes) and the board wants written answers. Re-check every fact you carry over against the
NCERT chapter PDF. Never reuse a JEE slug.

Your task message gives: the subject, the exact DB chapter name, the route (`cbse-12-<subject>`), the
chapter slug, the page prefix `<prefix>` (pages are `<prefix>-<word>`), the concept prefix
`<cprefix>` (concepts are `<cprefix>-<word>`), `<CONST>`, the JEE source chapter and the NCERT PDF.

## Your dump

- `generated-papers/_cdsk_<prefix>.compact.md`: **read this one, all of it, in chunks of about 150
  lines.** One block per row, grouped by DB subtopic: id prefix, `BOARD <year>` (a CBSE board paper,
  2022 to 2026) or `TEXTBOOK` (an NCERT in-text example `Eg`, or an exercise), Q#, difficulty, `IMG`
  when the row has a figure, the shared context of a case-study set (`C:`), the stem, options with
  the key starred, `A:` the key or numeric answer, and the first 700 characters of the model answer.
- `generated-papers/_cdsk_<prefix>.md`: the same rows with the FULL model answer. Open a row there
  (grep its id prefix) only when the opening is not enough to judge it.
- `generated-papers/_cdsk_<prefix>.json`: full ids, `kind`, `year`, `subtopic`, `image`, `number`.

CBSE board answers were transcribed from **CBSE's own marking scheme** when the bank was built, so a
board key is usually right; when your working disagrees, report it with your working and the main
session reads the marking scheme. Several sets of one year share questions, and repeats were merged,
so one row may stand for a question printed in more than one set.

**Keep tool output small.** Never `cat` a whole dump. Name any scratch file with your prefix
(`generated-papers/_scratch-<prefix>-*`): other agents are writing in the same folder.

## Hard limits

- Write ONLY: `src/app/notes/<route>/<slug>/_data/<page>.ts` and `chapter.ts` (no `index.ts`, no
  route pages), `generated-papers/_tag-<prefix>.json`, `generated-papers/_prep-<prefix>.md`, and
  your own scratch files.
- Never: any DB write, `tag-chapter.ts`, git, `src/lib/notes/chapters.ts`, `src/lib/notes/bookOrder.ts`,
  any `scripts/*/data/*` file, any other folder. Never open the marking-scheme PDFs.
- Read-only commands are fine.
- **Write every `.ts` file with the Write tool (or Edit), never through a shell heredoc, `sed` or a
  Python string.** The shell eats backslashes, and a TS string with `\(` instead of `\\(` loses its maths.
- **Typecheck only your files:** a scratch `generated-papers/_scratch-<prefix>-tsconfig.json` that
  extends `../tsconfig.json` and lists only your `_data` files in `"include"`, then
  `npx tsc --noEmit -p generated-papers/_scratch-<prefix>-tsconfig.json`; delete it after. Never the
  full project `tsc` (three agents at once run out of memory).

## The pages are the existing subtopics

Do NOT re-cut. Each DB subtopic of the chapter is one page, with `subtopicName` = the subtopic's
exact name. Put the pages in the NCERT chapter's section order (foundations first). If a row plainly
belongs to another page of this chapter or to another chapter, do NOT move it: tag it where it is
(under the concept nearest its skill) and list it in the report as a refile candidate, with one line
of why.

A page with one or two rows gets one or two concepts; every concept must feature one of its own
rows. A teaching-only concept with no row of its own is allowed ONLY as `kind: "formula"` with no
`pyqExampleId` (a foundation), never as a reference table.

## Every row is checked, every row is tagged

- **Solve every board row yourself before reading its key or model answer**: do the arithmetic; for
  an MCQ or assertion-reason item, decide before looking at the star. Textbook rows (NCERT examples
  and exercises, cross-checked against NCERT's answers when ingested): solve every MCQ, every row you
  feature, and at least one in five of the rest, spread across pages. List every row where your
  answer differs, with your working and confidence (HIGH / MED / LOW).
- **Read every model answer's opening** against what NCERT teaches, and the full answer of every row
  you feature or dispute. List any answer that is wrong, incomplete for its marks, or does not answer
  the question asked, with a corrected answer in the report. A `[NCERT prints ...]`, `[Textbook ...]`
  or `[CBSE marking scheme: ...]` bracket is deliberate; check that it is right, do not remove it.
- A key or model-answer change is never yours to make: report it.
- **Tag every row of the dump, board and textbook, exactly once**, under a concept of the page that
  is its current DB subtopic. `"expect"` in the tag map = the number of rows in the dump.
- **Big chapters** (200+ rows): place rows on concepts with a small script keyed on each row's
  subtopic and words in the stem; read the stems a rule does not place cleanly.

## Write for the CBSE board exam

The paper (2023 to 2026; 2022 was the Term-2 paper with no MCQs) has MCQs and assertion-reason items
(1 mark), short answers (2 and 3 marks), case-study questions (4 marks: a passage, then parts) and
long answers (5 marks), most with an internal OR choice. The marking scheme gives marks for steps.

- Worked examples are laid out as a full board answer: Given, Formula, Substitution with units,
  Answer with unit (Physics, physical Chemistry); the steps a full-marks answer shows, one a line
  (Maths); for "show that" and proofs, every step on its own line.
- A concept the board asks to DERIVE carries the derivation's outline in its `definition`, one step
  a line, in NCERT's symbols and labelling.
- Teach assertion-reason the way the board marks it. CBSE's 2023 to 2026 papers print four codes:
  (A) both true and R explains A, (B) both true and R does not explain A, (C) A true and R false,
  (D) both A and R false. There is no "A false, R true" code in these papers. A trap may name the usual slip.
- Traps include where marks are lost: a missing unit, no labelled diagram where one is asked, a
  definition without its condition, a "distinguish" point that covers one side only, a sign
  convention not stated.
- **Off-syllabus board questions.** NCERT's rationalised books dropped some sections, and a 2022 or
  2023 paper may ask one. Teach it briefly from the book's own ideas and say in that concept which
  years asked it and that the present NCERT book does not cover it, so the student gives it less time.

## Per chapter, in order

1. **Read every row and its model answer** (see above).
2. **Write the pages** (one file per page plus `chapter.ts`), copying the model's shape:
   - Exports `<CONST>_<PAGE>_NOTE` and `<CONST>_CHAPTER`. Page file names are the last word of the
     page slug (`cbp-ce-kirchhoff` → `kirchhoff.ts`).
   - `chapterName` is the exact DB chapter name; `title` is "<chapter name>: CBSE Class 12 <Subject>".
   - 2-4 concepts a page. Most Physics, physical Chemistry and Maths concepts are `kind: "formula"`
     with a `formula` and an `authoredExample`. Use `kind: "reference"` with a `table` for
     "distinguish between" answers, lists of uses, properties, and named facts.
   - Every concept features one of its own tagged rows (`pyqExampleId`, the FULL uuid). Prefer a
     board row; use a textbook row only when the concept has no board row. Prefer a row without a
     figure when one fits as well. Never feature a row you dispute. A reference table row may carry
     `pyqExampleId` and a `noteAmber` naming the year ("Board 2024 asked ...").
   - **Four rungs, four different problems:** the authored example, the self-check, the practice
     reps and the featured question must differ. **No practice rep or self-check may restate its
     concept's featured question** (same set-up with new numbers counts as restating). notes:lint
     compares NUMBERS, so a worked example or self-check that reuses the featured question's numbers
     is flagged even when the wording differs: pick other numbers (and another compound or function).
     No trap may quote the featured question's numbers.
   - Practice reps and self-checks are SELF-CONTAINED (no "the above", no "it") and test only what
     the page has taught.
   - **Check every number you write** by working it again (a one-line script is fine). A wrong
     worked answer is the worst defect a notes page can have.
   - At least 12 traps per chapter, each stating the mistake and the right fact.
   - **Only facts you are sure the NCERT book states.** Read the PDF (`pdftotext "<pdf>" - | grep -i
     ...`, small outputs) to confirm facts, wording and the section order BEFORE you write them; drop
     what the book does not support and name it in the report.
3. **Counts.** Every year, count and repeat you write is COUNTED from the dump with a one-line
   script, never estimated. The intro and `whyItMatters` may state a number followed directly by
   "questions" ONLY for the chapter total (all rows) or one page's total; say board and textbook
   subsets in words or with the number not directly before "questions" ("Forty were set in board
   papers", "eleven of them from board papers"). `whyItMatters` says how many questions the page has,
   how many came from board papers and what the board asked, with years.
4. **The intro** (`chapter.ts`): the first sentence states the bank fact (total questions, the NCERT
   chapter's examples and exercises and CBSE's board papers from 2022 to 2026); then what the board
   asks in this chapter and how marks are won; do not list the pages (the cards below do); over 260
   characters, under 200 words. Add a `cardBlurb` (one sentence naming what the pages cover, 8-40 words).
5. **The tag map** `generated-papers/_tag-<prefix>.json`:
   ```json
   { "dump": "_cdsk_<prefix>.json", "prefix": "<prefix>", "expect": <all rows>,
     "exam": "CBSE Class 12",
     "subtopics": { "<page slug>": "<exact DB subtopic name>", ... },
     "concepts": [ ["<page slug>", "<concept slug>", "8hex 8hex 8hex ..."], ... ] }
   ```
   Every row's 8-hex id prefix appears exactly once across `concepts`. Verify it with a script.
6. **The report** `generated-papers/_prep-<prefix>.md`, under 100 lines: rows where your answer
   differs from the key or model answer (working + confidence), wrong or thin model answers (with a
   correction), refile candidates, the page list with board/textbook counts, the featured row per
   concept, anything you are unsure of.

## Subject notes

- **Physics.** Numericals as board answers with SI units. Ray diagrams and circuit figures cannot
  be drawn on the page: describe them in words ("draw the ray diagram with the object beyond 2F")
  and say in a trap that the diagram carries marks.
- **Chemistry** (physical chapters: numericals as Physics). A reaction is written in maths with
  `\\text{}` formulas and the condition over the arrow:
  `\\(\\text{C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{conc. H}_2\\text{SO}_4,\\ 443\\ \\text{K}} \\text{C}_2\\text{H}_4 + \\text{H}_2\\text{O}\\)`.
  NEVER `\\ce{}` (KaTeX here has no mhchem). Named reactions are taught with NCERT's own example.
  "Give reasons", "distinguish", "convert" and "test for" answers suit reference tables or short
  worked examples. Structures cannot be drawn: give condensed formulas or words. Plain-text fields
  take Unicode formulas (H₂SO₄, Fe³⁺, ΔG°), never LaTeX.
- **Maths.** Maths always in `\\(...\\)` with LaTeX commands, never Unicode maths symbols inside it.
  Plain-text fields take words ("integral of x squared"). Big chapters: see the placement rule above.

## Text rules (gates fail on these)

- Plain-text fields take NO LaTeX and no `**`: `title`, `oneLineDefinition`, `whyItMatters`,
  `concept.name`, `formula.label`, table `columns`. Use words or Unicode there (I = neAv, n², Ω).
- Everywhere else maths is `\\(...\\)` inside TS strings (double backslashes), including practice
  answers and trap bodies. Never `\\iff`. Simple units and numbers may stay plain ("2 Ω", "60 cm").
- A `formula.symbols` entry is `{ symbol: "\\(n\\)", meaning: "plain words" }`.
- **No em dashes, en dashes, " - " or " -- " used as dashes anywhere you write.** Use a full stop,
  colon, comma or brackets. A range like "2022 to 2026" is fine; a minus sign inside maths is fine.
- **No method notes.** Never write how something was checked ("verified with", "NCERT's answer
  key", "the marking scheme"). A student line must change what they do with the question.
- Simple English: short sentences, everyday words, the way a good teacher talks to a Class 12 student.
- Fill every table cell with a real value; drop a row rather than leave a blank or a dash.
- `definition` may use `- ` bullets and `**bold**`. Never end a bullet mid-sentence.

Final message (short): the files written, pages and concepts, rows you dispute with one line each,
wrong model answers, refile candidates, and uncertainties.
