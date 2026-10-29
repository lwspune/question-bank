# Fit brief: can the linear-programming scene show this solution?

PYQ Vault draws animated solutions from a question's own numbers. The
**linear-programming** scene draws the constraint lines a x + b y ≤ c or ≥ c
(with x, y ≥ 0 unless the question drops them), shades the feasible region,
marks its corners, and slides the objective line Z = a x + b y to the best
corner. It can WORK OUT exactly these answers:

1. **max** / **min**: the maximum or minimum value of Z.
2. **range**: maximum minus minimum of Z.
3. **maxAt** / **minAt**: the point (or two points) where the maximum or
   minimum occurs, when the key names that point.
4. **maxCount** / **minCount**: whether the optimum is at one corner only, or
   along a whole edge ("infinitely many solutions / points"), when that is
   the key.

The question must give the constraints and the objective as numbers (in the
stem, not only in a figure). For each question decide which ONE of these the
key is, or `no`. These are `no`: writing the constraints for a shaded figure,
choosing a graph (Fig. 1, Region (d)), formulating a word problem into an LPP
(the key is a model), whether the region is bounded / unbounded / empty, the
list of corner points as the key, a question whose constraints live only in a
figure, and anything else.

Lean towards fitting when unsure: a later step checks every fit in detail and
drops the ones that do not work. But do not force it.

## Output

Write a JSON array to your output path, one object per question, input order:

```json
[{ "n": 3, "id": "<id>", "fit": "max", "note": "max 10x+6y, two constraints", "figureNeeded": "none", "solutionWrong": "none" }]
```

- `fit`: max, min, range, maxAt, minAt, maxCount, minCount or no.
- `note`: at most 12 words.
- `situation` (every `fit: "no"`): one camelCase word for what the question
  asks, so the questions no scene fits can be counted by what a new one would
  unlock. Use the run's list when its addendum gives one; otherwise pick from
  `findK` (a letter's value), `rootExpr` (an expression of roots), `formEquation`,
  `wordProblem`, `identity`, `division`, `proof`, `recall` (a fact or definition),
  `graphGiven` (read from a printed figure), or a new word that names a picture
  you would want ("twoLinesMeet", "wave", "circuit"), else `other`.

Read only your input file, write only your output file, run nothing. When
done, reply in one line with the count of each fit.

## Also: does the question need a picture it does not have?

Each question shows `stemImage` (true when a picture is attached to the
question) and marks options that carry a picture with `[IMAGE]`. Add
`"figureNeeded"` to every object: `"none"`, or `"stem"` / `"options"` when the
question cannot be FULLY answered without a picture it does not have (it says
"the shaded region below" and there is no picture; the options are graphs
with no image). Add `"figureNote"` (at most 12 words) saying what is missing.
A question that merely could use a picture, but is complete as written, is
`"none"`.

## Also: is the stored solution wrong?

Add `"solutionWrong"`: `"none"`, or at most 20 words saying what is wrong when
a step of the solution is false (a wrong corner, a wrong value of Z, a corner
that is not feasible), even if it still reaches the keyed answer. Do not
report terse or badly worded solutions, only false ones. If the KEY itself
looks wrong, or the question cannot be answered as printed, say so here too.
