import { describe, expect, it } from "vitest";
import {
  DIST10_RANGE,
  LEFT,
  MAX_TILT,
  RIGHT_START,
  WEIGHT_RANGE,
  balance,
  moment,
  tiltDeg,
} from "../src/app/notes/_components/visualizations/ImatMomentsSeesaw";
import {
  MEDIA,
  N_AIR,
  SNELL_EXAMPLE,
  THETA_RANGE,
  rayGeometry,
  refractionAngle,
  speedIn,
} from "../src/app/notes/_components/visualizations/ImatSnellRefraction";
import { BOUNDARY_LABELS, EM_BANDS, IONISING_THROUGH, VISIBLE_COLOURS } from "../src/app/notes/_components/visualizations/ImatEmSpectrum";
import {
  AMPLITUDE_CM,
  DELTA_RANGE,
  START_DELTA,
  WAVELENGTH_M,
  classify,
  displacements,
  phaseOf,
  sumAmplitude,
} from "../src/app/notes/_components/visualizations/ImatSuperposition";
import {
  BEND_EXAMPLE,
  CENTRE,
  CIRCULAR_STEPS,
  RADIUS,
  STEP_ANGLES,
  accelDir,
  ballAt,
  centripetalAcc,
  isBroken,
  velocityDir,
} from "../src/app/notes/_components/visualizations/ImatCircularMotion";
import {
  COLLISION,
  COLLISION_STEPS,
  PER_P,
  TROLLEY_X,
  WIDTH,
  commonVelocity,
  kineticEnergy,
  momentumAt,
  velocitiesAt,
} from "../src/app/notes/_components/visualizations/ImatCollisionMomentum";

// Six IMAT physics figures. Each draws its concept's own example, so the
// numbers, directions and conditions are pinned here against the concept text
// (src/lib/sites/imat/notes/physics/).

describe("imat-moments-seesaw (concept imat-dyn-equilibrium)", () => {
  it("opens on the concept's see-saw: 300 N at 2.0 m balanced by 400 N at 1.5 m", () => {
    expect(LEFT).toEqual({ weight: 300, dist10: 20 });
    expect(RIGHT_START).toEqual({ weight: 400, dist10: 15 });
    expect(moment(300, 20)).toBe(600);
    expect(moment(400, 15)).toBe(600);
    expect(balance(RIGHT_START.weight, RIGHT_START.dist10)).toBe("balanced");
    expect(tiltDeg(RIGHT_START.weight, RIGHT_START.dist10)).toBe(0);
  });

  it("reads balanced exactly when F₁d₁ = F₂d₂, over every slider setting", () => {
    for (let w = WEIGHT_RANGE.min; w <= WEIGHT_RANGE.max; w += WEIGHT_RANGE.step) {
      for (let d = DIST10_RANGE.min; d <= DIST10_RANGE.max; d += DIST10_RANGE.step) {
        const equal = w * d === LEFT.weight * LEFT.dist10;
        expect(balance(w, d) === "balanced").toBe(equal);
        expect(tiltDeg(w, d) === 0).toBe(equal);
      }
    }
    // other balance points the sliders can reach: 600 N at 1.0 m, 200 N at 3.0 m
    expect(balance(600, 10)).toBe("balanced");
    expect(balance(200, 30)).toBe("balanced");
  });

  it("tilts the way the larger moment turns it, by a small capped angle", () => {
    // right child further out: clockwise moment larger, right side down (positive SVG angle)
    expect(balance(400, 20)).toBe("clockwise");
    expect(tiltDeg(400, 20)).toBeGreaterThan(0);
    // right child nearer: anticlockwise wins, left side down
    expect(balance(400, 10)).toBe("anticlockwise");
    expect(tiltDeg(400, 10)).toBeLessThan(0);
    for (let w = WEIGHT_RANGE.min; w <= WEIGHT_RANGE.max; w += WEIGHT_RANGE.step) {
      for (let d = DIST10_RANGE.min; d <= DIST10_RANGE.max; d += DIST10_RANGE.step) {
        expect(Math.abs(tiltDeg(w, d))).toBeLessThanOrEqual(MAX_TILT);
      }
    }
    expect(MAX_TILT).toBeLessThanOrEqual(10);
  });
});

