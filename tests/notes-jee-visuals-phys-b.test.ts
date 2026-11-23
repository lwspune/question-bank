import { describe, expect, it } from "vitest";
import {
  DIR,
  LOOP_SENSE,
  ROD_EXAMPLE,
  ROD_STEPS,
  ROD_X,
  cross,
  forceOnPositive,
  forceOnRod,
  motionalEmf,
} from "../src/app/notes/_components/visualizations/JeeMovingRodEmf";
import {
  BAR_SCALE,
  MALUS_EXAMPLE,
  THETA_RANGE,
  afterFirst,
  afterSecond,
  amplitudeShare,
} from "../src/app/notes/_components/visualizations/JeeMalusPolaroids";
import {
  MARKED,
  SPHERE_EXAMPLE,
  curvePath,
  enclosedShare,
  fieldShell,
  fieldSolid,
} from "../src/app/notes/_components/visualizations/JeeGaussFieldGraphs";
import {
  BALL_EXAMPLE,
  FORCE_SCALE,
  forceArrows,
  speedAt,
  terminalVelocity,
} from "../src/app/notes/_components/visualizations/JeeTerminalVelocity";
import {
  BRIDGE,
  NODES,
  balancedReq,
  balancingS,
  junctionPotential,
} from "../src/app/notes/_components/visualizations/JeeWheatstoneBridge";
import {
  SCREW,
  VERNIER,
  VERNIER_READING,
  coincidingMarks,
  screwLC,
  screwReading,
  vernierLC,
  vernierMark,
} from "../src/app/notes/_components/visualizations/JeeVernierScale";
import { INPUTS, parallelLamp, seriesLamp, truthTable } from "../src/app/notes/_components/visualizations/JeeLogicGateSwitches";
import {
  ANGLE_RANGE,
  CENTRE,
  MAGNET_EXAMPLE,
  dipoleState,
  energyAt,
  polar,
  torqueAt,
  workToTurn,
} from "../src/app/notes/_components/visualizations/JeeMagneticDipoleTorque";
import {
  DEPTH_EXAMPLE,
  RAY_OFFSET,
  apparentDepth,
  layeredApparentDepth,
  normalShift,
  tracedRay,
} from "../src/app/notes/_components/visualizations/JeeApparentDepth";

// JEE Mains Physics notes figures, task phys-b (scripts/notes/CET_VISUALS_BRIEF.md,
// adapted for JEE). Each figure draws its concept's own numbers, so those are pinned here.

/** Turns −0 into 0, so a direction compares with toEqual. */
const norm = (v: readonly number[]) => v.map((x) => x + 0);

describe("rod moving on rails (jpemi-moving-rod)", () => {
  it("uses the practice item: 0.5 m at 4 m/s across 0.3 T gives 0.6 V", () => {
    expect(ROD_EXAMPLE).toEqual({ B: 0.3, l: 0.5, v: 4 });
    expect(motionalEmf(0.3, 0.5, 4)).toBeCloseTo(0.6, 12);
    // The other practice items of the concept, same formula.
    expect(motionalEmf(4e-5, 20, 100)).toBeCloseTo(0.08, 12); // aircraft, 360 km/h = 100 m/s
    expect(motionalEmf(3e-5, 2, 15)).toBeCloseTo(9e-4, 12); // worked example, B sin δ = 3 × 10⁻⁵ T
  });

  it("pushes positive charges up the rod: v × B with v right and B into the page", () => {
    expect(norm(DIR.field)).toEqual([0, 0, -1]);
    expect(norm(forceOnPositive())).toEqual([0, 1, 0]);
  });

  it("drives the current up the rod, anticlockwise round the loop, against the rising flux", () => {
    // Flux into the page (−z) rises as the area grows; an anticlockwise current makes +z inside the loop.
    expect(LOOP_SENSE).toBe("anticlockwise");
    // Up the rod (the right-hand side of the loop) is anticlockwise: the rod is at the loop's right, current +y.
    expect(norm(forceOnPositive())[1]).toBeGreaterThan(0);
  });

  it("gives a force on the rod against v: l × B with the current up the rod", () => {
    const F = forceOnRod([0, 1, 0]);
    expect(norm(F)).toEqual([-1, 0, 0]);
    const dot = F[0] * DIR.velocity[0] + F[1] * DIR.velocity[1] + F[2] * DIR.velocity[2];
    expect(dot).toBeLessThan(0);
    expect(norm(cross([1, 0, 0], [0, 1, 0]))).toEqual([0, 0, 1]); // the helper is the right-handed cross product
  });

  it("walks the steps in order, the rod sliding right, with no underscore in the plain text", () => {
    expect(ROD_STEPS.map((s) => s.title)).toEqual([
      "The set-up",
      "The rod moves at v",
      "An emf across the rod",
      "The induced current",
      "The force on the rod",
    ]);
    for (let i = 1; i < ROD_X.length; i++) expect(ROD_X[i]).toBeGreaterThan(ROD_X[i - 1]);
    expect(ROD_X).toHaveLength(ROD_STEPS.length);
    expect(ROD_STEPS[2].caption).toContain("0.6 V");
    expect(ROD_STEPS[3].caption).toContain("anticlockwise");
    expect(ROD_STEPS[4].caption).toContain("against v");
    for (const s of ROD_STEPS) expect(`${s.title} ${s.caption}`).not.toMatch(/_/);
  });
});

