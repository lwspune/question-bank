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

## Three kinds of animation (owner, 2026-10-29)

Every solution that can be explained with an animation gets one. A question
takes the FIRST kind that fits; anything left keeps its still solution.

| Kind | What it is | When | Status |
|---|---|---|---|
| **Shared scene** | one scene type serving many questions from their numbers (`functionGraph`, `coordGeometry`, `space3d`, `lpRegion`, `truthTable`, `switchCircuit`, `setClaim`, ...) | the question's shape is common | live |
| **Sketch** (standalone) | one animation for ONE question, built from computed objects: named numbers (`vars`), points, then segments, lines, arrows, polygons, circles, arcs, angle marks, curves and labels, each on a step `s1`..`s8` | a picture would explain it but no shared scene fits | live 2026-10-29 |
| **Algebra steps** | the written working itself animates: each line appears, the changed term coloured in its old line and its new one | no picture helps (identities, division, find-k, root expressions, small-change approximations) | built 2026-10-29, pilot next |

**Sketch rules** (`scenes/sketch.ts`, spec `tests/visuals-sketch.test.ts`):
- Every number is a formula of the `vars`, every var a formula of the ones
  before it (`lib/visuals/expr`, never eval). No freehand paths.
- `assert` states facts the picture must satisfy ("c^2 = a^2 + b^2", "m*ax + c
  = 0"); one that fails refuses the picture. Write at least one for every
  construction a reader could get wrong (a point on a line, a right angle, a
  point on the curve).
- `answer` is a formula; it must equal the key, as for every scene.
- One unit is the same on both axes, so lengths and angles are true. Every
  point must sit inside the `view`. Limits: 30 vars, 26 points, 40 items, 12
  asserts, 8 steps.
- Names go where they read: `labelAt` + `pos` on a segment, line or curve; a
  free `label` item for the answer. Pick a view near 4:3.
- Not for biology or other high-fidelity figures (owner, 2026-10-08).
- When one kind of sketch keeps recurring (about 15 times), propose it as a
  shared scene.

**Refinement log** (add a dated line whenever review or a run teaches something):
- 2026-10-29: names of a curve and a line both defaulted to the top of the
  view and collided with the y-axis letter; `labelAt` added. A free label
  placed with `pos: "e"` ran into a point's name: put answer labels in empty
  corners. Next refinement to consider: a label-overlap check in `visuals:run`
  so the sheet does not have to catch it.
- 2026-10-29, pilot (60 noFit: 40 MHT-CET Applications of Derivative, 20 JEE
  Straight Lines; one Sonnet pass doing fit + draft): 42 judged sketch, 16
  algebra, 2 none; 39 applied after review (4 held on NEEDS_OWNER, 1 merged
  into its fix). Every picture was mathematically right; the faults were all
  labels: cut off at an edge, or printed on another label. The scene now keeps
  labels inside the picture and moves one off an earlier label
  (`tidyLabels`). Agents also used capital var names (R, L): now allowed. A
  var named x or y is still refused (x is the curve variable): rename it (xf).
  Next to consider: keep labels off LINES too (a line's name printed along the
  x-axis), and a lint in `visuals:run` that lists suspected overlaps on the sheet.
- 2026-10-29, 12th boards (HSC Pair of Straight Lines, CBSE + HSC Application
  of Derivatives): every applied picture was right again. Three were dropped
  at review because equal units made them needles: a slope graph, a 5 m pole
  50 m away, a sand cone 4 high and 48 wide. Agents are now told to call such
  a question algebra. Next to consider: an `aspect` option (unequal axes,
  labelled as such) for graphs only, never for figures with true lengths.
  The checker's mechanical refusals (label over 40 characters, a first step
  not at sentence 0, a var named x) recurred on every slice, so the draft
  brief now ends with a checklist of them. Labels still sit on lines in cone
  pictures (readable, not yet fixed).
