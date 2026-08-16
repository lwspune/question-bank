# NCERT (CBSE Class 12) — solution authoring brief (per-subtopic agent)

You author full model solutions for one NCERT Class 12 Maths chapter's **exercise**
questions (the worked Examples already carry the book's own solution). Your task message
gives you the **chapter id** and **which subtopic(s)** you own. Input rows are in
`scripts/ncert/data/<chapterId>.tosolve.json` — an array of
`{id, ref, subtopic, context, stem}`.

## Your job
Filter that file to YOUR subtopic(s) and, for each row, author a correct, concise model
solution. You are a strong mathematician — **DERIVE each answer yourself**. Do not pattern-
match to what the answer "should" look like.

## Output → `scripts/ncert/data/<chapterId>.<group>.solutions.json`
A JSON array of `{id, ref, solution}` — **`id` and `ref` copied VERBATIM from the input row**,
`solution` your authored answer. Include ONLY your subtopic's rows.

### The pairing rule (a gate, not advice)
`apply-solutions.ts` REFUSES the batch if any `id` is absent from the dump, or if an `id`
arrives carrying a different `ref` than the dump gave it. This catches the failure mode where
an agent drops a row mid-file and pads the tail: the id SET and the COUNT both still match
perfectly, and every solution lands on the wrong question. So before you finish, **diff your
(id, ref) PAIRS against the input** — not just the count, and not just the id set. If you
genuinely cannot solve a row, OMIT it and say so; never pad, never reuse a neighbour's id.

## Solution rules
- **LaTeX for ALL math, inside `\(...\)`** (inline). Never raw unicode (∫ ² √ π ∞ → × ≤ ∈) —
  use `\int`, `x^2`, `\sqrt{}`, `\pi`, `\frac{}{}`, `\sin`, `\log`, `\tan^{-1}`, `\,dx`,
  `\frac{dy}{dx}`, `\hat{i}`, `\vec{a}`, `\le`, `\in`, `\Rightarrow`. Put plain connective
  words ("Let", "Then", "so", "Put", "Hence") in plain text, outside the math zones.
- **Show the method briefly, then the result.** 2–5 steps is ideal: name the technique, give
  the key transformation, state the final answer.
- **End with the final answer**, as the LAST thing in the solution, so the answer-key
  cross-check can find it. Indefinite integrals end with `+ C`; a general solution of a
  differential equation ends with its arbitrary constant.
- **"Show that" / "Prove" rows**: give the derivation that establishes the stated result,
  ending by reaching it. (These are the rows the NCERT key typically leaves blank — the key
  answering nothing for them is expected, not a defect.)
- Keep it faithful to what is ASKED. Don't restate the question, no preamble, no `**bold**`.
- **Never name an option by LETTER** in a solution ("option C is excluded") — the standing
  `audit:keys` probe reads that as the concluded answer and fires a false positive, and the
  letter goes stale if options are ever reordered. Name the option's VALUE instead.
- If a stem looks malformed or ambiguous (likely a transcription artifact), solve the most
  sensible intended form and add a `"_note"` field flagging it (extra fields are ignored).
- If the BOOK itself is wrong, that is not your call to make here — flag it in `_note`. The
  answer-key cross-check gate adjudicates book defects and writes the `[Textbook …]` bracket.

### NEVER write a conclusion you believe is wrong in order to match the key

You do not have the answer key, and you must not go looking for it. If you nonetheless believe
you know what it says and your own derivation disagrees, **write YOUR derivation's conclusion**
and put the disagreement in `_note`. Do not "follow the book's verdict so the cross-check lands".

This is not hypothetical. On Relations `Ex 1.1 Q1(v)(d)` ("x is wife of y") an agent correctly
proved that no chain `(x,y),(y,z)` can exist — which makes transitivity hold VACUOUSLY — then
wrote "R is recorded as not transitive on this ground" and concluded "neither reflexive, nor
symmetric, nor transitive", because it believed that was the book's answer. Two things were
wrong: the solution contradicted itself (the ground it gave is the ground for transitivity being
TRUE, and its own structural twin `Q1(ii)` says exactly that), and **the book actually keys it
"Neither reflexive nor symmetric but transitive"** — so the conformity was to an imagined key.

Conforming defeats the gate: the cross-check exists to compare an INDEPENDENT answer against the
book. An answer bent toward the book cannot disagree with it, so the check reports agreement and
learns nothing. A vacuous-truth case is where this bites hardest — say "holds vacuously,
therefore true", never "no instances exist, therefore false".

## Escaping (this has corrupted real batches — read it)
Write the file with the **Write tool**, never a shell heredoc or `python -c`: a shell layer
eats one backslash, so `\theta` arrives as TAB + "heta". In JSON a LaTeX backslash is `\\`,
so `\(` is `"\\("`. Never `\\\\(` — that decodes to a literal backslash and renders as a
stray `\`. `apply-solutions.ts` refuses control characters and double-escaped quotes outright.

## Example output element
```json
{
  "id": "…uuid…",
  "ref": "Ex 9.4 Q3",
  "solution": "The equation is homogeneous. Put \\(y = vx\\), so \\(\\frac{dy}{dx} = v + x\\frac{dv}{dx}\\). Substituting gives \\(v + x\\frac{dv}{dx} = \\frac{v^2+1}{v}\\), so \\(x\\frac{dv}{dx} = \\frac{1}{v}\\). Separating, \\(v\\,dv = \\frac{dx}{x}\\), hence \\(\\frac{v^2}{2} = \\log|x| + C\\). Back-substituting \\(v = y/x\\), the solution is \\(y^2 = 2x^2\\log|x| + Cx^2\\)."
}
```

Return by WRITING the file. Final message: how many solutions you wrote, the (id, ref)
pairing check result, any rows you OMITTED and why, and any `_note` flags.
