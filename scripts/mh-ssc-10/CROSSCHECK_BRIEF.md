# MH-SSC-10 answer-key cross-check brief

You cross-check ONE already-shipped board paper's stored answers against the
**official printed solution bundled inside its own source PDF**.

Why this exists: these papers were ingested under the "no answer key exists"
assumption, so every MCQ key was DERIVED by an AI solver and every subjective
answer AUTHORED, all `reviewFlag: true` awaiting a human check that never
happened. It later turned out the publisher's PDF bundles the official solution
after the question paper. This pass converts a derived corpus into a
source-verified one.

## Inputs

- `scripts/mh-ssc-10/out/<paperId>/answers.md` — what the BANK currently stores:
  stem, options with the stored key marked `→`, and the stored solution/model
  answer, in paper order.
- `scripts/mh-ssc-10/out/<paperId>/text.md` — the full source PDF text layer,
  page-delimited. It contains the QUESTION PAPER first and then the **official
  solution section** (its header reads `… Board Paper – <year> Solution`).
- Rendered pages `scripts/mh-ssc-10/out/<paperId>/p-NN.png` if you need to read a
  figure, a matrix, or anything the text layer flattens.

## The rule that matters most

**The printed key is a PEER, not an ORACLE.** Do not "correct" our answer to
match the book on sight. For every disagreement, derive the answer yourself from
the question, then judge which side is right. Real precedent from this corpus:
the Science II 2017 key states the swollen lower part of the carpel is the
*receptacle* — it is the **ovary**, so the book is wrong and our answer was
right. Conversely some of our derived keys will be wrong. Both happen.

Where a printed *worked solution* contradicts the printed *final answer*, the
worked solution is usually the better evidence — say so explicitly.

## ⚠ The text layer silently drops MINUS SIGNS inside math zones

Found on alg-2018: `text.md` renders the printed conclusion as *"So, x = 2 and
y = 4"* when the page plainly prints `x = −2`; likewise `Dx = 20 − 24 = −4`
appeared sign-less. Read naively this manufactures a book-vs-bank disagreement
out of pure extraction loss.

**So: never call a sign disagreement from `text.md` alone.** Render the page and
look before recording a non-`AGREE` verdict on anything where the dispute is a
sign, a determinant, a fraction or any 2-D math. Render with:

```sh
npx tsx scripts/mh-ssc-10/render.ts <paperId>     # → out/<paperId>/p-NN.png
```

The same caution applies to any question whose answer depends on reading a
drawing (histogram, frequency polygon, geometry figure): render and look rather
than inferring from the surrounding table, and say in your report which verdicts
rested on a rendered figure.

## Method

1. Locate the solution section in `text.md` and confirm its header names **this
   paper's subject and year**. If it names a different paper, STOP and report —
   one file in this corpus bundles the wrong paper's solution entirely.
2. Walk **every** question in `answers.md` in order. Find the matching printed
   solution by question number.
3. Classify each into exactly one verdict:
   - `AGREE` — stored answer matches the printed solution (allow equivalent
     forms: `\log|A|-\log|B|` ≡ `\log|A/B|`, unsimplified vs simplified, a
     reordered set. Equivalence is agreement, not disagreement).
   - `OURS-WRONG` — the printed solution is right and our stored answer is wrong.
   - `BOOK-WRONG` — our answer is right and the printed key is wrong.
   - `BOTH-DEFENSIBLE` — genuinely ambiguous question or two valid readings.
   - `NO-BOOK-ANSWER` — the solution section doesn't cover this question.
4. For every verdict that is NOT `AGREE`, show your own derivation. One or two
   lines is enough, but it must be real work, not an assertion.

## Output

Write `scripts/mh-ssc-10/data/<paperId>.crosscheck.json` — a JSON array (use the
**Write tool**, never a bash heredoc: heredocs collapse `\\` and corrupt LaTeX):

```jsonc
[
  {
    "ref": "Q1(A)(i)",              // must match answers.md exactly
    "verdict": "BOOK-WRONG",        // AGREE | OURS-WRONG | BOOK-WRONG | BOTH-DEFENSIBLE | NO-BOOK-ANSWER
    "storedAnswer": "…",            // short: the letter for an MCQ, or the key result
    "printedAnswer": "…",           // what the book's solution concludes
    "myDerivation": "…",            // your own working — required unless AGREE
    "proposedFix": null              // null, or the corrected answer we should store
  }
]
```

For an MCQ whose key must change, put the corrected LETTER in `proposedFix`.
For a subjective answer, put the corrected final answer (not the whole rewrite).

## Do NOT

- Do NOT write to the database. This is read-only analysis; a reviewer applies
  the fixes after adjudicating them.
- Do NOT edit any `data/*.questions.json`.
- Do NOT skip questions to save effort — a silent gap defeats the purpose. If you
  genuinely cannot resolve one, emit it with `BOTH-DEFENSIBLE` and say why.

## Report back

Counts per verdict, then every non-`AGREE` row with a one-line justification, and
anything about the paper a reviewer should know (missing solution pages, a
printed key that contradicts its own working, garbled source).
