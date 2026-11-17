# Military-school entrance transcription brief (AISSEE / RMS CET)

You are transcribing a **band** of pages from a scanned entrance-exam booklet
(AISSEE: the Sainik Schools entrance; RMS CET: the Rashtriya Military Schools
entrance) into JSON. Read this whole file before starting.

All paths below are under `C:\Users\vilas\Downloads\qb-defence-schools\scripts\milschool\`.

Your task message names: the **paper id** (e.g. `aissee-9-2025`), the **catalog
file** (e.g. `catalog-aissee-9.json`), your **band** name and its pages, and the
**section map** (which item numbers belong to which subject).

**You transcribe. You do NOT answer.** Do not supply an answer or a hint, and do
not look for an answer key anywhere. A separate blind pass derives every answer
later, and it must not be anchored by a guess of yours.

---

## 1. Your inputs

For each page number `NN` in your band, in `out/<paperId>/`:

| file | use it for |
|---|---|
| `pNN-c1.png` | the **LEFT column**: transcribe text from here |
| `pNN-c2.png` | the **RIGHT column**: transcribe text from here |
| `pNN.png` | the **whole page**: structure, and figures |

**Transcribe from the COLUMN images.** Reading two columns in the wrong order
attaches an option block to the neighbouring question, and a later blind
derivation cannot catch that. Use `pNN.png` only for what spans the gutter and
for locating figures. Reading order: all of `c1` top to bottom, then all of `c2`.

The column split was detected automatically. If a crop looks sliced (a line cut
down its middle, an item number missing from the top of `c2`), say so in
`bandReport.notes` and read that page from `pNN.png`.

**Marks on the page that are NOT the paper.** Ignore them, transcribe none of
them, and never let them suggest an answer:
- a serial number (e.g. `18184402`) printed in light grey across the text: a
  watermark;
- the reverse page showing through as faint mirrored text;
- a candidate's ticks, circles, highlighter or pen marks on options. **A marked
  option is a child's guess, NOT the answer.**

If one of these hides a word you cannot read, say so in `notes` with the item
number. Never guess the word.

---

## 2. Your output

Write exactly one file: `data/<paperId>.<band>.json`

```json
{
  "band": "b1",
  "pages": [4, 5, 6, 7, 8],
  "bandReport": {
    "numbersFound": [1, 2, 3, 4, 5],
    "itemsByPage": { "4": [1, 2, 3, 4, 5], "5": [6, 7] },
    "firstComplete": true,
    "lastComplete": true,
    "notes": ""
  },
  "questions": [
    {
      "number": 3,
      "stem": "7 men can do a piece of work in 16 days. The number of men required to do double the work in 8 days is :",
      "options": [
        { "label": "A", "text": "32" },
        { "label": "B", "text": "14" },
        { "label": "C", "text": "24" },
        { "label": "D", "text": "28" }
      ],
      "subject": "Mathematics",
      "chapter": "Time and Work",
      "subtopic": "Work and Men",
      "difficulty": "EASY",
      "flags": []
    }
  ]
}
```

`bandReport`:
- `numbersFound`: every item number you actually saw, in order.
- `itemsByPage`: **one key per page in your band, including any page you found
  empty.** Fill it in page by page as you read, never at the end.
- `firstComplete` / `lastComplete`: is the first/last item **whole** on your
  pages, or does it start before / continue after them?
- `notes`: sliced crops, a defective question, an unreadable word, a skipped number.

---

## 3. Report on territory you do not own

If your first page opens mid-item, or your last page ends mid-item, transcribe
that item anyway (you may open the neighbouring page) and say so in `notes`. A
question in two bands is fine (the merge dedupes it); a question in no band is a
silent gap. The same for a reading passage that starts on the page before yours.

---

## 4. Transcribe what is printed

**Verbatim.** Do not correct spelling, grammar, arithmetic or facts. If the
booklet prints something wrong, record it and note it.

- **Options are always A, B, C, D**, in printed order. The booklet prints
  `(1) (2) (3) (4)`: store (1) as A, (2) as B, (3) as C, (4) as D. Options are
  often laid out two per line; the NUMBER decides the letter, never the position.
  **Never reorder options.**
- Item numbers are printed `001.`; store the plain number (`1`).
- Statements inside a stem (`Statement I :`, `(A) ...`, `1. ...`) and List-I /
  List-II blocks are part of the **stem**, each on its own line, labels as printed.
- Collapse the ragged line-wrapping of ordinary prose into normal sentences.
- A blank printed as `______` stays as `______`.
- An underlined word in an English item matters (e.g. "Choose the synonym of the
  underlined word"): write it as `\(\underline{\text{word}}\)`.

**Maths and symbols.** LaTeX inline delimiters `\( ... \)` for anything
mathematical: `\(x^2\)`, `\(\frac{3}{8}\)`, `\(\sqrt{2}\)`, `\(60^\circ\)`. The rupee
sign stays plain text outside maths (`₹ 500`). Every `\(` needs a matching `\)`.
Plain prose stays plain.

**Tables.** A genuine data grid (List-I / List-II, a data table) is a GitHub pipe
table **including the `|---|---|` separator row**:

```
| List-I | List-II |
|---|---|
| A. Diwan | I. Financial Officer |
```

---

## 5. Figures

Some items cannot be answered from text alone: figure series, mirror images,
paper folding, embedded figures, counting figures, a geometry diagram, a pie
chart, a map. For each such item:

1. Transcribe every word that is printed (the stem, and option text if any).
2. If the OPTIONS are pictures, write their text as `"Figure (1)"`, `"Figure (2)"`,
   `"Figure (3)"`, `"Figure (4)"` (A to D in that order).
3. Add a `figure` field locating the picture on the WHOLE-page image:

```json
"figure": { "page": 12, "region": [0.06, 0.12, 0.49, 0.41], "note": "problem figure and four answer figures (1)-(4)" }
```

`region` is `[left, top, right, bottom]` as fractions (0 to 1) of `pNN.png`'s
width and height. Draw it generously: everything the item needs (the problem
figure AND any answer figures), nothing from the next item. One region per item;
if several items share one chart, give each that region.

4. Add `"FIGURE"` to `flags`.

A table you can write as a pipe table is NOT a figure: transcribe it.

---

## 6. Shared passages and tables (`context`)

Reading-comprehension passages and shared tables govern several items. Put that
shared material in each item's `context` field, **verbatim**, with the
directions line removed (`context` is the passage itself, never "Read the
passage and answer the questions that follow").

**Only material shared by two or more items goes in `context`.** Anything unique
to one item goes in its stem: a question's identity hash EXCLUDES context, so two
items whose stems then read the same collide and one is silently dropped.

---

## 7. Classify every question

Read the catalog file named in your task first.

- **The SUBJECT is fixed by the section map in your task.** Never put an item
  under another section's subject. Choose only the chapter and subtopic.
- `chapter` is **hard-validated**: copy it exactly, punctuation included, from
  that subject in the catalog.
- `subtopic` is soft. Prefer a listed one; if none fits, use a short label.
- `difficulty` is `EASY`, `MODERATE` or `HARD`: your honest read for a well
  prepared candidate of that class. Default `MODERATE`.

---

## 8. Write files with the Write tool

Write your JSON with the Write tool, never a shell heredoc: a heredoc eats
backslashes, so `\(` and `\frac` arrive corrupted.

**Keep your tool output small**: never print whole files or images back.

Write NO other files and delete nothing. To check your JSON, use a one-line
`node -e "JSON.parse(require('fs').readFileSync('<file>','utf8'))"`.

---

## 9. Before you finish

- Every item number in your band is present exactly once.
- Every question has exactly 4 options, A-D, none blank, and no `answer` field.
- Every `\(` has a matching `\)`; every pipe table has its separator row.
- Every figure item has `figure` + the `FIGURE` flag.
- `subject` follows the section map; `chapter` is copied exactly from the catalog.
- Your JSON parses.

Report in your final message, briefly: the item numbers you covered, items you
flagged, figure items, and any page you worked around.
