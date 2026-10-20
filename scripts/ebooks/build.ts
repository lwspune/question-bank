/**
 * Build ebook master PDFs and their free samples (2026-10-20).
 *
 *   npm run ebooks:build -- --book=mht-cet-maths-pyq                 # print locally, write nothing to the DB
 *   npm run ebooks:build -- --all                                    # every book in lib/ebooks/catalog
 *   npm run ebooks:build -- --book=mht-cet-maths-notes --only=circle # one chapter, for a quick look
 *   npm run ebooks:build -- --all --apply                            # also upload + record each new version
 *
 * Three kinds (lib/ebooks/catalog): Formula and Notes books come from the
 * /notes registry alone (no database read); the PYQ book reads the BANK
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
  formulaPreview,
  notesPreview,
  pyqPreview,
} from "../../src/lib/ebooks/bookHtml";
import { EBOOKS, ebookChapters, getEbook, type EbookChapter, type EbookDefinition } from "../../src/lib/ebooks/catalog";
import { assembleMaster, pageCounts } from "../../src/lib/ebooks/pdfAssemble";
import { KIND_LABEL, PAPER } from "../../src/lib/ebooks/theme";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

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
type Totals = { questions: number; formulas: number; tables: number; traps: number; topics: number; examples: number };

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

async function buildNotesChapter(ebook: EbookDefinition, c: EbookChapter, totals: Totals, head: string): Promise<Built> {
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
  const html = ebook.kind === "formula" ? buildFormulaChapterHtml(input) : buildNotesChapterHtml(input);
  const pdf = await printPdf(html, { timeoutMs: PRINT_TIMEOUT_MS });
  const detail = ebook.kind === "formula" ? `${counts.formulas} formulas` : `${notes.slugs.length} topics`;
  console.log(`  ${String(c.number).padStart(2)}. ${c.name.padEnd(40)} ${detail}`);
  return { chapter: c, pdf, detail };
}

function coverStats(ebook: EbookDefinition, chapters: number, t: Totals): { value: string; label: string }[] {
  const n = (x: number) => x.toLocaleString("en-IN");
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

async function buildBook(client: SupabaseClient, ebook: EbookDefinition, only: string[] | undefined): Promise<void> {
  const started = Date.now();
  const head = pdfHead();
  console.log(`\n${KIND_LABEL[ebook.kind]} · ${ebook.title}  (${ebook.slug})`);
  const { data: row, error: rowErr } = await client.from("ebooks").select("version, active").eq("slug", ebook.slug).maybeSingle();
  if (APPLY && (rowErr || !row)) throw new Error(`no ebooks row "${ebook.slug}": ${rowErr?.message ?? "apply migration 0173 first"}`);

  const outDir = join(process.cwd(), "generated-papers", "ebooks", ebook.slug);
  mkdirSync(join(outDir, "parts"), { recursive: true });
  const chapters = ebookChapters(ebook).filter((c) => !only || only.includes(c.slug));
  const totals: Totals = { questions: 0, formulas: 0, tables: 0, traps: 0, topics: 0, examples: 0 };
  const pyqCtx: PyqContext = { metaByChapter: new Map() };
  if (ebook.kind === "pyq") {
    for (const m of await loadBookMeta(client, getBookBySlug(ebook.bookSlug)!)) {
      pyqCtx.metaByChapter.set(m.chapterName, [...(pyqCtx.metaByChapter.get(m.chapterName) ?? []), m]);
    }
  }

  const built: Built[] = [];
  for (const c of chapters) {
    const b = ebook.kind === "pyq" ? await buildPyqChapter(client, ebook, c, pyqCtx, totals, head) : await buildNotesChapter(ebook, c, totals, head);
    writeFileSync(join(outDir, "parts", `${String(c.number).padStart(2, "0")}-${c.slug}.pdf`), b.pdf);
    built.push(b);
  }

  const preview =
    ebook.kind === "pyq"
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
      chapters: contents,
      head,
    });
    return { contents, html };
  };
  let frontPages = 2;
  let front = frontFor(frontPages);
  let frontPdf = await printPdf(front.html);
  const actual = (await pageCounts([frontPdf]))[0];
  if (actual !== frontPages) {
    frontPages = actual;
    front = frontFor(frontPages);
    frontPdf = await printPdf(front.html);
  }

  const footer = `PYQ Vault  ·  ${ebook.title} ${KIND_LABEL[ebook.kind]}`;
  const master = await assembleMaster([frontPdf, ...built.map((b) => b.pdf)], { footer, paper: PAPER });
  const sampleBuilt = built.find((b) => b.chapter.slug === ebook.sampleChapter);
  const sample = sampleBuilt
    ? await assembleMaster([frontPdf, sampleBuilt.pdf], { footer: `${footer}  ·  Free sample`, paper: PAPER })
    : null;
  const masterPages = (await pageCounts([master]))[0];
  const summary = {
    pageCount: masterPages,
    questionCount: ebook.kind === "pyq" ? totals.questions : null,
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
  if (!sample) throw new Error(`sample chapter "${ebook.sampleChapter}" was not built`);
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
  for (const book of books) await buildBook(client, book, only);
  if (!APPLY) console.log("\nDRY RUN: nothing uploaded. Re-run with --apply to upload and record each version.\n");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
