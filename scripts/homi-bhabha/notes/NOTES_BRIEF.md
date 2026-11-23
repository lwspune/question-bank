# Homi Bhabha Std IX /notes: the draft agent's brief

One agent drafts the notes for one or a few chapters of the Homi Bhabha Balvaidnyanik Competition,
Std IX (MSTA's science talent test; 100 one-mark MCQs on physics, chemistry, biology and science
GK, at the level of the Maharashtra State Board science books for Std 7 to 9). **You read and draft;
the main session decides and writes.** This file is the contract.

Work in `C:\Users\vilas\Downloads\qb-homi-bhabha` (a git worktree). Paths below are relative to it.

**The finished model is Sound.** Read all of it before writing anything:
- pages `src/app/notes/homi-bhabha-9-physics/sound/_data/{chapter,nature,waves,speed,echo}.ts`
- its re-cut plan `scripts/homi-bhabha/notes/plans/sound.ts`
- its tag map `scripts/homi-bhabha/notes/tags/so.json`
- its dump `generated-papers/_cdsk_hb9so.md`

Every chapter's row is in `scripts/homi-bhabha/notes/manifest.json` (subject, DB chapter name, URL
slug, `abbr`; the subject's route is in `routes`). Its dump is `generated-papers/_cdsk_hb9<abbr>.md`
(readable: id prefix, paper and Q#, difficulty, current subtopic, IMG when it has a figure, stem,
options with the key starred, solution) and `.json` (full ids). A figure is at
`C:\Vilas\LWS_Pune\Homi_Bhabha\figures\<paper id>\q<NNN>.png` (paper id e.g. `hb-9-2018`, NNN the
question number, zero-padded): open it when the stem needs it. That folder is the ONLY thing you may
open under `C:\Vilas`.

**Keep tool output small.** Read files in chunks of about 150 lines. Never print a whole dump.

## Hard limits

