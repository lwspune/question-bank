# Maths transcription brief — MH State Board Class 10, Geometry

The contract for VISION-transcribing a Balbharati **Mathematics** chapter in this
pipeline. The sibling `HUMANITIES_BRIEF.md` covers the prose books; this one
covers the maths books, which differ in one decisive way.

## 0. Read the pages. Never the text layer.

**The PDF text layer of this book is arithmetically lossy and you must not use
it, not even to cross-check yourself.** Measured on Ch.2:

- **Every radical is dropped.** p32 teaches "each perpendicular side is
  **1/√2** times the hypotenuse"; the text layer returns `1\n2`, i.e. 1/2 — a
  false statement. `ZY = 3√2` extracts as `3 2`. There are **zero** `√`
  characters in the entire chapter's text layer.
- **Stacked fractions collapse** to two lines: `1\n3 BC`, `QR\n2`.
- **Geometry operators extract as the wrong Latin letters** (they sit in the
  SymbolMT font): △→`D`, ∠→`Ð`, ∴→`\`, ⊥→`^`, ≅→`@`, ×→`´`, ∼→`~`.

So `In D PQR, Ð PQR = 90°` is really `In △PQR, ∠PQR = 90°`. Read the rendered
PNG and transcribe what is **printed**. If a value looks like a bare integer
where the geometry demands a surd, zoom in — it is almost certainly a surd.

## 1. Output

One JSON array per band → `data/<chapterId>.<section>.json`. Each element:

```jsonc
{
  "ref": "Ex 2.1 Q.4",        // unique in the chapter; see §2
  "bucket": "exercise-subjective", // solved | exercise-mcq | exercise-subjective
  "format": "subjective",     // mcq | subjective
  "subtopic": "Apollonius Theorem",  // EXACTLY one of the chapter's list
  "difficulty": "MODERATE",   // EASY | MODERATE | HARD
  "stem": "...",              // LaTeX-bearing, see §3
  "context": "...",           // optional: shared instruction for a set
  "setLabel": "...",          // optional: siblings of one set share this
  "options": [ {"label":"A","text":"..."}, ... ],  // MCQ only, exactly A,B,C,D
  "answer": "B",              // MCQ only, the letter you DERIVED (see §5)
  "solution": "..."           // `solved` rows: the book's printed working
}
```

## 2. `ref` — provenance, and it must be unique

Use the book's own numbering:

- `Solved Ex.3` — from the boxed **Solved Examples** run.
- `2.4 SolvedEx.1` — a worked example printed inside a numbered SECTION rather
  than the boxed run. **Scope it to its sub-section**, because the book reuses
  bare `Ex. (1)` in several places and unscoped refs collide.
- `Ex 2.1 Q.4` — Practice set 2.1, question 4.
- `PS2 Q.1 (3)` — Problem set 2, question 1, sub-item (3).

A sub-item that is genuinely one question keeps one ref. **Do not split a
numbered question into sub-rows** — Practice set 2.1 Q.1 lists six triplets and
is ONE row, with all six in the stem.

## 3. Maths in the stem

Inline math in `\( ... \)`. Use real LaTeX for the operators the text layer
mangles:

| Printed | Write |
|---|---|
| △PQR | `\(\triangle PQR\)` |
| ∠PQR = 90° | `\(\angle PQR = 90^\circ\)` |
| seg PM ⊥ seg QR | `seg PM \(\perp\) seg QR` |
| ≅ | `\(\cong\)` |
| ∴ | `\(\therefore\)` |
| ∥ | `\(\parallel\)` |
| √3 | `\(\sqrt{3}\)` |
| ▭ABCD / ⬜ABCD | `\(\square ABCD\)` |

- Never emit unicode maths (`√`, `∠`, `△`, `≅`) outside a math zone.
- Never leave an empty math zone (`\(\)`) or a zone ending in a lone backslash —
  both break KaTeX for the whole stem.
- A genuine data table goes in as a GFM pipe-table **with its `|---|`
  separator row**. Without the separator it renders as raw pipes.

## 4. What to ingest, and what to leave

**Ingest:** the boxed Solved Examples, worked examples printed inside sections,
every numbered question of every Practice set and the Problem set.

**Do NOT ingest:** the chapter-end *ICT Tools* box, *Activity* boxes that ask the
reader to cut out paper or draw with no determinate answer, and the theorem
proofs that form the chapter's teaching body (Given / To prove / Proof) — those
are content, not questions.

**But DO ingest** a numbered exercise question merely *tagged* `[Activity]` or
"complete the following activity": it has a determinate answer and often a
printed key. Fill the blanks in and transcribe it as a normal question.

The book prints a **star** against a harder/optional question (`5★.`, `9★.`).
Record it by appending exactly this to the stem:

    [Note: marked ★ (challenging) in the textbook.]

Use `★`, not `«`. The marker is set in Wingdings, where the byte extracts as `«`
but RENDERS as a star — the same trap as SymbolMT in §0, a glyph whose extracted
character is not the character on the page. **This note is appended to the STEM
and is therefore shown to students, so it must name the glyph they can actually
see.** (An earlier version of this brief said `«`, taken from the text layer. It
was wrong, and the band that read the page and wrote `★` was right.)

## 5. MCQ answers — derive, do not read

For an MCQ, **work the question yourself and record the letter you derive.** Do
not look at the book's answer key. A separate pass compares your letter against
the printed key, and that comparison is worthless if you copied it.

If you cannot derive one, omit `answer` — the row is flagged and stays PRIVATE.
Never guess.

## 6. Figures

This chapter is figure-dense and most questions cannot be answered without
theirs. For every question that reads a figure, add an entry to a **separate**
file `data/<chapterId>.<section>.fig.json`:

```jsonc
[ { "ref": "Ex 2.1 Q.4", "page": 48, "bbox": [0.55, 0.10, 0.95, 0.30] } ]
```

`page` is the **0-based PDF index** (the PNG is named `p-<page>.png`), `bbox` is
`[x0,y0,x1,y1]` as **fractions of the page** (0–1), measured off the rendered PNG.

- Crop the diagram **and its `Fig. 2.x` caption**, nothing else. Do not include
  the question text or a neighbouring question's diagram.
- If a question's figure genuinely spans a page break, say so in your report
  instead of guessing a bbox — those need a stitched composite.
- Transcribe any labels printed *inside* the figure into the stem where the
  question depends on them.

## 7. Stay in your band — but report what you see

You own a page range and a **block** range. The band boundaries are cut at block
boundaries, and a single printed page often carries the end of one block and the
start of the next. Your prompt names the exact split.

**Transcribe only your blocks.** But if you notice a question, a worked example
or a printed solution that belongs to nobody — not in your blocks and not in the
neighbouring band's stated range — **say so in your final report**. Territory
falling between two bands is the main way questions get silently lost, and the
reporting instruction has caught more omissions than the boundaries have.

## 8. Report back

End with: how many questions you wrote, the ref of the first and last, how many
figure entries, every MCQ letter you derived, anything you could not read, and
any suspected misprint in the book (quote it — do not silently correct it).
