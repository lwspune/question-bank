# Draft brief: SSC CGL Mathematical Operations, Mensuration 3D, Data Interpretation

Read first, in full: algebra-draft.md, sketch-fit.md, sketch-draft.md (with its
end checklist) and sketch-bar.md, all in this folder. This brief only says
which picture each chapter gets and what is different. Each question gets
exactly one of: an algebra-steps draft, a sketch draft, or a skip.

## Output: three files per slice

- `slice-K.algebra.json`: algebra-steps drafts, in input order (the format of
  algebra-draft.md, plus `"option"`: the key's letter).
- `slice-K.sketch.json`: sketch drafts, in input order (the format of
  sketch-draft.md, plus `"option"`).
- `slice-K.skip.json`: `[{ "n", "id", "reason" }]` for every question you skip.

Every input question appears in exactly one file. Write all three (an empty
list `[]` when none), with json.dump from real strings.

## Mathematical Operations: algebra steps

"If + means x and x means -, find 8 + 4 x 2", "if 5 * 2 = 35, find 6 * 4".
Line 1 (`note`, or `calc` when it computes) shows the expression with the
symbols swapped; the next lines work it out in the order BODMAS takes it,
each a `calc` whose `f` is that line's arithmetic. For a rule found from
examples, a line per example showing the rule gives its printed result, then
the asked case. The `note` names the step ("swap: + becomes x", "÷ first").

Skip when the solution says two rules fit the examples and it follows SSC's
key: the animation would present one guess as the rule. Skip a "which
interchange makes it true" question that tests options one by one with no
working worth stepping through (say so).

## Mensuration 3D: algebra steps, a cross-section only where it explains

The working is formulas: volume, surface area, ratios of solids, melting one
solid into others. Algebra steps: the formula with the question's numbers,
then each step, `calc`-checked (pi is `pi`; write 22/7 when the solution
does). A sketch only when the solution reasons from a flat section a teacher
would draw: a cone or sphere inside a cylinder or cube seen side-on, the
slant height as the hypotenuse of a right triangle (r, h, l), a cube's face
diagonal. Then the section is the sketch, with `assert` for the relation the
solution uses (`l^2 = r^2 + h^2`). Never draw a 3D solid as a flat shape that
looks like something else.

## Data Interpretation: read the table, never invent a value

Each question shows `stemImage: true` when its chart or table is a picture you
cannot see. Then you have only the numbers the solution quotes: algebra steps
only, using exactly those numbers. Never draw a chart from an image you cannot
see.

When the data is a table in the text (`|---|` rows), you may draw a bar chart
with sketch: only the bars the solution uses (at most 8), each a rectangle of
its real value on a shared scale var, labelled with its value above it and its
name below it (labels clear of every bar edge, per sketch-bar.md), and a
dashed line for an average or a threshold the solution compares against. The
answer is the value that settles it; `answer.label` names it ("Hyderabad: 175
< 180"). Otherwise algebra steps.

A question whose answer is a name (a city, a year, a company): the answer
`value` is the number that settles it, the label says the name.

## Check before you hand it back

From the worktree root, C:\Users\vilas\Downloads\qb-visuals9:

    npx tsx scripts/visuals/tools/check-drafts.ts --scene=algebraSteps <slice-K.algebra.json>
    npx tsx scripts/visuals/tools/check-drafts.ts --scene=sketch <slice-K.sketch.json>

Fix every line they print. Read only your input, the briefs and the scene
sources; write only your three files (plus small throwaway helpers named
slice-K-*.py next to them). Never touch the database or git. Keep tool
output small.
