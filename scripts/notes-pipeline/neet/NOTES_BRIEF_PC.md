# NEET Physics and Chemistry /notes: the chapter agent's brief

One agent prepares and drafts the notes for ONE NEET Physics or Chemistry chapter. **It reads and
drafts; the main session decides and writes.** Adapted from `NOTES_BRIEF.md` (the Botany and
Zoology brief, 2026-11-15) on 2026-11-16, for calculation subjects. The method is NOTES_WORKFLOW.md
(sections 0, 1, 1b) and the eight defect classes of NOTES_ARC_LEDGER.md.

**The format and depth model** is NEET Physics Current Electricity (shipped 2026-11-16):
`src/app/notes/neet-physics/current-electricity/_data/*` (four page files + `chapter.ts`; `index.ts`
is written by the main session), its re-cut plan `generated-papers/_plan-phce.json` and its tag map
`generated-papers/_tag-nph-ce.json`. Read all of them before writing anything. For a Chemistry
chapter, also read the NEET Chemistry model named in your task message once it exists.

**The content source** is the JEE Mains notes chapter of the same topic, named in your task message
(`src/app/notes/jee-mains-physics/<slug>/` or `jee-mains-chemistry/<slug>/`). Use it for ideas,
definitions and worked examples, but: every count, year, featured question and page cut comes
from YOUR NEET dump; NEET is set from NCERT and is shallower than JEE, so leave out JEE-only depth
(calculus-heavy derivations, multi-step numeric-answer setups) unless a NEET row asks for it; and
re-check every fact you carry over. Never reuse a JEE slug.

Your task message gives: the subject, the exact DB chapter name, your `<code>`, the route
(`neet-physics` or `neet-chemistry`), the chapter slug, the subtopic prefix `<prefix>` (pages are
`<prefix>-<word>`), the concept prefix `<cprefix>` (concepts are `<cprefix>-<word>`) and `<CONST>`.

Your chapter's dump is `generated-papers/_cdsk_<code>.md` (one block per row: id prefix,
`PRACTICE |` for a practice row, sitting, Q#, difficulty, current subtopic, `IMG` when the row has
a figure, stem, options with the key starred, solution) and `_cdsk_<code>.json` (full ids, `kind`,
`year`, `difficulty`, `image`).

**Keep tool output small.** Read files in chunks of about 150 lines. Never `cat` a whole dump.
Name any scratch file with your code (`generated-papers/_scratch-<code>-*`): other agents are
writing in the same folder.

## Hard limits

- Write ONLY: `src/app/notes/<route>/<slug>/_data/<page>.ts` and `chapter.ts` (no `index.ts`, no
  route pages: the main session's register step writes those), `generated-papers/_plan-<code>.json`,
  `generated-papers/_tag-<prefix>.json`, `generated-papers/_prep-<code>.md`, and your own scratch files.
- Never: `--apply`, any DB write, `tag-chapter.ts`, git, `src/lib/notes/chapters.ts`,
  `src/lib/notes/bookOrder.ts`, `scripts/neet/data/*`, `scripts/pariksha/data/*`, any other folder.
- Read-only commands are fine: the dry run `npx tsx scripts/neet/retax.ts generated-papers/_plan-<code>.json`
  (no `--apply`: it only reads), and once at the end `npx tsc --noEmit -p .` (only errors in YOUR
  files matter; other agents are writing in parallel).
- **Write every `.ts` file with the Write tool (or Edit), never through a shell heredoc, `sed` or a
  Python string.** The shell eats backslashes, and a TS string with `\(` instead of `\\(` silently
  loses its maths. This happened on the model chapter.

## Two kinds of row

- **Past-year (pyq) rows** are the notes' evidence. Their keys are NTA's, and the solutions were
  transcribed from a coaching booklet's worked answers. The risk is a transcription slip (options
  read in the wrong order, a number or sign dropped), not a derivation error. So **solve every pyq
  row yourself before you look at the starred option**: do the arithmetic. Where a row needs its
  figure (`IMG`) and the stem does not give enough to solve it, say so and check only that the
  solution is consistent with the key. List every row where your answer differs, with your working
  and how sure you are (HIGH / MED / LOW), and say whether the starred option's TEXT could be a
  mis-slot. List rows flawed as printed and solutions that are wrong or do not explain the key
  (with a corrected solution in the report). A key change is never yours to make: report it.
- **Practice rows** (`PRACTICE |` in the dump, coaching tests) are never tagged or featured. They
  share the chapter's subtopics, so you still place every one of them on a page. Some chapters have
  hundreds: place them by their current subtopic name with a small script (a map from old subtopic
  to page), then glance at the stems of any subtopic that does not map cleanly. Report a practice
  row only if its key is plainly wrong.
- **Never feature** these rows (NTA dropped or made a bonus, or flawed as printed):
  `3fb985a4`, `99dc8e34`, `7b653f8a`, `cb3c5fbb`. Tag them like any other row.

The 2024 syllabus: NMC dropped some topics in 2024. When a topic's questions all predate 2024, say
how recent they are, counted from the dump ("none since 2022"), not as a syllabus claim.

## Per chapter, in order

