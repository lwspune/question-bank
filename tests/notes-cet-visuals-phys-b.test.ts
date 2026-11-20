import { describe, expect, it } from "vitest";
import {
  STANDING_STEPS,
  STEP_MODE,
  STEP_SIGN,
  SPACING_STEP,
  STRING_L,
  WORKED,
  X0,
  X1,
  antinodeXs,
  modeShape,
  nodeXs,
  wavelength,
} from "../src/app/notes/_components/visualizations/CetStandingWaveModes";
import {
  PIPE_EXAMPLE,
  PIPE_ROWS,
  closedFreq,
  displacement,
  nodesAndAntinodes,
  openFreq,
} from "../src/app/notes/_components/visualizations/CetPipeModes";
import {
  BEAT_EXAMPLE,
  DIFF_RANGE,
  DRAWN_F1,
  beatFrequency,
  beatPeriod,
  envelope,
  loudTimes,
  loudToQuiet,
  secs,
  sum,
} from "../src/app/notes/_components/visualizations/CetBeatsEnvelope";
import {
  C,
  SHM_READOUTS,
  SHM_STEPS,
  SHM_THETAS,
  pointAt,
  shadowAccel,
  shadowVelocity,
  shadowX,
  speedFromX,
} from "../src/app/notes/_components/visualizations/CetShmReferenceCircle";
import {
  D_SCREEN_RANGE,
  D_SLIT_RANGE,
  LAMBDA_RANGE,
  STRIP_HALF_MM,
  YDSE_EXAMPLE,
  brightPositions,
  fringeWidthMm,
  lightFill,
} from "../src/app/notes/_components/visualizations/CetYdseFringeWidth";
import {
  LAMBDA,
  LISTENER_AHEAD_X,
  LISTENER_BEHIND_X,
  VS_OVER_V,
  aheadSpacing,
  behindSpacing,
  heardAhead,
  heardBehind,
  wavefronts,
} from "../src/app/notes/_components/visualizations/CetDopplerWavefronts";

// MHT-CET Physics notes figures, task phys-b (scripts/notes/CET_VISUALS_BRIEF.md).
// Each block pins what makes its figure TRUE against its concept's own text.

describe("stationary waves on a string (cetp-standing-wave-basics)", () => {
  it("walks fundamental, its other extreme, 2nd harmonic, 3rd harmonic, then the spacing overview", () => {
    expect(STANDING_STEPS.map((s) => s.title)).toEqual([
      "Fundamental",
      "Half a period later",
      "Second harmonic",
      "Third harmonic",
      "Node to node is λ/2",
    ]);
    expect(STEP_MODE).toEqual([1, 1, 2, 3, 3]);
    expect(SPACING_STEP).toBe(STANDING_STEPS.length - 1);
  });

  it("swings the fundamental to its other extreme between the first two steps", () => {
    expect(STEP_MODE[0]).toBe(STEP_MODE[1]);
    expect(STEP_SIGN[0]).toBe(-STEP_SIGN[1]);
  });

  it("puts nodes at both fixed ends and has p + 1 nodes and p antinodes for p loops", () => {
    for (const p of [1, 2, 3]) {
      const n = nodeXs(p);
      expect(n).toHaveLength(p + 1);
      expect(antinodeXs(p)).toHaveLength(p);
      expect(n[0]).toBe(X0);
      expect(n[p]).toBeCloseTo(X1);
    }
  });

  it("spaces nodes λ/2 apart and a node to the next antinode λ/4", () => {
    for (const p of [1, 2, 3]) {
      const n = nodeXs(p);
      const a = antinodeXs(p);
      for (let k = 1; k < n.length; k++) expect(n[k] - n[k - 1]).toBeCloseTo(wavelength(p) / 2);
      expect(a[0] - n[0]).toBeCloseTo(wavelength(p) / 4);
    }
  });

  it("follows L = (x − 1)λ/2 for x nodes", () => {
    for (const p of [1, 2, 3]) {
      const x = nodeXs(p).length;
      expect(((x - 1) * wavelength(p)) / 2).toBeCloseTo(STRING_L);
    }
  });

  it("draws zero displacement at every node and the largest at every antinode", () => {
    for (const p of [1, 2, 3]) {
      for (const x of nodeXs(p)) expect(Math.abs(modeShape(p, x))).toBeLessThan(1e-9);
      for (const x of antinodeXs(p)) expect(Math.abs(modeShape(p, x))).toBeCloseTo(modeShape(1, (X0 + X1) / 2));
    }
  });

  it("matches the worked example: sin(πx/5) gives λ = 10 cm and nodes 5 cm apart", () => {
    expect((2 * Math.PI) / WORKED.k).toBeCloseTo(WORKED.lambdaCm);
    expect(WORKED.lambdaCm / 2).toBe(WORKED.nodeSpacingCm);
    expect(STANDING_STEPS[SPACING_STEP].caption).toContain("5 cm apart");
  });
});

