# NDA GAT (Paper II) — transcription brief

You are transcribing one band of pages from the **NDA II 2026 General Ability
Test**, Series **A**, into the question bank. This is the paper's source of
record: what you write is what students will read.

## The one rule that overrides everything

**You transcribe. You do NOT answer.**

There is no answer field in your output and you must not add one. Do not go
looking for an answer key, and do not let a hunch about the answer influence how
you read an option. A separate blind pass derives every answer later, and its
independence is the only reason a later disagreement with a real key means
anything.

If a prompt you were given contradicts this file, **this file wins** — say so in
your report rather than resolving it silently.

## THE DEFECT THAT MATTERS MOST

**Read the four options LABEL BY LABEL, off the page, for every question.**

The stored answer is a LETTER. If the correct option's text lands in the wrong
letter's slot, every downstream check still passes — the question reads
perfectly, the four options are all present and distinct, and a blind derivation
finds the right fact at the wrong label and confirms it. **Nothing catches it.**

That is not hypothetical. On the sibling CDS English corpus in this repo it
produced **19 wrong keys**, and a full blind re-derivation pass returned
`confirmed` on all 89 rows it saw — one of which was later disproved from the
printed page.

So:
- Never copy an option block from a neighbouring question because it "looks the
  same". Several questions in this paper genuinely share an option set
  (`I only / II only / Both I and II / Neither I nor II` recurs dozens of times),
  which is exactly when copying is both tempting and wrong.
- Printed `(a) (b) (c) (d)` become labels `A B C D`, **positionally**.
- If you cannot read an option even at high zoom, **say so explicitly for that
  label** rather than guessing. A reported gap is cheap; a wrong option is not.

## Student pen marks are NOT answers

Both booklets of this paper were sat by a candidate. Options are **circled**,
ticks and arrows are pencilled in margins, and some pages carry scribbled
working. **This is a candidate's guesswork, not a key.** Ignore it completely:
do not record it, do not let it influence your reading of an option, and do not
mention it as though it were evidence. It is also frequently wrong.

## What the paper is

150 questions, two parts, and the boundary is printed on the page:

| | Questions | Printed pages | Subject |
|---|---|---|---|
| **PART — A** | 1–50 | 2–7 | `English` only |
| **PART — B** | 51–150 | 9–47 (odd) | the eight General Knowledge subjects |

A question numbered ≤ 50 is **always** `English`. A question numbered ≥ 51 is
**never** `English`. A gate enforces exactly this, because `/mock` rebuilds the
paper as two sections with hard counts of 50 and 100 — a mis-filed subject does
not just land in the wrong filter, it breaks the mock with an error that names
neither the question nor the cause.

## Your pages

Images are `scripts/nda-gat/out/2026-2/p<PRINTED>.png` — **named by the page
number printed in the booklet's own footer**, not by a PDF index.

**Read the footer of every page you are given and record it.** It reads
`( 23 - A )` at the foot centre, with `TFDD-B-AGT` at the foot left. Two things
it proves:

- The page is the one you think it is.
- **The series is A.** If a footer reads `- D )`, you have been handed the wrong
  booklet — stop and report it, do not transcribe it.

That check is not paperwork. On the sibling Mathematics job it is what caught a
page list derived from a parity that held only at the FRONT of a booklet, after
three agents had been silently handed Devanagari.

## These are PHOTOGRAPHS of a booklet, not flatbed scans

- **Warp and skew** — the page curves toward the binding; lines are not straight.
- **A diagonal red watermark** (`centuriondefenceacademy.com`) crosses the middle
  of every page. Text under it is readable but degraded.
- **Defocus near the binding.** Some inner-column regions are genuinely soft —
  one option block on printed page 11 is barely legible at any zoom.
- **A sliver of the FACING page** appears at one edge: the crop deliberately
  overlaps the fold by 3% so the inner column is never clipped. Those fragments
  belong to the neighbouring page — ignore them, and do not treat a
  half-visible question there as missing from your band.
- **Uneven lighting, shadow, and sometimes a thumb** at the page edge.

**Where a character is ambiguous, crop that region from the source PDF at 6–10×
and look again** rather than guessing. The whole-page render is at a fixed
target width; a targeted crop is the tool for one doubtful glyph.

## Formatting rules

These are enforced. Each was earned from a real defect.

### 1. Exactly FOUR options

Labelled A, B, C, D. Always. There is no 3-option or 5-option GAT question. A
question that does not yield four distinct non-empty options is a **parse
failure** — report it by number. Never invent a fourth option to reach the
count, and never emit three.

### 2. Underlines are load-bearing — use the bank convention

