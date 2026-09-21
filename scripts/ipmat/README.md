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

**Phases 0-2 complete (2026-09-22): harvested, frozen, normalised, taxonomy mapped, gated.
Nothing is in the database.** Phase 3 onwards (blind derivation → commit PRIVATE → flip
PUBLIC) is not built. **The taxonomy needs sign-off before Phase 4 writes anything.**

**1,418 of 1,445 rows are committable.** Held back: 15 reconstructed + 8 cancelled by the
exam + 4 declared exclusions.

## Run it

```sh
npx tsx scripts/ipmat/fetch.ts          # discover + cache 48 pages -> out/html/ (gitignored)
npx tsx scripts/ipmat/extract.ts        # cached HTML  -> data/raw/*.json   (committed), gated
npx tsx scripts/ipmat/build.ts          # data/raw     -> data/build/*.json (committed), gated
npx tsx scripts/ipmat/verify-render.ts  # drive the REAL web + Word renderers over the result
npx tsx scripts/ipmat/taxonomy-report.ts # the taxonomy the map would create, with live counts
npx tsx scripts/ipmat/survey.ts         # read-only markup census (triage, exits 0)
```

All take `-- --exam=<slug>`. `fetch` takes `--force`; `extract` and `build` take `--dry`.

Files:

- **`flight.ts`** — pure core. Reads the Next.js flight payload. Spec: `tests/ipmat-flight.test.ts`.
- **`config.ts`** — the three exams, the paper grid, discovery, exclusions. Spec: `tests/ipmat-grid.test.ts`.
- **`normalise.ts`** — pure core. Their markup → ours. Spec: `tests/ipmat-normalise.test.ts`.
- **`taxonomy.ts`** — pure core. Their labels → our subject/chapter/subtopic. Spec: `tests/ipmat-taxonomy.test.ts`.
- **`fetch.ts`** / **`extract.ts`** / **`build.ts`** / **`verify-render.ts`** — the CLIs.
- **`data/raw/`** — 48 frozen source files, committed. Never re-read the live site.
- **`data/build/`** — 48 normalised files, committed. This is what Phase 2 reads.

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

## Phase 1: what the normaliser does, and the four faults the gate caught

`normalise.ts` converts their markup to ours. **A `<` in this corpus is far more often a
less-than sign than a tag** — a naive tag scan reports tags called `<x>`, `<c>`, `<a>`,
`<b>`, `<d>`, `<q>`, `<l>`, `<v>`, `<s>`, every one a false positive from maths like
`$$D<C<A<B$`. Stripping "anything in angle brackets" **deletes mathematics**, so there are
two independent defences: math zones are masked with the *renderer's own* matcher, and tag
handling uses an allowlist of real tag names.

Dollar delimiters are converted to `\(...\)` by **convention**, not necessity — both the web
renderer and the Word exporter already accept `$...$` (measured). The `$$...$` shape *is* a
real defect: it leaves a stray literal `$` in the prose on both surfaces.

**Four faults that passed the unit tests and were caught by the gate on real data** — each
now has a regression test:

| Fault | Rows | Why the unit tests missed it |
|---|---|---|
| Pipe check counted pipes before masking maths | 23 false alarms | `\(2\|x\| + 3\|y\| = 6\)` is four pipes and no table |
| Stray-`$` check flagged a single `$` | 7 false alarms, 2 real | fired on correctly-escaped `\$250 billion` and on a literal `($)` |
| Spacer rule ate the gap between two real zones | 1 | in `the $det$ $2AB^{-1}$ is`, a closing-then-opening `$ $` looks exactly like a whitespace-only spacer |
| `<br>` inside a GFM table row became a newline | 2 | those tables arrive as GFM already, so they never pass the cell handler that flattens `<br>` |

And one the **renderers** caught that no text check could: `\mathmr{~cm}` (30 zones, an OCR
artefact for a thin space) makes `mathml2omml` split the braced text, so Word prints
`1 c m` for `1 cm`. The web renderer is unaffected — only driving *both* surfaces found it.

`verify-render.ts` is what proves the output displays: 6,911 fields, 1,800 math zones
(1,739 → OMML, 61 → the native underline run), 82 tables parsed, 0 failures.

## Exclusions

Four rows carry a source defect code cannot repair, declared as data in `config.ts` so the
decision shows in a diff:

- **jipmat 2025 LR Q6, Q13 · 2026 LR Q22** — match a list against Venn diagrams held in
  table cells. The diagrams *are* the answer set, so lifting them out leaves a table of
  empty cells that still reads as a complete question.
- **jipmat 2025 VA Q1** — the source keys **two** correct options (`"2,4"`). Our schema
  requires exactly one, and picking between them would invent an answer.

An exclusion covers **only the problem kinds it names**. A new, different problem on an
already-excluded row still fails the gate, and an exclusion whose row is now clean is
reported as STALE and also fails. Both directions were verified by injection.

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

## Phase 2: the taxonomy map

`taxonomy.ts` keeps **two axes separate**. The **subject** comes from the paper's
**section**; the **chapter and subtopic** come from the source's topic. They are
independent — a question the source tags `Logical Reasoning > Logical Sequence` can appear
in the QA section, and it does, three times.

House style follows **CDS**, the closest analogue in the bank: an aptitude exam over the
same ground, whose 26 Mathematics chapters spell "and" out. Sixteen chapter names are taken
verbatim from CDS so a cross-exam chapter view lines up. NDA's older `Matrices &
Determinants` ampersand style is not copied into a new corpus.

The map also **cleans the source's own duplicates**, which would otherwise become permanent
taxonomy rows: three spellings of Active & Passive, two of Linear Equation(s), two of
Direct & Indirect, singular and plural Bar Graph(s), and `Tabular Data` filed under two
different topics. There is **no catch-all chapter** — the source's `Miscellaneous`
subtopics are folded into the real chapter they belong to.

### Resulting shape

| | sections as subjects (current) | if Indore quant were merged |
|---|---|---|
| subject rows | **9** | 8 |
| chapter rows | **147** | 121 |
| subtopic rows | **205** | 173 |
| subtopics under 3 q | **74** | 52 |
| single-question subtopics | **42** | 30 |
| median questions/subtopic | **4** | 5 |

The 26-chapter difference is Indore's quant chapters existing under **both** its SA and MCQ
subjects, because those sections cover the same seven topics at different answer formats.
That is the accepted cost of sections-as-subjects, and it buys something real: IPMAT Indore
students drill SA separately precisely because it is typed-answer with no options to work
backwards from, so it is a meaningful browse axis and not only a structural one.

### Two invariants worth knowing

**Completeness is checked in both directions.** No source pair may be unmapped (an omission
silently loses questions), and no map entry may match nothing (which is how a map rots after
a re-fetch). Both were fault-injected.

**No two chapter names may be confusable.** The map first had `Sequence and Series` (maths)
*and* `Series and Sequences` (reasoning), and **both landed in Rohtak's Quantitative Ability
subject** — 4 questions and 1, under two names a reader cannot tell apart. The reasoning
chapter is now `Pattern Recognition`. The test that catches this compares stemmed word bags,
and its **first version was vacuous**: stripping `(ies|es|s)` maps `sequence`→`sequence` but
`sequences`→`sequenc`, so the bags differed and the clash passed. It now stems `ies`→`y`
then a trailing `s`, and was confirmed to fail against the real clash before the rename.
