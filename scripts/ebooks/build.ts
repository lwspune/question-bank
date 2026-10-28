/**
 * Build ebook master PDFs and their free samples (2026-10-20).
 *
 *   npm run ebooks:build -- --book=mht-cet-maths-pyq                 # print locally, write nothing to the DB
 *   npm run ebooks:build -- --all                                    # every book in lib/ebooks/catalog
 *   npm run ebooks:build -- --book=mht-cet-maths-notes --only=circle # one chapter, for a quick look
 *   npm run ebooks:build -- --all --apply                            # also upload + record each new version
 *
 * Four kinds (lib/ebooks/catalog): Formula and Notes books come from the
 * /notes registry alone (no database read); a Solved Papers book reads the
 * stored board papers (lib/ebooks/boardPapers picks which) through the ANON
 * client, as the paper download does, so it can only print PUBLIC questions
 * and refuses a paper with one missing; the PYQ book reads the BANK
 * through its /books definition, not the stored `/books` curation, which lags
 * the bank between syncs, and repeats the collapse with the same rule
 * (lib/books/recurrence: only groups with no review reason are collapsed).
 *
 * PRINTS ONE CHAPTER AT A TIME with the local browser (the paper download's
 * printer), then joins the parts, numbers the pages and lays the paper colour
 * under every page (lib/ebooks/pdfAssemble). The cover and contents are
 * printed LAST, once every chapter's page count is known.
 *
 * --apply uploads the master and the sample to the private `ebooks` bucket
 * under a new version and records it on the book's `ebooks` row. It never
 * switches a book on: that is the owner's call, once they have read the PDF.
 *
 * Output: generated-papers/ebooks/<slug>/ (gitignored).
 */
import { join } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { loadBookMeta, type BookMetaRow } from "../../src/lib/books/query";
import { getBookBySlug } from "../../src/lib/books/registry";
import { buildChapterSections, sittingLabel, sittingOrdinal } from "../../src/lib/books/order";
import { groupRepeats, recurrenceLabels, type RecurrenceRow } from "../../src/lib/books/recurrence";
import { mhtCetSittingBySourceFile } from "../../src/lib/mocks/mhtcetSittings";
import { queryQuestionsByIds, type QuestionRow } from "../../src/lib/questions/query";
import { imageDataUris } from "../../src/lib/export/pdf/images";
import { pdfHead } from "../../src/lib/export/pdf/assets";
import { printPdf } from "../../src/lib/export/pdf/printPdf";
import { formulaPageCounts } from "../../src/lib/formula/chapterPages";
import {
  buildEbookFrontHtml,
  buildFormulaChapterHtml,
  buildNotesChapterHtml,
  buildPyqChapterHtml,
  buildChapterwiseChapterHtml,
  buildTextbookChapterHtml,
  buildRepeatsChapterHtml,
  buildSolvedPaperHtml,
  formulaPreview,
  notesPreview,
  papersPreview,
  pyqPreview,
} from "../../src/lib/ebooks/bookHtml";
import { EBOOKS, ebookChapters, getEbook, isBoardEbook, type EbookChapter, type ChapterwiseEbook, type EbookDefinition, type PapersEbook, type RepeatsEbook, type TextbookEbook } from "../../src/lib/ebooks/catalog";
import { pickBookPapers } from "../../src/lib/ebooks/boardPapers";
import { repeatChapters, type RepeatPlanRow } from "../../src/lib/ebooks/repeats";
import { chapterwiseChapters, groupLabel, type ChapterwiseSlot } from "../../src/lib/ebooks/chapterwise";
import { bookContext } from "../../src/lib/ebooks/contexts";
import { getBoardChapter, groupHasSubHeaders, listBoardChapters } from "../../src/lib/board/query";
import { cleanRef } from "../../src/lib/board/cleanRef";
import { homeworkQuestions } from "../../src/lib/homework/dayExport";
import { getExamBySlug } from "../../src/lib/exam/examContext";
import { getBoardPaperForExport, listPublishedPapers } from "../../src/lib/questionPapers/query";
import { boardPaperExport } from "../../src/lib/questionPapers/exportPlan";
import type { VisualizationSlug } from "../../src/app/notes/_types";
import { PDFDocument } from "pdf-lib";
import { assembleMaster, pageCounts } from "../../src/lib/ebooks/pdfAssemble";
import { stampCoverName } from "../../src/lib/ebooks/stamp";
import { KIND_LABEL, PAPER } from "../../src/lib/ebooks/theme";
import { buildDiagramCss } from "../lib/ebookDiagramCss";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/**
 * The diagram components come through the notes card module, which also
 * imports KaTeX's stylesheet; Node cannot load a .css file. A diagram needs no
 * stylesheet at render (the book carries its own), so .css imports are skipped
 * here, then the renderer is loaded.
 */
async function loadDiagramRenderer(): Promise<(slug: VisualizationSlug) => string> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const extensions = require.extensions as Record<string, (m: unknown, f: string) => void>;
  extensions[".css"] = () => undefined;
  const { renderDiagramMarkup } = await import("../../src/lib/ebooks/diagrams");
  return renderDiagramMarkup;
}

const APPLY = process.argv.includes("--apply");
const ID_CHUNK = 200;
/** A big chapter (300+ questions with solutions) takes minutes to lay out. */
const PRINT_TIMEOUT_MS = 15 * 60_000;
/** A Textbook Solutions chapter printed whole; past this it is printed section by section. */
const WHOLE_CHAPTER_TIMEOUT_MS = 4 * 60_000;

/** Pages of each PDF, one after another, nothing added. */
async function joinPdfs(parts: Uint8Array[]): Promise<Uint8Array> {
  const out = await PDFDocument.create();
  for (const part of parts) {
    const src = await PDFDocument.load(part);
    for (const p of await out.copyPages(src, src.getPageIndices())) out.addPage(p);
  }
  return out.save();
}

function arg(name: string): string | undefined {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
}

