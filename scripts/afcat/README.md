# AFCAT practice ingestion

Exam **AFCAT** (`08e1b680-4711-4164-abd4-ae27543cd221`), subject **Numerical
Ability**. Rows are `question_kind='practice'`, except the AFCAT past-year
questions printed in a Group C book chapter, which go in as `pyq` with their
year and sitting (owner's call, 2026-10-14; `pyq_note` says they come from a
compilation, not the paper). Everything is written PRIVATE at insert and made
PUBLIC only after review. Source:
`C:\Vilas\LWS_Pune\AFCAT_CDS\Subject_Content\Maths\Class_Notes\02. Arithmetic_Maths`.

## The three source groups

| Group | What | Text | Key | Extraction |
|---|---|---|---|---|
| A | LWS quizzes (`Quiz/*.docx` + `_AK`) | clean (pandoc) | AI-written, letters mostly right, stated values often wrong (Mixtures: 13 of 30 disagree with their own options) | `extract-quiz.ts` |
| B | "Errorless" sheets (`*ERRORLESS*.pdf`) | clean text layer, two columns | letters (sometimes with values) in an ANSWERS box per section; four are pictures | `extract-errorless.ts`, then `read-keys.ts` after pass 1 |
| C | Published books, other institutes' sheets | stacked fractions break the text layer | book key + solutions | page images, transcribed |

**Questions a source tags as a CDS past-year question (e.g. "2015 II") are NOT
ingested here** (owner's call, 2026-10-09). Slide decks, notes `.docx` and the
`_v1` / `_vshared` / `_backup` copies are skipped.

## Why every key is re-derived

No source key is trusted. Group A's keys were written by an AI (one literally
contains "Actually: Let me recalculate"); Group B's look machine-generated;
Group C is a book key. Two independent sources must agree before a key ships:
the source and a blind pass. Where they disagree, a person adjudicates.

The shipped **solution, subtopic and difficulty are authored** by the blind
pass-1 agent, not copied: Group A solutions are terse AI notes with self-talk,
Group B has none, and Group C's text layer garbles them.

## Per-chapter loop

1. **Register** the chapter in `config.ts`: `chapterName`, `subtopics` (the
   only names a row may carry), `files` in order (`NN` in ids = position).
2. **Extract** each file to `data/<chapter>/<key>.source.json` (committed, the
   transcription of record). Group A: `npx tsx scripts/afcat/extract-quiz.ts <chapter>`.
   It refuses to write a file with numbering gaps or parse errors; repair a
   source typo with a `textFixes` entry (find, replace, reason) in config.
   Its report prints the key's flags, so when the main session will run pass 1,
   send it to a file and read only the first line (`> out/<chapter>-extract.log`)
   until pass 1 is written.
   Group B: `npx tsx scripts/afcat/extract-errorless.ts <chapter>` (PyMuPDF via
   `pdf-words.py`). Numbering restarts per "Type-" section, so an id is
   section x 100 + printed number (`02-312`: file 02, section 3, Q12). The key
   goes to `<key>.keytext.json` and is never printed. After pass 1:
   `npx tsx scripts/afcat/read-keys.ts <chapter> --files=<key>`. A picture key
   leaves an empty block: crop the box from the page, transcribe it into the
   keytext file as `n. x) value` lines, and mark the block `transcribed`.
3. **Blind packets:** `npx tsx scripts/afcat/dump-verify.ts <chapter> [--files=..] [--size=25]`.
   Stem + options only. No key, no source solution, no extraction flags.
4. **Pass 1:** one agent per packet, working to `AGENT_BRIEF.md` (PASS 1).
   Output `out/<chapter>/derived-NN-P.json`. Agents only when the owner asks for
   them; otherwise the main session solves the packets itself, to the same brief,
   having read only the quiz questions (never a key file or the extraction
   report). The seven quizzes after the pilot were done this way (2026-10-14).
5. **Merge:** `npx tsx scripts/afcat/merge-derived.ts <chapter>`. Validates each
   output against its packet (ids, subtopics, the solution's publish rules) and
   refuses on any problem. Writes `data/<chapter>.derived.json`.
6. **Compare:** `npx tsx scripts/afcat/compare.ts <chapter>`. Above ~5%
   disputes, run a pass 2 (`AGENT_BRIEF.md` PASS 2) on the disputed rows, as in
   `scripts/worksheets/README.md` step 4b. When the main session did pass 1, a
   recheck by the same session is not independent: recompute each disputed value
   exactly in code instead, and read the source key's own working (it often
   reaches the right value and then states another).
