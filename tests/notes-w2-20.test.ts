import { describe, expect, it } from "vitest";
import {
  CORNERS as DEC_CORNERS,
  EXTERIOR,
  EXT_END,
  INTERIOR,
  N as DEC_N,
  P as DEC_P,
  SIDES,
  V as DEC_V,
  angleAt,
  exteriorAngle,
  interiorAngle,
} from "../src/app/notes/_components/visualizations/SscDecagonAngles";
import {
  FROM_LEFT,
  FROM_RIGHT,
  ON_LEFT,
  ON_RIGHT,
  TARA,
  TOTAL as ROW_TOTAL,
  fromOtherEnd,
  rankLeft,
  rankRight,
  totalInRow,
} from "../src/app/notes/_components/visualizations/SscRankRow";
import {
  A as HL_A,
  A_ONLY,
  B as HL_B,
  B_ONLY,
  HCF,
  LCM,
  SHARED,
  factorList,
  A_POWERS,
  B_POWERS,
} from "../src/app/notes/_components/visualizations/SscT2HcfLcmVenn";
import {
  AIR,
  BAND_H,
  BAR,
  KARMAN_KM,
  KARMAN_Y,
  LAYERS,
  bandTop,
  barWidth,
} from "../src/app/notes/_components/visualizations/SscAtmosphereLayers";
import {
  K,
  LADDER_STEPS,
  PRODUCT,
  R2,
  R3,
  R5,
  STEP_RUNG,
  rung2,
} from "../src/app/notes/_components/visualizations/SscT2ReciprocalLadder";
import {
  FILL_HOURS,
  HOUR_TEXT,
  NET_RATE,
  PIPES,
  STEP_HOURS,
  TANK_STEPS,
  levelAt,
  unitsPerHour,
} from "../src/app/notes/_components/visualizations/SscT2PipesTank";
import {
  ANSWER,
  DOT_STEPS,
  GIVEN,
  STEP_FIGURE,
  colourOf,
  cornerOf,
} from "../src/app/notes/_components/visualizations/SscCornerDotSeries";

// Second figures for mid-size SSC CGL notes chapters (group 20). Each figure
// draws its concept's own worked example, so those numbers are pinned here.

describe("ssc-decagon-angles (ssclarg-angle)", () => {
  it("uses the worked example: a regular decagon, exterior 36°, interior 144°", () => {
    expect(SIDES).toBe(10);
    expect(EXTERIOR).toBe(36);
    expect(INTERIOR).toBe(144);
    expect(((SIDES - 2) * 180) / SIDES).toBe(144);
    expect(EXTERIOR + INTERIOR).toBe(180);
    expect(SIDES * EXTERIOR).toBe(360);
  });

  it("agrees with the concept's other values", () => {
    expect(interiorAngle(5)).toBe(108);
    expect(exteriorAngle(8)).toBe(45);
    expect(interiorAngle(8)).toBe(135);
    expect(exteriorAngle(15)).toBe(24);
    expect(interiorAngle(18)).toBe(160);
  });

  it("draws the marked angles as they are on the polygon", () => {
    expect(DEC_CORNERS).toHaveLength(10);
    expect(angleAt(DEC_V, DEC_P, DEC_N)).toBeCloseTo(144, 1);
    expect(angleAt(DEC_V, EXT_END, DEC_N)).toBeCloseTo(36, 1);
    // The extension carries on side PV: P, V and its end are on one line.
    expect(angleAt(DEC_V, DEC_P, EXT_END)).toBeCloseTo(180, 1);
  });
});

describe("ssc-rank-row (sscrorrk-rank)", () => {
  it("uses the worked example: 9th from the left, 14th from the right, 22 girls", () => {
    expect(FROM_LEFT).toBe(9);
    expect(FROM_RIGHT).toBe(14);
    expect(ROW_TOTAL).toBe(22);
    expect(ON_LEFT).toBe(8);
    expect(ON_RIGHT).toBe(13);
    expect(ON_LEFT + 1 + ON_RIGHT).toBe(ROW_TOTAL);
  });

  it("puts Tara in the seat both counts reach", () => {
    expect(rankLeft(TARA)).toBe(9);
    expect(rankRight(TARA)).toBe(14);
    expect(rankRight(ROW_TOTAL - 1)).toBe(1);
    expect(rankLeft(0)).toBe(1);
  });

  it("agrees with the concept's other values", () => {
    expect(fromOtherEnd(25, 7)).toBe(19);
    expect(fromOtherEnd(40, 11)).toBe(30);
    expect(totalInRow(6, 15)).toBe(20);
    expect(fromOtherEnd(35, 8)).toBe(28);
  });
});

describe("ssc-t2-hcf-lcm-venn (ssc2nshl-laws)", () => {
  it("uses the worked example 2³ × 3² × 5 and 2² × 3³ × 7", () => {
    expect(HL_A).toBe(360);
    expect(HL_B).toBe(756);
    expect(factorList(A_POWERS)).toEqual([2, 2, 2, 3, 3, 5]);
    expect(factorList(B_POWERS)).toEqual([2, 2, 3, 3, 3, 7]);
  });

  it("splits the factors into the three regions", () => {
    expect(SHARED).toEqual([2, 2, 3, 3]);
    expect(A_ONLY).toEqual([2, 5]);
    expect(B_ONLY).toEqual([3, 7]);
  });

  it("gives HCF 36 and LCM 7560, and HCF × LCM = a × b", () => {
    expect(HCF).toBe(36);
    expect(LCM).toBe(7560);
    expect(HCF * LCM).toBe(HL_A * HL_B);
    expect(HL_A * HL_B).toBe(272160);
  });
});

