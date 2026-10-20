/**
 * An ebook, as HTML pages for the PDF printer (2026-10-20). Pure: data in,
 * strings out; scripts/ebooks/build.ts does the reading and the printing.
 *
 * A chapter is: its formulas (the /notes chapter's formula boxes, tables and
 * traps, rendered by the SAME blocks as the formula-sheet download), then
 * every past question grouped by topic, oldest sitting first, then the answer
 * key, then a full solution to every question. Answers sit at the END of the
 * chapter so a student can attempt a topic without seeing them.
 *
 * NUMBERING is one pass (lib/books/print numberChapter) shared by the
 * questions, the key and the solutions, so the three cannot drift apart. A
 * question collapsed into a repeat is absent and unnumbered; the copy that is
 * kept lists every sitting it was asked in (lib/books/recurrence).
 *
 * Questions are rendered by the paper PDF's own helpers (lib/export/pdf/
 * paperHtml), so a stem, table, figure or option prints in the book exactly as
 * it does in a downloaded paper. One column on A4, as the paper is: these
 * files are read on phones.
 */
import { numberChapter } from "@/lib/books/print";
import type { BookSection, BookSet } from "@/lib/books/order";
import type { QuestionRow } from "@/lib/questions/query";
import { PAPER_CSS, answerOf, blocksHtml, optionsHtml } from "@/lib/export/pdf/paperHtml";
import {
  FIT_SCRIPT,
  FORMULA_BLOCK_CSS,
  formulaBlocksHtml,
  type FormulaSheetChapter,
} from "@/lib/export/pdf/formulaSheetHtml";

const ESC: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ESC[c]);
}

/**
 * The book's page rules on top of the paper's. The bottom margin leaves room
 * for the two footer lines drawn later (page number at assembly, the buyer's
 * licence line at download), so no page carries a printer footer of its own.
 */
const BOOK_CSS = `
@page { size: A4; margin: 15mm 16mm 22mm; }
.fs { font-size: 10pt; line-height: 1.4; }
.fs .cols { width: 178mm; }
.chap { border-bottom: 2pt solid #1D4ED8; padding-bottom: 8pt; margin-bottom: 14pt; }
.chap .cnum { font-size: 10pt; letter-spacing: .12em; text-transform: uppercase; color: #1D4ED8; font-weight: 700; margin-top: 6pt; }
.chap h1 { font-size: 22pt; margin: 2pt 0 4pt; }
.part { font-size: 14pt; color: #0F1D4A; border-bottom: 1pt solid #D6DCEA; padding-bottom: 3pt; margin: 4pt 0 10pt; break-after: avoid; }
.newpage { break-before: page; }
.subtopic .rng { font-weight: 400; color: #6B7280; font-size: 9pt; margin-left: 6pt; }
.rec { font-size: 8.5pt; color: #374151; margin-top: 4pt; font-style: italic; }
.rec b { font-style: normal; color: #1D4ED8; }
`;

const FRONT_CSS = `
@page { size: A4; margin: 0; }
.cover { height: 297mm; padding: 38mm 22mm 24mm; display: flex; flex-direction: column;
  background: linear-gradient(160deg, #0F1D4A 0%, #1D4ED8 100%); color: #fff; break-after: page; }
.cover .brand { font-size: 11pt; letter-spacing: .2em; text-transform: uppercase; font-weight: 700; opacity: .9; }
.cover h1 { font-size: 34pt; line-height: 1.15; margin: 26mm 0 6mm; color: #fff; }
.cover .sub { font-size: 15pt; line-height: 1.4; opacity: .92; max-width: 150mm; }
.cover .stats { margin-top: auto; display: flex; flex-wrap: wrap; gap: 6mm 12mm; font-size: 11pt; }
.cover .stats b { display: block; font-size: 22pt; }
.cover .url { margin-top: 12mm; font-size: 10pt; opacity: .8; }
.toc { padding: 22mm 20mm 26mm; }
.toc h2 { font-size: 20pt; color: #0F1D4A; margin: 0 0 4mm; }
.toc .how { font-size: 10pt; color: #374151; margin: 0 0 8mm; line-height: 1.5; }
.toc table { width: 100%; border-collapse: collapse; font-size: 10.5pt; }
.toc td { padding: 2.6pt 4pt; border-bottom: .5pt solid #E5E7EB; }
.toc .no { width: 9mm; color: #6B7280; }
.toc .qs { width: 26mm; text-align: right; color: #6B7280; }
.toc .pg { width: 14mm; text-align: right; font-weight: 600; color: #0F1D4A; }
`;