- 2026-10-30, SSC CGL geometry (Triangles, Circles, Mensuration 2D, Heights,
  Quadrilaterals, Lines and Angles; 580 questions, one Sonnet pass per ~14
  doing fit + draft): 370 sketches + 59 algebra applied, every picture right.
  (1) A brief line saying "algebra beats none" read as "algebra beats sketch":
  one agent drafted 5 sketches and 107 algebra on circle questions. State the
  ORDER: sketch first, algebra only where no picture helps, then none. (2)
  About one picture in seven printed two result labels on each other;
  `tools/label-overlap.js <batch>` finds them from the sheet (it named every
  one seen by eye, and more); the fix that held was a column of result
  labels BELOW the figure, the view widened for it. (3) Points named A, B, C
  where the question says P, Q, R: check the letters on the sheet. (4)
  `tools/compact-sheet.js <batch> 4` shows only last frames, four to a row:
  about a sixth of the screenshots, enough to check shapes and labels.
  Dropped as too big for one sketch: 13 (over 26 points or 30 vars:
  polygons with all diagonals, two-circle chains).
- 2026-10-31, SSC CGL arithmetic wave 1 (Percentage, Profit and Loss and the
  start of Ratio; 450 questions as bar models, brief `briefs/sketch-bar.md`):
  390 sketches + 52 algebra applied, every picture right. (1) Labels on bar
  outlines were the defect, not the maths: 45 of 131 sketches in one slice
  set. `label-overlap.js <batch> --edges` now tests each label against every
  bar edge and divider (a bar edge touching the top of the text counts); the
  brief carries the renderer's own screen mapping and text box, and builders
  that computed boxes from it came back clean. (2) `{var}` prints fractions
  ("225/4%"): write the key's decimal as text. (3) A rupee sign on votes:
  check the units on the sheet.
- 2026-10-31, SSC CGL arithmetic wave 2 (rest of Ratio, Averages, Time and
  Work; 450 questions): 155 sketches + 282 algebra applied, every picture
  right; label hits came back at 1 per batch once agents reused wave 1's
  builder. New refusal, at the DATABASE not the checker: the 8 KB cap of
  `questions_solution_visual_shape` measures the raw jsonb, so ~6 KB of JSON
  text is the real limit; a chained bar builder nested every block's x in the
  next and hit it, and `--apply` stops at the first refused row. Fix: plain
  numbers for long coordinate formulas (same picture). Candidate: have
  `visuals:assemble` refuse an oversized visual so the dry run catches it.
- 2026-10-31, SSC CGL arithmetic wave 3 (Time and Work tail, Interest, Speed,
  Time and Distance; 436 questions): 227 sketches + 205 algebra applied, every
  picture right. Speed and distance drew as tracks (chases with a dashed gap,
  trains crossing, boats with the current, circular tracks unrolled or as a
  circle). One builder's 12 px label box let labels touch, which the renderer
  answers by moving the later one 16 px, onto a bar (35 of 102); its own check
  passed them, so the review's `--edges` run is what found them. All 1,336
  arithmetic questions now decided: 1,311 animated (772 sketch + 539 algebra
  across waves 1-3), 18 none, 7 left undecided (free-letter answers, one
  truncated key).

**Algebra steps rules** (`scenes/algebraSteps.ts`, spec `tests/visuals-algebra.test.ts`, brief `briefs/algebra-draft.md`):
- Up to 10 lines, each KaTeX, on a step `s1`..`s8`. Each says how it is checked:
  `expr` (equals the previous expr line at sample x values), `eq` (every root
  satisfies lhs = rhs), `calc` (worked value = stated value, `dp` for a
  rounded line), `note` (unchecked). At least one line must be checked.
- Marks `{{1:...}}`..`{{3:...}}` colour a term (blue, amber, green); the same
  number on the same quantity in each line links them. They become
  `\htmlClass{viz-mark-n}`, and the renderer's KaTeX trust allows only that
  command with those three classes, so stored text cannot add links or styles.
- A line with a built-up fraction, sum or integral gets a taller row, or KaTeX
  is cut off; faint ruled lines show the working's space before it fills.
- The review sheet inlines KaTeX's CSS (fonts by file URL), or the maths
  renders as raw markup in the screenshot.
- Write any line holding a backslash with the Edit tool, not a shell heredoc
  or Python string: escaping mangled `\htmlClass` and the TALL regex once.

