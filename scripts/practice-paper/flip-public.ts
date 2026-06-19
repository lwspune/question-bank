/**
 * Flip ONLY the non-duplicate, non-flawed questions of an LWS test paper to
 * PUBLIC — the dedup gate. Run AFTER you've reviewed the (often derived) answers.
 *
 *   npx tsx scripts/practice-paper/flip-public.ts <slug>          # dry-run
 *   npx tsx scripts/practice-paper/flip-public.ts <slug> --apply  # write
 *
 * status:"new" rows become PUBLIC (browsable practice); status:"dup"/"flawed"
 * rows stay PRIVATE so the public practice bank stays deduped and no flawed
 * question is ever shown. Matches rows by (source_file, question_number).
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_ID, requirePaper, loadRecords, statusOf } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const apply = process.argv.includes("--apply");
  const spec = requirePaper(process.argv[2]);
  loadEnv();

  const recs = loadRecords(spec);
  const publicNums = recs.filter((r) => statusOf(r) === "new").map((r) => String(r.n));
  const heldNums = recs.filter((r) => statusOf(r) !== "new").map((r) => r.n);

  console.log(`Paper "${spec.title}": flipping ${publicNums.length} new rows PUBLIC; ${heldNums.length} stay PRIVATE [${heldNums.join(", ")}].`);

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { error, count } = await client
    .from("questions")
    .update({ visibility: "PUBLIC" }, { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", spec.sourceFile)
    .in("question_number", publicNums);
  if (error) throw new Error(`flip failed: ${error.message}`);
  console.log(`flipped ${count} rows to PUBLIC.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
