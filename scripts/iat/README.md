# IISER Aptitude Test (IAT) past papers

IISER's own IAT papers into `question_kind='pyq'` rows on the `iiser-iat` exam.
Asked for in student feedback on 2026-11-06 ("cuet iat"); taken up 2026-11-08.

**Source:** iiseradmission.in only ("Previous years' question papers" and the
"Key" page), unpacked in `C:\tmp\PYQPs\IAT\src`. IISER posts 2017, 2018, 2019,
2021-2025 and the 2026 final key. No 2020. No coaching copies, ever.

**Pattern** (2026 brochure §19): 60 MCQs, 15 each of Biology, Chemistry,
Mathematics, Physics; +4 / -1 / 0; 180 minutes; out of 240.

## What each year can support

| Year | File | Key | How answers are settled |
|---|---|---|---|
| 2017, 2019, 2021, 2022 | question paper (text layer) | none | two independent solvers; a person settles every split |
| 2018 | scanned question paper | none | same, read from the page images |
| 2023, 2024 | key-file layout | (a) appears to be correct; **unconfirmed** | the blind solve measures it; `keyConfirmed` set only on a high rate |
| 2025 | IISER final key | printed (a) | one solver, compared with the key |
| 2026 | IISER final key ("option (a) is the correct answer") | printed (a) | same |

2025 Physics has 14 questions: IISER dropped one from its final key and the
file leaves it out, so the 2025 paper has 59.

## The (a)-is-correct trap

Stored as printed, every keyed-year answer would be A. `lib.ts` gives each
keyed row a fixed, seeded option order (`rowOrder`; "none of the above" style
options last; no shuffle where an option names another by letter), and the key
is the slot printed (a) landed in. The solver only ever sees that stored order,
from a folder outside `scripts/`, with option pictures renamed to stored
letters. The page renders and crops ARE the key, so no solver opens them.

A year with no key keeps its printed order (it is the real one).

## Steps for one paper

```sh
python scripts/iat/pages.py render 2025                 # pages for reading
#   transcribe: TRANSCRIPTION_BRIEF.md -> data/2025-<Subject>.questions.json
npx tsx scripts/iat/validate.ts 2025 Chemistry
python scripts/iat/pages.py crop 2025 Chemistry         # figures from the regions
python scripts/iat/pages.py sheet 2025 Chemistry        # LOOK at every crop
npx tsx scripts/iat/dump-for-derivation.ts 2025 Chemistry            # solver 1
npx tsx scripts/iat/dump-for-derivation.ts 2019 Chemistry --second   # no-key year: solver 2
#   solve: DERIVATION_BRIEF.md -> C:\tmp\PYQPs\IAT\blind\<stem>\derived.json
npx tsx scripts/iat/report.ts 2025                      # agreement + every non-AGREE row
#   adjudicate: data/<stem>.adjudication.json
```

Commit, seed and mocks come after the pilot (2025) is measured.

## Files

- `config.ts`: years, key modes, paths. `taxonomy.ts`: chapters (the CBSE 11 +
  12 NCERT names verbatim, plus `legacy` pre-2023 chapters). `lib.ts`: the pure
  core, spec `tests/iat-lib.test.ts`.
- `pages.py`, `validate.ts`, `dump-for-derivation.ts`, `report.ts`: the steps.
- `data/`: transcriptions and adjudications, the copy of record.
