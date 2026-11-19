# RRB NTPC ingestion

RRB NTPC (Railway Recruitment Boards, Non-Technical Popular Categories) past papers into the bank
(`question_kind='pyq'`), as TWO exams, one per level, grouped in the picker as family "RRB NTPC"
(axis "Level"): **RRB NTPC** (`rrb-ntpc`, Graduate level CBT 1 of cycle CEN 06/2025, sat 16-27
March 2026: 24 shifts) and **RRB NTPC Undergraduate** (`rrb-ntpc-undergraduate`, the Class 12
level, CBT 1 of cycle CEN 07/2025, sat 7-9 May and 13-20 June 2026: 32 shifts; see
"Undergraduate" below). Every script takes `--level=undergraduate` where it matters (graduate when
absent). Not yet: CBT 2 of either level, the June 2025 sitting (cycle CEN 05/2024, not found
hosted).

**Status (2026-11-13): all 24 shifts, 2,400 rows, PUBLIC** (owner's OK; Mathematics 720,
Reasoning 720, General Awareness 960: NTPC's 30/30/40 per paper). Blind agreement with RRB's
tentative key **2,383/2,400 (99.3%)**; 18 rows flawed with a student notice (grace in mocks), 6 with
RRB's figures. No question repeats across the 24 shifts. EXAM_REGISTRY entry `rrb-ntpc` (graduate,
government, mocks) merged; the 24 mocks are built as DRAFTS: publish them in the same minutes as the
push (`npx tsx scripts/mocks/build.ts --paper=rrb-ntpc --apply --publish`).

Eleven subjects: Mathematics, Reasoning, the eight General Awareness subjects CDS and SSC CGL use
(History, Geography, Polity, Economics, Physics, Chemistry, Biology, Current Affairs) and Computer
Knowledge (NTPC asks one to three basic computer questions a paper).

## The source

