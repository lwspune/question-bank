/**
 * Database health tracker.
 *
 *   npm run db:health              # take a snapshot, store it, print the report
 *   npm run db:health -- --dry     # take a snapshot, print the report, store NOTHING
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
import { evaluateFlags } from "../../src/lib/dbhealth/flags";
import { renderReport } from "../../src/lib/dbhealth/format";
import type { HealthSnapshot } from "../../src/lib/dbhealth/types";

const local = path.join(process.cwd(), ".env.local");
if (fs.existsSync(local)) require("dotenv").config({ path: local, override: true });

const DRY = process.argv.includes("--dry");

function client(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("db:health needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (.env.local)");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

/** The stored row, mapped back into the snapshot shape the pure core expects. */
function rowToSnapshot(r: Record<string, unknown>): HealthSnapshot {
  return {
    capturedAt: String(r.captured_at),
    statsReset: String(r.stats_reset),
    dbSizeBytes: Number(r.db_size_bytes),
    connections: Number(r.connections),
    maxConnections: Number(r.max_connections),
    cacheHitPct: Number(r.cache_hit_pct),
    tempBytes: Number(r.temp_bytes),
    tempFiles: Number(r.temp_files),
    deadlocks: Number(r.deadlocks),
    rollbacks: Number(r.rollbacks),
    largestGroupRows: Number(r.largest_group_rows),
    tables: (r.tables ?? []) as HealthSnapshot["tables"],
    queries: (r.queries ?? []) as HealthSnapshot["queries"],
  };
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
    temp_bytes: current.tempBytes,
    temp_files: current.tempFiles,
    deadlocks: current.deadlocks,
    rollbacks: current.rollbacks,
    tables: current.tables,
    queries: current.queries,
  });
  if (insErr) throw new Error(`store snapshot: ${insErr.message}`);
  console.log(`\nSnapshot stored (${current.capturedAt}).`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
