# Solution figures: triage brief

You are triaging board-exam questions whose **model answer** might be better
explained with a figure shown under it (`questions.solution_image_url`). You work
from the files you are given and the textbook PDFs on disk. **You never write to
the database, never touch git, and never draw a figure yourself.** The main
session reads your draft, re-checks every crop, and does all writes.

## Input

A slice file `out/<wave>/<slice>.candidates.json`: a list of candidates, each
`{ id, chapter, kind, format, ref, signals, stemHasImage, books, stem, solution }`.
`books` are the chapter's textbook PDFs. `signals` say why the row was picked
(`asks` a drawing, `worded` diagram in the solution, `explains` a set-up the
reader cannot see, `dangling` "see Fig. N" with no figure). The signals
over-report on purpose: **most candidates will not need a figure.**

## Verdicts (one per candidate)

| verdict | when |
|---|---|
| `book-figure` | The book prints a figure that shows **exactly** what the answer needs: the drawing the question asks for, or the set-up the solution describes (a circuit, an apparatus, a ray diagram for the **same case**). |
| `text-enough` | A definition, a statement, a calculation, a list: a figure would add little. |
| `has-stem-figure` | The question already shows the figure the solution works on. |
| `computed` | A figure would help, the book has none for this exact case, and it could be COMPUTED exactly from the question's own data (a graph from given values, a ray diagram for given distances, a circuit for given resistors). Describe it in `spec`; do not make it. |
| `structure` | Chemistry: the answer is a structural formula best shown as a rendered structure. Give the molecule(s) in `spec` (name + SMILES if you are sure). |
| `no-book-figure` | A figure would help but the book has none for this case and it cannot be computed (a labelled biological or apparatus illustration). |
| `false-hit` | The signal fired on something else ("how much current will a bulb draw"). |

**Same case or nothing.** A ray diagram for an object *between F and C* is not the
answer to "object beyond C". A figure of a *different* configuration misleads a
student more than no figure. When unsure, choose `text-enough` or `computed`.

## For `book-figure`: measure the box with the tool

Use `python scripts/solution-figures/measure.py` (read its header). The loop:

1. `find <pdf> "Fig\.? ?5\.6"` to locate the caption (some captions are not text;
   then render pages with `page`).
2. `page <pdf> <page> <scratch png>` and **look at it**: a 0.05 grid is drawn on it.
   Read the figure's extent off the grid. Never guess from a bare render.
3. `ink <pdf> <page> x0 y0 x1 y1` over a region a little larger than the figure,
   staying inside its column: it reports the drawing's exact extent and every text
   line nearby. Take the box as the ink plus ~0.005, extended to take in labels.
4. `crop ... <scratch png> [--mask ...]` and **look at the crop**. It must contain
   the whole figure (every label, arrow, rheostat lead) and nothing else: **no
   caption, no body text, no part of a neighbouring figure**. Text printed inside
   the figure's rectangle (a caption, an equation) gets a `--mask` box; end a mask
   on plain paper, since it is filled with the colour just right of it.
5. Repeat until clean. Write scratch PNGs only to the scratch folder you are given.

A figure the answer needs in two parts (graphs (a) and (b), ammeter and voltmeter)
is two `parts`, stacked top to bottom in the order the answer uses them.

## Labels must match the figure

Read the solution against the figure you chose. If the solution names points or
quantities with **different letters** from the figure (R where the figure has S,
wire AC where the figure has AB), propose `edits` that change only those letters.
Each edit is `{ "find", "replace" }` where `find` is copied **exactly** from the
`solution` string in the candidates file (it is JSON: copy the escaped form as it
appears, e.g. `"\\(R\\)"`) and occurs **exactly once** in it. Change letters only,
never the physics. If the mismatch is too deep to fix by relabelling, choose a
different verdict and say why.

## Output: `out/<wave>/<slice>.draft.json`

```json
[
  { "id": "...", "verdict": "book-figure", "reason": "asks for the metre bridge circuit",
    "figure": { "key": "metre-bridge", "caption": "Fig. 9.5 Metre bridge", "pdf": "C:/...pdf",
                "parts": [{ "page": 4, "bbox": [0.1287, 0.4846, 0.484, 0.6474] }] },
    "edits": [{ "find": "wire AC", "replace": "wire AB" }] },
  { "id": "...", "verdict": "text-enough", "reason": "definition of potential gradient" },
  { "id": "...", "verdict": "computed", "reason": "...", "spec": "graph of V against I for the given readings ..." }
]
```

- Every candidate in the slice gets exactly one entry. `reason` is one short line.
- `key` is a lowercase slug, unique in your slice; **reuse the same key** (and the
  same box) when one figure serves several questions.
- Keep tool output small: print only what you need, never dump whole pages of text.
- Your final message: counts per verdict, and anything you were unsure about.
