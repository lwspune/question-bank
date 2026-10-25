import { describe, expect, it } from "vitest";
import { getScene } from "@/lib/visuals/registry";
import { coordFacts } from "@/lib/visuals/scenes/coordGeometry";
import type { Shape } from "@/lib/visuals/types";

const scene = () => getScene("coordGeometry")!;

function parse(raw: unknown) {
  const p = scene().parse(raw);
  if (p && typeof p === "object" && "error" in (p as object)) throw new Error(String((p as { error: string }).error));
  return p;
}
const value = (raw: unknown) => scene().check(parse(raw));
const parseError = (raw: unknown) => {
  const p = scene().parse(raw) as { error?: string };
  return p.error ?? "";
};
const win = { x: [-6, 6], y: [-6, 6] };

describe("coordGeometry answers", () => {
  it("distance between two points", () => {
    expect(value({ window: win, points: [{ id: "A", at: [1, 1] }, { id: "B", at: [4, 5] }], ask: { kind: "distance", from: "A", to: "B" } })).toBeCloseTo(5, 9);
  });
  it("distance from a point to a line", () => {
    const raw = { window: win, points: [{ id: "P", at: [1, 2] }], lines: [{ id: "L", eq: [3, 4, -1] }], ask: { kind: "distance", from: "P", to: "L" } };
    expect(value(raw)).toBeCloseTo(2, 9);
  });
  it("shortest distance from a point to a circle, outside and inside", () => {
    const out = { window: { x: [-7, 13], y: [-5, 8] }, points: [{ id: "Q", at: [11, 6] }], circles: [{ id: "S", center: [-1, 1], r: 5 }], ask: { kind: "distance", from: "Q", to: "S" } };
    expect(value(out)).toBeCloseTo(8, 9);
    const inside = { window: win, points: [{ id: "Q", at: [1, 0] }], circles: [{ id: "S", center: [0, 0], r: 5 }], ask: { kind: "distance", from: "Q", to: "S" } };
    expect(value(inside)).toBeCloseTo(4, 9);
  });
  it("shortest distance between two circles: apart, and one inside the other", () => {
    const apart = { window: { x: [-2, 8], y: [-4, 4] }, circles: [{ id: "A", center: [0, 0], r: 1 }, { id: "B", center: [5, 0], r: 2 }], ask: { kind: "distance", from: "A", to: "B" } };
    expect(value(apart)).toBeCloseTo(2, 9);
    const nested = { window: win, circles: [{ id: "A", center: [0, 0], r: 5 }, { id: "B", center: [1, 0], r: 1 }], ask: { kind: "distance", from: "A", to: "B" } };
    expect(value(nested)).toBeCloseTo(3, 9);
  });
  it("shortest distance from a line to a circle", () => {
    const raw = { window: win, circles: [{ id: "S", center: [0, 0], r: 2 }], lines: [{ id: "L", eq: [0, 1, -5] }], ask: { kind: "distance", from: "L", to: "S" } };
    expect(value(raw)).toBeCloseTo(3, 9);
  });
  it("intercepts and slope of a line through two points", () => {
    const base = { window: { x: [-4, 6], y: [-6, 2.5] }, points: [{ id: "C", at: [-1, 0] }, { id: "V", at: [3, -4] }], lines: [{ id: "L", through: ["C", "V"] }] };
    expect(value({ ...base, ask: { kind: "yIntercept", line: "L" } })).toBeCloseTo(-1, 9);
    expect(value({ ...base, ask: { kind: "xIntercept", line: "L" } })).toBeCloseTo(-1, 9);
    expect(value({ ...base, ask: { kind: "slope", line: "L" } })).toBeCloseTo(-1, 9);
  });
  it("radius of the circle traced by the point dividing A to P, as P goes round", () => {
    const raw = { window: { x: [-1.6, 3.6], y: [-1.4, 2.6] }, points: [{ id: "A", at: [3, 2] }], circles: [{ id: "S", center: [0, 0], r: 1 }], locus: { fixed: "A", on: "S", ratio: 0.5 }, ask: { kind: "locusRadius" } };
    expect(value(raw)).toBeCloseTo(0.5, 9);
    expect(value({ ...raw, locus: { fixed: "A", on: "S", ratio: 1 / 3 } })).toBeCloseTo(1 / 3, 9);
  });
  it("chord length cut on a circle and on an ellipse", () => {
    const circle = { window: win, circles: [{ id: "S", center: [0, 0], r: 5 }], lines: [{ id: "L", eq: [0, 1, -3] }], ask: { kind: "chordLength", line: "L", of: "S" } };
    expect(value(circle)).toBeCloseTo(8, 6);
    const ellipse = { window: win, conics: [{ id: "E", type: "ellipse", center: [0, 0], a: 2, b: 1 }], lines: [{ id: "L", eq: [1, 0, 0] }], ask: { kind: "chordLength", line: "L", of: "E" } };
    expect(value(ellipse)).toBeCloseTo(2, 6);
  });
  it("length of the tangent from a point to a circle", () => {
    const raw = { window: win, points: [{ id: "P", at: [5, 0] }], circles: [{ id: "S", center: [0, 0], r: 1 }], ask: { kind: "tangentLength", from: "P", to: "S" } };
    expect(value(raw)).toBeCloseTo(Math.sqrt(24), 9);
  });
  it("area of a polygon from its vertices", () => {
    const raw = { window: win, points: [{ id: "A", at: [0, 0] }, { id: "B", at: [4, 0] }, { id: "C", at: [0, 3] }], ask: { kind: "area", points: ["A", "B", "C"] } };
    expect(value(raw)).toBeCloseTo(6, 9);
  });
});

