# MH State Board Class 10 (SSC) — board-PYQ ingestion

The **first real board-PYQ** State Board corpus. Class 10 IS a board year, so the
source is actual past-year **board question papers** (`question_kind='pyq'`, exam
`mh-ssc-10`, **not** practiceOnly) — unlike the textbook-exercise pipelines
(`mh-hsc-12`/`mh-sb-9`/`cbse-12`, all practice-only).

- **Source:** board QP PDFs under `SOURCE_ROOT` (see `config.ts`). **Most are pure
  RASTER scans**, no text layer → **VISION-only** transcription (like `scripts/neet`
  + `scripts/cds`). **But not all** — see "Check for a text layer" below.
- **No answer key** (board QPs never ship one). MCQ keys are **DERIVED**,
  subjective model answers are **AUTHORED**, every one **REVIEW-flagged** in the
  data JSON (`reviewFlag: true`) — the CDS-English precedent: derive → publish →
  human spot-check.
- **English medium, Max 40.** `Q1(A)` MCQ block (Maths 4 / Science 5) →
  `question_format='mcq'`; `Q1(B)` onward subjective → `question_format='subjective'`.
- **Internal choice** ("attempt any two of four") → ingest **all** sub-questions
  independently. **"Complete the activity"** fill-in-the-blanks → fill the blanks.
- **Figures** (Geometry-heavy) → crop-and-attach via the shared snapCrop + verify
  gate (`scripts/lib/figures/`); never trust an agent's self-verify of its own crop.

## ⚠ Check for a text layer before assuming VISION-only

Some papers in this corpus are **born-digital typeset reproductions**, not scans —
they carry a real text layer (the Science II back-years 2016–2022 are all like
this; 2019 is a fully re-typeset colour edition). For those, transcription is a
**hybrid**: the text layer is ground truth for wording / options / numbering, and
the rendered PNGs are still required for figures, flow-charts, boxed "complete the
chart" activities, tables and reading order.

Always run `dump-text.ts` first and look at the char count. ~0 chars ⇒ scan ⇒
vision-only. A few thousand chars ⇒ hybrid, and the agent brief should say so —
reading wording off a typeset glyph render when a text layer exists is strictly
worse and needlessly expensive.

```sh
npx tsx scripts/mh-ssc-10/dump-text.ts sci2-2016   # → out/<id>/text.md
```

## ⚠ Mislabeled source files

The two `...2026 (1).pdf` files are actually the **March 2025** papers (verified vs
the printed cover: Algebra `N 819 / 2025 III 05`, Geometry `N 832 / 2025 III 07`).
`config.ts` maps them to `alg-2025` / `geo-2025`. Never trust the filename.

## Pipeline

```sh
# 1. render a paper's pages → out/<id>/p-NN.png (gitignored), and dump any text
#    layer → out/<id>/text.md (see "Check for a text layer" above)
npx tsx scripts/mh-ssc-10/render.ts alg-2024
npx tsx scripts/mh-ssc-10/dump-text.ts alg-2024

# 2. VISION-transcribe (parallel agents, one per question block: Q1A / Q1B / Q2 / …)
#    → data/<id>.<block>.json  (PaperQuestion[]; see lib.ts). Each question:
#    ref, format, chapter (CATALOG-validated), subtopic, difficulty, stem,
#    options+answer (mcq, DERIVED) / solution (AUTHORED), reviewFlag:true.

# 3. merge fragments → data/<id>.questions.json
npx tsx scripts/mh-ssc-10/merge.ts alg-2024

# 4. commit PRIVATE (question_kind='pyq', pyq_year/month set)
npx tsx scripts/mh-ssc-10/commit.ts alg-2024            # dry-run
npx tsx scripts/mh-ssc-10/commit.ts alg-2024 --apply

# 5. attach + verify figures (Geometry/Science) via the shared snapCrop gate

# 6. flip the answered subset PUBLIC
npx tsx scripts/mh-ssc-10/flip-public.ts alg-2024       # dry-run
npx tsx scripts/mh-ssc-10/flip-public.ts alg-2024 --apply
```

## Classification catalog

`config.ts` `CATALOG` = subject → canonical chapter → subtopics (extracted from the
Balbharati textbook indexes). **Chapter is HARD-validated** per question (prevents
catch-all drift). An **off-catalog subtopic is a soft flag** (still committed +
auto-created) — board PYQs blend topics more than a fixed exercise; a later Phase-D
pass canonicalises stragglers.

- **Algebra** (6 ch): Linear Equations in Two Variables · Quadratic Equations ·
  Arithmetic Progression · Financial Planning · Probability · Statistics
- **Geometry** (7 ch): Similarity · Pythagoras Theorem · Circle · Geometric
  Constructions · Co-ordinate Geometry · Trigonometry · Mensuration
- Science I / II catalogs added when Science ingestion starts.

## Re-commit hazard

Editing a stem/option/answer changes `content_hash` → re-commit INSERTS + orphans
the old row. `delete from questions where source_file='<sourceFile>'` first, then
re-commit. Editing only `solution` text is safe.
