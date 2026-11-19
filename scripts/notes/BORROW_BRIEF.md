# Notes figures: matching existing figures to concepts (borrowing)

The contract for proposing which EXISTING notes figure belongs on which concept
of another exam's notes. Written 2026-11-19 for the MHT-CET, JEE Mains, NEET
and SSC CGL notes, which had few or no figures while ~300 figures drawn for
other exams sat unused there. A matcher (person or agent) drafts a manifest;
the main session reads every row before anything is placed. A borrowed figure
on the wrong concept is worse than none, so when in doubt, leave it out.

## Inputs

- `figure-catalog.txt`: one line per figure, `slug | still|slider|animation |
  the words it shows` (first 300 characters). Regenerate with
  `npx tsx --require ./scripts/notes/nocss.cjs scripts/notes/figure-catalog.ts <outDir> <routePrefix>`.
- `concepts-<exam>.txt`: `subjectRoute | chapter | subtopic | concept slug |
  name | formula|reference | figure already placed`.
- The concept's own text: find it with a search for `slug: "<concept>",` under
  `src/app/notes/<subjectRoute>/` and read the whole concept object.
- The figure's code when the catalog line is cut short:
  `src/app/notes/_components/visualizations/<Component>.tsx` (the slug's
  component is named in `src/app/notes/_components/ConceptUnitCard.tsx`).

## A match is right only when ALL of these hold

1. **The figure shows this concept's own idea**, not a neighbour's. "Snell's
   law" on a concept about Snell's law, not on one about apparent depth.
2. **It agrees with the concept's text**: notation, sign convention, units,
   degrees or radians, the names used. If the concept warns of a trap, the
   figure must not fall into it.
3. **It points at nothing the page lacks**: reject a figure whose words mention
   "the worked example", "the self-check", "below", "the bank", or any exam by
   name, unless those words still make sense on the new page.
4. **It teaches nothing the notes never mention.** A Tyndall-effect figure on
   a colloids page whose notes never say "Tyndall" adds a fact with no text
   behind it: leave it out.
5. **Its level fits.** A Class 8 sketch is fine as intuition for a Class 12
   idea only if nothing in it is wrong at Class 12.
6. **The concept has no figure yet**, and the figure is not already on another
   concept of the same subtopic page (one figure appears once per page).

Prefer formula concepts and concepts whose idea is spatial, graphical or a
process. A pure fact list (dates, names) rarely gains from a borrowed figure.

## Output

Write ONE file, the path given in your task, a JSON array:

```json
[{ "slug": "field-lines-charge", "concept": "cetp-field-superposition", "why": "radial field lines; the concept's superposition of point-charge fields" }]
```

`why` is one short line naming what in the concept the figure shows. Then a
short report: how many rows, and up to 10 near misses you rejected with the
reason (these tell the main session where a NEW figure is needed).

## Limits

- Write only your output file. Do not edit any repo file. No git, no database,
  no network, no vitest or tsc.
- Keep tool output small: search with patterns, read in ~150-line chunks.
