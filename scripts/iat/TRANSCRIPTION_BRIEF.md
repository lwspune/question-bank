# IISER Aptitude Test (IAT): transcription contract

You are transcribing IAT questions from IISER's own PDF into JSON, one file per
subject. Read this whole file first. Your output is a data file, not a message:
write it, check it, then reply with a SHORT summary. Keep tool output small: do
not print whole files or long command output.

- Page images: `C:\tmp\PYQPs\IAT\render\<year>\pNN.png` (150 dpi). Open them
  with the Read tool and transcribe by LOOKING at them.
- Chapters and subtopics: `scripts/iat/taxonomy.ts`.
- Your files: `scripts/iat/data/<year>-<Subject>.questions.json`
  (Subject = `Biology`, `Chemistry`, `Mathematics` or `Physics`).
- Check each file with `npx tsx scripts/iat/validate.ts <year> <Subject>` and
  fix everything it reports.

## 1. Rows

- One row per question. `ref` and `questionNumber` are the question's number
  within its subject as printed ("1" to "15"). In papers numbered 1-60 straight
  through, still restart at "1" for each subject and say so in `_transcription`.
- A page may hold no question (a continuation, a blank). A question may run
  over two pages. Check the numbers run unbroken and say how in `_transcription`.
- Options in **printed order**, without their `(a)`/`(b)` labels. Never reorder
  them, never mark one as right, never add an `answer`, `correct`, `key` or
  `solution` field. (The tools put the options in their final order later.)

## 2. Transcribe AS PRINTED

Never "correct" a question. If something looks wrong (a sign, a missing
exponent, two identical options), transcribe it faithfully and add a `_flag`.
Keep the paper's wording, units and numbers exactly.

## 3. Notation

- All maths in `\( ... \)`. No `$`, no bare unicode maths: `π √ ² ≤ × θ λ μ °`
  are `\pi \sqrt{} ^2 \le \times \theta \lambda \mu ^\circ` inside delimiters.
  Plain words stay outside the delimiters.
- Chemistry formulae in `\(\mathrm{...}\)`: `\(\mathrm{K_2Cr_2O_7}\)`,
  `\(\mathrm{[Co(NH_3)_4Cl_2]^+}\)`, arrows `\longrightarrow`, reagents over
  arrows `\xrightarrow{\mathrm{NaBH_4}}`.
- DNA/RNA primes: `5'-GTCTAG-3'` (a plain apostrophe).
- A table (match-the-columns, data) is a GFM pipe table: header row, then a
  `|---|---|` separator row, then data rows. If the table is printed as a
  picture, still type it as a pipe table; do not crop it.
- Line breaks are real newlines in the JSON string, never a literal backslash-n.
- **Write the file with the Write tool, never a shell heredoc** (the shell eats
  backslashes). In JSON every LaTeX backslash is doubled: `"\\(x^2\\)"`.

## 4. Figures

- `figure`: only when the question needs a drawn diagram, graph, circuit, ray
  diagram, pedigree, or structure that cannot be typed. `{ "page": "p13",
  "region": [left, top, right, bottom], "note": "what it shows and every label
  or value printed on it" }`, region as FRACTIONS of the page (0 to 1), a few
  percent generous, NOT taking in question text or options.
- `optionFigures`: when the OPTIONS are pictures (organic structures, graphs).
  Four entries, printed order, each `{ "page": ..., "region": [...] }` around
  that option's picture only, NOT its `(a)` label. The option strings are still
  required: write the structure as a condensed formula or name only if you are
  certain it is exact (`\(\mathrm{CH_3CH_2CHO}\)`, "propanal"); otherwise a short,
  faithful description of the drawing ("benzene ring with OH and NO2 para to
  each other"). Never mention a letter or a position in it.
- Do not crop anything yourself; the crops are cut from your regions and checked
  by a person.

## 5. Fields

```json
{
  "subject": "Biology",
  "year": 2025,
  "source": "IISER IAT 2025, final answer key (English), iiseradmission.in",
  "_transcription": "page map, how numbering was checked, anything odd",
  "rows": [
    {
      "ref": "1",
      "questionNumber": "1",
      "chapter": "Animal Kingdom",
      "subtopic": "Hemichordata and Chordata",
      "text": "Match the entries in column I and column II.\n\n| | Column I | | Column II |\n|---|---|---|---|\n| P. | Notochord and hollow nerve cord present | i. | Cyclostomata |\n| Q. | Ectoparasite with 6-15 pairs of gills and closed circulation | ii. | Chondrichthyes |\n| R. | Marine animals with persistent notochord and placoid scales | iii. | Hemichordata |\n| S. | Animals with open circulatory systems, and stomochord | iv. | Chordata |\n\nWhich one of the following combinations is correct?",
      "options": ["P - iv; Q - i; R - ii; S - iii", "P - iv; Q - ii; R - i; S - iii", "P - i; Q - iii; R - ii; S - iv", "P - iii; Q - i; R - ii; S - iv"]
    }
  ]
}
```

- `chapter` and `subtopic`: copy VERBATIM from `taxonomy.ts` (the subtopic must
  belong to that chapter; watch the curly apostrophes in some Chemistry names).
  A misspelling makes a duplicate chapter. Chapters marked `legacy: true` are
  the pre-2023 NCERT chapters; use them for older topics. If nothing fits, use
  the closest and `_flag` it. A question spanning chapters goes under the one it
  mostly tests.
- `context`: only if a passage or data block is shared by several questions.

## 6. Report

Reply in at most ~20 lines per subject: rows, stem figures (ref, page), picture
options (ref, page), every `_flag`, the page map, and validate.ts's last line.
