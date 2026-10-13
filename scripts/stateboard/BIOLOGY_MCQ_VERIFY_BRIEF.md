# Blind MCQ re-derivation brief: Balbharati BIOLOGY, Std XI and Std XII

Step 4 of the state-board runbook, for the two Biology books (`<lane>` is
`scripts/stateboard` for Std XII, `scripts/mh-sb-11` for Std XI). Companion to
`BIOLOGY_BRIEF.md` and `BIOLOGY_SOLUTION_BRIEF.md`.

The transcription agent already keyed each MCQ. You have NOT seen that key, and you
must not look for it: do not open `<id>.ex.json`, `<id>.questions.json` or query the
database. A check that has seen the answer stops being a check.

## Inputs, per chapter

- `<lane>/data/<id>.mcq-blind.json`: the chapter's MCQs, key withheld (`id, ref,
  stem, context, options`).
- `<lane>/out/<id>.text.md`: the chapter's full text. Read it in full first.
- `<lane>/out/<id>/p-*.png` if an MCQ points at a printed figure (the stem says so).

## What to do

Solve every MCQ from scratch. Use the chapter first; where the chapter does not
settle it, use standard school biology and say so.

`derived_answer` is ONE letter, or `null` when no single option is correct as printed:
two options both true, none true, or the question malformed. Say which in the
solution. Do not force a letter onto a broken question.

## Output: `<lane>/data/<id>.mcq-verify.json`

```json
[{ "id": "<uuid copied exactly>", "ref": "Ex Q1(3)", "derived_answer": "C",
   "solution": "**(C)** <the option text as printed>\n\n<why>" }]
```

The `solution` is what students read. Write it to that standard:
- Open with `**(X)** <option text exactly as printed>`, then a blank line, then 2 to 4
  sentences on WHY, naming what makes the other options wrong where that teaches
  something. No other option letter may appear after the opening.
- When `derived_answer` is null, open instead with one line saying what is wrong with
  the question, then explain what each relevant option says.
- When the chapter does not settle it and you used standard biology, end with
  `[Note: the chapter does not state this; standard biology gives ...]`.
- Scientific names in *italics*, formulas in LaTeX (`\(\text{CO}_2\)`). No em dashes.
- Write with the **Write tool**, never a heredoc or `python -c`.

## Report back

Per chapter: MCQs solved, every `null` with the reason, every answer that rested on
standard biology rather than the chapter. Do not paste the solutions.
