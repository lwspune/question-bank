/**
 * NDA Maths · Application of Derivatives · COMMON-TRAPS theme — "spot the mistake"
 * MCQs. 7 from the misconception callouts authored into the notes (the FIRST
 * distractor in each is the warned mistake, made tempting). Run:
 *   npm run quiz:verify nda-maths__application-of-derivatives-traps
 *
 * Atom key = "<conceptSlug>:trap:<i>", i = the trap's array position in the notes.
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    atomKey: "aod-tangents-normals:trap:0",
    stem: "The tangent to a curve at a point has slope \\(2\\). What is the slope of the NORMAL there?",
    correct: f("-\\tfrac12"),
    distractors: [f("\\tfrac12"), f("-2"), f("2")],
    theme: "trap",
  },
  {
    atomKey: "aod-rate-approximation:trap:0",
    stem: "The radius of a circle increases at \\(3\\) cm/s. How fast is the area \\(A=\\pi r^2\\) changing when \\(r=5\\) cm?",
    correct: f("30\\pi \\text{ cm}^2/\\text{s}"),
    distractors: [f("10\\pi \\text{ cm}^2/\\text{s}"), f("25\\pi \\text{ cm}^2/\\text{s}"), f("6\\pi \\text{ cm}^2/\\text{s}")],
    theme: "trap",
  },
  {
    atomKey: "aod-increasing-decreasing:trap:0",
    stem: "Which condition makes \\(f\\) INCREASING on an interval?",
    correct: f("f'(x)\\ge 0 \\text{ on the interval}"),
    distractors: [
      f("f(x)>0 \\text{ on the interval}"),
      f("f''(x)>0 \\text{ on the interval}"),
      f("f'(x)\\le 0 \\text{ on the interval}"),
    ],
    theme: "trap",
  },
  {
    atomKey: "aod-maxima-minima:trap:0",
    stem: "At a critical point of \\(f\\), the second derivative is \\(f''>0\\). The point is a:",
    correct: "Local minimum",
    distractors: ["Local maximum", "Point of inflection", "Neither (test fails)"],
    theme: "trap",
  },
  {
    atomKey: "aod-maxima-minima:trap:1",
    stem: "Which statement about a point where \\(f'(c)=0\\) is TRUE?",
    correct: "It is a candidate — it may be a max, a min, or neither",
    distractors: [
      "It is always a local extremum",
      "It is always a local maximum",
      "It can never be a point of inflection",
    ],
    theme: "trap",
  },
  {
    atomKey: "aod-absolute-extrema:trap:0",
    stem: "To find the absolute maximum of a continuous \\(f\\) on a closed interval \\([a,b]\\), you must compare:",
    correct: "Critical-point values together with \\(f(a)\\) and \\(f(b)\\)",
    distractors: [
      "Only the critical-point values",
      "Only the endpoint values \\(f(a)\\) and \\(f(b)\\)",
      "Only the value at the midpoint",
    ],
    theme: "trap",
  },
  {
    atomKey: "aod-extrema-conditions:trap:0",
    stem: "At which point does \\(f(x)=x^3\\) (with \\(f'(x)=3x^2\\)) have a local extremum?",
    correct: "Nowhere — \\(f'=0\\) at \\(x=0\\) but \\(f'\\) does not change sign",
    distractors: [
      f("\\text{At } x=0, \\text{ a local minimum}"),
      f("\\text{At } x=0, \\text{ a local maximum}"),
      f("\\text{At } x=0, \\text{ both a max and a min}"),
    ],
    theme: "trap",
  },
];
