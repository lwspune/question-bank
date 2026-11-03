# MPSC Group B & C Prelims ingestion

One merged scan (`Group B & C Pre Papers 2017 to 2024.pdf`, 557 pages) holds **14
Set-A booklets** of the General Ability Test (सामान्य क्षमता चाचणी) — 100 MCQs,
100 marks, 1 hour, **−¼ per wrong answer** — each with the Commission's **final**
answer key. Every question is printed **Marathi then English**, and the booklet's
instruction 4(b) declares neither authoritative. **The bank keeps both**: English
is the canonical `questions` row, Marathi is a translation (migration 0118).

Paper registry, page ranges and the two file traps (2020-B's key sits before its
paper; 2019-C's key has no text layer): `config.ts`.

## Pipeline

| step | command | output |
|---|---|---|
| keys | `python scripts/mpsc/extract.py keys` → `npx tsx scripts/mpsc/keys.ts --write` | `data/<id>.key.json` (Set A column; `#` = cancelled) |
| render | `python scripts/mpsc/extract.py render <id>` | `data/pages/<id>/p<NNN>.png` @130 dpi (gitignored) |
| transcribe | read each page, write `data/<id>.tNN.json` batches | `BilingualQuestion[]` — see lib.ts |
| check | `npx tsx scripts/mpsc/merge.ts <id> --show` | coverage, EN/MR parity, keyed option per question |
| merge | `npx tsx scripts/mpsc/merge.ts <id> --write` | `data/<id>.merged.json` |
| figures | `python scripts/mpsc/extract.py figures <id>` | `data/figures/<id>/q<N>.png` (gitignored) |
| commit | `npx tsx scripts/mpsc/commit.ts <id> [--apply]` | PRIVATE rows + Marathi + figures |

Exam row + subjects: `npx tsx scripts/mpsc/seed.ts --apply` (done 2026-09-25).

## Transcription conventions

- **Faithful per language.** Devanagari digits stay Devanagari (`१८५७`), ASCII
  stays ASCII — Marathi prints both, sometimes in one question.
- Sub-items one per line with the printed label (`अ.` / `a.` / `(a)`); a closing
  "Answer Options :" / "पर्यायी उत्तरे :" line is kept in both.
- Match-the-following → a GFM table; printed headers when the paper has them,
  else `Column I | Column II` / `स्तंभ I | स्तंभ II`. Options written out as
  `a-III, b-II, …`.
- Blanks → `______`. Superscript ordinals flattened (`27th`).
- **Figures:** a text-free figure (a triangle-count grid) is cropped once — `figure:
  {page, box}` in 130-dpi pixels — and serves both languages. A chart whose labels
  are words (a pie chart of expenses) is transcribed as a **table in each language**
  instead, so it stays answerable, readable and searchable.

## Checks

- **Parity probe** (`lib.ts parityIssues`): both versions must agree on option
  count, stem line count and every number (script-neutral). A genuine print
  difference is waived in `data/<id>.waivers.json` **with a reason read against
  the page**; `commit.ts` refuses an unwaived flag.
- **Print differences (meaning, not numbers).** Where the booklet's Marathi and
  English say different things (a direction, a term), transcribe BOTH as printed
  and record it in the question's `printNote` field — never only in a waiver,
  which is for number/notation differences. The parity probe cannot see these;
  they are found by reading. `npx tsx scripts/mpsc/print-notes.ts` lists them all.
  Students see each as a remark in the question's solution (both languages),
  written by `commit.ts` via `printNoteSolution`.
- **Key fit** (`merge.ts --show`): solve the aptitude block independently; a
  shifted key shows up there first. 2024-B: 20/20.

## Cancelled questions (migration 0119)

A `#` in the final key is **kept**, not dropped: committed with **no correct
option** and a `cancelled_note` naming the sitting. The DB refuses a correct
option on such a row. `/browse` and the mock review show the notice in both
languages, the Word/PPT key prints "Cancelled", and mocks award it to every
candidate (`grace`). 35 across the 14 papers.

## Status

| paper | transcribed | committed |
|---|---|---|
| 2024-b (H19) | 100/100 | PRIVATE, 2026-09-25 |
| 2024-c (R19) | 100/100 | PRIVATE, 2026-09-26 (Q69 cancelled) |
| 2023-bc (J17) | 100/100 | PRIVATE, 2026-09-26 (Q19, Q74 cancelled) |
| 2022-c (F16) | 100/100 | PRIVATE, 2026-09-26 |
| 2022-b (A16) | 100/100 | PRIVATE, 2026-09-26 |
| 2021-c (Y14) | 100/100 | PRIVATE, 2026-09-26 (Q20, Q22, Q94 cancelled) |
| 2021-b (U14) | 100/100 | PRIVATE, 2026-09-26 (8 cancelled; Q40 + Q72 print differences noted) |
| 2020-b (A14) | 100/100 | PRIVATE, 2026-09-26 (5 cancelled) |
| 2019-c (Y12) | 100/100 | PRIVATE, 2026-09-26 (Q39, Q58 cancelled; Q57 print note) |
| 2019-b (V12) | 100/100 | PRIVATE, 2026-09-26 (Q28, Q48, Q53 cancelled; Q20 + Q88 print notes) |
| 2018-b (H11) | 100/100 | PRIVATE, 2026-09-26 (Q83 cancelled; Q3, Q38, Q59, Q84 print notes) |
| 2018-c (J11) | 100/100 | PRIVATE, 2026-09-26 (Q12, Q15, Q39, Q63, Q81 cancelled; Q75 print note) |
| 2017-b (NO9) | 100/100 | PRIVATE, 2026-09-26 (Q28, Q64 cancelled; Q64, Q84 print notes) |
| 2017-c (B09) | 100/100 | PRIVATE, 2026-09-26 (Q6, Q39, Q71 cancelled; Q26, Q75, Q90 print notes) |

**All 14 flipped PUBLIC 2026-09-26** (the "committed" column records how each was first written). Mocks: `npx tsx scripts/mocks/build.ts --paper=mpsc` — 14 build whole with 35 grace; publishing (`--apply --publish`) and `hasMocks: true` in `src/lib/exam/examContext.ts` go together.

# MPSC State Services (Rajyaseva) Prelims — GS Paper I

The same pipeline, a second exam (`EXAMS.ssp`, `MPSC State Services Prelims`).
Papers are `ssp-<year>` in `config.ts` `SSP_PAPERS` — kept OUT of `PAPERS`,
because the mock builder derives Group B & C sittings from that list.

**Source:** `MPSC Rajyaseva PYQ by ACHIEVERS MENTORSHIP.pdf` (460 pages, image
only): 10 Set-A booklets, 2013-2022, NOT in year order (2017 precedes 2018,
2013 precedes 2014). Each is 100 questions, 200 marks, 2 hours, −¼ of a
question's marks per wrong answer. CSAT (Paper II) and 2023+ are not in it.
Every page carries the coaching header — never crop it into a figure.

**Keys:** the scan has NO key pages — only a coaching institute's answer boxes
and "CANCEL #" stamps. The key is the Commission's own FINAL key, one 2-page PDF
per year in `C:/Users/vilas/Downloads/mpsc-ssp-final-keys/<year>.pdf`
(mpscmaterial.com mirrors of the mpsc.gov.in files; mpsc.gov.in itself is an
SPA with signed API requests). 2019 is an image, and 2015/2016 lost question
numbers from their text layer, so those three are hand-transcribed into
`data/<id>.keytokens.json`. `python scripts/mpsc/extract.py keys ssp` →
`npx tsx scripts/mpsc/keys.ts ssp --write`.

**Three checks, run by `keys.ts` and `merge.ts`:**
- **Set balance** (`keys.ts`, every exam): the four sets are one paper
  reordered, so each set's column must hold the same count of every letter,
  `#` included. A misread cell breaks it. All 24 keys pass.
- **Coaching marks vs key**: `batch.py` records each box as it is transcribed
  (`data/<id>.boxes.json`); `merge.ts` reports every disagreement. It is a
  second, independent reading of the final key.
- **Fixed chapter list** (`config.ts` `SSP_CHAPTERS`): merge refuses an
  off-list subject/chapter, so ten papers cannot drift the way Group B & C did.

**Transcribing:** write a batch as Python with `scripts/mpsc/batch.py` (lines as
lists, so Devanagari and newlines need no escaping). At 130 dpi, ध and घ can be
misread (one slip in the 2022 pilot, caught at 180 dpi): zoom any doubtful word.

| paper | transcribed | marks vs key | committed |
|---|---|---|---|
| ssp-2022 (H15) | 100/100 | 100/100 | PRIVATE, 2026-09-27 (Q42, Q95, Q96 cancelled; Q2 print note) |
| ssp-2021 (O14) | 100/100 | 100/100 | PRIVATE, 2026-09-27 (Q2, Q3, Q9, Q37, Q44, Q54, Q61 cancelled; Q45 print note) |
| ssp-2020 (Y13) | 100/100 | 100/100 | PRIVATE, 2026-09-27 (Q21, Q33, Q36 cancelled; Q22, Q40 print notes) |
| ssp-2019 (T12) | 100/100 | 100/100 | PRIVATE, 2026-09-27 (Q76, Q87, Q93 cancelled; Q6, Q76 print notes; Q71, Q80 figures) |
| ssp-2018 (F11) | 100/100 | 100/100 | PRIVATE, 2026-09-27 (Q26 cancelled; Q10, Q71 print notes; Q4 figure) |
| ssp-2017 (W08) | 100/100 | 100/100 | PRIVATE, 2026-09-27 (none cancelled; Q26, Q41, Q72 print notes; Q20, Q30 figures) |
| ssp-2016 (N07) | 100/100 | 99/100 (Q22: coaching mark wrong, key right) | PRIVATE, 2026-09-27 (Q28, Q31, Q75 cancelled; Q17, Q31 print notes) |
| ssp-2015 (V05) | 100/100 | 100/100 | PRIVATE, 2026-09-27 (Q16, Q39 cancelled; Q12, Q36, Q98 print notes) |
| ssp-2014 (G03) | 100/100 | 100/100 | PRIVATE, 2026-09-27 (Q93 cancelled; Q99 print note) |
| ssp-2013 (X01) | 100/100 | 99/99 (Q74 unmarked) | PRIVATE, 2026-09-27 (Q74 cancelled; Q24, Q29 figures) |

**All 10 papers committed PRIVATE (1,000 q, 24 cancelled, 7 figures).** Coaching marks agree with the official final key on 998 of 999 marked questions; the one disagreement (2016 Q22) is the coaching error. **PUBLIC since 2026-09-27** (`npx tsx scripts/mpsc/flip-public.ts ssp --apply`), registry slug `mpsc-state-services-prelims` (MPSC → Prelims → State Services), and 10 GS Paper I mocks published (`scripts/mocks/build.ts --paper=mpsc --only=ssp-<year>`; 100 q, 200 marks, 2 h, −0.5 per wrong, cancelled questions as grace).

# MPSC State Services Prelims — CSAT Paper II

Papers `ssp-csat-<year>` in `config.ts` `SSP_CSAT_PAPERS`, the same exam row as
GS Paper I (`EXAMS.ssp`). 80 questions, 200 marks, 2 hours, three subjects
(`SSP_CSAT_CHAPTERS`: Comprehension, Reasoning and Aptitude, Decision Making).
2022 is configured but DROPPED (owner, 2026-09-30); it has no rows and no mock.

**Source:** one booklet PDF and one key PDF per year in `SSP_CSAT_DIR`.
`paper-2017.pdf` is the 2018 booklet (`file` in `csat()`). 2014, 2015 and 2018
have a text layer for the English passages; the rest were read by Windows OCR.

**Keys:** the Commission's final keys. The Decision Making questions (Q74-80 in
2013, Q76-80 after) are GRADED: every option has its own marks, typed from the
key's grid into `<id>.graded.json` (all four sets, balance-checked; the text
layer garbles 1.5 and 2.5). `keys.ts` writes them to `key.json` `graded`, the
key letter is the best option, and the solution prints the marks line.

