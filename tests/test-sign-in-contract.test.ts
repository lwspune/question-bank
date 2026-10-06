/**
 * Every test sign-in goes through a CHECKED helper (tests/helpers/fixture.ts):
 * `mustSignIn` when the test needs a signed-in client, `signInWorks` when the
 * test is asking whether a password works.
 *
 * A raw `signInWithPassword` call is how a rate-limited sign-in became a fake
 * failure: the error went unread, the client stayed signed out, and the test
 * failed later on an unrelated assertion. The 2026-09-21 sweep moved 41 calls
 * onto `mustSignIn`; by 2026-10-06 ten files had raw calls again (four of them
 * written after the sweep), and `billing-grant` blocked two pushes in a row on
 * it. A sweep does not stick, so this scan is the rule.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const TESTS_DIR = path.resolve(__dirname);
// The helper itself, and the spec that drives it with a fake client.
const ALLOWED = new Set(["helpers/fixture.ts", "fixture-sign-in.test.ts", "test-sign-in-contract.test.ts"]);

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return walk(full);
    return /\.tsx?$/.test(name) ? [full] : [];
  });
}

describe("test sign-ins", () => {
  it("never call signInWithPassword directly outside the checked helpers", () => {
    const offenders = walk(TESTS_DIR)
      .map((f) => path.relative(TESTS_DIR, f).split(path.sep).join("/"))
      .filter((rel) => !ALLOWED.has(rel))
      .filter((rel) => readFileSync(path.join(TESTS_DIR, rel), "utf8").includes("signInWithPassword"));
    expect(offenders).toEqual([]);
  });
});
