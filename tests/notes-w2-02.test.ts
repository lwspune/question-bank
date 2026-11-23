import { describe, expect, it } from "vitest";
import {
  AXES,
  EXAMPLE_Q,
  HEAT,
  STAGES,
  curveCorners,
  xOf as heatX,
  yOf as heatY,
} from "../src/app/notes/_components/visualizations/JeeHeatingCurve";
import {
  DEFAULT_T,
  T_RANGE,
  curve as wienCurve,
  peakNm,
  powerRatio,
} from "../src/app/notes/_components/visualizations/CetWienPeak";
import {
  DEFAULT_POS,
  MARKS,
  POS_RANGE,
  gRatio,
  posToR,
  smallHeightRatio,
  twelfths,
} from "../src/app/notes/_components/visualizations/CetGHeightDepth";
import {
  H_MAX,
  LOOP_STEPS,
  SOFT_IRON,
  STEEL,
  coercivity,
  dotAt,
  falling,
  firstCurve,
  retentivity,
  rising,
} from "../src/app/notes/_components/visualizations/CetHysteresisLoop";
import { A, B, bandX, difference, extremes } from "../src/app/notes/_components/visualizations/CetErrorsAdd";
import { DEFAULT_N, K_WHOLE, N_RANGE, pieceConstants, shares, zigzag } from "../src/app/notes/_components/visualizations/CetCutSpring";
import {
  AM_RANGE,
  A_C,
  DEFAULT_AM,
  aMax,
  aMin,
  amWave,
  envelope,
  muFromEnvelope,
} from "../src/app/notes/_components/visualizations/JeeAmEnvelope";
import {
  ARROW_Z,
  B0,
  C,
  E0,
  ORIGIN,
  bPoint,
  ePoint,
  phase,
} from "../src/app/notes/_components/visualizations/NeetEmWaveFields";

// Notes figures, wave 2 group 02 (scripts/notes/CET_VISUALS_BRIEF.md).

describe("jee-heating-curve (jpthermal-phase-change)", () => {
  it("uses the concept's 0.5 kg of ice at −20 °C and its constants", () => {
    expect(HEAT.m).toBe(0.5);
    expect(HEAT.startC).toBe(-20);
    expect(HEAT.sIce).toBe(2100);
    expect(HEAT.sWater).toBe(4200);
    expect(HEAT.Lf).toBe(3.36e5);
    expect(HEAT.Lv / HEAT.Lf).toBeCloseTo(2256 / 336, 10);
  });

  it("has the four stages in order with the right heats", () => {
    expect(STAGES.map((s) => s.name)).toEqual(["ice warms", "ice melts", "water warms", "water boils"]);
    expect(STAGES[0].q).toBeCloseTo(21000, 6);
    expect(STAGES[1].q).toBeCloseTo(168000, 6);
    expect(STAGES[2].q).toBeCloseTo(210000, 6);
    expect(STAGES[3].q).toBeCloseTo(1128000, 6);
  });

  it("goes flat at 0 °C and 100 °C and stops at the end of boiling", () => {
    const c = curveCorners();
    expect(c.map((p) => p.t)).toEqual([-20, 0, 0, 100, 100]);
    expect(c.map((p) => Math.round(p.q))).toEqual([0, 21000, 189000, 399000, 1527000]);
    expect(heatX(c[4].q)).toBeLessThan(AXES.x1);
  });

  it("draws the boiling flat about 6.7 times the melting flat, to scale", () => {
    const c = curveCorners();
    const melt = heatX(c[2].q) - heatX(c[1].q);
    const boil = heatX(c[4].q) - heatX(c[3].q);
    expect(boil / melt).toBeCloseTo(6.71, 1);
  });

  it("rises twice as steeply for ice as for water (slope 1/(ms))", () => {
    const ice = 1 / (HEAT.m * HEAT.sIce);
    const water = 1 / (HEAT.m * HEAT.sWater);
    expect(ice / water).toBeCloseTo(2, 10);
    const c = curveCorners();
    const iceSlope = (heatY(c[0].t) - heatY(c[1].t)) / (heatX(c[1].q) - heatX(c[0].q));
    const waterSlope = (heatY(c[2].t) - heatY(c[3].t)) / (heatX(c[3].q) - heatX(c[2].q));
    expect(iceSlope / waterSlope).toBeCloseTo(2, 1);
  });

  it("marks the worked example: water at 40 °C after 273 kJ", () => {
    expect(EXAMPLE_Q).toBeCloseTo(273000, 6);
  });
});

