# MH Scholarship transcription brief (MSCE Pune, Class 4 / 5 / 7 / 8)

You are transcribing a **band** of pages from a Maharashtra State Council of
Examination (MSCE) scholarship exam booklet, English medium, into JSON. Read this
whole file before starting.

All paths below are under `C:\Users\vilas\Downloads\qb-mh-scholarship\scripts\mh-scholarship\`.

Your task message names: the **paper id** (e.g. `ms8-2026-p1`), the **catalog
file** (e.g. `catalog-mh-scholarship-8.json`), and your **band** name and its pages.

**You transcribe. You do NOT answer.** Do not supply an answer or a hint, and do
not look for an answer key anywhere (never open anything under `keys`, or any
`*.key.*` file). A separate blind pass derives every answer later, and it must not
be anchored by a guess of yours.

---

## 1. The paper

Every paper has **75 questions** in two printed sections, each with options
`(1)`-`(4)`:

| Paper | Section I (Q1-25) | Section II (Q26-75) |
|---|---|---|
| Paper I (id ends `-p1`) | **English** (the first language) | **Mathematics** |
| Paper II (id ends `-p2`) | **Marathi** (the third language, printed in Marathi) | **Intelligence Test** |

So the SUBJECT of an item is set by its section, never by your judgement.

For each page number `NN` in your band: `out/<paperId>/pNN.png`, the whole page.

**Marks on the page that are NOT the paper.** Ignore them and transcribe none of
them: the `SPACE FOR ROUGH WORK` / `कच्च्या कामासाठी फक्त` box, the decorative
border down the left edge, the footer (`0511-English Set-A`, `8 of 16`, `Contd...`,
`P.T.O.`), section banners (`SECTION - II`, `विभाग - I`), a candidate's pen marks.

If one of these hides a word you cannot read, say so in `notes` with the item
number. Never guess the word.

**The alphabet strip is the exception.** Paper II pages print a strip at the top,
`A B C D E | F G H I J | K L M N O | P Q R S T | U V W X Y` (no Z). An item that
says "the given alphabet(ical) series" means THAT strip, so end its stem with
`[Series: the alphabet strip printed at the top of the page: A B C D E | F G H I J | K L M N O | P Q R S T | U V W X Y]`,
copied exactly from the page you see (check whether it has a Z).

**Shared instructions.** If a run of items shares an instruction ("Observe the
given series ...") and one item in the middle of the run is only a figure, it still
gets the same `context`; its stem is then just the bracketed figure note (section 5).
Never put the shared instruction in one item's stem and in its neighbours' context.

---

## 2. Your output

Write exactly one file: `data/<paperId>.<band>.json`

```json
{
  "band": "b2",
  "pages": [8, 9, 10],
  "bandReport": {
    "numbersFound": [26, 27, 28],
    "itemsByPage": { "8": [26, 27, 28], "9": [], "10": [] },
    "firstComplete": true,
    "lastComplete": true,
    "notes": ""
  },
  "questions": [
    {
      "number": 29,
      "stem": "\\(\\frac{3x - 6}{2(x - 3)} = \\frac{12}{7}\\) Find the value of \\(x\\).",
      "options": [
        { "label": "A", "text": "8" },
        { "label": "B", "text": "12" },
        { "label": "C", "text": "9" },
        { "label": "D", "text": "10" }
      ],
      "subject": "Mathematics",
      "chapter": "Linear Equations",
      "subtopic": "Equations with Fractions",
      "difficulty": "MODERATE",
      "flags": []
    }
  ]
}
```

(In the file itself a backslash is written once inside a JSON string as `\\`, as
above, because that is how JSON escapes it. Use the Write tool, section 9.)

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
booklet prints something wrong (a misspelt word, a typo in a number, two
identical options), record it as printed and say so in `notes` with the item
number.

- **Options**: `(1)` is A, `(2)` is B, `(3)` is C, `(4)` is D. Options laid out
  two or four to a line: the LABEL decides the letter, never the position.
  **Never reorder options.**
- **Two-answer questions.** Rule 5 of the paper: up to 20% of questions have TWO
  correct options, and say so in the stem: `(choose two correct alternatives)`,
  `(Choose two correct options)`, `(दोन अचूक पर्याय निवडा)`. Keep that wording
  in the stem exactly as printed, and add `"TWO_ANSWERS"` to `flags`. Do not
  decide which two.
- Lists inside a stem (`A) ... B) ...`, `Statement I / II`, a column of words)
  are part of the **stem**, each on its own line, labels exactly as printed.
- Collapse the ragged line-wrapping of ordinary prose into normal sentences.
- A blank printed as `______` or `.........` stays as printed.
- Number words and digits exactly as printed (`03.` is item 3).

**Marathi (Paper II, Section I).** Type the Devanagari in Unicode exactly as
printed: every matra, anusvara, nukta and conjunct. Quotation marks as printed
(`‘…’`). A Marathi word that is **underlined** in print is written `**bold**`
(the bank's Marathi convention), e.g. `‘श्रावणीने आपली **चित्रे** प्रदर्शनात मांडली.’`.
Never transliterate, never translate.

**English underlines** (Paper I, Section I): an underlined English word is
`\(\underline{\text{word}}\)`.

**Maths.** LaTeX inline delimiters `\( ... \)`:
- `\(81x^2 + \frac{169}{y^2}\)`, `\(16^2 \times 6^2 \times 36^{\frac{1}{2}}\)`,
  `\(\sqrt[3]{6^{12}}\)`, `\(8^{-1}\)`, `\(60^\circ\)`, `\(m\angle RLM = 129^\circ\)`,
  `\(\text{line } RL \parallel \text{line } PM\)`.
- The print sets the variable x in a curly italic; it is the letter `x`.
- Plain units stay plain: `24 cm`, `0.75 km`, `₹ 500`, `3 kg`.
- Every `\(` needs a matching `\)`. Plain prose stays plain.

**Tables.** A genuine data grid is a GitHub pipe table **including the
`|---|---|` separator row**:

```
| Day | Mon | Tue |
|---|---|---|
| Rainfall (mm) | 12 | 8 |
```

---

## 5. Figures

Many Mathematics and Intelligence Test items cannot be answered from text alone:
a geometry figure, a picture series, a mirror image, a cube net, a counting
figure, a pattern grid. For each such item:

1. Transcribe every word that is printed (the stem, and option text if any).
   Values printed only inside the figure (`129°`, `43°`) stay in the figure; do
   not copy them into the stem. Values the stem itself prints stay in the stem.
2. If the OPTIONS are pictures, write their text as `"Figure (1)"`,
   `"Figure (2)"`, `"Figure (3)"`, `"Figure (4)"`.
3. Add a `figure` field locating the picture on the page image:

```json
"figure": { "page": 8, "region": [0.56, 0.58, 0.88, 0.73], "note": "three parallel lines RL, PM, ON cut by transversals through L, M, N; angles 129° at L and 43° at N" }
```

`region` is `[left, top, right, bottom]` as fractions (0 to 1) of `pNN.png`'s
width and height. Draw it generously: everything the item needs (the figure AND
any picture options), nothing from the next item and nothing of the rough-work
box. One region per item; if several items share one figure, give each that
region.

4. Add `"FIGURE"` to `flags`.
5. **If the stem's words are generic** ("Which figure comes next?", "Find the
   mirror image.") and the options are `Figure (1)`-`(4)`, end the stem with a
   short bracketed note naming what the picture shows: `Which figure completes the
   series? [Figure: a series of four squares with a rotating arrow]`. Name the
   objects only; never describe the answer.

A table you can write as a pipe table is NOT a figure: transcribe it.

---

## 6. Shared passages (`context`)

A passage, poem, interview, letter or table that governs SEVERAL items (the
English section prints e.g. "An interview for question No. 02 and 03") goes,
verbatim, in each item's `context` field, with the directions line removed.
**Only material shared by two or more items goes in `context`.** Anything unique
to one item goes in its stem: a question's identity hash EXCLUDES context, so two
items whose stems then read the same collide and one is silently dropped.

---

## 7. Classify every question

Read the catalog file named in your task first. The `subject` is fixed by the
section (section 1 above).

- `subject` and `chapter` are **hard-validated**: copy them exactly, punctuation
  included, from the catalog.
- `subtopic` is soft. Prefer a listed one; if none fits, use a short label.
- If NO chapter fits, use the closest one and say so in `notes` with the item
  number and a suggested chapter name: the catalog is still being settled.
- `difficulty` is `EASY`, `MODERATE` or `HARD`: your honest read for a well
  prepared student of that class. Default `MODERATE`.

---

## 8. Keep the paper's own words

The stem is what a student reads on its own, later, out of the booklet. Keep the
item's instruction words (`Find the value of x.`, `Select the incorrect
statement.`). Drop only the page furniture listed in section 1.

---

## 9. Write files with the Write tool

Write your JSON with the Write tool, never a shell heredoc: a heredoc eats
backslashes, so `\(` and `\frac` arrive corrupted.

**Keep your tool output small**: never print whole files or images back.

Write NO other files and delete nothing. To check your JSON, use a one-line
`node -e "JSON.parse(require('fs').readFileSync('<file>','utf8'))"`.

---

## 10. Before you finish

- Every item number in your band is present exactly once.
- Every question has exactly 4 options, A-D, none blank, and no `answer` field.
- Every two-answer item keeps its printed instruction and has `TWO_ANSWERS`.
- Every `\(` has a matching `\)`; every pipe table has its separator row.
- Every figure item has `figure` + the `FIGURE` flag.
- `subject` and `chapter` are copied exactly from the catalog.
- Your JSON parses.

Report in your final message, briefly: the item numbers you covered, items you
flagged (with why), figure items, and any chapter you wished the catalog had.
