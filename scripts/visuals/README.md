# Animated solutions

A picture drawn from the question's own numbers that moves with the solution,
step by step, and works out the answer itself. Owner, 2026-10-25: build it,
JEE Mains and MHT-CET first; never delete or overwrite an earlier solution.

Students see it as the **Animated** view of the solution, with a switch to
**Still**: the solution exactly as before (text + any still figure). The switch
moves that one solution only (owner, 2026-10-26); the device remembers the last
choice as the starting view of solutions opened later. A question without a visual shows Still only, as
it always has. Surfaces: /browse and the /questions landing pages, mock review,
drill, and under V's explanation (there it plays on its own, since V's words
are not the stored solution).

## Pieces

| Piece | Where |
|---|---|
| Scenes (pure: params -> shapes, plus the self-check) | `src/lib/visuals/scenes/`, listed in `registry.ts` |
| Stored format, step-to-sentence mapping, fingerprint | `src/lib/visuals/visual.ts`, `types.ts` |
| Column + shape CHECK | `questions.solution_visual`, migration 0184 |
| Player, Animated/Still switch, remembered choice | `src/components/visuals/`, `src/lib/visuals/viewPref.ts` |
| Batch checks | `src/lib/visuals/batch.ts` |
| Coverage | `src/lib/visuals/coverage.ts`, `npm run visuals:coverage` |
| Tests | `tests/visuals-*.test.ts`, `tests/solution-visual-db.test.ts`, `tests/chat-solution-visual.test.ts` |

## The rules that make it safe at scale

1. **The scene checks itself.** Each scene computes the answer from its own
   model (the slab scene measures the shift it drew). `checkVisual` refuses a
   visual whose answer differs, and `usableVisual` drops it on the server, so
   a wrong picture never reaches a student.
