/**
 * Seed the 14 subjects under UPSC CSE (Prelims) — nine for Paper I, five for Paper II.
 *
 *   npx tsx scripts/upsc/seed-subjects.ts          # dry-run: report only
 *   npx tsx scripts/upsc/seed-subjects.ts --apply  # create the missing ones
 *
 * WHY THIS SCRIPT EXISTS AT ALL: `commitStaged` auto-creates chapters and
 * subtopics but deliberately NOT subjects — a typo'd subject would corrupt the
 * top-level taxonomy, so it refuses an unknown one instead. The subjects have to
 * exist before the first paper commits, and doing it as a committed script
 * rather than ad-hoc SQL keeps the provenance readable.
 *
 * BOTH PAPERS LIVE UNDER ONE EXAM, as separate subjects. That follows NDA, whose
 * Paper I (Mathematics) and Paper II (GAT) are one exam, and CDS, whose English
 * and General Knowledge papers likewise are. A CSAT item and a GS item are the
 * same candidate's same morning; splitting them into two exams would double the
 * registry, the nav and the /mock catalogue for no gain.
 *
 * Chapters and subtopics are NOT seeded — see the note on `catalog()` in config.ts.
 *
 * Idempotent: re-running creates nothing.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_ID, SUBJECTS, subjectsFor } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const apply = process.argv.includes("--apply");
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const wanted = SUBJECTS();

  // Sanity: the per-paper split must partition the catalog exactly. If it does
  // not, some subject is reachable from neither paper (so nothing can ever be
  // filed into it) or from both (so the per-paper validation is meaningless).
  const p1 = subjectsFor(1);
  const p2 = subjectsFor(2);
  if (p1.length + p2.length !== wanted.length) {
    throw new Error(`subjectsFor() does not partition the catalog: ${p1.length} + ${p2.length} != ${wanted.length}`);
  }

  const { data: existing, error } = await client
    .from("subjects")
    .select("id, name")
    .eq("exam_id", EXAM_ID);
  if (error) throw new Error(`subject read failed: ${error.message}`);

  const have = new Map((existing ?? []).map((s) => [s.name, s.id]));
  const missing = wanted.filter((n) => !have.has(n));

  console.log(`UPSC CSE (Prelims) currently has ${have.size} subject(s): ${[...have.keys()].sort().join(", ") || "(none)"}`);
  console.log(`\ncatalog wants ${wanted.length}:`);
  console.log(`  Paper I  (${p1.length}): ${p1.join(", ")}`);
  console.log(`  Paper II (${p2.length}): ${p2.join(", ")}`);
  console.log(`\nmissing: ${missing.length ? missing.join(", ") : "(none - nothing to do)"}`);

  if (!missing.length) return;
  if (!apply) {
    console.log("\n[dry-run] pass --apply to create them. Nothing written.");
    return;
  }

  const { data: created, error: iErr } = await client
    .from("subjects")
    .insert(missing.map((name) => ({ exam_id: EXAM_ID, name })))
    .select("id, name");
  if (iErr) throw new Error(`subject insert failed: ${iErr.message}`);
  for (const s of created ?? []) console.log(`  created ${s.name}  ${s.id}`);

  // Read back rather than trusting the insert: the whole point of this step is
  // that a later commit can resolve every subject BY NAME.
  const { data: after } = await client.from("subjects").select("name").eq("exam_id", EXAM_ID);
  const names = new Set((after ?? []).map((s) => s.name));
  const stillMissing = wanted.filter((n) => !names.has(n));
  if (stillMissing.length) throw new Error(`after apply, still missing: ${stillMissing.join(", ")}`);
  console.log(`\nverified: all ${wanted.length} catalog subjects now exist under UPSC CSE (Prelims).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
