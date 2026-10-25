# Draft brief: write a 3D lines-and-planes animated solution

Each question you get has been judged to fit the **3D** scene. You write the
scene's settings (`params`), which solution sentences each step covers
(`steps`) and the answer the picture must reproduce (`answer`). A program draws
it, measures the answer on its own model, and refuses it if the two disagree; a
person looks at every picture before it goes live. So be exact, and skip
anything that does not fit cleanly.

## What you write, per question

```json
{
  "n": 7, "id": "<id>", "skip": false,
  "params": {
    "points": [{ "id": "P", "at": [10, -2, -1], "label": "P(10, −2, −1)" }, { "id": "R", "at": [1, 7, 6], "label": "R(1, 7, 6)" },
               { "id": "A", "at": [2, -5, 11], "label": "" }, { "id": "B", "at": [-6, 7, -5], "label": "" }],
    "lines": [{ "id": "L", "through": ["A", "B"] }],
    "derived": [{ "id": "Q", "kind": "foot", "from": "R", "to": "L", "label": "Q(−2, 1, 3)" }],
    "segments": [{ "from": "R", "to": "Q", "beat": "derived" }],
    "ask": { "kind": "distance", "from": "P", "to": "Q", "label": "PQ = 13" }
  },
  "steps": [{ "from": 0, "beats": ["given"] }, { "from": 1, "beats": ["derived"] }, { "from": 2, "beats": ["answer"] }],
  "answer": { "value": 13, "label": "13" },
  "figureNeeded": "none",
  "solutionWrong": "none"
}
```

Or, when it does not fit cleanly: `{ "n": 7, "id": "<id>", "skip": true, "reason": "key is a sum of coordinates", "figureNeeded": "none", "solutionWrong": "none" }`.

### params

Every object has an `id`: a short name of letters and digits (`A`, `L1`, `P`),
each used once across the whole visual. Labels are plain text with Unicode
(² ³ √ π − · and subscripts ₁ ₂), no LaTeX, no backslashes, at most 24
characters; `"label": ""` draws a bare dot. Write "parallel to" in words: ∥ and
⊥ draw as a box. Every object may set `"beat"`: `"given"` (what the question
gives; the default for points, lines and planes), `"derived"` (what the solution
works out; the default for `derived`), or `"construct"` (the default for
segments).

- `points`: `{ "id", "at": [x, y, z], "label"? }`. Without a label a point shows
  its coordinates.
- `lines`: `{ "id", "through": [pointId, pointId] }` or
  `{ "id", "point": [x, y, z] or pointId, "dir": [a, b, c] }`, plus `"label"?`.
  For (x − x₁)/a = (y − y₁)/b = (z − z₁)/c the point is [x₁, y₁, z₁] and the
  direction [a, b, c]; rewrite forms like (1 − z)/2 as (z − 1)/(−2) first.
  For r = a + λb the point is a and the direction b.
- `planes`: `{ "id", "eq": [a, b, c, d] }` for ax + by + cz = d (move the
  constant to the right: x − 3y + 4z − 6 = 0 is [1, −3, 4, 6]), plus `"label"?`.
- `derived` (the scene computes these; never type their coordinates as points):
  - `{ "id", "kind": "foot", "from": pointId, "to": lineId or planeId }`
  - `{ "id", "kind": "image", "of": pointId, "in": planeId }`
  - `{ "id", "kind": "meet", "line": lineId, "plane": planeId }`
  Derived points can then be used anywhere a point can.
- `segments`: `{ "from": pointId, "to": pointId, "label"? }`, drawn dashed.
- `view` (optional): `{ "az": degrees, "el": degrees }`. Leave it out: the
  scene picks the view that shows the planes face-on and the answer clearly.
