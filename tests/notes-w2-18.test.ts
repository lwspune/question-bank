import { describe, expect, it } from "vitest";
import {
  BASE_EXAMPLE,
  GAP,
  RAHUL,
  RAHUL_BLOCKS,
  SUMIT,
  SUMIT_BLOCKS,
  lessByPercent,
  moreByPercent,
  moreThan,
} from "../src/app/notes/_components/visualizations/SscMoreThanBase";
import { ANSWER, CLUSTERS, ROWS, STEPS, letterAt, nextCluster, pos as clusterPos } from "../src/app/notes/_components/visualizations/SscClusterColumns";
import {
  CAN,
  CAN_BOTTOM,
  CAN_H,
  KEEP,
  MILK,
  PX_PER_L,
  REPLACE_STEPS,
  WATER,
  milkAfter,
  milkTop,
  roundAt,
} from "../src/app/notes/_components/visualizations/SscRepeatReplacement";
import { AVERAGE, DAYS, DAYS_ABOVE, GAPS, OUTPUT, TOTAL, sideOf } from "../src/app/notes/_components/visualizations/SscAboveAverage";
import {
  MARKS,
  RATE,
  WRONG_YEARS,
  YEARS_TO_TARGET,
  barCentre,
  copiesAt,
  rateFor,
  yearsFor,
} from "../src/app/notes/_components/visualizations/SscSiMultiples";
import {
  CELL_W,
  DAILY,
  DAILY_TOTAL,
  DAYS_TOGETHER,
  GRID_X,
  JOB_UNITS,
  WORKERS,
  cellOwner,
} from "../src/app/notes/_components/visualizations/SscWorkTogetherUnits";
import { SIDE, SIDE_M, SIDE_N, SQ_X, SURD, findPair, pieces } from "../src/app/notes/_components/visualizations/SscSurdSquare";
import { GAP_LISTS, ODD, OPTIONS, gapsOf, oddOneIndex, pos as gapPos } from "../src/app/notes/_components/visualizations/SscLetterGaps";

describe("SscMoreThanBase (sscppba-base)", () => {
  it("draws Rahul 25% more than Sumit's 100", () => {
    expect(BASE_EXAMPLE.base as number).toBe(100);
    expect(BASE_EXAMPLE.r as number).toBe(25);
    expect(SUMIT).toBe(100);
    expect(RAHUL).toBe(125);
    expect(GAP).toBe(25);
    expect(SUMIT_BLOCKS).toBe(4);
    expect(RAHUL_BLOCKS).toBe(5);
  });
  it("turns 25% more into 20% less, as the worked example", () => {
    expect(lessByPercent(25)).toBeCloseTo(20, 10);
    expect((GAP / RAHUL) * 100).toBeCloseTo(20, 10);
    expect((GAP / SUMIT) * 100).toBeCloseTo(25, 10);
  });
  it("agrees with the self-check and the trap", () => {
    expect(moreByPercent(20)).toBeCloseTo(25, 10); // rice 20% less: wheat 25% more
    expect(lessByPercent(20)).toBeCloseTo(50 / 3, 10); // 16 2/3%
    expect(moreThan(100, 60)).toBeCloseTo(160, 10);
    expect(lessByPercent(60)).toBeCloseTo(37.5, 10);
  });
});

describe("SscClusterColumns (sscrsecl-own)", () => {
  it("reads BZM, EXN, HVO column by column", () => {
    expect([...CLUSTERS]).toEqual(["BZM", "EXN", "HVO"]);
    expect(Array.from("BEH", clusterPos)).toEqual([2, 5, 8]);
    expect(Array.from("ZXV", clusterPos)).toEqual([26, 24, 22]);
    expect(STEPS).toEqual([3, -2, 1]);
  });
  it("every column keeps its own step in every row", () => {
    for (let c = 0; c < 3; c++) {
      for (let r = 1; r < ROWS.length; r++) {
        expect(clusterPos(ROWS[r][c]) - clusterPos(ROWS[r - 1][c])).toBe(STEPS[c]);
      }
    }
  });
  it("gives KTP", () => {
    expect(nextCluster(CLUSTERS)).toBe("KTP");
    expect(ANSWER as string).toBe("KTP");
    expect([letterAt(11), letterAt(20), letterAt(16)]).toEqual(["K", "T", "P"]);
    expect(letterAt(-2 + 26)).toBe("X"); // the trap: C back 5 is X
    expect(letterAt(27)).toBe("A");
  });
  it("matches the self-check TFQ, QJP, NNO", () => {
    expect(nextCluster(["TFQ", "QJP", "NNO"])).toBe("KRN");
  });
});

describe("SscRepeatReplacement (sscrami-repeat)", () => {
  it("keeps three quarters of the milk each round", () => {
    expect(CAN.total as number).toBe(64);
    expect(CAN.drawn as number).toBe(16);
    expect(KEEP).toBe(0.75);
    expect(MILK).toEqual([64, 48, 36, 27]);
    expect(WATER).toEqual([0, 16, 28, 37]);
    expect(milkAfter(3)).toBe(27);
    expect(64 * (27 / 64)).toBe(27);
  });
  it("matches the self-check: 60% acid, two rounds keeping 4/5", () => {
    expect(60 * (1 - 10 / 50) ** 2).toBeCloseTo(38.4, 10);
  });
  it("has 5 steps, rounds in order, the last the overview of round 3", () => {
    expect(REPLACE_STEPS).toHaveLength(5);
    expect([0, 1, 2, 3, 4].map(roundAt)).toEqual([0, 1, 2, 3, 3]);
    expect(REPLACE_STEPS[1].caption).toContain("48");
    expect(REPLACE_STEPS[2].caption).toContain("36");
    expect(REPLACE_STEPS[3].caption).toContain("27");
    expect(REPLACE_STEPS[4].caption).toContain("27");
  });
  it("draws the milk to scale", () => {
    expect(CAN_H).toBe(160);
    expect(milkTop(0)).toBe(CAN_BOTTOM - CAN_H);
    expect(CAN_BOTTOM - milkTop(3)).toBe(27 * PX_PER_L);
  });
});

