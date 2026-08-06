import { defineConfig } from "vitest/config";
import path from "node:path";
import { PROD_CONTRACT_FILES } from "./tests/prodContractFiles";

/**
 * PROD-CONTRACT suite: read-only assertions against LIVE production content
 * (guide/notes editorial ↔ live taxonomy, live count shapes). Run via
 * `npm run test:prod-contract`.
 *
 * - PROD_CONTRACT=1 makes tests/setup.ts resolve the PRODUCTION env
 *   (.env.local / CI secrets) and pass the testdb-guard's explicit
 *   prod-contract verdict.
 * - Deliberately NO globalSetup: these suites write nothing, so the
 *   fixture-sweeping teardown has no business running here (and must not
 *   sweep prod on the strength of a read-only run).
 */
export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  test: {
    setupFiles: ["./tests/setup.ts"],
    include: PROD_CONTRACT_FILES,
    env: { PROD_CONTRACT: "1" },
    testTimeout: 30000,
    hookTimeout: 90000,
    pool: "forks",
    poolOptions: { forks: { maxForks: 2, minForks: 1 } },
    retry: 1,
  },
});
