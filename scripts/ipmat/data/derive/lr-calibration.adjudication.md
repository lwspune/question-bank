# LR calibration — adjudicating the two leads

Score pinned in `lr-calibration.score.json` **before** any of this was read:
**32/34 = 94.1% agreement** with afterboards' own key, packet commit `6a5a3a2b`.
Agreement is not accuracy — see the header of `score-derive.ts`.

Adjudicated after pinning. Both leads resolve in the **source's** favour, so this
sample found **zero wrong keys**.

## Lead 1 — IPMAT Rohtak 2019 VA Q24 (Critical Reasoning) · ours B, source A

> Should powerful nations attack relatively weaker nations which pose probable
> danger to world peace?
> 1. Yes. War is justified for the noble purpose of peacekeeping.
> 2. No. War/violence should never be resorted to.

**Source is right; our B was a doctrine error.** Strong-vs-weak argument marking
treats a sweeping absolute as *weak*: "should **never** be resorted to" is an
unqualified universal, which is the textbook signature of a weak argument. I
picked it because I read it as the morally safer claim, which is not the axis the
question marks on. Argument 1 at least engages the stated premise (a probable
danger to world peace) with a purpose.

**Defect found in the row while adjudicating, unrelated to the key.** All four
options read "is implicit" — boilerplate from a *statement-and-assumption* item
pasted onto a *strong-argument* item, which is why option C reads "either
assumption 1 or 2". The stem says "Arguments", so the item is unambiguous, but
the option wording is the source's, not ours. Left verbatim: this is a source
transcription question to record, not one to silently repair, and the same
mismatch may recur across afterboards' argument items.

## Lead 2 — JIPMAT 2024 LR Q24 (Odd One Out) · ours B, source C

> Unscramble: POROT, ROPUG, BMO, SALCS → TROOP, GROUP, MOB, CLASS

**Source's C (MOB) accepted; our B (GROUP) is defensible but not established.**
Two readings compete and the item does not choose between them:

- **MOB** — troop, group and class are *orderly* collections; a mob is
  disorderly. The conventional reading, and the source's.
- **GROUP** — the umbrella term; troop, mob and class are each a *kind* of
  group. The reading I took.

Neither is forced by the stem, so this is an **ambiguous item**, not a wrong key.
Recorded as such; it ships with the source's key.

## What the confidence flag bought

New this pass: a confidence flag recorded per row *while* deriving, in
`lr-calibration.confidence.json`, written before scoring. It separated the
sample completely:

| flag | rows | agreed |
|---|---|---|
| high | 26 | 26/26 |
| med | 7 | 6/7 |
| low | 1 | 0/1 |

Both disagreements sat in the 8 non-high rows, so re-reading **8 of 34 rows would
have caught 100% of them**. On the VA pass all three disagreements were likewise
rows I had flagged uncertain in prose. Two samples is not a base rate, but the
flag has now predicted 5 of 5 disagreements, and it costs nothing to record.

**Its limit: it cannot see a confident error.** A wrong answer I am sure of is
flagged high and reads exactly like the 26 that agreed. The flag ranks rows for
re-reading; it is not evidence that the high-confidence rows are right.

## Six rows the packet could not ask

Declared in `lr-calibration.confidence.json` under `blockedByFigure`, excluded
from the denominator rather than guessed:

| row | item | why |
|---|---|---|
| 1 | ipmat-indore 2019 MCQ Q38 | bar graph (imports vs exports) not in packet |
| 28 | jipmat 2022 LR Q30 | Venn-diagram options are empty in the row |
| 32 | jipmat 2024 LR Q12 | match-the-columns stem: the two columns are an image at the source |
| 35 | jipmat 2024 LR Q25 | bar graph (traffic receipts vs expenditure) not in packet |
| 36 | jipmat 2024 LR Q27 | pie chart (book-production expenses) not in packet |
| 38 | jipmat 2024 LR Q30 | bar graph (GDP growth by region) not in packet |

**15% of a random reasoning sample is unanswerable from text alone** — far above
the VA rate, because data-interpretation sets live in the reasoning sections and
*are* their figure.

**Checked, and none of the six is an ingestion defect.** Every one carries its
figure through to `data/build`: rows 1, 32, 35, 36 and 38 have one stem figure
each, and row 28 has four — one per Venn option, which is why its four option
*texts* are blank and its `imageUrl`s are not. Row 32 looked at first like a lost
*text* defect (a match-the-columns item with no columns), but the source publishes
those two columns as an `<img>` inside the question, so the pipeline did the
right thing. The figures are on disk as PNGs from the attach step.

So the one consequence is about the **packet**, not the bank: `dump-derive.ts`
emits text only, so a derivation pass over any figure-heavy stratum measures a
self-selected subset of it and silently under-reports how much of that stratum it
covered. A packet that referenced the attached PNGs would close this. Until then,
read a per-stratum agreement figure as covering the text-only rows of that
stratum.
