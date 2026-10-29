import { describe, expect, it } from "vitest";
import { getScene } from "@/lib/visuals/registry";
import { layoutCircuit } from "@/lib/visuals/scenes/switchCircuit";
import { parseLogic } from "@/lib/visuals/logic";
import type { Shape } from "@/lib/visuals/types";

// Switching circuits (owner, 2026-10-29): drawn from the formula (∧ series, ∨
// parallel, ∼p the switch S′), the lamp lit on exactly the rows the formula is T.
const scene = getScene("switchCircuit")!;
const parse = (raw: unknown) => scene.parse(raw) as { error?: string };
const ok = (raw: unknown) => {
  const p = scene.parse(raw);
  if ("error" in (p as object)) throw new Error((p as { error: string }).error);
  return p;
};
const texts = (shapes: Shape[]) => shapes.filter((s) => s.kind === "text").map((s) => (s as { text: string }).text);

// HSC 17160454: S1 in series with (S1′ parallel to S2), simplified to S1 in series with S2.
const simplify = { circuits: [{ f: "p & (~p | q)" }, { f: "p & q", label: "simplified" }], equals: "p & (~p | q)" };

describe("switchCircuit scene", () => {
  it("checks every circuit drawn against the statement the solution names", () => {
    expect(scene.check(ok(simplify))).toBe(1);
    // A wrong simplification is caught: S1 alone is not the same circuit.
    expect(scene.check(ok({ ...simplify, circuits: [simplify.circuits[0], { f: "p" }] }))).toBe(0);
    // A construction check: the circuit must equal the question's own formula, even one with → in it.
    expect(scene.check(ok({ circuits: [{ f: "~p | q" }], equals: "p -> q" }))).toBe(1);
    expect(scene.check(ok({ circuits: [{ f: "p | ~q" }], equals: "p -> q" }))).toBe(0);
  });

  it("refuses what a switching circuit cannot draw: → or ↔, a negated bracket, too many letters", () => {
    expect(parse({ circuits: [{ f: "p -> q" }], equals: "p -> q" }).error).toMatch(/∧ ∨ ∼/);
    expect(parse({ circuits: [{ f: "~(p | q)" }], equals: "~(p | q)" }).error).toMatch(/single switch/);
    expect(parse({ circuits: [{ f: "p & q & r & s & t" }], equals: "p" })).toHaveProperty("error");
    expect(parse({ circuits: [], equals: "p" })).toHaveProperty("error");
  });

  it("lays out series left to right on one wire and parallel branches one above another", () => {
    const series = layoutCircuit(parseLogic("p & q & r"));
    expect(series.switches).toHaveLength(3);
    expect(new Set(series.switches.map((s) => s.y)).size).toBe(1);
    expect(series.switches[1].x).toBeGreaterThan(series.switches[0].x);
    const parallel = layoutCircuit(parseLogic("p | ~q"));
    expect(parallel.switches[1].y).toBeGreaterThan(parallel.switches[0].y);
    expect(parallel.switches.map((s) => s.neg)).toEqual([false, true]);
    expect(parallel.h).toBeGreaterThan(series.h);
  });

  it("names the switches S1, S2 and S1′ for a negated letter, and lights the lamp on the rows the formula is true", () => {
    const p = ok(simplify);
    const built = texts(scene.frame(p, { played: ["build"], t: 1, slider: undefined }));
    expect(built).toEqual(expect.arrayContaining(["S1", "S1′", "S2"]));
    // Row 0 is p = T, q = T: p ∧ (∼p ∨ q) is T, so the lamp is lit.
    const lamp = (t: number) =>
      scene.frame(p, { played: ["build", "rows"], t, slider: undefined }).find((s) => s.kind === "circle" && (s as { r: number }).r === 9) as { fill?: string };
    expect(lamp(0.01).fill).toBe("amber");
    // Row 1 is p = T, q = F: F, so the lamp is dark.
    expect(lamp(0.3).fill).not.toBe("amber");
  });

  it("shows the second circuit only in the answer beat, with its label", () => {
    const p = ok(simplify);
    expect(texts(scene.frame(p, { played: ["build", "rows"], t: 1, slider: undefined }))).not.toContain("simplified");
    expect(texts(scene.frame(p, { played: ["build", "rows", "answer"], t: 1, slider: undefined }))).toContain("simplified");
  });
});
