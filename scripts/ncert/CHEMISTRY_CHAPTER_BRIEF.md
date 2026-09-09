# NCERT Chemistry — WHOLE-CHAPTER agent brief (one agent, one chapter)

You take ONE Chemistry chapter from rendered pages to a committed, solved, sectioned,
cross-checked set of PRIVATE rows. Your task message gives you the **chapter id**.

## WHERE YOU STOP — read this first

You run steps 1-8. **You do NOT write errata brackets and you do NOT flip anything PUBLIC.**
The cross-check is a gate whose findings are adjudicated by the maintainer, not by the agent
that produced them — on the pilot chapter that adjudication changed a published answer and
added two brackets. Your job ends when `<id>.crosscheck.json` exists and your report is
written. Everything you commit stays PRIVATE.

## THE THREE THINGS THAT SILENTLY RUIN A CHEMISTRY CHAPTER

1. **THERE IS NO CHAPTER-NUMBER OFFSET.** Chemistry's files are already numbered by book
   chapter (Cl-11 Part_2 = `07.`-`09.`, Cl-12 Part_2 = `06.`-`10.`). The Physics brief's
   "THE CHAPTER NUMBER IS NOT THE FILE NUMBER" section is **FALSE here** — applying its
   `+7/+8` mis-refs every row and points the cross-check at another chapter's key.

2. **TWO STREAMS SHARE ONE NUMBERING NAMESPACE.** Intext Questions and Exercises are BOTH
   numbered `N.1, N.2, …`, so a bare "1.5" names two different questions. Refs MUST carry
   the stream: `Eg N.n` / `Intext N.n` / `Ex N.n`. Decide by WHICH HEADING the question sits
   under, never by its number.

3. **THE TEXT LAYER IS ARITHMETICALLY LOSSY.** Delta extracts as a Latin `D` in Cl-12 and
   vanishes in Cl-11; the radical occurs ZERO times in either book. **And the glyph fault
   reaches the RENDERED PAGE too** — one pilot example prints delta as `Ä`. Transcribe from
   images, and where a glyph is wrong on the page use the chemistry to disambiguate.

## ⚠ IF YOUR CHAPTER IS CLASS 11 — read this instead of the "two streams" rule above

Class 11 Chemistry has **NO Intext stream at all** (verified across all nine chapters). So:

- **Two blocks, not three** — Worked Examples + Exercises. `sections.ts` already carries
  yours; do not add a third.
- **Refs are `Eg N.n` and `Ex N.n` only.** There is no numbering collision to defuse,
  because there is no second N-numbered stream.
- **The worked examples are headed `Problem N.n`, not `Example N.n`.** Same thing, same
  `Eg N.n` ref. A scan for "Example" finds nothing and reads as a chapter with no worked
  examples.
- **ONE key file, and it is the end-of-book one** — `kech1an.pdf` for Part 1 chapters,
  `kech2an.pdf` for Part 2. Your `answerPages` are already measured; read the block to its
  LAST entry as usual.

### THE KEY IS PARTIAL PER QUESTION, AND THE PAGE SPAN BADLY OVERSTATES IT

A `answerPages: [0, 1, 2]` looks like full coverage and is not. Measured per chapter:

| chapter | exercises keyed |
|---|---|
| ch1 Basic Concepts | 17 of 36 |
| ch2 Structure of Atom | 66 of 67 |
| **ch3 Periodicity** | **0 — NO key block exists** |
| **ch4 Bonding** | **0 — NO key block exists** |
| ch5 Thermodynamics | 22 of 22 |
| ch6 Equilibrium | 62 of 73 |
| **ch7 Redox** | **1 of 30** |
| **ch8 Organic Basics** | **4 of 40** |
| ch9 Hydrocarbons | 25 of 25 |

**COUNT KEY COVERAGE OFF THE RENDERED PAGE, NOT THE TEXT LAYER.** The ch9 row above read "22 of 25" until a chapter agent checked it: that key draws several answers as STRUCTURES, and the text layer drops those entry numbers entirely, so a `get_text()` scan under-reports. It can also OVER-report - the same scan finds 68 entries in a 67-question unit. Where a number decides whether the compensating regime is owed, render the page.

**A row with no key entry is NO-KEY-ENTRY, not a defect and not a pass.** Report your
diffed denominator as the KEYED count, never the chapter total — "0 wrong across 22 keyed"
is a different claim from "across 73".

### THE COMPENSATING REGIME — owed on ch3, ch4, ch7 and ch8

Those four chapters have essentially no external check (~150 exercises between them), so
the step-6 gate cannot carry the weight. If yours is one of them, do BOTH of these and say
so in your report:

1. **Author every answer strictly from the chapter's own prose**, and where the chapter
   does not state something, SAY SO in the answer rather than supplying a remembered fact.
   A fluent invention is the failure mode here, not a wrong number.
