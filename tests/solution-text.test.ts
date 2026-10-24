import { describe, expect, it } from "vitest";
import { solutionProblems, solutionTextProblems } from "../scripts/lib/solutionText";

describe("solutionTextProblems", () => {
  it("holds the damage checks but not the style checks", () => {
    expect(solutionTextProblems("The stored area is π.")).toEqual([]);
    expect(solutionTextProblems("\\(x \neq 2\\)").join()).toMatch(/line break inside/);
    expect(solutionTextProblems("")).toEqual(["empty"]);
  });
});

describe("solutionProblems", () => {
  it("passes a clean worked solution", () => {
    const s = "Speed is \\(\\frac{d}{t}\\).\n\\[ v = \\frac{120}{4} = 30 \\]\nSo the answer is (B) 30.";
    expect(solutionProblems(s)).toEqual([]);
  });

  it("flags an empty or blank solution", () => {
    expect(solutionProblems("")).toContain("empty");
    expect(solutionProblems("  \n ")).toContain("empty");
  });

  it("flags control characters left by an escape eaten in JSON", () => {
    // "\times" -> TAB + "imes", "\frac" -> FF + "rac", "\beta" -> BS + "eta", "\rho" -> CR + "ho"
    for (const eaten of ["\t", "\f", "\b", "\r", "\v"]) {
      expect(solutionProblems(`\\(a ${eaten}x\\)`).join()).toMatch(/control character/);
    }
  });

  it("flags en and em dashes", () => {
    expect(solutionProblems("Area \u2014 base times height.")).toContain("en or em dash");
    expect(solutionProblems("Pages 3\u20135.")).toContain("en or em dash");
  });

  it("flags a backslash doubled by escaping twice", () => {
    // JSON "\\\\(x\\\\)" decodes to "\\(x\\)": LaTeX reads \\ as a line break, then "(x".
    expect(solutionProblems("Area is \\\\(x^2\\\\).").join()).toMatch(/doubled backslash/);
    expect(solutionProblems("So \\\\frac{1}{2}.").join()).toMatch(/doubled backslash/);
  });

  it("allows a matrix row break, even before the next command", () => {
    expect(solutionProblems("\\[ \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix} \\]")).toEqual([]);
    expect(solutionProblems("\\[ \\begin{array}{c} a \\\\\\hline b \\end{array} \\]")).toEqual([]);
    // A row break straight before a variable (a real IPMAT draft, 2026-10-24).
    expect(solutionProblems("\\(A=\\begin{bmatrix}4&q\\\\p&r\\end{bmatrix}\\)")).toEqual([]);
  });

  it("flags unbalanced inline and display delimiters", () => {
    expect(solutionProblems("\\(x + 1 = 2")).toContain("unbalanced \\( \\)");
    expect(solutionProblems("\\[x + 1 = 2")).toContain("unbalanced \\[ \\]");
  });

  it("flags a literal backslash-n", () => {
    expect(solutionProblems("Step one.\\nStep two.")).toContain("literal \\n");
  });

  it("flags stored when it speaks of the answer or key", () => {
    expect(solutionProblems("The stored answer is (C).").join()).toMatch(/stored/);
    expect(solutionProblems("This matches the stored key.").join()).toMatch(/stored/);
    expect(solutionProblems("The option stored as correct is (B).").join()).toMatch(/stored/);
  });

  it("allows stored as ordinary science", () => {
    expect(solutionProblems("Bile is made by the liver and stored in the gall bladder.")).toEqual([]);
    expect(solutionProblems("Food is stored as starch.")).toEqual([]);
    expect(solutionProblems("Energy is restored to the system.")).toEqual([]);
  });

  it("flags a line break inside inline maths, the trace of \\neq eaten by JSON", () => {
    // JSON "\\(x \neq 2\\)" decodes to "\(x " + LF + "eq 2\)"
    expect(solutionProblems("\\(x \neq 2\\)").join()).toMatch(/line break inside/);
  });

  it("flags an eaten \\n command at a line start inside display maths", () => {
    expect(solutionProblems("\\[ a \nabla f \\]").join()).toMatch(/eaten/);
    expect(solutionProblems("\\[ x \neq 0 \\]").join()).toMatch(/eaten/);
  });

  it("allows real line breaks in display maths that are not eaten commands", () => {
    expect(solutionProblems("\\[\n\\begin{aligned} a &= b \\\\\n c &= d \\end{aligned}\n\\]")).toEqual([]);
  });

  it("flags Unicode maths symbols the style rule writes in LaTeX", () => {
    expect(solutionProblems("Area is \u03c0r\u00b2.").join()).toMatch(/Unicode maths/);
    expect(solutionProblems("x \u2264 3").join()).toMatch(/Unicode maths/);
  });

  it("does not flag Devanagari (Marathi solutions)", () => {
    expect(solutionProblems("\u092f\u094b\u0917\u094d\u092f \u0909\u0924\u094d\u0924\u0930 (B) \u0906\u0939\u0947.")).toEqual([]);
  });
});
