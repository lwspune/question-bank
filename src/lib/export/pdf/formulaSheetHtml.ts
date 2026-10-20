/**
 * A /notes chapter's formula sheet as one HTML document for the PDF printer
 * (2026-10-10): every formula box, reference table and trap of the chapter,
 * grouped by subtopic in two columns on A4.
 *
 * Built from `deriveSummary`, the SAME derivation the on-screen chapter
 * revision sheet reads, so the file and the page cannot drift. Pure: a
 * registry chapter in, a string out. Branding follows the paper rule (a pass
 * or free download carries the watermark + the site URL footer, institute
 * staff get it clean) and the owner's switches can only remove pieces. The
 * sheet never sells: no pass copy on it (owner, 2026-10-10).
 *
 * Spec: tests/formula-sheet-html.test.ts; every registered chapter renders
 * clean by tests/formula-sheet-registry.test.ts.
 */
import katex from "katex";
import "katex/contrib/mhchem";
import type { NotesChapterRegistration } from "@/lib/notes/chapters";
import { deriveSummary } from "@/lib/notes/deriveSummary";
import { brandingParts, type BrandingParts } from "@/lib/export/branding";
import { WATERMARK_PNG_BASE64 } from "../watermark.generated";

export type FormulaSheetChapter = Pick<NotesChapterRegistration, "subjectDisplay" | "chapter" | "notes" | "slugs">;

const ESC: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ESC[c]);
}

function tex(src: string, displayMode: boolean): string {
  return katex.renderToString(src, { displayMode, throwOnError: false, output: "html", strict: "ignore" });
}

/**
 * Prose with inline `\( \)` math and `**bold**`, as HTML. Trap titles and
 * table cells are short; the full RichText grammar is not needed here.
 */
function richInline(text: string): string {
  const out: string[] = [];
  const re = /\\\((.+?)\\\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    out.push(prose(text.slice(last, m.index)));
    out.push(tex(m[1], false));
    last = m.index + m[0].length;
  }
  out.push(prose(text.slice(last)));
  return out.join("");
}
function prose(s: string): string {
  return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
}

/**
 * The notes store several identities in one `latex` string, joined by
 * `\qquad` or `,\quad` (e.g. the four product-to-sum formulas). On a sheet
 * each belongs on its own line, or the row runs off the column, and the
 * comma that joined them goes with the join. A bare `\quad` inside a formula
 * (a condition after a result) stays.
 */
export function splitFormulaLines(latex: string): string[] {
  return latex
    .split(/\\qquad|,\s*\\quad/)
    .map((x) => x.trim().replace(/,$/, ""))
    .filter(Boolean);
}

export function formulaSheetStats(chapter: FormulaSheetChapter): {
  formulas: number;
  references: number;
  traps: number;
} {
  let formulas = 0;
  let references = 0;
  let traps = 0;
  for (const slug of chapter.slugs) {
    const s = deriveSummary(chapter.notes[slug]);
    formulas += s.formulas.length;
    references += s.references.length;
    traps += s.traps.length;
  }
  return { formulas, references, traps };
}

/** Whether a chapter has a sheet to sell: a chapter taught in prose alone
 *  (no formula, no reference table) would print traps on an empty page. */
export function hasFormulaSheet(chapter: FormulaSheetChapter): boolean {
  const s = formulaSheetStats(chapter);
  return s.formulas + s.references > 0;
}

export function formulaSheetFilename(subjectDisplay: string, chapterName: string): string {
  const part = (s: string) =>
    s
      .replace(/&/g, " ")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "_");
  return `Formulas_${part(subjectDisplay)}_${part(chapterName)}.pdf`;
}

const PALETTE = ["#1D4ED8", "#0E7490", "#7C3AED", "#B45309", "#047857", "#BE123C", "#4338CA", "#C2410C"];

const PAGE_CSS = `
@page { size: A4; margin: 12mm 12mm 16mm; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: "PV Serif", "PV Devanagari", "PV Math", "PV Sans", serif;
  font-size: 10pt; line-height: 1.4; color: #111827; font-variant-numeric: lining-nums; }
.watermark { position: fixed; top: 50%; left: 50%; width: 125mm; transform: translate(-50%, -50%);
  z-index: -1; opacity: .9; }
.masthead { display: flex; justify-content: space-between; align-items: flex-end;
  border-bottom: 1.5pt solid #1D4ED8; padding-bottom: 5pt; margin-bottom: 9pt; }
.brandline { font-size: 8pt; letter-spacing: .14em; text-transform: uppercase; color: #1D4ED8; font-weight: 600; }
.eyebrow { font-size: 8pt; letter-spacing: .1em; text-transform: uppercase; color: #1D4ED8; font-weight: 600; text-align: right; }
h1 { font-size: 15pt; line-height: 1.2; margin: 2pt 0 0; color: #0F1D4A; font-weight: 700; text-align: right; }
`;

