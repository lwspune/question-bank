# Fit brief: can the 3D lines-and-planes scene show this solution?

PYQ Vault draws animated solutions from a question's own numbers. The
**3D** scene draws points, lines and planes in space, works out feet of
perpendiculars, images in a plane, where a line meets a plane and the common
perpendicular of two lines itself, and can MEASURE exactly these answers:

1. **distance**: between two points; from a point to a line or a plane; the
   shortest distance between two lines (skew or parallel); between parallel
   planes; from a line to a parallel plane. The points may be ones the scene
   works out (a foot, an image, a meeting point).
2. **angle**: between two lines, a line and a plane, or two planes.
3. **projection**: the length of a segment's projection on a plane.
4. **coord**: one coordinate (x, y or z) of a point, given or worked out
   (the foot of a perpendicular, an image in a plane, where a line meets a plane).
5. **length**: the magnitude of a vector given by its components.
6. **area**: of a triangle on three points in space, or a parallelogram on two
   vectors (or two sides given as vectors).
7. **volume**: of a tetrahedron on four points, or a parallelepiped on three
   vectors.
8. **angle** and **projection** also work between two VECTORS given by their
   components (the angle between a and b; the projection of a on b).

Vector questions about general vectors with no components (|a| = 2, a · b = 1,
a × b = c), identities, or a value of λ or α are `no`.

A key that is one of these SQUARED or MULTIPLIED by a number ("d²", "(PQ)²",
"6 × distance") still fits: name the measured kind.

For each question decide which ONE of these the answer is, or `no`. Fit only
when the KEYED answer is that one measured number. An equation as the answer
(of a plane, a line), direction ratios or cosines, a parameter value (find k,
λ), a ratio of division, a sum of coordinates, and anything else are `no`.

Lean towards fitting when unsure: a later step checks every fit in detail and
drops the ones that do not work. But do not force it.

## Output

Write a JSON array to your output path, one object per question, input order:

```json
[{ "n": 3, "id": "<id>", "fit": "distance", "note": "skew lines, cross product method", "figureNeeded": "none", "solutionWrong": "none" }]
```

- `fit`: distance, angle, projection, coord, length, area, volume or no.
- `note`: at most 12 words.
- `situation` (every `fit: "no"`): one camelCase word for what the question
  asks, so the questions no scene fits can be counted by what a new one would
  unlock. Use the run's list when its addendum gives one; otherwise pick from
  `findK` (a letter's value), `rootExpr` (an expression of roots), `formEquation`,
  `wordProblem`, `identity`, `division`, `proof`, `recall` (a fact or definition),
  `graphGiven` (read from a printed figure), or a new word that names a picture
  you would want ("twoLinesMeet", "wave", "circuit"), else `other`.

Read only your input file, write only your output file, run nothing. When
done, reply in one line with the count of each fit, plus any solutionWrong
flags (n and what is wrong).

## Also: does the question need a picture it does not have?

Each question shows `stemImage` (true when a picture is attached to the
question) and marks options that carry a picture with `[IMAGE]`. Add
`"figureNeeded"` to every object: `"none"`, or `"stem"` / `"options"` when the
question cannot be FULLY answered without a picture it does not have. Add
`"figureNote"` (at most 12 words) saying what is missing.

## Also: is the stored solution wrong?

Add `"solutionWrong"`: `"none"`, or at most 20 words saying what is wrong when
a step of the solution is false (a wrong sign, a wrong value, a claim that
does not hold), even if it still reaches the keyed answer. Do not report
terse or badly worded solutions, only false ones. If the KEY itself looks
wrong, or the question cannot be answered as printed, say so here too.