async function loadQuestions(client: SupabaseClient, ids: string[]): Promise<Map<string, QuestionRow>> {
  const out = new Map<string, QuestionRow>();
  for (let i = 0; i < ids.length; i += ID_CHUNK) {
    for (const q of await queryQuestionsByIds(client, ids.slice(i, i + ID_CHUNK))) out.set(q.id, q);
  }
  return out;
}

type Built = { chapter: EbookChapter; pdf: Uint8Array; detail: string };
type Totals = {
  questions: number;
  formulas: number;
  tables: number;
  traps: number;
  topics: number;
  examples: number;
  /** Solved Papers: the year of each paper printed; Repeated PYQs: every year its lines name. */
  years: number[];
  /** Repeated PYQs: questions asked again, and recurring types. */
  repeats: number;
  types: number;
};

/** Shared by every PYQ chapter of one book: the bank's ordering facts, read once. */
type PyqContext = { metaByChapter: Map<string, BookMetaRow[]>; firstQuestion?: { q: QuestionRow; sitting: string; chapter: string } };

async function buildPyqChapter(
  client: SupabaseClient,
  ebook: EbookDefinition & { kind: "pyq" },
  c: EbookChapter,
  ctx: PyqContext,
  totals: Totals,
  head: string
): Promise<Built> {
  const book = getBookBySlug(ebook.bookSlug)!;
  const metas = ctx.metaByChapter.get(c.name) ?? [];
  const sections = buildChapterSections(metas, book.sections, c.bookChapter!.groupSubtopics);
  const ids = sections.flatMap((s) => s.sets.flatMap((set) => set.questionIds));
  const questions = await loadQuestions(client, ids);
  const bySourceFile = mhtCetSittingBySourceFile();
  const metaById = new Map(metas.map((m) => [m.id, m]));
  const rows: RecurrenceRow[] = ids.flatMap((id) => {
    const m = metaById.get(id);
    const q = questions.get(id);
    if (!m || !q) return [];
    const sitting = sittingOrdinal(m);
    const primary = m.sourceFile ? bySourceFile.get(m.sourceFile) : undefined;
    return [
      {
        questionId: id,
        stem: q.text ?? "",
        sittingOrdinal: sitting,
        sittingLabel: sittingLabel(m.exam, m.pyqYear, sitting),
        chapter: c.name,
        subtopic: m.subtopic ?? null,
        answer: q.options.find((o) => o.isCorrect)?.text ?? null,
        hasFigure: q.imageUrl != null,
        preferred: primary ? primary.sourceFile === m.sourceFile : true,
      },
    ];
  });
  const groups = groupRepeats(rows);
  const excludedIds = new Set(groups.filter((g) => g.review.length === 0).flatMap((g) => g.redundantIds));
  const recurrence = recurrenceLabels(rows, excludedIds);
  const list = Array.from(questions.values());
  const [paperImages, keyImages] = await Promise.all([imageDataUris(client, "paper", list), imageDataUris(client, "key", list)]);
  const pdf = await printPdf(
    buildPyqChapterHtml({
      number: c.number,
      name: c.name,
      classLabel: c.classLabel,
      bookTitle: ebook.title,
      sections,
      questionsById: questions,
      excludedIds,
      recurrence,
      images: new Map([...paperImages, ...keyImages]),
      head,
    }),
    { timeoutMs: PRINT_TIMEOUT_MS }
  );
  const printed = ids.filter((id) => questions.has(id) && !excludedIds.has(id));
  totals.questions += printed.length;
  // The cover's sample question: the first figure-free MCQ of the first chapter.
  if (!ctx.firstQuestion) {
    const first = printed.map((id) => questions.get(id)!).find((q) => !q.imageUrl && q.options.length === 4);
    const m = first ? metaById.get(first.id) : undefined;
    if (first && m) ctx.firstQuestion = { q: first, sitting: sittingLabel(m.exam, m.pyqYear, sittingOrdinal(m)), chapter: c.name };
  }
  const missing = ids.length - questions.size;
  console.log(
    `  ${String(c.number).padStart(2)}. ${c.name.padEnd(36)} ${String(printed.length).padStart(4)} q  (${excludedIds.size} repeats collapsed,` +
      ` ${groups.filter((g) => g.review.length > 0).length} left for review${missing ? `, ${missing} NOT LOADED` : ""})`
  );
  return { chapter: c, pdf, detail: `${printed.length} q` };
}

/**
 * Every picture as a JPEG on white. Chrome's PDF printer hung for good on some
 * PNGs (measured 2026-10-26: an ordinary 803x650 RGB diagram in SSC Science
 * and Technology II, July 2024, hung the print wherever it fell near a page
 * break; the same picture as a JPEG printed in 2 s). Smaller files too.
 */
async function asJpegs(images: Map<string, string>): Promise<Map<string, string>> {
  const sharp = (await import("sharp")).default;
  const out = new Map<string, string>();
  for (const [path, uri] of images) {
    const comma = uri.indexOf(",");
    if (!uri.startsWith("data:image/") || uri.startsWith("data:image/jpeg") || uri.startsWith("data:image/svg")) {
      out.set(path, uri);
      continue;
    }
    const jpeg = await sharp(Buffer.from(uri.slice(comma + 1), "base64"))
      .flatten({ background: "#ffffff" })
      .jpeg({ quality: 90 })
      .toBuffer();
    out.set(path, `data:image/jpeg;base64,${jpeg.toString("base64")}`);
  }
  return out;
}

/**
 * The cover and contents: a few seconds' print, which the local browser has
 * now and then hung on for good (2026-10-26: HSC Physics' Repeated PYQs cover
 * sat 15 minutes with plain-text content; the Solved Papers pilot's cover hung
 * once and printed at once on a rerun). Two minutes, then a fresh browser, three tries.
 */
async function printFront(html: string): Promise<Uint8Array> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await printPdf(html, { timeoutMs: 120_000 });
    } catch (err) {
      if (attempt === 3) throw err;
      console.log(`  cover print failed (${err instanceof Error ? err.message : err}); retrying with a fresh browser`);
    }
  }
}