- Write ONLY: `scripts/homi-bhabha/notes/plans/<slug>.ts`, `scripts/homi-bhabha/notes/tags/<abbr>.json`,
  `src/app/notes/<route>/<slug>/_data/<page>.ts` and `chapter.ts` (no `index.ts`, no route pages: the
  main session's register step writes those), and your report `generated-papers/_prep-hb9-<abbr>.md`.
- Never: `ship.py ship`, `--apply`, any DB write, `tag-chapter.ts`, git, `src/lib/notes/chapters.ts`,
  any other file or folder.
- Read-only commands are fine: the re-cut's dry run `python scripts/homi-bhabha/notes/ship.py plan <abbr>`
  (it reads the bank and writes nothing), and, once at the end, `npx tsc --noEmit -p .` (only errors
  in YOUR files matter; other agents are writing in parallel).

## Per chapter, in order

1. **Read every row and its solution.** Solve every key yourself, as printed. List in the report any
   row whose key you dispute (with the full working), any row flawed as printed (a `**Note:**` at the
   top of the solution means the row carries a notice), and any solution with a real error. A
   flawed or disputed row is never featured. A row that belongs to another chapter: report it, and
   still place it on the closest page of yours (the main session decides).
2. **Re-cut into teaching pages.** The ingest filed rows under one-off subtopics; cut them by what a
   question ASKS into about 2 to 5 pages of roughly 4 to 15 rows, in teaching order (a page may only
   use what earlier pages taught). A chapter of 10 to 13 rows may be 2 pages. Subtopic names are
   short, plain Title Case nouns ("Speed of Sound"). Write the plan file in the Sound plan's shape,
   every row by its 8-character id prefix, `expected` and `total` filled in, then run the dry run
   until it ends `DRY RUN COMPLETE`.
3. **Write the pages** (one file per page plus `chapter.ts`), copying the Sound files' shape:
   - Subtopic slugs `hb9-<abbr>-<word>`, concept slugs `hb9<abbr><2 letters>-<word>` (Sound:
     `hb9-so-speed`, `hb9sosp-gases`). Export names `HB9_<ABBR>_<PAGE>_NOTE` and `HB9_<CHAPTER>_CHAPTER`
     (a short, unique chapter word: `HB9_SOUND`, `HB9_ACIDS`). Page file names are the subtopic slug
     minus `hb9-<abbr>-`.
   - `chapterName` is the exact DB chapter name; each `subtopicName` is the plan's exact target name;
     `title` on the chapter is `<Chapter>: Homi Bhabha <Subject>`.
   - 2 to 3 concepts a page. `kind: "formula"` (needs an `authoredExample`) for a technique with
     working; `kind: "reference"` (needs a `table`) for named facts. Biology, most of chemistry's
     substances and science GK are mostly reference concepts.
   - Every concept features one of its tagged rows (`pyqExampleId`, the FULL uuid from the `.json`
     dump), from its own page, never a flawed or disputed row. Prefer a recent paper (2021 to 2024).
     Every concept needs at least one tagged row.
   - **Four rungs, four different problems:** worked example, self-check, practice reps and the
     featured question must all differ, and none may reuse the featured question's numbers or wording.
     Author the worked example first, from scratch.
   - Practice reps and self-checks are SELF-CONTAINED (no "the above", no "it"): each is lifted into
     a shuffled quiz alone. No practice rep may test a fact the page has not taught. Four reps a concept.
   - At least 12 traps per chapter (a short chapter: as many as it honestly has, at least one a
     concept), each stating the mistake and the right fact without pointing at another item.
   - Teach the facts the PAPERS test, at Std 7 to 9 depth, and enough around them that a student can
     answer the next paper's version. Every number you write is re-derived; every fact you state is one
     you are sure of (leave out what you are not). Every count you state (in `whyItMatters`, the intro)
     is counted from the plan and the dump, not estimated.
4. **The intro** (`chapter.ts`): the first sentence states a bank fact ("Sound has 28 questions in the
   Homi Bhabha Std IX bank, ..."); give the EASY / MODERATE / HARD split and which idea is asked most;
   do not list the pages (the cards below do); over 260 characters, under 200 words. The bank holds
   eight papers: 2010, 2017, 2018, the three online papers of January, November and December 2021,
   2023 and 2024. Every question here is a past-paper question. Never say where a paper's text came
   from. `cardBlurb` lists what the chapter covers in one line.
5. **The tag map** `scripts/homi-bhabha/notes/tags/<abbr>.json`, the Sound map's shape
   (`"dump": "_cdsk_hb9<abbr>.json"`, `"prefix": "hb9-<abbr>"`, `"exam": "Homi Bhabha Class 9"`), every
   PUBLIC row of the chapter exactly once, under a concept of the page its plan puts it on.
6. **The report** `generated-papers/_prep-hb9-<abbr>.md`: disputed keys and flawed rows (with working),
   solution errors, rows that belong elsewhere, the page cut with counts, the featured row per concept,
   anything you are unsure of. Under 80 lines.

## Text rules (gates fail on these)

- Plain-text fields take NO LaTeX and no `**`: `title`, `oneLineDefinition`, `whyItMatters`,
  `concept.name`, `formula.label`, table `columns`. Use words or Unicode there (λ, °C, ², H₂O).
- Maths and chemical formulas elsewhere are `\\(...\\)` inside TS strings (double backslashes):
  `\\(\\mathrm{H_2SO_4}\\)`, `\\(v = f\\lambda\\)`. Never `\\iff`.
- **No em dashes, en dashes, " - " or " -- " used as dashes anywhere in the text.** Use a full stop,
  colon, comma or brackets. (A range like "6 to 15" is fine.)
- Simple English: short sentences, everyday words, the way a good teacher talks to a Std 9 student.
- Fill every reference-table cell with a real value; drop a row rather than dash it.
- `definition` may use `- ` bullets and `**bold**`; `formula.latex` holds every recallable formula the
  concept teaches; a pure method stays out of `formula.latex`.

Final message: the files written, pages and concepts per chapter, disputed keys, flawed rows, rows
that belong elsewhere, and uncertainties. Keep it short.
