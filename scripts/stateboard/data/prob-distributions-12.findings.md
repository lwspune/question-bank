# Probability Distributions (Ch.7) — transcription findings

99 rows committed PRIVATE 2026-08-12 (`inserted=99 skipped=0 failed=0`), six vision agents,
one per book block. Schema validated: 0 errors, 0 warnings.

**Still owed before PUBLIC** (steps 4-8 of `README.md`): blind MCQ verify (10 keys) ·
author 63 exercise-subjective solutions · `sections.ts` outline + backfill ·
answer-key cross-check GATE against the ANSWERS block at **Part-2 p282-283** ·
errata · `flip-public`.

## Defects the transcription found — the work list for the errata pass

None of these were repaired. All are transcribed as printed, per convention, and each was
confirmed on the rendered page at zoom rather than from the text layer.

### Not a valid p.d.f., though the book presents it as one
- **`7.4 SolvedEx.9`** — `f(x) = 3(1 - 2x^2)` on `0 < x < 1` integrates to exactly 1 **but is
  NEGATIVE for `x > 1/sqrt(2)`** (e.g. `f(0.9) = -1.86`). Non-negativity fails, so it is not a
  density; the c.d.f. `3x - 2x^3` the book derives from it is consequently non-monotonic on
  `(1/sqrt 2, 1)`. **Integrating to 1 is necessary, not sufficient — check the sign too.**
  Note `Misc 7 I (2)` keys the same `3x - 2x^3` c.d.f., so the two rows share this defect.
- **`7.4 SolvedEx.4`** — `f(x) = x^3/4` on `0 < x < 4` integrates to **16**, not 1. Judged a
  printed error rather than a find-k question, on strong internal evidence: `7.4 SolvedEx.2`
  *derives* that this exact density is valid only on `0 < x < 2`, and Ex.4 opens "Let's return
  to the example in which…", i.e. explicitly reuses it. Support should read `0 < x < 2`.

### Deliberately not summing to 1 — do NOT "fix" these
- `Ex 7.1 Q.3 (ii)/(iv)/(v)` sum to 0.9 / 0.95 / 0.9 and (ii) contains a negative probability.
  The question asks the student to identify which tables are **not** p.m.f.s. Repairing them
  would destroy the question.
- `Ex 7.1 Q.8` sums to `10k^2 + 9k`; part (i) is "determine k" (`k = 1/10`).
- `7.4 SolvedEx.6(ii)` — `x/2` on `-2 < x < 2` integrates to 0; the book itself answers
  "not a p.d.f.".

### Stem asks a different question than its own options
- **`Misc 7 I (5)`** — stem ends "then E(X) =" but all four options are relations between
  `a` and `b` (`a<b`, `a>b`, `a=b`, `a+b`). `E(X) = 2.5` matches no option. Keyed **C** on the
  evidently intended a-vs-b reading.

### Self-contradictory as printed
- **`7.3.2 SolvedEx.1`** — possible values listed as "4.50, 1, 2.50, 6" with **two minus signs
  dropped**; the solution's own four lines above give -4.50 and -1.00 and the prose says
  "a negative amount shows a loss to player A". Verified at 2x that no faint sign is present.
- **`Ex 7.2 Q.7 (iii)`** — prints `P(-0.5 < x or x > 0.5)`. As written the two conditions
  overlap and the union is just `x > -0.5`; the intended event is the two tails.
- **`7.3.3 SolvedEx.4`** — `P(X=1)` printed as `(4 x 48 x 27)/(52 x 51) = 32/221`; numerator
  should be `4 x 48 x 2`. As printed it is 5184, not 384. Stated result is correct.
- **`7.4 SolvedEx.5`** — prints `x^2/2 + x + 1/2 = (x^2 + 2x + 2)/2`; numerator should be
  `x^2 + 2x + 1`, and the book's own NEXT line `= (x+1)^2/2` is correct.

### Working defects with a correct final answer
- `7.4 SolvedEx.1` — integrand printed as `x^3` where `3x^2` belongs (`x^3` is the
  antiderivative), limits left as `c` to `d`; and the marked point `B(1/2, 1/8)` should be
  `B(1/2, 3/4)` — `1/8` is `F(1/2)`, not `f(1/2)`.
