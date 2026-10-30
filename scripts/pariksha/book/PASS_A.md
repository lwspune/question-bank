# Pass A: transcribe a scanned book chapter (agent brief)

You transcribe question pages of a scanned coaching book into JSON. Accuracy is everything:
this feeds a live question bank. You do NOT solve anything and you write NO answers or
solutions. Keep tool output small (do not cat whole files back).

Your prompt gives: `<WORK>` (the session's work folder), `<testId>`, the page range, the
output file names, and the subject's chapter catalog (for NEET: `NEET_CHAPTERS` in
`scripts/neet/config.ts`; you do not classify, the book section becomes the subtopic).

## Inputs
- Column images `<WORK>/render/<testId>/pNNN_L.jpg` and `pNNN_R.jpg`: each scanned page split
  down the middle, `_L` the left column, `_R` the right. Read p001_L, p001_R, p002_L, ... A
  question can run from the bottom of `_L` to the top of `_R`, or onto the next page.
- A finished example of the bank's text style:
  `scripts/pariksha/data/gpcc-nkl-ch29.physics.json` (ignore its answer/solution fields).

## Book layout
A chapter has sections (`24.1 -> Interference of Light and YDSE`). Each section prints its
questions numbered from 1, then an ANSWER KEY table, then SOLUTIONS. Scans often skip solution
pages; skip solutions entirely. The key table prints numbers 1..N in shaded header rows with
the printed option number (1-4) below; a wide table is cut across the `_L` / `_R` images, so
read both halves.

**Ignore handwriting**: pencil ticks, circled numbers, margin digits, a student's corrected key
digit. Record the PRINTED digit, and mention any pen mark over a key cell in `keyNotes`.

**Clipped edges**: a phone scan often cuts the outer edge of a column. Complete a cut word only
when it is certain from context (and say so in `note`, confidence MED). A cut NUMBER or symbol is
never guessed: write `[cut off]`, confidence LOW.

## Output 1: questions file (JSON array, one object per question, in book order)
```
{
  "ref": "24.1 Q5",                       // section + printed question number
  "section": "24.1",
  "stem": "...",
  "options": ["...", "...", "...", "..."], // exactly 4, printed order 1) 2) 3) 4)
  "hasFigure": false,                     // true if the stem or options need a drawn diagram/graph
  "figure": { "img": "p003_L", "bbox": [0.08, 0.41, 0.92, 0.55] }, // ONLY if hasFigure: rough box, fractions of THAT image
  "optionsAreFigures": false,             // true if the 4 options are themselves diagrams/graphs
  "confidence": "HIGH",                   // HIGH | MED | LOW
  "note": "..."                           // ONLY when needed
}
```
If a figure continues on another image (options 3-4 on the next column), box the first part and
give the second image + box in `note`.

## Output 2: keys + sections file (JSON object)
```
{
  "sections": [ { "section": "24.1", "title": "Interference of Light and YDSE",
                  "firstQ": 1, "lastQ": 96, "keyCount": 96, "numberGaps": [] } ],
  "keys": { "24.1": { "1": 1, "2": 3 } },   // printed option NUMBER, exactly as printed
  "keyNotes": { "24.1 Q26": "pen mark over the printed 1" }   // optional
}
```
`numberGaps`: numbers of that section not on your pages. Report honestly; never invent a
question. A split slice: mark a section that runs past your last page `"continues": true`, one
that began before your first page `"startsBefore": true`.

## Text rules
1. Verbatim wording and options. Fix only plain spelling slips (`hight` -> `height`), noted in `note`.
2. Math in LaTeX inside `\( \)`: `\(\lambda\)`, `\(10^{-7}\,\text{m}\)`, `\(\frac{\lambda D}{d}\)`, `\(60^\circ\)`, angstrom `\(\mathring{\text{A}}\)`. No bare unicode math (λ μ θ ° × √ ² Å → ∝) in any field. Balanced `\( \)`. Never write a JSON `\u` escape.
3. `**Assertion:** ...\n**Reason:** ...` (same for `**Statement I:**`, `**Statement A:**`).
4. Match-the-columns: a GFM pipe table in `stem` (header row, a `|---|---|` row, data rows).
5. Sub-statements a) b) c) inside a stem: one per line (`\n`).
6. Options that are diagrams: `optionsAreFigures: true`, `hasFigure: true`, box the stem figure AND the four options, and write each option as a short description (`"Diagram 1: intensity falls linearly"`), or `"Diagram 1"` if it cannot be described.
7. A stray solution line printed before a stem, or a misprint that changes the physics: leave the stem as the book means it and record the printed text in `note`.

## Before you finish
Every question has 4 non-empty options; refs unique; every `\( \)` balanced; each section's
count equals `lastQ - firstQ + 1 - numberGaps`. Write both files (nothing else, no git, no
database), then reply with ONLY: per section `ref range, count, keyCount, gaps`; the figure refs;
the refs with confidence != HIGH (one line each, why).
