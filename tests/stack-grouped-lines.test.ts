/**
 * Several lines of working stored as ONE display equation (2026-10-07).
 *
 * A source conversion packed multi-line solutions into `\[{line 1}{line 2}...\]`:
 * each line one brace group, the groups side by side. KaTeX draws them on one
 * line, so they run together ("mmd = 20.20") or off the page (~240 public
 * rows). A display equation that is NOTHING BUT two or more groups is drawn
 * stacked instead; anything else is left exactly as written.
 */
import { describe, it, expect } from "vitest";
import { stackGroupedLines, parseRichSegments } from "@/components/math/parseLatex";

describe("stackGroupedLines", () => {
  it("stacks a display made only of brace groups, one per line", () => {
    expect(stackGroupedLines("{l = 8.35 }{d = 20.20 }{= 0.0082 }")).toBe(
      "\\begin{gathered}l = 8.35 \\\\ d = 20.20 \\\\ = 0.0082\\end{gathered}"
    );
  });

  it("keeps groups that contain their own braces whole", () => {
    expect(stackGroupedLines("{\\rho = \\frac{m}{V} }{\\Rightarrow x}")).toBe(
      "\\begin{gathered}\\rho = \\frac{m}{V} \\\\ \\Rightarrow x\\end{gathered}"
    );
  });

  it("ignores escaped braces when matching groups", () => {
    expect(stackGroupedLines("{A = \\{1, 2\\} }{B = \\{3\\}}")).toBe(
      "\\begin{gathered}A = \\{1, 2\\} \\\\ B = \\{3\\}\\end{gathered}"
    );
  });

  it("allows whitespace between the groups", () => {
    expect(stackGroupedLines("{a = 1}\n {b = 2}")).toBe("\\begin{gathered}a = 1 \\\\ b = 2\\end{gathered}");
  });

  it("leaves a single group alone", () => {
    expect(stackGroupedLines("{x + y}")).toBe("{x + y}");
  });

  it("leaves groups joined by anything else alone", () => {
    expect(stackGroupedLines("{x}^{2}")).toBe("{x}^{2}");
    expect(stackGroupedLines("a{b}{c}")).toBe("a{b}{c}");
    expect(stackGroupedLines("{a}{b} = c")).toBe("{a}{b} = c");
  });

  it("leaves unbalanced braces alone", () => {
    expect(stackGroupedLines("{a}{b")).toBe("{a}{b");
  });

  it("does not count empty groups as lines", () => {
    expect(stackGroupedLines("{}{x}")).toBe("{}{x}");
  });
});

describe("parseRichSegments", () => {
  it("stacks grouped lines in display math", () => {
    expect(parseRichSegments("So \\[{a = 1}{b = 2}\\] done")).toEqual([
      { type: "text", content: "So " },
      { type: "block", content: "\\begin{gathered}a = 1 \\\\ b = 2\\end{gathered}" },
      { type: "text", content: " done" },
    ]);
  });

  it("leaves inline math as written", () => {
    expect(parseRichSegments("\\({a}{b}\\)")).toEqual([{ type: "inline", content: "{a}{b}" }]);
  });
});
