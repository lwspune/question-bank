/**
 * The gate's first test step (scripts/testdb/require-env.ts): without the test
 * database settings, every DB test file SKIPS and the gate still printed PASS
 * (2026-10-23: a fresh worktree skipped 126 files and passed). Pure core
 * scripts/lib/testEnvRequired.ts.
 */
import { describe, it, expect } from "vitest";
import { missingTestEnv, TEST_ENV_VARS } from "../scripts/lib/testEnvRequired";

const FULL = {
  TEST_SUPABASE_URL: "https://rjwuwmrzkyergflmmfxq.supabase.co",
  TEST_SUPABASE_ANON_KEY: "anon",
  TEST_SUPABASE_SERVICE_ROLE_KEY: "service",
};

describe("missingTestEnv", () => {
  it("is empty when every test database setting is there", () => {
    expect(missingTestEnv(FULL)).toEqual([]);
  });

  it("names each setting that is missing or blank", () => {
    expect(missingTestEnv({ ...FULL, TEST_SUPABASE_ANON_KEY: "" })).toEqual(["TEST_SUPABASE_ANON_KEY"]);
    expect(missingTestEnv({})).toEqual([...TEST_ENV_VARS]);
  });

  it("ignores the production settings: they never stand in for the test database", () => {
    expect(
      missingTestEnv({
        NEXT_PUBLIC_SUPABASE_URL: "https://wunvtnqlzjrkvolslbnm.supabase.co",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "a",
        SUPABASE_SERVICE_ROLE_KEY: "s",
      })
    ).toEqual([...TEST_ENV_VARS]);
  });
});
