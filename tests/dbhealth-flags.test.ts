import { describe, it, expect } from "vitest";
import { evaluateFlags, THRESHOLDS } from "@/lib/dbhealth/flags";
import type { HealthDelta, QueryDelta } from "@/lib/dbhealth/types";

/**
 * Each rule here exists because the thing it watches has already broken this
 * project once. The rules are deliberately few — a report nobody trusts is
 * worse than no report, and every extra threshold is another chance to cry wolf.
 */

const q = (over: Partial<QueryDelta>): QueryDelta => ({
  queryid: "1",
  label: "select ...",
  callsDelta: 100,
  tempBytesDelta: 0,
  totalExecMsDelta: 100,
  tempBytesPerCall: 0,
  meanMsPerCall: 1,
  callsPerDay: 100,
  isNew: false,
  suspectedReset: false,
  windowKnown: true,
  lifetimeCalls: 100,
  ...over,
});

const BASE: HealthDelta = {
  isFirstRun: false,
  elapsedHours: 24,
  windowTooShortForRates: false,
  from: "2026-08-07T00:00:00.000Z",
  to: "2026-08-08T00:00:00.000Z",
  counters: { available: true },
  dbSizeBytes: 158 * 1024 * 1024,
  dbSizeGrowthBytes: 1024,
  connections: 22,
  maxConnections: 60,
  cacheHitPct: 100,
  largestGroupRows: 346,
  tempBytesDelta: 0,
  tempBytesPerDay: 0,
  tempFilesDelta: 0,
  deadlocksDelta: 0,
  rollbacksDelta: 10,
  statementsTracked: 500,
  statementsMax: 5000,
  statementsEvictions: 0,
  queries: [],
  tables: [],
};

const d = (over: Partial<HealthDelta>): HealthDelta => ({ ...BASE, ...over });
const codes = (delta: HealthDelta) => evaluateFlags(delta).map((f) => f.code);

describe("evaluateFlags — a healthy database", () => {
  it("raises nothing when every gauge is in range", () => {
    expect(evaluateFlags(BASE)).toEqual([]);
  });
});

/** A repeating spiller: bad per call AND enough volume to matter. */
const spiller = (perCall: number, calls = 3000) =>
  q({ callsDelta: calls, tempBytesPerCall: perCall, tempBytesDelta: perCall * calls });

describe("evaluateFlags — disk spill (the /browse incident)", () => {
  it("flags a query spilling more than the per-call budget at volume", () => {
    const flags = evaluateFlags(d({ queries: [spiller(2 * 1024 * 1024)] }));
    expect(flags.map((f) => f.code)).toContain("query-disk-spill");
    expect(flags[0].level).toBe("warn");
  });

  it("escalates a severe spill to critical", () => {
    const flags = evaluateFlags(d({ queries: [spiller(14 * 1024 * 1024)] }));
    expect(flags.find((f) => f.code === "query-disk-spill")!.level).toBe("critical");
  });

  it("ignores a one-off query that spilled once", () => {
    // The first real run flooded the report with 20+ warnings, every one a
    // hand-run analysis query that executed ONCE and spilled ~5 MB. Noise like
    // that is how a report earns being ignored. Volume is what makes spill an
    // operational problem, so the total for the window has to clear a floor too.
    const oneOff = q({ callsDelta: 1, tempBytesPerCall: 5 * 1024 * 1024, tempBytesDelta: 5 * 1024 * 1024 });
    expect(codes(d({ queries: [oneOff] }))).not.toContain("query-disk-spill");
  });

  it("does not fire on a first-seen query, whose figures are lifetime not window", () => {
    // Migration 0070 widened collection and made 100 long-lived queries
    // "appear" at once. Treating their lifetime spill as this window's would
    // have manufactured a critical finding out of months-old history.
    const firstSeen = q({
      isNew: true,
      windowKnown: false,
      callsDelta: 3329,
      tempBytesPerCall: 9 * 1024 * 1024,
      tempBytesDelta: 30 * 1024 * 1024 * 1024,
    });
    expect(codes(d({ queries: [firstSeen] }))).not.toContain("query-disk-spill");
  });

  it("stays silent for a query that spilled historically but not in this window", () => {
    // The whole point of measuring per-window: 98 GB lifetime, 0 since the fix.
    expect(codes(d({ queries: [q({ tempBytesDelta: 0, tempBytesPerCall: 0 })] }))).not.toContain("query-disk-spill");
  });

  it("does not evaluate spill at all when counters are untrustworthy", () => {
    const flags = evaluateFlags(
      d({
        counters: { available: false, reason: "reset" },
        queries: [spiller(99 * 1024 * 1024)],
      })
    );
    expect(flags.map((f) => f.code)).not.toContain("query-disk-spill");
    expect(flags.map((f) => f.code)).toContain("counters-unavailable");
  });
});

