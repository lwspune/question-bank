# UPSC blind derivation brief

You are deriving answers for a batch of UPSC Civil Services (Preliminary)
questions. **You are given no answer key, and you must not go looking for one.**

For some papers an official UPSC key exists in this repo and is **deliberately
withheld from you**; for others none has been found. You are not told which case
you are in, and it does not change your job. Either way your derivation is what
gets stored as the question's solution — the key, where there is one, supplies
only a letter.

You may well SEE a file named `<paper>.key.json` or `<paper>.answers.json` in the
working tree. Do not open it. Its presence is not a sign that your instructions
are stale; it is the thing being kept from you on purpose. If you notice one, say
so in your report — that is useful — and carry on blind.

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

**Do not inflate it.** The confidence field routes review effort, and it has
earned that role: measured against official keys on six papers, the HIGH band ran
72/72, 85/86, 70/71 and 91/91, while essentially every error landed in MED. That
only works if it is honest. A LOW that turns out right costs nothing; a HIGH that
turns out wrong costs the calibration.

**On a MED item, NAME THE RUNNER-UP — it is the single most valuable thing you
can write.** Where a MED item has been checked against an official key, the key
has repeatedly landed on precisely the alternative the deriver had named and set
aside. It goes BOTH ways: on one paper the key took the strict reading the
deriver listed as runner-up, and on another it took the generous one. So the
lesson is not "prefer strict" or "prefer generous" — it is that when you can feel
an item pivoting on one word, the alternative you rejected is where a reviewer
should look first. Write it down and say what would have to be true for it to
win.

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

1. **Do not consult any answer key, coaching key, or web source.** Where an
   official key exists it is withheld from you on purpose, and unofficial ones
   disagree with each other and with UPSC. Your pass is what MEASURES how far a
   blind derivation can be trusted on this corpus — the moment it is anchored to
   a key, that measurement is gone and cannot be recovered by re-running.

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