describe("imat-snell-refraction (concept imat-opt-snell)", () => {
  const sin = (d: number) => Math.sin((d * Math.PI) / 180);

  it("opens on the worked example: 45° into glass of n = 1.50 refracts at about 28°", () => {
    expect(SNELL_EXAMPLE).toEqual({ theta1: 45, medium: "glass" });
    expect(N_AIR).toBe(1.0);
    expect(MEDIA.glass.n).toBe(1.5);
    expect(MEDIA.water.n).toBe(1.33);
    const t2 = refractionAngle(45, 1.0, 1.5);
    expect(sin(t2)).toBeCloseTo(0.471, 3); // 0.707 / 1.50
    expect(Math.round(t2)).toBe(28);
    expect(speedIn(1.5)).toBeCloseTo(2.0e8, -3); // c/n = 2.00 × 10⁸ m/s
  });

  it("obeys n₁ sin θ₁ = n₂ sin θ₂ at every angle, bending towards the normal", () => {
    for (const m of [MEDIA.glass, MEDIA.water]) {
      for (const t1 of [5, 20, 30, 45, 60, 75, THETA_RANGE.max]) {
        const t2 = refractionAngle(t1, N_AIR, m.n);
        expect(N_AIR * sin(t1)).toBeCloseTo(m.n * sin(t2), 10);
        expect(t2).toBeLessThan(t1);
      }
      expect(refractionAngle(0, N_AIR, m.n)).toBe(0); // along the normal: no bending
    }
    // the concept's self-check: 60° in, 30° out means n = sin 60° / sin 30° ≈ 1.73
    expect(refractionAngle(60, 1.0, sin(60) / sin(30))).toBeCloseTo(30, 9);
  });

  it("draws the incident ray above the surface on one side and the refracted ray below on the other", () => {
    const g = rayGeometry(45, 1.5);
    expect(g.start.x).toBeLessThan(160);
    expect(g.start.y).toBeLessThan(104);
    expect(g.end.x).toBeGreaterThan(160);
    expect(g.end.y).toBeGreaterThan(104);
    // the drawn refracted ray makes θ₂ with the normal
    const drawn = (Math.atan2(g.end.x - 160, g.end.y - 104) * 180) / Math.PI;
    expect(drawn).toBeCloseTo(g.theta2, 1);
  });
});

describe("imat-em-spectrum (concept imat-osw-em-spectrum)", () => {
  it("lists the regions in the concept's order of increasing wavelength", () => {
    expect(EM_BANDS.map((b) => b.name)).toEqual([
      "gamma rays",
      "X-rays",
      "ultraviolet",
      "visible light",
      "infrared",
      "microwaves",
      "radio waves",
    ]);
  });

  it("uses the concept's table's boundaries, each region starting where the last ends", () => {
    const edges = EM_BANDS.slice(0, -1).map((b) => b.maxM);
    expect(edges).toEqual([1e-11, 1e-8, 400e-9, 700e-9, 1e-3, 0.3]);
    for (let i = 1; i < EM_BANDS.length; i++) expect(EM_BANDS[i].minM).toBe(EM_BANDS[i - 1].maxM);
    expect(EM_BANDS[0].minM).toBe(0);
    expect(EM_BANDS[EM_BANDS.length - 1].maxM).toBe(Infinity);
    expect(BOUNDARY_LABELS).toEqual(["10⁻¹¹ m", "10 nm", "400 nm", "700 nm", "1 mm", "30 cm"]);
  });

  it("has frequency falling as wavelength rises (c = fλ)", () => {
    const c = 3.0e8;
    const f = EM_BANDS.slice(0, -1).map((b) => c / b.maxM);
    for (let i = 1; i < f.length; i++) expect(f[i]).toBeLessThan(f[i - 1]);
  });

  it("opens the visible band from violet at 400 nm to red at 700 nm, without gaps", () => {
    expect(VISIBLE_COLOURS[0].name).toBe("violet");
    expect(VISIBLE_COLOURS[0].fromNm).toBe(400);
    expect(VISIBLE_COLOURS[VISIBLE_COLOURS.length - 1].name).toBe("red");
    expect(VISIBLE_COLOURS[VISIBLE_COLOURS.length - 1].toNm).toBe(700);
    for (let i = 1; i < VISIBLE_COLOURS.length; i++) expect(VISIBLE_COLOURS[i].fromNm).toBe(VISIBLE_COLOURS[i - 1].toNm);
  });

  it("marks gamma, X-rays and (high-energy) ultraviolet as ionising, and gives each region a use from the table", () => {
    expect(EM_BANDS[IONISING_THROUGH].name).toBe("ultraviolet");
    expect(EM_BANDS.find((b) => b.name === "gamma rays")!.use).toMatch(/radiotherapy/);
    expect(EM_BANDS.find((b) => b.name === "X-rays")!.use).toMatch(/CT scans/);
    expect(EM_BANDS.find((b) => b.name === "ultraviolet")!.use).toMatch(/vitamin D/);
    expect(EM_BANDS.find((b) => b.name === "infrared")!.use).toMatch(/remote controls/);
    expect(EM_BANDS.find((b) => b.name === "microwaves")!.use).toMatch(/radar/);
    expect(EM_BANDS.find((b) => b.name === "radio waves")!.use).toMatch(/MRI/);
  });
});

