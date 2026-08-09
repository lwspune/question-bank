import { computeDelta, MIN_RATE_WINDOW_HOURS } from "./delta";
import type { HealthSnapshot } from "./types";

/** A row as it comes back from `db_health_snapshots` over PostgREST. */
type Row = Record<string, unknown>;

/**
 * PostgREST returns `bigint` and `numeric` as STRINGS (they exceed what JSON
 * numbers can safely carry), so every numeric column needs coercing. Silent
 * string-vs-number confusion here would show up as a concatenation or a NaN in
 * the report, not as an error.
 */
const n = (v: unknown): number => Number(v ?? 0);

/**
 * Like `n`, but preserves NULL as null.
 *
 * Columns added by migration 0071 are absent on every earlier row, and the
 * difference between "we did not record this" and "this was zero" is exactly
 * what the report must not blur — a stored NULL would otherwise render as a
 * measured 0% and read as an all-clear.
 */
const nOrNull = (v: unknown): number | null => (v === null || v === undefined ? null : Number(v));

/**
 * Map a stored row back into the snapshot shape the pure core expects.
 *
 * SHARED BY THE CLI AND THE PAGE ON PURPOSE. Two hand-written mappers for one
 * view-model drift, and the drift is invisible on whichever surface nobody
 * re-checks — that is how the JEE numeric answer rendered blank on /browse
 * while /saved showed it correctly (2026-08-05).
 */
export function rowToSnapshot(r: Row): HealthSnapshot {
  return {
    capturedAt: String(r.captured_at),
    statsReset: String(r.stats_reset),
    dbSizeBytes: n(r.db_size_bytes),
    connections: n(r.connections),
    maxConnections: n(r.max_connections),
    cacheHitPct: n(r.cache_hit_pct),
    tempBytes: n(r.temp_bytes),
    tempFiles: n(r.temp_files),
    deadlocks: n(r.deadlocks),
    rollbacks: n(r.rollbacks),
    largestGroupRows: n(r.largest_group_rows),
    statementsTracked: nOrNull(r.statements_tracked),
    statementsMax: nOrNull(r.statements_max),
    statementsEvictions: nOrNull(r.statements_evictions),
    tables: (r.tables ?? []) as HealthSnapshot["tables"],
    queries: (r.queries ?? []) as HealthSnapshot["queries"],
  };
}

export type HistoryRow = {
  capturedAt: string;
  dbSizeBytes: number;
  largestGroupRows: number;
  /** Growth since the previous snapshot; null for the oldest row. */
  dbSizeGrowthBytes: number | null;
  /** null when there is no previous row, the counters reset, or the window is too short. */
  tempBytesPerDay: number | null;
  elapsedHours: number | null;
  countersAvailable: boolean;
  windowTooShort: boolean;
};

/**
 * Turn stored rows into a newest-first history, each row carrying the window
 * between it and its predecessor. This is the view the CLI cannot give you —
 * it only ever compares the latest two.
 *
 * Every per-window value routes through `computeDelta`, so the same three
 * refusals apply here as everywhere else (stats reset · entry eviction · window
 * too short to extrapolate) and the table can never show a rate the report
 * would decline to print.
 */
export function buildHistory(rows: Row[]): HistoryRow[] {
  // Sort rather than trust the caller's ORDER BY — a wrong order here would
  // silently produce negative growth and backwards windows.
  const snapshots = rows
    .map(rowToSnapshot)
    .sort((a, b) => Date.parse(b.capturedAt) - Date.parse(a.capturedAt));

  return snapshots.map((curr, i) => {
    const prev = snapshots[i + 1] ?? null; // newest-first, so the NEXT index is older
    const d = computeDelta(prev, curr);
    return {
      capturedAt: curr.capturedAt,
      dbSizeBytes: curr.dbSizeBytes,
      largestGroupRows: curr.largestGroupRows,
      dbSizeGrowthBytes: d.dbSizeGrowthBytes,
      tempBytesPerDay: d.tempBytesPerDay,
      elapsedHours: prev ? d.elapsedHours : null,
      countersAvailable: d.counters.available,
      windowTooShort: prev ? d.elapsedHours < MIN_RATE_WINDOW_HOURS : false,
    };
  });
}
