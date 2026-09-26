import { describe, it, expect } from "vitest";
import { revealArrowLabels, hasHiddenArrowLabel } from "../scripts/lib/phantomArrows";

// Fixtures are real stems from the bank (2026-09-26), trimmed to the arrow.
describe("revealArrowLabels", () => {
  it("reveals a single reagent over an arrow", () => {
    expect(revealArrowLabels("Ketone \\(\\overset{\\phantom{R\\ }}{\\rightarrow}\\) semi carbazone")).toBe(
      "Ketone \\(\\xrightarrow{R}\\) semi carbazone"
    );
  });

  it("reveals a reagent above and a condition below", () => {
    expect(
      revealArrowLabels("\\(\\underset{\\phantom{H_{3}O^{+}\\ }}{\\overset{\\phantom{\\text{conc.~}NaOH\\ }}{\\rightarrow}}\\text{~product~}\\)")
    ).toBe("\\(\\xrightarrow[H_{3}O^{+}]{\\text{conc.~}NaOH}\\text{~product~}\\)");
  });

  it("keeps a visible label beside a hidden one, and its internal spacing", () => {
    expect(revealArrowLabels("Anisole \\(\\underset{398\\ K}{\\overset{\\phantom{HI\\ }}{\\rightarrow}}A\\)")).toBe(
      "Anisole \\(\\xrightarrow[398\\ K]{HI}A\\)"
    );
  });

  it("trims the padding pandoc puts around a hidden label", () => {
    expect(
      revealArrowLabels("\\(\\underset{\\phantom{\\text{~dil.~}NaOH\\ }}{\\overset{\\ \\ \\ \\ \\ \\phantom{\\Delta\\ }\\ \\ \\ }{\\rightarrow}}A\\)")
    ).toBe("\\(\\xrightarrow[\\text{~dil.~}NaOH]{\\Delta}A\\)");
  });

  it("reads an arrow used as the BASE of \\overset as a label below it", () => {
    expect(
      revealArrowLabels("\\(\\overset{\\phantom{HBr\\ }}{\\overset{\\rightarrow}{\\phantom{\\text{~Peroxide~}\\ }}}\\) Product")
    ).toBe("\\(\\xrightarrow[\\text{~Peroxide~}]{HBr}\\) Product");
  });

  it("rewrites every arrow in a sequence", () => {
    expect(
      revealArrowLabels("\\(\\overset{\\phantom{Sn/HCl}}{\\rightarrow}/\\overset{\\phantom{{Br}_{2}}}{\\rightarrow}\\)")
    ).toBe("\\(\\xrightarrow{Sn/HCl}/\\xrightarrow{{Br}_{2}}\\)");
  });

  it("braces a below-label that contains a closing square bracket", () => {
    expect(revealArrowLabels("\\(\\underset{\\phantom{[H]}}{\\overset{\\phantom{X}}{\\rightarrow}}\\)")).toBe(
      "\\(\\xrightarrow[{[H]}]{X}\\)"
    );
  });

  it("leaves an arrow with only visible labels alone", () => {
    const s = "\\(\\overset{H^{+}}{\\rightarrow}\\) A and \\(\\underset{\\text{~(air)~}}{O_{2}}\\)";
    expect(revealArrowLabels(s)).toBe(s);
  });

  it("leaves a fill-in blank alone (JEE numeric stems)", () => {
    const s = "The molar mass of gas \\(A\\) is \\(\\underline{\\phantom{000}}\\ g\\ mol^{-1}\\)";
    expect(revealArrowLabels(s)).toBe(s);
  });

  it("leaves a cancellation mark alone", () => {
    const s = "\\[- \\frac{(\\phantom{\\text{x}}6 - \\phantom{\\text{x}}6 + 45 - 7)}{38}\\]";
    expect(revealArrowLabels(s)).toBe(s);
  });

  it("is idempotent", () => {
    const once = revealArrowLabels("\\(\\overset{\\phantom{\\Delta\\ }}{\\rightarrow}\\)");
    expect(revealArrowLabels(once)).toBe(once);
  });

  it("leaves malformed input unchanged rather than guessing", () => {
    const s = "\\(\\overset{\\phantom{R}{\\rightarrow}\\)";
    expect(revealArrowLabels(s)).toBe(s);
  });
});

describe("hasHiddenArrowLabel", () => {
  it("fires exactly when the repair would change the text", () => {
    expect(hasHiddenArrowLabel("\\(\\overset{\\phantom{HCl}}{\\rightarrow}\\)")).toBe(true);
    expect(hasHiddenArrowLabel("\\(\\overset{HCl}{\\rightarrow}\\)")).toBe(false);
    expect(hasHiddenArrowLabel("\\(\\underline{\\phantom{000}}\\)")).toBe(false);
    expect(hasHiddenArrowLabel("")).toBe(false);
  });
});
