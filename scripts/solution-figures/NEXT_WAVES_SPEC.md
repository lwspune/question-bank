# Solution figures: next waves (spec)

Written 2026-10-24, at the end of the Application of Integrals wave. Read this, then
`AREA_BRIEF.md`, then `draw.py`'s docstring, before starting. Owner approved all five
waves below on 2026-10-24.

## Where things stand

- **Done:** 298 of 304 Application of Integrals questions (JEE Mains, MHT-CET, NDA) carry
  a computed region figure in `questions.solution_image_url`. Batches:
  `data/area-*.json`. The 6 without one are deliberate (listed in the area wave's
  commits and in memory `project_solution_figures`).
- **How a figure reaches students:** `solution_image_url` shows on /browse, mock
  result review, drill, past-paper pages, Word/PDF keys, present mode, and since
  2026-10-24 under V's explanation (`src/lib/chat/solutionFigure.ts`). Nothing else
  to wire up.
- **The loop that worked:** agents draft specs per slice to a brief; the main session
  redraws every figure (so its check runs again), looks at every image against its
  question, settles disputes, then `npx tsx scripts/solution-figures/run.ts <batch>`
  (dry run, review page) and `--apply`. One commit per batch.
- **Rules that hold:** at most 3 agents at once; agents never write the database or
  git. Opus drafts JEE slices; Sonnet drafts the rest (owner, 2026-10-24: Sonnet's
  drafts needed only label fixes, never a wrong region). Figures are COMPUTED from
  the question's own data; hand-drawn illustrations stay banned (owner, 2026-10-08).
  Look at every image; a check proves the maths, not the layout.

## Step 0: record what was decided, not just what was attached (do this first)