7. **Adjudicate** in `data/<chapter>.overrides.json` (`answer` / `options` /
   `stem` / `solution` / `subtopic` / `difficulty` / `exclude`, each with a
   `reason`). A reason containing "key stands" settles a dispute where the
   source key is right and the blind pass was wrong. **`build.ts` refuses to
   build any unadjudicated dispute, and any row with two options of equal
   value** ("1/2" beside "26/52", "2:5" beside "6:15", one text printed twice;
   `equalValueOptions` in `lib.ts`). Repair the duplicate with a wrong value a
   student would really produce, never the keyed letter.
   House rules used so far: when no option is right, put the true value into an
   option (keeping the source's wrong answer as a distractor when it is a real
   mistake); a truncated decimal is rounded (16.66% to 16.67%); a question that
   needs both its stem and an option rewritten, or that contradicts itself, is
   excluded; so is a question that repeats another in the same file sum for sum.
8. **Rebalance:** `npx tsx scripts/afcat/plan-shuffles.ts <chapter> --write`.
9. **Commit:** `npx tsx scripts/afcat/commit.ts <chapter>` (dry run), then
   `--apply`. One `source_file` per FILE (`AFCAT_<Chapter>__<key>`).
10. **Audit:** `npm run audit:keys -- AFCAT_` and `npm run audit:text -- AFCAT_`.
11. **Review:** `npx tsx scripts/afcat/preview.ts <chapter>` writes
    `out/<chapter>.preview.html`, with the excluded rows listed at the end.
    The owner reviews it.
12. **Publish:** `npx tsx scripts/afcat/flip-public.ts <chapter> --apply [--except=ids]`.

A solution-only fix after commit does not reach the database through
`commit.ts` (`content_hash` excludes the solution); anything touching stem,
options or key changes the hash. Correct shipped rows in place, keeping the id.