/**
 * The formula blocks' own rules, apart from the page: the ebook
 * (lib/ebooks/bookHtml) prints the same blocks inside its chapters. `.cols`
 * is the sheet's content width (A4 less 12 mm a side); a page with other
 * margins overrides it.
 */
export const FORMULA_BLOCK_CSS = `
.cols { column-count: 2; column-gap: 7mm; width: 186mm; }
.cols + .full { margin-top: 9pt; }
.block { border-left: 2.5pt solid var(--c); padding: 0 0 0 7pt; margin: 0 0 9pt; }
.block h2 { font-size: 10.5pt; margin: 0 0 3pt; color: var(--c); break-after: avoid; }
.f { margin: 0 0 5pt; break-inside: avoid; }
.full .f:has(> table.ref) { break-inside: auto; }
.full .traps ul { column-count: 2; column-gap: 7mm; }
.full .traps li { break-inside: avoid; }
.ref tr { break-inside: avoid; }
.lbl { font-size: 8.5pt; font-weight: 700; color: #334155; break-after: avoid; break-inside: avoid; }
.math { font-size: 9.5pt; overflow: hidden; }
.katex { font-size: 1.04em; }
.katex-display { margin: 1.5pt 0; text-align: left; }
.katex-display > .katex { text-align: left; white-space: normal; }
.traps { background: #FFF7E6; border: .6pt solid #FCD9A0; border-radius: 4pt; padding: 3pt 7pt; margin-top: 3pt; break-inside: avoid; }
.tl { font-size: 7.5pt; font-weight: 700; color: #B45309; text-transform: uppercase; letter-spacing: .06em; }
.traps ul { margin: 1pt 0 0; padding-left: 11pt; font-size: 8.5pt; line-height: 1.35; }
.traps li { margin: 0 0 1pt; }
table.ref { border-collapse: collapse; font-size: 8pt; width: 100%; margin: 2pt 0 3pt; }
.ref th, .ref td { border: .5pt solid #CBD5E1; padding: 1.5pt 4pt; text-align: left; vertical-align: top; }
.ref th { background: #F1F5F9; font-weight: 600; }
.cap { font-size: 7.5pt; color: #64748B; margin: 0 0 2pt; }
`;

/** Every page's footer as a CSS margin box: the page's own fonts, like the paper PDF. */
function footerCss(siteUrl: boolean): string {
  const brand = siteUrl ? `"www.pyqvault.com  ·  " ` : "";
  return (
    `@page { @bottom-center { content: ${brand}"Page " counter(page) " of " counter(pages);` +
    ` font-family: "PV Serif", serif; font-size: 7.5pt; color: #6B7280; } }`
  );
}

/**
 * The page fits itself before it is printed (2026-10-12). A reference table
 * cannot shrink below its widest cell that will not wrap, and a display
 * formula cannot wrap at all, so in a column either one ran under the other
 * column or was cut off by the formula box. Width depends on the fonts, so it
 * is measured in the page, not guessed from the data.
 *
 * An item wider than its column is marked wide, and every section (subtopic)
 * holding one is taken out of the two-column flow and laid out in one column
 * across the page, where every table may break between rows (its header
 * repeats) and the traps list takes two columns inside its box. An item still
 * wider than the page is scaled down, never cut.
 *
 * Rejected on the way, each printed and looked at: `column-span` balanced the
 * content before a spanner into two short columns (a heading split in half)
 * and left a whole column empty across a page break; two columns INSIDE a
 * full-width section left most of a page empty when a tall table that may not
 * break in a column moved on; letting a column table break let the balancer
 * split a four-row table three ways; marking a display formula that merely
 * WRAPPED as wide added a page to 7 of the first 25 sheets measured, for lines
 * that read fine (a wrap lands after a sign, so the continuation is plain).
 *
 * It runs on `load` after the fonts are ready, which is before the printer's
 * own wait on `document.fonts.ready` resolves (callbacks run in the order they
 * were added). Plain ES5 in a string, so no build step can rewrite it.
 * Spec tests/formula-sheet-fit.test.ts runs this exact text; the real-browser
 * check over every chapter is `npm run audit:formula-sheets`.
 */
