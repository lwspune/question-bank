# NCERT (CBSE Class 12) — blind MCQ re-derivation brief

You independently derive the correct answer for a chapter's MCQs. This is a BLIND pass, not
a review: the dump from `dump-mcq.ts` deliberately omits `is_correct`, so you cannot see the
ingested key — and you must not go looking for it, or for the NCERT answer key.

**Input** `scripts/ncert/data/<chapterId>.mcq-blind.json` — `{id, ref, stem, context, options[]}`.
**Output** `scripts/ncert/data/<chapterId>.blind.mcq-verify.json`:

```json
[{ "id": "<verbatim>", "ref": "<verbatim>", "derived_answer": "A|B|C|D", "solution": "<derivation>" }]
```

The field is **`derived_answer`** — NOT `answer`. A wrong field name makes the whole run
report as NULL. Copy `id` and `ref` byte-for-byte. Write with the **Write tool**, never a
shell heredoc.

## Why the comparison is not yours to make

`mark-mcq-verify.ts` computes agreement against the stored key OUTSIDE your output,
precisely so this check cannot report agreement with itself. **Never bend a conclusion
toward what you believe the book says.** If your derivation gives a letter, record that
letter. That failure is on record here: an agent once proved a relation was vacuously
transitive, then wrote "not transitive" because it thought that was the book's answer — and
the book said transitive. It was wrong twice over.

Where it is cheap, **confirm numerically** — evaluate both sides, scan an interval, test a
claimed root — rather than trusting an algebraic rearrangement. Then check your answer
against the four printed options and report honestly if **no** option matches, or if **more
than one** does. Both happen, and both are real defects worth catching.

## Your `solution` text SHIPS TO STUDENTS — two rules it must follow

This is the part that was missed once and cost a clean-up pass. `apply-solutions.ts` writes
your `solution` straight onto the question row, so it is read by students beside every other
solution in the bank. It is not scratch working.

**1. LaTeX for ALL math, inside `\(...\)`.** Never plain-text math and never raw unicode:
write `\(\vec a \cdot \vec b\)` not `a . b`, `\(\pi\)` not `pi` or `π`, `\(\ge\)` not `>=`,
`\(\theta\)` not `t`, `\(\tfrac{\pi}{2}\)` not `pi/2`. Plain connective words ("Let", "so",
"Hence") stay outside the math zones. A solution in plain text renders as plain text next to
hundreds that render properly.

**2. NEVER name an option by its LETTER** — not the answer, and not a distractor you are
ruling out. Write "which is why the OPEN interval \((0, \tfrac{\pi}{2})\) is not the
answer", never "which rules out option A". Two reasons, and the first is a live gate:

- The standing `npm run audit:keys` probe reads a named letter as the solution's concluded
  answer and fires `SOLN≠KEY` on it. A solution that dismisses (A) while concluding (B) is
  reported as a wrong key. That is a false positive **you** created, and it buries real ones.
- Option letters go stale. If options are ever reordered the prose silently starts naming
  the wrong one, and nothing checks it.

Name the option's **VALUE** instead. It is unambiguous, it survives reordering, and it
teaches better — a student reading "the open interval is excluded because both endpoints
satisfy the inequality" learns something that "not option A" does not tell them.

## Preserving an errata bracket

If a `solution` in this file already begins with a `[Textbook …]` bracket, it was put there
by `apply-errata.ts` after the cross-check adjudicated a book defect. **Keep it verbatim at
the very start** of any rewrite. `errata.ts` scans for a leading `[Textbook`, so a bracket
that moves stops being reported, and a bracket that is dropped is a finding silently lost.

Final message: per chapter, the count derived and the letters; then every row where no
option matched, where more than one did, or where you are less than confident.
