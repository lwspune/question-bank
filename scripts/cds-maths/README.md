# CDS Elementary Mathematics ingestion

Scanned CDS "Elementary Mathematics" booklets (image PDFs, **no text layer**, **no
answer key**) → the bank, `question_kind='pyq'`, under the existing **CDS** exam in a
new **Mathematics** subject.

**Status: BOTH KEYED SITTINGS DONE — `2020-1` and `2020-2` committed, 200 q, all PRIVATE,
10 figures attached. Nothing is PUBLIC; publishing is a separate decision. 18 papers remain,
none of which has a key.**

## What the two keyed papers measured

Both papers: two independent blind passes, 100/100 derived, **crosstab AGREE 100 /
DISPUTE 0 / TWIN 0** on each. Every disagreement with a key was adjudicated by hand.

| | 2020-1 | 2020-2 |
|---|---|---|
| pass A | 100/100 — HIGH 96 · MED 4 | 100/100 — HIGH 99 · MED 1 |
| pass B | 100/100 — HIGH 96 · MED 4 | 100/100 — HIGH 97 · MED 3 |
| passes agreed | 100/100 | 100/100 |
| rows disagreeing with the prep-house key | 1 | 4 |
| of those, adjudicated as KEY errors | 1 | 3 |
| adjudicated as genuinely ambiguous | 0 | 1 |
| **adjudicated as OUR error** | **0** | **0** |

**Across 200 questions and two keyed papers there is not one confirmed correlated
derivation error.** Four of the five key disagreements are the KEY's, three of them provable
by computation:

- `2020-1 Q87` — option D is exactly `r(3+2sqrt6)/3`; the key's A is exactly that MINUS `r`,
  i.e. the height above the plane of the three lower CENTRES rather than the ground plane
  the question names.
- `2020-2 Q57` — the key has the SIGN wrong. 47 degrees exceeds 45, so `cos47 - sin47` is
  negative; B matches to 30 digits, and the remaining two options are imaginary because
  `k` exceeds 1.
- `2020-2 Q43` — `x = 1.76920`, verified by substituting back to exactly 8, so `1 < x < 2`.
  The key says `2 < x < 3`.
- `2020-2 Q93` — the modal shoe size is the canonical textbook case for the MODE; the key
  says arithmetic mean.
- `2020-2 Q26` is NOT a key error but a genuine ambiguity, and is recorded as such: statement
  1 holds for every `k` except the degenerate `k = +/-1`, where `x^2 - y^2` is identically
  zero. The derivation was retained at MED with the alternative named.

### The number this was built to produce, and why the raw one is misleading

`score.ts` computes agreement overstating accuracy by **4.0 points on 2020-2** — strikingly
close to the ~4 points UPSC measured. **That figure is an artifact of scoring against a
defective key, and it evaporates on adjudication.** Three of the four disagreements are the
key's, so the passes were right on at least 99 of 100 and possibly all 100.

This is exactly why `score.ts` prints that section as "AGREED, BUT DISAGREE WITH THE KEY"
rather than "correlated errors" — it can only observe disagreement with a prep-house key,
never that both passes were wrong. An earlier version of this script asserted the latter, and
had it not been corrected this README would now be reporting a 4-point correlated-error rate
that does not exist.

**Honest limit.** Two papers, 200 questions, zero confirmed correlated errors gives an UPPER
BOUND (under ~0.5% at n=200), not a measurement of the rate. What it does establish firmly:
a prep-house key carries roughly **2 errors per 100** on this corpus (4 across 200), so a
source key here is evidence and not ground truth; and confidence is well calibrated, with
every adjudicated key-error sitting in HIGH where the derivation was right.

**There is no third keyed sitting.** The remaining 18 papers cannot be scored at all, and
this bound is the whole of the evidence they will ever rest on.

## The corpus is 20 papers, not 19

`All_PYQPs/` holds 19 PDFs. `2020.pdf` was identified as the **first** 2020 sitting by
pixel-comparing Q1-Q7 against the two booklets in the sibling `CDS_2020_*_PYQP` folders:
it matches `CDS_2020_1_PYQP.pdf` exactly (booklet `A-PLKI-T-MTK`), and
`CDS_2020_2_PYQP.pdf` is a different paper (`DZOL-T-LKM`). So **2020-II is a real
sitting that `All_PYQPs` is missing**, and `config.ts` points at it outside that folder.

## Four measured facts that govern everything

1. **ZERO text layer, all 20 papers.** Not thin — zero extractable characters across every
   page of every file, against ~300 DPI scans. Vision-only, with no text-first fallback.
2. **No booklet prints an answer key.** Every paper ends at Q100. Answers are DERIVED, by
   two independent blind passes, and say so in `solution`.
3. **Two papers have an EXTERNAL key** (`2020-1`, `2020-2`) as clean born-digital .docx.
   They are **prep-house keys, not published UPSC keys**. See "Why 2020-I is the pilot".
4. **Figure load is low but real** — ~4-12 per paper, clustered in the geometry/DI pages
   at the end. Far below what "a maths paper" suggests; measured by montaging whole papers.

