# IMAT pipeline

IMAT (the Italian ministry's medicine-in-English admission test) for a future
niche site. Plan and decisions: [NICHE_SITES_SPEC.md](../../NICHE_SITES_SPEC.md).

## Source

All papers are in `C:\Vilas\LWS_Pune\IMAT\source\`. Every year 2011-2026 is
transcribed (1,000 questions); `check.ts` covers them all.

**2023-2026, the ministry's (MUR) papers**: `CompitoInglese<year>.pdf`, from
`https://accessoprogrammato.mur.gov.it/compiti/CompitoInglese<year>.pdf`. That
site sits behind a bot check, so they are downloaded in a browser, not by script.
- **The key is printed option A, in every question.** Each paper says so
  (2023 and 2024 in a closing line; 2025 and 2026 in a closing line plus a
  green highlight on A, checked in all 60).
- 60 questions: Reading 4 · Logic 5 · Biology 23 · Chemistry 15 · Physics and
  Maths 13 (split by question into the Physics and Mathematics subjects).
  +1.5 right, −0.4 wrong, 0 blank.
- PRIVATE until copyright decision D1 and the niche site are done.

**2011-2022, set by Cambridge (UCLES)**: `IMAT_<year>.pdf`. **Internal use
only, never published**: `commit.ts` writes them PRIVATE with `publish_blocked`
set (migration 0141), and the database refuses PUBLIC while it is set.
- 2011-2020: the printed answer key on the last page (`printed-key`, options in
  printed order, `answer` per question).
- **2021 and 2022**: published by the ministry with the answer at option A in
  every question (its convention: "la risposta giusta è sempre la A"), so they
  are `printed-a` (`PRINTED_A_YEARS` in `lib.ts`). `IMAT_2021.pdf` and
  `IMAT_2022.pdf` carry a prep provider's watermark; the
  `IMAT-<year>-Past-Paper-PDF-A-Form.pdf` copies do not, and match them (and an
  unmodified copy on testbuddy.it) question for question. 2021's figures are
  cropped from its A-Form copy (its `sourceFile`), since its watermark is
  flattened into the artwork; 2022's watermark is a separate image the cropper
  removes. All 120 were also solved and every one came out A. 2022 Q10 is
  flawed as printed (true minimum 18, not an option).
- Shapes differ by year (`PAPER_SHAPES` in `lib.ts`): 2011 and 2012 have 80
  questions, 2013 and 2014 their own splits, 2015-2021 22/18/12/8, 2022
  20/15/15/10. A first block mixing general knowledge and logic is split per
  question. Rows a paper letters A-E in a table are stored as Row 1-5.

## Steps

1. Draft from the text layer, committed unchanged as `data/<year>.draft.json`
   (its diff against the reviewed file is the review):
   - ministry papers: `python scripts/imat/extract.py <pdf> <year> <out>` (2023
     has no text layer and was transcribed from page images);
   - Cambridge papers: `python scripts/imat/extract_cambridge.py <pdf> <year> <out>`,
     which reads by layout (margin number, A-E letter column). Year quirks it
     handles: 2011's number shares the stem's first line and its letters are
     centred on multi-line options (`CENTRED_LABEL_YEARS`); 2021's text layer
     is glyph numbers, decoded by `glyphs.py` (an unknown glyph comes out as a
     visible marker, never a guess); invisible text over a watermark is dropped.
2. Review against the page images into `data/<year>.questions.json`. Tables become
   pipe-tables, maths printed as images is typed as LaTeX, picture options are
   "Graph A".."Graph E" with the set shown in the figure.
3. Fill `chapter` on every question from the questions themselves.
4. `npx tsx scripts/imat/check.ts [year]`: the commit's own checks plus a KaTeX
   (strict) render of every formula. Must report 0 errors.
5. `python scripts/imat/crop_figures.py <year>` crops each `figure` to
   `C:\Vilas\LWS_Pune\IMAT\figures\<year>_q<n>.png`. **Look at every crop**: where
   options or a table are drawn too, the crop takes them in and is redone by
   hand (existing files are kept unless `--force`). A provider's logo is
   blanked where it is a separate image; 2021's is flattened into its figures.
6. `npx tsx scripts/imat/seed.ts --apply` once: the exam row and six subjects.
   **Only after the deploy containing `src/lib/sites/nicheExams.ts` is live**,
   or "IMAT" appears in the /browse exam dropdown.
7. `npx tsx scripts/imat/commit.ts <year> --apply`: writes PRIVATE at insert,
   then attaches figures. Rollback by `source_file`.

## The shuffle is frozen

`lib.ts` shows each printed option under a letter chosen by
`shuffleOrder("imat:<year>:<n>")`, and `content_hash` includes the answer
letter. Changing the algorithm or the seed re-hashes every IMAT row, so a
re-run would duplicate the corpus.

## Kept as printed

- 2024 Q46 prints "HCI"; stored as HCl (a glyph slip, noted in the data).
- 2025 Q2 prints `--` and `**not**`; kept (the latter renders bold).
- 2025 Q51 prints options B and E identically; kept, marked `duplicateOptionsAsPrinted`.
- 2026 Q4 prints "(nformation"; kept.
- 2023 Q47's options are drawn structures; written as condensed formulas.
