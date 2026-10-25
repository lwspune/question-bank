import { describe, expect, it } from "vitest";
import { getScene } from "@/lib/visuals/registry";
import { spaceFacts, spaceView } from "@/lib/visuals/scenes/space3d";
import type { Shape } from "@/lib/visuals/types";

const scene = () => getScene("space3d")!;

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
const near = (a: number[], b: number[]) => a.forEach((v, i) => expect(v).toBeCloseTo(b[i], 9));

const skew = {
  lines: [
    { id: "L1", point: [3, 8, 3], dir: [3, -1, 1] },
    { id: "L2", point: [-3, -7, 6], dir: [-3, 2, 4] },
  ],
};

describe("space3d answers", () => {
  it("distance from a point to a plane", () => {
    expect(value({ points: [{ id: "O", at: [0, 0, 0] }], planes: [{ id: "P", eq: [1, -3, 4, 6] }], ask: { kind: "distance", from: "O", to: "P" } })).toBeCloseTo(6 / Math.sqrt(26), 9);
  });
  it("shortest distance between skew lines, and between parallel lines", () => {
    expect(value({ ...skew, ask: { kind: "distance", from: "L1", to: "L2" } })).toBeCloseTo(3 * Math.sqrt(30), 9);
    const parallel = { lines: [{ id: "A", point: [0, 0, 0], dir: [1, 0, 0] }, { id: "B", point: [0, 3, 4], dir: [2, 0, 0] }], ask: { kind: "distance", from: "A", to: "B" } };
    expect(value(parallel)).toBeCloseTo(5, 9);
  });
  it("distance from a point to a line, and between two points", () => {
    expect(value({ points: [{ id: "O", at: [0, 0, 0] }], lines: [{ id: "L", point: [1, 0, 0], dir: [0, 1, 0] }], ask: { kind: "distance", from: "O", to: "L" } })).toBeCloseTo(1, 9);
    expect(value({ points: [{ id: "A", at: [1, 2, 3] }, { id: "B", at: [4, 6, 15] }], ask: { kind: "distance", from: "A", to: "B" } })).toBeCloseTo(13, 9);
  });
  it("distance between parallel planes", () => {
    expect(value({ planes: [{ id: "P", eq: [1, 2, 2, 3] }, { id: "Q", eq: [2, 4, 4, 18] }], ask: { kind: "distance", from: "P", to: "Q" } })).toBeCloseTo(2, 9);
  });
  it("length of a segment's projection on a plane", () => {
    const raw = { points: [{ id: "A", at: [5, -1, 4] }, { id: "B", at: [4, -1, 3] }], planes: [{ id: "P", eq: [1, 1, 1, 7] }], ask: { kind: "projection", from: "A", to: "B", onto: "P" } };
    expect(value(raw)).toBeCloseTo(Math.sqrt(2 / 3), 9);
  });
  it("angles: line with line, line with plane, plane with plane (radians, acute)", () => {
    expect(value({ lines: [{ id: "A", point: [0, 0, 0], dir: [1, 0, 0] }, { id: "B", point: [0, 0, 0], dir: [-1, 1, 0] }], ask: { kind: "angle", between: ["A", "B"] } })).toBeCloseTo(Math.PI / 4, 9);
    expect(value({ lines: [{ id: "L", point: [0, 0, 1], dir: [1, 0, 1] }], planes: [{ id: "P", eq: [0, 0, 1, 0] }], ask: { kind: "angle", between: ["L", "P"] } })).toBeCloseTo(Math.PI / 4, 9);
    expect(value({ planes: [{ id: "P", eq: [1, 0, 0, 0] }, { id: "Q", eq: [1, 1, 0, 0] }], ask: { kind: "angle", between: ["P", "Q"] } })).toBeCloseTo(Math.PI / 4, 9);
  });
  it("a coordinate of a point the scene works out", () => {
    const raw = { points: [{ id: "P", at: [1, 2, 3] }], planes: [{ id: "S", eq: [2, -1, 1, 9] }], derived: [{ id: "Q", kind: "image", of: "P", in: "S" }], ask: { kind: "coord", point: "Q", axis: "x" } };
    expect(value(raw)).toBeCloseTo(5, 9);
  });
  it("reports a measured value squared and/or scaled, like the 2D scene", () => {
    expect(value({ ...skew, ask: { kind: "distance", from: "L1", to: "L2", squared: true } })).toBeCloseTo(270, 6);
    expect(value({ ...skew, ask: { kind: "distance", from: "L1", to: "L2", times: 2 } })).toBeCloseTo(6 * Math.sqrt(30), 9);
  });
});

