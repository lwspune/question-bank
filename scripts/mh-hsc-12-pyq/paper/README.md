# MH HSC Class-12 Maths — the BOARD PAPER lane

The sibling pipeline one directory up (`../extract.ts`) ingests an LWS
**chapterwise compilation** (.docx, via pandoc). This lane ingests the **actual
printed board question papers** (PDF). Different source, different failure modes,
and — for the two sittings they overlap on — a way to check the compilation
against the page it was typed from.

## The six papers

| id | source file | printed cover | code | status |
|---|---|---|---|---|
| `feb-2026` | `March 2026 paper.pdf` ⚠ | **2026 II 21** | J-165 | new |
| `jun-2026` | `June 2026 paper.pdf` | 24/06/2026 | J-276 | new |
| `jul-2024` | `Maths July 2024 paper.pdf` | 2024 VII 25 | J-174 | new |
| `jul-2025` | `Maths July 2025 paper.pdf` | 2025 VII 03 | J-384 | new |
| `mar-2024` | `Maths March 2024 paper new.pdf` | 2024 III 02 | J-862 | **reconcile** — 42 of 44 in bank |
| `feb-2025` | `Maths March 2025 paper new.pdf` ⚠ | **2025 II 22** | J-312 | **reconcile** — 44 of 44 in bank |

⚠ **Two files are misnamed**, both calling a February sitting "March". The
printed cover is truth; `render.ts` re-reads it and REFUSES to run on a paper
whose cover disagrees with `config.ts`. Fault-injecting a wrong month and a
wrong paper code both trip it, so it is a gate rather than a comment.

**The compilation's 2024/2025 rows ARE these papers.** Their `Q. 1. (vi)`,
`Q. 1. (vii)`, `Q. 1. (viii)` and `Q. 2. (iv)` stems match the March-2024 cover's
items verbatim. A question-number census gives the exact delta: March 2024 is
missing `Q. 2. (iii)` and `Q. 23`; February 2025 is complete.

## Paper shape — identical on all six

44 items, 112 printed marks against a Max of 80. The gap **is** the optionality.

| section | refs | n | format | marks | choice |
|---|---|---|---|---|---|
| A | `Q. 1. (i)`–`(viii)` | 8 | mcq | 2 | all |
| A | `Q. 2. (i)`–`(iv)` | 4 | subjective | 1 | all |
| B | `Q. 3`–`Q. 14` | 12 | subjective | 2 | any 8 |
| C | `Q. 15`–`Q. 26` | 12 | subjective | 3 | any 8 |
| D | `Q. 27`–`Q. 34` | 8 | subjective | 4 | any 5 |

**Not a `/mock` candidate**, complete though these papers are: 36 of 44 items are
free-response and three sections carry "attempt any N". Neither auto-grades.

## The text layer is lossy, and silently

Born-digital typeset, so a text layer exists (~5–7k chars) — but every math
symbol is a glyph **image**, not a character, so the layer renders

    The converse of contrapositive of  is _____.

for a question whose entire content is the missing `~p → q`. Nothing marks the
hole. `dump-text.ts` marks it: each line carrying dropped glyph-images is
prefixed `[math xN]`, so a transcription pass can see its own blind spots.
Measured loss: 40–72% of lines per paper.

**Use the text layer for** numbering, section boundaries, marks brackets, reading
order and pure-prose stems. **Never** transcribe math from it.

## Figures

Switching circuits are the only figure genre in this corpus — 5 of 5 in the
shipped bank, 4 of 4 here. `fig_bounds.py` finds them; see its docstring for the
two rules and the measurements behind them. In short: a figure is embedded as one
raster **sliced into contiguous same-x strips**, and is distinguished from tall
display math by having **no text beside it** (once the right-margin marks bracket
is excluded) plus a height floor sitting in a measured 21.0pt → 82.3pt gap.

Result across the six papers: **4 figures, 0 false positives.**

| paper | ref | in bank? |
|---|---|---|
| `mar-2024` | `Q. 15` | yes — a 512×276 speckled photocopy, to be **replaced** |
| `feb-2025` | `Q. 15` | yes — 437×210, to be **replaced** |
| `jul-2024` | `Q. 27` | **no** — sitting never ingested |
| `jul-2025` | `Q. 27` | **no** — sitting never ingested |

`Q. 3` on both 2026 papers says "**Construct** the switching circuit" — the
student draws it, so there is nothing to crop. Do not add them to `figureRefs`.

⚠ **A grep over the stems missed `jul-2024` Q.27** — the corpus's largest figure.
The stem does say "the following **circuit**"; the pattern enumerated
`switching circuit` and `given circuit` and never bare `circuit`, so a third
phrasing walked through and nothing reported a near-miss. Detection over the
whole paper found it at once. That is why `crop-figures.ts` reconciles detection
against the manifest **both ways** and fails on either mismatch, and why
detection — not prose — is the source of truth for `figureRefs`.

⚠ **A crop is not verified because the geometry is confident.** On the NCERT
Class-10 run, 6 of 22 crops passed every numeric check and were visibly wrong.
`crop-figures.ts` writes a contact sheet and prints REVIEW REQUIRED; it never
reports success. The human verdict lives in `data/figures/verified.json`, and a
crop with no entry there has not been looked at.

## Pipeline

