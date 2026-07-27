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

## ⚠ Second blind spot: `INK = 165` cannot see pale art (found 2026-07-26)

`snapcrop.py` bounds only pixels **darker than `INK` (165 grayscale)**. Line art lighter than
that is invisible to it — so it clips the figure and **still reports `ok`**, because the
whitespace-anchor guard it checks has nothing to do with what it bounded. `ok` means "your
anchors sat in gaps", NOT "the crop contains the whole figure".

Hit independently on two different MH-SSC-10 papers in one session:
- **light-gray blank boxes** (~178) on fill-in-the-chart questions — snapCrop dropped an entire
  blank box that the student is meant to write in, and the box the question is *about*;
- **pale-pink/rose art** — a water-drop apex, a cartoon's soft edge, faint antennae, and the
  outer cells of a stem-cell diagram, all cut.

**Implications:**
1. The **visual verify is what catches this** — a second reason it is mandatory, independent of
   `answerY`. Never accept `ok` as evidence of completeness.
2. Once a bbox is hand-widened past the ink bound, **re-running `snap-crop --write` silently
   reverts it** to the clipped value. Record the override (e.g. a `bboxNote` in the fig manifest)
   and don't re-derive that paper.
3. Blank-box charts, pastel/monochrome-tinted papers and photographs with light sky/background
   are the high-risk shapes. Cross-check against the PDF's own vector/raster extents
   (`get_drawings()` / `get_image_info()`) rather than the ink bound when in doubt.
