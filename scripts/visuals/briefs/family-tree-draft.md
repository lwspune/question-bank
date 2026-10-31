# Draft brief: blood relations (scene "familyTree")

Each question you get is from Blood Relations. You turn its statements into a
family: who is whose parent, who is married to whom, who are siblings. The
scene draws the family one statement at a time, lights up the route from one
person to the other, and then names the option. It never trusts the option
you name: it FOLLOWS every option on the family (from one person, "wife's
father's mother" or "maternal uncle") and accepts the visual only if exactly
one option holds. A person whose sex is not stated is tried both ways. A
person looks at every frame before it goes live. Stay faithful to the stored
solution: its reading of each statement, its order.

## What you write, per question

```json
{
  "n": 1, "id": "<id>", "skip": false, "option": "C",
  "params": {
    "people": [
      { "id": "R", "sex": "m" },
      { "id": "S", "sex": "m" },
      { "id": "T", "sex": "f" }
    ],
    "facts": [
      { "rel": "parent", "a": "R", "b": "S", "step": "f1" },
      { "rel": "spouse", "a": "S", "b": "T", "step": "f2" }
    ],
    "rows": [["R"], ["S", "T"]],
    "ask": { "who": "R", "of": "T" },
    "options": [
      { "text": "R is the father of T", "means": { "rel": "father" } },
      { "text": "R is the brother of T", "means": { "rel": "brother" } },
      { "text": "R is the father-in-law of T", "means": { "rel": "father-in-law" } },
      { "text": "R is the husband of T", "means": { "rel": "husband" } }
    ]
  },
  "steps": [
    { "from": 0, "beats": ["f1"] },
    { "from": 1, "beats": ["f2"] },
    { "from": 2, "beats": ["path", "answer"] }
  ],
  "answer": { "value": 3, "label": "R is T's father-in-law" }
}
```

That is the real question 42a4fef8 ("R # S & T", # = father of, & =
husband of), keyed C. Or, when it does not fit:
`{ "n": 4, "id": "<id>", "skip": true, "reason": "..." }`.

### people

Everyone the statements name, up to 12: `id` (as the question writes it, at
most 12 characters), `sex` "m", "f" or "?" (not stated). Give a sex when a
statement says it ("A is the BROTHER of B": A is m) or when the stored solution
works it out ("3 is a parent of 2 but not the mother": 3 is m). Otherwise "?":
the scene tries both and works out the rest itself.

A spoken chain names people it never names ("my uncle's only son"): give each
one a short id and a `label` the box shows, at most 12 characters ("uncle",
"uncle's son", "John's dad"). Every person must appear in at least one fact.

### facts

One per relation a statement gives, in the solution's order:
- `{ "rel": "parent", "a": "X", "b": "Y" }`: X is Y's father or mother (sex
  goes on X, not here). Son, daughter: the parent fact the other way round.
- `{ "rel": "spouse", "a": "X", "b": "Y" }`: husband, wife.
- `{ "rel": "sibling", "a": "X", "b": "Y" }`: brother, sister.
- Grandparents, uncles, in-laws: put in the person between ("A is B's
  grandfather" = A parent of a new person "B's parent", who is parent of B).

`step` ("f1" to "f8") is the beat that draws the fact: one beat per statement
or per solution sentence, several facts may share one. The family follows
the exam's conventions by itself (a husband's children are his wife's,
siblings share parents), so give only what the statements say.

### rows

The generations, top first, each left to right as the picture should read.
The scene refuses: a child not exactly one row below its parent, siblings on
different rows, spouses not side by side. At most 5 rows, 5 people a row.
Put spouses next to each other and children under their parents.

### ask and options

`ask`: `{ "who": "X", "of": "Y" }` for "how is X related to Y" (in "how is Y
related to X" questions, mind which is which). The route from Y to X is drawn.

`options`: every option's text as printed, in order, each with `means`:
- `{ "rel": "<word>" }`, one of: father, mother, parent, son, daughter, child,
  brother, sister, sibling, husband, wife, spouse, grandfather, grandmother,
  grandparent, grandson, granddaughter, grandchild, paternal grandfather,
  paternal grandmother, maternal grandfather, maternal grandmother, uncle,
  aunt, paternal uncle, maternal uncle, paternal aunt, maternal aunt, nephew,
  niece, cousin, father-in-law, mother-in-law, son-in-law, daughter-in-law,
  brother-in-law, sister-in-law. ("Siblings" is sibling.)
- `{ "chain": ["son", "wife", "father"] }` for an option written as a chain
  ("Son's wife's father"), each step one of: father mother parent son daughter
  child brother sister sibling husband wife spouse.
- `{ "any": [ {...}, {...} ] }` when the option names either ("Niece/Nephew").
- `{ "self": true }` ("Azad himself").
- `{ "undetermined": true }` for "Cannot be determined".
- An option about another pair ("Q is R's mother") adds `"who"` and `"of"`
  inside `means`. A "who is the mother of 2?" question has people as options:
  each `{ "who": "<that person>", "of": "2", "rel": "mother" }`.

A word not in the list above: skip the question (say which word).

### steps, option and answer

The solution shows as numbered sentences `[0] [1] ...`. A step names the
sentence it starts at (`from`) and the beats it plays: the fact beats in
order, then `path` (the route), then `answer`. First step at 0, later ones
later, each beat once, never more steps than sentences (merge beats).

`option`: the key's letter. `answer.value`: that option's number (A = 1).
`answer.label`: the answer in a few words, at most 32 characters.

## When to skip

- The options are coded expressions ("S * F & J ! I # M"), or the question
  counts people, or asks which statement is true about several pairs at once.
- An option uses a word not in the list (great-uncle, co-brother).
- The stored solution says the question is ambiguous or follows a key it
  disagrees with: skip, saying so.
- More than 12 people, 5 rows or 5 people a row.

If the stored solution's reading gives an option that is not the key, skip
with the reason (which option it gives). If a sentence of the solution
misprints a relation the rest of the working contradicts, draft as usual and
name it in your report: id, the wrong text, the right text.

## Before you hand it back

Run the checker on your file and fix every line it prints:

    npx tsx scripts/visuals/tools/check-drafts.ts --scene=familyTree <your file>

It builds each family and follows every option: "the scene gives 0" means no
option, or more than one, holds; reread the statements and sexes. Generate the
file with json.dump from real strings.

Read only your input, write only your output (a JSON array, one object per
question, input order). Run nothing that touches the database or git. Keep
tool output small.
