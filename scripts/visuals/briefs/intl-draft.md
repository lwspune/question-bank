# Draft brief: IMAT and ENEM (intl site, 2026-11-17)

Read first, in full, all in this folder: algebra-draft.md, sketch-fit.md and
sketch-draft.md (with its end checklist), physics-draft.md (its "Physics
numbers", "Learned on the first chapters" and "Output" sections apply to every
subject here), and for Chemistry chemistry-draft.md, for Maths the "Learned"
sections of maths-board-draft.md. This brief says only what is different.
Each question gets exactly one of: a sketch draft, an algebra-steps draft, or
a skip.

## Which kind, in this order

1. **Sketch** when a picture shows what the text does not: a plane figure and
   the length or angle asked, a graph read for a value, a region, a set-up
   in Physics (forces on an incline, a circuit drawn as boxes and lines, a
   ray), a bar chart drawn ONLY from a table printed in the text (never from
   a chart image: you cannot see it), a number line for an inequality, a
   timeline or a row of people for an arrangement.
2. **Algebra steps** for working a student follows line by line: every
   calculation, percentage, ratio, unit conversion, probability, mean or
   median, equation, mole or concentration calculation, kinematics formula.
   A data-interpretation question whose chart is an image: algebra steps on
   the numbers the solution quotes.
3. **Skip** (verdict none) when nothing would help: recall, a definition, a
   statement, reading a passage, an argument (assumption, flaw, conclusion),
   a reaction or structure without a number, anything you would have to
   guess. "Algebra beats none" holds only where there is real working.

## Both exams

- Options run A to E; the key is marked [KEY]. The answer is the keyed
  option's value. If the working reaches a different option, skip with the
  reason and set `solutionWrong`.
- A question whose stem points at a figure (`stemImage: true`, "the graph
  shows", "na figura") you cannot see: draw only from numbers the TEXT and
  the solution state, never from the picture. If the solution reads values
  off the figure, algebra steps on those values is fine; a sketch of the
  figure is not.
- Biology: never a sketch. Algebra steps only for a real calculation (a
  cross's probability, a Hardy-Weinberg frequency, a magnification, a count
  of ATP or bases); everything else is a skip.

## IMAT (English)

- Everything a student reads is English, as on the rest of the site.
- Currency is the one the question prints (€ in most IMAT questions, £ in a
  few): never swap one for the other. A console that cannot show € is not a
  reason to write £ (2026-11-17: 8 drafts did, caught on the sheet).
- Words inside tex go in `\\text{...}`: bare words lose their spaces
  ("300 µm stays as it is" printed as one word).
- Logical Reasoning: Numerical Reasoning and Data Interpretation are mostly
  algebra steps. A sequence ("next number"): algebra lines showing the rule
  (`calc` per term). Critical Thinking is argument analysis: skip, unless the
  solution does arithmetic.

## ENEM (Portuguese)

The solutions are in Brazilian Portuguese. Everything a student reads in the
animation must be Portuguese too: every `note`, every `label`, every `text`,
`answer.label`, and any words inside `\\text{...}` in tex. Never English.

- **Decimal comma.** Brazil writes 2,5 and 1.250 (or 1 250). Formulas (`f`,
  `value`, `vars`, `assert`, `answer`) always use a DOT: 2.5. What students
  see keeps the solution's own form: in tex write `2{,}5` (the braces stop
  KaTeX adding a space after the comma) and thousands as the solution writes
  them (`1\\,250` or `1.250`); in labels and notes write "2,5".
- **Never print a non-whole var with `{name}` in a sketch label**: it prints
  as a fraction (5/2) or with a dot (2.5). Write the value as text ("área =
  2,5 m²"). A whole number `{name}` is fine.
- Money is "R$ 1.250,00" as the solution writes it; units as the solution
  writes them (km/h, m/s, kWh).
- Labels are capped at 40 characters (`answer.label` 32, a line `note` 44):
  Portuguese runs long, so keep them short ("raio = 3 cm", "área = 12 m²").
- The checker's warning about words like "sample values" or "checked at" is
  English only: the same rule holds in Portuguese ("valores de amostra",
  "verificado em" never appear).

## Output, checks and report

As physics-draft.md: three files per slice (`slice-K.algebra.json`,
`slice-K.sketch.json`, `slice-K.skip.json` with a `situation` word:
recallMcq, definition, readingPassage, argument, reaction, structure,
figureOnly, needsGuess, ...), check-drafts on the algebra and sketch files
from the worktree root, the first step at sentence 0, and a report that
quotes every stored text you call a slip EXACTLY as stored, with what it
should be. Never touch the database or git. Keep tool output small.
