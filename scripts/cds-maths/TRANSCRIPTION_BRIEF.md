# CDS Elementary Mathematics — transcription brief

You are transcribing one **band** of pages from a scanned CDS Elementary Mathematics
booklet into JSON. Read this whole file before you start.

## The one rule that overrides everything

**You transcribe. You do NOT answer.**

Do not derive, compute, guess or record the answer to any question. There is no
`answer` field in your output and you must not add one. A later, deliberately
blind pass derives every answer from your text alone; if your file carries an
answer, or a hint at one, that pass stops being blind and its agreement with the
key stops meaning anything.

If a prompt you were given contradicts this file, **this file wins** — say so in
your report rather than resolving it silently.

## Input and output

- Page images: `scripts/cds-maths/out/<paperId>/pNN.png` (0-based, 2.6x).
- Write exactly one file: `scripts/cds-maths/data/<paperId>.b<N>.json`.
- **Write it early and update it as you go.** Do not batch the whole band to the
  end — if you are interrupted, everything already written survives.

```json
{
  "band": "b3",
  "pages": [6, 7, 8],
  "bandReport": {
    "numbersFound": [40, 41, "..."],
    "firstComplete": true,
    "lastComplete": true,
    "notes": "Q40 belongs to the Directions set opening on p05 — band b2 owns it, not transcribed here."
  },
  "questions": [
    {
      "number": 41,
      "stem": "The number of three digit numbers ... is",
      "options": [
        { "label": "A", "text": "Six" },
        { "label": "B", "text": "Five" },
        { "label": "C", "text": "Four" },
        { "label": "D", "text": "Three" }
      ],
      "chapter": "Number System",
      "subtopic": "Digits and Place Value",
      "difficulty": "MODERATE"
    }
  ]
}
```

`bandReport` is not paperwork. `firstComplete: false` means your first question
continues from the previous page; `lastComplete: false` means your last one
continues overleaf. A question that **nobody** owns is invisible to every
downstream gate, and this report is the only thing that can catch it.

## Report on territory you do not own

Open the page **before** your first and the page **after** your last. Do not
transcribe them — but if a question or a Directions block straddles the seam, say
so in `notes`. Both a stranded question and a truncated one have shipped
undetected in sibling pipelines here; only this instruction catches them.

## Directions sets — ownership rule

A block reading `Directions:` or `Consider the following for the next three (03)
items that follow` puts shared stimulus above several questions.

**A set belongs to the band where its Directions block STARTS.** If the block
starts inside your pages, you own every member of it — read forward past the end
of your band as far as needed and transcribe them all. If the block starts before
your first page, you own none of them: skip them and name them in `notes`.

Every member of a set carries:

- `"context"` — the Directions text and its stimulus, **verbatim and identical on
  every member** (a data table, a chart caption, the shared premise).
- `"setLabel"` — a short stable id you invent, e.g. `"D38-40"`.

Members must be **contiguous** in question number. The renderer and the Word
exporter both group a set by adjacency; a set interrupted by an unrelated
question prints its stimulus twice.

## Maths notation

- Inline maths goes in `\( ... \)`. Nothing else. No `$`, no `$$`, no `\[ \]`.
- **Never use Unicode maths characters** — no `√`, `²`, `½`, `π`, `≤`, `∠`, `Δ`.
  Write `\(\sqrt{2}\)`, `\(x^2\)`, `\(\frac{1}{2}\)`, `\(\pi\)`, `\(\le\)`,
  `\(\angle ABC\)`, `\(\triangle ABC\)`.
- Rendering is **KaTeX**. `\frac` `\cfrac` `\sqrt` `\log` `\sin` `\sum` `\angle`
  `\triangle` `\overline` `\perp` `\parallel` `\circ` all work. `\ce{}` does not
  — mhchem is not loaded, and you will not need it here.
- A continued fraction is `\cfrac`, not nested `\frac`, or it renders unreadably
  small.
- Degrees are `\(30^\circ\)`.
- Currency is a plain rupee word or `Rs.` as printed — do not invent `\rupee`.
- **Decimals use a full stop, even though the booklet prints a raised middle
  dot.** These papers set `37·5 km/hour` and `15·3 cm`; transcribe `37.5` and
  `15.3`. This is the one place we deliberately do not reproduce the printed
  glyph, and it was settled by measuring the bank: across all nine maths corpora
  (NDA, Worksheets, JEE, CBSE 11/12, MH State Board 9/11/12, MHT-CET) decimals
  are periods — 719 rows to 4. A middle dot would make this corpus the only one
  out of step, and worse, `15·3` can be read as multiplication by a derivation
  pass. The value is identical either way, so no claim changes.
