/**
 * NDA Maths · 3D Geometry · sphere-3d + straight-line-3d · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation. Formula-recall is in the formulas verify files.
 *   npm run quiz:verify nda-maths__3d-geometry-computation-c
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ---------- sphere-3d ----------
  // diameter-form
  e("diameter-form:practiceSet:0", ["one of the endpoints", "the foot of perpendicular from the origin", "the point dividing PB in ratio 2:1"]),
  e("diameter-form:practiceSet:2", [f("(2,0,0)"), f("(0,0,0)"), f("(\\tfrac12,0,0)")]),
  e("diameter-form:practiceSet:3", [f("1"), f("|\\overrightarrow{PA}|\\,|\\overrightarrow{PB}|"), f("-1")]),
  // sphere-and-axes
  e("sphere-and-axes:practiceSet:0", [f("\\sqrt{x_c^2+y_c^2+z_c^2}"), f("\\sqrt{y_c^2+z_c^2}"), f("|z_c|")]),
  e("sphere-and-axes:practiceSet:1", ["4", "6", "2"]),
  e("sphere-and-axes:practiceSet:2", ["the diameter", "the distance from the origin", "half the radius"]),
  e("sphere-and-axes:practiceSet:3", [f("\\sqrt{37}"), f("14"), f("\\sqrt{101}")]),
  // sphere-and-plane
  e("sphere-and-plane:practiceSet:0", [f("0"), f("2r"), f("\\sqrt{r^2 - p^2}")]),
  e("sphere-and-plane:practiceSet:1", [f("\\sqrt{r^2 + p^2}"), f("r - p"), f("\\sqrt{p^2 - r^2}")]),
  e("sphere-and-plane:practiceSet:2", ["touch at one point", "cut in a great circle", "cut in a circle of radius \\(\\sqrt{r^2-p^2}\\)"]),
  e("sphere-and-plane:practiceSet:3", [f("2r"), f("0"), f("\\sqrt{r^2 - x_c^2}")]),
  e("sphere-and-plane:selfCheck:0", ["Touches — \\(p = 3 = r\\).", "Cuts — \\(p = 3 < r = 2\\).", "Cuts in a circle of radius \\(\\sqrt{13}\\)."]),
  // sphere-equation-centre-radius
  e("sphere-equation-centre-radius:practiceSet:0", [f("(-2,-3,-4)"), f("(4,6,8)"), f("(2,3,4),\\ r=16")]),
  e("sphere-equation-centre-radius:practiceSet:1", [f("u^2+v^2+w^2-d"), f("\\sqrt{u^2+v^2+w^2+d}"), f("\\sqrt{d-u^2-v^2-w^2}")]),
  e("sphere-equation-centre-radius:practiceSet:2", [f("(1,0,0)"), f("(2,0,0)"), f("(-2,0,0)")]),
  e("sphere-equation-centre-radius:practiceSet:3", ["each 2", "each 0", "any equal value"]),
  e("sphere-equation-centre-radius:selfCheck:0", ["Centre \\((-1,-2,1)\\), radius \\(3\\).", "Centre \\((1,2,-1)\\), radius \\(9\\).", "Centre \\((2,4,-2)\\), radius \\(3\\)."]),
  // sphere-from-conditions
  e("sphere-from-conditions:practiceSet:0", ["radius", "constant term d", "their equation exactly"]),
  e("sphere-from-conditions:practiceSet:1", [f("x^2+y^2+z^2=5"), f("x^2+y^2+z^2=10"), f("(x-5)^2+y^2+z^2=0")]),
  e("sphere-from-conditions:practiceSet:2", ["the radius r", "the coefficient u", "the centre"]),
  e("sphere-from-conditions:practiceSet:3", [f("(x-1)^2+y^2+z^2=2"), f("x^2+y^2+z^2=4"), f("(x-2)^2+y^2+z^2=1")]),
  e("sphere-from-conditions:selfCheck:0", [f("x^2+y^2+z^2-2x-6y-8z-5 = 0"), f("x^2+y^2+z^2-2x-6y-8z+5 = 0"), f("x^2+y^2+z^2=5")]),
  // sphere-locus-problems
  e("sphere-locus-problems:practiceSet:1", [f("u = 0"), f("d = r"), f("w = 0")]),
  e("sphere-locus-problems:practiceSet:2", [f("(u, 0, 0)"), f("(-2u, 0, 0)"), f("(0, 0, 0)")]),
  e("sphere-locus-problems:practiceSet:3", ["point", "straight line", "pair of planes"]),

  // ---------- straight-line-3d ----------
  // line-equation-forms
  e("line-equation-forms:practiceSet:0", [f("\\langle 1,1,1\\rangle"), f("\\langle 2,3,4\\rangle/\\sqrt{29}"), f("\\langle -2,-3,-4\\rangle")]),
  e("line-equation-forms:practiceSet:1", [f("(2t, 3t, 4t)"), f("(1+t, 3t, -1+t)"), f("(1-2t, -3t, -1-4t)")]),
  e("line-equation-forms:practiceSet:2", ["One", "Three", "Infinitely many"]),
  e("line-equation-forms:practiceSet:3", ["Two points", "A point only", "A direction only"]),
  e("line-equation-forms:practiceSet:4", [f("\\vec{n_1}\\cdot\\vec{n_2}"), f("\\vec{n_1}+\\vec{n_2}"), f("\\vec{n_1}-\\vec{n_2}")]),
  // line-meets-coordinate-plane
  e("line-meets-coordinate-plane:practiceSet:0", [f("x"), f("y"), "both x and y"]),
  e("line-meets-coordinate-plane:practiceSet:1", [f("z"), f("y"), "both y and z"]),
  e("line-meets-coordinate-plane:practiceSet:2", [f("t=0"), f("t=-3"), f("t=6")]),
  e("line-meets-coordinate-plane:practiceSet:3", [f("(0,0,-3)"), f("(3,6,3)"), f("(-3,-6,0)")]),
  e("line-meets-coordinate-plane:selfCheck:0", [f("\\left(0, \\tfrac52, -\\tfrac72\\right)"), f("\\left(0, 5, -4\\right)"), f("\\left(2, 0, \\tfrac12\\right)")]),
  // line-parallel-or-lying-in-plane
  e("line-parallel-or-lying-in-plane:practiceSet:0", [f("1"), f("|\\vec{d}|\\,|\\vec{n}|"), f("-1")]),
  e("line-parallel-or-lying-in-plane:practiceSet:1", ["No (dot \\(\\ne 0\\))", "Only if it also passes through the origin", "Perpendicular"]),
  e("line-parallel-or-lying-in-plane:practiceSet:3", ["No (dot \\(\\ne 0\\))", "Perpendicular (dot \\(\\ne 0\\))", "Lies in the plane"]),
  // line-plane-intersection
  e("line-plane-intersection:practiceSet:0", ["the coordinates x, y, z", "the plane's normal", "two parameters s and t"]),
  e("line-plane-intersection:practiceSet:2", ["Is parallel and misses it", "Meets it at one point", "Is perpendicular to it"]),
  e("line-plane-intersection:practiceSet:3", [f("t=9"), f("t=0"), f("t=\\tfrac13")]),
  e("line-plane-intersection:selfCheck:0", [f("\\left(3, \\tfrac52, -\\tfrac32\\right)"), f("(2, 2, -1)"), f("(6, 4, -3)")]),
  // point-on-a-line
  e("point-on-a-line:practiceSet:0", [f("(2, 1, 0)"), f("(6, -1, 6)"), f("(4, 3, 6)")]),
  e("point-on-a-line:practiceSet:1", [f("t=5"), f("t=4"), f("t=\\tfrac52")]),
  e("point-on-a-line:practiceSet:2", ["No", "Only if t = 0", "Cannot be determined"]),
  e("point-on-a-line:practiceSet:3", ["Exactly two", "Only one", "None"]),
  e("point-on-a-line:selfCheck:0", [f("15"), f("-1"), f("3")]),
];
