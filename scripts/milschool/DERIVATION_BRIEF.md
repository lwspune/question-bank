# Military-school entrance: blind derivation brief

You are deriving answers for a batch of questions from a school-level entrance
exam for the Sainik Schools (AISSEE) or the Rashtriya Military Schools (RMS CET):
mathematics, intelligence (verbal and figure reasoning), English, general science
and social science, at the level of a child finishing Class 5 (for Class 6
admission) or Class 8 (for Class 9 admission). **You are given no answer key, and
you must not go looking for one.**

Paths below are under `C:\Users\vilas\Downloads\qb-defence-schools\scripts\milschool\`.

For some papers an official key exists and is **deliberately withheld from you**;
for others none exists. You are not told which, and it does not change your job.
Your derivation is what gets stored as the question's solution; a key, where
there is one, supplies only a letter.

You may SEE a file named `<paper>.key.json` or `<paper>.answers.json`. Do not open
it. If you notice one, say so in your report and carry on blind.

## What you are given, and what you are deliberately NOT given

Your packet (in `out\derive\`) holds, per item: `number`, `stem`, four `options`,
the shared `context` (a passage or table) where a set has one, and `figureImage`
(a cropped picture) where the item needs a figure. **Open every `figureImage` and
solve from it** (crops live under `C:\Vilas\LWS_Pune\Sainik_Schools\figures\`;
those image files are the ONLY thing you may open under `C:\Vilas\LWS_Pune`, where
the withheld key and the original pages also live). Option text "Figure (1)" ...
"Figure (4)" means the answer figures in that image, which are options A ... D.

You are **not** given the subject, chapter, difficulty, transcription flags or the
other pass's answer. Do not go looking for them, and do not read the merged
transcription, the source pages or the database. **You must not consult the other
pass.** Two passes that talked are one pass.

## What to produce

Write `derived\<paper>.<pass>.<packet>.json` (your task names it) as a JSON array,
one entry per item:

```json
{
  "number": 3,
  "answer": "D",
  "value": "28 men",
  "confidence": "HIGH",
  "runnerUp": "",
  "reasoning": "The work is 7 x 16 = 112 man-days, so double the work is 224 man-days. To finish it in 8 days needs 224 / 8 = 28 men."
}
```

### `value` is mandatory

State **what the answer says**, in plain terms, not the letter again. If the paper
prints the correct answer twice, two passes name different letters while
agreeing; `value` is what tells that apart from a real dispute.

### `confidence` must be honest

- `HIGH`: you are sure, and you can say why from the stem alone.
- `MED`: fairly sure; one option needed a judgement call.
- `LOW`: guessing between two, or you lack the fact the item turns on.

**Do not inflate it.** Measured against official keys, the HIGH band has run
72/72, 85/86, 70/71 and 91/91 on other papers, with nearly every error in MED.
That only works if it is honest.

**Give `runnerUp` on every MED and LOW item**, in its own field (never in
`reasoning`): the letter you set aside and what would have to be true for it to
win, e.g. `"runnerUp": "B, if 'rate' means per hour"`. Leave it `""` on HIGH.

### `reasoning` is the explanation a child reads

One to four short sentences, stored as the solution and read by a 10 to 13 year
old preparing for this exam. Write it as a teacher would: plain words, the
working in order, and for a close call why the other option is wrong.
- no "Runner-up", no confidence words, no "I", "my recollection", "this is a guess".
  Your doubt belongs in `confidence` and `runnerUp`, which no student sees.
- maths in `\( ... \)` where it helps (`\(\frac{3}{8}\)`), every `\(` closed.
- state the fact plainly, or, where you lack it, say what the question turns on
  and leave the rest to `runnerUp`. Never invent a fact to sound sure.

## How to derive

**Solve the question as printed.** Do not repair a stem you think is wrong and
answer the repaired version: answer what is on the page and flag the problem in
`reasoning`.

**Statement items** ("Statement I ... Statement II ...", "Which of the following
are correct?"): judge EACH statement separately and explicitly before choosing.

**English items**: judge the sentence exactly as printed (spacing, articles,
tense). For "error spotting", the answer is the part that contains the error, or
"No error" if none does.

**Reasoning and figure items**: work step by step; for a figure, say in
`reasoning` what you see that decides it (the rotation, the count, the mirror line).

**Numeric items**: do the arithmetic and check it. Run a quick check where you can.
Watch for two options equal in value but written differently.

**Where no option is defensible**, give your best letter, set `confidence` to
`LOW`, and say in `reasoning` that the item looks defective and why. Reporting one
is a result, not a failure.

## Two things that make a pass worthless

1. **Do not consult any answer key, coaching key or web source.** Your pass
   MEASURES how far a blind derivation can be trusted on this corpus; anchored to
   a key, that measurement is gone.
2. **Do not write your JSON through a bash heredoc**: it eats backslashes, so `\(`
   and `\frac` arrive corrupted. Use the Write tool.

**Keep your tool output small**: never print whole files back.

## Before you finish

- Every item in your packet has an entry; none skipped.
- Every `answer` is one of A, B, C, D.
- Every entry has a non-empty `value` and `reasoning`; MED/LOW have `runnerUp`.
- Your JSON parses (`node -e "JSON.parse(require('fs').readFileSync('<file>','utf8'))"`).

In your final message, report briefly: items derived, the confidence spread, and
any item you believe is defective.

## Punctuation: no em dashes in what you WRITE

Do not use an em dash anywhere in text you write. Use a full stop, a colon, a
comma or brackets. Do not swap in " – " or " -- ". Text you COPY from the paper
keeps its own punctuation. An en dash in a range (2017–2024) is fine.