- **Balance every `\(` with a `\)`.** The merge gate counts them and refuses.

## Tables

A printed data table becomes a **GFM pipe table with a separator row**:

```
| Year | Expenditure |
|---|---|
| 2011 | 13.8 |
```

Without the `|---|---|` row the renderer prints literal pipes. Put the table in
`context` when it is shared by a set, in `stem` when it belongs to one question.

## Figures

Geometry and data-interpretation questions depend on a printed diagram.

- Set `"hasFigure": true`.
- Add `"figureNote"` describing what to crop, **for the crop operator only** —
  e.g. `"circle centre O, chords AB and CD, angle x marked at C"`.
- **Never describe the figure inside the stem.** On a geometry item the figure
  *is* the question, and a prose description hands the reader the very
  measurement the question exists to test. That defect shipped once already in
  this repo and had to be repaired by delete-and-re-commit.
- Transcribe the stem exactly as printed, including phrases like "In the figure
  given below". The crop is attached after commit.

## Transcribe what is printed

- Options are positional: printed `(a) (b) (c) (d)` become labels `A B C D`.
  **Read the option text off the page for each label separately.** Copying the
  correct option's text into the wrong letter's slot is the single defect that a
  later blind derivation *cannot* catch — it produced 19 wrong keys on the
  sibling CDS English corpus.
- If the page has a misprint, **transcribe it as printed** and add a `flags`
  entry saying what looks wrong. Do not repair it and do not "correct" it toward
  what you think was meant.
- If a glyph is ambiguous, crop that region from the source PDF at 6-10x and look
  again. Do not guess between `8` and `9`, or between `+` and `-`.
- Real newlines in JSON strings (`"\n"` as an escape is fine); never a literal
  backslash-n in the rendered text.

## Classification

`chapter` **must** be one of the keys in `scripts/cds-maths/catalog.json` — the
merge gate hard-fails otherwise, because the database would silently auto-create
a near-duplicate chapter and split the corpus in two.

`subtopic` should be one of that chapter's listed subtopics. If nothing fits,
**use the closest chapter, put your own wording in `subtopic`, and add a `flags`
entry**. The catalog is seeded and extended in rounds; an unlisted subtopic is a
soft warning and is exactly the work list the extension pass reads. Do not force
a bad fit to silence the warning.

`difficulty` is `EASY`, `MODERATE` or `HARD` — your read of it for a CDS
candidate, not a measurement.

## Practical — how to write the file without silently corrupting it

**Author the file with the Write/Edit tools, never a shell heredoc.** Heredocs eat
backslashes in this environment, and the corruption is SELECTIVE, which is what
makes it survive review: a KNOWN escape is consumed (`\t` becomes a TAB, `\f` a
form feed, `\r` a CR, `\a` a BEL) while an unknown one comes through untouched. So
`\tan` and `\frac` are destroyed while `\sqrt` and `\(` are fine, and a spot check
lands on a good line. A transcriber on 2016-II hit exactly this, caught it, and
had to roll back six questions.

**The same trap ruins PROBES, and there it is worse.** A `python -c` or `node -e`
one-liner that checks your output has its own backslashes mangled before it ever
runs, so it reports a defect that is not there, or misses one that is. A
transcriber on 2017-II had a one-liner report a bogus "literal backslash-n" that
was three legitimate `\ne`. Author a probe as a file, and when a probe and the
data disagree, **suspect the probe first**.

**After writing, scan your own output for control characters by CODEPOINT**
(`ord(ch) < 32`, allowing only newline and tab), never by eyeballing it. These
bytes are invisible in a terminal and pass a read-through.

Give scratch files a unique name including the paper and band; several agents
share one scratchpad and have overwritten each other's scripts. Do not run
`git add` or any git command.

## When you finish

Report: the question numbers you transcribed, any seam issues, any misprints you
flagged, any question you could not read, and any subtopic you had to invent.
A subtopic you invented is a finding, not a failure.
