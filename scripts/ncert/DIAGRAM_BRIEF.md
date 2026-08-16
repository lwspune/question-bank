# NCERT (CBSE Class 12) — solution-diagram authoring brief

You author the DATA for a chapter's model-answer diagrams. A Python renderer
(`scripts/ncert/render_solution_diagrams.py`) turns your JSON into PNGs; you never draw
anything yourself and you never write Python.

Two chapters get diagrams, and only two, because in both the figure carries the answer:

| chapter | what the diagram is |
|---|---|
| `appIntegrals` | the shaded AREA REGION whose value the question asks for |
| `linearProgramming` | the FEASIBLE REGION and its corner points |

Every other Class 12 Maths chapter ships without one. These attach to
`questions.solution_image_url` — the **model-answer** figure, shown only when a student
reveals the answer. That is a different channel from `image_url` (a figure printed in the
book that the QUESTION needs), and the two must never be confused: nothing you author here
may be required to understand the question.

## Input

The chapter's TRANSCRIPTION: `scripts/ncert/data/<chapterId>.questions.json`, or the band
fragments `<chapterId>.<band>.json` it is merged from. Your task message names the file.

You work off the transcription, NOT the database — `ref` is assigned at transcription time
and never changes, so diagram authoring can run in parallel with the commit and the
solution authoring. Nothing here needs a question id.

The transcription also recorded a `_region` (appIntegrals) or `_lpp` (linearProgramming)
field per question; read it as a starting point, but **the STEM is the authority** —
`_region`/`_lpp` were transcribed without solving and may be loose.

## Output → `scripts/ncert/data/<chapterId>.diagram-specs.<group>.json`

A JSON array. `ref` must be copied VERBATIM from the input row — it is what
`attach-solution-image.ts` looks the question up by, and a ref that matches nothing is
reported as a missing row rather than an error. A ref authored twice across part-files is
a hard failure, so stay inside your assigned group.

```jsonc
{
  "ref": "Ex 8.1 Q3",
  "xr": [-0.5, 5],                 // x viewport [min,max] — leave visible margin
  "yr": [-0.5, 4],                 // y viewport
  "caption": "area bounded by y = x^2, x = 1, x = 2 and the x-axis",
  "curves":  [{"expr":"x**2", "dom":[-0.3,2.4], "label":"y=x^2", "color":"blue"}],
  "shade":   [{"dom":[1,2], "hi":"x**2", "lo":"0"}],
  "lines":   [{"A":1,"B":0,"C":-1, "label":"x=1", "color":"gray", "dashed":true}],
  "points":  [{"x":2,"y":4, "label":"(2,4)", "dx":8, "dy":-18}]
}
```

Every key except `ref`/`xr`/`yr` is optional. The full vocabulary:

| key | meaning |
|---|---|
| `curves` | `y = f(x)` over `dom:[a,b]`. `expr` is a **Python** expression in `x` — `x**2`, `np.sqrt(x)`, `np.sin(x)`, `np.exp(x)`. NOT LaTeX. |
| `conics` | circle/ellipse/arc: `{cx,cy,r}` or `{cx,cy,a,b}`, optional `t0`/`t1` in DEGREES for an arc |
| `lines` | the INFINITE line `A x + B y + C = 0`, clipped to the viewport |
| `segments` | a FINITE segment `{x1,y1,x2,y2}` |
| `shade` | area between two curves: `{dom:[a,b], hi:"<expr>", lo:"<expr>"}`. Both are Python expressions; use `"0"` for the x-axis. |
| `shade_polys` | fill-only polygons, `[[[x,y],…]]` — for a region with straight edges |
| `constraints` | LP only: `{A,B,op,C}` for `A x + B y  op  C`, `op` one of `"<="`, `">="`. The renderer shades the intersection. |
| `points` | `{x,y,label,dx,dy}` — `dx`/`dy` nudge the label in pixels (`dy` negative = above) |
| `equal_aspect` | default **false**. Set true only when a circle must render circular. |
| `axes` | default true. |

Colours are names: `blue` `red` `green` `purple` `gray`.

## Rules that decide whether the diagram is right

1. **Draw the region the question asks about, not the whole picture.** If the stem bounds
   the region by `x = 1` and `x = 2`, the shade `dom` is `[1,2]` — even though the curve
   itself should be drawn a little wider so it reads as a curve.
2. **Do not put the ANSWER in the diagram.** Label the bounding curves and the corner or
   intersection points; do not write the computed area or the optimum value anywhere. The
   student is revealing a worked solution, and the diagram accompanies it — it does not
   replace the working.
3. **Every point you label must actually lie on what you say it lies on.** A corner point
   of an LP feasible region must satisfy its two constraint equations exactly; an
   intersection point must satisfy both curves. Compute them; do not eyeball them.
4. **Choose the viewport from the region**, with roughly 10-20% margin. A region living in
   `0 ≤ x ≤ 4` inside a viewport of `[-10,10]` renders as an unreadable smudge.
5. **A region unbounded in the stem stays unbounded in the picture** — clip it at the
   viewport edge rather than inventing a bounding line that closes it. Two LP questions in
   this chapter have no maximum precisely because the region is unbounded, and a diagram
   that quietly closes the region contradicts its own answer.
6. `polys` are drawn AFTER `segments`, so a closed poly OVERDRAWS a coloured segment
   sharing that edge and the label then names a colour that is not on screen. To highlight
   individual edges, draw them all as `segments` and skip the poly.

7. **A LINE LABEL IS DRAWN *ON* ITS OWN LINE, SO A SHALLOW LINE STRIKES THROUGH ITS OWN
   TEXT — AND A STRUCK `+` READS AS `−`.** This is not cosmetic: `x + 2y = 6` renders as
   `x - 2y = 6`, i.e. the diagram silently contradicts the constraint it is labelling. It
   hit **13 of 15 panels** on the Linear Programming chapter before anyone noticed, and it
   is invisible in a montage — you have to open a single panel at full size. The renderer
   places a line label at the line's topmost viewport-border point with a fixed few-pixel
   offset, and there is no `dx`/`dy` for line labels (unlike `points`), so **the only lever
   is padding the label string with leading spaces** to slide it along the line past the
   strike zone. That is also where a textbook puts it. Two related fixes from the same run:
   putting the left viewport edge exactly on the y-axis (`xr[0] = 0`) stops the y-axis
   striking labels too and returns the margin to the region — except where two constraint
   lines share a y-intercept, in which case their labels would collide and a wide left
   margin is the lesser evil. **After fixing, check that every remaining strike-through is
   a genuine minus sign.**

## Verify before you finish

Render your own file and LOOK AT IT:

```
python scripts/ncert/render_solution_diagrams.py <chapterId>
```

then Read `scripts/ncert/out/<chapterId>-diagrams/_montage.png` with the Read tool. This
is not optional. Geometry that is internally consistent can still be **wrong** — a region
shaded on the far side of a curve, a corner point sitting off its own constraint line, a
viewport that clips the very region being measured — and no check in the renderer can see
any of it. If a diagram is wrong, fix the spec and re-render.

Note the renderer reads ALL of `<chapterId>.diagram-specs*.json`, so a render will include
other agents' part-files too. Only judge your own refs; leave theirs alone.

## Escaping

Write the file with the **Write tool**, never a shell heredoc. There is no LaTeX in these
specs — `expr` is Python — so backslashes should not appear at all. If you find yourself
writing one, you are probably putting LaTeX in an `expr`, which will not render.

Final message: how many specs you wrote, which refs, confirmation that you rendered and
VIEWED the montage, and anything you could not express in the vocabulary above.