/** "February 2026"; a CBSE paper, which has no sitting, is its year. */
function paperLabel(p: { sitting: string | null; year: number }): string {
  return `${p.sitting ?? ""} ${p.year}`.trim();
}

/** A Solved Papers book's chapters: its papers, each read whole and printed. */
async function buildPaperChapters(
  admin: SupabaseClient,
  anon: SupabaseClient,
  ebook: PapersEbook,
  only: string[] | undefined,
  totals: Totals,
  head: string
): Promise<{ built: Built[]; preview: string }> {
  const exam = getExamBySlug(ebook.examSlug);
  if (!exam) throw new Error(`ebook ${ebook.slug}: no exam "${ebook.examSlug}"`);
  const all = (await listPublishedPapers(anon)).filter((p) => p.examName === exam.examName && p.subjectName === ebook.subject);
  const picked = pickBookPapers(all, ebook.rule);
  if (picked.length === 0) throw new Error(`ebook ${ebook.slug}: no published ${exam.examName} ${ebook.subject} papers`);
  const papers = picked.filter((p) => !only || only.includes(p.slug));
  if (papers.length === 0) throw new Error(`--only matched none of: ${picked.map((p) => p.slug).join(", ")}`);
  const built: Built[] = [];
  let preview = "";
  for (const [i, p] of papers.entries()) {
    const found = await getBoardPaperForExport(anon, exam.examName, p.slug);
    if (!found) throw new Error(`${p.slug}: not readable`);
    const ids = [...new Set(found.items.map((it) => it.questionId))];
    const rows = await loadQuestions(anon, ids);
    // A paper with a question missing would print the wrong numbers against the
    // paper a student was set, so the book stops rather than print it short.
    if (rows.size !== ids.length) throw new Error(`${p.slug}: only ${rows.size} of ${ids.length} questions are PUBLIC`);
    const plan = boardPaperExport(found, found.items, new Map([...rows.values()].map((q) => [q.id, q.context])));
    if (!plan.ok) throw new Error(`${p.slug}: ${plan.reason}`);
    const questions = plan.questionIds.map((id) => ({ ...rows.get(id)!, setId: plan.setOf.get(id) ?? null }));
    const [paperImages, keyImages] = await Promise.all([imageDataUris(admin, "paper", questions), imageDataUris(admin, "key", questions)]);
    const label = paperLabel(p);
    const pdf = await printPdf(
      buildSolvedPaperHtml({
        number: i + 1,
        bookTitle: ebook.title,
        paper: { label, paperCode: p.paperCode, totalMarks: p.totalMarks, durationMinutes: p.durationMinutes },
        questions,
        sectionOf: plan.sectionOf,
        printedOf: plan.printedOf,
        images: await asJpegs(new Map([...paperImages, ...keyImages])),
        head,
      }),
      { timeoutMs: PRINT_TIMEOUT_MS }
    );
    totals.questions += questions.length;
    totals.years.push(p.year);
    if (!preview) {
      // The cover's top sheet: a short, figure-free question from the newest paper.
      const first = questions.find((q) => !q.imageUrl && !q.context && (q.text ?? "").length < 220);
      if (first) {
        preview = papersPreview(first, {
          label,
          meta: [p.paperCode, `${p.totalMarks} marks`].filter(Boolean).join(" · "),
          section: plan.sectionOf.get(first.id) ?? "",
          number: plan.printedOf.get(first.id)?.number ?? "1",
        });
      }
    }
    const detail = `${p.totalMarks} marks`;
    console.log(`  ${String(i + 1).padStart(2)}. ${label.padEnd(16)} ${(p.paperCode ?? "").padEnd(9)} ${String(questions.length).padStart(3)} q`);
    built.push({ chapter: { number: i + 1, slug: p.slug, name: label, classLabel: null, notes: null, bookChapter: null }, pdf, detail });
  }
  return { built, preview };
}

type PlanItemRow = {
  day: number;
  position: number;
  sub: number;
  note: string;
  question_id: string;
  question: { chapter: { id: string; name: string; order_index: number | null } | null } | null;
};

/** A subject's homework plan, every item with its question's chapter. Paged: a plan runs past 1,000 items. */
async function loadPlanRows(
  anon: SupabaseClient,
  ebook: Pick<RepeatsEbook, "slug" | "examSlug" | "subject">
): Promise<{ slug: string; rows: RepeatPlanRow[] }> {
  const exam = getExamBySlug(ebook.examSlug);
  if (!exam) throw new Error(`ebook ${ebook.slug}: no exam "${ebook.examSlug}"`);
  const { data: ex, error: exErr } = await anon.from("exams").select("id").eq("name", exam.examName).single();
  if (exErr || !ex) throw new Error(`${ebook.slug}: exam ${exam.examName}: ${exErr?.message}`);
  const { data: sub, error: subErr } = await anon.from("subjects").select("id").eq("exam_id", ex.id).eq("name", ebook.subject).single();
  if (subErr || !sub) throw new Error(`${ebook.slug}: subject ${ebook.subject}: ${subErr?.message}`);
  // One plan per subject; were there two, the first by slug, as the Top 10 tab reads it.
  const { data: plans, error: planErr } = await anon
    .from("homework_plans")
    .select("id, slug")
    .eq("exam_id", ex.id)
    .eq("subject_id", sub.id)
    .order("slug")
    .limit(1);
  if (planErr) throw new Error(`${ebook.slug}: plan: ${planErr.message}`);
  const plan = (plans ?? [])[0] as { id: string; slug: string } | undefined;
  if (!plan) throw new Error(`ebook ${ebook.slug}: no published homework plan for ${exam.examName} ${ebook.subject}`);
  const rows: RepeatPlanRow[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await anon
      .from("homework_plan_items")
      .select("day, position, sub, note, question_id, question:questions(chapter:chapters(id, name, order_index))")
      .eq("plan_id", plan.id)
      .order("day")
      .order("position")
      .order("sub")
      .range(from, from + 999);
    if (error) throw new Error(`${ebook.slug}: plan items: ${error.message}`);
    for (const r of (data ?? []) as unknown as PlanItemRow[]) {
      const ch = r.question?.chapter;
      // A question no longer PUBLIC reads with no chapter: the book stops rather than print a slot short.
      if (!ch) throw new Error(`${ebook.slug}: plan question ${r.question_id} is not readable (not PUBLIC?)`);
      rows.push({
        day: r.day,
        position: r.position,
        sub: r.sub,
        note: r.note,
        questionId: r.question_id,
        chapterId: ch.id,
        chapterName: ch.name,
        chapterOrder: ch.order_index ?? 0,
      });
    }
    if (!data || data.length < 1000) return { slug: plan.slug, rows };
  }
}

const chapterSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** A Repeated PYQs book's chapters: each chapter's repeats and recurring types, then its solutions. */
async function buildRepeatChapters(
  admin: SupabaseClient,
  anon: SupabaseClient,
  ebook: RepeatsEbook,
  only: string[] | undefined,
  totals: Totals,
  head: string
): Promise<{ built: Built[]; preview: string }> {
  const plan = await loadPlanRows(anon, ebook);
  const all = repeatChapters(plan.rows);
  if (all.length === 0) throw new Error(`ebook ${ebook.slug}: plan ${plan.slug} has no repeats`);
  const chapters = all.filter((c) => !only || only.includes(chapterSlug(c.chapterName)));
  if (chapters.length === 0) throw new Error(`--only matched none of: ${all.map((c) => chapterSlug(c.chapterName)).join(", ")}`);
  console.log(`  plan ${plan.slug}`);
  const built: Built[] = [];
  let preview = "";
  for (const [i, c] of chapters.entries()) {
    const parts = c.slots.flatMap((s) => s.parts.map((p) => ({ ...p, slot: s })));
    const ids = [...new Set(parts.map((p) => p.questionId))];
    const rows = await loadQuestions(anon, ids);
    if (rows.size !== ids.length) throw new Error(`${c.chapterName}: only ${rows.size} of ${ids.length} questions are PUBLIC`);
    const setOf = new Map<string, string>();
    for (const s of c.slots) if (s.parts.length > 1) for (const p of s.parts) setOf.set(p.questionId, `repeats-${i + 1}-${s.number}`);
    const questions = standAlone(homeworkQuestions(parts.map((p) => rows.get(p.questionId)!), setOf));
    const counts = { repeats: c.slots.filter((s) => s.kind === "repeat").length, types: c.slots.filter((s) => s.kind === "type").length };
    const [paperImages, keyImages] = await Promise.all([imageDataUris(admin, "paper", questions), imageDataUris(admin, "key", questions)]);
    const pdf = await printPdf(
      buildRepeatsChapterHtml({
        number: i + 1,
        name: c.chapterName,
        bookTitle: ebook.title,
        questions,
        noteOf: new Map(parts.map((p) => [p.questionId, p.slot.note])),
        printedOf: new Map(parts.map((p) => [p.questionId, { number: p.label, marks: null, orBefore: false }])),
        counts,
        images: await asJpegs(new Map([...paperImages, ...keyImages])),
        head,
      }),
      { timeoutMs: PRINT_TIMEOUT_MS }
    );
    totals.questions += c.slots.length;
    totals.repeats += counts.repeats;
    totals.types += counts.types;
    for (const s of c.slots) for (const y of s.note.match(/\b20\d\d\b/g) ?? []) totals.years.push(Number(y));
    if (!preview) {
      const slot = c.slots.find((s) => s.kind === "repeat" && s.parts.length === 1);
      const q = slot ? rows.get(slot.parts[0].questionId) : undefined;
      if (slot && q && !q.imageUrl && !q.context && (q.text ?? "").length < 220) {
        preview = papersPreview(q, { label: c.chapterName, meta: "", section: slot.note, number: "1" });
      }
    }
    console.log(`  ${String(i + 1).padStart(2)}. ${c.chapterName.padEnd(40)} ${String(counts.repeats).padStart(3)} again ${String(counts.types).padStart(3)} types`);
    built.push({
      chapter: { number: i + 1, slug: chapterSlug(c.chapterName), name: c.chapterName, classLabel: null, notes: null, bookChapter: null },
      pdf,
      detail: `${c.slots.length} q`,
    });
  }
  return { built, preview };
}

/** Each question's marks in the stored papers (a question in several papers carries the same marks). */
async function marksOf(anon: SupabaseClient, ids: string[]): Promise<Map<string, number>> {
  const out = new Map<string, number>();
  for (let i = 0; i < ids.length; i += ID_CHUNK) {
    const { data, error } = await anon
      .from("board_paper_items")
      .select("question_id, marks")
      .in("question_id", ids.slice(i, i + ID_CHUNK))
      .not("marks", "is", null);
    if (error) throw new Error(`paper marks: ${error.message}`);
    for (const r of data ?? []) if (!out.has(r.question_id as string)) out.set(r.question_id as string, Number(r.marks));
  }
  return out;
}

/** Questions printed apart from their paper: a section instruction that says nothing goes (lib/ebooks/contexts). */
function standAlone(questions: QuestionRow[]): QuestionRow[] {
  return questions.map((q) => ({ ...q, context: bookContext(q.context) }));
}

