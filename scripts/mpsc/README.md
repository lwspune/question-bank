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
| the other 5 | — | — |