**Algebra steps refinement log:**
- 2026-10-29, first 12th-board run (HSC + CBSE Application of Derivatives,
  HSC Pair of Straight Lines; 111 applied): the drafts were right; the
  faults were mechanical. (1) A lost JSON escape turned `\text`, `\frac`,
  `\beta` into TAB, form feed, backspace: the scene now refuses a control
  character or a bare `frac`/`sqrt`/`text` (repair: scratchpad fixctl.js maps
  them back). The same check caught the scene's own test fixtures. (2)
  `\dfrac{{{1:...}}}{2}` (a mark inside a fraction's brace) was refused as a
  bad mark: plain double braces now pass through. (3) Notes printed `x^2`,
  `pi`: write x², π. Judgement calls dropped at review: a proof re-done on a
  numeric example the stored proof never uses, and a note addressed to the
  checker ("check numbers use a = 1, b = 2"). Yield is low on proofs with
  free letters (Pair of Straight Lines: 15 of 49), high on rates and
  approximations (CBSE AoD: 53 of 85).
- 2026-10-29, vectors and 3D (HSC Vectors, CBSE Vector Algebra, CBSE 3D
  Geometry; ~370 applied): one agent per 14-question slice deciding sketch /
  algebra / none and drafting in the same pass works (~2 min a slice). Telling
  agents to check a vector answer per component (one calc a component, answer
  pinned to the first non-zero one) raised yield from ~4 to ~9 of 14. Row
  heights needed two more classes: a three-row matrix, and a fraction whose
  top or bottom holds a fraction. The x/λ trap: formulas use x, but drafts
  leaked x into the SHOWN maths ("9x − 37" for 9λ − 37); the brief now says
  tex keeps the solution's own letter, and scratchpad scanx.js lists suspects
  (most hits are real coordinates). Other recurring repairs: a lost `\v` /
  `\a` (vertical tab, bell), a ninth step (limit eight), an eq line without
  roots. Not a fit: HSC Mathematical Logic's noFit pile (sentences in words,
  negations, switching circuits): the checker reads numbers, not truth values.

**Logic tools** (brief `briefs/logic-more-draft.md`; specs `tests/visuals-circuit.test.ts`,
`visuals-set-claim.test.ts`, `visuals-truth.test.ts`), built 2026-10-29 for that pile:
- `switchCircuit`: draws a circuit from its formula (∧ series, ∨ parallel, ∼p the
  switch S′, `T` a plain wire), plays the truth-table rows with the lamp, and
  refuses any circuit whose table differs from `equals`. Only single-letter
  switches, at most 4 letters, about 7 switches wide.
- `truthTable` with words: `letters` (each letter's meaning) as a legend, `say`
  (the answer in words, shown, not checked); ask `transforms` checks converse,
  inverse and contrapositive asked together.
- `setClaim`: every member of a set tested against ∀/∃ claims; on an infinite
  set only a claim the listed members settle is accepted; several claims need
  `ask` true|false (which one a multiple choice picks out).

**Logic refinement log:**
- 2026-10-29, HSC Mathematical Logic (184 noFit questions, 13 slices; 113 applied:
  53 circuits, 39 sentences in words, 21 set claims, in `data/lg-hsc-*`):
  drafts were right as checked; two were dropped as teaching nothing (a
  single letter's negation, a single letter's value). Recurring refusals: a
  multiple choice without `ask`, a first step not at sentence 0. **Agents cannot
  see a stem figure**, and the circuit check compares the drawing with the
  SOLUTION's reading of it, so a misread figure passes: two stored solutions
  had misread their circuit (fixed, `solution-fixes/2026-10-29-logic.json`), and
  one figure was cut off (re-cropped from the book). The review sheet now shows
  the question's figure above the frames: compare the two before `--apply`.
- 2026-10-29, MHT-CET Mathematical Logic (61 noFit, 5 slices, 3 agents; 46
  applied: 13 circuits, 31 words, 2 set claims): all 13 circuits matched their
  figures. Dropped 2 where the legend gave the question's own letter p to a
  different clause (brief rule added). Labels with "∥" drew a solid block:
  `plainLabel` now refuses it (4 live visuals relabelled with `--replace`).

**Reasoning scenes** (SSC CGL, owner 2026-10-31: letter codes, then family
trees, then circle diagrams; ranking rows use `sketch`):
- `letterStrip` (brief `briefs/letter-strip-draft.md`, spec
  `tests/visuals-letter-strip.test.ts`): a letter code as a pipeline of up to 4
  steps (shift by a number, a repeated list or by place; opposite letter;
  reverse, swap, swap in pairs; letters as numbers, or added up). The scene
  puts every example word through the rule and refuses it unless each gives
  its printed code, then applies it to the asked word (or, for a decode, to
  each option) and checks the one option that matches. Agents run
  `tools/check-drafts.ts --scene=letterStrip` on their own file, no database.
- `familyTree` (brief `briefs/family-tree-draft.md`, specs
  `tests/visuals-family-tree.test.ts` + `visuals-kinship.test.ts`): blood
  relations. People, facts (parent / spouse / sibling, each on a beat f1..f8)
  and rows; the scene checks the rows against the facts and builds the family
  with the exam's conventions (`lib/visuals/kinship.ts`: a spouse shares the
  children, siblings share parents; about 35 relation words, each defined
  once as chains). Every option is FOLLOWED on the family; a sex not stated
  is tried both ways, and "cannot be determined" holds only when no other
  option holds for every allowed sex. The route lights up, its steps named by
  the sex every allowed family agrees on.
