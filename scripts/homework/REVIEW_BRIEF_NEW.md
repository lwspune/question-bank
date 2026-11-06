# Review brief: a new paper into an existing homework plan

A plan has already been reviewed chapter by chapter. A new paper (or shift) was
ingested later, and its questions are in no plan yet: the daily prod check
(`tests/homework-plan-coverage.test.ts`) or `npm run homework:coverage` said so.
You place only the NEW questions. The rules for what counts as a repeat or a type
are the exam's own brief (`REVIEW_BRIEF.md` for CBSE and boards, `REVIEW_BRIEF_JEE.md`,
`_CET`, `_NDA`, `_CDS`, `_SSC`): read it first and follow it, especially "a
standard task asked with fresh numbers is a TYPE, not a repeat".

## Input

`npm run homework:new -- <plan slug>` writes `generated-papers/homework/<slug>-new/`:

- `evidence/<chapter>.md`: the chapter's new questions (same header as a full
  review: `### <id> | <sitting> | Q.<n> | <subtopic>`), then **every group the
  plan already has in that chapter**, one line each:
  `- G<index> | repeat|type | <n> sittings (<list>) | <label>`, with its newest
  question's stem below it. Last, the chapter's questions in no group yet
  (asked once so far), one line each with a short stem.
- `new-slots.json`: the new questions (do not edit).

A chapter marked LEFT OUT of the plan needs no review: skip it.

## What to decide, per new question

1. **It is a question the plan already has, asked again**: join that repeat.
   `changed`: true when its numbers differ from the group's NEWEST question
   (the one shown), false when they are the same.
2. **It is a kind the plan already has**: join that type.
3. Both can apply (a repeat AND a type), as in a full review.
4. **It repeats or matches a question of the plan that is in no group yet**
   (listed at the end of the evidence, "Questions of this chapter in no group
   yet"), or another new question from a different sitting: make a new group.
   It must span two sittings and hold at least one new question.
5. **None of the above**: leave it out. It is added anyway and asked once.

Refer to an existing group by its INDEX (`G12` -> `12`), never by its label:
two groups can share a label.

## Output

`out/<chapter-file-name>.json` (same base name as the evidence file):

```json
{
  "chapter": "Matrices",
  "attach": [
    { "id": "<new id>", "repeat": 332, "changed": true },
    { "id": "<new id>", "type": 336 },
    { "id": "<new id>", "repeat": 333, "changed": false, "type": 334 }
  ],
  "newRepeats": [
    { "label": "Plain description", "members": [ { "id": "<new id>", "changed": false }, { "id": "<old id>", "changed": true } ] }
  ],
  "newTypes": [
    { "label": "Plain description", "members": ["<new id>", "<old id>"] }
  ]
}
```

Every key but `chapter` is optional. Then run
`npm run homework:add-new -- <plan slug>` (a dry run): it refuses, naming the
problem, on an unknown id, a wrong group kind, a missing `changed`, a question
put in two repeats, or a new group spanning one sitting. Fix and re-run.

## Rules

- Write ONLY your output file(s). Do not edit the plan file, run git or touch the database.
- Copy ids, never retype them. Keep tool output small.
- A stem that looks mistranscribed: place it by what it asks and list it in your reply.
- Reply with: per chapter, how many joined a repeat, a type, a new group, or none; and anything unsure.

## After the review (main session)

`npm run homework:add-new -- <slug>` (dry run) -> read every decision ->
`--write` -> `npm run homework:build -- scripts/homework/data/<slug>.json`
(dry run reports how many days change) -> `npm run db:backup` -> `--apply`.
A rebuild re-ranks the whole plan (owner, 2026-11-06: rebuild freely); students'
marks are per question, so nothing they did is lost. Update the plan's `summary`
when the new paper adds a year (add-new prints a note).
