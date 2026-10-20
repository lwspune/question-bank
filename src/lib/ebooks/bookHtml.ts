/**
 * Ebooks as HTML pages for the PDF printer (2026-10-20). Pure: data in,
 * strings out; scripts/ebooks/build.ts reads, prints and joins.
 *
 * Three kinds of chapter (lib/ebooks/catalog), one look (lib/ebooks/theme):
 *
 * - PYQ: an opener page (number, class, topics with counts), every past
 *   question by topic, oldest sitting first, the answer key, a full solution
 *   to each. NUMBERING is one pass (lib/books/print numberChapter) shared by
 *   the questions, the key and the solutions, so the three cannot drift. A
 *   question collapsed into a repeat is absent and unnumbered; the copy kept
 *   lists every sitting it was asked in (lib/books/recurrence).
 * - Formula: each subtopic as a card: formulas with symbol legends, reference
 *   tables, traps with their explanations.
 * - Notes: each concept taught in full; a "Try it" problem whose answer waits
 *   at the end of the chapter, so a student can attempt it first.
 *
 * Question text is rendered by the paper PDF's own helpers (lib/export/pdf/
 * paperHtml), so a stem, table, figure or option prints as it does in a
 * downloaded paper. One column on A4: these files are read on phones.
 */
import katex from "katex";
import "katex/contrib/mhchem";
import { numberChapter } from "@/lib/books/print";
import type { BookSection, BookSet } from "@/lib/books/order";
import type { QuestionRow } from "@/lib/questions/query";
import type { NotesChapterRegistration } from "@/lib/notes/chapters";
import type { AuthoredExample, ConceptUnit, ReferenceTable, TrapCallout, VisualizationSlug } from "@/app/notes/_types";
import { PAPER_CSS, answerOf, blocksHtml, optionsHtml, richHtml } from "@/lib/export/pdf/paperHtml";
import { splitFormulaLines } from "@/lib/export/pdf/formulaSheetHtml";
import type { EbookKind } from "./catalog";
import { ACCENT, KIND_LABEL, THEME_CSS } from "./theme";

const ESC: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ESC[c]);
}

function tex(src: string): string {
  return katex.renderToString(src, { displayMode: true, throwOnError: false, output: "html", strict: "ignore" });
}

/** A chapter part's page: margins leave room for the two footer lines drawn later. */
const PAGE_CSS = `@page { size: A4; margin: 15mm 16mm 22mm; }`;

