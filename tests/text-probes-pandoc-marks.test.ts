import { describe, expect, it } from "vitest";
import { proseDoubleHyphen, prosePandocScript } from "../scripts/lib/textProbes";

// 2026-11-17 (SUGGESTIONS 2026-09-10): pandoc writes the source's en dash, minus
// sign and fill-in blank as "--", and its superscript/subscript as ^x^ / ~x~.
// Outside a math zone both print literally. Neither probe repairs: "--" means a
// minus, a hyphen, a dash or a blank depending on the sentence, so a hit is a
// question for a person, never a mechanical fix.
describe("proseDoubleHyphen", () => {
  it("finds a double hyphen used as a dash, a minus sign or a blank", () => {
    expect(proseDoubleHyphen("Boolean expression for Exclusive -- OR (X -- OR) gate.")).toBe(true);
    expect(proseDoubleHyphen("Match List -- I with List -- II")).toBe(true);
    expect(proseDoubleHyphen("option C reads --1")).toBe(true);
    expect(proseDoubleHyphen("This is -- -- -- type of reproduction.")).toBe(true);
  });

  it("ignores math zones, table separator rows and an empty table cell", () => {
    expect(proseDoubleHyphen("If \\(x--1 = 0\\) then")).toBe(false);
    expect(proseDoubleHyphen("| a | b |\n|---|---|\n| 1 | 2 |")).toBe(false);
    expect(proseDoubleHyphen("| Cost (in Rs.) | 4 | 6 | -- |")).toBe(false);
    expect(proseDoubleHyphen("A horizontal rule\n---\nbelow")).toBe(false);
    expect(proseDoubleHyphen("a well-known x-axis")).toBe(false);
  });
});

describe("prosePandocScript", () => {
  it("finds pandoc superscripts and subscripts in prose", () => {
    expect(prosePandocScript("is 223 Ω^-1^cm^2^mol^-1^. What")).toBe(true);
    expect(prosePandocScript("can be chosen in ^10^C~3~ ways")).toBe(true);
    expect(prosePandocScript("The 2^nd^ derivative")).toBe(true);
  });

  it("ignores math zones and a lone caret or tilde", () => {
    expect(prosePandocScript("\\(\\cos^245^\\circ\\) and \\(a~b~c\\)")).toBe(false);
    expect(prosePandocScript("x^2 + y^2 in plain text")).toBe(false);
    expect(prosePandocScript("about ~5 cm")).toBe(false);
  });
});
