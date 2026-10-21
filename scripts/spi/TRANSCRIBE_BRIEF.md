# SPI transcription brief (pass 1, for agents)

You transcribe one slice of one SPI paper from page images and, for each question, write the
classification, difficulty, YOUR OWN derived answer and a short solution. No key exists for
this paper, so your answer is one of two blind derivations; a second agent derives again from
your transcript, and the main session settles every disagreement. Repo:
`C:\Users\vilas\Downloads\Question_Bank`.

## Source: the only thing you may read for the questions

`scripts/spi/out/<paperId>/pages/`: `pNN.png` is printed page NN whole; `pNN-top.png` and
`pNN-bottom.png` are its halves at a higher resolution (they overlap by 10%). Read from the
halves; use the whole page to see where a question or passage starts and ends. Your prompt
names your pages and your number range.

**Two-column papers (the LWS mocks)** are cut per column instead: `pNN-L-top.png`,
`pNN-L-bottom.png`, `pNN-R-top.png`, `pNN-R-bottom.png`. Questions run down the left column,
then the right. **Typed papers** also have `text.txt` (the PDF's text layer): copy wording from
it to save typing, but the page image is the source. The text layer flattens powers, fractions
and roots (`52x - 1` is \(5^{2x-1}\)) and interleaves the two columns, so check every line
against the image.

**Read the paper's instructions page first** (`p01-bottom.png` for 2022). It fixes the values to
calculate with for the whole paper (2022: 1 inch = 2.5 cm, 1 mile = 1.6 km, \(\pi\) = 3.14 or
22/7, g = 9.8, every square root rounded to two decimals, every decimal ratio taken to two
decimals). Solve with those values, not textbook ones, and where one decides the answer say so in
the solution ("using the paper's value 1 inch = 2.5 cm"). A question that only works with the
paper's value is NOT flawed. A paper with no instructions page (the sample papers, QP_1, the
mocks) uses the same SPI conventions; say in the solution which value you used.

**Numbering.** The 2022 booklet prints `001.`; the other papers print `Q1.`, `Q. 1:`, `1.` or
`1)`. Write `=== <n>` with the printed number. A paper printed as two files (Maths, GAT) numbers
each 1-75: the GAT file is its own paper, all General Ability, so every block needs `subject:`.

The 2022 booklet prints numbers as `001.` to `150.`: write `=== 1` to `=== 150`. Options print
inline as `(a) ... (b) ... (c) ... (d) ...`: write them as `A:` to `D:` in that order, one per line,
without the `(a)`. Many options are "None of these": copy them as printed.

## Rules

1. No database writes, no git, no edits to any repo file except your draft.
2. Write your draft with the **Write tool** (a shell heredoc breaks on apostrophes and
   backslashes) to the path your prompt gives: `scripts/spi/out/<paperId>/drafts/<from>-<to>.txt`.
3. Do not search the web for a question's wording: quiz sites carry SPI papers with answers,
   and seeing one ends the blind derivation. You may search a FACT (a name, a date, a term);
   say in your report which answers rest on a search, and if a result showed this question
   with an answer anyway, say so.
4. Keep tool output small. Do not open other agents' drafts.

## Format

Read the "Transcript" header comment in `scripts/ssc-cgl/lib.ts` (SPI uses that parser), then
skim a finished example: `scripts/ssc-cgl/transcripts/t1-2025-09-18-s1.txt`. Each block:

```
=== <n>
subject: <see below>
chapter: <exact chapter name from CATALOG in scripts/spi/config.ts>
subtopic: <a short name for the specific skill, e.g. "Clock Angles", "Antonyms", "Rivers and Districts">
difficulty: EASY | MODERATE | HARD
answer: A-D
stem:
<question text>
A: <option>
B: <option>
C: <option>
D: <option>
solution:
<short working or reasoning>
```

