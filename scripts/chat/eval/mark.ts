/**
 * Record a person's marks on a V test run and print the score per job
 * (V_SPEC.md, migration 0176).
 *
 *   npx tsx scripts/chat/eval/mark.ts <marks.json> [--run=<run id>]   default: the latest run
 *   npx tsx scripts/chat/eval/mark.ts --score [--run=<run id>]       score only
 *
 * marks.json: [{ "case": "<case id or its first 8 characters>", "mark": "pass|fail", "note": "why" }]
 * Marks are made in a Claude Code session reading the run's report, never by a
 * paid grader model (owner, 2026-10-22).
 */
import { join } from "node:path";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { scoreByJob, type VJob } from "../../lib/vEval";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Mark = { case: string; mark: "pass" | "fail"; note?: string };

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  // A run is named by its id or the id's first characters, as the report prints it.
  const runArg = process.argv.find((a) => a.startsWith("--run="))?.slice(6);
  const { data: runs, error: runsErr } = await db.from("v_eval_runs").select("id").order("started_at", { ascending: false });
  if (runsErr) throw new Error(runsErr.message);
  const runId = ((runArg ? (runs ?? []).find((r) => (r.id as string).startsWith(runArg)) : runs?.[0])?.id as string | undefined) ?? null;
  if (!runId) throw new Error(runArg ? `no run ${runArg}` : "no run yet");

  const { data: rows, error } = await db
    .from("v_eval_results")
    .select("case_id, auto_pass, mark, v_eval_cases(job, active)")
    .eq("run_id", runId);
  if (error) throw new Error(error.message);
  // Inactive cases (ones the runner cannot replay) are left out of the score.
  const results = ((rows ?? []) as unknown as {
    case_id: string;
    auto_pass: boolean;
    mark: "pass" | "fail" | null;
    v_eval_cases: { job: VJob; active: boolean };
  }[]).filter((r) => r.v_eval_cases.active);

  const file = process.argv[2];
  if (file && !file.startsWith("--")) {
    const marks = JSON.parse(readFileSync(file, "utf8")) as Mark[];
    for (const m of marks) {
      if (m.mark !== "pass" && m.mark !== "fail") throw new Error(`${m.case}: mark must be pass or fail`);
      const hits = results.filter((r) => r.case_id.startsWith(m.case));
      if (hits.length !== 1) throw new Error(`${m.case}: matches ${hits.length} cases in this run`);
      const { error: upErr } = await db
        .from("v_eval_results")
        .update({ mark: m.mark, mark_note: m.note ?? null })
        .eq("run_id", runId)
        .eq("case_id", hits[0].case_id);
      if (upErr) throw new Error(upErr.message);
      hits[0].mark = m.mark;
    }
    console.log(`${marks.length} marks saved on run ${runId.slice(0, 8)}.`);
  }

  console.log("\n| Job | Cases | Pass | Automatic pass | Marked | Marked pass |\n|---|---|---|---|---|---|");
  for (const s of scoreByJob(results.map((r) => ({ job: r.v_eval_cases.job, autoPass: r.auto_pass, mark: r.mark })))) {
    console.log(`| ${s.job} | ${s.cases} | ${s.pass} (${Math.round((100 * s.pass) / s.cases)}%) | ${s.autoPass} | ${s.marked} | ${s.markedPass} |`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
