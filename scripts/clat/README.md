# CLAT UG past papers

The Consortium of National Law Universities' CLAT UG papers into
`question_kind='pyq'` rows on the `clat` exam, one subject per printed section.
Taken up 2026-11-11 on the owner's call, ahead of CLAT 2027 (6 Dec 2026); no
student had asked for it. CLAT PG (the LLM entrance) sits in the same files and
is out of scope.

**Pattern:** five sections (English Language, Current Affairs including General
Knowledge, Legal Reasoning, Logical Reasoning, Quantitative Techniques), every
question hangs off a passage, one mark each, minus 0.25 for a wrong answer, two
hours. 120 questions since CLAT 2024, 150 in 2022 and 2023.

## The source

- **Paper:** the Consortium's notification "Objections to Question Paper and
  Provisional Answer Key" appends all four question-booklet sets. **The sets
  reorder the SECTIONS as well as the questions** (2026 Set B opens with Current
  Affairs), so we take Set A alone, with Set A's key. The live site drops a cycle
  once the next opens; every file was fetched from the Wayback Machine
  (`web.archive.org/web/<ts>id_/https://consortiumofnlus.ac.in/clat-<year>/notifications/<file>`).
  Kept in `C:\tmp\PYQPs\CLAT\src` (not committed).
- **Key:** the Consortium's FINAL key for Set A. 2026's final notice says the UG
  provisional key stands, so 2026 reads the provisional table. CLAT 2025's key
  went to the Supreme Court; the final key is the one published on 17 May 2025
  under its order of 7 May 2025.

| Year | Sat | Questions | Booklet file | Key | Withdrawn / either |
|---|---|---|---|---|---|
| 2026 | 7 Dec 2025 | 120 | 2026-prov.pdf p5-40 | 2026-prov.pdf p163-164 | Q100 |
| 2025 | 1 Dec 2024 | 120 | 2025-prov.pdf p5-40 | 2025-final-ug.pdf p4-5 | Q89, 97, 99, 100, 102, 109, 110; Q62 C or D |
| 2024 | 3 Dec 2023 | 120 | 2024-prov.pdf p5-36 | 2024-final.pdf p3-4 | Q16, Q65 |
| 2023 | 18 Dec 2022 | 150 | 2023-prov.pdf p6-53 (master booklet) | 2023-final.pdf p3-4 | Q144 |
| 2022 | 19 Jun 2022 | 150 | 2022-qp.pdf p3-42 | 2022-final.pdf p1-2 | none |

CLAT 2021's paper was not found (its key is archived); 2020 and earlier are a
different, 200-question pattern and are not worth taking.

## Two traps in the files

1. **Never read a key with `pdftotext -layout`.** On the 2022 and 2023 tables it
   prints every answer one row below its question. `key.py` pairs each answer
   with the question number on its own baseline, by word position, and
   `report.ts --key` checks the table against what the notification says changed.
2. **The 2022 booklet's text layer is damaged** two ways: a substitution in some
   font subsets ("commiVVingVhe" for "committing the") and capitals read as lower
   case ("the main idea", "(b)"). Windows OCR reads it well but silently drops
   fragments. `ocr_lines.py` keeps every text-layer word box and replaces its text
   with the OCR words inside it, when undoing the substitution gives the OCR
   reading or the two differ only in case; otherwise the printed text stands.
   `merge-report.txt` lists every unconfirmed replacement.

## Steps for one year

```sh
python -P scripts/clat/key.py <year>                 # Set A final key -> C:\tmp\PYQPs\CLAT\keys\<year>.json
npx tsx scripts/clat/report.ts <year> --key           # the table agrees with the notification
# 2022 only, before extract:
python -P scripts/clat/ocr_lines.py render 2022
powershell -NoProfile -File scripts/clat/ocr.ps1 -Dir C:\tmp\PYQPs\CLAT\ocr\2022\page -Dpi 300
powershell -NoProfile -File scripts/clat/ocr.ps1 -Dir C:\tmp\PYQPs\CLAT\ocr\2022\lines -Dpi 300
python -P scripts/clat/ocr_lines.py merge 2022
python -P scripts/clat/extract.py <year>              # data/<year>.questions.json + page images
npx tsx scripts/clat/validate.ts <year>               # the paper (+ data/<year>.fixes.json)
npx tsx scripts/clat/validate.ts <year> --payloads    # key-free payloads, one per slice
#   solvers: AGENT_BRIEF.md, one per slice (english, ca, legal, logic)
npx tsx scripts/clat/report.ts <year>                 # MAIN SESSION ONLY: solver vs key
#   adjudicate: data/<year>.adjudication.json; text slips: data/<year>.fixes.json
npx tsx scripts/clat/commit.ts <year>                 # dry run; --apply writes PRIVATE rows
```

