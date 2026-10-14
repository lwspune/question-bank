import { describe, it, expect } from "vitest";
import { equalValueOptions } from "../scripts/afcat/lib";

// Every case below is a real option set from the LWS quizzes (2026-10-14):
// 13 of 30 Probability rows and 8 of 50 Ratio rows had two options of equal value.
describe("equalValueOptions", () => {
  it("finds the same text printed twice (Probability Q5)", () => {
    expect(equalValueOptions(["5/10", "5/10", "3/10", "2/10"])).toEqual([["A", "B"]]);
  });

  it("finds an unreduced fraction beside its reduced form (Probability Q3)", () => {
    expect(equalValueOptions(["1/2", "1/4", "3/13", "26/52"])).toEqual([["A", "D"]]);
  });

  it("groups three equal options together (Probability Q16)", () => {
    expect(equalValueOptions(["1/6", "6/36", "1/6", "1/12"])).toEqual([["A", "B", "C"]]);
  });

  it("finds an unreduced ratio, including a three-term one (Ratio Q19, Q11)", () => {
    expect(equalValueOptions(["1:1", "2:5", "6:15", "9:10"])).toEqual([["B", "C"]]);
    expect(equalValueOptions(["5:7:15", "10:14:15", "70:98:105", "35:49:15"])).toEqual([["B", "C"]]);
  });

  it("finds equal distractors, not only a twin of the key (Ratio Q49)", () => {
    expect(equalValueOptions(["3:4", "4:5", "5:4", "12:15"])).toEqual([["B", "D"]]);
  });

  it("evaluates a product written with a times sign (Probability Q11)", () => {
    expect(equalValueOptions(["6/10 × 5/9", "15/45", "6/10 + 5/10", "4/45"])).toEqual([["A", "B"]]);
  });

  it("ignores currency, commas, units and a percent sign", () => {
    expect(equalValueOptions(["Rs. 1,200", "Rs. 1200", "Rs. 900", "Rs. 1,000"])).toEqual([["A", "B"]]);
    expect(equalValueOptions(["₹600", "₹575", "₹500", "₹525"])).toEqual([]);
    // 0.25 and 1/4 are one value; 25% stays apart (a percent answer, not a number).
    expect(equalValueOptions(["0.25", "25%", "1/4", "0.5"])).toEqual([["A", "C"]]);
  });

  it("keeps a direction word: 2% increase is not 2% decrease (Percentage Q31)", () => {
    expect(equalValueOptions(["2% decrease", "2% increase", "10% increase", "12% increase"])).toEqual([]);
    expect(equalValueOptions(["10% loss", "1% loss", "No profit, no loss", "10% profit"])).toEqual([]);
  });

  it("does not equate a ratio with a fraction, or words with numbers", () => {
    expect(equalValueOptions(["2:3", "4:6", "2/3", "3:2"])).toEqual([["A", "B"]]);
    expect(equalValueOptions(["No change", "1% decrease", "2% decrease", "5% decrease"])).toEqual([]);
  });

  it("compares a mixed number like 27 7/9 by value", () => {
    expect(equalValueOptions(["23 2/9 m", "27 m", "27 7/9 m", "250/9 m"])).toEqual([["C", "D"]]);
  });

  // Cadetprep sheets and the book transcripts typeset every option in LaTeX
  // (2026-10-14: the Cards sheet printed 6/13 beside 24/52 on most rows, and
  // the check saw none of them because it compared the raw markup).
  it("reads LaTeX fractions, ratios, percents and decimals", () => {
    expect(equalValueOptions(["\\(\\frac{5}{13}\\)", "\\(\\frac{24}{52}\\)", "\\(\\frac{6}{13}\\)", "\\(\\frac{20}{52}\\)"])).toEqual([["A", "D"], ["B", "C"]]);
    expect(equalValueOptions(["\\(3:2\\)", "\\(2:3\\)", "\\(12:8\\)", "\\(6:4\\)"])).toEqual([["A", "C", "D"]]);
    expect(equalValueOptions(["\\(0.05\\)", "\\(0.5\\)", "\\(0.2\\)", "\\(0.05\\)"])).toEqual([["A", "D"]]);
    expect(equalValueOptions(["\\(40\\%\\)", "\\(25\\%\\)", "\\(50\\%\\)", "\\(40\\)%"])).toEqual([["A", "D"]]);
  });

  it("reads a LaTeX product and a negative fraction", () => {
    expect(equalValueOptions(["\\(\\frac{13}{68}\\)", "\\(\\frac{39}{204}\\)", "\\(\\frac{13 \\times 39}{52 \\times 51}\\)", "\\(\\frac{1}{4}\\)"])).toEqual([["A", "B", "C"]]);
    expect(equalValueOptions(["\\(\\frac{193}{-95}\\)", "\\(\\frac{95}{193}\\)", "\\(\\frac{193}{95}\\)", "\\(\\frac{-193}{95}\\)"])).toEqual([["A", "D"]]);
  });

  it("keeps rupee amounts and units apart from bare numbers only by value", () => {
    expect(equalValueOptions(["\\(₹300\\)", "\\(₹320\\)", "₹ 300", "\\(₹400\\)"])).toEqual([["A", "C"]]);
    expect(equalValueOptions(["\\(20\\) liters", "\\(15\\) liters", "\\(10\\) liters", "\\(5\\) liters"])).toEqual([]);
  });

  it("does not equate different LaTeX expressions it cannot evaluate", () => {
    expect(equalValueOptions(["\\(\\sqrt{a^2-b^2}\\)", "\\(\\sqrt{a^2+b^2}\\)", "\\(a\\)", "\\(b\\)"])).toEqual([]);
  });

  it("passes a clean set", () => {
    expect(equalValueOptions(["40 liters", "45 liters", "55 liters", "60 liters"])).toEqual([]);
  });
});
