# Draft brief: board Physics (Maharashtra HSC Class 12 first, 2026-11-08)

Read first, in full: algebra-draft.md, sketch-fit.md and sketch-draft.md (with
its end checklist), all in this folder. This brief says which kind each Physics
question gets and what is different from maths. Each question gets exactly one
of: an algebra-steps draft, a sketch draft, or a skip.

## Which kind

Take the FIRST that fits:

1. **Sketch**, only when the solution reasons from a set-up a teacher would
   draw on the board and the picture shows something the text does not: a
   particle on a vertical circle with the top, side and bottom marked (the
   heights 0, r, 2r), a car on a banked road with N, mg and friction as
   arrows, a conical pendulum (string, radius, angle θ), a body rolling down
   an incline of the given angle, a rod and the two axes of the parallel-axis
   theorem with the distance h between them, a ray through a slab or prism,
   a resistor network. Lengths are true (one unit is the same on both axes);
   force arrows are drawn to a shared scale var, labelled with their name
   (N, mg, f, T), never with an invented number. If true proportions make it
   a needle (a 400 m curve with a 2 m car), choose algebra.
2. **Algebra steps** for working a student follows line by line:
   - a numerical (the usual case): the data line as a `note`, then the
     formula, the substitution and each worked number as `calc` lines, the
     answer with its unit;
   - a derivation in letters ("obtain an expression", "show that", "prove"):
     give every letter a sample value in `vars` (not shown to students; pick
     plain unequal ones: M = 2, R = 0.5, w = 3, g = 9.8, theta = rad(30)), and
     write each line as a `calc` whose `f` is the line's left form and
     `value` its right form, both formulas of those vars, so the program
     checks every rewrite at those numbers. The `answer` is the final
     expression evaluated at the same vars, `answer.label` the expression
     in words or symbols ("I = MR²/2"). Only the derivation's equations:
     the prose between them stays in the solution text beside the picture.
3. **Skip** (verdict none) when nothing would help: a definition, a
   statement of a law, "why is it so", "distinguish between", a list of
   factors, a recall MCQ, a derivation whose steps are argued in words
   rather than equations, and anything you would have to guess.

## Physics numbers

- Powers of ten are written `6.63*10^(-34)` in formulas (`6.63e-34` is
  refused). Every `calc` whose value has a power of ten, or that the
  solution rounds to significant figures, carries `sf` (the significant
  figures it shows: `"sf": 3` for 3.27 x 10^5). A value under 10^-14 with
  a power of ten and no `sf` is refused. `dp` stays for a value rounded to
  decimal places (2.83 m/s); never give both.
- Work in the solution's own units: if it converts 60 cm to 0.6 m, show that
  line. Constants come from the question or its context (`g = 10` when the
  context says so, otherwise the solution's own value).
- Units go in tex with `\\text{}`: `I = 4\\ \\text{kg m}^2`. In `note` and
  `answer.label` write them plainly: "4 kg m²", "3.2 m", "1.26 × 10⁵ J".
- A question with several asked parts: one line group per part in the
  solution's order, the `answer` pinned to the FIRST part's number, all parts
  in `answer.label` ("3.2 m; 4.5 m/s, 6 m/s") within 32 characters.
- An MCQ: the answer is the keyed option's value. If the working gives a
  different option, skip with the reason and set `solutionWrong`.

## Output: three files per slice

- `slice-K.algebra.json`: algebra-steps drafts, in input order.
- `slice-K.sketch.json`: sketch drafts, in input order.
- `slice-K.skip.json`: `[{ "n", "id", "reason", "situation" }]` for every
  question you skip; `situation` one camelCase word (definition, lawStatement,
  explainWhy, distinguish, listFactors, recallMcq, wordDerivation, needsGuess,
  ...), the same word for the same kind.

Every input question appears in exactly one file. Write all three (an empty
list `[]` when none) with json.dump from real strings. Every draft also
carries `figureNeeded` and `solutionWrong` as in sketch-draft.md.

## Check before you hand it back

From the worktree root (the path you were given):

    npx tsx scripts/visuals/tools/check-drafts.ts --scene=algebraSteps <slice-K.algebra.json>
    npx tsx scripts/visuals/tools/check-drafts.ts --scene=sketch <slice-K.sketch.json>

Fix every line they print. Read only your input, the briefs and the scene
sources; write only your three files (plus small throwaway helpers named
slice-K-*.py next to them). Never touch the database or git. Keep tool
output small.
