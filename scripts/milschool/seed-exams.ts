/**
 * Create this lane's five exam rows, each FREE (no pass needed).
 *
 *   npx tsx scripts/milschool/seed-exams.ts          # dry-run: report only
 *   npx tsx scripts/milschool/seed-exams.ts --apply  # create the missing ones
 *
 * Idempotent: an existing row is reported (and its pass_scope corrected to
 * 'free' under --apply), never duplicated. Paste the printed ids into
 * config.ts EXAMS.
 *
 * FREE (owner, 2026-11-17): "those papers are free for our users". pass_scope
 * 'free' (migration 0210) is what every server-side limit reads, so the registry
 * entry's passScope "free" and this column must agree.
 *
 * Side effect worth knowing: `listExams` selects every exams row, so the /browse
 * exam dropdown gains these names at once. Rows commit PRIVATE, so anonymous
 * visitors see nothing until a paper is deliberately published.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAMS } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const apply = process.argv.includes("--apply");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const names = Object.values(EXAMS).map((e) => e.name);
  const { data: existing, error } = await client.from("exams").select("id, name, pass_scope").in("name", names);
  if (error) throw new Error(`exam read failed: ${error.message}`);
  const have = new Map((existing ?? []).map((e) => [e.name as string, e]));

  for (const [key, def] of Object.entries(EXAMS)) {
    const row = have.get(def.name);
    if (row) {
      console.log(`${key.padEnd(10)} exists   ${row.id}  pass_scope=${row.pass_scope}`);
      if (row.pass_scope !== "free" && apply) {
        const { error: uErr } = await client.from("exams").update({ pass_scope: "free" }).eq("id", row.id);
        if (uErr) throw new Error(`${def.name}: pass_scope update failed: ${uErr.message}`);
        console.log(`           pass_scope -> free`);
      }
      continue;
    }
    if (!apply) {
      console.log(`${key.padEnd(10)} MISSING  "${def.name}" (dry-run)`);
      continue;
    }
    const { data: created, error: iErr } = await client
      .from("exams")
      .insert({ name: def.name, pass_scope: "free" })
      .select("id, name, pass_scope")
      .single();
    if (iErr) throw new Error(`${def.name}: insert failed: ${iErr.message}`);
    console.log(`${key.padEnd(10)} created  ${created.id}  pass_scope=${created.pass_scope}`);
  }

  if (!apply) {
    console.log("\n[dry-run] pass --apply to create. Nothing written.");
    return;
  }
  // Read back: these ids are about to be hardcoded.
  const { data: after } = await client.from("exams").select("id, name, pass_scope").in("name", names);
  console.log("\nPaste into config.ts EXAMS:");
  for (const [key, def] of Object.entries(EXAMS)) {
    const r = (after ?? []).find((e) => e.name === def.name);
    if (!r || r.pass_scope !== "free") throw new Error(`${def.name}: read-back failed or not free`);
    console.log(`  "${key}": examId "${r.id}"`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
