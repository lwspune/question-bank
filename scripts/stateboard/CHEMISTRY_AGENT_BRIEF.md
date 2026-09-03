# Chemistry chapter ingestion — the full-pipeline agent contract

You own **ONE chapter, end to end**: render → transcribe → commit → author → verify →
publish. Work to this brief, not to memory of how another pipeline works.

**Both volumes use this one brief.** Which pipeline directory you run depends on your
chapter:

| | Std XI | Std XII |
|---|---|---|
| scripts dir | `scripts/mh-sb-11/` | `scripts/stateboard/` |
| exam | Maharashtra State Board Class 11 | Maharashtra HSC Class 12 |
| exercise item labels | **UPPERCASE `A. B. C.`** (all 16 ch) | **roman `i. ii. iii.`** (13 of 16) |

Everything else is identical. Run every command from the repo root.

---

## 0. What is already done for you

Your chapter is **registered in `config.ts`** with `chapterName`, `subjectName:
"Chemistry"`, `sourceFile`, `pdf`, `derivedAnswers: true`, a canonical `subtopics[]`
list, and a comment carrying the MEASURED structural map — page count, the page the
exercise opens on, where each worked example sits, and how many exercise items print
an inline answer.

**Do NOT edit `config.ts` or any other shared file except `sections.ts`.** If something
in your entry is wrong, **report it** — do not fix it.

The subtopic list is deliberately generous. A subtopic row is created only when a
question references it, so use the ones that fit and leave the rest. **Never invent a
subtopic name** — an unknown name is a hard commit error, by design.

---

## 1. THE NOTATION RULES — read these before you transcribe a single row

This is a chemistry book and **the text layer cannot represent chemistry.** Measured
across both volumes: **subscripts occur ZERO times, superscripts ZERO, charge signs
ZERO.** Reaction arrows: 34 in the whole Std XI volume, 5 in Std XII.

So the extractor gives you `H2SO4` for H₂SO₄, drops the charge from SO₄²⁻ entirely,
and turns `6.022 × 10²⁰` into **`6.022 x 1020`** — a well-formed, plausible, and
completely different number. In organic chapters a reaction scheme extracts as a bag of
disconnected fragments (`NH2 / NO2 / Conc. HNO3 / 288 K`) with no structure, no arrows
and no order.

**Transcribe from the RENDERED PAGE IMAGES. `dump-text.ts` is for locating block
boundaries only.** Never copy a formula or a number out of the text layer.

### What to write

Every one of these was **tested through both the KaTeX (web) and the temml→OMML (Word)
renderers** and passes both:

| thing | write |
|---|---|
| formula | `\(\mathrm{H_2SO_4}\)` |
| polyatomic ion | `\(\mathrm{SO_4^{2-}}\)`, `\(\mathrm{Na^+}\)` |
| the book's circled charge | `\(\mathrm{NH_3^{\oplus}}\)` |
| state symbol | `\(\mathrm{NaCl(aq)}\)` |
| scientific notation | `\(6.022 \times 10^{23}\)` — **never** `6.022 x 1023` |
| degrees | `\(25^\circ\mathrm{C}\)` |
| arrow | `\(\longrightarrow\)` |
| equilibrium | `\(\rightleftharpoons\)` |
| labelled arrow | `\(\xrightarrow{\text{conc. } \mathrm{H_2SO_4}}\)` or `\(\xrightarrow[\Delta]{\ldots}\)` |
| isotope | `\(^{14}_{6}\mathrm{C}\)` |
| concentration | `\([\mathrm{H^+}] = 10^{-7}\)` |
| units | `\(8.314\ \mathrm{J\ K^{-1}\ mol^{-1}}\)` |

### What NOT to write

- **`\ce{...}` — mhchem is NOT loaded in this project.** It fails outright on the web.
  Measured, not assumed. Never use it, however natural it looks for chemistry.
- **`\sideset`** — also fails on the web.
- Prefer plain spacing over `\,` and `\!`; they emit a temml warning and buy nothing.

⚠ **`audit:omml` CANNOT catch a KaTeX-invalid zone.** It reported "ok" for both
`\ce{}` and `\sideset`. The two checks are complementary and neither alone is
sufficient — run `npm run audit:katex` as well.

### Structures and schemes

Write it as text **if it can be written linearly and unambiguously**
(`\(\mathrm{CH_3-CH_2-OH}\)`, `\(\mathrm{CH_3COOH}\)`). If it needs 2-D layout — a
ring, a mechanism, a multi-step scheme with reagents over arrows — **crop it as a
figure** (§8). Do not attempt ASCII art, and do not flatten a ring structure into a
line formula that loses information.

---

## 2. Plan your bands from the BLOCK map, not the page map

Build a `(page, y)` map with `page.get_text("blocks")` and locate: every `Problem N.M`,
every `Solution :`, the exercise banner, and the numbered blocks inside it.

