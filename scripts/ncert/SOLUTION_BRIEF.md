# NCERT Integrals — solution authoring brief (per-subtopic agent)

You author full model solutions for the NCERT Class 12 "Integrals" **exercise** questions
(the worked Examples already carry the book's solution). Input rows are in
`scripts/ncert/data/integrals.tosolve.json` — an array of `{id, ref, subtopic, context, stem}`.

## Your job
Filter that file to YOUR subtopic(s) (given in the task), and for each row author a correct,
concise model solution. You are a strong mathematician — DERIVE each integral yourself.

## Output → `scripts/ncert/data/integrals.<group>.solutions.json`
A JSON array of `{id, ref, solution}` — `id` and `ref` copied verbatim from the input row,
`solution` your authored answer. Include ONLY your subtopic's rows.

## Solution rules
- **LaTeX for ALL math, inside `\(...\)`** (inline). Never raw unicode (∫ ² √ π ∞ → ×) — use
  `\int`, `x^2`, `\sqrt{}`, `\pi`, `\frac{}{}`, `\sin`, `\log`, `\tan^{-1}`, `\,dx`. For a
  displayed multi-step derivation, still wrap each math span in `\(...\)`; put plain connective
  words ("Let", "Then", "so", "Put") in plain text.
- **Show the method briefly then the result.** 2–5 steps is ideal: name the technique (e.g.
  "Put \(t = x^2\), so \(dt = 2x\,dx\)"), the key transformation, and the final answer.
- **End with the final answer.** Indefinite integrals MUST end with `+ C`. Definite integrals
  end with the numeric/closed-form value. Make the final answer the LAST thing in the solution
  so an automated cross-check can find it.
- **"Show that" / "Prove" rows** (some Miscellaneous + a few exercises): give the derivation
  that establishes the stated identity, ending by reaching the RHS.
- Keep it faithful to what's ASKED. Don't restate the question. No preamble like "Here is the
  solution". No `**bold**` needed. A worked chain of `\(...\)` equalities is perfect.
- If a stem looks malformed/ambiguous (likely a transcription artifact), solve the most
  sensible intended form and add a `"_note"` field flagging it (extra fields are ignored).

## Example output element
```json
{
  "id": "…uuid…",
  "ref": "Ex 7.2 Q3",
  "solution": "Put \\(t = 1 + \\log x\\), so \\(dt = \\tfrac{1}{x}\\,dx\\). Then \\(\\int \\frac{(1+\\log x)^2}{x}\\,dx = \\int t^2\\,dt = \\frac{t^3}{3} + C = \\frac{(1+\\log x)^3}{3} + C\\)."
}
```

Return by WRITING the file. Final message: how many solutions you wrote + any `_note` flags.
