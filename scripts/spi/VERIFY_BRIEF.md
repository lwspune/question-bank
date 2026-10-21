# SPI verify brief (pass 2, for agents)

You check one slice of an SPI transcript against the printed page and answer every question
yourself, blind. Pass 1 wrote the transcript and its own answers; you never see those answers.
The main session compares the two and settles every disagreement. Repo:
`C:\Users\vilas\Downloads\Question_Bank`.

## What you read

- Your packet: `scripts/spi/out/<paperId>/verify/packet-<from>-<to>.txt`. Each block is a
  question number, any shared passage (`context:`), the stem and options A-D. Nothing else.
- The page images: `scripts/spi/out/<paperId>/pages/pNN-top.png`, `pNN-bottom.png` (halves,
  higher resolution) and `pNN.png` (whole page). Your prompt names your pages.

**Never open** `scripts/spi/transcripts/`, `scripts/spi/out/<paperId>/drafts/`, `rows.json`, or any
other file under `scripts/spi/` beyond your packet and the page images: they hold pass 1's
answers. No database writes, no git, no edits to any repo file except your output.

**Read the paper's instructions page first** (`p01-bottom.png` for 2022): it fixes the values
to calculate with for the whole paper (2022: 1 inch = 2.5 cm, 1 mile = 1.6 km, pi = 3.14 or
22/7, g = 9.8, square roots and decimal ratios to two decimals). Solve with those values.

## Two jobs per question, in this order

1. **Fidelity.** Compare the packet block with the page. Check the stem's numbers, words and
   symbols, then each option's text, and then that each option sits under the SAME letter as
   printed ((a) = A, (b) = B, (c) = C, (d) = D). A wrong option or two options swapped is the
   error that matters most: a blind answer cannot catch it, because you would find the right
   content and confirm whatever letter it sits under. Ignore differences of typesetting only
   (LaTeX for a printed power, `____` for a printed blank, line breaks).
2. **Answer.** Solve the question as PRINTED ON THE PAGE (if the packet differs, the page wins)
   and give the letter. Do not search the web for the question's wording; you may search a FACT
   (a name, a date, a term) and must say so in the why column. If a result showed this question
   with an answer, say so.

## Output

Write with the **Write tool** to `scripts/spi/out/<paperId>/verify/answers-<from>-<to>.txt`,
one line per question, nothing else except `#` comment lines:

```
<n> | <A-D> | ok
<n> | <A-D> | ok | <optional: a short why, or "unsure: ..." when you are not confident>
<n> | <A-D> | fidelity: <exactly what on the page differs from the packet>
```

Example:

```
12 | D | ok | unsure: no printed value matches my 47, so None of these
13 | A | ok
14 | C | fidelity: option C prints 144, packet has 114
```

When "None of these" is an option and no printed value is right, answer with its letter.
If a question has no right option or two, give your best letter and write `unsure: <why>`.

Keep tool output small. Final report, short: numbers covered, every fidelity issue, every
answer marked unsure.
