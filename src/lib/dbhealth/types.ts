/**
 * Shapes for the database health tracker.
 *
 * Everything Postgres exposes about query load is a CUMULATIVE counter with no
 * time dimension — `pg_stat_statements` can say a query has spilled 1,129 GB
 * since the stats were last reset, but not whether any of it happened today.
 * A snapshot is therefore only useful next to another snapshot; see
 * `computeDelta`.
 */

/** One row of `pg_stat_statements`, narrowed to what we act on. */
export type QueryStat = {
  /** bigint in Postgres — kept as a string so it survives JSON round-trips. */
  queryid: string;
  /** Truncated, whitespace-collapsed query text, for human identification. */
  label: string;
  calls: number;
  totalExecMs: number;
  /** temp_blks_written * block_size — disk spill, the disk-IO budget killer. */
  tempBytes: number;
  rows: number;
};

/** One row of `pg_stat_user_tables`, narrowed. */
export type TableStat = {
  name: string;
  liveRows: number;
  deadRows: number;
  totalBytes: number;
  seqScans: number;
  idxScans: number;
};

export type HealthSnapshot = {
  /** ISO timestamp this snapshot was taken. */
  capturedAt: string;
  /**
   * `pg_stat_statements_info.stats_reset`. Load-bearing: if this moves between
   * two snapshots every cumulative counter restarted at zero, and subtracting
   * them produces nonsense (usually negative).
   */
  statsReset: string;
  dbSizeBytes: number;
  connections: number;
  maxConnections: number;
  cacheHitPct: number;
  /** Cumulative `pg_stat_database.temp_bytes`. */
  tempBytes: number;
  tempFiles: number;
  deadlocks: number;
  rollbacks: number;
  /**
   * Largest number of PUBLIC questions in any single chapter — the distance to
   * the PostgREST 1000-row cap, which truncates silently and has caused five
   * separate production bugs in this repo.
   */
  largestGroupRows: number;
  tables: TableStat[];
  queries: QueryStat[];
};

export type QueryDelta = {
  queryid: string;
  label: string;
  callsDelta: number;
  tempBytesDelta: number;
  totalExecMsDelta: number;
  /** Mean disk spill per call WITHIN THE WINDOW. null when there were no calls. */
  tempBytesPerCall: number | null;
  /** Mean execution time per call within the window. null when no calls. */
  meanMsPerCall: number | null;
  callsPerDay: number | null;
  /** Not present in the previous snapshot at all. */
  isNew: boolean;
  /**
   * Whether this row's window figures mean anything.
   *
   * FALSE for a first-seen query and for one whose counters restarted. A query
   * absent from the previous snapshot is either genuinely new (lifetime is
   * roughly the window) or long-lived and merely newly COLLECTED (lifetime is
   * three months) — and nothing stored distinguishes them. Widening the
   * collector in migration 0070 made 100 queries "appear" at once, each
   * credited with its lifetime as if it happened in a 3-minute window. Callers
   * must NOT rank, sum or threshold on a row where this is false.
   */
  windowKnown: boolean;
  /** Cumulative calls since stats_reset — context for a first-seen row. */
  lifetimeCalls: number;
  /**
   * A counter went backwards without a global stats reset — pg_stat_statements
   * evicts entries under memory pressure and re-creates them at zero. The
   * reported delta is then the post-eviction value, which UNDER-counts.
   */
  suspectedReset: boolean;
};

export type HealthDelta = {
  isFirstRun: boolean;
  elapsedHours: number;
  /**
   * The window is too short to extrapolate a daily rate from, so every
   * `*PerDay` field is null even though the raw deltas are real.
   */
  windowTooShortForRates: boolean;
  from: string | null;
  to: string;
  /** Whether cumulative counters can be meaningfully subtracted at all. */
  counters: { available: boolean; reason?: string };

  // Gauges — point-in-time, always comparable, unaffected by a stats reset.
  dbSizeBytes: number;
  dbSizeGrowthBytes: number | null;
  connections: number;
  maxConnections: number;
  cacheHitPct: number;
  largestGroupRows: number;

  // Cumulative counters — null whenever they cannot be trusted.
  tempBytesDelta: number | null;
  tempBytesPerDay: number | null;
  tempFilesDelta: number | null;
  deadlocksDelta: number | null;
  rollbacksDelta: number | null;

  /** Per-query, ranked by calls in the window (never by lifetime total). */
  queries: QueryDelta[];
  tables: TableStat[];
};
