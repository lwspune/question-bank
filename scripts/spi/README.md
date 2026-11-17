# SPI ingestion

Exam **SPI** (`f831faad-07c2-40b7-92e4-2d7af177588f`, registry slug `spi`, tier `school`): the
Services Preparatory Institute entrance examination, sat in Class 10 by students aiming at NDA.
GSPI, the girls' institute, sits a paper of the same shape, so one exam covers both (owner,
2026-10-21). A paper is 150 MCQs in one booklet: Part 1 Mathematical Ability (Q1-75), Part 2
General Ability (Q76-150: English, science, social studies, defence GK, reasoning).

Source folder: `C:\Vilas\LWS_Pune\Online Courses\SPI\QustionPaper`.

| Folder | What | Kind | Key | Status |
|---|---|---|---|---|
| `10. QP_10` | **SPI Entrance Examination 2026** (EX-50/2026), SPI's own upload (spicsn.com, May 2026): four CamScanner scans, Sets A-D, the same 150 questions with the blocks rotated inside each part (checked 2026-11-17, `out/2026/sets/map-*.txt`, not committed). Set A transcribed | `pyq` | none published | PUBLIC, 148 rows + 2 repeats of the sample paper (`repeats.json`) |
| `03. QP_3` | **SPI Entrance Examination 2022**, a scanned candidate copy (16 pages, no text layer) | `pyq` | none published | PUBLIC, 150 rows |
| `02. QP_2` | "Sample Paper SPI" watermark, Maths 75 + GAT 75 (papers `sample-maths`, `sample-gat`) | `practice` | none | PUBLIC, 75 + 75 |
| `01. QP_1` | "SPI GAT PAPER 2" + Maths, provenance unknown (`qp1-maths`, `qp1-gat`) | `practice` | GAT key (image), Maths key (text) | PUBLIC, 74 + 75 (Maths Q27 repeats Q12) |
| `04-09` | LWS Pune "SPI and GSPI" Mock Tests 1-6, 150 each (`mock-1` ... `mock-6`) | `practice` | Mock 1 only (`SPI_Mock_Test_Answer_Key.xlsx`, with a Gemini column) | PUBLIC; each mock repeats some questions of the earlier ones, kept once |

All papers went PUBLIC on 2026-10-21; 2026 on 2026-11-17. Each past paper is a timed mock (`scripts/mocks/build.ts --paper=spi`, 3 hours, flawed questions as grace) at the scheme its booklet prints (`spiPaperFor`): 2022 `SPI_PAPER`, +1 / -0.5 out of 150; 2026 `SPI_2026_PAPER`, +4 / -1 out of 600. The eight practice papers are practice mocks at the 2026 pattern (MOCKS.md "SPI"; list written by `practice-mocks.ts`).

Only the 2022 and 2026 papers are real sittings, so only they are `pyq` (owner, 2026-10-21). The text layer
of the typed papers flattens powers and fractions (`52x - 1` is \(5^{2x-1}\)), so every paper is
read from page images, never from its text.

## Files

- `config.ts`: the papers, their two parts, the subjects and the chapter CATALOG (Maths and
  Reasoning take SSC CGL's chapter names, the General Ability subjects NDA GAT's). Subtopics
  are authored per row.
- `lib.ts` (pure, `tests/spi-lib.test.ts`): `checkPaper`, `toRawRows`, `figurePaths`, the verify
  lane (`verifyPacket`, `parseVerify`, `compareVerify`). The transcript parser is SSC CGL's
  (`scripts/ssc-cgl/lib.ts`), and commit uses its `parseCommitRows`.
- `transcripts/<paperId>.txt`: the source of record (committed).
- `figures/<paperId>/`: the booklet's own pictures, `qNNN.png` and `qNNN-A.png`..., plus
  `jobs.json`, the crop boxes in PDF points (committed; re-crop with `scripts/afcat/crop-figures.py`).
- `TRANSCRIBE_BRIEF.md` (pass 1) and `VERIFY_BRIEF.md` (pass 2): one brief per agent lane.
- CLIs: `render-pages.py` (`--columns` for the two-column mocks), `build.ts`, `merge.ts`,
  `packet.ts`, `compare.ts` (`--key`), `crop-figures.py`, `seed.ts`, `commit.ts`, `sync.ts`,
  `publish.ts`.

## The loop, per paper

1. **Register** the paper in `PAPERS` (`config.ts`): pdf, `sourceFile`, kind, `answerSource`,
   question pages, parts.
2. **Render** its pages: `python scripts/spi/render-pages.py <pdf> scripts/spi/out/<id>/pages <page> ...`
   (include the instructions page: it fixes the values to calculate with).
3. **Pass 1, transcribe** (agents, at most 3 at once, one slice each, `TRANSCRIBE_BRIEF.md`).
   First run `npx tsx scripts/spi/subtopics-handout.ts <id>`: agents file each row under a
   subtopic the bank already uses (`out/<id>/subtopics.txt`).
   drafts to `out/<id>/drafts/<from>-<to>.txt`, each checked with
   `npx tsx scripts/spi/build.ts <id> --file=<draft> --from=<a> --to=<b>`.
