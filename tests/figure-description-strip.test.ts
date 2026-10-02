import { describe, it, expect } from "vitest";
import { stripFigureDescriptions, removeExactlyOnce } from "../scripts/lib/figures/strip";

// 2026-10-03: once a question carries its real figure, the prose stand-in
// ("[Diagram: a pendulum hangs from…]") is removed so the student sees the
// figure, not a figure plus a paragraph describing it (owner's decision).
describe("stripFigureDescriptions", () => {
  it("removes a [FIGURE: …] block and keeps the question around it", () => {
    const t = "Consider the following three-dimensional figure : [FIGURE: a hexagon (I) joined to (II).] How many triangles are there?";
    expect(stripFigureDescriptions(t)).toBe("Consider the following three-dimensional figure : How many triangles are there?");
  });

  it("handles Figure, Diagram, Graph and Image, in any case", () => {
    expect(stripFigureDescriptions("A [Diagram: x] B")).toBe("A B");
    expect(stripFigureDescriptions("A [graph: x] B")).toBe("A B");
    expect(stripFigureDescriptions("A [Figure: x] B")).toBe("A B");
    expect(stripFigureDescriptions("A [Image: x] B")).toBe("A B");
  });

  it("keeps square brackets nested inside the block balanced", () => {
    expect(stripFigureDescriptions("Graph : [FIGURE: axis marked [0, 10] in steps.] Answer.")).toBe("Graph : Answer.");
  });

  it("removes every block when there are several", () => {
    expect(stripFigureDescriptions("[Figure: a] Q1 text [Figure: b] end")).toBe("Q1 text end");
  });

  // A citation such as "[Fig. 1.10(a)]" names the book's figure; it is not a
  // description and stays.
  it("leaves a figure citation without a colon alone", () => {
    const t = "An electron falls through 1.5 cm [Fig. 1.10(a)]. Find the time.";
    expect(stripFigureDescriptions(t)).toBe(t);
  });

  it("returns text with no block unchanged", () => {
    expect(stripFigureDescriptions("Find \\(x\\) if \\([a, b]\\) holds.")).toBe("Find \\(x\\) if \\([a, b]\\) holds.");
  });

  it("drops the blank line a block on its own line leaves behind", () => {
    expect(stripFigureDescriptions("Consider the graph :\n\n[FIGURE: bars]\n\nWhich month?")).toBe("Consider the graph :\n\nWhich month?");
  });

  // Truncating a stem silently is worse than not stripping: refuse.
  it("throws on an unclosed block", () => {
    expect(() => stripFigureDescriptions("A [FIGURE: never closed")).toThrow(/unclosed/i);
  });
});

describe("removeExactlyOnce", () => {
  it("removes a fragment that occurs exactly once and tidies the gap", () => {
    expect(removeExactlyOnce("Q. (The figure shows four steps.) Which order?", "(The figure shows four steps.)")).toBe("Q. Which order?");
  });

  it("throws when the fragment is missing", () => {
    expect(() => removeExactlyOnce("abc", "xyz")).toThrow(/not found/i);
  });

  it("throws when the fragment occurs more than once", () => {
    expect(() => removeExactlyOnce("ab ab", "ab")).toThrow(/more than once/i);
  });
});
