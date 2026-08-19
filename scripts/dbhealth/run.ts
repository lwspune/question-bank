/**
 * Database health tracker.
 *
 *   npm run db:health                       # snapshot, store it, print the report
 *   npm run db:health -- --dry              # snapshot + report, store NOTHING
 *   npm run db:health -- --reset-if-needed  # ...and clear the query store if it
 *                                           # is approaching work_mem (CI only)
 *
 * WHY IT STORES ANYTHING AT ALL. Postgres' load counters are cumulative with no
 * time dimension — they answer "how much ever?" and never "how much today?".
 * One stored snapshot per day turns them into a rate by subtraction. Without
 * the stored history there is no way to tell a query that spilled 98 GB last
 * month from one spilling it right now, which is exactly the question left open
 * when the /browse wide-sort was fixed on 2026-08-05.
 *
 * Report-only by design: it prints, it never alerts and never fails a build.
 * A threshold that fires wrongly gets ignored, and an ignored report is worse
 * than no report.
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local —
 * db_health_snapshots and collect_db_health() are both service-role only.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { computeDelta } from "../../src/lib/dbhealth/delta";
import { evaluateFlags, THRESHOLDS } from "../../src/lib/dbhealth/flags";
import { renderReport } from "../../src/lib/dbhealth/format";
import { rowToSnapshot } from "../../src/lib/dbhealth/rows";
import type { HealthSnapshot } from "../../src/lib/dbhealth/types";

const local = path.join(process.cwd(), ".env.local");
if (fs.existsSync(local)) require("dotenv").config({ path: local, override: true });

const DRY = process.argv.includes("--dry");

/**
 * Clear pg_stat_statements after snapshotting, once it approaches work_mem.
 *
 * OPT-IN, NEVER THE DEFAULT. A reset is irreversible: every per-query counter
 * restarts, so the next report cannot compute window figures and every query
 * reads as first-seen. That is an acceptable price on a scheduled job that
 * records why it happened; it is NOT acceptable as a side effect of a human
 * asking for a report. The scheduled workflow passes this flag; running
 * `npm run db:health` by hand can never wipe the history.
 */
const RESET_IF_NEEDED = process.argv.includes("--reset-if-needed");

function client(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("db:health needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (.env.local)");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

async function main() {
  const sb = client();

  const { data: fresh, error: rpcErr } = await sb.rpc("collect_db_health");
  if (rpcErr) throw new Error(`collect_db_health: ${rpcErr.message}`);
  const current = fresh as unknown as HealthSnapshot;

  // The most recent stored row is the other half of the window. Read it BEFORE
  // inserting, or the new row becomes its own predecessor and every delta is 0.
  const { data: prevRows, error: prevErr } = await sb
    .from("db_health_snapshots")
    .select("*")
    .order("captured_at", { ascending: false })
    .limit(1);
  if (prevErr) throw new Error(`previous snapshot: ${prevErr.message}`);
  const previous = prevRows && prevRows.length > 0 ? rowToSnapshot(prevRows[0]) : null;

  const delta = computeDelta(previous, current);
  const flags = evaluateFlags(delta);
  console.log(renderReport(delta, flags));

  if (DRY) {
    console.log("\n(dry run — snapshot NOT stored)");
    return;
  }

  const { error: insErr } = await sb.from("db_health_snapshots").insert({
    captured_at: current.capturedAt,
    stats_reset: current.statsReset,
    db_size_bytes: current.dbSizeBytes,
    connections: current.connections,
    max_connections: current.maxConnections,
    cache_hit_pct: current.cacheHitPct,
    largest_group_rows: current.largestGroupRows,
    statements_tracked: current.statementsTracked,
    statements_max: current.statementsMax,
    statements_evictions: current.statementsEvictions,
    statements_bytes: current.statementsBytes,
    work_mem_bytes: current.workMemBytes,
    temp_bytes: current.tempBytes,
    temp_files: current.tempFiles,
    deadlocks: current.deadlocks,
    rollbacks: current.rollbacks,
    tables: current.tables,
    queries: current.queries,
  });
  if (insErr) throw new Error(`store snapshot: ${insErr.message}`);
  console.log(`\nSnapshot stored (${current.capturedAt}).`);

  await maybeResetStore(sb, current);
}

/**
 * Clear the query store once it approaches work_mem — the recurring cause of
 * this database's disk-spill incidents (13 GB/day in Aug 2026, then 2.7 GB/day
 * ten days after the first fix).
 *
 * ORDERING IS LOAD-BEARING: this runs AFTER the snapshot is stored. Resetting
 * first would destroy the very reading that justifies the reset, and the report
 * would show a healthy empty store with no record of why it was cleared.
 *
 * CONDITION-BASED, NOT CALENDAR-BASED. A monthly job would have missed the
 * 2026-08-19 incident outright: the store refilled from empty to the cliff in
 * TEN DAYS under heavy ingestion. The daily run is the clock; the threshold
 * decides.
 */
async function maybeResetStore(sb: SupabaseClient, current: HealthSnapshot) {
  if (!RESET_IF_NEEDED) return;

  const { statementsBytes, workMemBytes } = current;
  if (statementsBytes === null || workMemBytes === null || workMemBytes <= 0) {
    console.log("Store reset skipped — no byte reading to judge (snapshot predates migration 0080).");
    return;
  }

  const fraction = statementsBytes / workMemBytes;
  if (fraction < THRESHOLDS.storeBytesWarnFraction) {
    console.log(
      `Store reset not needed — ${(fraction * 100).toFixed(0)}% of work_mem ` +
        `(clears at ${(THRESHOLDS.storeBytesWarnFraction * 100).toFixed(0)}%).`
    );
    return;
  }

  const { data, error } = await sb.rpc("reset_statement_store");
  if (error) {
    // Never fail the run over this: the tracker is report-only, and a snapshot
    // that stored successfully is worth more than a clean exit code.
    console.error(`Store reset FAILED (snapshot is safe): ${error.message}`);
    return;
  }

  const r = (data ?? {}) as { clearedEntries?: number; clearedBytes?: number };
  // Say plainly that this was deliberate. Tomorrow's report will decline to
  // compute per-query window figures because stats_reset moved, and without
  // this line that refusal reads as a fault rather than as our own doing.
  console.log("");
  console.log(
    `Store RESET deliberately: cleared ${r.clearedEntries ?? "?"} entries ` +
      `(${Math.round((r.clearedBytes ?? 0) / 1024)} kB) at ${(fraction * 100).toFixed(0)}% of work_mem. ` +
      `Tomorrow's report will show every query as first-seen and will not compute ` +
      `per-query window figures — that is expected, not a fault.`
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
