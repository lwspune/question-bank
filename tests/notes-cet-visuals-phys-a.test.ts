import { describe, expect, it } from "vitest";
import {
  DEPLETION_STEPS,
  FIELD,
  JUNCTION_X,
  LAYER,
  MEET_X,
  P_COLUMNS,
  N_COLUMNS,
  ROWS,
  carrierPose,
  fieldShown,
  layerShown,
  uncoveredCharge,
} from "../src/app/notes/_components/visualizations/CetPnDepletion";
import { BIAS, UNBIASED_WIDTH, biasOf } from "../src/app/notes/_components/visualizations/CetDiodeBias";
import {
  PULSES_PER_CYCLE,
  RECT_EXAMPLE,
  RECT_STEPS,
  inputAt,
  lobePose,
  outputAt,
  outputFrequency,
} from "../src/app/notes/_components/visualizations/CetRectifierWaves";
import {
  E_RANGE,
  START_TENTHS,
  WORKED,
  kMaxTenths,
  photonEnergyEv,
  wavelengthNm,
} from "../src/app/notes/_components/visualizations/CetPhotoelectricThreshold";
import {
  H_OVER_E,
  METALS,
  SAME_FREQUENCY,
  SAME_INTENSITY,
  photocurrent,
  stoppingPotential,
  thresholdFrequency,
} from "../src/app/notes/_components/visualizations/CetPhotoelectricGraphs";
import {
  ARROWS,
  LEVEL_Y,
  SERIES,
  firstLineNm,
  levelEnergy,
  limitNm,
} from "../src/app/notes/_components/visualizations/CetHydrogenSeries";

// MHT-CET Physics notes figures, task phys-a (scripts/notes/CET_VISUALS_BRIEF.md).
// Each figure must say what its concept says; the numbers are worked out here.

describe("p-n junction: forming the depletion layer (cetp-depletion-layer)", () => {
  const last = DEPLETION_STEPS.length - 1;

  it("walks diffusion, then recombination, then uncovered ions, then the field", () => {
    expect(DEPLETION_STEPS.map((s) => s.title)).toEqual([
      "Two regions",
      "Diffusion",
      "Recombination",
      "Uncovered ions",
      "The junction field",
    ]);
  });

  it("starts each moving carrier on its own side of the junction", () => {
    for (const row of ROWS.map((_, i) => i)) {
      expect(carrierPose(0, "hole", row).x).toBeLessThan(JUNCTION_X);
      expect(carrierPose(0, "electron", row).x).toBeGreaterThan(JUNCTION_X);
    }
  });

  it("diffuses carriers ACROSS: holes into the n-side and electrons into the p-side", () => {
    let holesIntoN = 0;
    let electronsIntoP = 0;
    for (const row of ROWS.map((_, i) => i)) {
      if (carrierPose(1, "hole", row).x > JUNCTION_X) holesIntoN++;
      if (carrierPose(1, "electron", row).x < JUNCTION_X) electronsIntoP++;
    }
    expect(holesIntoN).toBeGreaterThan(0);
    expect(electronsIntoP).toBeGreaterThan(0);
  });

  it("recombines each electron with a hole at one point, after which both are gone", () => {
    for (const row of ROWS.map((_, i) => i)) {
      const h = carrierPose(2, "hole", row);
      const e = carrierPose(2, "electron", row);
      expect(h.x).toBe(MEET_X[row]);
      expect(e.x).toBe(MEET_X[row]);
      expect(h.opacity).toBe(0);
      expect(e.opacity).toBe(0);
    }
  });

  it("leaves equal and opposite uncovered charge: negative on the p-side, positive on the n-side", () => {
    expect(uncoveredCharge(0)).toEqual({ p: 0, n: 0 });
    const q = uncoveredCharge(last);
    expect(q.p).toBeLessThan(0);
    expect(q.n).toBeGreaterThan(0);
    expect(q.p + q.n).toBe(0);
  });

  it("draws the layer round the junction, covering the two columns next to it", () => {
    expect(LAYER.left).toBeLessThan(P_COLUMNS[3]);
    expect(LAYER.left).toBeGreaterThan(P_COLUMNS[2] + 10);
    expect(LAYER.right).toBeGreaterThan(N_COLUMNS[0] + 10);
    expect(LAYER.right).toBeLessThan(N_COLUMNS[1]);
    expect(layerShown(last)).toBe(true);
    expect(layerShown(1)).toBe(false);
  });

  it("points the field from n to p (right to left), shown only at the end (the trap reverses it)", () => {
    expect(FIELD.from.x).toBeGreaterThan(JUNCTION_X);
    expect(FIELD.to.x).toBeLessThan(JUNCTION_X);
    expect(fieldShown(last)).toBe(true);
    expect(fieldShown(last - 1)).toBe(false);
    expect(DEPLETION_STEPS[last].caption).toMatch(/n-side is at the higher potential/);
  });
});

