// Copied from Concept Ladder (src/lessons/navigation.test.ts, afca8bf).
import { describe, expect, it } from "vitest";
import { type Position, backward, forward, offersStart, pointsOf, startAt } from "@/lib/learn/lesson/navigation";

// hook (no points), idea (3 points), formal-1 (2 points), worked-1 (no points)
const slides = [{ kind: "hook" }, { kind: "points", points: ["a", "b", "c"] }, { kind: "points", points: ["d", "e"] }, { kind: "worked" }] as const;
const at = (index: number, shown: number): Position => ({ index, shown });

describe("slide navigation with points", () => {
  it("counts a slide's points; other slides have none", () => {
    expect(slides.map(pointsOf)).toEqual([0, 3, 2, 0]);
  });

  it("enters a points slide with its first point shown", () => {
    expect(forward(slides, at(0, 0))).toEqual(at(1, 1));
    expect(startAt(slides, 1)).toEqual(at(1, 1));
  });

  it("shows the next point before moving on, then moves to the next slide", () => {
    expect(forward(slides, at(1, 1))).toEqual(at(1, 2));
    expect(forward(slides, at(1, 2))).toEqual(at(1, 3));
    expect(forward(slides, at(1, 3))).toEqual(at(2, 1));
    expect(forward(slides, at(2, 2))).toEqual(at(3, 0));
  });

  it("goes back a point at a time, then to the previous slide shown whole", () => {
    expect(backward(slides, at(1, 3))).toEqual(at(1, 2));
    expect(backward(slides, at(1, 1))).toEqual(at(0, 0));
    expect(backward(slides, at(2, 1))).toEqual(at(1, 3));
    expect(backward(slides, at(3, 0))).toEqual(at(2, 2));
  });

  it("stays put at either end", () => {
    expect(backward(slides, at(0, 0))).toEqual(at(0, 0));
    expect(forward(slides, at(3, 0))).toEqual(at(3, 0));
  });
});

describe("the first slide's Start button", () => {
  const can = { canFullscreen: true, isFullscreen: false, begun: false };

  it("offers Start on the first slide before the learner begins, where full screen works", () => {
    expect(offersStart(at(0, 0), can)).toBe(true);
    expect(offersStart(at(0, 1), can)).toBe(true);
  });

  it("offers Next where full screen is unavailable (iPhone)", () => {
    expect(offersStart(at(0, 0), { ...can, canFullscreen: false })).toBe(false);
  });

  it("offers Next once the learner has begun, or is already full screen", () => {
    expect(offersStart(at(0, 0), { ...can, begun: true })).toBe(false);
    expect(offersStart(at(0, 0), { ...can, isFullscreen: true })).toBe(false);
  });

  it("offers Next on any later slide (a returning learner opens on the questions)", () => {
    expect(offersStart(at(3, 0), can)).toBe(false);
  });
});
