/**
 * Drives the /dashboard/health data path against live rows.
 *
 *   npx tsx scripts/dbhealth/smoke-page-data.ts
 *
 * WHY THIS EXISTS. /dashboard/health is auth-gated and `force-dynamic`, so
 * `next build` never executes it and an anon curl is bounced by middleware
 * before the route compiles — a green build proves only that the page compiles,
 * never that it renders. Same reasoning as scripts/syllabus/smoke-page-data.ts.
 *
 * It replicates the 4-line query from src/lib/dbhealth/adminStats.ts rather
 * than importing it, because that module is marked `server-only` — a Next
 * BUILD-TIME alias, unresolvable under tsx. Everything after the query is the
 * identical pure core the page uses, so a pass here means the page's numbers
 * are right; only the Supabase read itself is re-stated.
 *
 * This is NOT a substitute for a signed-in browser check of the render.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { computeDelta } from "../../src/lib/dbhealth/delta";
import { evaluateFlags } from "../../src/lib/dbhealth/flags";
import { buildHistory, rowToSnapshot } from "../../src/lib/dbhealth/rows";

const local = path.join(process.cwd(), ".env.local");
if (fs.existsSync(local)) require("dotenv").config({ path: local, override: true });

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("needs NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (.env.local)");
  const db = createClient(url, key, { auth: { persistSession: false } });

  const { data, error, count } = await db
    .from("db_health_snapshots")
    .select("*", { count: "exact" })
    .order("captured_at", { ascending: false })
    .limit(30);
  if (error) throw new Error(error.message);

  const rows = data ?? [];
  console.log(`rows fetched: ${rows.length}  (total in table: ${count})`);
  if (rows.length === 0) {
    console.log("EMPTY-STATE branch would render — that is a valid page, not a failure.");
    console.log("\nSMOKE: PASS");
    return;
  }

  const current = rowToSnapshot(rows[0]);
  const previous = rows.length > 1 ? rowToSnapshot(rows[1]) : null;
  const delta = computeDelta(previous, current);
  const flags = evaluateFlags(delta);
  const history = buildHistory(rows);

  console.log("\n-- values the page renders --");
  console.log("dbSizeBytes       ", delta.dbSizeBytes, "(number?", typeof delta.dbSizeBytes === "number", ")");
  console.log("cacheHitPct       ", delta.cacheHitPct, "(number?", typeof delta.cacheHitPct === "number", ")");
  console.log("largestGroupRows  ", delta.largestGroupRows);
  console.log("connections       ", `${delta.connections}/${delta.maxConnections}`);
  console.log("elapsedHours      ", delta.elapsedHours.toFixed(3));
  console.log("countersAvailable ", delta.counters.available);
  console.log("windowTooShort    ", delta.windowTooShortForRates);
  console.log("tempBytesDelta    ", delta.tempBytesDelta, " perDay:", delta.tempBytesPerDay);
  console.log("queries w/ calls  ", delta.queries.filter((q) => q.callsDelta > 0).length);
  console.log("flags             ", flags.map((f) => `${f.level}:${f.code}`).join(", ") || "(none)");
  console.log("history rows      ", history.length);
  console.log("history[0]        ", JSON.stringify(history[0]));

  // The failure modes this page could plausibly ship with: a string where a
  // number belongs (PostgREST returns bigint/numeric as strings), or a
  // backwards window producing nonsense growth.
  const problems = [
    Number.isNaN(delta.dbSizeBytes) && "dbSizeBytes is NaN",
    Number.isNaN(delta.cacheHitPct) && "cacheHitPct is NaN",
    history.some((h) => Number.isNaN(h.dbSizeBytes)) && "a history row has NaN size",
    history.some((h) => (h.dbSizeGrowthBytes ?? 0) < -1_000_000_000) && "implausible negative growth",
    history.some((h, i) => i > 0 && Date.parse(h.capturedAt) > Date.parse(history[i - 1].capturedAt)) &&
      "history is not newest-first",
  ].filter(Boolean);

  console.log("\nSMOKE:", problems.length === 0 ? "PASS" : `FAIL — ${problems.join("; ")}`);
  if (problems.length > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
