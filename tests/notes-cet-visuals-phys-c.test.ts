import { describe, expect, it } from "vitest";
import {
  LCR_EXAMPLE,
  LCR_HEADINGS,
  LCR_STEPS,
  ORIGIN,
  SCALE,
  phaseAngleDeg,
  phasorPose,
  supplyVoltage,
  tipOf,
} from "../src/app/notes/_components/visualizations/CetLcrPhasors";
import {
  DEFAULT_R,
  I_AXIS_MAX,
  RES_CIRCUIT,
  R_RANGE,
  currentAt,
  curvePoints,
  peakWidth,
  resonantFrequency,
} from "../src/app/notes/_components/visualizations/CetResonanceCurve";
import {
  LENZ_STATES,
  LENZ_STEPS,
  currentArc,
  faceFromCurrent,
  lenzResponse,
} from "../src/app/notes/_components/visualizations/CetLenzMagnetCoil";
import {
  BLOCK_V,
  RADIUS_RATIOS,
  areaRatio,
  narrowSpeed,
  ratioLabel,
} from "../src/app/notes/_components/visualizations/CetContinuityPipe";
import {
  CENTRE,
  DEFAULT_THETA,
  HALF_LEN,
  PE,
  P_MOMENT,
  chargePositions,
  dipoleState,
  energy,
  gaugeY,
  torque,
  workToTurn,
} from "../src/app/notes/_components/visualizations/CetDipoleTorque";
import {
  BODIES,
  DISC_EXAMPLE,
  UNIT,
  barSegments,
  rollingKE,
  shares,
  totalInHalfMv2,
} from "../src/app/notes/_components/visualizations/CetRollingEnergySplit";

// MHT-CET Physics notes figures, task phys-c (scripts/notes/CET_VISUALS_BRIEF.md).
// Each figure draws its concept's own numbers, so those numbers are pinned here.

const close = (a: { x: number; y: number }, b: { x: number; y: number }, digits = 6) => {
  expect(a.x).toBeCloseTo(b.x, digits);
  expect(a.y).toBeCloseTo(b.y, digits);
};

describe("series LCR phasors (cetp-phasor-voltages)", () => {
  it("uses the worked example: 30, 90 and 50 V give a 50 V supply, not 170 V", () => {
    expect(LCR_EXAMPLE).toEqual({ VR: 30, VL: 90, VC: 50 });
    expect(supplyVoltage(30, 90, 50)).toBeCloseTo(50, 9); // √(30² + 40²) = √2500
    expect(supplyVoltage(30, 90, 50)).not.toBeCloseTo(30 + 90 + 50, 0);
    // The practice item: 40, 80, 40 V gives 40√2 V.
    expect(supplyVoltage(40, 80, 40)).toBeCloseTo(40 * Math.SQRT2, 9);
  });

  it("puts the voltage ahead of the current by φ = atan(40/30) ≈ 53°", () => {
    expect(phaseAngleDeg(30, 90, 50)).toBeCloseTo((Math.atan(4 / 3) * 180) / Math.PI, 9);
    expect(phaseAngleDeg(30, 90, 50).toFixed(0)).toBe("53");
    expect(phaseAngleDeg(30, 50, 90)).toBeLessThan(0); // X_C larger: the voltage lags
  });

  it("walks the steps in order: V_R, V_L ahead, V_C behind, combine, resultant", () => {
    // Step titles are plain text (step list, print), so they use words; the
    // picture's own heading draws the subscripts.
    expect(LCR_STEPS.map((s) => s.title)).toEqual([
      "The resistor's voltage, along the current",
      "The inductor's voltage, 90° ahead",
      "The capacitor's voltage, 90° behind",
      "Combine the inductor and capacitor voltages",
      "The resultant V",
    ]);
    expect(LCR_HEADINGS).toEqual(["V_R along the current", "V_L 90° ahead", "V_C 90° behind", "Combine V_L − V_C", "The resultant V"]);
    for (const s of LCR_STEPS) expect(`${s.title} ${s.caption}`).not.toMatch(/_/);
    expect(LCR_STEPS[4].caption).toContain("50 V");
    expect(LCR_STEPS[4].caption).toContain("53°");
  });

  it("draws V_R along the current, V_L 90° ahead (up) and V_C 90° behind (down)", () => {
    expect(phasorPose("VR", 0).angle).toBe(0);
    expect(phasorPose("VL", 1).angle).toBe(-90);
    expect(phasorPose("VC", 2).angle).toBe(90);
    expect(phasorPose("VL", 1).len).toBeCloseTo(90 * SCALE);
    expect(phasorPose("VC", 2).len).toBeCloseTo(50 * SCALE);
  });

  it("takes V_C off the tip of V_L, leaving 40 V upward", () => {
    const vc = phasorPose("VC", 3);
    expect(vc.y).toBeCloseTo(ORIGIN.y - 90 * SCALE);
    expect(tipOf(vc).y).toBeCloseTo(ORIGIN.y - 40 * SCALE);
    expect(phasorPose("NET", 3).len).toBeCloseTo(40 * SCALE);
    expect(phasorPose("NET", 3).angle).toBe(-90);
  });

  it("closes the triangle: V_L − V_C at the tip of V_R ends where V ends", () => {
    const net = phasorPose("NET", 4);
    close({ x: net.x, y: net.y }, tipOf(phasorPose("VR", 4)));
    close(tipOf(net), tipOf(phasorPose("V", 4)));
    expect(phasorPose("V", 4).len).toBeCloseTo(50 * SCALE);
  });

  it("shows V only in the last step, and every phasor there (the overview)", () => {
    for (const s of [0, 1, 2, 3]) expect(phasorPose("V", s).opacity).toBe(0);
    for (const n of ["VR", "VL", "VC", "NET", "V"] as const) expect(phasorPose(n, 4).opacity).toBeGreaterThan(0);
  });
});

