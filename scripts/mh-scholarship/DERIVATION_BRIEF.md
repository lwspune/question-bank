# MH Scholarship: blind derivation brief

You are deriving answers for a batch of questions from the Maharashtra State
Council of Examination's (MSCE) scholarship exam, English medium, for Class 4,
5, 7 or 8 students in Maharashtra: Mathematics, English, Marathi (the third
language) and an Intelligence Test (reasoning), at the level of the Maharashtra
State Board books for that class. **You are given no answer key, and you must not
go looking for one.**

Paths below are under `C:\Users\vilas\Downloads\qb-mh-scholarship\scripts\mh-scholarship\`.

An official key exists and is **deliberately withheld from you**. Your derivation
is what gets stored as the question's solution; the key supplies only the letter
and measures how far a blind solve can be trusted.

You may SEE a file named `<paper>.key.json` or `<paper>.answers.json`. Do not open
it. If you notice one, say so in your report and carry on blind.

## What you are given, and what you are deliberately NOT given

Your packet (in `out\derive\`) holds, per item: `number`, `stem`, four `options`
(A-D; the paper printed them as (1)-(4), so A is (1)), the shared `context` where
a set has one, and `figureImage` (a cropped picture) where the item needs a
figure. **Open every `figureImage` and solve from it** (crops live under
`C:\Vilas\LWS_Pune\MH_Scholarship\figures\`; those image files are the ONLY thing
you may open under `C:\Vilas\LWS_Pune`, where the withheld key and the original
pages also live). Option text "Figure (1)" ... "Figure (4)" means the answer
figures in that image.

You are **not** given the subject, chapter, difficulty or transcription flags. Do
not go looking for them, and do not read the merged transcription, the source
pages or the database.

## Two-answer questions

The paper's rule: up to 20% of questions have **two** correct options, and those
say so in the stem ("choose two correct alternatives", "Choose two correct
options", "दोन अचूक पर्याय निवडा"). For such an item give BOTH letters,
`"answer": "B,D"`, and judge every option separately. Every other item has exactly
one answer: a single letter.

## What to produce

Write `derived\<paper>.a.<packet>.json` (your task names it) as a JSON array, one
entry per item:

```json
{
  "number": 29,
  "answer": "D",
  "value": "x = 10",
  "confidence": "HIGH",
  "runnerUp": "",
  "reasoning": "Cross-multiply: \\(7(3x - 6) = 24(x - 3)\\), so \\(21x - 42 = 24x - 72\\). Then \\(3x = 30\\), so \\(x = 10\\). Check: \\(\\frac{24}{14} = \\frac{12}{7}\\)."
}
```

### `value` is mandatory

State **what the answer says**, in plain terms, not the letter again ("x = 10",
"the word 'चरण' here means 'feet'"). For a two-answer item, name both.

### `confidence` must be honest

- `HIGH`: you are sure, and you can say why from the stem alone.
- `MED`: fairly sure; one option needed a judgement call.
- `LOW`: guessing between two, or you lack the fact the item turns on.

**Do not inflate it.** On other papers the HIGH band has run 72/72, 85/86, 70/71
and 91/91 against official keys, with nearly every error in MED. That only works
if it is honest.

**Give `runnerUp` on every MED and LOW item**, in its own field (never in
`reasoning`): the letter you set aside and what would have to be true for it to
win. Leave it `""` on HIGH.

### `reasoning` is the explanation a student reads

One to four short sentences, stored as the solution and read by a 9 to 13 year old
preparing for this exam. Write it as a good teacher would: plain words, the
working in order, and for a close call why the tempting option is wrong.
- **Marathi questions (Marathi stem): write the reasoning in simple, correct
  Marathi**, the way a Marathi teacher explains grammar. Every other question:
  simple English.
- no "Runner-up", no confidence words, no "I", "my recollection", "this is a guess".
  Your doubt belongs in `confidence` and `runnerUp`, which no student sees.
- maths in `\( ... \)` where it helps (`\(\frac{3}{8}\)`), every `\(` closed.
- refer to options by letter in brackets, (A)-(D).
- state the fact plainly, or, where you lack it, say what the question turns on
  and leave the rest to `runnerUp`. Never invent a fact to sound sure.

## How to derive

**Solve the question as printed.** Do not repair a stem you think is wrong and
answer the repaired version: answer what is on the page and flag the problem in
`reasoning`.

**"Which is incorrect / wrong / not" items**: read the question twice; judge EACH
option and say which way each falls before choosing.

**Series, analogy, coding and odd-one-out items**: find the rule, state it in
`reasoning`, and check it holds for every given term, not just the first two.

**Figure items**: say in `reasoning` what you read from the figure that decides it
(the angle marked, the count of triangles, the face opposite).

**Numeric items**: do the arithmetic and check it by substituting back. Watch for
two options equal in value but written differently (\(\frac{1}{8}\) and
\(8^{-1}\)): on a two-answer item that is often the point.

**Where no option is defensible**, give your best letter, set `confidence` to
`LOW`, and say in `reasoning` that the item looks defective and why. Reporting one
is a result, not a failure.

## Two things that make a pass worthless

1. **Do not consult any answer key, coaching key or web source.** Your pass
   MEASURES how far a blind derivation can be trusted on this corpus; anchored to a
   key, that measurement is gone.
2. **Do not write your JSON through a bash heredoc**: it eats backslashes, so `\(`
   and `\frac` arrive corrupted. Use the Write tool.

**Keep your tool output small**: never print whole files back.

## Before you finish

- Every item in your packet has an entry; none skipped.
- Every `answer` is one letter A-D, or two different letters ("B,D") on an item
  whose stem asks for two.
- Every entry has a non-empty `value` and `reasoning`; MED/LOW have `runnerUp`.
- Your JSON parses (`node -e "JSON.parse(require('fs').readFileSync('<file>','utf8'))"`).

In your final message, report briefly: items derived, the confidence spread, and
any item you believe is defective.

## Punctuation: no em dashes in what you WRITE

Do not use an em dash anywhere in text you write. Use a full stop, a colon, a
comma or brackets. Do not swap in " – " or " -- ". Text you COPY from the paper
keeps its own punctuation.
