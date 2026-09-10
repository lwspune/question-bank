import { describe, it, expect } from "vitest";
import { applyTrim } from "../scripts/mh-hsc-12-pyq/dedupe";

// The Physics compilation's Section-C/D questions pair a THEORY part with an
// unrelated NUMERICAL, and the two halves routinely belong to different
// chapters — so the compiler pasted the whole question into each chapter it
// touches. Each copy is trimmed to its own half. Every string below is real.

describe("applyTrim", () => {
  const q28 =
    "From differential equation of linear S.H.M., obtain an expression for acceleration, " +
    "velocity and displacement of a particle performing S.H.M. A sonometer wire 1 metre " +
    "along weighing 2 g is in resonance with a tuning fork of frequency 300 Hz. " +
    "Find tension in the sonometer wire.";

  it("keeps the half BEFORE the anchor", () => {
    expect(applyTrim(q28, "A sonometer wire 1 metre", "before")).toBe(
      "From differential equation of linear S.H.M., obtain an expression for acceleration, " +
        "velocity and displacement of a particle performing S.H.M.",
    );
  });

  it("keeps the half AFTER the anchor, anchor included", () => {
    expect(applyTrim(q28, "A sonometer wire 1 metre", "after")).toBe(
      "A sonometer wire 1 metre along weighing 2 g is in resonance with a tuning fork " +
        "of frequency 300 Hz. Find tension in the sonometer wire.",
    );
  });

  // The cut creates a NEW end of string, so residue that was harmless
  // mid-sentence is now trailing. pandoc's hard-wrap backslash is the common
  // case: "...What is mass defect?\ The photoelectric work function..."
  it("re-cleans residue the cut exposes at the new end", () => {
    const s =
      "With the help of a neat labelled diagram, describe the Geiger-Marsden experiment. " +
      "What is mass defect?\\ The photoelectric work function for a metal surface is 2.3 eV.";
    expect(applyTrim(s, "The photoelectric work function", "before")).toBe(
      "With the help of a neat labelled diagram, describe the Geiger-Marsden experiment. " +
        "What is mass defect?",
    );
  });

  it("REFUSES an anchor that is absent", () => {
    expect(() => applyTrim(q28, "A tuning fork of frequency 512 Hz", "before")).toThrow(/not found/i);
  });

  it("REFUSES an anchor that occurs more than once — the cut would be arbitrary", () => {
    const twice = "State Ohm's law. Calculate the current. State Ohm's law again.";
    expect(() => applyTrim(twice, "State Ohm's law", "after")).toThrow(/2 times|more than once/i);
  });

  it("REFUSES a cut that would leave nothing", () => {
    expect(() => applyTrim(q28, "From differential equation", "before")).toThrow(/empty/i);
  });
});