Many Part A questions turn entirely on which word is underlined ("identify which
word class the underlined word belongs to"). The underline is ink on a
photograph; there is no text layer to lose it, so **read it off the page** and
write it as:

```
He gave \(\underline{\text{both}}\) candidates an equal opportunity.
```

Italic-and-underlined uses `\(\underline{\textit{word}}\)`. A stem that names no
target because the underline was dropped is unanswerable as stored.

### 3. A `Directions:` block is `context`, repeated on every member

Part A is built from `Directions (for the next 05 items that follow) :` blocks
over several questions, and a few Part B questions share one too. Put the
Directions text in `context`, **identical on every member**, and give the set a
`setLabel`. Follow the bank's existing wording, which states the range:

```
"context": "Directions (Q. Nos. 21 to 25): Given below are some idioms/phrases followed by four alternatives to each. Select the most appropriate alternative which provides the correct meaning of the idiom/phrase and mark your response on the Answer Sheet accordingly.",
"setLabel": "2026-2-S21"
```

Set members must be **contiguous** in question number — a gate refuses otherwise,
because both the web renderer and the Word exporter group a set by adjacency and
a split set prints its stimulus twice.

### 4. A two-column pair list is a GFM pipe table

`Match List I with List II`, `Read the following pairs`, `Active Voice / Passive
Voice`, `Group of words / One-word substitution`, `Chemical Reaction / Type` —
all of these. A **header row AND a `|---|---|` separator row are both
mandatory**; without the separator the renderer prints literal pipes.

```
Match List I with List II and select the correct answer using the code given below.

| List I | List II |
|---|---|
| A. Solder | 1. Lead and tin |
| B. Brass | 2. Copper and zinc |
```

**Detect the SHAPE, not the words.** Many of these never say "List I" — a bare
column-header pair followed by numbered rows is the same thing. And **convert it
here, in the transcription**: the column boundary lives in the printed layout,
and once it is flattened to prose `Nichrome High resistance to electricity` is
irreducibly ambiguous. If you are not confident of a split, emit the block
unconverted and report the question number — a wrong column boundary reads as
authoritative and is worse than a flat stem.

### 5. Statement lists and rearrangement parts go on their OWN lines

`I.` `II.` `III.` each start a new line; the lead-in is its own line; the
trailing "Which of the statements given above is/are correct?" is its own line.
Same for `P.` `Q.` `R.` `S.` in a sentence-rearrangement question. Ordinary prose
that merely wraps on the page is NOT a line break — collapse that.

### 6. Transcribe what is printed

If the page has a misprint, transcribe it as printed and note it. Do not repair
it. The blind derivation pass solves what is printed, and a helpfully corrected
stem makes its answer disagree with the real paper.

### 7. Figures

**Measured: this paper appears to have none** — all 26 English pages were swept
and every candidate turned out to be a LaTeX radical or a pipe table, not a
diagram. Do not design for figures. But if you find one, set `hasFigure: true`
and describe it in `figureNote` for the crop operator — **never fold the
description into the stem**, because on a diagram question the figure IS the
question and a prose description hands over the step being tested.

### 8. Mathematical notation

Physics and Chemistry questions carry real notation. Use inline `\(...\)`:
`\(\frac{1}{4\pi\varepsilon_0}\)`, `\(5386\ \text{Å}\)`, `\(\text{NC}^{-1}\)`.
Delimiters must balance — a gate runs every math zone through the project's own
KaTeX and fails on the first one that does not render.

## Taxonomy — subject, chapter, subtopic

Every question carries all three, and they are **hard-validated against
`scripts/nda-gat/catalog.json`**, which is generated from the live bank (9
subjects, 67 chapters, 279 subtopics). An unlisted name is an ERROR, not a
warning.

That is deliberate: `commitStaged` refuses an unknown subject but **auto-creates**
an unknown chapter or subtopic. Writing "Modern India " with a trailing space, or
"Cell Biology and Genetics" where the bank says "Cell Biology", mints a second
chapter beside the real one and splits its questions from their siblings, with no
error anywhere.

- **Read the catalog. Copy names from it character for character.**
- A chapter belongs to ONE subject — look it up under the subject you chose.
- If nothing in the catalog fits, **use the closest fit and flag it** in
  `flags` and in your report. Do not invent a name. A genuinely new subtopic is
  a deliberate taxonomy decision (a September 2026 Current Affairs paper is the
  likeliest source of one), made against the bank first.
- `difficulty` is one of `EASY`, `MODERATE`, `HARD`.

## Output

Write exactly one file: `scripts/nda-gat/data/2026-2.b<N>.json`.

**Write it early and update it as you go.** Do not batch the whole band to the
end — if you are interrupted, everything already written survives.

```json
{
  "band": "b3",
  "bandReport": {
    "printedPages": [13, 15, 17],
    "numbersFound": [61, 62, "..."],
    "firstComplete": true,
    "lastComplete": false,
    "notes": "Q70's options continue on printed 17 and are owned by b4."
  },
  "questions": [
    {
      "number": 63,
      "stem": "Two conducting wires made of the same material have lengths L and 1·2 L. ...",
      "options": [
        { "label": "A", "text": "1 : 1" },
        { "label": "B", "text": "3 : 1" },
        { "label": "C", "text": "1 : 3" },
        { "label": "D", "text": "1 : 2" }
      ],
      "subject": "Physics",
      "chapter": "Electricity and Magnetism",
      "subtopic": "Resistance and Resistivity",
      "difficulty": "MODERATE"
    }
  ]
}
```

Add `"context"` + `"setLabel"` on a set member, `"flags": ["..."]` for anything
you want a human to look at.

## Coverage and seams

Open the page **before** your first and the page **after** your last. Do not
transcribe them — but **report on what you see there**. A question that straddles
a seam and that NOBODY owns is invisible to every downstream check except the
final 1..150 reconciliation, and that one cannot tell you where it went.

An overlap between two bands is fine and expected; a **disagreement** between two
bands about the same question is a finding to resolve against the page, and the
merge refuses it rather than picking one.

## Practical

- **Author files with the Write/Edit tools, never a shell heredoc.** Heredocs eat
  backslashes in this environment, which silently corrupts `\(`, `\underline`
  and `\frac`. The corruption is selective, so a spot check lands on a good line.
- The same trap ruins PROBES. **When a probe and the data disagree, suspect the
  probe first** — and give any probe you write a control that must go red.
- Give scratch files a unique name including your band; several agents share one
  scratchpad and have overwritten each other's scripts.
- Do not run `git add` or any git command.

## When you finish

Report: the question numbers you transcribed, the printed page numbers you read
off the footers, any seam issue, any option you could not read, any taxonomy name
you had to force, any misprint you preserved, and anything on the page that
surprised you.
