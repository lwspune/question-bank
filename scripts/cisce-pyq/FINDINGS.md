# CISCE PYQs (ISC Class 12 · ICSE Class 10) — adjudicated findings

One entry per question where an independent blind derivation disagreed with
CISCE's official marking scheme, or where the paper itself looks defective.

**A disagreement is a LEAD, not a verdict.** It can mean our derivation is
wrong, the printed key is wrong, or the question is defective — this project's
history says all three happen, and the third is the one that gets mis-filed.

**Convention for a wrong official key: PRESERVE the key, FIX the solution.**
CISCE *issued* this key and every candidate who sat the paper was marked against
it, so overriding it would misrepresent the exam. The honest note goes in the
solution. This is the `defect_preserved` verdict, and it is the same call the
NDA Geography `8f34b21d` row took (bank solution corrected, official key C kept).
It differs from the UPSC case only because UPSC issues no key at all, so there
was nothing to override there.

---

## 2025 · Mathematics · Q1

Blind pass: 10/11 MCQ agreement with the official key (90.9%), 1 disagreement,
4 free-response rows adjudicated below, 1 grace row absorbed correctly.

### 1(ix) — official key appears WRONG. Key preserved, solution to carry a note.

> **Assertion:** If Set A has *m* elements, Set B has *n* elements and *n* < *m*,
> then the number of one-one function(s) from A → B is zero.
>
> **Reason:** A function *f* : A → B is defined only if all elements in Set A
> have an image in Set B.

| | |
|---|---|
| Official (CISCE) | **(c)** Assertion is true and Reason is false. |
| Blind derivation | **(a)** Both true, and Reason is the correct explanation. |

**Adjudication.** The Assertion is true (pigeonhole) and both sides agree on
that. The disagreement is entirely about the Reason, and the Reason **is a
correct statement of the definition of a function**: a function on domain A must
be total on A, so "defined only if all elements in Set A have an image" is true.
For the official (c) to hold, that sentence would have to be false, and no
reading of it as printed makes it so.

Two defensible answers therefore exist — **(a)** if totality is accepted as the
explanation (it is the load-bearing hypothesis: without it you could injectively
map a size-*n* subset of A and the Assertion would fail), or **(b)** if the
explanation is judged incomplete for not naming injectivity. Both require the
Reason to be **true**. (c) requires it to be false.

**CISCE offers no justification.** Its own Comments of Examiners for (ix) read
only *"Some candidates showed a lack of understanding about the mapping of
functions with non-equal elements in both sets"* — which addresses the Assertion
and is silent on the Reason.

