import { describe, it, expect } from "vitest";
import { peakIndices } from "@/lib/guide/peakValues";

describe("peakIndices — standout-cell detection for scannable tables", () => {
  it("returns the single max index", () => {
    expect(peakIndices([1, 2, 3])).toEqual(new Set([2]));
    expect(peakIndices([0, 0, 1])).toEqual(new Set([2]));
  });

  it("highlights all tied maxima", () => {
    expect(peakIndices([3, 1, 3])).toEqual(new Set([0, 2]));
  });

  it("handles negatives", () => {
    expect(peakIndices([-1, -5, -2])).toEqual(new Set([0]));
  });

  it("returns empty when there's nothing to single out", () => {
    expect(peakIndices([])).toEqual(new Set()); // empty input
    expect(peakIndices([5])).toEqual(new Set()); // single value
    expect(peakIndices([2, 2, 2])).toEqual(new Set()); // no variation
  });
});
