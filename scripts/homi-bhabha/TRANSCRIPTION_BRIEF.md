# Homi Bhabha transcription brief (MSTA science competition, Std VI / IX)

You are transcribing a **band** of pages from a Homi Bhabha Balvaidnyanik
Competition question booklet (the Mumbai science teachers' association's
science test for Std VI and Std IX) into JSON. Read this whole file before
starting.

All paths below are under `C:\Users\vilas\Downloads\qb-homi-bhabha\scripts\homi-bhabha\`.

Your task message names: the **paper id** (e.g. `hb-9-2024`), the **catalog
file** (e.g. `catalog-homi-bhabha-9.json`), and your **band** name and its pages.

**You transcribe. You do NOT answer.** Do not supply an answer or a hint, and do
not look for an answer key anywhere. A separate blind pass derives every answer
later, and it must not be anchored by a guess of yours.

---

## 1. Your inputs

For each page number `NN` in your band: `out/<paperId>/pNN.png`, the whole page.
Every booklet is printed in ONE column; options often sit two or four to a line.

**Marks on the page that are NOT the paper.** Ignore them, transcribe none of
them, and never let them suggest an answer:
- **On the 2021 online papers, a line `Correct Option(s): X` under each
  question, or a tick (✓) beside an option.** That is an answer key. Do not
  transcribe it, do not mention it, do not let it shape a word you read.
- a header like `QuestionBank`, `21Nov-9th Standard English Exam`, `Print
  Time: ...`, page numbers, `[ P.T.O. ]`, `[Contd.]`, a booklet serial number;
- the reverse page showing through as faint mirrored text;
- a candidate's pen marks.

If one of these hides a word you cannot read, say so in `notes` with the item
number. Never guess the word.

---

## 2. Your output

Write exactly one file: `data/<paperId>.<band>.json`

```json
{
  "band": "b1",
  "pages": [2, 3, 4, 5],
  "bandReport": {
    "numbersFound": [1, 2, 3, 4, 5],
    "itemsByPage": { "2": [1, 2, 3, 4], "3": [5] },
    "firstComplete": true,
    "lastComplete": true,
    "notes": ""
  },
  "questions": [
    {
      "number": 10,
      "stem": "What is the speed of a moving object whose kinetic energy is 4 times its momentum?",
      "options": [
        { "label": "A", "text": "4 m/s" },
        { "label": "B", "text": "8 m/s" },
        { "label": "C", "text": "16 m/s" },
        { "label": "D", "text": "32 m/s" }
      ],
      "subject": "Physics",
      "chapter": "Work, Energy and Power",
      "subtopic": "Kinetic Energy and Momentum",
      "difficulty": "MODERATE",
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
- `notes`: a defective question, an unreadable word, a skipped number.

---

## 3. Report on territory you do not own

If your first page opens mid-item, or your last page ends mid-item, transcribe
that item anyway (you may open the neighbouring page) and say so in `notes`. A
question in two bands is fine (the merge dedupes it); a question in no band is a
silent gap.

---

## 4. Transcribe what is printed

**Verbatim.** Do not correct spelling, grammar, arithmetic or facts. If the
booklet prints something wrong (a misspelt word, a label printed twice in a
figure, two right options), record it as printed and say so in `notes` with the
item number.

- **Options are A, B, C, D** in printed order: `(A)` is A. A booklet that
  prints `(1)-(4)` or `(a)-(d)`: (1)/(a) is A, and so on. Options laid out two
  or four to a line: the LABEL decides the letter, never the position.
  **Never reorder options.**
- Lists inside a stem (`P) SONAR  Q) Sonography`, `1) ... 2) ...`, `X- Weight,
  Y- Mass`, `Statement I / II`, `Assertion / Reason`) are part of the **stem**,
  each on its own line, labels exactly as printed.
- Collapse the ragged line-wrapping of ordinary prose into normal sentences.
- A blank printed as `______` or `.........` stays as printed.

**Maths, units and chemistry.** LaTeX inline delimiters `\( ... \)`:
- maths and powers: `\(\frac{1}{2}mv^2\)`, `\(10^{-3}\)`, `\(60^\circ\)`, `\(3 \times 10^8\)`;
- **chemical formulas and equations upright**: `\(\mathrm{H_2O}\)`,
  `\(\mathrm{CaCO_3}\)`, `\(\mathrm{2H_2 + O_2 \rightarrow 2H_2O}\)`,
  ions `\(\mathrm{Cu^{2+}}\)`;
- units with a power: `\(\mathrm{m/s^2}\)`, `\(\mathrm{kg\,m^{-3}}\)`. Plain
  units stay plain: `4 m/s`, `20 g`, `25 °C`, `6 Ω`.
- Every `\(` needs a matching `\)`. Plain prose stays plain.

**Tables.** A genuine data grid (a match-the-columns list, an observation table)
is a GitHub pipe table **including the `|---|---|` separator row**:

```
| Column I | Column II |
|---|---|
| P. Bauxite | 1. Aluminium |
```

---

## 5. Figures

Some items cannot be answered from text alone: a circuit, a ray diagram, a
graph, a labelled organ, an apparatus, a picture. For each such item:

1. Transcribe every word that is printed (the stem, and option text if any).
   Values printed only inside the figure (12 A, 3 Ω) stay in the figure; do not
   copy them into the stem.
2. If the OPTIONS are pictures, write their text as `"Figure (A)"`,
   `"Figure (B)"`, `"Figure (C)"`, `"Figure (D)"`.
3. Add a `figure` field locating the picture on the page image:

```json
"figure": { "page": 3, "region": [0.28, 0.11, 0.73, 0.19], "note": "circuit: two 3V cells in a loop with a switch and a bulb; a compass beside it" }
```

`region` is `[left, top, right, bottom]` as fractions (0 to 1) of `pNN.png`'s
width and height. Draw it generously: everything the item needs (the figure
AND any picture options), nothing from the next item. One region per item; if
several items share one figure, give each that region.

4. Add `"FIGURE"` to `flags`.
5. **If the stem's words are generic** ("Identify the part shown.", "Observe
   the figure and answer.") and the options are `Figure (A)`-`(D)`, end the
   stem with a short bracketed note naming what the picture shows: `Observe the
   figure and answer. [Figure: flower parts]`. Name the objects only; never
   describe the answer.

A table you can write as a pipe table is NOT a figure: transcribe it.

---

## 6. Shared passages (`context`)

A passage or table that governs SEVERAL items goes, verbatim, in each item's
`context` field, with the directions line removed. **Only material shared by
two or more items goes in `context`.** Anything unique to one item goes in its
stem: a question's identity hash EXCLUDES context, so two items whose stems
then read the same collide and one is silently dropped.

---

## 7. Classify every question

Read the catalog file named in your task first. The booklet prints no section
headings, so YOU pick the subject: Physics, Chemistry, Biology, or General
Science (current science and technology, scientists, discoveries, awards,
space missions, everyday technology).

- `subject` and `chapter` are **hard-validated**: copy them exactly,
  punctuation included, from the catalog.
- `subtopic` is soft. Prefer a listed one; if none fits, use a short label.
- If NO chapter fits, use the closest one and say so in `notes` with the item
  number and a suggested chapter name: the catalog is still being settled.
- `difficulty` is `EASY`, `MODERATE` or `HARD`: your honest read for a well
  prepared student of that class. Default `MODERATE`.

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
- `subject` and `chapter` are copied exactly from the catalog.
- Your JSON parses.

Report in your final message, briefly: the item numbers you covered, items you
flagged (with why), figure items, and any chapter you wished the catalog had.
