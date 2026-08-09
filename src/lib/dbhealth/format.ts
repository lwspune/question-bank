import type { Flag } from "./flags";
import type { HealthDelta } from "./types";

/** Human byte sizes. Uses the same binary units as pg_size_pretty. */
export function bytes(n: number | null): string {
  if (n === null) return "—";
  const neg = n < 0;
  let v = Math.abs(n);
  const units = ["B", "kB", "MB", "GB", "TB"];
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i += 1;
  }
  const s = `${v < 10 && i > 0 ? v.toFixed(1) : Math.round(v)} ${units[i]}`;
  return neg ? `-${s}` : s;
}

function num(n: number | null): string {
  return n === null ? "—" : n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

const ICON: Record<Flag["level"], string> = { critical: "!!", warn: " !", info: "  " };

/**
 * Render the report a human reads. Deliberately plain text: this is meant to be
 * skimmed in a terminal or pasted into a note, and it is REPORT-ONLY — nothing
 * here pages anyone or blocks a build.
 */
export function renderReport(delta: HealthDelta, flags: Flag[]): string {
  const out: string[] = [];
  const window =
    delta.isFirstRun || delta.from === null
      ? "first snapshot — no window to compare yet"
      : `${delta.from} → ${delta.to}  (${delta.elapsedHours.toFixed(1)} h)`;

  out.push("DATABASE HEALTH");
  out.push(`  window: ${window}`);
  out.push("");

  out.push("GAUGES (point-in-time)");
  out.push(`  database size        ${bytes(delta.dbSizeBytes)}   (change: ${delta.dbSizeGrowthBytes === null ? "—" : bytes(delta.dbSizeGrowthBytes)})`);
  out.push(`  connections          ${delta.connections} / ${delta.maxConnections}`);
  out.push(`  cache hit rate       ${delta.cacheHitPct}%`);
  out.push(`  largest chapter      ${num(delta.largestGroupRows)} PUBLIC questions  (PostgREST cap is 1000)`);
  // "not recorded" is printed as such. A snapshot from before migration 0071
  // has no reading, and showing 0 / 0 would look like a measurement.
  if (delta.statementsTracked === null || delta.statementsMax === null) {
    out.push("  query store          not recorded (snapshot predates migration 0071)");
  } else {
    const pct = delta.statementsMax > 0
      ? ` (${((delta.statementsTracked / delta.statementsMax) * 100).toFixed(0)}%)`
      : "";
    const eviction =
      delta.statementsEvictions === null
        ? ""
        : delta.statementsEvictions > 0
          ? `   evicted ${num(delta.statementsEvictions)}x — inputs lossy`
          : "   evicted 0";
    out.push(
      `  query store          ${num(delta.statementsTracked)} / ${num(delta.statementsMax)} entries${pct}${eviction}`
    );
  }
  out.push("");

  out.push("THIS WINDOW (cumulative counters)");
  if (!delta.counters.available) {
    out.push(`  not measurable — ${delta.counters.reason ?? "counters restarted"}`);
  } else {
    const rate = delta.windowTooShortForRates
      ? "window too short to extrapolate a daily rate"
      : `${bytes(delta.tempBytesPerDay)}/day`;
    out.push(`  disk spill           ${bytes(delta.tempBytesDelta)}   (${rate})`);
    out.push(`  temp files           ${num(delta.tempFilesDelta)}`);
    out.push(`  deadlocks            ${num(delta.deadlocksDelta)}`);
    out.push(`  rolled-back txns     ${num(delta.rollbacksDelta)}`);
  }
  out.push("");

  if (delta.counters.available && delta.queries.length > 0) {
    // Only rows whose window is known — a first-seen row carries a LIFETIME
    // figure, and printing it here would put months of history under a heading
    // that promises this window.
    const active = delta.queries.filter((q) => q.windowKnown && q.callsDelta > 0).slice(0, 10);
    const unknown = delta.queries.filter((q) => !q.windowKnown).length;
    if (active.length === 0) {
      out.push("BUSIEST QUERIES: none with a measurable window ran in this window.");
    } else {
      out.push("BUSIEST QUERIES (this window, not lifetime)");
      for (const q of active) {
        const marks = q.suspectedReset ? "counter-restarted" : "";
        out.push(
          `  ${num(q.callsDelta).padStart(9)} calls  ${bytes(q.tempBytesPerCall).padStart(9)}/call spill  ` +
            `${(q.meanMsPerCall ?? 0).toFixed(1).padStart(7)} ms  ${q.queryid}${marks ? `  [${marks}]` : ""}`
        );
        out.push(`            ${q.label.slice(0, 96)}`);
      }
    }
    if (unknown > 0) {
      out.push(
        `  (${unknown} newly-tracked ${unknown === 1 ? "query" : "queries"} omitted — first seen this snapshot, so their` +
          ` counters are lifetime totals, not this window's.)`
      );
    }
    out.push("");
  }

  if (flags.length === 0) {
    out.push("FINDINGS: none. Everything measured is within range.");
  } else {
    out.push("FINDINGS");
    for (const f of flags) out.push(`  ${ICON[f.level]} [${f.level}] ${f.code}: ${f.message}`);
  }

  return out.join("\n");
}