describe("imat-superposition (concept imat-osw-interference)", () => {
  it("opens on the worked example: λ = 340/680 = 0.50 m, Δ = 0.75 m = 1.5λ, destructive", () => {
    expect(WAVELENGTH_M).toBe(0.5);
    expect(START_DELTA).toBe(150);
    expect(classify(START_DELTA)).toBe("destructive");
    expect(sumAmplitude(AMPLITUDE_CM, phaseOf(START_DELTA))).toBeCloseTo(0, 12);
  });

  it("gives the sum an amplitude of 2A|cos(φ/2)|, sampled across the slider", () => {
    for (let d = DELTA_RANGE.min; d <= DELTA_RANGE.max; d += DELTA_RANGE.step) {
      const phi = phaseOf(d);
      let peak = 0;
      for (let i = 0; i <= 2000; i++) peak = Math.max(peak, Math.abs(displacements(i / 1000, d).sum));
      expect(peak).toBeCloseTo(2 * AMPLITUDE_CM * Math.abs(Math.cos(phi / 2)), 3);
    }
  });

  it("calls whole wavelengths constructive (2A = 6 cm) and half-odd ones destructive (0)", () => {
    for (const d of [0, 100, 200]) {
      expect(classify(d)).toBe("constructive");
      expect(sumAmplitude(AMPLITUDE_CM, phaseOf(d))).toBeCloseTo(6, 12); // 3 cm crest on 3 cm crest
    }
    for (const d of [50, 150]) {
      expect(classify(d)).toBe("destructive");
      expect(phaseOf(d) % (2 * Math.PI)).toBeCloseTo(Math.PI, 12);
    }
    expect(classify(25)).toBe("partial");
    expect(sumAmplitude(3, Math.PI / 2)).toBeCloseTo(3 * Math.SQRT2, 12);
  });
});

