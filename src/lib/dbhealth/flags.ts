import type { HealthDelta } from "./types";

/**
 * Thresholds for the health report.
 *
 * Every one of these watches something that has already caused a real incident
 * in this repo, and the numbers are set from the measured facts of those
 * incidents rather than from generic advice. Keep this list short: a report
 * that cries wolf gets ignored, and an ignored report is worse than none.
 */
export const THRESHOLDS = {
  /**
   * Disk spill per call. A well-shaped query writes ZERO — spill means Postgres
   * ran out of work_mem and went to disk. The /browse regression wrote 13.9 MB
   * per call to return 25 rows and produced 99.4% of the entire database's temp
   * writes, which is what drained the disk-IO budget.
   */
  spillPerCallWarnBytes: 1024 * 1024,
  spillPerCallCriticalBytes: 10 * 1024 * 1024,
  /**
   * ...but only once the query has spilled this much IN THE WINDOW. Volume is
   * what turns spill into an operational problem: 14 MB/call across thousands
   * of calls drained the disk budget, while a hand-run analysis query spilling
   * 5 MB once is irrelevant. Without this floor the first real run produced 20+
   * warnings, every one a one-off query — which is how a report gets ignored.
   */
  spillTotalMinBytes: 100 * 1024 * 1024,

  /**
   * PostgREST silently truncates a plain `.select()` at 1000 rows — no error,
   * just wrong answers. It has caused at least five separate bugs here. Warn
   * well before the cliff, because the fix (an aggregate RPC) is not a one-liner.
   */
  rowCapWarn: 800,
  rowCapCritical: 950,

  /** Supabase free plan. Confirm on the dashboard if the plan ever changes. */
  dbSizeCapBytes: 500 * 1024 * 1024,
  dbSizeWarnFraction: 0.8,
  dbSizeCriticalFraction: 0.9,

  connectionsWarnFraction: 0.8,

  /** Below this, reads are hitting disk instead of memory. Currently 100%. */
  cacheHitWarnPct: 99,

  /** Dead-row share only means something once a table is big enough to matter. */
  deadRowsMinLiveRows: 1000,
  deadRowsWarnPct: 20,

  /**
   * Database-level spill we cannot pin on any collected query. Below this it is
   * ordinary background noise (autovacuum, the collector's own scan); above it,
   * something is spilling that we are not watching.
   */
  unattributedSpillMinBytes: 50 * 1024 * 1024,
  unattributedSpillFraction: 0.5,
} as const;

export type FlagLevel = "critical" | "warn" | "info";

export type Flag = {
  level: FlagLevel;
  code: string;
  message: string;
};

const RANK: Record<FlagLevel, number> = { critical: 0, warn: 1, info: 2 };

const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export function evaluateFlags(delta: HealthDelta): Flag[] {
  const flags: Flag[] = [];

  // --- Cumulative-counter rules -------------------------------------------
  // Only evaluated when the window is genuinely measurable. Firing a spill
  // warning off numbers we know restarted would be inventing a finding.
  if (!delta.counters.available) {
    flags.push({
      level: "info",
      code: "counters-unavailable",
      message:
        delta.counters.reason ??
        "Cumulative counters could not be compared for this window; query-level findings are skipped.",
    });
  } else {
    for (const q of delta.queries) {
      const perCall = q.tempBytesPerCall;
      if (perCall === null || perCall < THRESHOLDS.spillPerCallWarnBytes) continue;
      if (q.tempBytesDelta < THRESHOLDS.spillTotalMinBytes) continue;
      const critical = perCall >= THRESHOLDS.spillPerCallCriticalBytes;
      flags.push({
        level: critical ? "critical" : "warn",
        code: "query-disk-spill",
        message:
          `Query ${q.queryid} spilled ${mb(perCall)} to disk per call across ${q.callsDelta} calls ` +
          `(${mb(q.tempBytesDelta)} total this window). A healthy query spills nothing — ` +
          `check for a sort or join over a wide row payload. ${q.label}`,
      });
    }

    // Spill the collected queries do not explain. Staying silent here would
    // read as "all clear" when it actually means "the culprit is off our radar".
    const dbSpill = delta.tempBytesDelta ?? 0;
    if (dbSpill >= THRESHOLDS.unattributedSpillMinBytes) {
      const claimed = delta.queries.reduce((sum, q) => sum + Math.max(0, q.tempBytesDelta), 0);
      if (claimed < dbSpill * THRESHOLDS.unattributedSpillFraction) {
        flags.push({
          level: "warn",
          code: "spill-unattributed",
          message:
            `The database wrote ${mb(dbSpill)} to disk this window but the tracked queries only account for ` +
            `${mb(claimed)}. Something is spilling that this snapshot does not cover — check ` +
            `pg_stat_statements directly, ordered by temp_blks_written.`,
        });
      }
    }

    if ((delta.deadlocksDelta ?? 0) > 0) {
      flags.push({
        level: "warn",
        code: "deadlocks",
        message: `${delta.deadlocksDelta} deadlock(s) in this window. There are normally none.`,
      });
    }
  }

  // --- Gauge rules ---------------------------------------------------------
  // Point-in-time, so they hold even when the counters were reset.
  if (delta.largestGroupRows >= THRESHOLDS.rowCapWarn) {
    const critical = delta.largestGroupRows >= THRESHOLDS.rowCapCritical;
    flags.push({
      level: critical ? "critical" : "warn",
      code: "row-cap-approaching",
      message:
        `The largest single chapter now holds ${delta.largestGroupRows} PUBLIC questions, against the ` +
        `PostgREST 1000-row response cap. Past that point a plain .select() truncates SILENTLY — ` +
        `no error, just undercounted results. Move the affected reads to an aggregate RPC.`,
    });
  }

  const sizeFraction = delta.dbSizeBytes / THRESHOLDS.dbSizeCapBytes;
  if (sizeFraction >= THRESHOLDS.dbSizeWarnFraction) {
    flags.push({
      level: sizeFraction >= THRESHOLDS.dbSizeCriticalFraction ? "critical" : "warn",
      code: "db-size",
      message: `Database is ${mb(delta.dbSizeBytes)}, ${(sizeFraction * 100).toFixed(0)}% of the ${mb(
        THRESHOLDS.dbSizeCapBytes
      )} plan cap.`,
    });
  }

  if (delta.maxConnections > 0 && delta.connections / delta.maxConnections >= THRESHOLDS.connectionsWarnFraction) {
    flags.push({
      level: "warn",
      code: "connections",
      message: `${delta.connections} of ${delta.maxConnections} connections in use.`,
    });
  }

  if (delta.cacheHitPct < THRESHOLDS.cacheHitWarnPct) {
    flags.push({
      level: "warn",
      code: "cache-hit",
      message: `Cache hit rate is ${delta.cacheHitPct}% (normally 100%) — reads are going to disk.`,
    });
  }

  for (const t of delta.tables) {
    if (t.liveRows < THRESHOLDS.deadRowsMinLiveRows) continue;
    const deadPct = (t.deadRows / t.liveRows) * 100;
    if (deadPct < THRESHOLDS.deadRowsWarnPct) continue;
    flags.push({
      level: "info",
      code: "dead-rows",
      message: `${t.name} carries ${deadPct.toFixed(0)}% dead rows (${t.deadRows} of ${t.liveRows}). Autovacuum usually clears this on its own.`,
    });
  }

  return flags.sort((a, b) => RANK[a.level] - RANK[b.level]);
}