describe("evaluateFlags — spill nobody claims", () => {
  it("reports database spill that no tracked query accounts for", () => {
    // Seen on the tracker's first run: 29 MB of database-level spill with an
    // empty query list. Silence there would read as "all clear", which is the
    // opposite of the truth — it means we are not watching the culprit.
    const flags = evaluateFlags(
      d({ tempBytesDelta: 200 * 1024 * 1024, queries: [q({ tempBytesDelta: 0, tempBytesPerCall: 0 })] })
    );
    expect(flags.map((f) => f.code)).toContain("spill-unattributed");
  });

  it("stays quiet when the tracked queries explain the spill", () => {
    const flags = evaluateFlags(
      d({
        tempBytesDelta: 200 * 1024 * 1024,
        queries: [q({ tempBytesDelta: 190 * 1024 * 1024, tempBytesPerCall: 1024 })],
      })
    );
    expect(flags.map((f) => f.code)).not.toContain("spill-unattributed");
  });

  it("does not let a first-seen query's lifetime spill explain away the window's", () => {
    // Otherwise a newly-collected query silently 'accounts for' spill it did
    // not do in this window, and the unattributed warning never fires.
    const flags = evaluateFlags(
      d({
        tempBytesDelta: 200 * 1024 * 1024,
        queries: [q({ isNew: true, windowKnown: false, tempBytesDelta: 30 * 1024 * 1024 * 1024 })],
      })
    );
    expect(flags.map((f) => f.code)).toContain("spill-unattributed");
  });

  it("ignores a trivial amount of unexplained spill", () => {
    expect(codes(d({ tempBytesDelta: 1024, queries: [] }))).not.toContain("spill-unattributed");
  });

  /**
   * FALSE POSITIVE FIXED 2026-08-13. The rule fired on a window where the spill
   * was fully recorded in the very snapshot the rule was reading.
   *
   * On 08-12 the database spilled 113 MB. Six queries had spill; FOUR of them
   * were first-seen, so `windowKnown` was false and they were dropped from the
   * total. The two survivors moved 0.9 MB between them — and 0.9 MB is exactly
   * what the warning reported as "all we can account for", while 177 MB sat in
   * the same `queries` array.
   *
   * The discriminator is ARITHMETIC, not a heuristic: a single query cannot have
   * spilled more IN THIS WINDOW than the whole database did. Under that bound a
   * first-seen row's figure is credible as window activity and counts; over it,
   * the figure is provably a lifetime total and is still ignored — which is what
   * keeps the test above (30 GB "appearing" inside a 200 MB window) green.
   */
  it("counts a first-seen spiller whose spill FITS inside the window", () => {
    // The real 08-12 shape: 113 MB of database spill, three newly-seen queries
    // at 81 / 63 / 32 MB. Each is physically possible within the window, so the
    // window IS explained and the warning must not fire.
    const MB = 1024 * 1024;
    const newSpiller = (mb: number) =>
      q({ isNew: true, windowKnown: false, callsDelta: 2, tempBytesDelta: mb * MB });
    const flags = evaluateFlags(
      d({
        tempBytesDelta: 113 * MB,
        queries: [newSpiller(81), newSpiller(63), newSpiller(32)],
      })
    );
    expect(flags.map((f) => f.code)).not.toContain("spill-unattributed");
  });

  it("still ignores a first-seen figure too large to be this window's", () => {
    // Same shape as the test above it, stated as the bound: 30 GB cannot have
    // been written in a window where the database wrote 200 MB, so the row is
    // carrying lifetime history and must not be allowed to explain anything.
    const flags = evaluateFlags(
      d({
        tempBytesDelta: 200 * 1024 * 1024,
        queries: [q({ isNew: true, windowKnown: false, tempBytesDelta: 30 * 1024 * 1024 * 1024 })],
      })
    );
    expect(flags.map((f) => f.code)).toContain("spill-unattributed");
  });
});

