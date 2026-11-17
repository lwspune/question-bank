# UP Board (UPMSP) Class 10 + 12 board PYQs

Uttar Pradesh Madhyamik Shiksha Parishad, the largest school board in India
(~54 lakh candidates a year). Scope (owner, 2026-11-17): **2025 + 2026**,
Class 10 Mathematics (822) + Science (824), Class 12 Mathematics (324),
Physics (346), Chemistry (347), Biology (348). Exams `UP Board Class 10` /
`UP Board Class 12`. Why each choice was made: the header of `config.ts`.

## Sources

UPMSP publishes no past papers (only next year's model papers) and **no
answer key or marking scheme**. The papers are scans of the board's print from
upboardonline.com, saved under `C:\Vilas\LWS_Pune\UP_Board\PYQPs\` with the
site's file names. 82 papers: about seven SERIES per subject a year, and the
series are different papers on one pattern.

Every scan carries the hoster's address (in the footer and sometimes inside a
question), rubber-stamped serial numbers, and on some pages a student's ticks
and pen corrections. None of that is the board's: transcription ignores it and
`validate.ts` refuses the address. A figure crossed by a stamp is cropped from
the other language's copy where that one is clean (`figure.note` says so).

**Left out** (owner: a paper with no English is not translated by us):

| paper | why |
|---|---|
| 2025-822-BV | scan skips pages 5-7, the English MCQs |
| 2026 Biology EK, EM | 4 of 7 pages |

## Language

Every question is printed in Hindi and English. English is the canonical row
(content_hash is English); Hindi is a translation (migration 0118), with a
Hindi solution on every row (owner: solutions in both languages). Layouts: 12
pages (a section in Hindi, then in English, or each question Hindi then
English) and 8 pages (each question Hindi then English).

## Pipeline

```sh
py scripts/up-board/render.py <id>                      # 1. pages + contact sheet -> out/<id>/
# 2. TRANSCRIBE (agents, <=3 at once): data/<id>.questions.json   TRANSCRIPTION_BRIEF.md
npx tsx scripts/up-board/validate.ts <id>               #    gate: structure, catalog, Hindi, maths
py scripts/up-board/crop.py <id>                        # 3. figures -> figures/<id>/<ref>.png; LOOK at out/<id>/_figures.png
# 4. SOLVE TWICE (different agents, blind to each other): derived/<id>.a.json, .b.json   SOLUTION_BRIEF.md
npx tsx scripts/up-board/solve-merge.ts <id>            # 5. agreement + disputes; settle in data/<id>.settled.json
npx tsx scripts/up-board/solve-merge.ts <id> --apply    #    writes answers + both solutions into the paper
npx tsx scripts/up-board/seed-exam.ts --apply           # once: exams + subjects, paste the ids into config.ts
npx tsx scripts/up-board/commit.ts <id> [--apply]       # 6. PRIVATE rows + Hindi + figures
```

Paper id: `<year>-<code>-<SERIES>`, e.g. `2025-822-BW`. Refs: Section A
`Q1`..`Q20`; written parts `B1a`; an OR pair `B3a` + `B3b` (`alternativeTo`).
Pure core `lib.ts`, tested in `tests/up-board-lib.test.ts`.

Chapters and subtopics are the NCERT ones under CBSE's names
(`ncertSubtopics.ts`), plus chapters UP still examines that NCERT dropped
(`config.ts` `EXTRA_CHAPTERS`, no "[Outdated]" marker: they are current for a
UP student). `npx tsx scripts/up-board/catalog.ts <subject>` prints them.
