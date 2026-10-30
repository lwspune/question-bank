# CISCE board PYQ (ISC Class 12 · ICSE Class 10): transcription contract

You are transcribing **one** CISCE paper into JSON. Read this whole file before
starting. Your output is a data file, not a message: write it, then report a
SHORT summary (row counts, figures, flags, page map). Keep your tool output
small: do not print whole files or long command output.

| exam slug | `exam` field | pages | chapters + subtopics |
|---|---|---|---|
| `isc-12` | `ISC Class 12` | `C:\tmp\PYQPs\ISC\XII\render\<year>-<Subject>\pNN.png` | `scripts/cisce-pyq/taxonomy/isc-12.ts` |
| `icse-10` | `ICSE Class 10` | `C:\tmp\PYQPs\ICSE\X\render\<year>-<Subject>\pNN.png` | `scripts/cisce-pyq/taxonomy/icse-10.ts` |

Your files go in `scripts/cisce-pyq/data/<exam slug>/`.

---

## 1. What you are given

- Page images (180 dpi). Open them with the Read tool and transcribe by LOOKING
  at them.
- **Never take a symbol from a PDF text layer.** The 2026 ISC scans have none;
  every other one is lossy (`dx` and `dy` extract as the same glyphs, `sin` as
  `𝑆𝑆𝑆𝑆𝑆𝑆`). Prose may be cross-checked against it; every symbol comes from the
  image.
- The chapter and subtopic lists for your exam (table above).
- A finished example: `scripts/cisce-pyq/data/isc-12/2025-Mathematics.questions.json`
  and its key `2025-Mathematics.key.json` (ISC, but the shape is the same).

### What the two source kinds look like

- **2026 = the question paper.** The cover and instruction pages are not
  questions. A diagonal serial-number watermark may cross the text: ignore it.
- **2025 = CISCE's "Analysis of Pupil Performance".** For each question it
  prints: the QUESTION, then a `MARKING SCHEME` block (the official answer and
  working), then "Comments of Examiners" and "Suggestions for teachers". The
  question part goes in `.questions.json`; the MARKING SCHEME goes in
  `.key.json`. Skip the comments and suggestions, EXCEPT where they say an
  answer was accepted in more than one form or that a question was defective:
  record that in the key's `note`.

---

## 2. Rows: what is one bank row

**ISC (Class 12)**
- Section A (Question 1): every subpart (i), (ii), ... is its own row, ref `1(i)`.
  Where a question is printed in blocks whose numbering restarts, (A)(i)-(vii) then
  (B)(i)-(vii), the ref carries the block: `1(A)(i)`.
- Every other question is ONE row, even with compulsory parts (a), (b) or (i),
  (ii): keep the part labels in the text, each part on its own line.

**ICSE (Class 10)**
- Every numbered part of a question is its OWN row: `1(i)` ... `1(xv)` for the
  Section A MCQs, and likewise `2(i)`, `2(ii)`, `4(i)`, `4(ii)`, `4(iii)` in the
  rest of the paper. ICSE parts are independent questions, each with its own
  marks in brackets.
- A part that itself has sub-parts (a), (b), (c) stays ONE row; keep the
  sub-part labels in the text, each on its own line.
- If a stem, table or figure is printed once for several parts (a shared
  passage, a data table), put it in `context` on EACH of those rows.

**Both**
- **Internal choice (OR)**: each alternative is its OWN row, and every
  alternative carries `"choice": "<the printed question number>"`. Under ISC the
  alternatives are numbered as subparts (`16(i)` OR `16(ii)`); the bare `OR`
  line is the only thing that tells an alternative from a compulsory part. Do
  not print "OR" in either row's text.
- Check that your question numbers run unbroken over the whole paper, and say in
  `_transcription` how you checked.

## 3. Transcribe AS PRINTED

Never "correct" a stem. If something looks wrong (a sign, a dropped exponent, an
option that matches nothing), transcribe it faithfully and add a `_flag` saying
what you saw. Keep the paper's wording, units and numbers exactly.

## 4. Notation

- All maths in `\( ... \)`. Not `$`, not bare unicode (`π`, `√`, `²`, `≤`, `×`,
  `θ` are written `\pi`, `\sqrt{}`, `^2`, `\le`, `\times`, `\theta` inside
  delimiters). Plain words stay outside the delimiters. `₹` stays as printed.
- Matrices `\begin{bmatrix}`, determinants `\begin{vmatrix}` as printed.
  Vectors `\vec{a}`, `\overrightarrow{AB}`, unit vectors `\hat{i}`.
