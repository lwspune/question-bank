import { describe, it, expect } from "vitest";
import { launcherHiddenAfterScroll } from "../src/lib/chat/launcherScroll";

/**
 * The chat launcher on phones (UX_ACTION_PLAN.md A7, decision D5): it covered
 * card content on every page, so it now gets out of the way while the student
 * reads down a page and comes back the moment they scroll up. Not removed
 * outright: V had 66 uses from 19 signed-in students in its first 4 days.
 */
describe("launcherHiddenAfterScroll", () => {
  it("hides after a real scroll down, past the top of the page", () => {
    expect(launcherHiddenAfterScroll({ prevY: 400, y: 460, hidden: false })).toBe(true);
  });

  it("comes back on any real scroll up", () => {
    expect(launcherHiddenAfterScroll({ prevY: 900, y: 850, hidden: true })).toBe(false);
  });

  it("always shows near the top of the page", () => {
    expect(launcherHiddenAfterScroll({ prevY: 60, y: 100, hidden: false })).toBe(false);
    expect(launcherHiddenAfterScroll({ prevY: 300, y: 80, hidden: true })).toBe(false);
  });

  it("ignores jitter: a few pixels either way changes nothing", () => {
    expect(launcherHiddenAfterScroll({ prevY: 500, y: 504, hidden: false })).toBe(false);
    expect(launcherHiddenAfterScroll({ prevY: 500, y: 497, hidden: true })).toBe(true);
  });
});
