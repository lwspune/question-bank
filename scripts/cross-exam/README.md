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
session to read each. Order: finish NDA Maths, then the other exams. Chemistry and Biology get a
one-chapter pilot each first: "numbers" and "same question" need their own definitions there (NEET
Biology tests NCERT facts), and the calibration below is for Maths only.

### Calibration (2026-11-06, NDA Matrices, `calibrate.ts`)

Two independent passes (A, B: 3 agents each, same BRIEF, no access to the settled file), scored
against the hand-settled run:

| | firm pairs | precision vs the settled set | recall |
|---|---|---|---|
| pass A | 128 | 93.8% | 67.8% |
| pass B | 124 | 97.6% | 68.4% |
| firm in BOTH (any kind) | 113 | 98.2% | 60.8% |

The 9 firm pairs outside the settled set were read: **all 9 are real matches the pilot missed**
(added to the run). So a pair that EITHER pass marks firm was right every time here (139 of 139).
What the passes miss is almost only "similar" (32 of the 34 settled pairs neither raised): boundary
cases like a 2x2 "is it invertible" vs a 3x3 statement question. **The kind is the weak point:** the
passes disagreed on it for 31 of the 113; taking the weaker kind gave 1 false "Asked" line but
understated 26 real "new numbers" matches as "similar".

**The method, from this:**
1. Two passes per slice.
2. Firm in both, same kind: accept as is.
3. Firm in both, kinds differ: the main session picks the kind (reads the pair).
4. Firm in one pass only: the main session reads it (all 26 were right here; keep reading until
   another subject confirms that).
5. Unsure only: drop. No sweep of unmatched exam questions (what it finds is "similar").

Here that is 57 pairs read instead of 185, about 70% less. Cost: about 190,000 agent tokens per
slice of about 135 board questions, so about 1.2 million per pass pair for a 400-question chapter.

## Runs so far

