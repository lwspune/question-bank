import { describe, expect, it } from "vitest";
import { fixSplitCdots, hasSplitCdots } from "../scripts/lib/textProbes";

// Real rows, 2026-10-29: an MHT-CET transcription split `\cdots` into `\cdot s`,
// which KaTeX draws as a centred dot then the letter s.
const SPLIT: [string, string][] = [
  ["then \\(x = \\cdot s\\) Coplanar", "fill-in blank"],
  ["\\({}^{8}C_{2}+{}^{8}C_{3}+\\cdot s+{}^{8}C_{8}\\)", "sum"],
  ["\\((2)(5)(10)\\cdot s(1 + n^2)\\)", "product of brackets"],
  ["\\(\\left(\\frac{a}{b}\\right)^2 = (\\cdot s)^3\\)", "inside brackets"],
  ["\\(\\frac{1}{f(x)f_1(x)\\cdot s f_{n-1}(x)}\\)", "before a spaced term"],
  ["\\(|1 + i|^2|1 + 2i|^2\\cdot s|1 + ni|^2\\)", "after an exponent"],
  ["\\(z_1 \\cdot z_2 = \\cdot s\\cdot s\\)", "a doubled run"],
  ["\\(\\sqrt{\\tan x + \\cdot s\\cdot s\\infty}\\)", "before infinity"],
];

// Genuine products with a quantity named s, and words starting with s.
const GENUINE: [string, string][] = [
  ["\\(J = 6\\,N\\cdot s\\). So", "newton-second unit"],
  ["\\(K_{sp} = s \\cdot s = s^2\\)", "s times s"],
  ["\\[v^2 = 2g\\sin\\theta \\cdot s\\]", "distance s after a symbol"],
  ["\\(v_{rel}^2 - 2a \\cdot s_{rel}\\)", "subscripted s"],
  ["\\(k(x) = f(x) \\cdot sin(x)\\)", "sin without a backslash"],
  ["\\(\\cdot sec\\left( e^x \\right)\\)", "sec without a backslash"],
  ["Its diagonal is \\(\\sqrt{2} \\cdot s\\sqrt{n}\\)", "side s times a root (CDS 8f8ae4ca)"],
  ["\\(\\cdots\\)", "already correct"],
];

describe("hasSplitCdots", () => {
  it.each(SPLIT)("flags %s (%s)", (text) => {
    expect(hasSplitCdots(text)).toBe(true);
  });
  it.each(GENUINE)("does not flag %s (%s)", (text) => {
    expect(hasSplitCdots(text)).toBe(false);
  });
});

describe("fixSplitCdots", () => {
  it("restores every split in a row, and only those", () => {
    expect(fixSplitCdots("\\(z_1 \\cdot z_2 = \\cdot s\\cdot s\\)")).toBe("\\(z_1 \\cdot z_2 = \\cdots\\cdots\\)");
    expect(fixSplitCdots("\\((2)(5)(10)\\cdot s(1 + n^2)\\)")).toBe("\\((2)(5)(10)\\cdots(1 + n^2)\\)");
    expect(fixSplitCdots("\\(\\tan x + \\cdot s\\cdot s\\infty\\)")).toBe("\\(\\tan x + \\cdots\\cdots\\infty\\)");
  });
  it("keeps a space before a following letter so the command does not swallow it", () => {
    expect(fixSplitCdots("\\(f_1(x)\\cdot s f_{n-1}(x)\\)")).toBe("\\(f_1(x)\\cdots f_{n-1}(x)\\)");
  });
  it.each(GENUINE)("leaves %s alone (%s)", (text) => {
    expect(fixSplitCdots(text)).toBe(text);
  });
  it("is idempotent", () => {
    const once = fixSplitCdots("\\(x = \\cdot s\\cdot s + \\cdot s\\)");
    expect(fixSplitCdots(once)).toBe(once);
  });
});
