# NCERT Physics (CBSE Class 11 + 12) — solution authoring brief (per-subtopic agent)

You author full model solutions for one NCERT **Physics** chapter's **exercise** questions
(the worked Examples already carry the book's own printed solution). Your task message gives
you the **chapter id** and **which subtopic(s)** you own. Input rows are in
`scripts/ncert/data/<chapterId>.tosolve.json` — an array of
`{id, ref, subtopic, context, stem}`.

> This is the PHYSICS brief. `SOLUTION_BRIEF.md` is the Maths one. The rules below on
> UNITS, SIGNIFICANT FIGURES and NUMERIC ANSWERS do not exist there and are what make a
> Physics solution checkable against the key.

## Your job
Filter that file to YOUR subtopic(s) and, for each row, author a correct, concise model
solution. **DERIVE each answer yourself** from the physics. Do not pattern-match to what the
answer "should" look like, and do not look up NCERT solution sites — the point of this pass
is an independent derivation that the answer-key cross-check can then adjudicate.

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

## Physics-specific rules (these are the ones that matter here)

- **EVERY QUANTITY CARRIES ITS UNIT, and the final answer states it.** A Physics answer
  without a unit is not an answer. Write units inside the math zone with `\text{}`:
  `\(v = 6.32\,\text{m s}^{-1}\)`, `\(Y = 2.0 \times 10^{11}\,\text{N m}^{-2}\)`. Never
  `m s-1`, never a bare exponent on the baseline.
- **Work in SI and say so when you convert.** Most stems mix units deliberately (cm with
  m, atm with Pa, g with kg). Show the conversion — a wrong answer here is nearly always a
  unit slip, and an unshown conversion makes it invisible.
- **Give the final numeric answer to a sensible precision** — normally 2-3 significant
  figures, matching the precision of the data given. The NCERT key rounds; a solution that
  ends in a 9-digit float cannot be compared against it cleanly.
- **State the final answer as the LAST thing in the solution**, on its own, so the
  answer-key cross-check can find it. If a question has parts (a), (b), (c), end with all
  of them clearly labelled.
- **A conceptual question still gets a real answer.** Many Physics exercises are "explain
  why", "is it possible", "state with reasons". Give the physical reason, not a restatement.
  These are exactly the questions the NCERT key leaves blank, so yours is the only answer a
  student will get — it has to stand on its own.
- **A question that reads data off a figure**: the figure is attached to the row. Your input
  gives you the stem only, so if the stem alone is genuinely unanswerable, say so in a
  `"_note"` and omit the row rather than inventing the figure's values.

## General rules
- **LaTeX for ALL math, inside `\(...\)`.** Never raw unicode (superscripts, radicals, pi,
  arrows, times, ohm, delta, theta, mu, degree). Put plain connective words ("Let", "Then",
  "so", "Hence") in plain text, outside the math zones.
- **Show the method briefly, then the result.** 2-6 steps: name the principle, give the
  governing equation, substitute, state the answer with its unit.
- Keep it faithful to what is ASKED. Don't restate the question, no preamble, no bold.
- **Never name an option by LETTER** in a solution ("option C is excluded") — the standing
  `audit:keys` probe reads that as the concluded answer and fires a false positive, and the
  letter goes stale if options are ever reordered. Name the option's VALUE instead.
- If a stem looks malformed or ambiguous (likely a transcription artifact), solve the most
  sensible intended form and add a `"_note"` field flagging it (extra fields are ignored).
- If the BOOK itself looks wrong, that is not your call to make here — flag it in `_note`.
  The answer-key cross-check adjudicates, and it is the only pass that sees both sides.
  **Do NOT bend your answer towards what you think the key says.** An answer bent toward the
  book cannot disagree with it, so the gate it feeds learns nothing — and on a past batch an
  agent did exactly that, wrote its reasoning down, and was wrong about the key anyway.

## Escaping
Write the file with the **Write tool**, never a shell heredoc or `python -c`. A shell layer
eats one backslash, so `\theta` arrives as a TAB character + "heta". In JSON a LaTeX
backslash is `\\`. `apply-solutions.ts` REFUSES control characters and double-escapes.
