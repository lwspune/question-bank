# CBSE Class-12 Maths board PYQ — transcription contract

You are transcribing **one** CBSE Class-12 Mathematics board question paper into
JSON. Read this whole file before starting. Every rule here comes from something
measured on the real source; none is defensive-in-general.

Your output is a data file, not a message. Write it and report a short summary.

---

## 1. What you are given

- `out/<paperId>/pNN.png` — every page of the question paper, rendered.
- `out/<paperId>/ms/pNN.png` — every page of its **official CBSE marking scheme**.
- `out/<paperId>/plan.txt` — which questions are already covered by an
  earlier-transcribed paper (see §6).
- `data/<paperId>.questions.json` — the file you must WRITE.

---

## 2. The paper is BILINGUAL. Transcribe the ENGLISH only.

Hindi and English appear on **separate, alternating pages** — page 4 is the Hindi
of page 5, and so on. On the pilot paper (65/5/1, 2025) the English pages were
the **even 0-based indices, 2 through 22**, with index 0 the cover and index 1
the Hindi instructions.

**Treat that as a HYPOTHESIS TO VERIFY, not a fact.** Check it on the paper you
were given — page counts differ (2022 papers are 8 pages, not 23) and the pattern
may not hold. **Report the English page indices you actually used.** If the paper
turns out to be English-only, say so.

Never transcribe from a Hindi page. A translated stem can never dedup against the
real English one, because `content_hash` is stem-derived.

---

## 3. Transcribe AS PRINTED

Never "correct" a stem to what it obviously meant. If a question looks defective
— a dropped exponent, a sign that makes the answer ugly, an option that matches
nothing — transcribe it faithfully and add a `_flag` field saying what you saw.

The gate that follows compares our answers against CBSE's official key. An answer
bent toward what you assume the key says cannot disagree with it, so it teaches
that gate nothing. On the pilot, three "certain" defects in a sibling ingest were
refuted the moment the printed key was consulted.

If two readings are genuinely possible, transcribe the one the page supports and
`_flag` the other. Do not silently pick.

---

## 4. Maths goes in `\( … \)`

Project convention, bank-wide. Not `$…$`, not bare unicode.

- Matrices `\begin{bmatrix}`; determinants `\begin{vmatrix}` — the printed
  brackets tell you which.
- Vectors `\vec{a}`, `\overrightarrow{AB}`; unit vectors `\hat{i}`.
- The paper prints decimal points as a RAISED dot: `0·7`. Write `0{\cdot}7`.
- **Never author through a shell heredoc.** The shell eats one backslash and
  `\theta` arrives as a TAB character. Write the file directly.
- Balance every `\(` with a `\)`. The validator rejects unbalanced zones.

---

## 5. The paper's structure

**2023–2026** (38 questions, 80 marks, five sections):

| Questions | Section | Marks | Type |
|---|---|---|---|
| 1–18 | A | 1 | MCQ |
| 19–20 | A | 1 | Assertion–Reason |
| 21–25 | B | 2 | Very Short Answer |
| 26–31 | C | 3 | Short Answer |
| 32–35 | D | 5 | Long Answer |
| 36–38 | E | 4 | Case study |

**2022 only** (14 questions, 40 marks, three sections, and **no MCQs at all**):
Q1–6 Section A @2 · Q7–10 Section B @3 · Q11–14 Section C @4, with Q14 a case
study in two parts.

Three structural things that are easy to miss:

- **Internal choice.** Nine questions offer an `OR` alternative. **Ingest BOTH.**
  Refs are `Q23a` / `Q23b`, questionNumber `"23 (a)"` / `"23 (b)"`, and the
  alternative carries `"_alternativeTo": "Q23a"`.
- **Assertion–Reason (Q19–20)** share ONE printed instruction block defining
  their four options. Put that block in `context` on **both** rows and repeat the
  same four options on each.
- **Case studies (Q36–38)** have a shared passage plus sub-parts `(i)`, `(ii)`,
  `(iii)(a)`/`(iii)(b)`. Each sub-part is its own row: refs `Q36i`, `Q36ii`,
  `Q36iiia`, `Q36iiib`; the shared passage goes in `context` on every sibling,
  **byte-identical**; they share a `setId` like `2025-65-5-1-CS1`. Sub-parts
  carry their OWN printed marks (1/1/2), which sum to the parent's 4.

  ⚠ **`context` is the PASSAGE ONLY. Never put the printed "Case Study – N"
  heading in it.** That heading is a position within *one* paper, not part of the
  question: CBSE reuses the same case study across sets under a different number
  (65/5/1 prints one as *Case Study – 2* that 65/5/3 prints as *Case Study - 1*,
  passage identical — and even the dash differs). `subjectiveContentHash` is
  context-aware, so a heading inside `context` makes two identical questions hash
  differently and both ship. Put the printed label in **`_caseStudyLabel`**,
  which is provenance and is not hashed.

