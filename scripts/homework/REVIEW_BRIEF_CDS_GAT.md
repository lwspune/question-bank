# Repeat review brief (CDS English and General Knowledge, CDS 2 2016 to CDS 2 2026)

You are reviewing a few chapters of one CDS subject (English, Physics, Chemistry, Biology,
Geography, History, Polity or Economics) to find which questions UPSC asked again in a later paper,
and which kinds of question it keeps asking. The result ranks each chapter's "Top 10 PYQs" and the
order of a daily homework plan, so a wrong grouping puts a question in the wrong place. This brief
is the NDA GAT one (`REVIEW_BRIEF_NDA_GAT.md`) with CDS's papers; CDS GK and English are set by the
same UPSC, in the same shape, at graduate level. Current Affairs is not reviewed (old news is not
set as homework).

## Input

`<work dir>` is `generated-papers/homework/cds-<subject>` (`english`, `physics`, `chemistry`,
`biology`, `geography`, `history`, `polity`, `economics`). `<work dir>/evidence/<chapter>.md`: every
question of the chapter. Each item starts with a header:

    ### <id> | <paper> | paper <file> Q.<n> | <subtopic> [| CASE STUDY] [| has a figure you cannot see]

`<paper>` is one sitting: `CDS 1 2024` (the first paper of the year) or `CDS 2 2024` (the second).
GK runs from CDS 2 2016 (there is no CDS 1 2016) to CDS 2 2026; English from CDS 1 2017 to CDS 2
2026. Two papers of the SAME sitting never repeat each other here (there is one GK paper and one
English paper a sitting).

Then the stem and the options `(A)..(D)`. An item marked CASE STUDY is a SET (a reading passage or
a cloze passage, printed as `Passage:` and then `Part <n>:` lines). A set is ONE item; its parts
stay together.

**A chapter file with only 1 item has nothing to compare: skip it** and write no output for it.

## What UPSC does in CDS

- **GK subjects (Physics, Chemistry, Biology, Geography, History, Polity, Economics):** UPSC reuses
  FACTS far more than wording. The same fact comes back as a one-line question one year, a
  "Consider the following statements" item or a "Match List I with List II" another year. These
  are most of the repeats. Physics and Chemistry also bring back the same small calculation or
  unit question with new numbers (a type). Many CDS GK items are also NDA questions; that does not
  matter here, compare only within your files.
- **English:** UPSC writes fresh sentences every paper. Expect VERY FEW repeats (a vocabulary word,
  an idiom or a pair of confusable words that comes back) and types only for grammar rules. That is
  the expected shape, not a failure.

## What to find

Compare every item with every other item from a DIFFERENT paper. Read them all; do not rely on
keywords or subtopic names. Two kinds of group:

**repeat**: the SAME question asked again. To a student, knowing the answer to one answers the
other.
- GK: the SAME fact or the SAME pairing decides both. "Which gas is used in the manufacture of
  vanaspati ghee?" and a later "Hydrogenation of oils uses which gas?" (hydrogen both times) is a
  repeat, the older one `changed: true` if the wording differs. The same fact turned into a
  statements or a "which is correct" item, where that fact decides the answer, is a repeat too.
- A "Consider the following statements: 1. ... 2. ... Which is/are correct?" item, or a "Match
  List I with List II", repeats ONLY if the statements or lists test the same facts (order may
  differ; one statement or pair swapped for another is still `changed: true`). Two matching
  questions on different items of one chapter are NOT a repeat, and usually not even a type.
- Physics/Chemistry calculations: same situation, same ask, same method, the same answer up to
  changed numbers. A standard task asked with fresh numbers is a TYPE, not a repeat.
- Same subject, different fact (the capital of one state vs another; the SI unit of force vs of
  pressure): NOT a repeat; a type only if one short fact list teaches both (see below).
- English: the SAME word in a synonym/antonym/meaning item, the SAME idiom, the SAME pair of
  similar-sounding words, the SAME sentence with the same error. A synonym item and an antonym
  item on the same word are NOT a repeat (the answer differs); they may be left ungrouped.
- `changed` means "numbers or wording differ from the most recent member"; the most recent member
  itself is `false`. A group must span at least 2 different papers.

**type**: the same specific task with different data, so that ONE worked example or ONE short fact
list teaches every member. Keep it NARROW:
- Good (Physics, Chemistry): "SI unit of a given quantity", "dimension of a given quantity",
  "equivalent resistance of resistors in series/parallel", "focal length / power of a lens",
  "oxidation state of an element in a given compound", "pH of a given solution type".
- Good (Biology): "which vitamin's deficiency causes a given disease", "blood group compatibility
  for transfusion".
- Good (Geography, History, Polity, Economics): "the river on which a given city stands", "the
  Governor-General in office when a given act or event happened", "which Article of the
  Constitution deals with a given provision", "arrange given places from north to south".
- Good (English): error spotting by its RULE ("subject-verb agreement with 'each/every'", "'one of
  the' + plural noun", "'no sooner ... than'"), "sentence improvement: tense after an 'if' clause",
  "direct to indirect speech of a question", "preposition after a given verb (prefer to, consist
  of)", "part of speech of 'that' / 'since' / 'but' as used in a sentence" (only when the SAME
  word's class is asked).
- Too wide (a topic, not a type): "questions on the Mughals", "optics", "error spotting",
  "synonyms", "statements about the Constitution", "parts of speech".
- **No types for items that are each their own fact or text:** synonyms, antonyms, one-word
  substitution, idioms and phrases, spelling, word pairs, sentence rearrangement (each item is its
  own sentence or passage), reading comprehension and cloze passages. Leave them ungrouped unless
  the SAME word, idiom, sentence or passage comes back (then it is a repeat).
- A type spans at least 2 papers. Members may also be in a repeat group.

An item is in at most one repeat group and at most one type group. Many items will be in no
group: that is expected. Do not stretch to make groups. Items marked `has a figure you cannot
see`: group them only when the text alone shows they are the same.

## Output

Write `<work dir>/out/<chapter-file-name>.json` (same base name as the evidence file). A finished
example (from a CBSE review; CDS ids look the same):

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
fact: "Gas used to hydrogenate vegetable oils"; for an English repeat, the word: "Antonym of
'affable'"). `unsure` may be empty.

Then run the validator and fix every error it reports:

    node scripts/homework/validate-review.mjs <work dir>/evidence/<file>.md <work dir>/out/<file>.json

## Rules

- Use only ids from your chapter file. Never invent one; copy ids, never retype them.
- Other reviewers run at the same time on other subjects or chapters. Name any helper file after
  your chapter (never `ids.txt` or similar), keep it under `<work dir>/scratch/`, and take ids only
  from your own evidence files.
- Write ONLY your output file(s) (and scratch helpers). Do not edit any other file, do not run git,
  do not touch the database.
- Keep tool output small: read evidence in chunks, never print a whole output file back.
- If a stem looks mistranscribed (an option that repeats another, a statement list the options do
  not match, a key fact that is plainly wrong), group it by what the options show and list it under
  `unsure` with one line: the main session checks it.
- When done, reply with, per chapter: the number of repeat groups and type groups; then for your
  whole assignment the five largest groups (label + papers), and every `unsure` item (id + one
  line). Keep the reply under 60 lines.
