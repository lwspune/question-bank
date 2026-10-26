import { describe, expect, it } from "vitest";
import { getScene } from "@/lib/visuals/registry";
import { lpFacts } from "@/lib/visuals/scenes/lpRegion";
import type { Shape } from "@/lib/visuals/types";

const scene = () => getScene("lpRegion")!;

function parse(raw: unknown) {
  const p = scene().parse(raw);
  if (p && typeof p === "object" && "error" in (p as object)) throw new Error(String((p as { error: string }).error));
  return p;
}
const value = (raw: unknown) => scene().check(parse(raw));
const parseError = (raw: unknown) => ((scene().parse(raw) as { error?: string }).error ?? "");

// MHT-CET: maximise 10x + 6y subject to x + y <= 12, 2x + y <= 20, x, y >= 0. Corners (0,0) (10,0) (8,4) (0,12).
const q1 = {
  window: { x: [0, 14], y: [0, 14] },
  constraints: [
    { a: 1, b: 1, op: "<=", c: 12 },
    { a: 2, b: 1, op: "<=", c: 20 },
  ],
  objective: { a: 10, b: 6 },
};

describe("lpRegion answers", () => {
  it("finds the corners of the feasible region", () => {
    const corners = lpFacts(parse({ ...q1, ask: { kind: "max" } })).corners.map(([x, y]) => [Math.round(x * 1e6) / 1e6, Math.round(y * 1e6) / 1e6]);
    expect(corners).toHaveLength(4);
    for (const c of [[0, 0], [10, 0], [8, 4], [0, 12]]) expect(corners).toContainEqual(c);
  });
  it("maximises and minimises Z over the corners", () => {
    expect(value({ ...q1, ask: { kind: "max" } })).toBeCloseTo(104, 9);
    expect(value({ ...q1, ask: { kind: "min" } })).toBeCloseTo(0, 9);
    expect(value({ ...q1, objective: { a: 3, b: 5 }, ask: { kind: "range" } })).toBeCloseTo(60, 9);
  });
  it("confirms the point where the optimum is reached, and rejects another corner", () => {
    expect(value({ ...q1, ask: { kind: "maxAt", at: [8, 4] } })).toBe(1);
    expect(value({ ...q1, ask: { kind: "maxAt", at: [10, 0] } })).toBe(0);
  });
  it("confirms a keyed PAIR of optimal corners, and only the exact pair", () => {
    // x + 2y <= 10, 3x + y <= 12: Z = x + 2y is 10 at (0, 5) and at (14/5, 18/5).
    const raw = { window: { x: [0, 6], y: [0, 7] }, constraints: [{ a: 1, b: 2, op: "<=", c: 10 }, { a: 3, b: 1, op: "<=", c: 12 }], objective: { a: 1, b: 2 } };
    expect(value({ ...raw, ask: { kind: "maxAt", at: [[0, 5], [2.8, 3.6]] } })).toBe(1);
    expect(value({ ...raw, ask: { kind: "maxAt", at: [[0, 5]] } })).toBe(0);
    expect(value({ ...raw, ask: { kind: "maxCount" } })).toBe(2);
  });
  it("finds the minimum of an unbounded region, and refuses its maximum", () => {
    // x + 2y >= 80, 3x + y >= 75: min of 4x + 6y is 254 at (14, 33); no maximum.
    const raw = { window: { x: [0, 90], y: [0, 85] }, constraints: [{ a: 1, b: 2, op: ">=", c: 80 }, { a: 3, b: 1, op: ">=", c: 75 }], objective: { a: 4, b: 6 } };
    expect(value({ ...raw, ask: { kind: "min" } })).toBeCloseTo(254, 9);
    const p = parse({ ...raw, ask: { kind: "max" } });
    expect(Number.isFinite(scene().check(p))).toBe(false);
    expect(scene().checkText(p, scene().check(p))).toMatch(/no maximum/);
  });
  it("counts an optimum reached along a whole edge as infinitely many (2)", () => {
    // Minimise 30x + 20y with x + y <= 8, x + 2y >= 4, 6x + 4y >= 12: 30 : 20 = 6 : 4, the whole edge is optimal.
    const raw = { window: { x: [0, 9], y: [0, 9] }, constraints: [{ a: 1, b: 1, op: "<=", c: 8 }, { a: 1, b: 2, op: ">=", c: 4 }, { a: 6, b: 4, op: ">=", c: 12 }], objective: { a: 30, b: 20 } };
    expect(value({ ...raw, ask: { kind: "minCount" } })).toBe(2);
    expect(value({ ...raw, objective: { a: 30, b: 10 }, ask: { kind: "minCount" } })).toBe(1);
  });
  it("counts an optimum along an unbounded edge as infinitely many too", () => {
    // Maximise y with y <= 3: every (t, 3) is optimal.
    const raw = { window: { x: [0, 6], y: [0, 5] }, constraints: [{ a: 0, b: 1, op: "<=", c: 3 }], objective: { a: 0, b: 1 } };
    expect(value({ ...raw, ask: { kind: "maxCount" } })).toBe(2);
    expect(value({ ...raw, ask: { kind: "max" } })).toBeCloseTo(3, 9);
  });
  it("has no value on an empty region, and says so", () => {
    const p = parse({ window: { x: [0, 12], y: [0, 12] }, constraints: [{ a: 2, b: 3, op: "<=", c: 18 }, { a: 1, b: 1, op: ">=", c: 10 }], objective: { a: 1, b: 1 }, ask: { kind: "max" } });
    expect(Number.isFinite(scene().check(p))).toBe(false);
    expect(scene().checkText(p, scene().check(p))).toMatch(/empty/);
  });
});