describe("space3d works out its own constructions", () => {
  it("foot of the perpendicular from a point to a line through two points", () => {
    const raw = {
      points: [{ id: "P", at: [10, -2, -1] }, { id: "R", at: [1, 7, 6] }, { id: "A", at: [2, -5, 11] }, { id: "B", at: [-6, 7, -5] }],
      lines: [{ id: "L", through: ["A", "B"] }],
      derived: [{ id: "Q", kind: "foot", from: "R", to: "L" }],
      ask: { kind: "distance", from: "P", to: "Q" },
    };
    const p = parse(raw);
    near(spaceFacts(p).points.Q, [-2, 1, 3]);
    expect(scene().check(p)).toBeCloseTo(13, 9);
  });
  it("foot on a plane, image in a plane, and where a line meets a plane", () => {
    const p = parse({
      points: [{ id: "P", at: [1, 2, 3] }],
      planes: [{ id: "S", eq: [2, -1, 1, 9] }, { id: "T", eq: [1, 1, 1, 6] }],
      lines: [{ id: "L", point: [-3, -2, 1], dir: [3, 1, -2] }],
      derived: [{ id: "F", kind: "foot", from: "P", to: "S" }, { id: "I", kind: "image", of: "P", in: "S" }, { id: "M", kind: "meet", line: "L", plane: "T" }],
      ask: { kind: "distance", from: "P", to: "I" },
    });
    const pts = spaceFacts(p).points;
    near(pts.F, [3, 1, 4]);
    near(pts.I, [5, 0, 5]);
    near(pts.M, [12, 3, -9]);
  });
  it("the ends of the common perpendicular of two skew lines", () => {
    const p = parse({ lines: [{ id: "A", point: [0, 0, 0], dir: [1, 0, 0] }, { id: "B", point: [0, 0, 2], dir: [0, 1, 0] }], ask: { kind: "distance", from: "A", to: "B" } });
    const m = spaceFacts(p).mark;
    expect(m.kind).toBe("segment");
    if (m.kind === "segment") {
      near(m.from, [0, 0, 0]);
      near(m.to, [0, 0, 2]);
    }
  });
});

describe("space3d refuses what it cannot draw honestly", () => {
  it("names an unknown reference and a duplicated id", () => {
    expect(parseError({ points: [{ id: "A", at: [0, 0, 0] }], lines: [{ id: "L", through: ["A", "Z"] }], ask: { kind: "distance", from: "A", to: "L" } })).toMatch(/Z/);
    expect(parseError({ points: [{ id: "A", at: [0, 0, 0] }], planes: [{ id: "A", eq: [0, 0, 1, 0] }], ask: { kind: "distance", from: "A", to: "A" } })).toMatch(/twice/);
  });
  it("refuses a zero direction, a zero normal and a line through one point twice", () => {
    expect(parseError({ lines: [{ id: "L", point: [0, 0, 0], dir: [0, 0, 0] }], ask: { kind: "coord", point: "L", axis: "x" } })).toMatch(/dir/);
    expect(parseError({ planes: [{ id: "P", eq: [0, 0, 0, 1] }], ask: { kind: "coord", point: "P", axis: "x" } })).toMatch(/normal/);
    expect(parseError({ points: [{ id: "A", at: [1, 1, 1] }, { id: "B", at: [1, 1, 1] }], lines: [{ id: "L", through: ["A", "B"] }], ask: { kind: "distance", from: "A", to: "B" } })).toMatch(/same point/);
  });
  it("refuses a line parallel to the plane it should meet, and asks on the wrong kind of object", () => {
    expect(parseError({ lines: [{ id: "L", point: [0, 0, 1], dir: [1, 0, 0] }], planes: [{ id: "P", eq: [0, 0, 1, 0] }], derived: [{ id: "M", kind: "meet", line: "L", plane: "P" }], ask: { kind: "coord", point: "M", axis: "x" } })).toMatch(/parallel/);
    expect(parseError({ points: [{ id: "A", at: [0, 0, 0] }], lines: [{ id: "L", point: [0, 0, 0], dir: [1, 0, 0] }], ask: { kind: "angle", between: ["A", "L"] } })).toMatch(/line or plane/);
    expect(parseError({ points: [{ id: "A", at: [0, 0, 0] }, { id: "B", at: [1, 0, 0] }], ask: { kind: "projection", from: "A", to: "B", onto: "B" } })).toMatch(/plane/);
  });
});

