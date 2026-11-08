# IISER Aptitude Test (IAT): blind solve + solution contract

You are solving **one** IAT paper (one subject, 15 MCQs), as a strong
candidate would, and writing the worked solution a student reads on PYQ Vault.
Read this whole file first. Your output is a data file: write it, check it,
then reply with a SHORT summary. Keep tool output small.

## 1. What you are given, and what you must not look at

- `C:\tmp\PYQPs\IAT\blind\<stem>\<stem>.blind.json`: the questions with their
  four options, **no answers**. Options are labelled A, B, C, D in the order
  given (A = first).
- `C:\tmp\PYQPs\IAT\blind\<stem>\figures\`: the pictures named in a row's
  `figure` or `optionFigures`. Open them with the Read tool. `optionFigures[0]`
  is option A's picture, and so on.
- **You have no answer key and must not look for one.** Do not open anything
  under `scripts\iat\`, `C:\tmp\PYQPs\IAT\src`, `\render` or `\figures`, or any
  other folder under `\blind`. The original pages give the answer away; the
  point of this work is to MEASURE how often an independent solver agrees with
  IISER, and one look ends that.

## 2. Solve AS PRINTED

The IAT is set on the NCERT Class XI and XII books. If a question is defective
(no correct option, two correct options, an impossible value), solve it as
printed, say exactly what is wrong in `flag`, and give the most defensible
answer. Never repair the question silently. You may check arithmetic with
Python/sympy; a CAS result that disagrees with your hand working is a question,
not a verdict: substitute numbers before trusting either.

## 3. derived.json

```json
{
  "derivedBy": "short description of you",
  "answers": [
    {
      "ref": "1",
      "label": "B",
      "value": "the text of option B",
      "working": "the student-facing solution (section 4)",
      "difficulty": "Moderate",
      "confidence": "HIGH",
      "flag": "optional: anything wrong or doubtful"
    }
  ]
}
```

- One entry per payload row, same `ref`.
- `difficulty`: `Easy`, `Moderate` or `Hard` for a strong Class XII student
  sitting the IAT (one-idea recall = Easy; two linked steps = Moderate; an idea
  most candidates would not see, or long working = Hard).
- `confidence`: `HIGH`, `MEDIUM` or `LOW`; LOW whenever you could not see
  something you needed.

## 4. `working` is the published solution

Shown to students under the question. Clear, at Class XII level, in English a
17-year-old reads easily. Explain why the right option is right and, where it
helps, why the tempting one is wrong; show every step of a calculation; end
with the option, e.g. `So the answer is option (B).` Usually 3 to 8 sentences.

- Maths in `\( ... \)` only. No unicode maths (`π √ ∫ ² ≤ × θ λ`). Chemistry in
  `\(\mathrm{...}\)`. Paragraphs separated by a blank line (`\n\n` in JSON).
  `**bold**` for a key term. A table as a GFM pipe table.
- **No em dashes** (—) anywhere, and no " – " or " -- " either: use a full stop,
  colon, comma or brackets.
- Never mention a key, "blind", "derivation" or yourself. If the question is
  defective, tell the student plainly at the end ("Note: as printed, ...").
- JSON: every LaTeX backslash doubled. **Write with the Write tool, never a
  shell heredoc.** Balance every `\(` with `\)`.

## 5. Output and report

Write `derived.json` in the same folder as the payload, then check it:
`node -e "const a=JSON.parse(require('fs').readFileSync('<file>','utf8')).answers;console.log(a.length)"`.

Reply in at most ~15 lines: row count, LOW/MEDIUM rows and why, every `flag`.