describe("forward and reverse bias (cetp-biasing)", () => {
  it("joins the p-side to + in forward bias and to − in reverse bias", () => {
    expect(BIAS.forward.pTerminal).toBe("+");
    expect(BIAS.reverse.pTerminal).toBe("−");
  });

  it("narrows the layer in forward bias and widens it in reverse bias", () => {
    expect(BIAS.forward.width).toBeLessThan(UNBIASED_WIDTH);
    expect(BIAS.reverse.width).toBeGreaterThan(UNBIASED_WIDTH);
  });

  it("lets current through only in forward bias", () => {
    expect(BIAS.forward.currentFlows).toBe(true);
    expect(BIAS.reverse.currentFlows).toBe(false);
  });

  it("follows the concept's examples, minus signs included", () => {
    expect(biasOf(2, 5)).toBe("reverse"); // p at 2 V, n at 5 V
    expect(biasOf(-2, 0)).toBe("reverse");
    expect(biasOf(-1.0, -1.5)).toBe("forward"); // −1.0 V is higher than −1.5 V
  });
});

describe("half-wave and full-wave rectifiers (cetp-rectifiers)", () => {
  it("uses the worked example: 60 Hz in gives 60 Hz half-wave and 120 Hz full-wave", () => {
    expect(RECT_EXAMPLE.f).toBe(60);
    expect(outputFrequency("half", 60)).toBe(60);
    expect(outputFrequency("full", 60)).toBe(120);
    expect(PULSES_PER_CYCLE).toEqual({ half: 1, full: 2 });
  });

  it("passes only the positive halves (half-wave) and turns the negative halves over (full-wave)", () => {
    for (let k = 0; k < 40; k++) {
      const t = k / 40 + 0.0125;
      const v = inputAt(t);
      expect(outputAt("half", t)).toBeCloseTo(Math.max(v, 0));
      expect(outputAt("full", t)).toBeCloseTo(Math.abs(v));
      expect(outputAt("half", t)).toBeGreaterThanOrEqual(0);
    }
    expect(inputAt(0.75)).toBeCloseTo(-1);
    expect(outputAt("half", 0.75)).toBe(0);
    expect(outputAt("full", 0.75)).toBeCloseTo(1);
  });

  it("ends with the negative halves squashed away (half-wave) and pointing up (full-wave)", () => {
    const last = RECT_STEPS.length - 1;
    for (const i of [1, 3]) {
      expect(lobePose(last, "half", i).opacity).toBe(0);
      expect(lobePose(last, "full", i)).toEqual({ sy: 1, opacity: 1 });
      expect(lobePose(0, "full", i).sy).toBe(-1); // before rectifying, the negative half points down
    }
    for (const i of [0, 2]) {
      expect(lobePose(last, "half", i)).toEqual({ sy: 1, opacity: 1 });
      expect(lobePose(last, "full", i)).toEqual({ sy: 1, opacity: 1 });
    }
  });

  it("states both frequencies in its captions", () => {
    const text = RECT_STEPS.map((s) => s.caption).join(" ");
    expect(text).toMatch(/f = 60 Hz/);
    expect(text).toMatch(/2f = 120 Hz/);
  });
});

describe("photoelectric threshold slider (cetp-dn-einstein-equation)", () => {
  it("opens on the worked example: 248 nm is 1240/248 = 5.0 eV", () => {
    expect(photonEnergyEv(WORKED.lambdaNm)).toBeCloseTo(5.0, 6);
    expect(START_TENTHS).toBe(50);
    expect(WORKED.phiTenths).toBe(20);
  });

  it("gives eV₀ = 5.0 − 2.0 = 3.0 eV there", () => {
    expect(kMaxTenths(50, 20)).toBe(30);
  });

  it("releases no electron below the threshold, and one with K = 0 exactly at it", () => {
    expect(kMaxTenths(19, 20)).toBeNull();
    expect(kMaxTenths(E_RANGE.min, 20)).toBeNull();
    expect(kMaxTenths(20, 20)).toBe(0);
  });

  it("puts the threshold at 1240/2.0 = 620 nm", () => {
    expect(wavelengthNm(2.0)).toBeCloseTo(620, 6);
  });

  it("spans both sides of the threshold", () => {
    expect(E_RANGE.min).toBeLessThan(20);
    expect(E_RANGE.max).toBeGreaterThan(50);
  });
});