RRB publishes no papers. The official copy is each candidate's **response sheet**, RRB's own render
(question text, RRB's option order, the key as the option text's colour), shown through the
candidate login during the answer-key objection window (to 12 Apr 2026). **Prepp** hosts the
English copies, one PDF per shift (`SHIFTS` in config.ts records each URL; the files live in
`C:\Vilas\LWS_Pune\RRB\NTPC\2026_Graduate_CBT1\`), re-saved with its logo as a faint watermark, a
`www.prepp.in` page header, and the candidate panel cut away. Prepp's own web pages for these
papers are its retyped quiz version: never a source. Every sheet carries RRB's "for personal use"
undertaking, the same as SSC's; the owner's SSC decision (2026-10-16) was taken to cover it
(2026-11-13). **The key is RRB's TENTATIVE key** (released with the response sheets).

`pyq_year` is the notification cycle (2025), as SSC CGL Tier II files its papers; the sitting date
is in `pyq_note` ("Graduate CBT 1, 16 Mar 2026, Shift 1").

## Pipeline

```sh
# once per shift (all 24 are done: out/ is gitignored, so a fresh checkout redoes these)
python -P scripts/ssc-cgl/tcs_extract.py <shiftId> "<pdf>" --out-root=scripts/rrb-ntpc/out
npx tsx scripts/rrb-ntpc/assemble.ts <shiftId>          # questions.json (KEY) + sheets/text.txt
python -P scripts/ssc-cgl/tcs_sheets.py <shiftId> --out-root=scripts/rrb-ntpc/out --option-letters
python -P scripts/rrb-ntpc/check_sheets.py <shiftId>    # the sheets cannot show the key by layout
# agents draft slices (DRAFTING_BRIEF.md) -> out/<shiftId>/drafts/; concatenate into transcripts/<shiftId>.txt
npx tsx scripts/rrb-ntpc/build.ts <shiftId> --partial   # compare with the key, settle each disagreement
npx tsx scripts/rrb-ntpc/figures.ts <shiftId>           # only when a block declares figure:
npx tsx scripts/rrb-ntpc/build.ts <shiftId>             # -> out/<shiftId>/rows.json
npx tsx scripts/rrb-ntpc/commit.ts <shiftId> [--apply]  # PRIVATE, through commitStaged
# once every shift is committed:
npx tsx scripts/rrb-ntpc/grace.ts [--apply]             # flawed questions -> src/lib/mocks/flawed.json
npx tsx scripts/rrb-ntpc/publish.ts [--level=undergraduate] [--apply]   # whole shifts -> PUBLIC (owner's OK)
npx tsx scripts/mocks/build.ts --paper=rrb-ntpc --apply # 24 mocks as drafts; add --publish with the push
npx tsx scripts/mocks/build.ts --paper=rrb-ntpc-undergraduate --apply   # the 32 Undergraduate mocks
```

DB writes (`commit.ts`, `grace.ts`, `publish.ts`, `seed-*.ts`) read `.env.local` from the current
folder, so run them from the main checkout (`cd Question_Bank && npx tsx ../<worktree>/scripts/...`).
Never copy `.env.local` into a worktree: a test run there would take production for the test
project (the 2026-11-18 incident).

Mocks (`RRB_NTPC_CBT_1`, `scripts/mocks/rrbNtpcSittings.ts`): 100 questions, 90 minutes, +1 / -1/3,
ONE section carrying all eleven subjects, so each mock keeps RRB's printed order. Publish them in
the same minutes as the push that carries the registry's `hasMocks`, as with every exam's mocks.

Before the first commit: `seed-exam.ts --apply` (paste the id into config.ts), then
`seed-subjects.ts --apply`. The catalog is `seed-catalog.ts` (SSC CGL's names, Quantitative Aptitude
renamed Mathematics, English dropped); extend `catalog-authored.json`, never `catalog.json`.

## How the sheet is read

It is the TCS print SSC's 2022-2024 sheets use, so the SSC CGL lane's extractor and reader
(`scripts/ssc-cgl/tcs_extract.py`, `tcs.ts`) read it UNCHANGED, behind `sheet.ts`, which translates
four differences (each tested in `tests/rrb-ntpc-sheet.test.ts`):

- the header says "Test Date" / "Test Time", not "Exam Date" / "Exam Time";
- options are labelled "A." to "D." (renumbered "1." to "4.", only when key-coloured, so a stem line
  "A. ..." is never taken for an option);
- a stem's first line can print a hair above its "Q.n" label and would be lost (4 of 100 on
  16 Mar S1): the label is lifted to its line's top;
- Prepp's text left of the page margin (`www.prepp.in`, a stray quote) would run into whichever
  question is open (16 of 100), since no candidate panel closes a question: it is dropped.

The paper is ONE printed section of 100 with the subjects mixed, so every block names its subject.

**The key also shows through the LAYOUT.** The tick (16 pt) is narrower than a cross, so the keyed
option prints ~2 pt right of the others. `tcs_sheets.py` realigns every option row whose icon lies
inside the question's region, but a region ends at the last option's text and the tick can hang
below it (16 Mar S1 Q21): that row was not realigned and the keyed option printed indented.
`coverIcons` stretches each region over its four icons (and refuses any other count), and
`check_sheets.py` replays the masking and fails unless every question hands it four rows. The
extractor also files a small option PICTURE right of its label as an icon (22 pt wide, 16 Mar S2
Q50), so only an icon ending just left of an option label counts (`optionIcons`).

## Answers: blind first, then the key

As SSC CGL: the transcript's `answer:` is derived from the masked sheets (agents never see the
key); `build.ts` compares it with RRB's key and refuses a disagreement without a `note:`. A
judgement item or a key that is defensible keeps RRB's key with `blind:`; a question with two right
options or none is `flawed: yes` with a student `notice:` (it rides as grace in a mock).

| shift | blind vs key | key adopted | ours kept (flawed) | other flawed | not independent |
|---|---|---|---|---|---|
| 16 Mar S1 | 97/100 | Q32 (two pairs exceed China's border), Q54 (industry and services both grew), Q85 (as printed no option is last to arrive AND last to leave): all flawed | none | none | Q89 |
| 16 Mar S2 | 100/100 | none | none | none | none |
| 16 Mar S3 | 100/100 | none | none | Q38 (ending ad hoc T-bills = ending automatic monetisation) | none |
| 17 Mar S1 | 100/100 | none | none | Q79 (box stack allows 4 or 2 above C) | none |
| 17 Mar S2 | 99/100 | Q29 (public apathy vs betrayal: Ghadar), flawed | none | none | none |
| 17 Mar S3 | 100/100 | none | none | none | none |
| 18 Mar S1 | 100/100 | none | none | none | none |
| 18 Mar S2 | 98/100 | Q6 (Sleep keeps the session open; judgement) | Q61 (the 1991 instrument is the IEM; the key's form does not exist) | none | none |
| 18 Mar S3 | 100/100 | none | none | none | none |
| 19 Mar S1 | 100/100 | none | none | none | none |
| 19 Mar S2 | 99/100 | none | Q87 (citizenship by descent needs one citizen parent; the key says both) | none | none |
| 19 Mar S3 | 100/100 | none | none | none | Q14 (read another shift's settled solution) |
| 22 Mar S1 | 100/100 | none | none | none | none |
| 22 Mar S2 | 98/100 | Q33 (our count missed the N after '='); Q55 (microprocessors vs ICs), flawed | none | none | none |
| 22 Mar S3 | 99/100 | none | Q30 (Article 165 is the Advocate-General, not the oath) | none | none |
| 24 Mar S1 | 100/100 | none | none | none | none |
| 24 Mar S2 | 99/100 | none | Q35 (DST's announced ESTIC 2025 theme is B; nothing supports the key's D) | none | none |
| 24 Mar S3 | 100/100 | none | none | none | none |
| 25 Mar S1 | 98/100 | Q5 (mining and capital goods both slowed), flawed | Q90 (two orders fit both statements; key says sufficient) | none | Q5 |
| 25 Mar S2 | 100/100 | none | none | none | none |
| 25 Mar S3 | 99/100 | none | Q97 (a glacier makes a U-shaped valley; key says V) | none | none |
| 27 Mar S1 | 99/100 | none | Q77 (the RTI report was the Second ARC's) | Q9 (true minimum 186 is below every option) | none |
| 27 Mar S2 | 99/100 | Q47 (black soil: one rabi crop vs two seasons), flawed | none | none | none |
| 27 Mar S3 | 99/100 | Q57 (statement 1 outdated by the exam: Radhakrishnan became Vice-President), flawed | none | none | none |

## Undergraduate (Class 12 level)

**Status (2026-11-19): all 32 shifts, 3,200 rows, PRIVATE** (publish with the owner's OK:
`publish.ts --level=undergraduate --apply`, then the 32 mocks with the push). Blind agreement with
RRB's tentative key **3,181/3,200 (99.4%)**; 21 rows flawed with a student notice (grace in mocks),
5 with RRB's figures. No question repeats across the 32 shifts, nor with Graduate (same content hash). Mathematics 960, Reasoning 960, General Awareness 1,280. Three answers are not independent (a search surfaced the question): 13 Jun S2 Q70, 14 Jun S3 Q36, 8 May S3 Q40.

**Source.** The same Prepp-hosted TCS response sheets, English copies, one PDF per shift in
`C:\Vilas\LWS_Pune\RRB\NTPC\2026_UG_CBT1\` (`RRB_NTPC_UG_CBT1_<date>_S<n>_EN.pdf`; `url` is null in
config.ts, the files were downloaded by hand). 13 June held shifts 2 and 3 only. `pyq_year` is the
cycle (2025), `pyq_note` "Undergraduate CBT 1, 7 May 2026, Shift 1".

**The paper differs from Graduate in one way the reader must know:** it prints THREE sections in a
fixed order, Mathematics (Q1-30), General Awareness (Q31-70), General Intelligence and Reasoning
(Q71-100), but numbers the questions 1-100 straight through rather than restarting each section.
`assembleTcs` takes `numberedThrough` (opt-in, so SSC's per-section numbering is untouched) and
refuses a printed number outside its section's range (`tests/ssc-cgl-tcs.test.ts`). The level's
layout and the flag live in `LEVELS` in config.ts; `assembleNtpc(g, level)` reads them.

**Mocks** (`RRB_NTPC_UG_CBT_1`, `rrbNtpcUgSittings()`): 100 questions, 90 minutes, +1 / -1/3, the
three printed sections in order. Slugs `rrb-ntpc-undergraduate-cbt-1-<date>-shift-<n>`.

**The recurring free-toys question.** Nearly every shift asks which of four schemes is least
beneficial to a customer who wants N toys, one scheme being "M toys free on buying N". The key
always reads it as N + M toys for the price of N; our blind answers often read it as no saving on
the N she wants. The key's reading is adopted (`blind:` + note) unless it ties another scheme, which
makes it flawed (9 May S3 Q22).

| shift | blind vs key | key adopted | ours kept (flawed) | other flawed | not independent |
|---|---|---|---|---|---|
| 7 May S1 | 100/100 | none | none | none | none |
| 7 May S2 | 99/100 | none | Q42 (gopurams are Dravidian, not Vesara) | none | none |
| 7 May S3 | 99/100 | Q8 (free toys) | none | none | none |
| 8 May S1 | 100/100 | none | none | none | none |
| 8 May S2 | 99/100 | none | Q65 (Alt + F10 together is not the KeyTips shortcut) | none | none |
| 8 May S3 | 100/100 | none | none | none | Q40 |
| 9 May S1 | 100/100 | none | none | Q70 (no "Innovation Treaty" in the visit's outcomes) | none |
| 9 May S2 | 99/100 | Q20 (free toys) | none | none | none |
| 9 May S3 | 98/100 | Q22 (free toys; schemes C and D tie), flawed | Q46 (the keyed option says the opposite of the stem) | none | none |
| 13 Jun S2 | 99/100 | none | Q43 (the Quantum AI centre went to IIIT Dharwad) | none | Q70 |
| 13 Jun S3 | 99/100 | Q17 (profit per kg charged vs per real kg), flawed | none | none | none |
| 14 Jun S1 | 98/100 | Q18 (free toys); Q66 (Minerva Mills vs Kesavananda), flawed | none | Q100 (B "more than one" is also true) | none |
| 14 Jun S2 | 99/100 | Q55 (no official PMGSY percentage), flawed | none | none | none |
| 14 Jun S3 | 100/100 | none | none | Q46 (ALT EFF 2025 ran in many cities) | Q36 |
| 15 Jun S1 | 100/100 | none | none | none | none |
| 15 Jun S2 | 99/100 | none | Q68 (ASCII has 33 control characters, with DEL) | Q33 (two states signed MoUs) | none |
| 15 Jun S3 | 99/100 | Q79 (two box stacks fit), flawed | none | none | none |
| 16 Jun S1 | 100/100 | none | none | none | none |
| 16 Jun S2 | 100/100 | none | none | none | none |
| 16 Jun S3 | 99/100 | Q16 (free toys) | none | none | none |
| 17 Jun S1 | 99/100 | none | Q41 (Pragati Maidan is the exhibitions ground) | none | none |
| 17 Jun S2 | 99/100 | Q15 (free toys) | none | Q28 (men's and women's work rates never compared) | none |
| 17 Jun S3 | 100/100 | none | none | none | none |
| 18 Jun S1 | 100/100 | none | none | none | none |
| 18 Jun S2 | 99/100 | none | Q3 (by BODMAS the division applies to the bracket alone) | none | none |
| 18 Jun S3 | 99/100 | none | Q14 (Q is the largest angle, so PR is longest) | none | none |
| 19 Jun S1 | 100/100 | none | none | none | none |
| 19 Jun S2 | 100/100 | none | none | none | none |
| 19 Jun S3 | 99/100 | none | Q7 (area is 45 cot 4 degrees, not tan) | Q8 (A and B both claim 1/8 of the profit) | none |
| 20 Jun S1 | 100/100 | none | none | none | none |
| 20 Jun S2 | 100/100 | none | none | none | none |
| 20 Jun S3 | 100/100 | none | none | none | none |
