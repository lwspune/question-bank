# AFCAT practice ingestion

Exam **AFCAT** (`08e1b680-4711-4164-abd4-ae27543cd221`), subject **Numerical
Ability**. Every row is `question_kind='practice'`, written PRIVATE at insert
and made PUBLIC only after review. Source:
`C:\Vilas\LWS_Pune\AFCAT_CDS\Subject_Content\Maths\Class_Notes\02. Arithmetic_Maths`.

## The three source groups

| Group | What | Text | Key | Extraction |
|---|---|---|---|---|
| A | LWS quizzes (`Quiz/*.docx` + `_AK`) | clean (pandoc) | AI-written, letters mostly right, stated values often wrong (Mixtures: 13 of 30 disagree with their own options) | `extract-quiz.ts` |
| B | "Errorless" sheets (`*ERRORLESS*.pdf`) | clean text layer | letters only, no solutions | not built yet |
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
3. **Blind packets:** `npx tsx scripts/afcat/dump-verify.ts <chapter> [--files=..] [--size=25]`.
   Stem + options only. No key, no source solution, no extraction flags.
4. **Pass 1:** one agent per packet, working to `AGENT_BRIEF.md` (PASS 1).
   Output `out/<chapter>/derived-NN-P.json`.
5. **Merge:** `npx tsx scripts/afcat/merge-derived.ts <chapter>`. Validates each
   output against its packet (ids, subtopics, the solution's publish rules) and
   refuses on any problem. Writes `data/<chapter>.derived.json`.
6. **Compare:** `npx tsx scripts/afcat/compare.ts <chapter>`. Above ~5%
   disputes, run a pass 2 (`AGENT_BRIEF.md` PASS 2) on the disputed rows, as in
   `scripts/worksheets/README.md` step 4b.
7. **Adjudicate** in `data/<chapter>.overrides.json` (`answer` / `options` /
   `stem` / `solution` / `subtopic` / `difficulty` / `exclude`, each with a
   `reason`). A reason containing "key stands" settles a dispute where the
   source key is right and the blind pass was wrong. **`build.ts` refuses to
   build any unadjudicated dispute.**
8. **Rebalance:** `npx tsx scripts/afcat/plan-shuffles.ts <chapter> --write`.
9. **Commit:** `npx tsx scripts/afcat/commit.ts <chapter>` (dry run), then
   `--apply`. One `source_file` per FILE (`AFCAT_<Chapter>__<key>`).
10. **Audit:** `npm run audit:keys -- AFCAT_` and `npm run audit:text -- AFCAT_`.
11. **Review:** `npx tsx scripts/afcat/preview.ts <chapter>` writes
    `out/<chapter>.preview.html`. The owner reviews it.
12. **Publish:** `npx tsx scripts/afcat/flip-public.ts <chapter> --apply [--except=ids]`.

A solution-only fix after commit does not reach the database through
`commit.ts` (`content_hash` excludes the solution); anything touching stem,
options or key changes the hash. Correct shipped rows in place, keeping the id.

## Chapter status

| Chapter | Files | Rows | Disputes | Status |
|---|---|---|---|---|
| Time and Work | A: LWS quiz | 50 | 0 of 50 (3 source keys state a wrong value beside the right letter) | committed PRIVATE 2026-10-14, awaiting review |
