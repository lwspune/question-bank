# Worked-solution transcription brief (vision lane)

You are transcribing the printed worked solutions for one range of an NDA
Mathematics mock paper, from rendered page images.

## What this task is and is not

It is **transcription**, not derivation. Every answer is already settled and is
printed in your handout. You are recovering the paper's own working so a student
sees *why*, not just *what*.

So: **do not solve the question yourself and write up your own derivation.**
Copy what the page shows. If the printed working is wrong or incomplete, say so
in `notes` and transcribe it faithfully anyway — a reader can act on a flagged
defect and cannot act on a silent substitution.

## The one check that matters

**Verify the printed solution actually solves the question in your handout.**

Four of this paper's solution entries solve an entirely DIFFERENT question from
the one they are numbered as — the entry headed `9.` works out a mean and
standard deviation while question 9 asks when `(z-1)/(z+1)` is purely imaginary;
likewise Q110, Q113 and Q116. Those are the four already known. There may be
others.

If the working does not match the stem, set `"solution": null` for that number
and say so in `notes`. **Do not attach it anyway.** A foreign solution on a
correct row is worse than no solution: the answer looks explained and is not.

A useful secondary signal: each printed entry heads with its own answer letter
(`1. (b)`). If that letter disagrees with the SETTLED ANSWER in your handout,
that is worth a note — it usually means you are looking at the wrong entry.

## Inputs

- **Handout**: `scripts/nda-mock/out/<id>/solwork/q<range>.md` — stems, options
  and the settled answer for your range.
- **Pages**: `scripts/nda-mock/out/<id>/pages/sol-p*.png` — the rendered
  solution PDF. Roughly five questions per page, in order, so your range maps to
  a predictable page span; read one page either side of it to be sure a solution
  that straddles a page break is captured whole.

## Output

Write `scripts/nda-mock/data/<id>.solutions.<range>.json` — a flat object keyed
by question number as a STRING:

```json
{
  "1": "Put \\(x = 1\\) in \\((\\alpha x^{2} - 2x + 1)^{35}\\): the sum of the coefficients is \\((\\alpha - 1)^{35}\\). Similarly for \\((x - \\alpha y)^{35}\\) it is \\((1 - \\alpha)^{35}\\). Equating gives \\(\\alpha = 1\\).",
  "9": null
}
```

- Math in `\\(...\\)` (inline). Use `\\[...\\]` only for a genuinely displayed
  block; a display zone inside a table cell breaks the row.
- Prose in plain English. Keep the paper's own steps and their order.
- `null` for a number whose printed solution does not match the question, or
  which the pages do not cover.

## Practical

- **Do not author JSON through a shell heredoc.** The shell eats backslashes and
  will turn `\\frac` into a control character. Use the Write tool.
- Do not use unicode math (`½`, `→`, `≤`) — write `\\frac{1}{2}`,
  `\\rightarrow`, `\\leq`. A bare glyph outside a math zone renders inconsistently
  and one inside it has no KaTeX metrics.
- If the source prints a table (a frequency distribution, say), write it as a
  GFM pipe-table WITH the `|---|` separator row. Without the separator nothing
  in this bank renders it as a table.
- Namespace any scratch file with your range — several agents share one
  scratch directory.
- Report at the end: how many you transcribed, which are `null` and why, and any
  number where the printed answer letter disagreed with the settled answer.
