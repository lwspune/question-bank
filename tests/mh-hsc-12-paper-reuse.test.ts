import { describe, it, expect } from "vitest";
import { reuseKey, groupByReuseKey } from "../scripts/mh-hsc-12-pyq/paper/reuse";

describe("reuseKey — what counts as the SAME board question", () => {
  it("ignores where the comma sits relative to a math delimiter", () => {
    // The real case: Feb-2026 Q.6 vs March-2024 Q.6 differ only here, so
    // content_hash saw two questions and a human sees one.
    const a = "Find \\(k,\\) if the sum of the slopes of the lines is twice their product.";
    const b = "Find \\(k\\), if the sum of the slopes of the lines is twice their product.";
    expect(reuseKey(a)).toBe(reuseKey(b));
  });

  it("ignores whitespace and line breaks", () => {
    expect(reuseKey("Find   \\(k\\),\n if  the sum")).toBe(reuseKey("Find \\(k\\), if the sum"));
  });

  it("ignores case", () => {
    expect(reuseKey("Solve the D.E.")).toBe(reuseKey("solve the d.e."));
  });

  it("ignores \\dfrac vs \\frac, which differ only in rendered size", () => {
    expect(reuseKey("\\(\\dfrac{1}{2}\\)")).toBe(reuseKey("\\(\\frac{1}{2}\\)"));
  });

  it("ignores optional braces around a single-character exponent", () => {
    expect(reuseKey("\\(x^{2} + y^{2} = 1\\)")).toBe(reuseKey("\\(x^2 + y^2 = 1\\)"));
  });

  it("ignores a trailing full stop", () => {
    expect(reuseKey("Evaluate the integral")).toBe(reuseKey("Evaluate the integral."));
  });

  it("still separates questions that differ in a NUMBER", () => {
    // The board reuses a template with changed constants constantly. Those are
    // different questions and must not collapse together.
    expect(reuseKey("\\(x^2 + kxy - 3y^2 = 0\\)")).not.toBe(reuseKey("\\(x^2 + kxy - 5y^2 = 0\\)"));
  });

  it("still separates questions that differ in an operator", () => {
    expect(reuseKey("prove \\(a + b\\)")).not.toBe(reuseKey("prove \\(a - b\\)"));
  });

  it("still separates genuinely different prose", () => {
    expect(reuseKey("Find the area bounded by the circle")).not.toBe(reuseKey("Find the area bounded by the parabola"));
  });
});

describe("groupByReuseKey", () => {
  it("groups two spellings of one question and reports both members", () => {
    const rows = [
      { id: "new", text: "Find \\(k\\), if the sum of the slopes is twice their product." },
      { id: "old", text: "Find \\(k,\\) if the sum of the slopes is twice their product." },
      { id: "other", text: "Evaluate \\(\\int x\\,dx\\)" },
    ];
    const groups = groupByReuseKey(rows);
    expect(groups).toHaveLength(1);
    expect(groups[0].map((r) => r.id).sort()).toEqual(["new", "old"]);
  });

  it("returns nothing when every question is distinct", () => {
    expect(
      groupByReuseKey([
        { id: "a", text: "Evaluate \\(\\int x\\,dx\\)" },
        { id: "b", text: "Evaluate \\(\\int x^2\\,dx\\)" },
      ]),
    ).toEqual([]);
  });

  it("groups three or more copies together, not pairwise", () => {
    const rows = [
      { id: "a", text: "Prove the chain rule." },
      { id: "b", text: "prove the chain rule" },
      { id: "c", text: "Prove   the chain   rule." },
    ];
    const groups = groupByReuseKey(rows);
    expect(groups).toHaveLength(1);
    expect(groups[0]).toHaveLength(3);
  });
});
