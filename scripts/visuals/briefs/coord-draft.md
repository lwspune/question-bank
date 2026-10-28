# Draft brief: write a coordinate-geometry animated solution

Each question you get has been judged to fit the **coordinate-geometry**
scene. You write the scene's settings (`params`), which solution sentences
each step covers (`steps`) and the answer the picture must reproduce
(`answer`). A program draws it, measures the answer on its own model, and
refuses it if the two disagree; a person looks at every picture before it goes
live. So be exact, and skip anything that does not fit cleanly.

## What you write, per question

```json
{
  "n": 7, "id": "<id>", "skip": false,
  "params": {
    "window": { "x": [-7, 13], "y": [-5, 8] },
    "points": [{ "id": "Q", "at": [11, 6], "label": "(11, 6)" }, { "id": "C", "at": [-1, 1], "label": "(−1, 1)", "beat": "derived" }],
    "circles": [{ "id": "S", "center": "C", "r": 5, "label": "r = 5", "beat": "derived" }],
    "ask": { "kind": "distance", "from": "Q", "to": "S", "label": "shortest distance = 8" }
  },
  "steps": [{ "from": 0, "beats": ["given"] }, { "from": 1, "beats": ["derived"] }, { "from": 2, "beats": ["answer"] }],
  "answer": { "value": 8, "label": "8" },
  "figureNeeded": "none",
  "solutionWrong": "none"
}
```

Or, when it does not fit cleanly: `{ "n": 7, "id": "<id>", "skip": true, "reason": "asks for the equation, not a length", "figureNeeded": "none", "solutionWrong": "none" }`.

### params

Every object has an `id`: a short name of letters and digits (`A`, `C1`, `S`),
each used once across the whole visual. Labels are plain text with Unicode
(² ³ √ π − ·), no LaTeX, no backslashes, at most 24 characters. Write
"parallel to" / "perpendicular to" in words: ∥ and ⊥ draw as a box in the picture's font. Every object
may set `"beat"`: `"given"` (what the question gives; the default for points,
circles and conics), `"derived"` (what the solution works out), or
`"construct"` (the default for lines and segments).

- `window`: `x` and `y` ranges, numbers only, so that everything the solution
  talks about is visible with a little room. The scene keeps one scale on both
  axes, widening the shorter side, so circles stay round.
