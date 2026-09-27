# MPSC Group B & C Prelims ingestion

One merged scan (`Group B & C Pre Papers 2017 to 2024.pdf`, 557 pages) holds **14
Set-A booklets** of the General Ability Test (सामान्य क्षमता चाचणी) — 100 MCQs,
100 marks, 1 hour, **−¼ per wrong answer** — each with the Commission's **final**
answer key. Every question is printed **Marathi then English**, and the booklet's
instruction 4(b) declares neither authoritative. **The bank keeps both**: English
is the canonical `questions` row, Marathi is a translation (migration 0118).

Paper registry, page ranges and the two file traps (2020-B's key sits before its
paper; 2019-C's key has no text layer): `config.ts`.

## Pipeline

| step | command | output |
|---|---|---|
| keys | `python scripts/mpsc/extract.py keys` → `npx tsx scripts/mpsc/keys.ts --write` | `data/<id>.key.json` (Set A column; `#` = cancelled) |
| render | `python scripts/mpsc/extract.py render <id>` | `data/pages/<id>/p<NNN>.png` @130 dpi (gitignored) |
| transcribe | read each page, write `data/<id>.tNN.json` batches | `BilingualQuestion[]` — see lib.ts |
| check | `npx tsx scripts/mpsc/merge.ts <id> --show` | coverage, EN/MR parity, keyed option per question |
| merge | `npx tsx scripts/mpsc/merge.ts <id> --write` | `data/<id>.merged.json` |
| figures | `python scripts/mpsc/extract.py figures <id>` | `data/figures/<id>/q<N>.png` (gitignored) |
| commit | `npx tsx scripts/mpsc/commit.ts <id> [--apply]` | PRIVATE rows + Marathi + figures |

Exam row + subjects: `npx tsx scripts/mpsc/seed.ts --apply` (done 2026-09-25).

## Transcription conventions

- **Faithful per language.** Devanagari digits stay Devanagari (`१८५७`), ASCII
  stays ASCII — Marathi prints both, sometimes in one question.
- Sub-items one per line with the printed label (`अ.` / `a.` / `(a)`); a closing
  "Answer Options :" / "पर्यायी उत्तरे :" line is kept in both.
- Match-the-following → a GFM table; printed headers when the paper has them,
  else `Column I | Column II` / `स्तंभ I | स्तंभ II`. Options written out as
  `a-III, b-II, …`.
- Blanks → `______`. Superscript ordinals flattened (`27th`).
- **Figures:** a text-free figure (a triangle-count grid) is cropped once — `figure:
  {page, box}` in 130-dpi pixels — and serves both languages. A chart whose labels
  are words (a pie chart of expenses) is transcribed as a **table in each language**
  instead, so it stays answerable, readable and searchable.

## Checks

- **Parity probe** (`lib.ts parityIssues`): both versions must agree on option
  count, stem line count and every number (script-neutral). A genuine print
  difference is waived in `data/<id>.waivers.json` **with a reason read against
  the page**; `commit.ts` refuses an unwaived flag.
- **Print differences (meaning, not numbers).** Where the booklet's Marathi and
  English say different things (a direction, a term), transcribe BOTH as printed
  and record it in the question's `printNote` field — never only in a waiver,
  which is for number/notation differences. The parity probe cannot see these;
  they are found by reading. `npx tsx scripts/mpsc/print-notes.ts` lists them all.
  Students see each as a remark in the question's solution (both languages),
  written by `commit.ts` via `printNoteSolution`.
- **Key fit** (`merge.ts --show`): solve the aptitude block independently; a
  shifted key shows up there first. 2024-B: 20/20.

## Cancelled questions (migration 0119)

A `#` in the final key is **kept**, not dropped: committed with **no correct
option** and a `cancelled_note` naming the sitting. The DB refuses a correct
option on such a row. `/browse` and the mock review show the notice in both
languages, the Word/PPT key prints "Cancelled", and mocks award it to every
candidate (`grace`). 35 across the 14 papers.

## Status

| paper | transcribed | committed |
|---|---|---|
| 2024-b (H19) | 100/100 | PRIVATE, 2026-09-25 |
| 2024-c (R19) | 100/100 | PRIVATE, 2026-09-26 (Q69 cancelled) |
| 2023-bc (J17) | 100/100 | PRIVATE, 2026-09-26 (Q19, Q74 cancelled) |
| 2022-c (F16) | 100/100 | PRIVATE, 2026-09-26 |
| 2022-b (A16) | 100/100 | PRIVATE, 2026-09-26 |
| 2021-c (Y14) | 100/100 | PRIVATE, 2026-09-26 (Q20, Q22, Q94 cancelled) |
| 2021-b (U14) | 100/100 | PRIVATE, 2026-09-26 (8 cancelled; Q40 + Q72 print differences noted) |
| 2020-b (A14) | 100/100 | PRIVATE, 2026-09-26 (5 cancelled) |
| 2019-c (Y12) | 100/100 | PRIVATE, 2026-09-26 (Q39, Q58 cancelled; Q57 print note) |
| 2019-b (V12) | 100/100 | PRIVATE, 2026-09-26 (Q28, Q48, Q53 cancelled; Q20 + Q88 print notes) |
| 2018-b (H11) | 100/100 | PRIVATE, 2026-09-26 (Q83 cancelled; Q3, Q38, Q59, Q84 print notes) |
| 2018-c (J11) | 100/100 | PRIVATE, 2026-09-26 (Q12, Q15, Q39, Q63, Q81 cancelled; Q75 print note) |
| 2017-b (NO9) | 100/100 | PRIVATE, 2026-09-26 (Q28, Q64 cancelled; Q64, Q84 print notes) |
| 2017-c (B09) | 100/100 | PRIVATE, 2026-09-26 (Q6, Q39, Q71 cancelled; Q26, Q75, Q90 print notes) |

**All 14 flipped PUBLIC 2026-09-26** (the "committed" column records how each was first written). Mocks: `npx tsx scripts/mocks/build.ts --paper=mpsc` — 14 build whole with 35 grace; publishing (`--apply --publish`) and `hasMocks: true` in `src/lib/exam/examContext.ts` go together.

# MPSC State Services (Rajyaseva) Prelims — GS Paper I

The same pipeline, a second exam (`EXAMS.ssp`, `MPSC State Services Prelims`).
Papers are `ssp-<year>` in `config.ts` `SSP_PAPERS` — kept OUT of `PAPERS`,
because the mock builder derives Group B & C sittings from that list.

**Source:** `MPSC Rajyaseva PYQ by ACHIEVERS MENTORSHIP.pdf` (460 pages, image
only): 10 Set-A booklets, 2013-2022, NOT in year order (2017 precedes 2018,
2013 precedes 2014). Each is 100 questions, 200 marks, 2 hours, −¼ of a
question's marks per wrong answer. CSAT (Paper II) and 2023+ are not in it.
Every page carries the coaching header — never crop it into a figure.

**Keys:** the scan has NO key pages — only a coaching institute's answer boxes
and "CANCEL #" stamps. The key is the Commission's own FINAL key, one 2-page PDF
per year in `C:/Users/vilas/Downloads/mpsc-ssp-final-keys/<year>.pdf`
(mpscmaterial.com mirrors of the mpsc.gov.in files; mpsc.gov.in itself is an
SPA with signed API requests). 2019 is an image, and 2015/2016 lost question
numbers from their text layer, so those three are hand-transcribed into
`data/<id>.keytokens.json`. `python scripts/mpsc/extract.py keys ssp` →
`npx tsx scripts/mpsc/keys.ts ssp --write`.

**Three checks, run by `keys.ts` and `merge.ts`:**
- **Set balance** (`keys.ts`, every exam): the four sets are one paper
  reordered, so each set's column must hold the same count of every letter,
  `#` included. A misread cell breaks it. All 24 keys pass.
- **Coaching marks vs key**: `batch.py` records each box as it is transcribed
  (`data/<id>.boxes.json`); `merge.ts` reports every disagreement. It is a
  second, independent reading of the final key.
- **Fixed chapter list** (`config.ts` `SSP_CHAPTERS`): merge refuses an
  off-list subject/chapter, so ten papers cannot drift the way Group B & C did.

**Transcribing:** write a batch as Python with `scripts/mpsc/batch.py` (lines as
lists, so Devanagari and newlines need no escaping). At 130 dpi, ध and घ can be
misread (one slip in the 2022 pilot, caught at 180 dpi): zoom any doubtful word.

| paper | transcribed | marks vs key | committed |
|---|---|---|---|
| ssp-2022 (H15) | 100/100 | 100/100 | PRIVATE, 2026-09-27 (Q42, Q95, Q96 cancelled; Q2 print note) |
| ssp-2021 (O14) | 100/100 | 100/100 | PRIVATE, 2026-09-27 (Q2, Q3, Q9, Q37, Q44, Q54, Q61 cancelled; Q45 print note) |
| ssp-2020 (Y13) | 100/100 | 100/100 | PRIVATE, 2026-09-27 (Q21, Q33, Q36 cancelled; Q22, Q40 print notes) |
| ssp-2019 (T12) | 100/100 | 100/100 | PRIVATE, 2026-09-27 (Q76, Q87, Q93 cancelled; Q6, Q76 print notes; Q71, Q80 figures) |