- **Subject.** Part 1 (Q1-75, Mathematical Ability) is Mathematics by default: leave out
  `subject:` there, except for a pure puzzle (clock, calendar, coding, counting figures,
  direction, ranking), which takes `subject: Reasoning`. Part 2 (Q76-150, General Ability)
  needs `subject:` on EVERY block: English, Physics, Chemistry, Biology, Geography, History,
  Polity, Economics, General Knowledge (defence forces and ranks, awards, persons, sports,
  schemes, events) or Reasoning.
- **Chapter** must be an exact name under that subject in `CATALOG` (`scripts/spi/config.ts`;
  several contain em dashes: copy them). Maharashtra questions go to "Maharashtra Geography" or
  "History of Maharashtra". If nothing fits, use the closest and list the name you wish existed.
- **Transcription:** faithful, word for word, including the paper's own wording, spelling,
  punctuation and typos. A blank `__` is written `____`. `**bold**` and `*italic*` only where
  printed so. Tables as GitHub pipe tables (header row, then a `|---|` separator row).
- **Math** in `\( ... \)` LaTeX. Never type these raw symbols anywhere (stem, options or
  solution): × ÷ → ← ≥ ≤ ≠ ≈ ∞ √ ∑ ° ± · π, superscript or subscript digits, Greek letters,
  ½ ⅓ ¼ ¾, ∈ ∪ ∩. Write `\(\times\)`, `\(\ge\)`, `\(30^\circ\)`, `\(\sqrt{3}\)`,
  `\(\frac{a}{b}\)`, `\(\pi\)`, `\(\text{cm}^3\)`. The booklet writes powers as `x^n` and
  `10^3`, and units like `m/s^2`: typeset them, `\(x^n\)`, `\(10^3\)`, `\(\text{m/s}^2\)`. The
  rupee sign ₹ is fine. Write a literal dollar sign as `\$`. A raised dot between digits
  ("7·5 m") is a printed decimal point: write `7.5 m`, never `\(7 \cdot 5\)`, which reads as
  multiplication.
- **Shared directions and passages:** when a direction line or passage governs several
  questions ("Given below are pairs of districts...", "Read the passage..."), write it once,
  in the set's first block, as a `context:` section before `stem:`; the other blocks get
  `context_from: <first number>` in their header. The stem is then just that question's own line.
  **A question with no line of its own** (a direction followed only by option sets, as in "In
  the following five questions, find the odd one out"): write the printed direction as the
  stem of each block, word for word, and no `context:`. Never invent a stem.
- **Difficulty** for a Class 10 entrance test: one step or common knowledge EASY, two or three
  steps or a specific fact MODERATE, long working, a trap or an obscure fact HARD.
- **Solutions:** plain English, short, no em dashes. Never name an option by its letter ("option
  (b)", "(c) is correct"): name its content ("so the answer is 825 buckets"). Maths shows the
  working (blank line between steps) and checks the answer a second way where cheap. General
  Ability gives the fact and, where useful, why the other options are wrong.
- **None of these / flawed:** if "None of these" is genuinely the answer, key it and show why
  each printed value fails. If no option is right, two are, or the question cannot be answered
  as printed, still give the best answer and add `flawed: yes` and `note: <why>` after `answer:`.
- **Figures:** if a question needs a picture (figure, diagram, graph, Venn diagram, map) to be
  answered, add `figure: stem`, `figure: options` or `figure: stem+options` after `answer:`. Do
  not draw anything; the main session crops the booklet's own picture. The stem says what the
  picture is for exactly as printed. When the OPTIONS are pictures, write each option as
  `[figure]`. Your solution may describe what the picture shows. Maths printed as a picture is
  NOT a figure: write it as LaTeX.

## Check, then report

From the repo root run, and fix until it prints `problems: 0`:

```
npx tsx scripts/spi/build.ts <paperId> --file=scripts/spi/out/<paperId>/drafts/<from>-<to>.txt --from=<from> --to=<to>
```

Final report, short: the numbers covered; every answer you are not confident of, one line why
(and whether a search settled it); catalog chapter names you wish existed; every flawed or
figure question; anything on the page you could not read.
