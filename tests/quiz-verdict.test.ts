import { describe, it, expect } from "vitest";
import { scoreVerdict } from "@/lib/quiz/verdict";

describe("scoreVerdict", () => {
  it("returns the top band for a perfect / near-perfect score", () => {
    expect(scoreVerdict(15, 15).tone).toBe("gold");
    expect(scoreVerdict(14, 15).tone).toBe("gold"); // >=90%
    expect(scoreVerdict(15, 15).headline).toMatch(/./);
  });
  it("bands by percentage, not raw count", () => {
    expect(scoreVerdict(8, 10).tone).toBe("emerald"); // 80% strong
    expect(scoreVerdict(6, 10).tone).toBe("brand"); // 60% good start
    expect(scoreVerdict(3, 10).tone).toBe("amber"); // 30% keep going
    expect(scoreVerdict(1, 10).tone).toBe("slate"); // 10% just starting
  });
  it("handles a zero-length quiz without dividing by zero", () => {
    const v = scoreVerdict(0, 0);
    expect(v.headline).toMatch(/./);
    expect(["gold", "emerald", "brand", "amber", "slate"]).toContain(v.tone);
  });
  it("celebrate flag is on only for the top two bands", () => {
    expect(scoreVerdict(10, 10).celebrate).toBe(true);
    expect(scoreVerdict(8, 10).celebrate).toBe(true);
    expect(scoreVerdict(6, 10).celebrate).toBe(false);
  });
});
