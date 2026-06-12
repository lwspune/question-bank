/**
 * NDA Maths · Circles · FORMULA-recall MCQs.
 * One entry per `formula.latex` piece authored into the notes _data (\qquad-joined
 * pieces → key index = position in that concept's bundle, 0-based).
 * Distractors are full-equation permutations — wrong versions of the SAME
 * identity, same shape (no length/format tell).
 *
 * SKIPPED (pure ANNOTATIONS, not formulas):
 *   - circ-perpendicular-from-centre:formula:1  "(d = distance from centre to chord)"
 *   - circ-tangent-normal:formula:1             "(C = centre, T = contact point)"
 *   npm run quiz:verify nda-maths__circles-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── circ-what-is-a-circle: standard form ──
  {
    atomKey: "circ-what-is-a-circle:formula:0",
    stem: "Which is the standard (centre–radius) form of a circle with centre \\((h,k)\\), radius \\(r\\)?",
    distractors: [
      f("(x-h)^2+(y-k)^2=r"),
      f("(x+h)^2+(y+k)^2=r^2"),
      f("(x-h)^2-(y-k)^2=r^2"),
    ],
    theme: "formula",
  },

  // ── circ-general-form: centre/radius from general form ──
  {
    atomKey: "circ-general-form:formula:0",
    stem: "For \\(x^2+y^2+2gx+2fy+c=0\\), which gives the centre and radius?",
    distractors: [
      f("\\text{centre }(g,f),\\;\\; r=\\sqrt{g^2+f^2-c}"),
      f("\\text{centre }(-g,-f),\\;\\; r=\\sqrt{g^2+f^2+c}"),
      f("\\text{centre }(-2g,-2f),\\;\\; r=g^2+f^2-c"),
    ],
    theme: "formula",
  },

  // ── circ-diameter-form ──
  {
    atomKey: "circ-diameter-form:formula:0",
    stem: "Which is the diameter form of the circle with diameter endpoints \\((x_1,y_1)\\) and \\((x_2,y_2)\\)?",
    distractors: [
      f("(x-x_1)(x-x_2)-(y-y_1)(y-y_2)=0"),
      f("(x-x_1)(y-y_1)+(x-x_2)(y-y_2)=0"),
      f("(x-x_1)(x-x_2)+(y-y_1)(y-y_2)=r^2"),
    ],
    theme: "formula",
  },

  // ── circ-axis-intercepts ──
  {
    atomKey: "circ-axis-intercepts:formula:0",
    stem: "For \\(x^2+y^2+2gx+2fy+c=0\\), which is the length of the chord on the x-axis?",
    distractors: [f("2\\sqrt{f^2-c}"), f("2\\sqrt{g^2+c}"), f("\\sqrt{g^2-c}")],
    theme: "formula",
  },
  {
    atomKey: "circ-axis-intercepts:formula:1",
    stem: "For \\(x^2+y^2+2gx+2fy+c=0\\), which is the length of the chord on the y-axis?",
    distractors: [f("2\\sqrt{g^2-c}"), f("2\\sqrt{f^2+c}"), f("\\sqrt{f^2-c}")],
    theme: "formula",
  },

  // ── circ-perpendicular-from-centre: chord length ──
  {
    atomKey: "circ-perpendicular-from-centre:formula:0",
    stem: "A chord lies at perpendicular distance \\(d\\) from the centre of a circle of radius \\(r\\). What is its length?",
    distractors: [f("\\text{chord}=2\\sqrt{r^2+d^2}"), f("\\text{chord}=\\sqrt{r^2-d^2}"), f("\\text{chord}=2\\sqrt{d^2-r^2}")],
    theme: "formula",
  },

  // ── circ-touching-axes: tangency to a line ──
  {
    atomKey: "circ-touching-axes:formula:0",
    stem: "A circle of centre \\((h,k)\\), radius \\(r\\) touches the line \\(ax+by+c=0\\). Which is the tangency condition?",
    distractors: [
      f("\\frac{|ah+bk+c|}{a^2+b^2}=r"),
      f("\\frac{ah+bk+c}{\\sqrt{a^2+b^2}}=r^2"),
      f("\\frac{|ah+bk+c|}{\\sqrt{a^2+b^2}}=r^2"),
    ],
    theme: "formula",
  },

  // ── circ-two-circles: intersection band ──
  {
    atomKey: "circ-two-circles:formula:0",
    stem: "Two circles (radii \\(r_1,r_2\\), centre distance \\(d\\)) meet at two distinct points. Which condition holds?",
    distractors: [
      f("d<|r_1-r_2|<r_1+r_2"),
      f("|r_1-r_2|<r_1+r_2<d"),
      f("d=r_1+r_2"),
    ],
    theme: "formula",
  },

  // ── circ-through-origin-intercepts ──
  {
    atomKey: "circ-through-origin-intercepts:formula:0",
    stem: "Which is the circle through the origin with x-intercept \\(a\\) and y-intercept \\(b\\)?",
    distractors: [
      f("x^2+y^2+ax+by=0"),
      f("x^2+y^2-ax-by+ab=0"),
      f("x^2+y^2-2ax-2by=0"),
    ],
    theme: "formula",
  },
  {
    atomKey: "circ-through-origin-intercepts:formula:1",
    stem: "Which is the centre of the circle through the origin with x-intercept \\(a\\), y-intercept \\(b\\)?",
    distractors: [f("(a,b)"), f("(-\\tfrac a2,-\\tfrac b2)"), f("(2a,2b)")],
    theme: "formula",
  },

  // ── circ-build-from-diameter-endpoints ──
  {
    atomKey: "circ-build-from-diameter-endpoints:formula:0",
    stem: "Given the diameter endpoints \\((x_1,y_1)\\) and \\((x_2,y_2)\\), which equation is the circle?",
    distractors: [
      f("(x+x_1)(x+x_2)+(y+y_1)(y+y_2)=0"),
      f("(x-x_1)(y-y_2)+(x-x_2)(y-y_1)=0"),
      f("(x-x_1)^2+(x-x_2)^2+(y-y_1)^2+(y-y_2)^2=0"),
    ],
    theme: "formula",
  },

  // ── circ-three-points-general ──
  {
    atomKey: "circ-three-points-general:formula:0",
    stem: "Which is the unknown-coefficient (general) form used to fit a circle through three points?",
    distractors: [
      f("x^2-y^2+Dx+Ey+F=0"),
      f("x^2+y^2+Dxy+Ex+F=0"),
      f("Dx^2+Ey^2+F=0"),
    ],
    theme: "formula",
  },
  {
    atomKey: "circ-three-points-general:formula:1",
    stem: "For \\(x^2+y^2+Dx+Ey+F=0\\), which is the centre?",
    distractors: [f("(D,E)"), f("(-D,-E)"), f("(\\tfrac D2,\\tfrac E2)")],
    theme: "formula",
  },

  // ── circ-centre-radius-from-three-points ──
  {
    atomKey: "circ-centre-radius-from-three-points:formula:0",
    stem: "Given the centre \\((h,k)\\) and any point \\((x_0,y_0)\\) on the circle, which gives \\(r^2\\)?",
    distractors: [
      f("r^2=(x_0+h)^2+(y_0+k)^2"),
      f("r^2=(x_0-h)^2-(y_0-k)^2"),
      f("r^2=|x_0-h|+|y_0-k|"),
    ],
    theme: "formula",
  },

  // ── circ-centre-on-a-line: equidistance ──
  {
    atomKey: "circ-centre-on-a-line:formula:0",
    stem: "The centre \\((h,k)\\) is equidistant from \\((x_1,y_1)\\) and \\((x_2,y_2)\\). Which equation expresses that?",
    distractors: [
      f("(h-x_1)^2+(k-y_1)^2 = (h+x_2)^2+(k+y_2)^2"),
      f("(h-x_1)^2-(k-y_1)^2 = (h-x_2)^2-(k-y_2)^2"),
      f("(h-x_1)+(k-y_1) = (h-x_2)+(k-y_2)"),
    ],
    theme: "formula",
  },

  // ── circ-concyclicity-test ──
  {
    atomKey: "circ-concyclicity-test:formula:0",
    stem: "When does \\((x_4,y_4)\\) lie on the circle \\(x^2+y^2+Dx+Ey+F=0\\)?",
    distractors: [
      f("x_4^2+y_4^2+Dx_4+Ey_4+F>0"),
      f("x_4^2-y_4^2+Dx_4+Ey_4+F=0"),
      f("x_4+y_4+Dx_4+Ey_4+F=0"),
    ],
    theme: "formula",
  },

  // ── circ-family-through-chord ──
  {
    atomKey: "circ-family-through-chord:formula:0",
    stem: "For a circle \\(S=0\\) cut by a line \\(L=0\\), which gives the family of circles through the chord endpoints?",
    distractors: [f("S\\cdot L=0"), f("S-\\lambda L^2=0"), f("\\lambda S+L=0")],
    theme: "formula",
  },

  // ── circ-right-triangle-circumcentre ──
  {
    atomKey: "circ-right-triangle-circumcentre:formula:0",
    stem: "For a right-angled triangle, where is the circumcentre?",
    distractors: [
      f("\\text{circumcentre} = \\text{the right-angle vertex}"),
      f("\\text{circumcentre} = \\text{centroid of the triangle}"),
      f("\\text{circumcentre} = \\text{midpoint of a leg}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "circ-right-triangle-circumcentre:formula:1",
    stem: "For a right-angled triangle, what is the circumradius \\(R\\)?",
    distractors: [
      f("R=\\text{hypotenuse}"),
      f("R=\\tfrac12(\\text{shorter leg})"),
      f("R=\\tfrac14(\\text{hypotenuse})"),
    ],
    theme: "formula",
  },

  // ── circ-inscribed-angle ──
  {
    atomKey: "circ-inscribed-angle:formula:0",
    stem: "How does the inscribed angle \\(\\angle BAC\\) relate to the central angle \\(\\angle BOC\\) on the same chord?",
    distractors: [
      f("\\angle BAC = 2\\,\\angle BOC"),
      f("\\angle BAC = \\angle BOC"),
      f("\\angle BAC = 90^\\circ - \\angle BOC"),
    ],
    theme: "formula",
  },

  // ── circ-contact-points-on-axes ──
  {
    atomKey: "circ-contact-points-on-axes:formula:0",
    stem: "A circle of centre \\((k,k)\\) touches the x-axis at \\(P\\) and the y-axis at \\(Q\\). What are \\(P\\), \\(Q\\) and the distance \\(PQ\\)?",
    distractors: [
      f("P=(0,k),\\;\\; Q=(k,0),\\;\\; PQ=\\sqrt2\\,|k|"),
      f("P=(k,0),\\;\\; Q=(0,k),\\;\\; PQ=2|k|"),
      f("P=(k,k),\\;\\; Q=(0,0),\\;\\; PQ=|k|"),
    ],
    theme: "formula",
  },

  // ── circ-inscribed-square ──
  {
    atomKey: "circ-inscribed-square:formula:0",
    stem: "A square (sides parallel to the axes) is inscribed in a circle of centre \\((h,k)\\), radius \\(r\\). Which are its vertices?",
    distractors: [
      f("\\left(h\\pm r,\\; k\\pm r\\right)"),
      f("\\left(h\\pm r\\sqrt2,\\; k\\pm r\\sqrt2\\right)"),
      f("\\left(h\\pm\\tfrac{r}{2},\\; k\\pm\\tfrac{r}{2}\\right)"),
    ],
    theme: "formula",
  },

  // ── circ-tangent-normal: opposite end of diameter ──
  {
    atomKey: "circ-tangent-normal:formula:0",
    stem: "The normal at contact point \\(T\\) of a circle (centre \\(C\\)) meets the circle again at \\(T'\\). What is \\(T'\\)?",
    distractors: [f("T'=2T-C"), f("T'=C-T"), f("T'=\\tfrac12(C+T)")],
    theme: "formula",
  },

  // ── circ-segment-areas ──
  {
    atomKey: "circ-segment-areas:formula:0",
    stem: "A chord subtends central angle \\(\\theta\\) in a circle of radius \\(a\\). Which is the minor-segment area?",
    distractors: [
      f("A_{\\text{minor}} = \\tfrac{a^2}{2}\\,(\\theta + \\sin\\theta)"),
      f("A_{\\text{minor}} = \\tfrac{a^2}{2}\\,\\theta"),
      f("A_{\\text{minor}} = a^2\\,(\\theta - \\sin\\theta)"),
    ],
    theme: "formula",
  },
];
