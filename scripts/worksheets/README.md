# Cadetprep worksheets ingestion pipeline ("Worksheets - 11th+12th")

Ingest the LWS Cadetprep NDA Maths **Concept Practice** worksheets (born-digital
Excel) into the bank as a standalone practice-only exam. Scope (user's call,
2026-08-05): **Concept Practice buckets only** — the `PYQs/` folders are
excluded (the NDA bank already serves the PYQ corpus); Formula Revision and
Quizzes are out of scope for now.

- Exam: **Worksheets - 11th+12th** (`9fabd0f7-50bf-4b58-82fa-4ff50a906bf8`),
  subject Mathematics, slug `worksheets-11-12`, `practiceOnly` in the exam registry.
- Source: `C:\Vilas\LWS_Pune\Cadetprep\NDA\Maths\<chapter>\Concept Practice\*.xlsx`
  — a uniform 15-column LMS-export template (`QUESTION TEXT | Subject | MARKS |
  NEG | DIFFICULTY | TYPE | OPTION ×4 | Correct Answers | SOLUTION | …`).
  SheetJS reads both `.xlsx` and legacy `.xls` and sniffs content, so mislabeled
  extensions are harmless. The sheets' `Subject` column is IGNORED (it mixes
  `Maths`, `NDA>Maths>X`, even `AFCAT>…`); taxonomy truth is `config.ts`
  (folder = chapter, file = subtopic).
- `question_kind='practice'`, `pyq_year=null`, committed PRIVATE until verified.

## Why every key gets blind re-derived

The source's solutions are AI-generated and the answer keys are unreliable:
the Trigonometric Identities pilot found **5 wrong keys + 2 defective option
sets in 368 questions from self-confessing solutions alone** (solutions
containing "Wait, this matches option C, not A…"), and a probe only catches
self-contradicting solutions — stealth wrong keys need independent
re-derivation ([[audit-probe-symmetry]]). The right-answer distribution is also
skewed (A 33% / B 28% / C 18% / D 22%), a generation artifact. Option order is
kept as-source (re-balancing would need key remaps + solution rewrites for the
~4% of solutions that reference option letters — error risk outweighs the skew).

## Per-chapter loop

1. **Register the chapter** in `config.ts` (`CHAPTERS` entry: canonical
   `chapterName`, the file list IN ORDER with cleaned `subtopicName`s).
2. **Dump blind packets** — stem + options only, NO key and NO solution (the
   solutions conclude answers, so shipping them would break blindness):
   ```sh
   npx tsx scripts/worksheets/dump-verify.ts trig-identities
   ```
3. **Blind re-derivation** — parallel agents (≤3 concurrent, session-limit
   caution) each solve one packet from scratch and return
   `{id, derived, confidence, note?}`. Merge into `data/<id>.derived.json`.
4. **Compare + adjudicate**:
   ```sh
   npx tsx scripts/worksheets/compare.ts trig-identities
   ```
   Every disagreement is adjudicated BY HAND (the maintainer re-derives it) —
   the agents' verdict is evidence, never authority. Verdicts land in
   `data/<id>.overrides.json` (`answer` / `options` / `solution` / `stem` /
   `exclude`, each with a `reason`). Solutions flagged for self-talk get clean
   rewrites in the same file.
5. **Commit** (dry-run first — prints per-subtopic counts, applied overrides,
   flags, LaTeX-imbalance check; hard-stops on imbalance or a stale override):
   ```sh
   npx tsx scripts/worksheets/commit.ts trig-identities
   npx tsx scripts/worksheets/commit.ts trig-identities --apply
   ```
6. **Post-commit checks** — `npm run audit:text -- Cadetprep_Worksheets` +
   `npm run audit:keys Cadetprep_Worksheets` + spot-check `/browse`.
7. **Flip PUBLIC**:
   ```sh
   npx tsx scripts/worksheets/flip-public.ts trig-identities --apply [--except=ids]
   ```

Question ids are `<fileIndex 2-digit>-<xlsx row>` (e.g. `07-19`) — stored in
`questions.question_number`, used as the override key, and traceable straight
back to the source file + row. `sourceRow = fileIndex*1000 + row` keeps rows
unique across a chapter's files. The Excel sources stay pristine; every repair
lives in the committed overrides file with its adjudication reason.

## Known source hazards (from the corpus census)

- Two Vectors files carry a leading `Sr No` column (`parseSheet` offsets).
- One Angle-and-Measurement file is xlsx mislabeled `.xls` (SheetJS sniffs).
- The Logarithm `03. Quizzes` file has Excel date-coercion corruption
  ("1/81" → `1981-01-01`) + bare undelimited LaTeX + empty keys — do NOT ingest
  without repair.
- ~30 lowercase answer letters in one PnC PYQ file (out of scope anyway).
- "Very Hard" difficulty appears (~71 rows corpus-wide) → folds into HARD.
