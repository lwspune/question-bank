/**
 * Re-file every Part 3 row onto the bands the registry CURRENTLY declares.
 *
 *   npx tsx scripts/vocab/migrate-practice-bands.ts            # dry run
 *   npx tsx scripts/vocab/migrate-practice-bands.ts --apply
 *
 * WHY IT EXISTS. Part 3's bands are sized against the final corpus and frozen,
 * but a corpus can grow past what was final when they were cut — the Shaktiman
 * coaching deck took it 640 -> 1,059 and three of the four bands blew the 200
 * cap. Recutting them in the registry instantly ORPHANS every existing row: its
 * `chapter_slug` names a chapter the book no longer declares, so the row is
 * invisible on the site and absent from the export, with NO error anywhere.
 * This closes that window, and it is why the recut and this run belong to the
 * same change rather than to two.
 *
 * AN UPDATE, NOT A DELETE-AND-RE-COMMIT, for the reason `migrate-school-classes`
 * gives: `vocab_entries` identifies a row by (book_slug, word), so moving a word
 * between chapters changes no identity and orphans nothing. Do not carry the
 * question pipelines' delete-and-re-commit habit here — there, `content_hash`
 * covers the stem and a text change genuinely forces one.
 *
 * THE OLD BAND FILES UNDER data/ SURVIVE A RECUT AND STILL WORK. After the
 * 2026-09-12 recut, `data/practice-a-d.json` names a chapter that no longer
 * exists -- and committing it is still CORRECT, because `commit-entries`
 * derives the chapter from `chapterFor()` and never from the filename. Verified
 * rather than assumed: a dry run of practice-a-d.json routes all 42 of its
 * words into `practice-a-c`. So those files are historical labels, not stale
 * data, and deleting them would throw away the source of record for 640 words.
 * Only their WORKSHEET is gone, since `dump-authoring` takes a live chapter.
 *
 * IDEMPOTENT, and general rather than one-shot: it reads the registry, so a
 * later recut is served by re-running it rather than by writing this again.
 * Positions are renumbered alphabetically WITHIN the band, because entries are
 * numbered per chapter in the printed book and a position carried over from a
 * different band prints the numbers out of order.
 */
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { CADET_VOCAB, chapterFor } from "../../src/lib/vocab/registry";

const APPLY = process.argv.includes("--apply");

(async () => {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const rows: { id: string; word: string; chapter_slug: string; position: number }[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("vocab_entries")
      .select("id,word,chapter_slug,position")
      .eq("book_slug", CADET_VOCAB.slug)
      .eq("part", "practice")
      .order("word")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    rows.push(...(data ?? []));
    if ((data ?? []).length < 1000) break;
  }
  console.log(`Part 3 rows: ${rows.length}`);

  // Resolve EVERY row before writing ANY of them. A half-migrated part leaves
  // rows on chapters the registry does not declare, which renders as a missing
  // page rather than as an error -- the same refusal migrate-school-classes
  // makes, and for the same reason.
  const byBand = new Map<string, { id: string; word: string; from: string }[]>();
  for (const r of rows) {
    const ch = chapterFor(CADET_VOCAB, "practice", r.word, null, null);
    if (!ch) throw new Error(`${r.word}: no Part 3 band covers it — REFUSING`);
    const list = byBand.get(ch.slug) ?? [];
    list.push({ id: r.id, word: r.word, from: r.chapter_slug });
    byBand.set(ch.slug, list);
  }

  const updates: { id: string; chapter_slug: string; position: number }[] = [];
  for (const ch of CADET_VOCAB.chapters.filter((c) => c.part === "practice")) {
    const list = (byBand.get(ch.slug) ?? []).sort((a, b) => a.word.localeCompare(b.word));
    const moving = list.filter((w) => w.from !== ch.slug).length;
    console.log(
      `  ${ch.slug.padEnd(16)} ${String(list.length).padStart(4)} words` +
        `   (target ${ch.expected})   ${moving} arriving from another band`
    );
    list.forEach((w, i) => updates.push({ id: w.id, chapter_slug: ch.slug, position: (i + 1) * 100 }));
  }

  if (updates.length !== rows.length) {
    throw new Error(`accounting: ${updates.length} updates for ${rows.length} rows — REFUSING`);
  }

  const changed = updates.filter((u) => {
    const r = rows.find((x) => x.id === u.id)!;
    return r.chapter_slug !== u.chapter_slug || r.position !== u.position;
  });
  console.log(`\n${changed.length} of ${rows.length} row(s) need a write.`);

  if (!APPLY) {
    console.log("[dry-run] pass --apply to write.");
    return;
  }
  for (const u of changed) {
    const { error } = await db
      .from("vocab_entries")
      .update({ chapter_slug: u.chapter_slug, position: u.position })
      .eq("id", u.id);
    if (error) throw new Error(`${u.id}: ${error.message}`);
  }
  console.log(`applied: ${changed.length} row(s) re-filed.`);
})();
