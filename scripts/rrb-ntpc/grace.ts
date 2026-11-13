/**
 * Put every flawed NTPC question on the mock grace list (src/lib/mocks/flawed.json), the one list
 * the mock builders read: a flawed question (two right options, none as printed, or a key we
 * dispute) scores for everyone in a mock (owner policy 2026-10-29).
 *
 *   npx tsx scripts/rrb-ntpc/grace.ts           # dry run: what would be added
 *   npx tsx scripts/rrb-ntpc/grace.ts --apply   # append the missing ones
 *
 * The flawed questions are read from the committed transcripts (`flawed: yes` + its `notice:`),
 * and each is found in the bank by its shift's source_file and question number. Idempotent: a
 * question already on the list is skipped. Run it after every commit and before building mocks.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseTranscript } from "../ssc-cgl/lib";
import { SHIFTS, TRANSCRIPTS, requireExamId, requireShift } from "./config";

export type FlawedBlock = { shiftId: string; number: number; notice: string };

/** Every `flawed: yes` block in the committed transcripts, in shift then number order. */
export function flawedBlocks(): FlawedBlock[] {
  const out: FlawedBlock[] = [];
  for (const file of readdirSync(TRANSCRIPTS).filter((f) => f.endsWith(".txt")).sort()) {
    const shiftId = file.replace(/\.txt$/, "");
    if (!SHIFTS[shiftId]) throw new Error(`${file} names no registered shift`);
    for (const q of parseTranscript(readFileSync(join(TRANSCRIPTS, file), "utf8"))) {
      if (!q.flawed) continue;
      if (!q.notice) throw new Error(`${shiftId} Q${q.number} is flawed but has no notice`);
      out.push({ shiftId, number: q.number, notice: q.notice });
    }
  }
  return out;
}

export function graceReason(f: FlawedBlock): string {
  return `RRB NTPC ${requireShift(f.shiftId).pyqNote} Q${f.number}: ${f.notice.slice(0, 120)} (scripts/rrb-ntpc)`;
}

const FLAWED_JSON = join(__dirname, "..", "..", "src", "lib", "mocks", "flawed.json");

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const { createClient } = require("@supabase/supabase-js") as typeof import("@supabase/supabase-js");
  const apply = process.argv.includes("--apply");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const examId = requireExamId();

  const list: { id: string; reason: string }[] = JSON.parse(readFileSync(FLAWED_JSON, "utf8"));
  const known = new Set(list.map((f) => f.id));
  const blocks = flawedBlocks();
  let added = 0;
  for (const f of blocks) {
    const { data, error } = await db
      .from("questions")
      .select("id")
      .eq("exam_id", examId)
      .eq("source_file", requireShift(f.shiftId).sourceFile)
      .eq("question_number", String(f.number))
      .maybeSingle();
    if (error) throw new Error(`${f.shiftId} Q${f.number}: ${error.message}`);
    if (!data) throw new Error(`${f.shiftId} Q${f.number} is not in the bank (repeat of another shift? see repeats.json)`);
    if (known.has(data.id)) continue;
    list.push({ id: data.id, reason: graceReason(f) });
    known.add(data.id);
    added++;
    console.log(`  + ${f.shiftId} Q${f.number}`);
  }
  console.log(`${blocks.length} flawed question(s); ${added} not yet on the grace list`);
  if (!apply) {
    console.log("[dry-run] pass --apply to write src/lib/mocks/flawed.json.");
    return;
  }
  if (added) writeFileSync(FLAWED_JSON, JSON.stringify(list, null, 2) + "\n");
  console.log(`wrote ${added} entr${added === 1 ? "y" : "ies"} to src/lib/mocks/flawed.json`);
}

if (require.main === module)
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
