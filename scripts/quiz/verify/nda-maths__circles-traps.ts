/**
 * NDA Maths · Circles · COMMON-TRAPS theme — "spot the value/mistake" MCQs.
 * One per misconception callout authored into the notes (20 seeds across the
 * three subtopics). The first distractor in each is the warned mistake.
 *   npm run quiz:verify nda-maths__circles-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    // divide by the leading coefficient before reading g,f,c
    atomKey: "circ-general-form:trap:0",
    stem: "Find the centre of \\(2x^2+2y^2-8x+12y-6=0\\).",
    correct: f("(2,-3)"),
    distractors: [f("(4,-6)"), f("(-2,3)"), f("(-4,6)")],
    theme: "trap",
  },
  {
    // centre is MINUS g and MINUS f, not (g,f)
    atomKey: "circ-general-form:trap:1",
    stem: "Find the centre of \\(x^2+y^2-10x+6y+5=0\\).",
    correct: f("(5,-3)"),
    distractors: [f("(-5,3)"), f("(10,-6)"), f("(-10,6)")],
    theme: "trap",
  },
  {
    // x-factor pairs with first y-factor: endpoints are (x1,y1),(x2,y2)
    atomKey: "circ-diameter-form:trap:0",
    stem: "The circle \\((x-2)(x-6)+(y-1)(y-5)=0\\) has a diameter. What are its endpoints?",
    correct: f("(2,1)\\text{ and }(6,5)"),
    distractors: [f("(2,5)\\text{ and }(6,1)"), f("(2,6)\\text{ and }(1,5)"), f("(8,6)\\text{ and }(4,4)")],
    theme: "trap",
  },
  {
    // intercept is the GAP between the two roots, not one root / their sum
    atomKey: "circ-axis-intercepts:trap:0",
    stem: "What chord does \\(x^2+y^2-2x-15=0\\) cut on the x-axis?",
    correct: f("8"),
    distractors: [f("5"), f("2"), f("16")],
    theme: "trap",
  },
  {
    // perpendicular uses NEGATIVE-reciprocal slope
    atomKey: "circ-perpendicular-from-centre:trap:0",
    stem: "A chord of \\(x^2+y^2=r^2\\) lies on a line of slope \\(2\\). What slope does the line from the centre to the chord's midpoint have?",
    correct: f("-\\tfrac12"),
    distractors: [f("2"), f("\\tfrac12"), f("-2")],
    theme: "trap",
  },
  {
    // touching an axis is |coordinate| = r
    atomKey: "circ-touching-axes:trap:0",
    stem: "A circle with centre \\((-4,3)\\) touches the y-axis. What is its radius?",
    correct: f("4"),
    distractors: [f("3"), f("-4"), f("5")],
    theme: "trap",
  },
  {
    // band, not a single bound — d < |r1-r2| means one inside the other (no intersection)
    atomKey: "circ-two-circles:trap:0",
    stem: "Circles of radii \\(2\\) and \\(7\\) have centres \\(3\\) units apart. How many points do they share?",
    correct: f("0"),
    distractors: [f("2"), f("1"), f("\\text{infinitely many}")],
    theme: "trap",
  },
  {
    // through the origin forces c=0
    atomKey: "circ-through-origin-intercepts:trap:0",
    stem: "A circle passes through the origin. What is the constant term \\(c\\) in \\(x^2+y^2+2gx+2fy+c=0\\)?",
    correct: f("0"),
    distractors: [f("g^2+f^2"), f("1"), f("-2g-2f")],
    theme: "trap",
  },
  {
    // general form uses 2g=D, so centre is -D/2, not -D
    atomKey: "circ-three-points-general:trap:0",
    stem: "A fitted circle has \\(D=-6,\\ E=8\\) in \\(x^2+y^2+Dx+Ey+F=0\\). What is its centre?",
    correct: f("(3,-4)"),
    distractors: [f("(6,-8)"), f("(-3,4)"), f("(-6,8)")],
    theme: "trap",
  },
  {
    // compare r² with (bound)² — skip the root
    atomKey: "circ-centre-radius-from-three-points:trap:0",
    stem: "A circle has centre \\((6,8)\\) and passes through the origin. Is its radius greater than \\(9\\)?",
    correct: f("\\text{Yes, }r=10"),
    distractors: [f("\\text{No, }r=\\sqrt{14}"), f("\\text{No, }r=7"), f("\\text{Equal, }r=9")],
    theme: "trap",
  },
  {
    // two through-points give ONE equation (the perpendicular bisector), not two
    atomKey: "circ-centre-on-a-line:trap:0",
    stem: "Equating the centre's distances to the two given points the circle passes through yields what?",
    correct: "The perpendicular bisector of the two points (one line)",
    distractors: [
      "Two independent equations that fix the centre alone",
      "The circle's equation directly",
      "The diameter of the circle",
    ],
    theme: "trap",
  },
  {
    // an unknown coordinate gives TWO values — keep both
    atomKey: "circ-concyclicity-test:trap:0",
    stem: "Substituting an unknown point \\((0,k)\\) into a fixed circle gives \\(k^2-6k=0\\). Which values make the points concyclic?",
    correct: f("k=0\\text{ and }k=6"),
    distractors: [f("k=6\\text{ only}"), f("k=-6\\text{ only}"), f("k=3")],
    theme: "trap",
  },
  {
    // "chord as diameter" = new centre lies ON the chord line L
    atomKey: "circ-family-through-chord:trap:0",
    stem: "In the family \\(S+\\lambda L=0\\), the chord is a diameter of the new circle exactly when what holds?",
    correct: "The new circle's centre lies on the line \\(L\\)",
    distractors: [
      "The new circle passes through a chord endpoint",
      "\\(\\lambda=1\\)",
      "The new circle is tangent to \\(L\\)",
    ],
    theme: "trap",
  },
  {
    // midpoint-of-hypotenuse shortcut needs a right angle
    atomKey: "circ-right-triangle-circumcentre:trap:0",
    stem: "When is the circumcentre of a triangle the midpoint of one of its sides?",
    correct: "Only when the triangle has a right angle (that side is the hypotenuse)",
    distractors: [
      "Always — for every triangle",
      "Only for an equilateral triangle",
      "Only when the triangle is isosceles",
    ],
    theme: "trap",
  },
  {
    // don't forget the supplementary (obtuse) inscribed angle
    atomKey: "circ-inscribed-angle:trap:0",
    stem: "A chord subtends \\(120^\\circ\\) at the centre. What inscribed angle(s) can it subtend on the circle?",
    correct: f("60^\\circ\\text{ or }120^\\circ"),
    distractors: [f("60^\\circ\\text{ only}"), f("120^\\circ\\text{ only}"), f("240^\\circ")],
    theme: "trap",
  },
  {
    // A is not pinned to one coordinate — it's a locus
    atomKey: "circ-inscribed-angle:trap:1",
    stem: "Given only the two endpoints \\(B,C\\) of a chord, how many points \\(A\\) on the circle give a fixed inscribed angle \\(\\angle BAC\\)?",
    correct: "Infinitely many — A traces an arc, not a single point",
    distractors: [
      "Exactly one point",
      "Exactly two points",
      "None — A cannot be determined at all",
    ],
    theme: "trap",
  },
  {
    // contact point shares ONE coordinate with the centre
    atomKey: "circ-contact-points-on-axes:trap:0",
    stem: "A circle with centre \\((5,5)\\) touches both axes. Where does it touch the x-axis?",
    correct: f("(5,0)"),
    distractors: [f("(0,5)"), f("(5,5)"), f("(0,0)")],
    theme: "trap",
  },
  {
    // inscribed offset is r/√2, not r
    atomKey: "circ-inscribed-square:trap:0",
    stem: "A square with sides parallel to the axes is inscribed in \\(x^2+y^2=8\\). What is one of its vertices?",
    correct: f("(2,2)"),
    distractors: [f("(2\\sqrt2,2\\sqrt2)"), f("(\\sqrt2,\\sqrt2)"), f("(4,4)")],
    theme: "trap",
  },
  {
    // the normal passes through the centre; far point is 2C-T
    atomKey: "circ-tangent-normal:trap:0",
    stem: "A circle has centre \\((3,2)\\) and a point of contact \\(T=(3,0)\\). The normal at \\(T\\) meets the circle again at which point?",
    correct: f("(3,4)"),
    distractors: [f("(3,-2)"), f("(0,0)"), f("(6,2)")],
    theme: "trap",
  },
  {
    // segment = sector − triangle, not the sector alone
    atomKey: "circ-segment-areas:trap:0",
    stem: "A chord subtends central angle \\(\\theta\\) in a circle of radius \\(a\\). What is the minor-segment area?",
    correct: f("\\tfrac{a^2}{2}(\\theta-\\sin\\theta)"),
    distractors: [f("\\tfrac{a^2}{2}\\theta"), f("\\tfrac{a^2}{2}(\\theta+\\sin\\theta)"), f("\\tfrac{a^2}{2}\\sin\\theta")],
    theme: "trap",
  },
];
