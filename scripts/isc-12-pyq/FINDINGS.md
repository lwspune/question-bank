# ISC Class-12 PCM — adjudicated findings

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
