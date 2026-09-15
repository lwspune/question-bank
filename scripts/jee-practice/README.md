# JEE (Mains) practice ingestion — SGIMA booklets

Vision-transcription pipeline for the **SGIMA** (Sanjay Ghodawat IIT & Medical
Academy) printed Maths practice booklets → the bank as **JEE Mains,
`question_kind='practice'`, PRIVATE-then-PUBLIC**. These are NOT past-year
questions; per-exam dedup (migration 0038) keeps them isolated from the JEE PYQ
corpus.

## Source shape

Scanned image PDFs (no text layer, two-column, ~200 DPI) under
`C:\Vilas\LWS_Pune\JEE_Mains\Maths\Practice\`. Each booklet is a **Volume**; each
chapter is laid out as:

- **SYNOPSIS** — theory + formulae + **Worked Examples** (`W.E-N` with `Sol:`) →
  ingested as **subjective** rows carrying the booklet's solution.
- **LEVEL-I / LEVEL-II (H.W) / LEVEL-III / LEVEL-IV …** — MCQ exercise sets
  (options printed `1) 2) 3) 4)`), each followed by a **`LEVEL-N-KEY`** block
  (`01) 4  02) 1 …`, option NUMBER 1–4 → mapped positionally to A–D) and a
  **`LEVEL-N-HINTS`** block (brief method hints; not ingested).

## Record model

- MCQ ref = `Lvl <level> Q<n>` (e.g. `Lvl II Q13`); answer resolved from that
  level's KEY block by within-level number `n`.
- W.E ref = `W.E-<n>`; subjective, solution = the booklet's worked answer.
- Difficulty defaults by level (I→EASY, II→MODERATE, III/IV→HARD; W.E→MODERATE)
  unless a transcribed record sets its own.
- Every record's `subtopic` must be one of the chapter's canonical subtopics
  (config.ts), verified at commit.

Pure core: `lib.ts` (`parseKeyBlock` + a `JQ → SBQuestion` adapter that delegates
row assembly to the State Board `buildRecords`), tested in
`tests/jee-practice-lib.test.ts`.

## Runbook (per chapter)

```sh
# 1. render the chapter pages → out/<id>/p<idx>_<L|R>.png (two-column split)
npx tsx scripts/jee-practice/render.ts <chapterId>

# 2. vision-transcribe (≤3 agents/batch — session-limit cap). Each agent writes a
#    fragment data/<id>.<part>.json (a Fragment):
#      LEVEL file:  { level, keyBlock, questions: JQ[] }   (MCQ + the KEY block verbatim)
#      W.E file:    { questions: JQ[] }                     (worked examples)

# 3. merge fragments → data/<id>.merged.json  (dup-ref / dup-KEY report)
npx tsx scripts/jee-practice/merge.ts <chapterId>

# 4. commit PRIVATE (dry-run first; --apply to write). Reports coverage warnings,
#    flags, LaTeX imbalances (hard-stops on imbalance).
npx tsx scripts/jee-practice/commit.ts <chapterId>
npx tsx scripts/jee-practice/commit.ts <chapterId> --apply

# 5. VERIFY before PUBLIC: blind-re-derive a sample of MCQ keys, spot-check the
#    positional key mapping, scan for markdown/LaTeX leaks. (Coaching keys can err
#    — the Pariksha lesson; also verify option ORDER matches the printed paper.)

# 6. flip PUBLIC (both MCQ-with-key and subjective-with-solution ship)
npx tsx scripts/jee-practice/flip-public.ts <chapterId> --apply
#    hold a row under review: --except="Lvl II Q13,W.E-3"
```

Rollback: `delete from questions where exam_id='56360311-614d-43ea-9cd9-8ca8178dd679' and source_file='<sourceFile>'` (cascades options).

## Re-commit hazard

Editing a stem/option/answer changes `content_hash` → re-running `commit` INSERTS
+ orphans the old row (the shared stateboard/practice/foundation hazard). To fix
after commit: delete the source's rows, then re-commit. Editing only `solution`
text is safe.

## Figures

The pilot (Compound Angles) is text-only. Figure-bearing chapters (conics,
vectors, 3D, calculus graphs) attach diagrams via the shared snapCrop figure
pipeline (`scripts/lib/figures/`) — deferred until a figure chapter is ingested.