Exam pattern, read off the 2026-I cover (the only cover in the corpus): **100 items, 100
marks, two hours, one-third negative** — so `+1 / -0.3333`, which is a marking scheme the
bank does not yet have.

## Why 2020-I is the pilot

It is the only sitting with both a key **and** worked solutions on disk, so it is the one
paper where a blind derivation can be **scored against ground truth**. That measurement is
the pilot's product, and it is what the other 18 papers can never produce for themselves:

- how accurate a single blind pass is;
- whether `confidence` is a usable router for review effort;
- and, most importantly, **how much agreement between two passes overstates accuracy**.

CDS General Knowledge can only *assert* that correlated error exists. Here it can be
measured once, and that number is the honest discount to apply to every other paper.

The key is read ONLY by `score.ts`, only after both passes are written. `commit.ts` never
reads it — a pipeline that quietly substituted a source key would destroy the measurement,
and a pass that has seen a key is not blind.

## This pipeline is a hybrid of the two sibling CDS pipelines

| | from `scripts/cds` (English) | from `scripts/cds-gs` (GK) | new here |
|---|---|---|---|
| `Directions:` sets — shared `context` + `setLabel` | yes | — | |
| per-question chapter, hard-validated against a catalog | — | yes | |
| no key ⇒ dual-blind derivation + crosstab | — | yes | scoreable, on 2 papers |
| | | | heavy LaTeX (nested radicals, continued fractions) |
| | | | geometry / DI figures |
| | | | GFM pipe tables in `context` |

`lib.ts` writes out the function bodies rather than importing `cds-gs`'s because each of the
three divergences changes a TYPE — one subject (so no `subject` field, and a two-level
catalog), sets (so the merge fingerprint includes `context`), and figures.

## The catalog is seeded and extended, not authored from a syllabus

`catalog.json` is chapter -> subtopic[]. It was seeded from **three hand-curated taxonomies
already in the bank**, because no single one covers a CDS paper:

- **arithmetic** from UPSC CSAT `Basic Numeracy` — the bank's only commercial-arithmetic
  taxonomy (profit/loss, interest, TSD, time-and-work). None of the eleven school/JEE maths
  taxonomies has any of it.
- **algebra, trigonometry, statistics** from **NDA Mathematics** (the Class-10-level subset
  of its 31 chapters).
- **Euclidean geometry and mensuration** from **MH State Board Class 10 Geometry** — NDA's
  geometry is coordinate geometry and does not cover circle theorems, similarity or solids.

