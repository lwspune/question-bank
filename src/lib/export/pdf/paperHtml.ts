/**
 * The PDF Question Paper + Answer Key, as one HTML page (2026-10-05).
 *
 * WHY a PDF: students open downloads on a phone, and Word's two-column
 * sections and equation format break in the viewers they use (Google Docs,
 * WPS, WhatsApp's preview). A PDF looks the same everywhere. Institute staff
 * keep the Word file, because they edit it; see resolveExportAccess's
 * `format`.
 *
 * PURE: text in, HTML string out. Printing it is ./printPdf.ts, and the fonts
 * + KaTeX stylesheet it links come in as `head` from ./assets.ts, so this file
 * never touches the disk and tests run without a browser.
 *
 * It renders the same content the Word builder does, through the SAME parsers
 * the site uses (parseRichSegments, parseTableBlocks, the underline bypass),
 * so the three surfaces cannot disagree about what a stem says. Math is
 * typeset by KaTeX here on the server; mhchem is loaded so `\ce{}` works.
 *
 * Layout: ONE column on A4. A two-column page on a 6-inch screen means
 * pinching; one column with room to breathe is what reads well on a phone.
 * Short options sit four to a line or two by two, as printed papers set them.
 */
import { brandingParts, type BrandingParts } from "@/lib/export/branding";
import katex from "katex";
import "katex/contrib/mhchem";
import type { OptionRow, QuestionRow } from "@/lib/questions/query";
import { parseRichSegments } from "@/components/math/parseLatex";
import { parseTableBlocks } from "@/components/math/parseTableBlocks";
import { matchUnderlineBypass } from "@/components/math/underlineBypass";
import { groupBySet, type Group } from "../groupBySet";
import { headingLabel, headingsOnChange } from "../subtopicHeadings";
import { stripPassageCountPhrase } from "../stripPassageCount";
import { formatSourceTag } from "../sourceTag";
import { WATERMARK_PNG_BASE64 } from "../watermark.generated";
import { marksTag, type PrintedLabel } from "../printedLabel";

export type PaperHtmlInput = {
  title: string;
  questions: QuestionRow[];
  /** Storage path → data URI. A path that is missing is skipped, as in Word. */
  images?: Map<string, string>;
  groupBySubtopic?: boolean;
  /**
   * A past paper downloaded whole: question id → its section ("Physics").
   * When given, the headings are the paper's sections, not subtopics.
   */
  sectionOf?: ReadonlyMap<string, string>;
  /** Head every question (or set), not only on a change; see the docx builder's note. */
  headingEveryQuestion?: boolean;
  /**
   * A board past paper (/question-papers): question id → its printed number,
   * marks and "OR". Absent, questions are numbered 1, 2, 3 as always.
   */
  printedOf?: ReadonlyMap<string, PrintedLabel>;
  includeSourceTag?: boolean;
  /** PYQ Vault watermark on every page (the footer is drawn by the printer). */
  branded?: boolean;
  /** The owner's per-piece switches (lib/export/branding); a piece left out is on. */
  brandingParts?: Partial<BrandingParts>;
  /** Font faces + KaTeX stylesheet (./assets.ts). Empty in tests. */
  head: string;
};

export type KeyHtmlInput = Omit<PaperHtmlInput, "includeSourceTag"> & {
  includeSolutions: boolean;
};

// ── Text ────────────────────────────────────────────────────────────────────

const ESC: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ESC[c]);
}

function tex(src: string, displayMode: boolean): string {
  return katex.renderToString(src, {
    displayMode,
    throwOnError: false,
    output: "html",
    strict: "ignore",
  });
}

/**
 * Prose + math + **bold** + *italic*, as inline HTML. Prose is escaped; math is KaTeX's
 * own markup. ❌ (an emoji, in 2 rows) has no glyph in the bundled fonts, so
 * it prints as ✗, which they carry.
 */
export function richHtml(text: string): string {
  return parseRichSegments(text.replace(/❌/g, "✗"))
    .map((seg) => {
      let inner: string;
      if (seg.type === "block") {
        inner = `<span class="mblock">${tex(seg.content, true)}</span>`;
      } else if (seg.type === "inline") {
        const u = matchUnderlineBypass(seg.content);
        inner = u
          ? `<u>${u.italic ? `<i>${esc(u.word)}</i>` : esc(u.word)}</u>${esc(u.trailing)}`
          : tex(seg.content, false);
      } else {
        inner = esc(seg.content).replace(/\n/g, "<br>");
      }
      if (seg.italic) inner = `<em>${inner}</em>`;
      return seg.bold ? `<strong>${inner}</strong>` : inner;
    })
    .join("");
}

