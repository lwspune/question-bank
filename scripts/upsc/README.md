# UPSC CSE (Prelims) ingestion

Scanned UPSC Civil Services (Preliminary) booklets (image PDFs, **no text layer**,
**NO ANSWER KEY**) → the bank, `question_kind='pyq'`, under a new **UPSC CSE
(Prelims)** exam across **14 subjects** — nine for Paper I, five for Paper II.

**Status: COMPLETE at 20 papers / 1,789 questions, all PRIVATE. Nothing is PUBLIC.**
Every sitting **2017-2026**, both papers. **2016 is deliberately OUT OF SCOPE**
(decision 2026-08-29) - see below. This corpus is closed unless that changes.

Every paper below was derived BLIND first and only then scored against the
official UPSC key, so these are real accuracies against ground truth, not
agreement rates. Re-measured by running `keycheck.ts` over each paper.

| | GS Paper I | | | CSAT Paper II | |
|---|---|---|---|---|---|
| **year** | **rows** | **vs key** | **HIGH** | **rows / vs key** | **HIGH** |
| 2017 | 100 | 96.0% | 88/89 | 80 / 96.3% | 71/72 |
| 2018 | 100 | **98.0%** | 91/91 | 80 / 95.0% | 70/72 |
| 2019 | 100 | 97.0% | 91/92 | 80 / **97.5%** | 64/65 |
| 2020 | 98 | 93.9% | 85/86 | 80 / 95.0% | 70/71 |
| 2021 | 99 | 93.9% | 81/82 | 79 / 92.4% | 64/67 |
| 2022 | 99 | 93.9% | 81/84 | 79 / 96.2% | 67/69 |
| 2023 | 99 | 92.9% | 72/72 | 80 / 96.3% | 63/64 |
| 2024 | 97 | 94.8% | 76/78 | 80 / 96.3% | 71/71 |
| 2025 | 100 | 94.0% | 69/70 | 80 / 91.3% | 63/63 |
| **2026** | **99** | **98.0%†** | **74/74** | **80 / 96.3%†** | 62/64 |

† 2026 is scored against UPSC's **PROVISIONAL** key (released 2026-05-27, before
its objection window closed), not the final post-cycle key every other row rests
on. Every 2026 row carries that caveat in its own `pyq_note`; `PROVISIONAL_KEYS`
in `config.ts` drives it, and says what to do when the final key appears.

**Corpus-wide: 1,704 of 1,789 correct = 95.3%.** GS Paper I 95.26%, CSAT Paper II
95.24% - the two paper types are, to within a fifth of a point, equally hard for
a blind pass, which is not what the difference in their content would suggest.

**The confidence flag is the usable product: HIGH ran 1,473/1,496 = 98.5%**, and
in most papers every single error landed in MED. That is what makes the MED list
a review queue worth working rather than a pile. It holds only because the brief
forbids inflating the flag, and it is not free - see 2021-p2 below.

**Two things the table does not show.**

*A "recent papers are harder" story was proposed and then REFUTED - by 2026.*
2018-p1 98.0% and 2019 97.0/97.5 against 92-94% for 2020-2023 looked like recent
papers leaning harder on current affairs, where a blind pass has no anchor. Then
**2026-p1 came in at 98.0%, tied for the corpus best, while being 33% Current
Affairs - DOUBLE the previous maximum and 2.5x the ten-paper mean.** The
prediction made from that share was for a below-average score; it was wrong.

The explanation a deriver gave is the useful part: a Current-Affairs LABEL does
not mean an item needs post-cutoff facts. Most are structurally overdetermined -
one clearly-false statement eliminates three of four options, so the answer
survives even when a secondary fact is shaky. **Subject label is a poor proxy for
derivability**, and per-paper accuracy here has no explanation the data supports.

