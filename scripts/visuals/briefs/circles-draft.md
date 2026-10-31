# Draft brief: syllogisms and Venn diagrams (scene "circles")

Each question you get is a syllogism (statements, then conclusions: which
follow?) or a "which Venn diagram shows these classes" question. You draw the
sets as circles that satisfy the statements and write each statement and
conclusion as a set fact. The scene checks your circles show every statement,
and it decides which conclusions follow ITSELF, by trying every way the sets
can overlap: your drawing is only one arrangement. It accepts the visual only
when exactly one option matches. A person looks at every frame before it
goes live. Stay faithful to the stored solution.

## A syllogism, per question

```json
{
  "n": 1, "id": "<id>", "skip": false, "option": "A",
  "params": {
    "sets": [
      { "id": "circle", "label": "Circles", "x": 18, "y": 30, "r": 14 },
      { "id": "square", "label": "Squares", "x": 52, "y": 30, "r": 16 },
      { "id": "triangle", "label": "Triangles", "x": 76, "y": 30, "r": 15 }
    ],
    "statements": [
      { "form": "no", "a": "circle", "b": "square", "show": "No circle is a square", "step": "s1" },
      { "form": "some", "a": "square", "b": "triangle", "show": "Some squares are triangles", "step": "s2" }
    ],
    "conclusions": [
      { "form": "someNot", "a": "triangle", "b": "circle", "show": "I. Some triangles are not circles", "step": "c1" },
      { "form": "no", "a": "triangle", "b": "circle", "show": "II. No triangle is a circle", "step": "c2",
        "alt": { "set": "triangle", "x": 40, "y": 30, "r": 26 } }
    ],
    "options": [
      { "text": "Only I follows", "means": { "follow": [1] } },
      { "text": "Only II follows", "means": { "follow": [2] } },
      { "text": "Both I and II follow", "means": { "follow": [1, 2] } },
      { "text": "Neither I nor II follows", "means": { "follow": [] } }
    ]
  },
  "steps": [
    { "from": 0, "beats": ["s1", "s2"] },
    { "from": 1, "beats": ["c1"] },
    { "from": 2, "beats": ["c2", "answer"] }
  ],
  "answer": { "value": 1, "label": "Only I follows" }
}
```

That is the real question ef10c2ba, keyed A. Or, when it does not fit:
`{ "n": 4, "id": "<id>", "skip": true, "reason": "..." }`.

### sets

2 to 4 sets (skip a question with 5 or more terms), each a circle in a box
100 wide and 60 tall: centre `x`, `y`, radius `r` (3 to 40), wholly inside the
box. `label` is at most 16 characters. The scene places every label itself:
inside its circle where the curve leaves room, else just outside, never on
any circle's outline or on another label. When it finds no spot it refuses
the picture: shorten the label ("Microwaves", "Leafy veg"), make the circle
bigger, or give `"labelAt": [x, y]` (a label is 11 px bold, 1 unit = 3.4 px,
about 1.9 units a character, 4 units tall).

Draw the plainest picture the statements allow: a set inside another for
"all", apart for "no", two circles crossing for "some". Keep circles clear of
each other unless a statement joins them. Give big sets big circles.

### statements and conclusions

Each is `{ form, a, b, show, step }`:
- `all`: All a are b. `no`: No a is b. `some`: Some a are b (also "at least
  some"). `someNot`: Some a are not b; also "All a can never be b" (it can
  never be that all a are b). `overlap`: partly both ways (for Venn diagram
  classes that overlap, like teachers and fathers).
- "Only a few a are b": two statements, `some` and `someNot`.
- A possibility conclusion ("All a being b is a possibility", "Some a may
  be b"): the form of what is possible, plus `"possible": true`.
- `show` (at most 44 characters, plain text) as the question words it; a
  conclusion starts with its number: "I. Some triangles are not circles".
- `step`: statements "s1".."s4" (one beat each, or share one), conclusions
  "c1".."c4". Each shows when its own beat plays, so play them in the order
  the solution discusses them.

A conclusion that does NOT follow may carry `alt`: one circle moved (`set`,
`x`, `y`, `r`) to a place where every statement still holds and the
conclusion fails. It shows dashed while that conclusion plays. Give one when
the solution explains why it fails ("cards may or may not overlap books").
A possibility that follows may carry an `alt` that makes it true.

### options

Each option as printed, with `means`: `{ "follow": [1, 3] }` (exactly these
follow), `{ "follow": [] }` (none follows), `{ "either": [1, 2] }` ("Either
I or II follows"), or both (`{ "follow": [3], "either": [1, 2] }`). "All
follow" lists them all. "Only II does not follow" lists the others.

## A "which diagram" question

Same `sets` and `statements` (one per pair the solution relates: `all`,
`no`, or `overlap`), no conclusions and no options: instead `"figure": n`,
the key option's number (A = 1). You cannot see the option pictures; draw
what the solution describes. A person compares your drawing with the option
picture before it goes live. Steps: the statement beats, then `answer`.

## steps, option and answer

The solution shows as numbered sentences `[0] [1] ...`. A step names the
sentence it starts at (`from`) and the beats it plays, in order: statements,
then conclusions, then `answer`. First step at 0, each beat once, never more
steps than sentences (merge beats). `option`: the key's letter.
`answer.value`: that option's number (A = 1). `answer.label`: the key's text,
at most 32 characters (shorten: "Only I follows").

## When to skip

- 5 or more terms; a conclusion about a term no statement mentions and the
  solution does not treat as a set; statements in words the forms above
  cannot say ("Most", "Only", "Every ... except").
- The stored solution's verdicts are not what the scene finds: say which
  conclusion differs (`solutionWrong` if the solution is wrong, else skip).
- For a diagram question: classes the solution does not relate, or more than
  4 classes.

## Before you hand it back

Run the checker on your file and fix every line it prints:

    npx tsx scripts/visuals/tools/check-drafts.ts --scene=circles <your file>

"the scene gives 0" means no option matches what follows: read each
conclusion's form again (someNot versus no is the usual slip). Never bend a
statement to fit the key; if the scene and the key disagree, skip with the
reason. Generate the file with json.dump from real strings.

Read only your input, write only your output (a JSON array, one object per
question, input order). Run nothing that touches the database or git. Keep
tool output small.