/** A Chapter-wise PYQs book's slots: from the homework plan (Maharashtra) or the one-paper-a-year selection (CBSE). */
async function chapterwiseSlots(anon: SupabaseClient, ebook: ChapterwiseEbook): Promise<ChapterwiseSlot[]> {
  if (ebook.source === "plan") {
    const { rows } = await loadPlanRows(anon, ebook);
    const bySlot = new Map<string, RepeatPlanRow[]>();
    for (const r of [...rows].sort((a, b) => a.day - b.day || a.position - b.position || a.sub - b.sub)) {
      const key = `${r.day}:${r.position}`;
      bySlot.set(key, [...(bySlot.get(key) ?? []), r]);
    }
    const marks = await marksOf(anon, [...bySlot.values()].map((parts) => parts[0].questionId));
    return [...bySlot.values()].map((parts, i) => ({
      order: i,
      marks: marks.get(parts[0].questionId) ?? null,
      note: parts[0].note,
      chapterId: parts[0].chapterId,
      chapterName: parts[0].chapterName,
      chapterOrder: parts[0].chapterOrder,
      parts: parts.map((p) => p.questionId),
    }));
  }
  // CBSE: the same papers as the Solved Papers book, newest first, each item a slot (a case study's parts one).
  const exam = getExamBySlug(ebook.examSlug)!;
  const papers = pickBookPapers(
    (await listPublishedPapers(anon)).filter((p) => p.examName === exam.examName && p.subjectName === ebook.subject),
    "first-set-per-year"
  );
  const slots: ChapterwiseSlot[] = [];
  for (const p of papers) {
    const found = await getBoardPaperForExport(anon, exam.examName, p.slug);
    if (!found) throw new Error(`${p.slug}: not readable`);
    const items = [...found.items].sort((a, b) => a.position - b.position);
    const ids = [...new Set(items.map((it) => it.questionId))];
    const rows = await loadQuestions(anon, ids);
    if (rows.size !== ids.length) throw new Error(`${p.slug}: only ${rows.size} of ${ids.length} questions are PUBLIC`);
    const chapterIds = [...new Set([...rows.values()].map((q) => q.chapter?.id).filter(Boolean))] as string[];
    const { data: chs, error } = await anon.from("chapters").select("id, name, order_index").in("id", chapterIds);
    if (error) throw new Error(`${p.slug}: chapters: ${error.message}`);
    const chapter = new Map((chs ?? []).map((c) => [c.id as string, c as { id: string; name: string; order_index: number | null }]));
    const note = [String(p.year), p.paperCode].filter(Boolean).join(" · ");
    for (let i = 0; i < items.length; ) {
      const first = items[i];
      let j = i + 1;
      while (first.caseKey && j < items.length && items[j].caseKey === first.caseKey) j++;
      const ch = chapter.get(rows.get(first.questionId)!.chapter!.id)!;
      slots.push({
        order: slots.length,
        marks: first.marks,
        note,
        chapterId: ch.id,
        chapterName: ch.name,
        chapterOrder: ch.order_index ?? 0,
        parts: items.slice(i, j).map((it) => it.questionId),
      });
      i = j;
    }
  }
  return slots;
}

/** A Chapter-wise PYQs book's chapters: every board question, grouped by marks, then its solutions. */
async function buildChapterwiseChapters(
  admin: SupabaseClient,
  anon: SupabaseClient,
  ebook: ChapterwiseEbook,
  only: string[] | undefined,
  totals: Totals,
  head: string
): Promise<{ built: Built[]; preview: string }> {
  const all = chapterwiseChapters(await chapterwiseSlots(anon, ebook));
  if (all.length === 0) throw new Error(`ebook ${ebook.slug}: no questions`);
  const chapters = all.filter((c) => !only || only.includes(chapterSlug(c.chapterName)));
  if (chapters.length === 0) throw new Error(`--only matched none of: ${all.map((c) => chapterSlug(c.chapterName)).join(", ")}`);
  const built: Built[] = [];
  let preview = "";
  for (const [i, c] of chapters.entries()) {
    const slots = c.groups.flatMap((g) => g.slots.map((s) => ({ ...s, group: g })));
    const ids = [...new Set(slots.flatMap((s) => s.parts.map((p) => p.questionId)))];
    const rows = await loadQuestions(anon, ids);
    if (rows.size !== ids.length) throw new Error(`${c.chapterName}: only ${rows.size} of ${ids.length} questions are PUBLIC`);
    const setOf = new Map<string, string>();
    for (const [n, s] of slots.entries()) if (s.parts.length > 1) for (const p of s.parts) setOf.set(p.questionId, `cw-${i + 1}-${n}`);
    const noteOf = new Map<string, string>();
    const printedOf = new Map<string, { number: string; marks: number | null; orBefore: boolean }>();
    for (const s of slots) {
      for (const [j, p] of s.parts.entries()) {
        noteOf.set(p.questionId, s.note);
        // A marks group already says the marks; a case study says them once, on its first part.
        printedOf.set(p.questionId, { number: p.label, marks: s.group.kind === "parts" && j === 0 ? s.marks : null, orBefore: false });
      }
    }
    const groups = c.groups.map((g) => ({
      label: groupLabel(g),
      questions: standAlone(
        homeworkQuestions(
          g.slots.flatMap((s) => s.parts.map((p) => rows.get(p.questionId)!)),
          setOf
        )
      ),
    }));
    const chapterQuestions = groups.flatMap((g) => g.questions);
    const [paperImages, keyImages] = await Promise.all([
      imageDataUris(admin, "paper", chapterQuestions),
      imageDataUris(admin, "key", chapterQuestions),
    ]);
    const pdf = await printPdf(
      buildChapterwiseChapterHtml({
        number: i + 1,
        name: c.chapterName,
        bookTitle: ebook.title,
        groups,
        noteOf,
        printedOf,
        images: await asJpegs(new Map([...paperImages, ...keyImages])),
        head,
      }),
      { timeoutMs: PRINT_TIMEOUT_MS }
    );
    totals.questions += slots.length;
    for (const s of slots) for (const y of s.note.match(/\b20\d\d\b/g) ?? []) totals.years.push(Number(y));
    if (!preview) {
      const s = slots.find((x) => x.group.kind === "marks" && x.parts.length === 1);
      const q = s ? rows.get(s.parts[0].questionId) : undefined;
      if (s && q && !q.imageUrl && !q.context && (q.text ?? "").length < 220) {
        preview = papersPreview(q, { label: c.chapterName, meta: groupLabel(s.group), section: s.note, number: s.parts[0].label });
      }
    }
    const counts = c.groups.map((g) => `${groupLabel(g)} ${g.slots.length}`).join(", ");
    console.log(`  ${String(i + 1).padStart(2)}. ${c.chapterName.padEnd(40)} ${String(slots.length).padStart(3)} q  (${counts})`);
    built.push({
      chapter: { number: i + 1, slug: chapterSlug(c.chapterName), name: c.chapterName, classLabel: null, notes: null, bookChapter: null },
      pdf,
      detail: `${slots.length} q`,
    });
  }
  return { built, preview };
}

