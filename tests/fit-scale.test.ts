/**
 * When a display formula is a little too wide for a phone, it shrinks to fit
 * instead of being cut off at the box edge (2026-11-10, slicker Phase 2). Only a
 * little: below 70% the maths gets too small to read, so a wider formula keeps
 * its size and scrolls sideways under a clear edge shadow instead.
 */
import { describe, expect, it } from "vitest";
import { FIT_MIN_SCALE, fitScale } from "@/lib/math/fitScale";

describe("fitScale", () => {
  it("leaves a formula that fits alone", () => {
    expect(fitScale(300, 320)).toBe(1);
    expect(fitScale(320, 320)).toBe(1);
  });

  it("shrinks a slightly wide formula just enough to fit, with a hair of room", () => {
    const s = fitScale(400, 320);
    expect(s).toBeLessThan(0.8);
    expect(400 * s).toBeLessThanOrEqual(320);
    expect(400 * s).toBeGreaterThan(320 * 0.95);
  });

  it("never shrinks below the readable floor: a much wider formula scrolls", () => {
    expect(FIT_MIN_SCALE).toBe(0.7);
    expect(fitScale(1000, 320)).toBe(1);
  });

  it("shrinks right at the floor", () => {
    expect(fitScale(320 / 0.71, 320)).toBeGreaterThanOrEqual(FIT_MIN_SCALE);
    expect(fitScale(320 / 0.71, 320)).toBeLessThan(1);
  });

  it("treats a box with no width yet (not laid out) as fitting", () => {
    expect(fitScale(400, 0)).toBe(1);
    expect(fitScale(0, 0)).toBe(1);
  });
});
