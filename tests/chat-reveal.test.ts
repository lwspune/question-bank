/**
 * V's reply shown a line at a time (owner, 2026-10-23: "one block is heavy on
 * cognition; one line after another helps in digesting"). The bubble grows
 * line by line; these are the lines and the pause before each.
 * Pure core src/lib/chat/reveal.ts.
 */
import { describe, it, expect } from "vitest";
import { revealSteps, stepDelayMs, REVEAL_MIN_MS, REVEAL_MAX_MS } from "@/lib/chat/reveal";

describe("revealSteps", () => {
  it("gives one step per line, and the steps put together are the reply exactly", () => {
    const text = "Your pick (B) is right.\nTorque and energy match.\nSo B is the odd pair.";
    const steps = revealSteps(text);
    expect(steps).toEqual(["Your pick (B) is right.\n", "Torque and energy match.\n", "So B is the odd pair."]);
    expect(steps.join("")).toBe(text);
  });

  it("keeps a blank line with the line after it, so a gap never shows on its own", () => {
    const steps = revealSteps("First.\n\n- one\n- two");
    expect(steps).toEqual(["First.\n", "\n- one\n", "- two"]);
  });

  it("never cuts maths that runs over a line break", () => {
    const text = "Integrate:\n\\[ V = -\\int_{\\infty}^{r}\nE\\,dx \\]\nSo V = kq/r.";
    const steps = revealSteps(text);
    expect(steps).toEqual(["Integrate:\n", "\\[ V = -\\int_{\\infty}^{r}\nE\\,dx \\]\n", "So V = kq/r."]);
    expect(revealSteps("a \\(x +\ny\\) b\nc")).toEqual(["a \\(x +\ny\\) b\n", "c"]);
  });

  it("is a single step for a one-line reply, and none for an empty one", () => {
    expect(revealSteps("Hi!")).toEqual(["Hi!"]);
    expect(revealSteps("")).toEqual([]);
  });
});

describe("stepDelayMs: the pause after a line, long enough to read it", () => {
  it("grows with the line's length, between a floor and a ceiling", () => {
    expect(stepDelayMs("Ok.\n")).toBe(REVEAL_MIN_MS);
    expect(stepDelayMs("x".repeat(500))).toBe(REVEAL_MAX_MS);
    const mid = stepDelayMs("Surface tension and impulse do not match.\n");
    expect(mid).toBeGreaterThan(REVEAL_MIN_MS);
    expect(mid).toBeLessThan(REVEAL_MAX_MS);
  });

  it("keeps an 8-line answer under about 8 seconds in all", () => {
    const steps = revealSteps(Array.from({ length: 8 }, (_, i) => `Line ${i}: ${"word ".repeat(14)}`).join("\n"));
    const total = steps.slice(0, -1).reduce((s, x) => s + stepDelayMs(x), 0);
    expect(total).toBeLessThanOrEqual(8000);
  });
});
