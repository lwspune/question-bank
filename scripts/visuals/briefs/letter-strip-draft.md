# Draft brief: letter codes (scene "letterStrip")

Each question you get is from Coding-Decoding: a word is written in a code,
and the student finds the rule from the example pairs and applies it. You
write that rule ONCE, as a short list of steps. A program puts every example
word through your steps and refuses the visual unless each gives its printed
code exactly; then it puts the asked word through and finds the option with
that code. On screen the word sits as letter tiles above an A-Z ruler, each
step adds a row of tiles, and every letter that moves jumps along the ruler
with its "+2" or "P↔K" tag. A person looks at every frame before it goes
live. Stay faithful to the stored solution: its rule, its steps, its order.

## What you write, per question

```json
{
  "n": 1, "id": "<id>", "skip": false, "option": "C",
  "params": {
    "examples": [
      { "word": "TELEVISION", "code": "UDMDWKQKMP" },
      { "word": "PUNISHMENT", "code": "QTOHTJKGLV" }
    ],
    "rule": [
      { "op": "shift", "by": [1, -1], "from": 1, "to": 5 },
      { "op": "shift", "by": [2, -2], "from": 6, "to": 10 }
    ],
    "ask": { "word": "HELICOPTER" },
    "options": ["IDMHDQCVNT", "IDMHQDVNCT", "IDMHDQNVCT", "IDMHDQVCNT"]
  },
  "steps": [
    { "from": 0, "beats": ["example"] },
    { "from": 2, "beats": ["check"] },
    { "from": 3, "beats": ["apply", "answer"] }
  ],
  "answer": { "value": 3, "label": "IDMHDQNVCT" }
}
```

That is the real question 0bf6705a, keyed C. Or, when it does not fit:
`{ "n": 4, "id": "<id>", "skip": true, "reason": "..." }`.

### params

- `examples`: the word/code pairs the question gives, up to 3, in the
  question's order. An analogy ("ACKO : ZXPL :: HIND : SRMW", "BIRTHDAY -
  IBTRDHYA") is the same thing. `code` as printed; spaces and dashes between
  numbers are ignored when codes are compared. No examples (the stem states
  the rule): an empty list.
- `rule`: 1 to 4 steps, applied in order, each to the row the step before it
  made. A step may name a stretch of the word with `from`/`to` (1-based; -1 is
  the last letter, -2 the one before), or (shift, opposite, numbers only)
  list its letters with `at`, e.g. `"at": [1, -1]` for the first and last.
  Positions count in the CURRENT row, after any earlier reorder.
  - `{ "op": "shift", "by": 2 }`: every letter 2 places on (Z wraps to A;
    -1 is one back). `by` may be a list, used in turn along the stretch and
    started again when it runs out ([1, -1] is +1 −1 +1 −1 ...), or
    "position" (+1, +2, +3 ... by place in the stretch) or "-position".
  - `{ "op": "opposite" }`: A↔Z, B↔Y ... (positions adding to 27).
  - `{ "op": "reverse" }`, `{ "op": "swapPairs" }` (1↔2, 3↔4 ...),
    `{ "op": "swap", "a": 1, "b": -1 }`.
  - `{ "op": "numbers", "f": "x - 2" }`: each letter as f(x), x its alphabet
    position, written one after another. `f` defaults to "x"; reverse
    positions are "27 - x". Must be the last step.
  - `{ "op": "sum", "f": "x", "then": "x + 10" }`: f(x) added over the
    letters, then `then` of the total (x is the total in `then`). Must be the
    last step.
  - `show` (plain text, at most 34 characters) replaces a step's own caption,
    only when the solution names the step in other words worth keeping.
- `ask`: `{ "word": "HELICOPTER" }` for "how is X written", or
  `{ "code": "FYBNQMF" }` for "which word is written as Y" (then the options
  are words and each is put through the rule).
- `options`: every option's text as printed, in order, without "A) " or
  "[KEY]".

Formulas (f, then): + - * / ^ ( ) and numbers, in x. Always write `*`.

### steps, option and answer

The solution shows as numbered sentences `[0] [1] ...`. A step names the
sentence it starts at (`from`) and the beats it plays: `example` (the first
example worked through, row by row), `check` (the other examples, ticked),
`apply` (the asked word worked through), `answer` (the option named). The
first step starts at 0, later ones later, each beat used once, and never more
steps than sentences (merge beats into one step). With one example, leave out
`check`; with none, leave out `example` and `check`.

`option`: the key's letter. `answer.value`: that option's number (A = 1,
B = 2 ...). `answer.label`: the code (or word) as printed, at most 32
characters.

## When it fits, and when to skip

Fits: letter shifts (fixed, alternating, by place, different per stretch),
opposite letters, reversals and swaps (alone or followed by a shift), letter
positions written out or added up.

Skip (`skip: true`, a short reason) when:
- the code is made of symbols or words (#, @; "pit nar sa" sentence codes),
  or uses a table of letter-digit substitutions;
- no list of the steps above reproduces every example (a product of
  positions, a different rule per example, letters regrouped in a way the
  steps cannot say); do not bend the rule to fit;
- a word or code is over 12 letters;
- it is not a code at all (a letter-position or alphabet-test question).

If the stored solution's rule does not give the printed codes, set
`"solutionWrong": "<what is wrong>"` and skip. If the rule gives an option
that is not the key, skip with the reason (say which option it gives).

## Before you hand it back

Run the checker on your file and fix every line it prints:

    npx tsx scripts/visuals/tools/check-drafts.ts --scene=letterStrip <your file>

It runs the scene itself: a rule its own examples disprove is named with the
example it fails on. Generate the file with json.dump from real strings (a
lost escape turns text into control characters).

Read only your input, write only your output (a JSON array, one object per
question, input order). Run nothing that touches the database or git. Keep
tool output small.
