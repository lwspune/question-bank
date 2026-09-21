# IPMAT family ingestion

Past-year questions for the three IPM entrance tests, from **afterboards.in**.

| Our exam slug | Test | Questions | Years | Sections |
|---|---|---|---|---|
| `ipmat-indore` | IPMAT Indore (IIM Indore) | 670 | 2019–2026 (8) | SA · MCQ · VA |
| `ipmat-rohtak` | IPMAT Rohtak (IIM Rohtak) | 175 | **2019, 2020 only** | QA · LR · VA |
| `jipmat` | JIPMAT (IIM Jammu + IIM Bodh Gaya) | 600 | 2021–2026 (6) | QA · LR · VA |

**1,445 questions across 48 papers.** The three share **zero** questions — checked by
matching normalised stem + first option across all 1,445 rows.

## Status

**Phase 0 complete (2026-09-22): data harvested, frozen and gated. Nothing is in the
database.** Phases 1–5 (normalise → taxonomy → blind derivation → commit PRIVATE → flip
PUBLIC) are not built.

## Run it

```sh
npx tsx scripts/ipmat/fetch.ts      # discover + cache 48 pages -> out/html/ (gitignored)
npx tsx scripts/ipmat/extract.ts    # cached HTML -> data/raw/*.json (committed), gated
```

Both take `-- --exam=<slug>`. `fetch` takes `--force` to refetch; `extract` takes `--dry`.

Files:

- **`flight.ts`** — pure core. Reads the Next.js flight payload. Spec: `tests/ipmat-flight.test.ts`.
- **`config.ts`** — the three exams, the paper grid, discovery, the grid comparison. Spec: `tests/ipmat-grid.test.ts`.
- **`fetch.ts`** / **`extract.ts`** — the two CLIs.
- **`data/raw/`** — 48 frozen paper files, committed. Every later phase reads these, not the live site.

## Three exams, not one — and no migration

Modelled the way **CBSE and Maharashtra State Board** already are: each test is its own
exam row, and grouping them under one "IPMAT" heading is a *presentation* concern handled
by `src/lib/exam/examFamily.ts`. Nothing is added to the `questions` table.

That file's own words: *"a family is a PRESENTATION grouping, never a filter value."*
`Filters.examId` stays a single UUID. The taxonomy below exam is per-exam, so each test
keeps its own subjects — which matters here, because **their sections do not mean the same
thing**:

- **Indore** splits quant by **answer format** — SA is typed-answer, MCQ has four options.
  Both sections carry the same seven quant topics, so SA/MCQ is not a subject boundary.
- **Rohtak and JIPMAT** split by **subject** — QA, LR, VA are genuinely different areas.

Grouping the three under one family needs the family axis widened past `board`/`std`, which
IPMAT is neither of. Not done, and **not needed to ship**: `groupExamFamilies` rule 1 is
FAIL OPEN, so an unregistered exam appears as a normal flat picker entry.

## Why this is an extraction, not a scrape

The pages are server-rendered by Next.js, so the question records arrive as JSON in the RSC
flight payload with their LaTeX still in source form: `topic`, `subTopic`, `difficulty`,
`question`, `comprehension`, `option1-4`, `correctAnswer`, `section`, `questionNumber`,
`type`, `examID`, `explanationUrl`.

### The trap that governs `flight.ts`

Long strings that repeat across records — every RC passage, most DI tables — are **hoisted**
into their own flight row and replaced, in the record, by a reference string like `"$3c"`.

An extractor that does not resolve those returns **every question with every field present**,
carrying `"$3c"` where a 3,400-character passage belongs. On Indore alone that is 112 of 670
rows (17%), and they are the largest fields in the corpus. The first pass here reported
670/670 rows at 100% field presence and had silently dropped every passage.

The hoisted rows are **byte-counted and packed with no separator**:

```
3c:T9d6,<2518 bytes>3d:T4e1,<1249 bytes>
```

so two more mistakes are available, and both were made on the way here:

- **Scanning line by line** misses rows that begin mid-line — which is almost all of them.
- **Reading `T<len>` as characters** desynchronises on the first multi-byte character.

`parseFlightRows` works on a `Buffer` for exactly that reason. Both mistakes were then
re-injected deliberately to confirm the tests and the gate catch them; each failed only its
own tests, and the gate named the exact rows and exited 1.

## The gates

`extract.ts` exits 1 on any of four:

