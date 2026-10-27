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
 * - Solved Papers (board): each "chapter" is one past paper, printed as it was
 *   set by the paper download's own printer (its numbers, marks, sections, the
 *   OR, a case study's passage once), then solved on a fresh page under the
 *   same numbers.
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
import { PAPER_CSS, answerOf, blocksHtml, keyDetailsHtml, optionsHtml, paperBodyHtml, richHtml } from "@/lib/export/pdf/paperHtml";
import type { PrintedLabel } from "@/lib/export/printedLabel";
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

// ── Solved Papers chapter (one board paper) ─────────────────────────────────

export type SolvedPaperInput = {
  /** The paper's place in the book. */
  number: number;
  bookTitle: string;
  paper: { label: string; paperCode: string | null; totalMarks: number; durationMinutes: number | null };
  /** Printed order, each carrying the paper's own grouping as its setId (lib/questionPapers/exportPlan). */
  questions: QuestionRow[];
  sectionOf: ReadonlyMap<string, string>;
  printedOf: ReadonlyMap<string, PrintedLabel>;
  /** Storage path -> data URI, question, option and solution pictures alike. */
  images?: Map<string, string>;
  head: string;
};

/** "3 hours", "2 hours 30 minutes", "90 minutes". */
function durationText(minutes: number): string {
  if (minutes < 120 && minutes % 60 !== 0) return `${minutes} minutes`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h} hour${h === 1 ? "" : "s"}${m ? ` ${m} minutes` : ""}`;
}

export function buildSolvedPaperHtml(input: SolvedPaperInput): string {
  const { paper } = input;
  const common = {
    title: paper.label,
    questions: input.questions,
    images: input.images,
    sectionOf: input.sectionOf,
    printedOf: input.printedOf,
    head: "",
  };
  const meta = [paper.paperCode, `${paper.totalMarks} marks`, paper.durationMinutes ? durationText(paper.durationMinutes) : null]
    .filter(Boolean)
    .join(" · ");
  const header =
    `<header class="chead"><div class="cn">${String(input.number).padStart(2, "0")}</div><div>` +
    `<div class="eyebrow">Paper ${input.number} · ${esc(input.bookTitle)}</div><h1>${esc(paper.label)}</h1>` +
    `<div class="pmeta">${esc(meta)}</div></div></header>`;
  return doc(
    paper.label,
    "papers",
    input.head,
    header +
      `<section id="paper" class="bp">${paperBodyHtml(common)}</section>` +
      `<section id="solutions" class="newpage bp"><h2 class="part">Solutions · ${esc(paper.label)}</h2>` +
      `${keyDetailsHtml({ ...common, includeSolutions: true })}</section>`
  );
}

// ── Repeated PYQs chapter (board) ───────────────────────────────────────────

export type RepeatsChapterInput = {
  number: number;
  name: string;
  bookTitle: string;
  /** Print order; a case study's parts share a setId, so its passage prints once. */
  questions: QuestionRow[];
  /** Question id -> its plan line ("Asked 3 times: 2022, 2024, 2026"). */
  noteOf: ReadonlyMap<string, string>;
  /** Question id -> its number in the chapter ("4", "4 (a)"). */
  printedOf: ReadonlyMap<string, PrintedLabel>;
  counts: { repeats: number; types: number };
  images?: Map<string, string>;
  head: string;
};

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function buildRepeatsChapterHtml(input: RepeatsChapterInput): string {
  const common = { title: input.name, questions: input.questions, images: input.images, printedOf: input.printedOf, head: "" };
  const meta = [
    input.counts.repeats ? `${input.counts.repeats} asked again` : null,
    input.counts.types ? plural(input.counts.types, "recurring type", "recurring types") : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const header =
    `<header class="chead"><div class="cn">${String(input.number).padStart(2, "0")}</div><div>` +
    `<div class="eyebrow">Chapter ${input.number} · ${esc(input.bookTitle)}</div><h1>${esc(input.name)}</h1>` +
    `<div class="pmeta">${esc(meta)}</div></div></header>`;
  return doc(
    input.name,
    "repeats",
    input.head,
    header +
      // Every question under its own line: how often the board asked it.
      `<section id="questions" class="bp">${paperBodyHtml({ ...common, sectionOf: input.noteOf, headingEveryQuestion: true })}</section>` +
      `<section id="solutions" class="newpage bp"><h2 class="part">Solutions · ${esc(input.name)}</h2>` +
      `${keyDetailsHtml({ ...common, includeSolutions: true })}</section>`
  );
}

// ── Chapter-wise PYQs chapter (board) ───────────────────────────────────────

export type ChapterwiseChapterInput = {
  number: number;
  name: string;
  bookTitle: string;
  /** In print order (lib/ebooks/chapterwise): "1 mark", ..., "Case studies and passages", "Earlier years". */
  groups: { label: string; questions: QuestionRow[] }[];
  /** Question id -> the line over it: its sitting, or "Asked 3 times: ...". */
  noteOf: ReadonlyMap<string, string>;
  /** Question id -> its number in the chapter ("4", "4 (a)") and, where the group does not say it, its marks. */
  printedOf: ReadonlyMap<string, PrintedLabel>;
  images?: Map<string, string>;
  head: string;
};

export function buildChapterwiseChapterHtml(input: ChapterwiseChapterInput): string {
  const common = { title: input.name, images: input.images, printedOf: input.printedOf, head: "" };
  const all = input.groups.flatMap((g) => g.questions);
  // A case study is one question however many parts it has.
  const count = new Set(all.map((q) => q.setId ?? q.id)).size;
  const header =
    `<header class="chead"><div class="cn">${String(input.number).padStart(2, "0")}</div><div>` +
    `<div class="eyebrow">Chapter ${input.number} · ${esc(input.bookTitle)}</div><h1>${esc(input.name)}</h1>` +
    `<div class="pmeta">${plural(count, "question", "questions")}</div></div></header>`;
  const body = input.groups
    .map(
      (g) =>
        `<h3 class="mgroup">${esc(g.label)}</h3>` +
        paperBodyHtml({ ...common, questions: g.questions, sectionOf: input.noteOf, headingEveryQuestion: true })
    )
    .join("");
  return doc(
    input.name,
    "chapterwise",
    input.head,
    header +
      `<section id="questions" class="bp">${body}</section>` +
      `<section id="solutions" class="newpage bp"><h2 class="part">Solutions · ${esc(input.name)}</h2>` +
      `${keyDetailsHtml({ ...common, questions: all, includeSolutions: true })}</section>`
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
  papers:
    "Each paper is printed as the board set it, newest first: its sections, its question numbers, the marks for each question and the OR choices. Its solutions start on a fresh page under the same numbers, so you can sit the paper against the clock before you check.",
  repeats:
    "Each chapter gathers the questions the board has asked more than once, most-asked first, then the types of question it keeps coming back to. A line over each says when it was asked. The solutions close the chapter under the same numbers, so you can try them all before you check.",
  chapterwise:
    "Each chapter gathers its board questions by marks: the 1-mark questions first, then 2, 3 and more, then the case studies and passages, then questions from earlier years. A line over each says when it was asked. The solutions close the chapter under the same numbers, so you can try them all before you check.",
};

/** The gold seal on the premium cover, by kind. */
const SEAL: Partial<Record<EbookKind, [string, string, string]>> = {
  papers: ["Fully", "Solved", "Every Q"],
  repeats: ["Asked", "Again", "& again"],
  chapterwise: ["Every", "Chapter", "By marks"],
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
  /**
   * The premium cover (2026-10-26, Solved Papers books): the board line over
   * the subject, and the edition. Absent, the standard cover prints. `preview`
   * then fills the top sheet of the paper stack.
   */
  cover?: { over: string; main: string; edition: string };
};

/** Navy and gold, full bleed. Shadows are safe here: the cover is one page and never breaks. */
const PREMIUM_CSS = `
.pcover { position: relative; height: 297mm; overflow: hidden; break-after: page; color: #fff; padding: 21mm 20mm 17mm;
  display: flex; flex-direction: column;
  background: radial-gradient(120% 75% at 100% 0%, #2a4aa0 0%, #16296a 36%, #0f1d4a 62%, #0a1433 100%); }
.pcover::before { content: ""; position: absolute; inset: 0;
  background-image: repeating-linear-gradient(135deg, rgba(255,255,255,.035) 0 .6pt, transparent .6pt 12pt); }
.pcover::after { content: ""; position: absolute; inset: 8mm; border: .6pt solid rgba(240,196,110,.5); border-radius: 2.5mm; }
.pcover > * { position: relative; z-index: 1; }
.pc-top { display: flex; justify-content: space-between; align-items: center; font-size: 8.5pt; letter-spacing: .26em; font-weight: 700; }
.pc-brand { display: flex; gap: 7pt; align-items: center; }
.pc-brand i { width: 8pt; height: 8pt; border-radius: 50%; background: linear-gradient(135deg, #f7d58b, #d99a2b); }
.pc-ed { color: #f0c46e; }
.pc-kind { margin-top: 22mm; width: max-content; border: .8pt solid #f0c46e; color: #f0c46e; padding: 3.5pt 12pt; border-radius: 99pt;
  font-size: 8.5pt; letter-spacing: .22em; font-weight: 700; text-transform: uppercase; }
.pc-over { margin-top: 13pt; font-size: 12pt; letter-spacing: .17em; text-transform: uppercase; color: #b9c6ec; font-weight: 600; }
.pc-main { font-size: 60pt; line-height: 1.02; margin: 3pt 0 0; font-weight: 700; letter-spacing: -.01em; max-width: 165mm; color: #fff; }
.pc-main.long { font-size: 42pt; }
.pc-rule { width: 64pt; height: 2.5pt; margin-top: 15pt; border-radius: 2pt; background: linear-gradient(90deg, #f7d58b, #d99a2b); }
.pc-sub { margin-top: 11pt; font-size: 12.5pt; color: #c9d3f0; max-width: 125mm; line-height: 1.45; }
.pc-stack { position: relative; margin-top: 20mm; height: 96mm; }
.pc-sheet { position: absolute; width: 120mm; height: 76mm; border-radius: 2mm; box-shadow: 0 16pt 36pt -10pt rgba(0,0,0,.6); }
.pc-sheet.s3 { left: 40mm; top: 9mm; transform: rotate(8deg); background: #dfe6f7; }
.pc-sheet.s2 { left: 31mm; top: 4mm; transform: rotate(3.5deg); background: #eef2fb; }
.pc-sheet.s1 { left: 20mm; top: 0; transform: rotate(-2.5deg); background: #fff; color: var(--ink); padding: 12pt 15pt; font-size: 10pt;
  overflow: hidden; }
.pc-sheet.s1 .sh-head { font-size: 7.5pt; letter-spacing: .12em; text-transform: uppercase;
  color: var(--muted); border-bottom: .8pt solid #0f1d4a; padding-bottom: 4pt; margin-bottom: 7pt; font-weight: 700; }
.pc-sheet.s1 .sh-sec { font-size: 8.5pt; font-weight: 700; color: #b45309; margin-bottom: 5pt; }
.pc-sheet.s1 .sh-q { display: flex; gap: 6pt; }
.pc-sheet.s1 .sh-q > b { white-space: nowrap; }
.pc-sheet.s1 .katex { font-size: 1em; }
.pc-sheet.s1 .opts { margin-top: 5pt; }
.pc-sheet.s1 .opts.row { grid-template-columns: 1fr 1fr; }
.pc-sheet.s1 .sh-ans { margin-top: 10pt; padding-top: 7pt; border-top: .6pt dashed #c9d3e6; font-size: 8pt; font-weight: 700;
  letter-spacing: .14em; text-transform: uppercase; color: #047857; }
.pc-sheet.s1 .sh-line { height: 4pt; border-radius: 2pt; background: #e6ebf5; margin-top: 7pt; }
.pc-sheet.s1 .sh-line.short { width: 62%; }
.pc-seal { position: absolute; left: 133mm; top: -16mm; width: 31mm; height: 31mm; border-radius: 50%; transform: rotate(12deg);
  background: radial-gradient(circle at 34% 28%, #fde9b4 0%, #eab452 48%, #b97f1f 100%); color: #3b2706;
  box-shadow: 0 8pt 18pt -6pt rgba(0,0,0,.55), inset 0 0 0 2.2pt rgba(255,255,255,.35), inset 0 0 0 3.4pt rgba(59,39,6,.25);
  display: flex; flex-direction: column; align-items: center; justify-content: center; text-transform: uppercase; text-align: center; }
.pc-seal small { font-size: 6.5pt; letter-spacing: .3em; font-weight: 700; }
.pc-seal b { font-size: 15pt; letter-spacing: .06em; line-height: 1.05; }
.pc-stats { margin-top: auto; display: grid; grid-template-columns: repeat(4, 1fr); border-top: .6pt solid rgba(240,196,110,.5); padding-top: 10pt; }
.pc-stat { padding: 0 9pt; border-left: .6pt solid rgba(240,196,110,.3); }
.pc-stat:first-child { padding-left: 0; border-left: 0; }
.pc-stat b { display: block; font-size: 22pt; color: #f0c46e; line-height: 1.1; }
.pc-stat span { font-size: 8.5pt; color: #b9c6ec; letter-spacing: .05em; }
.pc-foot { margin-top: 9pt; display: flex; justify-content: space-between; font-size: 8.5pt; color: #93a3d1; letter-spacing: .04em; }
`;

function premiumCoverHtml(input: EbookFrontInput & { cover: NonNullable<EbookFrontInput["cover"]> }): string {
  const { cover } = input;
  const seal = SEAL[input.kind] ?? ["Fully", "Solved", "Every Q"];
  const stats = input.stats.map((s) => `<div class="pc-stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("");
  return (
    `<section class="pcover"><div class="pc-top"><span class="pc-brand"><i></i>PYQ VAULT</span><span class="pc-ed">${esc(cover.edition)}</span></div>` +
    `<div class="pc-kind">${KIND_LABEL[input.kind]}</div>` +
    `<div class="pc-over">${esc(cover.over)}</div><h1 class="pc-main${cover.main.length > 14 ? " long" : ""}">${esc(cover.main)}</h1>` +
    `<div class="pc-rule"></div><div class="pc-sub">${esc(input.subtitle)}</div>` +
    `<div class="pc-stack"><div class="pc-sheet s3"></div><div class="pc-sheet s2"></div><div class="pc-sheet s1">${input.preview}</div>` +
    `<div class="pc-seal"><small>${seal[0]}</small><b>${seal[1]}</b><small>${esc(seal[2])}</small></div></div>` +
    `<div class="pc-stats">${stats}</div><div class="pc-foot"><span>www.pyqvault.com</span><span>Worked solutions under the printed numbers</span></div></section>`
  );
}

/** The cover and the contents page, printed after the chapters so the pages are known. */
export function buildEbookFrontHtml(input: EbookFrontInput): string {
  const rows = input.chapters
    .map(
      (c) =>
        `<tr><td class="no">${c.number}</td><td>${esc(c.name)}</td><td class="qs">${esc(c.detail)}</td><td class="pg">${c.page}</td></tr>`
    )
    .join("");
  const stats = input.stats.map((s) => `<div class="stat card"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("");
  const coverHtml = input.cover
    ? premiumCoverHtml({ ...input, cover: input.cover })
    : `<section class="cover"><div class="brand"><span class="dot"></span>PYQ VAULT</div>` +
      `<div class="kind">${KIND_LABEL[input.kind]}</div><h1>${esc(input.title)}</h1><div class="sub">${esc(input.subtitle)}</div>` +
      `<div class="rule"></div><div class="preview">${input.preview}</div>` +
      `<div class="stats">${stats}</div><div class="url">www.pyqvault.com</div></section>`;
  return (
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(input.title)}</title>${input.head}` +
    `<style>${PAPER_CSS}${THEME_CSS}${FRONT_CSS}${input.cover ? PREMIUM_CSS : ""}</style></head><body style="--acc:${ACCENT[input.kind]}">` +
    coverHtml +
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

/** The top sheet of the Solved Papers cover: the newest paper's head, its section and a real question. */
export function papersPreview(q: QuestionRow, sheet: { label: string; meta: string; section: string; number: string }): string {
  return (
    `<div class="sh-head">${esc([sheet.label, sheet.meta].filter(Boolean).join(" · "))}</div>` +
    `<div class="sh-sec">${esc(sheet.section)}</div>` +
    `<div class="sh-q"><b>${esc(sheet.number)}.</b><div>${blocksHtml(q.text)}${optionsHtml(q.options, undefined)}</div></div>` +
    `<div class="sh-ans">Solution</div>` +
    `<div class="sh-line"></div><div class="sh-line"></div><div class="sh-line"></div><div class="sh-line short"></div>`
  );
}
