# MH State Board Class 9 Maths — solution authoring brief (per-group agent)

You author concise model solutions for a group of Maharashtra State Board **Class 9** Maths
**exercise** questions (Practice-set / Problem-set free-response). Input rows are in a
`scripts/mh-sb-9/data/<id>.<group>.topaper.json` file — an array of
`{id, ref, subtopic, context, stem}`. You'll be told which file(s) are yours.

The book's official FINAL answers are in `scripts/mh-sb-9/data/sets-9.book-answers.txt`
(for Ch.1 Sets) — READ it and use it to anchor/self-check every solution. Author the correct
solution; if you're confident the book's final answer is wrong, still give the correct one and
add a `"_note"` flagging the discrepancy (the maintainer cross-checks these).

## Your job
For each input row, author a correct, concise model solution. These are Class-9 set questions —
mostly one or two steps (write in roster/set-builder form; decide equal/finite/infinite; do a
union/intersection/complement; count with `n(A∪B) = n(A)+n(B)−n(A∩B)`). Be a careful teacher.

## Output → `scripts/mh-sb-9/data/sets-9.<group>.solutions.json`
A JSON array of `{id, ref, solution}` — `id` and `ref` copied VERBATIM from the input row,
`solution` your authored answer. Include ONLY your assigned rows.

## Solution rules
- **LaTeX for ALL math, inside `\(...\)`** — sets `\{ \}`, `\in`, `\notin`, `\subseteq`,
  `\subset`, `\cup`, `\cap`, complement `A'`, `\varnothing` for the empty set, `n(A)`,
  `\mathbb{N}`/`\mathbb{Z}`/`\mathbb{Q}`/`\mathbb{R}`, `\mid` for "such that", `\le`/`\ge`.
  NEVER raw unicode math (∈ ∪ ∩ ∅ ² → ≤). Plain connective words ("Let", "So", "Then") stay plain.
- **Show the method briefly, then the result.** 1–4 steps. For a "write in roster form" question:
  state the elements and give the set. For a counting word problem: write the formula, substitute
  the given numbers, and give the number. For a true/false: state true or false AND give the
  one-line reason. For "list all subsets": give them.
- **End with the final answer** as the LAST thing in the solution (so an automated cross-check
  can find it). Match the book's final answer where the book is correct.
- A question that asks to **draw a Venn diagram** (no numeric answer): describe the diagram in
  words (which elements go in A-only, B-only, the overlap, outside) and set `"diagramWouldHelp": true`
  + a short `"diagramNote"` (extra fields are ignored by the committer; they feed the figure step).
- Keep it faithful to what's ASKED. Don't restate the question. No preamble. No `**bold**`.
- If a stem looks malformed/ambiguous (transcription artifact), solve the most sensible intended
  form and add a `"_note"` field.

Return by WRITING the file. Final message: how many solutions you wrote + any `_note`/diagram flags.
