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

4b. **Dual-blind pass — mandatory once a chapter exceeds ~5% disagreement.**
   Re-derive the disputed rows a SECOND time, independently, then crosstab:
   ```sh
   npx tsx scripts/worksheets/recheck.ts <chapterId>    # blind packet, disputed rows only
   # → agents write out/<chapterId>/recheck-verdicts.json
   cp out/<chapterId>/recheck-verdicts.json data/<chapterId>.recheck.json   # COMMIT the evidence
   npx tsx scripts/worksheets/crosstab.ts <chapterId>
   ```
   The pass-2 packet carries stem + options ONLY — not the key, not pass 1's
   verdict. Pass 2 must also return a `value` field stating what it computed in
   plain terms, so the crosstab compares two derivations of the same QUANTITY
   rather than two letter guesses. Hand-derivation then goes to the CONFLICT
   bucket, not to all 30+ rows.

   **The `FLIP?TWIN` bucket is the one that has burned us twice.** Both passes
   naming the same letter is NOT sufficient evidence for a key flip: if the
   keyed option and the derived option are the same VALUE, both passes were
   right about the maths and simply named the other letter, and the correct
   repair is to the option text with the key RETAINED. Batch H produced 21 such
   illusory flips; Batch I's `4) Modulus-Inequality.xls` produced 15, because
   that file duplicates its keyed answer verbatim into option A (one row carries
   it three times). Always open a `FLIP?TWIN` row and compare the two option
   texts before touching the key.

   The `FLIP?TWIN` gate matches ONLY the structured `TWIN: A=C` prefix the
   brief mandates, never free prose. Batch J's first version matched words
   like `twin|both|equal|identical` and fired on a pass-2 note reading
   "p = 0 (equivalently q = 1)", which buried a GENUINE key flip in the one
   bucket a reviewer is primed to dismiss. A twin claim is a structured
   assertion, not a turn of phrase — a filter over prose does not discriminate,
   it relocates the error somewhere quieter.

   Pass 2's `value` field is what makes the crosstab work. Two Batch-J rows
   were reported as CONFLICT (the passes named different letters) and turned
   out to be twins: both had computed the identical quantity. Comparing
   letters would have sent them to hand-derivation; comparing VALUES settled
   them on sight.
5. **Rebalance the correct-answer letters** — the source skews keys toward
   A/B (~32/30/19/19 on the first 691 q), so plan a deterministic
   transposition shuffle (eligible rows only; plans are committed and applied
   at every ingest, so re-runs stay idempotent):
   ```sh
   npx tsx scripts/worksheets/plan-shuffles.ts trig-identities --write
   ```
   For a chapter ALREADY in the DB, `apply-shuffles.ts <id> --apply` patches
   the live rows in place (option texts + key + collision-guarded hash) and
   proves whole-chapter hash idempotency.
6. **Commit** (dry-run first — prints per-subtopic counts, applied overrides,
   flags, LaTeX-imbalance check; hard-stops on imbalance or a stale override):
   ```sh
   npx tsx scripts/worksheets/commit.ts trig-identities
   npx tsx scripts/worksheets/commit.ts trig-identities --apply
   ```
7. **Post-commit checks** — `npm run audit:text -- Cadetprep_Worksheets` +
   `npm run audit:keys Cadetprep_Worksheets` + spot-check `/browse`.

   `audit:keys` earns its keep HERE, after the write, and its `SOLN≠KEY` hits
   sort into three classes — decide which before changing anything:
   - **Probe false positive.** It reads a letter inside ordinary notation, so
     a probability solution containing `P(A)` reports `SOLN_A`. Three Batch-J
     hits were this. No action.
   - **Your own flip.** You changed the key; the source's solution still names
     the old letter. Rewrite the solution.
   - **Stale option letters in the source.** Nine Batch-J rows had solutions
     naming letters that do not match the printed option order — `y = x^3 + 5`
     is option D and the solution calls it C, `(3,4,5)` is B and the solution
     calls it A. The maths is right, the label is wrong, and the blind pass
     had already confirmed the key. **Rewrite the solution to state its
     conclusion and name NO letter**, which removes the contradiction instead
     of moving it (and keeps the row shuffle-eligible).

   A solution-only override does NOT reach the database through `commit.ts`:
   `content_hash` excludes `solution`, so the upsert skips the existing row.
   Use `out/_patchsol.ts <chapter> --apply`; the override file stays the source
   of record. Anything touching options, stem or key needs DELETE + re-commit.
8. **Flip PUBLIC**:
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
