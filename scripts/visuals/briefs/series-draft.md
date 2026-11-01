# Draft brief: SSC CGL Series and Analogy (scene "series", plus two existing scenes)

Each question gets exactly one of: a `series` draft, an `algebraSteps` draft,
a `letterStrip` draft, or a skip. A person looks at every frame before it goes
live. Stay faithful to the stored solution: its rule, its steps, its order.

## Which scene

| Question | Scene | Brief |
|---|---|---|
| Number series ("17, 24, 38, 59, 87, ?") | `series`, kind numbers | this file |
| Letter-cluster series ("ALW, GEY, MXA, ?"), single-letter series | `series`, kind letters | this file |
| Fill the blanks ("BRU_TLP_RUI_LP...") | `series`, kind block | this file |
| Analogy: number related to number ("17 : 102 :: 39 : ?"), number sets ("(5, 72, 10)") | `algebraSteps` | algebra-draft.md |
| Analogy: letter clusters ("ACKO : ZXPL :: HIND : ?") | `letterStrip` | letter-strip-draft.md |
| Word or meaning analogy ("Gold : Ore"), odd one out by meaning | skip | |

Read the other two briefs before drafting with their scenes. For algebraSteps
on an analogy, the lines are: the rule shown on each given pair or set as a
checked `calc` line, then the asked case (number relation), or each option
tested, one `calc` line each, the keyed one balancing (number sets).

## The series scene

A program builds every term from your rule and refuses the visual unless each
printed term comes out exactly; it fills the one "?" and finds the option with
that value. On screen the terms sit in a row of tiles with each step labelled
under the gap between them ("+7", "×3 +1"), the "?" tile fills at the end.

```json
{
  "n": 1, "id": "<id>", "skip": false, "option": "A",
  "params": {
    "kind": "numbers",
    "terms": [17, 24, 38, 59, 87, "?"],
    "rule": { "type": "step", "f": "x + 7*n" },
    "options": ["122", "137", "117", "109"]
  },
  "steps": [
    { "from": 0, "beats": ["terms", "rule"] },
    { "from": 2, "beats": ["answer"] }
  ],
  "answer": { "value": 1, "label": "122" }
}
```

That is the real question ceabe869, keyed A. Or, when it does not fit:
`{ "n": 4, "id": "<id>", "skip": true, "reason": "..." }`.

### kind numbers

- `terms`: 3 to 9 printed terms in order, numbers, with exactly one `"?"` for
  the term asked (a blank "____" is the "?").
- `rule`, one of:
  - `{ "type": "step", "f": "x*(n+2) + 1", "show": "×{n+2} +1" }`: each term
    from the one before. In `f`, `x` is the previous term and `n` the step
    number (1 for term 1 to term 2). The first term must be printed. Without
    `show` each step is labelled by its difference (+7, −9); give `show` when
    the solution says the step another way (×3 +1, ×2); `{...}` holds a
    formula in n, filled in per step.
  - `{ "type": "term", "f": "n^3 + n^2", "show": "{n}³+{n}²" }`: each term from
    its place n (1 for the first). `show` (optional) labels each term.
  - `{ "type": "diff", "f": "8 + 6*n" }`: the SECOND differences are f(n), n
    from 1. The first two terms must be printed. Use it only when the solution
    works through second differences.
  - `{ "type": "alternate", "odd": <step or term rule>, "even": <step or term rule> }`:
    two series taking turns (places 1, 3, 5 ... and 2, 4, 6 ...); n counts
    within each.
- Formulas: + - * / ^ ( ) and numbers, in x and n. Always write `*`.

### kind letters

```json
{ "kind": "letters", "terms": ["ALW", "GEY", "MXA", "SQC", "YJE", "?"],
  "cols": [{ "by": 6 }, { "by": -7 }, { "by": 2 }],
  "options": ["ECG", "DBI", "DCH", "EBH"] }
```

- `terms`: clusters of 1 to 4 letters, all the same length, one `"?"`; the
  first term printed.
- `cols`: one `{ "by" }` per letter place: a whole number (each step moves
  that place this far; Z wraps to A; negative is back), or a formula in n
  (the step number) for a growing step, e.g. `"n + 2"` for +3, +4, +5.

### kind block

```json
{ "kind": "block", "line": "BRU_TLP_RUI_LPBR_ITLPB_UIT_ _", "block": "BRUITLP",
  "options": ["IBTRUPL", "IBTUPLR", "IBRUTLP", "IBTURLP"] }
```

- `line`: the printed letters with `_` for each blank, as printed (spaces are
  ignored).
- `block`: the 2 to 9 letters that repeat, starting at the line's first letter.

### options, steps, answer

`options`: every option's text as printed, in order, without "A) " or
"[KEY]". The solution shows as numbered sentences `[0] [1] ...`. A step names
the sentence it starts at (`from`) and the beats it plays: `terms` (the
series), `rule` (the steps labelled, left to right), `answer` (the "?" filled,
the option named). The first step starts at 0, later ones later, each beat
used once, never more steps than sentences. `option`: the key's letter;
`answer.value`: that option's number (A = 1); `answer.label`: the term as
printed, at most 32 characters.

## When to skip

Skip (`skip: true`, a short reason) when:
- it is a word or meaning analogy, or an odd-one-out by meaning;
- no rule above gives every printed term (a different rule every step with
  no pattern, a series mixing letters and numbers in one term, a "wrong
  number in the series" question); do not bend a rule to fit;
- the solution itself says two rules fit and follows the key;
- the block does not repeat from the line's first letter, or changes as it
  goes (reversed, grows).

If the stored solution's working has a wrong line, skip with
`"solutionWrong: <the exact wrong text> should be <the right text>"`. If the
rule gives an option that is not the key, skip and say which.

## Before you hand it back

Write three files: `slice-K.series.json`, `slice-K.algebra.json`,
`slice-K.strip.json` (each a JSON array in input order, `[]` when empty), and
`slice-K.skip.json` (`[{ "n", "id", "reason" }]`). Every input question in
exactly one file. Check each:

    npx tsx scripts/visuals/tools/check-drafts.ts --scene=series <slice-K.series.json>
    npx tsx scripts/visuals/tools/check-drafts.ts --scene=algebraSteps <slice-K.algebra.json>
    npx tsx scripts/visuals/tools/check-drafts.ts --scene=letterStrip <slice-K.strip.json>

and fix every line they print. Generate the files with json.dump from real
strings. Read only your input, the briefs and the scene sources; write only
your output files (and throwaway helpers named slice-K-*.py next to them).
Run nothing that touches the database or git. Keep tool output small.
Your console may show curly quotes and dashes as a replacement character;
read the JSON with Python (utf-8) before calling a stem garbled.