**Disposition:** ship with `correct = C` (CISCE's issued key) and a solution
that states plainly that the Reason is a correct statement of the definition,
that the question is therefore contestable, and that (a) is the mathematically
defensible answer. Do NOT silently ship (c) as though it were sound, and do NOT
overwrite it with (a).

### 1(v) — GRACE (two accepted answers), handled, not a defect

CISCE printed **both** "(c) Assertion is true and Reason is false." **and**
"(a) Both Assertion and Reason are true and Reason is the correct explanation"
as acceptable. The blind pass reached (c); either would be correct.

This is the `grace` case the mock engine already models (full marks to all, no
penalty). Recorded as a list of accepted labels rather than flattened to one —
flattening would both manufacture a disagreement against whichever branch a
deriver reached and ship a question that marks a correct student wrong.

Worth noting the deriver independently flagged the Assertion as *not a
proposition* — it is printed as an imperative ("Consider the two events A and B
such that…"), so it must be reinterpreted as a claim before true/false applies.
That is plausibly why CISCE accepted both.

### 1(xii), 1(xiii), 1(xiv), 1(xv) — free response, all AGREE on reading

Routed to adjudication because CISCE prints several equivalent forms and no
string comparison is honest. Read side by side, all four match:

| ref | derived | official |
|---|---|---|
| 1(xii) | `R = {(1,1), (2,2), (3,3)}` | identical |
| 1(xiii) | `x = 2` | identical |
| 1(xiv) | `60/343` | `60/343`, also accepting `0.175`, `0.18`, `0.17`, `5/7 × 4/7 × 3/7` |
| 1(xv) | `5√(2x+7) + C` | identical |

So the honest whole-block figure is **14 of 15 agree, 1 contested** — and the
contested one is contested in CISCE's direction, not ours.

---

## Paper defects noted but NOT blocking

These were raised by the blind pass and are recorded so a later reader does not
re-discover them. None changes an answer.

* **1(i) — overlapping options.** \(A^{16} = O\). The zero matrix *is* diagonal
  and *is* skew-symmetric, so options (c) and (d) are not strictly false of it;
  only (b) is uniquely specific. Answerable, but three options are
  simultaneously satisfiable.
* **1(ii) — option (c) looks like a typo.** As printed,
  \((x^3 + 2y^2)dx + 2xy\,dy = 0\) has \(M\) of mixed degree (3 and 2) and is not
  homogeneous; it reads like an intended \(x^2 + 2y^2\). Transcribed and solved
  **as printed** — exactly one option (d) is correct either way, so the question
  still works. Do not "repair" the stem.
* **1(iii) — answer rests on a figure.** The graph must be cropped from APUP p8
  and attached before this row goes PUBLIC; the derivation used a described
  figure, not a seen one, and its confidence was MEDIUM for that reason.

---

## Method note — a CAS returning an answer is not evidence

While deriving 1(viii), sympy's symbolic `limit` on a `Piecewise` returned a
**wrong** left-limit at \(x = 0\), mis-resolving the branch ordering. It was
caught only because it contradicted the hand derivation, and settled by direct
numerical evaluation either side of each seam.

This is the same shape CLAUDE.md already records for `simplify()` and for
`solve`/`solveset` misses: a CAS result that disagrees with a hand derivation is
a question, never a verdict.

---

## 2025 · whole corpus (2026-10-30)

Every 2025 row was blind-solved by an agent that never saw the source pages,
then compared with CISCE's marking scheme row by row.

| Paper | MCQ agree | Written answers agree (read, not string-matched) |
|---|---|---|
| Mathematics | 14/15 | 36/36 |
| Physics | 7/7 | 32/32 |
| Chemistry | 7/7 | 30/30 |
| **All** | **28/29** | **98/98** |

The one MCQ difference is 1(ix) above, CISCE's own key, kept. Two Maths rows are
GRACE (CISCE printed two accepted letters): 1(v) (c or a) and 15(i) (a or b).
The bank keys the first letter printed, which is also the blind answer, and the
solution tells the student both were accepted.

Written answers that differed only in form, recorded so nobody re-opens them:
Maths 12(i) `x = 5y^2 - 3y` vs CISCE `x/y = 5y - 3`; 7 the same factorised
determinant in a different sign order; Physics 16(ii) we quote the new fringe
width (0.12 mm), CISCE quotes the part (i) distance at the new wavelength
(0.96 mm = 8 x 0.12 mm); Chemistry 11, different but correct distinguishing
tests ("any other correct test accepted").

Marking-scheme slips (all non-answer-changing) are recorded as `note`s in the
key files: Maths 6(ii), 11(i), 11(ii), 18(ii), 20(i), 22; Physics 6, 11, 20(i);
Chemistry 16(i) (salt bridge "lets electrons pass"), 16(ii) ("Daniel cell" as a
non-reversible example).

## 2026 · no key (2026-10-30)

CISCE had not published its 2026 Analysis of Pupil Performance (404 on
cisce.org). Each paper was solved twice, independently; the second solver gave
answers only.

| Paper | MCQ agree | Written answers agree |
|---|---|---|
| Mathematics | 16/16 | 36/38 |
| Physics | 7/7 | 32/32 |
| Chemistry | 7/7 | 30/30 |

Both Maths differences are settled in `data/2026-Mathematics.adjudication.json`:

* **6(ii) — paper defect.** "the normal at (1, 2) to the curve x^2 = 4y", but
  (1, 2) is not on that curve. Solved as printed (2x + y - 4 = 0); the solution
  tells the student the intended point is most likely (2, 1), giving
  x + y - 3 = 0. Not repaired in the stem.
* **13(iii)** — the second solver misread "did not plant them today" as "no rain
  today" (21/37); it means it rained today, so P(R1 | R2) = 16/37.

Notes added to published 2026 solutions: Physics 1(A)(iv) (a ferromagnet's
susceptibility also falls with temperature; paramagnetic is the expected
answer). Two-solver agreement is weaker than a key: re-run the cross-check when
CISCE's 2026 scheme lands.

---

## ICSE Class 10 · 2025 and 2026 (2026-10-30)

2025 against CISCE's marking scheme: **60/60 MCQ, 117/117 written answers**
(Maths 15/15 + 26/26, Physics 15/15 + 28/28, Chemistry 15/15 + 28/28, Biology
15/15 + 35/35). 2026, two independent solvers: **60/60 MCQ, 117/117 written**.
No row needed an override; decisions are in `data/icse-10/*.adjudication.json`.

One grace row: 2025 Maths 1(vii), where CISCE accepted (c) or (d) because both
\(x + 2\) and \(x - 2\) divide the cubic. Keyed (c), the solution says both.

Paper defects kept as printed, each explained in the published solution:

* **2025 Physics 1(xi)** — the Reason says "water column" where frequency
  depends on the air column; CISCE keys it false, as printed.
* **2025 Biology 1(xi)** — the Reason says axon endings secrete "acetylene"
  (for acetylcholine); CISCE keys it as printed.
* **2025 Chemistry 4(i)** — the data give a gas of molecular weight 6.
* **2026 Biology 1(iv)** — "300 base pairs" with 75 guanine gives no matching
  option; the options assume 300 BASES (thymine 75).
* **2026 Chemistry** — "C2H5CI" printed with a capital I (1(v)); an unbalanced
  half-equation in the 2(iii) match table.

Written answers that needed reading rather than matching, recorded so nobody
re-opens them: 2025 Chemistry 8(ii) (distinguishing tests, "any other correct test" accepted), 2025
Biology 3(iv) (noise and air pollution are both on CISCE's list), 2025 Physics
4(iii)(b) ("larger" = CISCE's "magnified").
