import { describe, expect, it } from "vitest";
import { CARDIAC_PHASES, flows, valveOpen, valves } from "../src/app/notes/_components/visualizations/ImatCardiacCycle";
import { BOXES, VESSELS, arrowAt, onBorder } from "../src/app/notes/_components/visualizations/ImatDoubleCirculation";
import { AP_POINTS, AP_VALUES, potentialAt, tracePath } from "../src/app/notes/_components/visualizations/ImatActionPotential";
import {
  CA_CHANNELS,
  ENZYMES,
  POST_MEMBRANE_Y,
  PRE_MEMBRANE_Y,
  RECEPTORS,
  SYNAPSE_STEPS,
  achPose,
  caPose,
  naPose,
  vesiclePose,
} from "../src/app/notes/_components/visualizations/ImatSynapse";
import {
  CONTRACTED_UM,
  K,
  RELAXED_UM,
  THICK_UM,
  THIN_UM,
  bands,
  geometry,
  sarcomereLength,
} from "../src/app/notes/_components/visualizations/ImatSarcomere";
import {
  ACTIN_Y,
  BINDING_SITES,
  COCKED,
  CROSS_BRIDGE_STEPS,
  STROKE,
  actinShift,
  caPose as xbCaPose,
  headCentre,
  headPose,
  tropomyosinOffset,
  TROPONINS,
} from "../src/app/notes/_components/visualizations/ImatCrossBridge";
import {
  LUNGS_KPA,
  P50_BOHR,
  P50_NORMAL,
  TISSUE_KPA,
  saturation,
} from "../src/app/notes/_components/visualizations/ImatOxygenDissociation";

// IMAT human anatomy and physiology figures (scripts/imat/NOTES_VISUALS_BRIEF.md).
// Each block pins what makes its figure TRUE to the concept it illustrates
// (src/lib/sites/imat/notes/biology/human-anatomy-physiology/).

describe("cardiac cycle animation (imat-hap-cardiac-cycle)", () => {
  it("walks the concept's five phases, in its order", () => {
    expect(CARDIAC_PHASES.map((p) => p.title)).toEqual([
      "Atrial systole",
      "Start of ventricular systole",
      "Ventricular ejection",
      "Start of ventricular diastole",
      "Passive filling",
    ]);
  });

  it("uses the concept's valve rule: open when upstream pressure is higher", () => {
    expect(valveOpen(10, 8)).toBe(true);
    expect(valveOpen(50, 80)).toBe(false);
  });

  it("works out every valve to match the concept's table", () => {
    expect(CARDIAC_PHASES.map((p) => valves(p).av)).toEqual([true, false, false, false, true]);
    expect(CARDIAC_PHASES.map((p) => valves(p).semilunar)).toEqual([false, false, true, false, false]);
  });

  it("closes all four valves just after the ventricles start contracting (the self-check answer)", () => {
    expect(valves(CARDIAC_PHASES[1])).toEqual({ av: false, semilunar: false });
  });

  it("never shows an AV valve open while its ventricle contracts (the trap)", () => {
    for (const p of CARDIAC_PHASES) if (p.ventricles === "contract") expect(valves(p).av).toBe(false);
  });

  it("contracts the atria only in atrial systole, and the ventricles in systole only", () => {
    expect(CARDIAC_PHASES.map((p) => p.atria)).toEqual(["contract", "relaxed", "relaxed", "relaxed", "relaxed"]);
    expect(CARDIAC_PHASES.map((p) => p.ventricles)).toEqual(["relaxed", "contract", "contract", "relaxed", "relaxed"]);
  });

  it("peaks at about 120 mmHg in the left ventricle, in ejection", () => {
    const peak = Math.max(...CARDIAC_PHASES.map((p) => p.pressure.ventricle));
    expect(peak).toBe(120);
    expect(CARDIAC_PHASES[2].pressure.ventricle).toBe(120);
    expect(CARDIAC_PHASES[2].note).toMatch(/120 mmHg/);
    expect(CARDIAC_PHASES[2].note).toMatch(/25 mmHg/);
  });

  it("lets blood leave the ventricles only in ejection, and fills the atria while the ventricles contract", () => {
    expect(CARDIAC_PHASES.map((p) => flows(p).ventriclesToArteries)).toEqual([false, false, true, false, false]);
    expect(flows(CARDIAC_PHASES[2]).veinsToAtria).toBe(true);
  });

  it("puts the first sound on AV closure and the second on semilunar closure", () => {
    expect(CARDIAC_PHASES[1].note).toMatch(/First heart sound \(lub\): AV valves close/);
    expect(CARDIAC_PHASES[3].note).toMatch(/Second heart sound \(dub\): semilunar valves close/);
  });

  it("says atria, never auricles", () => {
    for (const p of CARDIAC_PHASES) expect(`${p.title} ${p.caption} ${p.note}`).not.toMatch(/auricle/i);
  });
});

