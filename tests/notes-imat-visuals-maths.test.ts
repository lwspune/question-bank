import { describe, expect, it } from "vitest";
import {
  A_VALUES,
  DEFAULT_TRANSFORM,
  describeMoves,
  equationText,
  transformed,
  vertexOf,
} from "../src/app/notes/_components/visualizations/ImatGraphTransformations";
import {
  EXAMPLE,
  SIN_COS_PERIOD,
  TAN_ASYMPTOTES,
  TAN_PERIOD,
  periodOf,
  rangeOf,
  sineWave,
} from "../src/app/notes/_components/visualizations/ImatTrigGraphs";
import {
  QUAD,
  SIGN_CHART,
  SOLUTION_TEXT,
  STRICT,
  discriminant,
  quad,
  roots,
  vertex,
} from "../src/app/notes/_components/visualizations/ImatSignChart";
import {
  DEFAULT_ANGLE,
  RADIUS,
  arcLength,
  arcPiMultiple,
  areaPiMultiple,
  fractionOf,
  piText,
  sectorArea,
  sectorPerimeter,
} from "../src/app/notes/_components/visualizations/ImatSectorArc";
import { DEFAULT_K, JUG, scaleFactors, scaledJug } from "../src/app/notes/_components/visualizations/ImatSimilarScaling";
import {
  PAIRS,
  SECTORS,
  TRANSVERSAL_DEG,
  angleSize,
  isBetween,
  sideOf,
} from "../src/app/notes/_components/visualizations/ImatParallelAngles";
import { GRAPHS } from "../src/app/notes/_components/visualizations/ImatStandardGraphs";
import {
  ONE_RADIAN_DEG,
  RADIAN_TICKS,
  arcLength as radianArc,
  degToRad,
  radToDeg,
} from "../src/app/notes/_components/visualizations/ImatRadianArc";

// Eight figures for the IMAT Mathematics notes. Each draws the numbers its
// concept's own text uses, so those numbers are pinned here: a figure that
// disagrees with the text beside it is worse than none.

const M = "−"; // the minus sign the figures print

describe("graph transformations slider (imat-fun-transformations)", () => {
  it("opens on the worked example y = 2(x − 3)² + 1 with vertex (3, 1)", () => {
    expect(DEFAULT_TRANSFORM).toEqual({ a: 2, h: 3, k: 1 });
    const { a, h, k } = DEFAULT_TRANSFORM;
    expect(equationText(a, h, k)).toBe(`y = 2(x ${M} 3)² + 1`);
    expect(vertexOf(h, k)).toEqual({ x: 3, y: 1 });
    expect(transformed(3, a, h, k)).toBe(1);
    // Stretch keeps the vertex: points either side are higher (a > 0).
    expect(transformed(2, a, h, k)).toBe(3);
    expect(transformed(4, a, h, k)).toBe(3);
  });

  it("moves the graph RIGHT for f(x − 3), the trap the concept warns about", () => {
    // y = (x − 3)² reaches 0 at x = 3, where x² reached it at x = 0.
    expect(transformed(3, 1, 3, 0)).toBe(0);
    expect(describeMoves(1, 3, 0)).toEqual(["shift 3 right"]);
    expect(describeMoves(2, 3, 1)).toEqual(["vertical stretch ×2", "shift 3 right", "shift 1 up"]);
  });

  it("writes the practice set's graphs in the concept's notation", () => {
    expect(equationText(1, -4, 0)).toBe("y = (x + 4)²");
    expect(describeMoves(1, -4, 0)).toEqual(["shift 4 left"]);
    expect(vertexOf(-4, 0)).toEqual({ x: -4, y: 0 });
    expect(equationText(-1, 0, 0)).toBe(`y = ${M}x²`);
    expect(describeMoves(-1, 0, 0)).toEqual(["reflection in the x-axis"]);
    expect(equationText(1, 0, -5)).toBe(`y = x² ${M} 5`);
    expect(describeMoves(1, 0, -5)).toEqual(["shift 5 down"]);
  });

  it("offers reflections and stretches but never a = 0", () => {
    expect(A_VALUES).not.toContain(0);
    expect(A_VALUES.some((a) => a < 0)).toBe(true);
    expect(A_VALUES).toContain(2);
  });
});

