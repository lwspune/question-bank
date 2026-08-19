import { describe, it, expect } from "vitest";
import { rowToSnapshot, buildHistory } from "@/lib/dbhealth/rows";

/**
 * `rowToSnapshot` is shared by the CLI and the /dashboard/health page on
 * purpose. Two hand-written mappers for the same view-model drift, and the
 * drift is invisible on whichever surface nobody re-checks — that is exactly
 * how the JEE numeric answer ended up rendering blank on /browse while /saved
 * showed it correctly (2026-08-05).
 */

const ROW = {
  captured_at: "2026-08-07T15:23:17.804Z",
  stats_reset: "2026-05-08T06:49:07.456Z",
  db_size_bytes: "166136979", // bigint arrives as a string over PostgREST
  connections: 12,
  max_connections: 60,
  cache_hit_pct: "100.00", // numeric arrives as a string too
  largest_group_rows: 531,
  temp_bytes: "1212774019461",
  temp_files: 249126,
  deadlocks: 0,
  rollbacks: 74701,
  tables: [],
  queries: [],
};

describe("rowToSnapshot", () => {
  it("coerces the string-typed numerics PostgREST returns for bigint and numeric", () => {
    const s = rowToSnapshot(ROW);
    expect(s.dbSizeBytes).toBe(166136979);
    expect(s.tempBytes).toBe(1212774019461);
    expect(s.cacheHitPct).toBe(100);
    expect(typeof s.dbSizeBytes).toBe("number");
  });

  /**
   * The store-size columns arrived in migration 0080; every snapshot before it
   * has neither. NULL must survive as null all the way to the report, because
   * the rule that reads it is skipped on null and would otherwise see a
   * perfectly healthy 0 bytes — a measurement nobody took, which is the one
   * thing this tracker exists not to do.
   */
  it("preserves a missing store-size reading as null rather than zero", () => {
    const s = rowToSnapshot(ROW); // ROW predates migration 0080
    expect(s.statementsBytes).toBeNull();
    expect(s.workMemBytes).toBeNull();
  });

  it("coerces the store-size reading when it is present", () => {
    const s = rowToSnapshot({ ...ROW, statements_bytes: "1617920", work_mem_bytes: "2236416" });
    expect(s.statementsBytes).toBe(1_617_920);
    expect(s.workMemBytes).toBe(2_236_416);
  });

  it("defaults the jsonb detail columns to empty arrays when absent", () => {
    const { tables, queries, ...withoutJson } = ROW;
    void tables;
    void queries;
    const s = rowToSnapshot(withoutJson);
    expect(s.tables).toEqual([]);
    expect(s.queries).toEqual([]);
  });
});

describe("buildHistory", () => {
  const at = (iso: string, over: Partial<Record<string, unknown>> = {}) => ({
    ...ROW,
    captured_at: iso,
    ...over,
  });

  it("returns newest first and pairs each row with the one before it", () => {
    const h = buildHistory([
      at("2026-08-09T00:00:00.000Z", { temp_bytes: "3000", db_size_bytes: "300" }),
      at("2026-08-08T00:00:00.000Z", { temp_bytes: "2000", db_size_bytes: "200" }),
      at("2026-08-07T00:00:00.000Z", { temp_bytes: "1000", db_size_bytes: "100" }),
    ]);
    expect(h).toHaveLength(3);
    expect(h[0].capturedAt).toBe("2026-08-09T00:00:00.000Z");
    expect(h[0].tempBytesPerDay).toBeCloseTo(1000, 5);
    expect(h[0].dbSizeGrowthBytes).toBe(100);
  });

  it("leaves the oldest row without a window, since it has nothing to compare to", () => {
    const h = buildHistory([
      at("2026-08-08T00:00:00.000Z", { temp_bytes: "2000" }),
      at("2026-08-07T00:00:00.000Z", { temp_bytes: "1000" }),
    ]);
    expect(h[1].tempBytesPerDay).toBeNull();
    expect(h[1].dbSizeGrowthBytes).toBeNull();
  });

  it("blanks the rate across a stats reset instead of showing a negative", () => {
    const h = buildHistory([
      at("2026-08-08T00:00:00.000Z", { temp_bytes: "50", stats_reset: "2026-08-08T00:00:00.000Z" }),
      at("2026-08-07T00:00:00.000Z", { temp_bytes: "9000" }),
    ]);
    expect(h[0].tempBytesPerDay).toBeNull();
    expect(h[0].countersAvailable).toBe(false);
    // The database did not shrink because the collector was cleared.
    expect(h[0].dbSizeGrowthBytes).toBe(0);
  });

  it("blanks the rate when two snapshots are minutes apart", () => {
    // Both of today's real snapshots are 3 minutes apart. Extrapolating those
    // to a daily rate is how "268 GB/day" happened.
    const h = buildHistory([
      at("2026-08-07T15:23:00.000Z", { temp_bytes: "8000" }),
      at("2026-08-07T15:20:00.000Z", { temp_bytes: "1000" }),
    ]);
    expect(h[0].tempBytesPerDay).toBeNull();
    expect(h[0].windowTooShort).toBe(true);
  });

  it("accepts an empty history", () => {
    expect(buildHistory([])).toEqual([]);
  });

  it("sorts an out-of-order input rather than trusting the caller", () => {
    const h = buildHistory([
      at("2026-08-07T00:00:00.000Z"),
      at("2026-08-09T00:00:00.000Z"),
      at("2026-08-08T00:00:00.000Z"),
    ]);
    expect(h.map((r) => r.capturedAt)).toEqual([
      "2026-08-09T00:00:00.000Z",
      "2026-08-08T00:00:00.000Z",
      "2026-08-07T00:00:00.000Z",
    ]);
  });
});
