# NCERT Physics — WHOLE-CHAPTER agent brief (one agent, one chapter)

You take ONE NCERT Physics chapter from rendered pages to a committed, solved,
cross-checked corpus. Your task message gives you the **chapterId** and the **book
chapter number**. Everything else you read from the repo.

Repo root: `C:\Users\vilas\Downloads\Question_Bank`. Run every command from there.

> **This brief REPLACES orchestration, not the specialist briefs.** You must still read and
> follow `PHYSICS_TRANSCRIPTION_BRIEF.md`, `PHYSICS_SOLUTION_BRIEF.md` and
> `PHYSICS_CROSSCHECK_BRIEF.md` for the actual content rules of each step. Do NOT follow the
> Maths briefs (`TRANSCRIPTION_BRIEF.md`, `SOLUTION_BRIEF.md`, `CROSSCHECK_BRIEF.md`) — their
> ref convention is different and will corrupt your refs.

## WHERE YOU STOP — read this first

You run steps 1-8. **You do NOT write errata brackets and you do NOT flip anything PUBLIC.**
The answer-key cross-check is a gate whose findings are adjudicated by the maintainer, not by
the agent that produced them — on the pilot chapter that adjudication changed two of four
findings, so this separation is load-bearing. Your job ends when `<id>.crosscheck.json` exists
and your report is written. Everything you commit stays PRIVATE.

## THE ONE THING THAT SILENTLY RUINS A CHAPTER

**The chapter number is NOT the file number.** Physics numbers chapters continuously across
both parts while each part's files restart at `01.`. Your task message gives you the BOOK
chapter number — use it in every ref. The page confirms it: the running head, the section
headings, the equation numbers and the figure captions all carry the true number. If they
disagree with your task message, STOP and report it rather than guessing.

## Steps

### 1. Read your config entry
`scripts/ncert/config.ts`, the entry for your chapterId. It gives you `pdf`, `subtopics`
(the canonical list — every question must map to one VERBATIM), `answersPdf`, `answerPages`
and the source file name. Read the comment block above the Physics chapters too.

### 2. Render
```
npx tsx scripts/ncert/render.ts <chapterId>
npx tsx scripts/ncert/render.ts <chapterId> --answers
```
Pages land in `scripts/ncert/out/<chapterId>/p-NN.png`; the answer key in
`scripts/ncert/out/_answers/<chapterId>/ak-NN.png`. Skip either if the PNGs already exist.

### 3. Plan your bands, then transcribe
Find the exercise block first: it is the **LAST** standalone `EXERCISES` heading in the
chapter (page 0 carries a chapter-opening CONTENTS box that also says "EXERCISES" — that is
a table of contents, not the block).

Cut bands at **BLOCK boundaries, never arbitrary page ranges**: everything before the
exercise block is the worked-Examples band; the exercise block is its own band. Split further
only if a band exceeds ~20 pages.

Write `scripts/ncert/data/<chapterId>.band-a.json`, `.band-b.json`, … per
`PHYSICS_TRANSCRIPTION_BRIEF.md`. Refs are `Eg <n>.<m>` for worked Examples and
`Ex <n>.<m>` for exercise questions.

**Report on territory you do not own.** If a worked Example's printed solution runs across a
band boundary, or something looks like it belongs to no band, say so. A duplicate ref makes
`merge.ts` throw and announces itself; **a GAP is invisible to every gate in this pipeline**
and is simply a question that never ships.

Some chapters genuinely have NO worked Examples (measured: Class 11 Thermodynamics,
Oscillations and Waves each returned zero to a text probe). Verify from the pages and report
what you find — do not manufacture Examples, and do not assume the probe was right.

### 4. Merge
```
npx tsx scripts/ncert/merge.ts <chapterId>
```
It refuses duplicate refs and refuses any file whose rows lack a `bucket`+`stem`.

### 5. Commit (PRIVATE)
```
npx tsx scripts/ncert/commit.ts <chapterId>            # dry-run FIRST
npx tsx scripts/ncert/commit.ts <chapterId> --apply
```
The dry-run prints a `by subtopic` tally. **READ IT.** If one subtopic holds most of the
chapter, say so in your report — that is a `/browse` filter that does not filter, and on the
pilot chapter it forced a re-split from 4 subtopics to 5. Do NOT change `config.ts` yourself;
report it and let the maintainer decide.

