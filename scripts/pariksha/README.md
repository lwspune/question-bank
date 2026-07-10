# Pariksha (Vidhya Vikashni) coaching-test ingestion

Ingests ParikshaGruh print-question-paper PDFs (Vidhya Vikashni Mat. Hr. Sec. School,
Tiruppur — a NEET coaching centre) into the bank as **NEET practice** questions
(`question_kind='practice'` under the NEET exam, reusing NEET's Physics/Chemistry/
Botany/Zoology subjects + the NCERT chapter catalog). These are coaching tests, **not**
past-year papers, so they never touch the NEET PYQ surfaces (the pyq/practice axis).

## Source shape (see config.ts)
- 56 source PDFs in `C:\tmp\pariksha` → **30 unique tests** (keyed by ParikshaGruh Test Id).
  Filenames are noisy: `N.pdf` = question paper, `N+.pdf` = same test WITH the answer key;
  plus duplicates + a couple of mislabels. `TESTS` pins ONE canonical file per Test Id.
- **Image-based**: the text layer holds only question numbers; stems/options/figures are
  rendered as images → **vision transcription**.
- **Two-up layout**: each PDF page = two logical print-pages side by side → `render.ts`
  splits every page into a LEFT + RIGHT logical page (`p<NNN>_L.png` / `p<NNN>_R.png`).
- **Answer keys**: the "+"/answer files print `Answer : X` in the TEXT layer, one per
  question in continuous 1..N order → `extract-keys.ts` pulls them exactly (no vision).
  **23 tests are keyed; 7 have no key** → answers derived by the transcription agent,
  REVIEW-flagged (confidence != HIGH), and kept PRIVATE until a human spot-check.

## Runbook (per test)
```sh
npx tsx scripts/pariksha/render.ts      <testId>            # → out/<id>/p*.png  (L/R logical pages)
npx tsx scripts/pariksha/extract-keys.ts <testId> --write   # → data/<id>.keys.json  (keyed tests only)
#   → vision agent(s) read out/<id>/*.png, write data/<id>.<shard>.json (one obj/question)
#     + a figure bbox manifest data/<id>.figures.json for figure questions
npx tsx scripts/pariksha/preview.ts     <testId>            # → out/<id>.preview.html (human review)
npx tsx scripts/pariksha/commit.ts      <testId> [--apply]  # PRIVATE + question_kind='practice'; overlays keys
npx tsx scripts/pariksha/attach-images.ts <testId> [--apply]# crop figures from L/R halves → image_url
npx tsx scripts/pariksha/flip-public.ts <testId> [--apply]  # PRIVATE→PUBLIC (keyed only; --force for keyless post-review)
```

## Transcription JSON (data/<id>.<shard>.json — array, one object per question)
`{ number, subject, chapter (EXACT from NEET_CHAPTERS[subject]), subtopic, stem (LaTeX
\( \)), options (4, printed order a→d), answer (A-D — overlaid by keys for keyed tests),
difficulty, hasFigure, confidence, reasoning? }`. Multi-subject full mocks (13305, 13307)
shard by subject; single-subject tests use one shard.

## Figure manifest (data/<id>.figures.json)
`{ "<qnum>": { "img": "p003_L", "bbox": [fx0,fy0,fx1,fy1] } }` — bbox = fractions (0..1)
of that logical L/R half-page, TIGHT around the figure, excluding stem/options/`Answer`.
`attach-images.ts` maps the half-rect (matching render.ts's mid±4 split) + bbox and
rasterizes at 4x. **Always montage-verify the crops before `--apply`.**

## Conventions reused
- `lib.ts` re-exports the NEET pure helpers (optionLetter / parseAnswer / normalizeQuestions
  / validateRows) — same `(a)(b)(c)(d)`→`A/B/C/D` positional map; Pariksha-specific
  `buildRecords` (no NEET 4-block subject check) + `extractAnswerKeyFromText`.
- Per-exam dedup on `(org_id, exam_id, content_hash)`; `pyqYear: null` (practice).
- `out/` is gitignored (renders); `data/` is committed (transcription JSON + key/figure manifests).
