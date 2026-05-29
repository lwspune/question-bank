import { describe, it, expect } from "vitest";
import {
  parseLatex,
  splitBold,
  parseRichText,
} from "@/components/math/parseLatex";

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

describe("splitBold", () => {
  it("returns plain text unchanged", () => {
    expect(splitBold("plain text")).toEqual([{ bold: false, text: "plain text" }]);
  });

  it("splits a **bold** span out of surrounding text", () => {
    expect(splitBold("a **b** c")).toEqual([
      { bold: false, text: "a " },
      { bold: true, text: "b" },
      { bold: false, text: " c" },
    ]);
  });

  it("handles a whole-string bold span", () => {
    expect(splitBold("**only**")).toEqual([{ bold: true, text: "only" }]);
  });

  it("leaves a lone (unpaired) ** as literal text", () => {
    expect(splitBold("a ** b")).toEqual([{ bold: false, text: "a ** b" }]);
  });
});

describe("parseRichText", () => {
  it("returns a single paragraph for plain prose with inline math", () => {
    expect(parseRichText("hello \\(x\\) world")).toEqual([
      {
        type: "paragraph",
        runs: [
          { type: "text", content: "hello " },
          { type: "inline", content: "x" },
          { type: "text", content: " world" },
        ],
      },
    ]);
  });

  it("emits bold runs inside a paragraph", () => {
    expect(parseRichText("A **term** here")).toEqual([
      {
        type: "paragraph",
        runs: [
          { type: "text", content: "A " },
          { type: "bold", content: "term" },
          { type: "text", content: " here" },
        ],
      },
    ]);
  });

  it("does NOT treat digits in prose as a masked math placeholder", () => {
    // Regression: an earlier sentinel matched ` <digit> ` and corrupted prose.
    expect(parseRichText("a die is tossed 3 times")).toEqual([
      { type: "paragraph", runs: [{ type: "text", content: "a die is tossed 3 times" }] },
    ]);
  });

  it("splits a lead paragraph from a following bullet list", () => {
    expect(parseRichText("Lead sentence.\n- one\n- two")).toEqual([
      { type: "paragraph", runs: [{ type: "text", content: "Lead sentence." }] },
      {
        type: "list",
        items: [
          [{ type: "text", content: "one" }],
          [{ type: "text", content: "two" }],
        ],
      },
    ]);
  });

  it("renders bold + inline math inside a bullet item", () => {
    expect(parseRichText("- **Event** \\(E\\) is a subset")).toEqual([
      {
        type: "list",
        items: [
          [
            { type: "bold", content: "Event" },
            { type: "text", content: " " },
            { type: "inline", content: "E" },
            { type: "text", content: " is a subset" },
          ],
        ],
      },
    ]);
  });

  it("returns empty array for empty input", () => {
    expect(parseRichText("")).toEqual([]);
  });
});
