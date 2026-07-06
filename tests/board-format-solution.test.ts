import { describe, it, expect } from "vitest";
import { breakSentences } from "../src/lib/board/formatSolution";

describe("breakSentences", () => {
  it("puts each sentence of a run-on derivation on its own line", () => {
    const sol =
      "Here \\(y \\sec x = \\tan x + c\\). Differentiate w. r. t. x, we get \\(y \\sec x \\tan x + \\sec x \\dfrac{dy}{dx} = \\sec^2 x\\). Therefore \\(\\dfrac{dy}{dx} + y \\tan x = \\sec x\\). Hence \\(y \\sec x = \\tan x + c\\) is a solution.";
    const lines = breakSentences(sol).split("\n");
    expect(lines).toHaveLength(4);
    expect(lines[0]).toBe("Here \\(y \\sec x = \\tan x + c\\).");
    expect(lines[1]).toBe("Differentiate w. r. t. x, we get \\(y \\sec x \\tan x + \\sec x \\dfrac{dy}{dx} = \\sec^2 x\\).");
    expect(lines[2]).toBe("Therefore \\(\\dfrac{dy}{dx} + y \\tan x = \\sec x\\).");
    expect(lines[3]).toBe("Hence \\(y \\sec x = \\tan x + c\\) is a solution.");
  });

  it("does NOT break inside an abbreviation like 'w. r. t. x' (lowercase after)", () => {
    expect(breakSentences("Differentiate w. r. t. x here.")).toBe("Differentiate w. r. t. x here.");
  });

  it("does NOT break on a decimal inside prose or math", () => {
    expect(breakSentences("The value is 3.5 units now.")).toBe("The value is 3.5 units now.");
    expect(breakSentences("We get \\(x = 1.5\\) here.")).toBe("We get \\(x = 1.5\\) here.");
  });

  it("does NOT treat a period inside a math zone as a sentence end", () => {
    // The '.' sits inside \(...\); no break even though 'Then' would qualify.
    expect(breakSentences("So \\(a = 1. Then b\\) done.")).toBe("So \\(a = 1. Then b\\) done.");
  });

  it("breaks before a sentence that starts with a math zone", () => {
    expect(breakSentences("First step. \\(x = 2\\) is next.")).toBe("First step.\n\\(x = 2\\) is next.");
  });

  it("breaks on ? and !", () => {
    expect(breakSentences("Is it true? Yes it is! Good.")).toBe("Is it true?\nYes it is!\nGood.");
  });

  it("leaves a single sentence untouched and handles empty input", () => {
    expect(breakSentences("Hence proved.")).toBe("Hence proved.");
    expect(breakSentences("")).toBe("");
    expect(breakSentences(null)).toBe("");
  });
});