describe("SscAboveAverage (sscdiav-above)", () => {
  it("averages the week to 62", () => {
    expect([...OUTPUT]).toEqual([62, 48, 75, 55, 70, 58, 66]);
    expect(TOTAL).toBe(434);
    expect(AVERAGE).toBe(62);
  });
  it("finds 3 days above, with Monday on the average", () => {
    expect(DAYS_ABOVE).toEqual(["Wed", "Fri", "Sun"]);
    expect(sideOf(GAPS[DAYS.indexOf("Mon")])).toBe("on");
    expect(GAPS).toEqual([0, -14, 13, -7, 8, -4, 4]);
  });
  it("gaps balance: 25 above, 25 below", () => {
    const above = GAPS.filter((g) => g > 0).reduce((s, g) => s + g, 0);
    const below = GAPS.filter((g) => g < 0).reduce((s, g) => s - g, 0);
    expect(above).toBe(25);
    expect(below).toBe(25);
  });
});

describe("SscSiMultiples (sscinfr-multiples)", () => {
  it("doubles in 10 years at 10%", () => {
    expect(RATE).toBe(10);
    expect(rateFor(2, 10) * 10).toBe(100);
  });
  it("becomes 4 times in 30 years, not 20", () => {
    expect(YEARS_TO_TARGET).toBe(30);
    expect(WRONG_YEARS).toBe(20);
    expect(RATE * YEARS_TO_TARGET).toBe(300);
    expect([...MARKS].map(copiesAt)).toEqual([1, 2, 3, 4]);
  });
  it("agrees with the self-check, the fast route and the trap", () => {
    expect(yearsFor(12, 3, 6)).toBe(30);
    expect(yearsFor(7, 2, 4)).toBe(21);
    expect(yearsFor(5, 2, 4)).toBe(15);
    expect(rateFor(5, 20)).toBe(20);
  });
  it("fits the bars in the picture", () => {
    expect(barCentre(30) + 17).toBeLessThanOrEqual(320);
  });
});

describe("SscWorkTogetherUnits (ssctwwr-together)", () => {
  it("takes the job as 60 units", () => {
    expect(WORKERS.map((w) => w.days as number)).toEqual([12, 20, 30]);
    expect(JOB_UNITS).toBe(60);
  });
  it("P 5, Q 3, R 2 a day: 10 a day, 6 days", () => {
    expect(DAILY).toEqual([5, 3, 2]);
    expect(DAILY_TOTAL).toBe(10);
    expect(DAYS_TOGETHER).toBe(6);
    expect(1 / 12 + 1 / 20 + 1 / 30).toBeCloseTo(1 / 6, 12);
  });
  it("letters each day's cells P, P, P, P, P, Q, Q, Q, R, R", () => {
    expect(Array.from({ length: 10 }, (_, c) => cellOwner(c))).toEqual([0, 0, 0, 0, 0, 1, 1, 1, 2, 2]);
    expect(GRID_X + DAILY_TOTAL * CELL_W).toBeLessThanOrEqual(320);
  });
});

describe("SscSurdSquare (sscsirt-sqrt)", () => {
  it("finds 5 and 3 for 8 + 2√15", () => {
    expect(findPair(SURD.a, SURD.b)).toEqual({ m: 5, n: 3 });
    expect(findPair(14, 45)).toEqual({ m: 9, n: 5 }); // the self-check
    expect(findPair(7, 10)).toEqual({ m: 5, n: 2 });
  });
  it("pieces add to 8 + 2√15", () => {
    const p = pieces(5, 3);
    expect(p.big + p.small).toBe(8);
    expect(p.rect).toBeCloseTo(Math.sqrt(15), 12);
    expect((Math.sqrt(5) + Math.sqrt(3)) ** 2).toBeCloseTo(8 + 2 * Math.sqrt(15), 10);
  });
  it("is drawn to scale and fits", () => {
    expect(SIDE_M / SIDE_N).toBeCloseTo(Math.sqrt(5 / 3), 10);
    expect(SIDE).toBeCloseTo(SIDE_M + SIDE_N, 10);
    expect(SQ_X + SIDE).toBeLessThanOrEqual(320);
  });
});

describe("SscLetterGaps (sscrclga-growing)", () => {
  it("reads the positions of the worked example", () => {
    expect(OPTIONS.map((o) => Array.from(o.word, gapPos))).toEqual([
      [3, 4, 7, 12],
      [11, 12, 15, 20],
      [13, 14, 17, 22],
      [18, 19, 22, 26],
    ]);
  });
  it("three lists are +1, +3, +5 and RSVZ ends +4", () => {
    expect(GAP_LISTS).toEqual([
      [1, 3, 5],
      [1, 3, 5],
      [1, 3, 5],
      [1, 3, 4],
    ]);
    expect(ODD).toBe(3);
    expect(OPTIONS[ODD].word as string).toBe("RSVZ");
  });
  it("matches the self-check and wraps past Z", () => {
    const lists = ["BDHN", "JLPV", "EGKQ", "MOSX"].map(gapsOf);
    expect(lists[3]).toEqual([2, 4, 5]);
    expect(oddOneIndex(lists)).toBe(3);
    expect(gapsOf("WYBF")).toEqual([2, 3, 4]);
  });
});
