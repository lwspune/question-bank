# CBSE Class 10 board PYQs: what differs from Class 12

Read after `TRANSCRIPTION_BRIEF.md` and `SOLUTION_BRIEF.md`. Where they disagree, this
file wins for Class 10. Learned on the first five papers (2025 Maths Standard 30/1/1,
30/2/1, 30/3/1; Science 31/1/1), 2026-10-14.

## 1. What is ingested

Exam `cbse-10`. Two subjects, both already in the database from the NCERT textbook
ingest:

| subject key | DB subject | paper code | CBSE code |
|---|---|---|---|
| `maths10` | Mathematics (the Standard paper) | `30/s/n` | 041 |
| `science10` | Science | `31/s/n` | 086 |

Maths **Basic** (`430/…`), the Punjabi (`40`, `41`) and Urdu (`46`, `47`) versions and the
visually-impaired papers are excluded by `papers.ts`. Never transcribe one.

`source_file` is `cbse-10-pyq-<paperId>`. Corpus-wide scripts need `--class=10`.

## 2. Paper patterns (read off each year's General Instructions)

| subject | year | pattern | shape |
|---|---|---|---|
| maths10 | 2022 | `term2_m10` | 14 q / 40: A Q1-6 x2, B Q7-10 x3, C Q11-12 x4, Q13-14 case studies x4. No MCQs |
| maths10 | 2023-2026 | `full80` | 38 q / 80: Q1-18 MCQ, Q19-20 A-R, B 21-25 x2, C 26-31 x3, D 32-35 x5, E 36-38 case study x4 |
| science10 | 2022 | `term2_s10` | 15 q / 40: A Q1-7 x2, B Q8-13 x3, C Q14-15 case-based x4. No MCQs |
| science10 | 2023-2025 | `sci80` | 39 q / 80: A Q1-20 MCQ (the last few are Assertion-Reason), B 21-26 x2, C 27-33 x3, D 34-36 x5, E 37-39 x4 |
| science10 | 2026 | `sci80_2026` | 39 q / 80 by discipline: Biology Q1-16, Chemistry Q17-29, Physics Q30-39, marks per question vary (see `lib.ts`) |

If the paper in front of you disagrees with its row, say so. The 2026 Science table was
measured on ONE set.

## 3. Pages

2025 papers: English on the even page indices from 2, Hindi on the odd ones (each odd page
is the Hindi of the page after it). Papers run 16 to 27 pages. Treat that as a hypothesis:
open `contact.png`, then confirm at full size, as TRANSCRIPTION_BRIEF §2 says.

## 4. Taxonomy

Print it, never copy it from a doc: `npx tsx scripts/cbse-12-pyq/axis.ts --subject=maths10`
(or `science10`). Note `Light — Reflection and Refraction` carries a real em dash.

Two `[Outdated]` chapters exist for content the current NCERT book dropped, both expected
only in 2022: `Constructions [Outdated]` (Maths) and
`Periodic Classification of Elements [Outdated]` (Science). Any other question with no
home: file it on the closest subtopic and add a `_flag` naming the gap. Never invent a
name.

Seen so far, and how they were filed: Pythagoras, Heron's formula, triangle area and
plain perimeter have no Class 10 subtopic (filed on the closest, flagged).

## 5. Rows

- Maths case studies: refs `Q36i`, `Q36ii`, `Q36iiia`, `Q36iiib` (or `Q36iia`/`Q36iib`
  when the OR sits in part (ii)); follow the paper's printed labels.
- Science case studies print (a), (b), (c)(i) OR (c)(ii): refs `Q37a`, `Q37b`, `Q37ci`,
  `Q37cii` (alternative to `Q37ci`). Science long answers often have parts (i), (ii),
  (iii) inside one question: keep them in ONE row, parts on separate lines.
- Count the OR alternatives against instruction (viii) when it prints counts. Science
  2025 printed none: walk the marking scheme for a bare `OR` and confirm each on the paper.
- Options that are drawings: keep the four rows as placeholders,
  `"Diagram (A) as printed - <what it shows>; see the attached figure."`, and mark the
  row `_figure: "REQUIRED - ..."`.
- A frequency or data table goes in the stem (or `context`) as a GFM pipe-table.

## 6. Answers

Section-A keys come from the marking scheme, verbatim. Re-derive each one; if you disagree,
keep CBSE's key and add a `_flag`.

**Keyless void.** If the scheme prints no letter ("The correct option is not available...
Full marks may be awarded to every attempt"), set `"_noCorrectOption": true`,
`"_cbseVoided": "<the note verbatim>"`, a `_flag` explaining the defect, and NO `answer`.
Seen on 2025 30/2/1 Q4.

## 7. Figures: flag them, do not crop them

Every `_figure` opens with `REQUIRED`, `ILLUSTRATIVE` or `DECORATIVE` (nothing else is
read) and ends `Page idx N`. A decorative photo beside a real diagram: flag the diagram.
A case-study figure goes on every sibling that needs it. "Draw a diagram" in a question
is the student's job, not a figure.

**Do not run `extract_figures.py`, `attach-images.ts` or edit `figure-picks.json`,
`figures.json` or `figure-groups.json`.** Those are shared files, and the maintainer does
figures for every paper in one place.

## 8. Who does what (owner's split, 2026-10-14)

**Transcription agents** write `data/<id>.questions.json` and make
`npx tsx scripts/cbse-12-pyq/validate.ts <id>` print `validation clean.` Then they stop.

**The maintainer** does everything after: `commit.ts --apply` (PRIVATE rows),
`dump-solutions.ts`, every solution (one author across the corpus, because these are
board answers and must read consistently), the figures, and git. Solutions follow
SOLUTION_BRIEF.md: one voice, read the scheme as IMAGES, check every number, bracket a
genuine scheme error. Four scheme errors turned up in the first four papers, so check.

## 9. Transcription agents: do not

- write to the database (`commit.ts --apply`, `apply-solutions.ts --apply`);
- write solutions;
- commit to git;
- edit anything under `scripts/cbse-12-pyq/` except your own `data/<id>.questions.json`;
- delete `scripts/cbse-12-pyq/out/<id>/` (the maintainer reads its scheme pages for the
  solutions).