2. **After `apply-solutions`, run an independent blind re-derivation of your MCQ keys**
   (`dump-mcq.ts` → `MCQ_VERIFY_BRIEF.md` → `mark-mcq-verify.ts`). If your chapter has no
   MCQs, say that plainly rather than reporting a pass you did not run.

### TRANSCRIBER HAZARDS SPECIFIC TO CLASS 11 — all silent

- **Every top-level heading RENDERS IN ALL CAPS regardless of typed case**, so text-layer
  casing carries no information. `config.ts` holds the normalised Title-Case subtopic
  names; use those VERBATIM and do not "correct" them from the page.
- **ch5's delta extracts as U+2206 INCREMENT, not U+0394.** A search for the Greek letter
  finds nothing.
- **`Problem 8.2` splits across two spans**, so a span-level count under-reads ch8 by one.
- **§9.5 is printed SINGULAR — "AROMATIC HYDROCARBON".** Verified on a render. Do not
  pluralise it; the config list matches the page.

### DO NOT RUN `seed-subject.ts`

The `Chemistry` subject under `cbse-11` is seeded ONCE by the maintainer immediately before
the wave. Running it yourself races every other agent in the wave. If `commit.ts` fails
saying the subject is missing, STOP and report it rather than seeding.

## Steps

### 1. Read your config entry
`scripts/ncert/config.ts`, your chapter id. It carries the source paths, the answer pages and
the **canonical subtopic list** — every row you write must use one of those names VERBATIM.
An off-list subtopic auto-creates a duplicate on commit and is invisible afterwards.

### 2. Render
```
npx tsx scripts/ncert/render.ts <chapterId>
npx tsx scripts/ncert/render.ts <chapterId> --answers
```

### 3. Plan your bands, then transcribe
Follow `CHEMISTRY_TRANSCRIPTION_BRIEF.md` (which is a delta on
`PHYSICS_TRANSCRIPTION_BRIEF.md` — read both).

**Cut bands at BLOCK boundaries, never at arbitrary page numbers**, and state in each band's
plan what it owns. A block that continues past a band edge is invisible to every downstream
gate. On the pilot, one Intext block was headed **"Intext Question" — SINGULAR** because it
held a single item; an agent scanning for the plural would have dropped it silently. Read
every page in order rather than scanning for heading strings.

Write `data/<id>.band-<x>.json` per band, and **write early, updating as you go**.

### 4. Merge
```
npx tsx scripts/ncert/merge.ts <chapterId> band-a band-b ...
```
Name the fragments explicitly, in book order.

### 5. Commit (PRIVATE)
```
npx tsx scripts/ncert/commit.ts <chapterId>            # dry-run FIRST
npx tsx scripts/ncert/commit.ts <chapterId> --apply
```
**Diff the dry run's `by subtopic` tally against your config list before applying.** A
subtopic that receives no rows is usually correct (the book may set no questions on it), but
a subtopic you INVENTED shows up here and nowhere else.

### 6. Author the solutions
```
npx tsx scripts/ncert/dump-tosolve.ts <chapterId>
```
Follow `CHEMISTRY_SOLUTION_BRIEF.md`. Write `data/<id>.g1.solutions.json` (add g2, g3 … if
you split by subtopic), then:
```
npx tsx scripts/ncert/apply-solutions.ts <chapterId>          # dry-run
npx tsx scripts/ncert/apply-solutions.ts <chapterId> --apply
```
**Diff the (id, ref) PAIRS against the dump, not the count and not the id set.** On the pilot
this caught a placeholder row with a fabricated id while the count matched 14 vs 14.

**DO NOT open either key while authoring.** An answer bent toward the book cannot disagree
with it, so the gate it feeds learns nothing.

**⚠ CROP THE LAST PAGE BEFORE YOU READ IT — the intext key usually shares a page with the
tail of the Exercises.** Measured on wave 2: THREE of four chapters (ch4, ch5, ch9) print
"Answers to Some Intext Questions" on the same page as the last few exercise questions, so
transcribing those questions in page order necessarily puts the key on screen before you
author anything. ch8 avoided it by rendering that page clipped above the key's heading,
computing the cut from the heading's own y-coordinate. Do that.

**The page is not the only route in. ANY whole-PDF probe can print the key into your context** —
a text-layer heading scan run while planning bands did exactly that on two chapters, dumping
two intext answers before either was authored. Scope every structural probe to the pages you
are about to transcribe, or filter its output; a probe that reads the whole file is as
contaminating as opening the key.

If it happens anyway, **DECLARE it** — say which rows are therefore not blind and which
remain so. Every agent that hit this declared it unprompted and scoped it precisely, and that
is the behaviour wanted: an honest contamination note is worth more than a clean-looking
claim, because a reader who does not know the intext AGREEs are weak evidence will over-trust
them. Do not pretend to a blindness you did not have.