describe("open and closed pipes (cetp-organ-pipes)", () => {
  it("uses the worked example: 0.5 m pipe, 340 m/s", () => {
    expect(PIPE_EXAMPLE).toEqual({ L: 0.5, v: 340 });
    expect(openFreq(1)).toBe(340);
    expect(openFreq(2)).toBe(680);
    expect([closedFreq(1), closedFreq(2), closedFreq(3)]).toEqual([170, 510, 850]);
  });

  it("makes the closed pipe's fundamental half the open pipe's", () => {
    expect(closedFreq(1)).toBe(openFreq(1) / 2);
  });

  it("labels the closed pipe's first overtone as the 3rd harmonic, the open pipe's as the 2nd", () => {
    expect(PIPE_ROWS.map((r) => [r.kind, r.harmonic, r.freq])).toEqual([
      ["open", 1, 340],
      ["open", 2, 680],
      ["closed", 1, 170],
      ["closed", 3, 510],
    ]);
  });

  it("puts antinodes at both open ends and a node at the closed end", () => {
    for (const h of [1, 2]) {
      const { antinodes } = nodesAndAntinodes("open", h);
      expect(antinodes[0]).toBe(0);
      expect(antinodes[antinodes.length - 1]).toBe(1);
    }
    for (const h of [1, 3]) {
      const { nodes, antinodes } = nodesAndAntinodes("closed", h);
      expect(nodes[0]).toBe(0);
      expect(antinodes[antinodes.length - 1]).toBe(1);
    }
  });

  it("places nodes and antinodes where the air does and does not move", () => {
    for (const [kind, h] of [
      ["open", 1],
      ["open", 2],
      ["closed", 1],
      ["closed", 3],
    ] as const) {
      const { nodes, antinodes } = nodesAndAntinodes(kind, h);
      for (const u of nodes) expect(displacement(kind, h, u)).toBeLessThan(1e-9);
      for (const u of antinodes) expect(displacement(kind, h, u)).toBeCloseTo(1);
    }
    // closed pipe, 3rd harmonic: nodes at 0 and 2L/3, antinodes at L/3 and L
    const c3 = nodesAndAntinodes("closed", 3);
    expect(c3.nodes).toEqual([0, 2 / 3]);
    expect(c3.antinodes).toEqual([1 / 3, 1]);
  });
});

describe("beats (cetp-beat-frequency)", () => {
  it("opens on the worked example: 512 Hz and 516 Hz give 4 beats, 0.25 s and 0.125 s", () => {
    expect(BEAT_EXAMPLE).toEqual({ f1: 512, f2: 516 });
    expect(beatFrequency(512, 516)).toBe(4);
    expect(beatPeriod(512, 516)).toBe(0.25);
    expect(loudToQuiet(512, 516)).toBe(0.125);
    const d = BEAT_EXAMPLE.f2 - BEAT_EXAMPLE.f1;
    expect(d).toBeGreaterThanOrEqual(DIFF_RANGE.min);
    expect(d).toBeLessThanOrEqual(DIFF_RANGE.max);
  });

  it("is symmetric: |f₁ − f₂|", () => {
    expect(beatFrequency(516, 512)).toBe(4);
  });

  it("draws the sum loud at t = k/Δf and silent halfway between", () => {
    for (let diff = DIFF_RANGE.min; diff <= DIFF_RANGE.max; diff++) {
      const d1 = DRAWN_F1;
      const d2 = DRAWN_F1 + diff;
      const loud = loudTimes(diff);
      expect(loud).toHaveLength(diff + 1);
      for (const t of loud) expect(envelope(d1, d2, t)).toBeCloseTo(2);
      expect(sum(d1, d2, 0)).toBeCloseTo(2);
      expect(envelope(d1, d2, 1 / (2 * diff))).toBeCloseTo(0);
      expect(sum(d1, d2, 1 / (2 * diff))).toBeCloseTo(0);
    }
  });

  it("keeps the drawn sum inside its envelope", () => {
    for (let i = 0; i <= 400; i++) {
      const t = i / 400;
      expect(Math.abs(sum(DRAWN_F1, DRAWN_F1 + 4, t))).toBeLessThanOrEqual(envelope(DRAWN_F1, DRAWN_F1 + 4, t) + 1e-9);
    }
  });

  it("lists the loud moments of the example 0.25 s apart", () => {
    expect(loudTimes(4)).toEqual([0, 0.25, 0.5, 0.75, 1]);
    expect(secs(1 / 3)).toBe("0.333");
    expect(secs(0.25)).toBe("0.25");
  });
});

