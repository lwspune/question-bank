# RRB NTPC drafting brief (for agents)

You draft one slice of one shift of the RRB NTPC Graduate CBT 1 paper (16-27 March 2026): the exact
English question text, the four options, the classification, difficulty, YOUR OWN derived answer
and a short solution. The main session reviews every block and compares your answers with RRB's
key afterwards. Your answers must be derived blind. Repo (git worktree):
`C:\Users\vilas\Downloads\qb-ntpc`.

## Source: the only thing you may read for the questions

- `scripts/rrb-ntpc/out/<shiftId>/sheets/batch-*.png`: several questions per image. Your prompt
  names the batches that cover your range.
- `scripts/rrb-ntpc/out/<shiftId>/sheets/qNNN.png`: one question, larger. Use it when a batch is
  unclear (fractions, exponents, small print).
- `scripts/rrb-ntpc/out/<shiftId>/sheets/text.txt`: the same questions as text (no answers). Copy
  wording from it to save typing, but the SHEET is the source: the text layer loses maths set as
  pictures (a "use \(\pi = \frac{22}{7}\)" can print as "(use )"), misplaces superscripts
  ("cm2" is \(\text{cm}^2\)) and drops symbols. Check every line against the sheet.

The sheet is RRB's response-sheet print. The paper is ONE section of 100 questions, numbered 1-100
as printed, with Mathematics, Reasoning and General Awareness mixed in any order. Options print
"A." to "D.": write them as A to D. The faint blue "prepp" logo across the page is the host's:
ignore it. Stems print in bold, so do not bold a whole stem; bold only what the question singles
out. Under a picture the sheet may add "stem picture, as stored in the file" or "option N picture":
that is the same picture again, at its own resolution.

## Rules

1. **Never open** `questions.json`, `geometry.json`, `rows.json`, anything under `img/`, or anything
   else under `scripts/rrb-ntpc/out/` except `sheets/` and your own draft. They hold RRB's key.
   Never open the source PDFs or download any paper: they show the key in colour.
2. No database writes, no git, no edits to any repo file except your draft.
3. Never run `build.ts` without `--blind`.
4. Write your draft with the **Write tool** (a shell heredoc breaks on apostrophes and
   backslashes) to the path your prompt gives: `scripts/rrb-ntpc/out/<shiftId>/drafts/<slice>.txt`.
5. Keep tool output small; read text files in ~150-line chunks. Never dump `catalog.json` whole:
   grep it and read your subject's section in chunks.

## Format

Read the "Transcript" header comment in `scripts/ssc-cgl/lib.ts`, then a few blocks of a finished
example from the same print, `scripts/ssc-cgl/transcripts/t1-2024-09-09-s1.txt` (an SSC paper: its
blocks carry `subject:` only in General Awareness; in NTPC EVERY block carries it). Each block:

```
=== <n>
subject: Mathematics | Reasoning | History | Geography | Polity | Economics | Physics | Chemistry | Biology | Current Affairs | Computer Knowledge
chapter: <exact chapter name from scripts/rrb-ntpc/catalog.json>
subtopic: <exact subtopic name from scripts/rrb-ntpc/catalog.json>
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

- **Subject:** every block. Arithmetic, algebra, geometry, mensuration, trigonometry, statistics:
  Mathematics. Series, coding, analogies, seating, blood relations, syllogisms, directions,
  mirror images: Reasoning. General Awareness goes to the eight subjects (general science to
  Physics, Chemistry or Biology; art, culture and heritage to History; static GK, sports, awards,
  books, schemes, summits and recent events to Current Affairs), and basic computer questions to
  Computer Knowledge.
- **Catalog:** chapter and subtopic must be exact names under your subject in
  `scripts/rrb-ntpc/catalog.json` (several contain em dashes; copy them). If nothing fits, use the
  closest and list the name you wish existed in your report.
- **Transcription:** faithful, word for word, including the paper's own wording, punctuation and
  typos. `**bold**` and `*italic*` as printed. Tables as GitHub pipe tables (header row, then a
  `|---|` separator row). Statements a stem lists as "A." or "1." stay on their own lines; a stem
  line may not START with "A:" to "D:" (that reads as an option), so write such a line "A." instead.
- **Math** in `\( ... \)` LaTeX. Never type these raw symbols anywhere: − (the typographic minus;
  a negative option is `\(-1\)`) × ÷ → ← ≥ ≤ ≠ ≈ ∞ √ ∑ °
  ± · superscript or subscript digits, Greek letters, ½ ⅓ ¼ ¾, ∈ ∪ ∩. Write `\(\times\)`,
  `\(\ge\)`, `\(30^\circ\)`, `\(\sqrt{3}\)`, `\(\frac{a}{b}\)`, `\(\pi\)`, `\(\text{cm}^2\)`.
  The rupee sign ₹ is fine. Write every dollar sign escaped, `\$`. Reasoning symbol series
  (© @ £ € # &) are fine as printed, except `$`, which is `\$`.
- **Difficulty** on the NTPC scale (a graduate-level screening test, a step easier than SSC CGL):
  one-step or common-knowledge items EASY, two or three steps or a specific fact MODERATE, heavy
  working or an obscure fact HARD.
- **Solutions:** plain English, short, no em dashes. Mathematics shows the working (blank line
  between steps) and VERIFIES the answer a second way where cheap. Reasoning shows the rule or the
  arrangement. General Awareness gives the fact and, where useful, why the others are wrong. You
  may use web search for a General Awareness fact; say in your report which answers rest on a
  search. Search the FACT (names, dates, terms), never the question's own wording: quiz sites
  carry these exact questions with their answers, and seeing one ends the blind derivation. If a
  result shows this question with an answer anyway, say so in your report.
- **Flawed:** if no option is right or two are, still give the best answer and add
  `flawed: yes` and `note: <why>` after `answer:`.
- **Figures:** if a question needs a picture (figure, diagram, map, chart) to be answered, add
  `figure: stem`, `figure: options` or `figure: stem+options` after `answer:` and name it in your
  report. Do not draw anything. When the OPTIONS are pictures, write each option as `[figure]`.
  Maths, a unit or a table printed as a picture is NOT a figure: write it as LaTeX or text (a
  picture option "15 km/h" is the text option `15 km/h`).

## Check, then report

From the repo root run, and fix until it prints `problems: 0` with your full number range:

```
npx tsx scripts/rrb-ntpc/build.ts <shiftId> --blind --file=scripts/rrb-ntpc/out/<shiftId>/drafts/<slice>.txt
```

Final report, short: the numbers covered; every answer you are not confident of, one line why
(and whether a search settled it); catalog names you wish existed; any flawed or figure question.
