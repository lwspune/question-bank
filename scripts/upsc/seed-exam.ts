/**
 * Create the `UPSC CSE (Prelims)` exam row.
 *
 *   npx tsx scripts/upsc/seed-exam.ts          # dry-run: report only
 *   npx tsx scripts/upsc/seed-exam.ts --apply  # create it if absent
 *
 * Idempotent: re-running creates nothing and re-prints the id.
 *
 * WHY A SCRIPT FOR ONE ROW: the id it prints becomes the hardcoded `EXAM_ID` in
 * config.ts, and every question this pipeline ever writes hangs off it. Doing it
 * as ad-hoc SQL would leave no record of where that literal came from.
 *
 * NAME: "UPSC CSE (Prelims)", not "UPSC CSE". This bank holds the PRELIMINARY
 * examination only — two objective papers. CSE Mains is nine descriptive papers
 * and could not share this exam's shape, so the name leaves room for it rather
 * than quietly claiming it.
 *
 * ONE VISIBLE SIDE EFFECT, and it is worth knowing before running this.
 * `listExams` (src/lib/questions/taxonomy.ts) selects EVERY row of `exams` with
 * no filter, so the moment this row exists the `/browse` exam dropdown gains a
 * "UPSC CSE (Prelims)" entry that returns nothing until the first paper commits
 * — and this pipeline commits PRIVATE, so it stays empty to anonymous visitors
 * until someone deliberately publishes.
 *
 * Nothing ELSE surfaces: the homepage cards, the `/notes` and `/guide` hubs and
 * the exam nav are all driven by EXAM_REGISTRY in src/lib/exam/examContext.ts,
 * which is a hand-maintained TS list this script does not touch. Adding the
 * registry entry is a separate, later decision that belongs with publishing.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";

export const EXAM_NAME = "UPSC CSE (Prelims)";

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

  const { data: existing, error } = await client
    .from("exams")
    .select("id, name")
    .eq("name", EXAM_NAME)
    .maybeSingle();
  if (error) throw new Error(`exam read failed: ${error.message}`);

  if (existing) {
    console.log(`already exists: ${existing.name}  ${existing.id}`);
    console.log(`\nEXAM_ID = "${existing.id}"`);
    return;
  }

  console.log(`"${EXAM_NAME}" does not exist yet.`);
  if (!apply) {
    console.log("[dry-run] pass --apply to create it. Nothing written.");
    return;
  }

  const { data: created, error: iErr } = await client
    .from("exams")
    .insert({ name: EXAM_NAME })
    .select("id, name")
    .single();
  if (iErr) throw new Error(`exam insert failed: ${iErr.message}`);

  // Read back rather than trusting the insert — the id is about to be hardcoded.
  const { data: after, error: rErr } = await client
    .from("exams")
    .select("id, name")
    .eq("name", EXAM_NAME)
    .single();
  if (rErr || !after) throw new Error(`verify read failed: ${rErr?.message}`);
  if (after.id !== created.id) throw new Error("read-back id differs from insert id");

  console.log(`created ${after.name}  ${after.id}`);
  console.log(`\nEXAM_ID = "${after.id}"   <- paste into scripts/upsc/config.ts`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
