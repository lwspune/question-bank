/**
 * npm run grading:purge: delete answer-sheet scans 30 days after checking,
 * the promise made at upload. The grade and the report stay.
 *
 *   npm run grading:purge             # DRY RUN: what would go
 *   npm run grading:purge -- --apply  # delete
 *
 * Also clears uploads abandoned for 2+ days (started, never sent), and the
 * local grading-inbox/<id>/ copy of every purged sheet, which holds the same
 * scans. Idempotent: a purged sheet carries scans_deleted_at and is skipped.
 */
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { removeScans } from "../../src/lib/answerSheets/grader";

const KEEP_DAYS = 30;
const ABANDONED_DAYS = 2;
const INBOX = join(process.cwd(), "grading-inbox");

async function main() {
  const apply = process.argv.includes("--apply");
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const day = 86_400_000;
  const keepCutoff = new Date(Date.now() - KEEP_DAYS * day).toISOString();
  const abandonedCutoff = new Date(Date.now() - ABANDONED_DAYS * day).toISOString();

  const { data: done, error } = await admin
    .from("answer_submissions")
    .select("id, user_id")
    .in("status", ["graded", "rejected"])
    .is("scans_deleted_at", null)
    .lt("graded_at", keepCutoff)
    .limit(1000);
  if (error) throw new Error(error.message);
  const { data: abandoned, error: abErr } = await admin
    .from("answer_submissions")
    .select("id, user_id")
    .eq("status", "uploading")
    .lt("created_at", abandonedCutoff)
    .limit(1000);
  if (abErr) throw new Error(abErr.message);

  console.log(`${done?.length ?? 0} checked sheet(s) past ${KEEP_DAYS} days; ${abandoned?.length ?? 0} abandoned upload(s).`);
  if (!apply) {
    console.log("Dry run. Add -- --apply to delete.");
    return;
  }
  for (const s of done ?? []) {
    const n = await removeScans(admin, s.user_id as string, s.id as string);
    const { error: upErr } = await admin
      .from("answer_submissions")
      .update({ scans_deleted_at: new Date().toISOString() })
      .eq("id", s.id);
    if (upErr) throw new Error(upErr.message);
    const local = join(INBOX, s.id as string);
    if (existsSync(local)) rmSync(local, { recursive: true, force: true });
    console.log(`  ${s.id}: ${n} file(s) deleted`);
  }
  for (const s of abandoned ?? []) {
    await removeScans(admin, s.user_id as string, s.id as string);
    const { error: delErr } = await admin.from("answer_submissions").delete().eq("id", s.id).eq("status", "uploading");
    if (delErr) throw new Error(delErr.message);
    console.log(`  ${s.id}: abandoned upload removed`);
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
