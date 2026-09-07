/**
 * Print stylesheet for the /books print route. Inlined as a <style> tag rather
 * than a globals.css block so this aggressive CSS (white ground, black text,
 * no interactive affordances) can never leak into an on-screen surface — the
 * same call the /notes handout makes.
 *
 * THE GEOMETRY MIRRORS THE WORD EXPORTER, because the Word file is the
 * deliverable and this page exists to show what it will look like:
 * US Letter, 0.5in margins, TWO columns with a 0.5in gutter, Cambria 10pt.
 * See src/lib/export/docxBuilder.ts — PAGE_WIDTH/PAGE_HEIGHT (12240x15840
 * twips = 8.5x11in), MARGIN/COL_SPACE (720 twips = 0.5in), FONT, and
 * SIZE_HALF_POINTS (20 = 10pt).
 *
 * WHAT IT CANNOT PROMISE: Word does its own line-breaking, hyphenation and
 * column balancing, so page COUNT and page BOUNDARIES will be close but not
 * identical. The page says so; do not let anyone read this as exact.
 *
 * `break-inside: avoid` is on the QUESTION and never on the SET. A set here can
 * be a Reading Comprehension passage with 26 questions — far taller than a page
 * — and this project has already stranded ~80% of a page by putting avoid-break
 * on a block bigger than the space left (see the /notes handout).
 */
export const BOOK_PRINT_CSS = `
@page { size: letter; margin: 12.7mm; }

.bdoc {
  color: #000; background: #fff;
  font-family: Cambria, Georgia, "Times New Roman", serif;
  font-size: 10pt; line-height: 1.34;
}
.bdoc * { box-sizing: border-box; }

/* ---- title block (spans both columns) ---- */
.btitle { text-align: center; margin-bottom: 5mm; }
.btitle h1 { font-size: 14pt; font-weight: 700; margin: 0; }
.btitle .bsub { font-size: 10pt; color: #333; margin-top: 1.5mm; }

/* ---- chapter contents (front matter, outside the two-column flow) ----
   NOT break-inside:avoid on the block: a chapter with many subtopics would be
   taller than the space left and strand most of a page, which this project has
   already done once (see the /notes handout). Each ROW is the safe unit. */
.bcontents { margin: 0 0 5mm; }
.bcontentshead {
  font-size: 11pt; font-weight: 700;
  margin: 0 0 1.5mm; padding-bottom: 1mm;
  border-bottom: 1.2pt solid #000;
  break-after: avoid; page-break-after: avoid;
}
.bctable { width: 100%; border-collapse: collapse; font-size: 9.5pt; }
.bctable th, .bctable td {
  padding: 0.7mm 2mm; text-align: right; white-space: nowrap;
  vertical-align: baseline;
}
.bctable thead th { font-size: 9pt; border-bottom: 0.5pt solid #999; }
/* The subtopic label: left-aligned, and the only cell allowed to wrap. */
.bctable .bcname { text-align: left; font-weight: 400; width: 40%; white-space: normal; }
.bctable tbody tr, .bctable tfoot tr { break-inside: avoid; page-break-inside: avoid; }
.bctable tfoot .bcname, .bctable tfoot td {
  border-top: 0.5pt solid #999; font-weight: 700; padding-top: 1.2mm;
}
.bctable .bccount { color: #555; }
.bctable .bcnone { color: #999; }

/* ---- the two-column flow ---- */
.bflow { columns: 2; column-gap: 12.7mm; }

/* Section + subtopic headings run full width, like a book's rules. */
.bsec {
  column-span: all;
  font-size: 12pt; font-weight: 700;
  margin: 4mm 0 2.5mm; padding-bottom: 1mm;
  border-bottom: 1.2pt solid #000;
  break-after: avoid; page-break-after: avoid;
}
.bsec .bcount { float: right; font-size: 9pt; font-weight: 400; color: #444; }

/* Directions print ONCE above the questions that share them, and must not be
   orphaned at the foot of a column away from its first question. */
.bdir {
  font-size: 9.5pt; font-style: italic; color: #222;
  margin: 2.5mm 0 1.5mm;
  break-after: avoid; page-break-after: avoid;
  break-inside: avoid; page-break-inside: avoid;
}

/* A shared passage (Reading Comprehension, Cloze). NOT avoid-break: some run
   longer than a page on their own. */
.bpassage { margin: 0 0 2mm; text-align: justify; }

/* NOT break-inside:avoid on the set — see the header. */
.bset { margin-bottom: 1mm; }

/* The question IS the safe unit to keep whole. */
.bq {
  break-inside: avoid; page-break-inside: avoid;
  margin-bottom: 2.6mm;
}
.bq .bnum { font-weight: 700; }
.bq .bstem { display: inline; }
.bq .bopts { margin: 0.8mm 0 0; padding: 0; list-style: none; }
.bq .bopts li { margin: 0.2mm 0; }
.bq .bopts .bl { font-weight: 600; }
.bq .btag { font-size: 8.5pt; color: #555; }

/* ---- layout A: subtopic blocks inside a section ---- */
.bblock { margin-bottom: 1.5mm; }
.bsub2 {
  font-size: 10.5pt; font-weight: 700;
  margin: 3mm 0 1mm; padding-bottom: 0.6mm;
  border-bottom: 0.5pt solid #999;
  break-after: avoid; page-break-after: avoid;
  break-inside: avoid; page-break-inside: avoid;
}
.bsub2 .bcount { float: right; font-size: 8.5pt; font-weight: 400; color: #555; }
/* Provenance for a set whose Directions were lifted to the block heading. */
.bprov { font-size: 8.5pt; color: #555; margin: 1.6mm 0 0.6mm; break-after: avoid; }
/* A per-QUESTION provenance line closes its question rather than introducing
   the next one, so it must avoid a break BEFORE it, not after — the opposite of
   the set-level line above, which is a heading for what follows. */
.bqprov { margin: 0.8mm 0 0; break-before: avoid; break-after: auto; }
/* The recurrence line is the reason this book collapses repeats at all, so it
   is the one piece of provenance that is not muted. */
.brepeat { color: #1f2937; font-weight: 600; }

/* ---- answer key: its own page at the end of the chapter ---- */
.bkeyhead { break-before: page; page-break-before: always; }
.bkey { columns: 4; column-gap: 8mm; font-size: 9.5pt; margin: 0; padding: 0; list-style: none; }
.bkey li { break-inside: avoid; page-break-inside: avoid; margin: 0.4mm 0; }
.bkey .bn { font-weight: 700; }
.bkey .bmissing { color: #777; font-style: italic; }

/* ---- screen-only chrome: make it read as a sheet of paper ---- */
@media screen {
  body { background: #71717a; }
  .bdoc {
    width: 215.9mm; min-height: 279.4mm;
    margin: 10mm auto; padding: 12.7mm;
    box-shadow: 0 2px 14px rgba(0,0,0,.35);
  }
  .bbar {
    position: sticky; top: 0; z-index: 10;
    display: flex; gap: 10px; align-items: center; flex-wrap: wrap;
    background: #18181b; color: #fafafa;
    padding: 9px 14px; font-family: system-ui, sans-serif; font-size: 13px;
  }
  .bbar a { color: #a5b4fc; }
  .bbar button {
    background: #4f46e5; color: #fff; border: 0; border-radius: 5px;
    padding: 6px 12px; font-size: 13px; cursor: pointer;
  }
  .bbar .bnote { color: #a1a1aa; }
}
@media print {
  .bbar { display: none !important; }
  .bdoc { width: auto; margin: 0; padding: 0; box-shadow: none; }
}
`;
