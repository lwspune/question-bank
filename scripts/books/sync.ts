/**
 * Assemble a book's contents, and keep them in step with the bank.
 *
 *   npx tsx scripts/books/sync.ts                     # dry run (default)
 *   npx tsx scripts/books/sync.ts --apply             # write
 *   npx tsx scripts/books/sync.ts --book=nda-cds-english
 *
 * The FIRST run seeds `book_questions` from the derived order — what
 * `src/lib/books/order.ts` says the book should be. Later runs only ever ADD:
 * anything already in the book keeps its position, its `excluded` flag and its
 * note, because those are curation decisions and a sync that overwrites them
 * is worse than no sync at all. Everything else is reported for a human — see
 * `src/lib/books/sync.ts` for why orphans and re-chapterings are never applied
 * automatically.
 *
 * Service-role: `books` and `book_questions` have RLS on and NO policies, so
 * they are unreachable by any other key. That is the design, not an oversight.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { buildChapterSections } from "../../src/lib/books/order";
import { loadBookMeta } from "../../src/lib/books/query";
import { planBookSync, type DerivedRow, type StoredRow } from "../../src/lib/books/sync";
import { BOOKS, getBookBySlug, type BookDefinition } from "../../src/lib/books/registry";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const PAGE = 1000;
const WRITE_CHUNK = 500;

function arg(name: string): string | undefined {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
}

/** The book row, created on first sync so the registry stays the only place a book is DECLARED. */
async function ensureBookRow(client: SupabaseClient, book: BookDefinition): Promise<string> {
  const { data: existing, error } = await client
    .from("books")
    .select("id")
    .eq("slug", book.slug)
    .maybeSingle();
  if (error) throw new Error(`books row lookup failed — ${error.message}`);
  if (existing) return existing.id as string;

  if (!APPLY) return "(would be created)";
  const { data, error: insErr } = await client
    .from("books")
    .insert({ slug: book.slug })
    .select("id")
    .single();
  if (insErr) throw new Error(`books row insert failed — ${insErr.message}`);
  return data.id as string;
}

/** Every stored row for this book, paged under the 1000-row cap. */
async function loadStored(client: SupabaseClient, bookId: string): Promise<StoredRow[]> {
  const rows: StoredRow[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client
      .from("book_questions")
      .select("question_id, chapter_slug, section_key, position, excluded")
      .eq("book_id", bookId)
      .order("question_id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`book_questions read failed — ${error.message}`);
    for (const r of data ?? []) {
      rows.push({
        questionId: r.question_id,
        chapterSlug: r.chapter_slug,
        sectionKey: r.section_key,
        position: r.position,
        excluded: r.excluded,
      });
    }
    if (!data || data.length < PAGE) break;
  }
  return rows;
}

/** What the bank says the book should be, flattened to one row per question. */
async function loadDerived(
  client: SupabaseClient,
  book: BookDefinition
): Promise<DerivedRow[]> {
  const meta = await loadBookMeta(client, book);
  const byChapter = new Map<string, typeof meta>();
  for (const row of meta) {
    const list = byChapter.get(row.chapterName) ?? [];
    list.push(row);
    byChapter.set(row.chapterName, list);
  }

  const out: DerivedRow[] = [];
  for (const chapter of book.chapters) {
    const sections = buildChapterSections(byChapter.get(chapter.name) ?? []);
    for (const section of sections) {
      let order = 0;
      for (const set of section.sets) {
        for (const questionId of set.questionIds) {
          out.push({
            questionId,
            chapterSlug: chapter.slug,
            sectionKey: section.key,
            order: order++,
          });
        }
      }
    }
  }
  return out;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY required");
  const client = createClient(url, key, { auth: { persistSession: false } });

  const slug = arg("book");
  const books = slug ? [getBookBySlug(slug)] : BOOKS;
  if (books.some((b) => !b)) throw new Error(`no book with slug "${slug}"`);

  for (const book of books as BookDefinition[]) {
    console.log(`\n${book.title}  (${book.slug})`);
    console.log("-".repeat(70));

    const bookId = await ensureBookRow(client, book);
    const derived = await loadDerived(client, book);
    const stored = bookId.startsWith("(") ? [] : await loadStored(client, bookId);
    const plan = planBookSync(derived, stored);

    console.log(`  bank says      ${derived.length} questions`);
    console.log(`  book holds     ${stored.length} rows`);
    console.log(`  to add         ${plan.inserts.length}`);
    console.log(`  unchanged      ${plan.unchanged}`);
    console.log(`  orphaned       ${plan.orphans.length}  (in the book, no longer in the bank)`);
    console.log(`  re-chaptered   ${plan.rechaptered.length}  (the bank moved these; the book keeps them where they are)`);

    for (const o of plan.orphans.slice(0, 20)) {
      console.log(`    ! orphan ${o.questionId}  ${o.chapterSlug}/${o.sectionKey}${o.excluded ? "  [excluded]" : ""}`);
    }
    if (plan.orphans.length > 20) console.log(`    … ${plan.orphans.length - 20} more`);
    for (const r of plan.rechaptered.slice(0, 20)) {
      console.log(`    ~ ${r.questionId}  ${r.from} -> ${r.to}`);
    }
    if (plan.rechaptered.length > 20) console.log(`    … ${plan.rechaptered.length - 20} more`);

    // Per-chapter breakdown of what would land, so the shape is legible before
    // 3,180 rows are written.
    const perChapter = new Map<string, number>();
    for (const i of plan.inserts) {
      const key = `${i.chapterSlug}/${i.sectionKey}`;
      perChapter.set(key, (perChapter.get(key) ?? 0) + 1);
    }
    if (perChapter.size) {
      console.log("\n  adds by chapter/section:");
      for (const chapter of book.chapters) {
        const nda = perChapter.get(`${chapter.slug}/nda`) ?? 0;
        const cds = perChapter.get(`${chapter.slug}/cds`) ?? 0;
        if (nda || cds) {
          console.log(`    ${chapter.slug.padEnd(24)} NDA ${String(nda).padStart(4)}   CDS ${String(cds).padStart(4)}`);
        }
      }
    }

    if (!APPLY) {
      console.log("\n  DRY RUN — nothing written. Re-run with --apply.");
      continue;
    }

    if (plan.inserts.length) {
      for (let i = 0; i < plan.inserts.length; i += WRITE_CHUNK) {
        const batch = plan.inserts.slice(i, i + WRITE_CHUNK).map((r) => ({
          book_id: bookId,
          question_id: r.questionId,
          chapter_slug: r.chapterSlug,
          section_key: r.sectionKey,
          position: r.position,
        }));
        const { error } = await client.from("book_questions").insert(batch);
        if (error) throw new Error(`insert failed at row ${i} — ${error.message}`);
        console.log(`  wrote ${Math.min(i + WRITE_CHUNK, plan.inserts.length)}/${plan.inserts.length}`);
      }
    }

    const { error: stampErr } = await client
      .from("books")
      .update({ synced_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq("id", bookId);
    if (stampErr) throw new Error(`synced_at stamp failed — ${stampErr.message}`);

    console.log(`\n  APPLIED — ${plan.inserts.length} row(s) added.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
