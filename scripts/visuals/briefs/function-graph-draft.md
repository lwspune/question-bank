# Draft brief: write a function-graph animated solution

Each question you get has been judged to fit the **function-graph** scene. You
write the scene's settings (`params`), which solution sentences each step
covers (`steps`) and the answer the picture must reproduce (`answer`). A
program then draws it, works the answer out from your formula, and refuses it
if the two disagree; a person looks at every picture before it goes live. So
be exact, and skip anything that does not fit cleanly.

## What you write, per question

```json
{
  "n": 7, "id": "<id>", "skip": false,
  "params": {
    "f": "sin(x)^4+cos(x)^4",
    "fLabel": "y = sin⁴x + cos⁴x",
    "window": { "x": [0, 3.14159265], "y": [0.35, 1.1] },
    "xTicks": "pi",
    "ask": { "kind": "increasingOn", "interval": [0.78539816, 1.57079633], "intervalLabel": "π/4 < x < π/2" }
  },
  "steps": [{ "from": 0, "beats": ["curve"] }, { "from": 1, "beats": ["shade"] }],
  "answer": { "value": 1, "label": "rising on π/4 < x < π/2" }
}
```

Or, when it does not fit cleanly: `{ "n": 7, "id": "<id>", "skip": true, "reason": "asks for the maximum value" }`.

### params

- `f`: the function, in this formula language ONLY: numbers, `x`, `pi`, `e`,
  `+ - * / ^`, brackets, and `sin cos tan asin acos atan exp log ln log10 sqrt
  abs`. `log` is the natural log. Always write `*` (`2*x`, never `2x`). Write
  `sin(x)^2`, not `sin^2(x)`. At most 120 characters.
- `fLabel`: how the curve is labelled on the picture, plain text with Unicode
  (²  ³  ⁴  π  √  −  ·). No LaTeX, no backslashes. At most 32 characters.
- `g`, `gLabels` (crossings only): the other side of the equation as formulas
  (a constant like `"10"` or `"3/4"` draws a line), with short plain labels.
  Up to 4.
- `window`: `x` and `y` ranges, numbers only (write π as 3.14159265). Choose
  them so everything the solution talks about is visible and the curve fills
  the frame. For crossings, `x` must be exactly the interval the question
  gives, since the count is taken over the window.
