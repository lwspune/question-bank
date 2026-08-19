import type { HealthDelta, HealthSnapshot, QueryDelta } from "./types";

const MS_PER_HOUR = 3_600_000;

/**
 * Shortest window we will extrapolate a daily rate from.
 *
 * Measured, not guessed: two snapshots two seconds apart reported "268 GB/day"
 * of disk spill from 7 MB of real activity — most of it the collector's own
 * query. The delta was true; the rate was nonsense. Below this threshold the
 * report shows the raw change and leaves the rate blank.
 */
export const MIN_RATE_WINDOW_HOURS = 1;

/** Rate per day, or null when the window is too short to extrapolate from. */
function perDay(value: number | null, elapsedHours: number): number | null {
  if (value === null || elapsedHours < MIN_RATE_WINDOW_HOURS) return null;
  return (value * 24) / elapsedHours;
}

function ratio(numerator: number, denominator: number): number | null {
  if (denominator <= 0) return null;
  return numerator / denominator;
}

/**
 * Compare two health snapshots.
 *
 * The contract that matters: this function NEVER reports a cumulative delta it
 * cannot stand behind. There are three ways the subtraction lies, and each one
 * yields `null` or an explicit flag rather than a plausible-looking number:
 *
 *   1. `pg_stat_statements` was reset between the snapshots — every counter
 *      restarted at zero, so `counters.available` goes false and all cumulative
 *      deltas are null. Point-in-time gauges are unaffected and still reported.
 *   2. An individual query entry was evicted and re-created (its counters
 *      restarted while the global reset timestamp did not move). Flagged as
 *      `suspectedReset`; the delta falls back to the current value, which
 *      under-counts and is labelled as such.
 *   3. The window is shorter than MIN_RATE_WINDOW_HOURS — the deltas are still
 *      real, but extrapolating them to a daily rate produces a fiction, so
 *      every `perDay` is null and `windowTooShortForRates` says why.
 *
 * `prev` is null on the first ever run; everything cumulative is then unknown,
 * which is honest — one reading of an odometer tells you nothing about speed.
 */
export function computeDelta(prev: HealthSnapshot | null, curr: HealthSnapshot): HealthDelta {
  const to = curr.capturedAt;

  const base = {
    dbSizeBytes: curr.dbSizeBytes,
    connections: curr.connections,
    maxConnections: curr.maxConnections,
    cacheHitPct: curr.cacheHitPct,
    largestGroupRows: curr.largestGroupRows,
    // Gauges, so they survive a stats reset and are reported on the first run
    // too — unlike everything cumulative below.
    statementsTracked: curr.statementsTracked,
    statementsMax: curr.statementsMax,
    statementsEvictions: curr.statementsEvictions,
    statementsBytes: curr.statementsBytes,
    workMemBytes: curr.workMemBytes,
    tables: curr.tables,
  };

  if (!prev) {
    return {
      ...base,
      isFirstRun: true,
      elapsedHours: 0,
      windowTooShortForRates: false,
      from: null,
      to,
      counters: { available: false, reason: "first run — no previous snapshot to compare against" },
      dbSizeGrowthBytes: null,
      tempBytesDelta: null,
      tempBytesPerDay: null,
      tempFilesDelta: null,
      deadlocksDelta: null,
      rollbacksDelta: null,
      queries: [],
    };
  }

  const elapsedMs = Date.parse(curr.capturedAt) - Date.parse(prev.capturedAt);
  if (elapsedMs < 0) {
    throw new Error(
      `computeDelta: snapshots are out of order — previous (${prev.capturedAt}) is newer than current (${curr.capturedAt})`
    );
  }
  const elapsedHours = elapsedMs / MS_PER_HOUR;

  const wasReset = Date.parse(curr.statsReset) > Date.parse(prev.statsReset);
  const counters = wasReset
    ? {
        available: false,
        reason: `pg_stat_statements was reset at ${curr.statsReset} — cumulative counters restarted, so this window cannot be measured`,
      }
    : { available: true };

  const cumulative = (a: number, b: number): number | null => (wasReset ? null : b - a);

  const tempBytesDelta = cumulative(prev.tempBytes, curr.tempBytes);

  return {
    ...base,
    isFirstRun: false,
    elapsedHours,
    windowTooShortForRates: elapsedHours < MIN_RATE_WINDOW_HOURS,
    from: prev.capturedAt,
    to,
    counters,
    // A gauge stays comparable across a stats reset — the database did not shrink
    // just because the statistics collector was cleared.
    dbSizeGrowthBytes: curr.dbSizeBytes - prev.dbSizeBytes,
    tempBytesDelta,
    tempBytesPerDay: perDay(tempBytesDelta, elapsedHours),
    tempFilesDelta: cumulative(prev.tempFiles, curr.tempFiles),
    deadlocksDelta: cumulative(prev.deadlocks, curr.deadlocks),
    rollbacksDelta: cumulative(prev.rollbacks, curr.rollbacks),
    queries: diffQueries(prev, curr, elapsedHours, wasReset),
  };
}

function diffQueries(
  prev: HealthSnapshot,
  curr: HealthSnapshot,
  elapsedHours: number,
  wasReset: boolean
): QueryDelta[] {
  const before = new Map(prev.queries.map((q) => [q.queryid, q]));

  // Driven by the CURRENT snapshot: a query that vanished (evicted, or simply
  // fell out of the top-N we collect) has no measurable activity to report.
  const out = curr.queries.map((q): QueryDelta => {
    const p = before.get(q.queryid);
    const isNew = p === undefined;

    // Any counter moving backwards means this entry restarted, whatever the
    // global reset timestamp says.
    const wentBackwards =
      p !== undefined && (q.calls < p.calls || q.tempBytes < p.tempBytes || q.totalExecMs < p.totalExecMs);
    const suspectedReset = !isNew && (wentBackwards || wasReset);

    // For a new or restarted entry the current value IS the window's activity
    // (an under-count in the restart case, which `suspectedReset` discloses).
    const useAbsolute = isNew || suspectedReset;
    const callsDelta = useAbsolute ? q.calls : q.calls - p!.calls;
    const tempBytesDelta = useAbsolute ? q.tempBytes : q.tempBytes - p!.tempBytes;
    const totalExecMsDelta = useAbsolute ? q.totalExecMs : q.totalExecMs - p!.totalExecMs;

    return {
      queryid: q.queryid,
      label: q.label,
      callsDelta,
      tempBytesDelta,
      totalExecMsDelta,
      tempBytesPerCall: ratio(tempBytesDelta, callsDelta),
      meanMsPerCall: ratio(totalExecMsDelta, callsDelta),
      callsPerDay: perDay(callsDelta, elapsedHours),
      isNew,
      suspectedReset,
      windowKnown: !isNew && !suspectedReset,
      lifetimeCalls: q.calls,
    };
  });

  // Rank by activity IN THE WINDOW — and only among rows where the window is
  // actually known. A first-seen row carries a lifetime figure, which would
  // otherwise dominate the ranking and pass itself off as window activity.
  return out.sort((a, b) => {
    if (a.windowKnown !== b.windowKnown) return a.windowKnown ? -1 : 1;
    return b.callsDelta - a.callsDelta;
  });
}
