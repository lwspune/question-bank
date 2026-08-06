/**
 * Unit spec for the test-DB prod-guard (pure helpers, no DB).
 *
 * The guard's job: fixture-writing tests may only ever run against an
 * allow-listed TEST project. Prod is reachable only via the explicit
 * read-only prod-contract path, or (temporarily) the transition flag.
 */
import { describe, it, expect } from "vitest";
import {
  extractProjectRef,
  classifyTestTarget,
  ALLOWED_TEST_REFS,
  PROD_REF,
} from "./helpers/testdb";

const TEST_URL = `https://${[...ALLOWED_TEST_REFS][0]}.supabase.co`;
const PROD_URL = `https://${PROD_REF}.supabase.co`;

describe("extractProjectRef", () => {
  it("extracts the ref from a project URL", () => {
    expect(extractProjectRef(PROD_URL)).toBe(PROD_REF);
    expect(extractProjectRef(`${TEST_URL}/rest/v1/`)).toBe([...ALLOWED_TEST_REFS][0]);
  });

  it("returns null for non-supabase or malformed URLs", () => {
    expect(extractProjectRef("http://localhost:54321")).toBeNull();
    expect(extractProjectRef("https://example.com")).toBeNull();
    expect(extractProjectRef(undefined)).toBeNull();
    expect(extractProjectRef("")).toBeNull();
    // ref must be exactly 20 chars — a lookalike host must not match
    expect(extractProjectRef("https://evil.supabase.co.attacker.com")).toBeNull();
  });
});

describe("classifyTestTarget", () => {
  it("allows the allow-listed test project", () => {
    expect(
      classifyTestTarget({ url: TEST_URL, prodContract: false, transition: false })
    ).toEqual({ kind: "test" });
  });

  it("forbids prod by default, naming the fix", () => {
    const v = classifyTestTarget({ url: PROD_URL, prodContract: false, transition: false });
    expect(v.kind).toBe("forbidden");
    if (v.kind === "forbidden") expect(v.reason).toMatch(/PRODUCTION/);
  });

  it("allows prod only under the explicit prod-contract flag", () => {
    expect(
      classifyTestTarget({ url: PROD_URL, prodContract: true, transition: false })
    ).toEqual({ kind: "prod-contract" });
  });

  it("allows prod with a warning verdict during the transition window", () => {
    expect(
      classifyTestTarget({ url: PROD_URL, prodContract: false, transition: true })
    ).toEqual({ kind: "legacy-prod" });
  });

  it("fails closed on an unknown project ref (allow-list, not deny-list)", () => {
    const v = classifyTestTarget({
      url: "https://aaaaaaaaaaaaaaaaaaaa.supabase.co",
      prodContract: false,
      transition: true, // even the transition flag doesn't open unknown refs
    });
    expect(v.kind).toBe("forbidden");
  });

  it("fails closed when the URL is unset", () => {
    const v = classifyTestTarget({ url: undefined, prodContract: false, transition: false });
    expect(v.kind).toBe("forbidden");
  });

  it("prod-contract beats an unknown ref only for reads — still forbidden? No: prod-contract is an explicit operator choice", () => {
    // Deliberate: PROD_CONTRACT=1 with a non-test URL is allowed (the operator
    // asked for it); the flag exists precisely to point at prod.
    const v = classifyTestTarget({ url: PROD_URL, prodContract: true, transition: true });
    expect(v.kind).toBe("prod-contract");
  });
});
