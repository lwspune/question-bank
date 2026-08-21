# Teaching decks (`.pptx`)

Slide decks a teacher presents from, as opposed to the question-per-slide
classroom deck that `/browse` downloads. Same builder, same math pipeline —
`src/lib/export/pptxBuilder.ts` — with teaching slide types layered on.

## What this adds to the builder

`buildQuestionSlides` renders one question per slide. `buildTeachingDeck`
renders an authored deck: concept, formula and derivation slides interleaved
with practice questions.

| Slide kind | Comes from | Notes |
|---|---|---|
| `section` | authored | Divider. Already existed. |
| `teaching` | authored | Title + optional badge + lines. |
| `question` | a `practice` entry | Stem and options only — no key, no solution. |
| `answer` | the SAME `practice` entry | Stem repeated, key named, solution shown. |

`planDeck` is the only expansion: one authored `practice` entry becomes **two**
slides, a question and then its answer, carrying the same question number.

**Why a second slide and not click-to-reveal.** These decks are converted to
PDF. A PDF cannot animate, so a reveal has to be a page turn. It also means the
question slide must not leak the answer — asserted by a test, because the leak
would be invisible in the source and obvious to a student.

## Authoring a line

```ts
{ text: "Displacement over elapsed time." }              // plain body line
{ text: "Slope of v-t is acceleration", bullet: true }   // • bulleted
{ text: "\\(v = u + at\\)", display: true }              // centred equation
{ text: "Air resistance neglected.", note: true }        // grey italic, smaller
{ text: "This is the key result", strong: true }         // bold
```

Math travels as `\(…\)` and becomes a real, editable PowerPoint equation
through the same OMML core the Word exporter uses. A GFM pipe-table in a line
renders as a real table.

## Building the Motion in a Plane decks

Three steps, in order. Only the third is needed day to day — the first two are
re-run when the figures change.

```sh
python scripts/ppt/motion-in-a-plane/extract_figures.py            # crop from the PDF
npx tsx scripts/ppt/motion-in-a-plane/upload-figures.ts --apply    # push to Storage
npx tsx scripts/ppt/motion-in-a-plane/build.ts                     # build the decks
```

`upload-figures.ts` is a **dry run without `--apply`** and is idempotent — it
hashes each file and re-uploads only what changed. It writes `figures.json`,
the filename → storage path map, which IS committed. The PNGs are not.

Writes four files into `generated-papers/` — three that match the syllabus
tracker's teaching blocks, plus a combined file with dividers. Same authored
content in both arrangements; only the partition differs.

