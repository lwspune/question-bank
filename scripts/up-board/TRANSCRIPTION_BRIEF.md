# UP Board PYQ: transcription brief

You transcribe ONE UP Board (UPMSP) question paper into JSON: every question in
English AND in its Hindi print. You do NOT solve anything. Read this whole file
first. Keep your tool output small (no dumping whole files back to yourself).

Your output is a data file plus a short report (at most 15 lines).

## 1. What you are given

- `scripts/up-board/out/<paperId>/pNN.png`: every page of the scan, 150 dpi,
  1-based. `contact.png` beside them is a thumbnail sheet of the whole paper:
  start there.
- `npx tsx scripts/up-board/catalog.ts <subject>`: the chapters and subtopics
  you may use. Copy names EXACTLY.
- You WRITE `scripts/up-board/data/<paperId>.questions.json`, then run
  `npx tsx scripts/up-board/validate.ts <paperId>` until it prints `ok`.

Write the file with the Write tool. Never through a shell heredoc (the shell
eats backslashes, so `\theta` arrives broken).

## 2. The scan

- A scan of the board's printed paper, no text layer. Read the images.
- **Every question is printed twice: Hindi, then English.** Two layouts exist:
  12 pages (a whole section in Hindi, then the same section in English) and 8
  pages (each question in Hindi, then in English). Find which yours is on the
  contact sheet, then confirm at full size.
