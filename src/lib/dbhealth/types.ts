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
  /**
   * `pg_class.relpages` / `relallvisible` — heap pages, and how many of them
   * VACUUM has marked all-visible.
   *
   * Their RATIO is what decides whether an Index Only Scan is actually
   * index-only: for a page not marked all-visible, Postgres must visit the heap
   * anyway. On `questions` at 67.4% coverage that meant 13,092 heap fetches on a
   * scan reporting itself as Index Only — most of the cost behind the /browse
   * slowness.
   *
   * NOT predicted by `deadRows`: a bulk INSERT creates pages with no dead rows
   * that are also not marked all-visible, which is this project's whole
   * ingestion pattern. `syllabus_concepts` runs 0 dead rows at 43.2% coverage.
   *
   * OPTIONAL, and absent (not zero) on snapshots predating migration 0076 —
   * `rowToSnapshot` passes the stored jsonb straight through, so an older row
   * simply has no such key. Reporting that as 0% would invent a measurement.
   */
  heapPages?: number | null;
  allVisiblePages?: number | null;
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
  /**
   * How full `pg_stat_statements` is — entries tracked, and the `.max` ceiling.
   *
   * A GAUGE, and the one that predicts the disk-spill incident of 2026-08-09.
   * Supabase's postgres_exporter reads the entire store once a minute; at 4,868
   * entries (3.8 MB of query text) that read stopped fitting in work_mem and
   * spilled ~5.8 MB to disk twice a minute — 13 GB/day on a 164 MB database.
   * Clearing the store halved it on the spot. Cost scales with the store's SIZE,
   * so this is the number to watch, not the spill it eventually causes.
   *
   * null on snapshots taken before migration 0071: the reading was not recorded,
   * which is NOT the same as zero and must never be reported as a measurement.
   */
  statementsTracked: number | null;
  statementsMax: number | null;
  /**
   * `pg_stat_statements_info.dealloc` — how many times the store has been full
   * and silently discarded its least-used entries. Non-zero means THIS TRACKER'S
   * OWN INPUT is lossy: the discarded rows are query stats we would otherwise
   * have diffed, so the reports under-count and cannot say by how much.
   */
  statementsEvictions: number | null;
  /**
   * The store's size IN BYTES, and the work_mem it must fit inside.
   *
   * THE QUANTITY THAT ACTUALLY OVERFLOWS, and the reason migration 0080 exists.
   * `statementsTracked` was used as a proxy for it and is a bad one: Supabase's
   * exporter materialises whole ROWS, not query text, and the ratio between the
   * two moves with the mix of long ad-hoc SQL and short PostgREST statements.
   * On 2026-08-19 the store held 1,580 kB against 911 kB of text, and spilling
   * had begun while the entry-count rule read a comfortable 33% full.
   *
   * work_mem is RECORDED rather than assumed because it is the denominator, it
   * is settable per-role, and a hard-coded value goes silently wrong the day
   * the instance is resized.
   *
   * null on snapshots predating migration 0080 — not recorded, not zero.
   */
  statementsBytes: number | null;
  workMemBytes: number | null;
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
  /** See HealthSnapshot — null means "not recorded", never "zero". */
  statementsTracked: number | null;
  statementsMax: number | null;
  statementsEvictions: number | null;
  /** See HealthSnapshot — null means "not recorded", never "zero". */
  statementsBytes: number | null;
  workMemBytes: number | null;

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
