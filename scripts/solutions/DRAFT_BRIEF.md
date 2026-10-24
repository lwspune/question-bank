# Drafting brief: worked solutions

You write worked solutions for questions that have only an answer. The full
background is `SOLUTIONS_BACKFILL_SPEC.md`; this file is all you need.

## What you get and what you write

- **Read:** one `questions-NN.json` in `generated-papers/solutions/<batch>/`,
  plus that folder's `style.json` (solutions the bank already has, for the
  house style). A question with `image` set has its picture at that path:
  open it with the Read tool.
- For a question with `image` set, open ITS OWN picture (the path in its
  `image` field) BEFORE solving and add `"imageSeen": true` to its draft.
  Neighbouring questions often look alike; reading the next one's graph has
  happened (b21). Read every value from the figure itself; never pick the
  reading that makes an option fit. If the figure does not settle a value,
  skip. A draft for a picture question without
  it is rejected. If you cannot or did not open it, skip the question.
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
- After writing, check the file parses and holds every id. If you change it
  after that check, check again: a late edit has dropped ids (b20).
- Check with a parser, never by eye: `node -e` that JSON.parses your file
  and the questions file and prints only the count present and missing. A
  check "by eye" passed a file missing 4 of 35 ids (b32).

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
- Plain words, for a student. Never say "stored" about the answer or key
  ("the stored answer"); as science it is fine. Never doubt the
  question or the key in the solution.
- Maths in LaTeX: `\(...\)` inline, `\[...\]` on its own line. Use `\pi`,
  `\times`, `\leq`, `^\circ`, `^2`, never Unicode symbols (π × ≤ ° ²).
  Balanced delimiters. Never a line break inside `\( \)`. When you quote an
  option that prints a symbol (°, Ω, →), write the symbol in LaTeX:
  `\(^\circ\)C`, `\(\Omega\)`, `\(\rightarrow\)`.
- Every LaTeX command sits inside `\( \)` or `\[ \]`. Bare `3 \times 4` in
  plain text prints the backslash: write `\(3 \times 4\)`.
- No em dash or en dash anywhere. Use a full stop, colon, comma or brackets.
- A table is a GFM pipe-table with its `|---|` separator line.
- Fact questions (biology, GK, polity, history, reading passages): give the
  fact, then say why EVERY other option is wrong, one short line each or one
  line naming them all. Never leave a wrong option unexplained. No essay.
- Statements questions ("which are incorrect?"): give the TRUE reason each
  statement is right or wrong, not just which ones. Reaching the right
  letter for a wrong reason still teaches the wrong thing (b18: "the base
  joins the 1'C, not its OH" when the slip was "nucleotide" for
  nucleoside). If you are not sure why a statement is wrong, skip.
- When two options are close enough that you would have to argue for one
  over the other, skip. Do not pick "the closer one" or "the most
  appropriate" (b29, b30).
- Never settle a match or pairing by elimination alone ("item 3 is the one
  left over"). Each pair you state must be true; if one is not, skip.
- Add no fact the question does not need. Every extra claim is one more
  chance to be wrong. Use the textbook's own term (morels are "edible
  fungi", not "mushrooms"); if you are unsure of a term, leave it out.
- For a reading passage, point to the sentence of the passage that decides
  it. If no sentence decides it, skip the question.
- Language follows the question: an English question gets English; a
  Marathi question gets Marathi, and its last line is "म्हणून उत्तर (X) ..."
  in place of "So the answer is (X) ..." (owner, 2026-10-24). Name the
  concept (अभिधा, लक्षणा, व्यंजना; उपमा, रूपक ...), define it in one line,
  show how the line fits, and say why each other option does not.
- Marathi grammar the drafts have got wrong (b30), to apply exactly:
  प्रयोग follows what the verb agrees with (कर्ता: कर्तरी; कर्म: कर्मणी, as in
  'त्याने अभ्यास केला'; neither, neuter default: भावे, as in 'आईवडिलांनी
  मुलांना वाढविले'). संधी splits use the original form (अंतर् + करण,
  विपद् + काल; before र a विसर्ग drops and the vowel lengthens: निः + रव =
  नीरव). ज, च before अ, आ, उ, ओ are the दंततालव्य variants (जमाव); before
  इ, ए they are तालव्य. 'लिहिला असेल' is पूर्ण भविष्यकाळ.
- More from b31: द्विगु has a number for its first word and its SECOND
  word is the main one. अः becomes ओ only before a मृदू व्यंजन (मनः + रथ =
  मनोरथ). In each वर्ग the 1st, 3rd and 5th letters are अल्पप्राण. A म्हण
  is not a वाक्प्रचार: call it by the name the question uses. सत्यासत्य is
  "सत्य किंवा असत्य". Never gloss a wrong option's word you are not sure
  of (b31 called जलद "fast" and अभावित "unavoidable"): say only that it
  does not mean what the question asks.
- From b32: a ने subject whose verb agrees with nothing is भावे even
  with no object ('त्याने आता घरी जावे' is अकर्मक भावे). In grammar
  definitions "शब्दाच्या मागे" means BEFORE the word (उपसर्ग), and पुढे
  means after (प्रत्यय). 'आम्ही गहू खातो' and 'पानावर बसा' are the
  textbook लक्षणा examples.

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
