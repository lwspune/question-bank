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

**Phases 0-4 complete (2026-09-22): harvested, normalised, mapped, LOADED PRIVATE with
figures attached.** **1,418 questions are in the bank and NOTHING is student-visible** —
all PRIVATE, and the three exams are absent from `EXAM_REGISTRY`. Verified: anon reads 0
questions and 0 options.

Phase 5 (flip PUBLIC per chapter, then registry + `/mock`) is not built and **must not run
until the keys are derived** — LR is still entirely unmeasured. **The full Phase 5 checklist
lives in [ROADMAP.md](../../ROADMAP.md)**, at the top; read it before touching this corpus
again.

### The CBSE-style grouping is HALF done, on purpose

The database half is complete: three separate exam rows, exactly as CBSE is
`cbse-10`/`11`/`12`. The picker half — one "IPMAT" entry with three types under it — is
**deliberately deferred to Phase 5** (decided 2026-09-22).

Why: the grouping only applies to exams in `EXAM_REGISTRY`, and
`src/lib/profile/examChoices.ts` maps that registry straight to the `/welcome` and `/account`
target-exam chips **with no content check**. Registering these exams today would let a student
choose "IPMAT Indore" as their target and find nothing anywhere — worse than the dead
dropdown entry it would fix. The grouping exists to organise exams a student can use, so it
lands when they become usable. Steps and ordering: the ROADMAP checklist.

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

| Stem asks for the strong ARGUMENT, options say IMPLICIT | **1** | Rohtak 2019 VA Q24. A transcription defect, not a wrong key — fix the options. |

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

## Phase 3: the derivation loop, and the first VA measurement

`derive.ts` is the pure core; `dump-derive.ts` emits a blind packet and `score-derive.ts`
scores it. Two rules protect the measurement:

**A packet must not carry the answer.** `buildPacket` lists its fields explicitly rather
than spreading the source row, and emits no key, no `isCorrect`, no `numericAnswer` — and
not the source's `difficulty` either, which is their judgement about the question and a hint
we did not earn. A test walks every field name in the emitted object and fails on anything
that reads like an answer, because the leak that matters is the one nobody excluded by name.
Both a spread and a plausible "harmless" difficulty field were injected and caught.

**Agreement is not accuracy.** The scorer says `AGREEMENT` and nothing else. On CDS General
Knowledge this project measured 91.6% where dual-blind agreement read 98–99%: agreement
bounds disagreement risk and is blind to correlated error. `agreementPct` is **null** for an
empty sample rather than 100%, because 0/0 is not perfect.

### Result: 92.5% VA agreement (37/40)

A stratified 40-row sample of the 582 committable VA rows, across 30 strata, pinned at
commit `ed843adb`. Full working in `data/derive/va-calibration.adjudication.md`.

**All three disagreements resolved in the source's favour or as ambiguous — zero wrong keys
found.** Two were my errors (one a plainly refutable option, one a test convention I did not
apply) and one was an under-determined item where *but* and *though* are both correct. So on
this sample the source's VA keys are better than 92.5% suggests: agreement was limited by
the weaker party, which was my pass.

**Confidence was well calibrated** — all three leads were rows flagged uncertain while
deriving. That is the usable product, and a larger pass should record it per row.

This does not license skipping derivation. n=40 of 582; one sample is not a base rate; and
agreement cannot see a misconception both passes share. **LR is still entirely unmeasured**
and is the obvious next sample.

## Phase 4: the PRIVATE load

```sh
npm run db:backup                              # project rule: before ANY bulk write
npx tsx scripts/ipmat/preflight.ts             # read-only; refuses to pass on a fault
npx tsx scripts/ipmat/commit.ts -- --apply     # 1,418 rows -> PRIVATE
python scripts/ipmat/fetch_figures.py          # download + convert 69 figures to PNG
npx tsx scripts/ipmat/attach-figures.ts -- --apply
npx tsx scripts/ipmat/verify-load.ts           # reconcile the DB against data/build
```

