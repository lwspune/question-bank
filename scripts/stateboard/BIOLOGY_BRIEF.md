# Transcription brief: Balbharati BIOLOGY, Std XI and Std XII

Applies to both Biology books:

| Book | Lane (`<lane>` below) | Exam | Source |
|---|---|---|---|
| Std XII | `scripts/stateboard` | `mh-hsc-12` | 15 pre-split chapter PDFs (`BIOLOGY_ROOT` in its `config.ts`) |
| Std XI | `scripts/mh-sb-11` | `mh-sb-11` | the whole book `SB_11th_Bio.pdf`, one page range per chapter |

Descended from `GEOGRAPHY_BRIEF.md`, the other prose book in this pipeline. Where
the two disagree, this file wins for Biology.

**Neither book prints an answer key** (measured 2026-10-13: no ANSWERS section, no
inline answers, no worked examples). Every MCQ key is derived and every answer is
authored, so every chapter is `derivedAnswers: true`.

---

## Your inputs

- `<lane>/out/<id>.text.md`: the chapter's full PDF text layer. **Primary source
  for wording.** Read the whole chapter, not only the exercise: you need the prose
  to derive MCQ keys.
- `<lane>/out/<id>/p-*.png`: rendered pages. Use them to settle **layout**: the
  exercise is two-column, so the text layer interleaves the columns and splits one
  question across non-adjacent lines. Never infer question boundaries or order from
  the dump; rebuild them from the page images.
- The chapter's `subtopics` array in `<lane>/config.ts`.

Two text-layer facts carried over from Geography, measured, do not re-derive:
the curly quotes are correct (a cp1252 console shows them as replacement
characters; read with utf-8), and text set inside a figure can come through
garbled. Text inside a figure is a FIGURE, so read it off the page image.

**Subscripts and superscripts are not reliable in the text layer.** For any chemical
formula or ion (CO2, H2O, C6H12O6, NH4+, Ca2+, NADPH + H+) read the page image and
write it in LaTeX: `\(\text{CO}_2\)`, `\(\text{C}_6\text{H}_{12}\text{O}_6\)`,
`\(\text{Ca}^{2+}\)`. Everything else is plain text.

---

## Scope: the chapter-end `Exercise` block, and nothing else

The owner's call (2026-10-13): **exercises only.** Transcribe every numbered
question under the `Exercise` heading at the end of the chapter.

Out of scope, and only to be named in your report:
- the **`Practical / Project`** list that follows the exercise;
- every box in the chapter body (*Can you recall? · Can you tell? · Use your brain
  power · Internet my friend · Do you know? · Activity · Curiosity box*), even when
  it holds a real question;
- an exercise item that sends the student outside the book ("collect information",
  "visit", "find out from the internet", "discuss in your class") or asks about
  their own surroundings. **List every such item you skip, with its number.**

---

## Output: `<lane>/data/<id>.ex.json`

An `SBQuestion[]` (the type is in `<lane>/lib.ts`, re-exported from
`scripts/stateboard/lib.ts`).

```jsonc
{
  "ref": "Ex Q1(A)",              // unique in the chapter; mirror the PRINTED numbering
  "bucket": "exercise-mcq",       // or "exercise-subjective"
  "format": "mcq",                // or "subjective"
  "subtopic": "<exactly one of the chapter's subtopics>",
  "difficulty": "EASY",           // EASY | MODERATE | HARD
  "context": "Choose correct option",   // the SHARED printed instruction, if any
  "setLabel": "Ex Q1",            // same string for every sibling under that instruction
  "stem": "...",                  // the question itself, WITHOUT the shared instruction
  "options": [                    // MCQ only: exactly 4, labels A B C D
    { "label": "A", "text": "..." }, { "label": "B", "text": "..." },
    { "label": "C", "text": "..." }, { "label": "D", "text": "..." }
  ],
  "answer": "C"                   // MCQ only: DERIVED from the chapter, see below
}
```

- **`bucket`**: only the two exercise buckets. There is no `solved` bucket.
- **Ref scheme** mirrors the print: `Ex Q1(A)`, `Ex Q2(C)`, `Ex Q6`. The books
  letter their sub-items A, B, C; a few chapters use i, ii or a, b. Copy what is
  printed: `Ex Q3(ii)`.
