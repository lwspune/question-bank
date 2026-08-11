# Solution-authoring brief — MH State Board Class 10, Geometry

The contract for authoring model solutions to a Balbharati **Mathematics**
chapter. The sibling `HUMANITIES_SOLUTION_BRIEF.md` covers the prose books,
where the risk is a fluent invention. Here the risk is different, and so is the
discipline.

## 0. What you can and cannot check against

This book **does** print an answer key at the back, and it has been transcribed
for you. That splits every question into one of two regimes, and you must know
which one you are in:

| Regime | Questions | What you check against |
|---|---|---|
| **Keyed** | every numeric question | the printed final answer |
| **Unkeyed** | the 8 "prove that" questions | nothing — see §3 |

The unkeyed ones are: Practice set 2.1 Q.9 · Practice set 2.2 Q.3, Q.5 ·
Problem set 2 Q.8, Q.9, Q.11, Q.13, Q.16. Every other question has a printed
answer.

## 1. Inputs

- **Questions to answer**: the dump you are given, `{id, ref, stem, context, subtopic}`.
- **The printed answer key**: `data/pythagoras-10.answers.json`.
- **The chapter's own toolkit — READ THIS FIRST, IN FULL**:
  `out/_chapter-theorems.md`. Every theorem, property and corollary the chapter
  states, with whether the book proves it or merely recalls it.
- Rendered pages `out/pythagoras-10/p-*.png` when a figure matters.

## 2. Ground every step in THIS chapter

A solution must be one a student could write having studied only this chapter.
The chapter's toolkit is small and the reference file lists it exactly. Notably
the chapter gives you Pythagoras and its converse, the geometric-mean theorem,
the similarity-of-right-triangles theorem, the 30-60-90 and 45-45-90 ratios,
the acute- and obtuse-angle extensions, and Apollonius — **and nothing else**.

It does **not** give you trigonometry (no sin/cos/tan appears anywhere in the
chapter), the median-to-hypotenuse result, the section/midpoint formula, or the
centroid ratio. Do not reach for them. If a question seems to need one, say so
explicitly rather than quietly importing it.

Name the result you invoke, in the book's own words: "by the theorem of geometric
mean", "by Apollonius' theorem", "by the converse of Pythagoras' theorem".

## 3. The 8 unkeyed proofs

These have no printed answer, so nothing downstream can catch a wrong one. Two
requirements:

1. **Every step cites a result the chapter has established.** A proof that leans
   on an unstated result is worse than no proof, because it reads as authoritative.
2. **Verify the claim numerically before you write the proof.** Pick concrete
   numbers satisfying the hypotheses, compute both sides, confirm they agree.
   If they do not, you have either misread the stem or found a book defect —
   report it, do not paper over it. Say in your report which numbers you used.

Where the chapter explicitly leaves a case to the student (it does this once, for
Apollonius when the median is perpendicular to the base), handle it.

## 4. The keyed questions — verify, never restate

**Derive the answer yourself first. Then compare with the printed key.**

- **They agree** → write the solution. Normal case.
- **They disagree** → do NOT bend your working to reach the printed value, and do
  NOT silently adopt it. Re-derive once, carefully. If you still disagree, write
  your derivation and flag it (§6). The Balbharati key is wrong roughly four
  times as often as our authored answers across the chapters ingested so far, so
  a disagreement is genuinely more likely to be the book's error than yours —
  but it is a *finding to report*, never a conclusion to assume.

A CAS or a calculator returning "no solution" is a question, not a verdict.
Test the claimed value directly before declaring anything wrong.

## 5. Style

- Class 10 register: numbered steps, each a short line. No preamble.
- Inline maths in `\( ... \)`. Use `\triangle`, `\angle`, `\perp`, `\cong`,
  `\therefore`, `\parallel`, `\sqrt{}`, `\square`. Never unicode maths outside a
  math zone; never an empty `\(\)`; never a zone ending in a lone backslash.
- Show the substitution, not just the result: `\(NQ^2 = MQ \times QP = 9 \times 4 = 36\)`,
  then `\(\therefore NQ = 6\)`.
- **Leave surds exact.** `\(6\sqrt{3}\)`, not `10.39`. The book does.
- A "prove that" answer ends at the thing to be proved, with `\(\therefore\)` and
  the statement — not with a decimal.

## 6. Report back

State, precisely:

1. How many solutions you wrote, and diff the **ref → id pairing** you were given
   against the one you emitted. Do not merely check the count: a permutation
   loses nothing from a set and silently shifts every answer onto its neighbour.
2. For each **keyed** question: AGREE, or DISAGREE with your value and the
   book's, and your derivation. Do not omit the agreements — the count is the
   evidence the check actually ran.
3. For each **unkeyed** proof: the concrete numbers you verified it with.
4. Any question you could not answer from this chapter's toolkit alone, naming
   the result it would need.
5. Any suspected book defect — quote it exactly, do not correct it silently.
