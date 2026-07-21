import { describe, it, expect } from "vitest";
import {
  prettifyMathFallback,
  textWithMathToOmmlSegments,
} from "@/lib/export/ommlBuilder";

// When temml/mml2omml can't produce OMML (e.g. a superscript on a \cap/\cup
// group — the mml2omml crash), the docx exporter falls back to text. This
// prettifier makes that fallback readable Unicode instead of raw \(... \cup ...\)
// markup. Export-path only — the website (KaTeX) is unaffected.
const CUP = "∪"; // ∪
const CAP = "∩"; // ∩
const COMPL = "ᶜ"; // ᶜ modifier small c (set complement)
const PRIME = "′"; // ′
const SQ = "²"; // ²
const OL = "̅"; // combining overline
const TIMES = "×"; // ×
const EMPTY = "∅"; // ∅

describe("prettifyMathFallback", () => {
  it("renders a ^c complement on a union group", () => {
    expect(prettifyMathFallback("(A \\cup B)^c")).toBe(`(A ${CUP} B)${COMPL}`);
  });

  it("renders a prime complement", () => {
    expect(prettifyMathFallback("(B' \\cap A)'")).toBe(`(B${PRIME} ${CAP} A)${PRIME}`);
  });

  it("renders a genuine square on an intersection group", () => {
    expect(prettifyMathFallback("n(A \\cap B)^2 = n^2")).toBe(
      `n(A ${CAP} B)${SQ} = n${SQ}`
    );
  });

  it("renders \\bar complements with a combining overline", () => {
    expect(prettifyMathFallback("\\bar{A}\\cap\\bar{B}")).toBe(`A${OL}${CAP}B${OL}`);
  });

  it("unwraps \\{ \\} braces and keeps set-builder content", () => {
    expect(prettifyMathFallback("(A \\cup B)'=\\{s, t\\}")).toBe(
      `(A ${CUP} B)${PRIME}={s, t}`
    );
  });

  it("maps \\times and \\emptyset", () => {
    expect(prettifyMathFallback("A \\times B = \\emptyset")).toBe(
      `A ${TIMES} B = ${EMPTY}`
    );
  });

  it("never leaves raw \\cup/\\cap macros for the crashing family", () => {
    for (const z of ["(A \\cup B)^C", "A^c \\cap B^c = (A \\cup B)^c"]) {
      expect(prettifyMathFallback(z)).not.toMatch(/\\cup|\\cap/);
    }
  });

  it("leaves an unmapped macro intact rather than mangling it", () => {
    expect(prettifyMathFallback("A \\oplus B")).toBe("A \\oplus B");
  });
});

describe("textWithMathToOmmlSegments — prettified fallback", () => {
  it("emits readable Unicode (no delimiters, no backslash macros) when OMML conversion fails", () => {
    const segs = textWithMathToOmmlSegments("Simplify \\((A \\cup B)^c\\).");
    const joined = segs
      .map((s) => (s as { content: string }).content)
      .join("");
    expect(joined).toContain(`(A ${CUP} B)${COMPL}`);
    expect(joined).not.toContain("\\cup");
    expect(joined).not.toContain("\\(");
    expect(segs.every((s) => s.type === "text")).toBe(true);
  });

  it("leaves a convertible expression as OMML (happy path unchanged)", () => {
    const segs = textWithMathToOmmlSegments("Value \\(\\frac{1}{2}\\) ok");
    expect(segs.some((s) => s.type === "math")).toBe(true);
  });
});
