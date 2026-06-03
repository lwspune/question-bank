# JEE Mains ingestion pipeline

One-off scripts to ingest JEE Mains DOCX papers into the bank. `pandoc` converts
OMML → LaTeX + extracts media; questions flow through the existing `commitStaged`
pipeline (dedup / taxonomy auto-create / content_hash) with images + solutions
attached in follow-up passes. Section B numerical questions are skipped (MCQ-only).

## Prerequisites
- `pandoc` installed (local tool, not an app dep). Set `PANDOC` env var if not at
  the default `%LOCALAPPDATA%\Pandoc\pandoc.exe`.
- `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`.
- Source papers under `C:\tmp\PYQPs\JEE_Mains\<year>\Paper N.docx` (+ `Paper N soln.docx`).

## Per-paper loop
A `paperId` (e.g. `2021-p2`) names all artifacts. Generated files land in `out/`
(gitignored); curated per-paper data lives in `papers/<paperId>.json` (committed).

```sh
# 1. Extract -> out/<paperId>.records.json (+ media). No DB writes.
npx tsx scripts/jee/extract.ts "C:/tmp/PYQPs/JEE_Mains/2021/Paper 2.docx" 2021-p2

# 2. Classify (manual): read the extracted MCQs, author papers/<paperId>.json
#    (clone papers/2021-p1.json for the shape: sourceFile, pyqYear, pyqNote,
#    classification, + optional optionOverrides / solutionFixes / authoredSolutions).

# 3. Commit rows PRIVATE (+ an upload_jobs row). Dry-run first.
npx tsx scripts/jee/commit.ts 2021-p2          # dry-run
npx tsx scripts/jee/commit.ts 2021-p2 --apply

# 4. Attach figures + solutions.
npx tsx scripts/jee/attach-images.ts    2021-p2 --apply
npx tsx scripts/jee/attach-solutions.ts 2021-p2 --apply

# 5. Cosmetic LaTeX cleanup (whole exam — idempotent) + full validation.
npx tsx scripts/jee/cleanup-latex.ts --apply
npx tsx scripts/jee/validate-db.ts

# 6. Eyeball in /browse, then flip PUBLIC:
#    update questions set visibility='PUBLIC'
#    where exam_id=<JEE> and source_file='JEE_2021_Paper2.docx';
```

All write-steps default to dry-run and take `--apply`; all are idempotent and
scoped by `source_file`, so question numbers can't collide across papers.

## Files
- `config.ts` — shared IDs (org/exam/createdBy) + `PaperData` type + `loadPaper` + path helpers.
- `lib.ts` — pure helpers (segmentation, parsing, `sanitizeLatex`, `normalizeMathFunctions`); unit-tested in `tests/jee-extract.test.ts`.
- `extract.ts` · `commit.ts` · `attach-images.ts` · `attach-solutions.ts` — the per-paper steps.
- `cleanup-latex.ts` · `validate.ts` · `validate-solutions.ts` · `validate-db.ts` — cleanup + validators.
- `papers/<paperId>.json` — per-paper curated data (classification + overrides + authored solutions).

## Rollback a paper
```sql
delete from questions where exam_id=<JEE> and source_file='JEE_2021_Paper2.docx';
-- then sweep its storage objects + the upload_jobs row.
```

## Gotchas (see the project memory for the full list)
- Each subject part is 20 MCQ (Section A) + 10 numerical (Section B); position is the authoritative A/B split, not option count.
- `normalizeMathFunctions` treats `sec` as secant and converts inside `\text{}` — pre-scan units (`sec`/`min` meaning seconds/minutes) before bulk cleanup.
- Image-only source solutions become NULL (bank solution field is text-only); author a text solution in `authoredSolutions` if wanted.
- To read a solution-doc figure, re-run pandoc on the `… soln.docx` with `--extract-media` (extract only pulls question-doc media).
