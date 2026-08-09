import { describe, it, expect } from "vitest";
import { computeDelta } from "@/lib/dbhealth/delta";
import type { HealthSnapshot } from "@/lib/dbhealth/types";

/**
 * The whole point of the health tracker is the DELTA — cumulative Postgres
 * counters can tell you a query has spilled 1,129 GB since May, but not whether
 * it spilled any of it today. These tests pin the arithmetic and, more
 * importantly, the three ways the arithmetic can silently lie:
 *   1. pg_stat_statements was reset between snapshots (counters restart at 0)
 *   2. an individual query entry was EVICTED and re-created (its counters
 *      restart at 0 while stats_reset is unchanged)
 *   3. the two snapshots are the same instant (divide-by-zero on the rate)
 */

const BASE: HealthSnapshot = {
  capturedAt: "2026-08-07T12:00:00.000Z",
  statsReset: "2026-05-08T06:49:07.000Z",
  dbSizeBytes: 158 * 1024 * 1024,
  connections: 22,
  maxConnections: 60,
  cacheHitPct: 100,
  tempBytes: 1000,
  tempFiles: 10,
  deadlocks: 0,
  rollbacks: 100,
  largestGroupRows: 346,
  statementsTracked: 500,
  statementsMax: 5000,
  statementsEvictions: 0,
  tables: [],
  queries: [],
};

const snap = (over: Partial<HealthSnapshot>): HealthSnapshot => ({ ...BASE, ...over });

describe("computeDelta — the pg_stat_statements store gauges", () => {
  it("reports the CURRENT reading, not a difference — it is a gauge, not a counter", () => {
    const d = computeDelta(
      snap({ statementsTracked: 4000 }),
      snap({ capturedAt: "2026-08-08T12:00:00.000Z", statementsTracked: 4800, statementsEvictions: 12 })
    );
    expect(d.statementsTracked).toBe(4800);
    expect(d.statementsMax).toBe(5000);
    expect(d.statementsEvictions).toBe(12);
  });

  /**
   * A stats reset zeroes every cumulative counter, but the store's size is a
   * gauge — it is still true right now, and it is the reading that tells you
   * whether to reset again. It must survive the refusal that blanks the rest.
   */
  it("survives a stats reset, which blanks the cumulative counters", () => {
    const d = computeDelta(
      snap({ statsReset: "2026-05-08T06:49:07.000Z" }),
      snap({
        capturedAt: "2026-08-08T12:00:00.000Z",
        statsReset: "2026-08-09T02:29:32.000Z",
        statementsTracked: 7,
      })
    );
    expect(d.counters.available).toBe(false);
    expect(d.tempBytesDelta).toBeNull();
    expect(d.statementsTracked).toBe(7);
  });

  it("reports the reading on the very first run, when nothing cumulative can be", () => {
    const d = computeDelta(null, snap({ statementsTracked: 4868 }));
    expect(d.isFirstRun).toBe(true);
    expect(d.statementsTracked).toBe(4868);
  });

  it("carries a missing reading through as null rather than inventing a zero", () => {
    const d = computeDelta(
      null,
      snap({ statementsTracked: null, statementsMax: null, statementsEvictions: null })
    );
    expect(d.statementsTracked).toBeNull();
    expect(d.statementsMax).toBeNull();
  });
});

describe("computeDelta — gauges", () => {
  it("reports absolute change for point-in-time gauges", () => {
    const d = computeDelta(
      snap({ dbSizeBytes: 100, connections: 10 }),
      snap({ capturedAt: "2026-08-08T12:00:00.000Z", dbSizeBytes: 150, connections: 14 })
    );
    expect(d.dbSizeGrowthBytes).toBe(50);
    expect(d.connections).toBe(14);
    expect(d.elapsedHours).toBeCloseTo(24, 5);
  });

  it("normalises cumulative counters to a per-day rate", () => {
    // 12 hours elapsed, 500 temp bytes written -> 1000/day
    const d = computeDelta(
      snap({ tempBytes: 1000 }),
      snap({ capturedAt: "2026-08-08T00:00:00.000Z", tempBytes: 1500 })
    );
    expect(d.counters.available).toBe(true);
    expect(d.tempBytesDelta).toBe(500);
    expect(d.tempBytesPerDay).toBeCloseTo(1000, 5);
  });
});

