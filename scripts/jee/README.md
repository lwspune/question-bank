# JEE Mains ingestion pipeline

One-off scripts to ingest JEE Mains DOCX papers into the bank. `pandoc` converts
OMML → LaTeX + extracts media; questions flow through the existing `commitStaged`
pipeline (dedup / taxonomy auto-create / content_hash) with images + solutions
attached in follow-up passes.

**Status:** Maths ✅ and Physics ✅ complete (every sitting 2021-2026).
Chemistry in progress.

## Prerequisites
- `pandoc` installed (local tool, not an app dep). Set `PANDOC` env var if not at
  the default `%LOCALAPPDATA%\Pandoc\pandoc.exe`.
- `python` with Pillow (for `compose_figures.py`).
- `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`.
- Source papers under `C:\Vilas\LWS_Pune\JEE_Mains\PYQs\<year>\`.

## Extraction is SUBJECT-AGNOSTIC — check before re-extracting

`extract.ts` writes **every** subject into `out/<paperId>.records.json`; only the
DB *commit* filters by subject. So when a second subject is ingested the rows are
already on disk and the job is **classify + verify, not extract**. This is how
Physics was done, and Chemistry after it. Confirm with:

```sh
node -e "const r=require('./scripts/jee/out/2023-jan24.records.json');console.log(r.filter(x=>x.subject==='Chemistry').length)"
```

## Lane triage — do this BEFORE trusting any key

A paper is SAFE (extracted key trustworthy, agent verifies) or BLIND (key
untrustworthy, agent solves from scratch and the key is ignored).

**Use `npx tsx scripts/jee/triage.ts --subject=<S>`** — it applies everything
below to every not-yet-ingested paper at once. The manual form is kept here
because the reasoning still has to be understood; a SAFE verdict is a report, not
an oracle, and a paper's own `notes` override it.

TWO facts drive the call, and BOTH must hold for SAFE. First, **are there keys at
all** — an MCQ key lives on the OPTIONS (`isCorrect`), not a top-level field, so
counting the field alone reports a fully-keyed paper as keyless. A couple of
unextracted keys is normal (an image-options row) and stays SAFE; a large hole
means the extractor lost its place and the keys it DID find may sit on the wrong
questions. Second, **can a key be tied to its question**:

- `grep -oE '^[0-9]+\.' out/<id>_soln.md | sort -u | wc -l` vs the extractor's
  ordered-block count.
- **distinct == N and blocks == N** → sequential, number-matched. SAFE.
- **distinct == 1 with blocks == N** → all-`1.` but complete. SAFE (positional).
- **blocks < N** → a missing block shifts every downstream key. **BLIND.**
- HYBRID (a run of `1.`s then a correctly-labelled tail) → **BLIND.**

**The lane is usually already recorded.** Every `papers/<id>.json` written by an
earlier subject carries a `notes` field stating its lane; read it first. `notes`
is multi-line and append-only, so if *any* prior subject found the key
untrustworthy, treat the paper as BLIND — it is the same extraction.

**Compilations (2021 p11-p16) tag subject BY POSITION and are wrong** against
their printed `PART-II CHEMISTRY` banners. Scan the `.md` for banners before
trusting `subject`; classify per question.

## Per-paper loop (SAFE lane)

```sh
# 0. ALWAYS regenerate the classification handout from the LIVE DB first.
#    A stale handout makes agents classify into retired names, and commit then
#    re-creates dead chapters. Mid-ingest it also stops later batches coining
#    synonyms of subtopics an earlier batch auto-created.
npx tsx scripts/jee/taxonomy-handout.ts --subject=Chemistry

# 1. Dump the subject's questions (includes [IMAGE] paths so a classifier can
#    actually open the figures — a text-only dump forces it to guess).
npx tsx scripts/jee/dump-subject.ts 2023-jan24 --subject=Chemistry

# 2. One agent per paper: classify into the handout, READ every figure, and
#    INDEPENDENTLY re-derive each key. -> out/<id>_sol_chem.json