2. **The solution text is never changed.** A step names the sentence it starts
   at; the text beside the picture is the stored solution cut there. The visual
   carries a fingerprint of that solution: if the solution is edited later, the
   steps drop away (the picture still plays) and coverage reports it `stale`.
   A solution that is WRONG is corrected first, never drawn around (owner,
   2026-10-25): write the fix into `solution-fixes/<batch>.json` and run
   `visuals:fix-solutions`, which writes only `solution`, refuses if the stored
   text changed since, keeps content_hash and records a review. Then draft the
   visual against the corrected text.
   A wrong KEY or STEM is not fixed by the lane: it goes on
   `NEEDS_OWNER.md` (owner, 2026-10-25: "if you are not able to fix a question
   add it to the report"), and every progress report names the new rows.
3. **The key is compared at apply time.** `visuals:run` refuses an MCQ visual
   whose named option is not the database key, and a numeric one whose answer
   is off the stored numeric answer.
4. **Look at every sheet.** The check proves the numbers; only the eye sees a
   label on a ray or a picture that teaches the wrong thing.
5. **No component for one question.** A situation gets a scene once 30+
   questions share it. Until then a question is `noFit`, and the noFit pile
   picks the next scene to build.

## A batch

`data/<name>.json`:

```json
{
  "visuals": [{ "id": "<question uuid>", "option": "B", "visual": { "v": 1, "scene": "...", "params": {}, "steps": [{ "from": 0, "beats": ["..."] }], "fingerprint": "<8 hex>", "answer": { "value": 2, "label": "2" } } }],
  "decided": [{ "id": "<question uuid>", "verdict": "none", "reason": "recall: names the reagent" }]
}
```

- `option` for MCQs (compared with the key); omit for numeric questions.
- `fingerprint` = `solutionFingerprint(<the stored solution>)`.
- `steps[k].from` = the sentence index (`sentenceStarts`) where step k begins;
  `beats` = what the scene animates during that step, each beat at most once.
- `decided` verdicts: `still` (a still figure is the right picture: hand it to
  the solution-figures waves), `none` (a picture adds nothing), `noFit` (no
  scene fits yet; say which situation).

```sh
npm run visuals:run -- <name>            # check + review sheet in generated-papers/visuals/<name>.html; writes nothing
npm run visuals:run -- <name> --apply    # writes solution_visual only
npm run visuals:coverage                 # JEE Mains + MHT-CET; --exam="..." / --all
npm run visuals:figures -- --exam="..." --chapter="..."   # stems/options pointing at a picture they lack: add the figure, don't just note it
npm run visuals:fix-solutions -- <batch> [--apply]        # correct wrong solutions found on the way (solution-fixes/<batch>.json)
```

`--apply` never overwrites a visual already in the database; add `--replace`
to redo one (for example after its solution was corrected).

## Running a chapter (the agent lane)

Haiku and Sonnet agents may do the reading (owner, 2026-10-25), **at most 3
running at once**. The main session alone writes to the database, looks at the
sheets and commits. Agent files go in the session's scratchpad, never the repo.
Model choice was measured on 150 calls (`calibration/2026-10-25/`): Haiku for the
fit check, Sonnet for drafts.

1. **Pick a chapter.** `npm run visuals:coverage` lists JEE + CET chapters by
   how many questions are not reviewed yet. Choose a chapter whose questions a
   scene can draw (table below).
2. **Export it.** `npm run visuals:export -- --exam="MHT-CET" --chapter="Circle" --out=<scratch>/cet-circle --slices=2`
   writes `slice-<k>.json` (about 40-60 questions each; questions already
   decided are left out).
3. **Fit check (Haiku, one agent per slice).** Brief = `briefs/<scene>-fit.md`
   + the slice path + "keep tool output small". Each agent writes one array:
   which scene ask fits each question, or `fit: "no"`, plus `figureNeeded` and
   `solutionWrong` flags.
4. **Read every flag yourself.** Agent flags were often wrong: re-derive each
   `solutionWrong` (several "wrong" solutions were right) and look at each
   `figureNeeded`. A real wrong solution goes in `solution-fixes/<batch>.json`
   (below); a wrong key, broken stem, or blank/duplicate options goes on
   `NEEDS_OWNER.md`; a missing figure is added, not just noted.
5. **Drafts (Sonnet, one agent per ~25 fitting questions).** Brief =
   `briefs/<scene>-draft.md` + the fitting ids. Each agent writes an array of
   drafts or `{ skip: true, reason }`.
6. **Assemble.** `npm run visuals:assemble -- --scene=<scene> --name=<batch> <draft.json> ...`
   writes `data/<batch>.json` with the fingerprint and key read from the
   database (never from the agent) and prints every draft it dropped, with why.
   Short labels and an empty label (`""` = a bare dot) fix most drops.
7. **Look at the sheet** (next section), fix or drop what looks wrong, then
   `visuals:run -- <batch> --apply`.
8. **Record the no-fits.** `node scripts/visuals/tools/collect-nofit.js data/decided-<date>.json <scene>:<fit-or-draft.json> ...`
   turns `fit: "no"` and draft skips into `noFit` verdicts (leaving out
   questions held on NEEDS_OWNER.md), then `visuals:run --apply` it. Without this,
   coverage keeps counting checked questions as not reviewed.
   Each noFit keeps the fit checker's `situation` word (findK, rootExpr, ...,
   from 2026-10-29; earlier verdicts have none), and
   `node scripts/visuals/tools/nofit-situations.js [scene]` counts the pile by
   scene and situation, which is how the next scene or ask gets picked.
9. **Commit** the batch files, fixes and NEEDS_OWNER rows on the branch, and
   report: visuals applied, solutions fixed, new NEEDS_OWNER rows.