describe("trig graphs (imat-trg-graphs-periods)", () => {
  it("uses period 360° for sin and cos, 180° for tan, asymptotes where cos x = 0", () => {
    expect(SIN_COS_PERIOD).toBe(360);
    expect(TAN_PERIOD).toBe(180);
    expect(TAN_ASYMPTOTES).toEqual([90, 270]);
    for (const d of TAN_ASYMPTOTES) expect(Math.cos((d * Math.PI) / 180)).toBeCloseTo(0, 10);
    expect(TAN_ASYMPTOTES[1] - TAN_ASYMPTOTES[0]).toBe(TAN_PERIOD);
  });

  it("starts sin at 0 and has amplitude 1", () => {
    expect(sineWave(0, 1, 1, 0)).toBe(0);
    expect(sineWave(90, 1, 1, 0)).toBeCloseTo(1);
    expect(rangeOf(1, 0)).toEqual([-1, 1]);
  });

  it("draws the worked example y = 3 sin(2x) + 1: amplitude 3, period 180°, values −2 to 4", () => {
    expect(EXAMPLE).toEqual({ a: 3, b: 2, c: 1 });
    expect(periodOf(EXAMPLE.b)).toBe(180);
    expect(rangeOf(EXAMPLE.a, EXAMPLE.c)).toEqual([-2, 4]);
    // The figure puts the peak at 45° and the trough at 135°.
    expect(sineWave(45, 3, 2, 1)).toBeCloseTo(4);
    expect(sineWave(135, 3, 2, 1)).toBeCloseTo(-2);
    expect(sineWave(180, 3, 2, 1)).toBeCloseTo(1);
  });

  it("agrees with the self-check and practice answers", () => {
    expect(periodOf(1 / 3)).toBeCloseTo(1080);
    expect(rangeOf(2, -5)).toEqual([-7, -3]);
    expect(periodOf(4)).toBe(90);
    expect(periodOf(3)).toBe(120);
    expect(rangeOf(-4, 0)).toEqual([-4, 4]); // amplitude |a| = 4
  });
});

describe("sign chart (imat-eqi-quadratic-inequalities)", () => {
  it("draws x² − x − 12 = (x − 4)(x + 3), roots −3 and 4", () => {
    expect(QUAD).toEqual({ a: 1, b: -1, c: -12 });
    expect(discriminant()).toBe(49);
    expect(roots()).toEqual([-3, 4]);
    expect(quad(-3)).toBe(0);
    expect(quad(4)).toBe(0);
    expect(vertex()).toEqual({ x: 0.5, y: -12.25 });
  });

  it("marks + outside the roots and − between them, read from each test point", () => {
    expect(SIGN_CHART.map((s) => s.sign)).toEqual(["+", M, "+"]);
    for (const s of SIGN_CHART) {
      expect(quad(s.test) > 0 ? "+" : M).toBe(s.sign);
    }
    expect(quad(-5)).toBe(18);
    expect(quad(0)).toBe(-12);
    expect(quad(5)).toBe(8);
  });

  it("shades the worked answer, roots left out because > 0 is strict", () => {
    expect(STRICT).toBe(true);
    expect(SOLUTION_TEXT).toBe(`x < ${M}3 or x > 4`);
  });
});

