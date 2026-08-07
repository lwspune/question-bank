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
