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
    hookTimeout: 30000,
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
