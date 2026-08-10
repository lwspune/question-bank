# MH State Board Class 11 Maths — solution authoring brief (per-group agent)

You author concise model solutions for a group of Maharashtra State Board **Class 11** Maths
**exercise** questions (Exercise N.M and Miscellaneous part (II) free-response). Input rows are in a
`scripts/mh-sb-11/data/<chapterId>.<group>.topaper.json` file — an array of
`{id, ref, subtopic, context, stem}`. You'll be told which file(s) are yours.

The book prints official FINAL answers for every Exercise and Miscellaneous Exercise at the back
of the volume, and **you will be told where this chapter's answer block is** — either a text dump
(`data/<chapterId>.book-answers.txt`) or rendered answer-page PNGs under
`out/_answers/<chapterId>/`. READ it and use it to anchor/self-check every solution.

> ⚠ **If this chapter's math is vector-drawn, the text dump is unusable and you will be given
> IMAGES instead.** In this book the radical sign is drawn, not typed — so a text
> extraction of the answers renders "√5" as "5" and "3√12" as "3 12". EVERY chapter of this book must be
> checked against the answer-page IMAGES with the Read tool, not a text dump: measured on
> Ch.2, U+221A occurs ONCE in 21 pages and "/" ONCE, so surds and fractions are invisible to
> text extraction throughout.
> Never "correct" your own answer to match a radical-stripped text dump.

Author the correct solution; if you're confident the book's final answer is wrong, still give the
correct one and add a `"_note"` flagging the discrepancy (the maintainer cross-checks these — the
book's key is a peer, not an oracle, and past chapters have found real errors on both sides).

## Your job
For each input row, author a correct, concise model solution. These are Class-11 questions —
typically two to six steps, and harder than the Class-9/10 books. Be a careful teacher: show the method, then the result.

## Output → `scripts/mh-sb-11/data/<chapterId>.<group>.solutions.json`
A JSON array of `{id, ref, solution}` — `id` and `ref` copied VERBATIM from the input row,
`solution` your authored answer. Include ONLY your assigned rows.

**Before you finish, diff the `ref` -> `id` PAIRING against the input, not just the id set.**
A count check is useless (agents are reliably off by 1-3 on their own tallies), and even an
id-SET check is not enough: an off-by-one that shifts ids across neighbouring rows is a
*permutation*, so the set still matches perfectly while every solution is attached to the wrong
question. That has now happened twice on this book — once caught, once nearly missed. Rebuild
from the input's own `ref` -> `id` map rather than assuming your rows stayed aligned.

## Solution rules
- **LaTeX for ALL math, inside `\(...\)`** — `\sqrt{}`, `\frac{}{}`, `^\circ` for degrees,
  `\theta`, `\pi`, `\therefore`, `\times`, `\div`, `\le`/`\ge`/`\ne`, `|x|`, sets `\{ \}`,
  `\in`, `\cup`, `\cap`, `\mathbb{R}`, `\mid` for "such that", matrices via `\begin{bmatrix}`,
  determinants via `\begin{vmatrix}`. NEVER raw unicode math (√ π θ ° ∴ ² ≤ ∈ ∪). Plain
  connective words ("Let", "So", "Then") stay plain.
- **Trig notation follows the book: `\operatorname{cosec}`, not `\csc`.** Keep `\sin`, `\cos`,
  `\tan`, `\cot`, `\sec` as standard operators so they never render as italic variables.
- **Show the method briefly, then the result.** 1–4 steps. Substitute the given numbers into any
  formula you use rather than quoting it alone. For a true/false: state which AND give the
  one-line reason. For "show that / prove": give the actual argument, not a gesture at one.
- **End with the final answer** as the LAST thing in the solution (so an automated cross-check
  can find it). Match the book's final answer where the book is correct.
- A question that asks to **draw or represent something** (a Venn diagram, a point on a number
  line) with no numeric answer: describe it in words precisely enough to act on, and set
  `"diagramWouldHelp": true` + a short `"diagramNote"` (extra fields are ignored by the
  committer; they feed the figure step).
- Keep it faithful to what's ASKED. Don't restate the question. No preamble. No `**bold**`.
- If a stem looks malformed/ambiguous (a transcription artifact), solve the most sensible intended
  form and add a `"_note"` field.

Return by WRITING the file. Final message: how many solutions you wrote + any `_note`/diagram flags.