describe("lpRegion refuses what it cannot draw honestly", () => {
  it("refuses a bad operator, a zero objective, too many constraints and an unknown ask", () => {
    expect(parseError({ ...q1, constraints: [{ a: 1, b: 1, op: "<", c: 3 }], ask: { kind: "max" } })).toMatch(/op/);
    expect(parseError({ ...q1, objective: { a: 0, b: 0 }, ask: { kind: "max" } })).toMatch(/objective/);
    expect(parseError({ ...q1, constraints: Array.from({ length: 9 }, () => ({ a: 1, b: 1, op: "<=", c: 3 })), ask: { kind: "max" } })).toMatch(/constraints/);
    expect(parseError({ ...q1, ask: { kind: "best" } })).toMatch(/ask/);
    expect(parseError({ ...q1, ask: { kind: "maxAt" } })).toMatch(/at/);
  });
  it("refuses a window that leaves a corner out", () => {
    expect(parseError({ ...q1, window: { x: [0, 9], y: [0, 14] }, ask: { kind: "max" } })).toMatch(/window/);
  });
});

describe("lpRegion drawing", () => {
  const frame = (played: string[]) => scene().frame(parse({ ...q1, ask: { kind: "max" } }), { played, t: 1, slider: undefined });
  it("shades the feasible region once its beat plays, not before", () => {
    const shaded = (played: string[]) => frame(played).some((s) => s.kind === "path" && s.fill !== undefined && /Z/.test(s.d));
    expect(shaded(["constraints"])).toBe(false);
    expect(shaded(["constraints", "region"])).toBe(true);
  });
  it("marks the corners, then names the optimum in the header", () => {
    const texts = (played: string[]) => frame(played).filter((s): s is Extract<Shape, { kind: "text" }> => s.kind === "text").map((s) => s.text);
    expect(texts(["constraints", "region", "corners"])).toContain("(8, 4)");
    expect(texts(["constraints", "region", "corners"]).some((t) => t.includes("104"))).toBe(false);
    expect(texts(["constraints", "region", "corners", "sweep", "answer"]).some((t) => t.includes("104"))).toBe(true);
  });
  // MHT-CET 68d3ed44: x + y <= 20, y >= 5, x <= 10; the labels used to sit on the lines.
  const crowded = {
    window: { x: [0, 14], y: [0, 22] },
    constraints: [
      { a: 1, b: 1, op: "<=", c: 20 },
      { a: 0, b: 1, op: ">=", c: 5 },
      { a: 1, b: 0, op: "<=", c: 10 },
    ],
    objective: { a: 7, b: 8 },
    ask: { kind: "max" },
  };
  const all = ["constraints", "region", "corners", "sweep", "answer"];
  const texts = (raw: unknown, played: string[]) =>
    scene().frame(parse(raw), { played, t: 1, slider: undefined }).filter((s): s is Extract<Shape, { kind: "text" }> => s.kind === "text");
  it("keeps corner and line labels off the constraint lines", () => {
    const shapes = scene().frame(parse(crowded), { played: all, t: 1, slider: undefined });
    const amber = shapes.filter((s): s is Extract<Shape, { kind: "line" }> => s.kind === "line" && s.stroke === "amber");
    const labels = texts(crowded, all).filter((s) => s.tone === "fg" || s.tone === "amber");
    expect(labels.length).toBeGreaterThanOrEqual(7); // 4 corners + 3 lines
    for (const lab of labels) {
      const w = lab.text.length * (lab.size ?? 10.5) * 0.56;
      const box = { l: lab.x, r: lab.x + w, t: lab.y - 9, b: lab.y };
      for (const ln of amber) {
        for (let i = 0; i <= 200; i++) {
          const x = ln.x1 + ((ln.x2 - ln.x1) * i) / 200;
          const y = ln.y1 + ((ln.y2 - ln.y1) * i) / 200;
          expect(x > box.l && x < box.r && y > box.t && y < box.b, `"${lab.text}" crosses a line`).toBe(false);
        }
      }
    }
  });
  it("shows every corner's coordinates, and keeps each label where it first appeared", () => {
    const end = texts(crowded, all);
    for (const c of ["(0, 5)", "(10, 5)", "(10, 10)", "(0, 20)"]) expect(end.map((s) => s.text)).toContain(c);
    const early = texts(crowded, ["constraints"]).find((s) => s.text === "x + y = 20")!;
    const late = end.find((s) => s.text === "x + y = 20")!;
    expect([late.x, late.y]).toEqual([early.x, early.y]);
  });
  it("marks both the best and the worst corner for max minus min", () => {
    // Z = 3x + 5y on the q1 region: max 60 at (0, 12), min 0 at (0, 0).
    const shapes = scene().frame(parse({ ...q1, objective: { a: 3, b: 5 }, ask: { kind: "range" } }), { played: all, t: 1, slider: undefined });
    const big = shapes.filter((s): s is Extract<Shape, { kind: "circle" }> => s.kind === "circle" && s.fill === "good" && s.r >= 5);
    expect(big).toHaveLength(2);
  });
  it("keeps line labels off the axes", () => {
    // MHT-CET f8f19210: x + y >= 1 meets the x-axis near the origin.
    const raw = { window: { x: [0, 4], y: [0, 3] }, constraints: [{ a: 2, b: 3, op: "<=", c: 6 }, { a: 1, b: 1, op: ">=", c: 1 }], objective: { a: 3, b: 1 }, ask: { kind: "range" } };
    const shapes = scene().frame(parse(raw), { played: all, t: 1, slider: undefined });
    const axisY = shapes.find((s): s is Extract<Shape, { kind: "line" }> => s.kind === "line" && s.stroke === "muted" && s.y1 === s.y2)!.y1;
    const lab = texts(raw, all).find((s) => s.text === "x + y = 1")!;
    expect(lab.y - 9 > axisY || lab.y < axisY).toBe(true);
  });
  it("slides the objective line during the sweep", () => {
    const dashed = (t: number) =>
      scene()
        .frame(parse({ ...q1, ask: { kind: "max" } }), { played: ["constraints", "region", "corners", "sweep"], t, slider: undefined })
        .filter((s): s is Extract<Shape, { kind: "line" }> => s.kind === "line" && s.dash !== undefined);
    expect(dashed(0.2)).toHaveLength(1);
    expect(dashed(0.2)[0]).not.toEqual(dashed(0.9)[0]);
  });
});