**Errorless sheets: keep only sound questions** (owner's call, 2026-10-14). Their
answers were set first and many stems printed with numbers that do not reach
them: 250 of 521 failed. A row ships only when stem, options and key agree; the
rest are excluded with a reason that names what the stem actually gives. Record
the blind verdicts to `out/<chapter>/blind-NN.json` BEFORE reading the key, as
evidence the pass was blind.

## Group C: book chapters

Single-chapter PDFs of two books: **Conquer the Sky AFCAT** (model practice,
then AFCAT past years by sitting, then an Answers grid and Hints) and **CDS
Pathfinder** (theory, a Practice Exercise, CDS previous years, then a blank
ANSWERS grid and Hints and Solutions). Whole-book PDFs are not taken (owner,
2026-10-14). A `_HW` file is usually some pages of the full chapter: compare
the page text first and use the full chapter (it has the hints); use the `_HW`
file only when it is the folder's only copy.

1. **Render only the question region:** `python scripts/afcat/render-questions.py
   <pdf> out/<x>/q --start=MODEL` (Conquer the Sky) or `--start=PRACTICE
   --also-stop=PREVIOUS` (Pathfinder: its CDS previous years stay out). It renders
   column by column, stops at the first Answers/Hints heading, and, when it stops
   in the left column, renders any questions sitting above the right column's own
   heading as `p<N>-R-top.png`. **Never render a whole book page to read a
   question the tool missed**: the answer grid shares the page (it happened on
   Conquer the Sky Ratio, 2026-10-14; recorded in its blind file).
2. **Transcribe** to `data/<chapter>/<key>.source.json` (ids section x 100 +
   printed number; past-year rows carry `pyq: {year, sitting}`; a question with
   no sitting heading of its own follows the one above it in print order, noted in
   `transcribed`). Tables as pipe tables; a directions passage is inlined into each
   stem it governs. A figure is `figure: {page, bbox, pad?}` in PDF points: find
   the box with `figure-boxes.py <pdf> <page>`, or by hand from the column image
   (150 dpi, so points = pixels x 0.48 plus the column's x offset) when hatching
   merges figures; check every crop with `attach-figures.ts <chapter>
   --crop-only` before committing.
3. **Repeats:** search the chapter's other files (and the other book) for the
   same question; a practice repeat is excluded with the id it repeats. An AFCAT
   past-year question is kept even when a practice copy exists (the practice copy
   goes; identical stem and options would collide on `content_hash`).
4. **Blind pass**, written to `out/<chapter>/blind-NN.json` before the key.
5. **Key:** Conquer the Sky's grid, or Pathfinder's Hints items, read from the
   text layer after the blind file exists. Check the key's question count per
   section against the transcript: a mismatch is a missed question. Save it as
   `<key>.keytext.json`, write the letters into the transcript, adjudicate, then
   steps 3-10 of the per-chapter loop.
6. **Figures:** after the commit, `npx tsx scripts/afcat/attach-figures.ts
   <chapter> --apply` uploads each crop to `question-images` and sets `image_url`.

The books' keys are good but not clean: across the chapters below, ~1 in 20
needed a decision (wrong key, no option right, a stem that cannot give one
answer, two options the same).

## Chapter status

| Chapter | Files | Rows | Disputes | Status |
|---|---|---|---|---|
| Time and Work | A: LWS quiz | 50 | 0 of 50 (3 source keys state a wrong value beside the right letter) | committed PRIVATE 2026-10-14, awaiting review |
| Percentage | A: LWS quiz | 44 (6 excluded: repeats) | 1 of 50: Q31 no option right (net change is a decrease; all options were increases) | committed PRIVATE 2026-10-14, awaiting review |
| Mixture and Alligation | A: LWS quiz | 30 | 8 of 30: 6 with no right option, 1 ambiguous, 1 missing a quantity; the key also states a wrong value on 13 | committed PRIVATE 2026-10-14, awaiting review |
| Simple and Compound Interest | A: LWS quiz (v2) | 30 | 3 of 30: 1 wrong key, 2 with no right option | committed PRIVATE 2026-10-14, awaiting review |
| Probability | A: LWS quiz | 30 | 11 of 30, all twins (13 twin rows repaired); every key right in value | committed PRIVATE 2026-10-14, awaiting review |
| Profit and Loss | A: LWS quiz (v1) | 48 (2 excluded: no exact answer, self-contradictory) | 4 of 50: 1 wrong key, 1 no right option | committed PRIVATE 2026-10-14, awaiting review |
| Speed, Time and Distance | A: LWS quiz | 49 (1 excluded: repeat) | 1 of 50: Q7 ambiguous, reworded | committed PRIVATE 2026-10-14, awaiting review |
| Ratio and Proportion | A: LWS test | 49 (1 excluded: needs rewriting) | 11 of 50: 1 wrong key, 8 with no right option, 2 twins (8 twin rows repaired) | committed PRIVATE 2026-10-14, awaiting review |
| Mixture and Alligation | B: Errorless | 16 of 60 | 29 broken stems, 15 repeats | committed PRIVATE 2026-10-14, awaiting review |
| Ratio and Proportion | B: Errorless | 42 of 80 | 38 broken (no whole answer, underdetermined); 2 key errors adjudicated | committed PRIVATE 2026-10-14, awaiting review |
| Simple and Compound Interest | B: SI Errorless | 47 of 81 | 34 excluded (incl. a whole section of round-hundred CI amounts); 1 key error | committed PRIVATE 2026-10-14, awaiting review |
| Simple and Compound Interest | B: CI Errorless | 35 of 60 | 25 excluded (stems omitting "compound", duplicate options); 5 key errors | committed PRIVATE 2026-10-14, awaiting review |
| Clock (new chapter) | B: Errorless | 59 of 80 | 21 excluded (false premises, contradictions); 1 key error | committed PRIVATE 2026-10-14, awaiting review |
| Speed, Time and Distance | B: "BOAT" Errorless | 9 of 40 | the early/late section is ill-posed (20); 11 broken boat stems | committed PRIVATE 2026-10-14, awaiting review |
| Time and Work | B: Errorless | 63 of 120 | 57 excluded (rounded totals, unreachable schedules, underdetermined); 1 key error; 4 picture keys transcribed | committed PRIVATE 2026-10-14, awaiting review |
| Average (new chapter) | B: "AVERAGE ERR" sheet | 48 of 160 | 112 excluded (impossible consecutive-number stems, an underdetermined section, newborns of negative age); 7 key errors | committed PRIVATE 2026-10-14, awaiting review |
| Speed, Time and Distance | B: second Errorless ("err") sheet | 62 of 115 | 53 excluded (a chasing section ~30x off in units, unreachable values); 7 key errors | committed PRIVATE 2026-10-14, awaiting review |

Group C (book chapters; practice + AFCAT past-year questions):

| Chapter | File | Practice | AFCAT PYQs | Out (reason in overrides) | Status |
|---|---|---|---|---|---|
| Decimal and Fractions | Conquer the Sky | 35 | 13 | see overrides | committed PRIVATE 2026-10-14 |
| LCM and HCF | Conquer the Sky | 32 | 4 | see overrides | committed PRIVATE 2026-10-14 |
| Sequence and Series | CDS Pathfinder | 12 | 0 | see overrides | committed PRIVATE 2026-10-14 |
| Squares, Cubes and Roots | CDS Pathfinder | 28 | 0 | 3 repeats of Decimal + 1 | committed PRIVATE 2026-10-14 |
| Heights and Distances | CDS Pathfinder | 25 | 0 | 0 | committed PRIVATE 2026-10-14 |
| Statistics (new) | CDS Pathfinder | 55 (2 pie charts) | 0 | 3 (two defensible answers); Q29 stem, Q37 key corrected | committed PRIVATE 2026-10-14 |
| Area and Perimeter (new) | CDS Pathfinder | 45 (9 figures) | 0 | 1 (no option right) | committed PRIVATE 2026-10-14 |
| Surface Area and Volume (new) | CDS Pathfinder | 77 | 0 | 2 (no option right); Q40 stem corrected | committed PRIVATE 2026-10-14 |
| Ratio and Proportion | CDS Pathfinder | 50 | 0 | 0 | committed PRIVATE 2026-10-14 |
| Percentage | CDS Pathfinder | 32 | 0 | 4 (2 repeats, duplicate options, ambiguous) | committed PRIVATE 2026-10-14 |
| Ratio and Proportion | Conquer the Sky | 26 | 12 | 5; Q20 key, Q25 stem corrected. **Not blind** (answer grid seen first) | committed PRIVATE 2026-10-14 |
| Percentage | Conquer the Sky | 28 | 14 | 4 repeats; PYQ 13-14 seen with their key | committed PRIVATE 2026-10-14 |
| Average | Conquer the Sky | 24 | 13 | 1 (duplicate options) | committed PRIVATE 2026-10-14 |
| Profit and Loss | Conquer the Sky | 39 | 13 | 4 (2 no option right, 1 underdetermined, 1 repeat) | committed PRIVATE 2026-10-14 |
| Speed, Time and Distance | Conquer the Sky (`_HW`, only copy) | 34 | 24 | 2 (contradicts key, no time given) | committed PRIVATE 2026-10-14 |
| Simple and Compound Interest | Conquer the Sky | 35 | 14 | 0 | committed PRIVATE 2026-10-14 |
| Clock | Conquer the Sky (Clock part only) | 5 | 0 | 1; Calendar Q7-15 and its Calendar PYQs not taken (AFCAT Reasoning) | committed PRIVATE 2026-10-14 |
| Mixture and Alligation | Conquer the Sky (`_HW`, only copy) | 13 | 8 | 0 | committed PRIVATE 2026-10-14 |
| Time and Work | Conquer the Sky | 30 | 18 | 2 repeats (one of a kept PYQ) | committed PRIVATE 2026-10-14 |

Not ingested from the folder: CDS past-paper files (`*CDS_PYQs*`, `RP_PYQs_HW`) and every Pathfinder
"previous years" section are excluded by rule; whole-book PDFs are not taken; `_HW` copies of a full
chapter are skipped; practice/homework/classwork sheets (`* Practice*.pdf`, `TWP 1.pdf`, `Avg2/3`,
`Probability-2_Classwork.pdf` and similar) are not yet classified (LWS-made or another institute's);
the Errorless Percentage and Probability sheets are offered but not yet done.
