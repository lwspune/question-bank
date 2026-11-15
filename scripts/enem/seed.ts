/**
 * Create the ENEM exam row (pass_scope 'free') and its four subjects.
 *
 *   npx tsx scripts/enem/seed.ts          # dry run: report only
 *   npx tsx scripts/enem/seed.ts --apply  # create whatever is missing
 *
 * Idempotent. Subjects are never created by commitStaged (a typo would corrupt
 * the top-level taxonomy), so they must exist before the first commit.
 *
 * ORDERING: ENEM is in EXAM_REGISTRY (site intl, noPublicContent) since the
 * 2026-11-15 push, so www's /browse dropdown hides the row (NICHE_EXAM_NAMES).
 * Seeding before that deploy would have listed ENEM on www.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_NAME, PASS_SCOPE, SUBJECTS } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const apply = process.argv.includes("--apply");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let { data: exam } = await client.from("exams").select("id, name, pass_scope").eq("name", EXAM_NAME).maybeSingle();
  if (!exam) {
    console.log(`exam "${EXAM_NAME}" does not exist yet.`);
    if (!apply) {
      console.log(`[dry run] would create it (pass_scope '${PASS_SCOPE}'), then ${SUBJECTS.length} subjects: ${SUBJECTS.join(", ")}`);
      return;
    }
    const { data, error } = await client
      .from("exams")
      .insert({ name: EXAM_NAME, pass_scope: PASS_SCOPE })
      .select("id, name, pass_scope")
      .single();
    if (error) throw new Error(`exam insert failed: ${error.message}`);
    exam = data;
    console.log(`created exam ${exam.name}  ${exam.id}  pass_scope ${exam.pass_scope}`);
  } else {
    console.log(`exam exists: ${exam.name}  ${exam.id}  pass_scope ${exam.pass_scope}`);
    if (exam.pass_scope !== PASS_SCOPE) {
      throw new Error(`ENEM must be free: pass_scope is '${exam.pass_scope}', expected '${PASS_SCOPE}'. This script does not change an existing row; look at why it differs first.`);
    }
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