describe("two polaroids (jpwo-malus)", () => {
  it("uses the worked example: 40 W/m², halved to 20, then 20 cos²60° = 5", () => {
    expect(MALUS_EXAMPLE).toEqual({ I0: 40, thetaDeg: 60 });
    expect(afterFirst(40)).toBe(20);
    expect(afterSecond(40, 60)).toBeCloseTo(5, 9);
    expect(afterSecond(40, 60)).not.toBeCloseTo(10, 1); // cos², not cos: a quarter, not a half
  });

  it("matches the self-check: 50 W/m² at 37° gives 16 W/m² (cos 37° taken as 0.8)", () => {
    expect(afterSecond(50, 37)).toBeCloseTo(16, 0);
    expect(afterFirst(50) * 0.8 ** 2).toBeCloseTo(16, 9);
  });

  it("passes all of I₁ at 0° and nothing at 90°; the amplitude goes as cos θ", () => {
    expect(afterSecond(40, 0)).toBeCloseTo(20, 9);
    expect(afterSecond(40, 90)).toBeCloseTo(0, 9);
    expect(amplitudeShare(60)).toBeCloseTo(0.5, 9);
    expect(amplitudeShare(60) ** 2 * afterFirst(40)).toBeCloseTo(afterSecond(40, 60), 9);
  });

  it("has a slider that reaches the example's angle and crossed axes, and bars to scale", () => {
    expect(THETA_RANGE.min).toBe(0);
    expect(THETA_RANGE.max).toBe(90);
    expect((60 - THETA_RANGE.min) % THETA_RANGE.step).toBe(0);
    expect(40 * BAR_SCALE).toBe(200);
  });
});

describe("Gauss's law graphs (jpes-symmetric-gauss)", () => {
  const rel = (a: number, b: number) => expect(a / b).toBeCloseTo(1, 9);

  it("uses the worked example: 2 μC on a 10 cm sphere, kQ = 1.8 × 10⁴", () => {
    expect(SPHERE_EXAMPLE).toEqual({ Q: 2e-6, R: 0.1, k: 9e9 });
    rel(SPHERE_EXAMPLE.k * SPHERE_EXAMPLE.Q, 1.8e4);
  });

  it("solid sphere: 9 × 10⁵ at 5 cm, 1.8 × 10⁶ at the surface, 4.5 × 10⁵ at 20 cm", () => {
    rel(fieldSolid(0.05), 9e5);
    rel(fieldSolid(0.1), 1.8e6);
    rel(fieldSolid(0.2), 4.5e5);
    expect(fieldSolid(0)).toBe(0);
    // Largest at the surface: rises inside, falls outside.
    for (const r of [0.02, 0.05, 0.08, 0.12, 0.2, 0.3]) expect(fieldSolid(r)).toBeLessThan(fieldSolid(0.1));
    expect(fieldSolid(0.08)).toBeGreaterThan(fieldSolid(0.05));
  });

  it("shell: zero inside, the same kQ/r² outside", () => {
    expect(fieldShell(0.05)).toBe(0);
    expect(fieldShell(0.099)).toBe(0);
    rel(fieldShell(0.1), 1.8e6);
    rel(fieldShell(0.2), 4.5e5);
    expect(fieldShell(0.25)).toBeCloseTo(fieldSolid(0.25), 6);
  });

  it("encloses Qr³/R³ inside the solid sphere and nothing inside the shell", () => {
    expect(enclosedShare.solid(0.05, 0.1)).toBeCloseTo(0.125, 12);
    expect(enclosedShare.shell(0.05, 0.1)).toBe(0);
    expect(enclosedShare.solid(0.2, 0.1)).toBe(1);
  });

  it("marks the points it labels at their true values (units of 10⁶ N/C)", () => {
    for (const p of MARKED.solid) expect(fieldSolid(p.r / 100) / 1e6).toBeCloseTo(p.E, 9);
    for (const p of MARKED.shell) expect(fieldShell(p.r / 100) / 1e6).toBeCloseTo(p.E, 9);
  });

  it("draws the shell's curve in two pieces (the jump at the surface) and the solid one in one", () => {
    expect(curvePath("shell", 106).match(/M /g)).toHaveLength(2);
    expect(curvePath("solid", 222).match(/M /g)).toHaveLength(1);
  });
});

