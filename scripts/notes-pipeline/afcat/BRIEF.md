# AFCAT notes: the chapter agent's brief

One agent per AFCAT Numerical Ability chapter. The agent READS and DRAFTS; the main session
DECIDES and WRITES (database, `scripts/afcat/data`, `config.ts`, registry, tags, git). First used
for the 19 chapters after Ratio and Proportion (2026-10-22). The finished example is
`src/app/notes/afcat-maths/ratio/_data/`: read `chapter.ts` and two of its pages before writing.

## What AFCAT is here

The bank is ~97% PRACTICE (LWS quizzes, Errorless sheets, CDS Pathfinder, Conquer the Sky,
Cadetprep sheets), plus a few AFCAT past-year questions (dump rows with a `year`). Every key was
re-derived blind at ingest, but the sources were AI-written and some rows still ship wrong. AFCAT
notes count practice AND past-year rows and call them "questions" (`lib/notes/countKind.ts`):
never write "PYQs" for a count; "AFCAT past-year questions" only for the rows with a `year`.

## Inputs

- `generated-papers/_cdsk_<code>.json` (every PUBLIC row: id, number = question id like `01-23`,
  year, difficulty, subtopic, text, context, options with `correct`, answer, solution, image) and
  `_cdsk_<code>.md` (the same, readable). **Read the .md in chunks of ~150 lines. Keep every tool
  output small** (head/cut); agents that cat a whole dump stall.
- The chapter's current subtopics: the dump's `subtopic` field.

## STRICT LIMITS

No database writes, no `--apply` on anything, never run `tag-chapter.ts`, `sync-*.ts`,
`correct-in-place.ts`, `recut.ts --apply`, `register.py` or `notes:order`. No git commands that
change state. Do not edit `scripts/afcat/`, `src/lib/`, registry files or other chapters. Write
files with the Write tool (heredocs eat backslashes). Scratch files only as
`generated-papers/_af<code>-scratch-*` (other agents run beside you).

## Tasks

**A. Read every row and its solution, and solve every key as printed.** Classify problems:
- `WRONG KEY`: the keyed option is wrong and another option is right. Give the derivation.
- `STALE SOLUTION`: the key is right but the solution contradicts it, uses other numbers, or says
  "no answer" / "as printed" / "none of the options". Write the replacement solution (same house
  style as the bank: short, `\\(...\\)` maths, no self-talk).
- `FLAWED`: no option is right, two are, or the stem cannot be answered. Say what one change would
  make it exact. Never feature these rows.
- Twin options (one value printed twice in two forms) count as FLAWED.

