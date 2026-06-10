/**
 * NDA Maths · 3D Geometry · coordinates-distance-section + plane-3d · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation. Formula-recall is in the formulas verify file.
 *   npm run quiz:verify nda-maths__3d-geometry-computation-b
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── coordinates-distance-section ──

  // collinearity-and-shapes
  e("collinearity-and-shapes:practiceSet:0", ["No", "Only if signs match", "Cannot be determined"]),
  e("collinearity-and-shapes:practiceSet:1", [f("AB^2 + BC^2 = AC^2"), f("AB \\cdot BC = AC"), f("AB = BC = AC")]),
  e("collinearity-and-shapes:practiceSet:3", [f("AB + BC = AC"), f("AB^2 - BC^2 = AC^2"), f("AB^2 + AC^2 = BC^2")]),

  // coordinate-system-octants
  e("coordinate-system-octants:practiceSet:0", ["4", "6", "16"]),
  e("coordinate-system-octants:practiceSet:1", ["XY-plane", "XZ-plane", "x-axis"]),
  e("coordinate-system-octants:practiceSet:2", ["x-axis", "y-axis", "XY-plane"]),
  e("coordinate-system-octants:practiceSet:3", ["One (x)", "Three (all)", "Zero"]),

  // distance-formula
  e("distance-formula:practiceSet:0", [f("11"), f("\\sqrt{11}"), f("49")]),
  e("distance-formula:practiceSet:1", [f("7"), f("\\sqrt{7}"), f("25")]),
  e("distance-formula:practiceSet:2", [f("19"), f("\\sqrt{19}"), f("12")]),
  e("distance-formula:practiceSet:3", [f("10"), f("6"), f("\\sqrt{14}")]),
  e("distance-formula:selfCheck:0", [f("\\sqrt{13}"), f("\\sqrt{29}"), f("\\sqrt{20}")]),

  // midpoint-centroid
  e("midpoint-centroid:practiceSet:0", [f("(3,3,3)"), f("(1,1,3)"), f("(0,1,1)")]),
  e("midpoint-centroid:practiceSet:1", [f("(6,8,10)"), f("(2,2,2)"), f("(4,4,5)")]),
  e("midpoint-centroid:practiceSet:2", [f("1:2"), f("3:1"), f("1:1")]),
  e("midpoint-centroid:practiceSet:3", [f("(12,12,12)"), f("(3,3,3)"), f("(6,6,6)")]),
  e("midpoint-centroid:selfCheck:0", [f("A = (4, 2, 12)"), f("A = (1, 0, 1)"), f("A = (7, 3, 13)")]),

  // section-formula
  e("section-formula:practiceSet:0", [f("(2,3,1)"), f("(3,4.5,1.5)"), f("(4.5,6.75,2.25)")]),
  e("section-formula:practiceSet:1", [f("x = 0"), f("y = 0"), f("z = 1")]),
  e("section-formula:practiceSet:2", [f("(6,12,16)"), f("(2,4,4)"), f("(3,6,4)")]),
  e("section-formula:practiceSet:3", [f("z\\text{-coordinate of divider} = 0"), f("y\\text{-coordinate of divider} = 0"), f("k = 0")]),
  e("section-formula:selfCheck:0", [f("(4, 2, -2)"), f("(2, 2, -1)"), f("(1, 1, -1)")]),

  // ── plane-3d ──

  // angle-between-planes
  e("angle-between-planes:practiceSet:0", ["intercepts", "constants", "x-intercepts"]),
  e("angle-between-planes:practiceSet:1", [f("1"), f("-1"), f("\\sqrt2")]),
  e("angle-between-planes:practiceSet:2", ["No", "Only if equal", "Perpendicular"]),
  e("angle-between-planes:practiceSet:3", [f("1"), f("\\tfrac12"), f("-1")]),

  // distance-and-foot-of-perpendicular
  e("distance-and-foot-of-perpendicular:practiceSet:0", [f("9"), f("\\tfrac{9}{\\sqrt3}"), f("1")]),
  e("distance-and-foot-of-perpendicular:practiceSet:1", [f("1"), f("3"), f("\\tfrac{1}{\\sqrt3}")]),
  e("distance-and-foot-of-perpendicular:practiceSet:3", ["normal", "given plane", "bisector"]),
  e("distance-and-foot-of-perpendicular:selfCheck:0", [f("\\tfrac13"), f("\\tfrac12"), f("2")]),

  // intercept-and-special-planes
  e("intercept-and-special-planes:practiceSet:0", [f("x+y+z=3"), f("xyz=1"), f("\\tfrac{x}{1}+\\tfrac{y}{1}+\\tfrac{z}{1}=0")]),
  e("intercept-and-special-planes:practiceSet:1", ["a line", "a point", "a sphere"]),
  e("intercept-and-special-planes:practiceSet:2", [f("z = 3"), f("y = 3"), f("x + y + z = 3")]),
  e("intercept-and-special-planes:practiceSet:3", [f("4"), f("1"), f("\\tfrac12")]),

  // plane-equation-forms
  e("plane-equation-forms:practiceSet:0", [f("\\langle -1,2,-5\\rangle"), f("\\langle 1,2,5\\rangle"), f("\\langle 1,-2,5,9\\rangle")]),
  e("plane-equation-forms:practiceSet:1", [f("y = 0"), f("z = 0"), f("x + y + z = 0")]),
  e("plane-equation-forms:practiceSet:3", [f("x + y + z = 1"), f("x = 0"), f("x - y + z = 0")]),
  e("plane-equation-forms:selfCheck:0", [f("\\langle 2, 3, 6\\rangle"), f("\\langle -2, 3, -6\\rangle"), f("\\langle 2, -3, 6, 4\\rangle")]),

  // plane-through-intersection
  e("plane-through-intersection:practiceSet:0", [f("P_1 \\cdot P_2 = 0"), f("P_1 \\times P_2 = 0"), f("P_1 = P_2")]),
  e("plane-through-intersection:practiceSet:1", ["two", "three", "none"]),
  e("plane-through-intersection:practiceSet:2", ["the point", f("\\vec{n}"), "the normal"]),
  e("plane-through-intersection:practiceSet:3", ["cross product = 0", "sum = 0", "magnitudes equal"]),

  // plane-through-three-points
  e("plane-through-three-points:practiceSet:1", [f("x+y+z=1"), f("x+y+z=6"), f("2x+2y+2z=1")]),
  e("plane-through-three-points:practiceSet:3", ["Two", "Four", "One"]),
  e("plane-through-three-points:selfCheck:0", [f("x + y + z = 6"), f("x - y + z = 4"), f("x + y + z = 2")]),
];