describe("terminal velocity (jpfluid-terminal-speed)", () => {
  it("uses the worked example: steel ball 0.15 cm in oil, v = 2.3 cm/s", () => {
    expect(BALL_EXAMPLE).toEqual({ r: 0.15, rho: 7.8, sigma: 0.9, eta: 15, g: 1000 });
    expect(terminalVelocity()).toBeCloseTo(2.3, 9); // 2 × 0.0225 × 6.9 × 1000 / 135 = 310.5/135
    expect(2 * 0.0225 * 6.9 * 1000).toBeCloseTo(310.5, 9);
  });

  it("draws drag and buoyancy end to end exactly as long as the weight", () => {
    const f = forceArrows();
    expect(f.weight).toBeCloseTo(7.8 * FORCE_SCALE, 9);
    expect(f.buoyancy).toBeCloseTo(0.9 * FORCE_SCALE, 9);
    expect(f.drag + f.buoyancy).toBeCloseTo(f.weight, 9);
  });

  it("rises with a falling slope and levels off at v_T", () => {
    const vT = terminalVelocity();
    expect(speedAt(0, vT)).toBe(0);
    expect(speedAt(5, vT)).toBeGreaterThan(0.99 * vT);
    expect(speedAt(5, vT)).toBeLessThan(vT);
    const gains = [0, 1, 2, 3, 4].map((t) => speedAt(t + 1, vT) - speedAt(t, vT));
    for (let i = 1; i < gains.length; i++) expect(gains[i]).toBeLessThan(gains[i - 1]);
  });
});

describe("Wheatstone bridge (jpce-wheatstone)", () => {
  it("uses the worked example: P = 3, Q = 6, R = 4 on 12 V, so S = 8 Ω", () => {
    expect(BRIDGE).toEqual({ P: 3, Q: 6, R: 4, V: 12 });
    expect(balancingS(3, 6, 4)).toBe(8);
    expect(3 / 6).toBe(4 / 8);
    expect(balancingS(5, 10, 7)).toBe(14); // practice item
  });

  it("puts both middle junctions at 8 V, so the middle arm carries nothing", () => {
    expect(junctionPotential(12, 3, 6)).toBe(8); // 12 × 6/9
    expect(junctionPotential(12, 4, 8)).toBe(8); // 12 × 8/12
  });

  it("then reduces to 9 Ω in parallel with 12 Ω: 36/7 Ω and 7/3 A", () => {
    expect(balancedReq(3, 6, 4, 8)).toBeCloseTo(36 / 7, 12);
    expect(12 / balancedReq(3, 6, 4, 8)).toBeCloseTo(7 / 3, 12);
    expect(12 / 9 + 12 / 12).toBeCloseTo(7 / 3, 12); // branch currents add to the same
    expect(balancedReq(2, 4, 3, 6)).toBeCloseTo(3.6, 12); // practice item
  });

  it("draws P and R both from the input point, Q and S both to the output", () => {
    expect(NODES.input.x).toBeLessThan(NODES.top.x);
    expect(NODES.output.x).toBeGreaterThan(NODES.top.x);
    expect(NODES.top.x).toBe(NODES.bottom.x); // the middle arm is vertical
  });
});

describe("vernier and screw gauge (jpunit-least-count)", () => {
  it("draws 10 VSD = 9 MSD of 1 mm: LC = 1 − 0.9 = 0.1 mm", () => {
    expect(VERNIER).toEqual({ msd: 1, n: 10, spans: 9 });
    expect(vernierLC(1, 10, 9)).toBeCloseTo(0.1, 12);
  });

  it("gets the worked example and the self-check right: 0.02 mm and 0.05 mm", () => {
    expect(vernierLC(0.5, 25, 24)).toBeCloseTo(0.02, 12);
    expect(vernierLC(1, 40, 38)).toBeCloseTo(0.05, 12);
  });

  it("lines up the 6th vernier mark (and only it) with the 29 mm mark: 23 + 6 × 0.1 = 23.6 mm", () => {
    expect(VERNIER_READING).toBe(23.6);
    expect(coincidingMarks(VERNIER_READING)).toEqual([6]);
    expect(vernierMark(VERNIER_READING, 6)).toBeCloseTo(29, 9);
    expect(Math.floor(VERNIER_READING) + 6 * vernierLC(1, 10, 9)).toBeCloseTo(VERNIER_READING, 9);
  });

  it("screw gauge: pitch 0.5 mm over 50 divisions, LC 0.01 mm; reading 5.5 + 28 × 0.01 = 5.78 mm", () => {
    expect(SCREW).toEqual({ pitch: 0.5, divisions: 50, sleeve: 5.5, circular: 28 });
    expect(screwLC(0.5, 50)).toBeCloseTo(0.01, 12);
    expect(screwReading()).toBeCloseTo(5.78, 9);
    expect(screwLC(2 / 4, 100)).toBeCloseTo(0.005, 12); // practice: 2 mm in 4 rotations, 100 divisions
    expect(SCREW.circular).toBeLessThan(SCREW.divisions);
  });
});

