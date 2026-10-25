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
  buildSolvedPaperHtml,
  formulaPreview,
  notesPreview,
  papersPreview,
  pyqPreview,
} from "../../src/lib/ebooks/bookHtml";
import { EBOOKS, ebookChapters, getEbook, type EbookChapter, type EbookDefinition, type PapersEbook } from "../../src/lib/ebooks/catalog";
import { pickBookPapers } from "../../src/lib/ebooks/boardPapers";
import { getExamBySlug } from "../../src/lib/exam/examContext";
import { getBoardPaperForExport, listPublishedPapers } from "../../src/lib/questionPapers/query";
import { boardPaperExport } from "../../src/lib/questionPapers/exportPlan";
import type { VisualizationSlug } from "../../src/app/notes/_types";
import { assembleMaster, pageCounts } from "../../src/lib/ebooks/pdfAssemble";
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
  /** Solved Papers: the year of each paper printed. */
  years: number[];
};

/** Shared by every PYQ chapter of one book: the bank's ordering facts, read once. */
type PyqContext = { metaByChapter: Map<string, BookMetaRow[]>; firstQuestion?: { q: QuestionRow; sitting: string } };

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
    if (first && m) ctx.firstQuestion = { q: first, sitting: sittingLabel(m.exam, m.pyqYear, sittingOrdinal(m)) };
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
  if (ebook.kind === "pyq") {
    return [
      { value: n(t.questions), label: "past questions" },
      { value: String(chapters), label: "chapters" },
      { value: ebook.years.replace(/^(\d{4})-\d\d(\d\d)$/, "$1-$2"), label: "every sitting" },
      { value: "Full", label: "solutions" },
    ];
  }
  if (ebook.kind === "formula") {
    return [
      { value: String(chapters), label: "chapters" },
      { value: n(t.formulas), label: "formulas" },
      { value: n(t.tables), label: "reference tables" },
      { value: n(t.traps), label: "traps explained" },
    ];
  }
  return [
    { value: String(chapters), label: "chapters" },
    { value: n(t.topics), label: "topics" },
    { value: n(t.examples), label: "worked examples" },
    { value: n(t.traps), label: "traps explained" },
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
  const totals: Totals = { questions: 0, formulas: 0, tables: 0, traps: 0, topics: 0, examples: 0, years: [] };
  const pyqCtx: PyqContext = { metaByChapter: new Map() };
  if (ebook.kind === "pyq") {
    for (const m of await loadBookMeta(client, getBookBySlug(ebook.bookSlug)!)) {
      pyqCtx.metaByChapter.set(m.chapterName, [...(pyqCtx.metaByChapter.get(m.chapterName) ?? []), m]);
    }
  }

  let built: Built[] = [];
  let papersCover = "";
  if (ebook.kind === "papers") {
    ({ built, preview: papersCover } = await buildPaperChapters(client, anon, ebook, only, totals, head));
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

  const preview =
    ebook.kind === "papers"
      ? papersCover
      : ebook.kind === "pyq"
      ? pyqCtx.firstQuestion
        ? pyqPreview(pyqCtx.firstQuestion.q, pyqCtx.firstQuestion.sitting)
        : ""
      : ebook.kind === "formula"
        ? formulaPreview(built[0].chapter.notes!)
        : notesPreview(built[0].chapter.notes!);

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
      // The Solved Papers books wear the premium cover; its edition is the newest paper's year.
      cover:
        ebook.kind === "papers"
          ? { over: ebook.board, main: ebook.subjectTitle, edition: `${Math.max(...totals.years)} Edition` }
          : undefined,
      chapters: contents,
      head,
    });
    return { contents, html };
  };
  let frontPages = 2;
  let front = frontFor(frontPages);
  // The chapters' long limit here too: a cold browser has taken over the default 45 s on a one-page cover.
  let frontPdf = await printPdf(front.html, { timeoutMs: PRINT_TIMEOUT_MS });
  const actual = (await pageCounts([frontPdf]))[0];
  if (actual !== frontPages) {
    frontPages = actual;
    front = frontFor(frontPages);
    frontPdf = await printPdf(front.html, { timeoutMs: PRINT_TIMEOUT_MS });
  }

  const footer = `PYQ Vault  ·  ${ebook.title} ${KIND_LABEL[ebook.kind]}`;
  const master = await assembleMaster([frontPdf, ...built.map((b) => b.pdf)], { footer, paper: PAPER });
  // A Solved Papers book's sample is its newest paper, which it prints first.
  const sampleBuilt = ebook.kind === "papers" ? built[0] : built.find((b) => b.chapter.slug === ebook.sampleChapter);
  const sample = sampleBuilt
    ? await assembleMaster([frontPdf, sampleBuilt.pdf], { footer: `${footer}  ·  Free sample`, paper: PAPER })
    : null;
  const masterPages = (await pageCounts([master]))[0];
  const summary = {
    pageCount: masterPages,
    questionCount: ebook.kind === "pyq" || ebook.kind === "papers" ? totals.questions : null,
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
