# Repeat review brief (UPSC CAPF (AC) Paper I, 2018 to 2026)

You are reviewing a few chapters of one CAPF (AC) Paper I subject to find which questions UPSC
asked again in a later paper, and which kinds of question it keeps asking. The result ranks each
chapter's "Top 10 PYQs" and the order of a daily homework plan, so a wrong grouping puts a
question in the wrong place. This brief is the CDS one (`REVIEW_BRIEF_CDS_GAT.md`) with CAPF's
papers, plus the SSC brief's rules (`REVIEW_BRIEF_SSC.md`) for the numeracy and reasoning
subjects. Current Affairs and IR is not reviewed (old news is not set as homework).

## Input

`<work dir>` is given in your task (one per subject). `<work dir>/evidence/<chapter>.md`: every
question of the chapter. Each item starts with a header:

    ### <id> | <paper> | paper <paper> Q.<n> | <subtopic> [| CASE STUDY] [| has a figure you cannot see]

`<paper>` is a year, `2018` to `2026`: CAPF (AC) has ONE Paper I a year, so a year is a paper.
Two items of the same year never repeat each other here.

Then the stem and the options `(A)..(D)`. An item marked CASE STUDY is a SET (a passage or a
table, printed as `Passage:` and then `Part <n>:` lines). A set is ONE item; its parts stay
together.

**A chapter file with only 1 item has nothing to compare: skip it** and write no output for it.

## What UPSC does in CAPF

- **GK subjects (History, Geography, Polity and Governance, Economy, Physics, Chemistry, Biology,
  Environment and Ecology, Computer Knowledge):** UPSC reuses FACTS far more than wording. The
  same fact comes back as a one-line question one year and a "Consider the following statements"
  or "Match List I with List II" item another year. With one paper a year expect FEW repeats and
  more types; that is the expected shape, not a failure.
- **Basic Numeracy, General Mental Ability, Logical Reasoning and Analytical Ability:** UPSC
  writes fresh numbers every year. Expect almost no repeats; types carry the ranking here, so
  make them carefully.

## What to find

Compare every item with every other item from a DIFFERENT year. Read them all; do not rely on
keywords or subtopic names. Two kinds of group:

**repeat**: the SAME question asked again. To a student, knowing the answer to one answers the
other.
- GK: the SAME fact or the SAME pairing decides both. A later "Hydrogenation of oils uses which
  gas?" after "Which gas is used in the manufacture of vanaspati ghee?" (hydrogen both times) is a
  repeat, the older one `changed: true` if the wording differs. The same fact turned into a
  statements item, where that fact decides the answer, is a repeat too.
- A statements item or a "Match List I with List II" repeats ONLY if the statements or lists test
  the same facts (order may differ; one statement or pair swapped for another is still
  `changed: true`). Two matching questions on different items of one chapter are NOT a repeat,
  and usually not even a type.
- Numeracy, reasoning, Physics/Chemistry calculations: same situation, same ask, same method, the
  same answer up to changed numbers. A standard task asked with fresh numbers is a TYPE.
- Same subject, different fact (the capital of one state vs another; the SI unit of force vs of
  pressure): NOT a repeat; a type only if one short fact list teaches both (see below).
- **Same topic, OPPOSITE answer is not a repeat.** If the deciding fact differs (one asks the
  largest, the other the smallest; the keys point at different facts), it is not a repeat.
- `changed` means "numbers or wording differ from the most recent member"; the most recent member
  itself is `false`. A group must span at least 2 different years.

**type**: the same specific task with different data, so that ONE worked example or ONE short fact
list teaches every member. Keep it NARROW:
- Good (Physics, Chemistry): "SI unit of a given quantity", "focal length / power of a lens",
  "oxidation state of an element in a given compound".
- Good (Biology): "which vitamin's deficiency causes a given disease".
- Good (History, Geography, Polity, Economy, Environment): "the river on which a given city
  stands", "the Governor-General in office when a given act was passed", "which Article of the
  Constitution deals with a given provision", "arrange given places from north to south", "the
  state in which a given national park lies".
- Good (Computer Knowledge): "expand a given abbreviation", "keyboard shortcut for a given action".
- Good (Numeracy): "two successive discounts: the single equivalent discount", "a pipe fills and
  another empties: time to fill", "remainder of a power divided by a number", "average speed for a
  round trip".
- Good (Mental Ability, Reasoning): "letter series with a fixed skip: next term", "code a word by
  shifting each letter by a fixed step", "seating in a row: who sits at a given place", "syllogism
  with two statements: which conclusion follows".
- Too wide (a topic, not a type): "questions on the Mughals", "optics", "percentage questions",
  "coding-decoding", "statements about the Constitution".
- **Items that are only a figure** (mirror images, paper folding, dice, embedded figures, figure
  counting, non-verbal series) cannot be read from the text: leave them ungrouped unless the text
  alone shows two are the same question.
- A type spans at least 2 years. Members may also be in a repeat group.

An item is in at most one repeat group and at most one type group. Many items will be in no
group: that is expected. Do not stretch to make groups.

## Output

Write `<work dir>/out/<chapter-file-name>.json` (same base name as the evidence file). A finished
example (from a CBSE review; CAPF ids look the same):

```json
{
  "chapter": "Continuity and Differentiability",
  "repeats": [
    { "label": "sin^2(ax)/x^2 for x != 0 and 1 at x = 0 is continuous: find a",
      "members": [ { "id": "93186c08-69a9-41d2-986b-a787645ae779", "changed": false },
                   { "id": "37975f9b-cdcb-4b5f-b67d-76651193c4ed", "changed": false } ] }
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
Labels are short plain text (no LaTeX). Students read these labels: they head the page listing the
group's questions, so write them as a clear description of what is asked (for a GK repeat, name the
fact: "Gas used to hydrogenate vegetable oils"). `unsure` may be empty.

Then run the validator and fix every error it reports:

    node scripts/homework/validate-review.mjs <work dir>/evidence/<file>.md <work dir>/out/<file>.json

## Rules

- Use only ids from your chapter file. Never invent one; copy ids, never retype them.
- Other reviewers run at the same time on other subjects. Name any helper file after your chapter
  (never `ids.txt` or similar), keep it under `<work dir>/scratch/`, and take ids only from your
  own evidence files.
- Write ONLY your output file(s) (and scratch helpers). Do not edit any other file, do not run git,
  do not touch the database.
- Keep tool output small: read evidence in chunks, never print a whole output file back.
- If a stem looks mistranscribed (an option that repeats another, a statement list the options do
  not match, a key fact that is plainly wrong), group it by what the options show and list it under
  `unsure` with one line: the main session checks it.
- When done, reply with, per chapter: the number of repeat groups and type groups; then for your
  whole assignment the five largest groups (label + years), and every `unsure` item (id + one
  line). Keep the reply under 60 lines.
