/**
 * Commit one exam's syllabus ruling into `syllabus_concept_exams` (0065).
 *
 *   npx tsx scripts/syllabus/commit-exam.ts mht-cet          # dry-run (default)
 *   npx tsx scripts/syllabus/commit-exam.ts mht-cet --apply  # write
 *
 * Input is a CHAPTER-grained ruling in scripts/syllabus/data/<name>.json, because
 * that is the grain real syllabus documents are written at ("Std XI: these nine
 * chapters"). It is expanded to one row per concept here.
 *
 * COMPLETENESS IS ENFORCED: the ruling must cover every (class, chapter_no) that
 * exists in syllabus_concepts for this source+subject. A chapter with no ruling
 * aborts the run rather than being left silently unassessed — an unreviewed
 * chapter that looks reviewed is the one failure this table exists to prevent.
 *
 * Idempotent: upserts on (concept_id, exam), so a re-run is a no-op and a revised
 * status overwrites in place.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { isConceptStatus, isSyllabusExam, type ConceptStatus } from "./lib";

type ChapterRuling = {
  class: number;
  chapter_no: number;
  status: string;
  note?: string;
};

type RulingFile = {
  exam: string;
  source: string;
  subject: string;
  reviewedOn?: string;
  basis?: string[];
  chapters: ChapterRuling[];
};

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const arg = process.argv[2];
  if (!arg) throw new Error("usage: commit-exam.ts <ruling-file> [--apply]");
  const apply = process.argv.includes("--apply");
  loadEnv();

  const name = arg.endsWith(".json") ? arg : `${arg}.json`;
  const path = join(process.cwd(), "scripts", "syllabus", "data", name);
  if (!existsSync(path)) throw new Error(`missing ruling file: ${path}`);
  const ruling = JSON.parse(readFileSync(path, "utf8")) as RulingFile;

  if (!isSyllabusExam(ruling.exam)) throw new Error(`unknown exam "${ruling.exam}"`);
  for (const c of ruling.chapters) {
    if (!isConceptStatus(c.status)) {
      throw new Error(`chapter ${c.class}.${c.chapter_no}: bad status "${c.status}"`);
    }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY required");
  const db = createClient(url, key, { auth: { persistSession: false } });

  type Concept = { id: string; class: number; chapter_no: number; chapter_name: string };
  const concepts: Concept[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("syllabus_concepts")
      .select("id,class,chapter_no,chapter_name")
      .eq("source", ruling.source)
      .eq("subject", ruling.subject)
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    const rows = (data ?? []) as unknown as Concept[];
    concepts.push(...rows);
    if (rows.length < 1000) break;
  }
  if (concepts.length === 0) {
    throw new Error(`no concepts for source="${ruling.source}" subject="${ruling.subject}"`);
  }

  const ruled = new Map<string, ChapterRuling>(
    ruling.chapters.map((c) => [`${c.class}|${c.chapter_no}`, c]),
  );

  // Completeness both ways: every chapter needs a ruling, and every ruling must
  // name a real chapter (a typo'd chapter_no would otherwise write nothing).
  const chapterKeys = new Map<string, string>();
  for (const c of concepts) chapterKeys.set(`${c.class}|${c.chapter_no}`, c.chapter_name);

  const unruled = [...chapterKeys.keys()].filter((k) => !ruled.has(k));
  const phantom = [...ruled.keys()].filter((k) => !chapterKeys.has(k));
  if (unruled.length || phantom.length) {
    if (unruled.length) {
      console.error(`\nREFUSING TO WRITE — ${unruled.length} chapter(s) have no ruling:`);
      for (const k of unruled) console.error(`  Std ${k.replace("|", " ch ")} — ${chapterKeys.get(k)}`);
    }
    if (phantom.length) {
      console.error(`\nREFUSING TO WRITE — ${phantom.length} ruling(s) name no real chapter:`);
      for (const k of phantom) console.error(`  Std ${k.replace("|", " ch ")}`);
    }
    // Set the code and return rather than process.exit(): the Supabase client
    // holds open handles here, and exiting under them aborts libuv on Windows,
    // surfacing as 127 (command-not-found) instead of a clean 1.
    process.exitCode = 1;
    return;
  }

  const rows = concepts.map((c) => {
    const r = ruled.get(`${c.class}|${c.chapter_no}`)!;
    return {
      concept_id: c.id,
      exam: ruling.exam,
      status: r.status as ConceptStatus,
      note: r.note ?? null,
    };
  });

  const tally = new Map<string, number>();
  for (const r of rows) tally.set(r.status, (tally.get(r.status) ?? 0) + 1);

  console.log(`\n${ruling.exam} — ${ruling.subject}, source "${ruling.source}"`);
  if (ruling.reviewedOn) console.log(`reviewed ${ruling.reviewedOn}`);
  console.log(`\n${concepts.length} concepts across ${chapterKeys.size} chapters:`);
  for (const s of ["full", "partial", "not"]) {
    console.log(`  ${s.padEnd(8)} ${String(tally.get(s) ?? 0).padStart(4)}`);
  }
  console.log("\nBy chapter:");
  for (const [k, chapterName] of [...chapterKeys].sort((a, b) => {
    const [ac, an] = a[0].split("|").map(Number);
    const [bc, bn] = b[0].split("|").map(Number);
    return ac - bc || an - bn;
  })) {
    const r = ruled.get(k)!;
    const n = concepts.filter((c) => `${c.class}|${c.chapter_no}` === k).length;
    const [cls, no] = k.split("|");
    console.log(
      `  Std ${cls} ch ${String(no).padStart(2)}  ${chapterName.slice(0, 40).padEnd(40)} ` +
      `${String(n).padStart(3)}  ${r.status}`,
    );
  }

  if (!apply) {
    console.log("\nDRY RUN — nothing written. Re-run with --apply.");
    return;
  }

  const CHUNK = 200;
  let written = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const { error } = await db
      .from("syllabus_concept_exams")
      .upsert(rows.slice(i, i + CHUNK), { onConflict: "concept_id,exam" });
    if (error) throw new Error(`upsert failed at row ${i}: ${error.message}`);
    written += Math.min(CHUNK, rows.length - i);
  }
  console.log(`\nDone. Wrote ${written} ${ruling.exam} rulings.`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
