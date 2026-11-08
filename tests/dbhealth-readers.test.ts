/**
 * "Biggest readers" (2026-11-08). The tracker watched calls, time and disk
 * spill, but not how much data a statement READS. On 2026-11-08 an audit found
 * 516 GB read in 36 hours, most of it by statements no time ranking flagged: a
 * homework read at 21% of all reads, a daily test at 730 MB a call, a dashboard
 * function at 958 MB a call. Snapshots now carry each statement's buffers
 * (migration 0240) and the database's total, so the report ranks by data read
 * and flags a statement that reads too much per call or too much of the whole.
 */
import { describe, it, expect } from "vitest";
import { computeDelta } from "@/lib/dbhealth/delta";
import { evaluateFlags, THRESHOLDS } from "@/lib/dbhealth/flags";
import { renderReport } from "@/lib/dbhealth/format";
import type { HealthDelta, HealthSnapshot, QueryDelta, QueryStat } from "@/lib/dbhealth/types";

const BLOCK = 8192;
const MB = 1024 * 1024;
const GB = 1024 * MB;

const SNAP: HealthSnapshot = {
  capturedAt: "2026-11-07T12:00:00.000Z",
  statsReset: "2026-11-07T09:08:00.000Z",
  dbSizeBytes: 500 * MB,
  connections: 20,
  maxConnections: 60,
  cacheHitPct: 99.9,
  tempBytes: 0,
  tempFiles: 0,
  deadlocks: 0,
  rollbacks: 0,
  largestGroupRows: 900,
  statementsTracked: 500,
  statementsMax: 5000,
  statementsEvictions: 0,
  statementsBytes: 500_000,
  workMemBytes: 2_236_416,
  tables: [],
  queries: [],
};
const snap = (over: Partial<HealthSnapshot>): HealthSnapshot => ({ ...SNAP, ...over });
const stat = (over: Partial<QueryStat>): QueryStat => ({
  queryid: "7",
  label: "select from homework_plan_items",
  calls: 100,
  totalExecMs: 1000,
  tempBytes: 0,
  rows: 1000,
  ...over,
});
const LATER = "2026-11-08T12:00:00.000Z";

describe("computeDelta — data read", () => {
  it("turns each statement's buffers into bytes read in the window, and per call", () => {
    const d = computeDelta(
      snap({ queries: [stat({ calls: 100, blocks: 1_000 })], blocksTotal: 10_000 }),
      snap({ capturedAt: LATER, queries: [stat({ calls: 150, blocks: 6_000 })], blocksTotal: 60_000 })
    );
    expect(d.queries[0].readBytesDelta).toBe(5_000 * BLOCK);
    expect(d.queries[0].readBytesPerCall).toBe(100 * BLOCK);
    expect(d.readBytesDelta).toBe(50_000 * BLOCK);
  });

  it("knows nothing about data read across a snapshot taken before buffers were recorded", () => {
    const d = computeDelta(
      snap({ queries: [stat({ calls: 100 })] }),
      snap({ capturedAt: LATER, queries: [stat({ calls: 150, blocks: 6_000 })], blocksTotal: 60_000 })
    );
    expect(d.queries[0].readBytesDelta).toBeNull();
    expect(d.queries[0].readBytesPerCall).toBeNull();
    expect(d.readBytesDelta).toBeNull();
  });

  it("refuses a database total that went backwards (a restart zeroes it)", () => {
    const d = computeDelta(
      snap({ blocksTotal: 60_000 }),
      snap({ capturedAt: LATER, blocksTotal: 5_000 })
    );
    expect(d.readBytesDelta).toBeNull();
  });
});

const q = (over: Partial<QueryDelta>): QueryDelta => ({
  queryid: "7",
  label: "select from homework_plan_items",
  callsDelta: 1000,
  tempBytesDelta: 0,
  totalExecMsDelta: 1000,
  tempBytesPerCall: 0,
  meanMsPerCall: 1,
  callsPerDay: 1000,
  readBytesDelta: 1000 * MB,
  readBytesPerCall: MB,
  isNew: false,
  suspectedReset: false,
  windowKnown: true,
  lifetimeCalls: 1000,
  ...over,
});

