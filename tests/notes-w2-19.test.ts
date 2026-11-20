import { describe, expect, it } from "vitest";
import {
  FIRST,
  PLOTS,
  ROWS,
  ZERO,
  plotPoints,
} from "../src/app/notes/_components/visualizations/NeetOrderPlots";
import {
  ARROW_R,
  ROD,
  averageSpeed,
  emfFormula,
  emfFromAverage,
  speedAt,
} from "../src/app/notes/_components/visualizations/CetRotatingRodEmf";
import { BRIDGE, WIRE, nullPoint, unknownX, wireX } from "../src/app/notes/_components/visualizations/CetMetreBridge";
import {
  CYCLE,
  ENGINE,
  celsiusMistake,
  efficiency,
  heatToSink,
  kelvin,
  workOut,
} from "../src/app/notes/_components/visualizations/CetCarnotEngine";
import {
  DIR,
  INCIDENT_DEG,
  REFRACTED_DEG,
  angleBetween,
  brewsterDeg,
  refractiveIndex,
} from "../src/app/notes/_components/visualizations/NeetBrewsterAngle";
import {
  DECOMPOSITION_STEPS,
  DONE_BY,
  GROUND_Y,
  GROUPS,
  HUMUS,
  LIST_ROW_Y,
  dropPose,
  fragmentOpacity,
  highlightPose,
  humusOpacity,
  leafOpacity,
  microbeOpacity,
  nutrientPose,
  saltOpacity,
} from "../src/app/notes/_components/visualizations/NeetDecompositionSteps";

/** True when every point lies on the line through the first and last points. */
function isStraight(pts: { x: number; y: number }[]): boolean {
  const a = pts[0];
  const b = pts[pts.length - 1];
  const span = Math.max(...pts.map((p) => p.y)) - Math.min(...pts.map((p) => p.y)) || 1;
  return pts.every((p) => {
    const yLine = a.y + ((p.x - a.x) / (b.x - a.x)) * (b.y - a.y);
    return Math.abs(p.y - yLine) / span < 1e-9;
  });
}

const slope = (pts: { x: number; y: number }[]) => (pts[pts.length - 1].y - pts[0].y) / (pts[pts.length - 1].x - pts[0].x);

describe("neet-order-plots (nchck-plots)", () => {
  it("has the concept table's five rows in its order, in [R] notation", () => {
    expect(ROWS.map((r) => r.id)).toEqual(["conc", "lnConc", "logRatio", "rate", "halfLife"]);
    expect(ROWS.map((r) => r.title)).toEqual([
      "[R] against t",
      "ln[R] against t",
      "log([R]₀/[R]) against t",
      "Rate against [R]",
      "Half-life against [R]₀",
    ]);
    expect(PLOTS).toHaveLength(10);
  });

  it("draws a straight line exactly where the concept says one", () => {
    for (const p of PLOTS) expect(isStraight(plotPoints(p.id, p.order)), `${p.id} ${p.order}`).toBe(p.straight);
  });

  it("the two flat lines: zero-order rate and first-order half-life", () => {
    const flat = PLOTS.filter((p) => p.flat).map((p) => `${p.id}:${p.order}`);
    expect(flat).toEqual(["rate:zero", "halfLife:first"]);
    for (const p of PLOTS) expect(slope(plotPoints(p.id, p.order)) === 0, `${p.id} ${p.order}`).toBe(p.flat);
    expect(plotPoints("halfLife", "first")[0].y).toBeCloseTo(0.693 / 0.02, 9);
    expect(plotPoints("rate", "zero")[0].y).toBe(ZERO.k);
  });

  it("slopes: −k for [R] (zero) and ln[R] (first), k/2.303 through the origin for log([R]₀/[R])", () => {
    expect(FIRST.k).toBe(0.02);
    expect(slope(plotPoints("conc", "zero"))).toBeCloseTo(-ZERO.k, 9);
    expect(plotPoints("conc", "zero")[0].y).toBe(ZERO.R0);
    expect(slope(plotPoints("lnConc", "first"))).toBeCloseTo(-0.02, 9);
    const log = plotPoints("logRatio", "first");
    expect(log[0].y).toBe(0);
    expect(slope(log)).toBeCloseTo(0.02 / 2.303, 5);
    expect(slope(plotPoints("rate", "first"))).toBeCloseTo(FIRST.k, 9);
    expect(plotPoints("halfLife", "zero")[0].y).toBe(0);
    expect(slope(plotPoints("halfLife", "zero"))).toBeCloseTo(1 / (2 * ZERO.k), 9);
  });

  it("the first-order [R] curve falls more and more slowly", () => {
    const pts = plotPoints("conc", "first");
    const drops = pts.slice(1).map((p, i) => pts[i].y - p.y);
    for (let i = 1; i < drops.length; i++) expect(drops[i]).toBeLessThan(drops[i - 1]);
  });
});

