# Draft brief: the rest of SSC CGL (2026-11-10)

The SSC CGL chapters still without a verdict: Reasoning (Classification,
Alphabet and Number Tests, Arithmetic Reasoning, Inequalities, Missing Number,
Calendar and Clock, two stragglers from Series and Analogy) and the Quant
leftovers (Linear Equations, plus a few questions each from chapters done
earlier). No new scene: every question gets one of the existing ones, or a
skip. A person looks at every frame before it goes live. Stay faithful to the
stored solution: its rule, its steps, its order, its numbers.

Read first, in full, all in this folder: algebra-draft.md, series-draft.md,
letter-strip-draft.md, and for Quant geometry sketch-fit.md, sketch-draft.md
(with its end checklist) and sketch-bar.md.

## Which scene

Take the FIRST row that fits.

| Question | Scene |
|---|---|
| Number or letter series with one "?" (a Reasoning straggler) | `series` (series-draft.md) |
| A word written in a code, or a letter-cluster pair ("ACKO : ZXPL"), where one word turns into another | `letterStrip` (letter-strip-draft.md) |
| Number pairs or sets with a rule ("odd number-pair", "(3, 9, 2) (8, 6, 8) (5, 3, ?)"), letter clusters whose letters step by fixed gaps ("PUXZ: +5, +3, +2"), number-based odd one out (primes, squares, digit sums), arithmetic reasoning, calendar and clock, Quant algebra | `algebraSteps` (algebra-draft.md) |
| Quant geometry (Circles, Lines and Angles, Mensuration 2D, heights) where the solution reasons from a figure a teacher would draw | `sketch` (sketch-draft.md), else `algebraSteps` |
| Anything else | skip |

### Reasoning on algebra steps

- **Odd one out / missing number with a rule.** One `calc` line per given
  pair or set, the rule worked on its numbers (`2 \\times 8^2 = 128`), in the
  solution's order; the odd one's line shows what the rule gives against what
  is printed (`2 \\times 15^2 = 450 \\ne 350`, a `calc` whose value is 450);
  for a missing number, the last line works the "?" out. `answer.value` is
  that number (missing number) or the odd option's number (A = 1 ...), with
  `answer.label` the option's text.
- **Letter clusters by gaps.** Letters are their alphabet places (A = 1 ...
  Z = 26). One line per cluster, a `calc` per gap the solution names:
  `P \\to U: 21 - 16 = 5`. Use a `note` line to say which cluster breaks the
  pattern. With more than 4 clusters or more than 3 gaps each, keep only the
  gaps the solution states (at most 10 lines); if that loses the point, skip.
- **Alphabet positions** ("how many letters between L and S", "which letter
  is 7th to the left of the 15th from the right"): `calc` lines on the
  places (`S - L = 19 - 12 = 7`, so 6 letters between). Only when the
  solution counts with places or numbers; a question answered by reading the
  alphabet, sorting letters or words, matching addresses or names, or
  forming meaningful words from letters is a skip.
- **Arithmetic reasoning, calendar and clock**: as any word problem. Odd
  days, `calc` for each year or month count; clock angles `30H - 5.5M`.
- **Inequalities** (`P > Q < S \\le T`): skip, the working is reading a chain
  of signs. A comparison of numbers (`\\sqrt{10} < 3.2`, since
  `3.2^2 = 10.24`) is algebra steps.

### Skip (verdict none), with a short reason

- meaning: odd one out or relation by meaning, category or general knowledge;
- reading: dictionary order, letters arranged alphabetically, meaningful
  words formed from letters, matching an address or name exactly;
- signs: coded inequalities, statements and conclusions;
- figures: anything read off a picture (`stemImage: true` with no numbers in
  the solution);
- one line: the whole working is one number with nothing to step through
  (a draft needs 2 lines; never pad it);
- two rules: the solution says two rules fit and it follows SSC's key.

Give each skip a `situation` word from: meaning, reading, signs, figures,
oneLine, twoRules, noRule, other.

## Output: files per slice

Write, next to your input slice (`slice-K.json`):

- `slice-K.algebra.json`, `slice-K.series.json`, `slice-K.strip.json`,
  `slice-K.sketch.json`: drafts of that scene, input order, each with
  `"option"` (the key's letter) for an MCQ;
- `slice-K.skip.json`: `[{ "n", "id", "reason", "situation" }]`.

Every input question in exactly one file; write all five (`[]` when empty),
with json.dump from real strings.

If the stored solution has a wrong line, or its working gives an option that
is not the key, skip it with `"solutionWrong": "<the exact stored text> should
be <the right text>"` (or which option it gives) and list it in your final
report. Quote stored text exactly.

## Before you hand it back

From the worktree root, C:\Users\vilas\Downloads\qb-visuals11:

    npx tsx scripts/visuals/tools/check-drafts.ts --scene=algebraSteps <slice-K.algebra.json>
    npx tsx scripts/visuals/tools/check-drafts.ts --scene=series <slice-K.series.json>
    npx tsx scripts/visuals/tools/check-drafts.ts --scene=letterStrip <slice-K.strip.json>
    npx tsx scripts/visuals/tools/check-drafts.ts --scene=sketch <slice-K.sketch.json>

Fix every line they print. For a sketch, also keep labels off every outline
(sketch-bar.md). Read only your input, the briefs and the scene sources; write
only your output files (and throwaway helpers named slice-K-*.py next to
them). Never touch the database or git. Keep tool output small. Your console
may show curly quotes and dashes as a replacement character; read the JSON
with Python (utf-8) before calling a stem garbled.

Final report (short): per slice, drafts per scene and skips, then every
solutionWrong with its id.