It also refuses control characters in stem/context/solution — see the escaping section below.

### 6. Author the solutions
```
npx tsx scripts/ncert/dump-tosolve.ts <chapterId>
```
Author `{id, ref, solution}` into `scripts/ncert/data/<chapterId>.g1.solutions.json` following
`PHYSICS_SOLUTION_BRIEF.md`. For a large chapter use several files (`.g1.`, `.g2.`, …) — the
applier globs them.

**The pairing rule is a gate, not advice:** before applying, diff your `(id, ref)` PAIRS
against the dump — not the count, not the id set. An agent that drops a row and pads the tail
produces a permutation in which both of those still match and every solution lands on the
wrong question.

```
npx tsx scripts/ncert/apply-solutions.ts <chapterId>          # dry-run
npx tsx scripts/ncert/apply-solutions.ts <chapterId> --apply
```

### 7. Sections
```
npx tsx scripts/ncert/backfill-sections.ts <chapterId>          # dry-run
npx tsx scripts/ncert/backfill-sections.ts <chapterId> --apply
```
The outline is already authored for every Physics chapter. It must report **0 orphans**; if it
does not, your refs deviate from the convention — fix the refs, not the outline.

### 8. The answer-key cross-check (MANDATORY)
```
npx tsx scripts/ncert/dump-review.ts <chapterId>
```
Then follow `PHYSICS_CROSSCHECK_BRIEF.md` and write
`scripts/ncert/data/<chapterId>.crosscheck.json`.

The WHOLE answers region is rendered, covering several chapters — **find your `CHAPTER <n>`
heading and read only to the next one.** Skip the `Eg` rows: the key covers exercises only.
Report the number of rows you actually DIFFED separately from those you skipped.

Do not import the NCERT-Maths "keys are rarely wrong" prior. Measured on the first Physics
chapter gated: 3 genuine key errors + 1 book-internal inconsistency in 18 rows.

### 8b. MCQs — blind key verification AND a solution (only if your chapter has any)

Most NCERT Physics chapters have ZERO MCQs, so this step is usually a no-op. Check first:
if `commit.ts`'s dry-run reported `format: mcq=N` with N > 0, do this.

An MCQ row commits with a DERIVED answer and NO solution. Both halves need work.

**And step 6 CANNOT reach them, by construction** — `dump-tosolve.ts` filters
`question_format='subjective'`, so an MCQ id never appears in the tosolve dump, and
`apply-solutions.ts` then REFUSES any id absent from that dump. That is the pairing gate doing
its job, not a bug to route around: an MCQ needs its key re-derived blind as well as a
solution written, which is a different job from authoring a free-response answer. The MCQ path
below is how those rows get both. (`apply-solutions` does pick the solution up from the
verify file — it reports "updated solution on N mcq row(s)" — so run it again after this step.)

**READ `scripts/ncert/MCQ_VERIFY_BRIEF.md` — it is the contract for this step and it carries
rules the solution brief does not.** In particular the `solution` you write here goes straight
onto the question row and SHIPS TO STUDENTS, so it needs LaTeX `\(...\)` for all math and must
NEVER name an option by letter (the standing `audit:keys` probe reads a named letter as the
concluded answer and fires a false SOLN-vs-KEY). A past run briefed only on the schema
produced 27 of 29 solutions naming letters and needed a rewrite pass.

```
npx tsx scripts/ncert/dump-mcq.ts <chapterId>
```
writes `data/<chapterId>.mcq-blind.json` — stems and options with **no** `is_correct`, so the
derivation is genuinely blind. Solve each from scratch, then write
`data/<chapterId>.blind.mcq-verify.json` as
`[{ id, ref, derived_answer: "A|B|C|D", solution }]` — the field is **`derived_answer`**, not
`answer`. Then:
```
npx tsx scripts/ncert/mark-mcq-verify.ts <chapterId>
```
which compares your letter against what was committed and records the result.

**Report agreement or mismatch — never silently re-key.** A mismatch is a finding for the
maintainer, not something you fix.

