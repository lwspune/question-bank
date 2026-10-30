import { describe, it, expect } from "vitest";
import { watermarkFraction, WATERMARK_THRESHOLD, figureWatermarkIssue } from "../scripts/lib/figures/watermark";

/**
 * The ingestion watermark check. A scanned exam booklet can carry a printed
 * serial-number watermark (ISC 2026: light-blue diagonal digits across every
 * page). It must never reach a published figure, and colour alone cannot tell
 * it from a light-blue fill or graph paper, so the check FLAGS and a human
 * decides: clean the crop, or record that it has none.
 */

/** An RGB buffer of `n` pixels, `blue` of them watermark-blue and the rest `fill`. */
function pixels(n: number, blue: number, fill: [number, number, number] = [255, 255, 255]) {
  const buf = new Uint8Array(n * 3);
  for (let i = 0; i < n; i++) {
    const px = i < blue ? [200, 220, 240] : fill;
    buf.set(px, i * 3);
  }
  return buf;
}

describe("watermarkFraction", () => {
  it("is zero on a white or black-and-white figure", () => {
    expect(watermarkFraction(pixels(1000, 0), 3)).toBe(0);
    expect(watermarkFraction(pixels(1000, 0, [20, 20, 20]), 3)).toBe(0);
  });

  it("counts the light blue the 2026 serial watermark is printed in", () => {
    expect(watermarkFraction(pixels(1000, 50), 3)).toBeCloseTo(0.05);
  });

  it("does not count green graph paper, whose blue is below its green", () => {
    expect(watermarkFraction(pixels(1000, 0, [150, 210, 180]), 3)).toBe(0);
  });

  it("does not count a dark blue ink line, which is not light", () => {
    expect(watermarkFraction(pixels(1000, 0, [40, 60, 140]), 3)).toBe(0);
  });

  it("reads four-channel (RGBA) data too", () => {
    const rgba = new Uint8Array(4 * 4);
    rgba.set([200, 220, 240, 255], 0);
    for (let i = 1; i < 4; i++) rgba.set([255, 255, 255, 255], i * 4);
    expect(watermarkFraction(rgba, 4)).toBeCloseTo(0.25);
  });
});

describe("figureWatermarkIssue", () => {
  it("passes a clean figure", () => {
    expect(figureWatermarkIssue("2(i)", 0)).toBeNull();
    expect(figureWatermarkIssue("2(i)", WATERMARK_THRESHOLD / 2)).toBeNull();
  });

  it("refuses a figure over the threshold until someone has looked at it", () => {
    expect(figureWatermarkIssue("2(i)", 0.01)).toMatch(/2\(i\).*watermark/);
  });

  it("lets a looked-at figure through when it was recorded as having none", () => {
    expect(figureWatermarkIssue("3(iii)", 0.01, "none")).toBeNull();
  });
});