1. **Read every row and its solution** (see above).
2. **Re-cut into teaching pages** (NOTES_WORKFLOW step 0). The ingest gave nearly every row its own
   subtopic. Cut the chapter into pages a student learns in NCERT order, foundations first: about
   2-6 pages of roughly 5-15 pyq rows (a small chapter may be one or two pages). Page names are
   short, plain Title Case nouns. Write `generated-papers/_plan-<code>.json` (the model plan's shape):
   ```json
   { "dump": "_cdsk_<code>.json", "subject": "Physics", "chapter": "<exact DB name>",
     "pages": { "Page Name": "8hex 8hex ...", "...": "..." },
     "refile": { "8hex": { "subject": "Physics", "chapter": "<another chapter>", "subtopic": "To Place", "why": "..." } } }
   ```
   EVERY row of the dump (pyq and practice) goes on exactly one page or in `refile`. `refile` is for
   a row that belongs to a different NCERT chapter (a diode question in Current Electricity goes to
   Semiconductor Electronics); its chapter must be in `NEET_CHAPTERS` in `scripts/neet/config.ts`,
   and its subtopic is `"To Place"` unless your task message names a page there. Refile sparingly:
   a row that merely uses another chapter's tool stays. Run the dry run until it ends
   "dry run: nothing written".
3. **Write the pages** (one file per page plus `chapter.ts`), copying the model's shape:
   - Exports `<CONST>_<PAGE>_NOTE` and `<CONST>_CHAPTER`.
   - `chapterName` is the exact DB chapter name; each `subtopicName` is the plan's exact page name.
     `title` is "<chapter name>: NEET <Subject>".
   - 2-4 concepts a page. In Physics and physical Chemistry most concepts are `kind: "formula"` with
     a `formula` (label, latex, optional `symbols`) and an `authoredExample` with steps. Use
     `kind: "reference"` with a `table` for fact lists: inorganic properties and reactions, named
     organic reactions and reagents, the EM spectrum, logic gates, units and dimensions.
   - Every concept features one of its own tagged pyq rows (`pyqExampleId`, the FULL uuid from the
     `.json` dump), never a disputed, flawed or never-feature row. Prefer a row without a figure when
     one fits as well. A reference table row may carry `pyqExampleId` and a `noteAmber` naming the
     sitting that asked it ("NEET 2025: ...").
   - **Four rungs, four different problems:** the authored example, the self-check, the practice
     reps and the featured question must differ. **No practice rep or self-check may restate its
     concept's featured PYQ** (same set-up with new numbers counts as restating). Read each
     concept's reps against its featured row before you finish.
   - Practice reps and self-checks are SELF-CONTAINED (no "the above", no "it"): each is lifted into a
     shuffled quiz alone. No rep may test a fact or formula the page has not taught.
   - **Check every number you write**: each worked example, self-check and practice answer, by
     working it again (a one-line script is fine). A wrong worked answer is the worst defect a notes
     page can have.
   - At least 12 traps per chapter (a chapter under ~25 pyq rows: at least one per concept and as
     many as it honestly has), each stating the mistake and the right fact without pointing at
     another item.
   - **Only facts you are sure NCERT states.** When unsure, leave it out and name it in the report.
   - Every year, count and repeat you write ("asked three times", "four of them from 2024 or later")
     is COUNTED from the dump with a one-line script, never estimated. `whyItMatters` on each page
     says how many NEET questions the page has and what they ask, counted the same way.
4. **The intro** (`chapter.ts`): the first sentence states a bank fact ("Current Electricity has 29
   past-year questions in NEET Physics, from 2021 to 2026: 9 EASY, 17 MODERATE and 3 HARD."),
   counting only the pyq rows your plan keeps in the chapter; do not list the pages (the cards below
   do); over 260 characters, under 200 words. Add a `cardBlurb` (one sentence naming what the pages
   cover). The 8 papers are NEET 2021-2026 plus Re-NEET 2024 and Re-NEET 2026.
5. **The tag map** `generated-papers/_tag-<prefix>.json`, the model map's shape,
   `"dump": "_cdsk_<code>.json"`, `"expect"` = the number of pyq rows tagged: **every pyq row the plan
   keeps in the chapter exactly once, no practice row, no refiled row**, under a concept of the page
   its plan puts it on.
6. **The report** `generated-papers/_prep-<code>.md`, under 100 lines: disputed keys (working +
   confidence + mis-slot?), flawed rows, solution problems, refiles, the page cut with pyq/practice
   counts, the featured row per concept, anything you are unsure of.

## Text rules (gates fail on these)

- Plain-text fields take NO LaTeX and no `**`: `title`, `oneLineDefinition`, `whyItMatters`,
  `concept.name`, `formula.label`, table `columns`. Use words or Unicode there (I = neAv, n², Ω).
- Everywhere else maths is `\\(...\\)` inside TS strings (double backslashes), including practice
  answers and trap bodies: write `"\\(J = nev_d\\)"`, never a bare `J = nev_d` or `v_d`. Never `\\iff`.
  Simple units and numbers may stay plain ("2 Ω", "60 cm").
- Chemical formulae in body text: `\\(\\text{H}_2\\text{SO}_4\\)` or plain "H₂SO₄".
- A `formula.symbols` entry is `{ symbol: "\\(n\\)", meaning: "plain words" }`; a bare `\\text{...}`
  there fails notes:latex.
- **No em dashes, en dashes, " - " or " -- " used as dashes anywhere you write.** Use a full stop,
  colon, comma or brackets. (A range like "2021 to 2026" is fine; a minus sign inside maths is fine.)
- Simple English: short sentences, everyday words, the way a good teacher talks to a Class 11 student.
- Fill every table cell with a real value; drop a row rather than leave a blank or a dash.
- `definition` may use `- ` bullets and `**bold**`.

Final message (short): the files written, pages and concepts, disputed keys with one line each,
flawed rows, refile candidates, and uncertainties.
