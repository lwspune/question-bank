import { describe, it, expect } from "vitest";
import { maskMathZones, parseLatex, parseRichSegments } from "@/components/math/parseLatex";
import { parseTableBlocks } from "@/components/math/parseTableBlocks";
import { normalizeNewlines } from "@/lib/text/normalizeNewlines";
import { renderCorruption } from "../scripts/lib/render-lint";
import { literalDollar } from "../scripts/ssc-cgl/lib";

/**
 * `\$` is a literal dollar sign in text (2026-10-18). A bare pair on one line is a maths zone,
 * so "If 7 $ 3 = 58 and 6 $ 2 = 40" drew its middle as maths and both signs vanished (11 SSC
 * CGL questions). Every reader of the `$...$` rule must treat the escape the same way: the
 * site, the Word file and the PDF (parseRichSegments), the plain splitter (parseLatex), the
 * table parser (maskMathZones) and the newline normaliser.
 */
describe("escaped dollar", () => {
  it("parseLatex: \\$ is a dollar sign in text, and a pair of them is not a maths zone", () => {
    expect(parseLatex("If 7 \\$ 3 = 58 and 6 \\$ 2 = 40, what is 5 \\$ 1?")).toEqual([
      { type: "text", content: "If 7 $ 3 = 58 and 6 $ 2 = 40, what is 5 $ 1?" },
    ]);
  });

  it("parseLatex: an escaped dollar sits beside real maths of every delimiter", () => {
    expect(parseLatex("costs \\$5 and \\(x^2\\)")).toEqual([
      { type: "text", content: "costs $5 and " },
      { type: "inline", content: "x^2" },
    ]);
    expect(parseLatex("$x$ and \\$5")).toEqual([
      { type: "inline", content: "x" },
      { type: "text", content: " and $5" },
    ]);
  });

  it("parseLatex: an escaped dollar never closes a bare one, so a lone $ plus a \\$ is all text", () => {
    expect(parseLatex("costs $5 and \\$6")).toEqual([{ type: "text", content: "costs $5 and $6" }]);
  });

  it("parseLatex: \\$ inside a maths zone is left to KaTeX", () => {
    expect(parseLatex("\\(\\$1 = 55\\)")).toEqual([{ type: "inline", content: "\\$1 = 55" }]);
  });

  it("parseRichSegments (site, Word, PDF): escaped dollars stay text, inside bold too", () => {
    expect(parseRichSegments("Average = \\$350, Difference = \\$250")).toEqual([
      { type: "text", content: "Average = $350, Difference = $250" },
    ]);
    expect(parseRichSegments("**Pay \\$5** now")).toEqual([
      { type: "text", content: "Pay $5", bold: true },
      { type: "text", content: " now" },
    ]);
  });

  it("maskMathZones round-trips an escaped dollar, and a table with one in a cell is still a table", () => {
    const text = "A \\$ B | C \\$ D";
    const { masked, unmask } = maskMathZones(text);
    expect(unmask(masked)).toBe(text);
    const blocks = parseTableBlocks("| Family | Income |\n|---|---|\n| A | \\$350 |\n| B | \\$250 |");
    expect(blocks).toEqual([{ kind: "table", headers: ["Family", "Income"], rows: [["A", "\\$350"], ["B", "\\$250"]] }]);
  });

  it("normalizeNewlines still converts a literal \\n between two escaped dollars", () => {
    expect(normalizeNewlines("7 \\$ 3 = 58\\n6 \\$ 2 = 40")).toBe("7 \\$ 3 = 58\n6 \\$ 2 = 40");
  });

  it("render-lint: an escaped dollar beside \\( \\) is not a delimiter scramble; a bare one still is", () => {
    expect(renderCorruption("costs \\$5 and \\(x\\)")).not.toContain("delimiter-scramble");
    expect(renderCorruption("costs $5 and \\(x\\)")).toContain("delimiter-scramble");
  });

  it("SSC build: escaped dollars pass, a bare pair on one line still fails", () => {
    expect(literalDollar("If 7 \\$ 3 = 58 and 6 \\$ 2 = 40")).toBe(false);
    expect(literalDollar("If 7 $ 3 = 58 and 6 $ 2 = 40")).toBe(true);
  });
});