describe("resonance curve (cetp-resonance-behaviour)", () => {
  const f0 = resonantFrequency(RES_CIRCUIT.L, RES_CIRCUIT.C);

  it("uses L = 0.4 H, C = 10 μF (f₀ ≈ 79.6 Hz) and the worked example R = 40 Ω on 200 V", () => {
    expect(f0).toBeCloseTo(1 / (2 * Math.PI * 2e-3), 9);
    expect(f0.toFixed(1)).toBe("79.6");
    expect(DEFAULT_R).toBe(40);
    expect(RES_CIRCUIT.V).toBe(200);
    expect(currentAt(f0, 40)).toBeCloseTo(5, 9); // Z = R, I = 200/40
  });

  it("peaks at f₀ for every R on the slider, with I = V/R there", () => {
    for (const R of [R_RANGE.min, 40, 100, R_RANGE.max]) {
      expect(currentAt(f0, R)).toBeCloseTo(200 / R, 9);
      for (const p of curvePoints(R)) expect(p.i).toBeLessThanOrEqual(200 / R + 1e-9);
      expect(currentAt(f0 * 0.7, R)).toBeLessThan(200 / R);
      expect(currentAt(f0 * 1.3, R)).toBeLessThan(200 / R);
    }
  });

  it("never passes more current than R alone (Z ≥ R)", () => {
    for (const p of curvePoints(40)) expect(p.i).toBeLessThanOrEqual(5 + 1e-9);
  });

  it("gives a taller, narrower peak for a smaller R", () => {
    expect(currentAt(f0, 20)).toBeGreaterThan(currentAt(f0, 80));
    expect(peakWidth(20)).toBeLessThan(peakWidth(80));
  });

  it("has width R/(2πL) between the frequencies where I = I_max/√2", () => {
    for (const R of [20, 40, 200]) {
      const g = R / (2 * RES_CIRCUIT.L);
      const w0sq = 1 / (RES_CIRCUIT.L * RES_CIRCUIT.C);
      const f1 = (-g + Math.sqrt(g * g + w0sq)) / (2 * Math.PI);
      const f2 = (g + Math.sqrt(g * g + w0sq)) / (2 * Math.PI);
      expect(currentAt(f1, R)).toBeCloseTo(200 / R / Math.SQRT2, 9);
      expect(currentAt(f2, R)).toBeCloseTo(200 / R / Math.SQRT2, 9);
      expect(f2 - f1).toBeCloseTo(peakWidth(R), 9);
    }
    expect(peakWidth(40).toFixed(1)).toBe("15.9");
  });

  it("keeps the tallest peak on the axis", () => {
    expect(200 / R_RANGE.min).toBeLessThanOrEqual(I_AXIS_MAX);
  });
});

