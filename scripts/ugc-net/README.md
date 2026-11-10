# UGC NET Paper 1 past papers

NTA's UGC NET Paper 1 (General Paper on Teaching and Research Aptitude) into
`question_kind='pyq'` rows on the `ugc-net` exam, subject `General Paper`.
Taken up 2026-11-10 on the owner's call (graduate focus); no student had asked
for it. Paper 2 (about 83 subjects) is out of scope.

**Pattern:** 50 MCQs, 2 marks each, no negative marking, ten units (NTA's
syllabus, `taxonomy.ts`), five questions each. Paper 1 and Paper 2 are sat in
one 3-hour session; our mocks time Paper 1 alone at 60 minutes (owner).

## The source

- **Paper:** NTA's own master question paper for one subject and shift, as a
  candidate printed it from NTA's exam system ("Question Paper Name : 08
  Commerce 03rd Sep 2024 Shift 1"), re-hosted by AglaSem
  (docs.aglasem.com/org/nta/ugc-net/question-paper; the PDF is
  `cdn.aglasem.com/aglasem-doc/<id>/<id>.pdf`). Every question carries NTA's
  question id. Owner OK'd this source 2026-11-10 (the SSC CGL basis).
  Retyped coaching copies (Testbook's "officially out" papers are 30 recalled
  questions, no ids) are NOT a source.
- **Key:** NTA's FINAL answer key PDF for the cycle. It prints no question text,
  only question id -> option number, "D" for a dropped question, "2, 4" where
  NTA accepted two. Saved as `pdftotext -layout` text under
  `C:\tmp\PYQPs\UGCNET\keys`.
- **Paper 1 is the same for every subject in a shift**, under different ids
  (Commerce and Human Rights, 3 Sep 2024 Shift 1, checked by eye), so one
  subject's paper stands for its shift.

### What exists (checked 2026-11-10)

| Cycle | Papers on AglaSem | Public final key | Status |
|---|---|---|---|
| June 2024 (sat Aug-Sep 2024) | 82 subjects ("UGC NET 2024 ...") | yes, one PDF, ugcnet.nta.ac.in | 20 of 21 shifts (no hosted paper sat 5 Sep Shift 1) |
| December 2025 (sat Dec 2025 - Jan 2026) | 87 subjects ("UGC NET 2025 ...") | only 5 subjects (03.01 S1, 03.01 S2, 05.01 S2, 06.01 S2, 07.01 S1), the Delhi High Court PDF | next: these papers have NO text layer or images (a print-to-PDF of the page), so ids are read off the page |
| June 2026 | none | candidate login only | not possible |
| June 2025, December 2024 | none hosted | yes, per subject (ugcnet.nta.ac.in) | not possible without papers |
| 2021, 2020, Dec 2019, June 2019 | 111 / 81 / 32 / ~98 | keys for June 2020 onward on ugcnet.nta.nic.in (archive) | older; not started |

The live NTA site is **ugcnet.nta.nic.in** (archive page lists keys back to
June 2020); `ugcnet.nta.ac.in` still serves June 2025 and December 2024.

## Steps for one shift

```sh
python -P scripts/ugc-net/extract.py <shift> C:\tmp\PYQPs\UGCNET\src\<file>.pdf   # q01..q50.png + manifest (ids)
npx tsx scripts/ugc-net/validate.ts <shift>      # every id in NTA's key for THIS date + shift
npx tsx scripts/ugc-net/skeleton.ts <shift>      # transcription with ref + id filled
#   agent: AGENT_BRIEF.md -> data/<shift>.questions.json + blind/<shift>/derived.json
npx tsx scripts/ugc-net/report.ts <shift>        # MAIN SESSION ONLY: solver vs NTA's key
#   adjudicate: data/<shift>.adjudication.json
python -P scripts/ugc-net/crop.py <shift> --sheet   # only if a row has a figure; LOOK at the sheet
npx tsx scripts/ugc-net/commit.ts <shift>        # dry run; --apply writes PRIVATE rows
```

Once, before the first commit: `npm run db:backup`, then
`npx tsx scripts/ugc-net/seed.ts --apply`. After the commits:
`seed.ts --order --apply`, add the shift to `UGC_NET_MOCK_SHIFTS`
(scripts/mocks/ugcNetSittings.ts) and run
`npx tsx scripts/mocks/build.ts --paper=ugc-net` (dry run; `--apply --publish`
only on the owner's OK). Copy `blind/<shift>/derived.json` to
`data/<shift>.derived.json` so the solutions live in the repo.

## When the solver and NTA disagree

Owner policy 2026-10-29, per row in `data/<shift>.adjudication.json`:

- **NTA's answer is defensible:** the key stays, the solution is rewritten to
  teach it (`solution`).
- **NTA's key is wrong and the maths is certain:** `correctKey` + a `notice`
  saying NTA's key differed.
- **Dropped ("D") or two answers ("2, 4"):** automatic: one answer kept (the
  solver's; it must be one NTA accepted), a notice above the solution, grace
  in every mock (`src/lib/mocks/flawed.json`).

## Measured

June 2024, all 20 shifts (1,000 questions, committed PRIVATE 2026-11-10):

- **Blind solver vs NTA's final key: 962 / 978 (98.4%)** on the questions NTA
  kept. NTA dropped 21 and accepted two answers on 1; all 22 are graced.
- The 16 disagreements, every one read by a person (`data/*.adjudication.json`):
  4 NTA right (two checked against SWAYAM PRABHA's own channel table, now in
  the agent brief), 9 two defensible readings (NTA's key kept, notice, grace),
  3 NTA's key wrong and corrected with a notice and grace (29 Aug S2 Q11
  plagiarism increment, Q43 Anglican societies; 4 Sep S1 Q42 IIM Indore).
- The solver's misses cluster on recall facts (SWAYAM PRABHA channels,
  committee names) and on loosely worded theory items; arithmetic and data
  interpretation agreed throughout.

## Taxonomy additions

Two subtopics are not NTA syllabus sub-heads but are asked most shifts:
"Higher learning in medieval India" and "Higher education in colonial India".
`refile.ts` moved the 17 rows committed before they existed
(`data/refile.json`).

## Files

`config.ts` shifts and paths · `lib.ts` pure core (key parser, checks,
assembly; spec `tests/ugc-net-lib.test.ts`) · `taxonomy.ts` the ten units ·
`extract.py` · `validate.ts` · `skeleton.ts` · `report.ts` · `crop.py` ·
`commit.ts` · `seed.ts` · `key-summary.ts` (what a key PDF holds) ·
`AGENT_BRIEF.md` · `data/` transcriptions, solutions, adjudications.