describe("double circulation diagram (imat-hap-vessels)", () => {
  const byName = Object.fromEntries(VESSELS.map((v) => [v.name, v]));

  it("draws every vessel from the box it leaves to the box it enters", () => {
    for (const v of VESSELS) {
      expect(onBorder(v.points[0], BOXES[v.from])).toBe(true);
      expect(onBorder(v.points[v.points.length - 1], BOXES[v.to])).toBe(true);
    }
  });

  it("follows the concept's two circuits", () => {
    expect([byName["Pulmonary artery"].from, byName["Pulmonary artery"].to, byName["Pulmonary veins"].to]).toEqual([
      "rightVentricle",
      "lungs",
      "leftAtrium",
    ]);
    expect([byName["Aorta"].from, byName["Aorta"].to, byName["Venae cavae"].to]).toEqual(["leftVentricle", "body", "rightAtrium"]);
  });

  it("has arteries leave ventricles and veins enter atria (direction, not oxygen)", () => {
    for (const v of VESSELS) {
      if (v.kind === "artery") expect(v.from).toMatch(/Ventricle$/);
      else expect(v.to).toMatch(/Atrium$/);
    }
  });

  it("gives each vessel the oxygen content in the concept's table, including the pulmonary artery trap", () => {
    expect(byName["Pulmonary artery"].oxygen).toBe("low");
    expect(byName["Pulmonary veins"].oxygen).toBe("high");
    expect(byName["Aorta"].oxygen).toBe("high");
    expect(byName["Venae cavae"].oxygen).toBe("low");
  });

  it("points each arrow downstream", () => {
    expect(arrowAt(byName["Pulmonary artery"].points).angle).toBeCloseTo(-90); // up, to the lungs
    expect(arrowAt(byName["Venae cavae"].points).angle).toBeCloseTo(-90); // up, from the body
    expect(arrowAt(byName["Aorta"].points).angle).toBeCloseTo(90); // down, to the body
  });
});

describe("action potential diagram (imat-hap-action-potential)", () => {
  const samples = Array.from({ length: 5001 }, (_, i) => potentialAt((i / 5000) * AP_POINTS[AP_POINTS.length - 1].t));

  it("uses the concept's values: rest -70, threshold -55, peak +30, hyperpolarisation -80 mV", () => {
    expect(AP_VALUES).toEqual({ rest: -70, threshold: -55, peak: 30, hyperpolarised: -80 });
  });

  it("peaks at exactly +30 mV and dips to exactly -80 mV (no overshoot of the smooth curve)", () => {
    expect(Math.max(...samples)).toBeCloseTo(30, 6);
    expect(Math.min(...samples)).toBeCloseTo(-80, 6);
  });

  it("starts and ends at the resting potential, and passes through every key point", () => {
    expect(samples[0]).toBeCloseTo(-70);
    expect(samples[samples.length - 1]).toBeCloseTo(-70);
    for (const p of AP_POINTS) expect(potentialAt(p.t)).toBeCloseTo(p.v, 6);
  });

  it("orders the phases: threshold, peak, back to rest, hyperpolarisation, rest", () => {
    const t = (v: number) => AP_POINTS.find((p) => p.v === v)!.t;
    expect(t(AP_VALUES.threshold)).toBeLessThan(t(AP_VALUES.peak));
    expect(t(AP_VALUES.peak)).toBeLessThan(t(AP_VALUES.hyperpolarised));
    for (let i = 1; i < AP_POINTS.length; i++) expect(AP_POINTS[i].t).toBeGreaterThan(AP_POINTS[i - 1].t);
  });

  it("draws a valid path", () => {
    expect(tracePath()).not.toMatch(/NaN/);
  });
});

