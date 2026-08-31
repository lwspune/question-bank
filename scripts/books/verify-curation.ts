/**
 * Exercise the curation writes against the live book, then put everything back.
 *
 *   npx tsx scripts/books/verify-curation.ts
 *   npx tsx scripts/books/verify-curation.ts --chapter=fill-in-the-blanks
 *
 * WHY: the curation controls live in a client component on an auth-gated,
 * `force-dynamic` page, so `next build` never renders them and no headless
 * check can click them. The pure planners are unit-tested, but nothing else
 * proves the SERVICE layer actually writes what the planner planned. This does,
 * against real rows.
 *
 * It is safe to run on production because every operation is ROUND-TRIPPED: the
 * full ordering is fingerprinted first, each change is applied and asserted,
 * the inverse is applied, and the fingerprint must come back BYTE-IDENTICAL.
 * A move that does not invert is itself a failure worth catching. If the script
 * dies mid-way it says so and prints the affected chapter, and `books:sync`
 * will not repair order — re-run this, or fix by hand.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { buildStoredSections, sittingOrdinal, type SetMeta } from "../../src/lib/books/order";
import { loadBookMeta } from "../../src/lib/books/query";
import { moveSet, moveSetToSection, setQuestionExcluded } from "../../src/lib/books/service";
import { NDA_CDS_ENGLISH, getBookChapter } from "../../src/lib/books/registry";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

function arg(name: string): string | undefined {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
}

const problems: string[] = [];
function check(ok: boolean, message: string) {
  if (!ok) problems.push(message);
  console.log(`  ${ok ? "ok  " : "FAIL"}  ${message}`);
}

/** The chapter's full ordering, as one comparable string. */
async function fingerprint(
  client: SupabaseClient,
  bookId: string,
  chapterSlug: string
): Promise<string> {
  const { data, error } = await client
    .from("book_questions")
    .select("question_id, section_key, position, excluded")
    .eq("book_id", bookId)
    .eq("chapter_slug", chapterSlug)
    .order("section_key")
    .order("position")
    .order("question_id");
  if (error) throw new Error(error.message);
  return (data ?? [])
    .map((r) => `${r.section_key}:${r.question_id}:${r.excluded ? "X" : "-"}`)
    .join("\n");
}

async function sectionsOf(
  client: SupabaseClient,
  bookId: string,
  chapterSlug: string,
  chapterName: string
) {
  const { data, error } = await client
    .from("book_questions")
    .select("question_id, section_key, position")
    .eq("book_id", bookId)
    .eq("chapter_slug", chapterSlug)
    .order("position")
    .order("question_id");
  if (error) throw new Error(error.message);
  const meta = await loadBookMeta(client, NDA_CDS_ENGLISH, { chapterName });
  const metaById = new Map<string, SetMeta>(
    meta.map((m) => [m.id, { setId: m.setId, year: m.pyqYear, sitting: sittingOrdinal(m) }])
  );
  return buildStoredSections(
    (data ?? []).map((r) => ({ questionId: r.question_id, sectionKey: r.section_key })),
    metaById,
    NDA_CDS_ENGLISH.sections
  );
}

async function main() {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const book = NDA_CDS_ENGLISH;
  const slug = arg("chapter") ?? "fill-in-the-blanks";
  const chapter = getBookChapter(book, slug);
  if (!chapter) throw new Error(`no chapter "${slug}"`);

  const { data: bookRow, error } = await client
    .from("books")
    .select("id")
    .eq("slug", book.slug)
    .single();
  if (error) throw new Error(error.message);
  const bookId = bookRow.id as string;

  const before = await fingerprint(client, bookId, chapter.slug);
  console.log(`\nChapter: ${chapter.name}  (${before.split("\n").length} rows)\n`);

  // ---- 1. move a set DOWN, then back UP ----------------------------------
  const s0 = await sectionsOf(client, bookId, chapter.slug, chapter.name);
  const nda = s0[0];
  const firstKey = nda.sets[0].key;
  const firstIds = nda.sets[0].questionIds;
  console.log("move a set down, then back up");
  await moveSet(client, book, chapter, "nda", firstKey, "down");
  const s1 = await sectionsOf(client, bookId, chapter.slug, chapter.name);
  check(s1[0].sets[1]?.key === firstKey, "the moved set is now second");
  check(
    JSON.stringify(s1[0].sets[1]?.questionIds) === JSON.stringify(firstIds),
    "the set stayed intact and in order while moving"
  );
  check(
    s1[0].sets.flatMap((x) => x.questionIds).length ===
      nda.sets.flatMap((x) => x.questionIds).length,
    "no question was lost or duplicated by the move"
  );
  await moveSet(client, book, chapter, "nda", firstKey, "up");
  check(
    (await fingerprint(client, bookId, chapter.slug)) === before,
    "moving down then up restores the exact original order"
  );

  // ---- 2. refuse a move with nowhere to go -------------------------------
  console.log("\nrefuse an impossible move");
  check(
    (await moveSet(client, book, chapter, "nda", firstKey, "up")) === false,
    "moving the first set up is refused rather than silently doing nothing"
  );
  check(
    (await fingerprint(client, bookId, chapter.slug)) === before,
    "the refused move wrote nothing"
  );

  // ---- 3. exclude, then put back -----------------------------------------
  console.log("\nexclude a question, then put it back");
  const victim = firstIds[0];
  await setQuestionExcluded(client, book, victim, true);
  const excludedNow = await fingerprint(client, bookId, chapter.slug);
  check(excludedNow.includes(`${victim}:X`), "the question is marked excluded");
  check(
    excludedNow.split("\n").length === before.split("\n").length,
    "excluding kept the ROW — it is a flag, never a delete"
  );
  await setQuestionExcluded(client, book, victim, false);
  check(
    (await fingerprint(client, bookId, chapter.slug)) === before,
    "putting it back restores the exact original state"
  );

  // ---- 4. move a set across the two halves, then back --------------------
  console.log("\nmove a set to the other half, then back");
  await moveSetToSection(client, book, chapter, "nda", firstKey, "cds");
  const s2 = await sectionsOf(client, bookId, chapter.slug, chapter.name);
  const landed = s2[1].sets.at(-1);
  check(
    JSON.stringify(landed?.questionIds) === JSON.stringify(firstIds),
    "the whole set landed at the end of the CDS half, intact"
  );
  check(
    !s2[0].sets.some((x) => x.questionIds.includes(firstIds[0])),
    "and it is no longer in the NDA half"
  );
  const backKey = landed!.key;
  await moveSetToSection(client, book, chapter, "cds", backKey, "nda");
  // It returns to the NDA half APPENDED, so the order differs from the
  // original by design; move it back to the front to restore.
  let guard = 0;
  for (;;) {
    const s3 = await sectionsOf(client, bookId, chapter.slug, chapter.name);
    const i = s3[0].sets.findIndex((x) => x.questionIds.includes(firstIds[0]));
    if (i <= 0 || guard++ > 200) break;
    await moveSet(client, book, chapter, "nda", s3[0].sets[i].key, "up");
  }
  check(
    (await fingerprint(client, bookId, chapter.slug)) === before,
    "the chapter is byte-identical to how it started"
  );

  console.log();
  if (problems.length) {
    console.error(`FAIL — ${problems.length} problem(s). Chapter "${chapter.slug}" may be left reordered.`);
    process.exit(1);
  }
  console.log("OK — every curation operation applied, inverted, and left no trace.");
}

main().catch((err) => {
  console.error("\nERROR — the chapter may be left mid-edit:", err);
  process.exit(1);
});
