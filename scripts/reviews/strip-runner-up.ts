/**
 * Drop the solver's "runner-up" asides from CSE and CAPF solutions (2026-11-19,
 * SUGGESTIONS.md ledger "Blind-pass solutions shipped in solver voice").
 *
 *   npx tsx --env-file=<.env.local> scripts/reviews/strip-runner-up.ts [--report=<file>] [--apply]
 *
 * Fixes BOTH places, so a re-commit cannot bring the asides back:
 *   - `reasoning` in scripts/{upsc,capf}/data/*.answers.json (the source of record)
 *   - `questions.solution` for the two exams (solution only: content_hash unchanged)
 * Dry run by default: writes a report of every removed sentence and changes nothing.
 * Each DB update is guarded on the old solution text, so a row edited meanwhile is skipped.
 */
import { createClient } from "@supabase/supabase-js";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { stripRunnerUp } from "../upsc/lib";

const APPLY = process.argv.includes("--apply");
const REPORT = process.argv.find((a) => a.startsWith("--report="))?.slice(9);
const EXAMS = ["UPSC CSE (Prelims)", "UPSC CAPF (AC)"];
const lines: string[] = [];

// 1. Source of record.
let jsonRows = 0;
for (const lane of ["upsc", "capf"]) {
  const dir = join("scripts", lane, "data");
  for (const f of readdirSync(dir).filter((n) => n.endsWith(".answers.json"))) {
    const path = join(dir, f);
    const raw = readFileSync(path, "utf8");
    const doc = JSON.parse(raw);
    let changed = false;
    for (const a of doc.answers) {
      const r = stripRunnerUp(a.reasoning);
      for (const s of r.inline) lines.push(`INLINE JSON ${lane}/${f} Q${a.number}: ${s}`);
      if (!r.removed.length) continue;
      jsonRows++;
      changed = true;
      a.reasoning = r.text;
      lines.push(`JSON ${lane}/${f} Q${a.number}: ${r.removed.join(" || ")}`);
    }
    if (changed && APPLY) writeFileSync(path, JSON.stringify(doc, null, 2) + (raw.endsWith("\n") ? "\n" : ""));
  }
}

async function main() {
  // 2. The bank.
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: exams, error: e1 } = await db.from("exams").select("id, name").in("name", EXAMS);
  if (e1 || exams?.length !== EXAMS.length) throw new Error(`exam lookup failed: ${e1?.message ?? exams?.length}`);

  let dbRows = 0;
  let applied = 0;
  for (const exam of exams) {
    for (let from = 0; ; from += 1000) {
      const { data, error } = await db
        .from("questions")
        .select("id, solution")
        .eq("exam_id", exam.id)
        .ilike("solution", "%runner-up%")
        .order("id")
        .range(from, from + 999);
      if (error) throw new Error(error.message);
      for (const q of data ?? []) {
        const r = stripRunnerUp(q.solution as string);
        for (const s of r.inline) lines.push(`INLINE DB ${exam.name} ${q.id}: ${s}`);
        if (!r.removed.length) continue;
        dbRows++;
        lines.push(`DB ${exam.name} ${q.id}: ${r.removed.join(" || ")}`);
        if (!APPLY) continue;
        const { error: ue, count } = await db
          .from("questions")
          .update({ solution: r.text }, { count: "exact" })
          .eq("id", q.id)
          .eq("solution", q.solution as string);
        if (ue) throw new Error(`${q.id}: ${ue.message}`);
        if (count === 1) applied++;
        else lines.push(`  !! skipped ${q.id}: solution changed since read`);
      }
      if ((data ?? []).length < 1000) break;
    }
  }

  const summary = `${APPLY ? "APPLIED" : "DRY RUN"}: ${jsonRows} JSON answers, ${dbRows} DB rows${APPLY ? `, ${applied} updated` : ""}`;
  lines.unshift(summary);
  if (REPORT) writeFileSync(REPORT, lines.join("\n") + "\n");
  console.log(summary);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
