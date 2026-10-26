# Draft brief: write a truth-table animated solution

Each question you get has been judged to fit the **truth-table** scene. You
write the scene's settings (`params`), which solution sentences each step
covers (`steps`) and the answer (`answer`). A program builds the whole table
from YOUR formulas, works the answer out itself and refuses the visual if the
keyed option does not hold; a person looks at every picture before it goes
live. So copy each statement exactly, and skip anything that does not fit
cleanly.

## Formulas

Write statements in this language ONLY: single letters p, q, r, s (at most 4
in one table), `T`, `F`, `~` not, `&` and, `|` or, `->` implies, `<->` if and
only if, and brackets. `~` binds tightest, then `&`, `|`, `->`, `<->`; write
brackets whenever in doubt. `->` groups to the right (p -> q -> r is
p -> (q -> r)). The bank's own symbols ∼ ¬ ∧ ∨ → ↔ are also accepted.
Examples: ∼[(p → ∼q) ∧ (∼q ∨ p)] is `~((p -> ~q) & (~q | p))`;
p ∨ (q → ∼r) is `p | (q -> ~r)`. The Maharashtra textbook writes the constants as
t (tautology) and c (contradiction): write them `T` and `F`, since a lower-case
`t` is read as a statement letter.

## What you write, per question

```json
{
  "n": 6, "id": "<id>", "skip": false,
  "params": {
    "columns": [
      { "f": "p & q", "label": "X = p ∧ q" },
      { "f": "~p | r", "label": "Y = ∼p ∨ r" },
      { "f": "(p & q) -> (~p | r)", "label": "X → Y" },
      { "f": "(~p | r) -> (p & q)", "label": "Y → X" }
    ],
    "ask": { "kind": "classify", "f": "((p & q) -> (~p | r)) | ((~p | r) -> (p & q))", "expect": "tautology" }
  },
  "steps": [{ "from": 0, "beats": ["vars", "columns"] }, { "from": 1, "beats": ["answer"] }],
  "answer": { "value": 1, "label": "a tautology" },
  "figureNeeded": "none",
  "solutionWrong": "none"
}
```

Or, when it does not fit cleanly: `{ "n": 7, "id": "<id>", "skip": true, "reason": "statements in words", "figureNeeded": "none", "solutionWrong": "none" }`.

### params

- `columns` (optional, at most 6): the in-between statements the solution
  works through, in order, so the table builds the way the solution argues.
  Each is `{ "f": <formula>, "label"? }`; the label (plain text, at most 32
  characters, use ∼ ∧ ∨ → ↔) defaults to the formula. Give a short label
  (`"X → Y"`) to a long column. The statements the ask names are added at the
  end automatically; list one in `columns` only to give it a short label.
- `ask`, one of (each may carry a plain `"label"` for the header, at most 40
  characters; the answer value is always 1):
  - `{ "kind": "equivalent", "a": <given>, "b": <keyed option> }`
  - `{ "kind": "classify", "f": <statement>, "expect": "tautology" | "contradiction" | "contingency" }`
    (for "which option is a tautology", `f` is the keyed option).
  - `{ "kind": "solve", "f": <statement>, "value": false, "expect": { "p": true, "q": false, "r": false } }`:
    "if f is false then p, q, r are T, F, F". `expect` names exactly the letters
    the key gives values for.
  - `{ "kind": "evaluate", "at": { "p": true, "q": false, "r": true }, "f": [<A>, <B>], "expect": [true, false] }`:
    the key's values of the listed statements, in the key's order, at the
    given values of every letter.
  - `{ "kind": "transform", "of": <given>, "op": "negation" | "converse" | "inverse" | "contrapositive" | "dual", "equals": <keyed option> }`.
    A given statement of the form a ∨ b is read as ∼a → b for converse,
    inverse and contrapositive, as the textbook does.

The table must not be wider than 440 px, so it stays readable on a phone. A
heading longer than 12 characters wraps onto two lines at its main connective,
so a 20-character statement takes about 10 characters of width; still, keep to
about 5 statement columns with 3 letters. Use short labels ("S", "∼S", "X → Y"),
or fewer in-between columns, if a draft is refused.

### steps

Each question shows its solution as numbered sentences `[0] [1] ...`. A step
names the sentence it starts at (`from`) and the beats it plays. The first
step starts at 0, later steps start later, every step has at least one beat,
and each beat is used at most once. Beats, in order: `vars` (the letters'
columns), `columns` (every statement column, one after another), `answer`
(outline the compared columns, light the answer row, show the header). Always
end with `answer`.

### answer

- `value`: 1.
- `label`: how the answer reads, plain text, at most 32 characters.

## Rules

- Use the question's own statements. Never change the problem to make it fit.
- If the keyed option does not hold on your table, SKIP with the reason: never
  invent a different answer.
- Read only your input file, write only your output file (a JSON array, one
  object per question, input order), run nothing. Keep messages short: when
  done, reply in one line with how many drafted and how many skipped.

## Another finished example

Solve, MHT-CET "if (p ∧ ∼r) → (∼p ∨ q) is false, then p, q, r are T, F, F",
sentences [0] an implication is false only when its premise is T and its
conclusion F, [1] so p = T, r = F, and ∼p ∨ q = F gives q = F:

```json
{ "params": { "columns": [{ "f": "p & ~r" }, { "f": "~p | q" }],
    "ask": { "kind": "solve", "f": "(p & ~r) -> (~p | q)", "value": false, "expect": { "p": true, "q": false, "r": false } } },
  "steps": [{ "from": 0, "beats": ["vars", "columns"] }, { "from": 1, "beats": ["answer"] }],
  "answer": { "value": 1, "label": "T, F, F" } }
```

## Also: does the question need a picture it does not have?

Set `"figureNeeded"` on every object: `"none"`, or `"stem"` / `"options"` when
the question cannot be FULLY answered without a picture it does not have. Add
`"figureNote"` (at most 12 words) saying what is missing.

## Also: is the stored solution wrong?

Set `"solutionWrong"` on every object: `"none"`, or at most 20 words saying
what is false in the solution, even if it still reaches the keyed answer. Only
false steps, not terse ones. A wrongly solved question is SKIPPED (reason
"solution wrong"): its solution is corrected first, and the visual is drafted
afterwards.