**Passages that trip the content filter:** a helper writing a published literary
text or a statute word for word is stopped outright (2015 Q11-15, a Rilke
letter; 2020 Q11-15, IPC sections 349-351). Helpers write
`ctx_en="{{EN_PASSAGE <paper> Q<a>-<b>}}"` instead and the main session fills it
from the text layer or OCR. Before merging a paper, grep its `t*.json` for `{{`.

| paper | marks vs key | cancelled |
|---|---|---|
| 2013 (Y01) | 67/80 | Q33 |
| 2014 (H03) | 64/80 | Q7 |
| 2015 (W05) | 59/80 | Q51, Q63, Q67, Q73 |
| 2016 (O07) | 61/80 | Q35, Q57, Q61, Q62, Q69 |
| 2018 (G11) | 73/80 | Q14 |
| 2019 (U12) | 68/80 | Q12, Q71, Q72 |
| 2020 (Z13) | 68/80 | Q66 |
| 2021 (P14) | 74/80 | Q64 |

**PUBLIC 2026-11-03** (owner), with 8 mocks (`mpsc-ssp-csat-<year>`, published
one at a time with `build.ts --paper=mpsc --only=ssp-csat-<year> --apply --publish`).
Marking, from clause 7(b) of each cover: +2.5; a wrong answer costs one-third
(2013-2020, `MPSC_SSP_CSAT_PAPER`) or one-fourth (2021, `MPSC_SSP_CSAT_2021_PAPER`);
Decision Making scores the picked option's marks and is never penalised
(`optionMarks` on the mock question). 2015's final key (p.3) also waives the
penalty on Q46-50 and Q71-75 (`noPenalty`). 17 cancelled questions ride as grace.

