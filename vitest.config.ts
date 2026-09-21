import { defineConfig } from "vitest/config";
import path from "node:path";
import { PROD_CONTRACT_FILES } from "./tests/prodContractFiles";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // `server-only` is a Next build alias with no resolvable module behind it.
      // A test that drives a route handler pulls in whatever that route imports,
      // so without this any route touching lib/activity/service.ts fails to load.
      // See tests/stubs/server-only.ts.
      "server-only": path.resolve(__dirname, "tests/stubs/server-only.ts"),
    },
  },
  test: {
    setupFiles: ["./tests/setup.ts"],
    globalSetup: ["./tests/global-teardown.ts"],
    include: ["tests/**/*.test.ts"],
    // Prod-contract suites assert against LIVE prod content and run separately
    // via `npm run test:prod-contract` (see tests/prodContractFiles.ts).
    exclude: ["**/node_modules/**", ...PROD_CONTRACT_FILES],
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
    // ~76 of the test files write fixtures into the DEDICATED test project
    // (tests/helpers/testdb.ts) and sign in as those fixtures. The cap keeps
    // that traffic under TWO walls, both measured 2026-09-21 on a 12-core
    // machine with the full suite green at 2, 4 and 6 forks (317 s → 194 s →
    // 120 s) and failing at 8:
    //  - Supabase Auth limits `/auth/v1/token` (password sign-in) to 150
    //    requests per 5 minutes PER IP, burst 30. The window is shared by
    //    every run from this machine — including a re-run of the gate a
    //    minute after a red one. The 8-fork run was the third inside one
    //    window, so "8 is the wall" is NOT established; what is established
    //    is that a rate-limited sign-in used to surface as a fake RLS 42501
    //    (41 sites discarded the sign-in error — now `mustSignIn`).
    //  - Postgres contention on the test project: 4 statement timeouts in
    //    the same 8-fork run.
    // 5 sits under the measured-green 6 with headroom. The pure files (~300 of
    // ~400) take ~8 s of assertions in total and do not care; the cap is
    // global only because no naming convention separates the two kinds.
    // On low-core CI runners this is a near-no-op.
    pool: "forks",
    poolOptions: { forks: { maxForks: 5, minForks: 1 } },
    // One auto-retry still absorbs a rare transient pooler/network blip so the
    // gate self-heals; a genuinely broken test fails both attempts, so real
    // regressions are not masked.
    retry: 1,
  },
});
