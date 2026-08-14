# Worksheets blind-verification agent brief

The contract every verification agent works to. Kept here rather than retyped
into each dispatch message — Batch J fans out 47 packets at once, and a prompt
that lives in the dispatch drifts between waves.

Two passes are defined. Your dispatch names which one you are running.

---

## Why this exists

The Cadetprep source's answer keys and worked solutions are AI-generated and
unreliable: roughly 5% of keys are wrong, and the wrong ones look confident.
A probe can only catch a solution that contradicts itself, so every key is
re-derived from scratch by someone who cannot see it. Your derivation is
evidence for a human adjudicator — it is never applied automatically.

## Blindness rules (both passes)

The packet gives you the stem and the four options and NOTHING else. The key
and the worked solution are withheld deliberately.

**Do not go looking for them.** Do not open the source Excel under `C:\Vilas\`,
`scripts/worksheets/data/*`, `scripts/worksheets/out/*/derived-*.json`, or the
database. If you encounter a key anyway, ignore it and derive your own answer.
A contaminated pass is worse than no pass, because it looks like corroboration.

## What to return

A JSON **array**, nothing else, one object per question **in the packet**:

```json
{ "id": "03-17", "derived": "A", "confidence": "high", "note": "" }
```

- `derived` — the letter whose option text equals YOUR computed answer, or
  `"X"`.
- `"X"` means **no option matches your answer**, or the stem is broken,
  impossible, or genuinely ambiguous. When you return `X` the note MUST state
  your computed value, or exactly why the stem cannot be answered, so a human
  can repair the option or the stem.
- `confidence` — `high` / `medium` / `low`.
- `note` — under ~15 words unless you are explaining an `X` or a twin.

**Pass 2 additionally requires a `value` field** (see below).

## The TWIN check — the most common defect in this source

Before answering, check whether **two or more options are mathematically EQUAL
to each other**. If so, still give the letter you would pick, but START the note
with `TWIN: A=C` naming the equal letters. Never silently pick one of a pair.

This matters more than it sounds. When the keyed option and your derived option
are the same VALUE, the key is CORRECT and the right repair is to the option
text — not a key flip. Batch H produced 21 illusory "flips" this way and Batch I
produced 15 more, because one file duplicated its keyed answer verbatim into
option A. Flagging the twin is what stops a correct key being overwritten.

Recurring twin shapes:

- rationalised vs unrationalised surds — `20/√3` and `20√3/3`
- `nCr` and `nC(n−r)`; the same angle as `tan⁻¹(8/15)`, `sin⁻¹(8/17)`, `cos⁻¹(15/17)`
- `cot x` beside `cos x / sin x`; factored beside expanded; `log` vs `ln` convention
- equations of the same line/circle/plane scaled by a non-zero constant
- the same set in interval vs set-builder notation, or a union in the other order
- antiderivatives differing by a CONSTANT (`arctan x` and `−arccot x`) — both valid
- unsimplified fractions, commuted products, and byte-identical duplicates

## Two simultaneously-true options

If two options are both true (not merely equal — genuinely both correct answers
to the question as asked), say so explicitly in the note. That is a real defect
class here, not indecision, and the adjudicator needs to know which two.

## Rigour

Work each problem properly and do not pattern-match to what "looks like" the
textbook answer. Where a cheap independent check exists, do it: differentiate an
antiderivative back, substitute a concrete value into an identity, test each
endpoint of an interval against the original inequality, convert a base and
convert it back. Say in the note when you have done so.

Math is inside `\( ... \)` LaTeX zones.

---

## PASS 1 — first derivation

Run over a whole subtopic packet (`out/<chapter>/verify-NN.json`, shape
`{subtopic, questions:[{id, stem, options:{A,B,C,D}}]}`).

Write the array to `out/<chapter>/derived-NN.json`.

Final message: ONE line — total, count of X, count of TWIN notes, count of
low-confidence.

## PASS 2 — independent recheck of disputed rows

Run over `out/<chapter>/recheck.json`, which holds ONLY the rows where pass 1
disagreed with the source key. You are **not** told which way either the key or
pass 1 went, and must not look.

**`value` is REQUIRED on every object and is the entire point of this pass.**
State what YOU computed, in plain terms and independently of the options —
`"pi/3"`, `"(-2, 0] U (2, inf)"`, `"1/(2(1+x^2))"`, `"101101 binary = 45 decimal"`.
The crosstab then compares two derivations of the same QUANTITY rather than two
letter guesses, which is what makes a dual confirmation meaningful.

Write the array to `out/<chapter>/recheck-verdicts.json`.

Final message: ONE line — total, count of X, count of TWIN, count of
two-simultaneously-true rows.

## TWIN REPAIR — draft replacement distractors

Run over `out/<chapter>/twin-dossier.json`, which holds rows where pass 1 flagged
a twin (or a second true option) but AGREED with the source key. **The key is
correct on every row here** — that is the selection criterion. Your job is not
to check the answer; it is to propose a replacement for the REDUNDANT option so
the question stops offering one answer twice.

This dossier deliberately includes the key and the source solution, because you
cannot tell which option must survive without them. It is not a blind task.

For each row return:

```json
{ "id": "05-14", "replace": "B", "with": "\\(\\frac{2\\sqrt{5}}{5}\\)",
  "why": "B was 2/sqrt(5), the keyed A rationalised — same value.",
  "check": "at the stem's data B now evaluates to 0.63 vs the correct 0.89" }
```

- `replace` — the letter to overwrite. **Never the keyed letter.** When several
  options tie, replace all but the keyed one and return one object per letter.
- `with` — the new option text, in the same LaTeX style as its siblings.
- `why` — what made the old option redundant.
- `check` — your evidence that the NEW text is actually WRONG for this stem.
  This is the field that matters: a "repair" that happens to also be correct
  turns one defect into a worse one.

Rules for a good replacement:

- It must be **wrong**, and wrong for a reason a student might actually produce
  — a dropped sign, an un-rationalised slip, the reciprocal, the complement, the
  supplement, a factor of 2, the other cyclic permutation. Not noise.
- It must be **distinct from all three surviving options**, in VALUE and not
  merely in appearance. Check it against each of them.
- It must be the same KIND of object as its siblings (an interval stays an
  interval, a matrix stays a matrix of the same order, an angle stays an angle).
- Keep the LaTeX conventions of the row you are editing.
- If a row's defect is not a redundant option at all — the stem is broken, or
  the question has no correct answer — do NOT invent a repair. Return
  `{"id": ..., "replace": null, "why": "...", "check": "..."}` and say what is
  actually wrong. The adjudicator will handle it.

Write the array to `out/<chapter>/twin-repairs.json`.

Final message: ONE line — rows in, repairs proposed, rows returned as `null`.

---

## Writing the file

Use the **Write tool**. Never write JSON through a shell heredoc or `node -e`:
this environment eats backslashes and will silently corrupt every LaTeX zone in
your output.
