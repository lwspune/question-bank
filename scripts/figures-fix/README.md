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

1. **Find each figure in the original.** Render the pages with a fractional
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

   A strip is `"brackets"` (every `[Figure|Diagram|Graph|Image: …]` block), a
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
