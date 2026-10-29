import { describe, expect, it } from "vitest";
import { fittedSize } from "@/lib/visuals/fitMath";

// A maths line is drawn at a size estimated from its text, then measured in the
// browser: wider than its box, it shrinks to fit (owner review, 2026-10-29:
// "h = -0.001" was cut to "h = -0.00").
describe("fittedSize", () => {
  it("keeps a line that fits at its size", () => {
    expect(fittedSize(16, 320, 300)).toBe(16);
    expect(fittedSize(16, 320, 320)).toBe(16);
  });

  it("shrinks a line that is wider than its box in proportion, with a little room to spare", () => {
    const s = fittedSize(16, 320, 400);
    expect(s).toBeLessThanOrEqual(16 * (320 / 400));
    expect(s).toBeGreaterThan(12);
  });

  it("never goes below a readable floor, and ignores a box that has not been laid out", () => {
    expect(fittedSize(16, 320, 2000)).toBe(9);
    expect(fittedSize(16, 0, 500)).toBe(16);
  });
});
