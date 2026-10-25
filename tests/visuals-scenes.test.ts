import { describe, expect, it } from "vitest";
import { SCENES, getScene } from "@/lib/visuals/registry";
import type { Shape } from "@/lib/visuals/types";
import { quadraticIntervals } from "@/lib/visuals/scenes/quadraticFamily";
import { slabGeometry } from "@/lib/visuals/scenes/slab";
import { FIXTURES } from "./fixtures/visuals";

function parsedParams(name: string, raw: unknown) {
  const scene = getScene(name)!;
  const p = scene.parse(raw);
  if (p && typeof p === "object" && "error" in (p as object)) throw new Error(String((p as { error: string }).error));
  return { scene, p };
}

/** Every number a shape draws with. */
function coords(s: Shape): number[] {
  switch (s.kind) {
    case "line": return [s.x1, s.y1, s.x2, s.y2];
    case "circle": return [s.cx, s.cy, s.r];
    case "rect": return [s.x, s.y, s.w, s.h];
    case "text": return [s.x, s.y];
    case "polyline": return s.points.flat();
    case "path": return (s.d.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
  }
}

describe("scene registry", () => {
  it("has a fixture for every scene, so no scene ships untested", () => {
    expect(Object.keys(SCENES).sort()).toEqual(FIXTURES.map((f) => f.name).sort());
  });

  for (const f of FIXTURES) {
    describe(f.name, () => {
      const { scene, p } = parsedParams(f.name, f.visual.params);
      const { w, h } = scene.viewBox(p);
      const beats = f.visual.steps.flatMap((s) => s.beats);

      it("draws finite shapes inside its box at every beat, start to end", () => {
        for (let i = 0; i < beats.length; i++) {
          for (const t of [0, 0.37, 1]) {
            const shapes = scene.frame(p, { played: beats.slice(0, i + 1), t, slider: undefined });
            expect(shapes.length).toBeGreaterThan(0);
            for (const s of shapes) {
              for (const n of coords(s)) expect(Number.isFinite(n), `${s.kind} at ${beats[i]}`).toBe(true);
              if (s.kind === "text") {
                expect(s.x).toBeGreaterThanOrEqual(0);
                expect(s.x).toBeLessThanOrEqual(w);
                expect(s.y).toBeGreaterThanOrEqual(0);
                expect(s.y).toBeLessThanOrEqual(h);
              }
            }
          }
        }
      });

      it("draws only plain-text labels (no LaTeX; React escapes the rest)", () => {
        const shapes = scene.frame(p, { played: beats, t: 1, slider: undefined });
        for (const s of shapes) if (s.kind === "text") expect(s.text).not.toMatch(/\\/);
      });

      it("says what its check found in a sentence", () => {
        expect(scene.checkText(p, scene.check(p))).toMatch(/\S/);
      });
    });
  }
});

describe("rotation", () => {
  it("turns 2 revolutions into 4π, and revolutions-per-second into revolutions", () => {
    const { scene, p } = parsedParams("rotation", { revolutions: 2 });
    expect(scene.check(p)).toBeCloseTo(4 * Math.PI, 12);
    const timed = parsedParams("rotation", { perSecond: 2, seconds: 1.5 });
    expect(timed.scene.check(timed.p)).toBeCloseTo(6 * Math.PI, 12);
  });
  it("refuses zero, negative and silly revolution counts", () => {
    const s = getScene("rotation")!;
    for (const bad of [{ revolutions: 0 }, { revolutions: -1 }, { revolutions: 500 }, {}]) {
      expect(s.parse(bad)).toHaveProperty("error");
    }
  });
});

describe("circleArc", () => {
  it("works out arc ÷ radius", () => {
    const { scene, p } = parsedParams("circleArc", { radius: 4, arc: Math.PI, arcLabel: "π", unit: "cm" });
    expect(scene.check(p)).toBeCloseTo(Math.PI / 4, 12);
  });
});

describe("quadraticFamily", () => {
  const raw = { a: [2, 1], b: [0, -3], c: [0, 4], range: [-6, 2], start: -3, condition: "twoPositiveRoots" };
  it("counts the integer λ in range with two positive roots", () => {
    const { scene, p } = parsedParams("quadraticFamily", raw);
    expect(scene.check(p)).toBe(2);
  });
  it("finds the discriminant interval [−32/7, 0] and the sign set λ < −2 or λ > 0", () => {
    const { p } = parsedParams("quadraticFamily", raw);
    const iv = quadraticIntervals(p);
    expect(iv.discriminant).toHaveLength(1);
    expect(iv.discriminant[0][0]).toBeCloseTo(-32 / 7, 6);
    expect(iv.discriminant[0][1]).toBeCloseTo(0, 6);
    expect(iv.signs).toHaveLength(2);
    expect(iv.signs[0][1]).toBeCloseTo(-2, 6);
    expect(iv.signs[1][0]).toBeCloseTo(0, 6);
    expect(iv.both[0][0]).toBeCloseTo(-32 / 7, 6);
    expect(iv.both[0][1]).toBeCloseTo(-2, 6);
  });
  it("reports each slider value in words", () => {
    const { scene, p } = parsedParams("quadraticFamily", raw);
    expect(scene.status!(p, -3).tone).toBe("good");
    expect(scene.status!(p, -5).tone).toBe("bad");
    expect(scene.status!(p, -1).tone).toBe("muted");
    expect(scene.status!(p, -2).tone).toBe("bad");
  });
  it("refuses a range without its start inside, and an unknown condition", () => {
    const s = getScene("quadraticFamily")!;
    expect(s.parse({ ...raw, start: 9 })).toHaveProperty("error");
    expect(s.parse({ ...raw, condition: "magic" })).toHaveProperty("error");
  });
});

describe("slab", () => {
  const raw = { thickness: 4 * Math.sqrt(3), thicknessLabel: "4√3 cm", mu: Math.SQRT2, muLabel: "√2", incidence: "critical" };
  it("works out t sin(i − r) / cos r", () => {
    const { scene, p } = parsedParams("slab", raw);
    const exact = (4 * Math.sqrt(3) * Math.sin(Math.PI / 12)) / Math.cos(Math.PI / 6);
    expect(scene.check(p)).toBeCloseTo(exact, 9);
  });
  it("draws the shift to scale: the drawn segment measures the checked answer", () => {
    const { scene, p } = parsedParams("slab", raw);
    const g = slabGeometry(p);
    const drawn = Math.hypot(g.exit[0] - g.foot[0], g.exit[1] - g.foot[1]) / g.scale;
    expect(drawn).toBeCloseTo(scene.check(p), 9);
  });
  it("accepts an incidence in degrees and refuses total internal reflection set-ups", () => {
    const s = getScene("slab")!;
    expect(s.parse({ ...raw, incidence: 60 })).not.toHaveProperty("error");
    expect(s.parse({ ...raw, mu: 0.9 })).toHaveProperty("error");
    expect(s.parse({ ...raw, incidence: 95 })).toHaveProperty("error");
  });
});
