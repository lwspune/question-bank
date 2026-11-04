# Drafting a board quick-revision sheet

The contract a drafting agent works to (2026-11-03). One sheet per chapter: the
night-before page a board student reads on the /board chapter's Quick revision
tab, and prints as a PDF. The main session checks every draft; you never write
to the repo, a database or git.

## Read first

1. `src/lib/board/revision/types.ts`: the shape (`RevisionSheet`).
2. `src/lib/board/revision/lint.ts`: the rules your file must pass (section caps,
   text length caps, no em dash or spaced dash, inline maths only as `\( ... \)`
   and it must render in KaTeX, no maths in a formula `label`, slugs by the
   board's slug rule).
3. The finished example to match in tone, depth and style:
   `src/lib/board/revision/sheets/mh-hsc-12/physics/rotational-dynamics.ts`.

## Your sources, and nothing else

Your brief names a chapter folder written by `npm run revision:prepare`:

- `book.txt`: the textbook chapter as text. A symbol font garbles maths (Greek
  letters print as Latin ones, e.g. T for theta, Z for omega, U for rho, V for
  sigma, O for lambda, D for alpha); prose is clean. Take definitions, laws and
  statements from the prose in the book's own words; rebuild formulas from the
  subject and cross-check them against the garbled text.
- `pyqs.txt`: every board past-paper question of the chapter, one a line:
  `<year> <month> [<format>] [<n> marks] <text>`, newest first. HSC 12 lines have
  a month and no marks; CBSE lines have marks and no month; MH SSC 10 lines
  have both (a few have no marks). A CBSE year has
  several sets, so the same idea often appears more than once in one year, and
  a case-study part is listed without its passage. A line ending
  `[has a figure, not shown here]` refers to a diagram you cannot see: group
  it by its words if you can, and never report its figure as missing.

Search with grep; never print a whole file.

## Rules

- **What is in a sheet:** most asked (3 to 8 topics), must-know points (4 to
  14), formulas (0 to 20), derivations or proofs (0 to 10), diagrams to practise
  (0 to 6), mistakes that cost marks (2 to 6). Biology and Geography usually have
  no formulas and few or no derivations: that is fine.
- **Most asked comes only from `pyqs.txt`.** Group questions on one idea (a
  derivation and its numerical may share a topic if the topic says so: "Angle of
  banking: formula or a numerical"). `years` = every distinct year of the lines
  in that group, newest first, each once. Order topics by how many questions
  each groups. **`marks`:** HSC 12 never (our HSC data records none). CBSE and
  MH SSC 10: give the marks the topic's cited lines carry most often (the
  checker refuses any other number); leave it out when the group mixes marks
  evenly.
- **Old syllabus stays out.** A past-paper question on something the current
  book does not teach (grep `book.txt` to be sure) goes in no topic and nowhere
  in the sheet. Say so in your report.
  **CBSE:** a topic CBSE set in 2025 or 2026 stays even when the rationalised
  NCERT book dropped it; write it from the standard result and say so in your
  report. Drop only topics last set before 2024 that the book no longer teaches.
  **MH SSC 10:** the 2016 to 2018 papers were set on the OLD Class 10 books;
  the current ones arrived in 2018-19. Some old topics are now taught in
  Class 9 (standard-position trigonometry, resistors in series, transport and
  excretion), so `book.txt` is the test: a topic it does not teach is out,
  however often 2016 to 2018 asked it.
- **Everything else must be taught in `book.txt`.** If the board asks it, it
  should be in the sheet.
- **Diagrams:** name the book's figure and list the labels an examiner looks
  for. Never draw.
- **Equations (Chemistry, Biology):** every reaction names its reactants
  (the checker refuses one that starts at its arrow) and balances; count
  atoms before you write it. A condensation polymer from n molecules of each
  monomer releases (2n - 1) water, written `(2n-1)\,\ce{H2O}` outside the
  `\ce{}`. The two review checks cannot see a wrong coefficient: you are the
  check.
- **Wording:** plain, simple English; for definitions and laws, the book's own
  wording, trimmed. No em dashes anywhere in your words.
- **MH SSC 10 Maths and Science `book.txt` loses notation:** powers print flat
  (`x2` is \(x^2\)), roots and many symbols vanish, and the text still reads
  like clean English. Never copy a formula or equation from it; rebuild it
  from the subject and use the text only to see which results the book
  teaches. Quote prose only.
- `examSlug` is as given in your brief (`mh-hsc-12`, `cbse-12`, `mh-ssc-10`
  or `cbse-10`);
  `subjectName` and `chapterName` are as given in your brief (they must match
  the database exactly). For **CBSE 12**, `source` is
  `NCERT <Subject> Part <I or II> (CBSE Class 12), Chapter <n>` (Biology is one
  book: `NCERT Biology (CBSE Class 12), Chapter <n>`), with the part your brief
  names, and the definitions follow NCERT's wording, which is what CBSE marking
  schemes reward. For **HSC 12**, `source` is
  `Balbharati <Subject> Std XII (Maharashtra State Board), Chapter <n>`. In both, `<n>` is
  the number the BOOK gives the chapter: its sections are numbered
  `<n>.1`, `<n>.2`, or (Geography) its heading reads `<n>. <chapter name>`.
  `revision:evidence` checks it. Do not trust a number given in your brief over
  the book's: the database's chapter order starts at 0 for some subjects.
  HSC Mathematics is two books, each numbered from 1 (NCERT Mathematics numbers
  straight through both parts):
  `Balbharati Mathematics and Statistics Part I Std XII (Maharashtra State Board), Chapter <n>`
  (Mathematical Logic to Linear Programming) and `... Part II ...` (Differentiation
  to Binomial Distribution).
  For **MH SSC 10**, `source` is `Balbharati <Book> Std X (Maharashtra State Board), Chapter <n>`
  with `<Book>` one of `Mathematics Part I` (Algebra), `Mathematics Part II`
  (Geometry), `Science and Technology Part 1`, `Science and Technology Part 2`,
  `Geography`, and for the shared History and Political Science book
  `History and Political Science Std X (Maharashtra State Board), History Chapter <n>`
  (or `Political Science Chapter <n>`; each part numbers from 1). For
  **CBSE 10**, `source` is `NCERT <Mathematics or Science> (CBSE Class 10), Chapter <n>`.
  Class 10 sheets are read by 15-year-olds: keep every line short and plain.

## Evidence (required)

Beside each sheet, write `<chapterSlug>.evidence.json`:

```json
{
  "keyPoints":   [{ "term": "<same as the sheet>", "quote": "<a sentence copied from book.txt>" }],
  "derivations": [{ "title": "<same as the sheet>", "quote": "<the book's heading or a sentence of its proof>" }],
  "diagrams":    [{ "title": "<same as the sheet>", "quote": "<the book's figure caption, e.g. Fig. 1.6: Vehicle on a banked road>" }],
  "mostAsked":   [{ "topic": "<same as the sheet>", "questions": ["<the start of each pyqs.txt line in the group, at least year, month, format and 5 words>"] }]
}
```

- One entry per sheet item, in the same order, with the same term/title/topic.
- A quote is at least 6 words, copied from `book.txt` (line breaks, case and
  punctuation do not matter; words do). Pick prose, not garbled maths.
- A topic's `years` must equal the years of the lines it cites.

## Check, then report

From the repo root:

```
npm run -s revision:evidence -- "<draft.ts>" "<draft>.evidence.json" "<chapter folder>"
```

Fix until it prints `clean`. Then report, briefly, per chapter: the draft path,
the checker result, the past-paper questions you left out as old syllabus, and
anything you were unsure of (a formula you could not confirm in the text, a
wording you paraphrased, a grouping you hesitated over).
