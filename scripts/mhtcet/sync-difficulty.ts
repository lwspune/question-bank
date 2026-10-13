/**
 * Push the difficulty labels in shifts/<shiftId>.json onto the committed rows.
 *
 *   npx tsx scripts/mhtcet/sync-difficulty.ts <shiftId>          # dry run: what would change
 *   npx tsx scripts/mhtcet/sync-difficulty.ts <shiftId> --apply  # update
 *
 * commit.ts upserts on content_hash and skips a row that already exists, so a
 * re-graded label in the transcript never reaches the bank by re-committing.
 * Difficulty is not part of content_hash, so it is updated in place: same row, same
 * id, nothing else touched. Rows are matched on (source_file, question_number), the
 * key attach-images.ts uses; a number with no row is reported, never skipped silently.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, loadShift, requireShiftId } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const apply = process.argv.includes("--apply");
  const shiftId = requireShiftId(process.argv, 2, "sync-difficulty.ts <shiftId> [--apply]");
  const shift = loadShift(shiftId);
  const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await c
    .from("questions")
    .select("id,question_number,difficulty")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", shift.sourceFile);
  if (error) throw error;
  const byNum = new Map((data ?? []).map((r) => [String(r.question_number), r]));

  const changes: { id: string; n: string; from: string; to: string }[] = [];
  const unmatched: string[] = [];
  for (const [n, q] of Object.entries(shift.questions)) {
    const row = byNum.get(n);
    if (!row) unmatched.push(n);
    else if (row.difficulty !== q.difficulty) changes.push({ id: row.id, n, from: row.difficulty, to: q.difficulty });
  }
  const moves = new Map<string, number>();
  for (const ch of changes) moves.set(`${ch.from}->${ch.to}`, (moves.get(`${ch.from}->${ch.to}`) ?? 0) + 1);
  console.log(`${shiftId}: ${changes.length} labels to change ${JSON.stringify(Object.fromEntries(moves))}`);
  if (unmatched.length) console.log(`  no committed row for Q${unmatched.join(", Q")}`);
  if (!apply) return console.log("  [dry run] pass --apply to update.");

  for (const ch of changes) {
    const { error: uErr } = await c.from("questions").update({ difficulty: ch.to }).eq("id", ch.id);
    if (uErr) throw new Error(`Q${ch.n}: ${uErr.message}`);
  }
  console.log(`  updated ${changes.length} rows.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