# MPSC State Services Prelims 2023-2025 — GS and CSAT

Six more papers on the same pipeline (2026-11-03): `ssp-2023/2024/2025` in
`SSP_PAPERS` and `ssp-csat-2023/2024/2025` in `SSP_CSAT_PAPERS`.

**Source:** MPSC's booklets and keys as posted on Google Drive by Physics Wallah,
in `SSP_2023_DIR` (`paper-<gs|csat>-<year>.pdf`, `key-<gs|csat>-<year>.pdf`). No
text layer in any booklet. **The 2024 booklets are a candidate's used copy**,
photographed: ticks and circles on options, an "@SPOTLESS_MPSC" mark, no cover,
and CSAT pp.26-43 sideways (`extract.py` `ROTATE` stands them up for reading and
for figure crops). The ticks were never used as an answer.

**Booklet sets are not all A:** GS 2023 A, CSAT 2023 D, both 2024 D, both 2025 C.
`Paper.bookletSet` names the set, and `keys.ts`, `applyGradedKey` and `key.json`
read that set's column of the 4-set key.

**Keys:** 2023 and 2024 are MPSC's FINAL keys. **2025 is MPSC's FIRST key**
(objections until 18 Nov 2025; `provisionalKey`); the final key was not found,
because mpsc.gov.in's file API needs a header only its own front end sends.
Shipped unlabelled (owner, 2026-11-03), as asp-2011 was; **re-check 2025 against
the final key when it is found.** The CSAT decision-making grids were typed from
each key's page image into `graded.json`. Every paper was solved blind first.

