import { describe, it, expect } from "vitest";
import { matchUnderlineBypass } from "@/components/math/underlineBypass";

describe("matchUnderlineBypass (web renderer)", () => {
  it("matches a plain underlined word", () => {
    expect(matchUnderlineBypass("\\underline{\\text{absently}}")).toEqual({
      word: "absently",
      italic: false,
      trailing: "",
    });
  });

  it("matches an italic underlined phrase (biology taxonomy)", () => {
    expect(matchUnderlineBypass("\\underline{\\textit{Homo sapiens}}")).toEqual({
      word: "Homo sapiens",
      italic: true,
      trailing: "",
    });
  });

  it("captures trailing punctuation outside the underline", () => {
    expect(matchUnderlineBypass("\\underline{\\text{word}}.")).toEqual({
      word: "word",
      italic: false,
      trailing: ".",
    });
  });

  it("tolerates surrounding/inner whitespace", () => {
    expect(matchUnderlineBypass("  \\underline{ \\text{x} } ")).toEqual({
      word: "x",
      italic: false,
      trailing: "",
    });
  });

  it("does NOT match genuine math", () => {
    expect(matchUnderlineBypass("x^2")).toBeNull();
    expect(matchUnderlineBypass("\\frac{1}{2}")).toBeNull();
    expect(matchUnderlineBypass("\\underline{x+1}")).toBeNull();
  });

  it("does NOT match unsupported variants (textbf, chained, embedded)", () => {
    expect(matchUnderlineBypass("\\underline{\\textbf{word}}")).toBeNull();
    expect(matchUnderlineBypass("\\underline{\\text{a}}\\underline{\\text{b}}")).toBeNull();
    expect(matchUnderlineBypass("a\\underline{\\text{b}}")).toBeNull();
  });
});
