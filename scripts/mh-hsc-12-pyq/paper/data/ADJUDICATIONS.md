# Adjudicated stems — printed-page verdicts

Every transcription pass reports stems that look defective. **A defect report is
a hypothesis about whose defect it is, and on this corpus the printed page has
reversed such calls in BOTH directions.** So each one is checked against the
rendered page by hand, and the verdict is recorded here rather than left in a
subagent's report.

The transcription is always AS PRINTED. Nothing below changes a stem.

---

## jun-2026 (J-276)

### `Q. 1. (iii)` — REAL, and the dangerous kind · both candidates are options

Printed: `p̂·(q̂×r̂) + q̂·(p̂×r̂) + r̂·(p̂×q̂) = …` for mutually perpendicular
right-handed unit vectors. Options: (a) −2 · (b) 0 · (c) 1 · (d) 3.

The standard identity cycles the letters, and the middle term here does not —
it is the **anti-cyclic** `q̂·(p̂×r̂)`. Taking `p̂ = î`, `q̂ = ĵ`, `r̂ = k̂`:

| term | as printed | value |
|---|---|---|
| `p̂·(q̂×r̂)` | `î·(ĵ×k̂) = î·î` | `+1` |
| `q̂·(p̂×r̂)` | `ĵ·(î×k̂) = ĵ·(−ĵ)` | `−1` |
| `r̂·(p̂×q̂)` | `k̂·(î×ĵ) = k̂·k̂` | `+1` |

**As printed the sum is 1, option (c).** The cyclic form intended by the
textbook gives 3, option (d).

⚠ **Both 1 and 3 are on the option list.** A derivation that silently "repairs"
the stem lands on a different letter and looks entirely sound doing it. This is
why the brief says solve as printed: a repaired stem here is unrecoverable.

Verdict: **printed as intended by the board or not, (c) is the answer to the
question on the page.** Flagged to both key passes.

### `Q. 7` — NOT a defect. The reporting pass was wrong.

Printed: `10ā = 7b̄ + 3c̄`, then "find the ratio in which the point `C` divides
the line segment `AB`".

The transcription pass reported this as malformed, on the grounds that the
relation "solves for A, not C". It does not. Rearranged, `c̄ = (10ā − 7b̄)/3`,
and the section formula `c̄ = (m·b̄ + n·ā)/(m+n)` matches at `m : n = −7 : 10`.
The coefficients sum to 1 (`10/3 − 7/3 = 1`), which is precisely the condition
for `C` to lie on line `AB`.

**A negative ratio means EXTERNAL division, not an impossible one.** C divides
AB externally in the ratio 7 : 10. The stem is well-formed and standard.

### `Q. 8` — not a defect

Both lines share the base point `(î + 2ĵ + 3k̂)`. The angle between two lines
depends only on their direction vectors, so a common point changes nothing. The
lines genuinely intersect there; that is all.

### `Q. 13` — scaffold vs page, page wins

The lossy text scaffold rendered the probability row as `0.1 2k 2k k k`; the
printed table reads `0.1 k 2k 2k k`. Transcribed from the page. This changes the
value of `k`, so it is the load-bearing correction of that pass — and a reminder
that the scaffold is for numbering and prose, never for content.

---

## jul-2025 (J-384)

### `Q. 13` — REAL, and printed that way

Printed: `∫` with **−1 on top and 0 on the bottom** of `e^{-x} dx`, i.e.
`\int_{0}^{-1} e^{-x}\,dx`. Verified directly on `p-05.png` at full render.

Reversed limits are unusual but perfectly well-defined: the value is
`1 - e ≈ −1.718`. Almost certainly a typo for `∫₀¹`, but it is answerable as
printed and a solver who silently corrects it returns a value that disagrees
with the question. Transcribed as printed; flagged to both key passes.

### `Q. 1. (i)` — the item is weak, and the key survives anyway

Printed: "The inverse of statement pattern `(p v q) -> (p ^ q)` is ____", with
options including (A) `(p ^ q) -> (p v q)` and (C) `(~p ^ ~q) -> (~p v ~q)`.

**(A) and (C) have identical truth tables.** Both are tautologies. That is not a
coincidence and not a misprint: the INVERSE and the CONVERSE of a conditional are
always logically equivalent, and (A) is exactly the converse.

| p | q | inverse | (A) | (B) | (C) | (D) |
|---|---|---|---|---|---|---|
| T | T | T | T | T | T | T |
| T | F | T | T | T | T | F |
| F | T | T | T | T | T | F |
| F | F | T | T | F | T | T |

So the question is well-posed only if "inverse" is read as a **statement pattern**
— a syntactic form, `~antecedent -> ~consequent` with De Morgan applied — which
IS the Maharashtra textbook's definition. Under that reading (C) is uniquely
correct, and both derivations answered C.

A student who picks (A) on truth-functional grounds has reasoned correctly about
the logic and incorrectly about what the word "inverse" names. The authored
solution says so, rather than leaving them to think they simply got it wrong.

Verdict: **key (C), item flagged as weak.** Nothing to repair — the paper is as
printed and the answer is determinate under the syllabus definition.

### `Q. 12` — not a defect, verified rather than assumed

Printed `∫ dx/(x + x^{-10})` with a **negative** exponent. Confirmed on the page.
It reduces to `∫ x^{10}dx/(x^{11}+1)` and is entirely solvable; it is simply the
unusual spelling of the standard item.

### `Q. 1. (iv)` — not a defect

Both lines share a base point, as in jun-2026 `Q. 8`. Same reasoning.

---

## What this file is for

Two things, both learned here:

1. **Check the page yourself.** Of the six reports above, one was a real trap
   worth the whole exercise, one was simply wrong, and four were correct-but-
   benign. Accepting all six would have been as bad as accepting none.
2. **Write the verdict down.** These stems will look wrong again to the next
   reader — that is what makes them worth recording. Without this file the same
   adjudication gets re-run, or worse, silently repaired.

---

## Settled conventions

Questions a lane asked, answered once here so they are not re-litigated.

### Polar co-ordinates: theta in [0, 2pi), r > 0

A jul-2024 lane asked which range to use for a fourth-quadrant point, having
found no precedent in this lane's files. There IS one, in the DB rather than
here: the Balbharati solved example `3.2 SolvedEx.Polar.2` takes the point
`(1/sqrt2, -1/sqrt2)` and gives `theta = 7pi/4`, not `-pi/4`.

So the house convention is **`theta` in `[0, 2pi)` with `r > 0`**, and jul-2024
`Q. 5`'s answer of `(2, 5pi/3)` follows it. Naming the equivalent negative angle
alongside is fine; leading with it is not.

The wider point: the precedent for a convention is usually in the BANK, not in
the lane's working files. Query the shipped solutions before deciding one.

### Scratchpad filenames are not lane-scoped

Concurrent lanes share a scratchpad. A jul-2024 lane had its `check2.py`
overwritten mid-run by another lane's file of the same name. No output was
corrupted, because each lane's JSON lives under its own paper directory, but the
near-miss is real: `solutions-laneA.json` is unique only because the PAPER
directory differs, not because the name does.

Lanes should write scratch files under a name carrying the paper id.