export const FIT_SCRIPT = `function fitContent(f) { return f.querySelector("table.ref") || f.querySelector(".math"); }
function fitNatural(f) { var c = fitContent(f); return c ? Math.max(c.offsetWidth, c.scrollWidth) : 0; }
function markWide(items) {
  var wide = [];
  for (var i = 0; i < items.length; i++) if (fitNatural(items[i]) > items[i].clientWidth + 1) wide.push(items[i]);
  for (var j = 0; j < wide.length; j++) wide[j].classList.add("wide");
  return wide;
}
function shrinkWide(items) {
  for (var i = 0; i < items.length; i++) {
    var f = items[i], w = fitNatural(f);
    if (w > f.clientWidth + 1) fitContent(f).style.zoom = String(Math.floor((f.clientWidth / w) * 1000) / 1000);
  }
}
function regroup(root, main) {
  var doc = root.ownerDocument || root, parent = main.parentNode, run = null;
  var blocks = [].slice.call(main.children);
  for (var i = 0; i < blocks.length; i++) {
    var b = blocks[i];
    if (b.querySelector(".f.wide")) {
      run = null;
      b.classList.add("full");
      parent.insertBefore(b, main);
    } else {
      if (!run) { run = doc.createElement("div"); run.className = "cols"; parent.insertBefore(run, main); }
      run.appendChild(b);
    }
  }
  parent.removeChild(main);
}
function fitFormulaSheet(root) {
  var main = root.querySelector("main.cols");
  if (!main) return;
  var wide = markWide(main.querySelectorAll(".f"));
  if (wide.length === 0) return;
  regroup(root, main);
  shrinkWide(wide);
}`;

/**
 * One block per subtopic: its formula boxes, reference tables and traps, in
 * the chapter's subtopic order. Shared with the ebook, so a formula prints
 * the same on the sheet and in the book.
 */
export function formulaBlocksHtml(chapter: FormulaSheetChapter): string[] {
  return chapter.slugs.map((slug, i) => {
    const note = chapter.notes[slug];
    const s = deriveSummary(note);
    const color = PALETTE[i % PALETTE.length];
    const formulas = s.formulas
      .map(
        (f) =>
          `<div class="f"><div class="lbl">${esc(f.label)}</div><div class="math">` +
          splitFormulaLines(f.latex)
            .map((l) => tex(l, true))
            .join("") +
          `</div></div>`
      )
      .join("");
    const references = s.references
      .map(
        (r) =>
          `<div class="f"><div class="lbl">${esc(r.conceptName)}</div>` +
          `<table class="ref"><thead><tr>${r.table.columns.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>` +
          `<tbody>${r.table.rows
            .map((row) => `<tr>${row.cells.map((x) => `<td>${richInline(x)}</td>`).join("")}</tr>`)
            .join("")}</tbody></table>` +
          (r.table.caption ? `<div class="cap">${richInline(r.table.caption)}</div>` : "") +
          `</div>`
      )
      .join("");
    const traps =
      s.traps.length === 0
        ? ""
        : `<div class="traps"><div class="tl">Traps</div><ul>${s.traps
            .map((t) => `<li>${richInline(t.title)}</li>`)
            .join("")}</ul></div>`;
    return `<div class="block" style="--c:${color}"><h2>${esc(note.title)}</h2>${formulas}${references}${traps}</div>`;
  });
}

export function buildFormulaSheetHtml(input: {
  chapter: FormulaSheetChapter;
  /** Font faces + KaTeX stylesheet (lib/export/pdf/assets pdfHead). */
  head: string;
  branded: boolean;
  brandingParts?: Partial<BrandingParts>;
}): string {
  const { chapter } = input;
  const brand = brandingParts(input.branded, input.brandingParts);
  const chapterName = chapter.chapter.chapterName;
  const title = `${esc(chapterName)} · Formula Sheet`;

  const blocks = formulaBlocksHtml(chapter);

  const watermark = brand.watermark
    ? `<img class="watermark" src="data:image/png;base64,${WATERMARK_PNG_BASE64}" alt="">`
    : "";
  const brandline = brand.nameLine ? `<div class="brandline">PYQ Vault</div>` : "<div></div>";

  return (
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title>` +
    `${input.head}<style>${PAGE_CSS}${FORMULA_BLOCK_CSS}${footerCss(brand.siteUrl)}</style></head><body>${watermark}` +
    `<header class="masthead">${brandline}<div><div class="eyebrow">${esc(chapter.subjectDisplay)} · ${esc(chapterName)}</div>` +
    `<h1>Formula Sheet</h1></div></header>` +
    `<main class="cols">${blocks.join("")}</main>` +
    `<script>${FIT_SCRIPT}\naddEventListener("load", function () { document.body.offsetHeight;` +
    ` document.fonts.ready.then(function () { fitFormulaSheet(document); }); });</script></body></html>`
  );
}
