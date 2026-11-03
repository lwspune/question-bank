# UCEED (IIT Bombay design entrance): Part A past papers

UCEED is IIT Bombay's B.Des entrance, sat after Class 12. Every paper from 2015 to 2026 and
IIT Bombay's **final** answer key for each are public at
`https://www.uceed.iitb.ac.in/<year>/downloads.html`. The key is the answer of record:
nothing is committed on anything else.

## Status

| Year | Part A | State |
|---|---|---|
| 2026 | 57 q (14 NAT, 15 MSQ, 28 MCQ) | PILOT, 2026-11-03: **41 rows PRIVATE** (28 MCQ, 13 NAT, 35 with a figure); 16 held (15 MSQ + Q14 range). Awaiting the owner's review sheet (`sheet.py`) |
| 2015-2025 | 2015: 100 · 2018-19: 85 · 2020-23: 68 · 2024-25: 57 (2016-17 not yet read) | sources downloaded, not started |

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

## Held rows

`planPaper` (lib.ts) HOLDS two kinds of row, keeps them in the transcription, and never
writes them, because the bank cannot store them today:

- **MSQ** (multiple-select, 15 a paper since 2024): `question_format` is `mcq | subjective |
  numeric` and every grader assumes one correct option. Needs a format, a per-year marking
  scheme (2015: no partial, no negative; 2019: negative; 2024+: partial +1/+2/+3, -1), a tick-box
  mock runner and keys in the downloads.
- **NAT keyed as a range** (2026 Q14: 470-480): `numeric_answer` holds one exact value.

One MSQ key gives **two** accepted answers (2026 Q18: "B,C or B,C,D"); `key.json` records both
sets so the MSQ build can grade either as full marks.

## Method

```
src/<year>-paper.pdf ──extract.py──> work/<year>/draft.json + figures/<year>/Q<nn>.png + contact sheets
                                       │ a person reads every question against the page
                                       ▼
                     data/<year>.questions.json (text, options, figure, classification, solution)
src/<year>-key.pdf ──(read, checked against the rendered page)──> data/<year>.key.json
                                       ▼
                     commit.ts <year>  (planPaper: refuses on any issue; MSQ + range NAT held)
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
npx tsx scripts/uceed/commit.ts 2026                  # dry run: plan, checks, hashes, held rows
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
