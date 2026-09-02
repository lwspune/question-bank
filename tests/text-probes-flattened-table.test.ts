import { describe, it, expect } from "vitest";
import { isFlattenedTable } from "../scripts/lib/textProbes";

/**
 * FLATTENED_TABLE — a printed data table stored as parallel runs of prose.
 *
 * All four live instances were source-verified on 2026-09-02 against the scanned
 * NDA papers: each is a real bordered table in print. The question stays
 * answerable, which is why every other gate passes it.
 *
 * THE FALSE-POSITIVE BOUNDARY IS THE WHOLE VALUE, and the papers themselves draw
 * it: a RAW DATA LIST is printed as prose and our prose storage of it is
 * faithful (2023-I Q110/Q112, 2021-I Q107), while an x/f frequency distribution
 * is printed as a table. So the probe requires TWO parallel labelled runs, not
 * one — a single list of observations must never fire.
 */
describe("isFlattenedTable", () => {
  it("fires on an x/f frequency distribution stored as prose", () => {
    expect(
      isFlattenedTable(
        "Consider the following discrete frequency distribution : \(x\): 1, 2, 3, 4, 5, 6, 7, 8; \(f\): 3, 15, 45, 57, 50, 36, 25, 9. What is the median?"
      )
    ).toBe(true);
  });

  it("fires on named columns — 'Number of peas' / 'Frequency'", () => {
    expect(
      isFlattenedTable(
        "The following table gives the frequency distribution: Number of peas: 1,2,3,4,5,6,7; Frequency: 4,33,76,50,26,8,1. What is the median?"
      )
    ).toBe(true);
  });

  it("fires on three parallel runs (the two-families table)", () => {
    expect(
      isFlattenedTable(
        "Items: Food, Clothing, Rent, Education, Miscellaneous; Family A: 3500, 500, 1500, 2000, 2500; Family B: 2700, 800, 1000, 1800, 1800. In constructing a pie diagram?"
      )
    ).toBe(true);
  });

  it("does NOT fire on a single raw data list — the paper prints those as prose", () => {
    expect(
      isFlattenedTable("A die is thrown 10 times and obtained the following outputs : 1, 2, 1, 1, 2, 1, 4, 6, 5, 4. What will be the mode?")
    ).toBe(false);
  });

  it("does NOT fire on two SHORT runs — a pair of coordinates is not a table", () => {
    expect(isFlattenedTable("A bivariate data set contains only two points (-1, 1) and (3, 2). What is the regression line?")).toBe(false);
  });

  it("does NOT fire when the stem ALREADY carries a GFM table", () => {
    expect(
      isFlattenedTable(
        "Consider the following:\n\n| \(x\) | 1 | 2 | 3 | 4 |\n|---|---|---|---|---|\n| \(f\) | 3 | 15 | 45 | 57 |\n\nWhat is the median?"
      )
    ).toBe(false);
  });

  it("does NOT fire on prose that merely lists numbers after a colon once", () => {
    expect(isFlattenedTable("The class marks are given to be 5, 10, 15, 20, 25, 30, 35. The class limits are")).toBe(false);
  });

  it("does NOT fire on an options-style run of alternatives", () => {
    expect(isFlattenedTable("What is the value? The mean is 4 and the variance is 8.")).toBe(false);
  });
});
