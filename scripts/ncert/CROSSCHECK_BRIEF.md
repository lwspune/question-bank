# NCERT Integrals — answer-key cross-check brief (GATE before PUBLIC)

You verify OUR answers against the **NCERT official answer key** for a band of exercises.
The NCERT key is authoritative + reliable (unlike some textbooks), but it gives FINAL
answers only, and OUR answers were independently authored — so we check both.

## Inputs
- **Answer-key page image(s)** (given in the task): `scripts/ncert/out/integrals-answers/ak-NN.png`.
  READ them with the Read tool. The key lists final answers by exercise + question number
  (e.g. under "EXERCISE 7.1": `1. …  2. …`), and MCQ answers as bare letters (`24. B  25. B`).
- **Our answers**: `scripts/ncert/data/integrals.review.json` — array of
  `{ref, format, stem, context, solution, mcq_answer, options}`. Filter to YOUR exercises'
  refs (given in the task). SKIP `solved`-example refs (`7.k Eg.*` / `Misc Eg.*`) — the key
  only covers exercise questions, not worked examples.

## What to do — per exercise question
1. Find the book key for that question number under the right exercise heading.
2. Extract OUR final answer: for subjective, the LAST expression in `solution`; for MCQ,
   the `mcq_answer` letter (and check the marked option's text equals the key's answer).
3. Compare for **mathematical equivalence** (not string match — `\tfrac12\log2` = `0.5\ln 2`;
   `\sin^{-1}x` vs `\arcsin x`; a `+C` form vs the key's form; an algebraically-equal rearrangement).
4. Classify each:
   - **AGREE** — equivalent. (Most will be.)
   - **OUR-ANSWER-WRONG** — the book key is right, ours is wrong. **Re-derive from scratch**
     to be SURE before saying this; give the correct answer.
   - **BOOK-KEY-WRONG** — our answer is right, the printed key is wrong. Re-derive to confirm;
     NCERT keys are rarely wrong, so hold a high bar (double-check you read the right key entry
     and didn't misread a cramped fraction/exponent in the image).
   - **STEM-ARTIFACT** — our answer disagrees because the STEM looks like a transcription
     artifact (a mis-read that made the integral different from what the book intended). Flag it;
     name the likely intended stem.
   - **CANT-READ-KEY** — the key entry is illegible in the image; flag for manual check.

## Output → `scripts/ncert/data/integrals.<band>.crosscheck.json`
A JSON array, ONE element per exercise question you checked:
```json
{ "ref": "Ex 7.4 Q24", "book_key": "B (i.e. \\tan^{-1}(x+1)+C)", "our_answer": "\\tan^{-1}(x+1)+C",
  "verdict": "AGREE", "note": "" }
```
For any non-AGREE verdict, put your re-derivation + the correct final answer in `note`.

Final message: counts by verdict + a one-line list of every non-AGREE ref.