describe("SHM on the reference circle (cetp-osc-velocity-displacement)", () => {
  it("visits 30°, the mean, an extreme, the mean, the other extreme", () => {
    expect(SHM_THETAS).toEqual([30, 90, 180, 270, 360]);
    expect(SHM_STEPS).toHaveLength(SHM_THETAS.length);
    expect(SHM_READOUTS).toHaveLength(SHM_THETAS.length);
  });

  it("gives speed ωA and zero acceleration at the mean position", () => {
    for (const t of [90, 270]) {
      expect(shadowX(t)).toBeCloseTo(0);
      expect(Math.abs(shadowVelocity(t))).toBeCloseTo(1);
      expect(shadowAccel(t)).toBeCloseTo(0);
    }
    expect(SHM_READOUTS[1]).toMatchObject({ x: "x = 0", a: "a = 0" });
    expect(SHM_READOUTS[1].v).toContain("ωA");
  });

  it("gives zero speed and acceleration ω²A at the extremes", () => {
    for (const t of [180, 360]) {
      expect(Math.abs(shadowX(t))).toBeCloseTo(1);
      expect(shadowVelocity(t)).toBeCloseTo(0);
      expect(Math.abs(shadowAccel(t))).toBeCloseTo(1);
    }
    expect(SHM_READOUTS[2].x).toBe("x = −A");
    expect(SHM_READOUTS[4].x).toBe("x = +A");
    expect(SHM_READOUTS[2].a).toContain("ω²A");
  });

  it("always points the acceleration back to O: a = −ω²x", () => {
    for (const t of SHM_THETAS) expect(shadowAccel(t)).toBeCloseTo(-shadowX(t));
  });

  it("agrees with v = ω√(A² − x²) at every step", () => {
    for (const t of SHM_THETAS) expect(speedFromX(shadowX(t))).toBeCloseTo(Math.abs(shadowVelocity(t)));
  });

  it("shows the concept's fact: speed ωA/2 at x = (√3/2)A", () => {
    expect(shadowX(30)).toBeCloseTo(Math.sqrt(3) / 2);
    expect(Math.abs(shadowVelocity(30))).toBeCloseTo(0.5);
    expect(SHM_READOUTS[0]).toMatchObject({ x: "x = (√3/2)A", v: "speed = ωA/2" });
  });

  it("goes round anticlockwise on screen, so the shadow moves towards −A after the start", () => {
    expect(pointAt(90).y).toBeLessThan(C.y);
    expect(shadowVelocity(30)).toBeLessThan(0);
    expect(shadowVelocity(270)).toBeGreaterThan(0);
  });
});

