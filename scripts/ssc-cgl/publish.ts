/**
 * Publish SSC CGL: copy each flawed question's notice into the bank's solution, then
 * flip the shift's rows PUBLIC.
 *
 *   npx tsx scripts/ssc-cgl/publish.ts                 # dry run: report, write nothing
 *   npx tsx scripts/ssc-cgl/publish.ts --apply
 *   npx tsx scripts/ssc-cgl/publish.ts --only=<shiftId> [--apply]
 *
 * The transcript is the source of record, so the notice is written there first
 * (`notice:`, required on a flawed block by build.ts) and this only copies it across.
 * `solution` is outside content_hash, so adding a notice changes no question's id.
 *
 * A solution is rewritten only while it still holds the text as committed: one that was
 * edited in the bank since (a repair, a report fix) is listed, never overwritten.
 *
 * Rollback: visibility by source_file (`update questions set visibility='PRIVATE' where
 * source_file = ...`); a solution's pre-notice text is the transcript's own solution.
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { HELD, SHIFTS, TRANSCRIPTS, requireExamId, tierOf } from "./config";
import { parseTranscript, studentSolution, type TranscriptQuestion } from "./lib";

type DbRow = { id: string; questionNumber: string; solution: string | null };
export type SolutionPlan = {
  updates: { id: string; number: number; solution: string }[];
  /** rows already holding the solution students should see */
  current: number;
  /** rows whose solution was edited in the bank since commit: left alone */
  edited: number[];
  /** blocks with no row under this shift (a repeat kept under an earlier shift) */
  absent: number[];
};

export function planSolutionSync(blocks: TranscriptQuestion[], rows: DbRow[]): SolutionPlan {
  const byNumber = new Map(rows.map((r) => [Number(r.questionNumber), r]));
  const plan: SolutionPlan = { updates: [], current: 0, edited: [], absent: [] };
  for (const q of blocks) {
    const row = byNumber.get(q.number);
    if (!row) {
      plan.absent.push(q.number);
      continue;
    }
    const want = normalizeNewlines(studentSolution(q));
    if (row.solution === want) plan.current++;
    else if (row.solution === normalizeNewlines(q.solution)) plan.updates.push({ id: row.id, number: q.number, solution: want });
    else plan.edited.push(q.number);
  }
  return plan;
}

/** The rows of a shift to make PUBLIC: every non-PUBLIC row except the held question numbers. */
export function toPublish(
  rows: { id: string; questionNumber: string; visibility: string }[],
  held: number[]
): { ids: string[]; held: number[] } {
  const numbers = new Set(rows.map((r) => Number(r.questionNumber)));
  for (const n of held) if (!numbers.has(n)) throw new Error(`Q${n} is held but has no row`);
  const hold = new Set(held);
  return { ids: rows.filter((r) => r.visibility !== "PUBLIC" && !hold.has(Number(r.questionNumber))).map((r) => r.id), held: [...held] };
}

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const only = process.argv.find((a) => a.startsWith("--only="))?.slice("--only=".length);
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  const ids = Object.keys(SHIFTS).filter((id) => existsSync(join(TRANSCRIPTS, `${id}.txt`)) && (!only || id === only));
  if (!ids.length) throw new Error(`no transcribed shift${only ? ` named ${only}` : ""}`);
  let updates = 0, current = 0, toPublic = 0, rowsTotal = 0;
  const warnings: string[] = [];

  for (const id of ids) {
    const s = SHIFTS[id];
    const examId = requireExamId(tierOf(id));
    const blocks = parseTranscript(readFileSync(join(TRANSCRIPTS, `${id}.txt`), "utf8"));
    const { data, error } = await db
      .from("questions")
      .select("id, question_number, solution, visibility")
      .eq("exam_id", examId)
      .eq("source_file", s.sourceFile);
    if (error) throw new Error(`${id}: ${error.message}`);
    const rows = (data ?? []).map((r) => ({ id: r.id as string, questionNumber: String(r.question_number), solution: r.solution as string | null, visibility: r.visibility as string }));
    const plan = planSolutionSync(blocks, rows);
    const flip = toPublish(rows, HELD[id] ?? []);
    const priv = flip.ids.length;
    rowsTotal += rows.length;
    updates += plan.updates.length;
    current += plan.current;
    toPublic += priv;
    for (const n of plan.edited) warnings.push(`${id} Q${n}: solution edited in the bank since commit; notice NOT added`);
    for (const n of plan.absent) {
      const q = blocks.find((b) => b.number === n)!;
      if (q.notice) warnings.push(`${id} Q${n}: flawed repeat; its row lives under an earlier shift, which carries no notice for it`);
    }
    console.log(`${id}  rows ${rows.length}  notices to add ${plan.updates.length}  to PUBLIC ${priv}${flip.held.length ? `  held PRIVATE ${flip.held.join(",")}` : ""}${plan.absent.length ? `  repeats ${plan.absent.join(",")}` : ""}`);

    if (!apply) continue;
    for (const u of plan.updates) {
      const { error: e } = await db.from("questions").update({ solution: u.solution }).eq("id", u.id);
      if (e) throw new Error(`${id} Q${u.number}: ${e.message}`);
    }
    // By id, in chunks: a held row must stay PRIVATE, and .in() puts its list in the URL.
    for (let k = 0; k < flip.ids.length; k += 200) {
      const { error: e } = await db.from("questions").update({ visibility: "PUBLIC" }).in("id", flip.ids.slice(k, k + 200));
      if (e) throw new Error(`${id} visibility: ${e.message}`);
    }
  }

  console.log(`\n${ids.length} shift(s), ${rowsTotal} rows: ${updates} notice(s) to add, ${current} solution(s) already current, ${toPublic} row(s) to make PUBLIC`);
  for (const w of warnings) console.log(`  ! ${w}`);
  console.log(apply ? "\napplied." : "\n[dry-run] pass --apply to write.");
}

if (require.main === module)
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
