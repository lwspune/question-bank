# How much the afterboards keys can be trusted

The question this answers: **does the IPMAT corpus need a full blind re-derivation
before its rows go PUBLIC**, the way the Worksheets corpus did (~5% wrong source
keys, so every chapter was blind-re-derived)?

Three blind samples, one per subject, each scored and **pinned before any
adjudication** — because adjudicating a row destroys the measurement for it.

| sample | subject | scored | agreed | agreement | leads | wrong keys found |
|---|---|---|---|---|---|---|
| `va-calibration` | English | 40 | 37 | 92.5% | 3 | **0** |
| `lr-calibration` | Logical Reasoning | 34 | 32 | 94.1% | 2 | **0** |
| `maths-calibration` | Mathematics | 50 | 50 | **100%** | 0 | **0** |
| **combined** | | **124** | **119** | **96.0%** | **5** | **0** |

All five leads were adjudicated in the **source's** favour: four were our
derivation errors, one (`JIPMAT 2024 LR Q24`) is a genuinely ambiguous
odd-one-out item. See the two `*.adjudication.md` files.

## What this does and does not license

**It does not say the keys are 96% right.** Agreement bounds *disagreement* risk
and says nothing about *correlated* error — the CDS General Knowledge corpus read
98–99% on dual-blind agreement and scored 91.6% against the real key. Here the
relevant number is the one in the last column: **zero wrong keys in 124 rows where
a verdict was reached.**

**What 124 rows actually buys.** Zero found in 124 puts the wrong-key rate below
**2.4%** at 95% confidence — not below 1%. Honest reading: across 1,436 keyed rows
that permits up to ~34 bad keys, and across the 450 Indore 2022–26 mock questions
up to ~11. The point estimate is 0; the bound is what to quote.

**Why the Maths result is the strongest of the three**, despite arriving last:
16 of its 50 rows are **numeric** short-answer, where agreement cannot come from
landing on one of four options by luck. A numeric match is a much narrower
coincidence than an MCQ match, so a 50/50 containing 16 free-response rows is
better evidence than a pure-MCQ sample of the same size. Maths is also 549 rows —
38% of the corpus and 191 of the 450 mock questions — and was the last subject
measured, having been missed by both earlier samples: the VA packet drew on
English and the LR packet on Logical Reasoning, so the largest and most
wrong-key-prone subject had a sample size of zero until this pass.

**Verdict: no full blind re-derivation.** The Worksheets precedent does not
transfer — that corpus had AI-generated keys measured at ~5% wrong, where this one
has a human-edited source measured at 0 wrong in 124. Spending a blind pass on
1,436 rows to chase a rate bounded below 2.4% is not the best use of the effort.

## The per-row confidence flag

Introduced on the LR pass: a confidence flag recorded **while** deriving, before
scoring, in `<name>.confidence.json`. Across LR and Maths it has now separated
every sample it was used on:

| flag | rows | agreed |
|---|---|---|
| high | 74 | 74/74 |
| med | 9 | 8/9 |
| low | 1 | 0/1 |

Both LR disagreements sat in the 8 non-high rows; on the VA pass all three were
rows flagged uncertain in prose. **The flag has predicted 5 of 5 disagreements**,
and it costs nothing to record, so record it on every future pass.

**Its limit, stated because it is easy to over-read:** it cannot see a confident
error. A wrong answer I was sure of is flagged high and looks exactly like the 74
that agreed. The flag ranks rows for re-reading; it is not evidence that the
high-confidence rows are right.

## What the packets cannot measure

`dump-derive.ts` emits **text only**. 15% of the LR sample (6 of 40 rows) was
unanswerable because the figure *is* the question — two bar graphs, a pie chart,
a Venn-diagram option set and a match-the-columns item whose columns the source
publishes as an image. None of the six is an ingestion defect: all carry their
figures into `data/build`.

Consequence: a per-stratum agreement figure covers that stratum's **text-only**
rows, and a figure-heavy stratum is measured on a self-selected subset of itself.
The 65 figure-bearing rows corpus-wide are therefore **unmeasured**. A packet that
referenced the attached PNGs would close this; until then, treat those 65 rows as
outside every number on this page.