/**
 * A long-form field (stem, context, solution): prose paragraphs and real
 * tables. `tail` rides on the end of the LAST prose block (the source tag),
 * or gets its own line when the field ends in a table.
 */
function blocksHtml(text: string, tail = ""): string {
  const blocks = parseTableBlocks(text);
  const lastText = blocks.reduce((acc, b, i) => (b.kind === "text" ? i : acc), -1);
  const out = blocks.map((b, i) => {
    if (b.kind === "text") return `<div class="p">${richHtml(b.text)}${i === lastText ? tail : ""}</div>`;
    const head = b.headers.map((h) => `<th>${richHtml(h)}</th>`).join("");
    const rows = b.rows.map((r) => `<tr>${r.map((c) => `<td>${richHtml(c)}</td>`).join("")}</tr>`).join("");
    return `<table class="t"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`;
  });
  if (tail && lastText === -1) out.push(`<div class="p">${tail}</div>`);
  return out.join("");
}

// ── Options ─────────────────────────────────────────────────────────────────

/** Roughly how many characters an option prints as: math is measured by what shows, not its LaTeX. */
function printedLength(text: string): number {
  return text
    .replace(/\\\(|\\\)|\\\[|\\\]|\$/g, "")
    .replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, (_, a: string, b: string) => (a.length > b.length ? a : b))
    .replace(/\\[a-zA-Z]+/g, "x")
    .replace(/[{}^_\s]/g, (c) => (c === " " ? " " : ""))
    .trim().length;
}

const ROW_MAX = 14;
const GRID_MAX = 38;