describe("evaluateFlags — the PostgREST 1000-row cap", () => {
  it("warns as a group approaches the cap", () => {
    expect(codes(d({ largestGroupRows: THRESHOLDS.rowCapWarn }))).toContain("row-cap-approaching");
  });

  it("goes critical once a group is nearly at the cap", () => {
    const f = evaluateFlags(d({ largestGroupRows: THRESHOLDS.rowCapCritical }));
    expect(f.find((x) => x.code === "row-cap-approaching")!.level).toBe("critical");
  });

  it("is quiet at today's largest chapter", () => {
    expect(codes(d({ largestGroupRows: 346 }))).not.toContain("row-cap-approaching");
  });
});

describe("evaluateFlags — capacity", () => {
  it("warns when the database nears the plan's size cap", () => {
    expect(codes(d({ dbSizeBytes: 0.85 * THRESHOLDS.dbSizeCapBytes }))).toContain("db-size");
  });

  it("warns when connections near the maximum", () => {
    expect(codes(d({ connections: 55, maxConnections: 60 }))).toContain("connections");
  });

  it("warns on a poor cache hit rate", () => {
    expect(codes(d({ cacheHitPct: 96 }))).toContain("cache-hit");
  });

  it("flags any deadlock in the window", () => {
    expect(codes(d({ deadlocksDelta: 1 }))).toContain("deadlocks");
  });
});

describe("evaluateFlags — table hygiene", () => {
  it("notes a large table carrying many dead rows", () => {
    const flags = evaluateFlags(
      d({ tables: [{ name: "questions", liveRows: 42536, deadRows: 20000, totalBytes: 1, seqScans: 0, idxScans: 0 }] })
    );
    expect(flags.map((f) => f.code)).toContain("dead-rows");
    expect(flags.find((f) => f.code === "dead-rows")!.level).toBe("info");
  });

  it("ignores dead rows on a small table, where the percentage is noise", () => {
    const flags = evaluateFlags(
      d({ tables: [{ name: "tiny", liveRows: 10, deadRows: 9, totalBytes: 1, seqScans: 0, idxScans: 0 }] })
    );
    expect(flags.map((f) => f.code)).not.toContain("dead-rows");
  });

  /**
   * THE THRESHOLD MUST SIT ABOVE AUTOVACUUM'S OWN TRIGGER (raised 20 → 35 on
   * 2026-08-13).
   *
   * Postgres vacuums a table when dead rows exceed `autovacuum_vacuum_threshold
   * + autovacuum_vacuum_scale_factor × live` = 50 + 0.2 × live. On `questions`
   * that is 9,415 rows; the old 20% rule fired at 9,365 — the SAME POINT. A
   * monitor placed where the automatic remediation already acts cannot carry
   * information, and the message said as much ("autovacuum usually clears this
   * on its own"). It had never once fired in 11 snapshots.
   *
   * Eleven days of real history show the healthy sawtooth: 7.7 → 8.8 → 14.5 →
   * 15.6 → 18.3 → 7.2 → 14.0. It climbs, autovacuum runs, it drops. Warning
   * anywhere inside that band reports normal operation as a problem.
   */
  it("sits above autovacuum's own trigger, so firing means autovacuum is losing", () => {
    expect(THRESHOLDS.deadRowsWarnPct).toBeGreaterThan(20);
  });

  it("stays quiet across the normal autovacuum sawtooth", () => {
    // 18.3% — the highest reading in eleven days of real snapshots, taken the
    // day before autovacuum brought it back down to 7.2%.
    const flags = evaluateFlags(
      d({ tables: [{ name: "questions", liveRows: 44631, deadRows: 8167, totalBytes: 1, seqScans: 0, idxScans: 0 }] })
    );
    expect(flags.map((f) => f.code)).not.toContain("dead-rows");
  });
});

