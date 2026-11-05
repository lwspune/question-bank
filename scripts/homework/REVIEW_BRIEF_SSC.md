# Repeat review brief (SSC CGL Tier I: Quantitative Aptitude, Reasoning, English; 113 shifts, 2023-2025)

You are reviewing a few chapters of SSC CGL Tier I past questions to find which questions SSC
asked again in a later shift, and which kinds of question it keeps asking. The result ranks each
chapter's "Top 10 PYQs" and the order of a daily homework plan, so a wrong grouping puts a
question in the wrong place. This brief follows the CDS one (`REVIEW_BRIEF_CDS.md`) and differs
only where SSC does.

## Input

`<work dir>` is the folder your task names. `<work dir>/evidence/<chapter>.md`: every question
of the chapter. Each item starts with a header:

    ### <id> | <shift> | paper <shift> Q.<n> | <subtopic> [| CASE STUDY] [| has a figure you cannot see] [| reprinted word for word in <shifts>]

`<shift>` is one paper: `14 Jul 2023 S3` is the third shift of 14 July 2023. SSC holds Tier I over
about two weeks a year, up to four shifts a day, 113 shifts in all. Every shift is its own paper,
including two shifts of the same day.

Then the stem and the options `(A)..(D)`. An item marked CASE STUDY is a SET (a cloze passage or
a reading passage, printed as `Passage:` and then `Part <n>:` lines). A set is ONE item; its parts
stay together.

**Reprints.** When a later shift reprinted a question word for word, the bank keeps ONE row and
its header says `reprinted word for word in <shifts>`. Those shifts are already counted for you.
Do not look for its twin (there is none in the file). It may still join a repeat group with
other items that ask the same question with changed numbers.

## What SSC does

SSC writes fresh questions for almost every shift: in 113 shifts only about 14 questions were
reprinted, and even vocabulary words almost never come back. So expect VERY FEW repeat groups
and MANY type groups. That is the expected shape, not a failure. Types carry the ranking here,
so make them carefully.

## What to find

Compare every item with every other item from a DIFFERENT shift. Read them all; do not rely on
keywords. Two kinds of group:

**repeat**: the SAME question asked again. Same situation, same ask, same method, and the same
answer up to changed numbers. Allowed differences: wording, order of options, notation, or a few
numbers changed (mark those members `"changed": true`, meaning "numbers differ from the most
recent member"; the most recent member itself is `false`).
- Same data, different ask (find the cost price vs find the profit percent of the same deal):
  NOT a repeat; may be a type.
- Letters in one shift and numbers in another: NOT a repeat; may be a type.
- A group must span at least 2 different shifts.

**type**: the same specific task with different data, so that ONE worked example teaches every
member. Keep it NARROW:
- Quant, good: "two successive discounts: the single equivalent discount", "a pipe fills and
  another empties: time to fill", "sum of an expression given x + 1/x", "cone melted into spheres:
  how many".
- Reasoning, good: "letter series with a fixed skip (+2, +3, ...): next term", "code a word by
  shifting each letter by a fixed step", "operator swap (+ and x interchanged): find the value",
  "number analogy by the same rule (a, a^2 + 1)".
- English, good: error spotting by its RULE ("subject-verb agreement with 'each/every'",
  "'one of the' + plural noun"), "sentence improvement: tense after 'if' clause".
- Too wide (a topic, not a type): "percentage questions", "coding-decoding", "synonyms", "error
  spotting", "mirror images".
- **No types for items that are each their own fact:** synonyms, antonyms, one-word substitution,
  idioms, homophones and spelling. Two synonym questions on different words are not one task a
  worked example teaches; leave them ungrouped unless the SAME word or idiom comes back (then it
  is a repeat).
- **Items that are only a figure** (mirror images, paper folding, dice, embedded figures, figure
  counting, non-verbal series) cannot be read from the text: leave them ungrouped unless the text
  alone shows two are the same question.
- A set may be a member of a type when the set as a whole is the same task as the other members.
- A type spans at least 2 shifts. Members may also be in a repeat group.

An item is in at most one repeat group and at most one type group. Many items will be in no
group: that is expected. Do not stretch to make groups.

## Output

Write `out/<chapter-file-name>.json` (same base name as the evidence file). A finished example
(from a CBSE review; SSC ids look the same):

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

`chapter` is the name exactly as in the evidence file's first line (`# <subject> | <chapter> | N items`).
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