export type EbookChapterInput = {
  /** Chapter number in the book, from 1. */
  number: number;
  name: string;
  bookTitle: string;
  /** The /notes chapter, when the chapter has notes; null prints no formula section. */
  formulas: FormulaSheetChapter | null;
  sections: BookSection[];
  questionsById: Map<string, QuestionRow>;
  /** Repeats collapsed into another copy: not printed, not numbered. */
  excludedIds: ReadonlySet<string>;
  /** Printed question id -> every sitting it stands for (lib/books/recurrence). */
  recurrence: Map<string, string[]>;
  /** Storage path -> data URI. A missing path prints no figure. */
  images?: Map<string, string>;
  /** Font faces + KaTeX stylesheet (lib/export/pdf/assets pdfHead). Empty in tests. */
  head: string;
};

function figure(path: string | null | undefined, images: Map<string, string> | undefined): string {
  const src = path ? images?.get(path) : undefined;
  return src ? `<img class="fig" src="${src}" alt="">` : "";
}

/** "Q.5" for one question, "Q.1-12" for a run. */
function rangeText(nums: number[]): string {
  if (nums.length === 0) return "";
  const from = Math.min(...nums);
  const to = Math.max(...nums);
  return from === to ? `Q.${from}` : `Q.${from}-${to}`;
}

type Block = { name: string | null; sets: BookSet[] };

function blocksOf(sections: BookSection[]): Block[] {
  return sections.flatMap((s): Block[] => s.blocks ?? [{ name: null, sets: s.sets }]);
}

function provenance(q: QuestionRow, set: BookSet, recurrence: Map<string, string[]>): { tail: string; line: string } {
  const sittings = recurrence.get(q.id) ?? [];
  if (sittings.length > 1) {
    return {
      tail: "",
      line: `<div class="rec"><b>Asked in ${sittings.length} sittings:</b> ${sittings.map(esc).join("; ")}</div>`,
    };
  }
  const label = sittings[0] ?? set.label;
  return { tail: label ? ` <span class="src">[${esc(label)}]</span>` : "", line: "" };
}

