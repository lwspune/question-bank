# Pariksha figure-anchor task (self-verifying loop)

You produce VERIFIED snapCrop anchors for the figure questions of ONE test, so each diagram
crops cleanly (tight around the figure, no stem/option/answer-text bleed, no wrong region).
Your prompt gives you `<testId>`. Work the loop below until every crop looks right.

## The crop model (snapCrop)
Each figure question needs four anchors, as FRACTIONS (0..1) of its rendered logical half-page
PNG (`scripts/pariksha/out/<testId>/p<NNN>_<L|R>.png`):
- **col** `[c0,c1]` — rough left/right band the figure lies in (fractions of WIDTH). Err WIDE.
- **top** — a y-fraction in the WHITESPACE GAP just ABOVE the figure (below the stem text).
- **bottom** — a y-fraction in the WHITESPACE GAP just BELOW the figure (above the options / `Answer :`). For a question whose OPTIONS ARE figures/graphs, put `bottom` below the option-figures (include them) but above `Answer :`.
- **answerY** — y-fraction where `Answer :` begins (or, if the paper has no Answer line, just below the figure block). HARD ceiling: `bottom` ≤ `answerY`; the crop never dips past it.
snapCrop ink-bounds the actual figure within `[top,bottom]×col` — so anchors are FORGIVING on exact tightness, but `top`/`bottom` MUST sit in real whitespace rows (not on text/ink) or snapCrop flags them.

## Loop (repeat until clean)
1. Read `scripts/pariksha/data/<testId>.<shard>.json` → the questions with `"hasFigure": true` (each has `"figureImg"`). These are your targets.
2. For each, OPEN the page-image (`out/<testId>/<figureImg>.png`) and read the layout. Pick `col/top/bottom/answerY` — put `top`/`bottom` in the visible white gaps bracketing the figure.
3. Write them to `scripts/pariksha/data/<testId>.figures.json`:
   `{ "<qnum>": { "img":"p003_L", "col":[c0,c1], "top":t, "bottom":b, "answerY":a }, ... }`
4. Run the crop tool (dry-run, no DB writes):
   `npx tsx scripts/pariksha/attach-images.ts <testId>`
   It reports per-question `ok`/warnings and writes crops to `scripts/pariksha/out/<testId>-figs/fig-q<n>.png`.
5. **View every crop** (Read each `fig-q<n>.png`). A good crop shows ONLY the diagram/graph (plus, for option-figure questions, the four option-figures) — NO stem paragraph, NO plain-text options, NO `Answer :` line, NO page-footer URL, and it is not clipped.
6. For any crop that is wrong-region / clipped / has text bleed / flagged not-ok: adjust that question's anchors (a footer-URL or option-text crop means the band is far too low → raise `top`/`bottom`; a clipped figure means widen `col` or move `top` up / `bottom` down but stay in gaps) and re-run step 4–5. Iterate.
7. Stop when every figure crops cleanly (aim for snapCrop `ok`, but a not-ok crop that VISUALLY looks perfect is acceptable — note it).

## Output / report
Leave the final `scripts/pariksha/data/<testId>.figures.json` in place. Report: how many figures, how many crop cleanly, and any you could not get right (with why) so they can be left text-only. Do NOT pass `--apply` (the main process attaches after a final review).

Tips: the two-up split means content sits in the UPPER part of each half-page with whitespace below — don't place anchors in the trailing blank zone. A crop showing the footer URL (`…3a3a`) means your y-fractions are near 1.0 (page bottom) — the figure is much higher up.