describe("Lenz's law, magnet and coil (cetp-emi-lenz)", () => {
  it("N pole moving in: flux rises, anticlockwise from the magnet's side, near face N, repels", () => {
    expect(lenzResponse("in")).toEqual({ flux: "rising", current: "anticlockwise", face: "N", force: "repels" });
  });

  it("N pole moving away: flux falls, clockwise, near face S, attracts the magnet back", () => {
    expect(lenzResponse("out")).toEqual({ flux: "falling", current: "clockwise", face: "S", force: "attracts" });
  });

  it("no change in flux, no current (it opposes the change, not the flux)", () => {
    expect(lenzResponse("still")).toEqual({ flux: "steady", current: null, face: null, force: null });
  });

  it("keeps the face, the current and the force consistent", () => {
    for (const m of ["in", "out"] as const) {
      const r = lenzResponse(m);
      expect(r.face).toBe(faceFromCurrent(r.current!));
      // The magnet's N pole faces the coil: like poles repel, unlike attract.
      expect(r.force).toBe(r.face === "N" ? "repels" : "attracts");
    }
  });

  it("moves the magnet in, stops it, then takes it away, in that order", () => {
    expect(LENZ_STEPS.map((s) => s.title)).toEqual(["Magnet at rest", "N pole moves in", "Magnet stops", "N pole moves away", "The rule"]);
    expect(LENZ_STATES.map((s) => s.motion)).toEqual(["still", "in", "still", "out", null]);
    expect(LENZ_STATES[1].magnetX).toBeGreaterThan(LENZ_STATES[0].magnetX);
    expect(LENZ_STATES[2].magnetX).toBe(LENZ_STATES[1].magnetX);
    expect(LENZ_STATES[3].magnetX).toBeLessThan(LENZ_STATES[2].magnetX);
  });

  it("draws the current arrows turning the right way on screen", () => {
    const cross = (dir: "anticlockwise" | "clockwise") => {
      const a = currentArc(dir, 100, 100, 20);
      const rel = { x: a.end.x - 100, y: a.end.y - 100 };
      expect(Math.hypot(rel.x, rel.y)).toBeCloseTo(20, 1);
      expect(rel.x * a.tangent.x + rel.y * a.tangent.y).toBeCloseTo(0, 1); // tangent, not radial
      return rel.x * a.tangent.y - rel.y * a.tangent.x;
    };
    // With y pointing down, anticlockwise motion has a negative cross product.
    expect(cross("anticlockwise")).toBeLessThan(0);
    expect(cross("clockwise")).toBeGreaterThan(0);
    expect(currentArc("anticlockwise", 100, 100, 20).d).toContain(" 0 1 0 ");
    expect(currentArc("clockwise", 100, 100, 20).d).toContain(" 0 1 1 ");
  });
});

describe("continuity in a narrowing pipe (cetp-fl-continuity)", () => {
  it("opens on the self-check: radius R/3, a ninth of the area, speed 9V (not 3V)", () => {
    expect(RADIUS_RATIOS[0]).toBeCloseTo(1 / 3, 12);
    expect(ratioLabel(RADIUS_RATIOS[0])).toBe("R/3");
    expect(areaRatio(1 / 3)).toBeCloseTo(1 / 9, 12);
    expect(narrowSpeed(1 / 3)).toBeCloseTo(9, 9);
    expect(narrowSpeed(1 / 3)).not.toBeCloseTo(3, 1);
  });

  it("keeps A₁v₁ = A₂v₂ at every slider position", () => {
    for (const k of RADIUS_RATIOS) expect(areaRatio(k) * narrowSpeed(k)).toBeCloseTo(1, 12);
    expect(narrowSpeed(0.5)).toBeCloseTo(4, 12);
    expect(narrowSpeed(1)).toBe(1);
    expect(ratioLabel(0.5)).toBe("0.5R");
    expect(ratioLabel(1)).toBe("R");
  });

  it("shades equal volumes: the narrow block is longer by exactly the speed ratio", () => {
    for (const k of RADIUS_RATIOS) {
      const wideVolume = 1 * BLOCK_V;
      const narrowVolume = areaRatio(k) * BLOCK_V * narrowSpeed(k);
      expect(narrowVolume).toBeCloseTo(wideVolume, 9);
    }
  });
});

