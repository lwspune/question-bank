import { describe, expect, it } from "vitest";
import { fitMathLine, fittedSize } from "@/lib/visuals/fitMath";

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

// The line is laid over the picture as HTML (components/visuals/SceneSvg), so its
// size is in the picture's own units: --viz-u is one box unit in CSS pixels.
describe("fitMathLine", () => {
  const line = (base: number, clientWidth: number, widthAt: (px: number) => number) => {
    const el = {
      dataset: { vizMath: String(base) },
      style: { fontSize: "" },
      clientWidth,
      get scrollWidth() {
        const m = /\* ([\d.]+)\)$/.exec(el.style.fontSize);
        return widthAt(m ? Number(m[1]) : base);
      },
    };
    return el;
  };

  it("writes a line that fits at its size in box units", () => {
    const el = line(16, 320, () => 300);
    expect(fitMathLine(el as unknown as HTMLElement)).toBe(true);
    expect(el.style.fontSize).toBe("calc(var(--viz-u, 1px) * 16)");
  });

  it("shrinks a line that is too wide, still in box units", () => {
    const el = line(16, 320, (size) => size * 25);
    expect(fitMathLine(el as unknown as HTMLElement)).toBe(true);
    const size = Number(/\* ([\d.]+)\)$/.exec(el.style.fontSize)![1]);
    expect(size).toBeLessThan(16);
    expect(size * 25).toBeLessThanOrEqual(320);
  });
});
