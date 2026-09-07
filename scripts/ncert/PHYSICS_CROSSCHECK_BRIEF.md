# NCERT Physics — answer-key cross-check brief (MANDATORY GATE before PUBLIC)

You verify OUR answers against the **NCERT official answer key** for one Physics chapter.
The key gives FINAL answers only, and OUR answers were independently authored, so **both
sides get checked** — a disagreement is a question about which side is wrong, not a verdict
against ours.

> This is the PHYSICS brief. `CROSSCHECK_BRIEF.md` is the Maths one and its ref convention
> and equivalence rules are different — do not follow it.

## Inputs
- **Answer-key page images**: `scripts/ncert/out/_answers/<chapterId>/ak-NN.png`. READ them
  with the Read tool. The key lists final answers under a `CHAPTER <n>` heading, numbered
  `<n>.1`, `<n>.2`, … matching the exercise question numbers exactly.
- **Our answers**: `scripts/ncert/data/<chapterId>.review.json` — an array of
  `{ref, format, stem, context, solution, mcq_answer, options}`.

**The whole answers region is rendered, not just your chapter's pages** — so find your
chapter's `CHAPTER <n>` heading first and read to the next one. Do not assume the first page
is yours.

## Scope — read this before reporting a count
- **SKIP `solved`-example refs (`Eg <n>.*`).** The key covers EXERCISE questions only; a
  worked Example's answer is printed inside its own solution, so there is nothing external
  to diff. Solved examples are OUTSIDE this gate by construction.
- **A question with NO key entry is NOT a defect.** This key routinely skips conceptual,
  "explain why", "state with reasons" and derivation questions because they have no final
  value to print. Measured on Class 11: chapter 1 skips 1.3, 1.4 and 1.8; chapter 7 skips
  five of its twenty-one. Record those as `NO-KEY-ENTRY` and move on.
- In your final message, report the exercise-row count you actually DIFFED separately from
  the rows you skipped. **"0 wrong across 11 keyed rows" is a different claim from "0 across
  20"** — report the honest denominator.

## What to do — per exercise question
1. Find the book key for that question number under the right `CHAPTER <n>` heading.
2. Extract OUR final answer: for subjective, the LAST stated value in `solution`; for MCQ,
   the `mcq_answer` letter — AND check the marked option's TEXT equals the key's answer.
3. Compare for **physical equivalence**, not string match:
   - **The UNIT must match, or be a correct conversion of it.** `\(0.045\,\text{J}\)` and
     `\(45\,\text{mJ}\)` AGREE. `\(0.045\,\text{J}\)` against a key of `\(45\,\text{J}\)`
     does NOT — that is a factor of 1000 and is a real finding on one side or the other.
   - **Allow rounding.** The key rounds to 2-3 significant figures. Agree if the values match
     to within ~1% or to the key's stated precision. Do NOT report a disagreement that is
     only the last digit — but DO report one where the discrepancy is a clean factor
     (2, 10, 1000, or exactly g) since that is a real slip, not rounding.
   - A different but algebraically equal rearrangement AGREES.
4. Classify:
   - **AGREE** — equivalent. (Most will be.)
   - **OUR-ANSWER-WRONG** — the key is right, ours is wrong. **Re-derive from scratch**
     before claiming this; give the correct answer in `note`.
   - **BOOK-KEY-WRONG** — our answer is right, the printed key is wrong. Re-derive to
     confirm and hold a HIGH bar: NCERT keys are rarely wrong, and the likeliest explanation
     is that you read the wrong entry or misread a cramped exponent. **Check you are under
     the right `CHAPTER <n>` heading before concluding this** — Physics numbers its chapters
     continuously across both parts, so a chapter-8 key sits in the Part-2 answers file with
     no page of its own, and reading chapter 9's block against chapter 8's answers would
     manufacture a whole chapter of false findings.
   - **NO-KEY-ENTRY** — the key does not answer this question. Not a defect.
   - **CANT-READ-KEY** — the entry is illegible or you cannot locate it. Say so; do not guess.

## The strongest evidence, and how to reach it
A disagreement is worth far more when a THIRD independent route confirms it. Where you can,
check the key's value against something other than our solution and the key itself:
- Does the key contradict ITSELF? (two entries of the same question's parts implying
  different data; a part (b) that cannot follow from its own part (a))
- Does the key contradict the STEM's own numbers? (a stated efficiency, a stated mass)
- Is the value dimensionally impossible for the quantity asked?
Those are the findings that survive review. A disagreement resting only on "I got a
different number" usually resolves as an arithmetic slip on one side — re-derive it twice.

## Output → `scripts/ncert/data/<chapterId>.crosscheck.json`
A JSON array of `{ref, verdict, ourAnswer, keyAnswer, note}` where `verdict` is one of
`AGREE` | `OUR-ANSWER-WRONG` | `BOOK-KEY-WRONG` | `NO-KEY-ENTRY` | `CANT-READ-KEY`.
Write it with the **Write tool**, never a shell heredoc.

In your final message give the tally by verdict, the honest diffed denominator, and a
one-line justification for every non-AGREE row.
