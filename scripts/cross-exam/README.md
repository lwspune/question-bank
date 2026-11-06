# Exam twins: "Asked in NDA" under a board question

A line under a board question (`/board`, homework days) names the entrance past papers that asked
the same question, the same with new numbers, or a similar one; the chapter page counts them.
Table `exam_twins` (migration 0220), one row per settled pair. Page side:
`src/lib/crossExam/` (wording, paper names, loader) and `src/components/crossExam/ExamTwins.tsx`.

## The three kinds

| kind | means | the student sees |
|---|---|---|
| `exact` | the same question; only wording or format differ | Asked in NDA 2 2023 · same question |
| `numbers` | the same question with new numbers or another matrix, same steps | Asked in NDA 1 2019 · new numbers |
| `similar` | the same specific task, so one worked example teaches both | Similar to NDA 1 2024 (quiet grey line) |

"Similar" never counts as "asked" in the chapter count (owner, 2026-11-06). The full definitions,
with what does NOT count, are in `BRIEF.md`, the agents' contract.

## What the database refuses (0220's trigger)

A target that is not a past-paper question (`question_kind = 'pyq'`), two questions of one exam,
either question not PUBLIC. Readers see a link only while both questions are PUBLIC. A deleted
question takes its links with it. Writes are service-role only.

## One run, start to finish

A run = one exam chapter against the board chapters that teach it.

1. **Pick the chapters.** The syllabus map says which book sections teach each exam subtopic
   (`scripts/syllabus/data/<subject>-<exam>-rulings.json`, `coveredBy`); NEET has none yet, match
   chapters by name.
2. **Evidence.**
   `npx tsx scripts/cross-exam/prep.ts --target="NDA|Mathematics|<chapter>" --board="Maharashtra HSC Class 12|Mathematics|<chapter>" [--board=...] --out=generated-papers/cross-exam/<run>`
   Slices of about 135 board questions each (`--slices=N`).
3. **Agents** (at most 3 at once, owner rule). Brief each: "read scripts/cross-exam/BRIEF.md and
   follow it; your run dir is ..., you are slice N; keep tool output small". They write
   `out/board-<n>.json` and pass `validate.ts`.
4. **Settle (main session).** Read every proposed pair against both stems, and every "unsure" one.
   Re-label or reject; then read the exam questions NOBODY matched and check the board text for
   misses (the pilot found 2 in 116). Write `scripts/cross-exam/data/<run>.json`
   (`src/lib/crossExam/settled.ts` is its shape; `tests/cross-exam-settled.test.ts` checks every
   committed file).
5. **Commit.** `npx tsx scripts/cross-exam/commit.ts <run>` (dry run: every rule checked, the
   change counted), then `--apply`. The file is the record of its run: re-running writes nothing
   new, and a pair removed from the file is removed from the table.
6. **Check the page.** The `/board` chapter shows the count in its header box; the pages are cached
   for a day, so a live page shows the new links the next day (or after a deploy).

## Scaling (owner, 2026-11-06)

Full mapping (NDA, MHT-CET, JEE, NEET against CBSE and State Board, Class 11 and 12) is about
72,000 board-question-by-exam comparisons and about 33,000 proposed pairs: too many for the main
session to read each. Agreed method: **two agents per slice, independently**; pairs both propose
with the same kind are accepted; the main session settles every disagreement and reads a random
sample of the agreed pairs per subject. **Calibrate it first** on the pilot: re-run NDA Matrices
with two agents and compare against the hand-settled `nda-maths-matrices-2026-11-06.json`
(precision and recall of the agreed set); scale only if both hold up. Order: finish NDA Maths, then
the other exams. Chemistry and Biology get a one-chapter pilot each first: "numbers" and "same
question" need their own definitions there (NEET Biology tests NCERT facts).

## Runs so far

| run | exam chapter | board chapters | pairs | board q matched | exam q with a twin |
|---|---|---|---|---|---|
| `nda-maths-matrices-2026-11-06` | NDA Matrices & Determinants (181) | SB XI Determinants and Matrices, HSC XII Matrices (406) | 177 (8 exact, 75 numbers, 94 similar) | 139 / 406 | 60 / 181 (26 exact or numbers) |

Pilot method: 3 agents, then the main session read all 185 proposed pairs: kept all 163 firm
matches (3 re-labelled numbers -> similar), settled the 22 unsure (12 kept, 10 rejected), added 2
missed pairs. What NDA asks that the board books do not drill: property shortcuts (|adj A|,
det(kA), cyclic determinants, triangle-trig determinants, counting matrices).