describe("synapse animation (imat-hap-synapse)", () => {
  it("follows the concept's six steps, in its order", () => {
    const words = [/action potential arrives/i, /Ca²⁺ channels open/, /exocytosis/, /binds receptors/, /Na⁺ enters/, /Acetylcholinesterase hydrolyses ACh/];
    SYNAPSE_STEPS.forEach((s, i) => expect(s.caption).toMatch(words[i]));
    expect(SYNAPSE_STEPS).toHaveLength(6);
  });

  it("keeps vesicles of ACh in the presynaptic knob only, and receptors on the postsynaptic membrane only", () => {
    for (const i of [0, 1, 2]) {
      expect(vesiclePose(0, i).y).toBeLessThan(PRE_MEMBRANE_Y);
      for (const k of [0, 1] as const) expect(achPose(0, i, k).y).toBeLessThan(PRE_MEMBRANE_Y);
    }
    for (const r of RECEPTORS) expect(r.y).toBe(POST_MEMBRANE_Y);
    for (const c of CA_CHANNELS) expect(c.y).toBe(PRE_MEMBRANE_Y);
  });

  it("lets Ca²⁺ into the knob from step 2 on, never before", () => {
    for (const j of [0, 1, 2, 3]) {
      expect(caPose(0, j).y).toBeGreaterThan(PRE_MEMBRANE_Y);
      for (const step of [1, 2, 3, 4, 5]) expect(caPose(step, j).y).toBeLessThan(PRE_MEMBRANE_Y);
    }
  });

  it("releases ACh into the cleft, then has it bound at the receptors", () => {
    for (const i of [0, 1, 2]) {
      for (const k of [0, 1] as const) {
        const released = achPose(2, i, k);
        expect(released.y).toBeGreaterThan(PRE_MEMBRANE_Y);
        expect(released.y).toBeLessThan(POST_MEMBRANE_Y);
        for (const step of [3, 4]) {
          const bound = achPose(step, i, k);
          expect(Math.abs(bound.x - RECEPTORS[i].x)).toBeLessThanOrEqual(5);
          expect(POST_MEMBRANE_Y - bound.y).toBeLessThanOrEqual(6);
        }
      }
    }
  });

  it("brings Na⁺ into the postsynaptic cell only once ACh is bound (step 5)", () => {
    for (const j of [0, 1, 2, 3]) {
      for (const step of [0, 1, 2, 3]) {
        expect(naPose(step, j).y).toBeGreaterThan(PRE_MEMBRANE_Y);
        expect(naPose(step, j).y).toBeLessThan(POST_MEMBRANE_Y);
      }
      expect(naPose(4, j).y).toBeGreaterThan(POST_MEMBRANE_Y);
    }
  });

  it("ends with ACh at acetylcholinesterase, broken down", () => {
    for (const i of [0, 1, 2]) {
      for (const k of [0, 1] as const) {
        const p = achPose(5, i, k);
        expect(Math.min(...ENZYMES.map((e) => Math.hypot(e.x - p.x, e.y - p.y)))).toBeLessThanOrEqual(6);
        expect(p.opacity).toBeLessThan(1);
      }
    }
  });
});

describe("sarcomere slider (imat-hap-sarcomere)", () => {
  const cs = Array.from({ length: 21 }, (_, i) => i * 5);

  it("runs from relaxed (3.0 µm) to the thin filaments meeting at the centre (2.0 µm)", () => {
    expect(sarcomereLength(0)).toBe(RELAXED_UM);
    expect(sarcomereLength(100)).toBe(CONTRACTED_UM);
    expect(CONTRACTED_UM).toBe(2 * THIN_UM);
  });

  it("keeps the A band the same while the I band and H zone shrink and the sarcomere shortens", () => {
    let prev = bands(sarcomereLength(0));
    for (const c of cs.slice(1)) {
      const b = bands(sarcomereLength(c));
      expect(b.aBand).toBe(THICK_UM);
      expect(b.sarcomere).toBeLessThan(prev.sarcomere);
      expect(b.iBand).toBeLessThan(prev.iBand);
      expect(b.hZone).toBeLessThanOrEqual(prev.hZone);
      prev = b;
    }
  });

  it("computes the bands from the filament lengths: I = S - A, H = S - 2 x thin (never below 0)", () => {
    expect(bands(3)).toEqual({ sarcomere: 3, aBand: 1.6, iBand: 1.4, hZone: 1 });
    expect(bands(2.6)).toEqual({ sarcomere: 2.6, aBand: 1.6, iBand: 1, hZone: 0.6 });
    expect(bands(2)).toEqual({ sarcomere: 2, aBand: 1.6, iBand: 0.4, hZone: 0 });
  });

  it("draws filaments that never change length, and bands that match the numbers", () => {
    for (const c of cs) {
      const s = sarcomereLength(c);
      const g = geometry(s);
      const b = bands(s);
      expect(g.thickEnd - g.thickStart).toBeCloseTo(THICK_UM * K, 1);
      expect(g.thinLeftEnd - g.zLeft).toBeCloseTo(THIN_UM * K, 1);
      expect(g.zRight - g.thinRightStart).toBeCloseTo(THIN_UM * K, 1);
      expect(g.zRight - g.zLeft).toBeCloseTo(s * K, 1);
      expect((2 * (g.thickStart - g.zLeft)) / K).toBeCloseTo(b.iBand, 1);
      expect(Math.max(0, g.thinRightStart - g.thinLeftEnd) / K).toBeCloseTo(b.hZone, 1);
    }
  });
});

