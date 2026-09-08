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
import { CADET_VOCAB, VOCAB_SECTIONS } from "../../src/lib/vocab/registry";

const PLANNED = process.argv.includes("--planned");

/**
 * COUNTED PER CHAPTER WITH `head: true`, NOT TALLIED FROM ROWS.
 *
 * The first version selected every row and counted them in JS. That silently
 * broke the day the book passed 1,000 entries: PostgREST truncates a raw
 * `.select()` at 1000 with no error, so the contents page under-reported every
 * chapter — Part 2 read 855 of 2,091 when 1,203 were committed. The finished
 * book is ~3,400 entries, so this could only ever have been temporary.
 *
 * `count: "exact", head: true` returns the number from a response header and
 * fetches no rows at all, which is the documented fix for this class and is
 * what `loadVocabOverview` already does.
 */
async function authoredCounts(): Promise<Map<string, number>> {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const m = new Map<string, number>();
  for (const c of CADET_VOCAB.chapters) {
    const { count, error } = await db
      .from("vocab_entries")
      .select("id", { count: "exact", head: true })
      .eq("book_slug", CADET_VOCAB.slug)
      .eq("chapter_slug", c.slug)
      .eq("excluded", false);
    if (error) throw error;
    m.set(c.slug, count ?? 0);
  }
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

    /**
     * A SECTIONED PART PRINTS ITS SECTIONS IN STUDY ORDER, because on this page
     * the order IS the instruction: a teacher reads it to tell a batch what to
     * work through first. An unsectioned part keeps the flat list.
     *
     * Sections are taken from VOCAB_SECTIONS rather than from the distinct
     * values present in the chapters, so a section that is declared but not yet
     * authored still prints — an absent heading would read as "this part has no
     * such section" rather than "nothing in it yet".
     */
    const sectioned = chapters.some((c) => c.section);
    const groups = sectioned
      ? VOCAB_SECTIONS.filter((sec) => sec.part === part.key).map((sec) => ({
          title: sec.title,
          blurb: sec.blurb,
          rows: chapters.filter((c) => c.section === sec.key),
        }))
      : [{ title: "", blurb: "", rows: chapters }];

    for (const g of groups) {
      if (g.title) {
        const gExp = g.rows.reduce((n, c) => n + c.expected, 0);
        const gGot = g.rows.reduce((n, c) => n + (have.get(c.slug) ?? 0), 0);
        console.log(
          `
     ${g.title}  ${PLANNED ? `(${gExp})` : `(${gGot} / ${gExp})`}`
        );
        console.log(`       ${g.blurb}`);
      }
      for (const c of g.rows) {
        const n = have.get(c.slug) ?? 0;
        const bar = PLANNED ? `${c.expected}` : `${String(n).padStart(4)} / ${c.expected}`;
        console.log(`       ${c.label.padEnd(6)} ${bar}`);
      }
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
