# Repeat review brief (JEE Mains Maths, Physics and Chemistry, 2021 to 2026)

You are reviewing a few chapters of one JEE Mains subject's past-year questions (NTA's JEE Main,
paper 1; 30 questions a subject a shift until 2024, 25 from 2025; many shifts a year) to find which
questions were asked again in a later sitting, and which kinds of question keep being asked. The
result ranks each chapter's "Top 10 PYQs" and the order of a daily homework plan, so a wrong
grouping puts a question in the wrong place. This brief follows `REVIEW_BRIEF_CET.md` and differs
only where JEE Mains does.

## Input

`evidence/<chapter>.md`: every question of the chapter. Each item starts with a header:

    ### <id> | <sitting> | paper <sitting> Q.<n> | <subtopic> [| has a figure you cannot see]

`<sitting>` is how the bank files the paper, and it comes in three shapes:
- `2 Apr 2026 S1`: one shift (2026).
- `14 Jun 2022`: one DAY of 2022-2025. The bank keeps both shifts of that day together, so two
  items with the same day label may come from different shifts; they still count as ONE sitting.
- `2021 Paper 7`: a 2021 paper with no date in the source. Two different paper numbers are two
  sittings.

Then the stem and the options `(A)..(D)`. **An item with no options is a numeric-answer question**
(Section B: the student types a number). An MCQ and a numeric item can be the same question, or
the same type. There are no sets or case studies.

## What JEE Mains does

NTA sets every shift fresh, but the same question often comes back in another shift or year with a
number changed, and the same TASK comes back constantly with new data. Exact word-for-word reprints
are rare. Expect some repeat groups and many type groups.

**Copies are not repeats.** A few 2021 papers are compilations that reprint a question from
another paper. If two items are word for word the same, options and all, and one is a 2021 paper,
do NOT put them in a repeat group: list both ids under "unsure" with the line "same text, 2021
copy", and the main session decides. A real repeat from a later year keeps its own place.

## What to find

Compare every item with every other item from a DIFFERENT sitting. Read them all; do not rely on
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
- A group must span at least 2 different sittings (two shifts of one 2022-2025 day are one).
- **A standard task asked with fresh numbers is a TYPE, not a repeat**, even when the wording is
  near-identical ("shortest distance between two given lines", "rank of a given word in a
  dictionary", "number of solutions of a trig equation in an interval"). In the plan a repeat
  prints only its newest member and never prints the others, so a big repeat group of fresh-number
  instances hides practice. Keep repeats for the same SPECIFIC question coming back: the same
  setup, expression or configuration, a few numbers changed.
- Two items that share a method but where one must first find its own object (one is given the
  curve, the other derives it from a condition), or whose givens are set up differently (an extra
  bound, a second function), or that ask different quantities, are a TYPE, not a repeat.

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
- A type spans at least 2 sittings. Members may also be in a repeat group.

An item is in at most one repeat group and at most one type group. Many items will be in no
group: that is expected. Do not stretch to make groups. Items marked `has a figure you cannot
see`: group them only when the text alone shows they are the same.

## Output

Write `out/<chapter-file-name>.json` (same base name as the evidence file) in your subject's
folder, `generated-papers/homework/jee-mains-<subject>/out/` (`maths`, `physics` or `chemistry`). A finished example (from a CBSE review; the ids
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

    node scripts/homework/validate-review.mjs generated-papers/homework/jee-mains-<subject>/evidence/<file>.md generated-papers/homework/jee-mains-<subject>/out/<file>.json

## Rules

- Use only ids from your chapter file. Never invent one; copy ids, never retype them.
- Other reviewers run at the same time and share the folder. Name any helper file after your
  chapter (never `ids.txt` or similar), keep it under `generated-papers/homework/jee-mains-<subject>/scratch/`,
  and take ids only from your own evidence file.
- Write ONLY your output file(s) (and scratch helpers). Do not edit any other file, do not run git,
  do not touch the database.
- Keep tool output small: read evidence in chunks, never print a whole output file back.
- If a stem looks mistranscribed (a lost square root, an option that repeats another, a value that
  fits none of the options), group it by what the options show and list it under "unsure" with
  one line: the main session checks it against the printed paper.
- When done, reply with, per chapter: the number of repeat groups and type groups, the three
  largest groups (label + sittings), and anything you were unsure about (ids + one line each).
