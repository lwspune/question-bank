# AFCAT practice ingestion

Exam **AFCAT** (`08e1b680-4711-4164-abd4-ae27543cd221`), subject **Numerical
Ability**. Every row is `question_kind='practice'`, written PRIVATE at insert
and made PUBLIC only after review. Source:
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

Not ingested from the folder: `01. Decimal and Fractions\Decimal and Fractions_AFCAT_Quiz.pdf` is two pages
of a published AFCAT book (with AFCAT past-year questions), so it waits with the books; CDS past-paper
files (`*CDS_PYQs*`, `RP_PYQs_HW`) are excluded by rule; practice/homework/classwork sheets are not yet
classified (LWS-made or another institute's).