describe("coordGeometry squared and scaled answers", () => {
  const seg = { window: win, points: [{ id: "A", at: [0, 0] }, { id: "B", at: [3, 4] }] };
  it("reports the square of the measured length when the key asks for it", () => {
    expect(value({ ...seg, ask: { kind: "distance", from: "A", to: "B", squared: true } })).toBeCloseTo(25, 9);
  });
  it("reports a multiple of the measured value", () => {
    const tri = { window: win, points: [{ id: "A", at: [0, 0] }, { id: "B", at: [4, 0] }, { id: "C", at: [0, 3] }] };
    expect(value({ ...tri, ask: { kind: "area", points: ["A", "B", "C"], times: 6 } })).toBeCloseTo(36, 9);
    expect(value({ ...seg, ask: { kind: "distance", from: "A", to: "B", squared: true, times: 2 } })).toBeCloseTo(50, 9);
  });
  it("refuses a zero multiplier and a non-boolean squared", () => {
    expect(parseError({ ...seg, ask: { kind: "distance", from: "A", to: "B", times: 0 } })).toMatch(/times/);
    expect(parseError({ ...seg, ask: { kind: "distance", from: "A", to: "B", squared: "yes" } })).toMatch(/squared/);
  });
  it("says in its check sentence that the value was squared or scaled", () => {
    const p = parse({ ...seg, ask: { kind: "distance", from: "A", to: "B", squared: true } });
    expect(scene().checkText(p, scene().check(p))).toMatch(/square/i);
  });
});

