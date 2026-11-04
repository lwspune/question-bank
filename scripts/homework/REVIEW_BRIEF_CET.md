# Repeat review brief (MHT-CET Maths, Physics and Chemistry, May 2021 to May 2026)

You are reviewing a few chapters of one MHT-CET subject's past-year questions (State CET Cell,
Maharashtra; 50 MCQs of Maths, or 50 each of Physics and Chemistry, a shift; many shifts a year) to find which questions were
asked again in a later shift, and which kinds of question keep being asked. The result ranks each
chapter's "Top 10 PYQs" and the order of a daily homework plan, so a wrong grouping puts a
question in the wrong place. This brief follows `REVIEW_BRIEF_NDA.md` and differs only where
MHT-CET does.

## Input

`evidence/<chapter>.md`: every question of the chapter. Each item starts with a header:

    ### <id> | <shift> | paper <shift> Q.<n> | <subtopic> [| has a figure you cannot see]

`<shift>` is one paper: `10 May 2023 S1` is 10 May 2023, Shift 1. 2021 and 2022 had one paper
each in the bank (`May 2021 S1`, `May 2022 S1`). Two shifts of the same day are DIFFERENT papers.
Then the stem and the options `(A)..(D)`. There are no sets or case studies.

## What MHT-CET does

The papers are set fresh for every shift, but the same question often comes back in another shift
or year with a number changed ("lim (x^2 - ax + b)/(x - 1) = 5, find a + b" asked again with 7).
Exact word-for-word reprints are rarer. Expect a fair number of repeat groups AND many type groups.

## What to find

Compare every item with every other item from a DIFFERENT shift. Read them all; do not rely on
keywords. Two kinds of group:

**repeat**: the SAME question asked again. Same situation, same ask, same method, and the same
answer up to changed numbers. Allowed differences: wording, order of options, notation, or a few
numbers changed (mark those members `"changed": true`, meaning "numbers differ from the most
recent member"; the most recent member itself is `false`).
- "lim (x^2 - ax + b)/(x - 1) = 5, find a + b", asked again with 7: a repeat, the older one
  `changed: true`.
- Same working, only the FINAL READ-OFF differs (one asks a + b, another 2a + b, another a and b,
  from the same found a and b; or sin theta vs cosec theta): a repeat, the older ones
  `changed: true`. To a student it is the same question asked again.
- Same data, but a DIFFERENT QUANTITY is found (count the solutions vs list them; the maximum vs
  the minimum; the foot of the perpendicular vs the distance; the area vs the volume): NOT a
  repeat; put them in a type if one worked example teaches both.
- A "Consider the following statements" or "Which of the following is correct?" item repeats only
  if the statements test the same facts (order may differ).
- A group must span at least 2 different shifts.

**type**: the same specific task with different data, so that ONE worked example teaches every
member. Keep it NARROW:
- Good (Maths): "angle between two lines given in symmetric form", "value of k making a piecewise
  function continuous at a point", "mean and variance of a binomial distribution from n and p".
- Good (Physics): "time period of a simple pendulum when g or length changes", "fringe width
  change in Young's experiment when the setup is immersed in a liquid", "de Broglie wavelength of
  a particle accelerated through a potential difference".
- Good (Chemistry): "pH of a buffer from pKa and the salt-to-acid ratio", "half-life of a first
  order reaction from its rate constant", "IUPAC name of a given coordination compound",
  "product of a named reaction (aldol, Cannizzaro, Hofmann bromamide) on a given substrate".
- Too wide (a topic, not a type): "vector questions", "electrostatics", "organic reactions".
- A type spans at least 2 shifts. Members may also be in a repeat group.

An item is in at most one repeat group and at most one type group. Many items will be in no
group: that is expected. Do not stretch to make groups. Items marked `has a figure you cannot
see`: group them only when the text alone shows they are the same.

## Output

Write `out/<chapter-file-name>.json` (same base name as the evidence file) in your subject's
folder, `generated-papers/homework/mht-cet-<subject>/out/` (`maths`, `physics` or `chemistry`). A finished example (from a CBSE review; the ids
look the same):

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

`chapter` is the name exactly as in the evidence file's first line (`# <Subject> | <chapter> | N items`).
Labels are short plain text (no LaTeX), describing the question or task. Students read these
labels: they head the page listing the group's questions, so write them as a clear description
of what is asked.

Then run the validator and fix every error it reports:

    node scripts/homework/validate-review.mjs generated-papers/homework/mht-cet-<subject>/evidence/<file>.md generated-papers/homework/mht-cet-<subject>/out/<file>.json

## Rules

- Use only ids from your chapter file. Never invent one; copy ids, never retype them.
- Other reviewers run at the same time and share the folder. Name any helper file after your
  chapter (never `ids.txt` or similar), keep it under `generated-papers/homework/mht-cet-<subject>/scratch/`,
  and take ids only from your own evidence file.
- Write ONLY your output file(s) (and scratch helpers). Do not edit any other file, do not run git,
  do not touch the database.
- Keep tool output small: read evidence in chunks, never print a whole output file back.
- If a stem looks mistranscribed (a lost square root, an option that repeats another, a value that
  fits none of the options), group it by what the options show and list it under "unsure" with
  one line: the main session checks it against the printed paper.
- When done, reply with, per chapter: the number of repeat groups and type groups, the three
  largest groups (label + shifts), and anything you were unsure about (ids + one line each).
