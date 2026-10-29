import { describe, expect, it } from "vitest";
import { getScene } from "@/lib/visuals/registry";
import type { Shape } from "@/lib/visuals/types";
import { SKETCH_VISUAL } from "./fixtures/visuals";

// The sketch scene: a one-question animation built from computed objects, for
// a solution no shared scene fits (owner, 2026-10-29).
const scene = getScene("sketch")!;
const parse = (raw: unknown) => scene.parse(raw) as { error?: string };
const ok = (raw: unknown) => {
  const p = scene.parse(raw);
  if ("error" in (p as object)) throw new Error((p as { error: string }).error);
  return p;
};
const texts = (shapes: Shape[]) => shapes.filter((s) => s.kind === "text").map((s) => (s as { text: string }).text);
const frame = (raw: unknown, played: string[], t = 1) => scene.frame(ok(raw), { played, t, slider: undefined });

// A right triangle with legs 3 and 4.
const tri = {
  vars: { a: "3", b: "4", c: "sqrt(a^2+b^2)" },
  view: { x: [-1, 5], y: [-1, 4] },
  points: { A: [0, 0], B: ["b", 0], C: [0, "a"] },
  items: [
    { kind: "segment", from: "A", to: "B", step: "s1" },
    { kind: "segment", from: "A", to: "C", step: "s1" },
    { kind: "segment", from: "B", to: "C", step: "s2", label: "c = {c}" },
    { kind: "angle", at: "A", from: "B", to: "C", step: "s2" },
  ],
  assert: ["c^2 = a^2 + b^2"],
  answer: "c",
};

describe("sketch scene", () => {
  it("works out its answer from the named numbers, in order", () => {
    expect(scene.check(ok(tri))).toBe(5);
    expect(scene.checkText(ok(tri), 5)).toMatch(/5/);
    // A var may only use the ones before it.
    expect(parse({ ...tri, vars: { c: "sqrt(a^2+b^2)", a: "3", b: "4" } })).toHaveProperty("error");
  });

  it("refuses a picture whose stated facts do not hold", () => {
    expect(parse({ ...tri, assert: ["c = 6"] })).toHaveProperty("error");
    expect(parse({ ...tri, assert: ["c > 4", "a < b"] })).not.toHaveProperty("error");
  });

  it("refuses what it cannot draw honestly: unknown points, a point outside the view, bad names, too many items", () => {
    expect(parse({ ...tri, items: [{ kind: "segment", from: "A", to: "Z", step: "s1" }] })).toHaveProperty("error");
    expect(parse({ ...tri, points: { ...tri.points, D: [9, 9] } })).toHaveProperty("error");
    expect(parse({ ...tri, vars: { sin: "1" } })).toHaveProperty("error");
    expect(parse({ ...tri, items: [{ kind: "segment", from: "A", to: "B", step: "s9" }] })).toHaveProperty("error");
    expect(parse({ ...tri, items: Array.from({ length: 41 }, () => tri.items[0]) })).toHaveProperty("error");
    expect(parse({ ...tri, items: [{ kind: "scribble", step: "s1" }] })).toHaveProperty("error");
    expect(parse({ ...tri, answer: "d" })).toHaveProperty("error");
  });

  it("draws each item only once its step has started, and draws a segment progressively", () => {
    const before = frame(tri, ["s1"], 1);
    expect(texts(before)).not.toContain("c = 5");
    const half = frame(tri, ["s1", "s2"], 0.5).filter((s) => s.kind === "line");
    const after = frame(tri, ["s1", "s2"], 1).filter((s) => s.kind === "line");
    const len = (l: Shape) => (l.kind === "line" ? Math.hypot(l.x2 - l.x1, l.y2 - l.y1) : 0);
    const bc = (ls: Shape[]) => Math.max(...ls.map(len));
    expect(bc(half)).toBeLessThan(bc(after) * 0.8);
    expect(texts(frame(tri, ["s1", "s2"], 1))).toContain("c = 5");
  });

  it("keeps lengths true: one unit is the same on both axes", () => {
    const sq = { view: { x: [-1, 3], y: [-1, 2] }, points: { O: [0, 0], X: [1, 0], Y: [0, 1] }, items: [{ kind: "segment", from: "O", to: "X", step: "s1" }, { kind: "segment", from: "O", to: "Y", step: "s1" }], answer: "1" };
    const ls = frame(sq, ["s1"]).filter((s) => s.kind === "line") as Extract<Shape, { kind: "line" }>[];
    const [h, v] = ls.slice(-2);
    expect(Math.abs(h.x2 - h.x1)).toBeCloseTo(Math.abs(v.y2 - v.y1), 6);
  });

  it("marks a right angle with a square, not an arc", () => {
    const shapes = frame(tri, ["s1", "s2"]);
    expect(shapes.some((s) => s.kind === "path" && /^M[^A]*L[^A]*L/.test((s as { d: string }).d) && !(s as { d: string }).d.includes("A"))).toBe(true);
  });

  it("draws a curve and a full line clipped to the view", () => {
    const p = ok(SKETCH_VISUAL.params);
    const shapes = scene.frame(p, { played: ["s1", "s2", "s3"], t: 1, slider: undefined });
    for (const s of shapes) {
      if (s.kind === "line") for (const v of [s.x1, s.x2]) expect(v).toBeGreaterThanOrEqual(-0.5);
    }
    expect(shapes.some((s) => s.kind === "polyline")).toBe(true);
    expect(texts(shapes)).toContain("area of OAB = 1/4");
    expect(scene.check(p)).toBeCloseTo(0.25, 12);
  });

  it("puts a line's or curve's name where labelAt says, so names do not pile up at the top", () => {
    const raw = { ...tri, items: [{ kind: "segment", from: "A", to: "B", step: "s1", label: "base", labelAt: [2, -0.5], pos: "s" }] };
    const p = ok(raw);
    const t = scene.frame(p, { played: ["s1"], t: 1, slider: undefined }).find((s) => s.kind === "text" && (s as { text: string }).text === "base") as { x: number; y: number };
    const at = scene.frame(ok({ ...raw, items: [{ kind: "point", at: [2, -0.5], step: "s1" }] }), { played: ["s1"], t: 1, slider: undefined }).find((s) => s.kind === "circle") as { cx: number; cy: number };
    expect(Math.abs(t.x - at.cx)).toBeLessThan(2);
    expect(t.y).toBeGreaterThan(at.cy);
  });
});