/**
 * A Textbook Solutions book's chapters, through the /board reader's own loaders
 * (listBoardChapters, getBoardChapter), so the book and the reader follow the
 * same order: section -> block -> question, each question with its solution.
 */
async function buildTextbookChapters(
  admin: SupabaseClient,
  anon: SupabaseClient,
  ebook: TextbookEbook,
  only: string[] | undefined,
  totals: Totals,
  head: string
): Promise<{ built: Built[]; preview: string }> {
  const exam = getExamBySlug(ebook.examSlug);
  if (!exam) throw new Error(`ebook ${ebook.slug}: no exam "${ebook.examSlug}"`);
  const { data: ex, error: exErr } = await anon.from("exams").select("id").eq("name", exam.examName).single();
  if (exErr || !ex) throw new Error(`${ebook.slug}: exam ${exam.examName}: ${exErr?.message}`);
  const subject = (await listBoardChapters(anon, exam.examName)).find((s) => s.subjectName === ebook.subject);
  if (!subject || subject.chapters.length === 0) throw new Error(`ebook ${ebook.slug}: no ${ebook.subject} chapters on /board`);
  let chapters = subject.chapters;
  if (ebook.part) {
    const first = chapters.findIndex((c) => c.name === ebook.part!.first);
    const last = chapters.findIndex((c) => c.name === ebook.part!.last);
    if (first < 0 || last < first) throw new Error(`${ebook.slug}: part ${ebook.part.first} to ${ebook.part.last} not found`);
    chapters = chapters.slice(first, last + 1);
  }
  const picked = chapters.filter((c) => !only || only.includes(c.chapterSlug));
  if (picked.length === 0) throw new Error(`--only matched none of: ${chapters.map((c) => c.chapterSlug).join(", ")}`);
  const built: Built[] = [];
  let preview = "";
  for (const [i, link] of picked.entries()) {
    const chapter = await getBoardChapter(anon, {
      examId: ex.id as string,
      chapterId: link.chapterId,
      examName: exam.examName,
      subjectName: ebook.subject,
      chapterName: link.name,
    });
    if (!chapter) throw new Error(`${link.name}: no book-ordered questions`);
    const ids = chapter.groups.flatMap((g) => g.blocks.flatMap((b) => b.questions.map((q) => q.id)));
    const rows = await loadQuestions(anon, ids);
    if (rows.size !== new Set(ids).size) throw new Error(`${link.name}: only ${rows.size} of ${ids.length} questions are PUBLIC`);
    const printedOf = new Map<string, { number: string; marks: number | null; orBefore: boolean }>();
    let blocks = 0;
    const groups = chapter.groups.map((g) => {
      const labelled = groupHasSubHeaders(g);
      return {
        title: g.group,
        blocks: g.blocks.map((b) => {
          blocks += 1;
          // A passage's questions run together under one unit, so it prints once.
          const units: QuestionRow[][] = [];
          for (const [k, bq] of b.questions.entries()) {
            printedOf.set(bq.id, { number: bq.questionNumber ? cleanRef(bq.questionNumber) : String(k + 1), marks: null, orBefore: false });
            const q = rows.get(bq.id)!;
            const last = units[units.length - 1];
            if (last && q.setId && last[0].setId === q.setId) last.push(q);
            else units.push([q]);
          }
          return { label: labelled ? b.label : null, units };
        }),
      };
    });
    const chapterQuestions = [...rows.values()];
    const [paperImages, keyImages] = await Promise.all([
      imageDataUris(admin, "paper", chapterQuestions),
      imageDataUris(admin, "key", chapterQuestions),
    ]);
    const images = await asJpegs(new Map([...paperImages, ...keyImages]));
    const html = (gs: typeof groups, continued: boolean) =>
      buildTextbookChapterHtml({ number: i + 1, name: link.name, bookTitle: ebook.title, groups: gs, printedOf, images, head, continued });
    // Chrome hangs on some whole chapters that print in seconds section by
    // section (HSC 12 Maths, Mathematical Logic), so a chapter gets a few
    // minutes whole, then is printed per section and joined.
    let pdf: Uint8Array;
    try {
      pdf = await printPdf(html(groups, false), { timeoutMs: WHOLE_CHAPTER_TIMEOUT_MS });
    } catch {
      console.log(`     ${link.name}: printing section by section`);
      const parts: Uint8Array[] = [];
      for (const [k, g] of groups.entries()) parts.push(await printPdf(html([g], k > 0), { timeoutMs: PRINT_TIMEOUT_MS }));
      pdf = await joinPdfs(parts);
    }
    totals.questions += ids.length;
    totals.topics += blocks;
    if (!preview) {
      const q = chapterQuestions.find((x) => !x.imageUrl && !x.context && x.solution && (x.text ?? "").length < 220);
      if (q) preview = papersPreview(q, { label: link.name, meta: "", section: chapter.groups[0].group, number: printedOf.get(q.id)!.number });
    }
    console.log(`  ${String(i + 1).padStart(2)}. ${link.name.padEnd(44)} ${String(ids.length).padStart(4)} q  ${blocks} blocks`);
    built.push({
      chapter: { number: i + 1, slug: link.chapterSlug, name: link.name, classLabel: null, notes: null, bookChapter: null },
      pdf,
      detail: `${ids.length} q`,
    });
  }
  return { built, preview };
}

