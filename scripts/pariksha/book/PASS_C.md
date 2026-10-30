# Pass C: redraw a chapter's figures (agent brief)

A phone scan's figures are not cropped into the bank: every one is redrawn from its content with
code. Students solve from these drawings, so a drawing carries EXACTLY the information of the
original: every label, number, angle, arrow, distance, component value and which-is-where.
Nothing added that changes the physics, nothing dropped. Keep tool output small.

## Inputs (your prompt names `<WORK>`, `<testId>` and your refs)
- Questions: `<WORK>/drafts/<testId>*.A.json` only (stem + options say what each figure must show). Never open `*.keys.json` or `*.B.json`.
- Scan crop of each figure: `<WORK>/figcrops/<testId>/<ref with spaces as _>.jpg`. If a crop misses part (options on the next column), the full column image is `<WORK>/render/<testId>/<figure.img>.jpg`; look only at the figure there.
- House example: `scripts/pariksha/figures/gpcc-nkl-ch29/figures.py` (and its q16.png, q34.png); larger sets: `scripts/pariksha/figures/gpcc-nkl-ch23/`, `gpcc-nkl-ch28/` (circuits and gates).

## Output
- ONE script `<WORK>/figdraft/<testId>/figures.py` (a split slice uses the name your prompt gives, e.g. `figures_a.py`) that, run with `python -P <script>`, writes `<ref with spaces as _>.png` BESIDE ITSELF (`os.path.dirname(os.path.abspath(__file__))`), so it still works once committed. One function per figure, shared helpers on top. No network, no other files.
- matplotlib for ray diagrams, geometry and graphs; `schemdraw` (`schemdraw.logic` for gates) for circuits. White background, ink `#1f2937`, line width ~1.6, ~160 dpi, labels 9-12 pt. Keep the original's layout so the question's words still match.
- `optionsAreFigures`: ONE png, the stem figure (if any) above four panels labelled `1` `2` `3` `4`.
- Graphs: same axes, labels, intercepts, shapes and relative positions. Unknown scale: keep proportions; never invent tick values.
- **Orientation is data**: battery polarity, diode/zener/gate direction, which mirror face reflects, convex vs concave. Zoom in on every small one; a reversed symbol changes the answer.
- **Draw the printed value**: where the book's drawing contradicts its own label (an angle labelled 30° drawn at 47°), draw the labelled value, and report it.
- Leave out handwriting, pen marks and ink bleed-through.
- A figure that cannot be drawn faithfully (a value unreadable): skip it and report why. Never guess a number.

## Check your own work, then report
`python -P scripts/pariksha/book/compare.py <WORK> <testId> --only=<your refs> [--tag=<x> if another agent shares the folder]`
builds side-by-side sheets in `<WORK>/figdraft/<testId>/`. LOOK at every sheet, fix what differs,
re-run until each row matches. Reply with ONLY: count drawn, sheet file names, refs skipped (why),
and each figure whose original looks wrong (one line each).
