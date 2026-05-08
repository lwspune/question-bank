import { describe, it, expect } from "vitest";
import { parseLatex } from "@/components/math/parseLatex";

describe("parseLatex", () => {
  it("returns plain text as a single text segment", () => {
    expect(parseLatex("hello world")).toEqual([
      { type: "text", content: "hello world" },
    ]);
  });

  it("parses inline LaTeX with \\(...\\) (the format used by our reference Excel)", () => {
    expect(parseLatex("Solve \\(x = 5\\) please")).toEqual([
      { type: "text", content: "Solve " },
      { type: "inline", content: "x = 5" },
      { type: "text", content: " please" },
    ]);
  });

  it("parses inline LaTeX with $...$", () => {
    expect(parseLatex("Solve $x = 5$ please")).toEqual([
      { type: "text", content: "Solve " },
      { type: "inline", content: "x = 5" },
      { type: "text", content: " please" },
    ]);
  });

  it("parses block LaTeX with \\[...\\]", () => {
    expect(parseLatex("Eq: \\[\\frac{1}{2}\\]")).toEqual([
      { type: "text", content: "Eq: " },
      { type: "block", content: "\\frac{1}{2}" },
    ]);
  });

  it("parses block LaTeX with $$...$$", () => {
    expect(parseLatex("Eq: $$x^2$$")).toEqual([
      { type: "text", content: "Eq: " },
      { type: "block", content: "x^2" },
    ]);
  });

  it("handles multiple expressions in one string", () => {
    const result = parseLatex("\\(\\vec{A}\\) and \\(\\vec{B}\\)");
    expect(result.filter((s) => s.type === "inline")).toHaveLength(2);
    expect(result.filter((s) => s.type === "inline").map((s) => s.content)).toEqual([
      "\\vec{A}",
      "\\vec{B}",
    ]);
  });

  it("handles real reference excel content", () => {
    const text =
      "The frequency of \\(\\frac{1}{3}\\) m forms a real image at distance \\(d\\) from the lens.";
    const segs = parseLatex(text);
    expect(segs.filter((s) => s.type === "inline").map((s) => s.content)).toEqual([
      "\\frac{1}{3}",
      "d",
    ]);
  });

  it("returns empty array for empty input", () => {
    expect(parseLatex("")).toEqual([]);
  });
});
