# CDS Elementary Mathematics ingestion

Scanned CDS "Elementary Mathematics" booklets (image PDFs, **no text layer**, **no
answer key**) → the bank, `question_kind='pyq'`, under the existing **CDS** exam in a
new **Mathematics** subject.

**Status: COMPLETE — all 21 sittings (2016-II … 2026-II), 2,096 q PUBLIC, 0 PRIVATE, 80
figures attached.** Every row carries a solution and `derived_model` provenance. Four
questions are deliberately ABSENT because no printed option is correct (2018-Sep Q39/Q42,
2021-Apr, 2021-Sep — hence 98/99/99); every other paper is whole at 100. Twenty papers were
derived by two independent blind passes and **every one crosstabbed at AGREE 100%**, with
0 DISPUTE and 0 TWIN.

**`2026-2` is the exception, and the method changed because the evidence did.** It is the
first sitting with a PUBLISHED UPSC key, so it was derived by ONE blind pass and cross-checked
against that key: **99/100 agreement, and the single disagreement was adjudicated as the
KEY's error**, so the pass was right on all 100. See "The measurement on 2026-II" below.

`2020-1` and `2020-2` have external PREP-HOUSE keys, used to MEASURE the method rather than
to answer the papers — see the next section, which is the reason to trust the other 18.
Note the two kinds of key are not interchangeable: the prep-house pair carries roughly 2
errors per 100, the official key carried 1 per 100 on its one paper, and the adjudication
prior runs the opposite way between them.

**Owed, and not provable headlessly:** a browser click-through of `/browse`. The answer
reveal is click-gated and the 80 figures render in it, so nothing in this pipeline proves
they lay out correctly.

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

**There IS now a third keyed sitting, and it is the best one.** This paragraph used to read
"there is no third keyed sitting ... this bound is the whole of the evidence they will ever
rest on". That was true when written and stopped being true on **2026-09-20**, when UPSC
published a provisional key for `2026-2` two days after the exam. Left standing it would
have become the most confidently wrong sentence in this file — it forecloses a measurement
that is now routine for any future sitting, since UPSC publishes a key for every one.

## The measurement on 2026-II: an OFFICIAL key, and a single blind pass

`2026-2` is the first paper here with a **published UPSC key** rather than a prep-house one,
so its method changed to suit: **ONE blind derivation pass, cross-checked against the key**,
instead of two passes crosstabbed against each other.

That is not a weakening. Dual-blind's own ceiling, stated above, is that it can observe
agreement and never correctness — two passes wrong the same way are indistinguishable from
two passes right. A published key breaks exactly that ambiguity.

| | result |
|---|---|
| blind pass vs the official key | **99 / 100** |
| disagreements | 1 — Q25 |
| adjudicated as OUR error | **0** |
| adjudicated as the KEY's error | **1** (Q25) |
| so the blind pass was correct on | **100 / 100** |
| confidence split | HIGH 100 · MED 0 · LOW 0 |

**Q25 is an error in the official UPSC provisional key.** Alloy X is gold:silver 1:2, Y is
2:3, and Z must be 4:7. The key gives B (2:1); exact rational arithmetic gives 16:29, against
a required 16:28 — near, and not equal. Only 6:5 gives exactly 4:7. All four alternative
readings of the stem were tested (either source ratio reversed, the target reversed, all
three reversed): **B matches under none of them**, and the one alternative reading that
resolves at all still gives D. The bank ships D and records the disagreement.

Three cautions, because this number is easy to over-read:

- **n = 100, one paper.** An upper bound, not a rate, exactly as the 2020 pair is.
- **CONFIDENCE CALIBRATION IS UNTESTED HERE.** All 100 rows were marked HIGH, so the band has
  no discriminating power on this paper and the usual "HIGH runs ~98.5%, errors sit in MED"
  reading cannot be checked. The single error was the key's, not the pass's, so this is not
  evidence of inflated confidence either — it is simply not a test of it. On 2020-I the same
  method produced HIGH 96 / MED 4, so the all-HIGH split is worth watching on the next paper.
- **The key is PROVISIONAL.** UPSC invites representations and issues a final key later.
  Q25 is precisely the kind of item that gets corrected, and the key's date is recorded in
  `config.ts` so a final key can be diffed against it.

**What it changes for the 18 unkeyed papers: a little, honestly.** It is one more paper on
which this corpus's derivation method was measured and not found wanting, and the first
against ground truth rather than a prep-house key. It does not make the unkeyed papers
verified. It does mean that from 2026-II onward, **no future sitting needs to be unkeyed** —
the key is published within days, so the cheap, strong method is available for all of them.

## The corpus is 21 papers, and `All_PYQPs` holds 20 of them

`All_PYQPs/` holds 20 PDFs (`2026 Sep.pdf` was added 2026-09-20). `2020.pdf` was identified as the **first** 2020 sitting by
pixel-comparing Q1-Q7 against the two booklets in the sibling `CDS_2020_*_PYQP` folders:
it matches `CDS_2020_1_PYQP.pdf` exactly (booklet `A-PLKI-T-MTK`), and
`CDS_2020_2_PYQP.pdf` is a different paper (`DZOL-T-LKM`). So **2020-II is a real
sitting that `All_PYQPs` is missing**, and `config.ts` points at it outside that folder.

