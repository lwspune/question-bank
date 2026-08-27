# CDS General Knowledge ingestion

Scanned CDS "General Knowledge" booklets (image PDFs, **no text layer**, **NO ANSWER KEY**)
→ the bank, `question_kind='pyq'`, under the existing **CDS** exam across **8 new
General-Knowledge subjects**.

**Status: 4 of 19 papers committed PRIVATE — 480 q. A 5th (`2024-2`) is transcribed
and merged but not yet derived. Nothing is PUBLIC.**

| paper | committed | dual-blind agreement | HIGH | MED | LOW |
|---|---|---|---|---|---|
| 2018-1 | 120 | 118/120 — 98.3% | 83/83 | 30/30 | 5/7 |
| 2025-1 | 120 | 117/120 — 97.5% | 94/94 | 20/21 | 3/5 |
| 2025-2 | 120 | 119/120 — 99.2% | 95/95 | 20/20 | 4/5 |
| 2024-1 | 120 | 118/120 — 98.3% | 71/71 | 41/42 | 6/7 |

**Four independent measurements, stable to within 1.7 points, and HIGH is 343/343 across
all of them** — every single disagreement in every paper sits in MED or LOW. The confidence
field is a reliable router for review effort. What this still does NOT measure is correlated
error; see "What the pilot measured" below, which stands unchanged. Publishing is a
separate, deliberate decision — read that section before taking it.

## Why this is not the `scripts/cds` pipeline

The sibling CDS **English** pipeline is shaped entirely by `Directions:` blocks, shared
passages, underlines and set labels. A GK paper has **none of that**: it is 120 standalone
MCQs with the eight subjects **interleaved** throughout — a single page can run chemistry,
then history, then current affairs. So `subject`/`chapter` is a **per-question** decision,
hard-validated against `catalog.json`. That is the `mh-ssc-10` shape, not the `cds` one.

What IS reused: the `commitStaged` path, the difficulty/option self-heals, the LaTeX-balance
and content_hash-collision gates, and the PUBLIC-demotion guard (fixed here — see below).

## The corpus

19 sittings on disk, **2016-II … 2026-I** (2016-I and 2017-I are absent from the source
folder, not skipped). 120 items / 100 marks / 2 hours / one-third negative.

Two source generations, and the difference matters:

| | Papers | Pages | Layout |
|---|---|---|---|
| Prep-house reprints | 18 (2016-II…2025-II) | 18–23 | **English only** — Hindi versos removed, booklet codes and printed page numbers intact, so these are faithful scans |
| Raw UPSC booklet | `2026-1` | 48 | **Hindi and English alternating** + rough-work pages — needs a page-selection pre-pass (`englishPages` in config) |

`CDS GK 2016.pdf` carries no sitting in its filename; its cover is stamped
"CDS Exam(II):2016", so it is the **second** sitting.

## Pipeline

```sh
npx tsx scripts/cds-gs/seed-subjects.ts --apply     # once per bank: create the 8 subjects
npx tsx scripts/cds-gs/render.ts   <paperId>        # 1. rasterise pages -> out/<id>/pNN.png
# 2. TRANSCRIBE by band (agents): data/<id>.b<N>.json — contract: TRANSCRIPTION_BRIEF.md
npx tsx scripts/cds-gs/merge.ts    <paperId> --apply # 3. merge + coverage + catalog gates
npx tsx scripts/cds-gs/dump-derive.ts <paperId> 30   # 4. emit BLIND packets -> out/derive/
# 5. DERIVE twice, independently (agents): derived/<id>.{a,b}.pN.json — DERIVATION_BRIEF.md
npx tsx scripts/cds-gs/crosstab.ts <paperId>        # 6. agreement report
#    adjudicate every DISPUTE by hand -> data/<id>.adjudicated.json
npx tsx scripts/cds-gs/crosstab.ts <paperId> --apply # 7. write data/<id>.answers.json
npx tsx scripts/cds-gs/commit.ts   <paperId>        # 8. dry-run
npx tsx scripts/cds-gs/commit.ts   <paperId> --apply # 9. commit PRIVATE
python  scripts/cds-gs/audit_fidelity.py            # 2018-1 only — see below
npm run audit:text -- "<sourceFile substring>"
npm run audit:omml -- "<sourceFile substring>"
```

Pure core in `lib.ts` (TDD: `tests/cds-gs-lib.test.ts`, 30 cases).

## The one thing that matters most: OPTION FIDELITY

There is no key, so **every answer is derived by reading the options**. If the correct
option's TEXT lands in the wrong LETTER's slot, a blind derivation still succeeds, still
names a letter, and is wrong — and **no downstream check can catch it**. On the sibling CDS
English corpus that exact defect produced 19 wrong keys while a full blind re-derivation pass
returned `confirmed` on all 89 rows it saw, one of which was later disproved from the page.

Hence: transcription and derivation are **separate passes** (a transcriber's guess would
anchor the deriver), the derivation packets withhold subject/chapter/flags/difficulty, and
option **set** and label→text **ORDER** are both checked.

## Two-column hazard — every band hit it

The booklet is a two-column grid and PyMuPDF's reading order **interleaves the columns**: at
the foot of a page one question's option block and its neighbour's are emitted line-for-line
into each other. A question's options belong to the question directly above them **in the
same column**. Assign by x-coordinate or by cropping one column; never by the text layer's
order.

## `audit_fidelity.py` — and why it only exists for one paper

`2018-1` is the **only** paper of the 19 with an OCR text layer, which gives a second,
non-LLM channel to check the transcription against. The probe reconstructs columns from word
coordinates, scopes each question to its own span, and diffs option set + order.

