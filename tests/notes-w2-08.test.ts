import { describe, expect, it } from "vitest";
import { PAIRS, opposite, position } from "../src/app/notes/_components/visualizations/SscOppositeLetters";
import { ANCHORS, PICKED, forward, reverse } from "../src/app/notes/_components/visualizations/SscAlphabetPositions";
import {
  EXAMPLE,
  POINTER_DAYS,
  WEEK_STEPS,
  oddDays,
  weekdayAfter,
  wholeWeeks,
} from "../src/app/notes/_components/visualizations/SscWeekWheel";
import { N, TWO_BY_TWO_STARTS, squaresOfSize, totalSquares } from "../src/app/notes/_components/visualizations/SscGridSquares";
import { FILLED, FIRST, SECOND, SERIES as LADDER_SERIES } from "../src/app/notes/_components/visualizations/SscDifferenceLadder";
import { ROWS, rule } from "../src/app/notes/_components/visualizations/SscRowRuleGrid";
import { BLOCKS, RESULT, ROW_2, TOKENS, workBlock } from "../src/app/notes/_components/visualizations/SscBodmasRow";
import { GIVEN, SERIES as ARROW_SERIES, turn } from "../src/app/notes/_components/visualizations/SscTurningArrow";
import { BOTTOM, TOP, relate, stretch } from "../src/app/notes/_components/visualizations/SscInequalityChain";
import {
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  MID_X,
  MID_Y,
  SQ,
  TOP_LEFT,
  TOP_RIGHT,
  reflectInHorizontal,
} from "../src/app/notes/_components/visualizations/SscSymmetryQuarters";

// SSC CGL Reasoning notes figures, group w2-08 (scripts/notes/CET_VISUALS_BRIEF.md).
// Each figure draws its concept's own example, so those answers are pinned here.

describe("ssc-opposite-letters (sscrcdre-opposite, sscrclle-opposite)", () => {
  it("folds A to M over Z to N, every column adding to 27", () => {
    expect(PAIRS).toHaveLength(13);
    expect(PAIRS[0]).toEqual(["A", "Z"]);
    expect(PAIRS[12]).toEqual(["M", "N"]);
    for (const [a, b] of PAIRS) expect(position(a) + position(b)).toBe(27);
  });
  it("G (7) and T (20) are opposites, as the definition says", () => {
    expect(position("G")).toBe(7);
    expect(opposite("G")).toBe("T");
    expect(position("T")).toBe(20);
  });
  it("reproduces the self-check code GOLD to TLOW, IRON to RILM", () => {
    expect("GOLD".split("").map(opposite).join("")).toBe("TLOW");
    expect("IRON".split("").map(opposite).join("")).toBe("RILM");
  });
  it("E and T are not opposites (classification example, ETG is the odd one)", () => {
    expect(position("E") + position("T")).toBe(25);
    expect(opposite("E")).toBe("V");
  });
});

describe("ssc-alphabet-positions (sscralpo-positions, sscranlt-positions)", () => {
  it("anchors E J O T Y sit at 5, 10, 15, 20, 25", () => {
    expect(ANCHORS.map(forward)).toEqual([5, 10, 15, 20, 25]);
  });
  it("worked example: reverse positions of M and W are 14 and 4, sum 18", () => {
    expect(PICKED).toEqual(["M", "W"]);
    expect(forward("M")).toBe(13);
    expect(reverse("M")).toBe(14);
    expect(forward("W")).toBe(23);
    expect(reverse("W")).toBe(4);
    expect(reverse("M") + reverse("W")).toBe(18);
  });
  it("G is 7th from A and 20th from Z; every letter's two numbers add to 27", () => {
    expect(forward("G")).toBe(7);
    expect(reverse("G")).toBe(20);
    expect(reverse("A")).toBe(26);
    expect(reverse("Z")).toBe(1);
  });
});

describe("ssc-week-wheel (sscrccca-odd-days)", () => {
  it("100 days is 14 weeks and 2 odd days: Wednesday to Friday", () => {
    expect(EXAMPLE.days).toBe(100);
    expect(wholeWeeks(100)).toBe(14);
    expect(oddDays(100)).toBe(2);
    expect(weekdayAfter(EXAMPLE.start, EXAMPLE.days)).toBe("Friday");
  });
  it("the pointer's steps: a whole week changes nothing, then +1 and +2", () => {
    expect(WEEK_STEPS).toHaveLength(POINTER_DAYS.length);
    expect(POINTER_DAYS.map((d) => weekdayAfter("Wednesday", d))).toEqual(["Wednesday", "Wednesday", "Thursday", "Friday"]);
  });
  it("matches the self-check and practice answers", () => {
    expect(weekdayAfter("Sunday", 23)).toBe("Tuesday");
    expect(weekdayAfter("Monday", -30)).toBe("Saturday");
    expect(weekdayAfter("Saturday", 50)).toBe("Sunday");
  });
});

