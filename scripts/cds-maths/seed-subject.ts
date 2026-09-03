/**
 * Seed the single `Mathematics` subject under the CDS exam.
 *
 *   npx tsx scripts/cds-maths/seed-subject.ts          # dry-run: report only
 *   npx tsx scripts/cds-maths/seed-subject.ts --apply  # create it
 *
 * WHY THIS SCRIPT EXISTS: `commitStaged` auto-creates chapters and subtopics but
 * deliberately NOT subjects — a typo'd subject would corrupt the top-level
 * taxonomy, so it refuses an unknown one instead. The subject therefore has to
 * exist before the first paper commits, and doing it as a committed script
 * rather than ad-hoc SQL keeps the provenance readable.
 *
 * RUN IT AT COMMIT TIME, NOT BEFORE. `listSubjects` (src/lib/questions/taxonomy.ts)
 * applies NO question-count filter, so the moment this row exists an empty
 * "Mathematics" appears as a live /browse filter under CDS that returns nothing.
 * That exact defect was seeded and then removed on the same day for MH State
 * Board Class 11 Physics. The window is unavoidable while the first paper is
 * committed PRIVATE — keep it short, and do not run this speculatively.
 *
 * Mathematics is the THIRD CDS paper in the bank, after English (one subject)
 * and General Knowledge (eight). Unlike GK, this is one printed paper mapping to
 * one bank subject, so `subject` is a constant here and only `chapter` is a
 * per-question decision.
 *
 * Idempotent: re-running creates nothing.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_ID, SUBJECT } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const apply = process.argv.includes("--apply");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: existing, error } = await client
    .from("subjects")
    .select("id, name")
    .eq("exam_id", EXAM_ID);
  if (error) throw new Error(`subject read failed: ${error.message}`);

  const have = new Map((existing ?? []).map((s) => [s.name, s.id]));
  console.log(`CDS currently has ${have.size} subject(s): ${[...have.keys()].sort().join(", ") || "(none)"}`);

  if (have.has(SUBJECT)) {
    console.log(`"${SUBJECT}" already exists (${have.get(SUBJECT)}) — nothing to do.`);
    return;
  }
  console.log(`missing: ${SUBJECT}`);

  if (!apply) {
    console.log("\n[dry-run] pass --apply to create it. Nothing written.");
    return;
  }

  const { data: created, error: iErr } = await client
    .from("subjects")
    .insert({ exam_id: EXAM_ID, name: SUBJECT })
    .select("id, name")
    .single();
  if (iErr) throw new Error(`subject insert failed: ${iErr.message}`);
  console.log(`  created ${created.name}  ${created.id}`);

  // Read back rather than trusting the insert: the whole point of this step is
  // that a later commit can resolve the subject BY NAME.
  const { data: after } = await client
    .from("subjects")
    .select("name")
    .eq("exam_id", EXAM_ID)
    .eq("name", SUBJECT);
  if (!after?.length) throw new Error(`after apply, "${SUBJECT}" still does not resolve under CDS`);
  console.log(`\nverified: "${SUBJECT}" now exists under CDS.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
