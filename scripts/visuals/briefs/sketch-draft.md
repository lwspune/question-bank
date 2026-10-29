# Draft brief: write a sketch (a one-question animated solution)

Each question you get was judged to need a picture that no shared scene can
draw. You build that picture from computed objects, step by step beside the
stored solution. A program draws it, checks every fact you state and the
answer against the key, and refuses it if anything disagrees; a person looks at
every frame before it goes live. Be exact, keep it simple, and skip anything
you cannot draw honestly.

## What you write, per question

```json
{
  "n": 4, "id": "<id>", "skip": false,
  "params": {
    "vars": { "m": "2*exp(0)", "c": "exp(0)", "ax": "-c/m", "by": "c", "area": "abs(ax)*by/2" },
    "view": { "x": [-1.6, 1.4], "y": [-0.5, 2.6] },
    "axes": true,
    "points": { "O": [0, 0], "A": ["ax", 0], "B": [0, "by"] },
    "items": [
      { "kind": "curve", "f": "exp(2*x)", "x": [-1.6, 0.47], "step": "s1", "label": "y = e²ˣ", "labelAt": [-1.5, 0.15], "pos": "n" },
      { "kind": "point", "at": "B", "step": "s1", "label": "P(0, 1)", "pos": "nw" },
      { "kind": "line", "through": ["A", "B"], "step": "s2", "label": "y = 2x + 1", "labelAt": [0.55, 2.1], "pos": "e" },
      { "kind": "point", "at": "A", "step": "s3", "label": "A(−1/2, 0)", "pos": "sw" },
      { "kind": "polygon", "points": ["O", "A", "B"], "step": "s3" },
      { "kind": "label", "at": [-1.55, 2.3], "text": "area of OAB = {area}", "step": "s3", "tone": "good" }
    ],
    "assert": ["by = exp(2*0)", "m*ax + c = 0"],
    "answer": "area"
  },
  "steps": [{ "from": 0, "beats": ["s1", "s2"] }, { "from": 1, "beats": ["s3"] }],
  "answer": { "value": 0.25, "label": "1/4" },
  "figureNeeded": "none"
}
```

That is the real MHT-CET question "the tangent to y = e^(2x) at P(0, 1) cuts
the axes at A and B; area of OAB", solution sentences [0] slope 2, tangent
y = 2x + 1, [1] A(−1/2, 0), B(0, 1), area 1/4, keyed option 1/4.

Or, when it cannot be drawn honestly: `{ "n": 4, "id": "<id>", "skip": true, "reason": "..." }`.

### params

- `vars`: named numbers in order; each is a number or a formula of the ones
  BEFORE it. Names: lowercase letters and digits, up to 12, not x, pi, e or a
  function name. Formulas: + - * / ^ ( ), numbers, pi, e, and sin cos tan asin
  acos atan exp log (natural) ln log10 sqrt abs deg rad, atan2(y, x), min(a, b),
  max(a, b). Always write `*` (2*x, not 2x). Angles inside sin/cos are radians;
  `rad(30)` converts. Put EVERY number that matters in vars, computed from the
  question's givens, not typed as a decimal you worked out.
- `view`: the window in maths coordinates, `x` and `y` ranges. One unit is the
  same length on both axes, so pick a window near 4:3 that holds everything.
- `axes`: true to draw the x and y axes (coordinate questions); leave out for a
  pure figure (a ladder, a triangle).
- `points`: capitalised names (A, B, P, Q1, O') with [x, y], each a number or a
  formula of the vars. Every point must lie inside the view.
- `items`, at most 40, each with `step` ("s1".."s8") and an optional `tone`
  ("fg", "muted", "brand", "amber", "good", "bad"):
  - `point`: `at` (a point name or [x, y]), `label`, `pos` (n s e w ne nw se sw).
  - `segment`, `arrow`: `from`, `to`; optional `label`, `labelAt` + `pos`, `dash: true`.
  - `line`: `through` [two points], drawn across the whole view.
  - `polygon`: `points` (3 to 12), shaded.
  - `circle`: `center`, `r` (formula); `arc`: also `from`, `to` in DEGREES, anticlockwise.
  - `angle`: `at` (the vertex), `from`, `to` (points on the two arms); a right
    angle draws as a small square; optional `label` ("θ", "90°").
  - `curve`: `f` (a formula in x, vars allowed), `x` [from, to] inside the view;
    optional `label` with `labelAt` + `pos`.
  - `label`: `at`, `text`; `{name}` or `{formula}` prints a var's value (as a
    fraction when it is one), e.g. "area = {area}".
- `assert`: up to 12 facts that must hold, "a = b", "a < b" or "a > b", each
  side a formula of the vars. State one for every construction a reader could
  get wrong: a point on a line or curve, a right angle (dot product 0), equal
  lengths, the tangent's slope. A fact that fails refuses the picture, which is
  the point: it catches your own slips.
- `answer`: a formula of the vars giving the keyed value.

### steps and answer

The solution shows as numbered sentences `[0] [1] ...`. A step names the
sentence it starts at (`from`) and the step names it plays (`beats`, e.g.
["s1", "s2"]). The first step starts at 0, later ones later, each step name
used once. Match what is drawn to what each sentence says: draw the set-up
first, then each object as the solution reaches it, the answer label last.
`answer.value` is the keyed value as a number; `answer.label` (at most 32
characters) how it reads.

## Rules

- Use the question's own numbers. Never change the problem to make it fit.
- If the keyed option is not what your picture gives, SKIP with the reason.
- Keep it small: the fewest objects that make the solution visible. Labels:
  short, plain text (no LaTeX), Unicode allowed (², √, θ, π, −). Put each label
  where it will not sit on a line or another label: `labelAt` for a line or
  curve's name, the answer label in an empty corner.
- A rate-of-change question: draw the set-up at the instant the question names
  (the ladder when its foot is 6 m out), with the answer as a label.
- No 3D, and nothing you would have to guess (a letter the question leaves
  free): skip.
- Read only your input, write only your output (a JSON array, one object per
  question, input order). Run nothing that touches the database or git. You
  may run small Python checks of your numbers. Keep tool output small.

## Also

Add `"figureNeeded"` ("none", or "stem" / "options" when the question cannot
be answered without a picture it does not have, with `"figureNote"`), and
`"solutionWrong"` ("none", or what is wrong with the stored solution or key).
