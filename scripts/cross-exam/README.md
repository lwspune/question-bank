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

## Runbook

Words used below:
- A **plan** (`pairs/<exam>-<subject>-<board>.json`, e.g. `pairs/nda-maths-sb.json`) lists the
  **runs** for one exam subject against one board family.
- A **run** is one or more exam chapters against the board chapters that teach them. It is named
  by a slug (`nda-maths-circles`).
- A **settled file** (`data/<slug>-<date>.json`) is one finished pass over a run. It holds the
  pairs, plus `reviewed`: the id of every exam and board question that run read, matched or not.
- A **comparison** is one board question read against one exam question. A settled file has made
  every comparison between its `reviewed.board` and its `reviewed.targets`.

**No comparison is ever made twice.** `src/lib/crossExam/pending.ts` subtracts what the settled
files read from what the chapters hold now. After a new NDA paper is ingested, only its questions
are read, against every board question. After a new board paper, only its questions are read,
against every NDA question. The old papers are never read again.

### A. After any ingest (the usual case)

1. `npm run twins:pending`. For each run with comparisons still to make, it prints the work
   (e.g. `nda-maths-circles: 3 exam x 81 board`) and the prep command to run. "all N runs up to
   date" means there is nothing to do.
2. For each run listed, do **C. One run** below.
3. Run `npm run twins:pending` again. When both sides gained questions, a run comes in two parts:
   the new exam questions against every board question, then the old exam questions against the
   new board questions. prep does part 1; commit it, then prep the same run again for part 2.

A question moved into a chapter counts as new. A question deleted, made PRIVATE or moved out takes
its links with it (0220), and nothing is re-read for it.

### B. Mapping a new exam or subject (the first time)

1. **Write the plan.** The syllabus map says which book sections teach each exam subtopic
   (`scripts/syllabus/data/<subject>-<exam>-rulings.json`, `coveredBy`); NEET has none yet, so
   match chapters by name. Use the bank's chapter names, which are not always the spine's. When one
   board chapter teaches several exam chapters, put them in ONE run, so each board question is read
   once against all of them. In the plan's `note`, list the exam chapters with no board chapter and
   so not run (for NDA Maths: Binary Numbers, Quadratic Equations, Height & Distance; the last two
   are Class 10 topics).
2. For Chemistry or Biology, pilot one chapter first: "numbers" and "same question" need their own
   meaning there (see Scaling below).
3. `npm run twins:pending -- scripts/cross-exam/pairs/<plan>.json` lists every run as "never run".
   Do **C** for each.

### C. One run, start to finish

1. **Prepare.**
   `npx tsx scripts/cross-exam/prep.ts --plan=scripts/cross-exam/pairs/<plan>.json --run=<slug>`
   This writes the same evidence to `generated-papers/cross-exam/<slug>-a` and `-b` (the two
   passes): `evidence/target.md`, `evidence/board-<n>.md` (about 135 board questions per slice;
   `--slices=N` to change) and `evidence/ids.json`, which records what the run read. It refuses to
   overwrite a folder that already holds agent drafts; pass `--force` to start over.
2. **Agents.** There is one agent per slice per pass, so 2 slices means 4 agents, at most 3 running
   at once (owner rule). Pass A and pass B never see each other's work. Brief each agent: "read
   scripts/cross-exam/BRIEF.md and follow it; your run dir is generated-papers/cross-exam/<slug>-a
   (or -b), you are slice N; keep tool output small". Each writes `out/board-<n>.json`, and each
   draft must pass `npx tsx scripts/cross-exam/validate.ts generated-papers/cross-exam/<slug>-a <n>`.
3. **Review sheet.** `npx tsx scripts/cross-exam/settle.ts scripts/cross-exam/pairs/<plan>.json <slug>`
   accepts the pairs both passes marked firm with the same kind, and drops pairs only ever marked
   "unsure". The rest go to `generated-papers/cross-exam/<slug>-review.md`, numbered and grouped
   under their exam question. These are the firm pairs only one pass found, and the pairs the
   passes labelled differently.
4. **Decide (main session).** Read each item: the board question and the exam question in full,
   and the source paper when the stored text looks wrong. Answer in
   `generated-papers/cross-exam/<slug>-decisions.json`: `{ "1": "numbers", "2": "reject", ... }`,
   choosing from exact, numbers, similar or reject, and answering every item. Use the calls in **D**.
5. **Settle.** Run the same settle command with `--write`. This writes
   `scripts/cross-exam/data/<slug>-<today>.json`; a second run of the same slug that day gets
   `-2`, `-3` and so on. A run that matched nothing is still written: what it read must count as
   read.
6. **Commit.** `npx tsx scripts/cross-exam/commit.ts <slug>-<date>` is a dry run: it checks every
   rule and counts the change. Add `--apply` to write it. The file is the record of its run:
   re-running writes nothing new, and a pair removed from the file is removed from the table.
   Then commit the file in git (`feat: NDA <chapter> exam twins`). An earlier run's file is never
   edited by a later run.
7. **Update the record.** Add the run's row to "Runs so far" below, and the totals line.
8. **Check the page.** The `/board` chapter shows the count in its header box. Pages are cached for
   a day, so a live page shows new links the next day, or after a deploy.

### D. Calls made while settling (NDA Maths, 2026-11-06)

Rules that came up again and again. Apply them the same way, so a chapter's counts mean the same
thing as the last one's.
- **Doubt goes to the weaker kind.** Decide each pair on its own reading; when still unsure
  between numbers and similar, choose similar: a false "Asked in NDA" line is worse than an
  understated one.
- **A multi-part board item that prints the exam's single ask is numbers.** A book question asks
  for "(i) axes (ii) foci (iii) eccentricity ..." and the exam asks only for the distance between
  the foci: if the part the exam asks is printed in the board question, it is numbers; if the exam
  asks something the board question never prints, it is similar.
- **Probability: the experiment decides.** When the probability is given outright ("a ship sinks
  with probability 1/5"), the setting is only a label, so a change of setting is still numbers.
  When it is worked out from the experiment (coins, dice, cards, balls), a different experiment is
  similar, however alike the counting.
- **One step of the exam question is not a match.** A board question that does only one step of
  what the exam question needs (finding the foci, when the exam needs a tangent at a focus) is
  rejected, not "similar".
- **A wrong stored question is fixed in the bank, not worked around.** Check it against the printed
  paper, correct it in place (an MCQ's `content_hash` does not include its passage), and judge the
  pair on the corrected text. Example: NDA 1 2025 Q91-92 had the passage
  sin⁻¹((x − 4x³)/27) where the paper prints sin⁻¹(x − 4x³/27); fixed 2026-11-06.

### E. What this does not cover

- **A question whose wording is corrected after a run.** Its pairs were judged on the old text and
  are not re-read automatically. When a correction changes what the question asks, re-read its
  pairs by hand: edit the settled file of the run that made them and commit it again.
- **A change to the plan.** A board chapter added to a run shows up in `twins:pending` as new
  work, so nothing extra is needed. A board chapter removed from a run keeps its old pairs until
  they are removed from the settled files by hand.

### F. Cleanup

The working folders (`generated-papers/cross-exam/<slug>-a`, `-b`, the review sheets and the
decisions files) are only needed until the run is committed. Delete them after the push, as the
owner's cleanup rule asks. The settled files in `data/` are the permanent record, and
`twins:pending` reads only them.

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
