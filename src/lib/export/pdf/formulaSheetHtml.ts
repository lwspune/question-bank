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

const CSS = `
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
.cols { column-count: 2; column-gap: 7mm; }
.block { border-left: 2.5pt solid var(--c); padding: 0 0 0 7pt; margin: 0 0 9pt; }
.block h2 { font-size: 10.5pt; margin: 0 0 3pt; color: var(--c); break-after: avoid; }
.f { margin: 0 0 5pt; break-inside: avoid; }
.lbl { font-size: 8.5pt; font-weight: 700; color: #334155; }
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

  const blocks = chapter.slugs.map((slug, i) => {
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

  const watermark = brand.watermark
    ? `<img class="watermark" src="data:image/png;base64,${WATERMARK_PNG_BASE64}" alt="">`
    : "";
  const brandline = brand.nameLine ? `<div class="brandline">PYQ Vault</div>` : "<div></div>";

  return (
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title>` +
    `${input.head}<style>${CSS}${footerCss(brand.siteUrl)}</style></head><body>${watermark}` +
    `<header class="masthead">${brandline}<div><div class="eyebrow">${esc(chapter.subjectDisplay)} · ${esc(chapterName)}</div>` +
    `<h1>Formula Sheet</h1></div></header>` +
    `<main class="cols">${blocks.join("")}</main></body></html>`
  );
}
