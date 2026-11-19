# MHT-CET notes figures: drafting brief

The contract for drafting a figure (a still diagram, a slider, or an animation)
for an MHT-CET notes concept. Written 2026-11-19, when the CET notes had 108
figures across 1,173 concepts, none of them animated, none in Physics and two
in Chemistry. It follows the IMAT brief (`scripts/imat/NOTES_VISUALS_BRIEF.md`),
which worked; what differs is who reads the figure and the file names. Every
drafter, person or agent, works from this file.

## Who reads the figure

Class 11 and 12 students in Maharashtra preparing for MHT-CET, mostly on a
phone, many in their second language. The notes follow the state board
(Balbharati) textbooks. So: short labels, simple words, SI units, the
textbook's terms.

## What you deliver for each figure

1. **One component file**: `src/app/notes/_components/visualizations/Cet<Name>.tsx`,
   default export, no props. Its slug (given in your task) starts `cet-`.
2. **Exported pure data/geometry** in that file (the numbers, positions, curve
   points or step list the picture draws), so a test can pin them.
3. **One test file per task**: `tests/notes-cet-visuals-<task>.test.ts`
   (plain `.ts`, vitest; import only the pure exports, never render). Pin what
   makes the figure TRUE: the concept's numbers, the order of steps, that a
   curve peaks where the text says, that a computed value matches the worked
   example. Not pixel positions for their own sake.
4. **A short report** (see the end).

Copy the patterns of the finished examples:
- Still figure: `ImatChartTypes.tsx` + `tests/notes-imat-chart-types.test.ts`.
- Slider: `VennTwoEvents.tsx` or `ImatSnellRefraction.tsx` (a `"use client"`
  component with `<input type="range">`).
- Animation: `ImatMitosisSteps.tsx` or `ImatCircularMotion.tsx` +
  `tests/notes-imat-visuals-model.test.ts`, built on the shared stepper
  `StepFigure.tsx`.

## The three kinds

- **Still**: a server component (NO `"use client"`), pure SVG. Use it when one
  picture says it all (a labelled set-up, a curve with its key points).
- **Slider**: `"use client"`, one to three `<input type="range">` that change
  the picture and a live number. Use it when the concept is a RELATIONSHIP the
  student should feel by moving it (resonance, a threshold frequency, fringe
  width against slit gap). Every slider has an `aria-label` and its value shown
  as text. The first render (no interaction) must already be a good picture:
  it is what print shows.
- **Animation**: `"use client"`, wraps `StepFigure` and gives it `steps`
  (3 to 7, each `{ title, caption }`) and a `children(step)` function that
  draws the SVG for that step. Use it for a PROCESS with an order (a
  reaction mechanism, a rectifier's half cycles, a phasor turning). Rules that
  make it work:
  - Anything that moves is ONE element whose `style.transform` (translate,
    rotate, scale) or `style.opacity` changes between steps, with
    `className={... MOTION}`. CSS transitions do not animate SVG attributes
    like `x2` or `points`, so never move a shape by changing those: it jumps.
  - Build every `style.transform` with `svgTransform({ x, y, angle?, sx?, sy? })`
    from `StepFigure.tsx`, never by hand. It always writes the same
    `translate rotate scale` shape and rounds to 2 decimals; an unrounded value
    makes the server markup differ from the first render, a hydration error.
    Round any computed number you put in a `style` in a slider too.
  - A line that must stretch: draw `x1=0 y1=0 x2=1 y2=0` with
    `vectorEffect="non-scaling-stroke"` and set
    `transform: svgTransform({ x, y, angle, sx: length })`.
  - Shapes that appear or vanish: always render them, change `opacity`.
  - The LAST step is the overview a reader sees before pressing Play, and the
    only frame in print: make it the most complete picture.
  - Captions: one or two plain sentences, the concept's own terms.

## Truth (the part that matters most)

- **Read the concept first**: its file is given in your task; read the whole
  concept object (intuition, definition, formula, worked example, practice,
  traps). Draw ITS numbers and ITS example where it has them, so the figure and
  the text say the same thing.
- **Every number, label and arrow must be right.** Work each value out; put
  the arithmetic in the test. A wrong figure is worse than none.
- **Use the concept's terms and conventions** (sign conventions, units,
  radians or degrees, the names it uses). If the text warns about a trap, the
  figure must not fall into it.
- **Never point at something the page does not have**: no "the worked example"
  or "the self-check" unless you name its numbers, no "below".
- **Do not change the concept's text.** If you think the text is wrong, say so
  in your report; the main session decides.

## Words on the figure

- Simple English. Short labels. No full sentences inside the SVG except a
  one-line headline; explanations go in the caption under it.
- **No em dashes, no spaced en dash (" – "), no " -- "** (owner rule: they read
  as machine-written). Use a full stop, colon, comma or brackets.
- Never name an exam (CET, MHT-CET, JEE, NDA, CBSE...), never say "the bank",
  no rupees.
- No LaTeX inside SVG `<text>`: use Unicode (², ³, ₂, θ, Δ, →, ⇌, °, ×, μ, Ω).
  Never a raw underscore ("V_R", "I_max") in any visible text, captions and
  step titles included: they are plain text. Use a Unicode subscript where one
  exists (n₁, Iₘₐₓ), an SVG `<tspan>` subscript inside the picture, or a word
  ("the resistor's voltage"). The gate test fails a visible underscore.
- Header line above the figure: `Diagram · ...`, `Visualization · ...` or
  `Animation · ...` (sentence case after the dot). **No maths in the header**: it is shown in
  CAPITALS, so "hν − φ" reads "HN − Φ" and "λD/d" reads "ΛD/D". Put symbols in
  the figure or caption; the gate test fails a header with Greek letters,
  sub/superscripts or "=".

## Look and accessibility

- Frame: `<div className="mx-auto max-w-md rounded-lg border border-indigo-200
  bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">`
  (StepFigure draws its own).
- SVG: `viewBox` about 320 wide (it is scaled to the phone's width; ~320 keeps
  11-unit text readable), `className="block h-auto w-full"`, `role="img"` and an
  `aria-label` saying what the picture shows.
- Colour with Tailwind classes that have dark-mode pairs, as the examples do
  (`fill-sky-500 dark:fill-sky-400`, `fill-foreground`, `fill-muted-foreground`,
  `stroke-border`). Never a hex colour. Text 10 to 12 units (`text-[11px]`).
- Colour never carries meaning alone: label it too.
- Tailwind classes written out in full (no `fill-${x}-500`): the compiler only
  sees whole strings.

## Limits

- Write ONLY your component files and your one test file. Do not edit
  `_types.ts`, `ConceptUnitCard.tsx`, `StepFigure.tsx`, any notes file, or any
  other file. The main session wires figures in
  (`scripts/notes/place-visuals.ts`).
- No git commands. No new packages. No `console.log`. No network.
- Keep tool output small: read files in ~150-line chunks, pipe long output
  through `tail`.

## Checks to run before you report

1. `npx tsx scripts/imat/check-visuals.ts <your component files>`: every file
   must print `ok` (it renders the figure outside a browser and applies the word
   rules above). Fix every `FAIL`.
2. `npx eslint <your files>`: clean.
3. Do NOT run vitest or `tsc` on the whole project (other sessions hold the
   test lock, and the main session runs both). Write the test carefully instead:
   import paths, exported names, and expected values worked out by hand.

## Report (short)

For each figure: slug · component · target concept slug · kind (still /
slider / animation) · one line on what it shows · any doubt about the concept's
text (or "none"). Then the test file name. Nothing else.
