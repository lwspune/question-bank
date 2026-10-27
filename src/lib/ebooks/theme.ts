/**
 * The ebooks' look (2026-10-20). The layout came from the marketing reels
 * (white cards on a tinted page, a serif, small-caps eyebrows, pill chips);
 * the COLOURS are the website's (owner, same day: "align ebooks colors to that
 * of websites"), so the notes diagrams, drawn in the site's own classes, sit
 * in the books without clashing. Page tint, navy and the royal blue are the
 * tokens in app/globals.css; the boxes take the notes pages' content colours
 * (formula blue, worked-example emerald, try-it sky, trap amber).
 *
 * One accent per book kind, so the three are told apart at a glance: Formula
 * royal blue (the brand, and the colour of formula boxes), Notes violet (the
 * notes pages' practice colour), PYQ emerald (the colour of worked answers),
 * Solved Papers amber (2026-10-26, the board books).
 *
 * The page colour is painted under every page when the parts are joined
 * (lib/ebooks/pdfAssemble paintPaper): Chrome leaves @page margins white.
 */
import type { EbookKind } from "./catalog";

/** The site's page tint (--background). */
export const PAPER = "#f5f7fb";
/** The site's navy (--foreground) and muted text (--muted-foreground). */
export const INK = "#0f1d4a";
export const MUTED = "#55657f";
export const ACCENT: Record<EbookKind, string> = { formula: "#1d4ed8", notes: "#6d28d9", pyq: "#047857", papers: "#b45309", repeats: "#be123c", chapterwise: "#0f766e" };
export const KIND_LABEL: Record<EbookKind, string> = {
  formula: "Formula Book",
  notes: "Notes Book",
  pyq: "PYQ Book",
  papers: "Solved Papers",
  repeats: "Repeated PYQs",
  chapterwise: "Chapter-wise PYQs",
};

/** The board books, which wear the navy and gold cover (2026-10-26). */
export const PREMIUM_KINDS: ReadonlySet<EbookKind> = new Set<EbookKind>(["papers", "repeats", "chapterwise"]);

