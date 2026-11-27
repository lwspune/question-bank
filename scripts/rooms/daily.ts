/**
 * npm run rooms:daily: pin the question of the day in the circle of every exam
 * students have, joined or not (migrations 0289, 0292; lib/rooms/dailyServer). DRY RUN by default: prints the plan. `--apply`
 * lives ONLY in .github/workflows/rooms-daily.yml (01:30 UTC = 07:00 IST), so
 * running this by hand never posts. A room already pinned today is skipped,
 * so a re-run is safe.
 */
import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import { ensureRoom, planDaily, pinDailyIfMissing } from "../../src/lib/rooms/dailyServer";

async function main() {
  const apply = process.argv.includes("--apply");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const plan = await planDaily(db, new Date());
  let failed = 0;
  for (const p of plan) {
    if (!p.questionId) {
      console.log(`${p.slug}: skipped (${p.skipped})`);
      continue;
    }
    if (!apply) {
      console.log(`${p.slug}: would pin ${p.questionId}`);
      continue;
    }
    try {
      await ensureRoom(db, p.slug);
      const id = await pinDailyIfMissing(db, p.slug, p.questionId);
      console.log(id == null ? `${p.slug}: skipped (pinned meanwhile)` : `${p.slug}: pinned ${p.questionId} (message ${id})`);
    } catch (e) {
      failed++;
      console.error(e instanceof Error ? e.message : e);
    }
  }
  if (!apply) console.log("\nDry run. The morning workflow adds --apply.");
  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
