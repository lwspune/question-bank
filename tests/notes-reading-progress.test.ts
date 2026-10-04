import { describe, it, expect } from "vitest";
import { readingProgress, activeSectionId } from "@/lib/notes/readingProgress";

/**
 * Two read-outs for a long notes topic page (13,569 px on desktop, ~20 phone
 * screens): a thin progress bar, and the "On this page" rail that highlights
 * the concept being read. Both are pure so the scroll handlers stay trivial.
 */
describe("readingProgress", () => {
  it("is 0 at the top and 1 at the bottom", () => {
    expect(readingProgress({ scrollY: 0, scrollHeight: 5000, viewportHeight: 1000 })).toBe(0);
    expect(readingProgress({ scrollY: 4000, scrollHeight: 5000, viewportHeight: 1000 })).toBe(1);
  });

  it("is the fraction of the scrollable distance in between", () => {
    expect(readingProgress({ scrollY: 1000, scrollHeight: 5000, viewportHeight: 1000 })).toBe(0.25);
  });

  it("clamps overscroll (iOS bounce) to 0..1", () => {
    expect(readingProgress({ scrollY: -40, scrollHeight: 5000, viewportHeight: 1000 })).toBe(0);
    expect(readingProgress({ scrollY: 4100, scrollHeight: 5000, viewportHeight: 1000 })).toBe(1);
  });

  it("a page that does not scroll counts as read", () => {
    expect(readingProgress({ scrollY: 0, scrollHeight: 800, viewportHeight: 1000 })).toBe(1);
  });
});

describe("activeSectionId", () => {
  const at = (...tops: number[]) => tops.map((top, i) => ({ id: `c${i + 1}`, top }));

  it("is the last section whose top has passed the line", () => {
    expect(activeSectionId(at(-900, -100, 300, 1200), 120)).toBe("c2");
  });

  it("a section exactly on the line counts as reached", () => {
    expect(activeSectionId(at(-500, 120, 900), 120)).toBe("c2");
  });

  it("before the first section, the first is current", () => {
    expect(activeSectionId(at(400, 1200), 120)).toBe("c1");
  });

  it("no sections, no current one", () => {
    expect(activeSectionId([], 120)).toBeNull();
  });
});