describe("ssc-atmosphere-layers (sscgclat-layers)", () => {
  it("stacks the five layers from the ground up, each with the concept's fact", () => {
    expect(LAYERS.map((l) => l.name)).toEqual(["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere", "Exosphere"]);
    expect(LAYERS[0].fact).toContain("weather");
    expect(LAYERS[1].fact).toContain("ozone");
    expect(LAYERS[1].fact).toContain("ultraviolet");
    expect(LAYERS[2].fact).toContain("meteors");
    expect(LAYERS[3].fact).toContain("X-rays");
    expect(LAYERS[3].fact).toContain("ISS");
    // Ground is at the bottom: each layer sits above the one before.
    for (let i = 1; i < LAYERS.length; i++) expect(bandTop(i)).toBeLessThan(bandTop(i - 1));
  });

  it("draws the Karman line, about 100 km, inside the thermosphere", () => {
    expect(KARMAN_KM).toBe(100);
    expect(KARMAN_Y).toBeGreaterThan(bandTop(3));
    expect(KARMAN_Y).toBeLessThan(bandTop(3) + BAND_H);
  });

  it("gives dry air as the concept does", () => {
    expect(AIR.nitrogen).toBe(78);
    expect(AIR.oxygen).toBe(21);
    expect(AIR.argon).toBe(0.93);
    expect(barWidth(AIR.nitrogen) + barWidth(AIR.oxygen)).toBeLessThan(BAR.w);
  });
});

describe("ssc-t2-reciprocal-ladder (ssc2aire-ladder)", () => {
  it("climbs the worked example: k = 5 gives 23, 110 and 2525", () => {
    expect(K).toBe(5);
    expect(R2).toBe(23);
    expect(R3).toBe(110);
    expect(PRODUCT).toBe(2530);
    expect(R5).toBe(2525);
  });

  it("matches the real x with x + 1/x = 5", () => {
    const x = (5 + Math.sqrt(21)) / 2;
    expect(x + 1 / x).toBeCloseTo(5, 9);
    expect(x ** 2 + x ** -2).toBeCloseTo(23, 6);
    expect(x ** 3 + x ** -3).toBeCloseTo(110, 6);
    expect(x ** 5 + x ** -5).toBeCloseTo(2525, 6);
  });

  it("agrees with the practice value x⁴ + 1/x⁴ = 47 when k = 3", () => {
    expect(rung2(rung2(3))).toBe(47);
  });

  it("works one rung a step and ends on rung 5", () => {
    expect(LADDER_STEPS).toHaveLength(5);
    expect([...STEP_RUNG]).toEqual([1, 2, 3, 5, 5]);
  });
});

describe("ssc-t2-pipes-tank (ssc2twpc-net)", () => {
  it("uses the worked example: A 10 h, B 15 h fill, C 20 h empties", () => {
    expect(PIPES.map((p) => p.hours)).toEqual([10, 15, 20]);
    expect(PIPES.map((p) => unitsPerHour(p))).toEqual([6, 4, -3]);
    expect(NET_RATE).toBe(7);
  });

  it("fills in 60 ÷ 7 = 8 4/7 hours", () => {
    expect(FILL_HOURS).toBeCloseTo(60 / 7, 12);
    expect(8 + 4 / 7).toBeCloseTo(FILL_HOURS, 12);
    expect(HOUR_TEXT[HOUR_TEXT.length - 1]).toBe("8 4/7");
  });

  it("shows the level at each step", () => {
    expect(TANK_STEPS).toHaveLength(STEP_HOURS.length);
    expect(STEP_HOURS.map((h) => levelAt(h))).toEqual([0, 7, 28, 56, 60]);
    expect(60 - levelAt(8)).toBe(4);
  });
});

describe("ssc-corner-dot-series (sscrnvmo-corners)", () => {
  it("goes round the corners clockwise and comes back after four steps", () => {
    expect([1, 2, 3, 4].map(cornerOf)).toEqual(["top-left", "top-right", "bottom-right", "bottom-left"]);
    expect(cornerOf(5)).toBe("top-left");
  });

  it("draws the worked example and its answer", () => {
    expect(GIVEN).toEqual([
      { corner: "top-left", colour: "black" },
      { corner: "top-right", colour: "white" },
      { corner: "bottom-right", colour: "black" },
    ]);
    expect(ANSWER).toEqual({ corner: "bottom-left", colour: "white" });
    expect(colourOf(7)).toBe("black");
  });

  it("ends on figure 4, the answer", () => {
    expect(DOT_STEPS).toHaveLength(5);
    expect(STEP_FIGURE[STEP_FIGURE.length - 1]).toBe(4);
  });
});
