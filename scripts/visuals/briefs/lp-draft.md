# Draft brief: write a linear-programming animated solution

Each question you get has been judged to fit the **linear-programming** scene.
You write the scene's settings (`params`), which solution sentences each step
covers (`steps`) and the answer the picture must reproduce (`answer`). A
program works out the corners and the optimum from YOUR constraints and
refuses the visual if its answer differs from yours; a person looks at every
picture before it goes live. So copy the question exactly, and skip anything
that does not fit cleanly.

## What you write, per question

```json
{
  "n": 7, "id": "<id>", "skip": false,
  "params": {
    "window": { "x": [0, 14], "y": [0, 14] },
    "constraints": [
      { "a": 1, "b": 1, "op": "<=", "c": 12 },
      { "a": 2, "b": 1, "op": "<=", "c": 20 }
    ],
    "objective": { "a": 10, "b": 6, "label": "z = 10x + 6y" },
    "ask": { "kind": "maxAt", "at": [8, 4], "label": "max z = 104 at (8, 4)" }
  },
  "steps": [{ "from": 0, "beats": ["constraints", "region", "corners"] }, { "from": 1, "beats": ["sweep", "answer"] }],
  "answer": { "value": 1, "label": "(8, 4)" },
  "figureNeeded": "none",
  "solutionWrong": "none"
}
```

Or, when it does not fit cleanly: `{ "n": 7, "id": "<id>", "skip": true, "reason": "constraints only in the figure", "figureNeeded": "none", "solutionWrong": "none" }`.

### params

- `constraints`: every constraint the question gives EXCEPT x ≥ 0 and y ≥ 0,
  each as `{ "a", "b", "op": "<=" | ">=", "c" }` for a x + b y ≤ c or ≥ c.
  Move everything to that form first: "x ≥ 2y" is `{ a: 1, b: -2, op: ">=", c: 0 }`;
  "x ≤ 6" is `{ a: 1, b: 0, op: "<=", c: 6 }`; "0 ≤ y ≤ 3" gives just
  `{ a: 0, b: 1, op: "<=", c: 3 }` (y ≥ 0 is already there). At most 8.
  Each line is labelled with its equation automatically; give `"label"` (plain
  text, at most 24 characters) to change it, or `"label": ""` to hide it when
  the picture is crowded.
- `nonNegative`: leave it out (x, y ≥ 0 are added). Set `false` only when the
  question really has no x, y ≥ 0.
- `objective`: `{ "a", "b", "label"? }` for Z = a x + b y. A constant term in Z
  (Z = 3x + 2y + 5) does not fit: skip.
- `window`: `x` and `y` ranges, numbers only, starting at 0 for a first-quadrant
  problem, reaching a little past the largest corner. EVERY corner of the
  region must be inside the window or the visual is refused. For an unbounded
  region, make the window big enough to show its shape.
- `ask`, one of (each may carry a plain `"label"` for the header, at most 32
  characters):
  - `{ "kind": "max" }` / `{ "kind": "min" }`: answer value = the keyed value of Z.
  - `{ "kind": "range" }`: maximum minus minimum.
  - `{ "kind": "maxAt" | "minAt", "at": [x, y] }`: the keyed point; for a key
    naming two points, `"at": [[x1, y1], [x2, y2]]`. Answer value = 1.
  - `{ "kind": "maxCount" | "minCount" }`: answer value 1 when the key says one
    point (a unique optimum), 2 when it says "infinitely many" / "every point
    of an edge".

### steps

Each question shows its solution as numbered sentences `[0] [1] ...`. A step
names the sentence it starts at (`from`) and the beats it plays. The first
step starts at 0, later steps start later, every step has at least one beat,
and each beat is used at most once. Beats, in order: `constraints` (draw the
lines one by one), `region` (shade the feasible region), `corners` (mark the
corner points), `sweep` (slide the objective line to the optimum), `answer`
(mark the optimum and show the header). Always end with `answer`. A short
solution can be one or two steps with several beats.

### answer

- `value`: as above (the value of Z, or 1, or 1 / 2 for a count).
- `label`: how the answer reads, plain text, at most 32 characters.

## Rules

- Use the question's own numbers. Never change the problem to make it fit.
- If the keyed option is not what the constraints give, SKIP with the reason:
  never invent a different answer.
- Read only your input file, write only your output file (a JSON array, one
  object per question, input order), run nothing. Keep messages short: when
  done, reply in one line with how many drafted and how many skipped.

## Another finished example

Minimum, MHT-CET "minimum of Z = 4x + 6y subject to x + 2y ≥ 80, 3x + y ≥ 75,
x, y ≥ 0 is 254", sentences [0] corners (0, 75), (14, 33), (80, 0), [1] Z there
450, 254, 320, [2] minimum 254:

```json
{ "params": { "window": { "x": [0, 90], "y": [0, 85] },
    "constraints": [{ "a": 1, "b": 2, "op": ">=", "c": 80 }, { "a": 3, "b": 1, "op": ">=", "c": 75 }],
    "objective": { "a": 4, "b": 6, "label": "Z = 4x + 6y" },
    "ask": { "kind": "min", "label": "min Z = 254 at (14, 33)" } },
  "steps": [{ "from": 0, "beats": ["constraints", "region", "corners"] }, { "from": 1, "beats": ["sweep"] }, { "from": 2, "beats": ["answer"] }],
  "answer": { "value": 254, "label": "254" } }
```

## Also: does the question need a picture it does not have?

Set `"figureNeeded"` on every object: `"none"`, or `"stem"` / `"options"` when
the question cannot be FULLY answered without a picture it does not have. Add
`"figureNote"` (at most 12 words) saying what is missing.

## Also: is the stored solution wrong?

Set `"solutionWrong"` on every object: `"none"`, or at most 20 words saying
what is false in the solution (a wrong corner, a wrong Z value), even if it
still reaches the keyed answer. Only false steps, not terse ones. A wrongly
solved question is SKIPPED (reason "solution wrong"): its solution is corrected
first, and the visual is drafted afterwards.
