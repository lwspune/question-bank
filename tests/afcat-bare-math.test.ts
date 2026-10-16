import { describe, expect, it } from "vitest";
import { repairBareMath, sourceSolutionProblem } from "../scripts/afcat/lib";

describe("repairBareMath", () => {
  it("restores \\( \\) around bare numbers", () => {
    expect(repairBareMath("If \\18\\ men can complete a work in \\20\\ days")).toBe(
      "If \\(18\\) men can complete a work in \\(20\\) days",
    );
  });

  it("restores a bare fraction written with a doubled backslash", () => {
    expect(repairBareMath("only \\\\frac{1}{3}\\ of the work")).toBe("only \\(\\frac{1}{3}\\) of the work");
  });

  it("handles a decimal option", () => {
    expect(repairBareMath("\\187.5\\ products")).toBe("\\(187.5\\) products");
  });

  it("leaves text that already has proper delimiters alone", () => {
    const t = "\\(18\\) men and \\(\\frac{1}{3}\\)";
    expect(repairBareMath(t)).toBe(t);
  });
});

describe("sourceSolutionProblem: bare delimiters", () => {
  it("rejects a solution whose math lost its \\( \\)", () => {
    expect(sourceSolutionProblem("Total work = \\20 \\times 30 = 600\\ man-days")).toMatch(/bare/);
  });

  it("accepts properly delimited math", () => {
    expect(sourceSolutionProblem("Total work = \\(20 \\times 30 = 600\\) man-days.")).toBeNull();
  });
});

describe("sourceSolutionProblem: chat citations", () => {
  it("rejects a solution carrying a [web:N] citation tag", () => {
    expect(sourceSolutionProblem("Mirror time = \(11:60 - 2:15\).[web:77][web:79] So \(9:45\).")).toMatch(/citation/);
  });

  it("accepts square brackets that are not citations", () => {
    expect(sourceSolutionProblem("The interval is \([0, 1]\) and the answer is \(9:45\).")).toBeNull();
  });
});
