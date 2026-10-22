# SSC CGL Tier I Maths /notes: the draft agent's brief

One agent drafts the notes for one SSC CGL Quantitative Aptitude chapter. **It reads and drafts; the
main session decides and writes.** The method is NOTES_WORKFLOW.md (sections 0, 1, 1b) and the eight
defect classes of NOTES_ARC_LEDGER.md. This file is the contract.

Work in `C:\Users\vilas\Downloads\Question_Bank` (the main session's checkout; other agents write other
chapters in it at the same time). Your chapter's row is in `scripts/ssc-cgl/notes-manifest.json`
(DB chapter name, URL slug `<slug>`, `abbr`). Its dump is `generated-papers/_cdsk_ssc<abbr>.md`
(readable: id prefix, shift, Q#, difficulty, current subtopic, stem, options with the key starred,
solution) and `.json` (full ids).

**Keep tool output small.** Read files in chunks of about 150 lines. Never `cat` a whole dump.

## What to read first

- **Shape** (copy it exactly): SPI Probability, `src/app/notes/spi-maths/probability/_data/*`, and
  its plan `scripts/spi/reshape/probability.ts`. The tag map's shape is `generated-papers/_tag-cds-av.json`.
- **Topic checklist**: the CDS Maths chapter of the same name, `src/app/notes/cds-maths/<slug>/_data/*`
  (same syllabus, often the same subtopic names). Use it to see what the chapter must cover. **Do not
  copy its sentences, examples, tables or traps.** These are separate pages that search engines compare;
  write every sentence yourself, for SSC. The main session runs an overlap check against CDS.

## SSC CGL facts you may state

- Tier I: 100 questions in 60 minutes, four parts of 25 (Reasoning, General Awareness, Quantitative
  Aptitude, English), +2 for a right answer and −0.5 for a wrong one. That is about 36 seconds a question.
- The bank holds every readable Tier I shift of 2023, 2024 and 2025 (113 shifts), read from SSC's own
  response sheets. Every row is a real past question, so "PYQ" and "asked in SSC CGL" are true of all of
  them. The 2025 key is SSC's provisional key.
- Nothing else about SSC (cut-offs, posts, Tier II weight) unless you can count it from the dump.

**SSC rewards speed.** For every technique, teach the full method AND the fast route a strong student
uses (fractions for percentages, the product-over-sum rule for work, LCM units, ratio scaling, option
elimination, the substitution trick for identities, standard triangle values). State when the shortcut
is safe and when it breaks: a shortcut with no limit stated is a trap, not a method.

## Hard limits