describe("computeDelta — counter resets (the silent-lie cases)", () => {
  it("marks counters unavailable when pg_stat_statements was reset between snapshots", () => {
    const d = computeDelta(
      snap({ tempBytes: 5000 }),
      snap({
        capturedAt: "2026-08-08T12:00:00.000Z",
        statsReset: "2026-08-08T06:00:00.000Z",
        tempBytes: 40,
      })
    );
    expect(d.counters.available).toBe(false);
    expect(d.counters.reason).toMatch(/reset/i);
    // A negative delta must never be reported as a real number.
    expect(d.tempBytesDelta).toBeNull();
    expect(d.tempBytesPerDay).toBeNull();
    // Gauges are still perfectly comparable across a stats reset.
    expect(d.dbSizeGrowthBytes).toBe(0);
  });

  it("clamps a per-query counter that went backwards (entry evicted and re-created)", () => {
    // stats_reset unchanged, but this query's counters restarted -> not a real
    // -900 calls. Clamp to the post-eviction value rather than going negative.
    const d = computeDelta(
      snap({ queries: [{ queryid: "42", label: "select 1", calls: 1000, totalExecMs: 500, tempBytes: 9000, rows: 10 }] }),
      snap({
        capturedAt: "2026-08-08T12:00:00.000Z",
        queries: [{ queryid: "42", label: "select 1", calls: 100, totalExecMs: 50, tempBytes: 900, rows: 1 }],
      })
    );
    const q = d.queries.find((x) => x.queryid === "42");
    expect(q).toBeDefined();
    expect(q!.suspectedReset).toBe(true);
    expect(q!.callsDelta).toBe(100);
    expect(q!.tempBytesDelta).toBe(900);
  });

  it("marks a first-seen query's window activity as UNKNOWN, not as its lifetime", () => {
    // The bug this pins: migration 0070 widened collection from 50 queries to
    // 150, so 100 long-lived queries "appeared" and were credited with three
    // months of calls as if it happened in a 3-minute window. A first-seen
    // query is either genuinely new (lifetime ~ window) or merely newly
    // COLLECTED (lifetime >> window), and nothing stored can tell them apart.
    const d = computeDelta(
      snap({ queries: [] }),
      snap({
        capturedAt: "2026-08-08T12:00:00.000Z",
        queries: [{ queryid: "7", label: "long-lived, newly collected", calls: 212_079, totalExecMs: 100, tempBytes: 0, rows: 0 }],
      })
    );
    const q = d.queries.find((x) => x.queryid === "7")!;
    expect(q.isNew).toBe(true);
    expect(q.windowKnown).toBe(false);
    expect(q.lifetimeCalls).toBe(212_079);
  });

  it("ranks queries with a KNOWN window above first-seen ones, whatever their lifetime", () => {
    const d = computeDelta(
      snap({ queries: [{ queryid: "tracked", label: "tracked", calls: 1000, totalExecMs: 1, tempBytes: 0, rows: 0 }] }),
      snap({
        capturedAt: "2026-08-08T12:00:00.000Z",
        queries: [
          { queryid: "huge", label: "newly collected, huge lifetime", calls: 5_000_000, totalExecMs: 1, tempBytes: 0, rows: 0 },
          { queryid: "tracked", label: "tracked", calls: 1005, totalExecMs: 1, tempBytes: 0, rows: 0 },
        ],
      })
    );
    expect(d.queries[0].queryid).toBe("tracked");
    expect(d.queries[0].callsDelta).toBe(5);
    expect(d.queries[1].windowKnown).toBe(false);
  });

  it("treats a query absent from the previous snapshot as entirely new", () => {
    const d = computeDelta(
      snap({ queries: [] }),
      snap({
        capturedAt: "2026-08-08T12:00:00.000Z",
        queries: [{ queryid: "7", label: "new hot path", calls: 250, totalExecMs: 100, tempBytes: 0, rows: 250 }],
      })
    );
    const q = d.queries.find((x) => x.queryid === "7");
    expect(q!.isNew).toBe(true);
    expect(q!.callsDelta).toBe(250);
    expect(q!.suspectedReset).toBe(false);
  });

  it("drops a query that vanished from the current snapshot", () => {
    const d = computeDelta(
      snap({ queries: [{ queryid: "9", label: "gone", calls: 5, totalExecMs: 1, tempBytes: 0, rows: 5 }] }),
      snap({ capturedAt: "2026-08-08T12:00:00.000Z", queries: [] })
    );
    expect(d.queries).toHaveLength(0);
  });
});

