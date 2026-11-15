# Repeat review brief (SSC CGL Tier I, General Awareness: the GK subjects; 113 shifts, 2023-2025)

You are reviewing a few chapters of one SSC CGL Tier I General Awareness subject (History,
Geography, Polity, Economics, Biology, Chemistry or Physics) to find which questions SSC asked
again in a later shift, and which kinds of question it keeps asking. The result ranks each
chapter's "Top 10 PYQs" and the order of a daily homework plan, so a wrong grouping puts a
question in the wrong place. This brief joins the SSC one (`REVIEW_BRIEF_SSC.md`, for the shifts
and reprints) with the NDA GK one (`REVIEW_BRIEF_NDA_GAT.md`, for what counts as a GK repeat).
Current Affairs is not reviewed (old news is not set as homework).

## Input

`<work dir>` is `generated-papers/homework/ssc-cgl-<subject>` (`history`, `geography`, `polity`,
`economics`, `biology`, `chemistry`, `physics`). `<work dir>/evidence/<chapter>.md`: every
question of the chapter. Each item starts with a header:

    ### <id> | <shift> | paper <shift> Q.<n> | <subtopic> [| has a figure you cannot see] [| reprinted word for word in <shifts>]

`<shift>` is one paper: `14 Jul 2023 S3` is the third shift of 14 July 2023. Every shift is its
own paper, including two shifts of the same day. Then the stem and the options `(A)..(D)`.

**Reprints.** When a later shift reprinted a question word for word, the bank keeps ONE row and
its header says `reprinted word for word in <shifts>`. Those shifts are already counted for you.
Do not look for its twin (there is none in the file). It may still join a repeat group with
other items that ask the same fact in other words.

**A chapter file with only 1 item has nothing to compare: skip it** and write no output for it.

## SSC CHSL and SSC CPO (if your work dir starts `chsl-` or `cpo-`)

The same brief applies to two other SSC exams, each reviewed on its own:

- **SSC CHSL Tier I**: 24 shifts, July 2024 and November 2025, work dirs
  `generated-papers/homework/chsl-<subject>`.
- **SSC CPO Paper I**: 16 shifts, June-July 2024 and December 2025, work dirs
  `generated-papers/homework/cpo-<subject>`.

Shifts are named exactly as for CGL (`1 Jul 2024 S1`). Count repeats and types across the
shifts of THAT exam only: never compare with CGL or with the other exam, and never call a
question a repeat because you remember it from another exam. With fewer shifts than CGL,
expect even fewer repeat groups; a type still needs members from 2+ different shifts.

## What SSC does in General Awareness

SSC rarely reprints a GK question word for word, but it asks the SAME FACT again in new words
across its 113 shifts: the author of a play, the state of a folk dance, the Article on a
provision, the year of a battle, the unit of a quantity. Those are the repeats, and in a big
chapter there may be many. Physics and Chemistry also bring back the same small calculation or
unit question with new numbers (a type).

## What to find

Compare every item with every other item from a DIFFERENT shift. Read them all; do not rely on
keywords or subtopic names. Two kinds of group:

**repeat**: the SAME question asked again. To a student, knowing the answer to one answers the
other.
- The SAME fact or the SAME pairing decides both. "Who wrote Mrichchhakatika?" and a later "The
  play Mrichchhakatika was written by ____" (Shudraka both times) is a repeat. The reverse
  direction ("Shudraka wrote which play?") is a repeat too when the same pairing decides it. The
  same fact turned into a "which is correct" or a statements item, where that fact decides the
  answer, is a repeat as well.
- A "Consider the following statements" item or a "Match List I with List II" repeats ONLY if the
  statements or lists test the same facts (order may differ; one statement or pair swapped for
  another is still `changed: true`). Two matching questions on different items of one chapter are
  NOT a repeat, and usually not even a type.
- Physics/Chemistry calculations: same situation, same ask, same method, the same answer up to
  changed numbers. A standard task asked with fresh numbers is a TYPE, not a repeat.
- Same subject, different fact (the dance of one state vs another; the Article on one provision vs
  another; the SI unit of force vs of pressure): NOT a repeat; a type only if one short fact list
  teaches both (see below).
- `changed` means "wording or numbers differ from the most recent member"; the most recent member
  itself is `false`. A group must span at least 2 different shifts.

**type**: the same specific task with different data, so that ONE worked example or ONE short fact
list teaches every member. Keep it NARROW:
- Good: "which Article of the Constitution deals with a given provision", "the Schedule that lists
  a given item", "the Governor-General in office when a given act was passed", "the ruler who
  built a given monument", "the river on which a given dam or city stands", "the state of a given
  national park", "the SI unit of a given quantity", "which vitamin's deficiency causes a given
  disease", "the chemical formula of a given common compound", "the Five-Year Plan in which a
  given scheme began".
- Too wide (a topic, not a type): "questions on the Mughals", "optics", "statements about the
  Constitution", "Indian rivers", "banking".
- A type spans at least 2 shifts. Members may also be in a repeat group.

An item is in at most one repeat group and at most one type group. Many items will be in no
group: that is expected. Do not stretch to make groups. Items marked `has a figure you cannot
see`: group them only when the text alone shows they are the same.

## Output

Write `<work dir>/out/<chapter-file-name>.json` (same base name as the evidence file). A finished
example (from a CBSE review; SSC ids look the same):

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
group's questions, so write them as a clear description of what is asked (for a repeat, name the
fact: "Author of the play Mrichchhakatika"; for a type, the task: "Article of the Constitution on
a given provision"). `unsure` may be empty.

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
- Name in a `"crossChapter"` list (same shape as `unsure`) any item of yours that asks the same
  fact as an item you noticed in ANOTHER chapter of your subject; the main session decides those.
- When done, reply with, per chapter: the number of repeat groups and type groups; then for your
  whole assignment the five largest groups (label + shifts), every `unsure` item and every
  `crossChapter` item (id + one line). Keep the reply under 60 lines.
