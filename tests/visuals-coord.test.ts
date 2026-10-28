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

describe("coordGeometry angle between two lines", () => {
  const lines = (l1: number[], l2: number[]) => [{ id: "L", eq: l1 }, { id: "M", eq: l2 }];
  it("measures the acute angle between two lines by default, in radians", () => {
    // y = x and y = sqrt3 x: 60 deg and 45 deg directions, 15 deg apart.
    expect(value({ window: win, lines: lines([1, -1, 0], [Math.sqrt(3), -1, 0]), ask: { kind: "angle", lines: ["L", "M"] } })).toBeCloseTo(Math.PI / 12, 9);
    // y = 2x and y = -3x meet at 135 deg one way, 45 deg the other: acute is 45 deg.
    expect(value({ window: win, lines: lines([2, -1, 0], [3, 1, 0]), ask: { kind: "angle", lines: ["L", "M"] } })).toBeCloseTo(Math.PI / 4, 9);
  });
  it("reports the obtuse angle when asked, and tan, cos or sin of the angle", () => {
    const base = { window: win, lines: lines([2, -1, 0], [3, 1, 0]) };
    expect(value({ ...base, ask: { kind: "angle", lines: ["L", "M"], obtuse: true } })).toBeCloseTo((3 * Math.PI) / 4, 9);
    const steep = { window: win, lines: lines([1, -2, 0], [1, -3, 0]) };
    expect(value({ ...steep, ask: { kind: "angle", lines: ["L", "M"], as: "tan" } })).toBeCloseTo(1 / 7, 9);
    expect(value({ ...steep, ask: { kind: "angle", lines: ["L", "M"], as: "cos" } })).toBeCloseTo(7 / Math.sqrt(50), 9);
    expect(value({ ...steep, ask: { kind: "angle", lines: ["L", "M"], as: "sin" } })).toBeCloseTo(1 / Math.sqrt(50), 9);
  });
  it("cannot report tan of a right angle", () => {
    const p = parse({ window: win, lines: lines([1, 0, 0], [0, 1, 0]), ask: { kind: "angle", lines: ["L", "M"], as: "tan" } });
    expect(Number.isFinite(scene().check(p))).toBe(false);
  });
  it("refuses parallel lines, lines meeting outside the window, and a bad as", () => {
    expect(parseError({ window: win, lines: lines([1, -1, 0], [1, -1, 3]), ask: { kind: "angle", lines: ["L", "M"] } })).toMatch(/parallel/);
    expect(parseError({ window: win, lines: lines([1, -1, 0], [1, -1.01, 1]), ask: { kind: "angle", lines: ["L", "M"] } })).toMatch(/window/);
    expect(parseError({ window: win, lines: lines([1, -1, 0], [1, 1, 0]), ask: { kind: "angle", lines: ["L", "M"], as: "cot" } })).toMatch(/as/);
    expect(parseError({ window: win, lines: lines([1, -1, 0], [1, 1, 0]), ask: { kind: "angle", lines: ["L"] } })).toMatch(/two lines/);
  });
  it("marks the angle with an arc at the meeting point once the answer beat plays, and says it in degrees", () => {
    const p = parse({ window: win, lines: lines([1, 0, -1], [1, -Math.sqrt(3), 0]), ask: { kind: "angle", lines: ["L", "M"] } });
    const frame = (played: string[]) => scene().frame(p, { played, t: 1, slider: undefined });
    const arc = (played: string[]) => frame(played).some((s) => s.kind === "path" && / A/.test(s.d) && !/Z/.test(s.d));
    expect(arc(["construct"])).toBe(false);
    expect(arc(["construct", "answer"])).toBe(true);
    const texts = frame(["construct", "answer"]).filter((s) => s.kind === "text").map((s) => (s as { text: string }).text);
    expect(texts.some((t) => t.includes("60°"))).toBe(true);
  });
});