describe("cet-rotating-rod-emf (cetp-emi-rotating-rod-disc)", () => {
  it("uses the worked example: 0.5 m, 20 rad/s, 0.4 T", () => {
    expect(ROD).toEqual({ l: 0.5, omega: 20, B: 0.4 });
  });

  it("speeds grow as ωr up to ωl = 10 m/s at the free end", () => {
    expect(ARROW_R.map(speedAt)).toEqual([2.5, 5, 7.5, 10]);
    expect(ARROW_R[ARROW_R.length - 1]).toBe(ROD.l);
  });

  it("average speed ωl/2 = 5 m/s gives e = 1 V, the same as ½Bωl²", () => {
    expect(averageSpeed()).toBe(5);
    expect(emfFromAverage()).toBeCloseTo(1, 12);
    expect(emfFormula()).toBeCloseTo(1, 12);
  });
});

describe("cet-metre-bridge (cetp-ce-meter-bridge)", () => {
  it("the worked example: 6 Ω and a null point at 40 cm give X = 4 Ω", () => {
    expect(BRIDGE).toEqual({ R: 6, l: 40 });
    expect(unknownX(BRIDGE.R, BRIDGE.l)).toBe(4);
  });

  it("swapping the gaps moves the null point to 100 − l", () => {
    const x = unknownX(BRIDGE.R, BRIDGE.l);
    expect(nullPoint(x, BRIDGE.R)).toBe(40);
    expect(nullPoint(BRIDGE.R, x)).toBe(100 - BRIDGE.l);
    // The concept's self-check and its interchange example.
    expect(nullPoint(20, 30)).toBe(40);
    expect(nullPoint(30, 20)).toBe(60);
    expect(nullPoint(10, 30)).toBe(25);
    expect(nullPoint(30, 10)).toBe(75);
  });

  it("doubling both resistances leaves the null point", () => {
    expect(nullPoint(8, 12)).toBe(nullPoint(4, 6));
  });

  it("the drawn wire runs 0 to 100 cm with the jockey at 40 per cent of it", () => {
    expect(wireX(0)).toBe(WIRE.x0);
    expect(wireX(100)).toBe(WIRE.x1);
    expect((wireX(BRIDGE.l) - WIRE.x0) / (WIRE.x1 - WIRE.x0)).toBeCloseTo(0.4, 2);
  });
});

describe("cet-carnot-engine (cetp-td-carnot-efficiency)", () => {
  it("converts the concept's 227 °C and 27 °C to 500 K and 300 K", () => {
    expect(ENGINE).toEqual({ sourceC: 227, sinkC: 27, Q1: 50 });
    expect(kelvin(ENGINE.sourceC)).toBe(500);
    expect(kelvin(ENGINE.sinkC)).toBe(300);
  });

  it("η = 40%, so 50 kJ in gives 20 kJ of work and 30 kJ to the sink", () => {
    expect(efficiency(500, 300)).toBeCloseTo(0.4, 12);
    expect(workOut()).toBeCloseTo(20, 9);
    expect(heatToSink()).toBeCloseTo(30, 9);
  });

  it("Celsius in the ratio gives a different, wrong answer", () => {
    expect(celsiusMistake()).toBeCloseTo(200 / 227, 9);
    expect(Math.abs(celsiusMistake() - 0.4)).toBeGreaterThan(0.4);
  });

  it("agrees with the concept's other numbers", () => {
    // Worked example: 200 K and 150 K give 1/4; sink lowered by 50 K gives 1/2.
    expect(efficiency(200, 150)).toBeCloseTo(0.25, 12);
    expect(efficiency(200, 100)).toBeCloseTo(0.5, 12);
    // 600 K and 300 K: 1.5 kJ of work needs 3.0 kJ in.
    expect(1.5 / efficiency(600, 300)).toBeCloseTo(3, 12);
  });

  it("lists the cycle in the concept's order, starting with isothermal expansion", () => {
    expect(CYCLE).toEqual([
      "isothermal expansion at T₁",
      "adiabatic expansion",
      "isothermal compression at T₂",
      "adiabatic compression",
    ]);
  });
});

