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
must check it.** Defects CONFIRMED in these schemes so far: an integrating-factor
chain carrying a spurious minus; `log|log x|` where `log|tan x|` belongs; a
magnitude set equal to a vector; a key deriving `m = ±1/2` and then reporting one
branch; an incoherent penultimate line in an area calculation; two conditional
probabilities added across different conditioning events (making the answer
exactly 2× too large); `x⁴` for `x⁵` in a derivative; and both roots reported
after squaring without testing the extraneous one.

So: **follow the scheme's method, verify its arithmetic, and where it is wrong,
say so.**

### ⚠ "X or Y" IS NOT A DEFECT — this brief said it was, and was wrong

A scheme writing `3/75 or 1/25`, `1/40 log 9 or 1/20 log 3` or `−4π/6 or −2π/3`
is telling the examiner **to accept either form from a student**. That is
ordinary marking practice, not two rival answers. An earlier version of the list
above named `3/75 or 1/25` as a known defect; an agent duly bracketed it, and
three later agents independently and correctly refused the same shape. The
bracket has been removed and the list corrected.

The lesson is larger than the item: **a defect list is a set of hypotheses, and
naming one here makes you likelier to "find" it.** If something on that list does
not survive your own check, say so — reporting that a listed defect is absent is
a result, not a failure.

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

### Judge in BOTH directions — this is what makes a bracket credible

Wave 1 found four real defects **and correctly declined three look-alikes**, and
the declines are what make the four worth reading:

- `√54/√14 → √27/√7` looks like two arithmetic slips. It is one valid compressed
  step (`√(54/14) = √(27/7)`); both equal 1.963961012.
- an antiderivative printed `+(3/2 − x)²/2` looks sign-flipped. It is right — the
  subtracted integral's minus absorbs the chain-rule minus.
- `∵ PS = QR` looks like the known `∵ PS = PR` defect. It is correct.

**Check before you bracket.** A bracket on a correct step tells a student their
official sheet is wrong when it is not, which is worse than saying nothing.

### A defect in the QUESTION is not a defect in the SCHEME

2022 65/5/1 Q6(a) gives `P(A) = 1/2`, `P(B) = 7/12`, `P(A̅ ∪ B̅) = 1/4`, which
force `P(A ∩ B) = 3/4` — impossible, since an intersection cannot exceed either
marginal. The scheme is not at fault: it does what the question asks and reaches
the right verdict. So do **not** open with a `[CBSE marking scheme: …]` bracket.
Solve it as printed, reach the scheme's answer, and add a closing note naming the
inconsistency, so a careful student who spots it is not left doubting themselves.

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

### Two phrasings that trip the key probe on a CORRECT solution

`audit-keys` extracts the option letter a solution concludes with and compares it
against the stored key. Two natural phrasings make it read a letter out of prose
that asserts none, so a right answer is reported as SOLN≠KEY. Both have already
fired on this corpus and both were correct maths. Avoid them:

1. **Assertion-Reason questions.** CBSE labels the two statements `(A)` and `(R)`,
   so "Hence (A) is true but (R) is false" ends in a token identical to option
   letter A. Every paper carries two of these, so it recurs by construction.
   Write **"So the Assertion is true while the Reason is false"** — name the
   statements in words. (The probe already suppresses a *bare* trailing `(A)` in
   an A-R solution, but not the `Hence (A)` form.)

2. **"option a &lt;text&gt;".** Naming the option text is right, but when the text
   begins with the article "a" the result is `option a right-angled triangle`,
   and the extractor reads the article as letter A. Drop the word "option":
   **"so the triangle is right-angled, matching the choice 'a right-angled
   triangle'"**.

This is not cosmetic. A false SOLN≠KEY costs a human the work of re-deriving a
question that was never wrong, and — worse — it is indistinguishable from the
real thing, so a corpus full of them trains the reader to skim past the genuine
flag when it comes.

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

**It bites your PROBES too, and that is how it actually shows up.** Three wave-1
agents wrote a verification script through `node -e` or `python -c`, had their
own regex mangled, and got a flood of false failures — one reported 36. If a
probe suddenly reports many failures, **suspect the probe before the data**, and
rewrite it as a file.

A related trap from the same wave: a hand-rolled `/\\n/` check false-alarms on
`\neq`, `\nabla` and matrix `\\` separators. The real `normalizeNewlines` masks
math zones first, which is why the applier uses it rather than a second regex.

### ⚠ NAMESPACE YOUR SCRATCH FILES — the scratchpad is SHARED

Up to a dozen agents run at once, in one directory. Two separate agents in the
same wave reported this, so it is systemic, not bad luck:

- one wrote a generically-named `merge_solutions.py`; **a concurrent agent
  overwrote it with its own copy whose source path was hardcoded to a DIFFERENT
  PAPER.** Running it would have written one paper's solutions into another
  paper's file — silently, with every hash still valid, because the file
  structure would have been intact and only the text wrong.
- another had its scratch script silently DELETED mid-run by the same collision.

Prefix every scratch file with your paper id (`_tmp_p2026_65_4_1_verify.ts`).
And if a script you wrote behaves oddly, check it is still the script you wrote.

### ⚠ DO NOT COPY A REGEX CHARACTER CLASS OUT OF ANOTHER FILE

Two leftover scratch probes in this directory were found to contain **literal
control bytes inside a control-character class** — the very bytes they were
written to detect, pasted in as raw characters instead of escapes. One agent
copied that class into its own probe and inherited the corruption. Build
patterns from ASCII escapes (`\x00-\x08`) or `String.fromCharCode`, never by
copying a class you cannot see the bytes of. (Both files have been deleted.)

---

## 6a. Two self-checks that work, and one that does not

**Unreliable: `git diff` on the topaper file.** Whether it says anything depends
on whether that paper has been committed before — the first papers were untracked
and two wave-1 agents were reassured by a diff that was empty *because git had
never seen the file*, not because nothing changed. Some are tracked now, so the
signal is real for those and absent for the rest. Do not use it as your proof;
use the hash check below, which works either way.

**Works, with one hole: recompute the hash.** For a subjective row,
`subjectiveContentHash(stem, context)` must still equal the row's stored `hash`;
for an MCQ, `contentHash(stem, optionTexts, answer)`.

The hole, found by an agent's own mutation harness: **`contentHash` NORMALISES
WHITESPACE**, so appending a trailing space to a stem leaves the hash identical.
The hash proves the stem is the same *question*, not the same *bytes*. Pair it
with the field diff below, which is what actually closes that gap.

**Works: compare key SETS row by row** against the original file, to catch a
scratch field you added while editing and meant to remove.

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
