# RAS transcription brief

You are transcribing a **band** of pages from a scanned RPSC RAS/RTS Prelims
booklet ("General Knowledge and General Science", 150 items) into JSON, in
**both languages it is printed in**. Read this whole file before starting.

All paths below are under `C:\Users\vilas\Downloads\qb-ras\scripts\ras\`.

**You transcribe. You do NOT answer.** Do not supply an answer or a hint, and do
not look for an answer key anywhere. A separate blind pass derives every answer
later, and it must not be anchored by a guess of yours.

---

## 1. Your inputs

For each page index `NN` in your band, in `out/<paperId>/`:

| file | holds |
|---|---|
| `pNN-c1.png` | the **LEFT column: HINDI**. Transcribe the Hindi version from here |
| `pNN-c2.png` | the **RIGHT column: ENGLISH**. Transcribe the English version from here |
| `pNN.png` | the whole page: structure, figures, anything that spans the rule |

Every item is printed twice on the same page, side by side, with the same item
number. **Check which side is which on your first page**: Hindi is on the left
in 2023 and 2024, but the 2021 booklet prints ENGLISH on the left. Read each
language from the column that actually prints it, and say which way round your
pages were in `bandReport.notes`. You transcribe BOTH into one
question object.

The column split was found automatically. The right column's item numbers hang
into the gutter, so `c1` sometimes shows the English numbers along its right
edge: ignore them. **If a crop looks sliced (a line cut down its middle, words
missing at an edge), say so in `bandReport.notes` and read that page from
`pNN.png`.**

A rubber-stamped serial number (digits like `647213`) is printed down the
middle of many pages. It is not part of any question: never transcribe it.

---

## 2. Your output

Write exactly one file: `data/<paperId>.<band>.json`

```json
{
  "band": "b1",
  "pages": [1, 2, 3, 4, 5, 6, 7, 8],
  "bandReport": {
    "numbersFound": [1, 2, 3],
    "itemsByPage": { "1": [1, 2, 3, 4], "2": [5, 6, 7, 8, 9] },
    "firstComplete": true,
    "lastComplete": true,
    "notes": ""
  },
  "questions": [ ...see section 4... ]
}
```

`bandReport`:
- `numbersFound`: every item number you actually saw, in order.
- `itemsByPage`: **one key per page in your band, including any page you found
  empty.** Fill it in page by page as you read, never reconstruct it at the end.
- `firstComplete` / `lastComplete`: is the first/last item **whole** on your
  pages, or does it start before / continue after them?
- `notes`: sliced crops, a defective question, an unreadable word, a number skipped.

---

## 3. Report on territory you do not own

If your first page opens mid-item, or your last page ends mid-item, transcribe
that item anyway (open the neighbouring page) and say so in `notes`. A question
in two bands is fine (the merge dedupes it); a question in no band is a silent gap.

---

## 4. One question object

ENGLISH goes in the top-level fields (it is the canonical version: the booklet
says the English version is standard where the two differ). HINDI goes in `hi`.

This is item 9 of the 2024 booklet, transcribed correctly:

```json
{
  "number": 9,
  "stem": "Match List - I with List - II and select the correct answer from the codes given below :\n\n| List - I (District) | List - II (River) |\n|---|---|\n| A. Udaipur | i. Sabi & Ruparel |\n| B. Bundi | ii. Gambhiri & Parvati |\n| C. Bharatpur | iii. Som & Jakham |\n| D. Alwar | iv. Kural |",
  "options": [
    { "label": "A", "text": "A-iii, B-iv, C-i, D-ii" },
    { "label": "B", "text": "A-iv, B-iii, C-ii, D-i" },
    { "label": "C", "text": "A-i, B-iii, C-ii, D-iv" },
    { "label": "D", "text": "A-iii, B-iv, C-ii, D-i" }
  ],
  "hi": {
    "stem": "सूची-I को सूची-II से सुमेलित कीजिये तथा नीचे दिये गये कूट से सही उत्तर का चयन कीजिये :\n\n| सूची-I (जिला) | सूची-II (नदी) |\n|---|---|\n| A. उदयपुर | i. साबी तथा रूपारेल |\n| B. बूँदी | ii. गम्भीरी तथा पार्वती |\n| C. भरतपुर | iii. सोम तथा जाखम |\n| D. अलवर | iv. कुराल |",
    "options": [
      "A-iii, B-iv, C-i, D-ii",
      "A-iv, B-iii, C-ii, D-i",
      "A-i, B-iii, C-ii, D-iv",
      "A-iii, B-iv, C-ii, D-i"
    ]
  },
  "subject": "Rajasthan Geography",
  "chapter": "Rivers, Lakes and Water Resources",
  "subtopic": "River Systems",
  "difficulty": "MODERATE",
  "flags": []
}
```

- `options`: English, exactly 4, labels `A` `B` `C` `D` for the printed
  `(1) (2) (3) (4)`, **in printed order. Never reorder.**
- `hi.options`: the Hindi option texts, 4 plain strings, in the same order.
- **Drop option (5)** "Question not attempted" / "अनुत्तरित प्रश्न" (printed from
  2023 on). It is an answer-sheet rule, not part of the question.
- A "Codes :" / "कूट :" grid becomes the four options written out as
  `A-iii, B-iv, C-i, D-ii`, and the "Codes :" heading line is dropped.
- `hi.context`: only if the item has a shared `context` (section 7); then give
  the Hindi of it too.

---

## 5. Transcribe what is printed

**Verbatim, in each language.** Do not correct spelling, grammar, arithmetic or
facts, in either language. If the booklet prints something wrong, record it and
say so in `notes`.

- **Do not translate.** Each language is read from its own column. Never fill a
  Hindi field by translating the English, or the reverse. If one language is
  unreadable at a spot, write `[illegible]` there and note it.
- Hindi keeps its own spelling, nukta, chandrabindu and punctuation (`।`).
  Digits stay as printed: Arabic digits where the page prints Arabic digits.
  `₹` stays `₹`.
- Numbered statements (`1.`, `2.`, `(i)`, `(ii)`, `A.`) are part of the **stem**,
  each on its own line. A closing line like "Which of the statements given above
  is/are correct?" stays in the stem.
- Collapse the ragged line-wrapping of ordinary prose into normal sentences.
- If two options are genuinely identical, transcribe both and flag it in `notes`.

**Where the two languages SAY different things** (a different place name, a
"not" in one only, a different number), transcribe BOTH as printed and add a
`printNote` to the question, one plain English sentence:
`"printNote": "The Hindi version says 'Sikar' where the English says 'Jhunjhunu'."`
Do not decide which is right.

**Underlined words** (an underlined "not" / "नहीं", an underlined species name)
are written `\(\underline{\text{not}}\)` in the ENGLISH fields; italic
underline is `\(\underline{\textit{Plasmodium}}\)`. In the HINDI fields write
the word plain (`नहीं`), with no underline markup: Devanagari inside maths
markup does not render reliably.

**Maths and symbols.** LaTeX inline delimiters `\( ... \)` for anything
mathematical: `\(x^2\)`, `\(\frac{1}{2}\)`. Every `\(` needs a matching `\)`.
Plain prose and plain numbers stay plain (`₹ 1,000`, `21%`).

**Tables.** A List-I / List-II match or a data table is a GitHub pipe table
**including the `|---|---|` separator row**, as in item 9 above. The column
headers carry the bracketed labels: `| List - I (District) | List - II (River) |`.
A List-II with MORE entries than List-I gets empty left cells: `| | v. Date-palm |`.

---

## 6. Figures

Some items cannot be answered from text alone: counting triangles, a map, a
chart, a figure series. For each such item:

1. Transcribe every word printed, in both languages.
2. If the OPTIONS are pictures, write them as `"Figure (1)"` ... `"Figure (4)"`
   in both `options` and `hi.options`.
3. Add a `figure` field locating the picture on the WHOLE-page image `pNN.png`,
   preferring the copy in the ENGLISH (right) column:

```json
"figure": { "page": 25, "region": [0.55, 0.62, 0.95, 0.82], "note": "triangle figure for counting" }
```

`region` is `[left, top, right, bottom]` as fractions (0 to 1) of `pNN.png`'s
width and height. Everything the item needs, nothing from the next item. If the
figure carries WORDS (labels), say so in `note`; if the stamped serial number
crosses it, add `"watermark": "serial stamp crosses the figure"`.

4. Add `"FIGURE"` to `flags`.

A table you can write as a pipe table is NOT a figure: transcribe it.

---

## 7. Shared material (`context`)

Rare in this paper. Only material shared by **two or more** items (one passage
or data table governing several questions) goes in `context`, verbatim, with
the directions line removed, and its Hindi in `hi.context`. Anything unique to
one item goes in its stem: the identity hash is stem + options + answer and
EXCLUDES context, so two items whose stems then read the same collide and one
is silently dropped. Most items have no context. Do not invent one.

---

## 8. Classify every question

`subject`, `chapter` and `subtopic` come from `catalog.json`. **Read it first.**

- `subject` and `chapter` are **hard-validated**: copy the strings exactly, and
  the chapter must belong to that subject. `subtopic` is soft: prefer a listed
  one; if none fits, write a short label of your own.
- **Rajasthan first.** An item about Rajasthan goes in a Rajasthan subject even
  when the topic also exists nationally:
  - its rulers, forts, art, painting, music, dance, fairs, saints, deities,
    literature, freedom movement -> `Rajasthan History, Art and Culture`
  - its physiography, rivers, lakes, soils, climate, wildlife sanctuaries,
    crops, livestock, minerals, energy, industries, tribes, districts -> `Rajasthan Geography`
  - its Governor, Assembly, High Court, Panchayati Raj, RPSC, state commissions,
    administration -> `Rajasthan Polity and Administration`
  - its budget, economy, state schemes and projects -> `Rajasthan Economy`
- Not about Rajasthan specifically: `History`, `Geography`, `Polity and
  Governance`, `Economy`, `Environment and Ecology`, `Physics`, `Chemistry`,
  `Biology`, `Computer Knowledge`; news of the last year or two (national or
  world) -> `Current Affairs and IR`; reasoning -> `Logical Reasoning and
  Analytical Ability` or `General Mental Ability`; arithmetic -> `Basic
  Numeracy`; tables and charts -> `Data Interpretation and Data Sufficiency`.

`difficulty`: `EASY`, `MODERATE` or `HARD`, your honest read for a prepared
candidate. Default `MODERATE`.

---

## 9. Write files with the Write tool

Write your JSON with the Write tool, never a shell heredoc: a heredoc eats
backslashes, so `\(` and `\frac` arrive corrupted and nobody can see it. Write
Hindi as real Devanagari characters, never `\u` escapes.

**Keep your tool output small**: do not print whole files or images back.

Write NO other files (no temp scripts, no crops) and delete nothing. To check
your JSON, use a one-line `node -e` that reads it. To look closer at a spot,
view the existing page or column image; do not save crops.

---

## 10. Before you finish

- Every item number in your band is present exactly once.
- Every question has 4 English options A-D and 4 `hi.options`, none blank,
  no option (5), and no `answer` field.
- Every `\(` has a matching `\)`; every pipe table has its separator row, in
  both languages.
- Every figure item has `figure` + the `FIGURE` flag.
- `subject` and `chapter` are copied exactly from `catalog.json`.
- Your JSON parses: `node -e "JSON.parse(require('fs').readFileSync('<file>','utf8'))"`.

Report in your final message, briefly: the item numbers you covered, items you
flagged, figure items, `printNote` items, and any page whose crop you worked around.
