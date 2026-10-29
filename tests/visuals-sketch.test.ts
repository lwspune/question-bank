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
  it("draws a shaded region under the axes, so a half-plane never hides them (review 2026-10-29, LP)", () => {
    const half = { ...tri, axes: true, items: [{ kind: "polygon", points: ["A", "B", "C"], step: "s1" }] };
    const shapes = frame(half, ["s1"]);
    const fill = shapes.findIndex((s) => s.kind === "path" && (s as { fill?: string }).fill === "goodSoft");
    const axis = shapes.findIndex((s) => s.kind === "line" && (s as { stroke?: string }).stroke === "muted");
    expect(fill).toBeGreaterThanOrEqual(0);
    expect(axis).toBeGreaterThan(fill);
  });

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

  it("takes capitalised var names too (R for a radius, L for a ladder), which formulas can read", () => {
    const p = ok({ ...tri, vars: { ...tri.vars, R: "3", L2: "R*2" }, answer: "L2" });
    expect(scene.check(p)).toBe(6);
    // A function name with a capital is still not a function.
    expect(parse({ ...tri, vars: { ...tri.vars, R: "Sin(1)" }, answer: "R" })).toHaveProperty("error");
  });

  const box = (t: { x: number; y: number; text: string; size?: number; anchor?: string }) => {
    const w = t.text.length * (t.size ?? 12) * 0.56;
    const left = t.anchor === "end" ? t.x - w : t.anchor === "middle" ? t.x - w / 2 : t.x;
    return { left, right: left + w, top: t.y - (t.size ?? 12), bottom: t.y + 3 };
  };
  const labels = (raw: unknown) =>
    frame(raw, [...Array(8)].map((_, i) => `s${i + 1}`)).filter((s) => s.kind === "text") as { x: number; y: number; text: string; size?: number; anchor?: string }[];

  it("keeps every label inside the picture, even one placed at the edge", () => {
    const raw = { ...tri, items: [{ kind: "label", at: [4.9, 2], text: "a long answer label at the edge", step: "s1" }, { kind: "label", at: [-0.9, 3], text: "left edge label", pos: "w", step: "s1" }] };
    for (const t of labels(raw)) {
      const b = box(t);
      expect(b.left, t.text).toBeGreaterThanOrEqual(0);
      expect(b.right, t.text).toBeLessThanOrEqual(340);
    }
  });

  it("moves a label off one placed earlier instead of printing on top of it", () => {
    const raw = { ...tri, items: [{ kind: "label", at: [1, 2], text: "first label", step: "s1" }, { kind: "label", at: [1, 2], text: "second label", step: "s1" }] };
    const [a, b] = labels(raw).filter((t) => t.text.endsWith("label")).map(box);
    const overlap = a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
    expect(overlap).toBe(false);
  });
});

