import { describe, expect, it } from "vitest";
import { SCENES, getScene } from "@/lib/visuals/registry";
import type { Shape } from "@/lib/visuals/types";
import { quadraticIntervals } from "@/lib/visuals/scenes/quadraticFamily";
import { slabGeometry } from "@/lib/visuals/scenes/slab";
import { functionGraphFacts } from "@/lib/visuals/scenes/functionGraph";
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
    expect(Object.keys(SCENES).sort()).toEqual([...new Set(FIXTURES.map((f) => f.name))].sort());
  });

  for (const [i, f] of FIXTURES.entries()) {
    describe(`${f.name} (fixture ${i + 1})`, () => {
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

describe("functionGraph", () => {
  const base = { f: "sin(x)^2", window: { x: [0, 2 * Math.PI], y: [-0.1, 1.15] }, ask: { kind: "crossings" } };
  it("counts where the curve meets each line: sin^2 x = 3/4 or 1/4 has 8 solutions in [0, 2pi]", () => {
    const { scene, p } = parsedParams("functionGraph", { ...base, g: ["3/4", "1/4"] });
    expect(scene.check(p)).toBe(8);
    const one = parsedParams("functionGraph", { ...base, g: ["3/4"] });
    expect(one.scene.check(one.p)).toBe(4);
  });
  it("finds the one point with a given tangent slope: y = x log x has slope -1 at x = e^-2", () => {
    const { scene, p } = parsedParams("functionGraph", { f: "x*log(x)", window: { x: [0, 1.4], y: [-0.6, 0.6] }, ask: { kind: "slopePoint", slope: -1 } });
    expect(scene.check(p)).toBeCloseTo(Math.exp(-2), 6);
    expect(functionGraphFacts(p).point![1]).toBeCloseTo(-2 * Math.exp(-2), 6);
  });
  it("refuses to pick a slope point when the window holds two (the check gives NaN)", () => {
    const { scene, p } = parsedParams("functionGraph", { f: "sin(x)", window: { x: [0, 7], y: [-1.2, 1.2] }, ask: { kind: "slopePoint", slope: 0 } });
    expect(scene.check(p)).toBeNaN();
  });
  it("confirms a rising interval and rejects one that is not", () => {
    const rising = parsedParams("functionGraph", { f: "sin(x)^4+cos(x)^4", window: { x: [0, Math.PI], y: [0.35, 1.1] }, ask: { kind: "increasingOn", interval: [Math.PI / 4, Math.PI / 2] } });
    expect(rising.scene.check(rising.p)).toBe(1);
    const not = parsedParams("functionGraph", { f: "sin(x)^4+cos(x)^4", window: { x: [0, Math.PI], y: [0.35, 1.1] }, ask: { kind: "increasingOn", interval: [0, Math.PI / 8] } });
    expect(not.scene.check(not.p)).toBe(0);
  });
  it("refuses a bad formula, a backwards window, an unknown ask and an interval outside the window", () => {
    const s = getScene("functionGraph")!;
    expect(s.parse({ ...base, f: "alert(1)" })).toHaveProperty("error");
    expect(s.parse({ ...base, window: { x: [5, 1], y: [0, 1] } })).toHaveProperty("error");
    expect(s.parse({ ...base, ask: { kind: "magic" } })).toHaveProperty("error");
    expect(s.parse({ ...base, ask: { kind: "increasingOn", interval: [1, 9] } })).toHaveProperty("error");
    expect(s.parse({ ...base, ask: { kind: "crossings" } })).toHaveProperty("error"); // crossings needs a line or a second curve
  });
});

describe("functionGraph counts a root where the curve only touches the line", () => {
  const count = (f: string, x: [number, number], g = "0") => {
    const { scene, p } = parsedParams("functionGraph", { f, g: [g], window: { x, y: [-2, 2] }, ask: { kind: "crossings" } });
    return scene.check(p);
  };
  it("counts a double root as one solution", () => {
    expect(count("(x-1)^2", [-1, 3.3])).toBe(1);
    expect(count("x^3-x^2", [-1, 2.2])).toBe(2); // touches at 0, crosses at 1
  });
  it("counts where a curve touches a horizontal line from below", () => {
    expect(count("sin(x)", [0, 2 * Math.PI], "1")).toBe(1);
  });
  it("counts the touching root of JEE's octic: -1, about 0.33, and a touch at 1 make 3", () => {
    expect(count("x^8-x^7-x^6+x^5+3*x^4-4*x^3-2*x^2+4*x-1", [-1.5, 1.5])).toBe(3);
  });
  it("does not count a near miss, and does not count a pole", () => {
    expect(count("(x-1)^2+0.001", [-1, 3.3])).toBe(0);
    expect(count("tan(x)", [0.1, 3.3])).toBe(1);
    expect(count("1/(x-1)^2", [-1, 3.3], "0")).toBe(0);
  });
});

describe("functionGraph drawing details", () => {
  it("labels negative pi ticks as fractions of pi, not decimals", () => {
    const { scene, p } = parsedParams("functionGraph", { f: "sin(3*x)", xTicks: "pi", window: { x: [-Math.PI / 2, Math.PI / 2], y: [-1.2, 1.2] }, ask: { kind: "increasingOn", interval: [-Math.PI / 6, Math.PI / 6] } });
    const texts = scene.frame(p, { played: ["curve"], t: 1, slider: undefined }).filter((s) => s.kind === "text").map((s) => (s as { text: string }).text);
    expect(texts).toContain("−π/4");
    // The x ticks at -pi/4 and -pi/2 used to read as decimals (y-axis numbers like -0.5 are fine).
    expect(texts).not.toContain("−0.79");
    expect(texts).not.toContain("−1.57");
  });
  it("draws the normal as a vertical line when the tangent is horizontal", () => {
    const { scene, p } = parsedParams("functionGraph", { f: "sin(pi*x/2)", window: { x: [0, 2], y: [0, 1.2] }, ask: { kind: "slopePoint", slope: 0, normal: true } });
    const shapes = scene.frame(p, { played: ["curve", "tangent", "mark"], t: 1, slider: undefined });
    const vertical = shapes.filter((s) => s.kind === "line" && (s as { dash?: string }).dash && Math.abs((s as { x1: number }).x1 - (s as { x2: number }).x2) < 1e-9);
    expect(vertical).toHaveLength(1);
  });
});

describe("functionGraph rises straight through an isolated stationary point", () => {
  const check = (f: string, x: [number, number], kind: "increasingOn" | "decreasingOn", interval: [number, number]) => {
    const { scene, p } = parsedParams("functionGraph", { f, window: { x, y: [-50, 50] }, ask: { kind, interval } });
    return scene.check(p);
  };
  it("x^3 - 6x^2 + 12x - 16 has f' = 3(x - 2)^2: increasing on all of [-1, 5], even with a sample at x = 2", () => {
    expect(check("x^3-6*x^2+12*x-16", [-1, 5], "increasingOn", [-1, 5])).toBe(1);
  });
  it("2 - 3x + 3x^2 - x^3 has f' = -3(x - 1)^2: decreasing on all of [-1, 3]", () => {
    expect(check("2-3*x+3*x^2-x^3", [-1, 3], "decreasingOn", [-1, 3])).toBe(1);
  });
  it("x - cos x has f' = 1 + sin x, zero at isolated points: increasing on [-2pi, 2pi]", () => {
    expect(check("x-cos(x)", [-2 * Math.PI, 2 * Math.PI], "increasingOn", [-2 * Math.PI, 2 * Math.PI])).toBe(1);
  });
  it("still refuses a wrong sign, and a flat stretch", () => {
    expect(check("x^3-3*x", [-3, 3], "increasingOn", [-3, 0])).toBe(0);
    expect(check("x^2-2*x", [-1, 3], "increasingOn", [0, 2])).toBe(0);
    // |x - 1| + |x - 2| is flat on [1, 2], then rises.
    expect(check("abs(x-1)+abs(x-2)", [0, 3], "increasingOn", [1.2, 3])).toBe(0);
  });
});

describe("functionGraph extrema", () => {
  const run = (raw: Record<string, unknown>) => {
    const { scene, p } = parsedParams("functionGraph", raw);
    return { value: scene.check(p), text: scene.checkText(p, scene.check(p)), facts: functionGraphFacts(p as never) };
  };
  const cubic = { f: "x^3-3*x", window: { x: [-3, 3], y: [-5, 5] } };
  it("finds every local maximum and minimum and checks them against the stated answer", () => {
    const ok = run({ ...cubic, ask: { kind: "extrema", scope: "local", expect: [{ type: "max", x: -1, y: 2 }, { type: "min", x: 1, y: -2 }] } });
    expect(ok.value).toBe(0);
    expect(ok.facts.extrema.map((e) => [e.type, Math.round(e.x * 1e6) / 1e6, Math.round(e.y * 1e6) / 1e6])).toEqual([["max", -1, 2], ["min", 1, -2]]);
    expect(ok.text).toMatch(/as stated/);
  });
  it("refuses a wrong value, a wrong type, or a missing extremum (the value counts the misses)", () => {
    expect(run({ ...cubic, ask: { kind: "extrema", scope: "local", expect: [{ type: "max", x: -1, y: 3 }, { type: "min", x: 1, y: -2 }] } }).value).toBe(1);
    expect(run({ ...cubic, ask: { kind: "extrema", scope: "local", expect: [{ type: "min", x: -1, y: 2 }, { type: "max", x: 1, y: -2 }] } }).value).toBe(2);
    expect(run({ ...cubic, ask: { kind: "extrema", scope: "local", expect: [{ type: "max", x: -1, y: 2 }] } }).value).toBeGreaterThan(0);
  });
  it("does not count an inflection point as an extremum", () => {
    const r = run({ f: "x^3", window: { x: [-2, 2], y: [-8, 8] }, ask: { kind: "extrema", scope: "local", expect: [] } });
    expect(r.facts.extrema).toEqual([]);
    expect(r.value).toBe(0);
  });
  it("finds the greatest and least values on a closed interval, endpoints included", () => {
    // x^3 - 3x on [0, 3]: least -2 at x = 1, greatest 18 at the endpoint x = 3.
    const r = run({ f: "x^3-3*x", window: { x: [-0.5, 3.2], y: [-4, 20] }, ask: { kind: "extrema", scope: "absolute", on: [0, 3], expect: [{ type: "max", x: 3, y: 18 }, { type: "min", x: 1, y: -2 }] } });
    expect(r.value).toBe(0);
    // Only the greatest value asked, x not given.
    expect(run({ f: "x^3-3*x", window: { x: [-0.5, 3.2], y: [-4, 20] }, ask: { kind: "extrema", scope: "absolute", on: [0, 3], expect: [{ type: "max", y: 18 }] } }).value).toBe(0);
    expect(run({ f: "x^3-3*x", window: { x: [-0.5, 3.2], y: [-4, 20] }, ask: { kind: "extrema", scope: "absolute", on: [0, 3], expect: [{ type: "max", y: 2 }] } }).value).toBe(1);
  });
  it("takes a word problem's function: x(10 - x) on [0, 10] is greatest, 25, at x = 5", () => {
    expect(run({ f: "x*(10-x)", window: { x: [0, 10], y: [0, 30] }, ask: { kind: "extrema", scope: "absolute", on: [0, 10], expect: [{ type: "max", x: 5, y: 25 }] } }).value).toBe(0);
  });
  it("refuses a malformed ask", () => {
    const s = getScene("functionGraph")!;
    expect(s.parse({ ...cubic, ask: { kind: "extrema", expect: [] } })).toHaveProperty("error");
    expect(s.parse({ ...cubic, ask: { kind: "extrema", scope: "local", expect: [{ type: "max", y: 2 }] } })).toHaveProperty("error");
    expect(s.parse({ ...cubic, ask: { kind: "extrema", scope: "absolute", on: [-4, 1], expect: [{ type: "max", y: 2 }] } })).toHaveProperty("error");
    expect(s.parse({ ...cubic, ask: { kind: "extrema", scope: "local", expect: [{ type: "peak", x: 1, y: 2 }] } })).toHaveProperty("error");
  });
  it("keeps extremum labels off the header, and writes pi-ticked x as a fraction of pi", () => {
    // cos^2 x + sin x on [0, pi]: greatest 5/4 at pi/6 (and 5pi/6), least 1 at 0 and pi.
    const { scene, p } = parsedParams("functionGraph", { f: "cos(x)^2+sin(x)", fLabel: "f(x) = cos²x + sin x", xTicks: "pi", window: { x: [-0.3, 3.45], y: [0.5, 1.4] }, ask: { kind: "extrema", scope: "absolute", on: [0, Math.PI], expect: [{ type: "max", y: 1.25 }, { type: "min", y: 1 }] } });
    const shapes = scene.frame(p, { played: ["curve", "mark"], t: 1 } as never).filter((sh) => sh.kind === "text") as { text: string; x: number; y: number; anchor?: string; size?: number }[];
    const head = shapes.find((t) => t.text.startsWith("greatest and least"))!;
    expect(head.text).toContain("π");
    const box = (t: (typeof shapes)[number]) => {
      const w = t.text.length * (t.size ?? 12) * 0.56;
      const left = t.anchor === "end" ? t.x - w : t.anchor === "middle" ? t.x - w / 2 : t.x;
      return { left, right: left + w, top: t.y - (t.size ?? 12), bottom: t.y + 2 };
    };
    const h = box(head);
    for (const t of shapes.filter((s) => s.text.startsWith("max") || s.text.startsWith("min"))) {
      const b = box(t);
      expect(b.right < h.left || b.left > h.right || b.bottom < h.top || b.top > h.bottom).toBe(true);
    }
    expect(shapes.some((t) => t.text === "max (π/6, 1.25)")).toBe(true);
  });
  it("marks the extrema on the mark beat", () => {
    const { scene, p } = parsedParams("functionGraph", { ...cubic, ask: { kind: "extrema", scope: "local", expect: [{ type: "max", x: -1, y: 2 }, { type: "min", x: 1, y: -2 }] } });
    const texts = scene.frame(p, { played: ["curve", "mark"], t: 1 } as never).filter((sh) => sh.kind === "text").map((sh) => (sh as { text: string }).text);
    expect(texts).toContain("max (−1, 2)");
    expect(texts).toContain("min (1, −2)");
  });
});

describe("functionGraph unions and several points", () => {
  it("checks every interval of a union: x^3 - 3x rises on x < -1 and on x > 1", () => {
    const ok = parsedParams("functionGraph", { f: "x^3-3*x", window: { x: [-3, 3], y: [-5, 5] }, ask: { kind: "increasingOn", intervals: [[-3, -1], [1, 3]], intervalLabel: "x < −1 or x > 1" } });
    expect(ok.scene.check(ok.p)).toBe(1);
    const bad = parsedParams("functionGraph", { f: "x^3-3*x", window: { x: [-3, 3], y: [-5, 5] }, ask: { kind: "increasingOn", intervals: [[-3, -1], [-1, 1]] } });
    expect(bad.scene.check(bad.p)).toBe(0);
  });
  it("refuses a union that overlaps or leaves the window, and more than 3 pieces", () => {
    const s = getScene("functionGraph")!;
    const base = { f: "x^3-3*x", window: { x: [-3, 3], y: [-5, 5] } };
    expect(s.parse({ ...base, ask: { kind: "increasingOn", intervals: [[-3, 0], [-1, 3]] } })).toHaveProperty("error");
    expect(s.parse({ ...base, ask: { kind: "increasingOn", intervals: [[-4, -1]] } })).toHaveProperty("error");
    expect(s.parse({ ...base, ask: { kind: "increasingOn", intervals: [[-3, -2], [-1.5, -1], [0, 0.5], [1, 3]] } })).toHaveProperty("error");
    expect(s.parse({ ...base, ask: { kind: "increasingOn", interval: [1, 3], intervals: [[1, 3]] } })).toHaveProperty("error");
  });
  it("finds every point with the given slope and reports their count or the sum of x", () => {
    // y = x^3/3 - 4x has slope 0 at x = -2 and x = 2.
    const count = parsedParams("functionGraph", { f: "x^3/3-4*x", window: { x: [-4, 4], y: [-8, 8] }, ask: { kind: "slopePoints", slope: 0, report: "count" } });
    expect(count.scene.check(count.p)).toBe(2);
    const sum = parsedParams("functionGraph", { f: "x^3/3-4*x", window: { x: [-4, 4], y: [-8, 8] }, ask: { kind: "slopePoints", slope: 0, report: "sumX" } });
    expect(sum.scene.check(sum.p)).toBeCloseTo(0, 6);
    // y = x^2 has slope 4 only at x = 2.
    const one = parsedParams("functionGraph", { f: "x^2", window: { x: [-1, 5], y: [-1, 20] }, ask: { kind: "slopePoints", slope: 4, report: "sumX" } });
    expect(one.scene.check(one.p)).toBeCloseTo(2, 6);
  });
});

describe("functionGraph edges and headers", () => {
  it("stops a curve where it leaves the frame instead of running along the edge (y = x - 4/x near x = 0)", () => {
    const { scene, p } = parsedParams("functionGraph", { f: "x-4/x", window: { x: [-4, 4], y: [-8, 8] }, ask: { kind: "slopePoints", slope: 2, report: "count" } });
    const lines = scene.frame(p, { played: ["curve"], t: 1, slider: undefined }).filter((s) => s.kind === "polyline") as { points: [number, number][] }[];
    const ys = lines.flatMap((l) => l.points.map(([, y]) => y));
    const edge = Math.max(...ys);
    for (const l of lines) {
      for (let i = 1; i < l.points.length; i++) {
        expect(l.points[i][1] === edge && l.points[i - 1][1] === edge, "two neighbouring points on the clipping edge").toBe(false);
      }
    }
  });
  it("moves the header to a second row when it would run into the curve's name", () => {
    const { scene, p } = parsedParams("functionGraph", { f: "x^3-6*x^2+x+3", fLabel: "y = x³ − 6x² + x + 3", window: { x: [-1, 5], y: [-30, 6] }, ask: { kind: "slopePoints", slope: 1, normal: true, report: "sumX" } });
    const texts = scene.frame(p, { played: ["curve", "tangent", "mark"], t: 1, slider: undefined }).filter((s) => s.kind === "text") as { text: string; y: number }[];
    const name = texts.find((t) => t.text.startsWith("y = x³"))!;
    const head = texts.find((t) => t.text.includes("points with tangent slope"))!;
    expect(head.y).toBeGreaterThan(name.y);
  });
});
