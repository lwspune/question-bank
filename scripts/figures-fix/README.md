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
   Otherwise: Render the pages with a fractional
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
