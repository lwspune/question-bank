/**
 * Print stylesheet for the vocab book. Inlined rather than added to globals.css
 * so this aggressive CSS (white ground, black text) can never leak onto an
 * on-screen surface — the same call /books and the /notes handout make.
 *
 * GEOMETRY MIRRORS THE WORD EXPORTER, because the Word file is the deliverable:
 * US Letter, 0.5in margins, two columns with a 0.5in gutter, Cambria 10pt.
 * See src/lib/export/docxBuilder.ts.
 *
 * WHAT IT CANNOT PROMISE: Word does its own line-breaking and column balancing,
 * so page COUNT and boundaries will be close, not identical.
 */
export const VOCAB_PRINT_CSS = `
@page { size: letter; margin: 12.7mm; }

.vdoc {
  color: #000; background: #fff;
  font-family: Cambria, Georgia, "Times New Roman", serif;
  font-size: 10pt; line-height: 1.32;
  max-width: 8.5in; margin: 0 auto; padding: 12.7mm;
}
.vdoc * { box-sizing: border-box; }
.vdoc p { margin: 0; }

/* ---- title block: spans both columns ---- */
.vtitle { text-align: center; margin-bottom: 5mm; }
.vtitle h1 { font-size: 15pt; font-weight: 700; margin: 0; letter-spacing: .01em; }
.vtitle .vsub { font-size: 10.5pt; margin-top: 1.5mm; font-weight: 700; }
.vtitle .vblurb { font-size: 9pt; color: #333; margin-top: 1mm; font-style: italic; }

/* ---- the two-column flow ----
   NOTE: no backticks anywhere in this file — the whole stylesheet is a JS
   template literal, so one would close the string mid-CSS.

   column-fill DIFFERS BY MEDIUM, and getting it wrong makes the preview lie.
   'auto' fills column 1 completely before starting column 2, which is what a
   paged dictionary needs — but it needs a height to know where "full" is, and
   @page supplies one only in print. On screen the container has no height, so
   'auto' puts every entry in the left column and leaves the right half blank.
   Screen therefore balances; print fills. */
.vcols { column-count: 2; column-gap: 12.7mm; column-fill: balance; }
@media print { .vcols { column-fill: auto; } }

/* An entry is a few lines at most, so keeping it whole can never strand a page.
   That is NOT true of the /books reader, where a set can exceed a page. */
.ventry { break-inside: avoid; margin: 0 0 3.6mm; }

/* The letter-change gap. EXTRA SPACE, not a heading: the bold headword already
   says which letter you are in, and a heading would cost two lines per letter. */
.ventry.vgap { margin-top: 5mm; }

.vhead { text-indent: -3.2mm; padding-left: 3.2mm; }
/* Set small and light so the number stays a reference and never competes with
   the headword the eye is scanning for. */
.vnum { font-size: 8pt; color: #555; }
.vword { font-weight: 700; }
.vsemi { font-weight: 700; }
.vmeaning { }

.vsent { margin-top: 0.5mm; padding-left: 3.2mm; }
.vcite { font-style: normal; color: #444; font-size: 9pt; white-space: nowrap; }

.vclust { padding-left: 3.2mm; font-size: 9.5pt; }
.vlab {
  font-variant: small-caps; letter-spacing: .04em;
  color: #333; font-size: 8.5pt; margin-right: 1mm;
}
.vempty { text-align: center; color: #555; font-style: italic; padding: 12mm 0; }

/* On-screen only: the print control disappears on paper. */
.vnoprint { margin-bottom: 4mm; }
@media print { .vnoprint { display: none !important; } .vdoc { padding: 0; } }
`;