- `points`: `{ "id", "at": [x, y], "label"? }`. Without a label the point
  shows its coordinates; `"label": ""` draws a bare dot (a helper point).
  A point the SOLUTION works out from earlier points is built by the scene
  instead of given as numbers (list it after the points it uses; its beat is
  `"derived"` unless you say otherwise):
  - `{ "id", "divides": [A, B], "ratio": [m, n] }`: the point dividing AB
    internally in m : n (AP : PB = m : n). Add `"external": true` for
    external division.
  - `{ "id", "midpointOf": [A, B] }`, `{ "id", "centroidOf": [A, B, C] }`.
  A vertex found from a midpoint ("M(4, 5) is the midpoint of AB, A(2, 3),
  find B") is B dividing AM externally in 2 : 1: `{ "id": "B", "divides": ["A", "M"], "ratio": [2, 1], "external": true }`.
  Give a constructed point a short label with its coordinates as the
  solution writes them ("P(1, 3)", "G(3, 1/3)").
- `circles`: `{ "id", "center": [x, y] or a point id, "r", "label"? }`.
- `conics`: one of
  - `{ "id", "type": "parabola", "vertex": [h, k] or point id, "a", "axis": "x" }` for (y − k)² = 4a(x − h);
    `"axis": "y"` for (x − h)² = 4a(y − k). `a` may be negative (opens left / down).
  - `{ "id", "type": "ellipse", "center", "a", "b" }` for (x − h)²/a² + (y − k)²/b² = 1.
  - `{ "id", "type": "hyperbola", "center", "a", "b", "axis": "x" }` for (x − h)²/a² − (y − k)²/b² = 1;
    `"axis": "y"` for (y − k)²/a² − (x − h)²/b² = 1.
  Rewrite the question's equation into one of these forms first. A curve that
  is none of these does not fit: skip.
- `lines`: one of
  - `{ "id", "through": [pointId, pointId] }`
  - `{ "id", "eq": [a, b, c] }` for ax + by + c = 0
  - `{ "id", "tangentAt": pointId, "to": curveId }` (the point must lie on the curve)
  - `{ "id", "tangentsFrom": pointId, "to": curveId }`: every tangent from the
    point; they become lines `<id>1`, `<id>2` numbered by slope, lowest first.
  - `{ "id", "pair": [A, B, C, D, E, F] }` for ONE equation
    Ax² + Bxy + Cy² + Dx + Ey + F = 0 that is a pair of lines. Copy the six
    coefficients from the question exactly (B is the whole xy coefficient, not
    h: 2x² − 5xy + 2y² = 0 is `[2, -5, 2, 0, 0, 0]`); the scene factors it and
    makes lines `<id>1`, `<id>2` by slope, lowest first (a vertical line comes
    last). It refuses an equation that is not a real pair. Do NOT factor it
    yourself.
  plus an optional `"label"`.
- `segments`: `{ "from": pointId, "to": pointId, "label"? }`, drawn dashed (a
  radius, a chord the solution names).
- `locus`: `{ "fixed": pointId, "on": circleId, "ratio": 0.5, "movingLabel": "P", "pointLabel": "M" }`:
  the point dividing fixed → moving in that ratio (0.5 = midpoint; for
  "divides AP in the ratio 1 : 2" the ratio is 1/3) is traced as the moving
  point goes round.
- `ask`, one of (each may carry a plain `"label"` for the header, at most 32
  characters, such as `"shortest distance = 8"`):
  - `{ "kind": "distance", "from": id, "to": id }`: points, lines, circles; a conic only from a point.
  - `{ "kind": "yIntercept" | "xIntercept" | "slope", "line": lineId }`
  - `{ "kind": "radius", "circle": circleId }`
  - `{ "kind": "locusRadius" }`
  - `{ "kind": "chordLength", "line": lineId, "of": curveId }`
  - `{ "kind": "tangentLength", "from": pointId, "to": circleId }`
  - `{ "kind": "area", "points": [ids in order round the figure] }`
  - `{ "kind": "angle", "lines": [lineId, lineId], "as": "angle" | "tan" | "cos" | "sin", "obtuse": false }`:
    the angle between two lines, acute unless `"obtuse": true`. Pick `as` by
    how the KEY is printed: an angle (60°, π/3, 2π/3) → `"angle"` with the
    answer value in RADIANS (π/3 = 1.04719755); tan⁻¹(k) or "tan θ = k" →
    `"tan"` with value k; cos⁻¹(k) → `"cos"` with value k; sin⁻¹(k) → `"sin"`.
    The two lines must meet inside the window, so choose the window around
    where they cross.
  - `{ "kind": "point", "point": id, "expect": [x, y] }`: the answer is a
    POINT the scene constructs (divides, midpointOf, centroidOf). `expect` is
    the answer's coordinates as decimals (7/2 = 3.5, 1/3 = 0.333333333333);
    the scene builds the point from the question's numbers and the visual is
    refused unless it lands on `expect`. `answer.value` is 0 (how far it
    misses) and `answer.label` is the point ("(1, 3)").
  - `{ "kind": "ratio", "of": [A, B], "by": id }`: the ratio AP : PB in which
    `by` divides AB, where `by` is a point on AB or a line (an axis is
    `eq: [0, 1, 0]` for the x-axis, `[1, 0, 0]` for the y-axis) crossing it.
    `answer.value` is m/n as a decimal (2 : 7 = 0.285714285714; negative when
    the cut is outside AB) and `answer.label` the ratio ("2 : 7").
  When the question asks for a ratio AND then a point or k, skip unless the
  solution's final answer is the ratio or the point.
  Any ask other than point and ratio may also carry `"squared": true` and/or `"times": k` when the KEY is the
  measured value squared or multiplied: "(AB)² =" is `squared: true`, "6 × area"
  is `times: 6`, "(2β)²" for a length β is `squared: true, times: 4`. The picture
  still draws the length or area itself; give a header label that says what is
  reported ("(AB)² = 72").

### steps

Each question shows its solution as numbered sentences `[0] [1] ...`. A step
names the sentence it starts at (`from`) and the beats it plays. The first
step starts at 0, later steps start later, every step has at least one beat,
and each beat is used at most once. Beats: `given`, `derived`, `construct`
(each shows the objects of that beat, one after another), `trace` (the locus),
`answer` (marks the measured length, point or area and shows the header).
Play every beat your objects use, and always end with `answer`. A short
solution can be one step with several beats.

### answer

- `value`: the keyed number (8, −1, 0.5; √24 as 4.89897949).
- `label`: how the answer reads, plain text, at most 32 characters.

## Rules

- Use the question's own numbers. Never change the problem to make it fit.
- If the keyed option is not what your picture gives, SKIP with the reason:
  never invent a different answer.
- Read only your input file, write only your output file (a JSON array, one
  object per question, input order), run nothing. Keep messages short: when
  done, reply in one line with how many drafted and how many skipped.

## More finished examples

Section point, CBSE "find the point dividing A(−1, 7), B(4, −3) in 2 : 3",
sentences [0] by the section formula, [1] x = 1, [2] y = 3, so (1, 3):

```json
{ "params": { "window": { "x": [-3, 6], "y": [-5, 9] },
    "points": [{ "id": "A", "at": [-1, 7], "label": "A(−1, 7)" }, { "id": "B", "at": [4, -3], "label": "B(4, −3)" },
               { "id": "P", "divides": ["A", "B"], "ratio": [2, 3], "label": "P(1, 3)" }],
    "segments": [{ "from": "A", "to": "B" }],
    "ask": { "kind": "point", "point": "P", "expect": [1, 3], "label": "P = (1, 3)" } },
  "steps": [{ "from": 0, "beats": ["given", "construct"] }, { "from": 1, "beats": ["derived", "answer"] }],
  "answer": { "value": 0, "label": "(1, 3)" } }
```

Ratio by an axis, CBSE "in what ratio does the x-axis divide A(1, −5), B(−4, 5)?",
sentences [0] let it be k : 1, [1] y = 0 gives 5k − 5 = 0, [2] k = 1, so 1 : 1:

```json
{ "params": { "window": { "x": [-5, 2], "y": [-6, 6] },
    "points": [{ "id": "A", "at": [1, -5], "label": "A(1, −5)" }, { "id": "B", "at": [-4, 5], "label": "B(−4, 5)" }],
    "lines": [{ "id": "X", "eq": [0, 1, 0], "label": "x-axis", "beat": "given" }],
    "ask": { "kind": "ratio", "of": ["A", "B"], "by": "X", "label": "ratio = 1 : 1" } },
  "steps": [{ "from": 0, "beats": ["given"] }, { "from": 1, "beats": ["answer"] }],
  "answer": { "value": 1, "label": "1 : 1" } }
```

Locus, JEE "the midpoint of the segment from (3, 2) to a point on x² + y² = 1
traces a circle of radius r", one solution sentence:

```json
{ "params": { "window": { "x": [-1.6, 3.6], "y": [-1.4, 2.6] },
    "points": [{ "id": "A", "at": [3, 2], "label": "A(3, 2)" }],
    "circles": [{ "id": "S", "center": [0, 0], "r": 1, "label": "x² + y² = 1" }],
    "locus": { "fixed": "A", "on": "S", "ratio": 0.5 },
    "ask": { "kind": "locusRadius", "label": "radius = 1/2" } },
  "steps": [{ "from": 0, "beats": ["given", "trace", "answer"] }],
  "answer": { "value": 0.5, "label": "1/2" } }
```

Line through two points, JEE "the line through the circle's centre (−1, 0) and
the vertex of x² − 6x + y + 13 = 0; its y-intercept", sentences [0] circle
centre (−1, 0), [1] parabola vertex (3, −4), [2] slope −1 so y = −x − 1:

```json
{ "params": { "window": { "x": [-4, 6], "y": [-6, 2.5] },
    "points": [{ "id": "C", "at": [-1, 0], "label": "(−1, 0)" }, { "id": "V", "at": [3, -4], "label": "V(3, −4)", "beat": "derived" }],
    "circles": [{ "id": "S", "center": "C", "r": 1 }],
    "conics": [{ "id": "K", "type": "parabola", "vertex": "V", "a": -0.25, "axis": "y", "beat": "derived" }],
    "lines": [{ "id": "L", "through": ["C", "V"], "label": "y = −x − 1" }],
    "ask": { "kind": "yIntercept", "line": "L", "label": "y-intercept = −1" } },
  "steps": [{ "from": 0, "beats": ["given"] }, { "from": 1, "beats": ["derived"] }, { "from": 2, "beats": ["construct", "answer"] }],
  "answer": { "value": -1, "label": "−1" } }
```

Pair of lines, MHT-CET "the acute angle between the lines x² − 5xy + 6y² = 0
is tan⁻¹(1/7)", sentences [0] m₁ + m₂ = 5/6, m₁m₂ = 1/6, [1] tan θ = |m₁ − m₂| / (1 + m₁m₂) = 1/7:

```json
{ "params": { "window": { "x": [-3, 3], "y": [-2, 2] },
    "lines": [{ "id": "P", "pair": [1, -5, 6, 0, 0, 0], "label": "x² − 5xy + 6y² = 0" }],
    "ask": { "kind": "angle", "lines": ["P1", "P2"], "as": "tan", "label": "tan θ = 1/7" } },
  "steps": [{ "from": 0, "beats": ["construct"] }, { "from": 1, "beats": ["answer"] }],
  "answer": { "value": 0.14285714, "label": "tan⁻¹(1/7)" } }
```

## Also: does the question need a picture it does not have?

Each question shows `stemImage` (true when a picture is attached to the
question) and marks options that carry a picture with `[IMAGE]`. Set
`"figureNeeded"` on every object: `"none"`, or `"stem"` / `"options"` when the
question cannot be FULLY answered without a picture it does not have. Add
`"figureNote"` (at most 12 words) saying what is missing.

## Also: is the stored solution wrong?

Set `"solutionWrong"` on every object: `"none"`, or at most 20 words saying
what is false in the solution (a wrong sign, a wrong value, a claim that does
not hold), even if it still reaches the keyed answer. Do not report terse or
badly worded solutions, only false ones. A wrongly solved question is SKIPPED
(reason "solution wrong"): its solution is corrected first, and the visual is
drafted afterwards against the corrected sentences.
