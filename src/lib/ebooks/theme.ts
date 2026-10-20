/**
 * The ebooks' look (approved by the owner 2026-10-20), taken from the
 * marketing reels' "white board" palette (Digital_Marketing_AI
 * remotion/src/lib/palette.ts): warm paper, navy ink, three quiet accents, a
 * serif throughout, white cards floating on the paper, small-caps eyebrows and
 * pill chips. One accent per book kind, so the three are told apart at a
 * glance: Formula blue, Notes amber, PYQ green.
 *
 * The paper colour is painted under every page when the parts are joined
 * (lib/ebooks/pdfAssemble paintPaper): Chrome leaves @page margins white.
 */
import type { EbookKind } from "./catalog";

export const PAPER = "#faf8f3";
export const ACCENT: Record<EbookKind, string> = { formula: "#3f56a0", notes: "#a94f28", pyq: "#2a736e" };
export const KIND_LABEL: Record<EbookKind, string> = { formula: "Formula Book", notes: "Notes Book", pyq: "PYQ Book" };

/** Shared by every part. Pages keep their margins; the paper shows through them once painted. */
export const THEME_CSS = `
:root { --paper:${PAPER}; --edge:#efeadf; --ink:#23304a; --muted:#5f6880; --blue:#3f56a0; --green:#2a736e; --amber:#a94f28; --card:#ffffff; }
html { background: var(--paper); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: "PV Serif", "PV Devanagari", "PV Math", "PV Sans", serif; color: var(--ink);
  font-size: 10.5pt; line-height: 1.5; font-variant-numeric: lining-nums; }
.eyebrow { font-size: 8.5pt; letter-spacing: .18em; text-transform: uppercase; font-weight: 700; color: var(--muted); }
.card { background: var(--card); border-radius: 10pt; box-shadow: 0 6pt 18pt rgba(35,48,74,.10); padding: 12pt 14pt;
  box-decoration-break: clone; -webkit-box-decoration-break: clone; }
.katex { font-size: 1.05em; }
.katex-display { margin: 2pt 0; text-align: left; }
.katex-display > .katex { text-align: left; }
.mblock { display: block; margin: 3pt 0; }
.p + .p { margin-top: 2pt; }
.newpage { break-before: page; }

/* A chapter's own heading (formula and notes books) */
.chead { border-bottom: 1.2pt solid var(--ink); padding-bottom: 6pt; margin-bottom: 12pt; display: flex; align-items: flex-end; gap: 12pt; }
.chead .cn { font-size: 34pt; font-weight: 700; line-height: .9; color: var(--acc); }
.chead h1 { font-size: 20pt; margin: 2pt 0 0; line-height: 1.15; }
.part { font-size: 14pt; margin: 4pt 0 10pt; padding-bottom: 3pt; border-bottom: 1pt solid var(--edge); break-after: avoid; }

/* Cards: formulas, tables, traps. These flow across pages, and a box-shadow on a
   card that breaks across pages sends Chrome's print layout into a near-endless
   loop (measured 2026-10-20: 6 s without, over 15 minutes with), so they carry a
   hairline border instead; short cards that never break keep the shadow. */
.fcard, .ncard { margin: 0 0 10pt; box-shadow: none; border: .75pt solid #e6dfd0; }
.fcard > h2, .ncard > h3 { margin: 0 0 6pt; break-after: avoid; }
.fcard > h2 { font-size: 11.5pt; color: var(--acc); }
.f { border-left: 2.5pt solid var(--blue); padding: 2pt 0 2pt 9pt; margin: 0 0 6pt; break-inside: avoid; }
.f .lbl { font-size: 8.5pt; font-weight: 700; color: var(--muted); letter-spacing: .04em; }
.sym { font-size: 8.5pt; color: var(--muted); margin-top: 1pt; }
.sym b { color: var(--ink); font-weight: 600; }
.reft { margin: 0 0 8pt; break-inside: avoid; }
.reft .lbl { font-size: 8.5pt; font-weight: 700; color: var(--muted); margin-bottom: 2pt; }
table.ref { border-collapse: collapse; width: 100%; font-size: 9pt; }
.ref th, .ref td { border-bottom: .6pt solid var(--edge); padding: 3pt 6pt; text-align: left; vertical-align: top; }
.ref th { font-weight: 700; color: var(--muted); font-size: 8pt; letter-spacing: .06em; text-transform: uppercase; }
.ref tr.note td { color: var(--amber); font-size: 8.5pt; border-bottom: 0; padding-top: 0; }
.cap { font-size: 8pt; color: var(--muted); margin-top: 2pt; }
.trap { background: color-mix(in srgb, var(--amber) 8%, white); border-radius: 8pt; padding: 7pt 10pt; margin-top: 6pt; break-inside: avoid; }
.trap .tl, .box .tl { font-size: 8pt; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--amber); }
.trap p { margin: 3pt 0 0; font-size: 9.2pt; }
.trap p b { color: var(--ink); }

/* Notes */
.subh { font-size: 15pt; margin: 14pt 0 8pt; break-after: avoid; }
.ncard > h3 { font-size: 12.5pt; }
.intu { font-style: italic; color: #3a4762; margin: 0 0 6pt; }
.defn { margin: 0 0 6pt; }
.defn ul { margin: 2pt 0 0; padding-left: 14pt; }
.box { border-radius: 8pt; padding: 8pt 10pt; margin-top: 6pt; break-inside: avoid; }
.box.ex { background: color-mix(in srgb, var(--blue) 6%, white); }
.box.ex .tl { color: var(--blue); }
.box.try { background: color-mix(in srgb, var(--green) 7%, white); }
.box.try .tl { color: var(--green); }
.box ol { margin: 3pt 0 0; padding-left: 16pt; }
.box li { margin: 1pt 0; }
.box .ans { margin-top: 4pt; font-weight: 700; }

/* Questions */
.q { display: grid; grid-template-columns: 26pt 1fr; gap: 0 8pt; margin: 0 0 11pt; break-inside: avoid; }
.qn { height: 18pt; min-width: 22pt; padding: 0 5pt; border-radius: 99pt; background: var(--ink); color: #fff; font-size: 8.5pt;
  font-weight: 700; display: flex; align-items: center; justify-content: center; margin-top: 1pt; }
.qb { min-width: 0; }
.src { display: inline-block; font-size: 7.5pt; color: var(--muted); background: var(--edge); border-radius: 99pt; padding: 0 6pt;
  margin-left: 4pt; white-space: nowrap; font-style: normal; }
.rec { font-size: 8.5pt; color: var(--muted); margin-top: 4pt; }
.rec b { color: var(--green); }
.subtopic { font-size: 11pt; font-weight: 700; color: var(--acc); margin: 6pt 0 9pt; display: flex; justify-content: space-between;
  gap: 10pt; break-after: avoid; }
.subtopic .rng { font-weight: 400; color: var(--muted); font-size: 9pt; white-space: nowrap; }
.chip { display: inline-block; background: color-mix(in srgb, var(--green) 12%, white); color: var(--green); font-weight: 700;
  font-size: 8.5pt; border-radius: 99pt; padding: 1pt 8pt; margin-bottom: 3pt; }
.sol .p { color: #2e3a52; }
.keygrid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 4pt; }
.kc { display: flex; gap: .5em; padding: 3pt 7pt; background: var(--card); border-radius: 6pt; break-inside: avoid; }
.kn { color: var(--muted); min-width: 1.8em; }
.ka { font-weight: 700; color: var(--ink); }

/* PYQ chapter opener: a page of its own */
.opener { min-height: 248mm; display: flex; flex-direction: column; justify-content: center; break-after: page; }
.opener .num { font-size: 72pt; font-weight: 700; color: var(--acc); line-height: 1; }
.opener h1 { font-size: 32pt; margin: 6pt 0 4pt; line-height: 1.1; }
.opener .meta { color: var(--muted); font-size: 11pt; }
.opener .topics { margin-top: 18pt; }
.topic { display: flex; justify-content: space-between; gap: 10pt; padding: 7pt 0; border-bottom: .6pt solid var(--edge); }
.topic:last-child { border-bottom: 0; }
.topic .n { color: var(--muted); white-space: nowrap; }
.opener .how { margin-top: 14pt; font-size: 9.5pt; color: var(--muted); }
`;
