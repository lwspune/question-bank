/**
 * boundedArray: an array schema that refuses an over-long array BEFORE validating its elements.
 *
 * WHY (TECH_DEBT_SPEC.md 1.4, measured 2026-11-05): zod 3.25's ZodArray records a `.max()`
 * breach but still parses every element and keeps one issue per failing one
 * (node_modules/zod/v3/types.js, ZodArray._parse). Against /api/profile's own schema a 4 MB
 * body of 2,000,000 numbers produced 2,000,001 issues, 634 MB of heap and 0.9 s of CPU, and
 * any signed-in account can send it. GHSA-mrhx-c7xc-m3w5 is fixed only in zod 4.6.6.
 */
import { describe, it, expect } from "vitest";
import { z } from "zod";
import fs from "node:fs";
import path from "node:path";
import { boundedArray } from "@/lib/validation/boundedArray";

const schema = z.object({ targetExams: boundedArray(z.string(), 20).optional() });

describe("boundedArray", () => {
  it("accepts an array within the limit and returns its values", () => {
    expect(schema.parse({ targetExams: ["nda", "cds"] })).toEqual({ targetExams: ["nda", "cds"] });
  });

  it("keeps validating elements within the limit", () => {
    const r = schema.safeParse({ targetExams: ["nda", 7] });
    expect(r.success).toBe(false);
  });

  it("refuses an over-long array with ONE issue, without visiting its elements", () => {
    const huge = Array(2_000_000).fill(1);
    const t = Date.now();
    const r = schema.safeParse({ targetExams: huge });
    const ms = Date.now() - t;
    expect(r.success).toBe(false);
    if (r.success) return;
    expect(r.error.issues).toHaveLength(1);
    expect(r.error.issues[0].code).toBe("too_big");
    expect(ms).toBeLessThan(200);
  });

  it("refuses one element over the limit the same way", () => {
    const r = schema.safeParse({ targetExams: Array(21).fill("nda") });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues.map((i) => i.code)).toEqual(["too_big"]);
  });

  it("still allows the field to be omitted", () => {
    expect(schema.parse({})).toEqual({});
  });
});

describe("public API routes", () => {
  // Every route under src/app/api reads a request body a member of the public may send;
  // a bare z.array there brings back the per-element cost measured above.
  function files(dir: string): string[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const p = path.join(dir, e.name);
      return e.isDirectory() ? files(p) : /\.(ts|tsx)$/.test(e.name) ? [p] : [];
    });
  }
  it("use boundedArray, never a bare z.array", () => {
    const root = path.resolve(__dirname, "../src/app/api");
    const bare = files(root).filter((f) => /\bz\.array\(/.test(fs.readFileSync(f, "utf8")));
    expect(bare.map((f) => path.relative(root, f))).toEqual([]);
  });
});
