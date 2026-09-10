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

describe("applyTrim — a governing clause printed once, after the second half", () => {
  // The board prints:
  //
  //     Write preparation of (a) diethyl ether (b) ethyl cyanide from ethyl bromide.
  //
  // One question, two chapters. "from ethyl bromide" is the SUBSTRATE for BOTH
  // halves and is printed only once, at the end — so `take: "before"` structurally
  // cannot keep it, and the Alcohols half was left reading "Write preparation of
  // (a) diethyl ether", naming no starting material at all. That is not merely
  // untidy: it stops being the "two products from one substrate" question the
  // board set, and it becomes indistinguishable from two other rows in the same
  // chapter that ask for diethyl ether by continuous etherification.
  //
  // Found by the authoring agent, which read the source .docx rather than taking
  // the trimmed stem at face value. `append` is the minimum primitive that
  // expresses it; the alternative was a stem fix in defects.json, which runs at
  // EXTRACT time and so could never match text the dedupe pass creates later.

  const printed =
    "Write preparation of (a) diethyl ether (b) ethyl cyanide from ethyl bromide.";

  it("appends the governing clause to the first half", () => {
    expect(applyTrim(printed, "(b) ethyl cyanide", "before", " from ethyl bromide.")).toBe(
      "Write preparation of (a) diethyl ether from ethyl bromide.",
    );
  });

  it("leaves the second half untouched — it already carries the clause", () => {
    expect(applyTrim(printed, "(b) ethyl cyanide", "after")).toBe(
      "(b) ethyl cyanide from ethyl bromide.",
    );
  });

  it("is a no-op when no append is given", () => {
    // Every existing ledger entry omits it, so this is what proves the change
    // cannot move a trim that is already correct.
    expect(applyTrim(printed, "(b) ethyl cyanide", "before")).toBe(
      "Write preparation of (a) diethyl ether",
    );
  });

  it("refuses an append that is only whitespace", () => {
    // A blank append is a silent no-op that still reports success — the same
    // shape as a stem fix whose `to` equals its `from`, which this pipeline has
    // already shipped once.
    expect(() => applyTrim(printed, "(b) ethyl cyanide", "before", "   ")).toThrow(/append/i);
  });

  it("refuses an append the trimmed half already ends with", () => {
    // Guards the double-apply: appending a clause that is already there would
    // read as "…from ethyl bromide from ethyl bromide."
    expect(() =>
      applyTrim(printed, "(b) ethyl cyanide", "after", " from ethyl bromide."),
    ).toThrow(/already/i);
  });
});
