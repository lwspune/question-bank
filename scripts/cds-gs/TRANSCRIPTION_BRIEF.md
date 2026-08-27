# CDS General Knowledge — transcription contract

You transcribe a **band** of a scanned CDS General Knowledge booklet into JSON.
Read this whole file before opening a page. It is the contract; your prompt only
tells you WHICH band.

## What you are and are not doing

- You transcribe. **You do NOT answer.** There is no `answer` field in your output
  and you must not add one. Answer derivation is a separate, deliberately blind
  pass — if a transcriber leaves a guess behind, the deriver anchors on it and the
  two passes stop being independent, which is the whole point of running two.
- You classify each question into `subject` / `chapter` / `subtopic`.
- You transcribe **what is printed**, not what you think was intended. If the page
  is wrong, transcribe it faithfully and say so in `flags`.

## RULE 1 — OPTION FIDELITY. This is the one that matters most.

For every question, the four options must match the page in **both**:

1. the **set** — the four texts, no invention, no omission, no paraphrase; and
2. the **label → text ORDER** — the text printed at (a) goes in `A`, (b) in `B`,
   (c) in `C`, (d) in `D`.

This corpus has no answer key, so every answer downstream is derived by reading
the options. If you copy the right option's *text* into the wrong *letter's* slot,
the derivation still succeeds, still names a letter, and is **wrong** — and no
downstream check can catch it. On the sibling CDS English corpus this exact defect
produced 19 wrong keys, and a full blind re-derivation pass confirmed all 89 rows
it saw, including one that was later disproved from the page.

So: after transcribing a question, **look at the page again** and check the four
labels against your four strings, in order. Do not rely on having read it once.

Two-column pages are where this goes wrong. A question's options belong to the
question whose stem is directly above them **in the same column** — never to the
question printed beside them in the other column.

## RULE 2 — the stimulus goes IN the stem

`content_hash` is computed from stem + options + answer, and it **excludes**
context. So two questions that share a generic stem collide and one is silently
dropped at commit. Anything question-specific therefore belongs in `stem`:

- **Match List** — a Match List is **ALWAYS a GFM pipe TABLE**, never prose, never
  a list of lines. The `|---|---|` separator row is **mandatory**: without it the
  renderer treats the pipes as literal text and prints raw `|` on the page and in
  every downloaded Word paper. One row per pairing, List-I in column 1 and List-II
  in column 2, and the column headers carry the parenthesised category names the
  page prints. Put the `Code :` /
  `Codes :` line on its own line AFTER the table, never inside a cell:

  ```
  Match List-I with List-II and select the correct answer using the code given below the Lists :

  | List-I (Forest type) | List-II (Specie) |
  |---|---|
  | A. Tropical Moist Forest | 1. Kail |
  | B. Littoral and Swamp Forest | 2. Khair |

  Code :
  ```
  The four options are then the code rows, e.g. `A-4, B-3, C-2, D-1` — transcribe
  each option exactly as the row of numbers under the A B C D header reads.

- **"Consider the following statements"** — the numbered statements go in the stem,
  each on its own line, then the "Which of the statements given above is/are
  correct?" line. Options are the code (`1 only` / `2 only` / `Both 1 and 2` /
  `Neither 1 nor 2`, or whatever is printed).

- **"Statement I / Statement II"** — both statements in the stem, then the
  printed instruction line. Options are the four printed alternatives.

## RULE 3 — classification

`subject`, `chapter` and `subtopic` must come from **`scripts/cds-gs/catalog.json`**
(read it). `subject` and `chapter` are **hard-validated** at commit — an
unrecognised value fails the build, it does not auto-create.

- Pick the chapter that the question actually **tests**, not one a keyword hints at.
  A question naming a river but asking which state a dam is in is Indian Geography —
  Economy/Resources, not Rivers.
- If nothing in the catalog fits, still pick the closest chapter, and add a `flags`
  entry `"catalog-gap: <what is missing>"`. **Do not invent a chapter or subtopic
  name.** The gaps you report are collected and adjudicated as a batch.
- `subtopic` is soft — a mismatch is flagged, not fatal — but pick from the list.

## RULE 4 — report on territory you do not own

Your band has a page range. Also tell me, in `bandReport`:

- the **full sorted list of question numbers** you found (so a gap is visible);
- whether the **first** question on your first page is complete, or continues from
  the previous page (a stem or option block that starts mid-sentence);
- whether the **last** question on your last page is complete or continues overleaf;
- anything you can see that belongs to a neighbouring band.

A duplicated question announces itself at merge time. A **dropped** one does not.
This field is the only thing that catches it.

## RULE 5 — faithfulness and formatting

- **Math** in `\( ... \)`: `\(10^{-9}\ \text{cm}\)`, `\(T = t_c + 273.15\)`,
  `\(a\mathrm{Fe_2O_3}\)`. Balance every `\(` with a `\)`.
- **Do not "fix" the page.** A misprint, an impossible value, a duplicated option,
  a missing fourth option — transcribe as printed and add a `flags` entry. If a
  question has a genuine defect, that is a finding, not something to smooth over.
- Preserve emphasis that changes meaning: "Sound waves **cannot** travel through"
  — the bold `not` is load-bearing. Use `**bold**`.
- Do not transcribe the header, footer, booklet code or page number.
- Straight quotes and hyphens are fine. Never emit a literal `\n` two-character
  sequence — use a real line break.

## Output

Write **one JSON file** to the path your prompt names. Shape:

```json
{
  "band": "B1",
  "pages": [1, 2, 3],
  "bandReport": {
    "numbersFound": [1, 2, 3],
    "firstComplete": true,
    "lastComplete": true,
    "notes": "Q22's option block runs to the foot of the right column; nothing spills."
  },
  "questions": [
    {
      "number": 1,
      "stem": "Which one of the following elements is used as a timekeeper in atomic clocks?",
      "options": [
        { "label": "A", "text": "Potassium" },
        { "label": "B", "text": "Caesium" },
        { "label": "C", "text": "Calcium" },
        { "label": "D", "text": "Magnesium" }
      ],
      "subject": "Chemistry",
      "chapter": "Atomic Structure and Periodic Classification",
      "subtopic": "Periodic Trends, Valency and Atomicity",
      "difficulty": "MODERATE",
      "flags": []
    }
  ]
}
```

`difficulty` is `EASY` | `MODERATE` | `HARD` — judged as a CDS aspirant, not as you.
`flags` is a string array; leave it `[]` when there is nothing to say.

## Before you finish

1. Every question number in your range is present exactly once.
2. Every question has exactly 4 options labelled A, B, C, D — unless the page
   really prints otherwise, which is a `flags` entry.
3. You re-checked label→text order against the page (Rule 1).
4. Every `subject` and `chapter` is a literal key from `catalog.json`.
5. No `answer` field anywhere.
