# Transcription brief — Class-9 History / Political Science chapters

Applies to the chapters of `9th_Hist_SB.pdf` (History + Political Science). The
Maths chapters use `TRANSCRIPTION_BRIEF.md` instead — this book is different
enough (clean prose text layer, no maths, no solved examples, one Exercises
block) to need its own contract.

## Your inputs

- `scripts/mh-sb-9/out/<id>.text.md` — the chapter's full PDF text layer. **This
  is your primary source for wording.** Read it in full before transcribing.
- `scripts/mh-sb-9/out/<id>/p-*.png` — rendered pages. Use these to settle
  **layout** only: reading order, which lines belong to which numbered item,
  where a table's cells actually sit, and how many options an MCQ really has.

The text layer serialises a two-column page in a way that can interleave items
out of order and split one printed question across non-adjacent lines. **Never
infer question boundaries from line breaks — look at the page image.**

## What to transcribe

**ONLY the numbered questions inside the chapter-end "Exercises" block.**

Do NOT transcribe:
- the **"Projects"** block at the end of the Exercises, and
- inline activity boxes in the body prose — "Try this", "Let's do it!", "Let's
  discuss", "Find out and participate", "Do you know?", "Think and Write",
  "Can you tell?", "What is your opinion?".

These are open-ended prompts ("collect pictures of…", "get information from the
internet") with no determinate answer, so any model answer would be invented.
A numbered Exercise question IS transcribed even if it asks the student to look
something up — the difference is that it is part of the graded exercise.

## Output — `scripts/mh-sb-9/data/<id>.questions.json`

A JSON array of objects with exactly these fields:

```jsonc
{
  "ref": "Ex Q1(A)(1)",          // unique in the chapter; mirror the PRINTED numbering
  "bucket": "exercise-mcq",      // or "exercise-subjective"
  "format": "mcq",               // or "subjective"
  "subtopic": "<one of the chapter's canonical subtopics, given in your task>",
  "difficulty": "EASY",          // EASY | MODERATE | HARD
  "context": "Choose the correct option ...",  // the SHARED instruction line, if any
  "setLabel": "Ex Q1(A)",        // same string for every sibling under that instruction
  "stem": "...",                 // the question itself, WITHOUT the shared instruction
  "options": [                   // MCQ only — exactly 4, labels A B C D
    { "label": "A", "text": "..." }, { "label": "B", "text": "..." },
    { "label": "C", "text": "..." }, { "label": "D", "text": "..." }
  ],
  "answer": "B"                  // MCQ only — see below
}
```

- **Ref scheme** mirrors the print: `Ex Q1(A)(1)`, `Ex Q1(B)`, `Ex Q2(1)`,
  `Ex Q3`, `Ex Q5(2)`. Roman sub-items keep their roman numerals: `Ex Q1(i)`.
- **Sets.** Where one printed instruction governs several sub-items ("Write
  short notes on-", "Explain the following statements with reasons."), put that
  instruction in `context`, give every sibling the SAME `setLabel`, and put only
  the sub-item text in `stem`. A standalone question needs neither field.
- **Options map positionally**: printed (a)(b)(c)(d) → A B C D. Never reorder.
- **`answer`** is the letter you DERIVE from the chapter prose. Derive it — do
  not guess from general knowledge — and if the chapter genuinely does not
  settle it, omit `answer` entirely rather than guessing (the row then commits
  with no correct option and is reported as a flag). Omitting is the honest
  move; a wrong key is worse than a missing one.
- **`difficulty`**: a one-line recall/full-form is EASY, a short note or
  give-reasons is MODERATE, an "answer in detail" / multi-part comparison is HARD.
- **`subtopic`** must be EXACTLY one of the strings given in your task. Choose by
  the question's CONTENT. The build hard-fails on an unknown subtopic.

## Tables

Several chapters have a "complete the table / chart / timeline" question. Put
the table in the `stem` as a **GFM pipe-table**, reproducing the printed rows
including the blanks:

```
Complete the following chart.

| Five-year plan | Duration | Purposes |
|---|---|---|
| First | ......... | Agriculture, Social development |
| Second | 1956-1961 | Industrialisation |
```

**The `|---|---|` separator row is mandatory** — without it the renderer prints
raw pipe characters instead of a table, on the website and in Word alike.

## Figures

If a question is unanswerable without a printed diagram (a tree diagram, a
concept map, a timeline drawn as a graphic), still transcribe the stem, and ALSO
record it in `scripts/mh-sb-9/data/<id>.figneed.json` as
`[{ "ref": "Ex Q5(3)", "page": <0-based PDF page index>, "what": "short description" }]`.
Do not attempt the crop yourself. A table that exists as TEXT is not a figure —
use a pipe-table for those.

## Fidelity

Transcribe what is printed, including the book's own spellings and typos
("Disintergration", "Eelum", "Guerilla"). Do not silently correct them; do not
paraphrase a stem; do not merge or split printed questions. If an MCQ prints
fewer than four options, say so in your report — do NOT invent one to reach four.

## Mechanics

- Write the file with the **Write tool**. Do NOT build JSON with a bash heredoc
  or `python -c`; both eat backslashes in this repo.
- Newlines inside a string must be real JSON `\n` escapes (one backslash), never
  a literal two-character `\\n`.
- There is no mathematics in this book — do not use `\(...\)` anywhere.

## Report back

The row count split MCQ/subjective, the ref of every row, any MCQ where you
omitted `answer` and why, anything printed oddly (wrong option count, a question
duplicated from another chapter, a broken table), and the contents of any
`.figneed.json` you wrote. Do not paste the whole JSON.
