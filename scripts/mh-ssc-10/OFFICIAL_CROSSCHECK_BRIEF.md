# MH-SSC-10 official-copy cross-check brief

You compare ONE already-shipped March board paper, as the bank stores it, against
the **board's own born-digital copy of the same paper**. You change nothing. You
write one findings file.

## Why this exists

The March 2024, 2025 and 2026 papers were transcribed by vision from SCANS: no
text layer, pencil marks on some pages, and a reader guessing at faint glyphs.
On 2026-10-13 the board's site (mahahsscboard.in/en/questionPaper) turned out to
publish clean typeset copies of exactly these papers. This pass finds what the
scan reading got wrong: a dropped minus sign, a misread number, a wrong word, a
missed sub-question or alternative, an option that is not what was printed.

Every finding you report becomes a candidate edit to a question students already
see, so the bar is: **a difference in what the question SAYS**, not in how it is
typed.

## Inputs, for paper `<id>`

| file | what it is |
|---|---|
| `scripts/mh-ssc-10/out/<id>/answers.md` | what the bank stores: each row's ref, stem, context, options (stored key marked `→`) and solution |
| `scripts/mh-ssc-10/out/<id>/official/text.md` | the official copy's text layer, page by page |
| `scripts/mh-ssc-10/out/<id>/official/p-NN.png` | the official copy, rendered. **The truth.** |
| `scripts/mh-ssc-10/data/<id>.questions.json` | the transcription the bank was built from (same content as the stored rows, plus figure flags) |

## First: is it the same paper?

Read the official cover: subject, `(E)`, the `N <code>` and the date line
(`<year> III <day>`). Then check the first few questions against the stored
rows. If the official copy is a DIFFERENT paper (another code, another set),
stop and report that. Do not cross-check two different papers.

## Read maths from the image, never the text layer

Measured on the supplementary copies of these same papers: the text layer keeps
prose, numbering and marks intact, but **drops minus signs** (`-1/7` arrives as
`1/7`), splits fractions across lines and loses powers, roots and chemical
subscripts. A "difference" you find only in `text.md` is not a finding until the
PNG confirms it. Prose wording may be taken from `text.md`.

## What counts as a finding

Report it when the bank's row says something different from the official print:

- **NUMBER / SIGN**: a value, sign, unit, exponent, angle, coordinate, year.
- **WORDING**: a word that changes the meaning (an instruction, a name, a term,
  "not" dropped, "increase" for "decrease").
- **OPTION**: an option's text differs, or options are in the wrong order or
  wrong letters.
- **MISSING_ROW**: a printed question, sub-question or internal-choice
  alternative with no row in the bank. Give its printed ref and full text.
- **EXTRA_ROW**: a stored row with no printed counterpart.
- **STRUCTURE**: a stored row merges two printed sub-questions, or splits one,
  or carries the wrong ref.
- **FIGURE**: the question depends on a printed figure the row does not flag, or
  the stem describes a figure differently from the print.
- **TABLE**: a printed table's cells differ from the stored pipe-table.

**Not a finding** (ignore, do not list): spacing, line breaks, LaTeX notation for
the same expression (`\frac{1}{2}` vs `1/2`), quote style, `Rs.` vs `₹`, `(i)`
vs `(1)` numbering style, capitalisation, a trailing full stop, the printed
marks box.

## When a finding touches the answer

If the corrected reading changes what the answer should be, **derive the answer
yourself from the official print** and say whether the stored key and solution
still hold. Do this BEFORE you read the stored key's working for that row, and
say in the finding which you did first. A wrong reading usually means a wrong
key: the original solver solved the question it was given.

## Output

Write `scripts/mh-ssc-10/data/<id>.official.json` with the Write tool (never a
shell heredoc, `python -c` or `node -e`; they eat backslashes):

```jsonc
{
  "paper": "<id>",
  "officialCover": "N 619, 2024 III 13, ALGEBRA PART I (E)",
  "samePaper": true,
  "rows": [
    // ONE entry per STORED row, in paper order, verdict MATCH or DIFFERS.
    { "ref": "Q1(A)(i)", "verdict": "MATCH" },
    { "ref": "Q2(B)(iii)", "verdict": "DIFFERS", "findings": [
      { "kind": "SIGN", "field": "stem",
        "ours": "the exact stored fragment",
        "official": "the printed fragment, in our LaTeX convention",
        "effect": "changes the answer",          // or "changes the meaning" | "minor"
        "answerCheck": "Derived from the print first: x = -2. Stored key gives x = 2, so the key and solution must change.",
        "proposed": "the full corrected value for this field, ready to store, or null" } ] }
  ],
  "missingFromBank": [
    { "printedRef": "Q3(B)(iv)", "text": "the full printed question, in our LaTeX convention", "note": "" }
  ]
}
```

`proposed` must be the WHOLE field (the whole stem, or the whole options array),
not a fragment, written to the bank's conventions: maths in `\( … \)`, no
Unicode maths, tables as GFM pipe-tables with the `|---|` row. A stem edit
changes the question's fingerprint, so the main session applies it with the
lane's own hash builder; you only propose.

## Before you report

1. **One `rows` entry per stored row.** Diff the set of refs in `answers.md`
   against your `rows` refs. Not a count: a permutation passes a count.
2. **Every printed question is accounted for**: either matched to a stored row
   or listed in `missingFromBank`.
3. Every DIFFERS finding was confirmed on a PNG, not only in `text.md`.

## Report back

Rows checked, MATCH count, DIFFERS count by kind, every finding marked "changes
the answer" (ref + one line), every missing row, and anything that made you
doubt this was the same paper. Do not paste the stored solutions.

You may not edit any file except `data/<id>.official.json`, and you may not
touch the database. Prefix any scratch file with `_tmp_<id>_official_`.