- **Sets.** Where one printed instruction governs sub-items ("1. Choose correct
  option", "2. Answer the following", "3. Write short notes"), put the instruction
  in `context`, give every sibling the same `setLabel` (`Ex Q2`), and put only the
  sub-item in `stem`. A question with no sub-items has neither.
- **Options map positionally**: printed a/b/c/d → A B C D. Never reorder. A
  mis-slotted option makes a blind re-derivation confirm the wrong letter, and that
  is the one error a blind pass cannot catch.
- **`difficulty`**: one-word or one-line recall, an MCQ, a fill-in → EASY; answer
  the following, short note, differentiate, give reasons, match → MODERATE; explain
  in detail, a multi-part process, a labelled diagram with its explanation → HARD.
- **`subtopic`** must be EXACTLY one of the chapter's strings; the build hard-fails
  on an unknown one. Choose by content. If nothing fits, say so in the report rather
  than forcing a bad fit.
- **Scientific names in italics** as the book prints them: `*Helianthus annuus*`,
  `*Rhizobium*`. Keep the book's exact capitalisation, because some questions test
  it (Std XI Ch.2 Q.8 asks which of two spellings is correct).

### `answer`: derive it from the chapter, or omit it

Derive every MCQ key from the chapter's own prose. If the chapter genuinely does not
settle it, **omit `answer`** and say why in the report. A missing key is flagged; a
wrong one ships. A separate blind pass re-derives every key afterwards, so do not
guess to fill the field.

---

## The question shapes in these books

**1. "Choose correct option".** Four options a-d → `mcq`. This includes analogy
items (`Paramoecium : Ciliated Protist :: Plasmodium : ____` with four options) and
"select the odd one out" items that print four options. **Fewer than four printed
choices is NOT an MCQ**: a two-choice item ("Identify the correctly written name: A.
... B. ...") is `subjective` with the choices kept in the stem. Never invent an
option to reach four.

**2. Answer the following / Write short notes / Give reasons / Differentiate /
Explain.** `subjective`, one row per lettered sub-item.

**3. "Match the following" / "Match the columns".** ONE `subjective` row. Put both
columns in the stem as a GFM pipe-table, printed order and printed labels kept.
**The text layer scrambles these** (the columns come out one after the other, or
interleaved); build the table from the page image.

**4. "Complete the following" / "Fill in the blanks" / "Complete the chart".**
`subjective`. Keep the blanks as printed (`____`). If the chart's skeleton is TEXT
(rows and column heads you can type), put it in the stem as a pipe-table or as
lines. If the skeleton is a DRAWN graphic (boxes joined by arrows, a tree diagram),
describe its structure in the stem in words ("A tree diagram: 'Kingdom Protista' at
the top branching into four empty boxes") AND record it in `figneed` (below).

**5. "Identify the following diagrams / Label the diagram / Observe the figure".**
`subjective`, one row per labelled figure (A, B, C ...). These cannot be answered
without the picture: record every one in `figneed`.

**6. "Draw a neat labelled diagram of ...".** `subjective`. A student DRAWING task:
the answer is a diagram, and nothing in the question needs a crop, so it is **not**
`figneed`. The answer step pairs it with the book's own figure later.

**7. Assertion-Reason**, where present: `mcq` with the four boilerplate options
repeated on every sibling.

**8. A question that cites a table or figure elsewhere in the chapter** ("refer to
Table 4.2"). Inline the table into the stem as a pipe-table, keeping the citation.
For a figure, record `figneed`.

---

## Tables

Any table, in a stem, option or context, is a **GFM pipe-table** with the mandatory
separator row:

```
| Column I | Column II |
|---|---|
| A. Monera | i. Riccia |
```

Without the `|---|---|` row the renderer prints raw pipes, on the site and in Word.

---

## Figures: `<lane>/data/<id>.figneed.json`

`[{ "ref": "...", "page": <0-based page index within THIS chapter's render>, "what":
"short description" }]` for every question that **cannot be answered without seeing a
printed graphic** (shapes 4-with-a-drawn-skeleton, 5 and 8). Use the index of the
`p-NN.png` you looked at (`p-03.png` is page 3 of the render; say which numbering you
used). Do not crop anything yourself.

Not a figure need: a drawing task (shape 6); a table you typed as a pipe-table; a
figure the question merely cites while every needed fact is in the stem.

Separately, write `<lane>/data/<id>.figtext.json` as
`{ "figures": { "fig 5.3": ["label", "label", ...] } }` listing the **text printed
inside** every figure an exercise question points at (the labels on an identify-the-
diagram picture, the boxes of a printed chart). PyMuPDF cannot see text drawn as part
of a picture, so without this file every label in an authored answer reads as an
invention to `audit-grounding.ts`.

---

## Fidelity

Transcribe what is printed, including the book's spellings and typos. Do not
paraphrase a stem, merge printed questions or split one. Report anything odd: a wrong
option count, a duplicated question, a broken table, a sub-item lettered out of
sequence, a question that seems to belong to another chapter.

---

## Mechanics

- Write the JSON with the **Write tool**. Never a bash heredoc or `python -c`: both
  eat backslashes in this repo (`\text` becomes a tab plus `ext`).
- Newlines inside a string are JSON `\n` escapes (one backslash), never a literal
  two-character `\\n`. `commitStaged` rejects a literal `\n`.
- **No em dashes in anything you write** (an en dash in a range is fine). Text you
  copy from the book keeps its own punctuation.
- Then run the dry-run commit and fix every error it reports:
  `npx tsx <lane>/merge.ts <id>` and `npx tsx <lane>/commit.ts <id>` (no `--apply`).

---

## Report back

- Row count, split MCQ / subjective, and the by-subtopic tally.
- Every ref, in printed order, so the set can be diffed against the page.
- Every exercise item you skipped and why; whether a Practical / Project block exists.
- Every MCQ where you omitted `answer`, and why.
- The contents of `figneed.json`.
- Anything printed oddly.

Do not paste the whole JSON.