**B. Cut the chapter into teaching pages, pedagogy first.** Usually 4-9 pages of ~15-80 rows; a
small chapter (under ~60 rows) may be 2-4. List the solution TECHNIQUES first (read MODERATE and
HARD solutions), then order pages as a teacher would: foundations, core methods, applications.
Merge thin or overlapping bank subtopics; move single misfiled rows. Each page = one DB subtopic
(the page's `subtopicName` is the DB name after the re-cut). Prefer keeping an existing name when
it still fits; a merged page gets a clear new name.

Write the plan as `generated-papers/_af<code>-plan.json`:
`{ "subtopics": [new names, teaching order], "renames": {"old name": "new name"}, "moves": {"<question id e.g. 03-12>": {"to": "<new name>", "reason": "<why>"}} }`.
Every row must land in the list; no listed subtopic may be empty.

**C. Concepts and tags.** 2-6 concepts per page, each with at least 4 rows where the page allows
(a 1-3 row concept only when its skill is genuinely distinct). EVERY row is tagged to exactly one
concept on its own page. Write `generated-papers/_af<code>-tags.json` in the tag-chapter format:
`{ "dump": "_cdsk_<code>.json", "prefix": "af-<p>", "expect": <row count>, "exam": "AFCAT",
"subtopics": {"af-<p>-<page>": "<DB name after re-cut>"}, "concepts": [["af-<p>-<page>", "af<p>-<concept>", "8hex 8hex ..."]] }`
(ids are the first 8 hex of the uuid). Slugs: pages `af-<p>-<word>`, concepts `af<p>-<words>`,
both chapter-distinct.

**D. Draft the pages** into `src/app/notes/afcat-maths/<slug>/_data/` ONLY: one `<page>.ts` per
page exporting `AF_<P>_<PAGE>_NOTE: SubtopicNote`, plus `chapter.ts` exporting
`AF_<P>_CHAPTER: ChapterNote`. Do NOT write `index.ts` or any `page.tsx` (the main session
registers the chapter; an unregistered route page breaks the build).

**E. Report** `generated-papers/_af<code>-report.md` (under ~150 lines): problems from A, each with
id, question id, class, derivation and the proposed fix as override JSON (`{"stem": "..."}` (the
field is `stem`, never `text`), `{"solution": "..."}`); give an option fix as OLD option text → NEW
option text, never by letter: the dump's letters come after the chapter's shuffle plan, while
override letters are the source's, so a letter can point at the wrong option (Clock 04-17, 05-18); the page plan with row counts; featured row
per concept; any concept under 4 rows and why; uncertainties.

## Hard rules for the pages (each one broke a shipped chapter)

- **Plain-text fields have NO LaTeX and no `**`:** `title`, `oneLineDefinition`, `whyItMatters`,
  `concept.name`, `formula.label`. Use Unicode (√, ², ×, ₹, %) or words.
- **No `\\iff`** (write `\\;\\text{means}\\;`). **No em dashes or spaced dashes** in any text.
- Maths in body fields as `\\(...\\)` with doubled backslashes in TS strings. `**bold**` key terms;
  `- ` bullets in `definition` when list-shaped.
- **Four rungs, four different problems:** worked example, self-check, practice reps and the
  featured row. Author the worked example first, then pick a DIFFERENT row to feature.
- **Never print the featured row's numbers anywhere in the concept** (definition bullets, traps,
  intuition included): that turns the featured question into a re-read. Use other numbers.
- **The featured row (`pyqExampleId`, full uuid from the dump) must be tagged to its own concept,
  sit on that page, use only what the page has taught, and not be a problem row from A.** Prefer an
  AFCAT past-year row when one fits.
- **Every number you write is re-derived.** Check each worked example, self-check, practice answer
  and trap with arithmetic before writing it. No gate checks arithmetic.
- **Order:** no concept may use a method or term introduced later in the chapter (pages in
  `subtopicOrder`, concepts in file order). A forward mention must say it is coming later.
- `kind: "formula"` (formula + authoredExample) for methods; `kind: "reference"` (table, 2-5
  columns, every cell filled, no dashes) for facts to memorise. Every reference concept and every
  formula concept with a `pyqExampleId` needs tagged rows; a foundation concept (formula, no
  `pyqExampleId`) may have none, max one or two per chapter.
- 3-4 `practiceSet` reps per procedural concept, each self-contained (no "the above"). At least one
  trap per concept; the chapter needs 12+ traps. Traps state the mistake and the right fact.
- `chapter.ts`: `chapterName` = the exact DB chapter name; `title` = "<Chapter>: AFCAT Numerical
  Ability"; `intro` 260-1,100 characters, under 200 words, first sentence a bank fact (size, the
  AFCAT past-year rows and their years, or how HARD it is), never a list of the pages;
  `cardBlurb` one line; `subtopicOrder` = page slugs.
- Every count in prose is computed from the dump with a one-line script, for the page AFTER the
  re-cut. Prefer "most", "a third" over exact counts where the sentence works either way.
- `whyItMatters` (2-3 sentences) says what the page asks and where the marks are lost, not a
  restatement of the title.

## Diagrams

Only where the concept is spatial (a figure, a clock face, a solid, a height and distance
triangle). Static server-component SVG in `src/app/notes/_components/visualizations/Af<Name>.tsx`
(clone `RatioBarModel.tsx`: tokens like `fill-indigo-500 dark:fill-indigo-400`, `role="img"`,
an `aria-label`, no apostrophes or quotes in JSX text, no em dash in the doc comment). At most
2 per chapter. Set no `visualizationSlug` yourself; list each in the report as
`slug | component | concept slug` for the main session to wire.

## Check before finishing

`npx tsc --noEmit -p .` must show no error in your files (other agents' half-written files may
error; ignore those). Do not run notes:lint, the build or the gate. Final message: the files
written, pages with row counts, concepts per page, problem rows by class, uncertainties.