async function buildNotesChapter(
  ebook: EbookDefinition,
  c: EbookChapter,
  totals: Totals,
  head: string,
  diagramHead: string,
  renderDiagram: ((slug: VisualizationSlug) => string) | undefined
): Promise<Built> {
  const notes = c.notes!;
  const counts = formulaPageCounts(notes);
  totals.formulas += counts.formulas;
  totals.tables += counts.tables;
  totals.traps += counts.traps;
  totals.topics += notes.slugs.length;
  totals.examples += notes.slugs
    .flatMap((s) => notes.notes[s].concepts)
    .filter((k) => k.kind === "formula").length;
  const input = { number: c.number, classLabel: c.classLabel, bookTitle: ebook.title, chapter: notes, head };
  // Notes chapters carry each concept's diagram, styled by the site's own classes.
  const html =
    ebook.kind === "formula"
      ? buildFormulaChapterHtml(input)
      : buildNotesChapterHtml({ ...input, head: head + diagramHead, renderDiagram });
  const pdf = await printPdf(html, { timeoutMs: PRINT_TIMEOUT_MS });
  const detail = ebook.kind === "formula" ? `${counts.formulas} formulas` : `${notes.slugs.length} topics`;
  console.log(`  ${String(c.number).padStart(2)}. ${c.name.padEnd(40)} ${detail}`);
  return { chapter: c, pdf, detail };
}

function coverStats(ebook: EbookDefinition, chapters: number, t: Totals): { value: string; label: string }[] {
  const n = (x: number) => x.toLocaleString("en-IN");
  if (ebook.kind === "papers") {
    const from = Math.min(...t.years);
    const to = Math.max(...t.years);
    return [
      { value: String(chapters), label: "board papers" },
      { value: from === to ? String(from) : `${from}-${String(to).slice(2)}`, label: "years" },
      { value: n(t.questions), label: "questions" },
      { value: "Full", label: "solutions" },
    ];
  }
  if (ebook.kind === "repeats") {
    return [
      { value: String(chapters), label: "chapters" },
      { value: n(t.repeats), label: "asked again" },
      { value: n(t.types), label: "recurring types" },
      { value: "Full", label: "solutions" },
    ];
  }
  if (ebook.kind === "chapterwise") {
    const from = Math.min(...t.years);
    const to = Math.max(...t.years);
    return [
      { value: String(chapters), label: "chapters" },
      { value: n(t.questions), label: "questions" },
      { value: from === to ? String(from) : `${from}-${String(to).slice(2)}`, label: "years" },
      { value: "Full", label: "solutions" },
    ];
  }
  if (ebook.kind === "textbook") {
    return [
      { value: String(chapters), label: "chapters" },
      { value: n(t.topics), label: "exercises" },
      { value: n(t.questions), label: "questions" },
      { value: "Full", label: "solutions" },
    ];
  }
  if (ebook.kind === "pyq") {
    return [
      { value: n(t.questions), label: "questions" },
      { value: String(chapters), label: "chapters" },
      { value: ebook.years.replace(/^(\d{4})-\d\d(\d\d)$/, "$1-$2"), label: "sittings" },
      { value: "Full", label: "solutions" },
    ];
  }
  if (ebook.kind === "formula") {
    return [
      { value: String(chapters), label: "chapters" },
      { value: n(t.formulas), label: "formulas" },
      { value: n(t.tables), label: "tables" },
      { value: n(t.traps), label: "traps" },
    ];
  }
  return [
    { value: String(chapters), label: "chapters" },
    { value: n(t.topics), label: "topics" },
    { value: n(t.examples), label: "examples" },
    { value: n(t.traps), label: "traps" },
  ];
}

