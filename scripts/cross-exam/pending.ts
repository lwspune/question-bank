// After any ingest: which exam-twin runs have comparisons not yet made?
//
//   npm run twins:pending                 # every plan in scripts/cross-exam/pairs
//   npm run twins:pending -- <plan.json>  # one plan
//
// For each run of each plan, reads the chapters' current PUBLIC questions and
// subtracts what the settled runs read (their `reviewed` lists). A run listed
// here is redone with prep.ts --plan --run, which prepares only that work.
// Read-only; exits 0 (it is a to-do list, not a gate). Runbook: README.md.
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { pendingWork } from "@/lib/crossExam/pending";
import { PLAN_DIR, currentIds, doneSets, readPlan, runRefs, serviceClient } from "./bank";

async function main() {
  const arg = process.argv.slice(2).find((a) => !a.startsWith("--"));
  const plans = arg ? [arg] : readdirSync(PLAN_DIR).filter((f) => f.endsWith(".json")).map((f) => join(PLAN_DIR, f));
  const c = serviceClient();
  let todo = 0;
  let runs = 0;
  for (const path of plans) {
    const plan = readPlan(path);
    for (const run of plan.runs) {
      runs++;
      const done = doneSets(run.slug);
      const now = await currentIds(c, runRefs(plan, run));
      const parts = pendingWork(now, done);
      if (parts.length === 0) continue;
      todo++;
      const total = parts.reduce((n, p) => n + p.targets.length * p.board.length, 0);
      const what = done.length === 0
        ? "never run"
        : parts.map((p) => `${p.targets.length} exam x ${p.board.length} board`).join(" + ");
      console.log(`${run.slug}: ${what} (${total} comparisons)`);
      console.log(`  npx tsx scripts/cross-exam/prep.ts --plan=${path.replace(/\\/g, "/").replace(`${process.cwd().replace(/\\/g, "/")}/`, "")} --run=${run.slug}`);
    }
  }
  console.log(todo === 0 ? `all ${runs} runs up to date` : `${todo} of ${runs} runs have work to do`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