# 3. Assemble. sourceFile/pyqYear/pyqNote are inherited from the existing paper
#    file when omitted. MERGES into it — never clobbers another subject's block.
npx tsx scripts/jee/assemble-safe.ts 2023-jan24 --subject=Chemistry

# 4. Commit PRIVATE, then attach.
npx tsx scripts/jee/commit.ts 2023-jan24 --subject=Chemistry            # dry-run
npx tsx scripts/jee/commit.ts 2023-jan24 --subject=Chemistry --apply
npx tsx scripts/jee/attach-images.ts    2023-jan24 --apply
npx tsx scripts/jee/attach-solutions.ts 2023-jan24 --apply

# 5. Once at the END of a batch (NOT per paper — see gotchas).
npx tsx scripts/jee/cleanup-latex.ts --apply
npx tsx scripts/jee/validate-db.ts

# 6. Flip PUBLIC — ALWAYS scope by subject.
node scripts/jee/scan-flip.js JEE_2023_Jan24.docx --subject=Chemistry
node scripts/jee/scan-flip.js JEE_2023_Jan24.docx --subject=Chemistry --flip
```

BLIND lane is the same, except the agent ignores `<==srcKEY` and solves from
scratch, and you assemble with `assemble-blind.ts` (which uses the derived
answer). `paper.skip[]` drops a corrupted question before the commit's
classification requirement.

**Adjudicate every agent disagreement yourself.** The agent's flag is a
hypothesis; confirm it against the printed options before flipping a key. Expect
roughly 1-2% wrong source keys — that is a prior, never a quota. Papers with zero
are normal; do not manufacture a flip.

## Files
- `config.ts` — shared IDs + `PaperData` type + `loadPaper` + path helpers + `isCommittable`.
- `lib.ts` — pure helpers (segmentation, parsing, `sanitizeLatex`, `normalizeMathFunctions`, `gridTableToPipe`); unit-tested in `tests/jee-extract.test.ts`.
- `taxonomy-handout.ts` — regenerate the agent handout from the live DB.
- `dump-subject.ts` · `extract.ts` · `commit.ts` · `attach-images.ts` · `attach-solutions.ts`.
- `compose_figures.py` — stack multi-figure stems into one composite PNG.
- `assemble-safe.ts` / `assemble-blind.ts` — build `papers/<id>.json` from agent output.
- `cleanup-latex.ts` · `validate.ts` · `validate-db.ts` · `audit-keys.ts` · `scan-flip.js`.
- `triage.ts` — decide SAFE vs BLIND for every paper not yet ingested for a
  subject. Encodes the rules below so they are not re-greppped by hand each wave.
- `coverage.ts` — reconcile a subject BOTH ways (papers on disk vs DB rows), with
  each short paper printing its own `skip[]` so a gap is either accounted for or
  visibly is not. Run it before claiming a subject is COMPLETE.
- `papers/<paperId>.json` — the durable per-paper record. **Commit it at every ship** — surviving DB rows do not save the authoring work.

## Gotchas

- **`cleanup-latex.ts` takes NO paperId — it sweeps EVERY JEE row.** Run it once
  per batch, never per paper. It is non-idempotent on trailing LaTeX spacers
  (eats one `\ ` per run); harmless, but do not loop it. Since 2026-08-06 it
  **refuses** a paperId rather than ignoring one, and is deliberately given no
  paper scope — it writes, so a per-paper habit would rewrite rows outside the
  pass (the `scan-flip` failure class) as well as corroding spacers.
- **`validate-db.ts` defaults to the whole exam but now ACCEPTS an optional
  scope:** `validate-db.ts [paperId] [--subject=X]`. Its checks run in Node, so
  every row crosses the wire — an unscoped run is 10,634 rows ≈ 10 MB of JSON
  versus ~0.19 MB for one paper. Use the scope for a quick per-paper check after
  `commit`; keep the bare form for the once-per-batch sweep at step 5. It prints
  its scope on both the first and the summary line, refuses unknown arguments,
  and exits non-zero if the scope matches no rows (0 findings on 0 rows is not a
  pass). Both scripts previously swallowed arguments silently: ~20 per-paper
  `validate-db.ts <paperId> --subject=Chemistry` runs during the 2026-08-06
  Chemistry ingest each swept the whole exam and reported success, ~200 MB.
- **`scan-flip` must be scoped with `--subject`.** It matches on `source_file`,
  and a JEE file carries all three subjects — an unscoped flip once published
  Maths rows that had been deliberately withheld.
- **Collapsed solution numbering** is the dominant structural defect: pandoc
  renders a run of leading blocks all as `1.`, so the extractor binds them ALL to
  Q1 and strands the rest keyless. Symptom: Q1's stored solution is about a
  different topic than Q1's stem.
- **A NAT answer can legitimately be 0** — never gate committability on
  truthiness of the answer value (`isCommittable` regression, already fixed).
- **Agents sometimes double-escape LaTeX** (`\\(`). `assemble-safe`
  auto-normalises via the `\\(` tell. Trust `attach-solutions`' "N broken (skip)"
  line as the check.
- **Never author LaTeX through a bash heredoc** — backslashes get eaten. Use the
  Write tool, then verify the bytes.
- **`assemble-safe` must run BEFORE adjudications and must NOT be re-run after.**
  It recomputes `answerOverrides` from the SOURCE key, so a second run silently
  reverts every verified flip. Order is: promote-gaps → assemble → adjudicate.
  (Running it before the overrides exist fails loudly instead — the flip guard
  reports "expected C, found undefined" — so only the re-run is dangerous.)
- **`scan-flip` takes the source FILENAME, not the paper id.** Passing the id
  matches zero rows and prints a perfectly clean `0 rows | flagged 0 | flipped 0`,
  which reads exactly like "nothing to do". Check the row count equals what
  commit inserted before believing a flip.
- **Run `validate-db` BEFORE `scan-flip`, not instead of it.** `scan-flip` does
  not check OPTION-level delimiter balance, so it has reported 0 flagged on a
  paper `validate-db` found 7 broken fields in.
- **Never test a WRITING script against a real paper.** `assemble-blind` was run
  once as a smoke test and rewrote that paper's `pyqNote`, `notes` and `skip[]`.
  It now refuses when nothing resolves, but the general rule stands: these
  scripts write in place and have no dry-run.
- **A question dropped by the assembler is not the same as one that is skipped.**
  A `skip[]` entry is dropped at commit WITHOUT the "no classification" error, so
  it never surfaces. That is why `coverage.ts` exists.

## Chemistry-specific

- **Data tables arrive as pandoc GRID tables** (`+---+---+`), which
  `parseTableBlocks` cannot read — they would render as raw `+====+` on /browse
  AND in every Word export. `gridTableToPipe` converts them at commit time.
  A hand-authored `stemOverride` bypasses it, so write those already converted.
- **Organic stems routinely carry 2-3 structures.** A question has only one
  `questions.image_url`, so `attach-images` composites them via
  `compose_figures.py`. Without it the question ships showing one of three
  structures and cannot be answered.
- **Blank option TEXT plus an option IMAGE is CORRECT, not a defect.** Option
  pictures map onto `options.image_url` and render on both /browse and the docx
  export. `audit:keys` flags such rows as DUP_OPT (empty text reads as duplicate)
  — that is a probe artifact. Check `options.image_url` before calling one broken.
- **Read every figure when classifying.** A half-life plot was filed as first
  order when the line through the origin makes it zero order; a plot's ordinate
  turned out to be `E°_cell` not `E_cell`, which decided the answer. Both were
  invisible in a text-only dump.

## Rollback a paper
```sql
delete from questions
where exam_id='56360311-614d-43ea-9cd9-8ca8178dd679'
  and source_file='JEE_2023_Jan24.docx'
  and subject_id=(select id from subjects where name='Chemistry' and exam_id='56360311-614d-43ea-9cd9-8ca8178dd679');
-- then sweep its storage objects + the upload_jobs row.
```