export function buildEbookChapterHtml(input: EbookChapterInput): string {
  const { questionsById, excludedIds, images } = input;
  const numbering = numberChapter(
    input.sections,
    [...excludedIds],
    (id) => questionsById.get(id)?.options.find((o) => o.isCorrect)?.label ?? null
  );
  const { numberOf } = numbering;
  const live = (set: BookSet) => set.questionIds.filter((id) => !excludedIds.has(id) && questionsById.has(id));
  const blocks = blocksOf(input.sections).filter((b) => b.sets.some((s) => live(s).length > 0));
  const heading = (b: Block) => {
    if (!b.name) return "";
    const nums = b.sets.flatMap(live).map((id) => numberOf.get(id)!);
    return `<div class="subtopic">${esc(b.name)}<span class="rng">${rangeText(nums)}</span></div>`;
  };

  // ── Questions ──
  const questionParts: string[] = [];
  for (const block of blocks) {
    questionParts.push(heading(block));
    for (const set of block.sets) {
      const ids = live(set);
      if (ids.length === 0) continue;
      const shared = ids.length > 1 ? questionsById.get(ids[0])?.context : null;
      if (shared) {
        const nums = ids.map((id) => numberOf.get(id)!);
        questionParts.push(
          `<div class="passage"><span class="label">Common context for ${rangeText(nums)}: </span>${blocksHtml(shared)}</div>`
        );
      }
      for (const id of ids) {
        const q = questionsById.get(id)!;
        const { tail, line } = provenance(q, set, input.recurrence);
        const ctx = !shared && q.context ? `<div class="ctx"><span class="label">Context: </span>${blocksHtml(q.context)}</div>` : "";
        questionParts.push(
          `<section class="q"><div class="qn">${numberOf.get(id)}.</div><div class="qb">` +
            blocksHtml(q.text, tail) +
            figure(q.imageUrl, images) +
            ctx +
            optionsHtml(q.options, images) +
            line +
            `</div></section>`
        );
      }
    }
  }

  // ── Answer key ──
  const ordered = blocks.flatMap((b) => b.sets.flatMap(live));
  const key =
    `<div class="keygrid">` +
    ordered
      .map((id) => `<div class="kc"><span class="kn">${numberOf.get(id)}</span><span class="ka">${esc(answerOf(questionsById.get(id)!))}</span></div>`)
      .join("") +
    `</div>`;

  // ── Solutions ──
  const solutionParts: string[] = [];
  for (const block of blocks) {
    solutionParts.push(heading(block));
    for (const id of block.sets.flatMap(live)) {
      const q = questionsById.get(id)!;
      const body =
        `<div class="ans">Answer: ${esc(answerOf(q))}</div>` +
        (q.solution ? blocksHtml(q.solution) : "") +
        figure(q.solutionImageUrl, images);
      solutionParts.push(`<section class="q sol"><div class="qn">${numberOf.get(id)}.</div><div class="qb">${body}</div></section>`);
    }
  }

  const formulas = input.formulas
    ? `<section id="formulas" class="fs"><h2 class="part">Formulas and traps</h2>` +
      `<main class="cols">${formulaBlocksHtml(input.formulas).join("")}</main></section>`
    : "";
  const fit = input.formulas
    ? `<script>${FIT_SCRIPT}\naddEventListener("load", function () { document.body.offsetHeight;` +
      ` document.fonts.ready.then(function () { fitFormulaSheet(document); }); });</script>`
    : "";
  const count = numbering.total;

  return (
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(input.name)}</title>` +
    `${input.head}<style>${PAPER_CSS}${FORMULA_BLOCK_CSS}${BOOK_CSS}</style></head><body>` +
    `<header class="chap"><div class="brandline">PYQ Vault · ${esc(input.bookTitle)}</div>` +
    `<div class="cnum">Chapter ${input.number}</div><h1>${esc(input.name)}</h1>` +
    `<div class="meta">${count.toLocaleString("en-IN")} past question${count === 1 ? "" : "s"} with full solutions</div></header>` +
    formulas +
    `<section id="questions"${formulas ? ' class="newpage"' : ""}><h2 class="part">Past questions</h2>${questionParts.join("")}</section>` +
    `<section id="key" class="newpage"><h2 class="part">Answer key · ${esc(input.name)}</h2>${key}</section>` +
    `<section id="solutions"><h2 class="part" style="margin-top:16pt">Solutions</h2>${solutionParts.join("")}</section>` +
    fit +
    `</body></html>`
  );
}

export type EbookFrontInput = {
  title: string;
  subtitle: string;
  /** e.g. "2021-2026" */
  years: string;
  totalQuestions: number;
  chapters: { number: number; name: string; questions: number; page: number }[];
  head: string;
};

/** The cover and the contents page, printed after the chapters so the pages are known. */
export function buildEbookFrontHtml(input: EbookFrontInput): string {
  const rows = input.chapters
    .map(
      (c) =>
        `<tr><td class="no">${c.number}</td><td>${esc(c.name)}</td>` +
        `<td class="qs">${c.questions.toLocaleString("en-IN")} q</td><td class="pg">${c.page}</td></tr>`
    )
    .join("");
  return (
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(input.title)}</title>` +
    `${input.head}<style>${PAPER_CSS}${FRONT_CSS}</style></head><body>` +
    `<section class="cover"><div class="brand">PYQ Vault</div><h1>${esc(input.title)}</h1>` +
    `<div class="sub">${esc(input.subtitle)}</div>` +
    `<div class="stats"><div><b>${input.totalQuestions.toLocaleString("en-IN")}</b>past questions</div>` +
    `<div><b>${input.chapters.length}</b>chapters</div><div><b>${esc(input.years)}</b>every sitting</div>` +
    `<div><b>Full</b>solutions</div></div><div class="url">www.pyqvault.com</div></section>` +
    `<section class="toc"><h2>Contents</h2>` +
    `<p class="how">Each chapter opens with its formulas and common traps, then every past question grouped by topic, ` +
    `oldest sitting first. The answer key and a worked solution to every question close the chapter, so you can attempt ` +
    `a topic before you check. A question asked in more than one sitting is printed once, with every sitting listed.</p>` +
    `<table><tbody>${rows}</tbody></table></section>` +
    `</body></html>`
  );
}
