/**
 * NDA Maths · Conics · COMMON-TRAPS theme — "spot the value/mistake" MCQs.
 * One per misconception callout authored into the notes (key index = position in
 * the concept's `traps` array). The first distractor in each is the warned mistake.
 *
 * 12 total = 4 pre-existing seed callouts + 8 NEW callouts authored this pass
 * (clears the 12-floor for a standalone Common-Traps quiz).
 *   npm run quiz:verify nda-maths__conics-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── pre-existing seeds (trap:0) ──
  {
    // degenerate second-degree equation
    atomKey: "conics-general-equation-identification:trap:0",
    stem: "What does \\(x^2 + 4y^2 - 2x + 8y + 5 = 0\\) represent?",
    correct: "A single point \\((1,-1)\\).",
    distractors: ["An ellipse.", "A hyperbola.", "A pair of straight lines."],
    theme: "trap",
  },
  {
    // sign of linear term sets direction
    atomKey: "conics-parabola-standard-forms:trap:0",
    stem: "In which direction does the parabola \\(x^2 = -3y\\) open?",
    correct: "Downward.",
    distractors: ["Upward.", "To the right.", "To the left."],
    theme: "trap",
  },
  {
    // major axis = larger denominator
    atomKey: "conics-ellipse-foci-eccentricity:trap:0",
    stem: "For the ellipse \\(\\dfrac{x^2}{9} + \\dfrac{y^2}{25} = 1\\), where do the foci lie?",
    correct: "On the y-axis (major axis vertical, larger denominator under \\(y^2\\)).",
    distractors: [
      "On the x-axis (larger denominator under \\(x^2\\)).",
      "At the origin.",
      "On the line \\(y = x\\).",
    ],
    theme: "trap",
  },
  {
    // hyperbola uses plus
    atomKey: "conics-hyperbola-standard-form:trap:0",
    stem: "For the hyperbola \\(\\dfrac{x^2}{9} - \\dfrac{y^2}{16} = 1\\), what is \\(c\\)?",
    correct: f("c = 5"),
    distractors: [f("c = \\sqrt{7}"), f("c = 4"), f("c = 3")],
    theme: "trap",
  },

  // ── new callouts ──
  {
    // ellipse vs hyperbola sign relation
    atomKey: "conics-eccentricity-classification:trap:0",
    stem: "For an ELLIPSE with semi-axes \\(a>b\\), which relation links \\(b^2\\) to the eccentricity \\(e\\)?",
    correct: f("b^2 = a^2(1 - e^2)"),
    distractors: [f("b^2 = a^2(e^2 - 1)"), f("b^2 = a^2(1 + e^2)"), f("b^2 = a^2 e^2")],
    theme: "trap",
  },
  {
    // directrix of y²=4ax is x=-a
    atomKey: "conics-parabola-standard-forms:trap:1",
    stem: "What is the directrix of the parabola \\(y^2 = 4ax\\) (\\(a>0\\))?",
    correct: f("x = -a"),
    distractors: [f("x = a"), f("y = -a"), f("x = -4a")],
    theme: "trap",
  },
  {
    // LR = 4a not 2a
    atomKey: "conics-parabola-latus-rectum:trap:0",
    stem: "What is the length of the latus rectum of the parabola \\(y^2 = 12x\\)?",
    correct: f("12"),
    distractors: [f("6"), f("3"), f("24")],
    theme: "trap",
  },
  {
    // focal distance = x₁ + a
    atomKey: "conics-parabola-focal-distance:trap:0",
    stem: "A point with x-coordinate \\(5\\) lies on \\(y^2 = 8x\\) (\\(a=2\\)). What is its focal distance?",
    correct: f("7"),
    distractors: [f("3"), f("5"), f("10")],
    theme: "trap",
  },
  {
    // sum of focal distances = 2a not 2b
    atomKey: "conics-ellipse-focal-distances:trap:0",
    stem: "For the ellipse \\(\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1\\), what is \\(PF_1 + PF_2\\) for any point \\(P\\)?",
    correct: f("10"),
    distractors: [f("6"), f("5"), f("8")],
    theme: "trap",
  },
  {
    // ellipse LR = 2b²/a
    atomKey: "conics-ellipse-from-conditions:trap:0",
    stem: "For the ellipse \\(\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1\\) (\\(a=5, b=3\\)), what is the length of the latus rectum?",
    correct: f("\\dfrac{18}{5}"),
    distractors: [f("\\dfrac{50}{3}"), f("\\dfrac{9}{5}"), f("\\dfrac{6}{5}")],
    theme: "trap",
  },
  {
    // hyperbola e > 1
    atomKey: "conics-hyperbola-standard-form:trap:1",
    stem: "Which statement about a hyperbola's eccentricity \\(e\\) is always true?",
    correct: f("e > 1"),
    distractors: [f("e < 1"), f("e = 1"), f("0 < e < 1")],
    theme: "trap",
  },
  {
    // parametric (a sec θ, b tan θ) is a hyperbola
    atomKey: "conics-hyperbola-parametric-properties:trap:0",
    stem: "The point \\((a\\sec\\theta, b\\tan\\theta)\\) traces which conic as \\(\\theta\\) varies?",
    correct: "A hyperbola.",
    distractors: ["An ellipse.", "A parabola.", "A circle."],
    theme: "trap",
  },
];
