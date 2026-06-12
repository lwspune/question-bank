/**
 * NDA Maths · Applications of Integration · COMMON-TRAPS theme — "spot the value/
 * mistake" MCQs. One per misconception callout authored into the notes. The first
 * distractor in each is the warned mistake (the tempting wrong answer).
 *
 * 12 traps: the chapter shipped with 10 callouts; +2 authored into the notes
 * (below-axis "negative area = missing modulus", intersection "limits are the
 * crossings") to clear the 12-floor.
 *   npm run quiz:verify nda-maths__applications-of-integration-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    // forgetting to split where the curve crosses the axis
    atomKey: "aoi-area-under-curve:trap:0",
    stem: "What is the GEOMETRIC area between \\(y = \\sin x\\) and the x-axis on \\([0, 2\\pi]\\)?",
    correct: f("4"),
    distractors: [f("0"), f("2"), f("-4")],
    theme: "trap",
  },
  {
    // raw integral = 0 ≠ area for an odd function over a symmetric interval
    atomKey: "aoi-below-axis-and-symmetry:trap:0",
    stem: "What is the GEOMETRIC area between \\(y = x^3\\) and the x-axis from \\(x = -1\\) to \\(x = 1\\)?",
    correct: f("\\tfrac{1}{2}"),
    distractors: [f("0"), f("\\tfrac{1}{4}"), f("1")],
    theme: "trap",
  },
  {
    // a negative answer means a missing modulus — area is always positive
    atomKey: "aoi-below-axis-and-symmetry:trap:1",
    stem: "The line \\(y = x\\) lies below the axis on \\([-2, 0]\\); \\(\\int_{-2}^{0} x\\,dx = -2\\). What is the AREA of that region?",
    correct: f("2"),
    distractors: [f("-2"), f("0"), f("4")],
    theme: "trap",
  },
  {
    // |x| ≤ p gives a side of 2p, not p
    atomKey: "aoi-modulus-and-linear-regions:trap:0",
    stem: "What is the area of the region \\(|x| \\le 3\\), \\(|y| \\le 2\\)?",
    correct: f("24"),
    distractors: [f("6"), f("12"), f("36")],
    theme: "trap",
  },
  {
    // forgetting the factor of 2 / wrong limit on a parabola
    atomKey: "aoi-parabola-latus-rectum-area:trap:0",
    stem: "What is the area enclosed by \\(y^2 = 8x\\) and its latus rectum?",
    correct: f("\\tfrac{32}{3}"),
    distractors: [f("\\tfrac{16}{3}"), f("\\tfrac{8}{3}"), f("\\tfrac{64}{3}")],
    theme: "trap",
  },
  {
    // [x] on a negative interval is the LOWER integer; height is its magnitude
    atomKey: "aoi-step-and-piecewise-area:trap:0",
    stem: "What is the area under \\(y = [x]\\) (greatest integer) on \\([-1.8, -1.5]\\)?",
    correct: f("0.6"),
    distractors: [f("0.3"), f("-0.6"), f("0.9")],
    theme: "trap",
  },
  {
    // minor segment = sector − triangle, not the whole sector
    atomKey: "aoi-circular-segment-area:trap:0",
    stem: "The minor segment of a circle cut by a chord equals which of these?",
    correct: "Sector area minus the triangle of the two radii and the chord.",
    distractors: [
      "The whole sector area.",
      "The whole triangle area.",
      "The full circle minus the sector.",
    ],
    theme: "trap",
  },
  {
    // a modulus creates an extra intersection
    atomKey: "aoi-intersection-points:trap:0",
    stem: "How many times do \\(y = x^2\\) and \\(y = 2|x|\\) intersect?",
    correct: f("3"),
    distractors: [f("2"), f("1"), f("4")],
    theme: "trap",
  },
  {
    // the limits ARE the crossings — solve f(x)=g(x), don't reuse the stated interval
    atomKey: "aoi-intersection-points:trap:1",
    stem: "To find the area between \\(y = x^2\\) and \\(y = x + 2\\), what are the correct limits of integration?",
    correct: "\\(x = -1\\) and \\(x = 2\\) (where the curves cross).",
    distractors: [
      "\\(x = 0\\) and \\(x = 2\\) (the y-intercept and a root).",
      "\\(x = 1\\) and \\(x = 4\\) (the matching y-values).",
      "\\(x = 0\\) and \\(x = 1\\) (the unit interval).",
    ],
    theme: "trap",
  },
  {
    // subtract top − bottom; a negative answer means you reversed them
    atomKey: "aoi-top-minus-bottom:trap:0",
    stem: "On \\((0, 1)\\), \\(y = x\\) is above \\(y = x^3\\). The integral \\(\\int_0^1 (x^3 - x)\\,dx = -\\tfrac{1}{4}\\). What is the AREA between them?",
    correct: f("\\tfrac{1}{4}"),
    distractors: [f("-\\tfrac{1}{4}"), f("0"), f("\\tfrac{1}{2}")],
    theme: "trap",
  },
  {
    // pick the correct (upper) branch of a sideways parabola
    atomKey: "aoi-curve-and-line-region:trap:0",
    stem: "For the region bounded by \\(y^2 = 2x\\) and \\(y = x\\) in the first quadrant, which branch of the parabola bounds it?",
    correct: "The upper branch \\(y = +\\sqrt{2x}\\).",
    distractors: [
      "The lower branch \\(y = -\\sqrt{2x}\\).",
      "Both branches together.",
      "Neither — use \\(x = \\tfrac{y^2}{2}\\) without choosing a branch.",
    ],
    theme: "trap",
  },
  {
    // subtract the AREA under the curve (the integral), not a single value
    atomKey: "aoi-composite-subtractive-regions:trap:0",
    stem: "For a region equal to a quarter-circle minus the part under \\(y = \\sin x\\) on \\([0, \\pi]\\), what quantity do you subtract for the sine part?",
    correct: f("\\int_0^{\\pi}\\sin x\\,dx = 2"),
    distractors: [
      f("\\sin\\pi = 0"),
      f("\\text{the maximum height } 1"),
      f("\\int_0^{\\pi}\\cos x\\,dx = 0"),
    ],
    theme: "trap",
  },
];