describe("coordGeometry pair of lines from one second-degree equation", () => {
  it("splits a homogeneous pair into its two lines through the origin, lowest slope first", () => {
    // x^2 - 5xy + 6y^2 = 0: x = 2y and x = 3y (slopes 1/2 and 1/3).
    const p = parse({ window: win, lines: [{ id: "P", pair: [1, -5, 6, 0, 0, 0] }], ask: { kind: "angle", lines: ["P1", "P2"], as: "tan" } });
    expect(scene().check(p)).toBeCloseTo(1 / 7, 9);
    const sl = (id: string) => {
      const l = (p as { lines: { id: string; a: number; b: number }[] }).lines.find((q) => q.id === id)!;
      return -l.a / l.b;
    };
    expect(sl("P1")).toBeCloseTo(1 / 3, 9);
    expect(sl("P2")).toBeCloseTo(1 / 2, 9);
  });
  it("splits a pair with linear terms, meeting where both lines pass", () => {
    // 2x^2 + 3xy - 2y^2 - x + 3y - 1 = (2x - y + 1)(x + 2y - 1): perpendicular, meeting at (-1/5, 3/5).
    const p = parse({ window: win, points: [{ id: "O", at: [-0.2, 0.6] }], lines: [{ id: "P", pair: [2, 3, -2, -1, 3, -1] }], ask: { kind: "angle", lines: ["P1", "P2"] } });
    expect(scene().check(p)).toBeCloseTo(Math.PI / 2, 9);
    for (const id of ["P1", "P2"]) {
      const l = (p as { lines: { id: string; a: number; b: number; c: number }[] }).lines.find((q) => q.id === id)!;
      expect(l.a * -0.2 + l.b * 0.6 + l.c).toBeCloseTo(0, 9);
    }
  });
  it("splits a vertical line out of a pair with no y^2 term", () => {
    // xy - 2x = 0: x = 0 and y = 2.
    const p = parse({ window: win, lines: [{ id: "P", pair: [0, 1, 0, -2, 0, 0] }], ask: { kind: "angle", lines: ["P1", "P2"] } });
    expect(scene().check(p)).toBeCloseTo(Math.PI / 2, 9);
  });
  it("splits a pair of parallel lines, so the distance between them can be asked", () => {
    // 9x^2 - 24xy + 16y^2 - 12x + 16y - 12 = 0: 3x - 4y - 6 = 0 and 3x - 4y + 2 = 0, 8/5 apart.
    const p = parse({ window: win, lines: [{ id: "P", pair: [9, -24, 16, -12, 16, -12] }], ask: { kind: "distance", from: "P1", to: "P2" } });
    expect(scene().check(p)).toBeCloseTo(1.6, 9);
  });
  it("refuses an equation that is not a real pair of lines", () => {
    expect(parseError({ window: win, lines: [{ id: "P", pair: [1, 0, 1, 0, 0, -1] }], ask: { kind: "radius", circle: "P" } })).toMatch(/pair of lines/);
    expect(parseError({ window: win, lines: [{ id: "P", pair: [1, -5, 6, 1, 0, 1] }], ask: { kind: "angle", lines: ["P1", "P2"] } })).toMatch(/pair of lines/);
    expect(parseError({ window: win, lines: [{ id: "P", pair: [1, 2, 3] }], ask: { kind: "angle", lines: ["P1", "P2"] } })).toMatch(/six numbers/);
  });
});

