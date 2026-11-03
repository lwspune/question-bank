/**
 * A /board chapter's quick-revision sheet as one HTML document for the PDF
 * printer (2026-11-03): the same sections as the reader's Revision tab, in two
 * columns on A4.
 *
 * Shares the formula sheet's page, maths rendering, branding and fit step
 * (formulaSheetHtml.ts), so the two downloads look like one family: a formula
 * wider than its column is moved to full width by the same FIT_SCRIPT. A
 * section with nothing in it is left out. The sheet never sells.
 *
 * Spec: tests/revision-sheet-html.test.ts; every registered sheet prints clean
 * by tests/board-revision-registry.test.ts.
 */
import type { RevisionSheet } from "@/lib/board/revision/types";
import { brandingParts, type BrandingParts } from "@/lib/export/branding";
import { WATERMARK_PNG_BASE64 } from "../watermark.generated";
import {
  esc,
  FIT_SCRIPT,
  footerCss,
  FORMULA_BLOCK_CSS,
  PAGE_CSS,
  richInline,
  splitFormulaLines,
  tex,
} from "./formulaSheetHtml";

const REVISION_CSS = `
.source { font-size: 8pt; color: #64748B; margin: -5pt 0 8pt; }
.block ul, .block ol { margin: 0; padding-left: 11pt; }
.block li { margin: 0 0 3pt; break-inside: avoid; }
.kp b.term { color: #0F1D4A; }
.yrs { font-size: 8pt; color: #475569; }
.mk { font-size: 7.5pt; font-weight: 700; color: #1D4ED8; }
.steps { padding-left: 13pt; font-size: 9pt; }
.traps li b { color: #92400E; }
`;

export function revisionSheetFilename(subjectName: string, chapterName: string): string {
  const part = (s: string) =>
    s
      .replace(/&/g, " ")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "_");
  return `Revision_${part(subjectName)}_${part(chapterName)}.pdf`;
}

function block(title: string, color: string, body: string): string {
  return `<div class="block" style="--c:${color}"><h2>${esc(title)}</h2>${body}</div>`;
}

export function buildRevisionSheetHtml(input: {
  sheet: RevisionSheet;
  /** Font faces + KaTeX stylesheet (lib/export/pdf/assets pdfHead). */
  head: string;
  branded: boolean;
  brandingParts?: Partial<BrandingParts>;
}): string {
  const { sheet } = input;
  const brand = brandingParts(input.branded, input.brandingParts);
  const blocks: string[] = [];

  // What the board has set most often comes first: it is what to revise first.
  blocks.push(
    block(
      "Most asked in board papers",
      "#BE123C",
      `<ul>${sheet.mostAsked
        .map(
          (m) =>
            `<li>${richInline(m.topic)}` +
            (m.marks ? ` <span class="mk">${m.marks} mark${m.marks === 1 ? "" : "s"}</span>` : "") +
            ` <span class="yrs">(${m.years.join(", ")})</span></li>`
        )
        .join("")}</ul>`
    )
  );

  blocks.push(
    block(
      "Must-know points",
      "#1D4ED8",
      `<ul class="kp">${sheet.keyPoints
        .map((k) => `<li><b class="term">${richInline(k.term)}:</b> ${richInline(k.text)}</li>`)
        .join("")}</ul>`
    )
  );

  if (sheet.formulas.length > 0)
    blocks.push(
      block(
        "Formulas",
        "#0E7490",
        sheet.formulas
          .map(
            (f) =>
              `<div class="f"><div class="lbl">${richInline(f.label)}</div><div class="math">` +
              splitFormulaLines(f.latex)
                .map((l) => tex(l, true))
                .join("") +
              `</div></div>`
          )
          .join("")
      )
    );

  if (sheet.derivations.length > 0)
    blocks.push(
      block(
        "Derivations",
        "#7C3AED",
        sheet.derivations
          .map(
            (d) =>
              `<div class="f"><div class="lbl">${richInline(d.title)}</div>` +
              `<ol class="steps">${d.steps.map((s) => `<li>${richInline(s)}</li>`).join("")}</ol></div>`
          )
          .join("")
      )
    );

  if (sheet.diagrams.length > 0)
    blocks.push(
      block(
        "Diagrams",
        "#047857",
        `<ul>${sheet.diagrams
          .map((d) => `<li><b>${richInline(d.title)}:</b> ${d.labels.map(richInline).join(" · ")}</li>`)
          .join("")}</ul>`
      )
    );

  blocks.push(
    `<div class="traps"><div class="tl">Mistakes that cost marks</div><ul>${sheet.mistakes
      .map((m) => `<li><b>${richInline(m.title)}.</b> ${richInline(m.body)}</li>`)
      .join("")}</ul></div>`
  );

  const title = `${esc(sheet.chapterName)} · Quick Revision`;
  const watermark = brand.watermark
    ? `<img class="watermark" src="data:image/png;base64,${WATERMARK_PNG_BASE64}" alt="">`
    : "";
  const brandline = brand.nameLine ? `<div class="brandline">PYQ Vault</div>` : "<div></div>";

  return (
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title>` +
    `${input.head}<style>${PAGE_CSS}${FORMULA_BLOCK_CSS}${REVISION_CSS}${footerCss(brand.siteUrl)}</style></head><body>${watermark}` +
    `<header class="masthead">${brandline}<div><div class="eyebrow">${esc(sheet.subjectName)} · ${esc(sheet.chapterName)}</div>` +
    `<h1>Quick Revision</h1></div></header>` +
    `<p class="source">Checked against ${esc(sheet.source)}</p>` +
    `<main class="cols">${blocks.join("")}</main>` +
    `<script>${FIT_SCRIPT}\naddEventListener("load", function () { document.body.offsetHeight;` +
    ` document.fonts.ready.then(function () { fitFormulaSheet(document); }); });</script></body></html>`
  );
}
