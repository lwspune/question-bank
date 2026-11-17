# RIMC written papers: blind solution brief

You are writing model answers for a WRITTEN paper from the entrance exam of the
Rashtriya Indian Military College, Dehradun (Class 8 entry, children aged 11 to
13): **Mathematics** (30 problems, marked step by step) or **English** (reading
comprehension, writing tasks, grammar). **No answer key exists, and you must not
go looking for one.** Two people solve each paper separately; where your final
answers differ, a person settles it.

Paths below are under `C:\Users\vilas\Downloads\qb-defence-schools\scripts\milschool\`.

## What you are given, and what you are NOT given

Your packet (in `out\derive\`) holds, per item: `number`, the printed `label`
("1(a)", "Q.7"), `marks`, the `stem`, the shared `context` (a passage) where a
set has one, `figureImage` where the item needs a figure, and `open: true` on an
open-ended writing task (an essay, letter, story, notice, paragraph). **Open
every `figureImage`** (crops under `C:\Vilas\LWS_Pune\Sainik_Schools\figures\`;
those images are the ONLY thing you may open under `C:\Vilas\LWS_Pune`).

You are not given the other solver's answers. **Do not consult them, the
merged transcription, the source pages, the database or the web.**

## What to produce

Write `derived\<paper>.<pass>.<packet>.json` (your task names it) as:

```json
{
  "answers": [
    {
      "number": 7,
      "label": "Q.7",
      "finalAnswer": "Rs. 3,600",
      "solution": "Simple interest = \\(\\frac{P \\times R \\times T}{100}\\) ...\n\nSo the interest is Rs. 3,600.",
      "confidence": "HIGH"
    }
  ]
}
```

### `finalAnswer`: short, comparable

The bare result the other solver's answer is compared with: a number with its
unit, an expression, a word, the corrected sentence, or for a multi-part answer
the parts in order separated by `;` (`"x = 4; y = -1"`). No working, no
sentence around it. For an `open` item, leave it `""`.

### `solution`: the model answer a student reads

This is stored and shown to a child preparing for the exam. Write it as a good
teacher would, in plain words:
- **Mathematics**: every step the marks are given for, in order, each on its own
  line, maths in `\( ... \)` (every `\(` closed), ending with a clear final line
  ("So, the answer is ..."). A 10-mark problem needs more working than a 5-mark one.
- **English, comprehension and grammar**: the answer itself, as a student should
  write it (full sentences where the question asks for them), plus one line of
  why where it helps (the passage line it comes from, the rule applied).
- **English, open writing tasks** (`open: true`): ONE complete sample answer of
  the length and format the task asks for (letter layout, essay paragraphs,
  word limit respected), written as a strong Class 8 student would.
- no "I think", no confidence words, no mention of another solver.

### `confidence` must be honest

- `HIGH`: sure of the final answer from the stem alone.
- `MED`: one step needed a judgement call (an ambiguous wording, a missing unit).
- `LOW`: guessing, or the question looks defective.
Measured on other papers, nearly every error sits in MED and LOW; that only
works if HIGH is earned. An `open` item is always `HIGH`.

## How to solve

**Solve the question as printed.** If a stem looks wrong (a missing number, a
self-contradiction), answer the most sensible reading, set `confidence` to LOW,
and say in `solution` what is wrong with the printed question.

Where a question offers a choice ("Attempt any one", "Write on any one of the
following topics"), answer ONE option, say which at the start of `solution`, and
give it fully.

## Two things that make a pass worthless

1. **Do not consult any key, coaching solution or web source.**
2. **Do not write your JSON through a bash heredoc**: it eats backslashes, so `\(`
   and `\frac` arrive corrupted. Use the Write tool.

**Keep your tool output small**: never print whole files back.

## Before you finish

- Every item in your packet has an entry; none skipped.
- Every non-open entry has a non-empty `finalAnswer` and `solution`; every entry a `confidence`.
- Your JSON parses (`node -e "JSON.parse(require('fs').readFileSync('<file>','utf8'))"`).

Report briefly: items solved, the confidence spread, and any item you believe is
defective.

## Punctuation: no em dashes in what you WRITE

Do not use an em dash in text you write. Use a full stop, a colon, a comma or
brackets. Text you COPY from the paper keeps its own punctuation.