**A page boundary is not a block boundary.** Cut bands at BLOCK boundaries.

**Reconcile the `Problem` and `Solution` counts** — they very often disagree.
**Treat the `Problem N.M` count as PRIMARY**, establish the real number from the PAGE,
and say what caused any gap. A missing worked example is invisible to every gate.

⚠ **A LABEL SCAN RETURNING ZERO — OR A GAP IN THE NUMBERING — IS A HYPOTHESIS, NOT A
FINDING.** This book writes its worked-example label at least SEVEN different ways, and
every one below was found live in this lane by an agent who went to the page:

| printed | breaks a `Problem N.M` scan because | seen in |
|---|---|---|
| `Problem : 13.1 :` | colon BEFORE the number | XI Ch.13, Ch.10, XII Ch.7 |
| `Problems 9.2` | PLURAL, no colon | XI Ch.9 |
| `Example 4.13` / `Examples 4.12` | different WORD entirely | XII Ch.4 (hid four) |
| `Promblem 8.8` | the book MISSPELLS it | XI Ch.8 |
| label split across three text-layer lines | `Problem` / `8.6` / `:` | XI Ch.8 |
| no label at all | working starts straight in | XI Ch.1 (1.4), XI Ch.6 (6.4) |
| genuinely skipped | the publisher really did skip it | XII Ch.6 (no 6.11) |

Only the last is a real gap, and only reading the page distinguishes it from the other
six. `Solution` labels vary too — `Solution :`, `Solution -`, and bare `Solution`.

⚠ **The `Solution` count is a WEAK cross-check in this subject**, because "solution" is
a chemical term. Measured on Electrochemistry: **139 bare `Solution` hits against 12
real labels — 11.6× noise.**

⚠ **Do NOT trust your config comment's block list or item ranges.** Measured misses so
far: Redox names 3 blocks and the book prints 5; p-Block names 9 and prints 18;
Thermodynamics says block 4 is (i)–(xiv) and it runs to (xx); Kinetics says block 3 is
(i)–(x) and it runs to (xvii). **Build your own block map from the page and report
anything the config missed.** Seven questions vanish silently otherwise.

---

## 3. Transcribe

One file per band: `<scriptsDir>/data/<chapterId>.<band>.json`. Rows carry
`{ref, bucket, stem, options?, answer?, subtopic, context?, solution?, bookAnswer?}`.

### Refs

| block | bucket | Std XI ref | Std XII ref |
|---|---|---|---|
| worked example | `solved` | `Solved Ex.<N.M>` | `Solved Ex.<N.M>` |
| `1. Choose the most correct option` | `exercise-mcq` | `Ex Q.1 (A)` | `Ex Q.1 (i)` |
| later numbered blocks | `exercise-subjective` | `Ex Q.2 (A)` … | `Ex Q.2 (i)` … |

A numbered block whose items share one instruction is a **SET**: put the instruction in
`context` and give the siblings a common `setLabel` (`Ex Q.1`, `Ex Q.2`).

⚠ **Anything a question depends on must go in `context` BEFORE commit** — a constants
list, atomic masses supplied at the head of a numerical block, a shared table. `context`
is part of `subjectiveContentHash`, so adding it later changes the row's identity and
forces a delete-and-re-commit. A row referencing data it does not carry is
under-determined for a student on `/browse`, who sees that one question alone.

### `bookAnswer` — the gate, and it is printed FIVE ways

Where the book prints an answer inline, put it VERBATIM in `bookAnswer`. This field is
deliberately **never written to the database** (`buildRecords` ignores it) — that is
what keeps the authoring pass blind and makes the later cross-check mean something.

All five forms are live in this book:

```
(Ans. : 1:1)      (Ans : 6.022 x 10^20)      (Ans.: 249.5 g/mol)
Ans. : -873.4 J          ← no brackets at all
(28.7 min)               ← BARE PARENTHESIS, no "Ans" token whatsoever
```

That last form is why a scan for `[Ans` returns **zero for the entire book**. Do not
trust a text scan to find these — read the page.

⚠ An `Ans :` printed inside the SOLVED-EXAMPLE region belongs to that worked example,
not to the exercise. Do not let it inflate your keyed count.

---

## 4. Merge + commit

```
npx tsx <scriptsDir>/merge.ts <chapterId>
npx tsx <scriptsDir>/commit.ts <chapterId>            # dry run
npx tsx <scriptsDir>/commit.ts <chapterId> --apply
```

**Before `--apply`, diff the printed `by subtopic` tally against your config list and
say which subtopics got ZERO.** These chapters teach more than they examine, so an
unused subtopic is expected — report it, do not edit config.

`merge.ts` refuses any file that is not a question fragment. If it refuses one of yours,
fix the file, never the guard.

