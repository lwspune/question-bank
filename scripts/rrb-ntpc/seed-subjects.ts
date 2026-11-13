/**
 * Seed the ten subjects under RRB NTPC (SUBJECTS in config.ts).
 *
 *   npx tsx scripts/rrb-ntpc/seed-subjects.ts          # dry-run: report only
 *   npx tsx scripts/rrb-ntpc/seed-subjects.ts --apply  # create the missing ones
 *
 * commitStaged creates chapters and subtopics but refuses an unknown SUBJECT, so these must exist
 * before the first commit. Idempotent.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_NAME, SUBJECTS, requireExamId } from "./config";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const examId = requireExamId();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  const { data: existing, error } = await client.from("subjects").select("id, name").eq("exam_id", examId);
  if (error) throw new Error(`subject read failed: ${error.message}`);
  const have = new Set((existing ?? []).map((s) => s.name));
  const missing = SUBJECTS.filter((n) => !have.has(n));
  console.log(`${EXAM_NAME} has ${have.size} subject(s); the catalog wants ${SUBJECTS.length}. missing: ${missing.join(", ") || "(none)"}`);
  if (!missing.length) return;
  if (!apply) {
    console.log("[dry-run] pass --apply to create them. Nothing written.");
    return;
  }
  const { error: iErr } = await client.from("subjects").insert(missing.map((name) => ({ exam_id: examId, name })));
  if (iErr) throw new Error(`subject insert failed: ${iErr.message}`);
  const { data: after } = await client.from("subjects").select("name").eq("exam_id", examId);
  const still = SUBJECTS.filter((n) => !new Set((after ?? []).map((s) => s.name)).has(n));
  if (still.length) throw new Error(`after apply, still missing: ${still.join(", ")}`);
  console.log(`verified: all ${SUBJECTS.length} subjects exist under ${EXAM_NAME}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