describe("switches as gates (jpsemi-switch-gates)", () => {
  it("series switches make AND", () => {
    expect(INPUTS).toEqual([
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ]);
    expect(truthTable(seriesLamp)).toEqual([
      [0, 0, 0],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 1],
    ]);
  });

  it("parallel switches make OR", () => {
    expect(truthTable(parallelLamp)).toEqual([
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ]);
  });
});

describe("magnetic dipole in a uniform field (jpmm-torque-energy)", () => {
  it("uses the worked example: M = 3 A m² in 0.2 T at 30°", () => {
    expect(MAGNET_EXAMPLE).toEqual({ M: 3, B: 0.2, thetaDeg: 30 });
    expect(torqueAt(3, 0.2, 30)).toBeCloseTo(0.3, 9);
    expect(energyAt(3, 0.2, 30)).toBeCloseTo(-0.3 * Math.sqrt(3), 9);
    expect(energyAt(3, 0.2, 30).toFixed(2)).toBe("-0.52");
    expect(workToTurn(3, 0.2, 0, 180)).toBeCloseTo(1.2, 9);
  });

  it("is stable at 0° (U = −MB) and unstable at 180° (U = +MB), with no torque at either", () => {
    expect(energyAt(3, 0.2, 0)).toBeCloseTo(-0.6, 9);
    expect(energyAt(3, 0.2, 180)).toBeCloseTo(0.6, 9);
    expect(torqueAt(3, 0.2, 0)).toBeCloseTo(0, 9);
    expect(torqueAt(3, 0.2, 180)).toBeCloseTo(0, 9);
    expect(torqueAt(3, 0.2, 90)).toBeCloseTo(0.6, 9);
    expect(dipoleState(0)).toBe("stable equilibrium");
    expect(dipoleState(180)).toBe("unstable equilibrium");
    expect(dipoleState(90)).toBe("largest torque");
  });

  it("matches the self-check coil and a practice item", () => {
    const M = 50 * 2 * 4e-3; // NIA = 0.4 A m²
    expect(torqueAt(M, 0.5, 90)).toBeCloseTo(0.2, 9);
    expect(workToTurn(M, 0.5, 90, 180)).toBeCloseTo(0.2, 9);
    expect(workToTurn(2, 0.25, 0, 90)).toBeCloseTo(0.5, 9);
  });

  it("measures θ anticlockwise from B on screen, and the slider reaches 30° and 180°", () => {
    expect(polar(0, 10)).toEqual({ x: CENTRE.x + 10, y: CENTRE.y });
    expect(polar(90, 10)).toEqual({ x: CENTRE.x, y: CENTRE.y - 10 });
    expect(ANGLE_RANGE.max).toBe(180);
    expect(30 % ANGLE_RANGE.step).toBe(0);
  });
});

describe("apparent depth (jpray-apparent-depth)", () => {
  it("uses the practice item: 12 cm of water (μ = 4/3) looks 9 cm deep, raised 3 cm", () => {
    expect(DEPTH_EXAMPLE.d).toBe(12);
    expect(DEPTH_EXAMPLE.mu).toBeCloseTo(4 / 3, 12);
    expect(apparentDepth(12, 4 / 3)).toBeCloseTo(9, 9);
    expect(normalShift(12, 4 / 3)).toBeCloseTo(3, 9);
  });

  it("gets the worked example's layers and the self-check right", () => {
    expect(layeredApparentDepth([{ d: 8, mu: 4 / 3 }, { d: 6, mu: 1.5 }])).toBeCloseTo(10, 9);
    expect(14 - layeredApparentDepth([{ d: 8, mu: 4 / 3 }, { d: 6, mu: 1.5 }])).toBeCloseTo(4, 9);
    expect(normalShift(20, 1.25)).toBeCloseTo(4, 9);
  });

  it("bends the drawn rays away from the normal, and they trace back to within 0.1 cm of d/μ", () => {
    const ray = tracedRay(RAY_OFFSET);
    expect(ray.r).toBeGreaterThan(ray.i);
    expect((ray.i * 180) / Math.PI).toBeCloseTo(9.46, 1);
    expect((ray.r * 180) / Math.PI).toBeCloseTo(12.66, 1);
    expect(Math.abs(ray.tracedDepth - 9)).toBeLessThan(0.1);
    // Closer to the normal, the traced depth tends to d/μ exactly.
    expect(tracedRay(0.01).tracedDepth).toBeCloseTo(9, 3);
  });
});