describe("fringe width (cetp-fringe-width)", () => {
  it("opens on the worked example: 500 nm, 1 m, 0.5 mm gives β = 1 mm; in water 0.75 mm", () => {
    const { lambdaNm, Dm, dMm } = YDSE_EXAMPLE;
    expect(fringeWidthMm(lambdaNm, Dm, dMm)).toBeCloseTo(1);
    expect(fringeWidthMm(lambdaNm, Dm, dMm) / (4 / 3)).toBeCloseTo(0.75);
  });

  it("follows β ∝ λD/d: d × 3 and D × 2 gives 2/3 β; d × 10 and D × ½ gives β/20", () => {
    const b = fringeWidthMm(500, 1, 0.5);
    expect(fringeWidthMm(500, 2, 1.5) / b).toBeCloseTo(2 / 3);
    expect(fringeWidthMm(500, 0.5, 5) / b).toBeCloseTo(1 / 20);
    expect(fringeWidthMm(640, 1, 0.5) / b).toBeCloseTo(1.28);
  });

  it("starts every slider on the worked example", () => {
    expect(YDSE_EXAMPLE.lambdaNm).toBeGreaterThanOrEqual(LAMBDA_RANGE.min);
    expect(YDSE_EXAMPLE.lambdaNm).toBeLessThanOrEqual(LAMBDA_RANGE.max);
    expect(YDSE_EXAMPLE.dMm).toBeGreaterThanOrEqual(D_SLIT_RANGE.min);
    expect(YDSE_EXAMPLE.dMm).toBeLessThanOrEqual(D_SLIT_RANGE.max);
    expect(YDSE_EXAMPLE.Dm).toBeGreaterThanOrEqual(D_SCREEN_RANGE.min);
    expect(YDSE_EXAMPLE.Dm).toBeLessThanOrEqual(D_SCREEN_RANGE.max);
  });

  it("keeps the first bright fringe on the strip at the widest β the sliders allow", () => {
    const widest = fringeWidthMm(LAMBDA_RANGE.max, D_SCREEN_RANGE.max, D_SLIT_RANGE.min);
    expect(widest).toBeLessThan(STRIP_HALF_MM);
    expect(brightPositions(widest).length).toBeGreaterThanOrEqual(3);
  });

  it("puts bright fringes at 0, ±β, ±2β ... and more of them for a shorter wavelength", () => {
    const p = brightPositions(1);
    expect(p).toHaveLength(11);
    expect(p).toContain(0);
    expect(p[0]).toBeCloseTo(-5);
    expect(p[p.length - 1]).toBeCloseTo(5);
    const at600 = brightPositions(fringeWidthMm(600, 1, 0.5)).length;
    const at400 = brightPositions(fringeWidthMm(400, 1, 0.5)).length;
    expect(at400).toBeGreaterThan(at600);
  });

  it("colours 500 nm light green and red at 700 nm", () => {
    expect(lightFill(500)).toContain("emerald");
    expect(lightFill(700)).toContain("red");
  });
});

describe("crests from a moving source (cetp-sd-doppler-formula)", () => {
  it("bunches crests ahead to 4λ/5 and spreads them behind to 6λ/5 at v_s = v/5", () => {
    expect(VS_OVER_V).toBeCloseTo(0.2);
    expect(aheadSpacing()).toBeCloseTo((4 * LAMBDA) / 5);
    expect(behindSpacing()).toBeCloseTo((6 * LAMBDA) / 5);
  });

  it("draws each crest so that its spacing on the line of motion matches", () => {
    const w = wavefronts();
    for (let i = 1; i < w.length; i++) {
      expect(w[i].cx + w[i].r - (w[i - 1].cx + w[i - 1].r)).toBeCloseTo(aheadSpacing());
      expect(w[i - 1].cx - w[i - 1].r - (w[i].cx - w[i].r)).toBeCloseTo(behindSpacing());
    }
  });

  it("uses the concept's signs: approaching v/(v − v_s) = 5f/4 (its self-check), receding v/(v + v_s) = 5f/6", () => {
    expect(heardAhead()).toBeCloseTo(5 / 4);
    expect(heardBehind()).toBeCloseTo(5 / 6);
    expect(heardAhead()).toBeGreaterThan(1);
    expect(heardBehind()).toBeLessThan(1);
  });

  it("keeps v = f′λ′ on both sides", () => {
    expect((heardAhead() * aheadSpacing()) / LAMBDA).toBeCloseTo(1);
    expect((heardBehind() * behindSpacing()) / LAMBDA).toBeCloseTo(1);
  });

  it("puts both listeners outside the outermost crest", () => {
    const outer = wavefronts()[wavefronts().length - 1];
    expect(outer.cx + outer.r).toBeLessThan(LISTENER_AHEAD_X);
    expect(outer.cx - outer.r).toBeGreaterThan(LISTENER_BEHIND_X);
  });
});
