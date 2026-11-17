import { describe, expect, it } from "vitest";
import {
  VENN_PANELS,
  circleInside,
  circlesApart,
  inside,
} from "../src/app/notes/_components/visualizations/ImatSyllogismVenn";
import {
  START_N,
  countByCubes,
  countByFormula,
  paintedFaces,
} from "../src/app/notes/_components/visualizations/ImatPaintedCube";
import { EAST, NORTH, choose, routeGrid } from "../src/app/notes/_components/visualizations/ImatGridRoutes";
import {
  SEATING,
  leftHand,
  leftOf,
  nameAt,
  oppositeOf,
  rightOf,
  seatPos,
} from "../src/app/notes/_components/visualizations/ImatSeatingCircle";
import {
  FOLDING_STEPS,
  FOLD_X,
  FOLD_Y,
  PUNCH,
  QUARTERS,
  quarterHoleAt,
  unfoldHoles,
} from "../src/app/notes/_components/visualizations/ImatPaperFolding";
import {
  CROSS_NET,
  FOLDED_PLACE,
  NET_STEPS,
  OPPOSITE_PLACE,
  facePose,
  oppositePairs,
} from "../src/app/notes/_components/visualizations/ImatCubeNetFold";

// IMAT logic notes figures (scripts/imat/NOTES_VISUALS_BRIEF.md). Each test
// pins what makes a figure TRUE to its concept's own example.

const panel = (statement: string) => VENN_PANELS.find((p) => p.statement === statement)!;

describe("imat-syllogism-venn (concept imat-ded-venn)", () => {
  it("draws the concept's four statements", () => {
    expect(VENN_PANELS.map((p) => p.statement)).toEqual(["All A are B", "No A are B", "Some A are B", "Some A are not B"]);
  });

  it("All A are B: A sits wholly inside B", () => {
    const p = panel("All A are B");
    expect(circleInside(p.a, p.b)).toBe(true);
    expect(p.cross).toBeUndefined();
  });

  it("No A are B: the circles do not overlap", () => {
    const p = panel("No A are B");
    expect(circlesApart(p.a, p.b)).toBe(true);
  });

  it("Some A are B: the cross is in the overlap", () => {
    const p = panel("Some A are B");
    expect(circlesApart(p.a, p.b)).toBe(false);
    expect(inside(p.cross!, p.a)).toBe(true);
    expect(inside(p.cross!, p.b)).toBe(true);
  });

  it("Some A are not B: the cross is in A, outside B", () => {
    const p = panel("Some A are not B");
    expect(inside(p.cross!, p.a)).toBe(true);
    expect(inside(p.cross!, p.b)).toBe(false);
  });

  it("puts each label in its own circle's region", () => {
    for (const p of VENN_PANELS) {
      expect(inside(p.labelA, p.a)).toBe(true);
      expect(inside(p.labelB, p.b)).toBe(true);
      expect(inside(p.labelB, p.a)).toBe(false);
    }
  });
});

describe("imat-painted-cube (concept imat-spa-painted-cube)", () => {
  it("opens on the worked example, n = 5: 8, 36, 54 and 27", () => {
    expect(START_N).toBe(5);
    expect(countByFormula(5)).toEqual({ three: 8, two: 36, one: 54, zero: 27 });
  });

  it("the formulas 8, 12(n − 2), 6(n − 2)², (n − 2)³ match a cube-by-cube count and add to n³", () => {
    for (let n = 2; n <= 6; n++) {
      const f = countByFormula(n);
      expect(countByCubes(n)).toEqual(f);
      expect(f).toEqual({ three: 8, two: 12 * (n - 2), one: 6 * (n - 2) ** 2, zero: (n - 2) ** 3 });
      expect(f.three + f.two + f.one + f.zero).toBe(n ** 3);
    }
  });

  it("agrees with the self-check and practice set", () => {
    expect(countByFormula(6).one).toBe(96);
    expect(countByFormula(4).zero).toBe(8);
    expect(countByFormula(3).two).toBe(12);
    expect(10 ** 3 - countByFormula(10).zero).toBe(488);
  });

  it("colours a corner 3, an edge 2, a face centre 1 and the core 0", () => {
    expect(paintedFaces(0, 0, 0, 5)).toBe(3);
    expect(paintedFaces(2, 0, 0, 5)).toBe(2);
    expect(paintedFaces(2, 2, 0, 5)).toBe(1);
    expect(paintedFaces(2, 2, 2, 5)).toBe(0);
  });
});

describe("imat-grid-routes (concept imat-spa-grid-paths)", () => {
  it("draws the self-check: 3 blocks east, 2 blocks north", () => {
    expect([EAST, NORTH]).toEqual([3, 2]);
  });

  it("labels every corner by adding from the left and from below", () => {
    expect(routeGrid(3, 2)).toEqual([
      [1, 1, 1, 1],
      [1, 2, 3, 4],
      [1, 3, 6, 10],
    ]);
  });

  it("every corner equals C(east + north, north), so the school is C(5, 2) = 10", () => {
    const g = routeGrid(EAST, NORTH);
    for (let j = 0; j <= NORTH; j++) for (let i = 0; i <= EAST; i++) expect(g[j][i]).toBe(choose(i + j, j));
    expect(g[NORTH][EAST]).toBe(10);
    expect(g[NORTH][EAST - 1] + g[NORTH - 1][EAST]).toBe(10);
  });

  it("matches the worked example and practice (2 by 2 gives 6, 4 by 4 gives 70)", () => {
    expect(routeGrid(2, 2)[2][2]).toBe(6);
    expect(routeGrid(4, 4)[4][4]).toBe(70);
  });
});

