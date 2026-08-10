# MH State Board Class 11 Maths — vision transcription brief (per-band agent)

You transcribe ONE band of a Maharashtra State Board **Class 11** Maths chapter from
rendered page images into a JSON file the ingestion pipeline commits. Images live at
`scripts/mh-sb-11/out/<chapterId>/p-NN.png` (NN = 0-based index into the chapter PDF,
zero-padded; the printed page number is visible in the page corner and is NOT the same).

## READ THE IMAGES. The text layer is a trap.

**Use the Read tool on the PNGs.** Do not extract text from the PDF, and do not trust any
text you may be handed. Measured on this book: the radical sign `√` appears **once in a
whole 21-page chapter** and `/` appears **once**, while the pages carry dozens of surds and
stacked fractions. The text layer therefore renders

- "root three over two" as the bare digits `3 2`
- "tan 120 = minus root three" as `= - 3`

Greek letters, degree signs and relational operators DO survive, which is precisely what
makes the text layer look trustworthy. A text-first transcription produces questions that
are arithmetically DIFFERENT from the printed ones with nothing to flag it. Read the page.

## The Class-11 book layout
A chapter interleaves theory ("Let's Study / Learn / Recall") with worked **SOLVED EXAMPLES**
blocks, then numbered **`EXERCISE N.M`** blocks, and closes with **`MISCELLANEOUS EXERCISE - N`**
split into part **(I)** — a "Select the correct option / answer" MCQ block — and part **(II)**,
free-response. "Let's Remember" is a summary box, not questions.

## What to transcribe from YOUR band
Only the questions in your assigned page range. At a page boundary, ignore content belonging
to a block another agent owns. Skip plain theory and skip "Activity" boxes with no answerable
question. If a block STRADDLES your last page, transcribe only the part on your pages and say
so in your summary — do not guess the rest.

## Output — a JSON array → `scripts/mh-sb-11/data/<chapterId>.<band>.json`
Each object (the `SBQuestion` shape):

```jsonc
{
  "ref": "Ex 2.1 Q3",              // UNIQUE provenance ref — see convention below
  "bucket": "exercise-subjective", // "solved" | "exercise-mcq" | "exercise-subjective"
  "format": "subjective",          // "subjective" (no options) | "mcq" (exactly A,B,C,D)
  "subtopic": "<one canonical subtopic, verbatim from your list>",
  "difficulty": "MODERATE",        // EASY | MODERATE | HARD (your estimate)
  "stem": "Find the value of \\(\\sin\\frac{41\\pi}{4}\\).",
  "context": "...",                // ONLY for a set of sub-items — the shared instruction
  "setLabel": "Ex 2.1 Q3",         // ONLY for a set of sub-items — siblings share this
  "options": [                     // MCQ ONLY — omit entirely for subjective
    {"label":"A","text":"..."},{"label":"B","text":"..."},
    {"label":"C","text":"..."},{"label":"D","text":"..."}
  ],
  "answer": "B",                   // MCQ ONLY — DERIVE the correct letter by solving
  "solution": "..."                // SOLVED examples ONLY — the book's full printed solution.
                                   // OMIT for exercise questions (answers are authored later).
}
```

### Ref convention (load-bearing — routes the /board section structure)
Matches the shipped Class-12 pipeline, because the book layout is the same:

- Exercise question n → `"Ex N.M Q<n>"`   e.g. `"Ex 2.1 Q1"`, `"Ex 2.2 Q7"`
- Exercise sub-item (i)/(ii)/… → `"Ex N.M Q<n>(iii)"` (see set-grouping)
- Miscellaneous part (I), the MCQ block → `"Misc I Q<n>"`
- Miscellaneous part (II), free-response → `"Misc II Q<n>"` (sub-items `"Misc II Q<n>(ii)"`)
- A worked example with a printed Solution → `"<N.M> SolvedEx.<n>"`, where `N.M` is the
  section the example sits in. Section-scoped rather than chapter-global on purpose:
  parallel agents each own one band, so chapter-global numbering would collide, and /board
  places each solved block immediately before the exercise that follows it. Number from 1
  within YOUR band, and say in your summary which section prefix you used.

**Part 2 chapters restart at Ch.1** — a Part-2 chapter's refs use the BOOK's number
(`Ex 1.1`), never the continuous syllabus-spine number. Do not "correct" this.

### bucket / format rules
- Worked **Example** with the book's Solution → `bucket:"solved"`, `format:"subjective"`, include `solution`.
- Exercise / Miscellaneous-(II) free-response (find/prove/show/verify/solve/state)
  → `bucket:"exercise-subjective"`, `format:"subjective"`, NO `solution`.
- Miscellaneous-(I) "select the correct option" → `bucket:"exercise-mcq"`, `format:"mcq"`,
  exactly 4 options (A,B,C,D) + a DERIVED `answer`, NO `solution`.

### Set-grouping (one numbered question with sub-items i)/ii)/iii))
Very common here. Emit ONE row per sub-item, all sharing `"context": "<shared instruction>"`,
`"setLabel": "Ex N.M Q<n>"`, refs `"Ex N.M Q<n>(i)"`, `"(ii)"`, …. Keep the shared instruction
in `context` and the sub-item's own text in `stem`. A standalone question omits both.

## Transcription rules
- **All math → LaTeX inside `\\(...\\)`**. Never leave raw unicode math (√ π θ ° ∴ ² ≤ ≥ ≠).
  Use `\\frac`, `\\sqrt`, `\\sin`/`\\cos`/`\\tan`/`\\cot`/`\\sec`, `\\operatorname{cosec}`,
  `\\theta`, `\\pi`, `^\\circ` for degrees, `\\therefore`, `\\le`/`\\ge`/`\\ne`.
  **This book writes cosec, not csc** — keep the book's notation.
- Be **faithful to the printed question**. If the book prints something mathematically wrong,
  transcribe it as printed and add a `"_note"` describing the defect — do NOT silently repair
  it. (A later cross-check pass decides whether it is a book defect or our misreading.)
- **DERIVE the MCQ answer** by solving it yourself. Put the letter in `answer`. Do not guess
  from option plausibility, and do not look for a printed key — there is none in the chapter.
- A **table / match-the-columns** → a GFM pipe-table (header row + a `|---|` separator row) in
  the stem. Without the separator row it will not render as a table.
- A question that REFERENCES a graph or figure → describe what is needed in the stem so the
  question is answerable, and add `"diagramWouldHelp": true` + a short `"diagramNote"`.
- **difficulty**: EASY = direct substitution / one standard value; MODERATE = one identity or
  concept applied; HARD = multi-step manipulation, proof, or a combination of identities.
- Illegible / cut-off → transcribe what you can + a `"_note"` field (extra fields are ignored).
- Return ONLY by WRITING the JSON file. Your final message = a short summary: counts by
  bucket, the ref ranges you emitted, the SolvedEx section prefixes you used, and anything
  you skipped or that straddled your band boundary.
