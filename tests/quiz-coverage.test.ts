import { describe, it, expect } from "vitest";
import {
  isFormulaLike,
  proseFormulas,
  normalizeFormula,
  conceptCoverage,
  chapterFormulaGaps,
  trapCalloutCount,
} from "@/lib/quiz/coverage";

describe("isFormulaLike", () => {
  it("accepts real formulas (relation + structure)", () => {
    expect(isFormulaLike("m=\\dfrac{y_2-y_1}{x_2-x_1}")).toBe(true);
    expect(isFormulaLike("\\sin(A+B)=\\sin A\\cos B+\\cos A\\sin B")).toBe(true);
    expect(isFormulaLike("\\sec^2\\theta-\\tan^2\\theta=1")).toBe(true);
  });

  it("rejects trivial assignments and non-relations", () => {
    expect(isFormulaLike("x=2")).toBe(false);
    expect(isFormulaLike("n=10")).toBe(false);
    expect(isFormulaLike("f(x)")).toBe(false);
  });
});

describe("proseFormulas", () => {
  it("extracts formula-like zones across prose fields, ignoring trivial ones", () => {
    const def = "- \\(m=\\dfrac{y_2-y_1}{x_2-x_1}\\).\n- \\(y-y_1=m(x-x_1)\\).";
    const intu = "Set \\(x=0\\); the slope \\(m\\) is fixed.";
    expect(proseFormulas(def, intu)).toHaveLength(2); // `x=0` excluded
  });
});

describe("normalizeFormula", () => {
  it("canonicalises spacing, dfrac/tfrac, braces", () => {
    expect(normalizeFormula("\\dfrac{a}{b} = \\tfrac{a}{b}")).toBe(normalizeFormula("\\frac{a}{b}=\\frac{a}{b}"));
  });
});

describe("conceptCoverage (STRONG — empty formula.latex)", () => {
  it("flags a concept with prose formulas but EMPTY formula.latex (the Lines case)", () => {
    const c = conceptCoverage({
      slug: "lines-slope",
      kind: "formula",
      definition: "- \\(m=\\dfrac{y_2-y_1}{x_2-x_1}\\).\n- \\(y=mx+c\\).",
    });
    expect(c.flagged).toBe(true);
    expect(c.reason).toMatch(/EMPTY/);
    expect(c.latexCount).toBe(0);
  });

  it("does NOT flag a concept that exposes its formula", () => {
    const c = conceptCoverage({
      slug: "trig-fundamental",
      kind: "formula",
      definition: "The identity \\(\\sin^2\\theta+\\cos^2\\theta=1\\) holds.",
      formula: { latex: "\\sin^2\\theta+\\cos^2\\theta=1" },
    });
    expect(c.flagged).toBe(false);
  });

  it("does NOT flag a purely conceptual concept", () => {
    const c = conceptCoverage({ slug: "is-it-a-function", definition: "Each input maps to one output." });
    expect(c.flagged).toBe(false);
    expect(c.proseCount).toBe(0);
  });
});

describe("chapterFormulaGaps (REVIEW — chapter-wide match)", () => {
  it("flags an undercount bundle: 2 of 4 product-to-sum missing from formula.latex", () => {
    const concepts = [
      {
        slug: "trig-product-to-sum",
        kind: "formula",
        definition:
          "- \\(2\\sin A\\cos B=\\sin(A+B)+\\sin(A-B)\\).\n" +
          "- \\(2\\cos A\\sin B=\\sin(A+B)-\\sin(A-B)\\).\n" +
          "- \\(2\\cos A\\cos B=\\cos(A+B)+\\cos(A-B)\\).\n" +
          "- \\(2\\sin A\\sin B=\\cos(A-B)-\\cos(A+B)\\).",
        formula: {
          latex: "2\\sin A\\cos B=\\sin(A+B)+\\sin(A-B),\\qquad 2\\cos A\\cos B=\\cos(A+B)+\\cos(A-B)",
        },
      },
    ];
    const gaps = chapterFormulaGaps(concepts);
    const missing = gaps.map((g) => normalizeFormula(g.formula));
    expect(missing).toContain(normalizeFormula("2\\cos A\\sin B=\\sin(A+B)-\\sin(A-B)"));
    expect(missing).toContain(normalizeFormula("2\\sin A\\sin B=\\cos(A-B)-\\cos(A+B)"));
    // the two that ARE in formula.latex are not gaps
    expect(missing).not.toContain(normalizeFormula("2\\sin A\\cos B=\\sin(A+B)+\\sin(A-B)"));
    expect(gaps).toHaveLength(2);
  });

  it("does NOT flag a formula restated in prose but exposed in ANOTHER concept's latex", () => {
    const concepts = [
      {
        slug: "magnitude",
        kind: "formula",
        definition: "Recall the component form \\(\\vec{v}=v_1\\hat{i}+v_2\\hat{j}\\); then \\(|\\vec{v}|=\\sqrt{v_1^2+v_2^2}\\).",
        formula: { latex: "|\\vec{v}|=\\sqrt{v_1^2+v_2^2}" },
      },
      { slug: "component-form", kind: "formula", definition: "x", formula: { latex: "\\vec{v}=v_1\\hat{i}+v_2\\hat{j}" } },
    ];
    expect(chapterFormulaGaps(concepts)).toHaveLength(0); // both prose formulas covered chapter-wide
  });
});

describe("trapCalloutCount", () => {
  it("sums traps arrays across concepts", () => {
    expect(trapCalloutCount([{ traps: [{}, {}] }, { traps: [{}] }, {}, { traps: undefined }])).toBe(3);
  });
});
