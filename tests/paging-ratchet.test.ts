/**
 * Hand-written paging and id-chunking loops in src/ may only go down (TECH_DEBT_SPEC.md 3.4).
 *
 * WHY: the PostgREST row cap and the URL-length limit on `.in()` have caused 5 production bugs
 * (CLAUDE.md pitfalls), each in a loop someone wrote by hand. Use readAllPages / readInChunks
 * (src/lib/supabase/) instead. When you move a file over, lower the baseline in the same commit.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const BASELINE = { pagingLoops: 29, idChunkLoops: 24 };

function files(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? files(p) : /\.(ts|tsx)$/.test(e.name) ? [p] : [];
  });
}

const HELPERS = new Set(["readAllPages.ts", "readInChunks.ts"]);
const sources = files(path.join(process.cwd(), "src"))
  .filter((f) => !HELPERS.has(path.basename(f)))
  .map((f) => fs.readFileSync(f, "utf8"));

const count = {
  pagingLoops: sources.filter((s) => /for \(let from = 0\b/.test(s)).length,
  idChunkLoops: sources.filter((s) => /\.slice\(i, i \+ [A-Za-z_0-9]+\)/.test(s) && /\.in\(/.test(s)).length,
};

describe("paging ratchet", () => {
  it("no new hand-written loops (use readAllPages / readInChunks)", () => {
    expect(count.pagingLoops).toBeLessThanOrEqual(BASELINE.pagingLoops);
    expect(count.idChunkLoops).toBeLessThanOrEqual(BASELINE.idChunkLoops);
  });
  it("the baseline records every drop (lower BASELINE in this test)", () => {
    expect(count).toEqual(BASELINE);
  });
});
