/**
 * Generate catalog.json from the LIVE NDA GAT taxonomy -- all NINE subjects.
 *
 *   npx tsx scripts/nda-gat/dump-catalog.ts            # report only
 *   npx tsx scripts/nda-gat/dump-catalog.ts --apply    # write catalog.json
 *
 * The catalog is GENERATED, never authored. Its whole job is to refuse a
 * subject, chapter or subtopic name that does not already exist in the bank -- so
 * any divergence between it and the database is the defect, not the data.
 * Hand-editing it to "add" a name defeats the gate at the exact moment it
 * matters.
 *
 * WHY THIS IS HARD RATHER THAN ADVISORY. `commitStaged` refuses an unknown
 * SUBJECT but AUTO-CREATES an unknown chapter or subtopic. All nine NDA GAT
 * subjects went through the bank-wide taxonomy cleanup (67 chapters / 279
 * subtopics, technique-canonical); one agent writing "Modern India " or
 * "Cell Biology and Genetics" would silently mint a second chapter beside the
 * real one and split that chapter's questions from their siblings, with no error
 * anywhere and no gate to see it. That exact failure is recorded in this repo
 * against mh-ssc-10.
 *
 * AND THE THREE-LEVEL SHAPE IS LOAD-BEARING, not tidiness. Chapter names are
 * only unique WITHIN a subject. A flat chapter list would accept a Biology
 * question filed under a Geography chapter, which is the one taxonomy error a
 * reader of /browse would never spot.
 *
 * A GENUINELY new subtopic is possible -- a September 2026 Current Affairs paper
 * is the likeliest source of one. It is a taxonomy decision to be made
 * deliberately against the cleaned tree, not a side effect of a transcription
 * agent guessing a name. Add it to the bank first, then re-run this.
 */
import { config as loadEnv } from "dotenv";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, type Catalog } from "./config";
import { ENGLISH_SUBJECT, GK_SUBJECTS } from "./lib";

loadEnv({ path: ".env.local", override: true });

const WANTED = [ENGLISH_SUBJECT, ...GK_SUBJECTS];

async function main() {
  const apply = process.argv.includes("--apply");
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: subjects, error: subErr } = await sb
    .from("subjects")
    .select("id,name")
    .eq("exam_id", EXAM_ID)
    .in("name", WANTED);
  if (subErr) throw subErr;

  // Resolved by NAME against the live bank rather than by hardcoded id, so this
  // cannot rot silently if a subject is ever re-seeded. A missing one is fatal:
  // the paper genuinely has questions in all nine, and a silently absent subject
  // would make every question of it fail the catalog gate with a confusing
  // "unknown subject" rather than the true cause.
  const missing = WANTED.filter((w) => !subjects?.some((s) => s.name === w));
  if (missing.length) {
    throw new Error(
      `subject(s) absent from the NDA exam: ${missing.join(", ")} -- ` +
        `the GAT paper has questions in all nine. Seed them before ingesting.`
    );
  }

  const { data: chapters, error: chErr } = await sb
    .from("chapters")
    .select("id,name,subject_id")
    .in(
      "subject_id",
      subjects!.map((s) => s.id)
    )
    .order("name");
  if (chErr) throw chErr;
  if (!chapters?.length) throw new Error("no chapters for the GAT subjects -- wrong exam id?");

  // Paged: a bare .select() is capped at 1000 rows by PostgREST, and this repo
  // has been bitten by that silently five times. 279 subtopics is nowhere near
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

  const subjectById = new Map(subjects!.map((s) => [s.id, s.name]));
  const chapterById = new Map(chapters.map((c) => [c.id, c]));

  const cat: Catalog = {};
  for (const name of WANTED) cat[name] = {};
  for (const c of chapters) {
    const subject = subjectById.get(c.subject_id);
    if (subject) cat[subject][c.name] = [];
  }
  for (const st of subtopics) {
    const c = chapterById.get(st.chapter_id);
    if (!c) continue;
    const subject = subjectById.get(c.subject_id);
    if (subject) cat[subject][c.name].push(st.name);
  }
  for (const subject of Object.keys(cat)) {
    for (const ch of Object.keys(cat[subject])) cat[subject][ch].sort();
  }

  let totalCh = 0;
  let totalSt = 0;
  for (const name of WANTED) {
    const chs = Object.keys(cat[name]);
    const st = chs.reduce((n, c) => n + cat[name][c].length, 0);
    totalCh += chs.length;
    totalSt += st;
    console.log(`  ${name.padEnd(18)} ${String(chs.length).padStart(3)} ch  ${String(st).padStart(4)} sub`);
  }
  console.log(`  ${"TOTAL".padEnd(18)} ${String(totalCh).padStart(3)} ch  ${String(totalSt).padStart(4)} sub`);

  const empty: string[] = [];
  for (const name of WANTED) {
    for (const ch of Object.keys(cat[name])) {
      if (!cat[name][ch].length) empty.push(`${name} / ${ch}`);
    }
  }
  if (empty.length) {
    console.log(`\n! ${empty.length} chapter(s) with NO subtopics: ${empty.join(", ")}`);
    console.log(`  A question filed there can carry no subtopic. Not fatal -- recorded so it is not a surprise.`);
  }

  // Collisions are not an error -- they are the reason the catalog is three
  // levels. Printed so the transcription brief can name the real ones.
  const byChapterName = new Map<string, string[]>();
  for (const name of WANTED) {
    for (const ch of Object.keys(cat[name])) {
      if (!byChapterName.has(ch)) byChapterName.set(ch, []);
      byChapterName.get(ch)!.push(name);
    }
  }
  const shared = [...byChapterName.entries()].filter(([, subs]) => subs.length > 1);
  if (shared.length) {
    console.log(`\n  ${shared.length} chapter name(s) used by more than one subject:`);
    for (const [ch, subs] of shared) console.log(`    "${ch}" -> ${subs.join(", ")}`);
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
