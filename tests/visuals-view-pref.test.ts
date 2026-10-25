/**
 * Animated or Still is chosen PER QUESTION (owner, 2026-10-26: switching one
 * solution flipped every other open solution on the page). The device still
 * remembers the last choice, but only as the starting view of a solution
 * opened later. No jsdom here, so the "one tap moves one card" half is pinned
 * by reading the source: the hook must keep its own state, not a page-wide store.
 */
import { afterEach, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { readSolutionView, rememberSolutionView } from "@/lib/visuals/viewPref";

const g = globalThis as { window?: unknown };

function fakeWindow(store: Map<string, string>, throws = false) {
  g.window = {
    localStorage: {
      getItem: (k: string) => {
        if (throws) throw new Error("blocked");
        return store.get(k) ?? null;
      },
      setItem: (k: string, v: string) => {
        if (throws) throw new Error("blocked");
        store.set(k, v);
      },
    },
  };
}

afterEach(() => {
  delete g.window;
});

describe("solution view preference", () => {
  it("opens Animated when nothing is remembered", () => {
    fakeWindow(new Map());
    expect(readSolutionView()).toBe("animated");
  });

  it("remembers the last choice for solutions opened later", () => {
    fakeWindow(new Map());
    rememberSolutionView("still");
    expect(readSolutionView()).toBe("still");
    rememberSolutionView("animated");
    expect(readSolutionView()).toBe("animated");
  });

  it("falls back to Animated when storage is blocked", () => {
    fakeWindow(new Map(), true);
    expect(() => rememberSolutionView("still")).not.toThrow();
    expect(readSolutionView()).toBe("animated");
  });

  it("keeps each solution's view in its own state, not a page-wide store", () => {
    const src = readFileSync(join(__dirname, "../src/lib/visuals/viewPref.ts"), "utf8");
    expect(src).not.toMatch(/useSyncExternalStore/);
    expect(src).not.toMatch(/listeners/);
    expect(src).toMatch(/useState/);
  });
});
