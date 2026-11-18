/**
 * The global teardown deletes rows: it may only ever do so in the test project.
 *
 * 2026-11-18: a worktree with `.env.local` but no `.env.test.local` resolved the
 * suite to PRODUCTION (tests/helpers/testenv falls back to .env.local). The
 * per-worker guard in tests/setup.ts refused, but the teardown never asked it,
 * and its seed-org sweep deleted 28,779 live questions. A sweep is never a
 * read, so no flag (PROD_CONTRACT, TESTDB_TRANSITION) may open it.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ALLOWED_TEST_REFS, PROD_REF, mayTeardownSweep } from "./helpers/testdb";

const url = (ref: string) => `https://${ref}.supabase.co`;
const TEST_REF = [...ALLOWED_TEST_REFS][0];

describe("mayTeardownSweep", () => {
  it("allows the allow-listed test project", () => {
    expect(mayTeardownSweep(url(TEST_REF))).toBe(true);
  });

  it("refuses production", () => {
    expect(mayTeardownSweep(url(PROD_REF))).toBe(false);
  });

  it("refuses an unknown project and a missing URL", () => {
    expect(mayTeardownSweep(url("abcdefghijklmnopqrst"))).toBe(false);
    expect(mayTeardownSweep(undefined)).toBe(false);
    expect(mayTeardownSweep("")).toBe(false);
  });
});

describe("global teardown", () => {
  const src = readFileSync(join(__dirname, "global-teardown.ts"), "utf8");
  const body = src.slice(src.indexOf("return async function teardown"));

  it("asks mayTeardownSweep before it creates a client or sweeps", () => {
    const guard = body.indexOf("mayTeardownSweep(");
    expect(guard).toBeGreaterThan(-1);
    expect(guard).toBeLessThan(body.indexOf("createClient("));
    expect(guard).toBeLessThan(body.indexOf("sweepTestData("));
  });
});