**MCQ ROWS NEED A SOLUTION TOO, AND NOTHING WILL TELL YOU IF THEY LACK ONE.**
`apply-solutions` fills SUBJECTIVE rows only — its own output says so — so an
`exercise-mcq` row can end up with a correct key and no working. No gate catches it:
`board:lint` checks structure, `audit:keys` skips rows with no solution, and a NULL solution
is legal. This repo shipped exactly that once (NCERT Integrals, 22 rows). Before you finish,
run:
```sql
-- expect 0
select count(*) from questions q ... where q.question_format='mcq' and q.solution is null
```
and if your chapter has MCQs, put them through `dump-mcq.ts` → `MCQ_VERIFY_BRIEF.md` →
`mark-mcq-verify.ts` so they carry both a verified key and a student-facing solution.

### 7. Sections
Add your chapter's outline to `scripts/ncert/sections.ts` if it is absent — three blocks for
a Class-12 chapter (Worked Examples / Intext Questions / Exercises), two for Class 11 (which
has no Intext stream). Then:
```
npx tsx scripts/ncert/backfill-sections.ts <chapterId>          # dry-run: expect 0 orphans
npx tsx scripts/ncert/backfill-sections.ts <chapterId> --apply
```

### 8. The answer-key cross-check (MANDATORY)
```
npx tsx scripts/ncert/dump-review.ts <chapterId>
```
Follow `CHEMISTRY_CROSSCHECK_BRIEF.md`. **There are TWO keys, one per stream** — the
end-of-book `*an.pdf` for Exercises, and the chapter's own last page for Intext. Both are
partial. Match a row to a key entry WITHIN ITS STREAM; crossing them manufactures findings
that look real.

**READ EACH KEY TO ITS LAST ENTRY, NOT ITS FIRST PAGE.** The in-chapter intext key spans TWO
pages in ch6, ch7 and ch8 (measured across all ten Class-12 chapters; the rest are
single-page). A page-scoped read on ch6 would have lost **6 of its 9 entries**, and nothing on
the page signals the loss — the rows simply come back NO-KEY-ENTRY, which looks like a normal
result rather than a failure. The same applies to the end-of-book key, where several UNITs
share a page: find your `UNIT <n>` heading and read to the NEXT one, across a page break if
the block continues.

Write `data/<id>.crosscheck.json`. Report the diffed denominator **per stream separately**,
and never count the worked examples — they print their own solutions and are outside the gate.

If your chapter has no key at all (Cl-11 ch3, ch4; Cl-12 ch10), say so plainly and record
every row as `NO-KEY-ENTRY` rather than inventing a comparison.

## Escaping — this has corrupted real work, repeatedly

Write every JSON with the **Write tool**. A shell heredoc or `python -c` eats one backslash,
turning `\Delta` into a TAB + "elta" — and on this lane it has hit agents' own VALIDATION
PROBES more often than their data, producing false alarms on clean files. Put probes in FILES
too, and **prove a probe can go red before trusting it green**: on the pilot one checker
reported "0 math zones" because it filtered on the wrong field names and was silently
verifying nothing.

## ⚠ DO THE WORK YOURSELF — do not delegate the bands to sub-agents

**Transcribe your own bands.** Do not spawn sub-agents for them.

This is not a style preference, it is a lifecycle fact that has already cost two stalls on one
chapter: **your turn ends as soon as you have no live children**, and that fires while you are
waiting for them. The chapter then sits half-transcribed with no merge, and needs a human to
notice and resume you. On the first occurrence exactly two of four bands existed, one of them
a 744-byte stub.

A chapter here is 22-47 pages. Reading it yourself, in order, is well within one agent's
reach — and it is what catches the things a band split hides: a block continuing past a page,
an "Intext Question" heading printed SINGULAR because it holds one item, a `Problem 8.2` split
across two spans. Band your own reading if it helps you keep track; just do not hand a band to
another agent.

If you have already spawned children before reading this: do not wait on them. Check what is
on disk, verify it rather than trusting that a file exists (a file being present is not
evidence its author finished — check refs, ranges and bucket/solution agreement), and
transcribe whatever is missing or stubbed yourself.

## Working rules for a parallel wave

- Other agents are working in `scripts/ncert/data/` at the same time. **Touch only your own
  chapter's files.** If you spot a defect in another chapter's file, REPORT it — do not edit
  it — and know that what you are reading may be an in-flight draft rather than a finished
  file. On the pilot exactly this produced two false defect reports.
- Namespace any scratch file with your chapter id. `_tmp_*` is gitignored.
- `config.ts` and `sections.ts` are SHARED. If you must edit `sections.ts`, add only your own
  chapter's block and re-read the file immediately before writing.

## Your final report

Give: rows committed by stream (worked / intext / exercise); the subtopic tally; the
cross-check tally with **the diffed denominator per stream**; every non-AGREE row with a
one-line justification; any `_note` you attached; and anything you saw on a page you do not
own. A stranded block or a defect in a neighbour's territory is invisible to the maintainer
unless you say so.
