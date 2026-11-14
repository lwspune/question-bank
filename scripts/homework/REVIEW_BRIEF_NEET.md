# Repeat review brief (NEET Physics, Chemistry, Botany and Zoology, 2021 to 2026)

You are reviewing the chapters of one NEET (UG) subject's past-year questions to find which
questions were asked again in a later paper, and which kinds of question keep being asked. The
result ranks each chapter's "Top 10 PYQs" and the order of a daily homework plan, so a wrong
grouping puts a question in the wrong place. This brief follows `REVIEW_BRIEF_JEE.md` and differs
only where NEET does.

## Input

`evidence/<chapter>.md`: every question of the chapter. Each item starts with a header:

    ### <id> | <sitting> | paper <sitting> Q.<n> | <subtopic> [| has a figure you cannot see]

`<sitting>` is one paper: `NEET 2021` ... `NEET 2026`, plus two retests, `Re-NEET 2024` and
`Re-NEET 2026`. Each is its own sitting, so `NEET 2024` and `Re-NEET 2024` are two sittings.
Eight sittings in all, 36 to 62 questions a subject each.

Then the stem and the options `(A)..(D)`. Every item is a four-option MCQ. There are no sets or
case studies. A table in a stem is a markdown pipe-table flattened onto one line.

Chapters cut from the syllabus in 2024 have had their older questions removed already. **A chapter
file with only 1 item has nothing to compare: skip it** and write no output for it.

## What NEET does

NTA sets one paper a year, and NEET reuses facts far more than it reuses wording. Expect:
- **Biology (Botany, Zoology):** the same FACT asked again, in a new form: a one-line question one
  year, a "Statement I / Statement II" item, a "Match List I with List II", or a "Which of the
  following is correct / incorrect?" another year. These are where most of the repeats are.
- **Physics, Chemistry:** like JEE: the same standard task with new numbers comes back often
  (a type), the same specific question rarely (a repeat).

## What to find

Compare every item with every other item from a DIFFERENT sitting. Read them all; do not rely on
keywords or subtopic names. Two kinds of group:

**repeat**: the SAME question asked again. To a student, knowing the answer to one answers the
other.
- Physics/Chemistry: same situation, same ask, same method, the same answer up to changed numbers.
  Wording, option order and notation may differ; a few changed numbers are allowed (mark those
  members `"changed": true`, meaning "numbers or wording differ from the most recent member"; the
  most recent member itself is `false`).
- Biology: the SAME fact or the SAME pairing is the point of both. "The first stable product of
  CO2 fixation in Sorghum is" and a later "In C4 plants the first stable product of CO2 fixation
  is" (answer oxaloacetic acid both times) is a repeat, the older one `changed: true` if the
  wording differs. The same fact turned into a Statement I/II or a "which is correct" item, where
  that fact decides the answer, is a repeat too.
- A "Match List I with List II", or a statements item (A-E, "Statement I / II"), repeats ONLY if
  the lists or statements test the same facts (order may differ; one pair or statement swapped for
  another is still `changed: true`). Two matching questions on different items of one chapter are
  NOT a repeat, and usually not even a type.
- Same data, but a DIFFERENT QUANTITY or a different fact asked (the maximum vs the minimum; the
  site of glycolysis vs its end product): NOT a repeat; put them in a type if one worked example
  teaches both.
- A group must span at least 2 different sittings.
- **A standard task asked with fresh numbers is a TYPE, not a repeat**, even when the wording is
  near-identical. In the plan a repeat prints only its newest member and hides the others, so a big
  repeat group of fresh-number instances hides practice. Keep repeats for the same SPECIFIC
  question coming back.

**type**: the same specific task with different data, so that ONE worked example or ONE short
fact list teaches every member. Keep it NARROW:
- Good (Physics): "time period of a simple pendulum when g or length changes", "de Broglie
  wavelength of a particle accelerated through a potential difference", "equivalent resistance of
  a given network".
- Good (Chemistry): "pH of a buffer from pKa and the salt-to-acid ratio", "half-life of a first
  order reaction from its rate constant", "IUPAC name of a given coordination compound", "number
  of unpaired electrons / magnetic moment of a given complex ion".
- Good (Biology): "ATP and NADPH used by the Calvin cycle per glucose", "identify the stages
  labelled in a given diagram of the cell cycle", "phenotypic ratio of a given dihybrid cross",
  "match the plant hormone to its function".
- Too wide (a topic, not a type): "photosynthesis questions", "genetics", "electrostatics",
  "statements about the cell".
- A type spans at least 2 sittings. Members may also be in a repeat group.

An item is in at most one repeat group and at most one type group. Many items will be in no
group: that is expected. Do not stretch to make groups. Items marked `has a figure you cannot
see`: group them only when the text alone shows they are the same.

## Output

Write `out/<chapter-file-name>.json` (same base name as the evidence file) in your subject's
folder, `generated-papers/homework/neet-<subject>/out/` (`physics`, `chemistry`, `botany` or
`zoology`). A finished example (from a CBSE review; the ids look the same):

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
  ],
  "unsure": [
    { "id": "3c329514-4a89-4b0c-8d61-b2213ccbd69b", "note": "option (C) repeats (A); likely mistranscribed" }
  ]
}
```

`chapter` is the name exactly as in the evidence file's first line (`# <Subject> | <chapter> | N items`).
Labels are short plain text (no LaTeX), describing the question or task. Students read these
labels: they head the page listing the group's questions, so write them as a clear description
of what is asked (for a Biology repeat, name the fact: "First stable product of CO2 fixation in
C4 plants"). `unsure` may be empty.

Then run the validator and fix every error it reports:

    node scripts/homework/validate-review.mjs generated-papers/homework/neet-<subject>/evidence/<file>.md generated-papers/homework/neet-<subject>/out/<file>.json

## Rules

- Use only ids from your chapter file. Never invent one; copy ids, never retype them.
- Other reviewers run at the same time on other subjects. Name any helper file after your
  chapter (never `ids.txt` or similar), keep it under `generated-papers/homework/neet-<subject>/scratch/`,
  and take ids only from your own evidence files.
- Write ONLY your output file(s) (and scratch helpers). Do not edit any other file, do not run git,
  do not touch the database.
- Keep tool output small: read evidence in chunks, never print a whole output file back.
- If a stem looks mistranscribed (an option that repeats another, a value that fits none of the
  options, a statement list that the options do not match), group it by what the options show and
  list it under `unsure` with one line: the main session checks it against the printed paper.
- When done, reply with, per chapter: the number of repeat groups and type groups; then for the
  whole subject the five largest groups (label + sittings), and every `unsure` item (id + one line).
  Keep the reply under 60 lines.