/** Four to a line, two by two, or one per line — the way printed papers set options. */
export function optionLayout(options: OptionRow[]): "row" | "grid" | "stack" {
  if (options.some((o) => o.imageUrl || /\n|\\\[|\$\$/.test(o.text))) return "stack";
  const longest = Math.max(0, ...options.map((o) => printedLength(o.text)));
  if (longest <= ROW_MAX) return "row";
  if (longest <= GRID_MAX) return "grid";
  return "stack";
}

function optionsHtml(options: OptionRow[], images: Map<string, string> | undefined): string {
  if (options.length === 0) return "";
  const items = options
    .map((o) => {
      const img = o.imageUrl && images?.get(o.imageUrl);
      return (
        `<div class="opt"><span class="ol">(${o.label.toLowerCase()})</span>` +
        `<span class="ot">${richHtml(o.text)}${img ? `<img class="ofig" src="${img}" alt="">` : ""}</span></div>`
      );
    })
    .join("");
  return `<div class="opts ${optionLayout(options)}">${items}</div>`;
}

// ── Page ────────────────────────────────────────────────────────────────────

const CSS = `
@page { size: A4; margin: 16mm 16mm 18mm; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: "PV Serif", "PV Devanagari", "PV Math", "PV Sans", serif;
  font-size: 11pt; line-height: 1.5; color: #111827; font-variant-numeric: lining-nums; }
.watermark { position: fixed; top: 50%; left: 50%; width: 125mm; transform: translate(-50%, -50%);
  z-index: -1; opacity: .9; }
.masthead { border-bottom: 1.5pt solid #1D4ED8; padding-bottom: 7pt; margin-bottom: 14pt; }
.brandline { font-size: 8pt; letter-spacing: .14em; text-transform: uppercase; color: #1D4ED8; font-weight: 600; }
h1 { font-size: 17pt; line-height: 1.25; margin: 2pt 0 3pt; color: #0F1D4A; font-weight: 700; }
.meta { font-size: 9pt; color: #4B5563; }
.subtopic { font-size: 11pt; font-weight: 600; color: #0F1D4A; border-bottom: .75pt solid #D6DCEA;
  padding-bottom: 2pt; margin: 16pt 0 9pt; break-after: avoid; }
.q { display: grid; grid-template-columns: 2.2em 1fr; align-items: baseline; margin: 0 0 13pt; break-inside: avoid; }
.q.pq { grid-template-columns: max-content 1fr; column-gap: .45em; }
.mk { font-weight: 600; color: #374151; white-space: nowrap; }
.or { text-align: center; font-weight: 700; letter-spacing: .2em; color: #4B5563; margin: -4pt 0 9pt; break-after: avoid; }
.qn { font-weight: 700; color: #0F1D4A; }
.qb { min-width: 0; }
.p + .p { margin-top: 3pt; }
.src { font-style: italic; color: #4B5563; font-size: 9pt; white-space: nowrap; }
.passage { background: #F3F6FC; border-left: 2.5pt solid #1D4ED8; padding: 7pt 10pt; margin: 2pt 0 10pt;
  break-inside: avoid; break-after: avoid; }
.label { font-weight: 700; font-style: italic; color: #0F1D4A; }
.ctx { margin-top: 4pt; }
.fig { display: block; max-width: 110mm; max-height: 85mm; margin: 6pt 0; }
.ofig { display: block; max-width: 45mm; max-height: 40mm; margin-top: 3pt; }
.opts { display: grid; column-gap: 10pt; row-gap: 3pt; margin-top: 5pt; }
.opts.row { grid-template-columns: repeat(4, 1fr); }
.opts.grid { grid-template-columns: 1fr 1fr; }
.opts.stack { grid-template-columns: 1fr; }
.opt { display: flex; gap: .35em; min-width: 0; }
.ol { flex: none; color: #374151; }
.ot { min-width: 0; }
.t { border-collapse: collapse; margin: 5pt 0; font-size: 9.5pt; }
.t th, .t td { border: .6pt solid #9CA3AF; padding: 2.5pt 6pt; text-align: left; vertical-align: top; }
.t th { background: #EEF1F7; font-weight: 600; }
.mblock { display: block; margin: 4pt 0; }
.katex { font-size: 1.08em; }
.katex-display { margin: 3pt 0; text-align: left; }
.katex-display > .katex { text-align: left; }
h2 { font-size: 12pt; color: #0F1D4A; margin: 18pt 0 8pt; break-after: avoid; }
.keygrid { display: grid; grid-template-columns: repeat(6, 1fr); border-top: .6pt solid #D6DCEA;
  border-left: .6pt solid #D6DCEA; }
.kc { display: flex; gap: .5em; padding: 3pt 6pt; border-right: .6pt solid #D6DCEA;
  border-bottom: .6pt solid #D6DCEA; break-inside: avoid; }
.kn { color: #6B7280; min-width: 1.8em; }
.ka { font-weight: 700; color: #0F1D4A; }
.ans { font-weight: 700; color: #0F1D4A; margin-bottom: 2pt; }
.sol .p { color: #1F2937; }
`;

/**
 * Every page's footer, as a CSS page margin box (Chrome 131+). Not the
 * printer's own footer template: Chromium draws that apart from the page and
 * ignores any font it declares, so it printed in Arial, which the server may
 * not even have. A margin box uses the page's fonts.
 */
function footerCss(siteUrl: boolean): string {
  const brand = siteUrl ? `"www.pyqvault.com  ·  " ` : "";
  return (
    `@page { @bottom-center { content: ${brand}"Page " counter(page) " of " counter(pages);` +
    ` font-family: "PV Serif", serif; font-size: 7.5pt; color: #6B7280; } }`
  );
}

function page(
  title: string,
  kindLabel: string,
  count: number,
  body: string,
  input: { head: string; branded?: boolean; brandingParts?: Partial<BrandingParts> }
): string {
  const brand = brandingParts(input.branded, input.brandingParts);
  const watermark = brand.watermark
    ? `<img class="watermark" src="data:image/png;base64,${WATERMARK_PNG_BASE64}" alt="">`
    : "";
  const brandline = brand.nameLine ? `<div class="brandline">PYQ Vault</div>` : "";
  return (
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title>` +
    `${input.head}<style>${CSS}${footerCss(brand.siteUrl)}</style></head><body>${watermark}` +
    `<header class="masthead">${brandline}<h1>${esc(title)}</h1>` +
    `<div class="meta">${kindLabel} · ${count} question${count === 1 ? "" : "s"}</div></header>` +
    `<main>${body}</main></body></html>`
  );
}

function groupHeadingLabel(group: Group, sectionOf: PaperHtmlInput["sectionOf"]): string {
  return headingLabel(group.kind === "single" ? group.question : group.questions[0], sectionOf);
}

/** Headings print when grouping by subtopic or when the paper has sections. */
function wantsHeadings(input: PaperHtmlInput): boolean {
  return !!input.groupBySubtopic || !!input.sectionOf;
}

function figure(path: string | null | undefined, images: Map<string, string> | undefined): string {
  const src = path ? images?.get(path) : undefined;
  return src ? `<img class="fig" src="${src}" alt="">` : "";
}

/** The number a question prints: its own on a board paper, else its position. */
function numberOf(q: QuestionRow, n: number, printedOf: PaperHtmlInput["printedOf"]): string {
  return printedOf?.get(q.id)?.number ?? String(n);
}

function questionHtml(q: QuestionRow, n: number, input: PaperHtmlInput, showContext: boolean): string {
  const tag = input.includeSourceTag ? formatSourceTag(q) : null;
  const printed = input.printedOf?.get(q.id);
  const tail =
    (tag ? ` <span class="src">${esc(tag)}</span>` : "") +
    (printed && printed.marks !== null ? ` <span class="mk">${esc(marksTag(printed.marks))}</span>` : "");
  const ctx =
    showContext && q.context
      ? `<div class="ctx"><span class="label">Context: </span>${blocksHtml(q.context)}</div>`
      : "";
  return (
    (printed?.orBefore ? `<div class="or">OR</div>` : "") +
    `<section class="q${printed ? " pq" : ""}"><div class="qn">${esc(numberOf(q, n, input.printedOf))}.</div><div class="qb">` +
    blocksHtml(q.text, tail) +
    figure(q.imageUrl, input.images) +
    ctx +
    optionsHtml(q.options, input.images) +
    `</div></section>`
  );
}

export function buildPaperHtml(input: PaperHtmlInput): string {
  const groups = groupBySet(input.questions);
  const labels = groups.map((g) => groupHeadingLabel(g, input.sectionOf));
  const headings = wantsHeadings(input)
    ? input.headingEveryQuestion ? labels : headingsOnChange(labels)
    : [];
  const parts: string[] = [];
  let n = 1;
  groups.forEach((group, gi) => {
    if (headings[gi]) parts.push(`<div class="subtopic">${esc(headings[gi]!)}</div>`);
    if (group.kind === "single" || group.questions.length === 1) {
      const q = group.kind === "single" ? group.question : group.questions[0];
      parts.push(questionHtml(q, n++, input, true));
      return;
    }
    const first = numberOf(group.questions[0], n, input.printedOf);
    const last = numberOf(group.questions[group.questions.length - 1], n + group.questions.length - 1, input.printedOf);
    if (group.passage) {
      parts.push(
        `<div class="passage"><span class="label">Common context for questions ${esc(first)}-${esc(last)}: </span>` +
          `${blocksHtml(stripPassageCountPhrase(group.passage))}</div>`
      );
    }
    for (const q of group.questions) parts.push(questionHtml(q, n++, input, false));
  });
  return page(input.title, "Question Paper", input.questions.length, parts.join(""), input);
}

// ── Answer key ──────────────────────────────────────────────────────────────

function answerOf(q: QuestionRow): string {
  if (q.cancelledNote) return "Cancelled";
  if (q.questionFormat === "subjective") return "Written";
  if (q.questionFormat === "numeric") return q.numericAnswer != null ? String(q.numericAnswer) : "Pending";
  const correct = q.options.find((o) => o.isCorrect);
  return `(${correct?.label.toLowerCase() ?? "?"})`;
}

export function buildKeyHtml(input: KeyHtmlInput): string {
  const qs = input.questions;
  const grid =
    `<div class="keygrid">` +
    qs.map((q, i) => `<div class="kc"><span class="kn">${esc(numberOf(q, i + 1, input.printedOf))}</span><span class="ka">${esc(answerOf(q))}</span></div>`).join("") +
    `</div>`;

  // Model answers and cancellation notices print whatever the setting:
  // without them the grid says "Written" or "Cancelled" and nothing else.
  const detailed = qs
    .map((q, i) => ({ q, n: i + 1 }))
    .filter(({ q }) => input.includeSolutions || q.questionFormat === "subjective" || !!q.cancelledNote);
  const headings = wantsHeadings(input)
    ? headingsOnChange(detailed.map(({ q }) => headingLabel(q, input.sectionOf)))
    : [];
  const details = detailed.map(({ q, n }, i) => {
    const heading = headings[i] ? `<div class="subtopic">${esc(headings[i]!)}</div>` : "";
    let body: string;
    if (q.cancelledNote) {
      body = `<div class="ans">Cancelled</div><div class="p">${richHtml(q.cancelledNote)}</div>`;
    } else if (q.questionFormat === "subjective") {
      body =
        `<div class="ans">Model answer</div>` +
        (q.solution ? blocksHtml(q.solution) : `<div class="p"><em>Model answer pending.</em></div>`);
    } else {
      body = `<div class="ans">Answer: ${esc(answerOf(q))}</div>` + (q.solution ? blocksHtml(q.solution) : "");
    }
    if (input.includeSolutions) body += figure(q.solutionImageUrl, input.images);
    const pq = input.printedOf?.has(q.id) ? " pq" : "";
    return `${heading}<section class="q sol${pq}"><div class="qn">${esc(numberOf(q, n, input.printedOf))}.</div><div class="qb">${body}</div></section>`;
  });

  const detailTitle = input.includeSolutions ? "Solutions" : "Model answers and notes";
  const body = grid + (details.length ? `<h2>${detailTitle}</h2>${details.join("")}` : "");
  return page(input.title, "Answer Key", qs.length, body, input);
}