- `ask`, one of (each may carry a plain `"label"` for the header, at most 32
  characters, such as `"shortest distance = 3√30"`):
  - `{ "kind": "distance", "from": id, "to": id }`: any two of point, line, plane.
  - `{ "kind": "angle", "between": [id, id] }`: lines and planes; the value is
    the acute angle in RADIANS (π/6 is 0.52359878).
  - `{ "kind": "projection", "from": pointId, "to": pointId, "onto": planeId }`
  - `{ "kind": "coord", "point": pointId, "axis": "x" | "y" | "z" }`
  Any ask may also carry `"squared": true` and/or `"times": k` when the KEY is
  the measured value squared or multiplied ("d²" is `squared: true`).

### steps

Each question shows its solution as numbered sentences `[0] [1] ...`. A step
names the sentence it starts at (`from`) and the beats it plays. The first
step starts at 0, later steps start later, every step has at least one beat,
and each beat is used at most once. Beats: `given`, `derived`, `construct`
(each shows the objects of that beat, one after another), `answer` (marks the
measured length, angle or projection and shows the header). Play every beat
your objects use, and always end with `answer`. A short solution can be one
step with several beats.

### answer

- `value`: the keyed number (3√30 as 16.43167673; an angle in radians).
- `label`: how the answer reads, plain text, at most 32 characters.

## Rules

- Use the question's own numbers. Never change the problem to make it fit.
- If the keyed option is not what your picture gives, SKIP with the reason:
  never invent a different answer.
- Read only your input file, write only your output file (a JSON array, one
  object per question, input order), run nothing. Keep messages short: when
  done, reply in one line with how many drafted and how many skipped.

## Two more finished examples

Skew lines, MHT-CET "the shortest distance between (x − 3)/3 = (y − 8)/(−1) =
(z − 3)/1 and (x + 3)/(−3) = (y + 7)/2 = (z − 6)/4", sentences [0] cross product,
[1] dot product 270, [2] distance 3√30:

```json
{ "params": { "lines": [{ "id": "L1", "point": [3, 8, 3], "dir": [3, -1, 1], "label": "L₁" },
                        { "id": "L2", "point": [-3, -7, 6], "dir": [-3, 2, 4], "label": "L₂" }],
    "ask": { "kind": "distance", "from": "L1", "to": "L2", "label": "shortest distance = 3√30" } },
  "steps": [{ "from": 0, "beats": ["given"] }, { "from": 2, "beats": ["answer"] }],
  "answer": { "value": 16.43167673, "label": "3√30" } }
```

Projection, MHT-CET "the projection of the segment joining (5, −1, 4) and
(4, −1, 3) on the plane x + y + z = 7":

```json
{ "params": { "points": [{ "id": "A", "at": [5, -1, 4], "label": "A(5, −1, 4)" }, { "id": "B", "at": [4, -1, 3], "label": "B(4, −1, 3)" }],
    "planes": [{ "id": "P", "eq": [1, 1, 1, 7], "label": "x + y + z = 7", "beat": "derived" }],
    "segments": [{ "from": "A", "to": "B", "beat": "given" }],
    "ask": { "kind": "projection", "from": "A", "to": "B", "onto": "P", "label": "projection = √(2/3)" } },
  "steps": [{ "from": 0, "beats": ["given"] }, { "from": 1, "beats": ["derived"] }, { "from": 2, "beats": ["answer"] }],
  "answer": { "value": 0.81649658, "label": "√(2/3)" } }
```

## Also: does the question need a picture it does not have?

Set `"figureNeeded"` on every object: `"none"`, or `"stem"` / `"options"` when the
question cannot be FULLY answered without a picture it does not have. Add
`"figureNote"` (at most 12 words) saying what is missing.

## Also: is the stored solution wrong?

Set `"solutionWrong"` on every object: `"none"`, or at most 20 words saying
what is false in the solution, even if it still reaches the keyed answer. Do not
report terse or badly worded solutions, only false ones. A wrongly solved
question is SKIPPED (reason "solution wrong"): its solution is corrected first,
and the visual is drafted afterwards against the corrected sentences. If the KEY
itself looks wrong, or the question cannot be answered as printed, say so in
`solutionWrong` and skip.
