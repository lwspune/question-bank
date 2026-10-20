/**
 * Build an ebook's master PDF and its free sample (2026-10-20).
 *
 *   npm run ebooks:build -- --book=mht-cet-maths                   # print locally, write nothing to the DB
 *   npm run ebooks:build -- --book=mht-cet-maths --only=circle     # one chapter, for a quick look
 *   npm run ebooks:build -- --book=mht-cet-maths --apply           # also upload + record the new version
 *
 * READS THE BANK, not the stored `/books` curation: the stored book lags the
 * bank between syncs (on 2026-10-20 it held 2,228 of 3,388 MHT-CET Maths
 * rows), and it had no hand edits, only the repeat collapse, which this
 * repeats here with the same rule (lib/books/recurrence: only groups with no
 * review reason are collapsed; the rest print every copy).
 *
 * PRINTS ONE CHAPTER AT A TIME with the local browser (the same printer as the
 * paper download), then joins the parts and numbers the pages
 * (lib/ebooks/pdfAssemble). The cover and contents are printed LAST, once
 * every chapter's page count is known.
 *
 * --apply uploads the master and the sample to the private `ebooks` bucket
 * under a new version and records it on the `ebooks` row. It never switches
 * the book on: that is the owner's call, once they have read the PDF.
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
import { buildEbookChapterHtml, buildEbookFrontHtml } from "../../src/lib/ebooks/bookHtml";
import { ebookChapters, getEbook } from "../../src/lib/ebooks/catalog";
import { assembleMaster, pageCounts } from "../../src/lib/ebooks/pdfAssemble";

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

type BuiltChapter = { number: number; name: string; pdf: Uint8Array; printed: number; collapsed: number; review: number };

async function main() {
  const slug = arg("book");
  const ebook = slug ? getEbook(slug) : null;
  if (!ebook) throw new Error(`--book=<slug> required; known: mht-cet-maths`);
  const book = getBookBySlug(ebook.bookSlug)!;
  const only = arg("only")?.split(",");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // The row is only needed to record a version (--apply); a dry run prints from the catalog.
  const { data: row, error: rowErr } = await client.from("ebooks").select("version, active").eq("slug", ebook.slug).maybeSingle();
  if (APPLY && (rowErr || !row)) throw new Error(`no ebooks row "${ebook.slug}": ${rowErr?.message ?? "apply migration 0172 first"}`);

  const outDir = join(process.cwd(), "generated-papers", "ebooks", ebook.slug);
  mkdirSync(join(outDir, "parts"), { recursive: true });

  const meta = await loadBookMeta(client, book);
  const metaByChapter = new Map<string, BookMetaRow[]>();
  for (const m of meta) metaByChapter.set(m.chapterName, [...(metaByChapter.get(m.chapterName) ?? []), m]);
  const bySourceFile = mhtCetSittingBySourceFile();
  const head = pdfHead();

  const chapters = ebookChapters(ebook).filter((c) => !only || only.includes(c.chapter.slug));
  const built: BuiltChapter[] = [];
  const started = Date.now();

  for (const c of chapters) {
    const t0 = Date.now();
    const metas = metaByChapter.get(c.chapter.name) ?? [];
    const sections = buildChapterSections(metas, book.sections, c.chapter.groupSubtopics);
    const ids = sections.flatMap((s) => s.sets.flatMap((set) => set.questionIds));
    const questions = await loadQuestions(client, ids);

    // Repeats: collapse only the groups the core calls safe.
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
          chapter: c.chapter.name,
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
    const [paperImages, keyImages] = await Promise.all([
      imageDataUris(client, "paper", list),
      imageDataUris(client, "key", list),
    ]);
    const html = buildEbookChapterHtml({
      number: c.number,
      name: c.chapter.name,
      bookTitle: ebook.title,
      formulas: c.formulas,
      sections,
      questionsById: questions,
      excludedIds,
      recurrence,
      images: new Map([...paperImages, ...keyImages]),
      head,
    });
    const pdf = await printPdf(html, { timeoutMs: PRINT_TIMEOUT_MS });
    const file = join(outDir, "parts", `${String(c.number).padStart(2, "0")}-${c.chapter.slug}.pdf`);
    writeFileSync(file, pdf);
    const printed = ids.filter((id) => questions.has(id) && !excludedIds.has(id)).length;
    const missing = ids.length - questions.size;
    built.push({
      number: c.number,
      name: c.chapter.name,
      pdf,
      printed,
      collapsed: excludedIds.size,
      review: groups.filter((g) => g.review.length > 0).length,
    });
    console.log(
      `  ${String(c.number).padStart(2)}. ${c.chapter.name.padEnd(36)} ${String(printed).padStart(4)} q` +
        `  (${excludedIds.size} repeats collapsed, ${groups.filter((g) => g.review.length > 0).length} left for review` +
        `${missing ? `, ${missing} NOT LOADED` : ""})  ${(Date.now() - t0) / 1000}s`
    );
  }

  // Front matter last: its contents page needs every chapter's first page.
  const counts = await pageCounts(built.map((b) => b.pdf));
  const totalQuestions = built.reduce((n, b) => n + b.printed, 0);
  const frontFor = (frontPages: number) => {
    let page = frontPages + 1;
    const contents = built.map((b, i) => {
      const entry = { number: b.number, name: b.name, questions: b.printed, page };
      page += counts[i];
      return entry;
    });
    return {
      contents,
      html: buildEbookFrontHtml({
        title: ebook.title,
        subtitle: ebook.subtitle,
        years: ebook.years,
        totalQuestions,
        chapters: contents,
        head,
      }),
    };
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

  const footer = `PYQ Vault  ·  ${ebook.title}`;
  const master = await assembleMaster([frontPdf, ...built.map((b) => b.pdf)], { footer });
  const sampleChapter = built.find((b) => ebook.chapterOrder[b.number - 1] === ebook.sampleChapter);
  const sample = sampleChapter
    ? await assembleMaster([frontPdf, sampleChapter.pdf], { footer: `${footer}  ·  Free sample` })
    : null;

  const masterPages = (await pageCounts([master]))[0];
  writeFileSync(join(outDir, "master.pdf"), master);
  if (sample) writeFileSync(join(outDir, "sample.pdf"), sample);
  // What --apply records on the ebooks row, kept beside the PDFs for review.
  writeFileSync(
    join(outDir, "contents.json"),
    JSON.stringify({ pageCount: masterPages, questionCount: totalQuestions, contents: front.contents }, null, 2)
  );
  console.log(
    `\n  master: ${masterPages} pages, ${(master.length / 1e6).toFixed(1)} MB, ${totalQuestions} questions` +
      `${sample ? ` · sample ${(sample.length / 1e6).toFixed(1)} MB` : ""}` +
      `\n  ${join(outDir, "master.pdf")}\n  built in ${Math.round((Date.now() - started) / 1000)}s`
  );

  if (!APPLY) {
    console.log("\n  DRY RUN: nothing uploaded. Re-run with --apply to upload and record the version.\n");
    return;
  }
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
      question_count: totalQuestions,
      contents: front.contents,
      built_at: new Date().toISOString(),
    })
    .eq("slug", ebook.slug);
  if (updErr) throw new Error(`ebooks row update failed: ${updErr.message}`);
  console.log(`\n  UPLOADED v${version}: ${masterPath}, ${samplePath}. The book stays ${row!.active ? "ON" : "OFF"}.\n`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
