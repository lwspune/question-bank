# SSC CGL drafting brief (for agents)

You draft one slice of one shift: the exact English question text, the four options, the
classification, difficulty, YOUR OWN derived answer and a short solution. The main session
reviews every block and compares your answers with SSC's key afterwards. Your answers must be
derived blind. Repo (git worktree): `C:\Users\vilas\Downloads\qb-ssc`.

## Source: the only thing you may read for the questions

- `scripts/ssc-cgl/out/<shiftId>/sheets/batch-*.png`: several questions per image, English only.
  Start here; your prompt names the batches that cover your range.
- `scripts/ssc-cgl/out/<shiftId>/sheets/qNNN.png`: one question, English + Hindi. Use it when a
  batch is unclear (fractions, exponents, square roots, small print).

**2024 shifts (`t1-2024-...`) print differently.** Each question shows its number within its
section ("Q.14"); the red label above it ("Q64") is the number you write. The options print
"1." to "4.": write them as A to D in that order. `sheets/text.txt` holds the same questions
as text (no answers): copy wording from it to save typing, but the sheet is the source.
The text loses maths set as pictures, misplaces superscripts (cm 3) and drops symbols, so
check every line against the sheet. These sheets print every stem in bold, so do not bold a
whole stem; bold only what the question singles out. An underlined word or segment is written
`\(\underline{\text{...}}\)` around exactly the underlined words. A question SSC printed in
Hindi only: write your English rendering, add `flawed: yes` and a `note:` saying so (the bank
must not pass off our translation as SSC's English), and still derive the answer. A stem SSC's
print cuts off (a picture stem squeezed at the right edge, a washed-out line): write what is
printed, put any words you infer in square brackets, and add `flawed: yes` with a `note:`.

## Rules

1. **Never open** `questions.json`, `geometry.json`, `rows.json` or anything else under
   `scripts/ssc-cgl/out/` except `sheets/` and your own draft. They hold SSC's key.
2. No database writes, no git, no edits to any repo file except your draft.
3. Never run `build.ts` without `--blind`.
4. Write your draft with the **Write tool** (a shell heredoc breaks on apostrophes and
   backslashes) to the path your prompt gives: `scripts/ssc-cgl/out/<shiftId>/drafts/part-<X>.txt`.
5. Keep tool output small; read text files in ~150-line chunks. Never dump `catalog.json`
   whole: grep it and read your subject's section in chunks.

## Format

Read the "Transcript" header comment in `scripts/ssc-cgl/lib.ts`, then the same PART in a
finished example, `scripts/ssc-cgl/transcripts/t1-2025-09-18-s1.txt` (PART-A Q1-25, PART-B
Q26-50, PART-C Q51-75, PART-D Q76-100). Each block:

```
=== <n>
subject: <PART-B only: History | Geography | Polity | Economics | Physics | Chemistry | Biology | Current Affairs>
chapter: <exact chapter name from catalog.json>
subtopic: <exact subtopic name from catalog.json>
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

- **Catalog:** chapter and subtopic must be exact names under your subject in
  `scripts/ssc-cgl/catalog.json` (several contain em dashes; copy them). PART-A is "Reasoning",
  PART-C "Quantitative Aptitude", PART-D "English". In PART-B every block needs `subject:`
  (static culture, sports, awards, books, schemes and events go under Current Affairs). If nothing
  fits, use the closest and list the name you wish existed in your report.
- **Transcription:** faithful, word for word, including the paper's own wording, punctuation and
  typos. `**bold**` and `*italic*` as printed. Tables as GitHub pipe tables (header row, then a
  `|---|` separator row).
- **Math** in `\( ... \)` LaTeX. Never type these raw symbols anywhere: × ÷ → ← ≥ ≤ ≠ ≈ ∞ √ ∑ °
  ± · superscript or subscript digits, Greek letters, ½ ⅓ ¼ ¾, ∈ ∪ ∩. Write `\(\times\)`,
  `\(\ge\)`, `\(30^\circ\)`, `\(\sqrt{3}\)`, `\(\frac{a}{b}\)`, `\(\alpha\)`, `\(\text{cm}^3\)`.
  The rupee sign ₹ is fine.
- **Passage sets (PART-D):** your prompt says which questions share one passage (checked pixel
  for pixel). Write the passage once, in the set's first block, as a `context:` section before
  `stem:`; the other blocks get `context_from: <first number>`. The bold lead-in line ("Read the
  following passage ...") belongs to the context.
- **Difficulty** on the SSC Tier I scale: one-step or common-knowledge items EASY, two or three
  steps or specific facts MODERATE, heavy working, rare words or obscure facts HARD.
- **Solutions:** plain English, short, no em dashes. Quant shows the working (blank line between
  steps) and VERIFIES the answer a second way where cheap. GA gives the fact and, where useful,
  why the others are wrong. You may use web search for a GA fact; say in your report which
  answers rest on a search. Search the FACT (names, dates, terms), never the question's own
  wording: quiz sites carry these exact questions with their answers, and seeing one ends the
  blind derivation. If a result shows this question with an answer anyway, say so in your report.
- **Flawed:** if no option is right or two are, still give the best answer and add
  `flawed: yes` and `note: <why>` after `answer:`.
- **Figures:** if a question needs a picture (figure, diagram, map, chart) to be answered, add
  `figure: stem`, `figure: options` or `figure: stem+options` after `answer:` and name it in
  your report. Do not draw anything. The stem then says what the picture is for ("Two positions
  of this dice are shown in the figures below") exactly as printed; when the OPTIONS are
  pictures, write each option as `[figure]`. Your solution may describe what the picture shows.
  Maths or a table printed as a picture is NOT a figure: write it as LaTeX or a pipe table.

## Check, then report

From the repo root run, and fix until it prints `problems: 0` with your full number range:

```
npx tsx scripts/ssc-cgl/build.ts <shiftId> --blind --file=scripts/ssc-cgl/out/<shiftId>/drafts/part-<X>.txt
```

Final report, short: the numbers covered; every answer you are not confident of, one line why
(and whether a search settled it); catalog names you wish existed; any flawed or figure question.
