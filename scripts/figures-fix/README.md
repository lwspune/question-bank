# scripts/figures-fix: give figure questions their real figure

Cross-corpus repair for public questions that point at a figure they do not
carry, or carry a written description in its place (`[Diagram: …]`). Clarity
(2026-10-02) showed students meeting a paragraph where a drawing belongs; on
2026-10-03 the owner decided every such row gets its real figure back and the
description is removed.

The rows come from `npm run audit:figures` plus the saved triage verdicts in
`scripts/lib/figures/triage/` (MISS, OPTIONS and DESCRIBED rows first). The
source papers and books are all on the owner's machine; each pipeline's
`config.ts` names its folder.

## One batch

1. **Find each figure in the original.** When the PDF embeds its figures as
   pictures (most worksheets and converted .docx files), read their exact boxes
   with PyMuPDF `page.get_image_info()` instead of judging a grid by eye; eye
   readings on a dense grid were off by up to 0.1 of a page. A converted PDF can
   DROP a picture: take it from the .docx (`{ "docx": ..., "media": "image8.jpg" }`).
   Several parts join into one image with `{ "stack": [...], "row": true }`.
   A row may omit `figure` when the source prints none and only an invented
   description must go; `optionText` replaces option text outright.
   A map printed sideways takes `rotate: 90` (degrees clockwise). Storage
   refuses objects over 1 MB, so an oversize crop is reduced to a 256-colour PNG
   (or JPEG) automatically. A replace step (`{ remove, with }`) is safe to
   re-run, so a batch that stops part-way (e.g. on an upload) can simply be run
   again. Otherwise: Render the pages with a fractional
   grid (`fitz` at ~1.1x plus 0.05 gridlines) and read the box off it. Page
   numbers are 0-based PDF pages.
2. **Write `manifest/<batch>.json`** (the source of record for this fix):

   ```json
   {
     "batch": "upsc-2018-p2",
     "pdf": "C:\\path\\to\\paper.pdf",
     "figures": { "q5": { "page": 2, "bbox": [x0, y0, x1, y1] } },
     "rows": [
       { "id": "<question uuid>", "figure": "q5", "stripText": "brackets", "stripContext": "brackets" },
       { "id": "<uuid>", "figure": "q66", "options": { "A": "q66a" }, "stripOptions": "brackets" }
     ]
   }
   ```

   A strip is `"all"` (clears the field; for a pictured option that holds only a description), `"brackets"` (every `[Figure|Diagram|Graph|Image: …]` block), a
   `{ "remove": "<exact text>" }` that must match exactly once, or a list of
   steps applied in order (a bracket block plus the table a transcriber added
   after it). Rows of one set share a figure; the image is uploaded once.
3. **Dry run** `npx tsx scripts/figures-fix/attach.ts <batch>`. It crops every
   figure into `generated-papers/figures-fix/<batch>/` and prints each text
   change. **Look at every crop**: the box can clip a pale drawing or catch a
   line of text, and nothing automatic notices.
4. **Apply** with `--apply`. The rows' prior state is saved once to
   `backup/<batch>.before.json`, so a batch can be reverted. Re-running is safe:
   a row that already has an image keeps it.
5. Check from the database that every row has its image and no description is
   left, and fetch one image URL.

## Before you edit text: whose rule owns the hash?

The tool edits text in the bank and leaves `content_hash` alone, which is
right for most pipelines (they hash the SOURCE text at ingest and never
rehash). Two are different; check the pipeline before a batch that changes
text:

- **JEE** keeps stem fixes in `scripts/jee/papers/<id>.json` `stemOverrides`,
  and `resync.ts` REHASHES from them. Change the override too, then bring the
  row's hash in line (see `jee-rehash-2025-apr02-q141.ts`; resync itself has
  no single-question mode).
- **MPSC** commits from `scripts/mpsc/data/<id>.merged.json` and re-puts the
  Marathi translation on every run. Record the figure box (130-dpi render
  pixels, 1-based page) and the stripped Marathi stem there, but leave the
  English stem as committed: it feeds `content_hash`, so changing it would
  make a re-commit insert a duplicate.

A set's shared passage lives on every member: find the siblings (same
`source_file` and `context`) and fix them all; a sibling may already carry
the figure (`existing`).

## When no copy of the figure exists

Search the bank for a twin that carries the figure, then every other copy of
the paper on this machine (question file, solution file, other publishers).
Only if all fail, redraw it in `drawn/draw.py`, encoding ONLY what the printed
question, its key and its solution fix, and reference it as `{ "file": ... }`
with a manifest note that starts "REDRAWN". A row may also carry only a
`solution` (a model answer that disagreed with the real figure).

## Batches done

