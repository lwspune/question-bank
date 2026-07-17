# MH State Board Class 9 Maths — vision transcription brief (per-exercise agent)

You transcribe ONE band of a Maharashtra State Board **Class 9** Maths chapter from
rendered page images into a JSON file the ingestion pipeline commits. Images live at
`scripts/mh-sb-9/out/<chapterId>/p-NN.png` (NN = 0-based book-page index, zero-padded).

**READ the images with the Read tool.** The text layer mangles math symbols (∈ ∪ ∩ √ →
render as `�`), so read the rendered pages visually and transcribe math to LaTeX.

## The Class-9 book layout
A chapter interleaves theory ("Let's learn / recall / study") with **"Practice set N.M"**
exercises, and ends with a chapter-end **"Problem Set N"** (its Q.1 is usually a
"Choose the correct alternative" MCQ block; Q.2+ are free-response). Worked examples are
mostly inline prose (no numbered "Solved Examples" exercise block in most chapters) — but
if you see an explicit worked example WITH a printed "Solution", capture it (see buckets).

## What to transcribe from YOUR band
Only the questions in your assigned page range + exercise(s). At a page boundary, ignore
content that belongs to an adjacent exercise (another agent owns it). **Skip pure "Activity"
blocks** (hands-on classroom activities with no answerable question) and skip plain theory.

## Output — a JSON array → `scripts/mh-sb-9/data/<chapterId>.<sec>.json`
Each object (the `SBQuestion` shape):

```jsonc
{
  "ref": "Ex 1.1 Q3",              // UNIQUE provenance ref — see convention below
  "bucket": "exercise-subjective", // "solved" | "exercise-mcq" | "exercise-subjective"
  "format": "subjective",          // "subjective" (no options) | "mcq" (exactly A,B,C,D)
  "subtopic": "<one canonical subtopic, verbatim from your list>",
  "difficulty": "EASY",            // EASY | MODERATE | HARD (your estimate)
  "stem": "Write the set \\(A=\\{x \\mid x \\in \\mathbb{N}, x<5\\}\\) in roster form.",
  "context": "...",                // ONLY for a set of sub-items — the shared instruction
  "setLabel": "Ex 1.1 Q3",         // ONLY for a set of sub-items — siblings share this
  "options": [                     // MCQ ONLY — omit entirely for subjective
    {"label":"A","text":"..."},{"label":"B","text":"..."},
    {"label":"C","text":"..."},{"label":"D","text":"..."}
  ],
  "answer": "B",                   // MCQ ONLY — DERIVE the correct letter by solving
  "solution": "..."                // SOLVED examples ONLY — the book's full solution.
                                   // OMIT for exercise questions (answers authored later).
}
```

### Ref convention (load-bearing — routes /board section structure)
- Practice-set question n → `"Ex N.M Q<n>"`   e.g. `"Ex 1.1 Q1"`, `"Ex 1.3 Q7"`
- Practice-set sub-item (i)/(ii)/… → `"Ex N.M Q<n>(iii)"` (see set-grouping)
- Problem-set question n → `"Prob Q<n>"`  e.g. `"Prob Q2"`
- Problem-set MCQ Q.1 sub-items (i)/(ii)/… → `"Prob Q1(i)"`, setLabel `"Prob Q1"`
- A worked example with a printed Solution → `"Solved Eg.<N>"` (rare in Class 9)

### bucket / format rules
- Worked **Example** with the book's Solution → `bucket:"solved"`, `format:"subjective"`, include `solution`.
- Practice-set / Problem-set free-response (write/find/state/show/prove/fill-in/true-false/match)
  → `bucket:"exercise-subjective"`, `format:"subjective"`, NO `solution`.
- "Choose the correct alternative" MCQ → `bucket:"exercise-mcq"`, `format:"mcq"`, exactly 4
  options (A,B,C,D) + a DERIVED `answer`, NO `solution`.

### Set-grouping (a single numbered question with sub-items i)/ii)/iii))
Many Class-9 questions group sub-items under one instruction. Emit ONE row per sub-item,
all sharing: `"context": "<shared instruction>"`, `"setLabel": "Ex N.M Q<n>"`, refs
`"Ex N.M Q<n>(i)"`, `"(ii)"`, …. A standalone question omits `context`/`setLabel`.
Keep the shared instruction in `context`, the sub-item's own text in `stem`.

## Transcription rules
- **Math → LaTeX inside `\\(...\\)`** — sets `\\{ \\}`, `\\in`, `\\notin`, `\\subseteq`,
  `\\subset`, `\\cup`, `\\cap`, `\\mathbb{N}`/`\\mathbb{Z}`/`\\mathbb{Q}`/`\\mathbb{R}`,
  `\\mid` for "such that", `\\varnothing` for empty set, `n(A)`, `\\le`/`\\ge`. Never leave
  raw unicode math (∈ ∪ ∩ √ ² ³ → π). Plain prose stays plain.
- Be **faithful** to the printed question — transcribe exactly what's asked, including "(4*)"
  star markers as `(4*)` in the ref/stem if present (starred = optional/harder).
- **DERIVE the MCQ answer** by solving (you're a strong mathematician). Put the letter in `answer`.
- A **table / match-the-columns** → a GFM pipe-table (header row + `|---|` separator) in the stem.
- A question that REFERENCES a figure/Venn diagram you can see → describe what's needed in the
  stem so it's answerable, and add `"diagramWouldHelp": true` + a short `"diagramNote"`.
- **difficulty**: EASY = one-step / direct notation; MODERATE = one concept applied;
  HARD = multi-step word problem / n(A∪B) with 3 sets / proof.
- Illegible / cut-off → transcribe what you can + a `"_note"` field (extra fields are ignored).
- Return ONLY by WRITING the JSON file. Final message = a 2-line summary (counts by bucket).
