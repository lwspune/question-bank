/**
 * Seed the subjects under SSC CGL: Reasoning, Quantitative Aptitude, English, and the
 * eight subjects General Awareness is split into (SECTION_SUBJECTS in config.ts).
 *
 *   npx tsx scripts/ssc-cgl/seed-subjects.ts          # dry-run: report only
 *   npx tsx scripts/ssc-cgl/seed-subjects.ts --apply  # create the missing ones
 *
 * commitStaged auto-creates chapters and subtopics but refuses an unknown SUBJECT
 * (a typo would corrupt the top level), so the subjects must exist before the first
 * commit. Chapters are not seeded: build.ts holds every question to catalog.json and
 * commitStaged creates the chapters that are actually used. Idempotent.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAMS, SUBJECTS, requireExamId, type Tier } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const apply = process.argv.includes("--apply");
  const tier = Number(process.argv.find((a) => a.startsWith("--tier="))?.slice("--tier=".length) ?? 1) as Tier;
  const examId = requireExamId(tier);
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  const wanted = SUBJECTS(tier);
  const { data: existing, error } = await client.from("subjects").select("id, name").eq("exam_id", examId);
  if (error) throw new Error(`subject read failed: ${error.message}`);
  const have = new Set((existing ?? []).map((s) => s.name));
  const missing = wanted.filter((n) => !have.has(n));
  console.log(`${EXAMS[tier].name} has ${have.size} subject(s); the catalog wants ${wanted.length}.`);
  console.log(`missing: ${missing.length ? missing.join(", ") : "(none - nothing to do)"}`);
  if (!missing.length) return;
  if (!apply) {
    console.log("\n[dry-run] pass --apply to create them. Nothing written.");
    return;
  }
  const { error: iErr } = await client.from("subjects").insert(missing.map((name) => ({ exam_id: examId, name })));
  if (iErr) throw new Error(`subject insert failed: ${iErr.message}`);
  const { data: after } = await client.from("subjects").select("name").eq("exam_id", examId);
  const names = new Set((after ?? []).map((s) => s.name));
  const stillMissing = wanted.filter((n) => !names.has(n));
  if (stillMissing.length) throw new Error(`after apply, still missing: ${stillMissing.join(", ")}`);
  console.log(`\nverified: all ${wanted.length} subjects now exist under ${EXAMS[tier].name}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
