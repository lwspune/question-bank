# ISC Class 12 PCM board PYQ: transcription contract

You are transcribing **one** ISC (CISCE, Class 12) paper into JSON. Read this
whole file before starting. Your output is a data file, not a message: write it,
then report a SHORT summary (row counts, figures, flags, page map). Keep your
tool output small: do not print whole files or long command output.

---

## 1. What you are given

- Page images: `C:\tmp\PYQPs\ISC\XII\render\<year>-<Subject>\pNN.png` (180 dpi).
  Open them with the Read tool and transcribe by LOOKING at them.
- **Never use a PDF text layer.** The 2026 scans have none; the 2025 one is
  lossy (`dx` and `dy` both extract as the same glyphs). Every symbol comes from
  the image.
- The chapter and subtopic lists: `ISC_TAXONOMY` and `ISC_SUBTOPICS` in
  `scripts/isc-12-pyq/config.ts`.
- A finished example: `scripts/isc-12-pyq/data/2025-Mathematics.questions.json`
  (Q1, 15 rows) and its key `2025-Mathematics.key.json`.

### What the two source kinds look like

- **2026 = the question paper.** Page 1 (the cover, not rendered) and the
  instructions are not questions. A diagonal serial-number watermark crosses the
  text: ignore it.
- **2025 = CISCE's "Analysis of Pupil Performance".** For each question it
  prints: the QUESTION, then a `MARKING SCHEME` block (the official answer and
  working), then "Comments of Examiners" and "Suggestions for teachers". The
  question part is what goes in `.questions.json`; the MARKING SCHEME goes in
  `.key.json`. Skip the comments and suggestions, EXCEPT where they say an
  answer was accepted in more than one form or that a question was defective:
  record that in the key's `note`.

---

## 2. Rows: what is one bank row

- **Section A (Question 1)**: every subpart (i), (ii), ... is its own row.
  `ref` = `1(i)`, `1(ii)`, ...
- **Every other question is ONE row**, even when it has compulsory parts
  (a), (b) or (i), (ii). Keep the part labels in the text, each part on its own
  line. The model answer will answer all parts.
- **Internal choice (OR)**: each alternative is its OWN row. ISC numbers the
  two alternatives as subparts, `Question 16 (i) ... OR ... (ii)`, so the refs are
  `16(i)` and `16(ii)` and BOTH rows carry `"choice": "16"`. The bare `OR` line is
  the only thing that tells an alternative from a compulsory part: under Q1 the
  subparts are compulsory, under Q16 they are alternatives. If an alternative
  itself has compulsory parts, keep those inside its row. Do not print "OR" in
  either row's text.
- Check that your question numbers run unbroken over the whole paper (2026
  Maths prints its section and question counts on the instructions page; use
  them), and say in `_transcription` how you checked.

## 3. Transcribe AS PRINTED

Never "correct" a stem. If something looks wrong (a sign, a dropped exponent, an
option that matches nothing), transcribe it faithfully and add a `_flag` saying
what you saw. Keep the paper's wording, units and numbers exactly.

## 4. Notation

- All maths in `\( ... \)`. Not `$`, not bare unicode (`π`, `√`, `²`, `≤`, `×`,
  `θ` are written `\pi`, `\sqrt{}`, `^2`, `\le`, `\times`, `\theta` inside
  delimiters). Plain words stay outside the delimiters.
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
  "exam": "ISC Class 12", "subject": "Physics", "year": 2026, "paperCode": "861A",
  "source": "ISC 2026 question paper",
  "_transcription": "page map, how the numbering was checked, anything odd",
  "rows": [
    {
      "ref": "1(i)", "questionNumber": "1(i)", "section": "A", "marks": 1,
      "format": "mcq",
      "chapter": "Current Electricity", "subtopic": "Combination of Resistors",
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

- `format`: `"mcq"` when four printed options exist (assertion-reason too),
  otherwise `"subjective"`. Options in printed order; the first is (a)/A.
  Drop the printed `(a)`, `(b)` labels from the option strings.
- `chapter` and `subtopic`: copy VERBATIM from `ISC_TAXONOMY` / `ISC_SUBTOPICS`
  in `config.ts` (the subtopic must belong to that chapter). A misspelling
  silently creates a duplicate chapter. If nothing fits, use the closest and
  `_flag` it. A question spanning two chapters goes under the one its marks
  mostly test.
- `marks`: as printed in the bracket beside the question.
- `section`: the paper section the question sits in. ISC Mathematics has
  Section A, then Section B **or** Section C (candidates answer one of the two):
  transcribe both B and C.
- `figure`: only when the question needs a printed diagram, graph or structure
  to be answered or understood (a circuit, a ray diagram, a graph, an organic
  structure drawn as a picture). `region` is the figure's box as FRACTIONS of
  the page width and height `[left, top, right, bottom]`, generous by a few
  percent; it will be cropped and checked by hand. `required: false` for a
  decorative picture whose data is all in the text. If a figure sits inside the
  options (four diagrams as options), say so in `note` and `_flag` it. Still
  transcribe everything the stem says in words, and put any labels or values
  printed ON the figure into `note`.
- **No answer-shaped field in the questions file**: no `answer`, `correct`,
  `key` or `solution`. The blind step refuses to run if one is present.

## 6. The key file (2025 only)

Write `data/2025-<Subject>.key.json` from the MARKING SCHEME blocks:

```json
{
  "exam": "ISC Class 12", "subject": "Physics", "year": 2025,
  "source": "Analysis of Pupil Performance, Oct 2025",
  "answers": [
    { "ref": "1(i)", "labels": ["B"], "value": "the option text CISCE gives" },
    { "ref": "1(v)", "labels": ["C", "A"], "value": "...", "grace": true, "note": "both accepted" },
    { "ref": "5", "labels": [], "value": "final answer(s) in short", "scheme": "the scheme's key steps and final results, condensed, in LaTeX" }
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