describe("neet-brewster-angle (nphwo-brewster)", () => {
  it("the worked example: refracted at 33°, so i = 57° and μ = tan 57° ≈ 1.54", () => {
    expect(REFRACTED_DEG).toBe(33);
    expect(INCIDENT_DEG).toBe(57);
    expect(refractiveIndex(INCIDENT_DEG)).toBeCloseTo(1.54, 2);
  });

  it("the concept's other examples: μ = √3 gives 60° and 30°; μ = 1.5 gives about 56°", () => {
    expect(refractiveIndex(60)).toBeCloseTo(Math.sqrt(3), 9);
    expect(brewsterDeg(30)).toBe(60);
    expect(Math.round((Math.atan(1.5) * 180) / Math.PI)).toBe(56);
  });

  it("draws the angles true: 57° and 57° to the normal above, 33° below, and 90° between reflected and refracted", () => {
    const up = { x: 0, y: -1 };
    const down = { x: 0, y: 1 };
    expect(angleBetween(DIR.incidentFrom, up)).toBeCloseTo(57, 9);
    expect(angleBetween(DIR.reflected, up)).toBeCloseTo(57, 9);
    expect(angleBetween(DIR.refracted, down)).toBeCloseTo(33, 9);
    expect(angleBetween(DIR.reflected, DIR.refracted)).toBeCloseTo(90, 9);
    // Incident comes from the left, reflected and refracted go to the right.
    expect(DIR.incidentFrom.x).toBeLessThan(0);
    expect(DIR.reflected.x).toBeGreaterThan(0);
    expect(DIR.refracted.x).toBeGreaterThan(0);
  });
});

describe("neet-decomposition-steps (nboec-decomposition)", () => {
  const titles = DECOMPOSITION_STEPS.map((s) => s.title);

  it("walks detritus and then the five NCERT steps in their order", () => {
    expect(titles).toEqual(["Detritus", "Fragmentation", "Leaching", "Catabolism", "Humification", "Mineralisation"]);
    expect(DECOMPOSITION_STEPS.length).toBeGreaterThanOrEqual(3);
    expect(DECOMPOSITION_STEPS.length).toBeLessThanOrEqual(7);
  });

  it("groups the first three as simultaneous on the detritus and the last two in the soil", () => {
    expect(GROUPS.map((g) => [...g.steps])).toEqual([
      ["Fragmentation", "Leaching", "Catabolism"],
      ["Humification", "Mineralisation"],
    ]);
    expect(GROUPS.map((g) => g.label)).toEqual(["together, on the detritus", "in the soil"]);
    expect(DECOMPOSITION_STEPS[3].caption).toContain("simultaneously");
  });

  it("names who does each step as the concept's table does", () => {
    expect(DONE_BY.Fragmentation).toContain("earthworm");
    expect(DONE_BY.Catabolism).toBe("bacteria and fungi");
    expect(DONE_BY.Mineralisation).toBe("some soil microbes");
    expect(DECOMPOSITION_STEPS[2].caption).toContain("unavailable salts");
    expect(DECOMPOSITION_STEPS[1].caption).not.toContain("enzyme");
  });

  it("each part appears at its own step, and the last step shows them all", () => {
    expect(leafOpacity(0)).toBe(1);
    expect(fragmentOpacity(0)).toBe(0);
    expect(fragmentOpacity(1)).toBe(1);
    expect(dropPose(1, 40).opacity).toBe(0);
    expect(dropPose(2, 40).opacity).toBe(1);
    expect(dropPose(2, 40).y).toBeGreaterThan(GROUND_Y);
    expect(saltOpacity(1)).toBe(0);
    expect(saltOpacity(2)).toBe(1);
    expect(microbeOpacity(2)).toBe(0);
    expect(microbeOpacity(3)).toBe(1);
    expect(humusOpacity(3)).toBe(0);
    expect(humusOpacity(4)).toBe(1);
    expect(HUMUS.y).toBeGreaterThan(GROUND_Y);
    for (let i = 0; i < 4; i++) {
      expect(nutrientPose(4, i).opacity).toBe(0);
      expect(nutrientPose(5, i).opacity).toBe(1);
      expect(nutrientPose(5, i).y).toBeGreaterThan(GROUND_Y);
    }
    const last = DECOMPOSITION_STEPS.length - 1;
    expect([fragmentOpacity(last), saltOpacity(last), microbeOpacity(last), humusOpacity(last)]).toEqual([1, 1, 1, 1]);
  });

  it("the list highlight follows the current step", () => {
    DECOMPOSITION_STEPS.forEach((s, i) => expect(highlightPose(i).y).toBe(LIST_ROW_Y[s.title]));
  });
});
