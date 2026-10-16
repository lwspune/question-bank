# SSC CGL ingestion

SSC CGL past papers into the bank under the **SSC CGL** exam (`question_kind='pyq'`), 11
subjects: Reasoning, Quantitative Aptitude, English, and General Awareness split into the eight
subjects CDS General Knowledge uses (History, Geography, Polity, Economics, Physics, Chemistry,
Biology, Current Affairs; owner, 2026-10-16).

**Status (2026-10-17): Tier I, 12, 14, 16, 18 and 19 September 2025, fifteen shifts: 1,472 rows
committed PRIVATE (16 Sep Shift 3 is 75: the hosted file has no PART-C; two repeats are in repeats.json). Nothing is PUBLIC.** Not in `EXAM_REGISTRY`, no mocks yet.

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

## Not read yet (source problems, not ours)

- **14 Oct 2025** (re-exam, one shift labelled Shift 2): the hosted print has no vector table on
  its first pages and too few cells on most others for their labels; it also skips Q18-23 and
  prints PART-D twice. Needs a different reader (image-based), so it is left out.
- **20 Sep 2025 beyond Shift 1**: pages 6-38 are a render with no text `Q.No` labels and pages
  39-42 are screenshots.

## Not built yet

- **Figures.** Neither pilot shift had a figure question; `commit.ts` refuses a row that
  declares one. Reasoning figure items (mirror images, paper folding) will need the SSC image
  objects attached, the way MHT-CET attaches `imageRefs`.
- **Hindi.** English only. Hindi can come later through the MPSC translation layer
  (migration 0118) without changing `content_hash`.
- **Mocks** (+2 / -0.5, 60 min, a shift = a mock) and the `EXAM_REGISTRY` entry
  (`tier: "graduate"`, `mocks`), both with publishing.