**The gap.** `solution_image_url` tells us which questions HAVE a figure. Nothing
records which questions were looked at and deliberately left without one ("not an
area question", "the key is None of these", "recall question"). Those verdicts lived
in scratch drafts and are gone. In the new waves most questions in a chapter will
get NO figure (only 25-70% are spatial), so without a record the next session
re-triages the same questions, and no one can tell "reviewed, none needed" from
"never looked at".

**Build (test first):**
1. A batch file may carry `"none": [{ "id": "<uuid>", "reason": "<short reason>" }]`
   beside `figures`. `plan.ts` validates it (uuid, non-empty reason, an id never in
   both `figures` and `none`). `run.ts` writes nothing for `none`; the committed
   batch file IS the record.
2. `npm run figures:coverage [-- --exam=<name>]`: per exam and chapter, PUBLIC
   questions split into **attached** (has `solution_image_url`), **decided none**
   (id in any batch's `none`), **not reviewed**. Read-only. Pure core in
   `scripts/lib/` with a spec in `tests/`.
3. Backfill the area wave's 6 deliberate "none" rows into a small
   `data/area-none.json` so the first coverage report is true.

DB-level tracking (a column) was considered and NOT recommended: the decision is
editorial metadata about a script run, it changes nothing a student sees, and the
committed batch file is reviewable in git. Revisit only if a UI needs it.

## The five waves, in order

Each wave: scope query → (new `draw.py` capability + check, test first in
`draw.py --selftest`) → brief additions → agent slices (triage AND draft) → main
session review → dry run → apply → commit batch (with `none`) → coverage report.

Agents now TRIAGE as well as draft: per question, either a figure spec or a `none`
entry with a reason (recall question, figure already in the stem, nothing spatial).

### Wave 1. Linear programming (MHT-CET, 69 questions, ~55 figures)

- **Scope:** MHT-CET chapter "Linear Programming". 14 already show the region in the
  stem (`image_url`): `none` with that reason unless the solution needs the optimum
  marked.
- **Draw:** existing `plot` kind: constraint lines, feasible region as a `polygon`
  fill, vertices marked, optimum vertex highlighted, objective line through it dashed.
- **New check `check.lpp`:** `{ constraints: ["2*x+3*y<=6", ...], objective: "3*x+5*y",
  sense: "max"|"min", vertices: [[x, y], ...], optimum: <key value> }`. `draw.py`
  verifies every listed vertex satisfies every constraint (tol 1e-9), the polygon's
  points are exactly those vertices, and the objective's max/min over the vertices
  equals `optimum`. Refuses otherwise. Selftest: a textbook LPP with a known optimum,
  and a refusal when a vertex violates a constraint.
- **One slice**, Sonnet.

### Wave 2. Heights and distances (~224 questions, ~180 figures)

- **Scope:** NDA "Height & Distance" 63, CDS "Heights and Distances" 41, SPI
  "Heights and Distances" 37, AFCAT "Heights and Distances" 83.
- **Draw:** existing `geometry` kind (points, segments, angles, measures). The board
  wave already used it for elevation problems (`data/wave3-maths.json`, key
  `statue-situation-*`): copy that style.
- **New check `check.geometry`:** `{ angles: [{ vertex, from, to, deg }], lengths:
  [{ from, to, value }] }`. `draw.py` measures each named angle and length from the
  drawn coordinates and refuses a mismatch (tol 0.1 degree, 0.5% length). The key's
  answer must appear as one checked length or angle. Selftest: a 30-60 elevation
  pair with known height.
- **Slices:** NDA+SPI one, CDS+AFCAT one. Sonnet.

### Wave 3. Coordinate geometry (~1,425 questions, ~690 figures)

- **Scope:** JEE "Conic Sections" 346, "Straight Lines" 112; NDA "Lines" 334,
  "Conics" 225, "Circles" 145; MHT-CET "Circle" 71, "Straight Line" 75, "Conic
  Sections" 44, "Pair of Straight Lines" 73. Expect ~60% figures in conics and JEE
  lines, ~40-50% in NDA lines and circles, ~25% in pair of lines.
- **New series type `implicit`:** `{ type: "implicit", expr: "x**2/9 + y**2/4 - 1",
  xlim, ylim }` drawn as the zero contour of F(x, y). Covers conics, circles and
  pairs of lines without solving for y.
- **New check `check.on`:** `[{ at: [x, y], expr: "<F(x,y)>" }, ...]`: each marked
  point satisfies each curve it is said to lie on (|F| < 1e-6 after scaling), plus
  `check.key: { expr, value }` for the asked quantity where it is a coordinate,
  length, slope or eccentricity computable from the drawn data. Selftest: a focal
  chord of y^2 = 4x with known endpoints; a refusal for a point off its curve.
- **Brief additions:** label foci, vertices, directrices and tangent points only when
  the solution uses them; equal aspect always (a circle must look round).
- **Slices:** ~8 (JEE conics x2, JEE lines, NDA lines x2, NDA conics, NDA circles,
  MHT-CET all). Opus for JEE, Sonnet for the rest. Two rounds of 3, then 2.

### Wave 4. Lens and mirror problems (~589 questions, ~150 figures)

- **Scope:** JEE "Ray Optics" 169, NEET "Ray Optics and Optical Instruments" 114,
  MHT-CET "Optics (Ray)" 112, NDA "Light and Optics" 194. Most NDA questions are
  recall (`none`); figures go on image-formation numericals.
- **Draw:** existing `ray` kind (convex/concave lens and mirror; it COMPUTES the
  image). Out of scope: prisms, refraction at curved surfaces, combinations
  (`none`: "not a single lens or mirror").
- **New check `check.ray`:** the computed image distance (and magnification where
  asked) equals the key. Selftest: the four textbook cases already in `selftest()`.
- **Slices:** JEE+NEET one (Opus), MHT-CET+NDA one (Sonnet).

### Wave 5. Sets and Venn diagrams (~292 questions, ~70 figures)

- **Scope:** NDA "Sets & Relations" 226, MHT-CET "Sets, Relations and Functions" 66.
  NDA's Sets chapter has high wrong-answer counts (137 in 60 days). Relations and
  functions questions are `none`.
- **New kind `venn`:** 2 or 3 sets, circles placed by a fixed layout, each region
  labelled with its count, the asked region shaded; optional universal set box with
  the outside count. Computed layout only; no artistic sizing.
- **New check `check.venn`:** region counts add up to each set's stated size and to
  the universe; the shaded region's count equals the key. Selftest: the classic
  3-language survey.
- **One slice**, Sonnet.

## Sizing summary

| Wave | Questions | Figures (est.) | New `draw.py` work | Sessions (est.) |
|---|---|---|---|---|
| 0 Tracking | | | `none` in batches + coverage report | 0.5 |
| 1 LPP | 69 | ~55 | `check.lpp` | } 1 |
| 2 Heights and distances | 224 | ~180 | `check.geometry` | } |
| 3 Coordinate geometry | ~1,425 | ~690 | `implicit` + `check.on` | 2-3 |
| 4 Lens and mirror | ~589 | ~150 | `check.ray` | } 1 |
| 5 Venn | ~292 | ~70 | `venn` kind + `check.venn` | } |

Agent cost from the area wave: about 5,000 tokens per question drafted (304
questions used about 1.6M tokens across 6 agents).

## Deliberately out of scope

Algebra, permutations, probability, number work, matrices (nothing spatial);
conceptual physics and free-body sketches (drawings); circuits (stems already show
them); 3D geometry and vectors (a flat picture of 3D is rarely exact); organic
structures (a separate decision: the structure renderer exists, but most stems
already show the molecules).

## Definition of done, per wave

Selftest green; every figure redrawn by the main session with its check passing and
looked at; dry run clean; `--apply`; batch committed with its `none` list; coverage
report shows the chapter fully decided (attached + none = total); gate green; merged
to local `main` (push only when the owner says).
