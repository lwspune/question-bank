# Drafting brief: worked solutions

You write worked solutions for questions that have only an answer. The full
background is `SOLUTIONS_BACKFILL_SPEC.md`; this file is all you need.

## What you get and what you write

- **Read:** one `questions-NN.json` in `generated-papers/solutions/<batch>/`,
  plus that folder's `style.json` (solutions the bank already has, for the
  house style). A question with `image` set has its picture at that path:
  open it with the Read tool.
- **Never open** `key.json` or any `disputes-*.md` in that folder. The work
  is blind: you solve each question yourself and say what answer you reached.
  A script compares your answer with the key afterwards.
- **Write:** one file, `drafts-NN.json` (same NN as your questions file), in
  the same folder, with the Write tool:

```json
{
  "<question id>": { "solution": "...", "solvedAnswer": "B" },
  "<question id>": { "skip": "the figure is needed and not given" }
}
```

- EVERY question id in your slice appears in the file, a skipped one as
  `{ "skip": "<why>" }`. A question left out is lost from the count.
- Nothing else: no database, no git, no other files, no scripts.
- Keep tool output small. Do not print whole files back.

## How to solve

1. Work the question out properly, step by step, before you write anything.
   Never pick an option because it looks likely. If you cannot reach an answer
   you trust, write `{ "skip": "<one line why>" }`. A skip costs nothing; a
   wrong solution is worse than none.
2. `solvedAnswer` is the option letter you reached (`"B"`), or for a
   `numeric` question the number (`"12.5"` or `"25/2"`).
3. `pointsAtFigure: true` means the text mentions a figure but no picture
   exists. Solve it only if the text alone gives everything you need;
   otherwise skip it. Never describe a figure you have not seen.
4. Questions sharing a `context` (a passage) are next to each other: read the
   passage once and answer each.

## How the solution reads

- Short steps, one idea per line, usually 3 to 8 lines. Start from what the
  question gives; end with the answer it asks for.
- For an MCQ the LAST line names the option, exactly as:
  `So the answer is (B) 5.` For a numeric question the last line ends with
  the number.
- Plain words, for a student. Never the word "stored". Never doubt the
  question or the key in the solution.
- Maths in LaTeX: `\(...\)` inline, `\[...\]` on its own line. Use `\pi`,
  `\times`, `\leq`, `^\circ`, `^2`, never Unicode symbols (π × ≤ ° ²).
  Balanced delimiters. Never a line break inside `\( \)`.
- No em dash or en dash anywhere. Use a full stop, colon, comma or brackets.
- A table is a GFM pipe-table with its `|---|` separator line.
- Fact questions (biology, GK, polity, history, reading passages): give the
  fact, then say why EVERY other option is wrong, one short line each or one
  line naming them all. Never leave a wrong option unexplained. No essay.
- Add no fact the question does not need. Every extra claim is one more
  chance to be wrong. Use the textbook's own term (morels are "edible
  fungi", not "mushrooms"); if you are unsure of a term, leave it out.
- For a reading passage, point to the sentence of the passage that decides
  it. If no sentence decides it, skip the question.
- Language follows the question: an English question gets English; a
  Marathi question gets Marathi.

## JSON and backslashes (the one trap)

In a JSON string every LaTeX backslash is written TWICE. `\(` is `"\\("`,
`\frac` is `"\\frac"`, `\neq` is `"\\neq"`. A single backslash is eaten:
`"\neq"` becomes a line break + "eq", `"\times"` a tab + "imes". A real line
break between steps is `\n` (single backslash, that one is meant).

## A finished example

Question (`mcq`): "Two 10 g particles with 1 μC each sit on a table with
μ = 0.25. Least separation at which they stay at rest?" (A) 0.3 m (B) 0.6 m
(C) 0.9 m (D) 1.2 m. Take g = 10 m/s².

```json
{
  "3f2b...": {
    "solution": "Each particle stays at rest while the repulsion is no more than the largest friction force.\nLargest friction: \\(\\mu m g = 0.25 \\times 0.01 \\times 10 = 0.025\\) N.\nRepulsion: \\(F = \\frac{k q^2}{r^2} = \\frac{9 \\times 10^9 \\times (10^{-6})^2}{r^2} = \\frac{9 \\times 10^{-3}}{r^2}\\) N.\nAt the least separation the two are equal: \\(\\frac{9 \\times 10^{-3}}{r^2} = 0.025\\), so \\(r^2 = 0.36\\) and \\(r = 0.6\\) m.\nSo the answer is (B) 0.6 m.",
    "solvedAnswer": "B"
  }
}
```

When done, reply with one line: how many solved, how many skipped.