describe("sector and arc slider (imat-geo-circle-measure)", () => {
  it("opens on the worked example: r = 9 cm, 80°, which is 2/9 of the circle", () => {
    expect(RADIUS).toBe(9);
    expect(DEFAULT_ANGLE).toBe(80);
    expect(fractionOf(80)).toEqual([2, 9]);
  });

  it("gives the worked example's arc 4π, area 18π, perimeter 4π + 18", () => {
    expect(arcPiMultiple(80)).toBeCloseTo(4);
    expect(areaPiMultiple(80)).toBeCloseTo(18);
    expect(piText(arcPiMultiple(80))).toBe("4π");
    expect(piText(areaPiMultiple(80))).toBe("18π");
    expect(arcLength(80).toFixed(1)).toBe("12.6");
    expect(sectorArea(80).toFixed(1)).toBe("56.5");
    expect(sectorPerimeter(80).toFixed(1)).toBe("30.6");
  });

  it("agrees with the self-check and practice answers", () => {
    // Area 64π means r = 8; a sector of 8π is 1/8 of it, so 45°.
    expect(areaPiMultiple(45, 8)).toBeCloseTo(8);
    expect(fractionOf(45)).toEqual([1, 8]);
    expect(arcPiMultiple(90, 4)).toBeCloseTo(2);
    expect(areaPiMultiple(120, 3)).toBeCloseTo(3);
  });

  it("prints multiples of π cleanly", () => {
    expect(piText(1)).toBe("π");
    expect(piText(2.25)).toBe("2.25π");
  });
});

describe("scaling slider (imat-geo-scaling)", () => {
  it("opens on the jugs' scale factor 18/12 = 1.5", () => {
    expect(JUG).toEqual({ height: 12, glaze: 150, litres: 0.8 });
    expect(DEFAULT_K).toBe(18 / 12);
  });

  it("gives length ×k, area ×k², volume ×k³", () => {
    expect(scaleFactors(1.5)).toEqual({ length: 1.5, area: 2.25, volume: 3.375 });
    expect(scaleFactors(2)).toEqual({ length: 2, area: 4, volume: 8 });
    expect(scaleFactors(1.2).volume).toBe(1.728); // self-check: +72.8%
    expect(scaleFactors(1.2).area).toBe(1.44);
    expect(scaleFactors(0.5).volume).toBe(0.125); // practice: 1/8 left
  });

  it("gives the worked example's answers: 2.7 litres and 337.5 cm²", () => {
    expect(scaledJug(1.5)).toEqual({ height: 18, glaze: 337.5, litres: 2.7 });
  });
});

describe("parallel-line angles (imat-geo-angle-facts)", () => {
  it("uses 65° and 115°, the self-check's co-interior pair (x = 35)", () => {
    expect(TRANSVERSAL_DEG).toBe(65);
    expect(angleSize("upperRight")).toBe(65);
    expect(angleSize("upperLeft")).toBe(115);
    expect(angleSize("lowerLeft")).toBe(65);
    expect(angleSize("lowerRight")).toBe(115);
    const x = 35;
    expect([3 * x + 10, 2 * x - 5]).toEqual([115, 65]);
  });

  it("keeps the basic facts: a straight line is 180°, a point 360°, opposite angles equal", () => {
    expect(angleSize("upperRight") + angleSize("upperLeft")).toBe(180);
    const all = Object.keys(SECTORS) as (keyof typeof SECTORS)[];
    expect(all.reduce((s, p) => s + angleSize(p), 0)).toBe(360);
    expect(angleSize("upperRight")).toBe(angleSize("lowerLeft"));
  });

  it("names each pair by the concept's definition and rule", () => {
    expect(PAIRS.map((p) => [p.name, p.shape, p.rule])).toEqual([
      ["Corresponding", "F", "equal"],
      ["Alternate", "Z", "equal"],
      ["Co-interior", "C", "add to 180°"],
    ]);
    const [corr, alt, coint] = PAIRS;
    // Corresponding: same position at each crossing.
    expect(corr.a.at).not.toBe(corr.b.at);
    expect(corr.a.pos).toBe(corr.b.pos);
    // Alternate: between the parallels, opposite sides of the transversal.
    expect(isBetween(alt.a.at, alt.a.pos) && isBetween(alt.b.at, alt.b.pos)).toBe(true);
    expect(sideOf(alt.a.pos)).not.toBe(sideOf(alt.b.pos));
    // Co-interior: between the parallels, same side.
    expect(isBetween(coint.a.at, coint.a.pos) && isBetween(coint.b.at, coint.b.pos)).toBe(true);
    expect(sideOf(coint.a.pos)).toBe(sideOf(coint.b.pos));
    for (const p of PAIRS) {
      const [x, y] = [angleSize(p.a.pos), angleSize(p.b.pos)];
      if (p.rule === "equal") expect(x).toBe(y);
      else expect(x + y).toBe(180);
    }
  });
});