- `xTicks`: `"pi"` when x is an angle, else leave it out.
- `ask`, one of:
  - `{ "kind": "crossings" }`: answer = the number of solutions. A repeated
    root, where the curve only touches the line, counts once.
  - `{ "kind": "slopePoint", "slope": <tangent slope>, "normal": true|false, "pointLabel": "(e⁻², −2e⁻²)" }`:
    give the TANGENT's slope (if the question fixes the normal's slope m, the
    tangent's is −1/m) and `normal: true` when the question is about the
    normal. The window must contain exactly one such point. Answer = its x.
  - `{ "kind": "slopePoints", "slope": <tangent slope>, "normal": true|false, "report": "count" | "sumX" | "sumY", "pointLabels": ["(2, −16/3)", "(−2, 16/3)"] }`:
    when SEVERAL points have that slope (the key lists two points, or asks
    for the sum of their x or y). The window must contain all of them and no
    others. Answer = how many (`count`), or the sum of their x (`sumX`) or y
    (`sumY`). `pointLabels` in left-to-right order.
  - `{ "kind": "increasingOn" | "decreasingOn", "interval": [a, b], "intervalLabel": "π/4 < x < π/2" }`:
    the KEYED option's interval. Answer value = 1.
  - For a keyed UNION of intervals ("x < −1 or x > 2"), give `"intervals": [[a, b], [c, d]]`
    instead of `interval` (at most 3 pieces, in order, not overlapping, each
    inside the window; cut an infinite end at the window's edge) and an
    `intervalLabel` for the whole union (at most 32 characters). Answer value = 1.
    A key that gives BOTH an increasing and a decreasing interval: draft the
    increasing part only, and say so in the answer label.
  - `{ "kind": "extrema", "scope": "local", "expect": [{ "type": "max", "x": -1, "y": 2 }, { "type": "min", "x": 1, "y": -2 }] }`:
    the curve's local maxima and minima. List EVERY local max and min the
    window shows (the scene finds them itself, where f' changes sign, and
    refuses the visual unless your list matches exactly, so choose the window
    to hold exactly the ones the solution names). x and y as decimals (1/3 =
    0.333333333333; √2 = 1.414213562373). Answer value = 0.
  - `{ "kind": "extrema", "scope": "absolute", "on": [a, b], "expect": [{ "type": "max", "x": 3, "y": 18 }, { "type": "min", "x": 1, "y": -2 }] }`:
    the greatest and/or least value of f on the closed interval [a, b]
    (endpoints count). Give only the one(s) the question asks; `x` may be left
    out when the answer is only the value. `on` must lie inside the window;
    leave room round it. Answer value = 0.
    A word problem (largest area, least cost) fits when the solution reduces
    it to ONE function of one variable on a stated interval: f is that
    function (in the solution's own variable, written as x), `on` its domain,
    and the answer the max or min the solution concludes. If the question's
    answer is the dimension (the x), give x; if it is the area, give y.
  - `pointLabels` (extrema): optional, one label per marked point, left to
    right ("max (−1, 2)" is the default).
  - `{ "kind": "roots", "expect": [1, 2] }`: the zeros of f, each dropped
    onto the x-axis with its value. List EVERY real zero the window shows,
    1 to 4 of them, as decimals (√3 = 1.732050807569); the scene finds the
    zeros itself and refuses the visual unless your list matches exactly. A
    double root (the curve touches the axis) is listed once. Leave `g` out, and
    give a y range that runs below and above 0. Answer value = 0.
    `report: "sum"` or `"product"` (default `"roots"`): the answer is the sum
    or the product of the zeros instead, and value is that number.
    `withSumProduct: true` adds the zeros' sum and product to the header (for
    "find the zeros and verify the relationship with the coefficients"); the
    scene computes them, never type them.
    Fits only when f is fully numeric (no k, no α, β left in it). It does not
    fit: complex zeros, an expression of the zeros (α² + β², 1/α + 1/β),
    forming a polynomial from given zeros, or a word problem whose answer is
    not a zero.
  - `rootLabels` (roots): optional, one label per zero, left to right
    ("x = 1.5" is the default; write "x = (3 − √3)/2" for an irrational zero,
    "x = −2/3" for a fraction).

### steps

Each question shows its solution as numbered sentences `[0] [1] ...`. A step
names the sentence it starts at (`from`) and the beats it plays. The first
step starts at 0, later steps start later, every step has at least one beat,
and each beat is used at most once. Beats:

- `curve`: draw f. `compare`: draw g (crossings). `mark`: count the crossings
  (crossings) or mark the point(s) (slopePoint, slopePoints). `tangent`: slide a
  tangent along the curve to the point, or sweep it across past every point
  (slopePoint, slopePoints). `shade`: shade where f rises or falls
  (increasingOn / decreasingOn). Extrema use `curve` and `mark` (the marked
  maxima and minima). Roots use `curve` and `mark` (the zeros, one by one).

Match the beats to what each sentence says. A trailing "Matches option X"
sentence needs no step of its own.

### answer

- `value`: a number, as above (count, x of the point, 1, 0 for extrema and
  roots, or the sum or product for a roots `report`).
- `label`: how the answer reads, plain text, at most 32 characters.

## Rules

- Use the question's own numbers. Never change the problem to make it fit.
- If the keyed option is not what your picture gives, SKIP with the reason:
  never invent a different answer.
- Read only your input file, write only your output file (a JSON array, one
  object per question, input order), run nothing. Keep messages short: when
  done, reply in one line with how many drafted and how many skipped.

## Three finished examples

Crossings, MHT-CET "number of solutions of 16^(sin²x) + 16^(cos²x) = 10 in
[0, 2π]", solution sentences [0] substitution gives m = 8 or 2, [1] sin²x = 3/4
or 1/4, 4 solutions each, [2] total 8, [3] matches D:

```json
{ "params": { "f": "sin(x)^2", "fLabel": "y = sin²x", "g": ["3/4", "1/4"], "gLabels": ["3/4", "1/4"],
    "window": { "x": [0, 6.28318531], "y": [-0.1, 1.15] }, "xTicks": "pi", "ask": { "kind": "crossings" } },
  "steps": [{ "from": 0, "beats": ["curve", "compare"] }, { "from": 1, "beats": ["mark"] }],
  "answer": { "value": 8, "label": "8" } }
```

slopePoint, "point on y = x log x where the normal is parallel to 2x − 2y = 3"
(normal slope 1, so tangent slope −1), sentences [0] y′ = 1 + log x, [1] normal
slope 1, [2] so x = e⁻², [3] matches D:

```json
{ "params": { "f": "x*log(x)", "fLabel": "y = x log x", "window": { "x": [0, 1.4], "y": [-0.6, 0.6] },
    "ask": { "kind": "slopePoint", "slope": -1, "normal": true, "pointLabel": "(e⁻², −2e⁻²)" } },
  "steps": [{ "from": 0, "beats": ["curve"] }, { "from": 1, "beats": ["tangent"] }, { "from": 2, "beats": ["mark"] }],
  "answer": { "value": 0.13533528, "label": "x = e⁻²" } }
```

increasingOn: the example at the top of this brief (sin⁴x + cos⁴x, keyed
option π/4 < x < π/2).

## Also: does the question need a picture it does not have?

Each question shows `stemImage` (true when a picture is attached to the
question) and marks options that carry a picture with `[IMAGE]`. Add
`"figureNeeded"` to every object: `"none"`, or `"stem"` / `"options"` when the
question cannot be FULLY answered without a picture it does not have (it says
"as shown in the figure" and there is no picture; the options are diagrams
with no image; a needed graph or circuit is missing). Add `"figureNote"` (at
most 12 words) saying what is missing. A question that merely could use a
picture, but is complete as written, is `"none"`.
