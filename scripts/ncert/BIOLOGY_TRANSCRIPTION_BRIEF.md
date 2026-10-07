# CBSE Class 11 + 12 Biology — transcription + answer brief

You are transcribing **one chapter** of the NCERT Class 11 or Class 12 Biology book
into the PYQ Vault bank, and writing a CBSE board-exam model answer for every
question.

Read this whole file before you start. It is the contract; an inline prompt is not.

---

## 0. The one thing that makes this lane different

**NCERT publishes no answer key for Biology.** Not for any chapter of either book.
Nothing downstream will catch a wrong answer.

So the standard is **grounding**: every answer you write must be traceable to a
named passage of *its own chapter*, and the trace must resolve against a gate.
Treat a failing citation as a real finding about your answer, not as an obstacle.

Say "grounded", never "verified". Grounding bounds invention. It does not bound
misreading.

---

## 1. What you are given

- **`<chapterId>`**, e.g. `c11BioExcretoryProductsAndTheirElimination`
- the **class** and **chapter number**
- the chapter's **subtopics** (in `scripts/ncert/config.ts`; use them verbatim, never invent one)

The chapter PDF path is in `config.ts` too (`kebo1NN.pdf` = Class 11, `lebo1NN.pdf` = Class 12;
the file number is the chapter number).

---

## 2. Find the questions

First, see what this chapter lets you cite:

```
npx tsx scripts/ncert/science-grounding.ts <chapterId> --anchors
```

Then render the pages and read them:

```
npx tsx scripts/ncert/render.ts <chapterId>      # (prefix any Python text dump with PYTHONIOENCODING=utf-8; the console codepage crashes on U+2212) → scripts/ncert/out/<chapterId>/p-00.png, p-01.png … (0-based, zero-padded)
```

Every chapter has **exactly one** question block: `EXERCISES`, at the end, and it
is the only thing you ingest. There are no worked examples. (Class 11 Ch.10 alone
carries two unnumbered margin prompts, p.1-2; they are out of scope by decision,
so leave them.)

