import { describe, expect, it } from "vitest";
import { equalValueOptions, proposeEqualValueRepair } from "../scripts/afcat/lib";

const f = (a: number, b: number) => `\\(\\frac{${a}}{${b}}\\)`;
const apply = (opts: string[], p: NonNullable<ReturnType<typeof proposeEqualValueRepair>>) =>
  opts.map((o, i) => p.options["ABCD"[i] as "A"] ?? o);

describe("proposeEqualValueRepair", () => {
  it("returns null for a clean row", () => {
    expect(proposeEqualValueRepair([f(1, 2), f(1, 3), f(1, 4), f(1, 5)], "A")).toBeNull();
  });

  it("keeps the key and replaces its unsimplified twin and a duplicate distractor pair", () => {
    // Cadetprep Cards Q2: 5/13, 24/52, 6/13 (key), 20/52.
    const opts = [f(5, 13), f(24, 52), f(6, 13), f(20, 52)];
    const p = proposeEqualValueRepair(opts, "C")!;
    expect(p.answer).toBeUndefined();
    expect(Object.keys(p.options).sort()).toEqual(["B", "D"]);
    expect(equalValueOptions(apply(opts, p))).toEqual([]);
    expect(apply(opts, p)[2]).toBe(f(6, 13));
  });

  it("moves the answer to the simplest form when the key is the unsimplified copy", () => {
    const opts = [f(24, 52), f(6, 13), f(1, 2), f(1, 3)];
    const p = proposeEqualValueRepair(opts, "A")!;
    expect(p.answer).toBe("B");
    expect(Object.keys(p.options)).toEqual(["A"]);
    expect(equalValueOptions(apply(opts, p))).toEqual([]);
  });

  it("repairs a three-way tie, keeping one", () => {
    const opts = ["\\(3:2\\)", "\\(2:3\\)", "\\(12:8\\)", "\\(6:4\\)"];
    const p = proposeEqualValueRepair(opts, "A")!;
    expect(Object.keys(p.options).sort()).toEqual(["C", "D"]);
    expect(equalValueOptions(apply(opts, p))).toEqual([]);
  });

  it("repairs the same text printed twice and decimals", () => {
    const opts = ["\\(0.5\\)", "\\(0.05\\)", "\\(0.2\\)", "\\(0.05\\)"];
    const p = proposeEqualValueRepair(opts, "A")!;
    expect(Object.keys(p.options)).toEqual(["D"]);
    expect(equalValueOptions(apply(opts, p))).toEqual([]);
    expect(p.options.D).toMatch(/^\\\(0\.0\d\\\)$/);
  });

  it("keeps the simplest form of a tied wrong pair and keeps a proper fraction proper", () => {
    // Cadetprep Cards Q25: 26/52 and 1/2 tie (both wrong); key D 6/13.
    const opts = [f(26, 52), f(24, 52), f(1, 2), f(6, 13)];
    const p = proposeEqualValueRepair(opts, "D")!;
    expect(p.options.C).toBeUndefined();
    expect(p.options.A).toBeDefined();
    for (const t of Object.values(p.options)) {
      const [, a, b] = t!.match(/frac\{(\d+)\}\{(\d+)\}/)!.map(Number);
      expect(a).toBeLessThan(b);
    }
  });

  it("gives up (null) on a duplicate it cannot reshape", () => {
    expect(proposeEqualValueRepair(["\\(\\sqrt{2}\\)", "\\(\\sqrt{2}\\)", "\\(1\\)", "\\(2\\)"], "C")).toBeNull();
  });
});
