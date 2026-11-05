# Repeat review brief (CDS Elementary Mathematics, 21 papers, CDS 2 2016 to CDS 2 2026)

You are reviewing a few chapters of CDS Elementary Mathematics past-year questions (UPSC, 100
MCQs a paper, two papers a year) to find which questions UPSC asked again in a later paper, and
which kinds of question it keeps asking. The result ranks each chapter's "Top 10 PYQs" and the
order of a daily homework plan, so a wrong grouping puts a question in the wrong place. This brief
follows the NDA one (`REVIEW_BRIEF_NDA.md`) and differs only where CDS does.

## Input

`<work dir>` is the folder your task names. `<work dir>/evidence/<chapter>.md`: every question
of the chapter. Each item starts with a header:

    ### <id> | <paper> | paper <file> Q.<n> | <subtopic> [| CASE STUDY] [| has a figure you cannot see]

`<paper>` is one sitting: `CDS 1 2024` (the first paper of the year) or `CDS 2 2024` (the
second). The bank starts at CDS 2 2016; there is no CDS 1 2016.

Then the stem and the options `(A)..(D)`. An item marked CASE STUDY is a SET: UPSC's "Consider
the following for the next two (02) items", printed as `Passage:` (the shared data) followed by
`Part <n>:` lines. A set is ONE item; its parts stay together.

## What UPSC does

CDS Elementary Mathematics is school-level (Class 10) arithmetic, algebra, geometry,
mensuration, trigonometry and statistics, mostly word problems. UPSC rarely reprints a question
word for word. It asks the same question with new numbers (a man-days problem with other men
and days, a cone melted into spheres of another radius), so expect few repeat groups and many
type groups. That is the expected shape, not a failure.

## What to find

Compare every item with every other item from a DIFFERENT paper. Read them all; do not rely on
keywords. Two kinds of group:

**repeat**: the SAME question asked again. Same situation, same ask, same method, and the same
answer up to changed numbers. Allowed differences: wording, order of options, notation, or a few
numbers changed (mark those members `"changed": true`, meaning "numbers differ from the most
recent member"; the most recent member itself is `false`).
- "12 men working 8 hours a day build a wall in 10 days; how many hours a day must 8 men work to
  finish it in 8 days", asked again with other numbers: a repeat, the older one `changed: true`.
- Same data, different ask (the speed of a train vs the length of the same train): NOT a
  repeat; may be a type.
- A "Consider the following statements: 1. ... 2. ... Which is/are correct?" item repeats only
  if the statements test the same facts (order may differ).
- A set repeats only if its passage data and its parts are essentially the same.
- A group must span at least 2 different papers.

**type**: the same specific task with different data, so that ONE worked example teaches every
member. Keep it NARROW:
- Good: "number of trailing zeros of a factorial or product", "men x days x hours = constant:
  find the missing quantity", "solid melted and recast into smaller solids: find how many",
  "remainder when a power is divided by a small number", "angle of elevation from two points on a
  line: find the height".
- Too wide (a topic, not a type): "time and work questions", "mensuration of cones",
  "trigonometric identities".
- A set may be a member of a type when the set as a whole is the same task as the other members
  (two sets that each give a frequency table and ask mean, median, mode).
- A type spans at least 2 papers. Members may also be in a repeat group.

An item is in at most one repeat group and at most one type group. Many items will be in no
group: that is expected. Do not stretch to make groups. Items marked `has a figure you cannot
see`: group them only when the text alone shows they are the same.

## Output

Write `out/<chapter-file-name>.json` (same base name as the evidence file). A finished example
(from a CBSE review; CDS ids look the same):

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

    node scripts/homework/validate-review.mjs <work dir>/evidence/<file>.md <work dir>/out/<file>.json

## Rules

- Use only ids from your chapter file. Never invent one; copy ids, never retype them.
- Other reviewers run at the same time and share the folder. Name any helper file after your
  chapter (never `ids.txt` or similar), keep it under `<work dir>/scratch/`,
  and take ids only from your own evidence file.
- Write ONLY your output file(s) (and scratch helpers). Do not edit any other file, do not run git,
  do not touch the database.
- Keep tool output small: read evidence in chunks, never print a whole output file back.
- When done, reply with, per chapter: the number of repeat groups and type groups, the three
  largest groups (label + papers), and anything you were unsure about (ids + one line each).