1. **Unresolved references** — any field still shaped like `$3c`. This is the one that matters.
2. **Numbering gaps** — each section must number 1..N, no holes, no duplicates.
3. **The paper grid** — every paper yields exactly the count in `config.ts`; no grid paper
   absent; no unrecorded paper present.
4. **Suspiciously short context** — a "passage" under 40 characters is the signature of
   gate 1 being bypassed some new way.

Gate 3 catches the source changing. Gates 1, 2 and 4 catch *our* parser breaking. **A count
check alone would pass a run that lost every passage** — when the resolver was broken on
purpose, the counts stayed correct at 40 / 20 / 30 while every passage went missing.

### Why discovery is separate from the grid

The first version chose what to fetch and extract by iterating `PAPER_GRID`. That made the
grid **unfalsifiable**: the census could only contain papers the grid already listed, so
`comparePaperGrid`'s `unexpected` branch was dead code. Proved by deleting 2026 from the
grid and re-running — it printed `GATE: PASS` and exited 0 while skipping three real papers.
The unit tests passed throughout, because they hand-build a census with an extra row that
the real caller could never produce.

Now `fetch.ts` reads each exam's **landing page** and parses the year/section links it
offers, and `extract.ts` builds its census from **the files on disk**. Either can contradict
the grid. A newly published sitting is welcome news and still stops the pipeline, because
its size has not been reconciled — 2020 and 2021 were both 60-question papers, so assuming a
new year matches the last one is the assumption the grid exists to refuse.

## Answer keys are BLIND lane — do not trust them

**IIM Indore publishes no official IPMAT answer key, and afterboards claims none.** Every key
in `data/raw/` is *their own derivation*. Treat this like MHT-CET and the Worksheets corpus,
not like UPSC or CDS 2026-II. See `[[pyq-key-trust-triage]]`.

A calibration pass on **2026 + 2025 Indore SA quant numerics scored 15/15**, computed
independently and brute-forced where possible. **That number does not transfer.** Those are
self-verifying questions. VA is 507 rows and LR + Critical Reasoning another 247 — over half
the corpus — and neither can be brute-forced. This project has already measured that gap
once: CDS General Knowledge scored 91.6% where the assumed figure was 98–99%.

So Phase 3 must **blind re-derive quant and LR**, and take a **stratified VA sample** to get
a real accuracy number before committing to all of it.

## What not to ingest

Their **explanations** are original teaching prose ("Create your PRT table…"), and their
**difficulty labels** and **topic names** are their editorial work. Stems, options and the
fact of the answer are IIM's exam paper — the same class as every other corpus here.
Re-derive the answers, author our own solutions, and re-author the taxonomy to our names.

`pyq_note` must carry the sitting identifier only. **afterboards must never appear in a
published field** — see `npm run audit:provenance`.

## Known defects in the source

Counted across all three exams, for Phase 1 to repair:

| Defect | Count | Note |
|---|---|---|
| `$$…$` delimiter imbalance | **621 fields** | Opens `$$`, closes `$`. Systematic, so one rule fixes all three exams. |
| Raw HTML instead of our conventions | `<table>` 46 rows · `<br>` 226 · `<u>` 65 · `<li>` 143 · `<p>` 162 | Must become GFM pipe-tables (with the separator row), real newlines, `\(\underline{\text{…}}\)`, sentence-per-line. |
| Figures on their CDN | **81 distinct images, 110 rows** | JIPMAT 84 · Rohtak 21 · Indore 5. Biggest cost line; get originals. |
| Dropped questions | **9** | `correctAnswer: "Drop"`. Indore 1 · Rohtak 3 · JIPMAT 5. Maps to our grace handling. |
| Multi-answer key | **1** | JIPMAT 2025 VA Q1 is `"2,4"` — breaks our exactly-one-`is_correct` rule. |
| Unicode `≤ ≥` inside math zones | — | Need `\le` / `\ge` for the temml→OMML path. |
| `\newline` inside `bmatrix` | 8 | Should be `\\`. |
| `type` field present on only ~30% of rows | — | **Infer format from whether options exist**, never from `type`. |

Two rows worth checking against an original paper: **Indore 2025 SA Q1** carries four options
inside the typed-answer section, and Indore's parajumble answers are **orderings** (e.g.
`52134`), so they must never get tolerance-based numeric grading.

## Still open

- The 81 figures.
- Marking scheme per exam per year.
- **Rohtak 2021–2026 are not on this source at all** — its corpus caps at 175 questions
  from 2 sittings.
- Whether to pull original PDFs as a transcription spot-check.
