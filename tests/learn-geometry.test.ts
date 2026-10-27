// Copied from Concept Ladder (src/figures/geometry.test.ts, afca8bf).
import { describe, expect, it } from "vitest";
import { arcPath, clipLine, clipRay, frameFor, halfPlanePolygon, hyperbolaPoints, sectorPath, ticks } from "@/lib/learn/figures/geometry";

const view = { x: [-4, 4] as [number, number], y: [-2, 2] as [number, number] };

const close = (a: number[], b: number[]) => a.forEach((v, i) => expect(v).toBeCloseTo(b[i], 6));

describe("hyperbolaPoints", () => {
  const big = { x: [-10, 10] as [number, number], y: [-6, 6] as [number, number] };

  it("lies on one branch of the hyperbola", () => {
    const pts = hyperbolaPoints(big, [1, 0], 3, 2, "x", -1);
    for (const [x, y] of pts) {
      expect(((x - 1) / 3) ** 2 - (y / 2) ** 2).toBeCloseTo(1, 6);
      expect(x).toBeLessThanOrEqual(1 - 3 + 1e-9); // the left branch, through the vertex -2
    }
    expect(pts.some(([x, y]) => Math.abs(x + 2) < 1e-9 && Math.abs(y) < 1e-9)).toBe(true);
  });

  it("runs past the view at both ends, so the frame clips it", () => {
    const pts = hyperbolaPoints(big, [0, 0], 3, 2, "x", 1);
    expect(pts[0][1]).toBeLessThan(-6);
    expect(pts.at(-1)![1]).toBeGreaterThan(6);
  });

  it("opens up or down for a branch on the imaginary axis", () => {
    const pts = hyperbolaPoints(big, [0, 0], 2, 1, "y", 1);
    expect(pts.length).toBeGreaterThan(10);
    for (const [x, y] of pts) {
      expect((y / 2) ** 2 - x ** 2).toBeCloseTo(1, 6);
      expect(y).toBeGreaterThanOrEqual(2 - 1e-9);
    }
  });
});

describe("frameFor", () => {
  it("keeps equal scale on both axes", () => {
    const f = frameFor(view);
    expect(f.width).toBe(400);
    expect(f.height).toBe(200);
    expect(f.scale).toBe(50);
  });

  it("maps the plane to SVG coordinates with the imaginary axis pointing up", () => {
    const f = frameFor(view);
    close(f.px([-4, 2]), [0, 0]);
    close(f.px([0, 0]), [200, 100]);
    close(f.px([4, -2]), [400, 200]);
  });
});

describe("clipLine", () => {
  it("returns where a line crosses the edges of the view", () => {
    const [a, b] = clipLine(view, [0, 0], [1, 1])!;
    close([...a, ...b], [-2, -2, 2, 2]);
  });

  it("handles vertical lines", () => {
    const [a, b] = clipLine(view, [1, 0], [1, 5])!;
    close([...a, ...b], [1, -2, 1, 2]);
  });

  it("returns null for a line that misses the view", () => {
    expect(clipLine(view, [0, 3], [1, 3])).toBeNull();
  });
});

describe("clipRay", () => {
  it("runs from its start to the edge of the view", () => {
    const [a, b] = clipRay(view, [1, 0], 90)!;
    close([...a, ...b], [1, 0, 1, 2]);
  });

  it("goes the given direction only", () => {
    const [a, b] = clipRay(view, [0, 0], 180)!;
    close([...a, ...b], [0, 0, -4, 0]);
  });

  it("starts at the edge when it begins outside the view", () => {
    const [a, b] = clipRay(view, [-6, 0], 0)!;
    close([...a, ...b], [-4, 0, 4, 0]);
  });

  it("returns null when it never enters the view", () => {
    expect(clipRay(view, [-6, 0], 180)).toBeNull();
  });
});

describe("arcPath", () => {
  const f = frameFor(view);

  it("draws a quarter arc anticlockwise from `from` to `to`", () => {
    // centre (0,0) → px (200,100); radius 1 → 50px. 0° is (250,100); 90° is (200,50).
    expect(arcPath(f, [0, 0], 1, 0, 90)).toBe("M 250 100 A 50 50 0 0 0 200 50");
  });

  it("sets the large-arc flag past half a turn", () => {
    expect(arcPath(f, [0, 0], 1, 0, 270)).toMatch(/A 50 50 0 1 0 /);
  });

  it("wraps negative angles", () => {
    expect(arcPath(f, [0, 0], 1, -90, 0)).toBe(arcPath(f, [0, 0], 1, 270, 360));
  });

  it("draws a full turn as two halves", () => {
    expect(arcPath(f, [0, 0], 1, 0, 360).match(/A /g)).toHaveLength(2);
  });
});

describe("halfPlanePolygon", () => {
  it("keeps the side on the left of the directed line, within the view", () => {
    // Walking up the imaginary axis, the left side is Re z < 0.
    const poly = halfPlanePolygon(view, [0, 0], [0, 1]);
    expect(poly.every(([x]) => x <= 1e-9)).toBe(true);
    const xs = poly.map(([x]) => x);
    expect(Math.min(...xs)).toBeLessThan(-4); // reaches past the left edge
  });

  it("is empty when the view is entirely on the other side", () => {
    // The fill area extends one view-width past each edge (to x = 12), so use a line beyond it.
    expect(halfPlanePolygon(view, [30, -1], [30, 1])).toHaveLength(4); // everything is on the left
    expect(halfPlanePolygon(view, [30, 1], [30, -1])).toHaveLength(0);
  });
});

describe("sectorPath", () => {
  it("starts at the centre and sweeps far enough to cover the view", () => {
    const f = frameFor(view);
    const d = sectorPath(f, view, [0, 0], 0, 90);
    expect(d.startsWith("M 200 100 L ")).toBe(true);
    expect(d.endsWith(" Z")).toBe(true);
  });
});

describe("ticks", () => {
  it("lists whole numbers strictly inside the range, without zero", () => {
    expect(ticks(-3, 2.5)).toEqual([-2, -1, 1, 2]);
  });

  it("thins out to keep at most about ten ticks", () => {
    const t = ticks(-20, 20);
    expect(t.length).toBeLessThanOrEqual(10);
    expect(t).toContain(10);
  });
});