describe("coordGeometry constructed points, the point ask and the ratio ask", () => {
  const ab = [{ id: "A", at: [-1, 7] }, { id: "B", at: [4, -3] }];
  const pointAt = (raw: unknown, id: string) => (parse(raw) as { points: { id: string; at: [number, number] }[] }).points.find((q) => q.id === id)!.at;

  it("builds the point dividing AB internally in m : n", () => {
    // (-1, 7) to (4, -3) in 2 : 3 is (1, 3).
    const raw = { window: win, points: [...ab, { id: "P", divides: ["A", "B"], ratio: [2, 3] }], ask: { kind: "point", point: "P", expect: [1, 3] } };
    expect(pointAt(raw, "P")[0]).toBeCloseTo(1, 12);
    expect(pointAt(raw, "P")[1]).toBeCloseTo(3, 12);
    expect(value(raw)).toBeCloseTo(0, 12);
  });
  it("builds the point dividing AB externally, so a vertex comes back from a midpoint", () => {
    // B with A(2, 3) and midpoint M(4, 5): B divides AM externally in 2 : 1, so B = 2M - A = (6, 7).
    const raw = { window: { x: [0, 8], y: [0, 8] }, points: [{ id: "A", at: [2, 3] }, { id: "M", at: [4, 5] }, { id: "B", divides: ["A", "M"], ratio: [2, 1], external: true }], ask: { kind: "point", point: "B", expect: [6, 7] } };
    expect(value(raw)).toBeCloseTo(0, 12);
  });
  it("builds a midpoint and a centroid", () => {
    const pts = [{ id: "A", at: [1, 2] }, { id: "B", at: [5, 4] }, { id: "C", at: [3, -3] }];
    expect(value({ window: win, points: [...pts, { id: "M", midpointOf: ["A", "B"] }], ask: { kind: "point", point: "M", expect: [3, 3] } })).toBeCloseTo(0, 12);
    expect(value({ window: win, points: [...pts, { id: "G", centroidOf: ["A", "B", "C"] }], ask: { kind: "point", point: "G", expect: [3, 1] } })).toBeCloseTo(0, 12);
  });
  it("reports how far the constructed point misses a wrong stated answer, so the check fails", () => {
    const raw = { window: win, points: [...ab, { id: "P", divides: ["A", "B"], ratio: [2, 3] }], ask: { kind: "point", point: "P", expect: [1, 4] } };
    expect(value(raw)).toBeCloseTo(1, 12);
    expect(scene().checkText(parse(raw), 1)).toMatch(/not \(1, 4\)/);
  });
  it("a point ask must name a constructed point, and expect must be two numbers", () => {
    expect(parseError({ window: win, points: ab, ask: { kind: "point", point: "A", expect: [-1, 7] } })).toMatch(/constructed/);
    expect(parseError({ window: win, points: [...ab, { id: "M", midpointOf: ["A", "B"] }], ask: { kind: "point", point: "M" } })).toMatch(/expect/);
    expect(parseError({ window: win, points: [...ab, { id: "M", midpointOf: ["A", "B"] }], ask: { kind: "point", point: "M", expect: [1.5, 2], squared: true } })).toMatch(/squared/);
  });
  it("refuses constructions that name a later or missing point, or divide externally in 1 : 1", () => {
    expect(parseError({ window: win, points: [{ id: "P", divides: ["A", "B"], ratio: [1, 2] }, ...ab], ask: { kind: "distance", from: "A", to: "B" } })).toMatch(/no point named A/);
    expect(parseError({ window: win, points: [...ab, { id: "P", divides: ["A", "B"], ratio: [3, 3], external: true }], ask: { kind: "distance", from: "A", to: "B" } })).toMatch(/external/);
    expect(parseError({ window: win, points: [...ab, { id: "P", divides: ["A", "B"], ratio: [0, 3] }], ask: { kind: "distance", from: "A", to: "B" } })).toMatch(/ratio/);
  });
  it("ratio in which a given point divides AB", () => {
    // (-1, 6) divides (-3, 10) to (6, -8) in 2 : 7.
    const raw = { window: { x: [-4, 7], y: [-9, 11] }, points: [{ id: "A", at: [-3, 10] }, { id: "B", at: [6, -8] }, { id: "P", at: [-1, 6] }], ask: { kind: "ratio", of: ["A", "B"], by: "P" } };
    expect(value(raw)).toBeCloseTo(2 / 7, 12);
    expect(scene().checkText(parse(raw), 2 / 7)).toMatch(/2 : 7/);
  });
  it("ratio in which an axis or a line divides AB", () => {
    // The x-axis cuts (1, -5) to (-4, 5) at its midpoint: 1 : 1.
    const axis = { window: win, points: [{ id: "A", at: [1, -5] }, { id: "B", at: [-4, 5] }], lines: [{ id: "X", eq: [0, 1, 0] }], ask: { kind: "ratio", of: ["A", "B"], by: "X" } };
    expect(value(axis)).toBeCloseTo(1, 12);
    // x + y = 4 cuts (-2, 2) to (3, 7) at (0, 4): 2 : 3.
    const ln = { window: { x: [-3, 4], y: [0, 8] }, points: [{ id: "A", at: [-2, 2] }, { id: "B", at: [3, 7] }], lines: [{ id: "L", eq: [1, 1, -4] }], ask: { kind: "ratio", of: ["A", "B"], by: "L" } };
    expect(value(ln)).toBeCloseTo(2 / 3, 12);
  });
  it("refuses a ratio by a point off AB, or by a line parallel to AB", () => {
    expect(parseError({ window: win, points: [...ab, { id: "P", at: [0, 0] }], ask: { kind: "ratio", of: ["A", "B"], by: "P" } })).toMatch(/not on/);
    expect(parseError({ window: win, points: [{ id: "A", at: [0, 1] }, { id: "B", at: [3, 1] }], lines: [{ id: "X", eq: [0, 1, 0] }], ask: { kind: "ratio", of: ["A", "B"], by: "X" } })).toMatch(/parallel/);
  });
  it("draws the two parts of the divided segment on the answer beat", () => {
    const raw = { window: { x: [-4, 7], y: [-9, 11] }, points: [{ id: "A", at: [-3, 10] }, { id: "B", at: [6, -8] }, { id: "P", at: [-1, 6] }], ask: { kind: "ratio", of: ["A", "B"], by: "P" } };
    const shapes: Shape[] = scene().frame(parse(raw), { played: ["given", "answer"], t: 1 } as never);
    const thick = shapes.filter((s) => s.kind === "line" && (s as { width?: number }).width === 4);
    expect(thick.length).toBe(2);
    expect(coordFacts(parse(raw) as never).mark.kind).toBe("split");
  });
});
