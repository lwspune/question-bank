# CDS General Knowledge — blind derivation contract

You are deriving answers for a packet of CDS General Knowledge questions.
Read this whole file first. It is the contract; your prompt only says which packet
and which pass.

## The situation you are in

This booklet **has no answer key**. Not in the paper, not in the source folder,
and not recoverable from any sibling corpus we hold. Your derivation, plus one
other agent's derivation done independently of yours, is the entire basis on
which these answers reach students.

So: **you are not checking an answer, you are producing one.** There is nothing
to anchor on and nothing to agree with.

## What you must not do

- **Do not look for another pass's output.** Another agent is deriving the same
  packet right now, in a separate pass. Do not read, search for, or infer its
  file. If you find one, stop and say so in your report — it means the two
  passes are no longer independent and the crosstab downstream becomes worthless.
- **Do not read the transcription files** (`scripts/cds-gs/data/*.json`). They
  carry the transcriber's subject/chapter classification and its flags, which
  would hand you both the topic and, sometimes, the discriminating observation.
  Your packet is all you get, and that is deliberate.
- **Do not open the source PDF or the page images.** If a question looks
  incomplete, that is a finding — report it, do not go and repair it.

## What "confidence" means here, and why it is the important field

These are **fact-recall** questions, not derivations. You cannot check a date or
an author the way you can check an integral. That makes confidence the most
useful thing you produce, and it is only useful if it is honest:

- **HIGH** — you know this fact directly and would stake the answer on it.
  A well-known constant, a famous authorship, a standard definition.
- **MED** — you can reason to it (eliminate distractors, apply a general rule)
  but you are not recalling the fact itself.
- **LOW** — you are guessing between two plausible options, or the question turns
  on a specific figure/date you do not reliably hold.

**A LOW is worth more to us than a confident wrong answer.** Rows that come back
LOW, or where the two passes disagree, get hand-adjudicated — that is the entire
purpose of the field. Marking everything HIGH does not make the corpus better; it
just hides where it is weak. On current-affairs questions tied to a specific year
(this is the 2018 paper, so its "recent" events are from 2017), be especially
willing to say MED or LOW.

## The `value` field — mandatory, and not decoration

Alongside the option letter, state the answer's **content** in plain terms:

```json
{ "number": 1, "answer": "B", "value": "Caesium", "confidence": "HIGH",
  "reasoning": "The SI second is defined by the caesium-133 hyperfine transition." }
```

Comparing two passes by LETTER alone throws away the information that separates a
real disagreement from two labels sitting on the same fact. If a paper prints its
correct answer twice — which happens — then pass A saying `A` and pass B saying
`C` is **not** a disagreement, and only the `value` field can show that. Write
`value` as the option's substance, not as a restatement of the letter.

## Reasoning

One or two sentences, stating the fact or rule that decides it. This is stored as
the question's solution and a student reads it, so:

- Say **why**, not just what. "Caesium" is not a solution; "the SI second is
  defined by the caesium-133 hyperfine transition" is.
- **Name no option letters.** Write "the mid-oceanic ridge", never "option C".
  Letters go stale the moment options are ever reordered, and a solution that
  names a letter different from the key trips our audit as a false positive.
- Do not pad it with hedging. If you are unsure, that belongs in `confidence`.

## Question formats you will meet

- **"Consider the following statements … which is/are correct?"** — adjudicate
  each numbered statement on its own, then pick the code that matches. Say in
  your reasoning which statements you judged true and which false.
- **Match List with a code table** — work out the pairings first, then find the
  code row that matches. If no printed code row matches your pairing, say so
  rather than bending to the nearest one; that is a real finding.
- **"Statement I / Statement II"** — decide each statement's truth separately,
  then whether II actually explains I. The option set usually distinguishes
  "both true and II explains I" from "both true but II does not explain I".
- **Negative stems** — the paper bolds `not` / `cannot`. Read the stem twice.

## If the question is defective

If no option is correct, or two are equally correct, or the stem is internally
inconsistent — **say so**. Set `confidence` to `LOW`, pick the least-bad option,
and describe the defect in `reasoning`. Do not manufacture a defensible answer
for a question that has none; a flagged defect is a result, a laundered one is a
liability.

## Output

Write ONE JSON file to the path your prompt names — a flat array, one object per
question, every question in your packet present exactly once:

```json
[
  { "number": 1, "answer": "B", "value": "Caesium", "confidence": "HIGH",
    "reasoning": "The SI second is defined by the caesium-133 hyperfine transition." }
]
```

`answer` is a single letter `A`|`B`|`C`|`D`. Write the file through the editor,
**not** through a shell heredoc — the shell in this environment eats backslashes
and has silently corrupted both data and validation probes in this pipeline.

Your final message back should be a SHORT report: how many derived, the
confidence split, which numbers you marked LOW, and any defective questions.
Do not paste the JSON back.
