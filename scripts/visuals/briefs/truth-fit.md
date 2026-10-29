# Fit brief: can the truth-table scene show this solution?

PYQ Vault draws animated solutions from a question's own numbers. The
**truth-table** scene builds the truth table of statement patterns in p, q, r,
s (at most 4 letters), filling each column row by row, and can WORK OUT exactly
these answers:

1. **equivalent**: the key is a statement equivalent to the given one.
2. **classify**: the key says the statement is a tautology, a contradiction or
   a contingency (or the key is the option that is a tautology / contradiction).
3. **solve**: "if X is true / false, the truth values of p, q, r are ..." (the
   key gives the letters' values).
4. **evaluate**: "if p, q are T and r is F, the truth values of A and B are ..."
   (the key gives the statements' values).
5. **transform**: the key is the negation, converse, inverse, contrapositive or
   dual of a given statement pattern.

The statements must be written with letters and connectives (∼ ∧ ∨ → ↔) in
the question, or be a sentence the solution itself turns into such a pattern
with named letters. These are `no`: switching circuits (drawn or described),
quantifiers (∀, ∃), sentences in words whose key is a sentence in words, which
statements of a list are true about numbers or facts, and anything else.

Lean towards fitting when unsure: a later step checks every fit in detail and
drops the ones that do not work. But do not force it.

## Output

Write a JSON array to your output path, one object per question, input order:

```json
[{ "n": 3, "id": "<id>", "fit": "equivalent", "note": "~[(p->~q)&(~q|p)] equivalent to q", "figureNeeded": "none", "solutionWrong": "none" }]
```

- `fit`: equivalent, classify, solve, evaluate, transform or no.
- `note`: at most 12 words.
- `situation` (every `fit: "no"`): one camelCase word for what the question
  asks, so the questions no scene fits can be counted by what a new one would
  unlock. Use the run's list when its addendum gives one; otherwise pick from
  `findK` (a letter's value), `rootExpr` (an expression of roots), `formEquation`,
  `wordProblem`, `identity`, `division`, `proof`, `recall` (a fact or definition),
  `graphGiven` (read from a printed figure), or a new word that names a picture
  you would want ("twoLinesMeet", "wave", "circuit"), else `other`.

Read only your input file, write only your output file, run nothing. When
done, reply in one line with the count of each fit.

## Also: does the question need a picture it does not have?

Each question shows `stemImage` (true when a picture is attached to the
question) and marks options that carry a picture with `[IMAGE]`. Add
`"figureNeeded"` to every object: `"none"`, or `"stem"` / `"options"` when the
question cannot be FULLY answered without a picture it does not have (it says
"the following circuit" and there is no picture; the options are circuits with
no image). Add `"figureNote"` (at most 12 words) saying what is missing. A
question that merely could use a picture, but is complete as written, is
`"none"`.

## Also: is the stored solution wrong?

Add `"solutionWrong"`: `"none"`, or at most 20 words saying what is wrong when
a step of the solution is false (a wrong truth value, a wrong law), even if it
still reaches the keyed answer. Do not report terse or badly worded solutions,
only false ones. If the KEY itself looks wrong, or the question cannot be
answered as printed, say so here too.
