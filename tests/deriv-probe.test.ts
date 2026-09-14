/**
 * The derivative detector behind `notes:coverage`'s only technique signal.
 *
 * Pure — no DB, so it runs in the default `npm test`.
 *
 * The case that motivated the fix is `\dfrac{f'}{g'}`: L'Hopital's canonical
 * form. The original regex required a prime to be followed by `(`, so it
 * missed it, and the probe reported 17 limits-continuity questions as using a
 * technique the notes "don't teach" — in a chapter whose notes carry a
 * dedicated L'Hopital concept. The transpose guard that caused it is still
 * load-bearing and is pinned below, so a future widening cannot quietly drop
 * it.
 */
import { describe, it, expect } from "vitest";
import { usesDerivative } from "../scripts/lib/derivProbe";

describe("usesDerivative — forms a derivative is actually written in", () => {
  it.each([
    ["Leibniz", "\\frac{d}{dx}(x^2)"],
    ["Leibniz, higher order", "\\frac{d^2}{dx^2}f"],
    ["Leibniz, dy/dx", "\\frac{dy}{dx}=2x"],
    ["slashed", "d/dx(\\sin x)"],
    ["partial", "\\partial u/\\partial x"],
    ["prime with argument", "f'(x)=2x"],
    ["double prime with argument", "f''(x)<0"],
    // the regression this module exists for
    ["L'Hopital ratio", "\\lim\\dfrac{f}{g}=\\lim\\dfrac{f'}{g'}"],
    ["L'Hopital ratio, bare", "\\dfrac{f'}{g'}"],
    ["L'Hopital ratio, slashed", "f'/g'"],
    ["L'Hopital ratio, second order", "\\dfrac{f''}{g''}"],
  ])("detects %s", (_label, zone) => {
    expect(usesDerivative(zone)).toBe(true);
  });

  it.each([
    // THE GUARD: transpose is written on an uppercase symbol and is NOT a
    // derivative. Dropping this would make every matrices chapter report a
    // derivative technique gap.
    ["matrix transpose", "A' = \\text{transpose of } A"],
    ["transpose in a product", "A'B"],
    ["transpose inside a fraction", "\\dfrac{A'}{2}"],
    ["no derivative at all", "x^2 + 2x + 1 = 0"],
    ["a fraction whose numerator is a variable named d", "\\frac{d}{x}"],
    // MEASURED false positives from the too-loose first attempt (2026-09-14).
    // A prime on a lowercase symbol is "modified value" as often as
    // "derivative", so these pin the narrower rule in place.
    ["modified gravity (Simple Pendulum)", "g' = g/2"],
    ["set complement (Probability via Counting)", "1+a'"],
    ["a single primed symbol with no quotient partner", "let y' denote the shifted value"],
    // The 3D-geometry symmetric form: the SECOND line's direction ratios
    // l', m', n'. `a'}{m'` (the `a` is the tail of `\alpha`) is shape-identical
    // to the L'Hopital `f'}{g'`, so the numerator brace must hold ONLY the
    // primed symbol. This one survived the first narrowing.
    [
      "3D symmetric form with primed direction ratios",
      "\\frac{x}{I'} = \\frac{y - \\alpha'}{m'} = \\frac{z - \\beta'}{n'}",
    ],
  ])("does NOT fire on %s", (_label, zone) => {
    expect(usesDerivative(zone)).toBe(false);
  });
});
