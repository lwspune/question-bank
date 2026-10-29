# Fit brief: would a one-question sketch explain this solution?

These questions were already checked against every SHARED scene and none fit
(`earlier` says why). A **sketch** is the next try: an animation built for this
one question from computed objects (named numbers, points, segments, lines,
arrows, polygons, circles, arcs, angle marks, curves, labels), drawn step by
step beside the solution, in a flat 2D picture with true lengths.

For each question decide ONE verdict:

- `sketch`: a 2D picture would genuinely help a student follow THIS solution,
  and it can be built from those objects with every number computed from the
  question: a tangent and the triangle it cuts off, two curves and the angle
  where they meet, a ladder sliding down a wall, a rectangle inside a
  semicircle, a box folded from a sheet, a shadow and a lamp post, a locus, the
  region whose area is asked, a distance drawn as a segment. Rates of change
  count when the picture is the set-up (the ladder, the cone of water), drawn
  at the instant the question names.
- `algebra`: no picture helps, but the working is a chain of algebra steps a
  student could follow line by line (simplify, factor, differentiate, solve).
- `none`: nothing helps: a fact or definition, a 3D figure, a figure the
  question prints that we would only copy, or a question that cannot be drawn
  honestly with the numbers given (a letter left unfixed that the picture would
  have to guess).

Lean towards `sketch` only when the picture shows something the text does not:
the shape of the set-up, where a point sits, why a length is what it is. A
picture that only restates a number is `algebra` or `none`.

## Output

Write a JSON array to your output path, one object per question, input order:

```json
[{ "n": 3, "id": "<id>", "fit": "sketch", "note": "tangent to e^2x and the triangle it cuts off", "situation": "tangentTriangle" }]
```

- `fit`: sketch, algebra or none.
- `note`: at most 14 words: for a sketch, what the picture would show.
- `situation`: one camelCase word naming the kind of picture or problem
  (`tangentTriangle`, `ladder`, `inscribedRectangle`, `angleBetweenCurves`,
  `locus`, `region`, `boxFromSheet`, ...), the same word for the same kind, so
  repeats can be counted.
- `solutionWrong`: as in the other fit briefs: "none", or what is wrong.

Keep tool output small: read the input once, write the output once.
