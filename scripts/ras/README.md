# RPSC RAS/RTS Prelims ingestion

Rajasthan State and Subordinate Services Combined Competitive (Prelims) Exam,
the one objective paper: "General Knowledge and General Science", 150 MCQs,
200 marks, 3 hours, one-third negative (+4/3, -4/9). The Mains papers are
written answers and out of scope.

## Sources

All from **rpsc.rajasthan.gov.in** (2026-11-15): the "Question Paper" list
(`viewcommon?Slice=QP`) and the "Answer Key" list (`Slice=AK`). RPSC's own
files; the file paths are in `config.ts` `SOURCE_URLS`.

| cycle | held | booklet | key |
|---|---|---|---|
| 2024 | 2 Feb 2025 | 40pp scan, 300 dpi | final, 24-02-2025, 1 deleted |
| 2023 | 1 Oct 2023 | 32pp, 300 dpi | final, 20-10-2023, 5 deleted |
| 2021 | 27 Oct 2021 | 32pp, 212 dpi | final, 22-11-2021, 6 deleted |
| 2018 | 5 Aug 2018 | 32pp, 150 dpi (the TSP file is byte-identical) | final, 1 deleted |
| 2016 | 28 Aug 2016 | 32pp, 150 dpi | final, 4 deleted (+3 for blind candidates only, answers kept) |
| 2013 | 31 Oct 2015 (re-held) | 32pp, 150 dpi | revised, 18-02-2016, 10 deleted |

Saved as `C:\Vilas\LWS_Pune\RPSC\RAS\papers\RAS_Pre_<year>.pdf` and
`...\keys\`. **Left out:** the 26-10-2013 and 19-11-2013 booklets also listed
under the 2013 exam: RPSC lists no key for either.

**The booklet.** A scan with no text layer. Each page is two columns, and the
columns are the two LANGUAGES, item for item: **Hindi left, English right.**
Instruction 9 (2024) makes English standard where they differ, so English is
the canonical `questions` row and Hindi a translation (`hi`, migrations 0118 +
0171), the MPSC pattern. From 2023 every item prints a fifth option "Question
not attempted" (an answer-sheet rule); it is not transcribed. A rubber-stamped
serial number runs down the middle of most pages.

**The keys** have a text layer and are read by `keys.py` from word POSITIONS
(the 2016 key sets each answer half a row above its number, which defeats
`pdftotext -layout`), cross-checked against a layout read (2013, 2018-2024
agree exactly; 2016 checked row by row against the page image). A blank cell
(2013) or `*` is a deletion -> `X`. The JSON is written OUTSIDE the repo and
copied into `data/` by `keycheck.ts` only when both blind passes are complete.

## How this lane relates to `scripts/capf/` and `scripts/upsc/`

The CSE/CAPF booklet shape, so the pure core is **imported** from
`../upsc/lib.ts` (merge, catalog, rows, key parsing) and `../capf/lib.ts`
(scoring two passes, picking the working); the number check from
`../mpsc/lib.ts`. The I/O scripts were copied and adapted. New here (`lib.ts`,
tested in `tests/ras-lib.test.ts`): the Hindi gates.

- **Catalog**: CAPF's 14 national subjects (same names, so they line up across
  exams) plus four Rajasthan subjects: History, Art and Culture; Geography;
  Polity and Administration; Economy. An item about Rajasthan goes to a
  Rajasthan subject even where the topic also exists nationally.
- **Hindi gates** (`merge.ts`): 1b two bands' Hindi of one item must agree (the
  shared merge compares English only); 4b Hindi structure; a Hindi/English
  NUMBER-parity report. `commit.ts` refuses a parity difference without a
  waiver in `data/<id>.waivers.json`.
- **`printNote`**: where the two versions SAY different things, a remark heads
  the solution in both languages.
- **Deleted items** are committed as CANCELLED rows with a note, graced in mocks.

## Pipeline

```sh
python -P scripts/ras/keys.py --write              # 0. keys -> KEY_ROOT (outside the repo)
npx tsx scripts/ras/render.ts <year>               # 1. pages + language columns -> out/<year>/
# 2. TRANSCRIBE by band (agents, <=3 at once): data/<year>.b<N>.json  (TRANSCRIPTION_BRIEF.md)
npx tsx scripts/ras/merge.ts <year> --apply        # 3. gates -> data/<year>.merged.json
python -P scripts/ras/crop.py <year> --sheet       # 4. figures; LOOK at out/<year>/_figures.png
npx tsx scripts/ras/dump-derive.ts <year> 50       # 5. blind packets (English only) -> out/derive/
# 6. DERIVE TWICE (different agents): derived/<year>.{a,b}.pN.json  (DERIVATION_BRIEF.md)
npx tsx scripts/ras/keycheck.ts <year> [--apply]   # 7. copies the key in, scores both passes
npx tsx scripts/ras/seed-exam.ts --apply           # once, then paste EXAM_ID into config.ts
npx tsx scripts/ras/seed-subjects.ts --apply       # once
npx tsx scripts/ras/commit.ts <year> [--apply]     # 8. commit PRIVATE + Hindi
```

Figure crops: `trim-figures.py` proposes a tighter region when a blank band
separates stem text from the figure; where a figure sits flush under its stem,
`figure-rows.py` prints the row-ink profile to pick the cut by hand. LOOK at
`out/<year>/_figures.png` every time: a crop that clips a label is worse than a
sliver of stem text. `extend-catalog.js <year>` adds the band files' new
subtopics (soft) to the catalog before `merge.ts --apply`.

Solutions: `keycheck.ts` applies `data/<id>.hand.json` (both passes missed the
key), `data/<id>.edits.json` (editorial rewrites of a pass's working) and
`data/<id>.notices.json` (a note above the solution), then REFUSES to write any
solution in solver voice (`lib.solverVoice`: "Runner-up", "I", "recall"...). The
brief asks for the runner-up in its own `runnerUp` field, which no student sees.

## Status (2026-11-16)

**All six papers committed PRIVATE: 900 rows, every one with its Hindi
translation, 21 figures, 27 RPSC-deleted items as CANCELLED rows.** Not yet
PUBLIC: no registry entry, no mocks, and the site cannot show Hindi until the
parked `feat/ssc-cgl-hindi` i18n commits are ported to main.

Blind accuracy against RPSC's final keys (two passes per paper):

| paper | pass A | pass B | HIGH right | both missed |
|---|---|---|---|---|
| 2024 | 136/149 | 138/149 | 98/98, 90/90 | 9 |
| 2023 | 140/145 | 138/145 | 111/111, 109/109 | 5 |
| 2021 | 134/144 | 132/144 | 100/100, 103/103 | 8 |
| 2018 | 144/149 | 148/149 | 113/113, 110/110 | 1 |
| 2016 | 137/146 | 139/146 | 92/93, 93/94 | 6 |
| 2013 | 133/140 | 131/140 | 104/104, 97/97 | 5 |

HIGH confidence was right 1,230 of 1,232 times. The two misses are one item,
2016 Q94 (greenhouse-gas ranking), where both passes followed NCERT's figure and
RPSC keyed a different order; it carries a notice. Every item both passes called
defective that RPSC also deleted lined up (2018 Q106, 2023 Q19/Q82/Q87, 2021
Q37/Q117, 2013 Q19/Q31/Q37/Q46). Notices: 2016 Q94, 2013 Q100.

**One finding worth keeping:** 2021 Q45 (Governor appointed 25 Oct 1956) explains
2024 Q28's key, which first looked wrong; the 2024 solution was corrected in place.
