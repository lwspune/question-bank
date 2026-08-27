# UPSC blind derivation brief

You are deriving answers for a batch of UPSC Civil Services (Preliminary)
questions. **This booklet has no answer key.** UPSC does not print one, and none
exists in our sources. Your derivation, cross-checked against a second
independent pass, IS the answer.

## What you are given, and what you are deliberately NOT given

Your packet holds, per item: the item `number`, the `stem`, the four `options`,
and — for CSAT comprehension items — the `context` passage.

You are **not** given the subject, the chapter, the difficulty, any transcription
flags, or the other pass's answer. That is deliberate. Those fields are a second
reader's opinion, and seeing them would anchor yours. Do not go looking for them
in other files, and do not read the merged transcription or the database.

**You must not consult the other pass.** Two passes that talked are one pass.

## What to produce

For each item, exactly:

```json
{
  "number": 7,
  "answer": "C",
  "value": "The Speaker of the Lok Sabha continues in office until the new House meets",
  "confidence": "HIGH",
  "reasoning": "Article 94 provides that the Speaker does not vacate office on dissolution; the office continues until immediately before the first meeting of the next House. Options A and B assert vacation on dissolution, which Article 94 excludes. D confuses this with the Deputy Speaker's resignation route."
}
```

### `value` is mandatory, and it is not decoration

State **what the answer says**, in plain terms — not the letter again.

Comparing two passes by LETTER alone throws away the information that separates a
genuine disagreement from two labels sitting on the same fact. If the paper
prints its correct answer twice (it happens), the two passes name different
letters while agreeing completely — that is a defect in the **printed options**,
repaired by fixing the option text, never by moving the answer. Without `value`
that case is indistinguishable from a real dispute, and it buries the real ones.

### `confidence` must be honest

- `HIGH` — you are sure, and you can say why from the stem alone.
- `MED` — you are fairly sure; one option needed a judgement call.
- `LOW` — you are guessing between two, or you lack the fact the item turns on.

**Do not inflate it.** The confidence field is used to route review effort, and on
a sibling corpus it was well enough calibrated that every single disagreement
across four papers landed in MED or LOW. That only works if it is honest. A LOW
that turns out right costs nothing; a HIGH that turns out wrong costs the
calibration.

### `reasoning` is the evidence, not a restatement

Say what makes the answer true and, where it is close, what makes the runners-up
false. One to four sentences. This text is stored as the question's solution and
a student will read it, so write it for them.

## How to derive

**Solve the question as printed.** Do not "correct" a stem you think is wrong and
answer the corrected version — answer what is on the page and flag the problem in
`reasoning`. A helpfully-repaired reading produces an answer that is wrong against
the real paper.

**Statement-based items** ("Which of the statements given above is/are correct?",
"How many of the above are correct?") are the dominant form in Paper I. Evaluate
each numbered statement **separately and explicitly** before choosing the option.
Most wrong answers on these come from settling the option without settling every
statement.

**Where the four options do not include a defensible answer**, say so plainly:
give your best letter, set `confidence` to `LOW`, and state in `reasoning` that
the item looks defective and why. Genuinely defective questions exist in these
papers. Reporting one is a result, not a failure.

**CSAT comprehension items** are answerable *from the passage only*. The
instruction says so and it is binding: the "true in the world" option is a
standard distractor. Answer from the text.

**CSAT numeric items** — do the arithmetic, and check it. Where a quick numeric
check is possible, run it rather than asserting the result. Watch for the case
where two options are equal in value but written differently.

## Two things that will make your pass worthless

1. **Do not consult any answer key, coaching key, or web source.** There is no
   official key, and unofficial ones disagree with each other and with UPSC. The
   value of this pipeline is two *independent* derivations; importing a third
   party's guess into both passes destroys exactly that.

2. **Do not author your JSON through a bash heredoc.** In this environment a
   heredoc eats backslashes, so `\(` and `\frac` arrive as control characters —
   invisible in review, corrupt in the data. Use the Write tool.

## Before you finish

- Every item in your packet has an entry. None skipped.
- Every `answer` is one of A, B, C, D.
- Every entry has a non-empty `value` and `reasoning`.
- Your JSON parses.

In your final message, report: how many items you derived, the confidence spread,
and any item you believe is defective.
