# Transcription brief — MH HSC Class-12 Maths board papers

The contract every transcription pass works to. Read it in full before starting.

## What you are transcribing

One Maharashtra HSC Class-12 **Mathematics & Statistics** board question paper,
from rendered page images. The output is the bank's record of what was printed —
nothing downstream re-reads the paper, so a defect you introduce here is
permanent and invisible.

## The paper's shape — identical on every sitting

44 items, 112 printed marks against a Max of 80 (the gap is the optionality).

| section | refs | n | format | marks | choice |
|---|---|---|---|---|---|
| A | `Q. 1. (i)`–`(viii)` | 8 | **mcq** | 2 | all |
| A | `Q. 2. (i)`–`(iv)` | 4 | subjective | 1 | all |
| B | `Q. 3`–`Q. 14` | 12 | subjective | 2 | any 8 |
| C | `Q. 15`–`Q. 26` | 12 | subjective | 3 | any 8 |
| D | `Q. 27`–`Q. 34` | 8 | subjective | 4 | any 5 |

**Format follows from the ref.** Only Q.1's sub-items are MCQs. `verify.ts`
rejects any transcription that disagrees, so do not "correct" this from the page.

## Sources, and which one wins

1. **The rendered pages** `out/<id>/p-NN.png` — **ground truth for ALL
   mathematics.** Read every stem and every option off the image.
2. **The text scaffold** `out/<id>/text.md` — use for question numbering, section
   boundaries, marks brackets, reading order and pure-prose stems.

⚠ **THE TEXT LAYER IS LOSSY AND THE LOSS IS SILENT.** Every maths symbol is a
glyph image, not a character, so the layer renders

    The converse of contrapositive of  is _____.

for a question whose entire content is the missing `~p -> q`. The sentence still
reads as a sentence. Lines where content was dropped are marked `[math xN]`, and
`\u0001` escapes (written as six characters, not the byte) mark
glyphs with no Unicode mapping. **Never transcribe
mathematics from the scaffold.** Anything marked must be read off the PNG.

## Rules

- **Math in `\(...\)` delimiters. NEVER unicode maths symbols.** Not `∧ ∨ ∼ → ↔
  ≡ ∫ ∑ √ ∞ ≠ ± × ÷ ≤ ≥ α β θ π λ μ Δ ∈` — use `\land \vee \sim \rightarrow
  \longleftrightarrow \equiv \int \sum \sqrt \infty \neq \pm \times \div \leq
  \geq \alpha \beta \theta \pi \lambda \mu \Delta \in`. `verify.ts` rejects
  unicode maths in any field.
- **Transcribe AS PRINTED.** Do not silently repair a stem you believe is wrong,
  do not normalise notation, do not "fix" an option. If something looks
  defective, transcribe it faithfully and report it separately in your final
  message. A defective printed question is an expected outcome; a silently
  repaired one is unrecoverable, because nothing downstream re-reads the page.
- **An MCQ carries exactly four options, labelled A, B, C, D** — in the printed
  order, mapping (a)→A, (b)→B, (c)→C, (d)→D. Option fidelity is load-bearing: a
  mis-slotted option makes an independent key derivation confirm the WRONG
  letter, and the derivation will look sound.
- **NEVER supply an `answer`.** Keys are derived later by two independent passes,
  and `dump-blind.ts` refuses to build its input if any answer already exists.
  Supplying one here breaks the guarantee that the blind pass was blind.
- **NEVER supply a `solution`.** Authored separately.
- Vectors print with an overbar: write `\bar{r}`, `\bar{a}`. Unit vectors print
  with a hat: `\hat{i}`, `\hat{j}`, `\hat{k}`.
