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

## Supplementary sittings and the board's own copies (2026-10-13)

The board publishes born-digital English PDFs at mahahsscboard.in/en/questionPaper
(a SvelteKit app; the list is its `/en/questionPaper/__data.json`, URLs on
`state-board-strapi-upload.blr1.digitaloceanspaces.com`). For SSC it has March
2024-2026 **and the supplementary sittings July 2024, July 2025, June 2026**.

- **Supplementary papers are ids `<subject>-<year>-jul|jun`** (`config.ts`
  `SUPPLEMENTARY_SPECS`), source files `MH_SSC_10_<Subject>_<year>_July|June.pdf`.
  They share subject and year with the March paper, so the sitting is in the id,
  the source file (the dedup key) and the `/question-papers` slug and group
  (`sscSittingSlugs`). The printed N-code is reused across supplementary
  sittings (Algebra is N 384 in July 2024 AND June 2026): provenance, not identity.
- **Text layer for words, PNG for maths.** Prose and numbering survive; minus
  signs and fractions do not (`-1/7` arrives as `1/7`).
- **Answer format is gated.** Papers with `answerStyle: "board"` (every
  supplementary paper) fail `merge.ts` on any `answerStyleIssues` error: an MCQ
  opens `**(X)** <option text>`, no other option letter, no em dash, no
  marker-facing aside. The format is in TRANSCRIPTION_BRIEF.md "Model answers".
- **Blind MCQ lane:** `dump-mcq-blind.ts <ids>` writes stems and options with
  the keys withheld; a FRESH agent writes `data/<id>.blind.json`;
  `compare-blind.ts <ids>` reports AGREE/DISAGREE/MISSING. 98/98 agreed on the
  supplementary papers.
- **Official cross-check of the March papers:** `render.ts <id> --official` and
  `dump-text.ts <id> --official` read the board's copy from
  `PYQPs/_board_site_march/`; agents follow OFFICIAL_CROSSCHECK_BRIEF.md and write
  `data/<id>.official.json`. First run: 562/572 rows matched; the fixes are in
  `apply-official-fixes.ts`. The board's sci2-2024 copy is missing its last page.

## Marathi-medium prints (2026-10-18)

The board's list carries a `marathiPdf` beside each `englishPdf`. For the six
subjects there are **35 Marathi prints** (March and supplementary 2024-2026; no
Marathi Geography for March 2024), saved as `PYQPs/_board_site_marathi/<English
source file>_M.pdf` (`config.ts` `MARATHI_DIR`, `marathiPdf`, `MARATHI_CODES`).
Each is the SAME paper as its English twin (codes in pairs: N 919 English, N 920
Marathi; same numbering, same options in the same order), so the Marathi is
stored as a translation of the English row (migration 0118, the MPSC pattern):
hash, key, stats and mocks stay on the English row. "Translation" names the
storage only: the wording is READ from the board's Marathi print.

- **Rows are found by CONTENT HASH**, rebuilt from the English data JSON, never
  by ref + source file: the per-exam dedup stores a question the board repeated
  across sittings once, under its first sitting (20 such rows).
- **The text layer has no Marathi** (a non-Unicode font): read from the image.
- **Two agent lanes**, one paper each, brief in MARATHI_BRIEF.md: reading
  (`render.ts <id> --marathi`, then `mr-skeleton.ts <id>`, which gives refs and
  structure but NO English wording) writes `data/<id>.mr.json`; solutions (from
  the checked English solution, the paper's own Marathi terms) write
  `data/<id>.mr-sol.json`.
- **`mr-check.ts <id>`** (pure core `marathi.ts`, tests in
  tests/mh-ssc-10-marathi.test.ts) refuses: a missing/extra/reordered ref,
  wrong option count, a passage the English row lacks (or the reverse),
  siblings whose passages differ where the English ones agree, a mostly-Latin
  stem or solution, unbalanced or KaTeX-unrenderable maths, control characters,
  an MCQ solution not ending `योग्य पर्याय: X.` on the English key. It WARNS on
  numbers that differ between the prints: every warning was read; they are
  units printed as words (घसेमी), figure labels, box numbers the English adds.
- **`mr-commit.ts <id>... | --all [--apply]`**, dry run by default; refuses a
  paper with check errors or no solutions file; writes through
  `put_question_translation`.
- **Agents report English solutions that look wrong**; these go to the
  SUGGESTIONS.md backfill ledger, never edited here. A reviewer note or a wrong
  aside is left out of the Marathi; the answer itself is never changed.

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