describe("imat-seating-circle (concept imat-spa-seating)", () => {
  const seatOf = (name: string) => SEATING.find((s) => s.name === name)!.seat;

  it("places the worked example: Max opposite Lia, Nora on Lia's right", () => {
    expect(nameAt(oppositeOf(seatOf("Lia")))).toBe("Max");
    expect(nameAt(rightOf(seatOf("Lia")))).toBe("Nora");
  });

  it("gives the worked answer: Max sits immediately to Omar's left", () => {
    expect(nameAt(leftOf(seatOf("Omar")))).toBe("Max");
  });

  it("left is the next seat clockwise, right the next anticlockwise, and they undo each other", () => {
    for (const { seat } of SEATING) {
      expect(leftOf(seat)).toBe((seat + 1) % 4);
      expect(rightOf(leftOf(seat))).toBe(seat);
    }
  });

  it("draws seats clockwise on screen from the bottom (Lia at the bottom, Omar on the left)", () => {
    const lia = seatPos(0);
    const omar = seatPos(1);
    const max = seatPos(2);
    expect(lia.y).toBeGreaterThan(max.y);
    expect(omar.x).toBeLessThan(lia.x);
  });

  it("each person's left hand points toward the seat to their left, not their right", () => {
    for (const { seat } of SEATING) {
      const p = seatPos(seat);
      const lh = leftHand(seat);
      const toLeft = seatPos(leftOf(seat));
      const toRight = seatPos(rightOf(seat));
      const dot = (q: { x: number; y: number }) => lh.x * (q.x - p.x) + lh.y * (q.y - p.y);
      expect(dot(toLeft)).toBeGreaterThan(0);
      expect(dot(toRight)).toBeLessThan(0);
    }
    // Lia, at the bottom facing up the page, has her left on the page's left.
    expect(leftHand(0).x).toBeCloseTo(-1);
    expect(leftHand(0).y).toBeCloseTo(0);
  });
});

describe("imat-paper-folding (concept imat-spa-folding)", () => {
  it("uses the worked example: 8 cm sheet, folds at 4 cm, punch 1 cm from the left and top", () => {
    expect([FOLD_X, FOLD_Y]).toEqual([4, 4]);
    expect(PUNCH).toEqual({ x: 1, y: 1 });
    expect(FOLDING_STEPS).toHaveLength(5);
  });

  it("unfolds by reflecting across the last fold first, then the first", () => {
    const { afterSecond, afterFirst } = unfoldHoles();
    expect(afterSecond).toEqual([
      { x: 1, y: 1 },
      { x: 1, y: 7 },
    ]);
    const key = (h: { x: number; y: number }) => `${h.x},${h.y}`;
    expect(afterFirst.map(key).sort()).toEqual(["1,1", "1,7", "7,1", "7,7"]);
    expect(afterFirst).toHaveLength(2 ** 2);
  });

  it("every layer's hole sits under the punch while folded", () => {
    for (const q of QUARTERS) expect(quarterHoleAt(2, q.id)).toEqual(PUNCH);
  });

  it("the holes land on the four reflections once fully unfolded", () => {
    const key = (h: { x: number; y: number }) => `${h.x},${h.y}`;
    const final = QUARTERS.map((q) => key(quarterHoleAt(4, q.id))).sort();
    expect(final).toEqual(["1,1", "1,7", "7,1", "7,7"]);
  });

  it("after undoing only the second fold, the holes are at 1 cm and 7 cm from the top", () => {
    const key = (h: { x: number; y: number }) => `${h.x},${h.y}`;
    const shown = new Set(QUARTERS.map((q) => key(quarterHoleAt(3, q.id))));
    expect([...shown].sort()).toEqual(["1,1", "1,7"]);
  });
});

describe("imat-cube-net-fold (concept imat-spa-nets)", () => {
  it("draws the worked example's net: 1-2-3-4 down a column, 5 and 6 beside 2", () => {
    const at = (f: number) => CROSS_NET.find((c) => c.face === f)!;
    expect([1, 2, 3, 4].map((f) => at(f).col)).toEqual([1, 1, 1, 1]);
    expect([1, 2, 3, 4].map((f) => at(f).row)).toEqual([0, 1, 2, 3]);
    expect([at(5).row, at(5).col, at(6).row, at(6).col]).toEqual([1, 0, 1, 2]);
  });

  it("finds the concept's answer: 1 and 3, 2 and 4, 5 and 6", () => {
    expect(oppositePairs(CROSS_NET)).toEqual([
      [1, 3],
      [2, 4],
      [5, 6],
    ]);
  });

  it("the fold agrees: each pair ends on opposite sides of the cube", () => {
    for (const [a, b] of oppositePairs(CROSS_NET)) expect(OPPOSITE_PLACE[FOLDED_PLACE[a]]).toBe(FOLDED_PLACE[b]);
  });

  it("finds the self-check's pair by elimination: 5 opposite 2", () => {
    const net = [
      { face: 1, row: 0, col: 0 },
      { face: 2, row: 0, col: 1 },
      { face: 3, row: 0, col: 2 },
      { face: 4, row: 1, col: 2 },
      { face: 5, row: 1, col: 3 },
      { face: 6, row: 1, col: 4 },
    ];
    expect(oppositePairs(net)).toEqual([
      [1, 3],
      [2, 5],
      [4, 6],
    ]);
  });

  it("starts and ends on the flat net, and closes the lid over the base in step 4", () => {
    expect(NET_STEPS).toHaveLength(5);
    for (const f of [1, 3, 5, 6, 4]) {
      expect(facePose(f, 0).sx).toBe(1);
      expect(facePose(f, 0).sy).toBe(1);
      expect(facePose(f, 4)).toEqual(facePose(f, 0));
    }
    // The lid is flipped (negative scale) in the closed step.
    expect(facePose(4, 3).sy).toBeLessThan(0);
  });
});