---

## 6. The skip list

`plan.txt` lists questions that are **byte-identical** to a paper already
transcribed — CBSE reuses the same typeset block across sets of a series. Do not
transcribe those; they will be deduped anyway.

Two cautions:

- The list is keyed on the MARKING SCHEME's numbering, and the questions are
  **reshuffled** between sets (this paper's Q1 may be the other paper's Q5). Match
  on the question's CONTENT, not its number, before skipping.
- The index covers only ~87% of items, so **a question not on the list may still
  be a duplicate** — and in practice many are: CBSE re-typesets the marking
  scheme's blocks between sets, so byte-matching fails on questions that are
  word-for-word identical. Treat a `TRANSCRIBE` entry as a hypothesis.

**Either policy is safe, and this was MEASURED on wave 1 rather than argued:**

- **Transcribe it anyway** — costs nothing. Across 178 committed rows there are
  **zero duplicate and zero near-duplicate stems**, even after stripping LaTeX
  command names so `\dfrac` vs `\frac` would have been caught. 17 of one paper's
  28 re-transcribed rows deduped *exactly* at commit: agents working from this
  brief converge on byte-identical LaTeX, so `content_hash` catches them.
- **Or skip it**, but ONLY after comparing the stem AND options against the
  already-committed `data/<paper>.questions.json` for the reference paper. A
  spot-check of such a skip confirmed it character-for-character.
- **Best of both, and the recommended method** — when this paper's question IS
  the reference's, read it on YOUR page to confirm it matches, then **reuse the
  reference's stem and option text byte-for-byte** rather than retyping. You keep
  the full paper in your file (so the sitting can be reconstructed later) and the
  row still dedups at commit, where a one-character drift would have shipped a
  near-duplicate. On 65/6/2 this made 41 of 52 rows dedup cleanly.
  ⚠ Confirm against the PAGE, never by trusting the reference file alone — that
  is what keeps a reference transcription error from propagating silently.

**What is NOT acceptable is skipping on the number**, and `plan.txt`'s own labels
are not safe for this either: on 65/6/2 it claimed `Q4 = 65/6/1 Q6` when Q4 is
actually 65/6/1's **Q1**. The block→number attribution is best-effort; only the
image hash behind it is sound. Treat the file as a hint and match on content.
Sets are reshuffled AND renumbered in both directions, case studies included.

---

## 7. Answers

**Section A (MCQ) answers come from the official marking scheme, verbatim.** Do
not derive them. The scheme pairs 1:1 with this exact paper code; find each `Ans`
row. Some answers are printed as images (matrices, fractions) — read them off the
rendered page.

If your own derivation disagrees with the official key, **keep the official key**
and add a `_flag` recording the disagreement. That is a finding for a human, not
something to resolve by overriding CBSE.

**Do NOT write solutions for the subjective questions.** They are authored in a
later step from the marking scheme's worked answers. Omit the field entirely.

---

## 8. Chapter and subtopic

Assign every question to one of the 13 chapters and one of ITS subtopics,
verbatim from the list you are given. The validator rejects anything else, and a
misspelled chapter AUTO-CREATES a duplicate that silently forks the corpus.

Known awkward cases, already decided — follow these:

- **Trisection / section formula in 3-D** → `Vector Algebra` / `Section Formula`.
  NCERT teaches it there via position vectors, not in Ch.11.
- **Probability distribution / expectation / random variables** →
  `Probability` / `Random Variables and Probability Distributions`.
  **This subtopic was added on 2026-08-18 and is PYQ-only by construction** —
  NCERT's rationalisation removed the content, so the textbook ingest created no
  such subtopic, but the board examined it 2022–2025 (measurably *not* in 2026).
  It is on the live axis now, so file there and raise **no flag**.
- **Plain addition-theorem / complement probability** → `Probability` /
  `Conditional Probability`, the chapter opener. No flag needed.

`difficulty` is `EASY` | `MODERATE` | `HARD`, your judgement — roughly by marks
(1–2 marks EASY/MODERATE, 5-mark and proof questions HARD).

---

## 9. Figures

Most questions have none. Where a question **cannot be answered without a printed
graph or diagram** (LPP feasible regions are the common case), add
`"_figure": "REQUIRED — <why>. Page idx N."` and still transcribe the stem fully.

A decorative photograph is **not** a figure dependency. The pilot's Q38 shows
three captioned vegetable photos and every number needed is in the stem text —
that one is marked `DECORATIVE` and not attached. Open the figure before deciding;
a reference is not a dependency.

---

## 10. Output shape

Write `data/<paperId>.questions.json`:

```json
{
  "paper": "65/5/2",
  "year": 2025,
  "pattern": "full80",
  "_transcription": "which page indices you used, and anything odd you saw",
  "questions": [
    {
      "ref": "Q1", "questionNumber": "1", "section": "A", "marks": 1,
      "format": "mcq",
      "chapter": "Matrices", "subtopic": "Multiplication of Matrices",
      "difficulty": "EASY",
      "stem": "…",
      "options": [{"label":"A","text":"…"}, {"label":"B","text":"…"},
                  {"label":"C","text":"…"}, {"label":"D","text":"…"}],
      "answer": "B"
    }
  ]
}
```

`format` is `mcq` or `subjective`. A subjective row has **no** `options` and no
`answer`. Optional per row: `context`, `setId`, `_alternativeTo`, `_flag`,
`_figure`.

---

## 11. Before you report

Run the validator and make it pass:

```
npx tsx scripts/cbse-12-pyq/validate.ts <paperId>
```

It checks refs, section/marks against the printed structure, chapter and subtopic
against the LIVE database, MCQ option counts, LaTeX balance, and text corruption.

Then report, briefly:

- English page indices used, and whether the alternating hypothesis held;
- rows written, split MCQ / subjective;
- how many you skipped from `plan.txt`, and any you chose to transcribe anyway;
- every `_flag` you raised;
- anything about the paper that the next agent should know.

**Report what you could not do.** A missing question you flagged is recoverable;
one you quietly dropped is not.

⚠ **Namespace your scratch files.** Several papers are transcribed in parallel and
the scratchpad is shared. One agent's probe script was silently overwritten
mid-run by another's and reported on a completely different paper. Put your paper
id in every temporary filename, and never trust a probe result you cannot tie to
your own paper.

⚠ **Do NOT hand-roll a "literal `\n`" check.** A regex for `\\n` fires on `\ne`,
`\neq`, `\notin`, `\nabla` and matrix `\\` separators. This has now produced
phantom findings three separate times — in this pipeline's own validator, and in
two agents' probes. If you want to check, import the project's real normaliser:
`normalizeNewlines(text) !== text`. It leaves math zones alone, which is the
whole point. The same caution applies to any probe you write about escaping:
verify it fires on a known-bad string before believing a hit.

---

## Appendix — the ONLY permitted chapters and subtopics

Verbatim. The validator rejects anything else, and a wrong chapter name
AUTO-CREATES a duplicate chapter that silently forks the corpus.

| Chapter | Subtopics |
|---|---|
| Application of Derivatives | Rate of Change of Quantities · Increasing and Decreasing Functions · Maxima and Minima · Absolute Maximum and Minimum on a Closed Interval |
| Application of Integrals | Area Under Simple Curves · Area Bounded by a Curve and a Line |
| Continuity and Differentiability | Continuity · Differentiability and the Chain Rule · Derivatives of Implicit and Inverse Trigonometric Functions · Derivatives of Exponential and Logarithmic Functions · Logarithmic Differentiation · Derivatives of Functions in Parametric Form · Second Order Derivatives |
| Determinants | Determinant and its Properties · Area of a Triangle · Minors and Cofactors · Adjoint and Inverse of a Matrix · Solving System of Linear Equations |
| Differential Equations | Order and Degree of a Differential Equation · General and Particular Solutions · Variables Separable · Homogeneous Differential Equations · Linear Differential Equations |
| Integrals | Integration as the Inverse of Differentiation · Integration by Substitution · Integration using Trigonometric Identities · Integrals of Some Particular Functions · Integration by Partial Fractions · Integration by Parts · Integrals of Special Forms · Definite Integrals and the Fundamental Theorem · Definite Integrals by Substitution · Properties of Definite Integrals |
| Inverse Trigonometric Functions | Domains, Ranges and Principal Value Branches · Evaluating Inverse Trigonometric Expressions · Properties of Inverse Trigonometric Functions |
| Linear Programming | Graphical Solution and the Feasible Region |
| Matrices | Order and Types of Matrices · Equality of Matrices · Addition and Scalar Multiplication · Multiplication of Matrices · Transpose of a Matrix · Symmetric and Skew-Symmetric Matrices · Elementary Operations and Inverse of a Matrix |
| Probability | Conditional Probability · Multiplication Theorem on Probability · Independent Events · Theorem of Total Probability · Bayes' Theorem · **Random Variables and Probability Distributions** |
| Relations and Functions | Types of Relations · Equivalence Relations and Classes · One-One and Onto Functions · Composition and Invertible Functions |
| Three Dimensional Geometry | Direction Cosines and Direction Ratios · Equation of a Line in Space · Angle Between Two Lines · Shortest Distance Between Two Lines |
| Vector Algebra | Types of Vectors · Addition of Vectors · Components and Direction Cosines · Section Formula · Scalar (Dot) Product and Projection · Vector (Cross) Product |

If a question genuinely fits none of these, file it on the closest and raise a
`_flag` naming the mismatch. Do **not** invent a subtopic name — the axis is
shared with the NCERT textbook corpus, and a new one is a taxonomy decision.
