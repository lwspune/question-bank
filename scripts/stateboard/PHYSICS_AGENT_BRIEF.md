# Physics chapter ingestion — the full-pipeline agent contract

You own **ONE chapter, end to end**: render → transcribe → commit → author → verify
→ diagrams → publish. Work to this brief, not to memory of how another pipeline works.

Read **`PHYSICS_TRANSCRIPTION_BRIEF.md` first** — it carries the vision-only verdict,
the Symbol-font glyph map, the `bookAnswer` rule and the LaTeX rules. Everything here
assumes you have read it.

Run every command from the repo root `C:\Users\vilas\Downloads\Question_Bank`.

---

## 0. What is already done for you

Your chapter is **already registered** in `config.ts` with its `chapterName`,
`subjectName: "Physics"`, `sourceFile`, `pdf`, `derivedAnswers: true`, a canonical
`subtopics[]` list, and a comment carrying the MEASURED structural map: page count,
the page the `Exercises` block opens on, where each solved example sits, and how many
exercise questions print an inline `[Ans: …]`.

**Do NOT edit `config.ts`.** Fifteen agents are running concurrently against that one
file and a concurrent edit will corrupt it. If something in your entry is wrong,
**report it** — do not fix it.

The subtopic list is deliberately GENEROUS. An unused subtopic costs nothing (a
subtopic row is created only when a question references it), so use the ones that fit
and simply do not use the rest. **Never invent a subtopic name** — an unknown name is
a hard commit error, by design.

## 1. Render

```
npx tsx scripts/stateboard/render.ts <chapterId>
```
→ `scripts/stateboard/out/<chapterId>/p-NN.png`. Read these IMAGES.

## 2. Plan your bands from the BLOCK map, not the page map

Before transcribing, build a `(page, y)` map with `page.get_text("blocks")` and locate:
every `Example N.M`, every `Solution :`, the `Exercises` banner, and the numbered
blocks inside it (`1. Choose the correct option`, `2. Answer in brief`, then flat items).

**A page boundary is not a block boundary.** A solved example routinely straddles a
column break or a page break; the Oscillations chapter had one whose stem ended a left
column and whose solution began the right.

**Reconcile the two counts in your config comment.** `Example N.M` markers and
`Solution :` markers often DISAGREE. Measured causes, all seen on Ch.9 Current
Electricity, where the real count was 10 against 7 `Solution :` markers:

- the book sometimes prints **`Solutions:` — plural**, which a `Solution\s*:` scan misses;
- a worked example sometimes carries **no solution label at all**, its working starting
  straight in at "When the bridge is balanced";
- and in the other direction an `Example` hit can be a cross-reference in prose
  ("as in Example 9.2").

Treat the `Example N.M` count as PRIMARY and the `Solution` count as a cross-check.
Establish the real number yourself, say what you found, and say what caused any gap.
A missing solved example is invisible to every gate downstream.

## 3. Transcribe

Split the chapter into a handful of bands and do them yourself in sequence (you are one
agent; do not spawn sub-agents). Write one file per band:
`scripts/stateboard/data/<chapterId>.<band>.json`.

Row shape, refs, buckets, LaTeX rules and the `bookAnswer` field: see
`PHYSICS_TRANSCRIPTION_BRIEF.md`. Ref conventions for this lane, follow them exactly:

| block | bucket | ref |
|---|---|---|
| worked example | `solved` | `Solved Ex.<N.M>` |
| `1. Choose the correct option` i)–v) | `exercise-mcq` | `Ex Q.1 (i)` … |
| `2. Answer in brief` i)–v) | `exercise-subjective` | `Ex Q.2 (i)` … |
| flat items 3, 4, 5 … | `exercise-subjective` | `Ex Q.3`, `Ex Q.4` … |

The two `i)–v)` blocks are SETS: put the shared instruction in `context` and give the
siblings a common `setLabel` (`Ex Q.1`, `Ex Q.2`). Flat items are standalone.