---

## 5. Sections (`/board`)

**Write your outline to `<scriptsDir>/data/<chapterId>.sections.json` — a JSON array,
same shape as a `SECTIONS` entry. Do NOT edit `sections.ts`.**

```json
[
  { "group": "1. Some Basic Concepts — worked examples", "label": "Solved Examples",
    "kind": "solved_example", "refPrefixes": ["Solved Ex.1."] },
  { "group": "Exercise", "label": "Choose the most correct option",
    "kind": "exercise", "refPrefixes": ["Ex Q.1 ("] }
]
```

`sections.ts` is ONE SHARED FILE and this lane runs many chapter agents at once. Two
agents appending to it is a read-modify-write race, and it fails **quietly** — the
losing outline simply vanishes, those rows commit unsectioned, and nothing says so
until `board:lint` runs at the very end, long after the work. Your own file touches no
shared state. A malformed file fails CLOSED (loud error), never as an empty outline.

⚠ **Enumerate flat refs individually.** `Ex Q.2` is a prefix of `Ex Q.23`.

```
npx tsx <scriptsDir>/backfill-sections.ts <chapterId>          # dry run
npx tsx <scriptsDir>/backfill-sections.ts <chapterId> --apply
```

---

## 6. MCQ re-derivation

```
npx tsx <scriptsDir>/dump-mcq.ts <chapterId>
```
Solve them from the dump, then write `<chapterId>.mcq-verify.json`
(`{id, ref, derived_answer, solution}`) and run `mark-mcq-verify.ts <chapterId> --write`.
It stamps agreement — **you must not self-report it.**

**This book prints no MCQ key anywhere**, so there is nothing to conform to and a
mismatch is a LOUD finding: report it, adjudicate against the printed page, never
silently re-key.

⚠ **Call this a SECOND DERIVATION, not a blind pass.** You derived these at
transcription time and cannot unsee that. What you CAN establish independently, and
should: that each MCQ resolves to exactly ONE option, by testing the other three and
showing they fail.

The `solution` you write here is **published verbatim** — it must be a real
justification, not a one-liner, and must not end on a bare option letter.

---

## 7. Author the exercise solutions

```
npx tsx <scriptsDir>/dump-subjective.ts <chapterId>
```
Write `<chapterId>.<group>.solutions.json` (`{id, ref, solution}`) for EVERY row, then
`apply-solutions.ts <chapterId> --apply`.

- **The `id` MUST come from the dump row with the matching `ref`.** Diff the PAIRING
  before writing: a shifted pairing is a permutation, so the id set and the count both
  still match while every solution lands on the wrong question.
- **Ground every answer in THIS chapter's own text.** For ~86% of rows in this lane
  there is no printed answer of any kind, so the only thing standing between a correct
  answer and a fluent invention is that discipline. If the chapter does not support an
  answer, **say so in the answer** rather than supplying a remembered fact. "The chapter
  does not state this" is a legitimate result.
- **Compute arithmetic, never estimate it.** Write a Python script with the Write tool —
  **never a shell heredoc or `python -c`**, which eat backslashes.
- **State the unit**, and for a change say whether it increases or decreases.

---

## 8. ✅ GATE — cross-check against the book's inline answers

```
npx tsx <scriptsDir>/dump-book-answers.ts <chapterId>
```
For every row carrying a `book_answer`, decide AGREE / BOOK-KEY-WRONG /
OUR-ANSWER-WRONG / UNCLEAR. **Re-derive each from the STEM as a third ground truth** —
comparing our answer to the book's lets a shared error hide.

**The book key is a peer, not an oracle**, and equally, a disagreement is a hypothesis
until you have tested the book's reading.

**Report the KEYED count, never the chapter total.** "0 wrong across 17 keyed rows" is
a different claim from "across 50". If your chapter has zero keyed rows, say plainly
that the gate could not run.

Genuine book errors → `{ref, bracket}` in `<chapterId>.errata.json`, bracket starting
`[Textbook answer-key error: …]` / `[Textbook misprint: …]` / `[Textbook note (not an
error): …]`, then `apply-errata.ts <chapterId> --apply`.

⚠ **Errata is the LAST write.** Never run `apply-solutions` after it. Verify by COUNTING
brackets in the DB afterwards, not by trusting the log. `apply-errata` is idempotent.

A **worked example** whose printed working contradicts its own stem gets its working
CORRECTED plus a bracket via `<chapterId>.solved-fixes.json` (a shipped worked example
must not teach an error). One that merely prints a defect the answer does not depend on
is PRESERVED plus a bracket.

---

## 9. Figures

A stem that cannot be answered without a figure needs one, and so does an answer that
IS a drawing (a structure, a mechanism). Chemistry figures are **vector art** —
`get_images` returns nothing useful, so crop the rendered page.