## Four measured facts that govern everything

1. **ZERO text layer, all 21 papers.** Not thin — zero extractable characters across every
   page of every file, against ~300 DPI scans. Vision-only, with no text-first fallback.
   The `2026-2` ANSWER KEY is a scan too, and that is why it needs its own read lane.
2. **No booklet prints an answer key.** Every paper ends at Q100 (then rough-work pages).
   Answers are DERIVED and say so in `solution`.
3. **THREE papers have an EXTERNAL key, of two different kinds.** `2020-1` and `2020-2` are
   clean born-digital .docx **prep-house** keys — evidence, not ground truth, measured at
   roughly 2 errors per 100. `2026-2` is the **official UPSC provisional key**, a 4-page
   scan, one page per series. Do not treat them alike: the adjudication prior inverts, and
   only the official one can break the "both passes wrong the same way" ambiguity.
4. **Figure load is low but real** — ~4-12 per paper, clustered in the geometry/DI pages
   at the end. Far below what "a maths paper" suggests; measured by montaging whole papers.
   **`2026-2` has ZERO**, checked on all 17 English pages: its geometry is entirely
   prose-described and its DI is tables. So "every maths paper has figures" is not safe
   either — check, do not assume, in both directions.

Exam pattern, read off the 2026-I and 2026-II covers (the only covers in the corpus):
**100 items, 100 marks, two hours, one-third negative** — so `+1 / -0.3333`, which is a
marking scheme the bank does not yet have. The 2026-II key confirms it independently:
"Total Questions 100 / Questions Dropped 0 / taken for Scoring 100".

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

- A mock blueprint (`+1 / -0.3333`, 100 q, 120 min) if these are ever served at `/mock`.
  CDS Maths currently has 17 published mocks across 20 sittings.

Done since this list was written: `flip-public.ts` (five gates, figure gate included), and
the `2026-1` page-selection pre-pass (English pages are the even indices 2..42; the answer
is recorded in `config.ts`). `2026-2` needed the same pre-pass and got it — even indices
2..34.

## Reading a PUBLISHED key: the `keyread` lane

`2026-2` is the first paper here whose key is an **official UPSC provisional key** rather
than a prep-house one, and the first whose key is an **image**. The 2020 keys are
born-digital `.docx` and `parseKeyPairs` reads them deterministically; a scan has zero text
layer, so reading it is a vision transcription of 100 table cells and carries an error rate
the `.docx` path does not.

So `parse-key.ts` dispatches on the ARTIFACT, not the paper id:

- `.docx` → pandoc → `parseKeyPairs`, unchanged.
- `.pdf` → `reconcileKeyReads` over **two or more independent vision reads**, written by
  agents against `KEY_READ_BRIEF.md` into `data/<paper>.keyread<N>.json`.

`reconcileKeyReads` emits a cell **only where every reader agrees**, and never votes:
two-against-one is not a majority on a table anyone can go and re-read, and a tie-break rule
would quietly convert "we are unsure" into "we are sure". It is pure and driven by
deliberately broken fixtures in `tests/cds-maths-parse-key.test.ts`.

**The trap that brief exists for:** the key PDF carries ONE PAGE PER SERIES (A, B, C, D),
and UPSC shuffles question order between series. Series A's Q1 is `B` where Series B's Q1 is
`D`, and they diverge all the way down. Reading the wrong page yields a **100% wrong key
that looks entirely plausible** — well-formed, covering 1..100, disagreeing with the
derivation on roughly three quarters of rows, which reads as "the derivation collapsed"
rather than "the key is the wrong series". Both readers must confirm the Series box **off
the page** before transcribing a cell.

### Blindness was made STRUCTURAL for this paper, not just instructional

The brief tells a deriver to stop if it ever sees a key. That is the only guarantee the
2020 papers ever had, and it is weak here because `data/` holds `sourcekey.json` right
beside `derive.json`, and `out/` would have held the rendered key pages right beside the
page images.

For `2026-2` the key artifacts were **physically moved out of the repository** for the
duration of the derivation — both `keyread` files and the rendered key crops — and moved
back only after every pass was written. The derivation therefore ran with no key present
anywhere in the tree, which is a stronger claim than "the agent was told not to look".
Worth repeating on any future keyed sitting.

**But the quarantine was put in the wrong place, and a deriver found it.** It went into the
shared agent SCRATCHPAD — which the derivation agents also use. One of them listed that
directory and saw `KEY_QUARANTINE/` plus `*_keyread1.*` files and ~20 key page crops by
name. It opened none of them, and the listing happened after its output was already written
and validated, so the measurement stands; it reported the sighting unprompted, which is the
standing "if you ever see a key, stop and report" instruction working exactly as intended.

The lesson is precise and not "the instruction failed": **moving a secret out of the repo is
not the same as moving it out of reach.** The scratchpad is shared by every agent in a
session, so it is part of the deriver's world, not outside it. Next time the quarantine goes
somewhere no derivation agent has any reason or route to look, and ideally the filenames
should not announce what they are either — `KEY_QUARANTINE` is a signpost.

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