describe("ssc-grid-squares (sscrfcsq-grid)", () => {
  it("a 3 by 3 grid holds 9 + 4 + 1 = 14 squares", () => {
    expect(N).toBe(3);
    expect([1, 2, 3].map((k) => squaresOfSize(N, k))).toEqual([9, 4, 1]);
    expect(totalSquares(N)).toBe(14);
  });
  it("draws one 2 by 2 block from each of the top-left four cells", () => {
    expect(TWO_BY_TWO_STARTS).toHaveLength(squaresOfSize(N, 2));
    expect(new Set(TWO_BY_TWO_STARTS.map(([r, c]) => `${r},${c}`)).size).toBe(4);
    for (const [r, c] of TWO_BY_TWO_STARTS) {
      expect(r + 2).toBeLessThanOrEqual(N);
      expect(c + 2).toBeLessThanOrEqual(N);
    }
  });
  it("matches the self-check: a 4 by 4 grid holds 30", () => {
    expect(totalSquares(4)).toBe(30);
  });
});

describe("ssc-difference-ladder (sscrsedi-steady)", () => {
  it("fills 14, 19, 27, 38, ?, 69 with 52", () => {
    expect(FILLED).toEqual([14, 19, 27, 38, 52, 69]);
    LADDER_SERIES.forEach((t, i) => {
      if (t !== null) expect(FILLED[i]).toBe(t);
    });
  });
  it("differences 5, 8, 11, 14, 17 grow by a steady 3", () => {
    expect(FIRST).toEqual([5, 8, 11, 14, 17]);
    expect(SECOND).toEqual([3, 3, 3, 3]);
  });
});

describe("ssc-row-rule-grid (sscrmngr-add)", () => {
  it("2a + b - 3 fits rows 1 and 2 and gives 19 on row 3", () => {
    expect(rule(ROWS[0][0], ROWS[0][1])).toBe(ROWS[0][2]);
    expect(rule(ROWS[1][0], ROWS[1][1])).toBe(ROWS[1][2]);
    expect(ROWS[2][2]).toBeNull();
    expect(rule(ROWS[2][0], ROWS[2][1])).toBe(19);
  });
});

describe("ssc-bodmas-row (sscrmosu-bodmas)", () => {
  it("works 48 ÷ 6 × 2 + 15 − 3 × 4 to 19", () => {
    expect(TOKENS.join(" ")).toBe("48 ÷ 6 × 2 + 15 − 3 × 4");
    expect(workBlock(TOKENS.slice(BLOCKS[0][0], BLOCKS[0][1] + 1))).toBe(16);
    expect(workBlock(TOKENS.slice(BLOCKS[1][0], BLOCKS[1][1] + 1))).toBe(12);
    expect(ROW_2).toEqual(["16", "+", "15", "−", "12"]);
    expect(RESULT).toBe(19);
  });
  it("each block holds only ÷ and × signs", () => {
    for (const [s, e] of BLOCKS) {
      const signs = TOKENS.slice(s, e + 1).filter((_, k) => k % 2 === 1);
      for (const sign of signs) expect(["÷", "×"]).toContain(sign);
    }
  });
});

describe("ssc-turning-arrow (sscrnvtu-rotate)", () => {
  it("up, right, down, then left and up again", () => {
    expect(ARROW_SERIES.slice(0, 3)).toEqual([...GIVEN]);
    expect(ARROW_SERIES[3]).toBe("left");
    expect(ARROW_SERIES[4]).toBe("up");
  });
  it("matches the self-check: 135 degrees clockwise three times from up is up-right", () => {
    expect(turn("up", 135)).toBe("down-right");
    expect(turn("up", 270)).toBe("left");
    expect(turn("up", 405)).toBe("up-right");
  });
});

describe("ssc-inequality-chain (sscrinch-read)", () => {
  it("worked example: A > E and C ≥ E (in fact C > E)", () => {
    expect(stretch(TOP, "A", "E")).toEqual([">", "≥", "=", ">"]);
    expect(relate(stretch(TOP, "A", "E"))).toBe(">");
    expect(relate(stretch(TOP, "C", "E"))).toBe(">");
  });
  it("self-check: P < R, but Q and S have no relation", () => {
    expect(relate(stretch(BOTTOM, "P", "R"))).toBe("<");
    expect(relate(stretch(BOTTOM, "Q", "S"))).toBeNull();
  });
  it("only signs that allow equality give a non-strict result", () => {
    expect(relate(["≥", "="])).toBe("≥");
    expect(relate(["="])).toBe("=");
  });
});

describe("ssc-symmetry-quarters (sscrefpc-symmetry)", () => {
  it("the missing dot sits near the outer bottom-right corner", () => {
    expect(BOTTOM_LEFT.x).toBe(TOP_LEFT.x);
    expect(BOTTOM_LEFT.y).toBeGreaterThan(MID_Y);
    expect(BOTTOM_RIGHT.x).toBeGreaterThan(MID_X);
    expect(BOTTOM_RIGHT.y).toBeGreaterThan(MID_Y);
    // Same distance from the bottom-right corner as the given dot from the top-left corner.
    expect(SQ.x + SQ.size - BOTTOM_RIGHT.x).toBe(TOP_LEFT.x - SQ.x);
    expect(SQ.y + SQ.size - BOTTOM_RIGHT.y).toBe(TOP_LEFT.y - SQ.y);
  });
  it("both routes agree: symmetric about both lines", () => {
    expect(reflectInHorizontal(TOP_RIGHT)).toEqual(BOTTOM_RIGHT);
  });
});
