# MH-SSC-10 board-paper VISION transcription brief

You transcribe ONE scanned Maharashtra SSC (Class 10) board question paper into a
JSON array of `PaperQuestion` objects. The rendered pages are PNGs at
`scripts/mh-ssc-10/out/<paperId>/p-NN.png` (one per PDF page, high-DPI). Read
**every** page. The source is a scan — read carefully; there is NO text layer.

## Output

Write `scripts/mh-ssc-10/data/<paperId>.<block>.json` — a JSON array. Split by
question block so blocks can be merged (e.g. `<id>.q1.json` = Q1(A)+Q1(B),
`<id>.q2.json` = Q2, …). Every `ref` must be globally unique within the paper.

Each element (see `scripts/mh-ssc-10/lib.ts` `PaperQuestion`):

```jsonc
{
  "ref": "Q1(A)(i)",              // provenance; unique. Use the paper's own numbering.
  "format": "mcq",                // "mcq" | "subjective"
  "chapter": "Quadratic Equations",   // MUST be an exact catalog chapter (below)
  "subtopic": "Roots of a Quadratic Equation", // prefer a catalog subtopic; else your best concept name
  "difficulty": "EASY",           // EASY | MODERATE | HARD (board-paper level: mostly EASY/MODERATE)
  "stem": "If 3 is a root of \\(kx^2 - 7x + 12 = 0\\) then \\(k =\\) ____.",
  "options": [                    // MCQ ONLY, exactly 4, labels A-D
    {"label":"A","text":"1"}, {"label":"B","text":"-1"},
    {"label":"C","text":"3"}, {"label":"D","text":"-3"}
  ],
  "answer": "A",                  // MCQ ONLY — the DERIVED correct letter. Solve it yourself.
  "solution": "Substitute x=3: 9k-21+12=0 ⟹ k=1.",  // AUTHORED model answer (see below)
  "reviewFlag": true,             // ALWAYS true — every answer is AI-derived, awaiting human check
  "hasFigure": false,             // true if the question shows/needs a diagram
  "figureNote": ""                // if hasFigure: what the figure is + which page (e.g. "right triangle ABC, p-04")
}
```

For a SET (a shared instruction with sub-items `i) ii) iii)`), put the shared
instruction in `context`, give each sub-item its own row, and set the same
`setLabel` on all siblings.

## Rules

1. **Internal choice** ("Solve any two of the following", "attempt any four") →
   transcribe **ALL** sub-questions as independent rows. The choice is a delivery
   concern, not a bank concern. Never drop the un-chosen alternatives.
2. **"Complete the following activity"** (fill-in-the-blank worked solutions) →
   transcribe the activity as the `stem` WITHOUT the blanks pre-filled (keep it a
   question: "Complete the activity to find …"), and put the FILLED, complete
   worked solution in `solution`. Do not ship blanks (`____`, boxes) in the answer.
3. **Math** → LaTeX inside `\(...\)` (inline). Convert every unicode math glyph
   (× ÷ ≤ ≥ √ ² ³ π θ ∴ ∵ → etc.) to LaTeX; never leave raw unicode in `stem`,
   `options`, or `solution`. Fractions `\frac{}{}`, roots `\sqrt{}`.
4. **Tables** → GFM pipe-tables (header row + `|---|` separator). Used for
   Statistics frequency tables and Probability sample-space tables.
5. **format** — `Q1(A)` is the MCQ block → `format:"mcq"` with 4 options + a
   derived `answer`. Everything else is `format:"subjective"` (no options; a
   model answer in `solution`).
6. **Answers** — this paper has NO answer key. SOLVE each MCQ and put the correct
   letter in `answer`. AUTHOR a concise, correct model answer for each subjective
   question in `solution` (the actual steps/result, not a hint). Set
   `reviewFlag:true` on every row.
7. **chapter** is HARD-validated against the catalog — use an EXACT string.
   **subtopic**: use a catalog subtopic when one fits; otherwise your best
   concise concept name (off-catalog is allowed, just flagged).
8. **Figures** — set `hasFigure:true` + a `figureNote` naming the diagram and its
   page; do NOT try to describe the figure inside the stem. (A later pass crops
   and attaches the image.)
9. Do NOT invent questions or options. If a glyph is genuinely unreadable, make
   your best faithful reading and note the uncertainty in `figureNote`/context.

## Algebra catalog (chapter → subtopics)

- **Linear Equations in Two Variables**: Methods of Solving Linear Equations ·
  Determinant Method (Cramer's Rule) · Equations Reducible to Linear Form ·
  Graph of Linear Equations · Word Problems and Applications
- **Quadratic Equations**: Roots of a Quadratic Equation · Solving by
  Factorisation · Solving by Formula and Completing the Square · Nature of Roots
  (Discriminant) · Relation between Roots and Coefficients · Word Problems and
  Applications
- **Arithmetic Progression**: nth Term of an A.P. · Sum of n Terms of an A.P. ·
  Word Problems and Applications
- **Financial Planning**: Goods and Services Tax (GST) · Shares — Face Value,
  Market Value, Brokerage · Mutual Funds and SIP
- **Probability**: Sample Space and Events · Probability of an Event
- **Statistics**: Mean, Median and Mode of Grouped Data · Pictorial
  Representation of Statistical Data

## Geometry catalog (chapter → subtopics)

- **Similarity**: Ratio of Areas of Two Triangles · Basic Proportionality
  Theorem · Tests of Similarity of Triangles · Theorem of Areas of Similar
  Triangles
- **Pythagoras Theorem**: Pythagoras Theorem and its Converse · Similarity in
  Right Angled Triangles · Applications of Pythagoras Theorem
- **Circle**: Tangent and Secant to a Circle · Tangent Segment Theorem ·
  Inscribed Angle and Intercepted Arc · Cyclic Quadrilateral · Theorems on Chords
  and Tangents
- **Geometric Constructions**: Division of a Line Segment · Construction of a
  Similar Triangle · Construction of a Tangent to a Circle
- **Co-ordinate Geometry**: Distance Formula · Section Formula · Slope of a Line
- **Trigonometry**: Trigonometric Ratios and Identities · Heights and Distances
- **Mensuration**: Surface Area and Volume of Solids · Combination of Solids and
  Frustum · Area of Sector and Segment of a Circle

## After writing

Run `npx tsx scripts/mh-ssc-10/merge.ts <paperId>` then
`npx tsx scripts/mh-ssc-10/commit.ts <paperId>` (dry-run) and report the by-chapter
counts, format split, flags, and any LaTeX imbalance so the reviewer can QA.
