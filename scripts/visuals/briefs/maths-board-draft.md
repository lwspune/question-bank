# Draft brief: board Maths (Maharashtra HSC Class 12, 2026-11-08)

Read first, in full: algebra-draft.md (with the `deriv`, `integral` and
`restart` kinds), sketch-fit.md and sketch-draft.md (with its end checklist),
all in this folder, and the "Learned on the first chapters" section of
physics-draft.md (the parts about notes for students, slips and exact
answer values apply here too). Each question gets exactly one of: an
algebra-steps draft, a sketch draft, or a skip.

## Which kind

1. **Sketch** when a picture shows what the text does not: the region whose
   area is asked (Application of Definite Integration: curves, the bounds,
   the shaded region, with an `assert` per intersection point), a graph read
   for a principal value or a domain, a curve family for a differential
   equation's general solution only when the solution draws on its shape.
   Equal units on both axes; a needle (a region 100 wide and 0.1 tall) is
   algebra instead.
2. **Algebra steps** for working a student follows line by line:
   differentiation (`deriv` for each d/dx line, then `expr` to simplify),
   integration (the integrand as `expr`, the result as `integral`), solving
   a differential equation (separate, integrate both sides with
   `integral`, then the constant from the condition as `calc`), trig
   identities and equations (`expr` chains, `eq` with roots in radians),
   matrices and determinants (`calc` per entry or per minor; a matrix line
   as tex with `\\begin{bmatrix}`), probability and binomial (`calc`: nCr,
   p, q, sums, mean, variance).
   - A "prove that" or "show that" with x free: an `expr` chain proves an
     identity in x; with other letters (a, b, θ) give them sample values in
     `vars` and check with `calc` lines, as physics-draft.md says.
   - Inverse trig: work in radians in formulas (`asin`, `acos`, `atan`); the
     tex shows π/6 and the like.
   - A matrix answer: pin `answer` to one entry that is not 0 and give the
     whole matrix in `answer.label` (within 32 characters, else "A⁻¹ above").
3. **Skip** (none): a definition, a statement, "write the formula", a recall
   MCQ, a question whose working is a sentence, and anything you cannot
   check honestly.

## Learned on the Differentiation pilot (2026-11-08, 45 questions, 61 deriv lines)

- Implicit differentiation: the checker cannot differentiate a relation in x
  and y. Show the differentiated equation as a `note`, then check the final
  dy/dx with `calc` lines at one sample point on the curve (choose x, solve
  for y in `vars`, and check that the differentiated equation holds there).
- A step valid only on part of the domain (sin⁻¹(sin u) = u, a principal
  range): make it a `note` that names the range, then carry on with `expr`
  or `deriv` on the simplified form. Logs and powers of a quantity that can
  be negative: use abs() inside f (the tex keeps the book's form).
- Parametric: each of dx/dθ and dy/dθ is its own chain (`restart: true`,
  the parameter written as x in f); the quotient is a `restart` expr.
- Keep each line short: a product-rule line with two long terms is too wide
  for a phone. Split it: "dy/dx = A + B" as the first line, then simplify
  each part on its own line.

## Learned on Differential Equations (2026-11-08, 217 questions)

- A step's `from` is an index into that question's `sentences` and must
  exist: a short solution (three sentences) cannot have steps from 0, 2
  and 5. The assembler drops such a draft ("the steps do not fit the
  solution's sentences"); check-drafts does not catch it.
- A solution that is only a relation (implicit general solution): check it
  by differentiating the relation by formula at one sample point, as for
  implicit differentiation above.

## Output, checks and report

As in physics-draft.md: three files per slice (algebra, sketch, skip with a
`situation` word: definition, recallMcq, statement, wordProof, needsGuess,
...), check-drafts on the algebra and sketch files, the first step at
sentence 0, and a report that quotes every stored text you call a slip
EXACTLY as stored, with what it should be.