/**
 * VISIBILITY-MAP COVERAGE — added 2026-08-13, the blind spot behind a real
 * slowdown.
 *
 * Postgres marks a page "all-visible" once VACUUM has confirmed every row on it
 * is visible to everyone. An Index Only Scan can skip the table for such pages
 * and MUST visit the table for the rest. That single ratio is what decides
 * whether an "index only" scan is actually index-only.
 *
 * Measured on `questions`: 67.4% coverage, and the plan showed 13,092 heap
 * fetches on a scan that reports itself as Index Only — about 57% of the cost of
 * the query behind the `/browse` slowness.
 *
 * DEAD ROWS DO NOT PREDICT THIS, and `syllabus_concepts` proves it: ZERO dead
 * rows — a perfect score on the metric already tracked — with 43.2% coverage.
 * The reason is the workload: a bulk INSERT creates pages that have no dead rows
 * AND are not marked all-visible, and this project ingests in batches of
 * thousands. So the existing rule can be green while the real problem is present.
 */
describe("evaluateFlags — visibility-map coverage", () => {
  const table = (over: Partial<HealthDelta["tables"][number]>) => ({
    name: "questions",
    liveRows: 46827,
    deadRows: 0,
    totalBytes: 64 * 1024 * 1024,
    seqScans: 0,
    idxScans: 0,
    ...over,
  });

  it("notes a large table whose pages are mostly not marked all-visible", () => {
    // The real reading: 5,216 of 7,742 pages = 67.4%.
    const flags = evaluateFlags(
      d({ tables: [table({ heapPages: 7742, allVisiblePages: 5216 })] })
    );
    const f = flags.find((x) => x.code === "visibility-map-coverage");
    expect(f).toBeDefined();
    expect(f!.message).toContain("questions");
  });

  it("stays quiet when coverage is healthy", () => {
    expect(
      codes(d({ tables: [table({ heapPages: 7742, allVisiblePages: 7500 })] }))
    ).not.toContain("visibility-map-coverage");
  });

  it("ignores a small table, where reading the whole heap is trivial anyway", () => {
    // user_activity sits at 30.4% coverage — the worst ratio on the database —
    // across 56 pages. That is under half a megabyte; it costs nothing and
    // flagging it would be pure noise. Size is what makes coverage matter.
    expect(
      codes(d({ tables: [table({ name: "user_activity", heapPages: 56, allVisiblePages: 17 })] }))
    ).not.toContain("visibility-map-coverage");
  });

  it("catches what the dead-row rule structurally cannot", () => {
    // syllabus_concepts: 0 dead rows, 43.2% coverage. The proof that these two
    // metrics are not interchangeable — scaled here to clear the size gate.
    const flags = evaluateFlags(
      d({ tables: [table({ name: "syllabus_concepts", deadRows: 0, heapPages: 2500, allVisiblePages: 1080 })] })
    );
    const c = flags.map((f) => f.code);
    expect(c).not.toContain("dead-rows");
    expect(c).toContain("visibility-map-coverage");
  });

  it("says nothing when the reading was never recorded", () => {
    // Snapshots predating migration 0076 carry no page counts. Treating absent
    // as zero would render as 0% coverage — a measurement nobody took, and the
    // one thing this tracker must never invent.
    expect(codes(d({ tables: [table({})] }))).not.toContain("visibility-map-coverage");
  });

  it("does not divide by zero on an empty table", () => {
    expect(
      codes(d({ tables: [table({ heapPages: 0, allVisiblePages: 0 })] }))
    ).not.toContain("visibility-map-coverage");
  });
});