⚠ **A CONSTANTS PREAMBLE MUST GO INTO `context`, AND THIS CANNOT BE FIXED LATER.**
Several chapters open their Exercises with a shared list of constants ("Use
\( m_e = 9.1 \times 10^{-31} \) kg, \( m_p = \ldots \)") and then the numericals
depend on it. A row that references a constant it does not carry is UNDER-DETERMINED
for a student on `/browse`, who sees only that one question.

Put the relevant constants in `context` on every row that needs them. Do it BEFORE
commit: `context` is part of `subjectiveContentHash`, so adding it afterwards changes
the row's identity and forces a delete-and-re-commit. Naming the constants inside the
SOLUTION is a mitigation, not a fix — the student cannot attempt the question from it.

Ch.15 Structure of Atoms and Nuclei shipped without this and is logged as a backfill
candidate. Do not repeat it.

## 4. Merge + commit

```
npx tsx scripts/stateboard/merge.ts <chapterId>
npx tsx scripts/stateboard/commit.ts <chapterId>            # dry run
npx tsx scripts/stateboard/commit.ts <chapterId> --apply
```

**Before `--apply`, diff the printed `by subtopic` tally against your config list and
say which subtopics got ZERO.** These chapters teach more than they examine — the
Oscillations chapter teaches Damped and Forced Oscillations and never examines either —
so an unused subtopic is expected, not a defect. Report them; do not edit config.

`merge.ts` refuses any file that is not a question fragment. If it refuses one of yours,
your file has the wrong shape — fix the file, never the guard.

## 5. Sections (`/board`)

Author your chapter's outline in `sections.ts` under `SECTIONS[<chapterId>]`. **This is
the ONE shared file you may edit** — append your own key and nothing else. Physics
chapters are uniform, so this is nearly boilerplate:

```ts
"<chapterId>": [
  { group: "<N>. <Chapter> — worked examples", label: "Solved Examples", kind: "solved_example", refPrefixes: ["Solved Ex.<N>."] },
  { group: "Exercises", label: "Choose the correct option", kind: "exercise", refPrefixes: ["Ex Q.1 ("] },
  { group: "Exercises", label: "Answer in brief",           kind: "exercise", refPrefixes: ["Ex Q.2 ("] },
  { group: "Exercises", label: "Solve the following",       kind: "exercise",
    refPrefixes: ["Ex Q.3", "Ex Q.4", … every flat number you actually used] },
],
```

⚠ **Enumerate the flat refs individually.** `Ex Q.2` is a PREFIX of `Ex Q.23`, so a
single `"Ex Q."` or `"Ex Q.2"` routes Q.23 into the wrong block.

```
npx tsx scripts/stateboard/backfill-sections.ts <chapterId>          # dry run
npx tsx scripts/stateboard/backfill-sections.ts <chapterId> --apply
```
The dry run prints the reconstructed outline and flags any ref matching no block.
The counts must reconcile to your committed total.

## 6. Blind MCQ re-derivation

```
npx tsx scripts/stateboard/dump-mcq.ts <chapterId>
```
Solve all five from `<chapterId>.mcq-blind.json` **without looking at your own answers**
— it omits the key deliberately. Write `<chapterId>.mcq-verify.json`
(`{id, ref, derived_answer, solution}`). Then:
```
npx tsx scripts/stateboard/mark-mcq-verify.ts <chapterId> --write
```
It stamps agreement — **you must not self-report it**. A mismatch is a LOUD finding:
report it, adjudicate against the printed page, do not silently re-key.

**This book prints no MCQ key anywhere**, so there is nothing to conform to.

⚠ **Call this what it is: a SECOND DERIVATION, not a blind pass.** You derived these
answers at transcription time and cannot unsee that, so re-deriving them yourself
tests your ARITHMETIC independently but not your READING of the question. Say so in
your report rather than claiming a blind check — the Ch.9 agent did, and it was right
to. A genuinely blind pass is run separately by the maintainer at the end of the lane.

What you CAN establish independently, and should: that each numeric MCQ resolves to
exactly ONE option, by testing the other three and showing they fail. That is real
discrimination rather than a coincidence, and it does not depend on your memory.

## 7. Author the exercise solutions

```
npx tsx scripts/stateboard/dump-subjective.ts <chapterId>
```
Write `<chapterId>.<group>.solutions.json` (`{id, ref, solution}`) for every row, then:
```
npx tsx scripts/stateboard/apply-solutions.ts <chapterId> --apply
```

- **Compute the arithmetic**, do not estimate it. Write a Python script with the Write
  tool — never a shell heredoc, which eats backslashes.
- **The `id` MUST come from the dump row with the matching `ref`.** Diff the PAIRING
  before writing: a shifted pairing is a permutation, so the id SET and the count both
  still match while every solution lands on the wrong question, and nothing downstream
  catches it.
- **Units and direction** are the two commonest defects in this source. State the unit
  the question asks for, and for a *change* say whether it increases or decreases.
- **Use an approximation the stem supplies.** Several stems offer one (e.g. `g ≈ π² ≈ 10`);
  an answer computed with a different constant looks like a disagreement and is not.

## 8. ✅ GATE — cross-check against the book's inline answers

```
npx tsx scripts/stateboard/dump-book-answers.ts <chapterId>
```
For every row carrying a `book_answer`, decide AGREE / BOOK-KEY-WRONG /
OUR-ANSWER-WRONG / UNCLEAR. **Re-derive each from the STEM as a third ground truth** —
comparing our answer to the book's lets a shared error hide.

**The book key is a peer, not an oracle**, and equally: a disagreement is a hypothesis
until you have tested the book's reading. On Oscillations three rows were flagged and
one dissolved (the book had used `g = π²`, which that chapter states in another stem).

Report the KEYED count, never the chapter total — "0 wrong across 15 keyed rows" is a
different claim from "across 44".

For a genuine book error, add `{ref, bracket}` to `<chapterId>.errata.json` with a
`[Textbook answer-key error: …]` or `[Textbook misprint: …]` bracket, then:
```
npx tsx scripts/stateboard/apply-errata.ts <chapterId> --apply
```
⚠ **Errata is the LAST write.** Never run `apply-solutions` after it. Verify by
COUNTING brackets in the DB afterwards, not by trusting the log.

If you are forced to re-run `apply-solutions` after errata (e.g. to reword a solution
that trips `audit:keys`), COUNT the brackets in the DB immediately afterwards and say
what you found. `apply-errata` is idempotent, so re-running it restores anything lost.

`apply-errata` mirrors each bracket back into its source fragment and now **WARNS
LOUDLY** if a bracket mirrors nowhere. If you see that warning, the bracket exists only
in the database and the next re-commit will revert it — report it, do not ignore it.

A **solved example** whose printed working contradicts its own stem gets its working
CORRECTED plus a bracket (a shipped solved example must not teach an error). One that
merely prints a defect the answer does not depend on is PRESERVED plus a bracket.

## 9. Figures and diagrams

**Question figures** — a stem that cannot be answered without a figure. Physics figures
are VECTOR art, so crop the rendered page; `get_images` returns nothing useful.
Write `<chapterId>.<name>.anchors.json` (`{ref, page, col:[x0,x1], top, bottom, answerY}`,
all FRACTIONAL 0-1) plus `<chapterId>.<name>.imgfig.json` (`{ref, page, bbox}`), then:
```
npx tsx scripts/stateboard/snap-crop.ts <chapterId> --write
npx tsx scripts/stateboard/attach-images.ts <chapterId>            # dry run: LOOK at the crop
npx tsx scripts/stateboard/attach-images.ts <chapterId> --apply
```
**Eyeball every crop.** snapCrop bounds the ink; it cannot tell you the bbox contained
the wrong thing.

Two snapCrop lessons from Ch.9: a **grey example-box border is ink at every y**, so a
column band that includes it can never find whitespace and every anchor flags — pull
the band inside the border. And a flag is not always real: where the gap between the
text above and the figure's first label is genuinely sub-pixel, snapCrop flags a crop
that the visual review shows is clean. **The image decides, not the flag** — in either
direction.

⚠ **If you attach a figure, the stem must NOT also describe it in prose.** On
Oscillations a prose description of a graph survived alongside the figure and gave away
the answer the question existed to test. Attach the figure OR describe it, never both.

**Solution diagrams** — build one where the ANSWER IS A DRAWING ("draw the graph of…",
"draw the circuit"). Not where a picture would merely be nice. Write
`<chapterId>.diagram-specs.json` (see `oscillations-12-phy.diagram-specs.json` for a
worked example — six curves in labelled lanes), then:
```
python scripts/stateboard/render_solution_diagrams.py <chapterId>
npx tsx scripts/stateboard/attach-solution-image.ts <chapterId> --apply
```
- **LOOK at the PNG.** The first Oscillations render had labels struck through by their
  own axis lines, blue axes (an unknown colour name falls back to BLUE silently), and a
  clipped curve — none of it visible from the spec.
- **A label drawn ON a line is struck through by it.** Offset it.
- **Audit the geometry from the spec data**, with a few lines of Python. A drawn curve
  claimed to be a derivative must actually be one.
- Available: `curves` (y=f(x)), `segments` (finite), `lines` (infinite, clipped),
  `conics`, `polys`, `shade`, `points` (draws a MARKER), `texts` (bare label, no marker),
  `rightangles`, `axes`, `equal_aspect`. Colours: blue, red, green, purple, gray/grey, black.

## 10. Provenance + publish

```
npx tsx scripts/stateboard/stamp-provenance.ts <chapterId> --apply
npx tsx scripts/stateboard/flip-public.ts <chapterId> --with-mcq --apply
```
`stamp-provenance` writes `derived_model`/`derived_at` on rows that are OURS
(everything except `solved`, which carries the book's own solution) and resets
`pyq_note` to the source note. `flip-public` REFUSES if any authored row is unstamped.

## 11. Verify, then report

Run all four and paste the numbers:
```
npm run audit:text -- StateBoard_12_Physics__<YourChapter>
npm run audit:keys -- StateBoard_12_Physics__<YourChapter>
npm run audit:omml -- StateBoard_12_Physics__<YourChapter>
npm run board:lint
```
Plus a SQL check that, for your `source_file`: every row is PUBLIC, none lacks a
`solution`, none lacks `section_seq`, none lacks a chapter or subtopic, and the bracket
count matches your errata file.

**Do NOT run `npm test`, `npm run build`, or any git command.** The maintainer owns those.

---

## Standing rules

- **Faithfulness beats tidiness.** Transcribe what is printed. If a stem looks wrong,
  transcribe it and REPORT it — do not silently repair it, and do not solve the
  "intended" question instead.
- **Report on territory you do not own.** If a block straddles your band boundary, say
  so. A duplicate ref announces itself (`merge.ts` throws); a GAP does not.
- **A probe that reports a finding may be measuring the wrong thing.** Before reporting
  a defect, check your probe. Three real instances on this lane, all false findings:
  a `LIKE '%\n%'` check matched the letter *n* (Postgres treats `\` as an escape);
  a heredoc-authored regex was corrupted before it ever ran; and a
  `includes("\\n")` scan for a literal backslash-n **matched `\nu` inside
  `h\nu = E_m - E_n`** and flagged five perfectly good rows.
  The authoritative test for that last one is `normalizeNewlines(v) !== v` — the exact
  check `commitStaged` uses — not a hand-rolled regex, so the guard can never disagree
  with the normaliser. If you build a checker, feed it a deliberately broken input
  FIRST and confirm it goes red; a check that has never failed proves nothing. And when
  you repair a checker, make sure you changed the TEST and not just its label.
- **Never author LaTeX through a shell heredoc or `python -c`.** Use the Write tool.
- **Do not overstate confidence.** Say what you verified and what you did not. "I could
  not settle this" is a result; a confident guess is not.