| run | exam chapter | board chapters | pairs | board q matched | exam q with a twin |
|---|---|---|---|---|---|
| `nda-maths-application-of-derivatives-2026-11-06` | Application of Derivatives | HSC XII Application of Derivatives | 97 (3 exact, 38 numbers, 56 similar) | 49 | 22 (12 exact or numbers) |
| `nda-maths-binomial-distribution-2026-11-06` | Binomial Distribution | HSC XII Binomial Distribution | 185 (1 exact, 112 numbers, 72 similar) | 77 | 25 (23 exact or numbers) |
| `nda-maths-binomial-theorem-2026-11-06` | Binomial Theorem | SB XI Binomial Theorem | 70 (7 exact, 29 numbers, 34 similar) | 53 | 16 (13 exact or numbers) |
| `nda-maths-circles-2026-11-06` | Circles | SB XI Circle | 33 (0 exact, 15 numbers, 18 similar) | 24 | 13 (6 exact or numbers) |
| `nda-maths-complex-numbers-2026-11-06` | Complex Numbers | SB XI Complex Numbers | 109 (1 exact, 44 numbers, 64 similar) | 77 | 27 (14 exact or numbers) |
| `nda-maths-conics-2026-11-06` | Conics | SB XI Conic Sections | 59 (2 exact, 21 numbers, 36 similar) | 45 | 11 (8 exact or numbers) |
| `nda-maths-definite-integration-2026-11-06` | Definite Integration, Applications of Integration | HSC XII Definite Integration, HSC XII Application of Definite Integration | 144 (2 exact, 32 numbers, 110 similar) | 75 | 39 (12 exact or numbers) |
| `nda-maths-differential-equations-2026-11-06` | Differential Equations | HSC XII Differential Equations | 145 (6 exact, 42 numbers, 97 similar) | 84 | 40 (24 exact or numbers) |
| `nda-maths-differentiation-2026-11-06` | Differentiation | HSC XII Differentiation, SB XI Differentiation | 140 (4 exact, 15 numbers, 121 similar) | 123 | 34 (11 exact or numbers) |
| `nda-maths-functions-2026-11-06` | Functions, Logarithms | SB XI Functions | 58 (3 exact, 16 numbers, 39 similar) | 49 | 30 (10 exact or numbers) |
| `nda-maths-indefinite-integration-2026-11-06` | Indefinite Integration | HSC XII Indefinite Integration | 97 (2 exact, 39 numbers, 56 similar) | 74 | 30 (17 exact or numbers) |
| `nda-maths-limits-continuity-2026-11-06` | Limits & Continuity | SB XI Limits, SB XI Continuity | 157 (3 exact, 28 numbers, 126 similar) | 124 | 43 (13 exact or numbers) |
| `nda-maths-linear-inequalities-2026-11-06` | Linear Inequalities | HSC XII Linear Programming | 6 (0 exact, 0 numbers, 6 similar) | 6 | 2 (0 exact or numbers) |
| `nda-maths-lines-2026-11-06` | Lines | SB XI Straight Line | 113 (0 exact, 27 numbers, 86 similar) | 58 | 35 (13 exact or numbers) |
| `nda-maths-matrices-2026-11-06` | Matrices & Determinants | SB XI Determinants and Matrices, HSC XII Matrices | 186 (8 exact, 74 numbers, 104 similar) | 143 | 62 (26 exact or numbers) |
| `nda-maths-permutation-combination-2026-11-06` | Permutation & Combination | SB XI Permutations and Combination | 130 (2 exact, 59 numbers, 69 similar) | 86 | 46 (26 exact or numbers) |
| `nda-maths-probability-2026-11-06` | Probability | SB XI Probability | 244 (2 exact, 33 numbers, 209 similar) | 107 | 72 (25 exact or numbers) |
| `nda-maths-sequence-series-2026-11-06` | Sequence & Series | SB XI Sequences and Series | 45 (1 exact, 23 numbers, 21 similar) | 40 | 13 (5 exact or numbers) |
| `nda-maths-sets-relations-2026-11-06` | Sets & Relations | SB XI Sets and Relations | 25 (1 exact, 7 numbers, 17 similar) | 21 | 18 (7 exact or numbers) |
| `nda-maths-statistics-2026-11-06` | Statistics | SB XI Measures of Dispersion | 37 (0 exact, 24 numbers, 13 similar) | 31 | 14 (7 exact or numbers) |
| `nda-maths-trigonometry-2026-11-06` | Trigonometric Identities, Trigonometric Equations, Inverse Trigonometry, Properties of Triangle | SB XI Trigonometry - I, SB XI Trigonometry - II, HSC XII Trigonometric Functions | 282 (22 exact, 59 numbers, 201 similar) | 173 | 96 (39 exact or numbers) |
| `nda-maths-vectors-3d-2026-11-06` | Vectors, 3D Geometry | HSC XII Vectors, HSC XII Line and Planes | 257 (7 exact, 107 numbers, 143 similar) | 181 | 82 (46 exact or numbers) |

**NDA Mathematics, all 22 runs (2026-11-06):** 2,619 pairs (77 exact, 844 numbers, 1,698 similar) linking 1,700 board questions to 770 of NDA's 2,280 PUBLIC Maths questions (34%). **357 (16%) were asked as a board question, exact or with new numbers.** Three NDA chapters have no State Board chapter and were not run: Binary Numbers (14), Quadratic Equations (67), Height & Distance (26). Weakest by share: Statistics (14 of 165), Sequence & Series (13 of 93), Functions (26 of 115): NDA asks shortcuts and properties there, the books drill computation.

Pilot method: 3 agents, then the main session read all 185 proposed pairs: kept all 163 firm
matches (3 re-labelled numbers -> similar), settled the 22 unsure (12 kept, 10 rejected), added 2
missed pairs. The calibration then added 9 more and moved one numbers -> similar (a matrix that is
its own inverse). What NDA asks that the board books do not drill: property shortcuts (|adj A|,
det(kA), cyclic determinants, triangle-trig determinants, counting matrices).
