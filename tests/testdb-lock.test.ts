/**
 * The test-database lock: one test run at a time per test project on this
 * machine. Every session and worktree here shares ONE test project, and two
 * runs at once flipped each other's shared rows (paywall_settings), lost
 * fixtures to each other's orgs and starved the DNS resolver (gate logs,
 * 2026-11-05..14: 6 of 9 red pushes).
 */
import { mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync, utimesSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  acquireTestDbLock,
  isStaleHolder,
  pidIsAlive,
  testDbLockPath,
  type LockHolder,
} from "./helpers/testdbLock";

const me: LockHolder = { pid: 1001, cwd: "C:/wt/mine", startedAt: "2026-11-15T10:00:00.000Z", what: "vitest" };
const other: LockHolder = { pid: 2002, cwd: "C:/wt/other", startedAt: "2026-11-15T09:58:00.000Z", what: "vitest" };
const NOW = Date.parse("2026-11-15T10:00:00.000Z");

let dir: string;
let file: string;
beforeEach(() => {
  dir = mkdtempSync(path.join(tmpdir(), "testdb-lock-spec-"));
  file = path.join(dir, "ref.lock");
});
afterEach(() => rmSync(dir, { recursive: true, force: true }));

const writeHolder = (h: LockHolder) => writeFileSync(file, JSON.stringify(h));
const readHolder = () => JSON.parse(readFileSync(file, "utf8")) as LockHolder;

describe("testDbLockPath", () => {
  it("names one file per test project, so two projects never wait on each other", () => {
    expect(testDbLockPath("aaa", "/root")).not.toBe(testDbLockPath("bbb", "/root"));
    expect(path.basename(testDbLockPath("aaa", "/root"))).toBe("aaa.lock");
  });
});

describe("isStaleHolder", () => {
  const opts = (isAlive: boolean, fileAgeMs = 60_000) => ({
    now: NOW,
    isAlive: () => isAlive,
    maxAgeMs: 60 * 60_000,
    fileAgeMs,
  });

  it("a live holder inside the age limit is not stale", () => {
    expect(isStaleHolder(other, opts(true))).toBe(false);
  });
  it("a holder whose process is gone is stale (a killed run)", () => {
    expect(isStaleHolder(other, opts(false))).toBe(true);
  });
  it("a holder older than the limit is stale even if its pid looks alive (Windows reuses pids)", () => {
    const old = { ...other, startedAt: "2026-11-15T08:30:00.000Z" };
    expect(isStaleHolder(old, opts(true))).toBe(true);
  });
  it("an unreadable file is stale only once it is a few seconds old (it may be mid-write)", () => {
    expect(isStaleHolder(null, opts(true, 500))).toBe(false);
    expect(isStaleHolder(null, opts(true, 10_000))).toBe(true);
  });
});

describe("acquireTestDbLock", () => {
  const noSleep = async () => {};

  it("takes a free lock and records who holds it", async () => {
    const release = await acquireTestDbLock(file, me, { now: () => NOW, isAlive: () => true, sleep: noSleep });
    expect(readHolder()).toEqual(me);
    release();
    expect(existsSync(file)).toBe(false);
  });

  it("waits while another live run holds it, says which folder, then takes it", async () => {
    writeHolder(other);
    const logs: string[] = [];
    let sleeps = 0;
    const release = await acquireTestDbLock(file, me, {
      now: () => NOW,
      isAlive: () => true,
      log: (m) => logs.push(m),
      sleep: async () => {
        sleeps++;
        if (sleeps === 3) rmSync(file); // the other run finishes
      },
    });
    expect(sleeps).toBe(3);
    expect(readHolder()).toEqual(me);
    expect(logs.join("\n")).toContain("C:/wt/other");
    release();
  });

  it("takes over at once from a run whose process is gone", async () => {
    writeHolder(other);
    let sleeps = 0;
    const release = await acquireTestDbLock(file, me, {
      now: () => NOW,
      isAlive: (pid) => pid !== other.pid,
      sleep: async () => void sleeps++,
      log: () => {},
    });
    expect(sleeps).toBe(0);
    expect(readHolder()).toEqual(me);
    release();
  });

  it("takes over a half-written file left behind long ago", async () => {
    writeFileSync(file, "");
    const old = new Date(Date.now() - 60_000);
    utimesSync(file, old, old);
    const release = await acquireTestDbLock(file, me, {
      now: () => NOW,
      isAlive: () => true,
      sleep: noSleep,
      log: () => {},
    });
    expect(readHolder()).toEqual(me);
    release();
  });

  it("gives up after the timeout, naming the holder, and leaves its lock alone", async () => {
    writeHolder(other);
    let t = NOW;
    await expect(
      acquireTestDbLock(file, me, {
        now: () => t,
        isAlive: () => true,
        sleep: async (ms) => void (t += ms),
        log: () => {},
        timeoutMs: 10 * 60_000,
      }),
    ).rejects.toThrow(/C:\/wt\/other/);
    expect(readHolder()).toEqual(other);
  });

  it("release never deletes a lock someone else has since taken", async () => {
    const release = await acquireTestDbLock(file, me, { now: () => NOW, isAlive: () => true, sleep: noSleep });
    writeHolder(other); // ours was judged stale and taken over
    release();
    expect(readHolder()).toEqual(other);
  });
});

describe("pidIsAlive", () => {
  it("is true for this process and false for a pid that cannot exist", () => {
    expect(pidIsAlive(process.pid)).toBe(true);
    expect(pidIsAlive(2 ** 30)).toBe(false);
  });
});
