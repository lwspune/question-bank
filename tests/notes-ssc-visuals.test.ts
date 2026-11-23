import { describe, expect, it } from "vitest";
import {
  MIRROR_CHAR_X,
  MIRROR_EXAMPLE,
  MIRROR_X,
  SAME_LEFT_RIGHT,
  SAME_TOP_BOTTOM,
  WATER_EXAMPLE,
  mirrorRead,
  reflectX,
  sameInMirror,
  sameInWater,
  waterRead,
} from "../src/app/notes/_components/visualizations/SscMirrorWaterImage";
import { LEFT_TREE, RIGHT_TREE, levelsAbove, relationWord, sideThrough } from "../src/app/notes/_components/visualizations/SscFamilyTree";
import {
  A,
  B,
  C,
  D as MID_D,
  E as MID_E,
  F as MID_F,
  G,
  MEDIAN_CM,
  cornerPart,
  dist,
  midpointPart,
} from "../src/app/notes/_components/visualizations/SscMediansCentroid";
import {
  FOOT_X,
  GROUND_Y,
  LEFT_X,
  PX_PER_M,
  RIGHT_X,
  TOP_Y,
  TOWER,
  distanceAt,
  gapOpposite,
} from "../src/app/notes/_components/visualizations/SscTowerTwoObservers";
import {
  CYL,
  CYL_STEPS,
  END_R,
  RECT_H,
  RECT_W,
  SCALE as CYL_SCALE,
  bodyScale,
  circumference,
  curvedArea,
  endArea,
  endPlace,
  totalArea,
} from "../src/app/notes/_components/visualizations/SscCylinderNet";
import {
  BALL,
  BALL_R,
  JAR_R,
  LEVEL_AFTER_Y,
  LEVEL_BEFORE_Y,
  SCALE as JAR_SCALE,
  ballVolumeOverPi,
  baseAreaOverPi,
  rise,
} from "../src/app/notes/_components/visualizations/SscSphereInCylinder";
import { DEARER_KG, MIX, cheaperKgFor, crossDifferences, crossRatio } from "../src/app/notes/_components/visualizations/SscAlligationCross";
import {
  B_SPEED,
  D as DOWN,
  PX_PER_KMH,
  S_SPEED,
  TRIP,
  U as UP,
  boatSpeed,
  streamSpeed,
} from "../src/app/notes/_components/visualizations/SscBoatsStreams";

// SSC CGL Maths + Reasoning notes figures (scripts/notes/CET_VISUALS_BRIEF.md,
// SSC variant). Each figure draws its concept's own example, so those numbers
// are pinned here.

const close = (a: number, b: number, eps = 1e-9) => expect(Math.abs(a - b)).toBeLessThan(eps);

describe("mirror and water images (sscrmile-mirror, sscrmile-water)", () => {
  it("a mirror beside FAN32 reads 2, 3, N, A, F and only A looks the same", () => {
    expect(MIRROR_EXAMPLE).toBe("FAN32");
    expect(mirrorRead(MIRROR_EXAMPLE)).toEqual(["2", "3", "N", "A", "F"]);
    expect(sameInMirror(MIRROR_EXAMPLE)).toEqual(["A"]);
  });

  it("a mirror below CODE5 keeps the order and only 5 changes", () => {
    expect(WATER_EXAMPLE).toBe("CODE5");
    expect(waterRead(WATER_EXAMPLE)).toEqual(["C", "O", "D", "E", "5"]);
    expect(sameInWater(WATER_EXAMPLE)).toEqual(["C", "O", "D", "E"]);
  });

  it("uses the concept's lists of unchanged characters", () => {
    expect(sameInMirror("TOY")).toEqual(["T", "O", "Y"]);
    expect(sameInMirror("R8HL2")).toEqual(["8", "H"]);
    expect(["B", "E", "F", "K"].filter((c) => SAME_TOP_BOTTOM.includes(c))).toEqual(["B", "E", "K"]);
    expect(SAME_LEFT_RIGHT).not.toContain("N");
    expect(SAME_TOP_BOTTOM).toContain("3");
  });

  it("draws the image as a true reflection: the last character lands nearest the mirror", () => {
    const imageX = MIRROR_CHAR_X.map(reflectX);
    // F (first) lands farthest right, 2 (last) nearest the mirror.
    expect(imageX[0]).toBe(Math.max(...imageX));
    expect(imageX[4]).toBe(Math.min(...imageX));
    for (let i = 0; i < MIRROR_CHAR_X.length; i++) close(imageX[i] - MIRROR_X, MIRROR_X - MIRROR_CHAR_X[i]);
  });
});