4. **Merge** the drafts with `npx tsx scripts/spi/merge.ts <id> <draft> ...` (drops each draft's
   preamble) into `transcripts/<id>.txt` and fix the seams: a direction block that
   spans two slices (2022: Q38's passage also governs Q39-40), and any stem an agent invented.
5. **Pass 2, verify** (agents, `VERIFY_BRIEF.md`): `npx tsx scripts/spi/packet.ts <id> --from=a --to=b`
   writes a packet with no answers; the agent checks option fidelity against the page FIRST,
   then answers blind, to `out/<id>/verify/answers-<a>-<b>.txt`.
6. **Compare**: `npx tsx scripts/spi/compare.ts <id>`. The main session settles every fidelity
   issue and every disagreement by re-deriving from the page, and writes why in the block's
   `note:`. A flawed block needs a `notice:` (the line students read above the solution).
7. **Crop figures** for every `figure:` block into `figures/<id>/` (boxes in `jobs.json`), and
   look at every crop.
8. **Build** `npx tsx scripts/spi/build.ts <id>` (whole paper: refuses a missing crop, a flawed
   block without a notice, a chapter outside the catalog) → `out/<id>/rows.json`.
9. **Commit** `npx tsx scripts/spi/commit.ts <id> [--apply]`: PRIVATE at insert, `question_kind`
   from the paper, and a derived-key paper stamped (`derived_model`, `derived_at`) in the same
   run, with every solution ending in the disclosure line. Run `scripts/spi/seed.ts --apply`
   once before the first commit.
10. Probes: `npm run audit:text -- "<sourceFile>"`, `audit:omml`, `audit:figures`.
11. **Publish** `npx tsx scripts/spi/publish.ts <id> [--apply]`: refuses unless every row has one
    correct option and a derived paper's rows carry `derived_model`.

## What the 2022 pilot taught (folded into the briefs and checks)

- **The instructions page decides answers.** It fixes 1 inch = 2.5 cm, 1 mile = 1.6 km, pi =
  3.14 or 22/7, g = 9.8 and two-decimal rounding. Pass 1 never saw it and keyed Q4 "None of
  these" with 2.54 cm; the paper's value gives 825. Both briefs now start there.
- **The paper's own "None of these" is often right**, and often a setter's slip (Q84, Q89,
  Q92 are right as printed with D). Key what is right as printed; say so in the solution.
- **A long literary passage can trip the output filter.** The agent for Q113-150 was stopped
  copying the Jim Corbett passage (Q126-135); the main session transcribed it in pieces and
  the agent did the rest.
- **Source keys are often wrong.** QP_1 Maths 4 of 75, QP_1 GAT 4 of 75, Mock 1's "Final"
  column 8 of 150 (its original or Gemini column usually had the right letter). Compare with
  `compare.ts <id> --key`, settle every disagreement against the page, and say in the `note:`
  when the source key is overruled.
- **Figures differ by paper.** The 2022 scan: crop page regions (`jobs.json` boxes, PDF points).
  The sample papers: vector drawings under a tiled watermark image, cropped with `noImages`.
  QP_1 and the LWS mocks: each figure is an embedded image, saved as is with an `xref` job.
  Map images to questions with PyMuPDF `get_images` + `get_image_rects` and LOOK at every crop.
- **Review fixes after commit** go through `sync.ts` (solution/difficulty; `--content` for a
  stem fix with options and key unchanged), never a re-commit.
- **Result:** 150 blind answers against pass 1, 0 fidelity issues, 143 agreed before review.
  Of the 7 disagreements (Q4, Q5, Q26, Q59, Q104, Q126, Q145) the blind answer was adopted on 6
  and pass 1 kept on Q59; each is settled in its `note:`. 9 questions are flawed as printed and
  carry a notice.

## What the 2026 paper taught

- **SPI re-uses its own sample paper.** 2026 Q141 and Q149 are the sample GAT paper's Q56 and
  Q75 word for word, so content_hash (unique per exam) keeps one row. `repeats.json` names that
  row and the mock serves it at its own slot with this transcript's key (the SSC CGL way);
  `commit.ts` reports such a skip as "a repeat of an existing one". All three solves agreed.
- **Reasoning sits in both parts** (Q64 in Part 1, Q144-150 in Part 2), so subject cannot split
  the mock: `SPI_2026_PAPER`'s sections declare `questionNumbers` (1-75, 76-150).
- **Subtopics drifted** until the handout existed: see `subtopics-handout.ts`.
- **Result:** 150 blind answers against pass 1, 0 fidelity issues, 150 agreed. Q66 (strictly
  "between" leaves no right option) and Q95 (two correct reported forms) are flawed with a notice.
- **Do the sets differ?** No: one agent mapped every question of Sets B-D to Set A; only
  "elevation(s)" and one direction line differ in wording.
