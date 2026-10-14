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

  it("returns an empty map for a picture key (no lines)", () => {
    expect(parseErrorlessKey([]).size).toBe(0);
  });

  it("throws on a line it cannot read, rather than skipping an answer", () => {
    expect(() => parseErrorlessKey(["1. c) 15 liters", "something else"])).toThrow(/cannot read key line/);
  });
});