- Chemistry formulae in `\(\mathrm{...}\)`: `\(\mathrm{K_2Cr_2O_7}\)`,
  `\(\mathrm{[Ni(CN)_4]^{2-}}\)`, arrows `\longrightarrow`, reagents over arrows
  `\xrightarrow{\mathrm{NaCN}}`.
- **Decimal points as printed**: a raised dot `0·7` becomes `0{\cdot}7`; an
  ordinary full stop stays `0.7`. Read it off the page in front of you.
- A table in a stem is a GFM pipe table: a header row, then a `|---|---|`
  separator row, then data rows.
- Line breaks are real newlines in the JSON string (`\n` in JSON source), never
  a literal backslash-n.
- **Write the file with the Write tool, never a shell heredoc** (the shell eats
  backslashes: `\theta` arrives as a TAB). Balance every `\(` with `\)`.
- In JSON, every LaTeX backslash is doubled: `"\\(x^2\\)"`.

## 5. Fields

```json
{
  "exam": "ICSE Class 10", "subject": "Physics", "year": 2026, "paperCode": "521",
  "source": "ICSE 2026 question paper",
  "_transcription": "page map, how the numbering was checked, anything odd",
  "rows": [
    {
      "ref": "1(i)", "questionNumber": "1(i)", "section": "A", "marks": 1,
      "format": "mcq",
      "chapter": "Force", "subtopic": "Moment of a Force",
      "instruction": "optional: a printed instruction that governs this row",
      "context": "optional: a shared passage/data that several rows need",
      "text": "the question",
      "options": ["first option", "second", "third", "fourth"],
      "choice": "only on OR alternatives: the printed question number",
      "figure": { "page": "p05", "region": [0.10, 0.42, 0.62, 0.66], "note": "what the figure shows", "required": true },
      "_flag": "optional: anything a human should look at"
    }
  ]
}
```

- `paperCode`: ISC 860 / 861A / 862A (Maths / Physics / Chemistry); ICSE 511 /
  521 / 522 / 523 (Maths / Physics / Chemistry / Biology).
- `format`: `"mcq"` when four printed options exist (assertion-reason too),
  otherwise `"subjective"`. Options in printed order; the first is (a)/A.
  Drop the printed `(a)`, `(b)` labels from the option strings.
- `chapter` and `subtopic`: copy VERBATIM from your exam's taxonomy file (the
  subtopic must belong to that chapter). A misspelling silently creates a
  duplicate chapter. If nothing fits, use the closest and `_flag` it. A row
  spanning two chapters goes under the one its marks mostly test.
- `marks`: as printed in the bracket beside the question or part.
- `section`: the paper section the row sits in (A, B, ...).
- `figure`: only when the row needs a printed diagram, graph, map or structure
  to be answered or understood (a circuit, a ray diagram, a graph, a biology
  diagram to label, an organic structure drawn as a picture). `region` is the
  figure's box as FRACTIONS of the page width and height `[left, top, right,
  bottom]`, generous by a few percent but NOT taking in question text; it will
  be cropped and checked by hand. `required: false` for a decorative picture
  whose data is all in the text. If a figure sits inside the options (four
  diagrams as options), say so in `note` and `_flag` it. Still transcribe
  everything the stem says in words, and put any labels or values printed ON
  the figure into `note`.
- **No answer-shaped field in the questions file**: no `answer`, `correct`,
  `key` or `solution`. The blind step refuses to run if one is present.

## 6. The key file (2025 only)

Write `data/<exam slug>/2025-<Subject>.key.json` from the MARKING SCHEME blocks:

```json
{
  "exam": "ICSE Class 10", "subject": "Physics", "year": 2025,
  "source": "Analysis of Pupil Performance, 2025",
  "answers": [
    { "ref": "1(i)", "labels": ["B"], "value": "the option text CISCE gives" },
    { "ref": "1(v)", "labels": ["C", "A"], "value": "...", "grace": true, "note": "both accepted" },
    { "ref": "5(ii)", "labels": [], "value": "final answer(s) in short", "scheme": "the scheme's key steps and final results, condensed, in LaTeX" }
  ]
}
```

- MCQ: `labels` = the letter(s) the scheme gives (A = first option), and
  `value` = the option text the scheme restates. If the letter and text
  disagree, keep both and add a `note`.
- Subjective: `labels: []`, `value` = the final answer(s) (numbers with units,
  the named product, the proved statement), `scheme` = the scheme's working,
  condensed but complete enough to judge a different method against it.
- Every row in the questions file needs a key entry with the same `ref`,
  including both OR alternatives.

## 7. Report

Reply with: rows by section, the list of figures (ref, page, required), every
`_flag`, and the page map. No more than ~25 lines.
