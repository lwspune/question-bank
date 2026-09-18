import { describe, it, expect } from "vitest";
import {
  DEFAULT_PRESENT_SIZE,
  MIN_PRESENT_SIZE,
  MAX_PRESENT_SIZE,
  clampPresentSize,
  stepPresentSize,
  readPresentSize,
} from "@/lib/present/textSize";

/**
 * Text size for the classroom overlay. Pure because the overlay itself is a
 * Radix portal that does not exist until a click, so this is the part of it a
 * test can reach.
 *
 * The defaults are a ROOM measurement, not a design preference: a stem sized for
 * a laptop at arm's length is unreadable from the back row of a classroom, so
 * the overlay opens far larger than the card it was opened from.
 */

describe("clampPresentSize", () => {
  it("passes a normal size through", () => {
    expect(clampPresentSize(40)).toBe(40);
  });

  it("clamps below the floor and above the ceiling", () => {
    expect(clampPresentSize(4)).toBe(MIN_PRESENT_SIZE);
    expect(clampPresentSize(400)).toBe(MAX_PRESENT_SIZE);
  });

  it("falls back to the default for a non-finite value", () => {
    // Math.max(MIN, NaN) is NaN — a clamp that forgets this ships NaN as a
    // font-size and the overlay renders at zero. Pinned deliberately.
    expect(clampPresentSize(Number.NaN)).toBe(DEFAULT_PRESENT_SIZE);
    expect(clampPresentSize(Number.POSITIVE_INFINITY)).toBe(MAX_PRESENT_SIZE);
  });

  it("opens larger than body text by default — this is for a room, not a laptop", () => {
    expect(DEFAULT_PRESENT_SIZE).toBeGreaterThanOrEqual(28);
  });
});

describe("stepPresentSize", () => {
  it("steps up and down", () => {
    expect(stepPresentSize(40, +1)).toBeGreaterThan(40);
    expect(stepPresentSize(40, -1)).toBeLessThan(40);
  });

  it("saturates at the bounds rather than overshooting", () => {
    expect(stepPresentSize(MAX_PRESENT_SIZE, +1)).toBe(MAX_PRESENT_SIZE);
    expect(stepPresentSize(MIN_PRESENT_SIZE, -1)).toBe(MIN_PRESENT_SIZE);
  });
});

describe("readPresentSize", () => {
  it("parses a stored value", () => {
    expect(readPresentSize("44")).toBe(44);
  });

  it("returns the default for junk, empty and null", () => {
    // localStorage can hold anything, including a value from an older build.
    expect(readPresentSize(null)).toBe(DEFAULT_PRESENT_SIZE);
    expect(readPresentSize("")).toBe(DEFAULT_PRESENT_SIZE);
    expect(readPresentSize("large")).toBe(DEFAULT_PRESENT_SIZE);
  });

  it("clamps a stored value that is out of range", () => {
    expect(readPresentSize("999")).toBe(MAX_PRESENT_SIZE);
  });
});