/** Shared by every part. Pages keep their margins; the page tint shows through them once painted. */
export const THEME_CSS = `
:root { --paper:${PAPER}; --edge:#dfe6f1; --soft:#eaeff8; --ink:${INK}; --muted:${MUTED}; --brand:#1d4ed8;
  --emerald:#047857; --emerald-bg:#ecfdf5; --sky:#0369a1; --sky-bg:#f0f9ff; --sky-line:#bae6fd;
  --amber:#92400e; --amber-deep:#78350f; --amber-bar:#f59e0b; --amber-bg:#fffbeb; --card:#ffffff; }
html { background: var(--paper); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: "PV Serif", "PV Devanagari", "PV Math", "PV Sans", serif; color: var(--ink);
  font-size: 10.5pt; line-height: 1.5; font-variant-numeric: lining-nums; }
.eyebrow { font-size: 8.5pt; letter-spacing: .18em; text-transform: uppercase; font-weight: 700; color: var(--muted); }
.card { background: var(--card); border-radius: 10pt; border: .75pt solid var(--edge);
  box-shadow: 0 1px 2px rgba(15,29,74,.05), 0 6pt 18pt -10pt rgba(15,29,74,.22); padding: 12pt 14pt; }
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
   loop (measured 2026-10-20: 6 s without, over 15 minutes with), so they carry
   only the site's hairline card border; short cards that never break keep the shadow. */
.fcard, .ncard { margin: 0 0 10pt; box-shadow: none; border: .75pt solid var(--edge); }
.fcard > h2, .ncard > h3 { margin: 0 0 6pt; break-after: avoid; }
.fcard > h2 { font-size: 11.5pt; color: var(--acc); }
/* The notes pages' formula box: a royal-blue bar on a light blue tint, the label in blue capitals. */
.f { border-left: 3pt solid #1d4ed8; background: rgba(29,78,216,.05); border-radius: 0 6pt 6pt 0; padding: 4pt 8pt 4pt 9pt;
  margin: 0 0 6pt; break-inside: avoid; }
.f .lbl { font-size: 8pt; font-weight: 700; color: var(--brand); letter-spacing: .08em; text-transform: uppercase; }
.sym { font-size: 8.5pt; color: var(--muted); margin-top: 1pt; }
.sym b { color: var(--ink); font-weight: 600; }
.reft { margin: 0 0 8pt; break-inside: avoid; }
.reft .lbl { font-size: 8.5pt; font-weight: 700; color: var(--muted); margin-bottom: 2pt; }
table.ref { border-collapse: collapse; width: 100%; font-size: 9pt; }
.ref th, .ref td { border-bottom: .6pt solid var(--edge); padding: 3pt 6pt; text-align: left; vertical-align: top; }
.ref th { font-weight: 700; color: var(--amber); background: var(--amber-bg); font-size: 8pt; letter-spacing: .06em; text-transform: uppercase; }
.ref tr.note td { color: var(--amber); font-size: 8.5pt; border-bottom: 0; padding-top: 0; }
.cap { font-size: 8pt; color: var(--muted); margin-top: 2pt; }
/* The notes pages' trap callout: amber tint, amber bar, dark amber text. */
.trap { background: var(--amber-bg); border-left: 3pt solid var(--amber-bar); border-radius: 0 8pt 8pt 0; padding: 7pt 10pt;
  margin-top: 6pt; break-inside: avoid; color: var(--amber-deep); }
.trap .tl { font-size: 8pt; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--amber); }
.trap p { margin: 3pt 0 0; font-size: 9.2pt; }
.trap p b { color: var(--amber-deep); }

/* Notes */
.subh { font-size: 15pt; margin: 14pt 0 8pt; break-after: avoid; }
.ncard > h3 { font-size: 12.5pt; }
.intu { font-style: italic; color: #33415f; margin: 0 0 6pt; }
.defn { margin: 0 0 6pt; }
.defn ul { margin: 2pt 0 0; padding-left: 14pt; }
/* A notes diagram, as the page draws it; the interactive ones show their starting state, controls hidden. */
.viz { margin: 4pt 0 8pt; break-inside: avoid; font-family: "Segoe UI", system-ui, sans-serif; }
.viz svg { max-height: 85mm; }
.viz input, .viz button, .viz select, .viz [role="slider"], .viz [role="radiogroup"] { display: none !important; }
.box { border-radius: 8pt; padding: 8pt 10pt; margin-top: 6pt; break-inside: avoid; }
.box .tl { font-size: 8pt; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
/* The worked-out example box: emerald, as on the notes pages. */
.box.ex { background: var(--emerald-bg); }
.box.ex .tl { color: var(--emerald); }
/* Try it: sky, as the notes pages' self-check. */
.box.try { background: var(--sky-bg); border: .75pt solid var(--sky-line); }
.box.try .tl { color: var(--sky); }
.box ol { margin: 3pt 0 0; padding-left: 16pt; }
.box li { margin: 1pt 0; }
.box .ans { margin-top: 4pt; font-weight: 700; }

/* Questions */
.q { display: grid; grid-template-columns: 26pt 1fr; gap: 0 8pt; margin: 0 0 11pt; break-inside: avoid; }
.qn { height: 18pt; min-width: 22pt; padding: 0 5pt; border-radius: 99pt; background: var(--ink); color: #fff; font-size: 8.5pt;
  font-weight: 700; display: flex; align-items: center; justify-content: center; margin-top: 1pt; }
.qb { min-width: 0; }
.src { display: inline-block; font-size: 7.5pt; color: var(--muted); background: var(--soft); border-radius: 99pt; padding: 0 6pt;
  margin-left: 4pt; white-space: nowrap; font-style: normal; }
.rec { font-size: 8.5pt; color: var(--muted); margin-top: 4pt; }
.rec b { color: var(--emerald); }
.subtopic { font-size: 11pt; font-weight: 700; color: var(--acc); margin: 6pt 0 9pt; display: flex; justify-content: space-between;
  gap: 10pt; break-after: avoid; }
.subtopic .rng { font-weight: 400; color: var(--muted); font-size: 9pt; white-space: nowrap; }
.chip { display: inline-block; background: var(--emerald-bg); color: var(--emerald); font-weight: 700;
  font-size: 8.5pt; border-radius: 99pt; padding: 1pt 8pt; margin-bottom: 3pt; }
.sol .p { color: #26345a; }
.keygrid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 4pt; }
.kc { display: flex; gap: .5em; padding: 3pt 7pt; background: var(--card); border: .6pt solid var(--edge); border-radius: 6pt; break-inside: avoid; }
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

/* Solved Papers: a paper's own numbers ("20 (b).") are wider than a pill's one or two digits */
.chead .pmeta { color: var(--muted); font-size: 10pt; margin-top: 2pt; }
.bp .q.pq { grid-template-columns: max-content 1fr; }
.bp .qn { border-radius: 6pt; }
.bp .ans { font-weight: 700; color: var(--emerald); margin-bottom: 2pt; }
/* Chapter-wise PYQs: a marks group heading, above the per-question lines */
.mgroup { font-size: 13pt; margin: 14pt 0 8pt; padding: 4pt 10pt; border-radius: 6pt; background: var(--soft); color: var(--ink); break-after: avoid; }
.mgroup:first-child { margin-top: 0; }
`;
