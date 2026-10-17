# SSC CGL ingestion

SSC CGL past papers into the bank under the **SSC CGL** exam (`question_kind='pyq'`), 11
subjects: Reasoning, Quantitative Aptitude, English, and General Awareness split into the eight
subjects CDS General Knowledge uses (History, Geography, Polity, Economics, Physics, Chemistry,
Biology, Current Affairs; owner, 2026-10-16).

**Status (2026-10-17): Tier I 2025, every readable shift: 38 shifts, 12 to 26 September, 3,735 rows
committed PRIVATE (some hosted files lack a shift or a PART, and repeats are in repeats.json; see
"Not read yet"). Nothing is PUBLIC.** Not in `EXAM_REGISTRY`, no mocks yet.

## The source, and why it is the only one

SSC never posts its papers. The only official copy is a candidate's **response sheet**: the
"challenge module" saved paper, behind the candidate login for a few weeks after each key.
It is SSC's own render: one fixed question order per shift (the same for every candidate of
that shift), English and Hindi, and the key coloured into each option's left cell. AglaSem
hosts these printed to PDF, one file per exam DAY holding every shift
(`DAYS` in `config.ts` records the URL; the files live in `C:\Vilas\LWS_Pune\SSC\CGL\`).
Typed coaching compilations are NOT a source (they are derived).

Every sheet carries SSC's undertaking that the saved paper is "for my personal use". The owner
weighed that on 2026-10-16 and decided to ingest: questions are free to browse here, what we sell
is answers and mocks, and the big publishers carry the same papers.

**The 2025 Tier I key is PROVISIONAL.** These sheets come from the challenge window (opened
2025-10-16); the final key was released only through candidate login (until 2026-02-08).

## How the sheet is read

Questions and options are **images** (screen resolution), not text. Only `Q.No: n`, the
`PART-A..D (...)` headings and the `(Shift-n)` header are a text layer. The key is not text
either: it is the FILL of an option row's narrow left cell.

| fill | meaning |
|---|---|
| green | correct option, chosen by the candidate |
| yellow | correct option, not chosen |
| red | wrong option chosen |
| grey | not answered |

So the key is the one option row coloured green or yellow. AglaSem's watermark is page TEXT
drawn over the images, so the extracted image objects are clean SSC images.

## Pipeline

```sh
python -P scripts/ssc-cgl/extract.py <dayId> "<day pdf>"   # geometry.json + every image -> out/<dayId>/
npx tsx scripts/ssc-cgl/assemble.ts <dayId>               # -> out/<shiftId>/questions.json (part, images, key)
python -P scripts/ssc-cgl/sheets.py <shiftId>             # reading sheets, NO key colour -> out/<shiftId>/sheets/
# author transcripts/<shiftId>.txt (format: lib.ts) - stem, options, subject (GA only),
# chapter, subtopic, difficulty, OUR answer, OUR solution. Solve before comparing with the key.
npx tsx scripts/ssc-cgl/build.ts <shiftId> --partial      # check as you go, writes nothing
npx tsx scripts/ssc-cgl/build.ts <shiftId>                # -> out/<shiftId>/rows.json
npx tsx scripts/ssc-cgl/commit.ts <shiftId> [--apply]     # PRIVATE, through commitStaged
```

### Drafting with agents (from Shift 3)

The owner's standing ingestion policy (global CLAUDE.md, 2026-10-16): up to 5 agents at once,
one slice each, the main session reviews every draft and alone writes the DB and git. Here a
slice is one PART (25 questions). Each agent reads only `out/<shiftId>/sheets/`, writes
`out/<shiftId>/drafts/part-<A..D>.txt`, and checks it with

```sh
npx tsx scripts/ssc-cgl/build.ts <shiftId> --blind --file=out/<shiftId>/drafts/part-A.txt
```

`--blind` drops the key as it is read and prints only catalog, part and rendering problems,
so a draft stays a blind derivation. The main session concatenates the parts into
`transcripts/<shiftId>.txt`, reads every block, runs the normal `build.ts` (which compares with
the key) and settles each disagreement as above. A passage set is checked pixel-identical
across its questions before `context_from` is trusted.

The agent rules live in [DRAFTING_BRIEF.md](DRAFTING_BRIEF.md), so a prompt only names the slice (shift, PART,
range, output path, and the passage set). Measured on 19 Sep: 12 parts, about 2 to 3.5 minutes
each, 5 running at once.

**Find passage sets by comparing pixel ROWS from the top, not a fraction of each image's height.**
Two copies of one passage can differ in height (the question line below it differs), and a
"top 60%" slice then compares different lengths: 19 Sep S3 Q91 looked different from Q92-95 that
way, though its first 536 rows are identical.

`python -P` (not `-I`): PyMuPDF lives in user site-packages, and `-P` still keeps the script
and working directories off the import path.

`assembleQuestions` (lib.ts, tested) refuses any question that does not read as one stem cell
plus four option cells with exactly one key colour. The traps it handles, all found on the
first file:
- **Each question is its own table, so the key column's width varies** (x1 123, 129, 131; x0
  78-82). The cell filter is a band, never a measured page edge.
- **A stem cell starts a few points ABOVE its own `Q.No` label**, so cells sort by midpoint;
  by top edge every stem lands in the previous question.
- **The table's left edge moves with the page width** (16 Sep is a wider page than 18 and 19 Sep:
  0 cells read until the bands were measured from each page's table edge, BORDER-filled drawings).
- **A label can be clipped**: 16 Sep S1 printed Q48's label as "Q.No: 4". When the expected number
  starts with the label read, it is repaired and logged (`onRepair`), never silently.
- **A hosted file can lack a whole PART** (16 Sep S3 jumps from PART-B to PART-D). `DAYS` declares it
  (`missing`), and every check then expects exactly the questions that exist.
- **Hosted files can hold only some shifts** (13 Sep: Shifts 2, 3; 22 Sep: 1, 3), declared with
  `present`, and can mix renders: 20 Sep holds a readable Shift 1 on pages 2-5 (`extract.py
  --pages=2-5`) followed by a render with no text labels and then screenshots, not read yet.
- **A page break splits a row into two cells.** Too many cells means the page-straddling
  pair is re-joined (65 of 300 questions on 18 Sep).

## Answers: blind first, then the key

The transcript's `answer:` is ours, derived from the sheets (which never show the key).
`build.ts` then compares it with the key and refuses a disagreement without a `note:`.
On review:
- **Judgement items** (does a conclusion follow, is an assumption implicit) and facts we
  guessed: the bank carries SSC's key, and `blind:` keeps our original answer so the blind
  accuracy is never rewritten.
- **Where the key looks wrong** (grammar, maths, fact): our answer stays, with a note, and the
  row is `flawed: yes`, so it stays PRIVATE until someone reviews it.

| shift | blind vs key | key adopted | ours kept (flawed) | other flawed |
|---|---|---|---|---|
| 18 Sep S1 | 98/100 | Q6, Q7 (judgement) | none | Q48 (asks the 2024 winner; the options fit 2023), Q88 (no true homonym of "fief") |
| 18 Sep S2 | 98/100 | Q36 (fact, our guess) | Q87 (error is in part 1, key says 2) | none |
| 18 Sep S3 (agents) | 97/100 | Q50, Q99 (judgement); Q44 (key adopted but held: no option states Art. 258A) | none | Q12 (contradictory syllogism), Q54 (1:1 and 5:5 both offered) |
| 19 Sep S1 (agents) | 97/100 | Q82, Q100 (judgement) | Q37 (Navy's own page: the final was against the Air Force, not the Army) | Q88 (no true homonym of "basilica") |
| 19 Sep S2 (agents) | 99/100 | none | Q22 (no one in a circle has 3 neighbours; key 20 fits 2) | Q95 ("NOT a factor": B and C also hinder) |
| 19 Sep S3 (agents) | 97/100 | Q14 (judgement), Q46 (fact unconfirmed either way); Q88 (key adopted but held: no English "line-up" sense of tableau) | none | none |
| 16 Sep S1 (agents) | 96/100 | Q40 (PM against CM), Q99, Q100 (judgement; the paper prints one rearrangement twice) | Q43 (Amrit Sarovar's target was 2023, not 2024) | none |
| 16 Sep S2 (agents) | 98/100 | Q1 ('between' counted inclusively) | Q20 (each letter +2 gives XCRQT; the key swaps two letters) | Q39 (ethylene does start germination), Q56 (no six consecutive integers average 6) |
| 16 Sep S3 (agents, 75 q) | 74/75 | none | Q88 (key B uses 'current' in the same sense) | none |
| 12 Sep S1 (agents) | 100/100 | none | none | Q82 (barely and scarcely both fit), Q88 (no true homonym of "introit") |
| 12 Sep S2 (agents) | 98/100 | Q9 (word list: DORP), Q98 (judgement) | none | Q88 (no true homonym of "gules") |
| 12 Sep S3 (agents, 99 rows) | 98/100 | Q21 (judgement) | Q82 ("the negotiations" needs "were") | Q33 (Hot Stage is a crime novel; no option fits). Q65 repeats 16 Sep S2 Q59 (repeats.json) |
| 14 Sep S1 (agents) | 98/100 | none | Q62 (the cost prices give a profit, the key says loss), Q84 ("No sooner had the findings published" lacks "been") | Q53 (1:1 and 25:25 both offered), Q88 (no true homonym of "pauldron") |
| 14 Sep S2 (agents) | 98/100 | Q43 (PMKSY's ministry, our guess) | Q41 (PSLV-C59 flew in December 2024, not October) | Q83 ("On" and "Upon" both fit) |
| 14 Sep S3 (agents, 99 rows) | 95/100 | Q38, Q65, Q82, Q89 (judgement) | Q96 (the key gives "adapt adapt to") | Q88 (no true homonym of "rheme"). Q53 repeats 12 Sep S2 Q52 |
| 15 Sep S1 (agents, 98 rows) | 97/100 | Q35 (fact unconfirmed), Q89 (judgement) | Q22 (the key's equation gives 16, not 12) | Q14 repeats 12 Sep S1 Q19, Q100 repeats 14 Sep S3 Q99 |
| 15 Sep S2 (agents) | 100/100 | none | none | Q56 (no four consecutive odd numbers average 5) |
| 15 Sep S3 (agents) | 100/100 | none | none | Q95 ("lest he fall" and "for fear of falling" both fit). Q99 repeats 12 Sep S1 Q100, Q100 repeats 15 Sep S2 Q100 (98 rows) |
| 17 Sep S1 (agents) | 98/100 | Q46, Q87 (judgement) | none | Q88 (no true homonym of "simony") |
| 17 Sep S2 (agents, 99 rows) | 96/100 | Q9, Q10, Q40 (judgement), Q44 (fact unconfirmed) | none | Q11 (the CIRCLE rule gives TRVFSB, no option). Q16 repeats 12 Sep S2 Q19 |
| 17 Sep S3 (agents) | 100/100 | none | none | Q88 (no true homonym of "corbel") |
| 23 Sep S1 (agents) | 96/100 | Q47 (judgement) | Q8 (some books are novels does not make all novels books), Q16 (84 fits no rule), Q19 (some pens are books follows; key D checked on the page) | Q73 (the radius is not fixed), Q80 (sceptic and skeptic both correct) |
| 23 Sep S2 (agents, 99 rows) | 96/100 | Q38 (fact, our guess) | Q35 (Muslim majority in J&K in 2011), Q41 (The Golden Gate won the 1988 Sahitya Akademi Award), Q77 ("in the absence of") | Q99 repeats 17 Sep S2 Q99 |
| 23 Sep S3 (agents) | 98/100 | Q99 (judgement) | Q21 (the possibility in II follows) | none |
| 26 Sep S1 (agents) | 98/100 | Q11 (judgement) | Q14 (nothing links bags to scales) | Q8 (the right-end digits sum to 14, no option) |
| 26 Sep S2 (agents) | 95/100 | Q96, Q99 (judgement); Q93, Q94 (key carried on defective items, held) | Q2 (Indore is on the 11th either way) | Q20 (diagonal 58.31, no exact option), Q31 (no 2021 winner fits both clues) |
| 26 Sep S3 (agents) | 99/100 | Q94 (judgement) | none | none |
| 13 Sep S2 (agents, 99 rows) | 98/100 | Q1, Q48 (judgement) | none | Q88 (no true homonym of "oriel"). Q100 repeats 12 Sep S1 Q100 |
| 13 Sep S3 (agents, 99 rows) | 97/100 | Q93 (judgement) | Q23 (the expression gives 20), Q98 (direct speech undoes the backshift) | Q95 (the options are longer than the highlight). Q99 repeats 12 Sep S1 Q100 |
| 20 Sep S1 (agents) | 98/100 | Q14, Q99 (judgement) | none | none |
| 21 Sep S1 (agents, 99 rows) | 98/100 | none | Q18 (I follows from the two statements), Q40 (earlier National Games were held across several cities) | Q6 repeats an earlier shift (repeats.json) |
| 21 Sep S2 (agents, 75 q) | 71/75 | Q48 (fact, our guess), Q89, Q96, Q97 (judgement) | none | Q93 (no true homonym of "trisagion") |
| 21 Sep S3 (agents, 99 rows) | 97/100 | Q10, Q100 (judgement) | Q22 (key 89 fits no rule; every rule gives 91) | Q99 repeats 14 Sep S2 Q100 |
| 22 Sep S1 (agents, 98 rows) | 97/100 | Q97, Q99 (judgement) | Q22 (some rats are dogs does not follow) | Q93 (no true homonym of "breviarium"). Q60 repeats 26 Sep S1 Q58, Q75 repeats 21 Sep S2 Q75 |
| 22 Sep S3 (agents) | 97/100 | Q89, Q94 (judgement); Q99 (key carried on a defective item, held) | none | Q93 (no true homonym of "paten"), Q99 (B and C print the same order) |
| 24 Sep S1 (agents, 99 rows) | 98/100 | Q76, Q96 (judgement) | none | Q30 (no 2021 winner is Nigerian), Q51 and Q54 (two options equal), Q95 ("as if" and "as though" both fit). Q5 repeats 19 Sep S3 Q6 |
| 24 Sep S2 (agents) | 95/100 | Q36, Q40, Q88, Q99 (judgement), Q42 (fact, our guess) | none | Q93 (no true homonym of "aporia") |
| 24 Sep S3 (agents) | 95/100 | Q39, Q77, Q98, Q99 (judgement) | Q12 (three of the four are palindromes) | Q89 (no option is active voice) |

## Repeated questions

SSC re-asks questions word for word across shifts (12 Sep S3 Q65 is 16 Sep S2 Q59). The bank keeps
one row per `(org, exam, content_hash)`, so the later copy is skipped, and `commit.ts` writes its
place to `repeats.json` (shift, number, the row it repeats). A mock of that shift must take the
question from there; the shift's own `source_file` holds one row fewer than its paper.

## The catalog

`catalog.json` is GENERATED by `seed-catalog.ts`: CDS's chapter and subtopic names for
Mathematics (renamed Quantitative Aptitude), English and the eight GK subjects, plus
`catalog-authored.json` (all of Reasoning, and SSC topics CDS lacks). When a question fits
nothing, extend `catalog-authored.json` and re-run the generator; never edit `catalog.json`.

## 2022-2024: the TCS response sheet

Before the 2025 challenge module, SSC's only copy of a paper was the candidate's TCS
**response sheet**. AglaSem hosts it as PDFs (2024: one file per day, running past its own
day; 2022: one file per shift). It prints the question as text and the key as the option
text's COLOUR (green right, red wrong), with a tick or cross icon beside each option and a
right-hand panel (Question ID, Status, Chosen Option: the candidate's own answer).

```
python -P scripts/ssc-cgl/tcs_extract.py <dir> "<pdf>"     # spans, images, icons, panels, frames
npx tsx scripts/ssc-cgl/assemble-tcs.ts --year=2024        # questions.json (KEY) + sheets/text.txt
python -P scripts/ssc-cgl/tcs_sheets.py <shiftId>          # masked reading sheets
# agents draft (DRAFTING_BRIEF.md, "2024 shifts"), then as for 2025:
npx tsx scripts/ssc-cgl/figures.ts <shiftId>               # figures/<shiftId>/ from SSC's image objects
npx tsx scripts/ssc-cgl/build.ts <shiftId>
npx tsx scripts/ssc-cgl/commit.ts <shiftId> --apply        # uploads figure pictures too
```

- **Shift = the sheet's own Exam Date + slot**, never the file (a 2024 file ends with the next
  day's first shift). `groupTcsShifts` keeps the first of two identical copies of a shift and
  refuses copies that differ.
- **Readers.** `tcs.ts` reads the text layer, and has learned each print's quirks, each with a
  test: scaled pages (gutter at x 104), "Q.n"/"Ans" broken over lines beside a wide picture,
  "Section :" and its name as separate spans, a label fused with the stem ("Q.11 Select..."),
  key colours by HUE (each year its own shade), the 18 Jul 2023 print's unlabelled header and
  text-glyph ticks, the right-hand panel as its own LINES (a stem tail can print past its x).
  `vector.ts` reads the 2022 **vector print** (5-13 Dec), which has no text at all: a question
  is the run of grey frames up to the one holding the panel box, numbered by order, and the key
  is the tick icon (an 84x84 picture against the cross's 31x21).
  The 2023 **scans** (17-24 Jul, 14 Jul from 2:30) are the same print, four sheets to a day file:
  each sheet is registered by its page range (`shiftPages`, found from its raster first page and
  printed Exam Time) and extracted to its own folder (`--pages`). The tick is a 23x23 picture,
  and each sheet's FIRST page is one raster picture with an OCR layer: its 1-3 questions are
  found by their OCR "Q.n" labels and keyed by `marks`, the green and red pixels tcs_extract.py
  reads in the icon column; `tcs_sheets.py` masks those regions by pixel (`unkey_scan`).
- **Masking** (`tcs_sheets.py`): key-coloured fills AND strokes repainted the body grey (2022
  underlines option text in the key colours), tick and cross icons and the panel painted white,
  the candidate's chosen option never shown. A question with no picture that still shows key
  colour **stops the run**; on a pictured one (a coloured chart) it is printed for a look.
  **The key also leaks through LAYOUT** (found 2026-10-17): in the vector print and the 2023
  scans the tick is wider than the cross, so the keyed option's number prints ~2 pt right of the
  others. `align_scan_rows` shifts each option row (a band halfway to its neighbours, so a tall
  option picture moves whole) and the run **stops** if the rows still start at different x.
  Icon pictures are recognised by pixel size AND position (within 40 pt of the frame's left
  edge, as vector.ts reads them): an option printed as a small picture can have a cross's size.
  The text-layer prints (2022 1-3 Dec, 2023 14/25-27 Jul, 2024) set labels at a fixed x.
- **Figures** (`figures.ts`): `figure:` names SSC's own image objects; a stem with several is
  stacked into one picture. A figure row is hashed with its picture bytes (figureAwareHash), so
  two mirror-image items with the same stock wording and answer letter are not filed as repeats
  of each other; `[figure]` options are stored as empty text beside `options.image_url`.
- **Held for review** (beyond wrong keys): items SSC printed in Hindi only (our English is a
  translation), stems SSC's print cuts off or washes out, a chart whose legend is blank.
- **Not readable yet:** 1 Dec 2022 Shift 3 (the file starts mid-paper); 5 Dec S4, 7 Dec S2,
  9 Dec S3, 12 Dec S4 2022 (several different papers in one vector file, headers unreadable);
  7 Dec 2022 S3 (106 questions); 27 Jul 2023 S4 (not in the hosted file). Every other 2023
  sheet reads (39 shifts). More 2022 shifts (13 Dec S2 on) and 2021 sit on AglaSem listing
  pages not yet loaded.

## Not read yet (source problems, not ours)

- **14 Oct 2025** (re-exam, one shift labelled Shift 2): the hosted print has no vector table on
  its first pages and too few cells on most others for their labels; it also skips Q18-23 and
  prints PART-D twice. Needs a different reader (image-based), so it is left out.
- **20 Sep 2025 beyond Shift 1**: pages 6-38 are a render with no text `Q.No` labels and pages
  39-42 are screenshots.

## Not built yet

- **Figures for the 2025 render.** The TCS lane attaches figures (above); a 2025 question is
  all pictures, so its figures would need cropping from the render. None was needed so far.
- **Hindi.** English only. Hindi can come later through the MPSC translation layer
  (migration 0118) without changing `content_hash`.
- **Mocks** (+2 / -0.5, 60 min, a shift = a mock) and the `EXAM_REGISTRY` entry
  (`tier: "graduate"`, `mocks`), both with publishing.