describe("coordGeometry tangents", () => {
  it("finds both tangents from an outside point to a parabola, touching at the right points", () => {
    const raw = {
      window: { x: [-3, 5], y: [-5, 5] },
      points: [{ id: "P", at: [-1, 0] }],
      conics: [{ id: "K", type: "parabola", vertex: [0, 0], a: 1, axis: "x" }],
      lines: [{ id: "T", tangentsFrom: "P", to: "K" }],
      ask: { kind: "slope", line: "T2" },
    };
    const p = parse(raw);
    const touches = coordFacts(p).touches.T.map(([x, y]) => [Math.round(x * 1e6) / 1e6, Math.round(y * 1e6) / 1e6]);
    expect(touches).toEqual([[1, -2], [1, 2]]);
    // Tangent lines are numbered by slope, lowest first: y = -(x+1), then y = x+1.
    expect(scene().check(p)).toBeCloseTo(1, 6);
    expect(value({ ...raw, ask: { kind: "slope", line: "T1" } })).toBeCloseTo(-1, 6);
  });
  it("draws the tangent at a point on a circle perpendicular to the radius", () => {
    const raw = { window: win, points: [{ id: "A", at: [3, 4] }], circles: [{ id: "S", center: [0, 0], r: 5 }], lines: [{ id: "T", tangentAt: "A", to: "S" }], ask: { kind: "slope", line: "T" } };
    expect(value(raw)).toBeCloseTo(-3 / 4, 9);
  });
  it("finds the tangents from an outside point to a hyperbola", () => {
    const raw = {
      window: win,
      points: [{ id: "P", at: [0, 1] }],
      conics: [{ id: "H", type: "hyperbola", center: [0, 0], a: 1, b: 1, axis: "x" }],
      lines: [{ id: "T", tangentsFrom: "P", to: "H" }],
      ask: { kind: "slope", line: "T1" },
    };
    // x^2 - y^2 = 1 from (0, 1): y = mx + 1 touches when m^2 = 2.
    expect(value(raw)).toBeCloseTo(-Math.SQRT2, 5);
  });
});

describe("coordGeometry refuses what it cannot draw honestly", () => {
  it("names an unknown reference", () => {
    expect(parseError({ window: win, points: [{ id: "A", at: [0, 0] }], lines: [{ id: "L", through: ["A", "Z"] }], ask: { kind: "slope", line: "L" } })).toMatch(/Z/);
  });
  it("refuses a line through one point twice, a non-positive radius, and a duplicated id", () => {
    expect(parseError({ window: win, points: [{ id: "A", at: [1, 1] }, { id: "B", at: [1, 1] }], lines: [{ id: "L", through: ["A", "B"] }], ask: { kind: "slope", line: "L" } })).toMatch(/same point/);
    expect(parseError({ window: win, circles: [{ id: "S", center: [0, 0], r: 0 }], ask: { kind: "radius", circle: "S" } })).toMatch(/r/);
    expect(parseError({ window: win, points: [{ id: "A", at: [0, 0] }], circles: [{ id: "A", center: [0, 0], r: 1 }], ask: { kind: "radius", circle: "A" } })).toMatch(/twice/);
  });
  it("refuses a tangent at a point that is not on the curve", () => {
    expect(parseError({ window: win, points: [{ id: "A", at: [1, 1] }], circles: [{ id: "S", center: [0, 0], r: 5 }], lines: [{ id: "T", tangentAt: "A", to: "S" }], ask: { kind: "slope", line: "T" } })).toMatch(/not on/);
  });
  it("refuses an ask pointed at the wrong kind of object", () => {
    expect(parseError({ window: win, points: [{ id: "A", at: [0, 0] }], ask: { kind: "slope", line: "A" } })).toMatch(/line/);
    expect(parseError({ window: win, points: [{ id: "P", at: [5, 0] }], conics: [{ id: "E", type: "ellipse", center: [0, 0], a: 2, b: 1 }], ask: { kind: "tangentLength", from: "P", to: "E" } })).toMatch(/circle/);
  });
  it("cannot check a slope of a vertical line", () => {
    const p = parse({ window: win, lines: [{ id: "L", eq: [1, 0, -2] }], ask: { kind: "slope", line: "L" } });
    expect(Number.isFinite(scene().check(p))).toBe(false);
  });
});

