# CAPF transcription brief

You are transcribing a **band** of pages from a scanned UPSC CAPF (Assistant
Commandants) Paper I booklet, "General Ability and Intelligence", into JSON. Read
this whole file before starting.

All paths below are under `C:\Users\vilas\Downloads\qb-capf\scripts\capf\`.

**You transcribe. You do NOT answer.** Do not supply an answer or a hint, and do
not look for an answer key anywhere. A separate blind pass derives every answer
later, and it must not be anchored by a guess of yours.

---

## 1. Your inputs

For each page index `NN` in your band, in `out/<paperId>/`:

| file | use it for |
|---|---|
| `pNN-c1.png` | the **LEFT column**: transcribe text from here |
| `pNN-c2.png` | the **RIGHT column**: transcribe text from here |
| `pNN.png` | the **whole page**: structure, and figures |

**Transcribe from the COLUMN images.** Reading two columns in the wrong order
attaches an option block to the neighbouring question, and a later blind
derivation cannot catch that: it reasons correctly from the wrong options and
confirms the wrong letter. Use `pNN.png` only for what spans the gutter and for
locating figures.

Reading order: all of `c1`, top to bottom, then all of `c2`, top to bottom.

The column split was detected automatically. **If a crop looks sliced (a line cut
down its middle, an item number missing from the top of `c2`), say so in
`bandReport.notes` and read that page from `pNN.png`.**

The booklet is bilingual, but your pages are the ENGLISH ones only. If a page you
were given is in Hindi, stop and say so in `notes`; do not translate it.

---

## 2. Your output

Write exactly one file: `data/<paperId>.<band>.json`

```json
{
  "band": "b1",
  "pages": [2, 4, 6, 8, 10],
  "bandReport": {
    "numbersFound": [1, 2, 3, 4, 5],
    "itemsByPage": { "2": [1, 2, 3, 4], "4": [5] },
    "firstComplete": true,
    "lastComplete": true,
    "notes": ""
  },
  "questions": [
    {
      "number": 1,
      "stem": "Which one of the following statements about 'SB 64' is correct?",
      "options": [
        { "label": "A", "text": "..." },
        { "label": "B", "text": "..." },
        { "label": "C", "text": "..." },
        { "label": "D", "text": "..." }
      ],
      "subject": "Current Affairs and IR",
      "chapter": "Defence and Internal Security",
      "subtopic": "Missiles and Weapon Systems",
      "difficulty": "MODERATE",
      "flags": []
    }
  ]
}
```

`bandReport`:
- `numbersFound`: every item number you actually saw, in order.
- `itemsByPage`: **one key per page in your band, including any page you found
  empty.** Fill it in page by page as you read, never reconstruct it at the end.
  It is the only field that shows you opened every page.
- `firstComplete` / `lastComplete`: is the first/last item **whole** on your
  pages, or does it start before / continue after them?
- `notes`: sliced crops, a defective question, an unreadable item, a skipped number.

---

## 3. Report on territory you do not own

If your first page opens mid-item, or your last page ends mid-item, transcribe
that item anyway and say so in `notes`. A question in two bands is fine (the merge
dedupes it); a question in no band is a silent gap.

If a set's shared table or passage starts on the page before yours, say so in
`notes` and transcribe it from that page too (you may open it).

---

## 4. Transcribe what is printed

**Verbatim.** Do not correct spelling, grammar, arithmetic or facts. If the
booklet prints something wrong, record it and note it.

- **Options are always A, B, C, D**, in printed order. The booklet prints
  `(a) (b) (c) (d)`; use uppercase labels. **Never reorder options.**
- If two options are genuinely identical, transcribe both and flag it in `notes`.
- Numbered statement lists (`1.`, `2.`, `3.`) and List-I / List-II blocks are part
  of the **stem**. Keep each statement on its own line.
- Collapse the ragged line-wrapping of ordinary prose into normal sentences.

**Maths and symbols.** LaTeX inline delimiters `\( ... \)` for anything
mathematical: `\(x^2\)`, `\(\frac{1}{2}\)`. Every `\(` needs a matching `\)`.
Plain prose stays plain. Binary or other number strings in a computer question are
plain text (`1111001`), not maths.

**Tables.** A genuine data grid (List-I / List-II match, a data table) is a GitHub
pipe table **including the `|---|---|` separator row**:

```
| List-I | List-II |
|---|---|
| A. Amaska | 1. Godavari |
```

---

## 5. Figures

Some items cannot be answered from text alone: figure series, cubes and dice,
counting figures, mirror images, a map, a chart, a figure grid. For each such
item:

1. Transcribe every word that is printed (the stem, and option text if any).
2. If the OPTIONS are pictures, write their text as `"Figure (a)"`, `"Figure (b)"`,
   `"Figure (c)"`, `"Figure (d)"`.
3. Add a `figure` field locating the picture on the WHOLE-page image:

```json
"figure": { "page": 28, "region": [0.06, 0.12, 0.49, 0.41], "note": "question figure and four answer figures (a)-(d)" }
```

`region` is `[left, top, right, bottom]` as fractions (0 to 1) of `pNN.png`'s
width and height. Draw it generously: everything the item needs (the problem
figure AND any answer figures), nothing from the next item. One region per item;
if a set of items shares one chart, give each item that region.

4. Add `"FIGURE"` to `flags`.

A table you can write as a pipe table is NOT a figure: transcribe it.

---

## 6. Shared tables and passages (`context`)

A few items come in sets: "Consider the following table for the next three
items", or one data table governing several questions. Put that shared material
in each item's `context` field, **verbatim**, with the directions line removed
(`context` is the table or passage itself, never "Directions for the following
items:").

**Only material shared by two or more items goes in `context`.** Anything unique
to one item goes in its stem. This is not style: a question's identity hash is
stem + options + answer and EXCLUDES context, so two items whose stems then read
the same collide and one is silently dropped.

Most items have no context. Do not invent one.

---

## 7. Classify every question

`subject`, `chapter` and `subtopic` come from `catalog.json`. **Read it first.**

- `subject` and `chapter` are **hard-validated**. Copy the strings exactly,
  punctuation included, and the chapter must belong to that subject.
- `subtopic` is soft (a warning). Prefer a listed one; if none fits, use a short
  label of your own.
- Every catalog subject is legal on this paper. A guide:
  - news of the last year or two (summits, schemes, awards, missiles in the news,
    new indices) -> `Current Affairs and IR`
  - static GK -> `History`, `Geography`, `Polity and Governance`, `Economy`,
    `Environment and Ecology`, `Physics`, `Chemistry`, `Biology`
  - computers, software, networks, MS Office -> `Computer Knowledge`
  - reasoning -> `Logical Reasoning and Analytical Ability` or `General Mental
    Ability`; arithmetic -> `Basic Numeracy`; tables and charts ->
    `Data Interpretation and Data Sufficiency`

`difficulty` is `EASY`, `MODERATE` or `HARD`: your honest read for a prepared
candidate. Default `MODERATE`.

---

## 8. Write files with the Write tool

Write your JSON with the Write tool, never a shell heredoc: a heredoc eats
backslashes, so `\(` and `\frac` arrive corrupted and nobody can see it.

Keep your tool output small: do not print whole files or images back.

Write NO other files (no temp scripts, no image crops) and delete nothing. To
check your JSON, use a one-line `node -e` that reads it. To look closer at a
spot, view the existing page or column image; do not save crops.

---

## 9. Before you finish

- Every item number in your band is present exactly once.
- Every question has exactly 4 options, A-D, none blank, and no `answer` field.
- Every `\(` has a matching `\)`; every pipe table has its separator row.
- Every figure item has `figure` + the `FIGURE` flag.
- `subject` and `chapter` are copied exactly from `catalog.json`.
- Your JSON parses (check with `node -e "JSON.parse(require('fs').readFileSync('<file>','utf8'))"`).

Report in your final message (briefly): the item numbers you covered, items you
flagged, figure items, and any page whose crop you worked around.
