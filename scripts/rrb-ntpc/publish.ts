/**
 * Publish the committed NTPC shifts: set their rows PUBLIC.
 *
 *   npx tsx scripts/rrb-ntpc/publish.ts           # dry run: per shift, rows and how many are PRIVATE
 *   npx tsx scripts/rrb-ntpc/publish.ts --apply
 *
 * Owner's OK 2026-11-13. A flawed row is published too: its solution opens with the student notice
 * (studentSolution), and it rides as grace in its mock (grace.ts). Refuses a shift that is not
 * exactly 100 rows (rows + repeats.json), so a half-committed shift is never published.
 * Reversible: set the same rows back to PRIVATE by source_file.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { SHIFTS, requireExamId } from "./config";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const examId = requireExamId();
  const repeatsFile = join(__dirname, "repeats.json");
  const repeats: Record<string, unknown[]> = existsSync(repeatsFile) ? JSON.parse(readFileSync(repeatsFile, "utf8")) : {};

  let toPublish = 0;
  const ready: string[] = [];
  for (const [id, s] of Object.entries(SHIFTS)) {
    const count = async (privateOnly: boolean) => {
      let q = db.from("questions").select("id", { count: "exact", head: true }).eq("exam_id", examId).eq("source_file", s.sourceFile);
      if (privateOnly) q = q.eq("visibility", "PRIVATE");
      const { count: n, error } = await q;
      if (error) throw new Error(`${id}: ${error.message}`);
      return n ?? 0;
    };
    const rows = await count(false);
    const priv = await count(true);
    const whole = rows + (repeats[id]?.length ?? 0) === 100;
    console.log(`${id}: ${rows} rows, ${priv} PRIVATE${whole ? "" : "  !! not a whole paper: skipped"}`);
    if (whole && priv) {
      ready.push(s.sourceFile);
      toPublish += priv;
    }
  }
  console.log(`\n${toPublish} row(s) to publish across ${ready.length} shift(s).`);
  if (!apply) {
    console.log("[dry-run] pass --apply to publish.");
    return;
  }
  for (const sourceFile of ready) {
    const { error, count } = await db.from("questions").update({ visibility: "PUBLIC" }, { count: "exact" }).eq("exam_id", examId).eq("source_file", sourceFile).eq("visibility", "PRIVATE");
    if (error) throw new Error(`${sourceFile}: ${error.message}`);
    console.log(`published ${count} row(s) of ${sourceFile}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