describe("coordGeometry drawing", () => {
  const locus = { window: { x: [-1.6, 3.6], y: [-1.4, 2.6] }, points: [{ id: "A", at: [3, 2], label: "A(3, 2)" }], circles: [{ id: "S", center: [0, 0], r: 1 }], locus: { fixed: "A", on: "S", ratio: 0.5 }, ask: { kind: "locusRadius", label: "r = 1/2" } };

  it("uses one scale on both axes, so a circle is drawn round", () => {
    for (const window of [{ x: [-7, 13], y: [-5, 8] }, { x: [-1, 1], y: [-20, 20] }, { x: [-30, 30], y: [-1, 1] }]) {
      const p = parse({ window, circles: [{ id: "S", center: [0, 0], r: 1 }], ask: { kind: "radius", circle: "S" } });
      const { sx, sy } = coordFacts(p).scale;
      expect(sx).toBeCloseTo(sy, 9);
      const { h } = scene().viewBox(p);
      expect(h).toBeGreaterThanOrEqual(200);
      expect(h).toBeLessThanOrEqual(400);
    }
  });

  it("ends the trace with the whole locus circle drawn at its true size", () => {
    const p = parse(locus);
    const shapes = scene().frame(p, { played: ["given", "trace", "answer"], t: 1, slider: undefined });
    const { sx } = coordFacts(p).scale;
    const circles = shapes.filter((s): s is Extract<Shape, { kind: "circle" }> => s.kind === "circle" && Math.abs(s.r - 0.5 * sx) < 0.01);
    expect(circles.length).toBeGreaterThanOrEqual(1);
  });

  it("shows the answer in the header once the answer beat plays, not before", () => {
    const p = parse(locus);
    const say = (played: string[]) => scene().frame(p, { played, t: 1, slider: undefined }).some((s) => s.kind === "text" && s.text === "r = 1/2");
    expect(say(["given", "trace"])).toBe(false);
    expect(say(["given", "trace", "answer"])).toBe(true);
  });

  it("labels an intercept point with its coordinates only when they are short decimals; the header carries the rest", () => {
    const at = (eq: number[]) => {
      const p = parse({ window: win, lines: [{ id: "L", eq }], ask: { kind: "yIntercept", line: "L" } });
      return scene().frame(p, { played: ["construct", "answer"], t: 1, slider: undefined }).filter((s) => s.kind === "text").map((s) => (s as { text: string }).text);
    };
    expect(at([1, 1, 1])).toContain("(0, −1)");
    const irrational = at([1, 1, -2 * Math.SQRT2]);
    expect(irrational.some((t) => t.startsWith("(0, 2.8"))).toBe(false);
  });

  it("draws a point with an empty label as a bare dot, so a helper point carries no text", () => {
    const p = parse({ window: win, points: [{ id: "A", at: [1, 1], label: "" }, { id: "B", at: [3, 2] }], ask: { kind: "distance", from: "A", to: "B" } });
    const texts = scene().frame(p, { played: ["given", "answer"], t: 1, slider: undefined }).filter((s) => s.kind === "text").map((s) => (s as { text: string }).text);
    expect(texts).toContain("(3, 2)");
    expect(texts).not.toContain("(1, 1)");
    expect(texts).not.toContain("");
  });

  it("keeps an object hidden until its beat: a derived circle is absent while only the givens play", () => {
    const p = parse({ window: { x: [-7, 13], y: [-5, 8] }, points: [{ id: "Q", at: [11, 6] }, { id: "C", at: [-1, 1], beat: "derived" }], circles: [{ id: "S", center: "C", r: 5, beat: "derived" }], ask: { kind: "distance", from: "Q", to: "S" } });
    const { sx } = coordFacts(p).scale;
    const big = (played: string[]) => scene().frame(p, { played, t: 1, slider: undefined }).some((s) => (s.kind === "circle" && Math.abs(s.r - 5 * sx) < 0.01) || s.kind === "path");
    expect(big(["given"])).toBe(false);
    expect(big(["given", "derived"])).toBe(true);
  });
});
