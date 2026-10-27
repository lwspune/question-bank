// Copied from Concept Ladder (src/lessons/renderDeck.test.ts, afca8bf).
import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
const { renderDeck } = await import("@/lib/learn/lesson/renderDeck");

describe("renderDeck", () => {
  it("renders math in a slide's heading, and keeps a plain title for screen readers", () => {
    const [slide] = renderDeck([{ id: "formal-1", title: "The $n$th term", kind: "text", body: "B" }]);
    expect(slide.title).toBe("The nth term");
    expect(slide.heading.some((n) => n.type === "math")).toBe(true);
  });

  it("renders each point as inline text with its math", () => {
    const [slide] = renderDeck([{ id: "idea", title: "The idea", kind: "points", points: ["A **degree** is $1^\circ$.", "Two."] }]);
    expect(slide.kind).toBe("points");
    if (slide.kind !== "points") return;
    expect(slide.points).toHaveLength(2);
    expect(slide.points[0].some((n) => n.type === "math")).toBe(true);
    expect(slide.points[0].some((n) => n.type === "text" && n.bold)).toBe(true);
  });
});

