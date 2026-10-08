# IMAT pipeline

IMAT (the Italian ministry's medicine-in-English admission test) for a future
niche site. Plan and decisions: [NICHE_SITES_SPEC.md](../../NICHE_SITES_SPEC.md).

## Source

The official MUR papers, `C:\Vilas\LWS_Pune\IMAT\source\CompitoInglese<year>.pdf`,
downloaded from `https://accessoprogrammato.mur.gov.it/compiti/CompitoInglese<year>.pdf`.
That site sits behind a bot check, so they are downloaded in a browser, not by script.

- **2023-2026 only.** 2011-2022 were set by Cambridge, whose policy refuses
  permission for multiple-choice papers and anything before 2016.
- **The key is printed option A, in every question.** Each paper says so
  (2023 and 2024 in a closing line; 2025 and 2026 in a closing line plus a
  green highlight on A, checked in all 60).
- 60 questions: Reading 4 · Logic 5 · Biology 23 · Chemistry 15 · Physics and
  Maths 13 (split by question into the Physics and Mathematics subjects).
  +1.5 right, −0.4 wrong, 0 blank.

## Steps

1. `python scripts/imat/extract.py <pdf> <year> scripts/imat/data/<year>.draft.json`
   drafts 2024-2026 from the text layer (2023 has none; it is transcribed from
   the page images). The draft is the extractor's raw output and is committed
   unchanged, so its diff against the reviewed file is the review.
2. Review against the page images into `data/<year>.questions.json`. Options stay in
   PRINTED order. Figures are cropped to `C:\Vilas\LWS_Pune\IMAT\figures\<year>_q<n>.png`.
3. Fill `chapter` on every question from the official syllabus (DM 586/2025, Allegato A).
4. `npx tsx scripts/imat/check.ts [year]`: the commit's own checks plus a KaTeX
   render of every formula. Must report 0 errors.
5. `npx tsx scripts/imat/seed.ts --apply` once: the exam row and six subjects.
   **Only after the deploy containing `src/lib/sites/nicheExams.ts` is live**,
   or "IMAT" appears in the /browse exam dropdown.
6. `npx tsx scripts/imat/commit.ts <year> --apply`: writes PRIVATE at insert,
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
