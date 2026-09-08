/**
 * Print the book's CHAPTER INDEX — the contents page.
 *
 *   npx tsx scripts/vocab/print-contents.ts            # authored vs expected
 *   npx tsx scripts/vocab/print-contents.ts --planned  # expected only, no DB
 *
 * Distinct from the back-of-book A-Z index (print-index.ts): this is the front
 * matter a reader uses to find a PART, that one is what they use to find a WORD.
 *
 * Counts are shown as authored/expected so the contents doubles as the build's
 * progress view — a chapter that is short is visible here rather than only in a
 * script's output.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { CADET_VOCAB } from "../../src/lib/vocab/registry";

const PLANNED = process.argv.includes("--planned");

async function authoredCounts(): Promise<Map<string, number>> {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data, error } = await db
    .from("vocab_entries")
    .select("chapter_slug")
    .eq("book_slug", CADET_VOCAB.slug)
    .eq("excluded", false);
  if (error) throw error;
  const m = new Map<string, number>();
  for (const r of data ?? []) m.set(r.chapter_slug, (m.get(r.chapter_slug) ?? 0) + 1);
  return m;
}

async function main() {
  const have = PLANNED ? new Map<string, number>() : await authoredCounts();

  console.log(`\n${CADET_VOCAB.title}`);
  console.log(`${CADET_VOCAB.subtitle}\n`);
  console.log("CONTENTS\n");

  let expTotal = 0;
  let haveTotal = 0;

  for (const part of CADET_VOCAB.parts) {
    const chapters = CADET_VOCAB.chapters.filter((c) => c.part === part.key);
    const exp = chapters.reduce((n, c) => n + c.expected, 0);
    const got = chapters.reduce((n, c) => n + (have.get(c.slug) ?? 0), 0);
    expTotal += exp;
    haveTotal += got;

    console.log(`  ${part.ordinal} — ${part.title}`);
    console.log(`     ${part.blurb}`);
    for (const c of chapters) {
      const g = have.get(c.slug) ?? 0;
      const bar = PLANNED ? `${c.expected}` : `${String(g).padStart(4)} / ${c.expected}`;
      console.log(`       ${c.label.padEnd(6)} ${bar}`);
    }
    console.log(`       ${"".padEnd(6)} ${PLANNED ? exp : `${String(got).padStart(4)} / ${exp}`}   (part total)\n`);
  }

  console.log("  Index (A-Z, every word)            8 pages at 1,492 · 17 at 3,407\n");
  console.log(
    PLANNED
      ? `  ${CADET_VOCAB.chapters.length} chapters · ${expTotal} entries planned`
      : `  ${CADET_VOCAB.chapters.length} chapters · ${haveTotal} of ${expTotal} entries authored`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
