/**
 * A test run never falls back to the production keys by accident.
 *
 * 2026-11-18: a worktree with `.env.local` (production) but no `.env.test.local`
 * resolved the whole suite to production, because tests/helpers/testenv.ts read
 * `.env.local` whenever the test settings were missing. The teardown then swept
 * production. The teardown now refuses (tests/teardown-sweep-guard.test.ts), and
 * this closes the door one step earlier: without the test settings a run gets NO
 * database (DB suites skip), unless it deliberately asks for the read-only
 * production check (PROD_CONTRACT=1) or the old transition flag.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { mayUseProductionEnvFile } from "./helpers/testdb";

describe("mayUseProductionEnvFile", () => {
  it("refuses an ordinary run", () => {
    expect(mayUseProductionEnvFile({ prodContract: false, transition: false })).toBe(false);
  });

  it("allows the read-only prod-contract run", () => {
    expect(mayUseProductionEnvFile({ prodContract: true, transition: false })).toBe(true);
  });

  it("allows the legacy transition flag", () => {
    expect(mayUseProductionEnvFile({ prodContract: false, transition: true })).toBe(true);
  });
});

describe("resolveSupabaseTestEnv", () => {
  const src = readFileSync(join(__dirname, "helpers", "testenv.ts"), "utf8");

  it("reads .env.local only behind mayUseProductionEnvFile", () => {
    const fallback = src.slice(src.indexOf("else if"));
    expect(fallback).toContain("mayUseProductionEnvFile(");
    expect(fallback.indexOf("mayUseProductionEnvFile(")).toBeLessThan(fallback.indexOf("legacyEnvFile }"));
  });
});
