/**
 * Each test run cleans up only what it made (SUGGESTIONS_HISTORY.md "Every session
 * shares one test database", owner's option 2).
 *
 * A run's fixtures carry ids from testRunId(); the ids are recorded in a
 * folder the whole run shares, and the global teardown deletes only rows
 * carrying one of THOSE ids, plus any test row older than 6 hours (a killed
 * run's leftovers). Another run's fresh rows are left alone.
 */
import { describe, it, expect, afterEach, inject } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  runIdTokens,
  belongsToRun,
  isStaleTestRow,
  shouldSweepOrg,
  shouldSweepUser,
  isTestAuthEmail,
  STALE_HOURS,
} from "./global-teardown-helpers";
import { newRunId, recordRunId, readRunIds } from "./helpers/runIdRegistry";
import { testRunId } from "./helpers/runId";

const NOW = new Date("2026-11-09T10:00:00Z");
const hoursAgo = (h: number) => new Date(NOW.getTime() - h * 3_600_000).toISOString();
const OWN = new Set(["3e39bcfa", "fd90dd5f"]);

describe("runIdTokens", () => {
  it("finds standalone 8-hex ids in org names and emails", () => {
    expect(runIdTokens("Resolver Org fd90dd5f")).toEqual(["fd90dd5f"]);
    expect(runIdTokens("EditSetOrg_3e39bcfa")).toEqual(["3e39bcfa"]);
    expect(runIdTokens("edit-set-admin-3e39bcfa@test.local")).toEqual(["3e39bcfa"]);
    expect(runIdTokens("fbreply-alice-a1b2c3d4@test.local")).toEqual(["a1b2c3d4"]);
  });

  it("does not cut an id out of a longer hex or word run", () => {
    expect(runIdTokens("deadbeefcafe")).toEqual([]);
    expect(runIdTokens("x3e39bcfa")).toEqual([]);
    expect(runIdTokens("billing_paid_1783447442189@test.invalid")).toEqual([]);
  });
});

describe("belongsToRun", () => {
  it("is true only when an id in the name is one this run recorded", () => {
    expect(belongsToRun("Resolver Org fd90dd5f", OWN)).toBe(true);
    expect(belongsToRun("edit-set-admin-3e39bcfa@test.local", OWN)).toBe(true);
    expect(belongsToRun("Resolver Org 11112222", OWN)).toBe(false);
    expect(belongsToRun("LWS Pune", OWN)).toBe(false);
  });
});

describe("isStaleTestRow", () => {
  it(`is stale only past ${STALE_HOURS} hours`, () => {
    expect(isStaleTestRow(hoursAgo(STALE_HOURS + 0.1), NOW)).toBe(true);
    expect(isStaleTestRow(hoursAgo(STALE_HOURS - 0.1), NOW)).toBe(false);
    expect(isStaleTestRow(hoursAgo(0), NOW)).toBe(false);
  });

  it("an unknown or unreadable time is never stale (do not delete what you cannot date)", () => {
    expect(isStaleTestRow(null, NOW)).toBe(false);
    expect(isStaleTestRow(undefined, NOW)).toBe(false);
    expect(isStaleTestRow("not a date", NOW)).toBe(false);
  });
});

describe("shouldSweepOrg", () => {
  it("sweeps this run's test orgs", () => {
    expect(shouldSweepOrg({ name: "Resolver Org fd90dd5f", created_at: hoursAgo(0) }, OWN, NOW)).toBe(true);
  });

  it("leaves another run's fresh test org alone", () => {
    expect(shouldSweepOrg({ name: "Resolver Org 11112222", created_at: hoursAgo(0.2) }, OWN, NOW)).toBe(false);
  });

  it("sweeps another run's test org once it is stale (a killed run)", () => {
    expect(shouldSweepOrg({ name: "Resolver Org 11112222", created_at: hoursAgo(7) }, OWN, NOW)).toBe(true);
  });

  it("never sweeps a real org, however old", () => {
    expect(shouldSweepOrg({ name: "LWS Pune", created_at: hoursAgo(5000) }, OWN, NOW)).toBe(false);
    expect(shouldSweepOrg({ name: "Delhi Public School", created_at: hoursAgo(5000) }, OWN, NOW)).toBe(false);
  });
});

describe("shouldSweepUser", () => {
  it("sweeps this run's test users", () => {
    expect(shouldSweepUser({ email: "a-3e39bcfa@test.local", created_at: hoursAgo(0) }, OWN, NOW)).toBe(true);
  });

  it("leaves another run's fresh test user alone", () => {
    expect(shouldSweepUser({ email: "a-11112222@test.local", created_at: hoursAgo(0.5) }, OWN, NOW)).toBe(false);
  });

  it("sweeps any test user once stale, with or without an id", () => {
    expect(shouldSweepUser({ email: "a-11112222@test.local", created_at: hoursAgo(7) }, OWN, NOW)).toBe(true);
    expect(shouldSweepUser({ email: "alice@test.local", created_at: hoursAgo(7) }, OWN, NOW)).toBe(true);
    expect(shouldSweepUser({ email: "billing_1783@test.invalid", created_at: hoursAgo(7) }, OWN, NOW)).toBe(true);
  });

  it("never sweeps a real user, however old", () => {
    expect(shouldSweepUser({ email: "student-3e39bcfa@gmail.com", created_at: hoursAgo(5000) }, OWN, NOW)).toBe(false);
    expect(shouldSweepUser({ email: null, created_at: hoursAgo(5000) }, OWN, NOW)).toBe(false);
  });
});

describe("isTestAuthEmail", () => {
  it("covers both reserved test domains", () => {
    expect(isTestAuthEmail("x@test.local")).toBe(true);
    expect(isTestAuthEmail("X@TEST.INVALID")).toBe(true);
    expect(isTestAuthEmail("x@test.localhost.com")).toBe(false);
    expect(isTestAuthEmail("x@gmail.com")).toBe(false);
  });
});

describe("the run's id registry", () => {
  let dir: string | null = null;
  afterEach(() => {
    if (dir) rmSync(dir, { recursive: true, force: true });
    dir = null;
  });

  it("records each id and reads them all back", () => {
    dir = mkdtempSync(path.join(tmpdir(), "qb-runids-"));
    const a = newRunId(dir);
    const b = newRunId(dir);
    recordRunId(dir, "0badf00d");
    expect(a).toMatch(/^[0-9a-f]{8}$/);
    expect(a).not.toBe(b);
    expect(readRunIds(dir)).toEqual(new Set([a, b, "0badf00d"]));
  });

  it("an id is still returned when there is no registry (just not recorded)", () => {
    expect(newRunId(undefined)).toMatch(/^[0-9a-f]{8}$/);
  });

  it("reads an empty set from a missing folder", () => {
    expect(readRunIds(path.join(tmpdir(), "qb-runids-does-not-exist-xyz"))).toEqual(new Set());
  });

  it("ignores anything in the folder that is not an id", () => {
    dir = mkdtempSync(path.join(tmpdir(), "qb-runids-"));
    recordRunId(dir, "12345678");
    expect(() => recordRunId(dir!, "../evil")).toThrow();
    expect(readRunIds(dir)).toEqual(new Set(["12345678"]));
  });
});

describe("testRunId inside a vitest run", () => {
  it("records into the folder the global setup made for this run", () => {
    const dir = inject("testRunDir");
    expect(dir).toBeTruthy();
    const id = testRunId();
    expect(id).toMatch(/^[0-9a-f]{8}$/);
    expect(readRunIds(dir).has(id)).toBe(true);
  });
});
