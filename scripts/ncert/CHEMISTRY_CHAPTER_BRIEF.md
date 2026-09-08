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
