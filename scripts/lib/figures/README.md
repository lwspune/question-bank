# scripts/lib/figures — shared figure crop + verify core

Pipeline-agnostic tooling for **cropping figures out of scanned/render-crop PDFs and
gating them before PUBLIC**. First used by `scripts/neet/`; promoted here (2026-07-02) so
the next figure pipeline (foundation / cds / mhtcet / jee) imports it instead of copying.

- **`snapcrop.py`** — pure geometry. Coarse anchors (`col`, `top`, `bottom`, `answerY`) →
  tight leak-safe bbox by bounding the page ink; guards `fy1 < answerY`. Run:
  `python scripts/lib/figures/snapcrop.py <pdf> <page1> <col0> <col1> <top> <bottom> <answerY>`
  (prints `{bbox,warnings,ok}`); `--selftest` runs synthetic checks. Takes any PDF path — no
  pipeline coupling.
- **`verify.ts`** — pure TS helpers (`validateAnchors`, `figureFlags`, `bboxHeight`,
  `blockedFigureQuestions`, `mergeVerify`, types). Tested in `tests/figures-verify.test.ts`.

**To adopt in another pipeline** (do this at next figure-heavy ingest, not speculatively —
see SUGGESTIONS.md 2026-07-01):
1. A `snap-crop`-style CLI that reads the pipeline's figure manifest, spawns `snapcrop.py`
   with `join(__dirname, "..", "lib", "figures", "snapcrop.py")`, and writes the derived bbox.
2. A `verify-figures`-style step: crop each figure's current bbox → contact-sheet HTML +
   montage PNG + a `data/<paper>.figure-verify.json` verdict (via `mergeVerify` + `figureFlags`).
3. A `flip-public` guard that calls `blockedFigureQuestions(verdict)` and refuses PUBLIC while
   any figure is not `ok`.

The load-bearing lesson: **`answerY` is the one input geometry can't infer, so the visual
verify step is mandatory** (a wrong `answerY` silently fools the geometric guard). Full
rationale in the `figure-snapcrop-verify` memory + `scripts/neet/` (the reference implementation).