- `circles` (brief `briefs/circles-draft.md`, spec `tests/visuals-syllogism.test.ts`):
  syllogisms and "which Venn diagram" questions. The drafter's circles must
  show every statement (all = inside, no = apart, some = meet, overlap);
  whether a conclusion follows is decided by `lib/visuals/syllogism.ts`,
  which tries every way 2 to 4 sets can overlap (each set non-empty): a
  definite conclusion must hold in all, a possibility in one, and two that
  never agree form an either/or. Labels are placed by the scene, never on an
  outline (`labelBoxes`). A "which diagram" question names the key's figure;
  only that match is checked by eye, so review it beside the option picture
  (the review sheet does not show option images: build a side-by-side page).

**Reasoning refinement log:**
- 2026-10-31, SSC CGL Coding-Decoding (247 with a solution, 9 slices of 28,
  3 agents at a time): 162 drawn (`data/ls-ssc-cd-1..9`), 85 decided none
  (`data/decided-2026-10-31-ssc-cd-*`): letter-digit or symbol tables 29, word
  or sentence codes 26, rules on the letter COUNT or a product 10, vowel /
  consonant rules 9, fixed reorderings the steps cannot say and single-letter
  "words" 11. Every check line agreed with the key; agents matched hand drafts
  on 5 of 5. One solution misprinted an in-between word (LPANT for LPATN),
  fixed in `solution-fixes/2026-10-31-ssc-cd.json`. Review changes: codes are
  printed as the question prints them (9, 12, 26, 23, not 9122623); a shift
  on named letters drops "each letter". Candidates for new steps, if worth
  it: a vowel/consonant selector (9) and a single-letter word (2).
