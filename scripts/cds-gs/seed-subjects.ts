/**
 * Seed the 8 General-Knowledge subjects under the CDS exam.
 *
 *   npx tsx scripts/cds-gs/seed-subjects.ts          # dry-run: report only
 *   npx tsx scripts/cds-gs/seed-subjects.ts --apply  # create the missing ones
 *
 * WHY THIS SCRIPT EXISTS AT ALL: `commitStaged` auto-creates chapters and
 * subtopics but deliberately NOT subjects — a typo'd subject would corrupt the
 * top-level taxonomy, so it refuses an unknown one instead. So the subjects have
 * to exist before the first paper commits, and doing it as a committed script
 * rather than ad-hoc SQL keeps the provenance readable.
 *
 * CDS previously had exactly ONE subject, English. A CDS "General Knowledge"
 * paper is a single printed paper spanning all eight disciplines, so `subject`
 * is a PER-QUESTION field — the same shape as the Maharashtra SSC Social
 * Sciences paper, which prints History and Political Science in one booklet.
 *
 * Idempotent: re-running creates nothing.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_ID, catalog } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const apply = process.argv.includes("--apply");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const wanted = Object.keys(catalog());

  const { data: existing, error } = await client
    .from("subjects")
    .select("id, name")
    .eq("exam_id", EXAM_ID);
  if (error) throw new Error(`subject read failed: ${error.message}`);

  const have = new Map((existing ?? []).map((s) => [s.name, s.id]));
  const missing = wanted.filter((n) => !have.has(n));

  console.log(`CDS currently has ${have.size} subject(s): ${[...have.keys()].sort().join(", ") || "(none)"}`);
  console.log(`catalog wants ${wanted.length}: ${wanted.join(", ")}`);
  console.log(`missing: ${missing.length ? missing.join(", ") : "(none — nothing to do)"}`);

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
  // that a later commit can resolve every subject by name.
  const { data: after } = await client.from("subjects").select("name").eq("exam_id", EXAM_ID);
  const names = new Set((after ?? []).map((s) => s.name));
  const stillMissing = wanted.filter((n) => !names.has(n));
  if (stillMissing.length) throw new Error(`after apply, still missing: ${stillMissing.join(", ")}`);
  console.log(`\nverified: all ${wanted.length} catalog subjects now exist under CDS.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
