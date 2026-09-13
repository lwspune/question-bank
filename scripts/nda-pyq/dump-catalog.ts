/**
 * Generate catalog.json from the LIVE NDA Mathematics taxonomy.
 *
 *   npx tsx scripts/nda-pyq/dump-catalog.ts            # report only
 *   npx tsx scripts/nda-pyq/dump-catalog.ts --apply    # write catalog.json
 *
 * The catalog is GENERATED, never authored. Its whole job is to refuse a chapter
 * or subtopic name that does not already exist in the bank — so any divergence
 * between it and the database is the defect, not the data. Hand-editing it to
 * "add" a name would defeat the gate at the exact moment it matters.
 *
 * WHY THIS IS HARD RATHER THAN ADVISORY. `commitStaged` refuses an unknown
 * SUBJECT but AUTO-CREATES an unknown chapter or subtopic. NDA Mathematics went
 * through a bank-wide taxonomy cleanup (31 chapters / 111 subtopics, technique-
 * canonical); one agent writing "Trigonometric Identities " or "Sequences &
 * Series" would silently mint a second chapter beside the real one and split
 * 690 questions from their siblings, with no error anywhere and no gate to see
 * it. That exact failure is recorded in this repo against mh-ssc-10.
 *
 * A GENUINELY new subtopic is possible in principle — but it is a taxonomy
 * decision to be made deliberately against the cleaned tree, not a side effect
 * of a transcription agent guessing a name. Add it to the bank first, then
 * re-run this.
 */
import { config as loadEnv } from "dotenv";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, SUBJECT_ID, SUBJECT } from "./config";

loadEnv({ path: ".env.local", override: true });

async function main() {
  const apply = process.argv.includes("--apply");
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: chapters, error: chErr } = await sb
    .from("chapters")
    .select("id,name")
    .eq("subject_id", SUBJECT_ID)
    .order("name");
  if (chErr) throw chErr;
  if (!chapters?.length) throw new Error(`no chapters for subject ${SUBJECT_ID} — wrong id?`);

  // Paged: a bare .select() is capped at 1000 rows by PostgREST, and this repo
  // has been bitten by that silently five times. 111 subtopics is nowhere near
  // it today, but the page loop costs nothing and cannot rot.
  const subtopics: { chapter_id: string; name: string }[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await sb
      .from("subtopics")
      .select("chapter_id,name")
      .in(
        "chapter_id",
        chapters.map((c) => c.id)
      )
      .order("name")
      .range(from, from + 999);
    if (error) throw error;
    subtopics.push(...(data ?? []));
    if (!data || data.length < 1000) break;
  }

  const byChapter = new Map(chapters.map((c) => [c.id, c.name]));
  const cat: Record<string, string[]> = {};
  for (const c of chapters) cat[c.name] = [];
  for (const s of subtopics) {
    const ch = byChapter.get(s.chapter_id);
    if (ch) cat[ch].push(s.name);
  }
  for (const k of Object.keys(cat)) cat[k].sort();

  console.log(`${SUBJECT}: ${chapters.length} chapters, ${subtopics.length} subtopics`);
  for (const [c, subs] of Object.entries(cat)) {
    console.log(`  ${c.padEnd(32)} ${String(subs.length).padStart(2)}`);
  }
  const empty = Object.entries(cat).filter(([, s]) => !s.length);
  if (empty.length) {
    console.log(`\n! ${empty.length} chapter(s) with NO subtopics: ${empty.map(([c]) => c).join(", ")}`);
    console.log(`  A question filed there can carry no subtopic. Not fatal — recorded so it is not a surprise.`);
  }

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write catalog.json. Nothing written.`);
    return;
  }
  const path = join(__dirname, "catalog.json");
  writeFileSync(path, JSON.stringify(cat, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${path}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
