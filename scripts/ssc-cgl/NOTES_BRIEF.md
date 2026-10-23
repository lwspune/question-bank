# SSC CGL Tier I /notes: the draft agent's brief

One agent drafts the notes for one SSC CGL Tier I chapter (or a few small ones), in any subject but
Current Affairs. **It reads and drafts; the
main session decides and writes.** The method is NOTES_WORKFLOW.md (sections 0, 1, 1b) and the eight
defect classes of NOTES_ARC_LEDGER.md. This file is the contract.

Work in `C:\Users\vilas\Downloads\Question_Bank` (the main session's checkout; other agents write other
chapters in it at the same time). Your chapter's row is in `scripts/ssc-cgl/notes-manifest.json`
(subject, DB chapter name, URL slug `<slug>`, `abbr`); `routes[<subject>]` gives the notes route
`<route>` (Maths `ssc-cgl-maths`, Reasoning `ssc-cgl-reasoning`, History `ssc-cgl-history`, ...). Its dump is `generated-papers/_cdsk_ssc<abbr>.md`
(readable: id prefix, shift, Q#, difficulty, current subtopic, stem, options with the key starred,
solution) and `.json` (full ids).

**Keep tool output small.** Read files in chunks of about 150 lines. Never `cat` a whole dump.

## What to read first

- **Shape** (copy it exactly): SPI Probability, `src/app/notes/spi-maths/probability/_data/*`, and
  its plan `scripts/spi/reshape/probability.ts`. The tag map's shape is `generated-papers/_tag-cds-av.json`.
- **SSC conventions** (slugs, intro, tag map): the shipped SSC chapters, e.g.
  `src/app/notes/ssc-cgl-maths/averages/_data/*`, `scripts/ssc-cgl/reshape/averages.ts` and
  `generated-papers/_tag-ssc-av.json`. Read them; do not copy their prose.
- **Scratch files** go in a folder of your own, `generated-papers/_work-ssc-<abbr>/`, never a shared
  scratchpad: agents running at once have overwritten each other's helper scripts.
- **Topic checklist**: the twin chapter on another exam, named in "By subject" below. Use it to see
  what the chapter must cover. **Do not copy its sentences, examples, tables or traps.** These are
  separate pages that search engines compare; write every sentence yourself, for SSC. The main session
  runs an overlap check against the twin.
- **Your subject's section** under "By subject" below: it overrides the general rules where they differ.

## SSC CGL facts you may state

- Tier I: 100 questions in 60 minutes, four parts of 25 (Reasoning, General Awareness, Quantitative
  Aptitude, English), +2 for a right answer and −0.5 for a wrong one. That is about 36 seconds a question.
- The bank holds every readable Tier I shift of 2023, 2024 and 2025 (113 shifts), read from SSC's own
  response sheets. Every row is a real past question, so "PYQ" and "asked in SSC CGL" are true of all of
  them. The 2025 key is SSC's provisional key.
- Nothing else about SSC (cut-offs, posts, Tier II weight) unless you can count it from the dump.

**SSC rewards speed.** For every technique (Maths and Reasoning; for English and GK see "By subject"), teach the full method AND the fast route a strong student
uses (fractions for percentages, the product-over-sum rule for work, LCM units, ratio scaling, option
elimination, the substitution trick for identities, standard triangle values). State when the shortcut
is safe and when it breaks: a shortcut with no limit stated is a trap, not a method.

## Hard limits