```sh
# 1. verify each printed cover against the manifest, then rasterise
npx tsx scripts/mh-hsc-12-pyq/paper/render.ts --all

# 2. dump the lossy text layer as a transcription scaffold
npx tsx scripts/mh-hsc-12-pyq/paper/dump-text.ts --all

# 3. find + crop the figures, then LOOK at out/_contact/<id>.png and record the
#    verdict in data/figures/verified.json
npx tsx scripts/mh-hsc-12-pyq/paper/crop-figures.ts --all

# 4. transcribe -> data/<id>.questions.json, then check the STRUCTURE
npx tsx scripts/mh-hsc-12-pyq/paper/verify.ts <id>

# 5. keys: dump blind, derive TWICE independently, reconcile
npx tsx scripts/mh-hsc-12-pyq/paper/dump-blind.ts <id>     # BEFORE either derivation
#    pass 1 -> out/<id>/authoring-keys.md
#    pass 2 -> out/<id>/blind-keys.md   (given only out/<id>/blind-mcq.md)
npx tsx scripts/mh-hsc-12-pyq/paper/reconcile-keys.ts <id> --apply

# 6. solutions: one file per authoring lane, merged under the style gate
npx tsx scripts/mh-hsc-12-pyq/paper/apply-solutions.ts <id> --apply

# 7. commit PRIVATE, audit, publish
npx tsx scripts/mh-hsc-12-pyq/paper/commit.ts <id> --apply
npm run audit:text -- MH_HSC_12_Maths_PYQ__<YEAR>_<Month>
npm run audit:omml -- MH_HSC_12_Maths_PYQ__<YEAR>_<Month>
npx tsx scripts/mh-hsc-12-pyq/paper/flip-public.ts <id> --apply
```

### Step 5 is an ORDERING, not a redaction

`dump-blind.ts` REFUSES to run once any MCQ carries an answer. A second pass that
can see the first one's answer is a review, and a review agrees far too readily;
withholding at dump time is the only version that cannot leak. `reconcile-keys.ts`
never picks a winner — a disagreement is reported with both answers for a human
to adjudicate against the page, and it refuses to apply while one is outstanding.

### Step 6 is one file per lane

Several passes author at once. Pointing them all at the shared transcription
makes the last writer win and loses the rest silently, so each writes
`out/<id>/solutions-<lane>.json` and `apply-solutions.ts` merges them. Two lanes
claiming the same ref is an ERROR, not a merge. Every solution goes through
`probeBoardAnswer`; its errors block.

## What went in

**Four sittings, 175 questions PUBLIC, 2026-09-19.** 32 MCQ + 143 free-response,
all 15 Maths chapters on every paper. Maths PYQ 317 -> 492.

| sitting | rows | of printed | note |
|---|---|---|---|
| February 2026 (J-165) | 44 | 44 | |
| June 2026 (J-276) | 44 | 44 | |
| July 2024 (J-174) | **43** | 44 | Q.12 absorbed, see below |
| July 2025 (J-384) | 44 | 44 | |

**Every key double-derived, 32 of 32 agreed, 0 disagreements**, all at high
confidence. Both passes are committed per sitting under `data/keys/`.
`audit:text` and `audit:omml` clean on all four. Every answer is DERIVED and
REVIEW-flagged in the data JSON.

Rollback, per sitting:
`delete from questions where source_file='MH_HSC_12_Maths_PYQ__<YEAR>_<Month>.pdf';`

### Absorption: recorded, not tolerated

July-2024 `Q. 12` did not insert. The board had set a **Balbharati textbook
exercise verbatim** (`Ex 4.2 I (8)`, Definite Integration), so the exam-scoped
`content_hash` folded the exam question into the practice row already there.

That is ordinary, and it is why `commit.ts` NAMES what absorbed each row instead
of printing a count: the first run of this reported "an earlier sitting's
provenance" and was wrong: the twin had no year at all.

The shortfall is carried in the manifest as `absorbedRefs`, so `flip-public.ts`
expects `44 - absorbed` for that sitting and still refuses every OTHER cause of a
short count. Fault-injecting a second, fabricated absorption trips it.

### And one that did NOT happen, on one character

Feb-2026 `Q. 6` is the **same question** as March-2024 `Q. 6` — the board reusing
an item two years apart. It was expected to be absorbed by the exam-scoped
`content_hash` and was not, because the 2024 row reads `Find \(k,\)` with the
comma INSIDE the math delimiters and the 2026 transcription reads `Find \(k\),`
with it in prose. One character of typography, different hash, no absorption.

Both outcomes are defensible — keeping the pair preserves the recurrence signal,
which is this project's stated policy — but the mechanism is luck, not design. Had
the older row been transcribed the same way, the 2026 provenance would have
vanished into a `skipped=1`. That is precisely why `commit.ts` names absorbed
rows instead of reporting a count.

## Recurrence, and how much of it we can actually see

The board reuses questions, so `commit.ts` **names** every row the exam-scoped
`content_hash` absorbs rather than printing a count: a silent `skipped=1` in a
whole-paper ingest is indistinguishable from a question that was never on the
paper.

`probe-reuse.ts` reports recurrence before commit. **Its output is a floor.** It
compares text, so it sees through typography and misses rewording — and the board
re-words constantly. The pair-of-lines bookwork has been set in 2016, 2018, 2020,
2025 and 2026 under four different opening phrases, and the probe reports none of
them; across 361 Maths PYQ rows it finds exactly one group.

⚠ Do not measure recurrence with an ILIKE on a phrase. "differentiable function
of" matches **three different theorems** here (chain rule, inverse-function
derivative, parametric derivative), and an earlier note in this repo mistook that
for one proof recurring four times.

## Reconciliation is gated

`mar-2024` and `feb-2025` overlap 86 rows that are already PUBLIC. Verifying
those against the printed page is the highest-value thing in this batch — it is
the first independent ground truth for a compilation the project has already
caught wrong 18 times out of 22 adjudicated defects. It is also **rework of
shipped content**, so it goes through a backfill-ledger entry + a 360 analysis +
explicit sign-off before any row is touched.

Note `content_hash` covers the stem, so correcting a stem is **delete +
re-commit**, not an edit — which is exactly why the gate exists.
