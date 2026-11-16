/**
 * One test run at a time per test project, on this machine.
 *
 * Every session and worktree here shares ONE test Supabase project. Two runs at
 * once flipped each other's singleton rows (paywall_settings), lost fixtures to
 * each other's orgs, and starved the local DNS resolver (ENOTFOUND on the
 * project host): 6 of the 9 red pre-push runs of 2026-11-05..14. The per-run
 * cleanup of 2026-11-09 stopped runs DELETING each other's rows; it cannot stop
 * them sharing rows, so the second run now waits.
 *
 * The lock is a file created with the `wx` flag (create only if absent, which
 * the OS does atomically). It holds the owner's pid, folder and start time. A
 * waiter takes over a lock whose process is gone (a killed run never releases)
 * or that is older than `maxAgeMs` (Windows reuses pids). Known gap: two
 * waiters that judge the same lock stale in the same few milliseconds can both
 * take it; the re-read before removal makes that rare, and the cost is one
 * collided run, which is today's behaviour.
 *
 * Scope: this machine only. CI runs on GitHub's runners and does not see it.
 */
import { mkdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

export type LockHolder = { pid: number; cwd: string; startedAt: string; what: string };

/** A full gate run is ~10 minutes; anything held an hour is a dead run. */
export const LOCK_MAX_AGE_MS = 60 * 60_000;
/** A file this young may be mid-write by its creator, so empty is not stale yet. */
const UNREADABLE_GRACE_MS = 5_000;

export function testDbLockPath(ref: string, root = path.join(tmpdir(), "qb-testdb-locks")): string {
  return path.join(root, `${ref}.lock`);
}

export function pidIsAlive(pid: number): boolean {
  try {
    process.kill(pid, 0); // signal 0 only checks the process exists
    return true;
  } catch (e) {
    return (e as NodeJS.ErrnoException).code === "EPERM"; // exists, not ours
  }
}

export function isStaleHolder(
  holder: LockHolder | null,
  opts: { now: number; isAlive: (pid: number) => boolean; maxAgeMs: number; fileAgeMs: number },
): boolean {
  if (!holder) return opts.fileAgeMs > UNREADABLE_GRACE_MS;
  const started = Date.parse(holder.startedAt);
  if (!Number.isFinite(started) || opts.now - started > opts.maxAgeMs) return true;
  return !opts.isAlive(holder.pid);
}

function readHolder(file: string): { holder: LockHolder | null; fileAgeMs: number } | "gone" {
  let raw: string;
  let mtimeMs: number;
  try {
    mtimeMs = statSync(file).mtimeMs;
    raw = readFileSync(file, "utf8");
  } catch {
    return "gone";
  }
  const fileAgeMs = Date.now() - mtimeMs;
  try {
    const h = JSON.parse(raw) as LockHolder;
    return { holder: typeof h?.pid === "number" ? h : null, fileAgeMs };
  } catch {
    return { holder: null, fileAgeMs };
  }
}

const sameHolder = (a: LockHolder | null, b: LockHolder | null) =>
  JSON.stringify(a) === JSON.stringify(b);

export function describeHolder(h: LockHolder | null): string {
  return h ? `${h.what} in ${h.cwd} (pid ${h.pid}, started ${h.startedAt})` : "an unreadable lock file";
}

export type AcquireOptions = {
  now?: () => number;
  isAlive?: (pid: number) => boolean;
  sleep?: (ms: number) => Promise<void>;
  log?: (msg: string) => void;
  pollMs?: number;
  timeoutMs?: number;
  maxAgeMs?: number;
};

/** Wait for the lock, take it, and return the function that releases it. */
export async function acquireTestDbLock(
  file: string,
  me: LockHolder,
  opts: AcquireOptions = {},
): Promise<() => void> {
  const now = opts.now ?? Date.now;
  const isAlive = opts.isAlive ?? pidIsAlive;
  const sleep = opts.sleep ?? ((ms: number) => new Promise<void>((r) => setTimeout(r, ms)));
  const log = opts.log ?? ((m: string) => console.log(m));
  const pollMs = opts.pollMs ?? 5_000;
  const timeoutMs = opts.timeoutMs ?? 30 * 60_000;
  const maxAgeMs = opts.maxAgeMs ?? LOCK_MAX_AGE_MS;

  mkdirSync(path.dirname(file), { recursive: true });
  const start = now();
  let lastLog = -Infinity;

  for (;;) {
    try {
      writeFileSync(file, JSON.stringify(me), { flag: "wx" });
      return () => release(file, me);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
    }

    const seen = readHolder(file);
    if (seen === "gone") continue; // released between our two calls

    if (isStaleHolder(seen.holder, { now: now(), isAlive, maxAgeMs, fileAgeMs: seen.fileAgeMs })) {
      log(`[testdb lock] taking over from ${describeHolder(seen.holder)}: no longer running`);
      const again = readHolder(file);
      if (again !== "gone" && sameHolder(again.holder, seen.holder)) {
        try {
          unlinkSync(file);
        } catch {
          /* someone else removed it first */
        }
      }
      continue;
    }

    const waited = now() - start;
    if (waited >= timeoutMs) {
      throw new Error(
        `[testdb lock] gave up after ${Math.round(waited / 60_000)} min: the test database is in use by ` +
          `${describeHolder(seen.holder)}. If that run is dead, delete ${file}.`,
      );
    }
    if (now() - lastLog >= 60_000) {
      log(`[testdb lock] waiting: the test database is in use by ${describeHolder(seen.holder)}`);
      lastLog = now();
    }
    await sleep(pollMs);
  }
}

function release(file: string, me: LockHolder): void {
  const seen = readHolder(file);
  if (seen === "gone" || !sameHolder(seen.holder, me)) return; // taken over: not ours
  try {
    unlinkSync(file);
  } catch {
    /* already gone */
  }
}