describe("standard graphs (imat-fun-standard-graphs)", () => {
  const byId = Object.fromEntries(GRAPHS.map((g) => [g.id, g]));

  it("draws the six graphs of the concept's table, in its order", () => {
    expect(GRAPHS.map((g) => g.title)).toEqual(["y = x²", "y = x³", "y = √x", "y = 1/x", "y = eˣ", "y = ln x"]);
  });

  it("puts every key point on its curve", () => {
    for (const g of GRAPHS) {
      for (const p of g.points) expect(g.f(p.x)).toBeCloseTo(p.y);
    }
    expect(byId.exp.points).toEqual([{ x: 0, y: 1 }]);
    expect(byId.log.points).toEqual([{ x: 1, y: 0 }]);
  });

  it("states the table's domains and ranges", () => {
    expect(GRAPHS.map((g) => [g.domain, g.range])).toEqual([
      ["all x", "y ≥ 0"],
      ["all x", "all y"],
      ["x ≥ 0", "y ≥ 0"],
      ["x ≠ 0", "y ≠ 0"],
      ["all x", "y > 0"],
      ["x > 0", "all y"],
    ]);
  });

  it("draws the asymptotes the table names and keeps 1/x off x = 0", () => {
    expect(byId.reciprocal.asymptotes).toEqual({ x: 0, y: 0 });
    expect(byId.exp.asymptotes).toEqual({ y: 0 });
    expect(byId.log.asymptotes).toEqual({ x: 0 });
    for (const [a, b] of byId.reciprocal.pieces) expect(a > 0 || b < 0).toBe(true);
    for (const [a] of byId.log.pieces) expect(a).toBeGreaterThan(0);
  });

  it("keeps the traps true: eˣ > 0 for negative x, ln x < 0 between 0 and 1", () => {
    expect(byId.exp.f(-10)).toBeGreaterThan(0);
    expect(byId.log.f(0.5)).toBeLessThan(0);
    expect(byId.log.f(2)).toBeGreaterThan(0);
    // Mirror images in y = x: the key points swap.
    expect([byId.exp.points[0].y, byId.exp.points[0].x]).toEqual([byId.log.points[0].x, byId.log.points[0].y]);
  });
});

describe("radian figure (imat-trg-radians)", () => {
  it("labels one radian as about 57.3°", () => {
    expect(ONE_RADIAN_DEG.toFixed(1)).toBe("57.3");
    expect(radianArc(7, 1)).toBe(7); // an arc of one radian is one radius long
  });

  it("makes π radians 180°, with three whole radians fitting in the half circle", () => {
    expect(radToDeg(Math.PI)).toBeCloseTo(180);
    expect(RADIAN_TICKS).toEqual([1, 2, 3]);
    for (const t of RADIAN_TICKS) expect(t).toBeLessThan(Math.PI);
    expect(4).toBeGreaterThan(Math.PI);
  });

  it("agrees with the worked example, self-check and practice", () => {
    expect(degToRad(150)).toBeCloseTo((5 * Math.PI) / 6);
    expect(radToDeg((3 * Math.PI) / 4)).toBeCloseTo(135);
    expect(radToDeg((7 * Math.PI) / 6)).toBeCloseTo(210);
    expect(radianArc(5, 0.8)).toBeCloseTo(4);
  });
});
