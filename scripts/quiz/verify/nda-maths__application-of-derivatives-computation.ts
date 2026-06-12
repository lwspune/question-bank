/**
 * NDA Maths · Application of Derivatives · practiceSet + selfCheck MCQs
 * (computation). Hand-authored distractors, theme=computation. Re-derived every
 * `correct` against the notes; no notes errors found.
 *
 * Atoms whose harvested stem isn't self-contained (recipe-step / back-reference /
 * criterion-less prompts) are rewritten via the full-object form (stem override).
 *   npm run quiz:verify nda-maths__application-of-derivatives-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── aod-tangents-normals — slope=f'(x0), normal=-1/m, horizontal at f'=0, angle=arctan(f') ──
  {
    atomKey: "aod-tangents-normals:practiceSet:0",
    stem: "The slope of the tangent to \\(y=f(x)\\) at the point where \\(x=x_0\\) equals:",
    distractors: [f("-\\dfrac{1}{f'(x_0)}"), f("\\tan^{-1}\\!\\big(f'(x_0)\\big)"), f("f(x_0)")],
    theme: "computation",
  },
  {
    atomKey: "aod-tangents-normals:practiceSet:1",
    stem: "If the slope of the tangent to a curve at a point is \\(m\\,(\\neq 0)\\), the slope of the normal there is:",
    distractors: [f("m"), f("\\dfrac{1}{m}"), f("-m")],
    theme: "computation",
  },
  {
    atomKey: "aod-tangents-normals:practiceSet:2",
    stem: "The tangent to \\(y=f(x)\\) is horizontal exactly where:",
    distractors: [f("f''(x)=0"), f("f(x)=0"), f("f'(x) \\text{ is undefined}")],
    theme: "computation",
  },
  {
    atomKey: "aod-tangents-normals:practiceSet:3",
    stem: "The angle \\(\\theta\\) the tangent at \\(x_0\\) makes with the positive x-axis satisfies \\(\\theta=\\):",
    distractors: [f("\\tan\\!\\big(f'(x_0)\\big)"), f("\\sin^{-1}\\!\\big(f'(x_0)\\big)"), f("f'(x_0)")],
    theme: "computation",
  },
  e("aod-tangents-normals:selfCheck:0", [f("\\tan\\theta=\\tfrac12"), f("\\tan\\theta=1"), f("\\tan\\theta=-2")]),

  // ── aod-rate-approximation — small change, related rates ──
  {
    atomKey: "aod-rate-approximation:practiceSet:0",
    stem: "The small-change (differential) approximation for \\(y=f(x)\\) is:",
    distractors: [f("\\Delta y\\approx f''(x)\\,\\Delta x"), f("\\Delta y\\approx f(x)\\,\\Delta x"), f("\\Delta y\\approx \\dfrac{\\Delta x}{f'(x)}")],
    theme: "computation",
  },
  {
    atomKey: "aod-rate-approximation:practiceSet:1",
    stem: "For a circle \\(A=\\pi r^2\\) with \\(r\\) changing in time, \\(\\dfrac{dA}{dt}=\\):",
    distractors: [f("\\pi r^2\\dfrac{dr}{dt}"), f("2\\pi r"), f("2\\pi r + \\dfrac{dr}{dt}")],
    theme: "computation",
  },
  {
    atomKey: "aod-rate-approximation:practiceSet:2",
    stem: "For \\(y=x^2\\), estimate \\(\\Delta y\\) as \\(x\\) changes from \\(2\\) to \\(2.01\\):",
    distractors: [f("0.4"), f("0.02"), f("0.0001")],
    theme: "computation",
  },
  {
    atomKey: "aod-rate-approximation:practiceSet:3",
    stem: "A derivative of a quantity with respect to time represents a:",
    distractors: ["Total accumulated change", "An average value", "A maximum value"],
    theme: "computation",
  },
  e("aod-rate-approximation:selfCheck:0", [f("0.6"), f("60"), f("3")]),

  // ── aod-increasing-decreasing ──
  {
    atomKey: "aod-increasing-decreasing:practiceSet:0",
    stem: "If \\(f'(x)>0\\) on an interval, then on that interval \\(f\\) is:",
    distractors: ["Decreasing", "Constant", "At a maximum"],
    theme: "computation",
  },
  {
    atomKey: "aod-increasing-decreasing:practiceSet:1",
    stem: "To find the intervals of monotonicity of \\(f\\), the first step is to:",
    distractors: [
      "Solve \\(f''(x)=0\\), then test concavity",
      "Evaluate \\(f\\) at the endpoints only",
      "Set \\(f(x)=0\\) and solve",
    ],
    theme: "computation",
  },
  {
    atomKey: "aod-increasing-decreasing:practiceSet:2",
    stem: "On which interval is \\(f(x)=x^3-3x\\) decreasing?",
    distractors: [f("(-\\infty,-1)"), f("(1,\\infty)"), f("(0,\\infty)")],
    theme: "computation",
  },
  {
    atomKey: "aod-increasing-decreasing:practiceSet:3",
    stem: "For \\(f(x)=x^2-kx\\) to be increasing for all \\(x>1\\), the condition on \\(k\\) is:",
    distractors: [f("k\\ge 2"), f("k\\le 1"), f("k>2")],
    theme: "computation",
  },
  e("aod-increasing-decreasing:selfCheck:0", [
    f("\\text{Increasing on } (1,2)"),
    f("\\text{Increasing on } (-\\infty,2)"),
    f("\\text{Increasing only on } (2,\\infty)"),
  ]),

  // ── aod-maxima-minima ──
  {
    atomKey: "aod-maxima-minima:practiceSet:0",
    stem: "The critical points of \\(f\\) are the points where:",
    distractors: [
      f("f(x)=0"),
      f("f''(x)=0"),
      f("f(x) \\text{ is undefined}"),
    ],
    theme: "computation",
  },
  {
    atomKey: "aod-maxima-minima:practiceSet:1",
    stem: "By the second-derivative test, at a critical point with \\(f''>0\\) the function has a:",
    distractors: ["Local maximum", "Point of inflection", "Saddle point"],
    theme: "computation",
  },
  {
    atomKey: "aod-maxima-minima:practiceSet:2",
    stem: "By the first-derivative test, if \\(f'\\) changes from \\(+\\) to \\(-\\) at a critical point, the function has a:",
    distractors: ["Local minimum", "Point of inflection", "No extremum"],
    theme: "computation",
  },
  {
    atomKey: "aod-maxima-minima:practiceSet:3",
    stem: "If \\(f''=0\\) at a critical point, the second-derivative test:",
    distractors: ["Confirms a maximum", "Confirms a minimum", "Confirms a point of inflection"],
    theme: "computation",
  },
  e("aod-maxima-minima:selfCheck:0", [
    f("\\text{Local max } 2 \\text{ at } x=1;\\ \\text{local min } -2 \\text{ at } x=-1"),
    f("\\text{Local min } 2 \\text{ at } x=1;\\ \\text{local min } -2 \\text{ at } x=-1"),
    f("\\text{Local min } 0 \\text{ at } x=0 \\text{ only}"),
  ]),

  // ── aod-absolute-extrema ──
  {
    atomKey: "aod-absolute-extrema:practiceSet:0",
    stem: "To find the absolute extremum of \\(f\\) on a closed interval \\([a,b]\\), compare the critical-point values with:",
    distractors: [
      "Only the midpoint value",
      "The values of \\(f''\\)",
      "Only the larger endpoint",
    ],
    theme: "computation",
  },
  {
    atomKey: "aod-absolute-extrema:practiceSet:1",
    stem: "The most common mistake when finding the greatest/least value on a closed interval is:",
    distractors: [
      "Including the endpoints",
      "Using the second-derivative test",
      "Solving \\(f'(x)=0\\)",
    ],
    theme: "computation",
  },
  {
    atomKey: "aod-absolute-extrema:practiceSet:2",
    stem: "On an OPEN interval, is the supremum of a function always attained?",
    distractors: ["Yes, always", "Only if the function is increasing", "Only at the endpoints"],
    theme: "computation",
  },
  {
    atomKey: "aod-absolute-extrema:practiceSet:3",
    stem: "The greatest value of \\(f(x)=2\\sin x+1\\) on \\([0,\\pi]\\) is:",
    distractors: [f("1"), f("2"), f("-1")],
    theme: "computation",
  },
  e("aod-absolute-extrema:selfCheck:0", [
    f("\\text{Yes, the maximum is } 2"),
    f("\\text{Yes, the maximum is } 1.5"),
    f("\\text{Yes, attained at the midpoint}"),
  ]),

  // ── aod-extrema-conditions ──
  {
    atomKey: "aod-extrema-conditions:practiceSet:0",
    stem: "A cubic \\(f\\) has NO local extremum exactly when its derivative \\(f'\\) (a quadratic) has:",
    distractors: [
      "Two distinct real roots",
      "A positive leading coefficient",
      "A discriminant equal to zero only",
    ],
    theme: "computation",
  },
  {
    atomKey: "aod-extrema-conditions:practiceSet:1",
    stem: "The discriminant of \\(3x^2+2x+k\\) is:",
    distractors: [f("4+12k"), f("12k-4"), f("4-3k")],
    theme: "computation",
  },
  {
    atomKey: "aod-extrema-conditions:practiceSet:2",
    stem: "To count the number of local extrema of \\(f\\), count the sign-changes of:",
    distractors: [f("f"), f("f''"), f("\\int f\\,dx")],
    theme: "computation",
  },
  {
    atomKey: "aod-extrema-conditions:practiceSet:3",
    stem: "For \\(f(x)=x^3+x^2+kx\\) to be monotonic (no local extremum), the condition on \\(k\\) is:",
    distractors: [f("k<\\tfrac13"), f("k>3"), f("k<-\\tfrac13")],
    theme: "computation",
  },
  e("aod-extrema-conditions:selfCheck:0", [f("2"), f("3"), f("8")]),

  // ── aod-optimisation-method ──
  {
    atomKey: "aod-optimisation-method:practiceSet:0",
    stem: "In the optimisation recipe, the step AFTER writing the target and constraint is to:",
    distractors: [
      "Integrate the target function",
      "Differentiate twice immediately",
      "Substitute the endpoint values",
    ],
    theme: "computation",
  },
  {
    atomKey: "aod-optimisation-method:practiceSet:1",
    stem: "Having found a critical point \\(t\\) of the target \\(Q(t)\\), you confirm it gives a MINIMUM by checking:",
    distractors: [
      f("Q''(t)<0"),
      f("Q'(t)>0"),
      f("Q(t)=0"),
    ],
    theme: "computation",
  },
  {
    atomKey: "aod-optimisation-method:practiceSet:2",
    stem: "The expression \\(\\sum_{j}(x-a_j)^2\\) attains its least value at \\(x=\\):",
    distractors: [
      "The median of the \\(a_j\\)",
      "The largest \\(a_j\\)",
      "The sum of the \\(a_j\\)",
    ],
    theme: "computation",
  },
  {
    atomKey: "aod-optimisation-method:practiceSet:3",
    stem: "A closed right cylinder of fixed volume has least total surface area when its height \\(h\\) equals (in terms of radius \\(r\\)):",
    distractors: [f("r"), f("4r"), f("\\dfrac{r}{2}")],
    theme: "computation",
  },
  e("aod-optimisation-method:selfCheck:0", [
    "The median of the \\(a_j\\)",
    "The largest \\(a_j\\)",
    "The smallest \\(a_j\\)",
  ]),

  // ── aod-geometric-optimisation ──
  {
    atomKey: "aod-geometric-optimisation:practiceSet:0",
    stem: "The triangle of maximum area inscribed in a given circle is:",
    distractors: ["A right-angled triangle", "An isosceles right triangle", "A 30°-60°-90° triangle"],
    theme: "computation",
  },
  {
    atomKey: "aod-geometric-optimisation:practiceSet:1",
    stem: "Among all rectangles of a fixed perimeter, the one with maximum area is:",
    distractors: [
      "A rectangle with one side twice the other",
      "The longest possible thin rectangle",
      "A golden rectangle",
    ],
    theme: "computation",
  },
  {
    atomKey: "aod-geometric-optimisation:practiceSet:2",
    stem: "A wire of length \\(20\\) cm is bent into a rectangle of maximum area. That area is:",
    distractors: [f("20 \\text{ cm}^2"), f("100 \\text{ cm}^2"), f("16 \\text{ cm}^2")],
    theme: "computation",
  },
  {
    atomKey: "aod-geometric-optimisation:practiceSet:3",
    stem: "In many inscribed-figure optimisation problems, the single variable you reduce the model to is conveniently:",
    distractors: [
      "The area itself",
      "The perimeter",
      "The radius of the circle",
    ],
    theme: "computation",
  },
  e("aod-geometric-optimisation:selfCheck:0", [
    f("\\dfrac{\\sqrt3}{4}R^2"),
    f("2R^2"),
    f("\\dfrac{3\\sqrt3}{2}R^2"),
  ]),

  // ── aod-am-gm-shortcut ──
  {
    atomKey: "aod-am-gm-shortcut:practiceSet:0",
    stem: "Equality in the AM-GM inequality \\(\\dfrac{u+v}{2}\\ge\\sqrt{uv}\\) holds exactly when:",
    distractors: [
      "One term is zero",
      "The terms are reciprocals",
      "Their product is 1",
    ],
    theme: "computation",
  },
  {
    atomKey: "aod-am-gm-shortcut:practiceSet:1",
    stem: "If \\(x+y=k\\) with \\(x,y>0\\), the product \\(xy\\) is greatest when:",
    distractors: [f("x=0,\\ y=k"), f("x=\\tfrac{k}{4},\\ y=\\tfrac{3k}{4}"), f("xy=k")],
    theme: "computation",
  },
  {
    atomKey: "aod-am-gm-shortcut:practiceSet:2",
    stem: "The minimum value of \\(a^2x+b^2y\\) subject to \\(xy=c^2\\) (all positive) is:",
    distractors: [f("abc"), f("2abc^2"), f("(ab+c)^2")],
    theme: "computation",
  },
  {
    atomKey: "aod-am-gm-shortcut:practiceSet:3",
    stem: "AM-GM is the fastest tool (beating calculus) for problems of the form:",
    distractors: [
      "Finding the slope of a tangent line",
      "Counting the local extrema of a polynomial",
      "Estimating a small change in a function",
    ],
    theme: "computation",
  },
  e("aod-am-gm-shortcut:selfCheck:0", [f("abc"), f("ab+c"), f("4abc")]),
];