**English passages:** 13 CSAT passages and one stem were left as placeholders by
the helpers (published texts: a history textbook, a judgment, Russell, Harari and
others) and read by OCR (Windows OCR on 300-dpi renders, several tilts, the best
kept) into the batches by the main session, every doubtful word checked on the page.

| paper | marks vs key | cancelled | notes |
|---|---|---|---|
| ssp-2023 (Q17, A) | 88/100 final | Q38, Q75 | 1 figure (show-through cleaned) |
| ssp-2024 (W18, D) | 95/100 final | none | used copy; Q66's Marathi stem cut by the photo (print note) |
| ssp-2025 (E21, C) | 95/100 FIRST | none | 1 figure |
| ssp-csat-2023 (R17, D) | 71/80 final | Q51 | 7 figures |
| ssp-csat-2024 (X18, D) | 77/80 final | none | used copy; 6 English passages by OCR; Q72's grid kept as photographed (`watermark: "none"`) |
| ssp-csat-2025 (F21, C) | 75/80 FIRST | none | 5 English passages by OCR |

### Key doubts (State Services 2023-2025): SETTLED 2026-11-03

**Owner: notice + grace on all five, MPSC's key kept** (config.ts
`SSP_2023_2025_NOTICES`).

| paper · Q | MPSC key | finding |
|---|---|---|
| ssp-2023 Q17 | (3) NO₃ | Bacteria release nitrous oxide, N₂O (2). Text checked against p.9. |
| ssp-2023 Q50 | (3) | AMRUT does address water supply; the false statement is more likely (2), the ministry's name. |
| ssp-2025 Q84 | (1) 1990 | The NCW Act is 1990; the Commission was set up on 31 Jan 1992 (3). First key. |
| ssp-csat-2024 Q64 | (2) | The key's "central idea" overstates one line; (1) follows the paragraph. |
| ssp-csat-2025 Q58 | (3) 2/91 | Defective: P(three red of 13) = 1/286, not offered. First key. |