describe("family tree (sscrbrdr-generations)", () => {
  it("P is the son of Q, Q the daughter of R: P is two levels below R, so R's grandson", () => {
    expect(levelsAbove(LEFT_TREE, "R", "P")).toBe(2);
    expect(levelsAbove(LEFT_TREE, "P", "R")).toBe(-2);
    expect(relationWord(levelsAbove(LEFT_TREE, "P", "R"), "male")).toBe("grandson");
    // R's gender is never stated.
    expect(LEFT_TREE.find((p) => p.name === "R")!.gender).toBe("unknown");
  });

  it("the couple M and N share a level, and N is L's maternal grandmother", () => {
    const lvl = (n: string) => RIGHT_TREE.find((p) => p.name === n)!.level;
    expect(lvl("M")).toBe(lvl("N"));
    expect(levelsAbove(RIGHT_TREE, "N", "L")).toBe(2);
    expect(relationWord(2, "female")).toBe("grandmother");
    expect(sideThrough(RIGHT_TREE.find((p) => p.name === "K")!)).toBe("maternal");
  });

  it("names the levels as the concept does", () => {
    expect(relationWord(1, "male")).toBe("father");
    expect(relationWord(3, "male")).toBe("great-grandfather");
    expect(relationWord(-2, "female")).toBe("granddaughter");
  });
});

describe("medians and centroid (ssctrmd-centroid)", () => {
  it("D, E, F are the midpoints and G divides every median 2 : 1 from the corner", () => {
    close(dist(B, MID_D), dist(MID_D, C));
    close(dist(C, MID_E), dist(MID_E, A));
    close(dist(A, MID_F), dist(MID_F, B));
    for (const [corner, mid] of [
      [A, MID_D],
      [B, MID_E],
      [C, MID_F],
    ] as const) {
      close(dist(corner, G) + dist(G, mid), dist(corner, mid), 1e-6); // G is on the median
      close(dist(corner, G) / dist(G, mid), 2, 1e-6);
    }
  });

  it("the worked example: a median of 21 cm splits into 14 cm and 7 cm", () => {
    expect(MEDIAN_CM).toBe(21);
    close(cornerPart(21), 14);
    close(midpointPart(21), 7);
    // Self-check: AD = 7.5, BE = 18 at right angles gives AB = 13.
    close(Math.hypot(cornerPart(7.5), cornerPart(18)), 13);
  });
});

describe("tower between two observers (sschdtw-opposite)", () => {
  it("the worked example: 60 m, 30° and 60° gives 60√3 + 20√3 = 80√3 m", () => {
    expect([TOWER.h, TOWER.alpha, TOWER.beta]).toEqual([60, 30, 60]);
    close(distanceAt(60, 30), 60 * Math.sqrt(3), 1e-9);
    close(distanceAt(60, 60), 20 * Math.sqrt(3), 1e-9);
    close(gapOpposite(60, 30, 60), 80 * Math.sqrt(3), 1e-9);
    expect(gapOpposite(60, 30, 60)).toBeCloseTo(138.6, 1);
  });

  it("the self-check: a 120 m gap at 30° and 60° means h = 30√3 m", () => {
    close(gapOpposite(30 * Math.sqrt(3), 30, 60), 120, 1e-9);
  });

  it("is drawn to scale: the sight lines rise at 30° and 60° and the foot is between the observers", () => {
    expect(LEFT_X).toBeLessThan(FOOT_X);
    expect(FOOT_X).toBeLessThan(RIGHT_X);
    close(GROUND_Y - TOP_Y, 60 * PX_PER_M, 0.01);
    const left = (Math.atan2(GROUND_Y - TOP_Y, FOOT_X - LEFT_X) * 180) / Math.PI;
    const right = (Math.atan2(GROUND_Y - TOP_Y, RIGHT_X - FOOT_X) * 180) / Math.PI;
    close(left, 30, 0.05);
    close(right, 60, 0.05);
  });
});

