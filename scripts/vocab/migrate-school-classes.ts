/**
 * Move Part 1's 676 rows off the four letter bands and onto the eight class
 * rungs, and stamp the class provenance migration 0092 added.
 *
 *   npx tsx scripts/vocab/migrate-school-classes.ts            # dry run
 *   npx tsx scripts/vocab/migrate-school-classes.ts --apply
 *
 * AN UPDATE, NOT A DELETE-AND-RE-COMMIT. `vocab_entries` has no content hash —
 * a row is identified by (book_slug, word) — so moving a word between chapters
 * changes no identity and orphans nothing. That is NOT true of the question
 * pipelines, where `content_hash` covers the stem and a text change forces a
 * re-commit; do not carry that habit over to this table.
 *
 * THE CLASS IS READ FROM THE SOURCE, NEVER FROM THE ROW. `school-words.json`
 * carries the printed CBSE lists, and the rung is the LOWEST class that prints
 * the word — the class by which a student should already have it. A row whose
 * word the source never labelled is REFUSED rather than defaulted, because a
 * defaulted rung would put an invented level under a printed heading.
 *
 * POSITION IS RENUMBERED WITHIN THE RUNG, alphabetically. Entries are numbered
 * per chapter in the printed book, so a stale position from the old letter band
 * would print the numbers out of order.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { CADET_VOCAB, chapterFor } from "../../src/lib/vocab/registry";
import type { SchoolWord } from "./extract-docx";

const DATA = join(__dirname, "data");
const APPLY = process.argv.includes("--apply");

(async () => {
  const src: SchoolWord[] = JSON.parse(readFileSync(join(DATA, "school-words.json"), "utf8"));
  const classOf = new Map<string, number>();
  for (const w of src) {
    if (w.classes?.length) classOf.set(w.word.toLowerCase(), Math.min(...w.classes));
  }

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const rows: { id: string; word: string; chapter_slug: string }[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("vocab_entries")
      .select("id,word,chapter_slug")
      .eq("book_slug", CADET_VOCAB.slug)
      .eq("part", "school")
      .order("word")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    rows.push(...(data ?? []));
    if ((data ?? []).length < 1000) break;
  }
  console.log(`Part 1 rows: ${rows.length}`);

  // Refuse the WHOLE batch on any unlabelled word rather than moving the ones
  // that resolve — a half-migrated Part 1 has words stranded on chapters the
  // registry no longer declares, which renders as an empty page with no error.
  const missing = rows.filter((r) => !classOf.has(r.word.toLowerCase()));
  if (missing.length) {
    throw new Error(
      `${missing.length} Part 1 word(s) carry no class in school-words.json — REFUSING: ` +
        missing.slice(0, 10).map((r) => r.word).join(", ")
    );
  }

  const byRung = new Map<string, { id: string; word: string; from: string }[]>();
  for (const r of rows) {
    const cls = classOf.get(r.word.toLowerCase())!;
    const ch = chapterFor(CADET_VOCAB, "school", r.word, null, cls);
    if (!ch) throw new Error(`${r.word}: no rung declared for Class ${cls} — REFUSING`);
    const list = byRung.get(ch.slug) ?? [];
    list.push({ id: r.id, word: r.word, from: r.chapter_slug });
    byRung.set(ch.slug, list);
  }

  const updates: { id: string; chapter_slug: string; position: number; school_class: number }[] = [];
  for (const ch of CADET_VOCAB.chapters.filter((c) => c.part === "school")) {
    const list = (byRung.get(ch.slug) ?? []).sort((a, b) => a.word.localeCompare(b.word));
    console.log(
      `  ${ch.slug.padEnd(16)} ${String(list.length).padStart(3)} words` +
        `   (target ${ch.expected})`
    );
    list.forEach((w, i) =>
      updates.push({
        id: w.id,
        chapter_slug: ch.slug,
        position: (i + 1) * 100,
        school_class: ch.schoolClass!,
      })
    );
  }

  if (updates.length !== rows.length) {
    throw new Error(`accounting: ${updates.length} updates for ${rows.length} rows — REFUSING`);
  }
  if (!APPLY) {
    console.log(`\n[dry-run] ${updates.length} rows would move. Pass --apply to write.`);
    return;
  }

  for (const u of updates) {
    const { error } = await db
      .from("vocab_entries")
      .update({
        chapter_slug: u.chapter_slug,
        position: u.position,
        school_class: u.school_class,
        // Every row here came from the printed CBSE lists by construction — the
        // fill words are committed through commit-entries, which stamps
        // 'authored' from the roster.
        school_source: "cbse",
      })
      .eq("id", u.id);
    if (error) throw new Error(`${u.id}: ${error.message}`);
  }
  console.log(`\napplied: ${updates.length} rows re-filed onto the class ladder.`);
})();