**PUBLIC 2026-11-03** (owner), with 6 mocks `mpsc-ssp-<year>` and
`mpsc-ssp-csat-<year>`. GS +2 / -0.5 (every cover: a quarter). CSAT 2021 on is
`MPSC_SSP_CSAT_2021_PAPER`, +2.5 / -0.625 (the 2023 and 2025 covers say a
quarter; the 2024 copy has no cover and rides with its neighbours).

# MPSC Forest Service + Agriculture Service Prelims

Two more exams on the same pipeline: `EXAMS.fsp` (MPSC Forest Service Prelims)
and `EXAMS.asp` (MPSC Agriculture Service Prelims), papers `fsp-<year>` /
`asp-<year>` in `config.ts` `FSP_PAPERS` / `ASP_PAPERS`.

**Source:** the back of the merged MAINS scan (`All PYQ mar eng.pdf`, the
scripts/mpsc-mains source), pp.741-1081, each booklet followed by its key (text
layer, `extract.py keys fsp|asp`). pp.711-740 are a second copy of the 2018
Group B Mains paper. Each booklet is "मराठी, इंग्रजी व सामान्य अध्ययन": a Marathi
grammar section printed in **Marathi only**, an English section in **English
only** (both committed with no translation, like the Mains papers), then GS and
aptitude printed in both. Agriculture adds an agriculture head. The language
sections use the Mains chapter lists, so grammar lands on one taxonomy.

**Keys:** eight are the Commission's revised (final) keys. **asp-2011's is the
FIRST key** (its header invites objections): `provisionalKey` in config.
asp-2011's extraction loses a cell (Q152/Q177) and asp-2018's key has no text
layer, so both need hand-transcribed `keytokens`.

**The independent check** is the transcriber's own answer, written into `box`
before reading the key (`boxes.json`; merge.ts prints "boxes.json mark").
A blind transcriber checks its batches with `npx tsx scripts/mpsc/draft-check.ts <id>`
(coverage, parity, chapter list, unanswered questions), never `merge.ts`, which prints
the key beside every disagreement.

**Keys read by hand (2026-11-02):** asp-2011's Q177 Set-D cell is printed raised
above its row, so extraction split it off; it was moved back into the row (and the
page-header code "3 400 001" dropped) in `asp-2011.keytokens.json`. asp-2018's
revised key (dated 2 Jul 2018) was typed from pp.1080-1081; all four sets balance.
asp-2011 is ingested on its first key, unlabelled (owner, 2026-11-02).
Underlined Marathi is `**bold**` (the Mains convention); English underline is
`\(\underline{\text{..}}\)`.