async function buildBook(
  client: SupabaseClient,
  anon: SupabaseClient,
  ebook: EbookDefinition,
  only: string[] | undefined
): Promise<void> {
  const started = Date.now();
  const head = pdfHead();
  const diagramHead = ebook.kind === "notes" ? `<style>${await buildDiagramCss()}</style>` : "";
  const renderDiagram = ebook.kind === "notes" ? await loadDiagramRenderer() : undefined;
  console.log(`\n${KIND_LABEL[ebook.kind]} · ${ebook.title}  (${ebook.slug})`);
  const { data: row, error: rowErr } = await client.from("ebooks").select("version, active").eq("slug", ebook.slug).maybeSingle();
  if (APPLY && (rowErr || !row)) throw new Error(`no ebooks row "${ebook.slug}": ${rowErr?.message ?? "apply migration 0173 first"}`);

  const outDir = join(process.cwd(), "generated-papers", "ebooks", ebook.slug);
  mkdirSync(join(outDir, "parts"), { recursive: true });
  const totals: Totals = { questions: 0, formulas: 0, tables: 0, traps: 0, topics: 0, examples: 0, years: [], repeats: 0, types: 0 };
  const pyqCtx: PyqContext = { metaByChapter: new Map() };
  if (ebook.kind === "pyq") {
    for (const m of await loadBookMeta(client, getBookBySlug(ebook.bookSlug)!)) {
      pyqCtx.metaByChapter.set(m.chapterName, [...(pyqCtx.metaByChapter.get(m.chapterName) ?? []), m]);
    }
  }

  let built: Built[] = [];
  let boardCover = "";
  if (ebook.kind === "papers") {
    ({ built, preview: boardCover } = await buildPaperChapters(client, anon, ebook, only, totals, head));
  } else if (ebook.kind === "repeats") {
    ({ built, preview: boardCover } = await buildRepeatChapters(client, anon, ebook, only, totals, head));
  } else if (ebook.kind === "chapterwise") {
    ({ built, preview: boardCover } = await buildChapterwiseChapters(client, anon, ebook, only, totals, head));
  } else if (ebook.kind === "textbook") {
    ({ built, preview: boardCover } = await buildTextbookChapters(client, anon, ebook, only, totals, head));
  } else {
    for (const c of ebookChapters(ebook).filter((c) => !only || only.includes(c.slug))) {
      built.push(
        ebook.kind === "pyq"
          ? await buildPyqChapter(client, ebook, c, pyqCtx, totals, head)
          : await buildNotesChapter(ebook, c, totals, head, diagramHead, renderDiagram)
      );
    }
  }
  for (const b of built) writeFileSync(join(outDir, "parts", `${String(b.chapter.number).padStart(2, "0")}-${b.chapter.slug}.pdf`), b.pdf);

  const sheetHead = `Chapter ${built[0].chapter.number} · ${built[0].chapter.name}`;
  const preview = isBoardEbook(ebook)
    ? boardCover
    : ebook.kind === "pyq"
      ? pyqCtx.firstQuestion
        ? pyqPreview(pyqCtx.firstQuestion.q, pyqCtx.firstQuestion.sitting, pyqCtx.firstQuestion.chapter)
        : ""
      : ebook.kind === "formula"
        ? formulaPreview(built[0].chapter.notes!, sheetHead)
        : notesPreview(built[0].chapter.notes!, sheetHead);
  // The MHT-CET books' covers carry a line for the buyer's name (2026-10-28);
  // the board books' gain one when their covers are next printed.
  const namePlate = !isBoardEbook(ebook);

  // Front matter last: its contents page needs every chapter's first page.
  const counts = await pageCounts(built.map((b) => b.pdf));
  const frontFor = (frontPages: number) => {
    let page = frontPages + 1;
    const contents = built.map((b, i) => {
      const entry = { number: b.chapter.number, name: b.chapter.name, detail: b.detail, page };
      page += counts[i];
      return entry;
    });
    const html = buildEbookFrontHtml({
      kind: ebook.kind,
      title: ebook.title,
      subtitle: ebook.subtitle,
      stats: coverStats(ebook, built.length, totals),
      preview,
      // The exam or board line over the subject; the edition is the newest year in the book.
      cover: isBoardEbook(ebook)
        ? {
            over: ebook.board,
            main: ebook.subjectTitle,
            // The newest year in the book; a textbook book names no years, so the year it was built.
            edition: `${totals.years.length ? Math.max(...totals.years) : new Date().getFullYear()} Edition`,
          }
        : {
            over: "MHT-CET",
            main: ebook.title.replace(/^MHT-CET\s+/, ""),
            // A PYQ book's newest sitting; a Formula or Notes book's, the year it was built.
            edition: `${ebook.kind === "pyq" ? ebook.years.slice(-4) : new Date().getFullYear()} Edition`,
            namePlate,
          },
      chapters: contents,
      head,
    });
    return { contents, html };
  };
  let frontPages = 2;
  let front = frontFor(frontPages);
  let frontPdf = await printFront(front.html);
  const actual = (await pageCounts([frontPdf]))[0];
  if (actual !== frontPages) {
    frontPages = actual;
    front = frontFor(frontPages);
    frontPdf = await printFront(front.html);
  }

  const footer = `PYQ Vault  ·  ${ebook.title} ${KIND_LABEL[ebook.kind]}`;
  const master = await assembleMaster([frontPdf, ...built.map((b) => b.pdf)], { footer, paper: PAPER });
  // A Solved Papers book's sample is its newest paper, which it prints first; a
  // Repeated or Chapter-wise PYQs book's is its fullest chapter, the one that shows most of the book.
  const sampleBuilt =
    ebook.kind === "papers"
      ? built[0]
      : isBoardEbook(ebook)
        ? [...built].sort((a, b) => parseInt(b.detail, 10) - parseInt(a.detail, 10))[0]
        : built.find((b) => b.chapter.slug === ebook.sampleChapter);
  const sampleJoined = sampleBuilt
    ? await assembleMaster([frontPdf, sampleBuilt.pdf], { footer: `${footer}  ·  Free sample`, paper: PAPER })
    : null;
  // A visitor sees where their name goes before they buy.
  const sample = sampleJoined && namePlate ? await stampCoverName(sampleJoined, "Your name here", "placeholder") : sampleJoined;
  const masterPages = (await pageCounts([master]))[0];
  const summary = {
    pageCount: masterPages,
    questionCount: ebook.kind === "pyq" || isBoardEbook(ebook) ? totals.questions : null,
    stats: coverStats(ebook, built.length, totals),
    contents: front.contents,
  };
  writeFileSync(join(outDir, "master.pdf"), master);
  if (sample) writeFileSync(join(outDir, "sample.pdf"), sample);
  writeFileSync(join(outDir, "contents.json"), JSON.stringify(summary, null, 2));
  console.log(
    `  master: ${masterPages} pages, ${(master.length / 1e6).toFixed(1)} MB` +
      `${sample ? ` · sample ${(sample.length / 1e6).toFixed(1)} MB` : ""} · built in ${Math.round((Date.now() - started) / 1000)}s`
  );

  if (!APPLY) return;
  if (only) throw new Error("refusing --apply with --only: a partial book must never become the master");
  if (!sample) throw new Error(`the sample chapter of ${ebook.slug} was not built`);
  const version = (row!.version as number) + 1;
  const masterPath = `${ebook.slug}/v${version}/master.pdf`;
  const samplePath = `${ebook.slug}/v${version}/sample.pdf`;
  for (const [path, bytes] of [
    [masterPath, master],
    [samplePath, sample],
  ] as const) {
    const { error } = await client.storage.from("ebooks").upload(path, bytes, { contentType: "application/pdf", upsert: true });
    if (error) throw new Error(`upload ${path} failed: ${error.message}`);
  }
  const { error: updErr } = await client
    .from("ebooks")
    .update({
      file_path: masterPath,
      sample_path: samplePath,
      version,
      page_count: masterPages,
      question_count: summary.questionCount,
      stats: summary.stats,
      contents: summary.contents,
      name_plate: namePlate,
      built_at: new Date().toISOString(),
    })
    .eq("slug", ebook.slug);
  if (updErr) throw new Error(`ebooks row update failed: ${updErr.message}`);
  console.log(`  UPLOADED v${version}. The book stays ${row!.active ? "ON" : "OFF"}.`);
}

async function main() {
  const slug = arg("book");
  const books = process.argv.includes("--all") ? EBOOKS : slug && getEbook(slug) ? [getEbook(slug)!] : [];
  if (books.length === 0) throw new Error(`--book=<slug> or --all; known: ${EBOOKS.map((e) => e.slug).join(", ")}`);
  const only = arg("only")?.split(",");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false },
  });
  for (const book of books) await buildBook(client, anon, book, only);
  if (!APPLY) console.log("\nDRY RUN: nothing uploaded. Re-run with --apply to upload and record each version.\n");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
