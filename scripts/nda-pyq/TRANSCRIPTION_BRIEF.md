# NDA Paper I (Mathematics) — transcription brief

You are transcribing one **band** of pages from a scanned NDA Paper I (Mathematics)
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

## This booklet: four hazards measured on the actual pages

Read these before you open an image. Each one was seen on a rendered page of
`2026-2`, and each is the kind of defect that reads as plausible content.

1. **A large yellow watermark crosses the middle of every page** — "CENTURION
   DEFENCE ACADEMY" plus a Hindi slogan. Text under it is readable but degraded.
   Q5, Q69 and Q83 all cross it. If a character under the watermark is ambiguous,
   crop that region at 6-10x; do not guess.
2. **Show-through from the reverse side.** Each sheet is printed on both faces,
   so faint MIRRORED text bleeds through — and it looks like option labels,
   because that is what is on the other side. The foot of printed p31 shows ghost
   `(b)`, `(a)`, `0 (d)` that belong to no question on that page. **A real option
   is sharp, upright and in the column flow. A ghost is faint, often mirrored,
   and sits outside it.** Never transcribe a fifth option.
3. **Student handwriting.** Many pages carry pen working in the margins and
   between columns — rough algebra, arrows, a sketched curve. It is not printed
   content. Do not transcribe it and do not read it as a figure.
4. **You should never see Devanagari.** This is a raw bilingual booklet and the
   page list was selected by hand. If any page in your band is in Hindi, **stop
   and report it** — it means `englishPages` in config.ts is wrong, which is a
   finding worth far more than a transcribed page.

## Reading order on the page

Two columns. Read the **entire left column top to bottom, then the entire right
column** — question numbers run down one column and continue at the top of the
next. Printed page number and the TBC code (`TFDD-A-HTM/37A`) sit in the footer;
they are not content.

## Input and output

- Page images: `scripts/nda-pyq/out/<paperId>/pNN.png` (0-based, 2.6x).
- Write exactly one file: `scripts/nda-pyq/data/<paperId>.b<N>.json`.
- **Write it early and update it as you go.** Do not batch the whole band to the
  end — if you are interrupted, everything already written survives.

```json
{
  "band": "b2",
  "pages": [10, 12, 14, 16],
  "bandReport": {
    "numbersFound": [24, 25, "..."],
    "firstComplete": true,
    "lastComplete": true,
    "notes": "Q24 belongs to the set opening on p08 — band b1 owns it, not transcribed here."
  },
  "questions": [
    {
      "number": 25,
      "stem": "What is \\(\\sin A \\cdot \\cos B\\) equal to?",
      "context": "For the next two (02) items that follow :\nThe angles A, B and C of a triangle ABC are in the ratio 1 : 2 : 7.",
      "setLabel": "S24-25",
      "options": [
        { "label": "A", "text": "1/4" },
        { "label": "B", "text": "1/2" },
        { "label": "C", "text": "1" },
        { "label": "D", "text": "2" }
      ],
      "chapter": "Properties of Triangle",
      "subtopic": "Sine Rule and Cosine Rule",
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

This paper words it several ways, all meaning the same thing:

- `For the following two (02) items that follow :`
- `For the next two (02) items that follow :`
- `For the next three (03) items that follow :`

followed by the shared premise ("The angles A, B and C of a triangle ABC are in
the ratio 1 : 2 : 7."). That premise is the `context`. Roughly a fifth of NDA
Maths PYQs sit in such sets, so expect them throughout.

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
- **Decimals use a full stop.** If the booklet prints a raised middle dot,
  transcribe a period. Settled by measuring the bank: across all nine maths
  corpora decimals are periods, 719 rows to 4 — and `15·3` can be read as
  multiplication by a derivation pass. The value is identical either way.
- **Vectors and matrices — this paper is dense with both.**
  - A vector is `\(\vec{a}\)`; unit vectors are `\(\hat{i}\)`, `\(\hat{j}\)`,
    `\(\hat{k}\)`. Do not use bold, and do not use `\overrightarrow` (it is
    correct LaTeX but the bank's convention is `\vec`).
  - Dot and cross are `\(\vec{a} \cdot \vec{b}\)` and
    `\(\vec{a} \times \vec{b}\)` — never `.` or `x`.
  - A matrix is `\(\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\)`; a
    determinant is `vmatrix`. Use the one the page prints — square brackets and
    vertical bars mean different things and the question often turns on which.
  - Greek letters are `\(\alpha\)`, `\(\beta\)`, `\(\gamma\)`, `\(\theta\)` —
    never the Unicode glyph.
- Inverse trig is `\(\sin^{-1} x\)` as printed, not `\arcsin`.
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

**Expect NONE.** A contact sheet of all 21 English pages was read before this
band was dispatched and there is **not one printed diagram in the paper** —
including the whole coordinate-geometry, 3-D and vectors run. NDA Paper I states
every question in words.

So: a figure would be a genuine surprise. If you think you see one, it is far
more likely to be **a student's pen sketch** (there is a hand-drawn curve in the
margin of printed page 29, and scribbled working on several other pages) — those
are not content and must not be transcribed or flagged as figures.

That said, the contact sheet was read at reduced resolution, so a small inline
diagram is not impossible. If you find a real printed one at full resolution,
flag it — do not silently drop a question because it depends on something you
cannot transcribe. In that case:

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

`chapter` **must** be one of the keys in `scripts/nda-pyq/catalog.json` — the
merge gate hard-fails otherwise, because the database would silently auto-create
a near-duplicate chapter and split the corpus in two.

`subtopic` **must** be one of that chapter's listed subtopics. **This is a HARD
gate here and that differs from the sibling CDS pipeline** — do not carry a habit
across. CDS is still extending its catalog in rounds, so an unlisted subtopic
there is a work item. NDA Mathematics' taxonomy is CLOSED: 31 chapters and 111
subtopics that went through a bank-wide cleanup pass, and `catalog.json` is
GENERATED from the live database, so it is exactly what exists. An unlisted name
is not a gap — it is a near-miss that the database would AUTO-CREATE, splitting
one chapter's questions across two subtopics with no error anywhere.

If genuinely nothing fits, pick the closest and **add a `flags` entry saying so**.
A forced fit that you flagged is recoverable; an invented subtopic name is not.

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

**Give every probe a canary: feed it a known-bad string and confirm it FIRES
before you trust a clean run.** A probe that has never gone red proves nothing,
and the worst case is not a probe that lies — it is one that tests nothing and
reports clean. That happened on this corpus: a validator's control-character
regex was written as escape literals, the escapes were eaten, the pattern became
inert, and the scan returned green having checked nothing. The data was fine; the
probe was not. A canary is the only thing that separates those two states.

Give scratch files a unique name including the paper and band; several agents
share one scratchpad and have overwritten each other's scripts. Do not run
`git add` or any git command.

## When you finish

Report: the question numbers you transcribed, any seam issues, any misprints you
flagged, any question you could not read, and any subtopic you had to invent.
A subtopic you invented is a finding, not a failure.