- Write ONLY: `scripts/ssc-cgl/reshape/<slug>.ts`, `src/app/notes/<route>/<slug>/_data/<page>.ts`
  and `chapter.ts` (no `index.ts`, no route pages: the main session's register step writes those),
  `generated-papers/_tag-ssc-<abbr>.json`, `generated-papers/_prep-ssc-<abbr>.md`, and anything under
  `generated-papers/_work-ssc-<abbr>/`.
- Never: `--apply`, any DB write, `tag-chapter.ts`, git (not even `git status`), the transcripts,
  `build.ts` or `repair.ts`, `src/lib/notes/chapters.ts`, any other folder,
  any other chapter's files.
- Read-only commands are fine: the dry run `npx tsx scripts/ssc-cgl/reshape.ts scripts/ssc-cgl/reshape/<slug>.ts`
  and, once at the end, `npx tsc --noEmit -p .` (only errors in YOUR files matter).

## Per chapter, in order

1. **Read every row and its solution.** Solve every key yourself, as printed. List in the report any
   row whose key you dispute (with the full derivation), any row flawed as printed, and any solution
   with a real error. A row whose solution opens with a bold `**Note:**` is flawed as printed (SSC's
   print was unclear or wrong): never feature it, never build a rep on it. Also report, by id: a row
   that is impossible or ambiguous as printed but has NO Note (two readings that land on two printed
   options, a premise no value satisfies, a cut-off stem), and a solution whose working reaches a
   different option from its key. The first seven chapters turned up eight such rows. A row marked `IMG` carries a
   figure: view it at `scripts/ssc-cgl/figures/<shift id>/q<NNN>.png` (option pictures `q<NNN>-A.png`),
   where `SSC_CGL_T1_2025-09-18_S1` is shift id `t1-2025-09-18-s1` and NNN is the 3-digit question number.
2. **Re-cut into teaching pages** (NOTES_WORKFLOW step 0). Cut by TECHNIQUE into about 3-7 pages, in
   teaching order (foundations first; a page may only use what earlier pages taught). A page needs at
   least about 8 rows; fold a 1-5 row subtopic into the page whose technique it uses. A big page is fine
   when its rows share one method. Keep a current subtopic name when the page still fits it; otherwise
   use a short, plain Title Case noun phrase (new names are added to the catalog for you). Write the plan
   in the Probability plan's shape (`import type { ReshapePlan } from "../reshape";`), with `subject:` set to
   the exact DB subject name (Maths plans omit it), every row by its
   8-character id prefix, `expected` and `total` filled in, then run the dry run until it ends
   `DRY RUN COMPLETE`. Repeat blocks resolve themselves; add `extra` only if a refusal names a block.
3. **Write the pages** (one file per page plus `chapter.ts`), copying the Probability files' shape:
   - Subtopic slugs `ssc-<abbr>-<word>`, concept slugs `ssc<abbr><2 letters>-<word>` (e.g.
     `ssc-pp-discount`, `ssc-ppdi-successive`). Export names `SSC_<ABBR>_<PAGE>_NOTE` and
     `SSC_<CHAPTER>_CHAPTER` (CHAPTER = the slug in capitals with underscores).
   - `chapterName` is the exact DB chapter name; each `subtopicName` is the plan's exact target name.
   - 2-4 concepts a page. `kind: "formula"` (needs `authoredExample`) teaches a method; `kind: "reference"`
     (needs a `table`) teaches named facts. Maths and Reasoning are nearly all formula concepts; English
     and GK mix them as "By subject" says.
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
- A `formula.symbols` entry's `symbol` is plain words or wrapped maths (`"\\(\\bar{x}\\)"`), never a
  bare macro (`"\\bar{x}"` fails notes:latex).
- Never put a year directly before a count noun: "Eight 2024 questions" reads to the count gate as a
  claim of 2024 questions. Write "eight questions from the 2024 shifts".
- A table inside a prompt (worked example, self-check, practice rep) is a GFM pipe table with its
  `|---|` separator row; the page and the print view both render it.
- Maths elsewhere is `\\(...\\)` inside TS strings (double backslashes). Never `\\iff`. Money is `₹` or
  `Rs`; a literal dollar sign is `\\$`.
- **No em dashes, en dashes, " - " or " -- " used as dashes anywhere in the text.** Use a full stop, colon,
  comma or brackets. (A range like "6 to 15" is fine.)
- Simple English: short sentences, everyday words, the way a good teacher talks to a student.
- Fill every reference-table cell with a real value; drop a row rather than dash it.
- `definition` may use `- ` bullets and `**bold**`; `formula.latex` holds every recallable formula the
  concept teaches; a pure method stays out of `formula.latex`.

Final message (short): the files written, pages and concepts, disputed keys, and uncertainties.

## By subject

**Reasoning** (route `ssc-cgl-reasoning`). Shape and SSC conventions as above. Twin: SPI Reasoning for
Series, Classification and Order and Ranking (`src/app/notes/spi-reasoning/<slug>/_data/*`); no other
exam here has Reasoning notes, so the other chapters have no twin and you build the topic list from the
rows. Every concept is a method: name the rule-finding order a strong student tries (differences, then
ratios, then squares and cubes, then alternate terms; letter positions forward and backward), the
shortcut tables (A1 to Z26, the reverse positions, opposite-letter pairs adding to 27, EJOTY), and option
elimination. Figure chapters (Non-Verbal, Mirror and Water Images, Paper Folding, Dice and Cubes,
Embedded Figures, Figure Counting): the featured question shows SSC's own picture, so feature freely, but
**never draw or describe a figure of your own as if it were a picture**. Write your worked examples,
self-checks and reps in words and letters only (the mirror image of a word or clock time, the opposite
faces from a list of four views written as text, how many triangles a described figure has when the
description is complete). A rule that only a picture can teach goes in `definition` as a numbered
procedure.

**English** (route `ssc-cgl-english`). Twins: CDS English and SPI English (same chapter slugs under
`src/app/notes/cds-english/` and `src/app/notes/spi-english/`); the bank's subtopics are already CDS
English's teaching cut, so keep them unless a page is under ~8 rows or holds two methods. Rules (agreement,
voice, narration, articles, prepositions) are formula concepts with an authored example and an empty or
absent `formula.latex`; word lists (idioms, one-word substitutions, spellings, synonym and antonym groups,
homophones) are reference concepts whose tables carry words SSC actually asked, counted from the dump.
A reference table has at most 5 columns. Teach the speed move for English too: read the blank's slot
before the options, eliminate by grammar first and meaning second.

**General Awareness: History, Geography, Polity, Economics, Biology, Chemistry, Physics** (routes
`ssc-cgl-<subject in lower case>`). Twin: the CDS chapter on the same topic; find it with
`grep -l 'chapterName: "<DB chapter name>"' src/app/notes/cds-*/*/_data/chapter.ts` (the names often
match exactly). These are recall subjects: most concepts are reference concepts with a `table` (History
in time order); formula concepts only for a real law or method (Ohm's law, lens formula, a GDP measure).
Every fact you state must be one you are sure of from NCERT or a standard book; check each against the
rows' solutions, and when they disagree, say so in the report rather than choose. **Never call an office
holder, record or ranking "current"**: write it with its year ("in 2024 ..."). The keys are SSC's own
(2025 provisional), and our blind derivation was compared with them at ingest; still solve every row
and report any you dispute.
