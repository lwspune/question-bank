# UCEED (IIT Bombay design entrance): Part A past papers

UCEED is IIT Bombay's B.Des entrance, sat after Class 12. Every paper from 2015 to 2026 and
IIT Bombay's **final** answer key for each are public at
`https://www.uceed.iitb.ac.in/<year>/downloads.html`. The key is the answer of record:
nothing is committed on anything else.

## Status

| Year | Part A | State |
|---|---|---|
| 2026 | 57 q (14 NAT, 15 MSQ, 28 MCQ) | **PUBLIC 2026-11-03**: 41 rows (28 MCQ, 13 NAT); its 15 MSQ + Q14 range PUBLIC 2026-11-06 |
| 2025 | 57 q (14 / 15 / 28) | **PUBLIC 2026-11-04**: 42 rows; 15 MSQ PUBLIC 2026-11-06 |
| 2024 | 57 q (14 / 15 / 28) | **PUBLIC 2026-11-04**: 39 rows; 15 MSQ + 3 range PUBLIC 2026-11-06. Q14 two answers, Q31 animation (note + grace) |
| 2023 | 68 q (18 / 18 / 32) | **PUBLIC 2026-11-04**: 46 rows; 18 MSQ + 4 range PUBLIC 2026-11-06. Five picture-only stems |
| 2022 | 68 q (18 / 18 / 32) | **PUBLIC 2026-11-04**: 49 rows; 18 MSQ + 1 range PUBLIC 2026-11-06. Q6, Q39 animations (note + grace) |
| 2021 | 68 q (18 / 18 / 32) | **PUBLIC 2026-11-04**: 49 rows; 18 MSQ + 1 range PUBLIC 2026-11-06. Q1 key not reproducible from the figure, Q15 two answers (note + grace) |
| 2020 | 68 q (18 / 18 / 32) | **PUBLIC 2026-11-04**: 50 rows (2 cancelled by IIT Bombay: Q64, Q65); 18 MSQ PUBLIC 2026-11-06 |
| 2019 | 85 q (20 / 20 / 45) | **PUBLIC 2026-11-04**: 65 rows; 20 MSQ PUBLIC 2026-11-06. Q3, Q17 two answers; Q20's key (160) not reproducible from the sketch (note + grace) |
| 2018 | 85 q (20 / 25 / 40) | **PUBLIC 2026-11-06**: all 85. Q15 from a scanned page and Q55 a bare "55" (`extract.py` PAGE_CLIPS, BARE_OK); Q12, Q19, Q33, Q34, Q45, Q64, Q78, Q84 two answers (note + grace) |
| 2017 | 85 q (20 / 25 / 40) | **PUBLIC 2026-11-06**: all 85. Q35's statement C is false as printed (ozone), Q42 two answer sets (note + grace) |
| 2016 | 80 q (20 / 20 / 40) | **PUBLIC 2026-11-06**: all 80. Q6 two answer forms, Q27 no net fits, Q62 and Q75 no option right as printed, Q79 two answers (note + grace) |
| 2015 | 100 q (20 / 30 / 50) | **PUBLIC 2026-11-06**: all 100. Q67 dropped by IIT Bombay; Q68, Q76 keys not reproducible from the figure, Q78 two answers (note + grace) |

2015-2018 were drafted by helpers in slices of 25-29 questions and agreed with IIT Bombay's key
on **82/99, 63/80, 69/85 and 74/85** (2015 excludes its dropped Q67). Every disagreement was settled
by the main session against the figure; the key stands unless the figure contradicts it (then a
defect note + grace).

**Blind measurement (2026):** a helper solving from questions + figures alone agreed with IIT
Bombay's key on **53 of 57** (NAT 14/14, MSQ 14/15, MCQ 25/28), and on **29 of 29** of the answers
it marked high-confidence. All four misses were its own medium/low calls: Q15 (missed one
MSQ option), Q40 (cut discs), Q45 and Q52 (dense counts, each one off). So a helper's blind solve
is a sound draft for the other papers; its low-confidence counts need the key, and a dense
count's solution gives the method and IIT Bombay's figure rather than an enumeration that
pretends to land on it.

Part B (two drawing questions, 100 marks since 2025) is **not** ingested: the brochure says
no model solution exists (section 17.2), so there is nothing to show under it.

## Owner decisions (2026-11-03)