describe("dipole torque and energy (cetp-dipole-torque-energy)", () => {
  it("uses the worked example: p = 6 × 10⁻⁸ C m, pE = 3 × 10⁻³ N m", () => {
    expect(P_MOMENT).toBeCloseTo(6e-8, 15);
    expect(PE).toBeCloseTo(3e-3, 12);
  });

  it("τ = pE sin θ: zero at 0° and 180°, pE at 90°, pE/2 at 30°", () => {
    expect(torque(0)).toBeCloseTo(0, 12);
    expect(torque(180)).toBeCloseTo(0, 12);
    expect(torque(90)).toBeCloseTo(PE, 12);
    expect(torque(30)).toBeCloseTo(PE / 2, 12);
  });

  it("U = −pE cos θ: least (−pE) at 0°, stable; greatest (+pE) at 180°, unstable", () => {
    expect(energy(0)).toBeCloseTo(-PE, 12);
    expect(energy(180)).toBeCloseTo(PE, 12);
    expect(dipoleState(0)).toBe("stable");
    expect(dipoleState(180)).toBe("unstable");
    expect(dipoleState(90)).toBe("max-torque");
    expect(dipoleState(45)).toBe("turning");
  });

  it("work uses cos, not sin: 0° to 180° costs 2pE = 6 × 10⁻³ J, 0° to 60° costs pE/2", () => {
    expect(workToTurn(0, 180)).toBeCloseTo(6e-3, 12);
    expect(workToTurn(0, 90)).toBeCloseTo(PE, 12);
    expect(workToTurn(0, 60)).toBeCloseTo(PE / 2, 12);
    expect(workToTurn(60, 90)).toBeCloseTo(PE / 2, 12);
    expect(DEFAULT_THETA).toBe(60);
  });

  it("places +q along p, drawn anticlockwise from E, and −q opposite", () => {
    const at0 = chargePositions(0);
    expect(at0.plus.x).toBeGreaterThan(CENTRE.x); // aligned: +q downfield
    expect(at0.minus.x).toBeLessThan(CENTRE.x);
    const at60 = chargePositions(60);
    expect(at60.plus.y).toBeLessThan(CENTRE.y);
    expect(Math.hypot(at60.plus.x - at60.minus.x, at60.plus.y - at60.minus.y)).toBeCloseTo(2 * HALF_LEN, 1);
  });

  it("puts −pE at the bottom of the energy gauge and +pE at the top", () => {
    expect(gaugeY(0)).toBeGreaterThan(gaugeY(90));
    expect(gaugeY(90)).toBeGreaterThan(gaugeY(180));
  });
});

describe("rolling energy split (cetp-rolling-energy)", () => {
  const byName = (n: string) => BODIES.find((b) => b.name === n)!;
  const LABEL_VALUE: Record<string, number> = { "½": 1 / 2, "⅔": 2 / 3, "⅓": 1 / 3, "5/7": 5 / 7, "2/7": 2 / 7 };

  it("splits ring 1/2 + 1/2, disc 2/3 + 1/3, solid sphere 5/7 + 2/7", () => {
    const expected: Record<string, [number, number]> = { Ring: [1 / 2, 1 / 2], Disc: [2 / 3, 1 / 3], "Solid sphere": [5 / 7, 2 / 7] };
    expect(BODIES.map((b) => b.name)).toEqual(["Ring", "Disc", "Solid sphere"]);
    for (const b of BODIES) {
      const s = shares(b);
      expect(s.translational).toBeCloseTo(expected[b.name][0], 12);
      expect(s.rotational).toBeCloseTo(expected[b.name][1], 12);
      expect(LABEL_VALUE[b.labels[0]]).toBeCloseTo(s.translational, 12);
      expect(LABEL_VALUE[b.labels[1]]).toBeCloseTo(s.rotational, 12);
    }
  });

  it("uses the concept's k²/R²: ring 1, disc 1/2, solid sphere 2/5", () => {
    expect(byName("Ring").k2).toEqual([1, 1]);
    expect(byName("Disc").k2).toEqual([1, 2]);
    expect(byName("Solid sphere").k2).toEqual([2, 5]);
  });

  it("gives total : rotational = 7 : 2 for the sphere and K_disc = ¾ K_ring", () => {
    const sphere = shares(byName("Solid sphere"));
    expect(1 / sphere.rotational).toBeCloseTo(7 / 2, 12);
    expect(totalInHalfMv2(byName("Disc")) / totalInHalfMv2(byName("Ring"))).toBeCloseTo(3 / 4, 12);
  });

  it("matches the worked example: a 3 kg disc at 2 m/s has 6 J + 3 J = 9 J", () => {
    const k = rollingKE(byName("Disc"), DISC_EXAMPLE.m, DISC_EXAMPLE.v);
    expect(k.translational).toBeCloseTo(6, 12);
    expect(k.rotational).toBeCloseTo(3, 12);
    expect(k.total).toBeCloseTo(9, 12);
  });

  it("draws every bar to one scale: the same ½mv², then UNIT × k²/R² of spin", () => {
    for (const b of BODIES) {
      const seg = barSegments(b);
      expect(seg.translational).toBe(UNIT);
      expect(seg.rotational).toBeCloseTo((UNIT * b.k2[0]) / b.k2[1], 1);
      expect(seg.translational + seg.rotational).toBeGreaterThan(UNIT); // more than ½mv²: the trap
    }
  });
});