It took three rounds of calibration against real data, and each round's false findings are
worth knowing because they recur:

1. **Cross-question substring collision** — Q1/Q2/Q4 sit in one column and share option words
   (Potassium, Caesium, Calcium). A whole-column `find()` matched a neighbour's text and
   produced bogus ORDER findings. Fixed by per-question span scoping.
2. **Span boundary** — OCR rounds y-coordinates, so the next question's stem can be emitted
   just before the previous question's last option. Showed up as a missing option **D** on 7
   of 13 findings. Fixed with a short tail.
3. **Options OCR cannot represent** — LaTeX, Match-List code rows, and generic code strings
   ("1 and 2 only") are skipped **by shape**. That is a **stated limitation, not a
   suppression**: the probe therefore cannot catch a swapped code option, and only the manual
   page check covers that class.

**Result on the pilot: 6 findings, 0 genuine defects** — 4 are the Statement I/II shared code
block (see below), 1 is symbolic (proton/neutron counts OCR reflows), 1 is a known OCR
misread (`Urna`→`Uma`, page verified at 6×).

## The shared code block — a real property of the paper

Q12–Q18 are a run of seven Statement I/II items governed by **one** `Directions:` block whose
four coded options are printed **once**, on p02. Q15–Q18 on p03 print only "Statement I:" and
"Statement II:" and **no option block at all** (verified on the page image). The transcriber
correctly replicated the options onto each of the seven. `audit_fidelity.py` detects such runs
by shape — an identical option set on more than one question — and checks them page-wide
rather than per-span, so the data being RIGHT is not reported as a defect.

## What the pilot measured

- **Dual-blind agreement: 118/120 = 98.3%** (TWIN 0, MISSING 0).
- **Agreement by the weaker of the two confidences: HIGH 83/83 · MED 30/30 · LOW 5/7.** All
  disagreement is concentrated in LOW, so the confidence field is well calibrated.
- **Both disputes went AGAINST the higher-confidence pass.** On Q57 pass A answered at HIGH
  and was wrong; the LOW pass was right. **A single pass's HIGH is not sufficient evidence on
  this corpus.**
- 5 rows are AGREE-but-both-LOW (Q41, Q65, Q74, Q102, Q109) — the weakest in the paper, and
  agreement there is the weakest evidence the pipeline produces.

**What this does NOT measure.** Agreement bounds *disagreement* risk. It does not bound
*correlated* error: on a fact-recall question both passes can be confidently wrong in the same
direction, and nothing here can see that. There is no external anchor — UPSC does not appear
to reuse GK items between NDA and CDS (probed: five distinctive stems, zero matches in our NDA
GK bank), unlike the English paper where it does. Treat 98.3% as a floor on quality, never as
an accuracy estimate.

## Known paper defects found (transcribed as printed, never smoothed)

- **Q41** — asks for ascending order of atmospheric gases; the true ascending order is not
  among the four options, and the only monotonic option is the *descending* order. Both passes
  independently reached this. Genuinely defective.
- **Q118** — four numbered statements, but the code offers only {1}, {2,3}, {3}, {1,4}: no
  option can express "4 only", "1 and 2", etc.
- **Q84** — options (b) and (c) are word-for-word identical except for the order of two ranks,
  which IS the question. Do not "normalise".
- **Q92** — option order is non-standard ((a) is `1, 2 and 3`, (d) is `1 only`). As printed.
- **Q27 / Q35** — the same four Match-List code rows with (a) and (c) transposed between the
  two questions. Copying one block onto the other yields a right-text/wrong-letter key.

## Catalog gaps — the pilot's other deliverable

`catalog.json` was generated once from the NDA GAT-GK taxonomy (8 subjects / 59 chapters /
246 subtopics) by `seed-catalog.ts`, and is now the hand-edited source of truth. The pilot and
a separate 4-paper survey (`CATALOG_GAPS.md`) both found the same headline gap and several
more. **These are NOT yet applied** — adjudicate as a batch before scaling:

- **Economics is badly under-built** — 1 chapter / 3 subtopics caught 1 of ~17 economics
  questions sampled. Needs public finance/taxation, microeconomic theory, money and banking,
  national-income statistics.
- **Defence as institutions** — force organisation, operations, Army/Air Force equipment, and
  the paramilitaries (ITBP/BSF/CRPF) have no home but a Current-Affairs exercises chapter.
- **Computer science has no home at all** (4 consecutive questions in 2025-II).
- Polity: citizenship, emergency provisions, state legislatures, post-1947 statutes.
- Also: Indian demography/census, law of the sea, world ports, ancient World History, Hindu
  rock-cut architecture, early-medieval agrarian economy.

## Gotchas

- **`--allow-unpublish` on a FIRST commit.** New rows default to PUBLIC (migration 0022). The
  sibling pipeline counts PUBLIC rows *after* `commitStaged`, so it sees the rows it just
  created and refuses a paper that was never published. Here the count is taken **before** the
  insert, so the guard means what it says. (Fixed after it fired on this very pilot.)
- **The shell eats backslashes.** Every agent that authored a validation probe through a bash
  heredoc got a corrupted probe — one reported 176/176 false failures, another a false PASS.
  Author anything containing a backslash through the editor. This bit the maintainer too.
- **OCR "missing" question numbers are typesetting artifacts**, three distinct causes found:
  `88,` (comma for period), `6 6 .` / `6 8 .` (internal spaces). All three questions exist.
- `out/` is gitignored (PNGs + blind packets, regenerable). `data/` and `derived/` are
  **committed** — the derivations are the evidence behind every answer.
