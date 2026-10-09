# Repeat review brief (CBSE Class 12 board questions, 2022-2026)

You are reviewing ONE OR TWO chapters of CBSE Class 12 board past-year questions to find
which questions the board asked again in a later year. A teacher will set daily homework
with the most-repeated questions first, so a wrong grouping puts a question on the wrong day.

## Input

`evidence/<chapter>.md` — every question of the chapter. Each item starts with a header:

    ### <id> | <year> | paper <code> Q.<n> | <subtopic> [| CASE STUDY] [| has a figure you cannot see]

then the stem, any options `(A)..(D)`, and for a case study the passage and its parts.
A case study is ONE item (its parts stay together).

## What to find

Compare every item with every other item of a DIFFERENT year. Read them all; do not rely on
keywords. Two kinds of group:

**repeat** — the SAME question asked again. Same situation, same ask, same expected answer.
Allowed differences: wording, order of options, notation, or a few numbers changed (mark those
members `"changed": true`, meaning "numbers differ from the most recent member").
- A theory question ("derive the expression for…", "state … and explain…", "define…") asked again
  with the same expected answer IS a repeat even if worded differently.
- Changed numbers that change the answer (a lens that now diverges, a dopant swapped from boron to
  arsenic, currents now in opposite directions) are STILL a repeat, marked `"changed": true`: the
  student practises the same question.
- A sub-part match is not enough: if one item asks for much more or something different, it is
  not a repeat (it may still be the same type).
- A case study repeats only if the passage and parts are essentially the same.
- A group must span at least 2 different years. Same-year near-copies (different set papers of
  one year) may be members of a group that spans years, but are never a group by themselves.

**type** — the same specific task with different data, e.g. "find the de Broglie wavelength of an
electron accelerated through a given potential", "use the lens maker's formula to find the focal
length of a lens of given radii and index". Keep a type NARROW: one worked example should teach
every member. "Numericals on Ohm's law" is a topic, not a type. A type spans at least 2 years.
Members may also be in a repeat group.

An item is in at most one repeat group and at most one type group. Most items will be in no group:
that is expected. Do not stretch to make groups.

Items marked `has a figure you cannot see`: group them only when the text alone shows they are the
same; otherwise leave them out.

## Output

Write `out/<chapter-file-name>.json` (same base name as the evidence file):

```json
{
  "chapter": "<chapter name exactly as in the evidence header>",
  "repeats": [
    { "label": "short description of the question", "members": [ { "id": "<id>", "changed": false } ] }
  ],
  "types": [
    { "label": "short description of the task", "members": ["<id>", "<id>"] }
  ]
}
```

Then run the validator and fix every error it reports:

    node scripts/homework/validate-review.mjs generated-papers/homework/<subject-dir>/evidence/<file>.md generated-papers/homework/<subject-dir>/out/<file>.json

## Rules

- Use only ids from your chapter file. Never invent one.
- Other reviewers run at the same time and share your scratch space. Name any helper file after
  your chapter (never `ids.txt` or similar), and take ids only from your own evidence file.
- Write ONLY your output file(s). Do not edit any other file, do not run git, do not touch the database.
- When done, reply with: per chapter, the number of repeat groups and type groups, the three
  largest repeat groups (label + years), and anything you were unsure about.
