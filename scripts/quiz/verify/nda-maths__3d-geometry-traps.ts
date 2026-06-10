/**
 * NDA Maths · 3D Geometry · COMMON-TRAPS theme — "spot the mistake" MCQs.
 * 8 from the new misconception callouts authored into the notes (the first
 * distractor in each is the warned mistake) + pre-existing seeds appended below.
 *   npm run quiz:verify nda-maths__3d-geometry-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    atomKey: "distance-formula:trap:0",
    stem: "Find the distance between the points \\((0, 0, 0)\\) and \\((2, 3, 6)\\).",
    correct: f("7"),
    distractors: [f("49"), f("\\sqrt{13}"), f("11")],
    theme: "trap",
  },
  {
    atomKey: "section-formula:trap:0",
    stem: "Find the point dividing \\(A(1, 2, 3)\\) and \\(B(4, 8, 9)\\) internally in the ratio \\(2 : 1\\).",
    correct: f("(3, 6, 7)"),
    distractors: [f("(2, 4, 5)"), f("(2.5, 5, 6)"), f("(4, 8, 9)")],
    theme: "trap",
  },
  {
    atomKey: "dr-dc-fundamentals:trap:1",
    stem: "Find the direction cosines of the line whose direction ratios are \\(\\langle 1, 2, 2\\rangle\\).",
    correct: f("\\left\\langle \\tfrac13, \\tfrac23, \\tfrac23 \\right\\rangle"),
    distractors: [
      f("\\langle 1, 2, 2\\rangle"),
      f("\\left\\langle \\tfrac19, \\tfrac29, \\tfrac29 \\right\\rangle"),
      f("\\left\\langle \\tfrac{1}{\\sqrt5}, \\tfrac{2}{\\sqrt5}, \\tfrac{2}{\\sqrt5} \\right\\rangle"),
    ],
    theme: "trap",
  },
  {
    atomKey: "angle-between-two-lines:trap:0",
    stem: "Find the angle between the two lines with direction ratios \\(\\langle 1, 1, 0\\rangle\\) and \\(\\langle 1, 0, 0\\rangle\\).",
    correct: f("45^\\circ"),
    distractors: [f("0^\\circ"), f("90^\\circ"), f("60^\\circ")],
    theme: "trap",
  },
  {
    atomKey: "line-parallel-or-lying-in-plane:trap:1",
    stem: "A line has direction ratios \\(\\langle 1, 1, -2\\rangle\\) and a plane has equation \\(x + y + z = 5\\) (normal \\(\\langle 1, 1, 1\\rangle\\)). Since \\(\\langle 1,1,-2\\rangle \\cdot \\langle 1,1,1\\rangle = 0\\), how is the line related to the plane?",
    correct: "Parallel to the plane (its direction is perpendicular to the normal)",
    distractors: [
      "Perpendicular to the plane",
      "It intersects the plane at exactly one point",
      "It must lie inside the plane",
    ],
    theme: "trap",
  },
  {
    atomKey: "distance-and-foot-of-perpendicular:trap:1",
    stem: "Find the distance of the point \\((1, 2, 2)\\) from the plane \\(2x + y + 2z + 5 = 0\\).",
    correct: f("\\dfrac{13}{3}"),
    distractors: [f("13"), f("\\dfrac{13}{9}"), f("\\dfrac{13}{\\sqrt3}")],
    theme: "trap",
  },
  {
    atomKey: "sphere-equation-centre-radius:trap:0",
    stem: "Find the centre of the sphere \\(x^2 + y^2 + z^2 + 2x - 4y + 6z - 1 = 0\\).",
    correct: f("(-1, 2, -3)"),
    distractors: [f("(1, -2, 3)"), f("(2, -4, 6)"), f("(-2, 4, -6)")],
    theme: "trap",
  },
  {
    atomKey: "sphere-equation-centre-radius:trap:1",
    stem: "Find the radius of the sphere \\(x^2 + y^2 + z^2 - 2x + 4y - 6z - 2 = 0\\).",
    correct: f("4"),
    distractors: [f("2\\sqrt3"), f("16"), f("\\sqrt{14}")],
    theme: "trap",
  },
  // ── pre-existing trap seeds (authored from their hints) ──
  {
    atomKey: "direction-angle-identities:trap:0",
    stem: "A line makes equal angles with all three coordinate axes. Each angle is:",
    correct: f("\\cos^{-1}\\tfrac{1}{\\sqrt3}"),
    distractors: [f("45^\\circ"), f("60^\\circ"), f("90^\\circ")],
    theme: "trap",
  },
  {
    atomKey: "dr-dc-fundamentals:trap:0",
    stem: "Which of the following can be a set of direction COSINES of a line?",
    correct: f("\\left\\langle \\tfrac23, -\\tfrac13, \\tfrac23 \\right\\rangle"),
    distractors: [f("\\langle 2, -1, 2\\rangle"), f("\\langle 1, 1, 1\\rangle"), f("\\left\\langle \\tfrac12, \\tfrac12, \\tfrac12 \\right\\rangle")],
    theme: "trap",
  },
  {
    atomKey: "distance-and-foot-of-perpendicular:trap:0",
    stem: "Find the distance between the parallel planes \\(2x - y + 2z + 3 = 0\\) and \\(4x - 2y + 4z + 9 = 0\\).",
    correct: f("\\tfrac12"),
    distractors: [f("2"), f("1"), f("\\tfrac32")],
    theme: "trap",
  },
  {
    atomKey: "sphere-and-plane:trap:0",
    stem: "A sphere centred at \\((3, 4, 12)\\) is tangent to the \\(z\\)-axis. Find its radius.",
    correct: f("5"),
    distractors: [f("13"), f("12"), f("\\sqrt{20}")],
    theme: "trap",
  },
];
