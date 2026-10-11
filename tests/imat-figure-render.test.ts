/**
 * The IMAT twin figure renderer turns our SVG drawings into PNGs with headless
 * Edge. Edge screenshots a fixed window, so the window must match the drawing
 * exactly or the PNG gets white margins or a cropped edge.
 */
import { describe, it, expect } from "vitest";
import { svgSize } from "../scripts/imat/practice/render-figures";

describe("svgSize", () => {
  it("reads integer width and height from the root element", () => {
    expect(svgSize('<svg xmlns="http://www.w3.org/2000/svg" width="420" height="260"><rect/></svg>')).toEqual({ width: 420, height: 260 });
  });

  it("rounds fractional sizes up so nothing is cut off", () => {
    expect(svgSize('<svg width="300.4" height="199.2"></svg>')).toEqual({ width: 301, height: 200 });
  });

  it("refuses a drawing without an explicit size", () => {
    expect(() => svgSize('<svg viewBox="0 0 10 10"></svg>')).toThrow(/width and height/);
  });
});