**Result: 1,418 inserted, 0 skipped, 0 failed, 1,418 PRIVATE.** 9 subjects, 147 chapters,
205 subtopics — exactly what the taxonomy report predicted. 58 question figures and 28
option images attached; 0 picture-options left blank.

### The collision the pre-flight caught

`commitStaged` dedups by **UPSERT** on `(org_id, exam_id, content_hash)`, so two rows that
hash the same do not error — one silently replaces the other and the count comes back short
with no explanation. And the shared `contentHash(question, options, answer)` **excludes
context**.

JIPMAT 2024 VA Q29 and Q33 hit exactly that. Both have the stem *"Choose the correct answer
from the options given below :"*, both offer the same four `(A) - (I), (B) - (II)…`
permutations, and both key D. One asks about the word "all" as a part of speech; the other
about four idioms. **The real question is in the context**, which the hash ignores.

Fixed by `hash.ts` — an `IPMAT`-namespaced, context-aware digest. Deliberately **not** a
change to the shared helper: redefining `contentHash` would change the digest of all ~72k
existing rows, so the next re-ingest of any corpus would duplicate instead of dedup. Whether
other corpora carry the same latent collision is logged as a backfill candidate, not fixed
in passing.

### What is deliberately not shipped

- **Their difficulty labels.** Every row is `MODERATE`. Easy/Medium/Hard is their editorial
  judgement about the question, not ours.
- **`pyq_note` is empty.** IPMAT runs one sitting a year, so `pyq_year` identifies it, and
  anything else risks publishing a source blurb (`npm run audit:provenance`).
- **Their explanations**, as throughout.

### Figures

No original question papers are available for these three exams, so the source's own
renderings are the only copies that exist for us. They are downloaded once, converted, and
served from **our** storage — a hotlink would break silently when the source reorganises and
would leak our users' requests to them.

**65 of 81 are WebP, which our storage layer refuses on purpose**: `src/lib/storage/images.ts`
notes the docx library's `ImageRun` cannot embed it, so a WebP figure would upload fine and
then be missing from every downloaded Word paper. Pillow converts them to PNG, flattening
alpha onto white (a transparent WebP becomes a black rectangle in Word otherwise). The three
multi-figure stems are composed by the existing `scripts/jee/compose_figures.py`, because a
question row carries one `image_url` and attaching the first of three dice views ships a
question that cannot be answered.

### One visible side effect, pre-existing in kind

`/browse`'s exam **dropdown** is built from `listExams()`, which is unfiltered, so the three
new exams now appear there and can show nothing. The landing **pills** are safe — they
iterate `EXAM_REGISTRY`. This is not new behaviour: **UPSC CSE (Prelims) has 1,789 rows and
0 PUBLIC**, and has been in that dropdown already. Filtering `listExams()` to exams with at
least one PUBLIC question would fix all four at once, and touches shipped `/browse` code, so
it is a decision rather than something to do in passing.

### Two bugs of mine, and the guard that now prevents the class

`attach-figures.ts` imported `sourceFileFor` from `commit.ts`, and a CLI module calls
`main()` at load — so running the figure pass **silently re-ran the entire PRIVATE load**.
It was idempotent, so nothing broke and nothing announced itself; the only tell was
`commit.ts`'s output under a command nobody asked to commit with. The same shape had already
bitten `extract.ts`, which silently ran a whole 48-page fetch.

`tests/ipmat-module-boundaries.test.ts` now forbids it: shared helpers live in a
side-effect-free module, a CLI may import those, and **nothing may import a CLI**. The test
classifies every `.ts` file in the folder, so a new file cannot escape the rule by being new.
Its own first version reported a false positive — the import regex used `[\s\S]*?`, which
crossed newlines and read `import { existsSync } from "node:fs"` all the way to a later
`from "./build"`.