- Write ONLY: `scripts/ssc-cgl/reshape/<slug>.ts`, `src/app/notes/ssc-cgl-maths/<slug>/_data/<page>.ts`
  and `chapter.ts` (no `index.ts`, no route pages: the main session's register step writes those),
  `generated-papers/_tag-ssc-<abbr>.json`, `generated-papers/_prep-ssc-<abbr>.md`.
- Never: `--apply`, any DB write, `tag-chapter.ts`, git, `src/lib/notes/chapters.ts`, any other folder,
  any other chapter's files.
- Read-only commands are fine: the dry run `npx tsx scripts/ssc-cgl/reshape.ts scripts/ssc-cgl/reshape/<slug>.ts`
  and, once at the end, `npx tsc --noEmit -p .` (only errors in YOUR files matter).

## Per chapter, in order

1. **Read every row and its solution.** Solve every key yourself, as printed. List in the report any
   row whose key you dispute (with the full derivation), any row flawed as printed, and any solution
   with a real error. A row whose solution opens with a bold `**Note:**` is flawed as printed (SSC's
   print was unclear or wrong): never feature it, never build a rep on it. A row marked `IMG` carries a
   figure: view it at `scripts/ssc-cgl/figures/<shift id>/q<NNN>.png` (option pictures `q<NNN>-A.png`),
   where `SSC_CGL_T1_2025-09-18_S1` is shift id `t1-2025-09-18-s1` and NNN is the 3-digit question number.
2. **Re-cut into teaching pages** (NOTES_WORKFLOW step 0). Cut by TECHNIQUE into about 3-7 pages, in
   teaching order (foundations first; a page may only use what earlier pages taught). A page needs at
   least about 8 rows; fold a 1-5 row subtopic into the page whose technique it uses. A big page is fine
   when its rows share one method. Keep a current subtopic name when the page still fits it; otherwise
   use a short, plain Title Case noun phrase (new names are added to the catalog for you). Write the plan
   in the Probability plan's shape (`import type { ReshapePlan } from "../reshape";`), every row by its
   8-character id prefix, `expected` and `total` filled in, then run the dry run until it ends
   `DRY RUN COMPLETE`. Repeat blocks resolve themselves; add `extra` only if a refusal names a block.
3. **Write the pages** (one file per page plus `chapter.ts`), copying the Probability files' shape:
   - Subtopic slugs `ssc-<abbr>-<word>`, concept slugs `ssc<abbr><2 letters>-<word>` (e.g.
     `ssc-pp-discount`, `ssc-ppdi-successive`). Export names `SSC_<ABBR>_<PAGE>_NOTE` and
     `SSC_<CHAPTER>_CHAPTER` (CHAPTER = the slug in capitals with underscores).
   - `chapterName` is the exact DB chapter name; each `subtopicName` is the plan's exact target name.
   - 2-4 concepts a page, nearly all `kind: "formula"` (needs `authoredExample`); `kind: "reference"`
     (needs a `table`) only for genuine lookup facts (standard trig values, divisibility tests, squares).
     A formula-variant foundation concept may have no featured question and no tagged rows; every other
     concept needs both.
   - Every concept that has tagged rows features one of them (`pyqExampleId`, the FULL uuid from the
     `.json` dump), from its own page, never a flawed or disputed row. Prefer a 2025 row when one fits.
   - **Four rungs, four different problems:** worked example, self-check, practice reps and the featured
     question must all differ, and none may reuse the featured question's numbers or wording. Author
     the worked example first, from scratch.
   - Practice reps and self-checks are SELF-CONTAINED (no "the above", no "it"): each is lifted into a
     shuffled quiz alone. No practice rep may test a fact the page has not taught.
   - At least 12 traps per chapter (a short chapter: as many as it honestly has, at least one a concept),
     each stating the mistake and the right fact without pointing at another item.
   - Every number you write is re-derived. Every count you state (in `whyItMatters`, the intro) is
     counted from the plan with a one-line script, not estimated.
4. **The intro** (`chapter.ts`): the first sentence states a bank fact ("Percentage, Profit and Loss has
   326 questions in the SSC CGL Tier I bank, ..."); do not list the pages (the cards below it do); over
   260 characters, under 200 words.
5. **The tag map** `generated-papers/_tag-ssc-<abbr>.json`: `"dump": "_cdsk_ssc<abbr>.json"`,
   `"prefix": "ssc-<abbr>"`, `"expect"` = the chapter's PUBLIC rows, `subtopics` slug → plan target name,
   and `concepts` listing every row of the chapter exactly once, under a concept of the page its plan
   puts it on (flawed rows included: they are tagged, only never featured).
6. **The report** `generated-papers/_prep-ssc-<abbr>.md`: disputed keys and flawed rows (with
   derivations), solution errors, the page cut with counts, the featured row per concept, anything you
   are unsure of. Under 80 lines.

## Text rules (gates fail on these)

- Plain-text fields take NO LaTeX and no `**`: `title`, `oneLineDefinition`, `whyItMatters`,
  `concept.name`, `formula.label`, table `columns`. Use words or Unicode there.
- Maths elsewhere is `\\(...\\)` inside TS strings (double backslashes). Never `\\iff`. Money is `₹` or
  `Rs`; a literal dollar sign is `\\$`.
- **No em dashes, en dashes, " - " or " -- " used as dashes anywhere in the text.** Use a full stop, colon,
  comma or brackets. (A range like "6 to 15" is fine.)
- Simple English: short sentences, everyday words, the way a good teacher talks to a student.
- Fill every reference-table cell with a real value; drop a row rather than dash it.
- `definition` may use `- ` bullets and `**bold**`; `formula.latex` holds every recallable formula the
  concept teaches; a pure method stays out of `formula.latex`.

Final message (short): the files written, pages and concepts, disputed keys, and uncertainties.
