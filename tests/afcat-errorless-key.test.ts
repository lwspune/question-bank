import { describe, it, expect } from "vitest";
import { parseErrorlessKey } from "../scripts/afcat/lib";

describe("parseErrorlessKey", () => {
  it("reads the list format 'n. x) value' (Mixture sheet)", () => {
    const k = parseErrorlessKey(["1. c) 15 liters", "2. b) 25:23", "17. c) 24 kg"]);
    expect(k.get(1)).toEqual({ letter: "C", value: "15 liters" });
    expect(k.get(2)).toEqual({ letter: "B", value: "25:23" });
    expect(k.get(17)).toEqual({ letter: "C", value: "24 kg" });
  });

  it("reads a grid of 'Qn - x,' entries, several to a line", () => {
    const k = parseErrorlessKey(["Q1 - c, Q2 - a, Q3 - d,", "Q10 - b, Q11 - c"]);
    expect([...k.entries()]).toEqual([
      [1, { letter: "C", value: "" }],
      [2, { letter: "A", value: "" }],
      [3, { letter: "D", value: "" }],
      [10, { letter: "B", value: "" }],
      [11, { letter: "C", value: "" }],
    ]);
  });

  it("reads several 'n. x)' entries on one line with no values (SI sheet, section 2)", () => {
    const k = parseErrorlessKey(["1. c) 2. a) 3. d)", "10. b) 11. a)"]);
    expect([...k.keys()]).toEqual([1, 2, 3, 10, 11]);
    expect(k.get(2)).toEqual({ letter: "A", value: "" });
    expect(k.get(11)).toEqual({ letter: "A", value: "" });
  });

  it("reads 'Q.n x)' entries several to a line (Speed-Time-Distance sheet)", () => {
    const k = parseErrorlessKey(["Q.1 c) Q.2 a) Q.3 b)", "Q.19 b) Q.20 c)"]);
    expect([...k.keys()]).toEqual([1, 2, 3, 19, 20]);
    expect(k.get(3)).toEqual({ letter: "B", value: "" });
  });

  it("reads a letters-only run that wraps mid-entry across lines (Average sheet, section 6)", () => {
    const k = parseErrorlessKey(["1. b) 2. c) 3.", "a) 4. d) 5.", "c)"]);
    expect([...k.entries()].map(([n, v]) => `${n}${v.letter}`)).toEqual(["1B", "2C", "3A", "4D", "5C"]);
  });

  it("returns an empty map for a picture key (no lines)", () => {
    expect(parseErrorlessKey([]).size).toBe(0);
  });

  it("throws on a line it cannot read, rather than skipping an answer", () => {
    expect(() => parseErrorlessKey(["1. c) 15 liters", "something else"])).toThrow(/cannot read key line/);
  });
});