const DELTA: HealthDelta = {
  isFirstRun: false,
  elapsedHours: 24,
  windowTooShortForRates: false,
  from: SNAP.capturedAt,
  to: LATER,
  counters: { available: true },
  dbSizeBytes: SNAP.dbSizeBytes,
  dbSizeGrowthBytes: 0,
  connections: 20,
  maxConnections: 60,
  cacheHitPct: 99.9,
  largestGroupRows: 900,
  statementsTracked: 500,
  statementsMax: 5000,
  statementsEvictions: 0,
  statementsBytes: 500_000,
  workMemBytes: 2_236_416,
  tempBytesDelta: 0,
  tempBytesPerDay: 0,
  tempFilesDelta: 0,
  deadlocksDelta: 0,
  rollbacksDelta: 0,
  readBytesDelta: 100 * GB,
  queries: [],
  tables: [],
};
const delta = (queries: QueryDelta[], over: Partial<HealthDelta> = {}): HealthDelta => ({ ...DELTA, queries, ...over });
const flagsOf = (dl: HealthDelta, code: string) => evaluateFlags(dl).filter((f) => f.code === code);

describe("evaluateFlags — heavy readers", () => {
  it("warns on a statement reading 100 MB a call, critical at 500 MB (the notes test read 730)", () => {
    const warn = flagsOf(delta([q({ readBytesPerCall: 174 * MB, readBytesDelta: 30 * GB, callsDelta: 177 })]), "query-heavy-read");
    expect(warn.map((f) => f.level)).toEqual(["warn"]);
    const crit = flagsOf(delta([q({ readBytesPerCall: 730 * MB, readBytesDelta: 54 * GB, callsDelta: 75 })]), "query-heavy-read");
    expect(crit.map((f) => f.level)).toEqual(["critical"]);
  });

  it("stays quiet below the per-call line, or when the window total is small", () => {
    expect(flagsOf(delta([q({ readBytesPerCall: 60 * MB, readBytesDelta: 6 * GB })]), "query-heavy-read")).toEqual([]);
    expect(
      flagsOf(delta([q({ readBytesPerCall: 200 * MB, readBytesDelta: THRESHOLDS.heavyReadTotalMinBytes - 1, callsDelta: 4 })]), "query-heavy-read")
    ).toEqual([]);
  });

  it("warns on one statement reading 15% or more of everything read (homework was 21%)", () => {
    const share = flagsOf(delta([q({ readBytesPerCall: 76 * MB, readBytesDelta: 21 * GB, callsDelta: 283 })]), "query-read-share");
    expect(share.map((f) => f.level)).toEqual(["warn"]);
    expect(share[0].message).toMatch(/21%/);
    expect(flagsOf(delta([q({ readBytesDelta: 10 * GB })]), "query-read-share")).toEqual([]);
  });

  it("never thresholds a row whose window is unknown, or one with no buffer reading", () => {
    const unknown = delta([q({ windowKnown: false, isNew: true, readBytesPerCall: 900 * MB, readBytesDelta: 90 * GB })]);
    expect(flagsOf(unknown, "query-heavy-read")).toEqual([]);
    expect(flagsOf(unknown, "query-read-share")).toEqual([]);
    const unread = delta([q({ readBytesPerCall: null, readBytesDelta: null })]);
    expect(evaluateFlags(unread).filter((f) => f.code.startsWith("query-")).length).toBe(0);
  });
});

describe("renderReport — biggest readers", () => {
  it("lists statements by data read in the window, with share, calls and MB a call", () => {
    const out = renderReport(
      delta([
        q({ queryid: "a", label: "homework items", readBytesDelta: 21 * GB, readBytesPerCall: 76 * MB, callsDelta: 283 }),
        q({ queryid: "b", label: "papers of questions", readBytesDelta: 6 * GB, readBytesPerCall: 19 * MB, callsDelta: 323 }),
        q({ queryid: "c", label: "never read", readBytesDelta: null, readBytesPerCall: null }),
      ]),
      []
    );
    expect(out).toMatch(/BIGGEST READERS/);
    const section = out.slice(out.indexOf("BIGGEST READERS"));
    expect(section.indexOf("homework items")).toBeLessThan(section.indexOf("papers of questions"));
    expect(section).toMatch(/21%/);
    expect(section).not.toMatch(/never read/);
  });

  it("says when buffers were not recorded rather than printing an empty ranking", () => {
    const out = renderReport(delta([q({ readBytesDelta: null, readBytesPerCall: null })], { readBytesDelta: null }), []);
    expect(out).toMatch(/BIGGEST READERS: not recorded/);
  });
});
