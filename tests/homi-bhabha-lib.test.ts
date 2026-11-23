import { describe, expect, it } from "vitest";
import { normaliseKey, resolveAccepted, scoreAccepted } from "../scripts/homi-bhabha/lib";

const full = (over: Record<string, string> = {}): Record<string, string> => {
  const k: Record<string, string> = {};
  for (let n = 1; n <= 100; n++) k[String(n)] = "ABCD"[n % 4];
  return { ...k, ...over };
};

describe("normaliseKey (MSTA's printed key: letters A-D)", () => {
  it("keeps letters, any case, as A-D", () => {
    const { key, multi } = normaliseKey(full({ "1": "c", "2": " B " }), 100);
    expect(key["1"]).toBe("C");
    expect(key["2"]).toBe("B");
    expect(multi).toEqual({});
  });

  it('reads "B or C" and "B,C" as two accepted options, the first as the key letter', () => {
    const { key, multi } = normaliseKey(full({ "45": "B or C", "46": "a, d" }), 100);
    expect(key["45"]).toBe("B");
    expect(multi["45"]).toEqual(["B", "C"]);
    expect(multi["46"]).toEqual(["A", "D"]);
  });

  it("marks a dropped item X", () => {
    expect(normaliseKey(full({ "7": "DROP" }), 100).key["7"]).toBe("X");
    expect(normaliseKey(full({ "8": "x" }), 100).key["8"]).toBe("X");
  });

  it("refuses an unreadable cell rather than guessing", () => {
    expect(() => normaliseKey(full({ "3": "E" }), 100)).toThrow(/Q3/);
    expect(() => normaliseKey(full({ "4": "2" }), 100)).toThrow(/Q4/);
    expect(() => normaliseKey(full({ "5": "" }), 100)).toThrow(/Q5/);
  });

  it("refuses a short key and a question outside the paper", () => {
    const short = full();
    delete short["99"];
    expect(() => normaliseKey(short, 100)).toThrow(/missing 1 of 100/);
    expect(() => normaliseKey(full({ "101": "A" }), 100)).toThrow(/Q101/);
  });

  it("lets a held number be absent, and only a held one", () => {
    const k = full();
    delete k["10"];
    expect(normaliseKey(k, 100, [10]).key["10"]).toBeUndefined();
  });
});

describe("scoring helpers (unchanged from the military-school lane)", () => {
  it("counts any accepted letter as right and skips dropped items", () => {
    const s = scoreAccepted({ "1": "B", "2": "X", "3": "A" }, { "1": ["B", "C"] }, [
      { number: 1, answer: "C", confidence: "HIGH" },
      { number: 2, answer: "A" },
      { number: 3, answer: "D", confidence: "LOW" },
    ]);
    expect(s).toMatchObject({ scored: 2, match: 1, mismatched: [3] });
  });

  it("ships the accepted letter a blind pass reached", () => {
    expect(resolveAccepted(["B", "C"], "c", undefined)).toBe("C");
    expect(resolveAccepted(["B", "C"], "A", "D")).toBe("B");
  });
});
