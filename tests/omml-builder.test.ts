import { describe, it, expect } from "vitest";
import {
  latexToOmml,
  textWithMathToOmmlSegments,
} from "@/lib/export/ommlBuilder";

describe("latexToOmml", () => {
  it("converts a simple fraction to OMML", () => {
    const omml = latexToOmml("\\frac{1}{2}");
    expect(omml).not.toBeNull();
    expect(omml!).toMatch(/m:oMath/);
    // OMML fraction element
    expect(omml!).toMatch(/m:f/);
  });

  it("converts a sum to OMML", () => {
    const omml = latexToOmml("\\sum_{i=1}^n x_i");
    expect(omml).not.toBeNull();
    expect(omml!).toMatch(/m:oMath/);
  });

  it("returns null for unparseable LaTeX (graceful fallback)", () => {
    const omml = latexToOmml("\\frac{1");
    expect(omml).toBeNull();
  });
});

describe("textWithMathToOmmlSegments", () => {
  it("returns a single text segment for plain prose", () => {
    expect(textWithMathToOmmlSegments("hello world")).toEqual([
      { type: "text", content: "hello world" },
    ]);
  });

  it("splits text + inline LaTeX correctly", () => {
    const segs = textWithMathToOmmlSegments(
      "Solve \\(\\frac{1}{2}\\) please"
    );
    expect(segs).toHaveLength(3);
    expect(segs[0]).toEqual({ type: "text", content: "Solve " });
    expect(segs[1].type).toBe("math");
    expect((segs[1] as { content: string }).content).toMatch(/m:oMath/);
    expect(segs[2]).toEqual({ type: "text", content: " please" });
  });

  it("treats block LaTeX as a math segment (display)", () => {
    const segs = textWithMathToOmmlSegments("Eq: \\[\\frac{a}{b}\\]");
    const math = segs.find((s) => s.type === "math");
    expect(math).toBeDefined();
    expect((math as { display: boolean }).display).toBe(true);
  });

  it("falls back to original text when LaTeX is unparseable", () => {
    const segs = textWithMathToOmmlSegments("Broken \\(\\frac{1\\) here");
    // No math segments — the broken expression became plain text
    expect(segs.every((s) => s.type === "text")).toBe(true);
    // The broken expression contents should still be present (so the doc is readable)
    expect(segs.map((s) => s.content).join("")).toContain("\\frac{1");
  });

  it("handles real-world Excel content with multiple math expressions", () => {
    const segs = textWithMathToOmmlSegments(
      "The resultant of \\(\\vec{A}\\) and \\(\\vec{B}\\) is \\(\\vec{R}\\)"
    );
    expect(segs.filter((s) => s.type === "math")).toHaveLength(3);
  });
});
