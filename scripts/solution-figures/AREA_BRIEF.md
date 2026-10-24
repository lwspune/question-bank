# Area figures: drafting brief

You draft **solution figures for area questions** (Application of Integrals and
its NDA / MHT-CET twins): the curves drawn exactly from the question's own
equations, the region shaded, the meeting points marked. The figure sits under
the written solution (`questions.solution_image_url`); the solution text is not
changed. **You never write to the database, never touch git, and never edit a
file in the repo.** You write one draft file and PNG previews in the scratch
folder you are given. The main session reads your draft, looks at every figure,
settles every dispute, and does all writes.

Keep tool output small: never print a whole JSON file or a PNG listing; look at
PNGs with the Read tool, one at a time.

## Input

A slice file: a list of questions, each `{ id, subtopic, kind, paper, format,
text, context, options, numericAnswer, solution, hasStemFigure }`. The option
marked `[KEY]` is the answer key; for `format: "numeric"` the key is
`numericAnswer`.

## Output

One file `<slice>.figures.json` in your scratch folder:

```json
{ "figures": [ { "key": "...", "ids": ["<question id>"], "draw": { ... }, "note": "..." } ],
  "skipped": [ { "id": "...", "reason": "..." } ],
  "disputes": [ { "id": "...", "reason": "..." } ] }
```

- `key`: a lowercase slug unique in your slice, prefixed with your slice name
  (`cet1-area-x2-line`). It names the PNG.
- `ids`: usually one. If two questions **in your slice** have the same stem
  **and** the same key, give them one figure with both ids.
- `note`: one line: the area and how you got it from the key (`A = 4/15 from 60A = 16`).
- `skipped`: a question that needs no figure (say why: "the question already
  shows the figure" when `hasStemFigure` is true and it shows the region; "not
  an area question"). Rare in these chapters.
- `disputes`: you could not make a region whose area matches the key. Do NOT
  force it (never pick a region because its area happens to match). Say what
  the question asks, what area you get, and why. The main session settles it.

## The finished example

`scripts/solution-figures/data/area-pilot.json` holds 21 approved figures. Copy
its style exactly. `scripts/solution-figures/draw.py` (its docstring) lists every
field of the `plot` kind.

## How each spec is built

```json
{ "kind": "plot", "size": [5, 4], "xlim": [a, b], "ylim": [c, d], "xlabel": "x", "ylabel": "y",
  "legend": "below", "ticks": "clean",
  "series": [ { "type": "function", "expr": "x**2", "domain": [a, b], "color": "#c2410c", "style": "-", "label": "$y=x^2$" } ],
  "fills": [ { "type": "between", "upper": "x+2", "lower": "x**2", "domain": [-1, 2], "color": "#1d4ed8", "alpha": 0.25 } ],
  "marks": [ { "at": [2, 4], "label": "$(2,4)$", "offset": [6, -6] } ],
  "labels": [],
  "check": { "area": "9/2" } }
```

- **Always** `"legend": "below"` and `"ticks": "clean"`.
- Curves: orange `#c2410c`, blue `#1d4ed8`, green `#15803d`, black `#111111`,
  grey `#6b7280` for a dashed boundary line (`vline`/`hline`, `"style": "--"`).
  Label each curve with its equation **in the form the question prints it**
  (`$y^2=8x$`, not `$y=\sqrt{8x}$`), in `$...$` mathtext.
- Expressions are numpy: `x**2`, `sqrt(x)`, `abs(x)`, `sin(x)`, `exp(x)`, `log(x)`,
  `pi`, `minimum(a, b)`, `maximum(a, b)`, `sign(x)`, `floor(x)`.
- **Fills** (blue, alpha 0.25): `between` (upper/lower in x over a domain),
  `betweenx` (right/left in y over a range, for sideways regions),
  `polygon`. Use `minimum`/`maximum` for a boundary that changes curve
  (`y <= 7` on top of `8 - x**2`: upper `minimum(8-x**2, 7)`), or split into
  several fills. Fills must not overlap.
- A sideways curve `x = f(y)` is `{"type": "function_y", "expr": "y**2/8", "range": [c, d]}`.
  A circle or ellipse is `parametric` (`"x": "2*cos(t)", "y": "2*sin(t)", "t": [0, 6.2832]`)
  with `"equal": true` and a squarer `size` (`[5, 5]`).
- **Marks** at the meeting points the solution uses, labelled with exact
  values (`$(\sqrt{3},15)$`, `$(\frac{2}{5},\frac{3}{5})$`), not decimals.
- Frame (`xlim`, `ylim`) the region with a little room; do not show far-off
  parts of curves that add nothing.
- **No clutter**: no curve the solution does not use, no explanatory text
  beyond a short region label (`$A_1$`, `$R_2$`) when the question names regions.
- **Every line drawn carries a label**, including a chord or a boundary
  `segment` the question names (`chord $AB$`, `$\frac{x}{3}+\frac{y}{2}=1$`).
- A mark label near the x-axis collides with the tick labels at the default
  offset: move it with `offset`.
- Two questions with the same stem but **different** keys (one asks for `a`,
  the other for `a - b`) get separate figures. A question that is not about an
  area (nothing to shade) goes in `skipped`.
- Write files with the Write tool, not shell heredocs: heredocs mangle backslashes.
- When two named regions **overlap** (one inside the other: S₁ and triangle OPQ,
  f(0) and f(1)), draw a `stack` of two captioned panels, each fill with its own
  `area`, rather than overlapping fills.
- A key of "None of these" gives no area to check: record a dispute.
- `sqrt(maximum(..., 0))` keeps a curve that ends on its own edge from turning
  into NaN (and the area check failing). Draw a curve only where it exists:
  `|y| = 1 - x^2` has no points past `|x| = 1`.
- A frame need not include the origin: an axis whose zero is off the frame
  sits at the frame's edge.

## The area check (mandatory)

Every figure carries the area its answer says the shaded region has:

- `"check": {"area": "<expr>"}` for the whole shading, e.g. `"12*sqrt(3)"`,
  `"2/3*(4*pi-3*sqrt(3))"`.
- When the question names two or more regions (R1 and R2, A1 and A2), shade each
  as its own fill (different colours: blue and orange or green) and give each
  fill its own `"area"`; then no `check` is needed.
- Get the area **from the key**: an option value, or `numericAnswer` turned back
  into the area (`60A = 16` gives `A = 4/15`; `alpha + beta = 73` with
  `A = alpha/beta` gives what the solution states). Write how in `note`.
- For a "find the constant" question, draw with the key's constant and check the
  area the question states.

`draw.py` measures the shaded area and **refuses** a figure that does not match.
A refusal means your region is wrong (or the key is): fix the region, or record
a dispute. Never loosen `tol`.

## Your loop, per question

1. Read the stem, the key and the solution. Work out the region.
2. Write the spec to `<scratch>/<key>.spec.json` and run
   `python scripts/solution-figures/draw.py --preview <scratch>/<key>.spec.json <scratch>/<key>.png`
   from `C:\Users\vilas\Downloads\qb-figures`. It prints the area when it passes.
3. **Look at the PNG.** Check: the shaded region is the one the question asks
   for; every curve and meeting point the solution uses is there; no label sits
   on a curve, a tick label or another label; the legend is readable. Move a
   label with its `offset` (points) until it is clear.
4. Add it to your draft file.

Phone width: the figure is shown about 350 px wide, so keep labels short and
leave the region large in the frame.
