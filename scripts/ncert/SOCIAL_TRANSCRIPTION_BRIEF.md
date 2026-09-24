# CBSE Class 10 Social Science — transcription + answer brief

You are transcribing **one chapter** of an NCERT Class 10 Social Science book into
the PYQ Vault bank, and writing a board-exam model answer for every question.

Read this whole file before you start. It is the contract; an inline prompt is not.

---

## 0. The one thing that makes this lane different

**These four books have no answer key. Not one of them.** Science had
`jesc1an.pdf`; there is no equivalent for History, Geography, Political Science
or Economics. Nothing downstream will catch a wrong answer.

So the standard is **grounding**: every answer you write must be traceable to a
named passage of *its own chapter*, and the trace must resolve against a gate.
That gate is the only thing standing between this corpus and a pile of confident
assertions. Treat a failing citation as a real finding about your answer, not as
an obstacle.

Say "grounded", never "verified". Grounding bounds invention. It does not bound
misreading.

---

## 1. What you are given

You will be told:

- **`<chapterId>`** — e.g. `c10GeoAgriculture`
- the **book** and **chapter number**
- the **subtopics** available for that chapter (use these verbatim; do not invent)

Everything else you find yourself.

---

## 2. Find the questions

Run this first to see the chapter's citable headings:

```
npx tsx scripts/ncert/social-grounding.ts <chapterId> --anchors
```

Then read the chapter PDF. Its path is in `scripts/ncert/config.ts` under your
chapter id.

**The question block is named differently in each book. This is measured, not
guessed:**

| Book | Question block opens with |
|---|---|
| Geography | `EXERCISES` (printed five times on one line) |
| Economics | `EXERCISES`, **plus** in-text `LET'S WORK THESE OUT` **and `LET'S WORK THIS OUT`** boxes |
| Polity | `Exercises` |
| History | **`Write in brief` and `Discuss`** — two separately numbered blocks, and this book never prints the word Exercises |

**Three traps in that table, each measured on the actual files:**

1. **Economics' box heading is not one string. It is two.** 29 boxes say
   `LET'S WORK THESE OUT`; **3 say `LET'S WORK THIS OUT`** (singular) — one in
   Ch.4, two in Ch.5. Match both. A search for only the plural finds 29 boxes,
   reports nothing missing, and silently drops 3 — this is the same defect that
   shipped a short chapter on the Class 10 Science lane, where a probe looking
   for `QUESTIONS` could not see a box headed `QUESTION`. **A heading regex that
   under-matches does not fail; it agrees with you.**

2. **History prints `Discuss` all through the chapter as a marginal activity
   prompt** — Ch.1 has six before the end. The `Discuss` you want is the numbered
   block on the closing page, beside `Write in brief`. Find the two block
   headings on the *same* page and work from there; do not grep the word.

3. **`EXERCISES` is not near the end.** Economics Ch.5 puts it on p13 of 19,
   Ch.1 on p14 of 16 — `ADDITIONAL PROJECT / ACTIVITY` and `APPENDIX` come after
   it. Scan the whole chapter, not the last few pages.

---

## 3. What to ingest, and what to leave out

**Ingest** every numbered question in the block, splitting displayed sub-parts
`(i)`, `(ii)`, `(a)`, `(b)` into **separate rows**.

**Do NOT ingest:**

- **Project / Activity / "find out more" work.** Open-ended fieldwork with no
  answer — "Make a project showing…", "Have a discussion in the class…".
- **Map-marking questions.** "On an outline map of India, mark and label…" needs
  a printable map; a text answer can only list the places, which is not what the
  question asks.
- **Numbered things that are not questions.** Economics Ch.5 pp.8–9 runs a
  `LET'S WORK THIS OUT` comic strip whose panels are numbered 1–9
  ("PRAKASH GOES TO THE POST OFFICE TO…"). It is a narrative sequence, not a
  question block. Puzzle grids are the same — Geography Ch.4's p.41 ACTIVITY is
  a 13×13 word-search that cannot survive as a text stem. **A number at the start
  of a line is not evidence of a question.**

**Do ingest, even though it feels odd:**

- **Opinion questions** — "Which of these three students do you agree with and
  why?". Write a model answer that argues **one** position properly and says in
  one clause that it is one defensible answer among several.

---

## 4. READ THE OPTIONS OFF THE RENDER, NOT THE TEXT LAYER

Geography prints MCQ options in **two columns**:

```
(a) Intensive cultivation        (c) Over irrigation
(b) Deforestation                (d) Overgrazing
```

The text layer emits these in reading order — **(a), (c), (b), (d)** — so
slotting them in the order you receive them mis-assigns every option. Render the
page and read the printed labels.

This is the defect a blind derivation provably cannot catch: your reasoning will
confirm the right *text* sitting under the wrong *letter*, and the check reads as
agreement.

**Settle the layout by geometry, not by eye.** Read the option lines' x/y
coordinates: one column means a single x with strictly increasing y, and then the
text-layer order already IS the printed order. Geography Ch.4 is single-column
and needed no re-slotting; Ch.1 is two-column and needed it for every question.
**The layout varies by chapter, so neither answer may be assumed.**

