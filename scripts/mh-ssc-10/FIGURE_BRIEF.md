# MH-SSC-10 figure anchor-placement + crop brief

You place snapCrop anchors for the figure-bearing questions of ONE board paper,
crop them, self-verify, and report. A reviewer then montage-verifies every crop
before attach — so your job is to get each crop tight, complete, and leak-free.

## Inputs

- The paper's committed questions carry `hasFigure:true` + a `figureNote` (page +
  what the diagram is). Read `scripts/mh-ssc-10/data/<paperId>.questions.json` and
  collect every `{ref, figureNote}` with `hasFigure:true`.
- Rendered pages: `scripts/mh-ssc-10/out/<paperId>/p-NN.png` (the `figureNote` names
  the page, e.g. "p-05"). VIEW the page to place anchors.

## snapCrop anchors — how they work

snapCrop bounds the actual figure INK inside a coarse band, so you give FORGIVING
anchors, not exact pixels (all as fractions 0-1 of the page):
- `col`: `[x0, x1]` — the rough horizontal band the figure sits in (wide is fine;
  include side labels like "x + 4").
- `top`: a y-fraction in the WHITESPACE GAP just ABOVE the figure (must be a blank
  row — not on the stem text, not on the figure).
- `bottom`: a y-fraction in the WHITESPACE GAP just BELOW the figure (blank row —
  below the lowest figure ink/label, above the next text).
- `answerY`: the HARD ceiling — a y-fraction at/above where the NEXT text begins
  (the next sub-question / "P.T.O." / options). The crop can never dip below this,
  so nothing below the figure leaks in. **This is the one anchor you must get
  right** — set it just below the figure's lowest ink and ABOVE the next line.

CRITICAL sizing intuition: a figure spanning a wide `col` (say 0.5 of page width)
is only ~0.35 of page HEIGHT tall — don't assume it reaches far down the page.
Estimate the figure's bottom, then put `bottom`/`answerY` a little below it, NOT
near the page bottom. A too-low anchor sweeps the next line's text into the crop.

## Steps

1. Write `scripts/mh-ssc-10/data/<paperId>.figs.anchors.json` — an array of
   `{ "ref": "...", "page": N, "col": [x0,x1], "top": t, "bottom": b, "answerY": a }`
   (page is 0-based, matching the `p-NN` number). Use the Write tool.
2. Write `scripts/mh-ssc-10/data/<paperId>.figs.fig.json` — `[{ "ref": "..." }, …]`
   for the same refs (snap-crop fills in bbox+page).
3. `npx tsx scripts/mh-ssc-10/snap-crop.ts <paperId>` — dry-run; every figure must
   report `ok`. If one is `flagged`, its top/bottom isn't in a gap or answerY leaks
   — adjust and re-run until all `ok`.
4. `npx tsx scripts/mh-ssc-10/snap-crop.ts <paperId> --write` then
   `npx tsx scripts/mh-ssc-10/attach-images.ts <paperId>` (dry-run crop).
5. **VIEW every cropped PNG** in `scripts/mh-ssc-10/out/<paperId>-figs/fig-*.png`
   (Read each). Check: (a) the WHOLE figure is present — every vertex, label,
   arc, angle mark, and measurement (nothing clipped at any edge); (b) NO leak —
   no stem text above, no next-question / options / "P.T.O." text below. If a crop
   clips the figure, widen `col` or move `top`/`bottom` outward slightly. If it
   leaks text, LOWER `answerY` (and `bottom`). Re-run step 4 and re-view. Iterate
   until every crop is tight + complete + leak-free.
6. Do NOT run attach-images with `--apply` — the reviewer does that after
   montage-verifying. Report: the list of refs, each crop's final status (your
   assessment), and any figure you couldn't cleanly isolate (e.g. two figures
   share a row, or a label runs off the scan edge).

Report each ref with a one-line verdict ("complete + leak-free" / "issue: …").
