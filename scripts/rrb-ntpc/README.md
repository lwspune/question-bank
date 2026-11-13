# RRB NTPC ingestion

RRB NTPC (Railway Recruitment Boards, Non-Technical Popular Categories) past papers into the bank
under the **RRB NTPC** exam (`question_kind='pyq'`). Scope so far: **Graduate level CBT 1 of cycle
CEN 06/2025, sat 16-27 March 2026: 24 shifts of 100 questions.** Not yet: Graduate CBT 2, the
Class 12 level (a separate exam), the June 2025 sitting (cycle CEN 05/2024, not found hosted).

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
```

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

| shift | blind vs key | key adopted (all flawed) | not independent |
|---|---|---|---|
| 16 Mar S1 | 97/100 | Q32 (two pairs exceed China's border), Q54 (industry and services both grew), Q85 (as printed no option is last to arrive AND last to leave) | Q89 (a fact search showed the question) |