function doc(title: string, kind: EbookKind, head: string, body: string, extra = ""): string {
  return (
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title>${head}` +
    `<style>${PAPER_CSS}${PAGE_CSS}${THEME_CSS}</style></head><body style="--acc:${ACCENT[kind]}">${body}${extra}</body></html>`
  );
}

function eyebrow(number: number, classLabel: string | null): string {
  return `Chapter ${number}${classLabel ? ` · ${esc(classLabel)}` : ""}`;
}

function chapterHead(number: number, name: string, classLabel: string | null, bookLine: string): string {
  return (
    `<header class="chead"><div class="cn">${String(number).padStart(2, "0")}</div><div>` +
    `<div class="eyebrow">${eyebrow(number, classLabel)} · ${esc(bookLine)}</div><h1>${esc(name)}</h1></div></header>`
  );
}

function figure(path: string | null | undefined, images: Map<string, string> | undefined): string {
  const src = path ? images?.get(path) : undefined;
  return src ? `<img class="fig" src="${src}" alt="">` : "";
}

// ── Shared notes pieces ─────────────────────────────────────────────────────

function formulaHtml(f: { label: string; latex: string; symbols?: { symbol: string; meaning: string }[] }): string {
  const legend = f.symbols?.length
    ? `<div class="sym">${f.symbols.map((s) => `<b>${richHtml(`\\(${s.symbol}\\)`)}</b> ${richHtml(s.meaning)}`).join(" · ")}</div>`
    : "";
  return `<div class="f"><div class="lbl">${esc(f.label)}</div><div class="math">${splitFormulaLines(f.latex).map(tex).join("")}</div>${legend}</div>`;
}

function tableHtml(name: string, t: ReferenceTable): string {
  const head = t.columns.map((c) => `<th>${esc(c)}</th>`).join("");
  const rows = t.rows
    .map(
      (r) =>
        `<tr>${r.cells.map((c) => `<td>${richHtml(c)}</td>`).join("")}</tr>` +
        (r.noteAmber ? `<tr class="note"><td colspan="${t.columns.length}">${richHtml(r.noteAmber)}</td></tr>` : "")
    )
    .join("");
  return (
    `<div class="reft"><div class="lbl">${esc(name)}</div><table class="ref"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>` +
    (t.caption ? `<div class="cap">${richHtml(t.caption)}</div>` : "") +
    `</div>`
  );
}

function trapsHtml(traps: TrapCallout[]): string {
  if (traps.length === 0) return "";
  return `<div class="trap"><div class="tl">Watch out</div>${traps.map((t) => `<p><b>${richHtml(t.title)}</b> ${richHtml(t.body)}</p>`).join("")}</div>`;
}

/** A definition: prose, then `- ` bullet lines as a list, as the notes page renders it. */
function definitionHtml(text: string): string {
  const lines = text.split(/\r?\n/);
  const bullets = lines.filter((l) => l.trim().startsWith("- ")).map((l) => l.trim().slice(2));
  const prose = lines.filter((l) => !l.trim().startsWith("- ") && l.trim()).join(" ");
  return (
    `<div class="defn">${prose ? richHtml(prose) : ""}` +
    (bullets.length ? `<ul>${bullets.map((b) => `<li>${richHtml(b)}</li>`).join("")}</ul>` : "") +
    `</div>`
  );
}

function stepsHtml(ex: AuthoredExample, withAnswer: boolean): string {
  return (
    `<div>${richHtml(ex.prompt)}</div>` +
    (withAnswer
      ? `<ol>${ex.steps.map((s) => `<li>${richHtml(s)}</li>`).join("")}</ol><div class="ans">${richHtml(ex.answer)}</div>`
      : "")
  );
}

// ── Formula chapter ─────────────────────────────────────────────────────────

export type NotesChapterInput = {
  number: number;
  classLabel: string | null;
  bookTitle: string;
  chapter: Pick<NotesChapterRegistration, "chapter" | "notes" | "slugs">;
  head: string;
  /**
   * Draws a concept's diagram as markup (the build passes lib/ebooks/diagrams
   * renderDiagramMarkup; the page's head must then carry the diagram styles).
   * Absent, no diagram is drawn: kept out of this module so it stays pure.
   */
  renderDiagram?: (slug: VisualizationSlug) => string;
};

export function buildFormulaChapterHtml(input: NotesChapterInput): string {
  const { chapter } = input;
  const cards = chapter.slugs.map((slug) => {
    const note = chapter.notes[slug];
    const formulas: string[] = [];
    const tables: string[] = [];
    const traps: TrapCallout[] = [];
    for (const c of note.concepts) {
      if (c.kind === "formula" && c.formula) formulas.push(formulaHtml(c.formula));
      if (c.kind === "reference") tables.push(tableHtml(c.name, c.table));
      traps.push(...(c.traps ?? []));
    }
    if (formulas.length + tables.length + traps.length === 0) return "";
    return `<section class="card fcard"><h2>${esc(note.title)}</h2>${formulas.join("")}${tables.join("")}${trapsHtml(traps)}</section>`;
  });
  return doc(
    chapter.chapter.chapterName,
    "formula",
    input.head,
    chapterHead(input.number, chapter.chapter.chapterName, input.classLabel, "Formula Book") + cards.join("")
  );
}

// ── Notes chapter ───────────────────────────────────────────────────────────

function conceptHtml(c: ConceptUnit, tryNumber: number | null, renderDiagram?: (slug: VisualizationSlug) => string): string {
  const core =
    c.kind === "formula"
      ? (c.formula ? formulaHtml(c.formula) : "") +
        `<div class="box ex"><div class="tl">Worked example</div>${stepsHtml(c.authoredExample, true)}</div>`
      : tableHtml(c.name, c.table);
  const tryIt =
    tryNumber !== null && c.selfCheckExample
      ? `<div class="box try"><div class="tl">Try it ${tryNumber}</div>${stepsHtml(c.selfCheckExample, false)}` +
        `<div class="cap">Answer at the end of the chapter.</div></div>`
      : "";
  return (
    `<section class="card ncard"><h3>${esc(c.name)}</h3><p class="intu">${richHtml(c.intuition)}</p>` +
    // The diagram sits after the idea, where the notes page draws it.
    (c.visualizationSlug && renderDiagram ? `<figure class="viz">${renderDiagram(c.visualizationSlug)}</figure>` : "") +
    definitionHtml(c.definition) +
    core +
    tryIt +
    trapsHtml(c.traps ?? []) +
    `</section>`
  );
}

export function buildNotesChapterHtml(input: NotesChapterInput): string {
  const { chapter } = input;
  const answers: string[] = [];
  let n = 0;
  const body = chapter.slugs.map((slug) => {
    const note = chapter.notes[slug];
    const concepts = note.concepts.map((c) => {
      const num = c.selfCheckExample ? ++n : null;
      if (num !== null && c.selfCheckExample) {
        answers.push(
          `<section class="q sol"><div class="qn">${num}</div><div class="qb">${stepsHtml(c.selfCheckExample, true)}</div></section>`
        );
      }
      return conceptHtml(c, num, input.renderDiagram);
    });
    return `<h2 class="subh">${esc(note.title)}</h2>${concepts.join("")}`;
  });
  const answerPart = answers.length
    ? `<section id="answers" class="newpage"><h2 class="part">Answers to Try it · ${esc(chapter.chapter.chapterName)}</h2>${answers.join("")}</section>`
    : `<section id="answers"></section>`;
  return doc(
    chapter.chapter.chapterName,
    "notes",
    input.head,
    chapterHead(input.number, chapter.chapter.chapterName, input.classLabel, "Notes Book") +
      `<div id="concepts">${body.join("")}</div>` +
      answerPart
  );
}

// ── PYQ chapter ─────────────────────────────────────────────────────────────

export type PyqChapterInput = {
  number: number;
  name: string;
  classLabel: string | null;
  bookTitle: string;
  sections: BookSection[];
  questionsById: Map<string, QuestionRow>;
  /** Repeats collapsed into another copy: not printed, not numbered. */
  excludedIds: ReadonlySet<string>;
  /** Printed question id -> every sitting it stands for (lib/books/recurrence). */
  recurrence: Map<string, string[]>;
  /** Storage path -> data URI. A missing path prints no figure. */
  images?: Map<string, string>;
  head: string;
};

type Block = { name: string | null; sets: BookSet[] };

function blocksOf(sections: BookSection[]): Block[] {
  return sections.flatMap((s): Block[] => s.blocks ?? [{ name: null, sets: s.sets }]);
}

/** "Q.5" for one question, "Q.1-12" for a run. */
function rangeText(nums: number[]): string {
  if (nums.length === 0) return "";
  const from = Math.min(...nums);
  const to = Math.max(...nums);
  return from === to ? `Q.${from}` : `Q.${from}-${to}`;
}

function provenance(q: QuestionRow, set: BookSet, recurrence: Map<string, string[]>): { tail: string; line: string } {
  const sittings = recurrence.get(q.id) ?? [];
  if (sittings.length > 1) {
    return { tail: "", line: `<div class="rec"><b>Asked in ${sittings.length} sittings:</b> ${sittings.map(esc).join("; ")}</div>` };
  }
  const label = sittings[0] ?? set.label;
  return { tail: label ? ` <span class="src">${esc(label)}</span>` : "", line: "" };
}

export function buildPyqChapterHtml(input: PyqChapterInput): string {
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

  const questions: string[] = [];
  for (const block of blocks) {
    questions.push(heading(block));
    for (const set of block.sets) {
      const ids = live(set);
      if (ids.length === 0) continue;
      const shared = ids.length > 1 ? questionsById.get(ids[0])?.context : null;
      if (shared) {
        questions.push(
          `<div class="passage"><span class="label">Common context for ${rangeText(ids.map((id) => numberOf.get(id)!))}: </span>${blocksHtml(shared)}</div>`
        );
      }
      for (const id of ids) {
        const q = questionsById.get(id)!;
        const { tail, line } = provenance(q, set, input.recurrence);
        const ctx = !shared && q.context ? `<div class="ctx"><span class="label">Context: </span>${blocksHtml(q.context)}</div>` : "";
        questions.push(
          `<section class="q"><div class="qn">${numberOf.get(id)}</div><div class="qb">` +
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

  const ordered = blocks.flatMap((b) => b.sets.flatMap(live));
  const key =
    `<div class="keygrid">` +
    ordered
      .map((id) => `<div class="kc"><span class="kn">${numberOf.get(id)}</span><span class="ka">${esc(answerOf(questionsById.get(id)!))}</span></div>`)
      .join("") +
    `</div>`;

  const solutions: string[] = [];
  for (const block of blocks) {
    solutions.push(heading(block));
    for (const id of block.sets.flatMap(live)) {
      const q = questionsById.get(id)!;
      solutions.push(
        `<section class="q sol"><div class="qn">${numberOf.get(id)}</div><div class="qb">` +
          `<div class="chip">Answer ${esc(answerOf(q))}</div>` +
          (q.solution ? blocksHtml(q.solution) : "") +
          figure(q.solutionImageUrl, images) +
          `</div></section>`
      );
    }
  }

  const count = numbering.total;
  const topics = blocks
    .filter((b) => b.name)
    .map((b) => `<div class="topic"><span>${esc(b.name!)}</span><span class="n">${b.sets.flatMap(live).length} q</span></div>`)
    .join("");
  const opener =
    `<section class="opener"><div class="eyebrow">${eyebrow(input.number, input.classLabel)}</div>` +
    `<div class="num">${String(input.number).padStart(2, "0")}</div><h1>${esc(input.name)}</h1>` +
    `<div class="meta">${count.toLocaleString("en-IN")} past question${count === 1 ? "" : "s"} · full solutions at the end of the chapter</div>` +
    (topics ? `<div class="card topics"><div class="eyebrow" style="margin-bottom:4pt">Topics in this chapter</div>${topics}</div>` : "") +
    `<div class="how">Questions run oldest sitting first within each topic. Try each before you turn to the solutions.</div></section>`;

  return doc(
    input.name,
    "pyq",
    input.head,
    opener +
      `<section id="questions"><h2 class="part">Past questions · ${esc(input.name)}</h2>${questions.join("")}</section>` +
      `<section id="key" class="newpage"><h2 class="part">Answer key · ${esc(input.name)}</h2>${key}</section>` +
      `<section id="solutions"><h2 class="part" style="margin-top:16pt">Solutions · ${esc(input.name)}</h2>${solutions.join("")}</section>`
  );
}

// ── Cover and contents ──────────────────────────────────────────────────────

const FRONT_CSS = `
@page { size: A4; margin: 0; }
.cover { height: 297mm; padding: 30mm 22mm 22mm; display: flex; flex-direction: column; break-after: page; overflow: hidden; }
.cover .brand { display: flex; align-items: center; gap: 8pt; font-weight: 700; letter-spacing: .2em; font-size: 9pt; }
.cover .dot { width: 9pt; height: 9pt; border-radius: 50%; background: var(--acc); }
.cover .kind { margin-top: 30mm; padding: 4pt 11pt; border-radius: 99pt; background: color-mix(in srgb, var(--acc) 12%, white);
  color: var(--acc); font-weight: 700; font-size: 9pt; letter-spacing: .14em; text-transform: uppercase; width: max-content; }
.cover h1 { font-size: 40pt; line-height: 1.08; margin: 10pt 0 8pt; }
.cover .sub { font-size: 14pt; color: var(--muted); max-width: 150mm; line-height: 1.4; }
.cover .rule { width: 48pt; height: 3pt; border-radius: 2pt; background: var(--acc); margin-top: 16pt; }
.cover .preview { margin-top: 14mm; font-size: 9pt; display: flex; flex-direction: column; align-items: flex-start; }
.cover .preview .card { transform: rotate(-1.2deg); max-width: 160mm; overflow: hidden; }
.cover .preview .card + .card { transform: rotate(1.5deg); margin: -4pt 0 0 60mm; max-width: 90mm; }
.cover .preview .katex { font-size: .95em; }
.cover .stats { margin-top: auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 8pt; }
.cover .stat b { display: block; font-size: 20pt; color: var(--acc); line-height: 1.1; }
.cover .stat span { font-size: 8.5pt; color: var(--muted); }
.cover .url { margin-top: 10pt; font-size: 9pt; color: var(--muted); }
.toc { padding: 22mm 20mm 26mm; }
.toc h2 { font-size: 22pt; margin: 0 0 4mm; }
.toc .how { font-size: 10pt; color: var(--muted); margin: 0 0 8mm; line-height: 1.5; }
.toc table { width: 100%; border-collapse: collapse; font-size: 10.5pt; }
.toc td { padding: 3pt 4pt; border-bottom: .5pt solid var(--edge); }
.toc .no { width: 10mm; color: var(--acc); font-weight: 700; }
.toc .qs { width: 28mm; text-align: right; color: var(--muted); }
.toc .pg { width: 14mm; text-align: right; font-weight: 700; }
`;

const HOW: Record<EbookKind, string> = {
  formula:
    "Each chapter gathers its formulas topic by topic, with what every symbol means, the reference tables, and the traps that cost marks, each explained.",
  notes:
    "Each chapter teaches its topics from the start: the idea, the definition, the formula and a worked example, then the traps. Try it problems have their answers at the end of the chapter.",
  pyq:
    "Each chapter opens with its topics, then every past question grouped by topic, oldest sitting first. The answer key and a worked solution to every question close the chapter, so you can attempt a topic before you check. A question asked in more than one sitting is printed once, with every sitting listed.",
};

export type EbookFrontInput = {
  kind: EbookKind;
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  /** A snippet of what is inside, as cards (built by the caller from real content). */
  preview: string;
  chapters: { number: number; name: string; detail: string; page: number }[];
  head: string;
};

/** The cover and the contents page, printed after the chapters so the pages are known. */
export function buildEbookFrontHtml(input: EbookFrontInput): string {
  const rows = input.chapters
    .map(
      (c) =>
        `<tr><td class="no">${c.number}</td><td>${esc(c.name)}</td><td class="qs">${esc(c.detail)}</td><td class="pg">${c.page}</td></tr>`
    )
    .join("");
  const stats = input.stats.map((s) => `<div class="stat card"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("");
  return (
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(input.title)}</title>${input.head}` +
    `<style>${PAPER_CSS}${THEME_CSS}${FRONT_CSS}</style></head><body style="--acc:${ACCENT[input.kind]}">` +
    `<section class="cover"><div class="brand"><span class="dot"></span>PYQ VAULT</div>` +
    `<div class="kind">${KIND_LABEL[input.kind]}</div><h1>${esc(input.title)}</h1><div class="sub">${esc(input.subtitle)}</div>` +
    `<div class="rule"></div><div class="preview">${input.preview}</div>` +
    `<div class="stats">${stats}</div><div class="url">www.pyqvault.com</div></section>` +
    `<section class="toc"><div class="eyebrow">${KIND_LABEL[input.kind]} · ${esc(input.title)}</div><h2>Contents</h2>` +
    `<p class="how">${HOW[input.kind]}</p><table><tbody>${rows}</tbody></table></section>` +
    `</body></html>`
  );
}

// ── Cover previews, from the book's own first chapters ─────────────────────

/** A formula card for the Formula Book's cover. */
export function formulaPreview(chapter: Pick<NotesChapterRegistration, "notes" | "slugs">): string {
  for (const slug of chapter.slugs) {
    const fs = chapter.notes[slug].concepts.flatMap((c) => (c.kind === "formula" && c.formula ? [c.formula] : []));
    if (fs.length >= 2) return `<div class="card">${fs.slice(0, 2).map(formulaHtml).join("")}</div>`;
  }
  return "";
}

/** A concept card (name + idea) for the Notes Book's cover. */
export function notesPreview(chapter: Pick<NotesChapterRegistration, "notes" | "slugs">): string {
  const c = chapter.notes[chapter.slugs[0]]?.concepts[0];
  return c ? `<div class="card"><h3 style="margin:0 0 4pt;font-size:12pt">${esc(c.name)}</h3><p class="intu">${richHtml(c.intuition)}</p></div>` : "";
}

/** A past question and its answer chip for the PYQ Book's cover. */
export function pyqPreview(q: QuestionRow, sitting: string): string {
  return (
    `<div class="card"><div style="display:flex;gap:6pt;align-items:center"><span class="qn" style="display:inline-flex">Q</span>` +
    `<span class="src" style="margin:0">${esc(sitting)}</span></div><div style="margin-top:5pt">${blocksHtml(q.text)}</div>` +
    `${optionsHtml(q.options, undefined)}</div>` +
    `<div class="card"><div class="chip">Answer ${esc(answerOf(q))}</div><div style="color:var(--muted)">Full solution at the end of the chapter</div></div>`
  );
}