**Economics MCQs often carry THREE options.** The bank requires exactly four with
exactly one correct, so a three-option MCQ ships as `format: "subjective"` with
the options written into the stem and the correct one named in the solution.

---

## 5. Answer style — BOARD EXAM, not textbook

Write what a candidate should write in the CBSE Class 10 board exam.

- **Honour the printed word limit.** "in about 30 words" means about 30 words.
  "in about 120 words" means about 120.
- **Point-wise** whenever the question asks for factors, reasons, features,
  steps or differences. Number them.
- **Lead with the answer**, then support it.
- **Board terminology.** Use the book's own terms.
- **No teaching asides.** Do not explain why the concept matters, do not address
  the reader, do not add "remember that…". This is a deliberate break from the
  Class 10 Science lane, whose answers are explanatory.
- A **comparison** question gets a table. A **define** question gets a sentence.

---

## 6. Citations — the exact format

Every row carries a `groundedIn` string. The gate parses it.

```
§ Major Crops — the chapter's list of kharif and rabi crops
```

Rules, each of which has already caught a real mistake:

1. **`§` then the heading, exactly as the `--anchors` list prints it** (case and
   punctuation are normalised for you, so `Why Non-cooperation?` matches
   `why non cooperation`).
2. **Separate multiple citations with a semicolon — never the word "and".** A
   heading citation runs until an em dash or a semicolon, so
   `§ Land Utilisation and § Land Use Pattern in India` is read as ONE run-on
   heading and resolves against nothing. Write
   `§ Land Utilisation; § Land Use Pattern in India — …`.
3. **Figures and tables are citable**: `Fig. 1.4`, `Table 1.2`. They are
   chapter-filtered, so `Fig. 3.2` will not resolve inside Chapter 1.
4. **Cite only THIS chapter.** These books cross-reference each other freely.
   If your answer genuinely rests on another chapter's fact, either ground it in
   what this chapter says, or drop the claim. Do not weaken the citation.
5. **Some headings arrive split across two lines** — the anchor list may show
   `types and distribution of forest and` and `wildlife resources` separately.
   Cite whichever fragment the list actually contains.
6. **A sub-heading smaller than the body text is not an anchor.** Geography's
   soil types ("Black Soil", "Alluvial Soils") are set smaller than body, so they
   are not citable — cite the parent, `§ Classification of Soils`.

`groundedIn` never reaches the bank. `buildRecords` assembles from named fields,
so it is an authoring artifact, checked and then inert.

---

## 7. The file you write

**One file, and only this file:**

```
scripts/ncert/data/<chapterId>.exercise.json
```

(Economics also writes `<chapterId>.intext.json` for the LET'S WORK boxes.)

**Do not write any other file into `scripts/ncert/data/`.** `merge.ts` globs
`data/<id>.*.json`, so a stray scratch file is silently swept into the chapter.

### Row shape

Subjective:

```json
{
  "ref": "Ex 4 Q2 (i)",
  "bucket": "exercise-subjective",
  "format": "subjective",
  "subtopic": "Major Crops",
  "difficulty": "MODERATE",
  "context": "Answer the following questions in about 30 words.",
  "stem": "Name one important beverage crop and specify the geographical conditions required for its growth.",
  "solution": "**Tea** is an important beverage crop.\n\nConditions required:\n\n1. ...",
  "groundedIn": "§ Major Crops — the chapter's account of tea cultivation"
}
```

MCQ — same, plus:

```json
{
  "bucket": "exercise-mcq",
  "format": "mcq",
  "options": [
    { "label": "A", "text": "..." },
    { "label": "B", "text": "..." },
    { "label": "C", "text": "..." },
    { "label": "D", "text": "..." }
  ],
  "answer": "C"
}
```

### Refs

| Block | Ref |
|---|---|
| Exercises (Geo · Polity · Econ) | `Ex <ch> Q<n>` / `Ex <ch> Q<n> (i)` |
| History "Write in brief" | `WB <ch> Q<n>` |
| History "Discuss" | `DS <ch> Q<n>` |
| Economics in-text box | `LW <ch>.<box> Q<n>` |

History's two blocks both number from 1 — that is why they need different
prefixes. A single `Ex` prefix would collide and lose a question at merge.

### Other fields

- `context` — the shared lead-in when sub-parts split ("Answer … in about 30
  words."). Omit when the stem stands alone.
- `difficulty` — `EASY` | `MODERATE` | `HARD`.
- `subtopic` — exactly one of the values you were given.
- Tables use GFM pipe-tables **with the `|---|` separator row**. Without it the
  renderer prints raw pipes.
- No literal `\n` two-character sequences — `commitStaged` rejects the row.

---

## 8. Check your own work before reporting

```
npx tsx scripts/ncert/merge.ts <chapterId> exercise
npx tsx scripts/ncert/social-grounding.ts <chapterId>
```

The gate exits 1 on any unresolved or missing citation. **Fix your rows until it
exits 0.** Do not report done with a red gate, and do not "fix" it by deleting a
citation — an uncited answer fails too, and correctly.

## 9. What to report back

- row count, split by MCQ / subjective
- the gate's final line
- **anything you could not ground, and what you did about it**
- any question you deliberately skipped, and why
- anything the book prints that looks wrong
