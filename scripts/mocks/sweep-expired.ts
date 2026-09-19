/**
 * Grade the mock attempts whose timer ran out while nobody was watching.
 *
 * THE LEAK THIS CLOSES. `submitAttempt(id, "expired")` was only ever called by
 * the client runner, with the tab open. A student who closed their laptop
 * mid-paper left the attempt in `in_progress` permanently — no score, no result
 * page, no findings card, and none of their mistakes reaching `answer_wrong`,
 * which is the fuel /drill runs on. On 2026-09-19 that was 118 attempts and
 * 1,285 answered questions across 69 students, oldest 2026-07-10, still accruing.
 *
 * DRY RUN BY DEFAULT — `-- --apply` writes. Same convention as email:send and
 * itemstats:rollup, and for the same reason: this grades other people's work.
 *
 * Idempotent. `submitAttempt` guards on `status='in_progress'`, so a second run
 * grades nothing twice and a race with a live tab cannot double-submit.
 *
 * Runs on a schedule (.github/workflows/sweep-expired.yml). Reads service-role,
 * passing each attempt's own user_id — there is no session to borrow.
 */
import { join } from "node:path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

// Must precede the lib/mocks/service import below — it is marked `server-only`
// and that guard is worth keeping on the module that grades attempts.
import "../lib/serverOnly";

import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { submitAttempt } from "@/lib/mocks/service";
import { planSweep, SWEEP_GRACE_MS, type SweepCandidate } from "@/lib/mocks/sweep";

const APPLY = process.argv.includes("--apply");
const LIMIT = Number(process.argv.find((a) => a.startsWith("--limit="))?.split("=")[1] ?? 0);
const PAGE = 1000;

/**
 * Every `in_progress` attempt, paged.
 *
 * Paged rather than a bare .select() because the row payload IS the answer
 * here — PostgREST truncates at 1000 with no error, and a silently short list
 * would leave attempts stranded while reporting success.
 */
async function loadInProgress(db: SupabaseClient): Promise<SweepCandidate[]> {
  const out: SweepCandidate[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("mock_attempts")
      .select("id, user_id, started_at, expires_at")
      .eq("status", "in_progress")
      .order("expires_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`loadInProgress: ${error.message}`);
    const rows = (data ?? []) as Record<string, unknown>[];
    for (const r of rows) {
      out.push({
        attemptId: r.id as string,
        userId: r.user_id as string,
        startedAt: r.started_at as string,
        expiresAt: (r.expires_at as string | null) ?? null,
      });
    }
    if (rows.length < PAGE) break;
  }
  return out;
}

async function main() {
  const db = createSupabaseAdminClient();
  const now = new Date();

  const candidates = await loadInProgress(db);
  const plan = planSweep(candidates, now, SWEEP_GRACE_MS);
  const targets = LIMIT > 0 ? plan.sweep.slice(0, LIMIT) : plan.sweep;

  console.log(`${APPLY ? "APPLY" : "DRY RUN"} — grace ${SWEEP_GRACE_MS / 60_000} min, now ${now.toISOString()}`);
  console.log(`in_progress: ${candidates.length}  |  sweepable: ${plan.sweep.length}  |  left alone: ${plan.skipped.length}`);

  const noExpiry = plan.skipped.filter((s) => s.reason === "no-expiry");
  if (noExpiry.length > 0) {
    // Never guessed, always reported — a row we cannot stamp truthfully is a
    // human's call, not the script's.
    console.error(`!! ${noExpiry.length} attempt(s) have no usable expires_at and were NOT graded:`);
    for (const s of noExpiry) console.error(`     ${s.attemptId}`);
    process.exitCode = 1;
  }

  if (targets.length === 0) {
    console.log("Nothing to grade.");
    return;
  }

  const students = new Set(targets.map((t) => t.userId));
  console.log(`\nWould grade ${targets.length} attempt(s) across ${students.size} student(s):`);
  for (const t of targets.slice(0, 10)) {
    console.log(`  ${t.attemptId.slice(0, 8)}  user=${t.userId.slice(0, 8)}  submitted_at <- ${t.at}`);
  }
  if (targets.length > 10) console.log(`  … and ${targets.length - 10} more`);

  if (!APPLY) {
    console.log("\nDRY RUN — nothing written. Re-run with `-- --apply` to grade these.");
    return;
  }

  let graded = 0;
  let failed = 0;
  for (const t of targets) {
    try {
      // The existing grader, not a second one: it writes the score, the section
      // breakdown and the activity rows in the shape every reader expects.
      const summary = await submitAttempt(db, t.userId, t.attemptId, "expired", new Date(t.at));
      graded++;
      console.log(`  graded ${t.attemptId.slice(0, 8)}  ${summary.score}/${summary.maxScore}  (${summary.correct}✓ ${summary.wrong}✗ ${summary.skipped}–)`);
    } catch (e) {
      failed++;
      console.error(`  FAILED ${t.attemptId}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  console.log(`\nGraded ${graded}, failed ${failed}, of ${targets.length}.`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
