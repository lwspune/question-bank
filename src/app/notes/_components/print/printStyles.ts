/**
 * Print stylesheet for the /notes/print handout route. Inlined as a <style>
 * tag rather than a globals.css block so it can never leak into the app's
 * on-screen surfaces — this CSS is aggressive (forces white background,
 * black text, drops every interactive affordance) and only makes sense
 * inside the print document.
 *
 * Units are mm because the target is a physical A4 page, not a viewport.
 */
export const PRINT_CSS = `
@page { size: A4; margin: 14mm 12mm 16mm 12mm; }

.pdoc { max-width: 186mm; margin: 0 auto; padding: 8mm 0 24mm; color: #111; background: #fff; }
.pdoc a { color: inherit; text-decoration: none; }

/* ---- cover ---- */
.pcover { border-bottom: 2px solid #111; padding-bottom: 8mm; margin-bottom: 8mm; }
.pcover .brand { font-size: 9pt; letter-spacing: .14em; text-transform: uppercase; color: #4f46e5; font-weight: 700; }
.pcover h1 { font-size: 26pt; line-height: 1.12; margin: 4mm 0 2mm; font-weight: 800; letter-spacing: -.01em; }
.pcover .sub { font-size: 11pt; color: #444; }
.pcover .intro { font-size: 10.5pt; line-height: 1.55; color: #333; margin-top: 5mm; font-family: var(--font-serif), Georgia, serif; }
.pcover .stats { margin-top: 6mm; font-size: 9pt; color: #555; display: flex; gap: 9mm; flex-wrap: wrap; }
.pcover .stats b { color: #111; font-size: 12pt; display: block; }

/* ---- table of contents ---- */
.ptoc { margin-bottom: 8mm; }
.ptoc h2 { font-size: 10pt; text-transform: uppercase; letter-spacing: .1em; color: #666; margin-bottom: 3mm; }
.ptoc ol { list-style: decimal outside; margin: 0; padding-left: 5mm; font-size: 10pt; line-height: 1.9; }
.ptoc .cn { color: #666; font-size: 9pt; }

/* ---- subtopic ---- */
.psub { break-before: page; page-break-before: always; }
.psub.first { break-before: auto; page-break-before: auto; }
/* Glue the subtopic header to whatever follows — a header stranded alone at
   the foot of a page is the worst break this document can make. */
.psub > header { border-bottom: 1px solid #ccc; padding-bottom: 3mm; margin-bottom: 5mm; break-after: avoid-page; page-break-after: avoid; }
.psub .kicker { font-size: 8.5pt; letter-spacing: .12em; text-transform: uppercase; color: #4f46e5; font-weight: 700; }
.psub h2 { font-size: 18pt; margin: 1.5mm 0 2mm; font-weight: 800; letter-spacing: -.01em; }
.psub .oneline { font-size: 10.5pt; color: #333; font-family: var(--font-serif), Georgia, serif; }
.psub .why { font-size: 9.5pt; color: #555; margin-top: 2.5mm; line-height: 1.5; }

/* ---- concept ---- */
/* NOT break-inside:avoid — a concept unit routinely runs longer than a page,
   and forcing it whole strands 80% of a page blank before pushing it over.
   Breaks are avoided on the inner boxes (.pbox) instead, which are page-sized. */
.pcon { border: 1px solid #d4d4d8; border-radius: 6px; padding: 5mm; margin-bottom: 6mm; }
.pcon > header { margin-bottom: 3.5mm; break-after: avoid-page; page-break-after: avoid; }
.pcon .cidx { font-size: 8pt; letter-spacing: .1em; text-transform: uppercase; color: #4f46e5; font-weight: 700; }
.pcon h3 { font-size: 13.5pt; margin: 1mm 0 0; font-weight: 700; }
.plabel { font-size: 8pt; letter-spacing: .09em; text-transform: uppercase; color: #71717a; font-weight: 700; margin: 0 0 1mm; }
.pbody { font-family: var(--font-serif), Georgia, serif; font-size: 10pt; line-height: 1.55; }
.pblock { margin-top: 3.5mm; }

/* ---- boxes ---- */
.pbox { border-radius: 5px; padding: 3.5mm 4mm; margin-top: 3.5mm; break-inside: avoid-page; page-break-inside: avoid; }
.pbox--formula { border: 1px solid #c7d2fe; background: #eef2ff; text-align: center; }
.pbox--worked  { border: 1px solid #d4d4d8; background: #fafafa; }
.pbox--self    { border: 1px solid #bae6fd; background: #f0f9ff; }
.pbox--prac    { border: 1px solid #ddd6fe; background: #f5f3ff; }
.pbox--trap    { border: 1px solid #fde68a; background: #fffbeb; }
.pbox--pyq     { border: 1px solid #d4d4d8; background: #fff; }
.pbox h4 { font-size: 8pt; letter-spacing: .09em; text-transform: uppercase; font-weight: 700; margin: 0 0 2mm; }
.pbox--formula h4 { color: #4338ca; }
.pbox--worked h4 { color: #52525b; }
.pbox--self h4 { color: #0369a1; }
.pbox--prac h4 { color: #6d28d9; }
.pbox--trap h4 { color: #b45309; }
.pbox--pyq h4 { color: #71717a; }
.pbox--formula .flabel { font-size: 8.5pt; color: #4338ca; margin-bottom: 1.5mm; font-weight: 600; }
.psyms { list-style: none; margin: 2.5mm 0 0; padding: 0; font-size: 8.5pt; color: #52525b; display: flex; flex-wrap: wrap; gap: 1mm 5mm; justify-content: center; }
/* list-style is restated because Tailwind's preflight resets ol/ul to none —
   without this the numbered solution steps print as unnumbered lines. */
.psteps { list-style: decimal outside; margin: 2.5mm 0 0; padding-left: 6mm; font-family: var(--font-serif), Georgia, serif; font-size: 9.5pt; line-height: 1.5; color: #3f3f46; }
.psteps li { margin-bottom: 1.2mm; }
.pans { margin-top: 2.5mm; border-left: 3px solid #059669; background: #ecfdf5; padding: 1.5mm 3mm; font-size: 9.5pt; font-family: var(--font-serif), Georgia, serif; }
.pans b { color: #065f46; font-family: var(--font-sans), system-ui, sans-serif; font-size: 8.5pt; text-transform: uppercase; letter-spacing: .06em; margin-right: 2mm; }
.preps { list-style: none; margin: 2mm 0 0; padding: 0; }
.preps li { border-top: 1px dotted #c4b5fd; padding: 1.6mm 0; font-size: 9.5pt; display: grid; grid-template-columns: 6mm 1fr; gap: .8mm 2mm; }
.preps li:first-child { border-top: none; }
.preps .n { color: #6d28d9; font-weight: 700; font-size: 8.5pt; }
.preps .q { font-family: var(--font-serif), Georgia, serif; }
.preps .a { grid-column: 2; color: #065f46; font-family: var(--font-serif), Georgia, serif; font-size: 9pt; }
.preps .a b { text-transform: uppercase; font-size: 8pt; letter-spacing: .05em; font-family: var(--font-sans), system-ui, sans-serif; margin-right: 1.5mm; }
.preps .m { grid-column: 2; color: #71717a; font-size: 8.5pt; font-style: italic; }
.ptrap { break-inside: avoid-page; }
.ptrap + .ptrap { margin-top: 2mm; }
.ptrap b { display: block; font-size: 9.5pt; color: #92400e; margin-bottom: .8mm; }
.ptrap span { font-size: 9.5pt; line-height: 1.5; font-family: var(--font-serif), Georgia, serif; color: #3f3f46; }

/* ---- pyq ---- */
.ppyq-meta { font-size: 8pt; color: #71717a; margin-bottom: 1.5mm; }
.ppyq-stem { font-family: var(--font-serif), Georgia, serif; font-size: 9.5pt; line-height: 1.5; }
.ppyq-ctx { font-family: var(--font-serif), Georgia, serif; font-size: 9pt; color: #52525b; border-left: 2px solid #d4d4d8; padding-left: 3mm; margin-bottom: 2mm; }
.popts { list-style: none; margin: 2.5mm 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 1.2mm 4mm; font-size: 9pt; }
.popts li { font-family: var(--font-serif), Georgia, serif; }
.popts .ok { font-weight: 700; color: #065f46; }
.psoln { margin-top: 2.5mm; padding-top: 2mm; border-top: 1px dashed #d4d4d8; font-size: 9pt; font-family: var(--font-serif), Georgia, serif; color: #3f3f46; line-height: 1.5; }

/* ---- figures ---- */
.pfig { margin-top: 4mm; text-align: center; break-inside: avoid-page; page-break-inside: avoid; }
.pfig svg { max-width: 100%; height: auto; }

/* ---- reference table ---- */
.pcon table { width: 100%; border-collapse: collapse; font-size: 9pt; margin-top: 2mm; }
.pcon th, .pcon td { border: 1px solid #d4d4d8; padding: 1.4mm 2mm; text-align: left; vertical-align: top; }
.pcon th { background: #f4f4f5; font-size: 8pt; text-transform: uppercase; letter-spacing: .05em; }

/* ---- revision sheet ---- */
.psheet { break-before: page; page-break-before: always; }
.psheet > h2 { font-size: 18pt; font-weight: 800; margin-bottom: 1mm; }
.psheet .lead { font-size: 9.5pt; color: #555; margin-bottom: 5mm; }
.psheet h3 { font-size: 10pt; text-transform: uppercase; letter-spacing: .08em; color: #4f46e5; margin: 5mm 0 2mm; border-bottom: 1px solid #e4e4e7; padding-bottom: 1mm; }
.psheet h4 { font-size: 9pt; color: #52525b; margin: 3mm 0 1mm; font-weight: 700; }
.psheet .frow { display: grid; grid-template-columns: 48mm 1fr; gap: 3mm; padding: 1.6mm 0; border-bottom: 1px dotted #e4e4e7; font-size: 9.5pt; break-inside: avoid-page; align-items: baseline; }
.psheet .frow .fl { color: #52525b; font-size: 8.5pt; }
.psheet ul { list-style: disc outside; margin: 1mm 0 0; padding-left: 5mm; font-size: 9.5pt; line-height: 1.5; }
.psheet ul li { margin-bottom: 1mm; }

/* ---- footer note ---- */
.pfoot { margin-top: 10mm; border-top: 1px solid #d4d4d8; padding-top: 3mm; font-size: 8pt; color: #71717a; text-align: center; }

/* ---- screen-only affordance ---- */
.pbar { display: flex; align-items: center; justify-content: space-between; gap: 6mm; background: #111827; color: #fff; padding: 10px 16px; font-size: 13px; border-radius: 8px; margin-bottom: 8mm; }
.pbar button { background: #4f46e5; color: #fff; border: 0; border-radius: 6px; padding: 7px 14px; font-size: 13px; font-weight: 600; cursor: pointer; }

@media print {
  .pbar, .no-print { display: none !important; }
  .pdoc { max-width: none; padding: 0; }
  html, body { background: #fff !important; }
}

/* KaTeX must not overflow the measure in print */
.pdoc .katex-display { margin: 2mm 0; }
.pdoc .katex { font-size: 1.02em; }
`;