| Scene | Draws | Chapters done (2026-10-25) |
|---|---|---|
| `functionGraph` | a curve from its formula (safe parser `expr.ts`), crossings (touching roots count), slopes, increasing/decreasing ranges (f' may vanish at single points), local max/min and greatest/least on an interval (`extrema`, word problems too), the zeros themselves with their sum or product (`roots`) | CET + JEE Applications of Derivative; CBSE 12 + HSC 12 Application of Derivatives (2026-10-28); CBSE 10 Quadratic Equations + Polynomials, MH 10 Quadratic Equations, MH 9 Polynomials (2026-10-28: 132 visuals of 639; nature of roots, a few maxima, then 103 with the `roots` ask (the zeros, or their sum or product); the rest are word problems, forming a polynomial from its zeros, expressions like α² + β², find-k, division); CET Trig Functions; JEE Trig Equations, Quadratic Equations |
| `coordGeometry` | points (given, or built: dividing a segment in m : n, midpoint, centroid), lines (one or a pair from one equation), circles, conics, tangents, a locus; distance, intercepts, slope, radius, chord, tangent length, area, angle between lines, a constructed point (`point`), the ratio a point or line divides a segment in (`ratio`) | CET Circle, Straight Line, Conic, Pair of Straight Lines (pair + angle); JEE Conics, Straight Lines; CET + JEE Complex Numbers (z = x + iy); CBSE 10, MH 10, MH 9 Coordinate Geometry (2026-10-28) |
| `space3d` | 3D points, lines, planes, vectors; foot, image, meets; distance, angle, projection, length, area, volume | CET Line and Plane, Vectors; JEE 3D Geometry, Vector Algebra |
| `lpRegion` | linear programming: constraint lines, the feasible region, corners, the objective line sliding to the optimum; max, min, range, optimum point(s), one corner vs a whole edge | CET Linear Programming |
| `truthTable` | statement logic (`lib/visuals/logic.ts`): the truth table filled column by column; equivalent, tautology / contradiction / contingency, the letters a value forces, values at a row, negation / converse / inverse / contrapositive / dual | CET Mathematical Logic |
| `circleArc`, `quadraticFamily`, `rotation`, `slab` | Phase 0 pilots | one question each |

Every ask can report its value `squared` and/or `times` k (keys like d² or 6 × area).
Next candidates by the noFit pile: waves, SHM, circuits; a "greatest distance" ask
(five JEE complex-number questions); area between curves. The 2026-10-26 `angle` ask
may now fit questions earlier recorded noFit in the Straight Line chapters. `VISUAL_INGESTION_FROM` (the ingestion
gate) is still empty: the owner decides when to switch it on.

## Looking at the sheet

```powershell
powershell -File scripts/visuals/tools/sheet-shots.ps1 -Batches <batch>[,<batch>] [-Tag v2]
```

runs the dry run and saves the sheet as 1700 px parts in
`generated-papers/visuals/shots/<batch>-<tag>-p<n>.png`; open each with the Read
tool. Edge stops at 16000 px (about 25 visuals): for a bigger batch, copy it into
`data/zz-<batch>-a.json` and `-b.json` with half the visuals each, shoot those,
then **delete the zz files** (never commit them). Check each picture against the
question, not just the green tick: the check proves the number, not that the
picture shows the right shape.

## Gotchas (each one cost a batch)

- The picture font has no "∥": write "parallel to" in labels.
- A label that sits on a line or tick is fixed by the scene's label placement;
  a label still too long for its spot gets the draft dropped, so keep labels short.
- 3D: never let a draft invent a helper plane the question does not have; use
  the scene's own constructions (two-line meet, image in a line) or skip.
- A right number on the wrong shape (a triangle drawn for a parallelogram) passes
  the check: only the sheet catches it.
- LP: a corner label can still be crossed by a constraint line, and a stroke just
  after the comma reads as a minus ("(50, 100)" looked like "(50, −100)"). Zoom in
  on any corner label a line passes through; hold the draft (undecided) if the
  crossing changes what it says. Held for this: `32cbeab1`, `f60ee6e9`.
- Edge stops a sheet screenshot at 16,000 px: about 25 visuals of most scenes, but
  only about 11 LP visuals (four frames each). Check the last part ends on a whole
  visual before trusting a sheet.
- A solution wrong by one slip gets a fix that swaps that fragment exactly once
  and keeps the rest of the text; rewrite only a solution that is wrong throughout.
- Correct the solution BEFORE drafting its visual: the visual's steps carry the
  solution's fingerprint, and `fix-solutions` names any question whose visual
  must be redone (`--replace`).
- PostgREST `like` on `id::text` fails: resolve full ids from the export JSON.

## Part of ingestion

For a subject that has scenes, visuals are part of ingesting new questions
(owner, 2026-10-25), not a later wave. The ingestion agents draft each new
question's verdict, and its visual where the verdict is "animate", in the same
pass as the transcription and solution. The main session runs `visuals:run`
on the draft batch, looks at the sheet, and applies it with the questions.
Wave 1 exams: JEE Mains and MHT-CET (every subject; the triage decides per question).