describe("cylinder net (sscm3cy-formulas)", () => {
  it("the worked example: r = 7, h = 15 gives 44 cm, 154, 660 and 968 cm²", () => {
    expect([CYL.r, CYL.h]).toEqual([7, 15]);
    close(circumference(7), 44, 1e-9);
    close(endArea(7), 154, 1e-9);
    close(curvedArea(7, 15), 660, 1e-9);
    close(totalArea(7, 15), 968, 1e-9);
    close(totalArea(7, 15), circumference(7) * (7 + 15), 1e-9);
  });

  it("the unrolled rectangle is 2πr by h, to the same scale as the ends", () => {
    expect(RECT_W).toBe(44 * CYL_SCALE);
    expect(RECT_H).toBe(15 * CYL_SCALE);
    expect(END_R).toBe(7 * CYL_SCALE);
    // On the cylinder, the curved side is as wide as the ends (2r).
    close(RECT_W * bodyScale(0), 2 * END_R, 1);
    expect(bodyScale(CYL_STEPS.length - 1)).toBe(1);
  });

  it("the ends sit on the cylinder at first and touch the rectangle once lifted", () => {
    const top0 = endPlace("top", 0);
    const topLast = endPlace("top", CYL_STEPS.length - 1);
    const bottomLast = endPlace("bottom", CYL_STEPS.length - 1);
    expect(top0.sy as number).toBeLessThan(1);
    expect(topLast.sy).toBe(1);
    expect(topLast.y + END_R).toBe(endPlace("top", 0).y); // touches the rectangle's top edge
    expect(bottomLast.y - END_R).toBe(endPlace("bottom", 0).y); // and its bottom edge
  });

  it("has 3 to 7 steps, no underscores, and ends on the total", () => {
    expect(CYL_STEPS.length).toBeGreaterThanOrEqual(3);
    expect(CYL_STEPS.length).toBeLessThanOrEqual(7);
    for (const s of CYL_STEPS) expect(`${s.title} ${s.caption}`).not.toMatch(/_/);
    expect(CYL_STEPS[CYL_STEPS.length - 1].caption).toContain("968");
  });
});

describe("ball in a jar of water (sscm3rc-water)", () => {
  it("the worked example: ball 36π, base 36π, rise 1 cm", () => {
    expect([JAR_R, BALL_R]).toEqual([6, 3]);
    close(ballVolumeOverPi(3), 36);
    close(baseAreaOverPi(6), 36);
    close(rise(3, 6), 1);
  });

  it("is drawn to scale, with the ball fully under water", () => {
    close(LEVEL_BEFORE_Y - LEVEL_AFTER_Y, 1 * JAR_SCALE, 1e-9);
    expect(BALL.r).toBe(3 * JAR_SCALE);
    // The ball's top is below the level before it went in (screen y grows downward).
    expect(BALL.cy - BALL.r).toBeGreaterThan(LEVEL_BEFORE_Y);
  });
});

describe("alligation cross (sscraal-cross)", () => {
  it("the worked example: 400 and 520 to a mean of 450 gives 70 : 50 = 7 : 5", () => {
    expect([MIX.p1, MIX.p2, MIX.m]).toEqual([400, 520, 450]);
    expect(crossDifferences(400, 520, 450)).toEqual([70, 50]);
    expect(crossRatio(400, 520, 450)).toEqual([7, 5]);
  });

  it("10 kg of the dearer goes with 14 kg of the cheaper, and the mix is worth 450", () => {
    expect(DEARER_KG).toBe(10);
    close(cheaperKgFor(10, 400, 520, 450), 14);
    close((14 * 400 + 10 * 520) / 24, 450);
  });

  it("matches the practice set: 15% and 40% to 30% is 2 : 3", () => {
    expect(crossRatio(15, 40, 30)).toEqual([2, 3]);
  });
});

describe("boats and streams (ssctdbt-speeds)", () => {
  it("the worked example: 42 km in 3 h and 7 h gives D = 14, U = 6, b = 10, s = 4", () => {
    expect([TRIP.km, TRIP.downHours, TRIP.upHours]).toEqual([42, 3, 7]);
    expect(DOWN).toBe(14);
    expect(UP).toBe(6);
    expect(B_SPEED).toBe(10);
    expect(S_SPEED).toBe(4);
    expect(B_SPEED + S_SPEED).toBe(DOWN);
    expect(B_SPEED - S_SPEED).toBe(UP);
  });

  it("matches the practice set: D = 17, U = 11 gives s = 3", () => {
    expect(streamSpeed(17, 11)).toBe(3);
    expect(boatSpeed(17, 11)).toBe(14);
  });

  it("draws the arrows to one scale", () => {
    expect(PX_PER_KMH).toBeGreaterThan(0);
    // Downstream bar 14 units of speed, upstream net 6: the ratio of the drawn lengths.
    expect((DOWN * PX_PER_KMH) / (UP * PX_PER_KMH)).toBeCloseTo(14 / 6, 9);
  });
});