- **Account for every page.** Pages print `[N of M]` at the foot. If a page is
  missing, or one language of any question is missing, STOP: write no file and
  report which pages are missing. A paper without its English is left out on
  purpose (owner's rule); do not translate anything yourself.
- **Ignore everything the board did not print:**
  - the hoster's address `https://www.upboardonline.com`, which is stamped in
    the footer and sometimes INSIDE a question's text;
  - rubber-stamped serial numbers running down the page;
  - a student's ticks, circles and pen marks on options. **A tick is never an
    answer.**

## 3. Transcribe as printed

Never correct a question to what it "obviously" meant. If something looks
wrong (a dropped sign, an option that matches nothing, Hindi and English
saying different things), transcribe each language as printed and add `_flag`
with one plain sentence about what you saw. If a digit is unreadable in one
language, the other language usually settles it: say so in `_flag`.

## 4. Rows

- **Section A (MCQs):** one row per question. `ref` `"Q1"`..`"Q20"`.
- **Written questions:** one row per lettered part: `(a)`/`(क)`, `(b)`/`(ख)`,
  ... A part's own sub-items `(i)`, `(ii)` stay inside that row's stem.
  `ref` like `"B1a"`, `"B2f"`. A question with no lettered parts is one row,
  `"B3"`.
- **"Do any five parts"**: transcribe ALL the parts printed.
- **OR (अथवा)**: ingest BOTH. The first keeps its ref (`"B3a"`), the
  alternative gets the next (`"B3b"`) plus `"alternativeTo": "B3a"`.
- **`questionNumber`** is what a student sees, in English form. If the paper
  numbers each section from 1 (Class 10 does), prefix the section letter on
  written questions: `"B1 (a)"`, `"B3"`, and `"B3 (OR)"` for the alternative.
  Section A stays `"1"`..`"20"`. If a paper numbers straight through, use the
  printed number: `"5 (b)"`.
- MCQ options printed `(A)-(D)` or `(i)-(iv)` are stored in printed order as
  labels `A`..`D`.
- `marks`: the marks printed against that row (for an MCQ, 1).

## 5. Fields

```json
{
  "paper": "822-BW",
  "year": 2025,
  "subject": "maths10",
  "pages": "1 cover; 2-4 Section A Hindi; 5-7 Section A English; 8-12 Section B, each part Hindi then English",
  "questions": [
    {
      "ref": "Q2",
      "questionNumber": "2",
      "section": "A",
      "marks": 1,
      "format": "mcq",
      "chapter": "Probability",
      "subtopic": "Probability with Cards, Dice and Coins",
      "difficulty": "EASY",
      "stem": "A die is thrown once, then the probability of getting an odd number will be :",
      "options": [
        { "label": "A", "text": "\\(\\frac{1}{6}\\)" },
        { "label": "B", "text": "\\(\\frac{1}{2}\\)" },
        { "label": "C", "text": "\\(\\frac{1}{3}\\)" },
        { "label": "D", "text": "1" }
      ],
      "hi": {
        "stem": "किसी पासे को एक बार फेंका जाता है, तो एक विषम संख्या के आने की प्रायिकता होगी :",
        "options": ["\\(\\frac{1}{6}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{1}{3}\\)", "1"]
      }
    },
    {
      "ref": "B1f",
      "questionNumber": "B1 (f)",
      "section": "B",
      "marks": 2,
      "format": "subjective",
      "chapter": "Probability",
      "subtopic": "Probability from a Collection of Objects",
      "difficulty": "EASY",
      "stem": "A box contains 4 red marbles, 8 white marbles and 5 green marbles. One marble is taken out from the box at random. What is the probability that the marble taken out will be\n(i) red ?\n(ii) not green ?",
      "hi": {
        "stem": "एक डिब्बे में 4 लाल कंचे, 8 सफेद कंचे तथा 5 हरे कंचे हैं। इस डिब्बे में से एक कंचा यादृच्छया निकाला जाता है, तो इसकी क्या प्रायिकता होगी कि निकाला गया कंचा\n(i) लाल है ?\n(ii) हरा नहीं है ?"
      }
    }
  ]
}
```

(The page in `"pages"` is your page map: say what each page carries.)

- `format`: `"mcq"` or `"subjective"`. Never write `answer` or `solution`.
- `context`: only for text several rows share (a passage, a data table both
  parts use), in both languages or neither.
- `difficulty`: `EASY` (one step, recall), `MODERATE` (a few steps, the usual
  board question), `HARD` (long, or a trap). Judge for a Class 10/12 board
  student.
- `figure`: when the question needs its printed figure (a diagram, a graph, a
  circuit): `{ "page": <the ENGLISH print's page>, "region": [left, top,
  right, bottom] as fractions of that page, "note": "what it shows" }`. Keep
  every label inside the box; leave the question text out. Then CHECK it:
  run `py scripts/up-board/crop.py <paperId>` and look at
  `out/<paperId>/_figures.png`. No line of question or option text may show
  above, below or beside the figure, and no label may be clipped; move the
  region and re-run until both hold. Where a stamp crosses the figure and the
  other language prints a clean copy, point the region at that copy and say so
  in `note`. A figure only
  printed once (shared by both languages) is fine: give that page. Write the
  stem as printed; a figure's labels do not go into the text.
- `_flag`: optional, one plain sentence.

## 6. Text rules

- **Maths in `\( ... \)`**, both languages, bank-wide convention. Not `$`.
  Fractions `\frac{}{}`, roots `\sqrt{}`, degrees `60^\circ`, vectors
  `\vec{a}`, unit vectors `\hat{i}`, matrices `\begin{bmatrix}`, determinants
  `\begin{vmatrix}`. A plain number or unit outside an expression can stay
  plain text (`21 cm`). Balance every `\(` with `\)`.
- In Hindi, keep the maths exactly as in English, so numbers agree across
  languages (validate.ts warns where they differ: look again at both pages).
- **Hindi in Unicode Devanagari** as printed (`सेमी`, not "cm", if the Hindi
  prints सेमी).
- **Tables** as GFM pipe tables: a header row, then a `|---|---|` row, then
  data rows.
- A line break inside a field is a real newline (`\n` in JSON), never the two
  characters backslash and n inside the text.
- Chemistry: formulas in maths, `\(\mathrm{H_2SO_4}\)`, arrows
  `\(\rightarrow\)`.

## 7. Chapter and subtopic

From `catalog.ts` only. A board paper covers the whole syllabus; pick the
chapter the question TESTS. If nothing fits, use the closest subtopic and say
so in `_flag`; never invent a name.

## 8. Report (at most 15 lines)

- the page map and layout (12-page or 8-page);
- row counts: MCQ, written, OR alternatives; marks total of Section A and B as
  printed;
- every `_flag`, one line each;
- figures: which refs;
- the last line `validate.ts` printed.

## 9. Class 10 Science (824)

Measured on 2025 CM. Check it on your paper; report anything different.

- **Part A (खण्ड-अ)**: 20 MCQs, numbered 1-20 straight through three
  sub-sections (Physics, Chemistry, Biology). Refs `Q1`..`Q20`, questionNumber
  `"1"`..`"20"`, section `"A"`. Exactly 20 MCQs (validate.ts checks).
- **Part B (खण्ड-ब)**: written questions numbered 1-11 straight through the
  same three sub-sections. Parts are printed `(i)`, `(ii)`. One row per part:
  ref `B1i`, `B1ii`, questionNumber `"B1 (i)"`, `"B1 (ii)"`, section `"B"`. A
  question with no parts is one row, `B9`, `"B9"`. Sub-items inside a part
  (`(a)`, `(b)`, `(c)`, marked e.g. `1 + 1 + 1`) stay inside that row's stem.
- **A question that is a list of separate items** ("Write short notes on
  (i) ... (ii) ...", "Write the structural formulas of (i) ... (ii) ...",
  "any two of the following") is split: one row per printed item, `B9i`,
  `B9ii`, each with its own chapter, its share of the marks, and the shared
  instruction repeated at the start of its stem in both languages ("Write a
  short note on: Food chain"). "Any two" keeps every item, like Maths' "do any
  five". (Decided 2026-11-17 after CM/CJ split and CN/CK kept one row.)
- **OR** can sit on a whole question or on one part. The alternative gets
  `OR` added: ref `B4iiOR`, questionNumber `"B4 (ii) (OR)"`,
  `"alternativeTo": "B4ii"`; for a whole question `B11OR`, `"B11 (OR)"`.
- Chemistry: formulas and equations in maths, `\(\mathrm{CaSO_4 \cdot \frac{1}{2}H_2O}\)`,
  states as printed `\(\mathrm{(aq)}\)`, arrows `\(\rightarrow\)`. A circuit,
  ray diagram or labelled organ is a `figure`.
- Chapter: the one the row TESTS. A Science paper may examine a topic the
  current NCERT book dropped (e.g. Periodic Classification, Sources of Energy,
  Management of Natural Resources). If no catalog chapter fits, use the closest
  and put `NO CHAPTER: <topic>` at the start of `_flag`: the main session adds
  the chapter UP still teaches.