Anchor questions are fetched from the bank **by id at build time**, so a stem
or key repaired later flows into the next build instead of being frozen into a
copy. Needs `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

## Rules earned the hard way

1. **Open the file in PowerPoint. Every time.** A fully green test suite has
   shipped a `.pptx` PowerPoint refuses to open — a fractional value in an
   integer-typed OOXML attribute. Well-formedness and schema validity are
   different properties. `tests/pptx-teaching.test.ts` now scans every emitted
   part for that class, but the render is still the acceptance test.

2. **Opening is not enough — export slides to PNG and look at them.** The
   table-overlap defect below passed every test and opened cleanly.

3. **A layout height estimate must be pessimistic.** `estimateTableLines`
   exists because the previous estimator assumed one line per table row; a
   wrapped cell made the table taller than its allotted shape and the next
   block was drawn on top of it, striking through the text. The rule the
   builder already documented for paragraphs (`purpose: "layout"` is
   deliberately more pessimistic than `"sizing"`) applies to tables too.

4. **A figure question needs its figure.** The build script downloads anchor
   images and treats a failed download as FATAL, because the builder drops an
   image whose bytes never arrived — which would silently ship a "which graph
   shows…" question with no graphs.

5. **Never author content through a shell heredoc.** The shell eats one
   backslash and `\theta` arrives as a TAB. Write content files with the
   editor.

## Known cosmetic limitation

`\boxed{…}` converts to a plain equation — the box is silently dropped. It is
not a corruption (nothing falls back to raw LaTeX) but it buys nothing, so do
not rely on it for emphasis. Use `display: true`, which centres the equation,
or `strong: true`.

## Chapter figures

`extract_figures.py` crops the chapter's numbered figures out of the printed
page (they are VECTOR drawings, so there is no lossless image to pull), writes
them to `figures/` with a manifest, and stitches multi-panel sets (Fig 3.1 a-e,
Fig 3.2 a-d) into one image each.

`build.ts` then gives every figure **its own slide**, right after the slide that
cites it — see `splitFigures`. A dense figure under six bullets got a strip of
the body, the text overflowed its shape, and the picture was drawn over the last
two bullets; trimming the teaching text would have fixed the layout by deleting
the lesson.

Four things that decided the crop boxes, none guessable:

1. **Caption colour is the discriminator.** Captions and their wrapped
   continuation lines are set in one colour (`15466636`); body text is another.
   Proximity alone pulled "Thus, we resolve tension T ..." into Fig 3.7.
2. **The page is two-column.** A prose test that ignores the column let the LEFT
   column's text raise the floor of a RIGHT-column figure — which cut the top off
   Fig 3.4(a), and survived a rewrite of the prose test because the column was
   never the thing being tested.
3. **Prose is a SHAPE, not a width.** A row of figure labels can be as wide as a
   sentence. "≥25 chars and ≥4 spaces" separates prose from `Velocity` / `(O,O)`.
4. **Pad sideways, not into a decided edge.** Padding the top walked back over
   the line just excluded; padding the bottom reached the next section heading.

`OVERRIDES` states a box outright for the one figure the rules get wrong at both
ends (3.6), rather than loosening two rules that are right for the other
fourteen.

### Where figures live, and why it is not git

Measured across the State Board PCM books: **Std XI alone has ~743 figures**
(Physics 258 · Chemistry 266 · Maths 219) at ~51 KB each — about **37 MB**, and
roughly 75 MB with Std XII. Git keeps every blob forever, so committing them is
a permanent clone-size cost that grows with every chapter. They go to Supabase
Storage at deterministic paths (`<org>/decks/<chapter>/<file>`, upsert), and the
repo keeps two small text files instead:

- **`figures.json`** — filename → storage path + hash. What the build reads.
- **`figures/manifest.json`** — page and bounding box each crop came from, so a
  crop can be re-verified against the PDF without the binaries.

`build.ts` reads **only** Storage. There is deliberately no local-file fallback:
a fallback makes it ambiguous whether what you shipped is what is stored.

### The size ladder — for Chemistry, not Physics

Supabase rejects an object over 1 MB, and it does so by throwing. Physics is
line art and lands ~51 KB at 3×, so it never comes near the cap. **Chemistry
will** — apparatus diagrams and colour structures are the risk, and this repo
has already hit it: a Class-9 Geography panorama rendered at **7.2 MB** and the
upload simply failed.

`render_within_budget` steps the render scale down (3× → 2.5× → 2×) and then
falls back to JPEG at descending quality. 3× is the first rung deliberately, so
**every figure that already fits is byte-identical to before the ladder existed**
— verified 17/17 against the previously committed crops. Both lower branches were
proven to fire by forcing an artificially small budget; a ladder that has never
stepped down is not known to work.

## Verifying a deck

Beyond opening it in PowerPoint, export EVERY slide and measure how far down the
ink reaches:

```
lowest ink row / slide height, per slide
```

Calibrated against a deliberately unfittable control slide: the control reaches
**97%**, the worst legitimate slide **92%**. Flag above ~96%. Build the control
when you change the sizing code — a probe that has never gone red proves nothing.

## Sizing rules the layout depends on

- **`pickFontSize` must measure with the LAYOUT width, not the sizing one.**
  They differ deliberately (layout is pessimistic), and choosing the font with
  the optimistic one let a slide be sized "just fits" and then laid out a line
  taller — text past the bottom edge.
- **A table costs more than its text.** Cell padding is 0.6 of a line per row and
  is invisible to a character count; it is reserved through
  `SlideLoad.imageFraction`, which is what that field's "images/tables" wording
  always meant.