| Batch | Rows | Date |
|---|---|---|
| `upsc-2018-p2` (UPSC CSE 2018 Paper II) | 19 + 8 option images | 2026-10-03 |
| `cds-gk-2017-ii`, `cds-gk-2022-ii`, `cds-gk-2023-ii` (CDS General Knowledge) | 6 (two maps, a circuit, a graph, a plant cell, a pendulum) | 2026-10-03 |
| `cbse12-ncert-emi`, `cbse12-ncert-ep`, `cbse12-ncert-ro` (CBSE Class 12, NCERT Physics worked examples) | 7 (Example 6.5 carries Figs 6.8 and 6.9 stacked) | 2026-10-03 |
| `cbse12-pyq-*` (six CBSE Class 12 board papers, 2022-2025, Chemistry + Physics) | 7 + 4 option graphs (55-2-2 Q3; the descriptive option text cleared with `"all"`) | 2026-10-03 |
| `foundation-*` (eight Foundation worksheets: Light, Sound, Biology, Chemistry) | 18 + 16 option graphs; Light WS1 Q3 had no figure in the source, so only its invented description was removed | 2026-10-03 |
| `jee-2025-apr02` (JEE Main 2 Apr 2025 Q141, from the question .docx) | 1 | 2026-10-03 |
| `ncert10-electricity`, `ncert11-gravitation`, `ncert11-laws-of-motion` (NCERT worked examples; 11.12 and 7.1(a) use `mask` to blank body text beside a margin figure) | 4 | 2026-10-03 |
| `mh-sb-9-*`, `mh-ssc-10-*`, `mh-sb-11-*` (Balbharati Class 9 Geometry, Class 10 Probability, Class 11 Physics; SSC 2023 Science I Q4(i)) | 14 (the SSC set reuses its sibling's stored figure via `existing`; Optics Q3(vii) keeps its 37/53 degree note via a replace step) | 2026-10-03 |
| `neet-pariksha-13136` (ParikshaGruh 13136 Thermodynamics; cropped from inside each question picture) | 5 + 4 option diagrams | 2026-10-03 |
| `mpsc-group-bc` (MPSC Group B & C prelims: a pie chart and four number-in-circle puzzles; table stripped from English AND the Marathi translation via `stripTranslation`; the figure box and Marathi stem also go into `scripts/mpsc/data/*.merged.json`, the English stem there is left as committed because it feeds content_hash) | 5 | 2026-10-03 |
| `mh-hsc-12-geo-*` (Balbharati Std XII Geography, 18 activity sets) | 87 (passages cut back to the book's own instruction; Fig 8.5's typed ad entries KEPT, the printed ad is unreadable on a phone; answer check found 2 mismatches, listed in the batch note) | 2026-10-03 |
| `mh-ssc-10-*` (Balbharati Class 10: Statistics, Mensuration, Similarity, Effects of Electric Current, Heredity) | 19 (Ex Q11(c) fixed separately: its figure is at the top of the next column) | 2026-10-03 |
| `mh-sb-9-triangles-3-4`, `mh-sb-11-maths-figures`, `mh-sb-11-semiconductors`, `mh-hsc-12-maths-vectors`, `mh-hsc-12-physics-magnetic` (Balbharati Class 9 / 11 / 12) | 11 (a passage that was all description is cleared to NULL) | 2026-10-03 |
| `nda-21aug-circuits`, `nda-2020-i-maths-venn`, `nda-maths-practice-figures` (NDA test paper, NDA 2020-I Maths, practice workbook) | 7 (Sets Q22: transcription error fixed, see batch note) | 2026-10-03 |
| `foundation-carbon-1-options`, `foundation-matter-2`, `foundation-human-eye-1` (Foundation worksheets; option pictures from the Word original where the PDF dropped them) | 4 + 11 option pictures (prism option (d) kept as text: not in the source) | 2026-10-03 |
| `ncert10-probability`, `ncert11-oscillations` (NCERT Class 10 Probability, Class 11 Oscillations) | 3 | 2026-10-03 |
| `mh-hsc-12-geo-answer-fixes`, `neet-pariksha-13177-redrawn`, `jee-2025-jan28-redrawn` | 2 Geography answers corrected to the real maps; 2 REDRAWN figures (no copy of the source figure exists) | 2026-10-03 |
| `ncert-group-c` (NCERT Class 10 Maths, Class 11 and 12 Physics; answerable rows, figure only) | 46 rows, 43 figures | 2026-10-03 |
| `balbharati-group-c` (Balbharati Class 9/10/11/12; answerable rows, figure only) | 28 rows, 24 figures (Electric Current Ex Q.4(ix)/(x) left out: their figure is the colour table already in the text) | 2026-10-03 |
| `cbse12-pyq-group-c` (CBSE Class 12 Maths board papers 2023/2026; case studies + one vector figure) | 18 rows, 6 figures | 2026-10-03 |
| `group-c-misc` (MHT-CET 2023/2025 and Foundation Word originals, NDA trig workbook) | 10 (JEE 24 Jan 2023 Q104 left: no figure in its source) | 2026-10-03 |
| `mh-ssc-10-effects-q11c` (Effects of Electric Current Ex Q11(c), a DC generator; figure at the top of the right-hand column) | 1 | 2026-10-04 |