describe("cross-bridge cycle animation (imat-hap-contraction)", () => {
  const steps = [0, 1, 2, 3, 4, 5];
  // Where the head's centre is, or would be once it reaches out to bind (a detached head is drawn shorter).
  const facesSite = (step: number) => {
    const c = headCentre({ ...headPose(step), sx: 1 });
    return BINDING_SITES.some((s) => Math.abs(s + actinShift(step) - c.x) < 0.5);
  };

  it("follows the concept's steps 3 to 8, in its order", () => {
    expect(CROSS_BRIDGE_STEPS.map((s) => s.title)).toEqual([
      "Calcium released",
      "Calcium binds troponin",
      "Cross-bridge forms",
      "Power stroke",
      "ATP binds, head detaches",
      "Head re-cocks",
    ]);
    expect(CROSS_BRIDGE_STEPS[1].caption).toMatch(/Ca²⁺ binds troponin/);
    expect(CROSS_BRIDGE_STEPS[3].caption).toMatch(/ADP and phosphate are released/);
    expect(CROSS_BRIDGE_STEPS[4].caption).toMatch(/new ATP binds the head, which detaches/);
  });

  it("covers the binding sites until Ca²⁺ is on troponin", () => {
    expect(tropomyosinOffset(0)).toBe(0);
    for (const s of steps.slice(1)) {
      expect(tropomyosinOffset(s)).toBeLessThan(0);
      expect(xbCaPose(s, 0).x).toBeCloseTo(TROPONINS[0] + actinShift(s));
    }
  });

  it("binds the head to a binding site only in the cross-bridge and power-stroke steps", () => {
    expect(steps.map((s) => headPose(s).bound)).toEqual([false, false, true, true, false, false]);
    for (const s of [2, 3]) {
      expect(facesSite(s)).toBe(true);
      expect(headCentre(headPose(s)).y - ACTIN_Y).toBeLessThan(16);
    }
    for (const s of [0, 1, 4, 5]) expect(headCentre(headPose(s)).y - ACTIN_Y).toBeGreaterThan(18);
  });

  it("moves actin towards the centre in the power stroke only, by one stroke", () => {
    expect(steps.map(actinShift)).toEqual([0, 0, 0, STROKE, STROKE, STROKE]);
    expect(STROKE).toBeGreaterThan(0);
    expect(STROKE).toBeCloseTo(52, 6); // 2 x 52 x cos 60°
  });

  it("carries ADP + Pi until the power stroke, ATP exactly when the head detaches", () => {
    expect(steps.map((s) => headPose(s).carries)).toEqual(["ADP+Pi", "ADP+Pi", "ADP+Pi", "none", "ATP", "ADP+Pi"]);
  });

  it("re-cocks the head to face the NEXT binding site along", () => {
    expect(headPose(5).angle).toBe(COCKED);
    expect(facesSite(5)).toBe(true);
  });
});

describe("oxygen dissociation curve (imat-hap-gas-transport)", () => {
  const ps = Array.from({ length: 141 }, (_, i) => (i / 140) * 14);

  it("is about 97% saturated at the lungs (13 kPa)", () => {
    expect(Math.round(saturation(LUNGS_KPA, P50_NORMAL))).toBe(97);
  });

  it("marks 71% (normal) and 53% (Bohr-shifted) at the tissues (5 kPa)", () => {
    expect(Math.round(saturation(TISSUE_KPA, P50_NORMAL))).toBe(71);
    expect(Math.round(saturation(TISSUE_KPA, P50_BOHR))).toBe(53);
  });

  it("shifts the curve right: less saturated at every partial pressure, half-saturated at a higher one", () => {
    expect(P50_BOHR).toBeGreaterThan(P50_NORMAL);
    expect(saturation(P50_NORMAL, P50_NORMAL)).toBeCloseTo(50);
    for (const p of ps.slice(1)) expect(saturation(p, P50_BOHR)).toBeLessThan(saturation(p, P50_NORMAL));
  });

  it("is S-shaped: rising everywhere, curving up at low pressure and down at high pressure", () => {
    for (let i = 1; i < ps.length; i++) expect(saturation(ps[i], P50_NORMAL)).toBeGreaterThan(saturation(ps[i - 1], P50_NORMAL));
    const second = (p: number) => saturation(p + 0.1, P50_NORMAL) - 2 * saturation(p, P50_NORMAL) + saturation(p - 0.1, P50_NORMAL);
    expect(second(1)).toBeGreaterThan(0);
    expect(second(8)).toBeLessThan(0);
  });
});