- Multi-line stems (a p.d.f. given piecewise, an LPP's constraint list) use real
  newlines. **Never a literal backslash-n** — the commit step rejects it.
- Tables are GFM pipe-tables and the `|---|---|` separator row is MANDATORY.

## Taxonomy — HARD-validated

Every question needs a `chapter` from exactly this list, spelled exactly:

```
Application of Definite Integration · Application of Derivatives ·
Binomial Distribution · Definite Integration · Differential Equations ·
Differentiation · Indefinite Integration · Line and Planes · Linear Programming ·
Mathematical Logic · Matrices · Pair of Straight Lines · Probability Distributions ·
Trigonometric Functions · Vectors
```

Note `Line and Planes`, not "Lines and Planes". An unknown chapter is a
transcription error, never a new chapter — auto-creating one would fork a
shipped chapter in two. `verify.ts` refuses, and names the near-match.

`subtopic` must come from that chapter's list in `catalog.ts`. Read it; do not
invent one.

`difficulty` is `EASY`, `MODERATE` or `HARD` — your judgement of the question as
a board candidate, not of how hard it is to transcribe.

## Figures

Switching circuits (Mathematical Logic) are the only figure genre in this corpus.
If a question **prints** a circuit, set `"hasFigure": true`. If it asks the
student to **construct** one, there is no printed figure — do not set the flag.
`verify.ts` cross-checks this against the manifest's `figureRefs` both ways.

## Output

`data/<id>.questions.json` — a JSON array of 44 objects, in paper order:

```json
{
  "ref": "Q. 1. (i)",
  "format": "mcq",
  "chapter": "Mathematical Logic",
  "subtopic": "Converse, Inverse and Contrapositive",
  "difficulty": "MODERATE",
  "stem": "The converse of contrapositive of \\(\\sim p \\rightarrow q\\) is _____.",
  "options": [
    { "label": "A", "text": "\\(q \\rightarrow p\\)" },
    { "label": "B", "text": "\\(\\sim q \\rightarrow p\\)" },
    { "label": "C", "text": "\\(p \\rightarrow \\sim q\\)" },
    { "label": "D", "text": "\\(\\sim q \\rightarrow \\sim p\\)" }
  ]
}
```

A LaTeX backslash is `\\` in JSON. Free-response objects carry no `options` key.

## Biology papers (`bio-*`, subject code 56; added 2026-10-13)

Everything above applies EXCEPT the Maths-specific parts (shape, ref spelling,
chapter list, figure genre). For Biology:

- **Shape** (the Physics shape, 47 items, 98 printed marks against a Max of 70):
  `Q. 1(i)`–`Q. 1(x)` MCQ 1 mark · `Q. 2(i)`–`Q. 2(viii)` very short answer,
  subjective, 1 mark · `Q. 3`–`Q. 14` 2 marks (any 8) · `Q. 15`–`Q. 26` 3 marks
  (any 8) · `Q. 27`–`Q. 31` 4 marks (any 3). **Ref spelling `Q. 1(iv)`, `Q. 27`.**
- **Sources:** the five PDFs are the board's own born-digital English prints, and
  the text layer is nearly lossless here (0-2% of lines lost anything). Take
  wording from `text.md`; take every diagram, table, chemical or genetic notation
  (`\(2n\)`, `\(X^cX\)`, crosses, ratios) from the PNG.
- **Chapters:** exactly one of the 15 Biology chapters in `catalog.ts`
  (`HSC_BIOLOGY_CATALOG`), spelled exactly, with a subtopic from that chapter's
  list. These are the Balbharati textbook's chapters and numbered sections; the
  book is dumped at `out/_books/12th_Biology_SB.txt` (`######## CHAPTER nn`
  headers) if you need to place a question.
- **Split only across chapters.** Section D (and some B/C) items have parts.
  Keep a question as ONE row with its `(a)`/`(b)`/`(i)`/`(ii)` parts inside the
  stem, unless its parts belong to DIFFERENT chapters; then give each part its
  own row, refs `Q. 27(i)`, `Q. 27(ii)`, in printed order, and list every split
  in your report (the manifest records the count).
- **Figures:** a question that PRINTS a diagram, graph, chart or picture it
  depends on gets `"hasFigure": true`, including an MCQ whose stem or options
  are a figure. "Draw a neat labelled diagram of ..." prints nothing: no flag.
  The manifest's `figureRefs` is EMPTY until your report fills it, so
  `verify.ts` will list `hasFigure set, but the manifest lists no figure`
  lines. **Those lines alone are expected; every OTHER verify error is yours to
  fix.** Name each flagged ref, its page and what the figure shows.
- **A diagram whose parts are labelled A, B, C** is described in the stem only as
  far as the print does in words ("Observe the diagram and label A and B");
  never write the answer into the stem.
- **No `answer`, no `solution`** (as above). Both come later from separate lanes.

## Before you finish

Run the structural gate and fix everything it reports:

```sh
npx tsx scripts/mh-hsc-12-pyq/paper/verify.ts <id>
```

It checks refs both ways (missing / duplicated / not on this paper), format
against section, option labels, chapter and subtopic, unicode maths, delimiter
balance, literal newlines and figure flags. **`structure OK` is the bar.**

It cannot tell you a stem was mis-copied. That is on you, and re-reading each
page once more against your output is the only check there is.
