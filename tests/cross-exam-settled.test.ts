/**
 * Settled exam-twin files (scripts/cross-exam/data/*.json): the record of each
 * review run, and the only input the commit script writes from. The shape is
 * checked here for the pure rule, and every committed file is checked against
 * it, so a bad file fails the gate before it can reach the database.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { validateSettled } from "@/lib/crossExam/settled";

const A = "11111111-1111-4111-8111-111111111111";
const B = "22222222-2222-4222-8222-222222222222";
const C = "33333333-3333-4333-8333-333333333333";

const file = (pairs: unknown[], over: Record<string, unknown> = {}) => ({
  run: "nda-maths-matrices-2026-11-06",
  settledOn: "2026-11-06",
  targets: [{ exam: "NDA", subject: "Mathematics", chapter: "Matrices & Determinants" }],
  board: [{ exam: "Maharashtra HSC Class 12", subject: "Mathematics", chapter: "Matrices" }],
  pairs,
  ...over,
});

describe("validateSettled", () => {
  it("accepts a well-formed file", () => {
    expect(validateSettled(file([{ source: A, target: B, kind: "numbers", why: "inverse of a 3x3 matrix" }]))).toEqual([]);
  });

  it("names every problem", () => {
    const errors = validateSettled(
      file(
        [
          { source: A, target: A, kind: "numbers", why: "x" },
          { source: A, target: B, kind: "close", why: "x" },
          { source: A, target: C, kind: "similar", why: "" },
          { source: A, target: C, kind: "similar", why: "uses \\frac{a}{b}" },
          { source: "not-a-uuid", target: B, kind: "exact", why: "x" },
        ],
        { run: "" }
      )
    );
    expect(errors.join("\n")).toMatch(/run/);
    expect(errors.join("\n")).toMatch(/pairs\[0\].*itself/);
    expect(errors.join("\n")).toMatch(/pairs\[1\].*kind/);
    expect(errors.join("\n")).toMatch(/pairs\[2\].*why/);
    expect(errors.join("\n")).toMatch(/pairs\[3\].*duplicate/);
    expect(errors.join("\n")).toMatch(/pairs\[4\].*source/);
  });

  it("refuses a why longer than the database allows", () => {
    expect(validateSettled(file([{ source: A, target: B, kind: "exact", why: "x".repeat(201) }]))).toHaveLength(1);
  });

  it("takes several exam chapters in one run (a board chapter teaching more than one)", () => {
    const two = file([{ source: A, target: B, kind: "exact", why: "x" }], {
      targets: [
        { exam: "NDA", subject: "Mathematics", chapter: "Functions" },
        { exam: "NDA", subject: "Mathematics", chapter: "Logarithms" },
      ],
    });
    expect(validateSettled(two)).toEqual([]);
  });

  it("refuses a run with no exam chapter", () => {
    expect(validateSettled(file([{ source: A, target: B, kind: "exact", why: "x" }], { targets: [] })).join()).toMatch(/targets/);
  });

  it("refuses a file without pairs", () => {
    expect(validateSettled({ run: "x" })).not.toEqual([]);
  });
});

describe("committed settled files", () => {
  const dir = join(process.cwd(), "scripts/cross-exam/data");
  const files = readdirSync(dir).filter((f) => f.endsWith(".json"));

  it("exist", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const f of files) {
    it(`${f} is valid and named after its run`, () => {
      const data = JSON.parse(readFileSync(join(dir, f), "utf8"));
      expect(validateSettled(data)).toEqual([]);
      expect(f).toBe(`${data.run}.json`);
    });
  }
});
