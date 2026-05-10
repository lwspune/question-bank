import { describe, expect, it } from "vitest";
import { interpolateCount, easeOutCubic } from "@/lib/dashboard/countUp";

describe("easeOutCubic", () => {
  it("returns 0 at t=0", () => {
    expect(easeOutCubic(0)).toBe(0);
  });

  it("returns 1 at t=1", () => {
    expect(easeOutCubic(1)).toBe(1);
  });

  it("is past the linear midpoint at t=0.5 (front-loaded easing)", () => {
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
  });

  it("is monotonically increasing", () => {
    const samples = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1];
    for (let i = 1; i < samples.length; i++) {
      expect(easeOutCubic(samples[i])).toBeGreaterThanOrEqual(
        easeOutCubic(samples[i - 1])
      );
    }
  });
});

describe("interpolateCount", () => {
  it("returns the start value at elapsed=0", () => {
    expect(interpolateCount(0, 100, 0, 1000)).toBe(0);
  });

  it("returns the target exactly at elapsed=duration", () => {
    expect(interpolateCount(0, 100, 1000, 1000)).toBe(100);
  });

  it("clamps to target when elapsed exceeds duration", () => {
    expect(interpolateCount(0, 100, 9999, 1000)).toBe(100);
  });

  it("returns an integer (the displayed number)", () => {
    const v = interpolateCount(0, 100, 250, 1000);
    expect(Number.isInteger(v)).toBe(true);
  });

  it("monotonically increases over time when target > start", () => {
    let prev = -Infinity;
    for (let t = 0; t <= 1000; t += 50) {
      const v = interpolateCount(0, 100, t, 1000);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
  });

  it("handles target=start without dividing by zero", () => {
    expect(interpolateCount(42, 42, 250, 1000)).toBe(42);
  });

  it("returns target immediately when duration is 0", () => {
    expect(interpolateCount(0, 100, 0, 0)).toBe(100);
  });
});
