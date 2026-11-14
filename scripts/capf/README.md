# UPSC CAPF (AC) ingestion

UPSC Central Armed Police Forces (Assistant Commandants), **Paper I only**:
"General Ability and Intelligence", 125 MCQs, 250 marks, 2 hours, one-third
negative (+2 / -0.667). Paper II (General Studies, Essay and Comprehension) is
written answers with no key and no model answers, and is out of scope.

## Sources

- **Booklets 2018-2026**, UPSC's own scans, from each year's exam page on
  upsc.gov.in (`/examinations/Central Armed Police Forces (ACs) Examination, <year>`).
  Saved as `C:\Vilas\LWS_Pune\CAPF\papers\CAPF_<year>_PaperI_GAI.pdf`; UPSC's
  filenames are in `config.ts` `SOURCE_URLS`. The 2017 page carries no paper, and
  earlier years exist only on coaching sites.
- **Key: 2026 only**, UPSC's PROVISIONAL key, released 2026-07-22
  (`ProvAnsKeyCAPF-26-GenAbilityIntellg-220726.pdf`, in `...\CAPF\keys\`). A
  4-page scan, one page per series; page 0 is Series A, which every booklet is.
  Read twice by hand (once whole, once from zoomed column crops) and diffed:
  125/125 agree, Q41 dropped (`X`), 124 scored.
- **No key found for 2018-2025** (2026-11-13): none on the exam pages, none in
  search results, and probing the 2026 stem (`AnsKeyCAPF-<yy>-GenAbilityIntellg-<ddmmyy>`)
  over the months after each final result found nothing. UPSC's answer-key
  archive renders empty in a browser even for exams whose keys exist.

Every booklet is a scan with **no text layer**, Hindi and English pages
alternating (Hindi first, same item numbers), two columns. 2026: 56 pages,
English at even indices 2-50, rough work 51-54.

## How this lane relates to `scripts/upsc/`

It is the CSE booklet shape, so the pure core is **imported** from
`../upsc/lib.ts` (band merge, catalog check, set labels, crosstab, key parsing,
row building), never copied. The I/O scripts were copied and adapted; fix a bug
in one, check the other.

What differs, and why:
- **Catalog** (`catalog.json`): the CSE catalog minus Comprehension, plus
  **Computer Knowledge** (from SSC CGL): CAPF asks computer questions. Every
  subject is legal on the one paper (`validateCatalog`'s `legalSubjects`).
- **Figures**: the transcriber gives a `figure` {page, region}; `crop.py` cuts it
  to `...\CAPF\figures\<year>\qNNN.png`, whitening the Hindi show-through; the
  blind packet hands the crop to the solver; `commit.ts` uploads it to `image_url`.
- **Two passes even with a key** (`keycheck.ts`, `lib.ts`): the pilot measures
  blind accuracy, and the key's letter ships with the working of whichever pass
  reached it. Where neither did, a hand solution goes in `data/<year>.hand.json`;
  `--apply` refuses until each has one. A stored solution never argues for a
  letter its row does not carry.
- **Keyed solutions carry no "derived answer" bracket**: the shared
  `buildRecords` stamps one, which is false once a key supplied the letter.
- **Dropped items** are committed in the same run as CANCELLED rows with a note.

## Pipeline

```sh
npx tsx scripts/capf/render.ts <year>              # 1. English pages + column crops -> out/<year>/
# 2. TRANSCRIBE by band (agents, <=3 at once): data/<year>.b<N>.json  (TRANSCRIPTION_BRIEF.md)
npx tsx scripts/capf/merge.ts <year> --apply       # 3. gates -> data/<year>.merged.json
python -P scripts/capf/crop.py <year> --sheet      # 4. figures; LOOK at out/<year>/_figures.png
npx tsx scripts/capf/dump-derive.ts <year> 42      # 5. blind packets -> out/derive/
# 6. DERIVE TWICE (different agents): derived/<year>.{a,b}.pN.json  (DERIVATION_BRIEF.md)
npx tsx scripts/capf/crosstab.ts <year>            # 7. agreement report
npx tsx scripts/capf/keycheck.ts <year> [--apply]  # 8a. keyed year: score both passes, write answers
#   (keyless year: crosstab.ts --apply after adjudicating every dispute by hand)
npx tsx scripts/capf/seed-exam.ts --apply          # once, then paste EXAM_ID into config.ts
npx tsx scripts/capf/seed-subjects.ts --apply      # once
npx tsx scripts/capf/commit.ts <year> [--apply]    # 9. commit PRIVATE
```

The key's read stays OUTSIDE the repo until both passes are written, so no
solver can see it; then it is copied to `data/<year>.key.json`.

## Status (2026-11-14)

**All nine papers, 2018-2026, are committed PRIVATE: 1,125 rows.** Not yet
public: no EXAM_REGISTRY entry, no mocks.

**The 2026 pilot, measured against UPSC's provisional key:** each blind pass
122/124 (98.4%), HIGH confidence 104/104 and 106/106. The passes agreed on all
125 and still shared both misses (Q5 LOW, Q101 MED with the key's answer as the
named runner-up), so agreement alone does not catch a shared error. Both passes
independently flagged Q41 as defective, and UPSC dropped it.

**2018-2025 (no key):** two passes per paper agreed on 98.4-100%; every
disagreement and every agreed answer below HIGH (12-39 per paper) went to a
hand check, recorded in `data/<year>.adjudicated.json`:
- `confirmed` rows say "checked by hand" on the row; `verified: false` rows
  (looked at, fact not confirmable) say only "agreed".
- 4 agreed answers were overruled by hand (2025 Q7, 2023 Q110 among them).
- 21 items defective as printed (two right options, none right, misprint)
  carry a **Note** above the solution and grace in mocks (`flawed.json`).

**Hand-check rulings in a keyless year can be wrong.** If UPSC publishes a key
for any of these years, add it to `config.ts` and re-score with keycheck: that
is the only way to measure these papers.
