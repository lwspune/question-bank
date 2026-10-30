# Draft brief: bar models (arithmetic drawn with the sketch scene)

Read first, in full: sketch-fit.md, sketch-draft.md (with its end checklist)
and algebra-draft.md. Output files and format are exactly as they say; your
task names the input slices and where to write.

## What is new here: the bar model

Percentage, profit and loss questions are arithmetic, but most of them have a
picture a good teacher would draw on the board: a **bar model**. A bar stands
for a quantity (cost price, the original number, a salary); it is cut into
equal or labelled parts; a second bar shows the changed quantity (selling
price, the new number), longer or shorter by the part that changed. The
student SEES that a 20% loss is one fifth of the bar gone, that successive
discounts shrink a shrinking bar, that "x% more than" and "x% less than" are
measured against different bars.

Draw it with the sketch tool you already have:

- Each bar is a `polygon` of 4 points (a rectangle). A part of a bar is its
  own rectangle drawn on top in another `tone`. Dividers between equal parts
  are `segment`s.
- Pick a scale var so bars fit the view: e.g. `"k": "10/CP"` and a bar of
  value v has length `v*k`. Bars are about 1 unit tall, 1 unit apart; the view
  is roughly x [-1, 13], y [-4, 6] (near 4:3), widened as needed. Every point
  is a formula of the vars, as always.
- Labels carry the REAL values, never the scaled lengths: "CP = ₹{CP}",
  "loss 20% = ₹{L}", "SP = ₹{SP}". Name each bar at its left end, a part's
  value above or inside the part; the answer label last, in a free corner or
  in the column below the bars.
- `assert` what the picture claims: parts add up to the whole
  (`a + b = CP`), the changed bar is the right fraction of the first
  (`SP = CP*(1 - 20/100)`), two bars are equal where the solution says so.
- Steps follow the solution's sentences: bar 1 first, the change next, the
  answer last.
- **Labels never sit on a bar's outline** (owner, 2026-10-30: a line through
  the text reads as struck out). A part's value goes INSIDE its rectangle, centred vertically
  (y = the bar's middle), only when the part is wide enough for the text
  (measure it with the numbers under "Where a label really lands"); otherwise ABOVE
  the bar, at least 0.35 units clear of its top edge. A bar's name goes above
  the bar, at its left end, also 0.35 units clear. Leave about 1.4 units
  between one bar's bottom and the next bar's name. Do not attach a label to
  a segment or polygon item (no `label` on the bar itself): use free `label`
  items placed as above.

Use a bar model when the solution compares quantities, takes a part of a
whole, or chains changes (successive percentages, marked price → discount →
selling price, two articles sold at a gain and a loss). Choose `algebra` when
the working is a formula chain with no part-whole structure to show (a long
fraction simplification, "find x" from an equation), and `none` for a recall
fact. A question with several unknown amounts where the picture would need
invented numbers: algebra.

`situation` words for this chapter: barPercent, barProfitLoss,
barSuccessive, barDiscount, barCompare, barMixture (or a new word).

## Other arithmetic chapters (same idea, same tool)

- Ratio, proportion: one bar per quantity, cut into its ratio's equal parts
  (3 : 5 = 3 parts and 5 parts of the same width); the part's value once known.
- Averages: bars of the values side by side (vertical bars are fine), a
  dashed line at the average; what is above it fills what is below.
- Time and work: one bar = the whole work, cut into the LCM's units; each
  worker's daily share as a coloured block; days = bar / share.
- Simple and compound interest: the principal bar, then each year's interest
  added as a block (compound: each new block on the grown bar).
- Time, speed and distance: a track (a segment) with the two movers as
  points and arrows, distances labelled; meeting point or gap as the answer.
  Trains: the train as a short bar crossing a pole or a platform bar.
- `situation` words: add barRatio, barAverage, barWork, barInterest, track,
  trainCrossing (or a new word for a new kind).

## Where a label really lands (the renderer's own numbers; check every label with them)

The picture is
340 x 260 px, padding 14:

    k  = min(312 / (xb - xa), 232 / (yb - ya))        px per view unit
    ox = (340 - k*(xb - xa)) / 2 ;  oy = (260 - k*(yb - ya)) / 2
    X(x) = ox + (x - xa)*k ;        Y(y) = 260 - oy - (y - ya)*k   (screen y grows DOWN)

A `label` item is 13 px bold, drawn at (X + dx, Y + dy) with its anchor:
n (0, -9, middle) · s (0, 16, middle) · e (8, 4, start) · w (-8, 4, end) ·
ne (6, -7, start) · nw (-6, -7, end) · se (6, 15, start) · sw (-6, 15, end).
A point's label or a `labelAt` label is the same at 12 px.
Its box: width = characters x size x 0.56 (13 px: 7.3 px a character),
top = text y - size, bottom = text y + 3, left/right from the anchor.

The rule the review applies: **no label box may cross a polygon edge or a
segment** (keep 2 px clear of every bar outline and divider). A part label
INSIDE a bar: pos "e" at the bar's middle y, x = the part's centre minus
(half the text width + 8 px), in view units (px / k), so the box is centred in the
part; it fits only when the bar is at least 20 px tall on screen and the
part is wider than the text + 6 px. Otherwise put it ABOVE the bar with its
box bottom at least 3 px above the bar's top edge.

Two labels must never touch either: the renderer then MOVES the later one
up or down by 16, 32 or 48 px, straight onto a bar. Check label against
label as well as label against line.

The review runs `node scripts/visuals/tools/label-overlap.js <batch>
--edges` on every batch; a hit is sent back.

## Also (SSC arithmetic wave 1, 2026-10-31)

- Generate the files with json.dump from real strings (a lost JSON escape
  turns \t \f \b into control characters). Never name a var x, y, e or pi
  (call them xv, yv, ev), and rename it inside `{...}` label text too.

- `{var}` prints a fraction when the value is one ("225/4%"). Where the key
  is a decimal or a mixed number, write the label as that text ("56.25%",
  "14 2/7%"), not the var.
- A rupee sign only on money: votes, marks, people and litres take none, in
  the bar labels and in `answer.label` alike.
- One step per solution sentence at most: a 3-sentence solution has at most
  3 steps (merge beats into one step).
- A label under a bar needs the same 2 px clearance as one above it: text
  sitting on the bar's bottom edge reads as struck through.
- Builders that compute every label box from the numbers above came back
  clean; builders that guessed a width per character did not (wave 1: 45 of
  131 sketches with a label on a line before the fix, 0 after).