It is then **extended in rounds against real questions**, which is the `cds-gs` method (its
catalog was generated once from NDA's GAT-GK taxonomy and then hand-extended five times).
The AI-derived syllabus .docx files in the source folder were deliberately **not** used.

`chapter` is hard-validated at commit; `subtopic` is a soft warning, because on an early
paper an unlisted subtopic is the extension work list, not a typo to reject.

**No em dashes anywhere in the catalog.** The GK catalog uses them and needed a `nearMatch`
helper, because an agent typing an ASCII hyphen produces a failure whose cause is invisible
in a terminal. Removing the character removes the failure class.

## Conventions settled here

- **Decimals are a full stop**, though the booklet prints a raised middle dot (`37·5`).
  Settled by measuring the bank: across all nine maths corpora decimals are periods, 719
  rows to 4. A middle dot also reads as multiplication to a derivation pass. Three separate
  transcription agents raised this independently before it was written down.
- Maths is `\( ... \)` only; no Unicode maths glyphs, no `$`.
- Figures are flagged, never described in the stem. On a geometry item the figure IS the
  question, and a prose description hands over the step the question exists to test.

## Running it

```sh
npx tsx scripts/cds-maths/render.ts      2020-1              # pages -> out/<id>/pNN.png
# [transcription agents, one per band — TRANSCRIPTION_BRIEF.md]
npx tsx scripts/cds-maths/check-bands.ts 2020-1              # structural probe over band files
npx tsx scripts/cds-maths/merge.ts       2020-1 --apply      # -> <id>.questions.json
npx tsx scripts/cds-maths/render-check.ts 2020-1             # every math zone through KaTeX
npx tsx scripts/cds-maths/dump-derive.ts 2020-1 --apply      # -> <id>.derive.json (no answers)
# [two blind derivation agents — DERIVATION_BRIEF.md]
npx tsx scripts/cds-maths/crosstab.ts    2020-1 passA passB  # work list; never picks a winner
# [adjudicate by hand -> <id>.answers.json]
npx tsx scripts/cds-maths/parse-key.ts   2020-1 --apply      # 2020 only
npx tsx scripts/cds-maths/score.ts       2020-1 passA passB  # 2020 only — the measurement
npx tsx scripts/cds-maths/seed-subject.ts --apply            # AT COMMIT TIME, not before
npx tsx scripts/cds-maths/commit.ts      2020-1 --apply      # PRIVATE
```

`seed-subject.ts` is deliberately not run early: `listSubjects` applies **no question-count
filter**, so an empty "Mathematics" appears as a live `/browse` filter under CDS returning
nothing. That defect was seeded and removed the same day for MH State Board Class 11 Physics.

## Probes, and why each exists

- **`check-bands.ts`** — runs on raw band files, before merge. It exists because on the State
  Board Chemistry run five agents each hand-rolled this checker and five shipped the *same*
  bug in it. Ship the helper instead of having every agent rebuild it. `checkBand` is pure and
  each rule is driven by a deliberately broken fixture in `tests/cds-maths-check-bands.test.ts`.
- **`render-check.ts`** — every math zone through the repo's own KaTeX. `--self-test` proves it
  rejects `\ce{}`, unclosed groups and undefined macros first. It also **fails on zero zones**,
  because `parseLatex` emits `"inline"|"block"` and never `"math"` — the typo that gave five
  agents a clean pass over nothing.
- **`merge.ts`** refuses when two bands disagree about a question: that is two agents reading
  one page differently, a finding to resolve against the page, not a duplicate to settle by
  whichever file was listed last.

## Figures — built, and the trap that nearly clipped six of ten

`snap-crop.ts` (shared core) -> `verify-figures.ts` (contact sheet) -> `attach-images.ts`.
Ten figures on `2020-1`, all attached and read back.

Two layout facts specific to this paper:

- The figure prints BETWEEN the bare question number and the stem, so `answerY` — named for
  the sibling pipelines, where it is where the ANSWER begins — is here the **top of the stem**.
- The number and the top of the diagram sit at the SAME height, with no whitespace row
  between them, so the question number can only be excluded HORIZONTALLY. Every `col` band
  deliberately starts to the right of the number gutter, and the gutter shifts by page
  (~0.015-0.02) because the scans are not registered identically.

**The trap: six of the ten figures have a label row detached from the body by a genuine
whitespace gap** — Q95's numerals 7 and 6, Q96's P/R and Q/S, Q97's G, Q98's B and E/D,
Q100's D/C. The first gap below the diagram is therefore INSIDE it, and using it amputates
the labels while snapCrop still reports `ok: true`, because `ok` is computed from the anchors
and not from the figure. `bottom` must go below the LAST such band.

## Still to build

- `flip-public.ts`, with a figure gate.
- A mock blueprint (`+1 / -0.3333`, 100 q, 120 min) if these are ever served at `/mock`.
- The `2026-1` page-selection pre-pass: it is the raw bilingual booklet, and with no text
  layer `scripts/upsc/classify-pages.py` has nothing to count, so it must be done from images.

## Does UPSC reuse Maths items between NDA and CDS? No — probed 2026-09-04

UPSC reuses **English** items across NDA and CDS, but not GK (probed on that pipeline, five
stems, zero matches). Maths had never been tested, and it mattered: NDA Mathematics holds
7,294 keyed rows, so a shared item would be a free key source for far more than the two
papers that have one.

Six distinctive stems from `2020-1` (the 2160-product pair, "250 students have registered",
digit-sum 3798, 12288, the two-digit interchange, primes between 50 and 100) were searched
against NDA Mathematics: **zero matches**. The probe was then shown to REACH the data with a
positive control on the same subject id — 7,294 rows, of which 18 contain "remainder" and 4
"prime numbers" — because a subquery resolving to the wrong subject returns zero for
everything and looks identical to a real negative.

So Maths behaves like GK, not like English, and there is no free key. Six probes from one
paper is evidence rather than proof; the standing detector is `commit.ts`, which NAMES every
row that dedups instead of letting a silent skip count stand for a question that was never
on the paper.

## Figure anchoring: the detached-label trap

A figure's labels are often set in their OWN ink band, separated from the
diagram body by a genuine whitespace gap. The first gap below a diagram is
therefore frequently INSIDE the figure, and anchoring `bottom` there amputates
the vertex letters while `snap-crop` still reports `ok: true` -- because `ok` is
computed from the anchors, not from the figure.

Measured across this corpus it has hit **14 of 17 figures**. Three variants, all
seen live:

- **BELOW** (the common case): 2024-I had it on 7 of 10 figures; 2021-II on both;
  2023-I on the one figure whose whole constraint was in the diagram.
- **ABOVE** (2018-I Q97): the line labels `l` and `m` sat in their own band 8 px
  ABOVE the transversal arrowheads. Check the gap above as well as below -- if
  the first ink run under your `top` is a short label-height band rather than the
  diagram body, `top` is too low.
- **BOTH ENDS** (2018-I Q98): an apex label above and a base-label row below.

**Geometry alone cannot settle it.** On that Q98 the label band sat 13 px below
the stem -- indistinguishable by measurement from an ordinary line gap -- and the
first anchor set read it as a stem line and dropped the apex label. It was caught
only by looking at the crop. `ok: true` is necessary and never sufficient; the
visual review is the check.

Related: the vertical column rule is present on some booklets and absent on
others (measured, not assumed -- 2018-I has one, 2021-II does not), and where it
exists it is SKEWED by several px down the page. It can be as narrow as 2-3 px
against a `ROW_MIN` of ~3.4 px, so it may pass unnoticed once and bite later.
Exclude its whole skew envelope from `col` rather than relying on the margin.
