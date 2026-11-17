import { describe, expect, it } from "vitest";
import { normaliseNtaKey, resolveAccepted, scoreAccepted } from "../scripts/milschool/lib";

const full = (n: number, fill = "1"): Record<string, string> =>
  Object.fromEntries(Array.from({ length: n }, (_, i) => [String(i + 1), fill]));

describe("normaliseNtaKey", () => {
  it("maps NTA's option numbers 1-4 to letters A-D", () => {
    const k = normaliseNtaKey({ ...full(4), "1": "1", "2": "2", "3": "3", "4": "4" }, 4);
    expect(k.key).toEqual({ "1": "A", "2": "B", "3": "C", "4": "D" });
    expect(k.multi).toEqual({});
  });

  it("reads DROP as a withdrawn item (X), whatever its case or spacing", () => {
    const k = normaliseNtaKey({ ...full(3), "2": " drop " }, 3);
    expect(k.key["2"]).toBe("X");
  });

  it("keeps every accepted option of a two-answer item, in order", () => {
    const k = normaliseNtaKey({ ...full(3), "3": "2,3" }, 3);
    expect(k.multi).toEqual({ "3": ["B", "C"] });
    // The key carries the first accepted letter until a blind pass picks one.
    expect(k.key["3"]).toBe("B");
  });

  it("refuses a cell it cannot read rather than guessing", () => {
    expect(() => normaliseNtaKey({ ...full(2), "2": "5" }, 2)).toThrow(/Q2/);
    expect(() => normaliseNtaKey({ ...full(2), "2": "" }, 2)).toThrow(/Q2/);
    expect(() => normaliseNtaKey({ ...full(2), "2": "B" }, 2)).toThrow(/Q2/);
  });

  it("refuses a short key (a missed page or column must not pass as complete)", () => {
    expect(() => normaliseNtaKey(full(149), 150)).toThrow(/missing/);
  });

  it("refuses a question number outside the paper", () => {
    expect(() => normaliseNtaKey({ ...full(2), "3": "1" }, 2)).toThrow(/outside/);
  });
});

describe("resolveAccepted", () => {
  it("ships the accepted letter a blind pass reached", () => {
    expect(resolveAccepted(["B", "C"], "C", "B")).toBe("C");
    expect(resolveAccepted(["B", "C"], "D", "C")).toBe("C");
  });
  it("falls back to the first accepted letter when neither pass reached one", () => {
    expect(resolveAccepted(["B", "C"], "A", "D")).toBe("B");
    expect(resolveAccepted(["B", "C"], undefined, undefined)).toBe("B");
  });
});

describe("scoreAccepted", () => {
  it("counts a pass right when it reached any accepted letter, and skips drops", () => {
    const key = { "1": "A", "2": "X", "3": "B" };
    const multi = { "3": ["B", "C"] };
    const pass = [
      { number: 1, answer: "a", confidence: "HIGH" },
      { number: 2, answer: "C", confidence: "HIGH" },
      { number: 3, answer: "C", confidence: "MED" },
    ];
    const s = scoreAccepted(key, multi, pass);
    expect(s.scored).toBe(2);
    expect(s.match).toBe(2);
    expect(s.mismatched).toEqual([]);
    expect(s.byConfidence).toEqual({ HIGH: { ok: 1, of: 1 }, MED: { ok: 1, of: 1 } });
  });
  it("lists the questions a pass missed", () => {
    const s = scoreAccepted({ "1": "A", "2": "B" }, {}, [
      { number: 1, answer: "B", confidence: "LOW" },
      { number: 2, answer: "B", confidence: "HIGH" },
    ]);
    expect(s.mismatched).toEqual([1]);
  });
});