describe("cet-wien-peak (cetp-th-wien-law)", () => {
  it("opens on the worked example: 5800 K peaks at 500 nm", () => {
    expect(DEFAULT_T).toBe(5800);
    expect(peakNm(5800)).toBeCloseTo(500, 6);
    expect(DEFAULT_T).toBeGreaterThanOrEqual(T_RANGE.min);
    expect(DEFAULT_T).toBeLessThanOrEqual(T_RANGE.max);
  });

  it("halves the peak wavelength when T doubles (self-check: 966 → 483 nm)", () => {
    expect(peakNm(3000)).toBeCloseTo(966.67, 1);
    expect(peakNm(6000)).toBeCloseTo(483.33, 1);
    expect(peakNm(3000) / peakNm(6000)).toBeCloseTo(2, 10);
  });

  it("gives 16 times the power at double the temperature", () => {
    expect(powerRatio(6000)).toBeCloseTo(16, 10);
    expect(powerRatio(3000)).toBe(1);
  });

  it("draws each curve peaking where Wien's law says", () => {
    for (const T of [3000, 4500, 5800, 6000]) {
      const pts = wienCurve(T);
      const top = pts.reduce((a, p) => (p.y > a.y ? p : a));
      expect(top.y).toBe(1);
      expect(Math.abs(top.nm - peakNm(T))).toBeLessThanOrEqual(20);
    }
  });
});

describe("cet-g-height-depth (cetp-gr-altitude-depth)", () => {
  it("falls linearly inside and as 1/r² outside", () => {
    expect(gRatio(0)).toBe(0);
    expect(gRatio(0.5)).toBe(0.5);
    expect(gRatio(1)).toBe(1);
    expect(gRatio(2)).toBeCloseTo(1 / 4, 12);
    expect(gRatio(3)).toBeCloseTo(1 / 9, 12);
  });

  it("opens on the worked example: h = 2R/3 gives 0.36 g", () => {
    expect(DEFAULT_POS).toBe(8);
    expect(twelfths(DEFAULT_POS)).toBe("2R/3");
    expect(posToR(DEFAULT_POS)).toBeCloseTo(5 / 3, 12);
    expect(gRatio(posToR(DEFAULT_POS))).toBeCloseTo(0.36, 12);
  });

  it("halves g at depth R/2 (the self-check) and runs from the centre to h = 2R", () => {
    expect(twelfths(-6)).toBe("R/2");
    expect(gRatio(posToR(-6))).toBeCloseTo(0.5, 12);
    expect(posToR(POS_RANGE.min)).toBe(0);
    expect(posToR(POS_RANGE.max)).toBe(3);
    expect(twelfths(12)).toBe("R");
    expect(twelfths(24)).toBe("2R");
  });

  it("marks the concept's points at their true values", () => {
    for (const m of MARKS) expect(gRatio(m.r)).toBeCloseTo(m.g, 12);
    expect(MARKS.map((m) => m.label)).toEqual(["d = R/2: g/2", "h = R: g/4", "h = 2R: g/9"]);
  });

  it("shows the small-height form close near the surface and wrong far away", () => {
    expect(Math.abs(smallHeightRatio(1.02) - gRatio(1.02))).toBeLessThan(0.002);
    expect(smallHeightRatio(1.5)).toBe(0);
    expect(gRatio(1.5)).toBeCloseTo(4 / 9, 12);
  });
});

describe("cet-hysteresis-loop (cetp-mm-hysteresis-shielding)", () => {
  it("puts the retentivity on the B-axis and the coercivity on the H-axis", () => {
    expect(dotAt(1).H).toBe(0);
    expect(dotAt(1).B).toBeCloseTo(retentivity(STEEL), 12);
    expect(dotAt(2).B).toBe(0);
    expect(dotAt(2).H).toBe(coercivity(STEEL));
    expect(falling(STEEL, coercivity(STEEL))).toBeCloseTo(0, 12);
    expect(rising(STEEL, -coercivity(STEEL))).toBeCloseTo(0, 12);
  });

  it("gives soft iron a high retentivity and a low coercivity, steel both high", () => {
    expect(retentivity(STEEL)).toBeGreaterThan(0.8);
    expect(retentivity(SOFT_IRON)).toBeGreaterThan(0.8);
    expect(Math.abs(coercivity(SOFT_IRON))).toBeLessThan(Math.abs(coercivity(STEEL)) / 3);
  });

  it("starts from B = 0 and meets the loop at the tip", () => {
    expect(firstCurve(0)).toBe(0);
    expect(firstCurve(H_MAX)).toBeCloseTo(rising(STEEL, H_MAX), 12);
    expect(dotAt(0)).toEqual(dotAt(4));
  });

  it("traces the loop in order", () => {
    expect(LOOP_STEPS).toHaveLength(5);
    const titles = LOOP_STEPS.map((s) => s.title.toLowerCase());
    expect(titles.findIndex((t) => t.includes("retentivity"))).toBeLessThan(titles.findIndex((t) => t.includes("coercivity")));
    expect(dotAt(3).H).toBe(-H_MAX);
    expect(dotAt(3).B).toBeLessThan(-0.9);
  });
});

