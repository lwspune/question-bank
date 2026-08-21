# CBSE Class-12 Maths board PYQ — solution-authoring contract

You are writing the worked solution for questions from ONE board paper, using
that paper's **official CBSE marking scheme**. Read this in full before starting.

---

## 1. What you are given

- `scripts/cbse-12-pyq/data/<paperId>.topaper.json` — the rows that need a
  solution. Each carries `hash`, `ref`, `questionNumber`, `marks`, `format`,
  `chapter`, `subtopic`, `stem`, sometimes `context`/`options`/`answer`/`figure`,
  and an empty `solution` you fill in.
- `scripts/cbse-12-pyq/out/<paperId>/ms/pNN.png` — the marking scheme, rendered
  one PNG per page.
- `scripts/cbse-12-pyq/out/<paperId>/pNN.png` — the question paper, if you need
  to see a figure the stem refers to.

**Write the `solution` field. Change nothing else.** Not the stem, not the
options, not the answer, not the chapter. Those are committed and hashed.

---

## 2. READ THE SCHEME AS AN IMAGE. Never the text layer.

Every marking scheme has a text layer and it is **arithmetically lossy**. This is
measured, not a precaution — across whole schemes:

| symbol | occurrences in the text layer |
|---|---|
| `π` | **0** |
| `θ` | **0** |
| superscript digits (`²`, `³`) | **0** |
| `√` in 2025 65/1/1 | **1**, in a whole paper |
| `∫` in 2025 65/1/1 | **0** |

Fractions flatten across lines, so `adj A / |A|` arrives as two unrelated lines,
and a 2×2 matrix arrives as `[ 1 −cotx cotx 1 ]`. Prose survives perfectly, which
is exactly what makes it dangerous: it *looks* fine.

So open the PNGs. If you find yourself reading extracted text, stop.

---

## 3. The scheme is the SOURCE, not the AUTHORITY

Transcribe CBSE's method — a student is being marked against it, so its route
matters, not just its answer. But **the scheme is wrong often enough that you
must check it.** Defects already found in these schemes by the transcription
pass include: an integrating-factor chain carrying a spurious minus; an
antiderivative printed with `π/2` where `π/4` belongs; a line reading
`PR = PQ + PS ∵ PS = PR`; a key deriving `m = ±1/2` and then reporting one
branch; an incoherent penultimate line in an area calculation; a blank marks
column; and `3/75 or 1/25` printed as if two different answers.

So: **follow the scheme's method, verify its arithmetic, and where it is wrong,
say so.**

### When the scheme is wrong

Write the CORRECT solution and open it with a bracket naming the defect:

```
[CBSE marking scheme: the printed solution drops a minus at the integrating-factor
step and reaches y = -x; carrying it gives y = x, which satisfies the ODE and the
initial condition.] Separating variables, ...
```

The bracket is part of the solution text. Do NOT silently "correct" the scheme —
a reader comparing our solution against the official one must be able to see why
they differ.

### The stem is not up for revision

If the scheme appears to answer a *different* question from the printed stem,
that is a finding, not a licence. Solve the stem AS PRINTED, and say in a bracket
that the scheme's solution addresses a different reading. The stem is committed
and hashed; you cannot change it.

---

## 4. What a good solution looks like

- **Complete enough to follow.** A `marks` value of 1 wants a line or two; 5
  wants the real derivation. Match the effort to the marks.
- **Reaches the answer the row already carries.** For an MCQ the `answer` field
  is the committed key. If your derivation lands somewhere else, do NOT change
  the key and do NOT bend the working to reach it — report it (see §7).
- **Names option TEXTS, not letters**, for an MCQ: write "so the value is 6,
  which is option (A) 6" rather than "so the answer is (A)". Letters go stale if
  options are ever reordered, and a bare letter tells the reader nothing.
- **Prose, not a bare chain.** One sentence of orientation beats three lines of
  unexplained algebra.

---

## 5. Maths goes in `\( … \)`

Inline only. Every mathematical symbol lives inside the delimiters:

- `\(x^2 + 3x - 4 = 0\)`, `\(\int_0^\pi \sin x\,dx\)`, `\(\frac{dy}{dx}\)`
- Matrices: `\(\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\)`

**No unicode maths in the solution text** — no `π`, `θ`, `√`, `∫`, `²`, `≤`, `×`.
Write `\(\pi\)`, `\(\theta\)`, `\(\sqrt{2}\)`, `\(\le\)`, `\(\times\)`. Ordinary
prose punctuation (a comma, a colon, an em dash) is fine outside the delimiters.

Balanced, never nested: `\(` must be closed by `\)` before the next `\(` opens.

---

## 6. ⚠ AUTHOR THROUGH THE EDITOR, NEVER A SHELL HEREDOC

This repo has been bitten repeatedly and it fired **twice more while building
this very pipeline**. Writing `\theta` through `python - <<'PY'` or `node -e`
lets a layer eat one backslash, and Python then reads `\t` as a TAB. The result
is `From<TAB>heta`, which is invisible on inspection, survives a delimiter check,
and reaches the database.

Use the Write/Edit tools on the JSON file. `apply-solutions.ts` REFUSES control
characters, double-escaped backslashes and literal `\n` — all five refusals are
proven to fire — so a corrupted file will be rejected, but only after you have
wasted the run.

---

## 7. Before you report

1. **Every row you were given has a non-empty `solution`.** If you deliberately
   left one blank, say which and why — a silent gap is indistinguishable from an
   oversight.
2. **You changed no other field.** Diff if unsure.
3. **Report on territory you do not own.** If the scheme's pages show a question
   that is NOT in your file, say so — that is how a missing row gets found.
4. **Report every disagreement, don't resolve it silently.** In particular: any
   row where your derivation disagrees with the committed `answer`; any scheme
   defect you bracketed; any question the scheme does not answer at all.
5. Do **not** run `apply-solutions.ts`. Hand back the edited JSON.

A run that reports "N solutions written, 3 rows where the scheme disagrees with
the key, 1 scheme defect bracketed" is a good run. A run that reports "all done"
and nothing else is one nobody can check.