describe("photoelectric graphs (cetp-dn-photoelectric-graphs)", () => {
  it("graph 1: same frequency, so one cut-off; different intensities, so different saturation", () => {
    const [a, b] = SAME_FREQUENCY;
    expect(a.v0).toBe(b.v0);
    expect(a.saturation).not.toBe(b.saturation);
    expect(photocurrent(-a.v0, a.v0, a.saturation)).toBe(0);
    expect(photocurrent(-b.v0, b.v0, b.saturation)).toBe(0);
  });

  it("graph 2 is the worked example: cut-offs at −2 V and −1 V, one saturation current", () => {
    expect(SAME_INTENSITY.map((c) => c.v0)).toEqual([2, 1]);
    expect(SAME_INTENSITY[0].saturation).toBe(SAME_INTENSITY[1].saturation);
    expect(SAME_INTENSITY[0].label).toBe("higher ν"); // the −2 V curve
    for (const c of SAME_INTENSITY) {
      expect(photocurrent(-c.v0 - 0.1, c.v0, c.saturation)).toBe(0);
      expect(photocurrent(4, c.v0, c.saturation)).toBeGreaterThan(0.98 * c.saturation);
    }
  });

  it("graph 3: slope h/e ≈ 4.1 × 10⁻¹⁵ V s for both metals", () => {
    expect(H_OVER_E).toBeCloseTo(4.125e-15, 18);
    for (const m of METALS) {
      const nu0 = thresholdFrequency(m.phiEv);
      const slope = (stoppingPotential(nu0 + 2e14, m.phiEv) - stoppingPotential(nu0 + 1e14, m.phiEv)) / 1e14;
      expect(slope).toBeCloseTo(H_OVER_E, 18);
    }
  });

  it("graph 3: each line cuts the axis at its threshold, the larger φ further right", () => {
    const [n1, n2] = METALS.map((m) => thresholdFrequency(m.phiEv));
    expect(n1 / 1e14).toBeCloseTo(4.85, 2); // 2.0 × 1.6e-19 / 6.6e-34
    expect(n2 / 1e14).toBeCloseTo(9.7, 2);
    expect(n2).toBeGreaterThan(n1);
    expect(stoppingPotential(n1, METALS[0].phiEv)).toBeCloseTo(0, 9);
    expect(stoppingPotential(16e14, METALS[0].phiEv)).toBeCloseTo(4.6, 6); // 6.6 − 2.0
  });
});

describe("hydrogen series (cetp-an-series-limits)", () => {
  it("draws the levels with Eₙ = −13.6/n² eV, in order of energy", () => {
    expect(levelEnergy(1)).toBeCloseTo(-13.6);
    expect(levelEnergy(2)).toBeCloseTo(-3.4);
    expect(levelEnergy(3)).toBeCloseTo(-1.511, 3);
    expect(levelEnergy(Infinity)).toBe(0);
    for (let i = 1; i < LEVEL_Y.length; i++) {
      expect(levelEnergy(LEVEL_Y[i].n)).toBeLessThan(levelEnergy(LEVEL_Y[i - 1].n));
      expect(LEVEL_Y[i].y).toBeGreaterThan(LEVEL_Y[i - 1].y); // lower energy drawn lower
    }
  });

  it("names Lyman, Balmer and Paschen with n_f = 1, 2, 3 and their regions", () => {
    expect(SERIES.map((s) => [s.name, s.nf, s.region])).toEqual([
      ["Lyman", 1, "ultraviolet"],
      ["Balmer", 2, "visible"],
      ["Paschen", 3, "infrared"],
    ]);
    expect(ARROWS.map((a) => a.nf)).toEqual([1, 2, 3]);
  });

  it("gives the Balmer limit as 4/R ≈ 365 nm, the worked example", () => {
    expect(Math.round(limitNm(2))).toBe(365);
  });

  it("makes the limit the SHORTEST wavelength and the first line the longest of each series", () => {
    for (const s of SERIES) {
      expect(limitNm(s.nf)).toBeLessThan(firstLineNm(s.nf));
    }
  });

  it("matches the concept's ratios: Lyman max/min = 4 : 3, limits Lyman/Balmer = 1/4, Paschen/Balmer = 9/4", () => {
    expect(firstLineNm(1) / limitNm(1)).toBeCloseTo(4 / 3, 9);
    expect(limitNm(1) / limitNm(2)).toBeCloseTo(1 / 4, 9);
    expect(limitNm(3) / limitNm(2)).toBeCloseTo(9 / 4, 9);
  });

  it("prints the standard values: 122, 91, 656, 365, 1875, 820 nm", () => {
    expect([1, 2, 3].map((nf) => [Math.round(firstLineNm(nf)), Math.round(limitNm(nf))])).toEqual([
      [122, 91],
      [656, 365],
      [1875, 820],
    ]);
  });
});
