/**
 * NDA Maths · 3D Geometry · subtopic `direction-cosines-ratios` · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation.
 *   npm run quiz:verify nda-maths__3d-geometry-computation-a
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // angle-between-two-lines
  e("angle-between-two-lines:practiceSet:0", [f("1"), f("\\tfrac{1}{\\sqrt2}\\ (45°)"), f("-1\\ (180°)")]),
  e("angle-between-two-lines:practiceSet:1", [f("90°"), f("45°"), f("180°")]),
  e("angle-between-two-lines:practiceSet:2", [f("1"), f("-1"), f("|\\vec{a}||\\vec{b}|")]),
  e("angle-between-two-lines:practiceSet:3", [f("\\tfrac12\\ (60°)"), f("\\tfrac{\\sqrt3}{2}\\ (30°)"), f("0\\ (90°)")]),

  // dcs-from-a-line
  e("dcs-from-a-line:practiceSet:0", [f("\\langle 1,0,-2\\rangle"), f("\\langle -3,-4,-5\\rangle"), f("\\langle \\tfrac13,\\tfrac14,\\tfrac15\\rangle")]),
  e("dcs-from-a-line:practiceSet:1", [f("\\langle 2,1,0\\rangle"), f("\\langle 3,1,4\\rangle"), f("\\langle 5,0,4\\rangle")]),
  e("dcs-from-a-line:practiceSet:2", [f("1"), f("-2"), f("0")]),
  e("dcs-from-a-line:practiceSet:3", [f("\\langle 0,3,4\\rangle"), f("\\langle 0,\\tfrac45,\\tfrac35\\rangle"), f("\\langle 0,\\tfrac34,1\\rangle")]),
  e("dcs-from-a-line:selfCheck:0", [f("\\langle 1,-2,2\\rangle"), f("\\left\\langle \\tfrac13,\\tfrac23,\\tfrac23\\right\\rangle"), f("\\left\\langle \\tfrac23,-\\tfrac13,\\tfrac23\\right\\rangle")]),

  // dcs-of-axes-and-special-lines
  e("dcs-of-axes-and-special-lines:practiceSet:0", [f("\\langle 0,1,0\\rangle"), f("\\langle 0,0,1\\rangle"), f("\\left\\langle \\tfrac{1}{\\sqrt3},\\tfrac{1}{\\sqrt3},\\tfrac{1}{\\sqrt3}\\right\\rangle")]),
  e("dcs-of-axes-and-special-lines:practiceSet:1", ["x-axis", "z-axis", "the origin"]),
  e("dcs-of-axes-and-special-lines:practiceSet:2", ["the x-component (l = 0)", "the y-component (m = 0)", "all three components"]),
  e("dcs-of-axes-and-special-lines:practiceSet:3", [f("0°"), f("45°"), f("180°")]),

  // direction-angle-identities
  e("direction-angle-identities:practiceSet:0", [f("0"), f("2"), f("3")]),
  e("direction-angle-identities:practiceSet:1", [f("1"), f("3"), f("0")]),
  e("direction-angle-identities:practiceSet:2", [f("1"), f("0"), f("-3")]),
  e("direction-angle-identities:practiceSet:3", ["Yes", "Only with two of them", "Cannot be determined"]),
  e("direction-angle-identities:selfCheck:0", [f("60°"), f("30°"), f("90°")]),

  // dr-dc-fundamentals
  e("dr-dc-fundamentals:practiceSet:0", [f("0"), f("3"), f("\\tfrac{1}{\\sqrt3}")]),
  e("dr-dc-fundamentals:practiceSet:1", [f("\\langle 1,2,2\\rangle"), f("\\left\\langle \\tfrac{1}{\\sqrt3},\\tfrac{2}{\\sqrt3},\\tfrac{2}{\\sqrt3}\\right\\rangle"), f("\\left\\langle \\tfrac23,\\tfrac13,\\tfrac23\\right\\rangle")]),
  e("dr-dc-fundamentals:practiceSet:2", ["No", "Only \\(\\langle 0,1,0\\rangle\\) can", "Only if they are normalised"]),
  e("dr-dc-fundamentals:practiceSet:3", [f("\\tfrac13"), f("\\tfrac{1}{\\sqrt2}"), f("1")]),
  e("dr-dc-fundamentals:selfCheck:0", [f("3"), f("\\tfrac{1}{\\sqrt3}"), f("0")]),

  // perpendicular-parallel-lines
  e("perpendicular-parallel-lines:practiceSet:0", ["No", "They are perpendicular", "Cannot be determined"]),
  e("perpendicular-parallel-lines:practiceSet:1", ["No", "They are parallel", "Cannot be determined"]),
  e("perpendicular-parallel-lines:practiceSet:2", ["Dot product", "Addition", "Scalar projection"]),
  e("perpendicular-parallel-lines:practiceSet:3", [f("1"), f("-1"), f("\\tfrac43")]),
  e("perpendicular-parallel-lines:practiceSet:4", [f("\\vec{n_1}\\cdot\\vec{n_2}"), f("\\vec{n_1}+\\vec{n_2}"), f("\\vec{n_1}-\\vec{n_2}")]),
  e("perpendicular-parallel-lines:selfCheck:0", [f("x = \\tfrac{7}{2}"), f("x = -7"), f("x = -\\tfrac{1}{2}")]),

  // projection-on-axis
  e("projection-on-axis:practiceSet:0", [f("-3"), f("6"), f("4")]),
  e("projection-on-axis:practiceSet:1", [f("-8"), f("10"), f("9")]),
  e("projection-on-axis:practiceSet:2", [f("x_2 - x_1"), f("z_2 - z_1"), f("y_1 - y_2")]),
  e("projection-on-axis:practiceSet:3", [f("1"), "the full length of the segment", "its magnitude"]),
  e("projection-on-axis:selfCheck:0", [f("7"), f("\\tfrac{22}{3}"), f("6")]),
];
