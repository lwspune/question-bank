/**
 * Create the IMAT exam row and its six subjects.
 *
 *   npx tsx scripts/imat/seed.ts          # dry run: report only
 *   npx tsx scripts/imat/seed.ts --apply  # create whatever is missing
 *
 * Idempotent. Subjects are never created by commitStaged (a typo would
 * corrupt the top-level taxonomy), so they must exist before the first commit.
 *
 * DO NOT RUN --apply UNTIL THE /browse FILTER IS LIVE. `listExams` lists
 * every row of `exams`; src/lib/sites/nicheExams.ts drops "IMAT" from it.
 * Until that code is deployed, creating the row puts an empty "IMAT" in the
 * /browse exam dropdown for every visitor. The script checks the live site
 * for the filter's effect only indirectly, so the check is on the person
 * running it: confirm the deploy that contains nicheExams.ts first.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_NAME } from "./config";
import { SUBJECTS } from "./lib";
import { isNicheExam } from "../../src/lib/sites/nicheExams";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const apply = process.argv.includes("--apply");
  if (!isNicheExam(EXAM_NAME)) {
    throw new Error(`"${EXAM_NAME}" is not in NICHE_EXAM_NAMES; it would show on PYQ Vault. Refusing.`);
  }
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let { data: exam } = await client.from("exams").select("id, name").eq("name", EXAM_NAME).maybeSingle();
  if (!exam) {
    console.log(`exam "${EXAM_NAME}" does not exist yet.`);
    if (!apply) {
      console.log(`[dry run] would create it, then ${SUBJECTS.length} subjects: ${SUBJECTS.join(", ")}`);
      return;
    }
    const { data, error } = await client.from("exams").insert({ name: EXAM_NAME }).select("id, name").single();
    if (error) throw new Error(`exam insert failed: ${error.message}`);
    exam = data;
    console.log(`created exam ${exam.name}  ${exam.id}`);
  } else {
    console.log(`exam exists: ${exam.name}  ${exam.id}`);
  }

  const { data: existing, error: sErr } = await client.from("subjects").select("name").eq("exam_id", exam.id);
  if (sErr) throw new Error(`subject read failed: ${sErr.message}`);
  const have = new Set((existing ?? []).map((s) => s.name as string));
  const missing = SUBJECTS.filter((n) => !have.has(n));
  console.log(`subjects missing: ${missing.length ? missing.join(", ") : "(none)"}`);
  if (!missing.length) return;
  if (!apply) {
    console.log("[dry run] pass --apply to create them.");
    return;
  }
  const { error: iErr } = await client.from("subjects").insert(missing.map((name) => ({ exam_id: exam!.id, name })));
  if (iErr) throw new Error(`subject insert failed: ${iErr.message}`);

  // Read back: the commit resolves every subject BY NAME.
  const { data: after } = await client.from("subjects").select("name").eq("exam_id", exam.id);
  const names = new Set((after ?? []).map((s) => s.name as string));
  const still = SUBJECTS.filter((n) => !names.has(n));
  if (still.length) throw new Error(`still missing after insert: ${still.join(", ")}`);
  console.log(`verified: all ${SUBJECTS.length} subjects exist under ${EXAM_NAME}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
