# CDS Elementary Mathematics — blind derivation brief

You are deriving the answers to one CDS Elementary Mathematics paper. Two
independent passes do this separately and are then crosstabbed; you are ONE of
them. Read this whole file before you start.

## What "blind" means here, precisely

- You have **not** seen any answer key, and you must not go looking for one.
- You have **not** seen the other pass's output, and must not read it.
- You **may** open the page images (`scripts/cds-maths/out/<paperId>/pNN.png`)
  and the source PDF. **No CDS booklet prints an answer key** — every paper ends
  at Q100 — so the page can only tell you what the question is, never what the
  answer is. Reading it is safe and it is the only way to see a diagram.

If you find anything that looks like an answer key, **stop and report it**
instead of using it. Two papers in this corpus do have an external prep-house
key on disk; if you ever see one, the measurement is void and we need to know.

## Input and output

Input: `scripts/cds-maths/data/<paperId>.derive.json` — number, context, stem,
options, and a `hasFigure` flag. No answers.

Output: `scripts/cds-maths/data/<paperId>.<passName>.json`, an array of:

```json
{
  "number": 41,
  "answer": "C",
  "value": "4",
  "confidence": "HIGH",
  "reasoning": "Three-digit numbers divisible by 7 whose digit-reversal is also divisible by 7: 161, 168, 252, ... exactly four such numbers exist."
}
```

- `answer` — one of A, B, C, D.
- `value` — **mandatory**, and not decoration. It is the answer's content in
  plain terms: `"4"`, `"37.5 km/hour"`, `"\\(3\\sqrt{2}\\) cm"`. The crosstab
  compares two derivations of the same *quantity*, which is what separates a
  genuine disagreement from two labels sitting on the same fact. A paper that
  prints its correct answer twice needs the option repaired, not the answer
  changed, and only `value` can tell those apart.
- `confidence` — HIGH / MED / LOW. See the calibration rule below.
- `reasoning` — the derivation, short but complete enough to check.

**Write the file early and append as you go.** Do not batch 100 questions to the
end; if you are interrupted, everything already written survives.

## Derive. Do not recognise.

Every answer must be **computed from the stem**, not recalled and not
pattern-matched from a familiar-looking problem. CDS reuses shapes with changed
numbers, and the changed number is usually the point.

- Where arithmetic is non-trivial, **verify numerically** (python / sympy).
  Reaching the same number twice by two routes is the cheapest real check there is.
- A CAS returning nothing is a **question, not a verdict**. `solve` missing a
  root, or `simplify` failing to reduce an identity to zero, is not evidence the
  answer is wrong — test the claimed value directly and scan numerically.
- Watch floating point on boundaries and equalities. Use exact arithmetic
  (`Fraction`, `Rational`) for anything that decides "is this an integer",
  "is this on the boundary", "are these equal". A residual of `-5.5e-17` is zero.
- Pick test points that **discriminate**. A value where the right and the wrong
  answer agree proves nothing, and convenient angles (0, 30, 45, 90 degrees) are
  exactly where wrong trigonometric identities pass.

## Solve the question AS PRINTED

If the stem looks misprinted, **solve what is printed anyway** and say so in
`reasoning`. Do not solve the question you think was intended. A "helpfully
corrected" derivation cannot disagree with the source, so it destroys the very
comparison this pass exists to make. Flag it; do not fix it.

## If no option is correct

Say so. Set `answer` to your best reading, drop `confidence` to LOW, and state
plainly in `reasoning` that the computed value matches no printed option and what
that value is.

**Never choose the nearest option to make the question resolve.** A question with
no correct answer is a real and expected outcome on a scanned corpus, and it is a
finding we want, not a failure to hide.

## Figure-bearing questions

Where `hasFigure` is true the diagram carries data the stem does not — an angle
mark, a labelled length, which chord is which. **Open the page image and read the
figure.** Do not attempt these from the stem alone, and do not assume a
"standard" configuration.

If the figure is genuinely unreadable at high zoom, say so and use LOW.

## Confidence, and the runner-up rule

- **HIGH** — you computed it, you checked it, and no other option is defensible.
- **MED** — you have an answer but a specific alternative survives a reading of
  the stem you cannot rule out.
- **LOW** — the stem is ambiguous or defective, the figure is unreadable, or no
  option matches.

Do not inflate. On the sibling UPSC corpus, measured against real keys, the HIGH
band ran 98.5% correct while essentially every error landed in MED — that makes
confidence a usable router for review effort, and it stops being one the moment
anyone marks a shaky answer HIGH.

**On any MED item, NAME THE RUNNER-UP** in `reasoning` and say what would have to
be true for it to win. Measured on the UPSC papers, the key repeatedly landed on
exactly the alternative the deriver had named and set aside — in both directions,
so this is a tendency and not a law. It costs a sentence and it turns the MED
list into a ranked review queue rather than a pile.

## Practical

- Do not run `git add` or any git command.
- Author files with the Write/Edit tools, never a shell heredoc — heredocs eat
  backslashes here and will corrupt LaTeX into invisible control characters.
- Give scratch files a unique name including your pass name; several agents share
  one scratchpad and have overwritten each other's scripts.

## When you finish

Report: how many you derived, the HIGH/MED/LOW split, every question where no
option matched, every question you judged misprinted, and every figure you could
not read.