describe("imat-circular-motion (concept imat-kin-centripetal-acc)", () => {
  const dot = (a: { x: number; y: number }, b: { x: number; y: number }) => a.x * b.x + a.y * b.y;

  it("has 4 to 6 steps, ending with the string breaking", () => {
    expect(CIRCULAR_STEPS.length).toBeGreaterThanOrEqual(4);
    expect(CIRCULAR_STEPS.length).toBeLessThanOrEqual(6);
    expect(STEP_ANGLES).toHaveLength(CIRCULAR_STEPS.length);
    expect(CIRCULAR_STEPS[CIRCULAR_STEPS.length - 1].title).toBe("The string breaks");
    expect(isBroken(CIRCULAR_STEPS.length - 1)).toBe(true);
    for (let s = 0; s < CIRCULAR_STEPS.length - 1; s++) expect(isBroken(s)).toBe(false);
  });

  it("uses the worked example in a caption: a = 20²/80 = 5.0 m/s²", () => {
    expect(BEND_EXAMPLE).toEqual({ v: 20, r: 80 });
    expect(centripetalAcc(20, 80)).toBe(5);
    expect(centripetalAcc(40, 80)).toBe(4 * centripetalAcc(20, 80)); // double the speed, four times a
    expect(CIRCULAR_STEPS.some((s) => s.caption.includes("5.0 m/s²"))).toBe(true);
  });

  it("keeps the ball on the circle, v along the tangent and a towards the centre", () => {
    for (let s = 0; s < CIRCULAR_STEPS.length - 1; s++) {
      const b = ballAt(s);
      const radial = { x: b.x - CENTRE.x, y: b.y - CENTRE.y };
      expect(Math.hypot(radial.x, radial.y)).toBeCloseTo(RADIUS, 9);
      expect(dot(velocityDir(s), radial)).toBeCloseTo(0, 9); // tangent
      const a = accelDir(s)!;
      expect(dot(a, velocityDir(s))).toBeCloseTo(0, 9); // at right angles to v
      expect(dot(a, radial)).toBeCloseTo(-RADIUS, 9); // points to the centre, full length
    }
    // the first step is the top, moving anticlockwise on screen: v points left, a down
    expect(ballAt(0).y).toBeCloseTo(CENTRE.y - RADIUS, 9);
    expect(velocityDir(0).x).toBeCloseTo(-1, 9);
    expect(accelDir(0)!.y).toBeCloseTo(1, 9);
  });

  it("sends the ball off along the tangent, not outwards, when the string breaks", () => {
    const last = CIRCULAR_STEPS.length - 1;
    const release = ballAt(last - 1);
    const after = ballAt(last);
    const moved = { x: after.x - release.x, y: after.y - release.y };
    const radial = { x: release.x - CENTRE.x, y: release.y - CENTRE.y };
    expect(accelDir(last)).toBeNull();
    expect(dot(moved, radial)).toBeCloseTo(0, 9); // no outward part
    expect(dot(moved, velocityDir(last - 1))).toBeGreaterThan(0); // straight on in the direction it was going
    expect(velocityDir(last).x).toBeCloseTo(velocityDir(last - 1).x, 9);
    expect(velocityDir(last).y).toBeCloseTo(velocityDir(last - 1).y, 9);
  });
});

describe("imat-collision-momentum (concept imat-dyn-collisions)", () => {
  it("draws the worked example and conserves momentum: 2.0 × 6.0 = 3.0 × 4.0 = 12 kg m/s", () => {
    expect(COLLISION).toEqual({ mA: 2.0, uA: 6.0, mB: 1.0, uB: 0 });
    expect(commonVelocity()).toBe(4);
    expect(COLLISION.mA * COLLISION.uA + COLLISION.mB * COLLISION.uB).toBe(12);
    expect((COLLISION.mA + COLLISION.mB) * commonVelocity()).toBe(12);
  });

  it("splits the momentum bar 12 + 0 before and 8 + 4 after, the same total at every step", () => {
    expect(momentumAt(0)).toEqual({ a: 12, b: 0 });
    expect(momentumAt(COLLISION_STEPS.length - 1)).toEqual({ a: 8, b: 4 });
    for (let s = 0; s < COLLISION_STEPS.length; s++) {
      const p = momentumAt(s);
      expect(p.a + p.b).toBe(12);
      expect((p.a + p.b) * PER_P).toBe(12 * PER_P); // the bar always fills the outline
    }
  });

  it("loses 12 J of kinetic energy: 36 J before, 24 J after", () => {
    expect(kineticEnergy(2.0, 6.0)).toBe(36);
    expect(kineticEnergy(3.0, commonVelocity())).toBe(24);
    expect(kineticEnergy(2.0, 6.0) - kineticEnergy(3.0, commonVelocity())).toBe(12);
  });

  it("moves the trolleys apart, then touching, then together at the same velocity", () => {
    expect(COLLISION_STEPS).toHaveLength(TROLLEY_X.length);
    expect(TROLLEY_X[0].a + WIDTH.a).toBeLessThan(TROLLEY_X[0].b);
    for (let s = 1; s < TROLLEY_X.length; s++) expect(TROLLEY_X[s].a + WIDTH.a).toBe(TROLLEY_X[s].b);
    expect(velocitiesAt(0)).toEqual({ a: 6, b: 0 });
    expect(velocitiesAt(1)).toBeNull(); // the forces are shown instead
    for (let s = 2; s < TROLLEY_X.length; s++) expect(velocitiesAt(s)).toEqual({ a: 4, b: 4 });
  });
});