Once, before the first commit: `npm run db:backup`, then
`npx tsx scripts/clat/seed.ts --apply`. After the commits:
`seed.ts --order --apply`, add the year to `CLAT_MOCK_YEARS`
(scripts/mocks/clatSittings.ts) and run `npx tsx scripts/mocks/build.ts --paper=clat`
(dry run; `--apply --publish` only on the owner's OK). Copy the solvers'
`blind/<year>/*.derived.json` into `data/<year>.derived.json` so the solutions
live in the repo.

**Fixes are finds, not edits.** Never edit `data/<year>.questions.json` by hand:
it is regenerated. A misread word goes in `data/<year>.fixes.json` as a find that
must occur exactly once, so a re-extraction that moves the text fails loudly.
Something printed oddly ("JagdipDhankar", "De scalation", "10'm air pistol") is
NOT a fix: the bank keeps what the paper printed.

## When the solver and the key disagree

Owner policy 2026-10-29, per row in `data/<year>.adjudication.json`:

- **The key is defensible:** it stays, and the solution is rewritten to teach it.
- **The key is wrong and the answer certain:** `correctKey` + a `notice`.
- **Withdrawn, or two answers accepted:** automatic: one answer kept (the
  solver's; for "C/D" it must be C or D), a notice above the solution, grace in
  every mock (`src/lib/mocks/flawed.json`).

Legal Reasoning is solved on the passage's principles alone, as CLAT instructs,
even where real law differs.

## Measured (all five years, 660 questions, committed 2026-11-11)

Blind solvers (one per section slice, never shown the key) against the
Consortium's final key, on the 648 questions it scored:

| Year | Agree | Withdrawn / either | Ruled by a person |
|---|---|---|---|
| 2026 | 117/119 (98.3%) | Q100 | 2 rewritten |
| 2025 | 104/112 (92.9%) | 7 withdrawn, Q62 C or D | 6 graced, Q67 corrected, 2 rewritten |
| 2024 | 113/118 (95.8%) | Q16, Q65 | 2 graced, 3 rewritten |
| 2023 | 142/149 (95.3%) | Q144 | 6 graced, 1 rewritten |
| 2022 | 141/150 (94.0%) | none | 5 graced (Q122, Q125 corrected), 4 rewritten |
| **All** | **617/648 (95.2%)** | 12 | 31 |

- **Every question the Consortium withdrew was one the solvers had already
  flagged as defective** (2026 Q100, 2024 Q16 and Q65, all seven of 2025's), so
  a solver flag is worth reading before a key arrives.
- Disagreements cluster on loosely worded inference questions ("which is true",
  "All of the above"). Quantitative Techniques agreed 60/63 (the three misses
  are 2023's loosely worded data questions) and Current Affairs 151/154.
- Three keys corrected with a notice, all certain on law or on the passage's own
  words: 2025 Q67 (a minor's agreement is void, not voidable), 2022 Q122 and
  Q125 (the key contradicts or is absent from the passage).
- 31 questions ride as grace in mocks: 12 the Consortium withdrew or double-keyed,
  19 ruled defective or two-way.

## Publishing

All five years PUBLIC and their mocks published 2026-11-11 (the owner OK'd the flip after the permission classifier refused it).

`npx tsx scripts/clat/publish.ts <year>` (dry run) then `--apply`: refuses unless
the bank holds exactly the paper's question numbers, each with a solution and its
passage. Then drop `noPublicContent` in the registry, add `hasMocks` and
`pastPaperSolutions`, and build the mocks (they read PUBLIC rows only).

## Files

`years.json` pages, sections, key location per year · `config.ts` naming and the
key notices · `lib.ts` pure core (spec `tests/clat-lib.test.ts`) · `taxonomy.ts` ·
`key.py` · `extract.py` · `ocr.ps1` + `ocr_lines.py` (2022) · `io.ts` ·
`validate.ts` · `report.ts` · `commit.ts` · `seed.ts` · `AGENT_BRIEF.md` ·
`data/` extractions, fixes, adjudications, solutions.