The `solution` half is not optional: an MCQ with a correct letter and no working ships a
student an answer they cannot learn from, and this project has already shipped that defect
once — 22 PUBLIC MCQ rows in the Class-12 Integrals chapter had a correct key and no
solution, found only by a later count.

Then say in your report how many MCQs the chapter has, whether the blind pass agreed, and
that each carries a solution. **If your chapter has MCQs, say so prominently** — the exam's
`EXAM_REGISTRY.mixedFormats` flag has to be set the moment any of them goes PUBLIC, and that
is the maintainer's change, not yours.

## Figures

If any exercise question reads data off a printed figure, it is unanswerable from its stem
and needs a crop. Put `_figure: {fig, page}` on the row at transcription time (page = the
0-based page the FIGURE is on, which is not always the question's page), then:

1. Write `scripts/ncert/data/<chapterId>.fig.json` — `[{"ref": "Ex 9.15"}, …]`
2. Write `scripts/ncert/data/<chapterId>.fig.anchors.json` — one entry per ref:
   `{ref, page, col:[x0,x1], top, bottom, answerY}`, all FRACTIONS of the page (y increases
   downward). `col` is the rough column band (generous is fine); `top`/`bottom` are points in
   the WHITESPACE GAPS above and below the figure; `answerY` is the hard ceiling where the
   next question's text begins — that is the one value you must get right.
3. `npx tsx scripts/ncert/snap-crop.ts <chapterId>` then, when it reports all ok,
   `... --write`
4. `npx tsx scripts/ncert/attach-images.ts <chapterId>` (dry-run) and **LOOK at the cropped
   PNGs with the Read tool.** Geometry cannot catch a wrong ceiling. Check the caption is
   included (stems cite figures by number) and no neighbouring text leaked in.
5. `npx tsx scripts/ncert/attach-images.ts <chapterId> --apply`

Include the figure crops in your report.

## ESCAPING — this has corrupted real work, including the maintainer's

Author every file with the **Write tool**. Never a shell heredoc, never `python -c`.

A shell layer eats one backslash level, so `\text{cm}` becomes **TAB + "ext{cm}"** — and that
is invisible to almost every check: the JSON still parses, the `\(…\)` delimiters still
balance, and a control-character scan that treats TAB as benign whitespace cannot see it.
`\t \b \f \v` are ALL valid LaTeX command starts (`\text`, `\beta`, `\frac`, `\vec`), so this
is systematic. `commit.ts` and `apply-solutions.ts` both refuse it now — but fix it at the
source, and **write your own verification scripts as FILES too**, or the probe corrupts
itself and reports a false alarm on clean data. That has happened repeatedly.

In JSON a LaTeX backslash is written `\\`, so `\(` is `"\\("`. Four backslashes before a
parenthesis is a double-escape and renders as a stray mark.

## Working rules for a parallel wave

- **Namespace your scratch files.** Several agents are working at once in the same repo and
  the same scratchpad. Prefix anything temporary with your chapterId. A generically-named
  script WILL be overwritten by a sibling, and a previous run had an agent unknowingly report
  on a different chapter's data because of exactly this.
- **Touch only your own chapter's files.** Never edit `config.ts`, `sections.ts`, any brief,
  or another chapter's data. If you believe one needs changing, report it.
- **Do NOT run `git add`, `git commit`, or any git command.** The maintainer stages by
  explicit path; a stray `git add` sweeps other agents' in-flight files into a commit.
- **Do not run the full test suite or `npm run prepush`** — they are slow and are the
  maintainer's gate, not yours.
- If a step fails, report the failure with its actual output. Do not work around a gate: the
  gates encode defects that have already shipped once.

## Your final report

- Row counts by bucket, and the `by subtopic` tally with any lopsidedness called out
- The exact set of worked Example numbers found, and the first/last exercise number
- Cross-check tally by verdict + the honest diffed denominator, with a one-line justification
  for every non-AGREE row and what independent route supports it
- Every `_note` flag (printed defects, stale cross-references, ambiguous stems)
- Figure refs and whether you eyeballed the crops
- Anything that appears to belong to no band, and anything you could not resolve
