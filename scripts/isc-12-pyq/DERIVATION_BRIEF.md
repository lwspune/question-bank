# ISC Class 12 PCM: blind derivation + solution contract

You are solving **one** ISC (CISCE, Class 12) paper, question by question, as a
strong candidate would, and writing the worked solution a student will read on
PYQ Vault. Read this whole file before starting. Your output is a data file:
write it, then report a SHORT summary. Keep tool output small: never print whole
files or long command output.

---

## 1. What you are given, and what you must not look at

- `C:\tmp\PYQPs\ISC\XII\blind\<stem>\<stem>.blind.json`: every question of the
  paper (text, options, marks), **with no answers**.
- `C:\tmp\PYQPs\ISC\XII\blind\<stem>\figures\<ref>.png`: the printed figure for
  each row whose payload has a `figure` field. Open it with the Read tool.
- **You have NOT been given an answer key, and you must not look for one.** Do
  not open anything under `scripts\isc-12-pyq\data\`, `C:\tmp\PYQPs\ISC\XII\render\`
  or `C:\tmp\PYQPs\ISC\XII\2025\`: for 2025 the source pages print CISCE's answer
  beside each question, and seeing it ends the point of this exercise, which is
  to MEASURE how often an independent solver agrees with the official key.

## 2. Solve AS PRINTED

If a question is ambiguous or defective (an impossible value, two correct
options, no correct option), solve it as printed, say exactly what is wrong in
`flag`, and give the most defensible answer. Never repair the question and
answer the repaired version silently.

You may check arithmetic and algebra with Python/sympy. **A CAS result is not a
verdict**: `simplify()` returning non-zero, or `solve` returning nothing, is a
question, not evidence. Where a CAS disagrees with your hand working, test
numerically (substitute values) before trusting either.

## 3. What to write per row

```json
{
  "derivedBy": "short description of you",
  "answers": [
    {
      "ref": "1(i)",
      "label": "B",
      "value": "Null matrix",
      "working": "the student-facing solution (section 4)",
      "difficulty": "Easy",
      "confidence": "HIGH",
      "flag": "optional: anything wrong or doubtful about the question"
    }
  ]
}
```

- One entry per row in the payload, same `ref`. Both OR alternatives are rows.
- `label`: MCQ only. A/B/C/D where A is the FIRST option listed. `value`: the
  option's text (MCQ) or the final answer in short (subjective: the number with
  units, the identified compound, "proved", etc.). If your letter and text
  disagree, say so in `flag` rather than picking one.
- `difficulty`: `Easy`, `Moderate` or `Hard`, judged against a Class 12 board
  candidate (Section A one-markers are mostly Easy; a 5-6 mark multi-step
  question that needs an idea is Hard).
- `confidence`: `HIGH`, `MEDIUM` or `LOW`. Use LOW whenever you could not see
  something you needed.

## 4. The `working` field is the published solution

This text is shown to students under the question. Write it as a clear model
answer at board level, in English a 17-year-old reads easily.

- **MCQ**: explain why the right option is right (and, where it helps, why a
  tempting option is wrong), then end with the option, e.g. `So the answer is
  option (B), the null matrix.` Two to six sentences for a one-marker.
- **Subjective**: a complete model answer that would earn full marks: every
  step a board examiner expects, every part (a), (b), (i), (ii) answered in
  order under its label, final results with units. Proofs written out. For a
  "draw a diagram" part, describe what the diagram shows in words (labels,
  axes, directions); do not draw ASCII art.
- **Format**: maths inside `\( ... \)` only; NO unicode maths (`π √ ∫ ² ≤ × θ`
  are `\pi \sqrt{} \int ^2 \le \times \theta`). Chemistry formulae in
  `\(\mathrm{...}\)`, e.g. `\(\mathrm{K_2Cr_2O_7}\)`, reactions with
  `\longrightarrow` or `\xrightarrow{\mathrm{reagent}}`. Paragraphs separated
  by a blank line (`\n\n` in the JSON string). `**bold**` for a key term or a
  part label like `**(a)**`. A table, if needed, as a GFM pipe table with a
  `|---|---|` separator row. Decimal points as the question prints them (a
  question printing `0{\cdot}5` gets raised dots in its solution too).
- **No em dashes** (—) anywhere in what you write; use a full stop, colon,
  comma or brackets. Do not swap in " – " or " -- ".
- Do not mention "the marking scheme", "the key", "blind", "derivation" or
  yourself. If the question is defective, say so plainly to the student at the
  end ("Note: as printed, options (c) and (d) are also true of the zero
  matrix; (b) is the most specific answer.").
- JSON: every LaTeX backslash doubled (`"\\(x^2\\)"`). **Write the file with
  the Write tool, never a shell heredoc** (the shell eats backslashes). Balance
  every `\(` with `\)`.

## 5. Output and report

Write `C:\tmp\PYQPs\ISC\XII\blind\<stem>\derived.json`, then parse-check it
(`node -e "JSON.parse(require('fs').readFileSync('<file>','utf8'))"`) and check
every payload ref has an entry.

Reply in at most ~20 lines: row count, how many LOW/MEDIUM confidence and why,
and every `flag`.