describe("space3d drawing", () => {
  const raw = {
    points: [{ id: "O", at: [0, 0, 0], label: "O" }],
    planes: [{ id: "P", eq: [1, -3, 4, 6], label: "x − 3y + 4z = 6" }],
    ask: { kind: "distance", from: "O", to: "P", label: "6/√26" },
  };

  it("keeps every shape inside its box, at every beat", () => {
    const p = parse(raw);
    const { w, h } = scene().viewBox(p);
    for (const played of [["given"], ["given", "answer"]]) {
      for (const s of scene().frame(p, { played, t: 1, slider: undefined })) {
        if (s.kind === "text") {
          expect(s.x).toBeGreaterThanOrEqual(0);
          expect(s.x).toBeLessThanOrEqual(w);
          expect(s.y).toBeGreaterThanOrEqual(0);
          expect(s.y).toBeLessThanOrEqual(h);
        }
      }
    }
  });

  it("draws the part of a line behind a plane faintly, so depth reads", () => {
    const p = parse({ planes: [{ id: "P", eq: [0, 0, 1, 0] }], lines: [{ id: "L", point: [0, 0, 0], dir: [0.2, 0.3, 1] }], ask: { kind: "angle", between: ["L", "P"] } });
    const shapes = scene().frame(p, { played: ["given", "construct"], t: 1, slider: undefined });
    const lineParts = shapes.filter((s): s is Extract<Shape, { kind: "line" }> => s.kind === "line" && s.stroke === "amber");
    expect(lineParts.some((s) => (s.opacity ?? 1) < 0.6)).toBe(true);
    expect(lineParts.some((s) => (s.opacity ?? 1) === 1)).toBe(true);
  });

  it("shows the answer in the header once the answer beat plays, not before", () => {
    const p = parse(raw);
    const say = (played: string[]) => scene().frame(p, { played, t: 1, slider: undefined }).some((s) => s.kind === "text" && s.text === "6/√26");
    expect(say(["given"])).toBe(false);
    expect(say(["given", "answer"])).toBe(true);
  });

  it("chooses its own view when none is given: planes face the viewer and the answer is not foreshortened", () => {
    const p = parse(raw);
    const v = spaceView(p);
    const n: [number, number, number] = [1 / Math.sqrt(26), -3 / Math.sqrt(26), 4 / Math.sqrt(26)];
    expect(Math.abs(n[0] * v.camera[0] + n[1] * v.camera[1] + n[2] * v.camera[2])).toBeGreaterThan(0.35);
    // The distance segment runs along the normal; it keeps at least 60% of its length on screen.
    expect(Math.sqrt(1 - (n[0] * v.camera[0] + n[1] * v.camera[1] + n[2] * v.camera[2]) ** 2)).toBeGreaterThan(0.6);
    // A view the visual names is used as given.
    expect(spaceView(parse({ ...raw, view: { az: 10, el: 30 } }))).toMatchObject({ az: 10, el: 30 });
  });

  it("keeps the axis tripod clear of the drawing", () => {
    const p = parse({ points: [{ id: "A", at: [10, -2, -1] }, { id: "B", at: [-6, 7, -5] }], lines: [{ id: "L", through: ["A", "B"] }], ask: { kind: "distance", from: "A", to: "B" } });
    const shapes = scene().frame(p, { played: ["given", "answer"], t: 1, slider: undefined });
    const drawing = shapes.filter((s): s is Extract<Shape, { kind: "line" }> => s.kind === "line" && s.stroke !== "muted");
    for (const s of drawing) expect(Math.max(s.y1, s.y2)).toBeGreaterThanOrEqual(46);
  });

  it("refuses a view angle outside the readable range", () => {
    expect(parseError({ ...raw, view: { az: 30, el: 80 } })).toMatch(/el/);
  });
});