**Expect FEW figures, even in scheme-heavy organic chapters — this is measured.** The
Amines pilot (28 exercise rows of preparations, conversions and mechanisms) needed
exactly **2 figures in 40 rows (5%)**: one question figure whose parts existed only as
ring drawings, and one solution scheme. Everything else went into linear LaTeX, because
`\xrightarrow[below]{above}` carries a reaction step losslessly and named intermediates
carry the rest. **Reach for a figure only when the content genuinely needs 2-D layout**,
not because the chapter is organic.

But budget TIME for the ones you do take: those 2 figures cost ~20% of that agent's
tool calls, roughly 4× their share of the rows, and both crops needed re-measuring.
The expensive case is a scheme with sub-point gaps — one had **1.2 pt of clearance
above and 0.3 pt below**, far too tight to eyeball, and was only cut correctly by
pixel-measuring ink extents with `get_drawings()`. A first attempt leaked a caption
word and clipped an arrowhead.

```
npx tsx <scriptsDir>/snap-crop.ts <chapterId> --write
npx tsx <scriptsDir>/attach-images.ts <chapterId>            # dry run — LOOK at the crop
npx tsx <scriptsDir>/attach-images.ts <chapterId> --apply
```

**Eyeball every crop.** snapCrop bounds the ink; it cannot tell you the bbox contained
the wrong thing.

⚠ **If you attach a figure, the stem must NOT also describe it in prose** — on the
Physics lane a prose description survived alongside the figure and gave away the answer
the question existed to test. Attach the figure OR describe it, never both.

---

## 10. Provenance + publish — **STOP. This is the maintainer's.**

Do **not** run `stamp-provenance.ts` or `flip-public.ts`. Do **not** run `npm test`,
`npm run build`, or any git command. Leave your rows PRIVATE and report.

---

## 11. Verify, then report

```
npm run audit:text -- <yourSourceFilePrefix>
npm run audit:keys -- <yourSourceFilePrefix>
npm run audit:omml -- <yourSourceFilePrefix>
npm run board:lint
```
Plus SQL for your `source_file`: row count, how many lack a `solution`, lack
`section_seq`, lack a chapter or subtopic, and the bracket count vs your errata file.

⚠ **TWO OF THESE CANNOT SEE YOUR WORK, because your rows are PRIVATE until the
maintainer publishes them.** `npm run audit:katex` scans PUBLIC rows only — do not
run it and do not report it; it will show pre-existing findings from other sources
and say nothing about your chapter. **`board:lint` reports errors on PUBLIC rows
only too**, so a green run is not evidence your sections are right.

Close both gaps yourself rather than claiming coverage you do not have:

- **Render check** — read all your rows back from the DB and run the project's own
  renderers (`parseLatex` + `katex` with `throwOnError`, and `findOmmlFailures`)
  over every `text`, `context`, `solution` **and option text**. Report the field
  count and assert zero KaTeX-broken, zero unbalanced `\(`/`\)`, zero
  trailing-backslash zones. Prove the checker fires first with a broken fixture.
- **Section invariants** — assert by SQL instead: no row has a null
  `section_kind`/`group`/`label`/`seq`, and `section_seq` is contiguous 1..N with
  the per-block counts summing to your committed total.

⚠ **`Type not supported: mpadded` during `audit:omml` is KNOWN AND HARMLESS — do
not investigate it.** It is a `console.warn` from `mathml2omml` about an element it
skips, it produces **zero conversion failures**, and it is pre-existing bank-wide
(a shipped Std-XI Physics chapter emits it; a Std-XII Maths chapter does not). It
appears to track `\mathrm{}` usage, which this lane uses constantly. Two separate
agents have now burned time trying to isolate it and neither could reproduce the
trigger outside the corpus run. `0 failing zones` is the result that matters.

---

## Standing rules

- **Faithfulness beats tidiness.** Transcribe what is printed. If a stem looks wrong,
  transcribe it and REPORT it — do not silently repair it, and do not solve the
  "intended" question instead.
- **Report on territory you do not own.** If a block straddles a band boundary, say so.
  A duplicate ref announces itself (`merge.ts` throws); a GAP does not.
- **A probe reporting a finding may be measuring the wrong thing.** Before reporting a
  defect, check your probe: feed it a deliberately broken input first and confirm it
  goes red. A check that has never failed proves nothing. Real false findings on this
  project: a `LIKE '%\n%'` matched the letter *n*; a heredoc-authored regex was
  corrupted before it ran; and a scan for literal `\n` matched `\nu` inside `h\nu`.
  I hit the heredoc one again while writing this brief — it is not hypothetical.
- **Never author LaTeX through a shell heredoc or `python -c`.** Use the Write tool.
- **Do not overstate confidence.** Say what you verified and what you did not. "I could
  not settle this" is a result; a confident guess is not.