describe("evaluateFlags — ordering and first run", () => {
  it("puts critical findings before warnings before notes", () => {
    const flags = evaluateFlags(
      d({
        largestGroupRows: THRESHOLDS.rowCapCritical,
        cacheHitPct: 96,
        tables: [{ name: "t", liveRows: 5000, deadRows: 3000, totalBytes: 1, seqScans: 0, idxScans: 0 }],
      })
    );
    expect(flags.map((f) => f.level)).toEqual(["critical", "warn", "info"]);
  });

  it("says plainly that a first run cannot measure a window", () => {
    const flags = evaluateFlags(d({ isFirstRun: true, counters: { available: false, reason: "first run" } }));
    const f = flags.find((x) => x.code === "counters-unavailable");
    expect(f).toBeDefined();
    expect(f!.level).toBe("info");
  });
});

/**
 * The pg_stat_statements store, added 2026-08-09 after a real incident.
 *
 * Supabase's postgres_exporter reads the WHOLE store once a minute to build its
 * metrics. At 4,868 entries / 3.8 MB of query text that read no longer fitted in
 * work_mem (2.1 MB), so it spilled ~5.8 MB to disk twice a minute — 13 GB/day on
 * a 164 MB database, and the largest remaining consumer of the disk-IO budget.
 * Clearing the store halved it immediately. Nothing was watching the one gauge
 * that predicts it, so it took a log-level investigation to find.
 *
 * The store also EVICTS silently once full (dealloc reached 12 before the
 * reset), and what it evicts is this tracker's own input — so the reports were
 * under-counting with no way to tell.
 */
describe("evaluateFlags — the pg_stat_statements store", () => {
  it("stays quiet when the store has plenty of room", () => {
    expect(codes(d({ statementsTracked: 500, statementsMax: 5000 }))).not.toContain("statement-store-full");
  });

  it("warns once the store is filling, naming the one-line fix", () => {
    const flags = evaluateFlags(d({ statementsTracked: 4100, statementsMax: 5000 }));
    const f = flags.find((x) => x.code === "statement-store-full");
    expect(f).toBeDefined();
    expect(f!.level).toBe("warn");
    expect(f!.message).toContain("pg_stat_statements_reset");
  });

  it("escalates to critical when it is nearly full", () => {
    const flags = evaluateFlags(d({ statementsTracked: 4800, statementsMax: 5000 }));
    expect(flags.find((x) => x.code === "statement-store-full")!.level).toBe("critical");
  });

  it("flags eviction separately — it means this tracker's own inputs are lossy", () => {
    const flags = evaluateFlags(d({ statementsEvictions: 12 }));
    const f = flags.find((x) => x.code === "statement-store-evicting");
    expect(f).toBeDefined();
    expect(f!.level).toBe("warn");
  });

  it("does not flag eviction when nothing has been evicted", () => {
    expect(codes(d({ statementsEvictions: 0 }))).not.toContain("statement-store-evicting");
  });

  /**
   * Snapshots taken before migration 0071 carry no reading. Reporting a
   * fullness of 0% (or of NaN) would be inventing a measurement, which is the
   * one thing this tracker must never do.
   */
  it("says nothing at all when the reading was never recorded", () => {
    const c = codes(d({ statementsTracked: null, statementsMax: null, statementsEvictions: null }));
    expect(c).not.toContain("statement-store-full");
    expect(c).not.toContain("statement-store-evicting");
  });

  it("says nothing when the max is unknown, rather than dividing by zero", () => {
    expect(codes(d({ statementsTracked: 4900, statementsMax: 0 }))).not.toContain("statement-store-full");
  });
});
