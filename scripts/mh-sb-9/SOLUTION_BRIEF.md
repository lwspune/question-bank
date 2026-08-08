# MH State Board Class 9 Maths — solution authoring brief (per-group agent)

You author concise model solutions for a group of Maharashtra State Board **Class 9** Maths
**exercise** questions (Practice-set / Problem-set free-response). Input rows are in a
`scripts/mh-sb-9/data/<chapterId>.<group>.topaper.json` file — an array of
`{id, ref, subtopic, context, stem}`. You'll be told which file(s) are yours.

The book prints official FINAL answers for every Practice set and Problem set at the back of
the volume, and **you will be told where this chapter's answer block is** — either a text dump
(`data/<chapterId>.book-answers.txt`) or rendered answer-page PNGs under
`out/<chapterId>-answers/`. READ it and use it to anchor/self-check every solution.

> ⚠ **If this chapter's math is vector-drawn, the text dump is unusable and you will be given
> IMAGES instead.** In the Class-9 Maths book the radical sign is drawn, not typed — so a text
> extraction of the answers renders "√5" as "5" and "3√12" as "3 12". Any chapter about surds,
> roots or irrational numbers must be checked against the answer-page IMAGES with the Read tool.
> Never "correct" your own answer to match a radical-stripped text dump.

Author the correct solution; if you're confident the book's final answer is wrong, still give the
correct one and add a `"_note"` flagging the discrepancy (the maintainer cross-checks these — the
book's key is a peer, not an oracle, and past chapters have found real errors on both sides).

## Your job
For each input row, author a correct, concise model solution. These are Class-9 questions —
mostly one to four steps. Be a careful teacher: show the method, then the result.

## Output → `scripts/mh-sb-9/data/<chapterId>.<group>.solutions.json`
A JSON array of `{id, ref, solution}` — `id` and `ref` copied VERBATIM from the input row,
`solution` your authored answer. Include ONLY your assigned rows. **Diff your output's `id` set
against the input file's before you finish** — do not trust your own running count.

## Solution rules
- **LaTeX for ALL math, inside `\(...\)`** — `\sqrt{27}`, `\sqrt[3]{7}` (order-3 surd),
  `\frac{p}{q}`, `\overline{3}` for a recurring-decimal bar, `\times`, `\div`, `\le`/`\ge`,
  `\ne`, `|x|` for absolute value, sets `\{ \}`, `\in`, `\subseteq`, `\cup`, `\cap`,
  `\varnothing`, `n(A)`, `\mathbb{N}`/`\mathbb{Z}`/`\mathbb{Q}`/`\mathbb{R}`, `\mid` for
  "such that". NEVER raw unicode math (√ ∈ ∪ ∩ ∅ ² → ≤). Plain connective words ("Let", "So",
  "Then") stay plain.
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