*2021-p2 is where the confidence flag was weakest*: HIGH 64/67, against 71/71 and
63/63 elsewhere. Its three HIGH misses were checked against the pages for a
mis-slotted option (keycheck's second hypothesis) and are genuine calibration
misses - e.g. Q16's stem is honestly ambiguous about whether a ball's final
contact counts as a hit "before the ball stops bouncing", and both 5 and 6 are
defensible. The deriver should have marked it MED.

Rows are fewer than 100/80 where UPSC withdrew an item: 2020-p1 Q27+Q52,
2021-p1 Q80, 2022-p1 Q61, 2022-p2 Q36, 2023-p1 Q34, 2024-p1 Q20+Q52+Q57.
**2021-p2 is the exception and is NOT a withdrawal** - its Q39 carries a DUAL
KEY ("C or D", struck in by hand on the official page, with a matching footnote),
which the key format cannot express; see the note on its entry in `config.ts`.

**2016 IS OUT OF SCOPE - a decision, not a backlog item (2026-08-29).**

Both booklets are on disk and both would ingest fine. What is missing is the
KEY: no URL can be located, because the answer-key index is JS-rendered and
systematic probing of the era's own filename pattern produced only 404s
(`fetch-keys.ts` records exactly which forms were tried). Finding it needs a
browser against that index.

Ingesting 2016 WITHOUT a key would mean shipping ~180 answers on an unscored
blind pass into the one corpus whose entire value is that its answers are
measured against ground truth. Measured here, a single blind pass is
confidently wrong about 5 times in 100 - so that is ~9 wrong answers, each with
a fluent argument attached, and no way to find them. **Do not ingest 2016 on a
derived-only basis.** If the key later turns up, the pipeline is unchanged: add
the URL to `KEY_URLS`, and 2016-p2's `englishPages` is still an empty array, so
`requirePaper` will refuse it until someone runs `classify-pages.py` and fills
it in.

## The corpus

**22 booklets: both papers for EVERY year 2016-2026, no gaps.** ~1,980 questions.

| | Paper I "General Studies" | Paper II "CSAT" |
|---|---|---|
| Items / marks / time | 100 · 200 · 2 h | 80 · 200 · 2 h |
| Marking | +2 / −0.667 | +2.5 / −0.833 |
| Counts toward merit | yes | **no — qualifying at 33%** |

Paper II's scheme is byte-identical to NDA Mathematics, which
`src/lib/mocks/blueprints.ts` already models.

## NO ANSWER KEY EXISTS

Not in the booklets (their tail pages are questions or rough work), and not in
either source folder — checked exhaustively. **Every answer here is DERIVED**, by
two independent blind passes, and carries that provenance in `solution`.

> **UPSC publishes official Prelims answer keys on upsc.gov.in once a CSE cycle
> closes**, so keys for the older years are very likely obtainable. That would
> convert derivation into VERIFICATION and change the quality ceiling of this
> whole corpus. **Worth doing before scaling past the pilot.**

## Two source generations, one interleave rule

- `CSE_P1_2016` … `CSE_P1_2025` are prep-house extracts with the **Hindi pages
  removed** — English only, 18-22 pages. Printed page numbers survive and jump by
  two (3, 5, 7 …), which is the evidence they are faithful scans of the English
  versos rather than retyped compilations.
- **Every Paper II file**, and `QP_CSP_2026_..._PAPER-I_...`, are **raw UPSC
  booklets**: 40-56 pages, Hindi and English alternating, plus rough-work pages.

**The rule, verified on the 2025 Paper II and the 2026 Paper I: Hindi comes FIRST
and carries the same item numbers as the English page that follows, so in a raw
booklet ENGLISH IS AT EVEN 0-BASED INDICES FROM 2**, and the printed page label is
index + 1. `englishPagesFor()` in `lib.ts` encodes it; `config.englishPages` is
still explicit per paper, and `requirePaper` refuses a paper whose list is empty.

## Two paper shapes, one pipeline

**Paper I is the `scripts/cds-gs` shape** — 100 standalone MCQs with the nine
subjects interleaved page to page, so `subject`/`chapter` is a **per-question**
decision, hard-validated against `catalog.json`.

**Paper II is the `scripts/cds` shape** — its structure is `Directions for the
following N items:` blocks over **shared passages**, and they NEST: one block over
4 items can contain two passages, each governing 2. `context` carries the passage
that governs THAT item.

They share one pipeline, parameterised by `paper`. Forking would mean applying
every future fix twice — this repo already has a live instance of that drift.

## Pipeline

```sh
npx tsx scripts/upsc/seed-exam.ts --apply         # once: create the exam
npx tsx scripts/upsc/seed-subjects.ts --apply     # once: create the 14 subjects
python  scripts/upsc/seed-catalog.py --write      # once: (re)generate catalog.json

npx tsx scripts/upsc/render.ts   <paperId>        # 1. rasterise English pages + column crops
# 2. TRANSCRIBE by band (agents): data/<id>.b<N>.json — contract: TRANSCRIPTION_BRIEF.md
npx tsx scripts/upsc/merge.ts    <paperId> --apply # 3. 4 gates + merge
npx tsx scripts/upsc/dump-derive.ts <paperId> 25  # 4. emit BLIND packets -> out/derive/
# 5. DERIVE TWICE, independently (agents): derived/<id>.{a,b}.pN.json — DERIVATION_BRIEF.md
npx tsx scripts/upsc/crosstab.ts <paperId>        # 6. agreement report
#    adjudicate every DISPUTE/TWIN/MISSING by hand -> data/<id>.adjudicated.json
npx tsx scripts/upsc/crosstab.ts <paperId> --apply # 7. write data/<id>.answers.json
npx tsx scripts/upsc/commit.ts   <paperId> --apply # 8. commit PRIVATE
npm run audit:text -- "<sourceFile substring>"
npm run audit:omml -- "<sourceFile substring>"
```

Pure core in `lib.ts` (TDD: `tests/upsc-lib.test.ts`, 37 cases).
`out/` is gitignored (regenerable); `data/` and `derived/` are **committed** —
the derivations are the evidence behind every answer.

## What the pilot measured, once the official key arrived

The 2025 pilot shipped under the no-key regime: two independent blind passes,
**98.3% agreement (177/180)**, every disagreement in LOW. The official UPSC keys
for CSE 2025 were located afterwards, which turns that agreement rate into a
measured accuracy — and the gap is the point.

| | Paper I | Paper II | combined |
|---|---|---|---|
| single blind pass A | 94.0% | 91.2% | **92.8%** |
| single blind pass B | 95.0% | 93.8% | **94.4%** |
| what we shipped | 95.0% | 92.5% | **93.9%** |

**Where the two passes AGREED — 177 of 180 — they were right 94.4% of the time.**

That is the caveat this pipeline has always carried, now with a number on it:
agreement bounds *disagreement* risk and is blind to *correlated* error. Here it
**overstated accuracy by about four points**, because on 10 questions both passes
were confidently wrong in the same direction. One of those was HIGH/HIGH.

Confidence remains well calibrated against ground truth, which is why it is
still worth routing review by it — Paper II's blind pass scored **HIGH 63/63**,
and Paper I's **HIGH 69/70**. Every other error sat in MED or LOW.

Two lessons worth carrying:

- **Treat a dual-blind agreement rate as a floor, and assume roughly a 4-point
  shortfall to true accuracy** on this kind of content.
- **Hand adjudication is not automatically better than a pass.** Of the three
  disputes, two were adjudicated correctly and one was not: on `2025-p2 Q49` the
  stem states no truth-telling rule, pass B answered "cannot be concluded" at LOW,
  and the maintainer overrode it with the answer the setter *probably* intended.
  The official key says pass B was right. The brief already tells derivers to
  solve the question **as printed** rather than the intended version; that rule
  applies to the adjudicator too.

All 180 rows were re-derived to the official key afterwards — see `apply-key.ts`,
and note the delete-and-recommit that an answer change forces.

## Passages are SETS, not repeated text

Items sharing a passage are grouped: `assignSetLabels` labels each group by its
first item, `buildRecords` emits it as `setLabel`, and `commitStaged` turns that
into a `set_id` of `<uploadJobId>:<setLabel>`.

That is load-bearing in three places, and leaving it unset is a silent defect
rather than a cosmetic one:

- **`/browse`** — `groupBySet` collapses a run of rows sharing a `set_id` so the
  passage renders ONCE above its questions. Without it the full passage repeats
  on every card.
- **The Word export** — same grouping, so a downloaded paper prints the passage
  once under its Directions heading instead of once per question.
- **`applyEdit`** — a corrected passage is mirrored to every sibling in the set.
  Without a `set_id`, fixing one copy leaves the others stale.

`content_hash` excludes `setLabel`, so this can be backfilled onto committed rows
without changing any id — verified on the pilot (0 hashes changed).

Two rules the pure core enforces:
- **A passage carried by exactly one item gets no label.** A set of one is not a
  set, and `groupBySet` renders a lone context correctly without one. CSAT does
  produce these: a "Directions for the following 2 (two) items" block containing
  two passages gives each item its own.
- **A set whose members are not consecutive is REFUSED.** `groupBySet` only
  collapses a consecutive run, so a scattered set would render the same passage
  twice — the exact defect this exists to prevent. If it fires, an item in the
  middle has lost its copy of the passage, or two passages are interleaved.

On the 2025 CSAT: **13 sets covering 26 of the 28 passage-bearing items**, every
one a consecutive pair, the remaining 2 legitimately unlabelled.

### `context` is the PASSAGE, never the Directions block

`validateRows` REFUSES a context carrying a `Directions for the following N (n)
items :` preamble, and that rule was earned: on the pilot one band of five
included it while the other four did not, so two items shipped with a heading
claiming **2 items** above a card showing **1**. Nothing else caught it — the
text is real, the delimiters balance, the coverage is complete.

It cannot be fixed by grouping either. Items under one directions block routinely
have DIFFERENT passages, and `groupBySet` takes the passage from the first row of
a run — so making them one set would render the first passage above every member
and silently drop the rest. The preamble simply does not belong in a passage.

## The thing that matters most: OPTION FIDELITY

There is no key, so **every answer is derived by reading the options**. If the
correct option's TEXT lands in the wrong LETTER's slot, a blind derivation still
succeeds, still names a letter, and is wrong — and **no downstream check can catch
it**. On the sibling CDS English corpus that exact defect produced 19 wrong keys
while a full blind re-derivation returned `confirmed` on all 89 rows it saw.

Hence: transcription and derivation are **separate passes**, the derivation
packets **withhold** subject/chapter/difficulty/flags, and `mergeBands` compares
option **ORDER** as well as text.

## Two-column rendering

Both papers are set in two columns, so `render.ts` emits `pNN-c1.png` /
`pNN-c2.png` alongside the full page, and the brief tells agents to transcribe
from the columns. The gutter is **measured per page**, not assumed — page widths
range 539-618pt across eleven years and several booklets are visibly skewed.

Detection is a **median filter**, and two earlier attempts are recorded in the
code because both looked reasonable and both failed on real pages:

1. *widest run of near-zero columns* chose x=959 on `2025-p1` p21, where the right
   column is nearly empty and its internal whitespace is wider than the gutter. It
   sliced the "99." and "100." item numbers into the LEFT crop, leaving the right
   crop's questions **unnumbered**.
2. raising the near-zero threshold to catch speckle let runs **chain** across
   inter-word gaps, dragging the split to x=660.

The median works because **Paper II prints a vertical RULE down the gutter**:
~12px of solid ink whose *mean* over a 50px window is indistinguishable from body
text, but whose *median* is a dozen outliers among fifty samples.

Residual: a few crops still shear the item NUMBER off the left edge of `c2` (it
lands on `c1`'s right edge instead). No question text is affected, agents read
those numbers off the whole-page image, and the coverage gate would catch a real
loss. Worth tightening if this pipeline scales.

## What the pilot found

- **A band-seam gap the coverage gate could not see.** `2025-p2` Q32 opens *"With
  reference to the above passage"* and had **no passage** — its governing text is
  printed on p16, the previous BAND's last page, so the band that owned Q32 never
  saw it. Every other gate passed. It was caught by `findLonelyContexts`, which
  flags a `context` used by exactly one question, and confirmed against the page
  before Q31's passage was copied across.
- **Option (d) of the data-sufficiency items is NOT uniform.** Some print *"can be
  answered even **without** using any of the Statements"*, others *"**cannot** be
  answered even using any of the Statements"* — opposite meanings. A deriver
  working from a remembered option block gets these wrong while reasoning
  correctly.
- **The collision trap is real and was proven, not assumed.** A transcription
  agent mutated its own file to park the statement lists in `context` and showed
  that items 4 and 14 then collapse onto ONE content hash. Keeping per-item
  material in the stem is load-bearing, not stylistic.

## Gotchas

- **`--allow-unpublish` on a re-commit.** New rows default to PUBLIC (migration
  0022) and this pipeline forces PRIVATE. The guard counts PUBLIC rows *before*
  the insert, so only a genuine re-commit of a published paper trips it.
- **The shell eats backslashes.** Every agent that authored a validation probe
  through a bash heredoc got a corrupted probe — several reported false failures
  on data that was fine. Author anything containing a backslash through the
  editor. This bit the maintainer too.
- **A new exam row is visible immediately.** `listExams` selects every row of
  `exams` unfiltered, so `/browse` gains a "UPSC CSE (Prelims)" dropdown entry the
  moment `seed-exam.ts` runs. Nothing else surfaces — the homepage, nav, notes and
  guide hubs are all driven by `EXAM_REGISTRY`, a hand-maintained TS list this
  pipeline does not touch. **Adding the registry entry is a separate decision that
  belongs with publishing.**