- 2026-10-31, SSC CGL Blood Relations (154 with a solution, 7 slices of 22):
  134 drawn (`data/ft-ssc-br-1..7`), 20 decided none: coded-expression options
  6, "which statement is NOT correct" 4, placements the solution gives only
  as one possibility 3 (dropped at review: a sister or a cousin, a daughter
  or a niece), loose words (sister-in-law for a cousin's wife, grand aunt) 3,
  and one each of a count question, an ambiguous stem, a key by elimination
  and a guessed placement. Review fixes: a person asked about themself reads
  "Azad himself"; the listener reads "your father". Candidate addition: a
  false-statement ask (4).
- 2026-10-31, SSC CGL Syllogism (113, 6 slices) and Venn Diagrams (44, 2
  slices): 109 + 28 drawn (`data/ci-ssc-sy-*`, `ci-ssc-vn-*`), 4 + 16 decided
  none (count-from-the-figure 14, five terms, contradictory statements, an
  either/or pair the key ignores, a key picture that is only a best fit, a
  reverse question). Review changes: labels sat on outlines ('Woman',
  'Brothers'), so the scene now places them; conclusions show on their own
  beat, since solutions discuss III before II. Every Venn drawing was matched
  against its key option's picture. check-drafts now enforces the 32-character
  answer label the assembler drops on.

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
   **Before calling a key or stem wrong, open the source paper**: of the 111
   rows settled on 2026-10-30, most MHT-CET 2021-2024 and NDA "defects" were
   our own copying errors (roots, fractions and brackets lost by the old
   import), fixed to the paper with their key intact. Settling a row follows
   the policy at the top of `NEEDS_OWNER.md`: fixes go through
   `scripts/reports/apply-fixes.ts` (hash-safe for every question format; a
   row whose options are duplicated in the source takes its solution through
   `visuals:fix-solutions` instead), defective rows join
   `src/lib/mocks/flawed.json` and `scripts/mocks/regrace-flawed.ts --apply`
   makes them grace in existing mocks, and a stem or key change is also
   written to the pipeline's own record (MHT-CET `shifts/*.json`
   `stemOverride` or the 2026 transcripts; JEE `papers/*.json`
   `stemOverrides`, `answerOverrides`, `numericOverrides`).
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
| `functionGraph` | a curve from its formula (safe parser `expr.ts`), crossings (touching roots count), slopes, increasing/decreasing ranges (f' may vanish at single points), local max/min and greatest/least on an interval (`extrema`, word problems too), the zeros themselves with their sum or product (`roots`) | CET + JEE Applications of Derivative; CBSE 12 + HSC 12 Application of Derivatives (2026-10-28); CBSE 10 Quadratic Equations + Polynomials, MH 10 Quadratic Equations, MH 9 Polynomials (2026-10-28: 132 visuals of 639; nature of roots, a few maxima, then 103 with the `roots` ask (the zeros, or their sum or product); the rest are word problems, forming a polynomial from its zeros, expressions like α² + β², find-k, division); NDA Quadratic Equations, CDS Quadratic Equations + Polynomials, Worksheets Quadratic Equations, SPI Quadratic Equations + Polynomials (2026-10-29: 73 visuals of 538; roots, nature of roots and least/greatest values; most of the rest are find-k and expressions of the roots, 14 held on NEEDS_OWNER for keys and stems); CET Trig Functions; JEE Trig Equations, Quadratic Equations |
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
- A question with a figure: the agent never saw it, so compare the drawn picture
  with the figure the sheet shows above the frames (a circuit read from the
  solution repeated the solution's misreading twice).
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
- Two points one above the other (a vertex and a centroid on the same x) get
  their labels pushed onto leader lines that cross the other point, so the
  label reads as the wrong dot. Give the less important point an empty label
  (the header already names the answer). The draft briefs now say so.
- space3d angles between free vectors (2026-10-30, NDA Vectors): the arc can
  land away from where the two directions meet, and a right angle lying flat in
  the xy-plane is drawn wide (the view never tilts past 60 degrees). 7 of 11
  such NDA drafts were dropped at review as noFit `vectorAngleView`; fixing the
  scene would bring them back. Angles at a shared vertex of a triangle drew fine.
- A key-wrong notice ("The paper's key says (b) ...") is only true when the
  SOURCE printed that key (a booklet's answer page, a UPSC key). For NDA
  papers our stored key came from a transcription, and twice the paper's own
  key agreed with the correction. When only our copy was wrong, fix the key
  with no notice (2026-10-30: 5 such notices removed, fix batch nda-e).
- Stored solutions from the old Word imports often open with a stray `**`,
  `Solution (b)**` or `Ans. (c)**`: that text becomes step 1 beside the picture.
  Clean it with `visuals:fix-solutions` first, then draft.
- NDA (old import) needs a source check far more often than JEE or MHT-CET:
  2026-10-30 it ran about one suspect key or stem per 10 questions checked, and
  most were our copying errors (a lost sign, root or option). The owner chose to
  settle each against the scanned paper or LWS booklet as found: UPSC scans in
  `C:\Vilas\LWS_Pune\NDA_Subjects_Content\PYQPs\Maths\` (2026-I under
  `NDA_Maths_PYQPs_Edited\`; transcripts with keys in `NDA_Maths_Gyanam\`, which
  drop every root sign), LWS booklets in `C:\tmp\Practice\Maths\` (text layer,
  keys in `_*_answers.pdf`, worked solutions in `Solutions\`), LWS mocks in
  `...\Test_Series\NDA Math 1 to 10 - Complete Mock\`.

## Part of ingestion

For a subject that has scenes, visuals are part of ingesting new questions
(owner, 2026-10-25), not a later wave. The ingestion agents draft each new
question's verdict, and its visual where the verdict is "animate", in the same
pass as the transcription and solution. The main session runs `visuals:run`
on the draft batch, looks at the sheet, and applies it with the questions.
Wave 1 exams: JEE Mains and MHT-CET (every subject; the triage decides per question).