describe("computeDelta — degenerate inputs", () => {
  it("returns no rates (not Infinity) when the two snapshots share an instant", () => {
    const d = computeDelta(snap({ tempBytes: 10 }), snap({ tempBytes: 20 }));
    expect(d.elapsedHours).toBe(0);
    expect(d.tempBytesDelta).toBe(10);
    expect(d.tempBytesPerDay).toBeNull();
  });

  it("withholds per-day rates when the window is too short to extrapolate from", () => {
    // Two snapshots seconds apart genuinely showed "268 GB/day" of disk spill,
    // extrapolated from 7 MB over 2 seconds. The delta is real; the rate is a
    // fiction, and a fiction in a health report is worse than a blank.
    const d = computeDelta(
      snap({ tempBytes: 0 }),
      snap({ capturedAt: "2026-08-07T12:00:02.000Z", tempBytes: 7_000_000 })
    );
    expect(d.tempBytesDelta).toBe(7_000_000);
    expect(d.tempBytesPerDay).toBeNull();
    expect(d.windowTooShortForRates).toBe(true);
  });

  it("does extrapolate once the window is long enough", () => {
    const d = computeDelta(
      snap({ tempBytes: 0 }),
      snap({ capturedAt: "2026-08-08T12:00:00.000Z", tempBytes: 100 })
    );
    expect(d.windowTooShortForRates).toBe(false);
    expect(d.tempBytesPerDay).toBeCloseTo(100, 5);
  });

  it("handles a first-ever run with no previous snapshot", () => {
    const d = computeDelta(null, snap({ dbSizeBytes: 123 }));
    expect(d.isFirstRun).toBe(true);
    expect(d.counters.available).toBe(false);
    expect(d.dbSizeGrowthBytes).toBeNull();
    expect(d.tempBytesPerDay).toBeNull();
  });

  it("refuses a previous snapshot that is newer than the current one", () => {
    expect(() =>
      computeDelta(snap({ capturedAt: "2026-08-09T00:00:00.000Z" }), snap({ capturedAt: "2026-08-08T00:00:00.000Z" }))
    ).toThrow(/order/i);
  });
});

describe("computeDelta — per-query rates", () => {
  it("ranks queries by calls in the window, not lifetime total", () => {
    const prev = snap({
      queries: [
        { queryid: "old", label: "historically huge", calls: 1_000_000, totalExecMs: 1, tempBytes: 0, rows: 0 },
        { queryid: "now", label: "busy today", calls: 10, totalExecMs: 1, tempBytes: 0, rows: 0 },
      ],
    });
    const curr = snap({
      capturedAt: "2026-08-08T12:00:00.000Z",
      queries: [
        { queryid: "old", label: "historically huge", calls: 1_000_005, totalExecMs: 1, tempBytes: 0, rows: 0 },
        { queryid: "now", label: "busy today", calls: 2010, totalExecMs: 1, tempBytes: 0, rows: 0 },
      ],
    });
    const d = computeDelta(prev, curr);
    expect(d.queries[0].queryid).toBe("now");
    expect(d.queries[0].callsDelta).toBe(2000);
    expect(d.queries[1].callsDelta).toBe(5);
  });

  it("computes spill-per-call from the window, so a fixed query reads as fixed", () => {
    // The /browse case: 98 GB of lifetime spill, but zero since the fix.
    const prev = snap({
      queries: [{ queryid: "browse", label: "wide sort", calls: 3329, totalExecMs: 1, tempBytes: 30_000_000_000, rows: 0 }],
    });
    const curr = snap({
      capturedAt: "2026-08-08T12:00:00.000Z",
      queries: [{ queryid: "browse", label: "wide sort", calls: 3400, totalExecMs: 1, tempBytes: 30_000_000_000, rows: 0 }],
    });
    const d = computeDelta(prev, curr);
    const q = d.queries[0];
    expect(q.tempBytesDelta).toBe(0);
    expect(q.tempBytesPerCall).toBe(0);
  });
});
