/**
 * Create the `RRB NTPC` exam row.
 *
 *   npx tsx scripts/rrb-ntpc/seed-exam.ts          # dry-run: report only
 *   npx tsx scripts/rrb-ntpc/seed-exam.ts --apply  # create it if absent
 *
 * Idempotent: re-running creates nothing and re-prints the id, which becomes EXAM_ID in config.ts.
 * ONE VISIBLE SIDE EFFECT (as with SSC CGL): /browse lists every row of `exams`, so "RRB NTPC"
 * appears there at once, empty to anonymous visitors until a row is published. Home, nav, /mock
 * and /notes follow EXAM_REGISTRY, which this does not touch.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_NAME } from "./config";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  const { data: existing, error } = await client.from("exams").select("id, name").eq("name", EXAM_NAME).maybeSingle();
  if (error) throw new Error(`exam read failed: ${error.message}`);
  if (existing) {
    console.log(`already exists: ${existing.name}  ${existing.id}\n\nEXAM_ID = "${existing.id}"`);
    return;
  }
  console.log(`"${EXAM_NAME}" does not exist yet.`);
  if (!apply) {
    console.log("[dry-run] pass --apply to create it. Nothing written.");
    return;
  }
  const { data: created, error: iErr } = await client.from("exams").insert({ name: EXAM_NAME }).select("id, name").single();
  if (iErr) throw new Error(`exam insert failed: ${iErr.message}`);
  // Read back rather than trusting the insert: the id is about to be hardcoded.
  const { data: after, error: rErr } = await client.from("exams").select("id, name").eq("name", EXAM_NAME).single();
  if (rErr || !after) throw new Error(`verify read failed: ${rErr?.message}`);
  if (after.id !== created.id) throw new Error("read-back id differs from insert id");
  console.log(`created ${after.name}  ${after.id}\n\nEXAM_ID = "${after.id}"   <- paste into scripts/rrb-ntpc/config.ts`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
