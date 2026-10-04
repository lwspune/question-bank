import { describe, it, expect } from "vitest";
import { isDashedTable } from "../scripts/lib/textProbes";

/**
 * DASHED_TABLE — a table pandoc wrote as a "simple" or "multiline" table: a
 * dashed ASCII grid. Nothing in this bank parses one (a GFM table needs a
 * `|---|` separator), so it reaches the reader as a wall of dashes and loose
 * cells. Once the ingest collapsed whitespace the column boundaries were lost
 * as well, so the cells cannot be rebuilt from the stored text, only from the
 * source paper.
 *
 * Earned 2026-10-04: 26 public rows across MHT-CET 2025, JEE 2021-23 and two
 * NDA mocks, in stems, options and solutions, and none of the eight other
 * audit:text classes saw them.
 *
 * THE BOUNDARY IS THE FILL-IN BLANK. Balbharati Class 10 Science stores its
 * blanks as runs of short dashes ("vinegar is -- -- --."); 19 of those sit in
 * the bank and must never fire. A table always has a long border or column
 * rule AND a row of space-separated dash groups; a blank has neither.
 */
describe("isDashedTable", () => {
  it("fires on a simple table flattened onto one line (MHT-CET 2025)", () => {
    expect(
      isDashedTable(
        "A random variable \\(X\\) has the following probability distribution ------------------------------------------------------ \\[X:\\] 0 1 2 3 4 ----------- ------- -------- -------- -------- ------- \\[P(X):\\] \\[k\\] \\[2k\\] \\[4k\\] \\[2k\\] \\[k\\] ------------------------------------------------------ then the value of"
      )
    ).toBe(true);
  });

  it("fires on a simple table that kept its line breaks (NDA mock)", () => {
    expect(
      isDashedTable(
        "Consider the two series\n\n  ---------------------------------------------\n  Series A   1019   1008   1015\n  ---------- ------ ------ ------\n  Series B   1.9    0.8    1.5\n\n  ---------------------------------------------\n\nIf the standard deviation"
      )
    ).toBe(true);
  });

  it("fires on a GFM table whose cells carry the dashed header (JEE 2023)", () => {
    expect(
      isDashedTable(
        "Match List I with List II\n\n| ------------ Example | ------------- ------------ ------------- | ------------- Hydride | LIST I ------------ |\n| --- | --- | --- | --- |\n| (A) | Electron deficient hydride | (I) | \\[MgH_{2}\\] |"
      )
    ).toBe(true);
  });

  it("fires on a table that is a whole option", () => {
    expect(
      isDashedTable(
        "---------------------------------------- X 1 2 3 4 -------------- ----------------- ----------------- \\[P(X = x)\\] \\[\\frac{1}{8}\\] \\[\\frac{1}{8}\\] ----------------------------------------"
      )
    ).toBe(true);
  });

  it("does not fire on fill-in blanks of short dashes", () => {
    expect(isDashedTable("Chemically, vinegar is -- -- --.")).toBe(false);
    expect(isDashedTable("Pollen grains are formed by -- ----- -- -- -- division in locules of anthers.")).toBe(false);
    expect(
      isDashedTable(
        "Under the effect of --- ---, fully grown up follicle bursts, ovulation occurs and -- --- -- -- is formed. It secrets --- --- -- -- and --- --- -- -- --."
      )
    ).toBe(false);
  });

  it("does not fire on a real GFM table, however long its separator", () => {
    expect(
      isDashedTable(
        "Find the variance:\n| X = x | 0 | 1 | 2 |\n|-------|----------------:|----------------:|----------------:|\n| P(x) | \\(\\frac{1}{8}\\) | \\(\\frac{3}{8}\\) | \\(\\frac{3}{8}\\) |"
      )
    ).toBe(false);
  });

  it("does not fire on a lone rule or on minus signs", () => {
    expect(isDashedTable("Section A\n----------------\nAnswer all questions.")).toBe(false);
    expect(isDashedTable("The values are -3 -1 0 1 and \\(x - - - y\\).")).toBe(false);
  });
});
