# NCERT (CBSE Class 12) — answer-key cross-check brief (MANDATORY GATE before PUBLIC)

You verify OUR answers against the **NCERT official answer key** for a band of exercises.
The NCERT key is authoritative and reliable — far cleaner than Balbharati's (2 errors in
~256 questions across the three shipped chapters) — but it gives FINAL answers only, and
OUR answers were independently authored. So both sides get checked.

## Inputs
- **Answer-key page images**: `scripts/ncert/out/_answers/<chapterId>/ak-NN.png`. READ them
  with the Read tool. The key lists final answers by exercise + question number under an
  `EXERCISE <c>.<k>` heading, and MCQ answers as bare letters (`11. (B)  12. (C)`).
- **Our answers**: `scripts/ncert/data/<chapterId>.review.json` — an array of
  `{ref, format, stem, context, solution, mcq_answer, options}`. Filter to YOUR exercises'
  refs (given in the task).

## Scope — read this before reporting a count
- **SKIP `solved`-example refs** (`<c>.<k> Eg.*` / `Misc Eg.*`). The key covers exercise
  questions ONLY; a worked Example's answer is printed inside its own solution, so there is
  nothing external to diff. Solved examples are OUTSIDE this gate by construction.
- **A question with NO key entry is NOT a defect.** This key routinely skips "show that",
  "prove", "verify" and construction-style questions because they have no final answer to
  print. Record those as `NO-KEY-ENTRY` and move on.
- In your final message, report the exercise-row count you checked SEPARATELY from the rows
  you skipped. "0 wrong across 40 rows" is a different claim from "0 across 120".

## What to do — per exercise question
1. Find the book key for that question number under the right exercise heading.
2. Extract OUR final answer: for subjective, the LAST expression in `solution`; for MCQ, the
   `mcq_answer` letter — AND check the marked option's TEXT equals the key's answer.
3. Compare for **mathematical equivalence**, not string match (`\tfrac12\log 2` = `0.5\ln 2`;
   `\sin^{-1}x` = `\arcsin x`; an algebraically-equal rearrangement; a different but
   equivalent form of an arbitrary constant).
4. Classify:
   - **AGREE** — equivalent. (Most will be.)
   - **OUR-ANSWER-WRONG** — the key is right, ours is wrong. **Re-derive from scratch**
     before claiming this; give the correct answer in `note`.
   - **BOOK-KEY-WRONG** — our answer is right, the printed key is wrong. Re-derive to
     confirm and hold a HIGH bar: NCERT keys are rarely wrong, and the likeliest explanation
     is that you read the wrong entry or misread a cramped fraction/exponent. Verify you are
     under the right exercise heading before concluding this.
   - **STEM-ARTIFACT** — the disagreement is because OUR STEM looks mis-transcribed. Flag it
     and name the likely intended stem.
   - **NO-KEY-ENTRY** — the key prints nothing for this question (proof/show-that). Expected.
   - **CANT-READ-KEY** — the entry is illegible in the image; flag for manual check.

## Two traps that have produced wrong verdicts on this pipeline
- **The option-ordering trap.** On Integrals Ex 7.9 Q9 a cross-check agent reported "our A is
  wrong, flip to D" — source-verification showed our A was RIGHT and the printed key was
  wrong. **Never recommend flipping an MCQ letter without reading the printed option TEXT**
  and confirming which letter carries the correct value.
- **A CAS returning nothing is a question, not a verdict.** If a symbolic check fails to
  confirm an equivalence, test the claimed value directly and scan numerically before
  calling a disagreement. `simplify()` returning non-zero is NOT evidence of inequality.

## Output → `scripts/ncert/data/<chapterId>.<band>.crosscheck.json`
A JSON array, ONE element per exercise question you checked:
```json
{ "ref": "Ex 9.4 Q3", "book_key": "y^2 = 2x^2 log|x| + Cx^2", "our_answer": "y^2 = 2x^2 log|x| + Cx^2",
  "verdict": "AGREE", "note": "" }
```
For any non-AGREE verdict, put your re-derivation + the correct final answer in `note`.

Write the file with the **Write tool**, never a shell heredoc (it eats backslashes).

Final message: counts by verdict, the checked-vs-skipped row split, and a one-line list of
every non-AGREE ref.
