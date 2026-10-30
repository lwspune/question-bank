# Pass B: solve a transcribed chapter blind (agent brief)

You solve already-transcribed multiple-choice questions and write a worked solution for each.
Nobody gives you the answer key and you must not look for one: never open a `*.keys.json`, and
never open anything under `<WORK>/render/` (page images show key tables). Work from the question
text and, for figure questions, the cut-out figure only. Your answers are compared against the
book's printed key afterwards, so an independent answer is the whole point. Keep tool output small.

## Input (your prompt names `<WORK>`, `<testId>` and the files)
- Questions: `<WORK>/drafts/<file>.A.json`, an array of `{ref, section, stem, options[4], hasFigure, optionsAreFigures, confidence, note}`.
- Figures: `<WORK>/figcrops/<testId>/<ref with spaces as _>.jpg` for each `hasFigure` question.
- Style example: `scripts/pariksha/data/gpcc-nkl-ch29.physics.json` (answers + solutions in the bank's voice).

## Output: `<WORK>/drafts/<file>.B.json`, one object per question, same order as the input
```
{
  "ref": "24.1 Q5",
  "answer": 3,                 // the printed option NUMBER (1-4) you derive
  "solution": "...",
  "difficulty": "MODERATE",    // EASY one formula · MODERATE two steps · HARD multi-step or trap-laden
  "confidence": "HIGH",        // HIGH | MED | LOW
  "reasoning": "..."           // ONLY when confidence != HIGH or the question is defective
}
```

## Solving rules
1. Derive, then check: recompute numbers, test units and limiting cases; a numeric answer must match an option within rounding, or say none does.
2. **Read a figure's orientation before using it**, zooming in if it is small: battery polarity (long plate = +), which way each diode, zener and gate points, which face of a mirror or lens is reflecting or curved. These decide the answer, and a wrong reading gives a confident wrong answer.
3. **Coaching books count virtual objects.** "A convex mirror can never form a real image", "a concave lens always forms a virtual image": the book treats such "never/always" statements as FALSE because a converging beam (virtual object) breaks them. Answer on that convention, and say so in the solution.
4. **Defective questions**: no option right, two options right, or a needed value missing: still pick the most defensible option, `confidence: "LOW"`, and say exactly what is wrong in `reasoning`. Never quietly force a fit.
5. A transcription that looks wrong (an impossible option, a typo that changes the physics): say so in `reasoning` and solve the evident intended question.
6. Standard values unless the stem gives others: \(hc = 1240\,\text{eV nm}\), \(h = 6.6 \times 10^{-34}\,\text{J s}\), \(e = 1.6 \times 10^{-19}\,\text{C}\), \(m_e = 9.1 \times 10^{-31}\,\text{kg}\), \(1\,\text{u} = 931.5\,\text{MeV}\), \(R = 1.1 \times 10^{7}\,\text{m}^{-1}\), \(E_1 = -13.6\,\text{eV}\), 200 MeV per fission.

## Solution style
- 1-6 short lines: the governing relation, the substitution, the result and which option it is. Conceptual questions: 1-3 sentences of real reason, never just "Conceptual".
- ALL maths and symbols in LaTeX inside `\( \)` (no bare λ μ θ ° × √ ² → ∝ ≈ Å); angstrom `\(\mathring{\text{A}}\)`; balanced delimiters; no JSON `\u` escapes.
- Lines separated by `\n`. Plain words, no em dashes. Do not mention "the key" or "the book".

## Before you finish
One object per input question, refs identical and in order, answers 1-4, delimiters balanced.
Write the file (nothing else, no git, no database), then reply with ONLY: count written, and one
line per question with confidence != HIGH (ref: why).