- `7.4 SolvedEx.2` — a solution line ends "…must be" with the completing word dropped.
- `7.4 SolvedEx.3` — lower limit printed `-0`.
- `7.4 SolvedEx.4` — stray equals: `= 1/16 = [x^4 - 0]` where `= (1/16)[x^4 - 0]` belongs.
- `7.4 SolvedEx.6(i)` — bracket as printed evaluates to -1; a leading minus is missing.
- `7.3.1 ForExample.2` — trailing ellipsis on a finite range (4 tosses, so x stops at 4).
- `7.3.2 SolvedEx.5` — doublet list prints "(5, 5, )" with a stray comma.

## Conventions this chapter forced

- **Tables are load-bearing here.** 32 GFM pipe tables emitted, every one with the mandatory
  `|---|` separator row. A distribution table IS the question's data — linearised into prose
  the question becomes unanswerable. Where one numbered question has sub-items, the table is
  REPEATED on each row so every bank row stands alone.
- **Endpoint strictness is transcribed exactly as printed, and the book is inconsistent**:
  the same `x/8` density uses `<` in `Ex 7.2 Q.2/Q.8` but `<=` elsewhere; `7.4 SolvedEx.5` is
  strict at 0 on its left branch and `<=` on its right. Do not normalise these.
- **Several p.d.f.s print no "= 0 otherwise" branch** (`7.4 SolvedEx.1/2/3/4/5`,
  `Ex 7.2 Q.1 (i)(ii)(iii)`, `Q.10`). None was invented.
- **The rupee glyph is kept as plain text OUTSIDE math zones** (`7.3.2 SolvedEx.1`,
  `Misc 7 II (11)`) — KaTeX has no `\rupee` macro, and dropping it loses the question's meaning.
- **Ref convention**: worked items the book prints as "For example" rather than "Ex. n" get a
  `<section> ForExample.n` ref so they cannot collide with a numbered block. The single boxed
  SOLVED EXAMPLES run covering 7.1-7.3.2 is prefixed `7.3.2 SolvedEx.n` (deepest preceding
  section) to stay unique against the sibling run after 7.3.3.

---

# Answer-key cross-check GATE — result (2026-08-13)

Chapter-7 answer block: **Part-2 ans-p282 (printed 273) → ans-p284 (printed 275)**.

**62 AGREE · 8 BOOK-WRONG · 1 OURS-WRONG · 28 NO-KEY-PRINTED** (0 illegible).

The 8 book-key errors are recorded as errata brackets on the live rows. Several are
self-refuting without any re-derivation: `Ex 7.1 Q.6` prints five terms with the binomial
coefficients omitted, which sum to 341/625 rather than 1; `Ex 7.1 Q.10` gives a variance of
9.7037 for a variable confined to [1,6], whose variance cannot exceed 6.25; `Ex 7.1 Q.15`
prints a variance and an s.d. that contradict each other (2.21^2 = 4.8841, not 4.9);
`Ex 7.2 Q.10` puts E(X^2) in the E(X) slot, which its own printed variance then reconciles
to -9.6156.

**The OURS-WRONG (fixed before flip):** `Ex 7.1 Q.1` led with the unsigned reading and
asserted "which is how the textbook intends it" — a claim the printed key
{-6,-4,-2,0,2,4,6} falsifies. Rewritten to lead with the signed reading, keep the unsigned
one as a note, and state which the key follows. The lesson is narrow and worth keeping: it
is fine to pick a reading of an ambiguous stem, but not to assert the book's INTENT unless
the key has actually been read.

## OPEN — needs a decision, does not block correctness

`Ex 7.1 Q.5` and `Misc 7 II (7)(ii)` carry near-identical "…appears on at least one die"
phrasing, and our two solutions LEAD with opposite readings:
  - `Ex 7.1 Q.5` leads with a per-die success count (binomial, X in {0,1,2}) -> 4/9, 4/9, 1/9
  - `Misc 7 II (7)(ii)` leads with one compound event about the PAIR (X in {0,1}) -> 25/36, 11/36
Both are defensible for their own stem — the gate independently confirmed each value, and the
book's key is wrong on BOTH — and each solution names the alternative reading in a note. So
this is a presentation-consistency question, not a correctness one. Someone should read the
two stems side by side and pick one convention.

## Structural book defects found by the gate (verdict AGREE, no row affected)

- The Misc-7 (II) answer block prints entries up to **(16)** while the exercise has only
  **15 questions**. Printed entry (16) is the key to question (15) (matches item for item).
  Printed entry (15), `k = 1/theta, 1/e`, corresponds to NO question in this edition's
  exercise — a stray leftover, most plausibly for an exponential density since removed.
  Our transcription is complete at 15; the defect is the book's.
- The `Ex 7.1 Q.3` answer block repeats the label `(iv)` where `(vi)` belongs.
