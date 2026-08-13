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
  /**
   * MUST STAY ABOVE AUTOVACUUM'S OWN TRIGGER. Raised 20 → 35 on 2026-08-13.
   *
   * Postgres vacuums at `autovacuum_vacuum_threshold + scale_factor × live` =
   * 50 + 0.2 × live, i.e. 9,415 dead rows on `questions`. The old 20% rule fired
   * at 9,365 — the same point — so it could only ever report a condition the
   * database was already fixing, and its message said exactly that. It never
   * fired once in eleven snapshots.
   *
   * Real history shows the healthy sawtooth (7.7 → 14.5 → 18.3 → 7.2 → 14.0):
   * it climbs, autovacuum runs, it drops. Warning inside that band would report
   * normal operation. At 35% autovacuum is genuinely not keeping up — which is
   * a finding. The thing that actually predicts slow index-only scans is
   * visibility-map coverage below, NOT this.
   */
  deadRowsWarnPct: 35,

  /**
   * Visibility-map coverage — the share of a table's heap pages VACUUM has
   * marked all-visible. Below this, an "Index Only Scan" keeps going to the heap.
   *
   * Gated on table SIZE, not row count: `user_activity` has the worst ratio on
   * this database (30.4%) across 56 pages — under half a megabyte, costing
   * nothing. 1,000 pages is ~8 MB, and today only `questions` (7,742 pages,
   * 67.4%) and `options` (1,716, 66.0%) clear it. That keeps the rule at two
   * genuine notes rather than a wall of noise.
   *
   * CALIBRATION IS PROVISIONAL. 80% is where the two known-slow tables land on
   * the wrong side and everything else on the right; it has not yet met a week
   * of real data. The spill thresholds needed loosening on first contact, and
   * this one may too — a level that fires every single day is not information.
   */
  visibilityCoverageMinPages: 1000,
  visibilityCoverageWarnPct: 80,

  /**
   * Database-level spill we cannot pin on any collected query. Below this it is
   * ordinary background noise (autovacuum, the collector's own scan); above it,
   * something is spilling that we are not watching.
   */
  unattributedSpillMinBytes: 50 * 1024 * 1024,
  unattributedSpillFraction: 0.5,

  /**
   * How full `pg_stat_statements` may get before it costs real disk IO.
   *
   * Measured 2026-08-09, not guessed. Supabase's postgres_exporter reads the
   * ENTIRE store every minute; at 4,868 of 5,000 entries (3.8 MB of query text
   * against 2.1 MB of work_mem) that read spilled ~5.8 MB to disk twice a
   * minute — 13 GB/day, and the single largest consumer of the disk-IO budget
   * on a 164 MB database. Resetting the store halved it immediately.
   *
   * 0.8 is where the text crosses work_mem on this instance with margin to act;
   * 0.95 is where eviction starts and the tracker's own inputs go lossy.
   */
  statementStoreWarnFraction: 0.8,
  statementStoreCriticalFraction: 0.95,
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
      // A first-seen or counter-restarted row carries LIFETIME figures, not
      // this window's. Thresholding on them invents findings out of history.
      if (!q.windowKnown) continue;
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
      /**
       * What the collected queries can account for.
       *
       * A row with a known window contributes its delta outright. A FIRST-SEEN
       * row is the awkward case, and both naive answers are wrong:
       *
       *  - Excluding it always (the rule until 2026-08-13) produced a false
       *    alarm on 08-12. Four of the six spilling queries were first-seen, so
       *    177 MB was dropped and the report announced it could only account
       *    for 0.9 MB of a 113 MB window — while the missing 177 MB sat in the
       *    same `queries` array it was reading.
       *  - Including it always would let a newly-COLLECTED query launder months
       *    of lifetime history into this window and silence a genuine finding.
       *    Migration 0070 made 100 long-lived queries appear at once, which is
       *    exactly that scenario.
       *
       * The discriminator is a physical bound, not a heuristic: no single query
       * can have spilled more IN THIS WINDOW than the entire database did. Under
       * that bound a first-seen figure is credible as window activity; over it,
       * the figure is provably a lifetime total and is ignored.
       */
      const claimed = delta.queries.reduce((sum, q) => {
        const spill = Math.max(0, q.tempBytesDelta);
        if (q.windowKnown) return sum + spill;
        return spill <= dbSpill ? sum + spill : sum;
      }, 0);
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

  // The pg_stat_statements store. Both rules are skipped entirely when the
  // reading is null — a snapshot from before migration 0071 did not record it,
  // and treating "not recorded" as 0 would report a measurement we never took.
  const tracked = delta.statementsTracked;
  const storeMax = delta.statementsMax;
  if (tracked !== null && storeMax !== null && storeMax > 0) {
    const fraction = tracked / storeMax;
    if (fraction >= THRESHOLDS.statementStoreWarnFraction) {
      flags.push({
        level: fraction >= THRESHOLDS.statementStoreCriticalFraction ? "critical" : "warn",
        code: "statement-store-full",
        message:
          `pg_stat_statements holds ${tracked} of ${storeMax} entries (${(fraction * 100).toFixed(0)}%). ` +
          `Supabase's postgres_exporter reads the whole store every minute, so its cost scales with this ` +
          `number — at 97% full it was spilling ~13 GB/day to disk. Most of the store is one-off script ` +
          `queries that will never run again. Clear it with: select pg_stat_statements_reset();`,
      });
    }
  }

  if (delta.statementsEvictions !== null && delta.statementsEvictions > 0) {
    flags.push({
      level: "warn",
      code: "statement-store-evicting",
      message:
        `pg_stat_statements has discarded entries ${delta.statementsEvictions} time(s) because it filled up. ` +
        `What it discards is THIS REPORT'S OWN INPUT, so the query-level figures above are under-counted ` +
        `and cannot say by how much. Clear the store to reset it: select pg_stat_statements_reset();`,
    });
  }

  for (const t of delta.tables) {
    if (t.liveRows < THRESHOLDS.deadRowsMinLiveRows) continue;
    const deadPct = (t.deadRows / t.liveRows) * 100;
    if (deadPct < THRESHOLDS.deadRowsWarnPct) continue;
    flags.push({
      level: "info",
      code: "dead-rows",
      message:
        `${t.name} carries ${deadPct.toFixed(0)}% dead rows (${t.deadRows} of ${t.liveRows}) — ` +
        `past the point where autovacuum should already have cleared it, so it is not keeping up here.`,
    });
  }

  // Visibility-map coverage. Skipped entirely when the pages were not recorded:
  // a snapshot predating migration 0076 has no reading, and 0 pages all-visible
  // out of 0 is not a measurement.
  for (const t of delta.tables) {
    const pages = t.heapPages ?? null;
    const visible = t.allVisiblePages ?? null;
    if (pages === null || visible === null) continue;
    if (pages < THRESHOLDS.visibilityCoverageMinPages) continue;
    const coverage = (visible / pages) * 100;
    if (coverage >= THRESHOLDS.visibilityCoverageWarnPct) continue;
    flags.push({
      level: "info",
      code: "visibility-map-coverage",
      message:
        `${t.name} has ${coverage.toFixed(0)}% of its ${t.heapPages} heap pages marked all-visible ` +
        `(${t.allVisiblePages}). Index-only scans must visit the table for the rest — on questions at ` +
        `67% this cost 13,092 heap fetches on one /browse query. Dead rows do NOT predict this ` +
        `(bulk inserts create pages with neither), so it is tracked separately. A manual ` +
        `VACUUM lifts it; under continuous ingestion it decays again.`,
    });
  }

  return flags.sort((a, b) => RANK[a.level] - RANK[b.level]);
}
