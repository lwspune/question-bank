import { describe, it, expect } from "vitest";
import { findCombiningMarks } from "../scripts/lib/combiningMarks";

/**
 * A combining mark (U+0300–U+036F) is drawn ON the letter before it. The
 * notes serif (Source Serif 4 via Google Fonts) ships NONE of them in any
 * subset (checked 2026-10-05), so the browser borrows the mark from another
 * font and it lands off the letter: "k̂" (k + U+0302) showed its hat beside the
 * k on /notes/nda-maths/vectors. Write the symbol as KaTeX (\(\hat{k}\)) or in
 * words. notes:latex fails on any hit.
 */
describe("findCombiningMarks", () => {
  it("finds a combining circumflex and names the letter it sits on", () => {
    expect(findCombiningMarks("the î, ĵ, k̂ basis")).toEqual([{ mark: "U+0302", after: "k" }]);
  });

  it("ignores precomposed letters (î, ĵ are single code points)", () => {
    expect(findCombiningMarks("î ĵ é ü ñ")).toEqual([]);
  });

  it("ignores KaTeX markup and plain text", () => {
    expect(findCombiningMarks("\\(\\hat{k}\\) and the i, j, k unit vectors")).toEqual([]);
  });

  it("finds every mark the font lacks, not just the circumflex", () => {
    expect(findCombiningMarks("a" + String.fromCodePoint(0x301) + " n" + String.fromCodePoint(0x303))).toEqual([
      { mark: "U+0301", after: "a" },
      { mark: "U+0303", after: "n" },
    ]);
  });

  it("allows the three marks the font's latin subset DOES ship (macron, diaeresis, vertical line below)", () => {
    // x-bar (mean), z-bar (conjugate), omega-bar: U+0304 draws correctly.
    const bar = String.fromCodePoint(0x304);
    expect(findCombiningMarks(`x${bar} z${bar} y${String.fromCodePoint(0x308)} e${String.fromCodePoint(0x329)}`)).toEqual([]);
  });
});