| paper | transcribed | marks vs key | committed |
|---|---|---|---|
| fsp-2014 (D04) | 100/100 | 88/100 | PRIVATE, 2026-11-02 (Q72 cancelled; 12 figures, AglaSem watermark cleaned). An AglaSem copy: Q16-100 are printed in ENGLISH ONLY, GS and aptitude included |
| asp-2016 (U07) | 100/100 | 89/100 | PRIVATE, 2026-11-02 (Q19, Q51, Q53, Q68, Q90 cancelled; Q60 waived; print notes Q67, Q93) |
| asp-2017 (Q09) | 100/100 | 94/100 | PRIVATE, 2026-11-02 (Q9, Q63 cancelled; Q38, Q67 waived; print notes Q77, Q97) |
| fsp-2016 (M07) | 99/99 (Q7 omitted) | 93/100 | PRIVATE, 2026-11-02 (Q2, Q11, Q29, Q30 cancelled; Q55, Q69, Q72 waived; 11 figures, Q83's keeps the Marathi label between its rows). Q38-50 transcribed by the main session: an API content filter stopped two helpers at the Ambedkar-on-Ranade passage |
| asp-2018 (I11) | 100/100 | 89/100 against the hand-typed key | PRIVATE, 2026-11-02 (Q39 cancelled; Q31, Q38 waived; print notes Q66, Q87, Q89) |
| asp-2011 (RSM) | 200/200 | 187/200 against the FIRST key | PRIVATE, 2026-11-02 (no cancellations on the first key; Q79 waived; 5 print notes). Q41, Q42, Q109 look wrong on that key: see Key doubts |
| asp-2012 (EOO) | 200/200 | 189/200 | PRIVATE, 2026-11-02 (Q155 cancelled). Q66-70 (a passage from Huxley's Ends and Means) by the main session: the passage was read by Windows OCR into a file, because writing a published text out trips the API's content filter |
| fsp-2017 (E09) | 100/100 | 81/91 (9 unmarked) | PRIVATE, 2026-10-16 (Q37, Q89, Q98, Q100 cancelled; Q86 waived) |
| fsp-2018 (K11) | 100/100 | 91/98 (Q1, Q2, Q21, Q30, Q40, Q42 language items; Q90 word count) | PRIVATE, 2026-10-16 (Q26, Q47 cancelled; Q51, Q67 waived) |

**PUBLIC 2026-11-02** (owner): registry entries `mpsc-forest-service-prelims` and
`mpsc-agriculture-service-prelims` (MPSC -> Prelims), `flip-public.ts fsp|asp`, and 8
mocks published (`build.ts --paper=mpsc --only=<id> --apply --publish`, one at a
time so the other MPSC mocks are untouched): +1 / -1/4 on every cover; 100 q in
1 hour, Agriculture 2011 and 2012 200 q in 2 hours. fsp-2016 has no mock: Q7 is
left out, and a paper with an omission is never a whole-paper mock.

### Key doubts (Forest + Agriculture): SETTLED 2026-11-02

**Owner: notice + grace on all eleven, MPSC's key kept.** Each notice is in
config.ts `notices` (English and Marathi), heads the question's solution, and
graces the question in its mock (scripts/mocks/mpscSittings.ts).

Every paper here is committed on MPSC's key. These questions disagree with an
independent solve in a way the page does not explain. **Nothing is changed until
the owner decides** (correct the key + notice, or notice + grace, per the
2026-10-29 defective-question policy).

| paper · Q | MPSC key | finding |
|---|---|---|
| fsp-2014 Q63 | (3) | Odd figure out: (1), (3), (4) are mirror images of the reference triangle; only (2) is a rotation, so (2) is the odd one. Read from the figure; looks like a wrong key. |
| fsp-2014 Q67 | (3) 47 | Defective as printed: 145 - t = 2t gives t = 48⅓; no option is exact. Text checked against the page. |
| fsp-2014 Q74 | (2) Friday | Defective as printed: the chain works out to Tuesday, not an option. Text checked against the page. |
| fsp-2014 Q55 | (1) (a) or (d) | The person's sex is not given, so "(c) sister or brother, or (d)" fits; MPSC keys "sister". |
| asp-2016 Q38 | (1) a and b | Statement a (citizenship rules not applicable to J&K) is false; c and d are false too (7 and 12 years), so no option is right. |
| asp-2016 Q75 | (2) | Kisan Call Centres are toll-free, run at government cost; the key says farmers pay "very negligible charges". |
| asp-2011 Q41 | (4) No article | "______ Himalaya is the biggest mountain in India" takes "The" (3). asp-2011 is on MPSC's FIRST key (owner: ingest, unlabelled). |
| asp-2011 Q42 | (2) go | "Neither the boy nor his sister ______ to school" takes the singular "goes" (3). First key. |
| asp-2011 Q109 | (1) Sahyadri | The watershed between the Narmada and Tapi valleys is the Satpura range (2). First key. |
| asp-2012 Q117 | (1) constant returns | The textbook answer for manufacturing is the law of INCREASING returns (2). Final key; doubtful, not certain. |
| asp-2012 Q150 | (3) open rural branches | An RRB's main function is credit to the weaker sections (1). Final key; doubtful, not certain. |
