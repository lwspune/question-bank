/**
 * One test file at a time on the shared settings row (paywall_settings).
 *
 * The test project has ONE settings row (the free limits). Seven files set
 * values on it for their run and put back what they read at the start. Two of
 * them running at once overwrote each other mid-run, and worse, one could read
 * the other's temporary values as "the original" and put THOSE back for good.
 * On 2026-11-27 practice-tests failed a gate run because practice-friend or
 * free-mock-limit restored free_practice_tests_per_day under it.
 *
 * A file takes its turn FIRST in its outer beforeAll, before it reads the row,
 * and gives it back LAST in its afterAll, after it has restored the row. The
 * turn is the same file lock as the one-run-at-a-time lock (testdbLock.ts),
 * under its own name, so a crashed file's turn is taken over when its process
 * is gone. tests/settings-turn.test.ts fails a file that writes the row without
 * taking a turn. Every other test file still runs in parallel.
 */
import { acquireTestDbLock, testDbLockPath } from "./testdbLock";

/** Under the 6-minute hook timeout (vitest.config.ts), so a stuck wait fails with this file's own message. */
const WAIT_MS = 5 * 60_000;

function projectRef(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url ? new URL(url).hostname.split(".")[0] : "no-project";
}

/** Wait for the settings row, take it, and return the function that gives it back. */
export async function takeSettingsTurn(what: string): Promise<() => void> {
  return acquireTestDbLock(
    testDbLockPath(`${projectRef()}-paywall-settings`),
    { pid: process.pid, cwd: process.cwd(), startedAt: new Date().toISOString(), what },
    {
      pollMs: 500,
      timeoutMs: WAIT_MS,
      log: (m) => console.log(m.replace("[testdb lock]", "[settings turn]").replace("the test database", "the settings row")),
    },
  );
}
