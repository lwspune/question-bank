# Repeat review brief (NDA Mathematics, 19 papers, NDA 1 2017 to NDA 2 2026)

You are reviewing a few chapters of NDA Mathematics past-year questions (UPSC, 120 MCQs a
paper, two papers a year) to find which questions UPSC asked again in a later paper, and which
kinds of question it keeps asking. The result ranks each chapter's "Top 10 PYQs" and the order of
a daily homework plan, so a wrong grouping puts a question in the wrong place. The board version
of this brief is `REVIEW_BRIEF.md`; this one differs only where NDA does.

## Input

`evidence/<chapter>.md`: every question of the chapter. Each item starts with a header:

    ### <id> | <paper> | paper <paper> Q.<n> | <subtopic> [| CASE STUDY] [| has a figure you cannot see]

`<paper>` is one sitting: `NDA 1 2024` (April) or `NDA 2 2024` (September). There is no
NDA 2 2020 (one combined paper that year, filed as NDA 1 2020).

Then the stem and the options `(A)..(D)`. An item marked CASE STUDY is a SET: UPSC's "Directions
for the following three (03) items" / "Consider the following for the next two items", printed
as `Passage:` (the shared data) followed by `Part <n>:` lines. A set is ONE item; its parts stay
together.

## What UPSC does

UPSC almost never reprints a question word for word (4 exact repeats in 2,280 questions). It
asks the same question with new numbers, or the same task with a new function or matrix. So
expect FEW repeat groups and MANY type groups. That is the expected shape, not a failure.

## What to find

Compare every item with every other item from a DIFFERENT paper. Read them all; do not rely on
keywords. Two kinds of group:

**repeat**: the SAME question asked again. Same situation, same ask, same method, and the same
answer up to changed numbers. Allowed differences: wording, order of options, notation, or a few
numbers changed (mark those members `"changed": true`, meaning "numbers differ from the most
recent member"; the most recent member itself is `false`).
- "If the coefficients of the (2r+1)th and (r+2)th terms of (1+x)^43 are equal, find r", asked
  again with (1+x)^45: a repeat, the 45 one `changed: true` if it is older.
- Same data, different ask (mean of a table vs median of the same table): NOT a repeat; may be a
  type.
- A "Consider the following statements: 1. ... 2. ... Which is/are correct?" item repeats only
  if the statements test the same facts (order may differ).
- A set repeats only if its passage data and its parts are essentially the same.
- A group must span at least 2 different papers.

**type**: the same specific task with different data, so that ONE worked example teaches every
member. Keep it NARROW:
- Good: "coefficient of a given power of x in (ax^p + b/x^q)^n", "number of terms in
  (x+a)^n + (x-a)^n", "value of k making a piecewise function continuous at a point",
  "angle between two lines given in symmetric form", "probability that at least one of
  independent events occurs, given each probability".
- Too wide (a topic, not a type): "binomial theorem questions", "probability of events",
  "properties of determinants".
- A set may be a member of a type when the set as a whole is the same task as the other members
  (two sets that each give a frequency table and ask mean, median, mode).
- A type spans at least 2 papers. Members may also be in a repeat group.

An item is in at most one repeat group and at most one type group. Many items will be in no
group: that is expected. Do not stretch to make groups. Items marked `has a figure you cannot
see`: group them only when the text alone shows they are the same.

## Output

Write `out/<chapter-file-name>.json` (same base name as the evidence file). A finished example
(from a CBSE review; NDA ids look the same):

```json
{
  "chapter": "Continuity and Differentiability",
  "repeats": [
    { "label": "sin^2(ax)/x^2 for x != 0 and 1 at x = 0 is continuous: find a",
      "members": [ { "id": "93186c08-69a9-41d2-986b-a787645ae779", "changed": false },
                   { "id": "37975f9b-cdcb-4b5f-b67d-76651193c4ed", "changed": false } ] },
    { "label": "(x^2 - bx - c)/(x + 1) for x != -1 and k at x = -1 is continuous: find k",
      "members": [ { "id": "cb9994b8-995b-4dcc-8d60-b12808da1dab", "changed": true },
                   { "id": "3c329514-4a89-4b0c-8d61-b2213ccbd69b", "changed": false } ] }
  ],
  "types": [
    { "label": "Value of k making a function continuous at a point (limit form)",
      "members": ["743a2c32-f72b-411b-ad3b-c6bfb4126c41", "009a5549-d9ef-40e0-b702-a538d48f5998"] }
  ]
}
```

`chapter` is the name exactly as in the evidence file's first line (`# Mathematics | <chapter> | N items`).
Labels are short plain text (no LaTeX), describing the question or task.

Then run the validator and fix every error it reports:

    node scripts/homework/validate-review.mjs generated-papers/homework/nda-maths/evidence/<file>.md generated-papers/homework/nda-maths/out/<file>.json

## Rules

- Use only ids from your chapter file. Never invent one; copy ids, never retype them.
- Other reviewers run at the same time and share the folder. Name any helper file after your
  chapter (never `ids.txt` or similar), keep it under `generated-papers/homework/nda-maths/scratch/`,
  and take ids only from your own evidence file.
- Write ONLY your output file(s) (and scratch helpers). Do not edit any other file, do not run git,
  do not touch the database.
- Keep tool output small: read evidence in chunks, never print a whole output file back.
- When done, reply with, per chapter: the number of repeat groups and type groups, the three
  largest groups (label + papers), and anything you were unsure about (ids + one line each).
