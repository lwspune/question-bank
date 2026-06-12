# NDA practice-question ingestion pipeline

Ingest **practice** questions (NOT past-year) from the "Mathematics for N.D.A and N.A"
practice book into the bank, separated from the PYQ corpus by `question_kind='practice'`
(migration 0036). Questions flow through the existing `commitStaged` pipeline
(dedup / taxonomy reuse / content_hash); a post-commit UPDATE stamps kind + visibility.

The book's PDFs are born-digital but **lossy in the text layer** — set/relational
operators drop out, superscripts collapse, two-column layout interleaves — so
transcription is **vision-driven** (render → a human/Claude reads the images), not
text-extracted. The answer-key letters DO extract cleanly from the text layer.

## Prerequisites
- Python + PyMuPDF (`fitz`) — already used by the JEE/audit tooling (`pip install pymupdf`).
- `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`.
- Source PDFs under `C:\tmp\Practice\Maths\…` (the loose per-topic PDFs — the `.rar`
  files are legacy PageMaker `.pmd` source, NOT ingestable).

## Per-topic loop
A `topicId` (e.g. `sequence-series`) names all artifacts. Add a `TOPICS` entry in
`config.ts` first (chapter name, `qFrom`/`qTo`, the question/answer/solution PDF
paths + page indices, and the canonical DB subtopics). Generated PNGs land in `out/`
(gitignored); the transcription in `data/` (committed) is the source of truth.

```sh
# 1. Render the question + solution pages to per-column PNGs (high DPI).
npx tsx scripts/practice/render.ts sequence-series

# 2. TRANSCRIBE (manual, vision). Read each out/<topic>/q-*.png column and write
#    data/<topic>.questions.json: {number, subtopic, difficulty, stem (LaTeX \(...\)),
#    options[A-D]}. Then read the s-*.png solution columns -> data/<topic>.solutions.json.
#    Difficulty is a vision estimate (EASY|MODERATE|HARD). See "Verification" below —
#    this is where correctness is won or lost.

# 3. Commit PRIVATE + question_kind='practice' (+ an upload_jobs row). Dry-run first.
npx tsx scripts/practice/commit.ts sequence-series           # dry-run: rows, flags, overrides, LaTeX check
npx tsx scripts/practice/commit.ts sequence-series --apply

# 4. Generate the review HTML (KaTeX-rendered, correct option green, override badges).
npx tsx scripts/practice/preview.ts sequence-series          # writes out/<topic>.preview.html

# 5. Eyeball the preview, then flip PUBLIC when satisfied:
#    update questions set visibility='PUBLIC'
#    where exam_id=<NDA> and source_file='<topic sourceFile>';
```

The answer-key letters come from the text layer at commit time (`parseAnswerKey`);
no need to transcribe them. The commit step is idempotent (upserts on content_hash)
and re-stamps kind+visibility, but see the **re-commit hazard** below.

## Verification — the part that actually matters
Vision reads the stem/math well, but the value of this pipeline is the **triple
cross-check** that catches errors no single source has:

1. **Every question is checked three ways**: the rendered image, the answer-key
   file letter, and the worked solution (+ your own re-derivation). They must agree.
2. **Zoom-crop any flagged/ambiguous question.** Option *order* is load-bearing —
   the key is by-letter, so a swapped option text silently points the key at the
   wrong answer. The pilot had several (414/444/445/450) caught only by a 5× crop.
3. **Resolve key-file vs solution conflicts by computing it yourself.** Don't trust
   either blindly: the book is sometimes wrong in its key (460/465/480/484), blank
   (471), AND occasionally wrong in *both* its key and its printed solution (486 —
   the sines were exactly in A.P. though both book sources said "None").
4. Record every correction in `data/<topic>.overrides.json` (`{answer, reason}`); the
   commit prints them and the preview badges them. Where book key/solution conflict,
   note both in the solution text.

The commit's built-in guards: `findLatexImbalance` hard-stops on unbalanced `\(...\)`;
coverage gaps (missing question numbers) and no-solution / multi-key questions are
flagged (not blocking).

## Files
- `config.ts` — IDs (org/exam/createdBy) + `Topic` type + `TOPICS` registry + path helpers.
- `lib.ts` — pure helpers (`parseAnswerKey`, `buildRecords`, `findLatexImbalance`); unit-tested in `tests/practice-extract.test.ts`.
- `render.ts` · `commit.ts` · `preview.ts` — the per-topic steps.
- `data/<topic>.{questions,solutions,overrides}.json` — committed transcription (source of truth).

## Re-commit hazard
`content_hash = sha256(stem + sorted options + answer)`. If you fix a **stem, option,
or answer** in `data/` after committing, the hash changes, so re-running `commit`
INSERTS a new row and ORPHANS the old one. Fix: delete the affected rows first, then
re-commit (others dedup-skip):
```sql
delete from questions where source_file='<topic sourceFile>' and question_number in ('486','487');
```
(Editing only the `solution` text is safe — it's not in the hash.)

## Rollback a topic
```sql
delete from questions where exam_id=<NDA> and source_file='<topic sourceFile>';
-- then delete the upload_jobs row.
```

## Downstream note
Practice is kept off PYQ-first surfaces by `question_kind`: `/browse` defaults to PYQ
(toggle to Practice/All), and the facet RPCs + the raw count sites (examHomeStats,
the 3 notes landings) filter `question_kind='pyq'`. Tag-gated surfaces (guide
principles, notes drills, worked examples, quiz harvest) are PYQ-only by construction
— **do not author principle/concept tags for practice questions**, or they'll leak in.
