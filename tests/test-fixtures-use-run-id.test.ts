/**
 * Every test fixture is named with an id from testRunId() (2026-11-09).
 *
 * The global teardown deletes only rows carrying an id THIS run handed out
 * (tests/helpers/runIdRegistry.ts), so a fixture named any other way is not
 * cleaned by its own run and lingers for 6 hours (the stale sweep). Before
 * this, the teardown deleted every test-looking row, which is what deleted
 * other live runs' fixtures. A SOURCE scan, so it fails the moment a new test
 * slips back to `randomUUID().slice(0, 8)` or `Date.now()`.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const TESTS = path.resolve(__dirname);
const SKIP = new Set(["helpers/runIdRegistry.ts", "test-fixtures-use-run-id.test.ts"]);

function walk(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== "node_modules" && e.name !== "fixtures") walk(full, out);
    } else if (e.name.endsWith(".ts")) out.push(full);
  }
  return out;
}

/** Comments are prose: a doc example naming the old pattern is not code. */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
}

const files = walk(TESTS)
  .map((f) => ({ rel: path.relative(TESTS, f).split(path.sep).join("/"), src: stripComments(readFileSync(f, "utf8")) }))
  .filter((f) => !SKIP.has(f.rel));

/** Does the file write fixtures that the teardown sweeps by name? */
function writesNamedFixtures(src: string): boolean {
  return /\bcreateUser\(/.test(src) || /from\(\s*["']organizations["']\s*\)\s*\.insert/.test(src);
}

/** Names assigned from testRunId() in the file: `const RUN_ID = testRunId();`. */
function runIdVars(src: string): Set<string> {
  return new Set([...src.matchAll(/\b(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*testRunId\(\)/g)].map((m) => m[1]));
}

/** Test emails written as template literals, with the names they interpolate. */
function templateEmails(src: string): { email: string; vars: string[] }[] {
  const out: { email: string; vars: string[] }[] = [];
  for (const m of src.matchAll(/`([^`\s]*@test\.(?:local|invalid))/g)) {
    const vars = [...m[1].matchAll(/\$\{\s*([A-Za-z_$][\w$]*)\s*\}/g)].map((v) => v[1]);
    out.push({ email: m[1], vars });
  }
  return out;
}

describe("test fixtures carry a testRunId() id", () => {
  it("no test makes its own 8-hex id with randomUUID().slice(0, 8)", () => {
    const bad = files.filter((f) => f.src.includes("randomUUID().slice(0, 8)")).map((f) => f.rel);
    expect(bad, "use testRunId() from ./helpers/runId").toEqual([]);
  });

  it("every file that creates users or orgs takes an id from testRunId()", () => {
    const bad = files.filter((f) => writesNamedFixtures(f.src) && runIdVars(f.src).size === 0).map((f) => f.rel);
    expect(bad).toEqual([]);
  });

  it("every test email in those files interpolates a testRunId() id", () => {
    const bad: string[] = [];
    for (const f of files) {
      if (!writesNamedFixtures(f.src)) continue;
      const ids = runIdVars(f.src);
      for (const e of templateEmails(f.src)) {
        if (!e.vars.some((v) => ids.has(v))) bad.push(`${f.rel}: ${e.email}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it("no file that creates users hard-codes a test email (every run would share it)", () => {
    const bad: string[] = [];
    for (const f of files) {
      if (!writesNamedFixtures(f.src)) continue;
      for (const m of f.src.matchAll(/["']([^"'\s`]+@test\.(?:local|invalid))["']/g)) bad.push(`${f.rel}: ${m[1]}`);
    }
    expect(bad).toEqual([]);
  });
});
