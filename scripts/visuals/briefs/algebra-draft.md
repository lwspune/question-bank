# Draft brief: write an algebra-steps animated solution

Each question you get was judged to need no picture but to have working a
student can follow line by line. You turn the stored solution's working into
up to 10 lines that appear one at a time, a changed term coloured in its old
line and its new one. A program checks every line you mark as checked and the
answer against the key, and refuses the visual if anything disagrees; a person
looks at every frame before it goes live. Stay faithful to the stored
solution: same method, same order, its own numbers.

## What you write, per question

```json
{
  "n": 4, "id": "<id>", "skip": false,
  "params": {
    "lines": [
      { "step": "s1", "kind": "note", "tex": "f(x) = \\sqrt[3]{x},\\quad a = 0.027,\\quad h = {{2:-0.001}}" },
      { "step": "s2", "kind": "calc", "tex": "f(a) = \\sqrt[3]{0.027} = {{1:0.3}}", "f": "0.027^(1/3)", "value": "0.3" },
      { "step": "s3", "kind": "calc", "tex": "f'(a) = \\dfrac{1}{3(0.027)^{2/3}} = {{3:\\dfrac{1}{0.27}}}", "f": "1/(3*0.027^(2/3))", "value": "1/0.27" },
      { "step": "s4", "kind": "calc", "tex": "f(a+h) \\approx {{1:0.3}} + ({{2:-0.001}})\\left({{3:\\dfrac{1}{0.27}}}\\right) \\approx 0.2963", "f": "0.3+(-0.001)*(1/0.27)", "value": "0.2963", "dp": 4, "note": "f(a + h) ≈ f(a) + h f′(a)" }
    ],
    "answer": "0.2963"
  },
  "steps": [{ "from": 0, "beats": ["s1"] }, { "from": 1, "beats": ["s2", "s3"] }, { "from": 2, "beats": ["s4"] }],
  "answer": { "value": 0.2963, "label": "0.2963" }
}
```

That is the real MHT-CET question "the approximate value of ∛0.026", keyed
0.2963. Or, when it does not fit: `{ "n": 4, "id": "<id>", "skip": true, "reason": "..." }`.

### lines

Each line has `step` ("s1".."s8"), `tex` (KaTeX, as the solution writes it,
at most 140 characters) and `kind`, which says how the program checks it:

- `calc`: a worked number. `f` is the computation as a formula, `value` the
  number the line states; they must agree (`dp`: the decimals shown, when the
  line rounds with ≈). Use it for every line that works something out.
- `expr`: a rewrite of the previous `expr` line (expand, factor, simplify,
  substitute). `f` is the line as a formula; it must equal the previous expr
  line's f at several values of x. A chain of such lines is checked link by
  link.
- `eq`: an equation. `lhs` and `rhs` formulas in x; every value in `roots`
  must satisfy it. Put `roots` (a list of formulas) at the top level when
  every equation solves for the same unknown, or on the line itself when a
  line solves for something else (p first, then c). Use it for the lines of
  "solve ... = 0" working, with `roots` the solutions the working reaches.
- `note`: nothing to check (the set-up line, "hence proved", the final
  statement of a root set). At least one line must be checked.

Formulas: + - * / ^ ( ), numbers, pi, e, and sin cos tan asin acos atan exp
log (natural) ln log10 sqrt abs deg rad, atan2(y, x), min, max. Always write
`*`. **The unknown is always x in formulas**, whatever letter the tex shows
(k, m, t): write the formula in x. Named numbers go in a top-level `vars`
object (each a formula of the ones before it), as in the sketch brief.

Marks: `{{1:...}}`, `{{2:...}}`, `{{3:...}}` around a term colour it (blue,
amber, green). Put the SAME number on the same quantity in each line where it
appears, so the eye follows it: the term that is about to change, and what it
becomes. Use marks sparingly, at most three quantities.

`note` on a line (plain text, at most 44 characters, no LaTeX) prints a short
reason under it: "split −5x as −2x − 3x", "f(a + h) ≈ f(a) + h f′(a)". Write
it as a reader sees it: x², π, √, −, never x^2 or pi.

In the JSON you write, every TeX backslash is doubled ("\\frac", "\\text"): a
single one is read as an escape, so "\t" of "\text" becomes a TAB and "\f" of
"\frac" a form feed, and the checker refuses the line.

### steps and answer

The solution shows as numbered sentences `[0] [1] ...`. A step names the
sentence it starts at (`from`) and the line steps it shows (`beats`). The
first step starts at 0, later ones later, each step name used once. `answer`
(in params) is a formula giving the keyed value; `answer.value` that number,
`answer.label` (at most 32 characters) how it reads.

## Rules

- Follow the stored solution. Never change the method or the numbers.
- A "show that" with letters left free (a, b, h) cannot be checked by numbers:
  skip it, unless the solution's own working substitutes numbers.
- If the stored working has a wrong line, say so in `solutionWrong` and skip.
- If the keyed answer is not what the working gives, skip with the reason.
- Keep tex short enough for a phone line (about 40 characters of maths): split
  a long line in two. A line is maths, not prose: a sentence ("f is a
  polynomial, so it is continuous") goes in that line's `note`, never in tex.
- Read only your input, write only your output (a JSON array, one object per
  question, input order). Run nothing that touches the database or git. You
  may run small Python checks. Keep tool output small.

## Before you write the file: the checker refuses these

- A first step that does not start at sentence 0; a step name used twice.
- A `calc` whose f and value differ (beyond `dp`), an `expr` that does not
  equal the expr line before it, an `eq` a root does not satisfy.
- `\htmlClass`, `\href` or other HTML commands in tex (marks are {{n:...}}).
- `answer.label` over 32 characters, a `note` over 44.
