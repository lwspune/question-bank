import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  test: {
    setupFiles: ["./tests/setup.ts"],
    globalSetup: ["./tests/global-teardown.ts"],
    include: ["tests/**/*.test.ts"],
    testTimeout: 30000,
    // Hooks get 3x the per-test budget. A DB-integration suite's beforeAll /
    // afterAll is create-user → insert org → insert member → cascade-DELETE the
    // org, and a cascade reaches questions → options → tags → reports. Those
    // are already minimal (4-5 small round trips); what makes them slow is the
    // shared production Postgres being contended or IO-throttled, when each
    // round trip costs seconds instead of milliseconds.
    //
    // 30s was calibrated against a healthy DB and broke CI repeatedly once it
    // wasn't: 7 of 22 runs failed over 2026-08-03..05. The 2026-08-05 run is
    // the clearest read — ALL 2,843 assertions passed and only two suites'
    // HOOKS timed out, which then stranded their fixtures and (correctly)
    // tripped the global-teardown leak guardrail, turning one slow cascade
    // delete into two failures plus a scary "test data in the LIVE project"
    // error. Nothing was logically broken.
    //
    // Raising this is not papering over a bug — there is no failing assertion
    // and no inefficient hook to fix. It is headroom for a DB whose latency we
    // do not control. Kept finite (not disabled) so a genuinely hung hook still
    // fails rather than running out the job's wall clock.
    hookTimeout: 90000,
    // ~71 of the test files hit ONE shared live Supabase project. At full
    // file-parallelism (≈ CPU cores) that overloads the DB — heavy queries hit
    // Postgres statement timeouts and fixtures race across files (esp. on
    // high-core dev machines running the pre-push gate). Capping concurrent
    // worker processes keeps DB load in the healthy regime without serializing
    // the whole suite. There is no naming convention separating DB tests from
    // pure ones, so the cap is global rather than a per-project split. On
    // low-core CI runners this is a near-no-op (already ~2 forks).
    pool: "forks",
    poolOptions: { forks: { maxForks: 2, minForks: 1 } },
    // One auto-retry still absorbs a rare transient pooler/network blip so the
    // gate self-heals; a genuinely broken test fails both attempts, so real
    // regressions are not masked.
    retry: 1,
  },
});
