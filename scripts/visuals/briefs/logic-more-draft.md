# Draft brief: logic questions the plain truth table did not fit

These questions were judged noFit for the truth-table scene (`earlier` says
why). Three tools now cover most of them. For each question pick ONE, or none,
and write its draft. A program builds every picture from your formulas, works
the answer out itself and refuses a visual that disagrees; a person looks at
every picture before it goes live.

Read `truth-draft.md` (same folder) first: the formula language, `steps` and
`answer` work as it says. Formulas: letters p, q, r, s; `~` not, `&` and, `|`
or, `->`, `<->`, `T`, `F`, brackets.

## 1. scene "switchCircuit": a switching circuit

For "construct the switching circuit of ...", "write the symbolic form of the
circuit (figure)", "simplify the circuit". The scene DRAWS the circuit from
your formula: ∧ is series, ∨ is parallel, ∼p is the switch S′. It then plays
the truth-table rows (switches flip, the lamp lights when the formula is T).

```json
{ "n": 3, "id": "<id>", "skip": false, "scene": "switchCircuit",
  "params": {
    "circuits": [{ "f": "p & (~p | q)" }, { "f": "p & q", "label": "simplified: S1 in series with S2" }],
    "equals": "p & (~p | q)"
  },
  "steps": [{ "from": 0, "beats": ["build"] }, { "from": 2, "beats": ["rows"] }, { "from": 4, "beats": ["answer"] }],
  "answer": { "value": 1, "label": "S1 in series with S2" } }
```

- `circuits`: one circuit, or two (the circuit and its simplified form). Each
  `f` uses ONLY `&`, `|` and `~` on single letters (∼(p ∨ q) must be opened
  first, by De Morgan, the way the solution does). `T` is a plain wire.
- `equals`: the statement as the question or solution writes it (→ and ↔
  allowed). Every circuit must have its truth table: this is the check, so a
  wrong rewriting or a wrong simplification is refused. `answer.value` is 1.
- `names` (optional): `{ "p": "S1", "q": "S2" }` when the book names the
  switches differently; default S1, S2, S3 in letter order.
- `label` on the second circuit says what it is (at most 40 characters).
- Beats: `build` (the first circuit), `rows` (the rows play), `answer` (the
  second circuit and the verdict). A question that only asks for the circuit:
  one circuit, and `equals` the formula given.
- A circuit is at most about 7 switches wide; a refused "too wide" draft:
  skip.

## 2. scene "truthTable" with words: sentences in words

For negations, converse / inverse / contrapositive, rewrites ("without
if-then"), truth values of statements in words: the truth table of
`truth-draft.md`, plus two fields.

```json
{ "n": 5, "id": "<id>", "skip": false, "scene": "truthTable",
  "params": {
    "letters": { "p": "it is raining", "q": "we will go and play football" },
    "ask": { "kind": "transform", "of": "p -> q", "op": "negation", "equals": "p & ~q" },
    "say": "It is raining and we will not go or will not play football."
  },
  "steps": [{ "from": 0, "beats": ["vars"] }, { "from": 2, "beats": ["columns"] }, { "from": 4, "beats": ["answer"] }],
  "answer": { "value": 1, "label": "p ∧ ∼q" } }
```

- `letters`: what each letter stands for, as the solution defines it, plain
  text, at most 46 characters each.
- `say`: the answer in words as the solution states it, plain text, at most
  120 characters. It is shown, NOT checked: copy the solution's sentence.
- The check is the `ask`, symbolic: `transform` for negation / converse /
  inverse / contrapositive, `equivalent` for a rewrite (p → q as ∼p ∨ q),
  `evaluate` for a truth value (`at` gives each letter's truth value, which the
  solution states; `expect` the value it concludes).
- A sentence that is not built from letters and connectives (an open sentence,
  a single fact like "3 is not a root", a quantified sentence): not this tool.

## 3. scene "setClaim": a claim about a set

For "∀x ∈ A, x + 1 ≥ 3", "∃n ∈ N such that n + 8 > 11", and "which of the
following is (not) true" about members of a set. The scene tests every member
and reads off T or F.

```json
{ "n": 8, "id": "<id>", "skip": false, "scene": "setClaim",
  "params": {
    "set": { "name": "A", "members": [1, 2, 3, 4, 5, 6, 7] },
    "claims": [{ "quant": "all", "lhs": "x + 1", "rel": ">=", "rhs": "3", "show": "x + 1 ≥ 3" }]
  },
  "steps": [{ "from": 0, "beats": ["set", "test"] }, { "from": 2, "beats": ["answer"] }],
  "answer": { "value": 0, "label": "F" } }
```

- `set.members`: the set's members as the question gives them (at most 12).
  For N, Z or another infinite set, list the few members the solution uses and
  add `"infinite": true`: then only a ∀ that FAILS (a member that fails) or an
  ∃ that HOLDS (a member that works) is accepted; a draft is refused otherwise.
- `claims`: `quant` "all" or "some"; `lhs` and `rhs` formulas in x (the
  member: write x even when the book writes n); `rel` one of < <= > >= = !=;
  `show` the claim as printed, plain text, at most 30 characters. "Even": use
  `mod(lhs, 2)` = 0; "a multiple of 3": `mod(lhs, 3)` = 0; floor(x) also exists.
- One claim: `answer.value` is 1 for T, 0 for F. Several claims (a multiple
  choice): add `"ask": "true"` or `"false"` (which one the question picks), and
  `answer.value` is the claim's number, 1 to 4, in the order you list them
  (list them in option order).
- Beats: `set`, `test`, `answer`.

## None

"Is this a statement?", definitions, a sentence in words with no letters or
set to test, a question in several unrelated parts: skip with a short reason.

## Rules

- Every object carries `"scene"` (switchCircuit, truthTable or setClaim) when
  it is a draft, and `"figureNeeded"` and `"solutionWrong"` as `truth-draft.md`
  says.
- Use the question's own statements and numbers; never change the problem.
- If the key is not what your picture gives, skip with the reason.
- In the JSON every backslash is doubled; text fields are plain (∼ ∧ ∨ → ↔ ∀
  ∃ ≥ ≤ allowed, no LaTeX).
- Read only your input, write only your output (a JSON array, one object per
  question, input order), run nothing that touches the database or git, keep
  tool output small.
