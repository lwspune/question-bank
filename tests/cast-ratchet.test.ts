/**
 * `as unknown as` in src/ may only go down (TECH_DEBT_SPEC.md 3.3).
 *
 * WHY: a double cast switches the type checker off for that value. On 2026-11-05 there were 65,
 * about 50 of them forcing the shape of database rows because no client was typed. With typed
 * clients (src/types/db.ts) a new database read needs none. When you remove some, lower
 * BASELINE to the new count in the same commit.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const BASELINE = 60;

function countCasts(dir: string): number {
  let n = 0;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) n += countCasts(p);
    else if (/\.(ts|tsx)$/.test(e.name) && !e.name.endsWith(".generated.ts")) n += (fs.readFileSync(p, "utf8").match(/\bas unknown as\b/g) ?? []).length;
  }
  return n;
}

describe("as unknown as ratchet", () => {
  const count = countCasts(path.join(process.cwd(), "src"));
  it("does not rise above the baseline (read the row through a typed client instead)", () => {
    expect(count).toBeLessThanOrEqual(BASELINE);
  });
  it("the baseline records every drop (lower BASELINE in this test)", () => {
    expect(count).toBe(BASELINE);
  });
});
