import { describe, it, expect } from "vitest";
import { findOmmlFailures } from "@/lib/export/ommlAudit";

// findOmmlFailures flags exactly the math zones the docx exporter cannot
// convert to OMML (latexToOmml → null → raw-LaTeX fallback). It mirrors
// textWithMathToOmmlSegments' decision, so a hit here == a raw fallback there.
describe("findOmmlFailures", () => {
  it("returns [] when a zone converts cleanly", () => {
    expect(findOmmlFailures("\\(A \\cup B\\)")).toEqual([]);
  });

  it("returns [] for plain prose (no math)", () => {
    expect(findOmmlFailures("If A and B are subsets of a set")).toEqual([]);
  });

  it("flags the mml2omml-crashing nested-prime complement", () => {
    const f = findOmmlFailures("\\((B' \\cap A)'\\)");
    expect(f).toHaveLength(1);
    expect(f[0]).toEqual({ latex: "(B' \\cap A)'", display: false });
  });

  it("flags a real crashing option verbatim", () => {
    const f = findOmmlFailures(
      "\\(A' \\cup (A \\cup B) = (B' \\cap A)' \\cup A\\)"
    );
    expect(f).toHaveLength(1);
  });

  it("returns only the failing zone when good + bad math are mixed", () => {
    const f = findOmmlFailures("good \\(A \\cup B\\) bad \\((C' \\cap B)'\\)");
    expect(f).toHaveLength(1);
    expect(f[0].latex).toContain("(C' \\cap B)'");
  });

  it("does NOT flag an underline-bypass zone (native Word underline)", () => {
    expect(findOmmlFailures("\\(\\underline{\\text{word}}\\)")).toEqual([]);
  });

  it("flags genuinely unparseable LaTeX too (also a raw fallback)", () => {
    expect(findOmmlFailures("\\(\\frac{1\\)")).toHaveLength(1);
  });

  it("marks a display (block) failure with display:true", () => {
    // \[...\] block form of the crashing construct
    const f = findOmmlFailures("\\[(B' \\cap A)'\\]");
    expect(f).toHaveLength(1);
    expect(f[0].display).toBe(true);
  });
});