describe("cet-errors-add (cetp-um-absolute-errors)", () => {
  it("uses the concept's example and adds the errors", () => {
    expect(A).toEqual({ value: 82.3, err: 0.3 });
    expect(B).toEqual({ value: 38.6, err: 0.2 });
    expect(difference(A, B)).toEqual({ value: 43.7, err: 0.5 });
  });

  it("finds the largest and smallest differences from opposite ends", () => {
    expect(extremes(A, B)).toEqual({ largest: 44.2, smallest: 43.2 });
  });

  it("draws the difference's band as wide as the other two together", () => {
    const w = (m: { value: number; err: number }) => bandX(m).hi - bandX(m).lo;
    expect(w(difference(A, B))).toBeCloseTo(w(A) + w(B), 6);
    expect(bandX(A)).toEqual({ lo: 124, hi: 196 });
    expect(bandX(B)).toEqual({ lo: 136, hi: 184 });
    expect(bandX(difference(A, B))).toEqual({ lo: 100, hi: 220 });
  });
});

describe("cet-cut-spring (cetp-ms-springs)", () => {
  it("opens on the worked example: 600 N/m cut 2 : 1 gives 900 and 1800 N/m", () => {
    expect(K_WHOLE).toBe(600);
    expect(DEFAULT_N).toBe(2);
    const k = pieceConstants(DEFAULT_N);
    expect(k.k1).toBeCloseTo(900, 10);
    expect(k.k2).toBeCloseTo(1800, 10);
  });

  it("makes each piece stretch its share under the same force", () => {
    for (let N = N_RANGE.min; N <= N_RANGE.max; N++) {
      const { k1, k2 } = pieceConstants(N);
      const s = shares(N);
      expect(s.long + s.short).toBeCloseTo(1, 12);
      expect(k1 * s.long).toBeCloseTo(K_WHOLE, 9);
      expect(k2 * s.short).toBeCloseTo(K_WHOLE, 9);
      expect(1 / k1 + 1 / k2).toBeCloseTo(1 / K_WHOLE, 12);
      expect(k2).toBeGreaterThanOrEqual(k1);
    }
  });

  it("draws a spring from its top to its bottom", () => {
    const pts = zigzag(50, 20, 120, 4).split(" ");
    expect(pts[0]).toBe("50,20");
    expect(pts[pts.length - 1]).toBe("50,120");
  });
});

describe("jee-am-envelope (jpcomm-envelope)", () => {
  it("opens on the worked example: amplitudes 10 V and 4 V, μ = 3/7", () => {
    expect(A_C).toBe(7);
    expect(DEFAULT_AM).toBe(3);
    expect(aMax(DEFAULT_AM)).toBe(10);
    expect(aMin(DEFAULT_AM)).toBe(4);
    expect(muFromEnvelope(10, 4)).toBeCloseTo(3 / 7, 12);
    expect(muFromEnvelope(aMax(DEFAULT_AM), aMin(DEFAULT_AM))).toBeCloseTo(DEFAULT_AM / A_C, 12);
  });

  it("matches the self-check: 20 V carrier at μ = 0.5 gives 30 V and 10 V", () => {
    expect(aMax(10, 20)).toBe(30);
    expect(aMin(10, 20)).toBe(10);
    expect(aMax(10, 20) / aMin(10, 20)).toBeCloseTo((1 + 0.5) / (1 - 0.5), 12);
  });

  it("keeps the wave inside its envelope, which swings between the two amplitudes", () => {
    expect(envelope(0.25, DEFAULT_AM)).toBeCloseTo(10, 12);
    expect(envelope(0.75, DEFAULT_AM)).toBeCloseTo(4, 12);
    for (let k = 0; k <= 400; k++) {
      const u = k / 200;
      expect(Math.abs(amWave(u, DEFAULT_AM))).toBeLessThanOrEqual(envelope(u, DEFAULT_AM) + 1e-9);
    }
  });

  it("lets the slider reach over-modulation", () => {
    expect((AM_RANGE.max as number) / A_C).toBeGreaterThan(1);
    expect(AM_RANGE.min).toBe(0);
  });
});

describe("neet-em-wave-fields (nphem-fields)", () => {
  it("uses the worked example: E₀ = 30 V/m gives B₀ = 10⁻⁷ T", () => {
    expect(E0).toBe(30);
    expect(B0 * 1e7).toBeCloseTo(1, 10);
    expect(E0 / B0).toBeCloseTo(C, 0);
  });

  it("draws E and B in phase: both peak and pass through zero at the same z", () => {
    expect(ePoint(0.25).y).toBe(ORIGIN.y - 58);
    expect(bPoint(0.25).y).toBeGreaterThan(ORIGIN.y);
    expect(ePoint(0.5).y).toBe(ORIGIN.y);
    expect(bPoint(0.5).y).toBe(ORIGIN.y);
    for (const z of ARROW_Z) {
      const e = ORIGIN.y - ePoint(z).y;
      const b = bPoint(z).y - ORIGIN.y;
      expect(Math.sign(Math.round(e))).toBe(Math.sign(Math.round(b)));
      expect(Math.abs(phase(z))).toBeLessThanOrEqual(1);
    }
  });

  it("has E (x) and B (y) giving travel along z", () => {
    const cross = (a: number[], b: number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    expect(cross([1, 0, 0], [0, 1, 0])).toEqual([0, 0, 1]);
    expect(ARROW_Z).toHaveLength(17);
    expect(ARROW_Z[ARROW_Z.length - 1]).toBe(2);
  });
});