- **Go ahead with the pictures.** Competitors reproduce the figures as-is (Collegedunia's
  solved PDFs cut them straight from the paper, logos included); nobody else puts the questions
  on web pages. Three safeguards competitors skip:
  1. **Credit on every question.** `pyq_note = "IIT Bombay"`, so the card's source tag reads
     `UCEED · 2026 · IIT Bombay · Q12` (config.ts `PYQ_NOTE`; it publishes because it is a
     short `pyq` note, `publicPyqNote`).
  2. **Figures kept out of Google Images.** A `noimageindex` robots tag on UCEED's indexable
     pages (the `/questions/uceed/...` chapter pages). Lands with the registry entry, before
     anything is PUBLIC.
  3. **Takedown on request.** A figure can be removed by flipping its question PRIVATE; the
     text stays in the bank.

## Multiple-select and range rows

Since migration 0214 the bank stores both: MSQ as `question_format = 'msq'` (one or more correct
options) and a NAT keyed as a range in `numeric_answer` + `numeric_answer_max`. They are committed
like any other row; all of them are PUBLIC since 2026-11-06, with 12 Part A mocks (MOCKS.md).
`publish.ts <year> --skip-msq --apply` publishes only the MCQ and exact-NAT rows, for a time when
the live site cannot show multiple-select rows; normally `publish.ts <year> --apply` publishes all. Mock marking per year, including each
MSQ scheme, is `uceedPaper` in src/lib/mocks/blueprints.ts.

An MSQ key that accepts **two** sets (2026 Q18: "B,C or B,C,D") stores the first; the row opens
its solution with a note and rides as grace in mocks.

## Method

```
src/<year>-paper.pdf ──extract.py──> work/<year>/draft.json + figures/<year>/Q<nn>.png + contact sheets
                                       │ a person reads every question against the page
                                       ▼
                     data/<year>.questions.json (text, options, figure, classification, solution)
src/<year>-key.pdf ──(read, checked against the rendered page)──> data/<year>.key.json
                                       ▼
                     commit.ts <year>  (planPaper: refuses on any issue)
```

- **Figures are the embedded image objects, not crops.** Each UCEED question's picture is ONE
  embedded raster (800 px wide) with its A-D panels and their letters drawn inside it, so
  `extract.py` saves the object: no page text leaks in, and no printed page watermark can reach
  it. A question with two pictures gets them stacked. **LOOK at every contact sheet.**
- **Picture options** are stored as `[figure]` (empty text in the bank); the figure shows them.
- **content_hash folds in the figure's bytes** (SSC CGL's `figureAwareHash`, for MCQ and NAT
  alike). UCEED asks "How many ...?" and "Which of the options will replace the question mark?"
  of a new picture every year; a text-only hash would merge those into one row.
- **The watermark gate flags colour pictures** (a blue cube, water drops, sky in a photograph).
  Look at each, then set `"watermark": "none"` on the question.
- **Blind solve before the key, where possible.** A helper solves a paper from `blind/<year>/
  payload.json` (questions + figures, no key) into `derived.json`; the main session compares it
  with the key, settles every disagreement, and writes the solutions. 2026's blind run was the
  measurement of how far picture puzzles can be solved blind.

Sources, figures and blind runs live under `C:\tmp\PYQPs\UCEED\` (not committed); `data/`
holds the transcriptions and keys.

## Commands

```sh
python -I scripts/uceed/extract.py 2026              # draft + figures + contact sheets
npx tsx scripts/uceed/commit.ts 2026                  # dry run: plan, checks, hashes
npx tsx scripts/uceed/seed.ts 2026 --apply            # exam + the subjects this paper uses, right before:
npx tsx scripts/uceed/commit.ts 2026 --apply          # PRIVATE
```

## Taxonomy

Subjects are the seven Part A areas of the official syllabus (brochure section 16), in its
order (`SUBJECTS` in config.ts). Chapters are question types within an area:

- **Visualization and Spatial Reasoning**: Paper Folding and Cutting · Mental Rotation and Views ·
  Pattern and Figure Completion · Puzzles and Assembly · Mazes and Paths
- **Practical and Scientific Knowledge**: Mechanisms and Machines · Light, Colour and Optics ·
  Photography and Cameras · Everyday Objects and Systems
- **Observation and Design Sensitivity**: Counting in Compositions · Odd One Out and
  Classification · Typography and Lettering · Visual Detail
- **Environment and Society**: Indian Art, Craft and Culture · Art, Design and Architecture ·
  Brands, Logos and Symbols · Civic and General Awareness
- **Analytical and Logical Reasoning**: Quantitative Reasoning · Codes and Series · Logical Deduction
- **Language**: Reading and Interpretation · Grammar and Vocabulary (added for 2015-2019's
  spelling and usage questions)
- **Creativity**: Analogies and Visual Metaphors