A trailing instruction printed after the sub-parts ("Draw a diagram to illustrate
your answer.") belongs in the shared `context`. When a drawing item is split into
sub-parts, each sub-part row may list the same figure PNG (one manifest entry per
ref). The block often runs over a
page break, and the running head (`2024-25`, a page number, `BIOLOGY`) sits in the
middle of it. **Count the items off the render, and confirm the last number you
transcribed is the last number printed.** A page-scoped read that stops at the
page break drops the tail silently.

The text layer is clean prose and a fine checklist, but read structure (which
sub-part belongs to which item, table layout, option columns) off the render.

---

## 3. What to ingest, and what to leave out

**Ingest** every numbered item, splitting displayed sub-parts `(a)`, `(b)`, `(i)`,
`(ii)` into **separate rows** that share a `context` (the item's lead-in) and a
`setLabel` (`"Ex 16 Q3"`).

**Do NOT ingest open-ended activities** with no answer a student could be marked
on: "Try to collect all the currently accepted meanings for the word 'species'.
Discuss with your teacher…", "Organise a discussion…", "Visit…", "Collect…". List
each skip in your report with its number and the reason. **The test is the
answer, not the verb:** a "Find out what X signifies" item that THIS chapter
answers is a question; ingest it. A research PROJECT ("using the library or the
internet, trace…", "find out from newspapers…") stays skipped even when a standard
answer exists elsewhere: the BEYOND CHAPTER rule completes an answer the chapter
mostly gives, it does not author a whole project. A SHORT factual question whose
topic the rationalised edition cut (single-cell protein, photoperiodism) may be
answered wholly from standard facts, tagged.

**When the BOOK's own prose is wrong** (it calls the mould Monascus purpureus "the
yeast"), never repeat the error in a solution: state it correctly and name the
book's wording in a clause.

**When the question needs a fact the chapter does not hold** (the rationalised
2024-25 edition cut content its own exercises still ask about; Class 11 Ch.3 Q5
asks for gymnosperm uses and the chapter gives none), the owner's rule
(2026-10-07) is: **write the standard, uncontroversial textbook fact so the answer
is complete, and mark it.** Marking means the row's `groundedIn` note contains
`BEYOND CHAPTER:` followed by exactly the facts that came from outside, e.g.
`§3.4 — gymnosperm genera; BEYOND CHAPTER: timber, resin and turpentine, chilgoza seeds`.
That tag is how every outside fact gets listed for review later, so use it every
time, spelled exactly so. Rules that still hold:

- The row must still cite at least one real anchor of THIS chapter; the gate
  checks that.
- Only standard facts found in any Class 11/12 text. Anything contested, recent,
  or a number you are not sure of: leave it out.
- Never pad with a fact that is not what was asked.
- Reasoning FROM the chapter's facts (why arthropods are the largest group) is
  normal answering, not an outside fact; no tag needed.

**How each item type ships:**

| Type | Ships as |
|---|---|
| Written answer (define, explain, describe, why, differentiate) | `subjective` |
| **True / false** set | one `subjective` row per statement; solution opens `**True.**` or `**False.**` and, when false, gives the corrected statement |
| **Correct the following statements** | one `subjective` row per statement, sharing a context; solution opens `**Corrected:**` + the corrected statement, then one or two lines of support |
| **Match the columns** | ONE `subjective` row: the two columns as a GFM table in the stem (printed labels, misprints included), the matched pairs as a table in the solution using CORRECTED labels, with one sentence naming any correction. Do not split. Its subtopic is the one most of its pairs rest on |
| **Fill in the blanks** | one `subjective` row per blank-sentence; the solution gives the word(s) in **bold**, then the completed sentence |
| **Name the following** | one `subjective` row per sub-part |
| **Draw / sketch a diagram** | `subjective`; solution = a labelled description of the diagram (parts, positions, labels a marker looks for), PLUS the book's own figure attached (§6) |
| A choice with **2 or 3** options (e.g. Class 11 Ch.1 Q5, Q7) | `subjective`, options written into the stem, the correct one named first in the solution. The bank cannot hold an MCQ without exactly four options |
| A choice with **4** options, **one** correct | `mcq` with `options` A–D and `answer` |
| A choice with **more than one** correct option | `subjective`, options in the stem, every correct choice named |

---

## 4. Transcribe the stem AS PRINTED, defects included

Reproduce misspellings and misprints exactly. Class 11 Ch.16 Q7 labels two Column-I
rows `(d)`; keep both `(d)`s in the stem and say so in the solution. Put every
correction in the `solution`, never in the `stem`, for two reasons:

1. A student reading `/board` has the book open. A stem that disagrees with their
   copy reads as *our* error.
2. **`content_hash` is computed from the stem.** A silently corrected stem hashes
   differently from the same question re-ingested later, so it **duplicates**
   instead of deduping.

Layout artifacts are NOT defects and should be cleaned: justification gaps, a
hyphen inserted by line-breaking, a heading split across lines, the running head.

**These typographic choices are fixed, because `content_hash` covers the stem and
a re-ingest must hash the same way:**

- **Quotes and apostrophes are STRAIGHT** (`'` and `"`), never the book's curly
  ones, in stem, context and solution.
- **A blank is exactly seven underscores**, `_______`, one per gap, whatever
  length the book prints.
- **A space before punctuation stays as printed** ("true or false :", "why ?").
  It is the book's text, not a layout artifact.
- **Subscripted names are LaTeX:** `\(\text{C}_3\)`, `\(\text{C}_4\)`,
  `\(\text{G}_1\)`, `\(\text{CO}_2\)`, in stems and solutions alike. **Ion charges
  too:** `\(\text{Na}^+\)`, `\(\text{Ca}^{++}\)` (the charge exactly as printed).
  **Genetics:** `\(\text{F}_1\)`, `\(\text{F}_2\)`, a cross sign is `\(\times\)` (never
  the bare × character), blood-group alleles `\(\text{I}^{\text{A}}\)`; genotypes
  stay plain letters (Tt, RrYy) and ratios plain text ("9:3:3:1").

**Building the JSON from a Python script:** never put LaTeX in an f-string or a
normal string (`"\text"` becomes a TAB plus "ext"); use raw strings or build the
rows with the Write tool. And never `.replace()` a bare token like `{NADH}`; it
also matches inside `\text{NADH}`.

**Scientific names: plain text, no italic markup.** The renderer has no italic
outside math, so `*Homo sapiens*` would print its asterisks. Keep the book's
capitalisation exactly; for Ch.1 Q5 it is the whole question.

---

## 5. Answer style — CBSE board exam

Write what a candidate should write in the CBSE Class 11/12 Biology paper.

- **Lead with the answer**, then support it.
- **Point-wise** for features, functions, differences, steps, roles. Number them.
- A **comparison** ("differentiate", "give comparison between") gets a table with
  the basis of difference in the first column.
- A **define** question gets one or two sentences.
- **The book's own terms**, spelled as the book spells them.
- **Length follows the ask:** "name", "define", "what is meant by" → short;
  "describe", "explain", "give an account of" → a full answer (roughly 80–150 words).
- **No teaching asides.** No "remember that…", no addressing the reader.
- Use `**bold**` for the key term(s) a marker looks for.
- **No em dashes (—), and no spaced " – " or " -- ", in a SOLUTION** (owner
  rule: they read as AI-written). A stem or context keeps the dash the book
  prints: source text keeps its own dashes. Use a full stop, colon, comma
  or brackets. The em dash inside `groundedIn` is required and fine; that field
  never reaches the bank.
- **"Name the following"**: the name in bold, then one line identifying it
  ("**Vasa recta**: the capillary loop running parallel to Henle's loop.").
- **Difficulty:** `EASY` for define / name / true-false / fill-in / a single
  recalled fact; `MODERATE` for explain / describe / a mechanism in steps / a
  comparison; `HARD` only where the answer joins several sections or needs
  reasoning the book does not spell out.
- **Floral formulas** in LaTeX, e.g. `\(\oplus\, K_{(5)}\, \widehat{C_{(5)}\, A_{5}}\, \underline{G}_{(2)}\)`:
  `\oplus` = actinomorphic; write "zygomorphic" and "bisexual" in words (KaTeX
  has no reliable glyph for either); brackets = fusion; `\widehat{}` =
  epipetalous; `\underline{G}` = superior ovary, `\overline{G}` = inferior.
- Chemistry inside Biology (glycolysis, Krebs, photosynthesis equations) uses
  LaTeX in `\(...\)`: `\(\text{C}_6\text{H}_{12}\text{O}_6\)`, `\(\text{CO}_2\)`.

---

## 6. Figures

**A stem that needs a figure** (Class 11 Ch.11 Q8: "Figure 11.10 shows…"): write
`scripts/ncert/data/<chapterId>.fig.json` with the figure's page and box, so
`attach-images.ts` can crop it onto the question:

```json
[{ "ref": "Ex 11 Q8 (a)", "fig": "Fig. 11.10", "page": 7, "bbox": [0.12, 0.40, 0.88, 0.70] }]
```

`page` is 0-based; `bbox` is `[x0, y0, x1, y1]` as fractions of the page. Give an
entry for EACH sub-part row that needs the figure.

**A draw-a-diagram item:** crop the book figure that answers it to
`scripts/ncert/out/<chapterId>-diagrams/<ref with spaces as _>.png` (PyMuPDF,
150–200 dpi, the figure and its labels only, no caption) and list it in
`scripts/ncert/data/<chapterId>.solution-images.json`:

```json
[{ "ref": "Ex <ch> Q<n>", "png": "scripts/ncert/out/<chapterId>-diagrams/Ex_<ch>_Q<n>.png",
   "fig": "Fig. <ch>.<k>", "page": <0-based page>, "bbox": [x0, y0, x1, y1] }]
```

**One PNG per row** (the attach script rejects a repeated ref): when an item asks
for two diagrams, STACK both figures vertically (never side by side: students read
on phones, where a wide image scales down until its labels are unreadable) in ONE
PNG, and record the second
crop in an extra `"also": {"fig", "page", "bbox"}` field. Keep each PNG under
~900 KB (the upload bucket rejects ~1.5 MB+); a 256-colour palette is lossless
enough for these flat drawings. When the caption is cropped off, the solution must
name each panel ("Book figure attached: (a) T.S. of dicot root, (b) …"). When no
figure in the chapter answers a drawing item, describe the labelled diagram in
words and attach nothing.

Open the PNG and look at it before you list it. If a sub-panel crop cannot avoid
a neighbouring panel's label, white the stray label out in the PNG and say so in
your report. If no figure in the chapter
answers the item, say so in your report; do not draw one.

---

## 7. Citations — the exact format

Every row carries a `groundedIn` string. The gate parses it.

```
§16.3; Fig. 16.5 — the PCT and Henle's loop: reabsorption of glucose and water
```

1. **`§` + the section number**, exactly as `--anchors` lists it: `§16.3`, `§8.5.4`.
2. **`§<ch>.0` is the chapter's unnumbered OPENING**, the prose before `§<ch>.1`.
   Real content lives there: Class 11 Ch.16's ammonotelism, ureotelism and flame
   cells; Ch.2's Five Kingdom system. Cite `§16.0`, not the nearest section.
3. **Figures and tables are citable:** `Fig. 16.4`, `Table 9.1`.
4. **Separate citations with a semicolon**, then an em dash before your note.
5. **Cite only THIS chapter.** The gate drops other chapters' anchors. If an answer
   genuinely rests on another chapter, ground it in what this chapter says or drop
   the claim.
6. **Use the number the BODY prints.** Class 12 Ch.4's opening contents list omits
   4.4 Polygenic Inheritance and 4.5 Pleiotropy and numbers Mutation 4.5, while the
   body prints 4.7. The body is right; `--anchors` reads it.
6a. **A fact stated only in the chapter's SUMMARY box** is in the chapter but has
   no anchor: cite the section the summary sentence summarises and add "(stated in
   the chapter Summary)" to the note. It is not a BEYOND CHAPTER fact.
7. **Cite the narrowest section that holds the fact.** `§8.5.4 Mitochondria`, not
   `§8.5 Eukaryotic Cells`.

**What the gate does and does not check.** It reads every citation in the WHOLE
`groundedIn` string, the note after the em dash included, so never mention another
chapter's figure or section in the note (it will fail). And it checks only that
each cited anchor EXISTS in this chapter, not that the passage holds your fact.
That second check is yours: open the section and confirm it says what you cite it for.

`groundedIn` never reaches the bank. It is checked here and then inert.

---

## 8. The file you write

**One question file, and only this file:**

```
scripts/ncert/data/<chapterId>.exercise.json
```

plus, only if §6 applies, `<chapterId>.fig.json` and `<chapterId>.solution-images.json`.

Running `merge.ts` (section 9) also writes `<chapterId>.questions.json`; that one
is expected. **Write nothing else into `scripts/ncert/data/`.** Write JSON and any
helper script with the Write tool, not a shell heredoc: Git Bash heredocs silently
eat backslashes, and LaTeX is all backslashes. `merge.ts` globs
`data/<id>.*.json`, so a stray scratch file is swept into the chapter. Scratch work
goes in `scripts/ncert/out/`.

### Row shape

```json
{
  "ref": "Ex 16 Q3 (b)",
  "bucket": "exercise-subjective",
  "format": "subjective",
  "subtopic": "Regulation of Kidney Function",
  "difficulty": "EASY",
  "context": "Indicate whether the following statements are true or false :",
  "setLabel": "Ex 16 Q3",
  "stem": "ADH helps in water elimination, making the urine hypotonic.",
  "solution": "**False.** ADH (vasopressin) facilitates water **reabsorption** from the latter parts of the tubule, preventing diuresis; the urine becomes concentrated (hypertonic).",
  "groundedIn": "§16.5 — ADH facilitates water reabsorption from the latter parts of the tubule"
}
```

MCQ (four options, one correct) adds `"bucket": "exercise-mcq"`, `"format": "mcq"`,
`"options": [{"label":"A","text":"..."}, … D]` and `"answer": "C"`.

- **Refs:** `Ex <ch> Q<n>`, and `Ex <ch> Q<n> (a)` for a sub-part, using the label
  the book prints (`(a)` or `(i)`).
- `difficulty`: `EASY` | `MODERATE` | `HARD`.
- `subtopic`: exactly one of the chapter's subtopics.
- Tables: GFM pipe-tables **with the `|---|` separator row**.
- No literal two-character `\n` sequences; `commit` rejects the row.

---

## 9. Check your own work before reporting

```
npx tsx scripts/ncert/merge.ts <chapterId> exercise
npx tsx scripts/ncert/science-grounding.ts <chapterId>
npx tsx scripts/ncert/commit.ts <chapterId>              # DRY RUN ONLY — never --apply
```

The gate exits 1 on any missing or unresolved citation. **Fix your rows until it
exits 0.** Do not "fix" it by deleting a citation; an uncited answer fails too, and
correctly. The commit dry run must report zero flags.

**You stop there.** You do not commit, stamp, attach images or flip anything
public. The maintainer reviews and runs those steps.

## 10. What to report back

- row count, split by MCQ / subjective, and the item count you read off the render
- the gate's final line and the commit dry run's summary line
- every item you skipped, and why
- anything you could not ground, and what you did about it
- anything the book prints that looks wrong
- the figure entries you wrote, if any
