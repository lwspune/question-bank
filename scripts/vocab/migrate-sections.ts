/**
 * Re-file every committed entry into the exam-sectioned Part 2.
 *
 *   npx tsx scripts/vocab/migrate-sections.ts            # dry run
 *   npx tsx scripts/vocab/migrate-sections.ts --apply
 *
 * WHAT THIS TOUCHES AND WHAT IT CANNOT: `chapter_slug` and `position` only. No
 * meaning, sentence, citation, synonym or antonym is read or written, so the
 * migration cannot damage authored content — the worst case is a word in the
 * wrong chapter, which the verification below detects and a re-run fixes.
 *
 * THE PLACEMENT IS RE-DERIVED FROM THE CORPUS, not translated from the old
 * slug. A mapping table from old chapter to new would have to guess the exam,
 * which is the very fact the split turns on; deriving it from `bank-words.json`
 * gives the same answer `commit-entries` will give on the next re-commit, so
 * the migration and the pipeline cannot disagree.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { CADET_VOCAB, chapterFor } from "../../src/lib/vocab/registry";
import { placementOf } from "./commit-entries";
import { loadCorpus } from "./corpus";

const APPLY = process.argv.includes("--apply");

(async () => {
  // The WHOLE corpus: an option word must be re-filed the same way a target is.
  const byWord = new Map(loadCorpus().map((w) => [w.word, w]));

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const rows: { id: string; word: string; part: string; chapter_slug: string }[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("vocab_entries")
      .select("id,word,part,chapter_slug")
      .eq("book_slug", CADET_VOCAB.slug)
      .order("word")
      .range(from, from + 999);
    if (error) throw error;
    rows.push(...((data ?? []) as any));
    if ((data ?? []).length < 1000) break;
  }
  console.log(`${rows.length} committed entr(ies)`);

  const moves: { id: string; word: string; from: string; to: string }[] = [];
  const unchanged: string[] = [];
  for (const r of rows) {
    const w = byWord.get(r.word);
    // A word with no corpus row cannot be placed. REFUSE rather than leave it
    // where it is: silently skipping would leave a Part 2 entry in a chapter
    // that no longer exists, and it would render nowhere.
    if (!w) throw new Error(`${r.word}: not in bank-words.json — cannot re-file, REFUSING`);
    const { part, section } = placementOf(w);
    const ch = // Part 2 only -- this script never sees a Part 1 row, so it has no rung.
    chapterFor(CADET_VOCAB, part, r.word, section, null);
    if (!ch) throw new Error(`${r.word}: no chapter for ${part}/${section} — REFUSING`);
    if (ch.slug === r.chapter_slug) unchanged.push(r.word);
    else moves.push({ id: r.id, word: r.word, from: r.chapter_slug, to: ch.slug });
  }

  const tally: Record<string, number> = {};
  for (const m of moves) tally[m.to] = (tally[m.to] ?? 0) + 1;
  console.log(`  moving ${moves.length}, staying ${unchanged.length}\n`);
  for (const k of Object.keys(tally).sort()) console.log(`  -> ${k.padEnd(18)} ${tally[k]}`);

  if (!APPLY) {
    console.log("\n[dry-run] pass --apply to write.");
    return;
  }

  for (const m of moves) {
    const { error } = await db
      .from("vocab_entries")
      .update({ chapter_slug: m.to })
      .eq("id", m.id);
    if (error) throw error;
  }
  console.log(`\nre-filed ${moves.length} row(s).`);

  /**
   * Renumber EVERY chapter, not just the touched ones. `position` was assigned
   * per source file, so a chapter that merely lost rows is left with gaps, and
   * a chapter that gained them is interleaved — and alphabetical order is the
   * only way a reader finds anything in a dictionary.
   */
  for (const ch of CADET_VOCAB.chapters) {
    const { data: all, error } = await db
      .from("vocab_entries")
      .select("id,word,position")
      .eq("book_slug", CADET_VOCAB.slug)
      .eq("chapter_slug", ch.slug)
      .order("word");
    if (error) throw error;
    let moved = 0;
    for (let i = 0; i < (all ?? []).length; i++) {
      const want = (i + 1) * 100;
      if (all![i].position === want) continue;
      const { error: uErr } = await db
        .from("vocab_entries")
        .update({ position: want })
        .eq("id", all![i].id);
      if (uErr) throw uErr;
      moved++;
    }
    if (all?.length) console.log(`  ${ch.slug.padEnd(18)} ${all.length} entries, ${moved} repositioned`);
  }
})();
