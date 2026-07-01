# NEET (UG) PYQ ingestion

Ingests scanned NEET "Answers & Solutions" booklets (image PDFs, no text layer) into
the bank as `question_kind='pyq'` under the **NEET** exam. Unlike CDS, these booklets
carry the **official answer + a full worked solution** per question, so answers are
transcribed **verbatim** (no derivation) — the only real risk is a transcription /
option-order slip, so everything commits **PRIVATE** for a human spot-check before
`flip-public`.

## Facts

- A NEET paper = **180 MCQs**, +4/−1, four subject blocks in booklet order:
  **Physics 1–45 · Chemistry 46–90 · Botany 91–135 · Zoology 136–180**.
- The booklet prints options as **(1)(2)(3)(4)**; the bank stores **A/B/C/D**. We map
  **positionally**: printed option 1 → A … 4 → D, and `Answer (N)` → that letter.
- Multiple booklet **codes** per exam are the SAME question set reshuffled (seat
  randomization) → we ingest **one clean single-column code per exam** (`config.PAPERS`).
- Per-exam dedup (migration 0038) scopes `content_hash` by `exam_id`, so a NEET question
  that also appears in another exam keeps both copies.

## Pipeline

Per paper (`<paperId>` ∈ `2025`, `2026`, `reneet-2026`):

1. **Render** — `npx tsx scripts/neet/render.ts <paperId> [first] [last]`
   → `out/<paperId>/pNNN.png` (single-column) or `pNNN_L/_R.png` (two-column Re-NEET).

2. **Transcribe BY SUBJECT** — one vision agent per subject block reads its PNGs and
   writes `data/<paperId>.<subject>.json` = an array of:
   ```jsonc
   {
     "number": 4, "subject": "Physics",
     "chapter": "Laws of Motion",            // MUST be in NEET_CHAPTERS[subject] (config.ts)
     "subtopic": "Friction on Inclined Plane", // free-form, auto-created
     "stem": "…LaTeX; match-columns as a GFM pipe-table…",
     "options": ["0.25", "0.40", "0.5", "0.75"], // EXACTLY 4, printed order (1..4)
     "answer": "Answer (4)",                  // booklet's official key (any form → A..D)
     "solution": "…worked solution, LaTeX…",
     "difficulty": "MODERATE", "confidence": "HIGH", // HIGH|MED|LOW
     "hasFigure": false                       // true → stem needs a diagram (attach pass)
   }
   ```
   Rules: transcribe the answer + solution **verbatim from the booklet** (do not
   re-derive); exclude figure-dependent stems from the answer text but set `hasFigure`;
   use `\(...\)` inline / `\[...\]` display LaTeX; never raw unicode math in solutions.

3. **Commit** — `npx tsx scripts/neet/commit.ts <paperId>` (dry-run) then `--apply`.
   Merges the 4 subject files, maps options → A–D, validates (coverage 1..180 once all
   4 present, blank/one-correct/latex/collision), `commitStaged` PRIVATE + `pyq`.

4. **(later) Figure-attach** — for `hasFigure` stems, crop the diagram and attach as
   `questions.image_url` (the JEE/Foundation `attach-images` precedent).

5. **Spot-check** then **flip** — `npx tsx scripts/neet/flip-public.ts <paperId> --apply`
   (`--except=<n,…>` keeps flagged-flawed questions PRIVATE).

## Housekeeping (disk)

The render PNGs are large (3–4× DPI, ~1 MB/page × 76 pages × 3 papers). **`attach-images` and `commit` both read from the PDF/JSON, NOT from `out/` — only the bbox/transcription agents need the rendered PNGs.** So after a paper is committed + its figures attached, delete its render dir: `rm -rf scripts/neet/out/<paperId>`. Keep `data/*.json` (the committed audit trail). If a write fails with `ENOSPC`, free space first (delete finished papers' `out/` dirs) — a half-written JSON gets truncated to empty, so re-verify `data/*.figures.*.json` after any disk-full error.

**Two-column papers (Re-NEET): render a separate FULL-page set for the figure bbox pass.** `render.ts` splits 2-column pages into `_L`/`_R` column images (good for transcription), but `attach-images` crops the FULL PDF page with full-page fractional bboxes — so the bbox agents must view full (unsplit) pages to give full-page fractions (left-column figure x≈0.07–0.48, right-column x≈0.52–0.93). Render full pages with a one-off `fitz` loop (no split) into `out/<paperId>-full/`, then delete it after.

## Files

- `config.ts` — org/exam ids · `PAPERS` registry · `SUBJECT_BLOCKS` · **`NEET_CHAPTERS`**
  canonical NCERT chapter catalog (the classification target).
- `lib.ts` — pure assembly: `optionLetter` / `parseAnswer` / `normalizeQuestions` /
  `buildRecords` / `validateRows`. TDD in `tests/neet-lib.test.ts`.
- `render.ts` · `commit.ts` · `flip-public.ts`.
- `data/` — committed transcription JSON (the audit trail). `out/` — gitignored PNGs.
