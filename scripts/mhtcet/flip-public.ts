/**
 * Flip a verified MHT-CET shift PUBLIC — every committed row EXCEPT those marked
 * `flawed` in shifts/<shiftId>.json (genuinely broken printed questions stay PRIVATE).
 *
 *   npx tsx scripts/mhtcet/flip-public.ts <shiftId>          # dry-run (counts)
 *   npx tsx scripts/mhtcet/flip-public.ts <shiftId> --apply  # flip
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_ID, loadShift, requireShiftId } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const apply = process.argv.includes("--apply");
  const shiftId = requireShiftId(process.argv, 2, "flip-public.ts <shiftId> [--apply]");
  loadEnv();
  const shift = loadShift(shiftId);
  const flawed = Object.entries(shift.questions)
    .filter(([, q]) => q.flawed)
    .map(([k]) => k);

  console.log(`Shift ${shiftId}: ${flawed.length} flawed rows stay PRIVATE${flawed.length ? ` (Q${flawed.join(", Q")})` : ""}.`);

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let q = client
    .from("questions")
    .select("id, question_number", { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", shift.sourceFile)
    .eq("visibility", "PRIVATE");
  const { data: priv, count } = await q;
  console.log(`PRIVATE rows for ${shift.sourceFile}: ${count}`);

  const toFlip = (priv ?? []).filter((r) => !flawed.includes(String(r.question_number)));
  console.log(`will flip ${toFlip.length} PUBLIC, keep ${(priv?.length ?? 0) - toFlip.length} PRIVATE.`);

  if (!apply) {
    console.log("\n[dry-run] pass --apply to flip.");
    return;
  }

  const ids = toFlip.map((r) => r.id);
  const { error, count: flipped } = await client
    .from("questions")
    .update({ visibility: "PUBLIC" }, { count: "exact" })
    .in("id", ids);
  if (error) throw new Error(`flip failed: ${error.message}`);
  console.log(`flipped ${flipped} rows PUBLIC.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
