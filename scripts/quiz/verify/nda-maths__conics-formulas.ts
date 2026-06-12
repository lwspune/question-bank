/**
 * NDA Maths · Conics · FORMULA-recall MCQs.
 * One entry per `formula.latex` piece authored into the notes _data (bundles are
 * \qquad/\quad-joined, so the key index = position in that concept's bundle,
 * 0-based). Distractors are full-equation permutations — wrong versions of the
 * SAME identity, same shape (no length/format tell).
 *
 * The chapter is formula-rich: after splitting the \qquad/\quad bundles the pool
 * already carries 20 formula pieces (>12), so NO formula.latex enrichment was
 * needed. Two pieces are annotation fragments, NOT standalone recallable formulas,
 * and are deliberately SKIPPED (no fair MCQ): conics-parabola-latus-rectum:formula:1
 * ("endpoints (a, ±2a)") and conics-parabola-tangent-and-chords:formula:1
 * ("(to y²=4ax)"). The 18 genuine formula pieces are authored below.
 *   npm run quiz:verify nda-maths__conics-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── conics-what-is-a-conic — focus-directrix definition ──
  {
    atomKey: "conics-what-is-a-conic:formula:0",
    stem: "Which equation is the focus–directrix definition of a conic (\\(PF\\) = distance to focus, \\(PM\\) = distance to directrix, \\(e\\) = eccentricity)?",
    distractors: [f("\\dfrac{PM}{PF} = e"), f("PF \\cdot PM = e"), f("PF - PM = e")],
    theme: "formula",
  },

  // ── conics-eccentricity-classification — ellipse e | hyperbola e ──
  {
    atomKey: "conics-eccentricity-classification:formula:0",
    stem: "What is the eccentricity of the ellipse \\(\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}=1\\) (\\(a>b\\))?",
    distractors: [
      f("e=\\sqrt{1+\\tfrac{b^2}{a^2}}"),
      f("e=\\sqrt{\\tfrac{b^2}{a^2}-1}"),
      f("e=\\sqrt{1-\\tfrac{a^2}{b^2}}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "conics-eccentricity-classification:formula:1",
    stem: "What is the eccentricity of the hyperbola \\(\\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1\\)?",
    distractors: [
      f("e=\\sqrt{1-\\tfrac{b^2}{a^2}}"),
      f("e=\\sqrt{\\tfrac{b^2}{a^2}-1}"),
      f("e=\\sqrt{1+\\tfrac{a^2}{b^2}}"),
    ],
    theme: "formula",
  },

  // ── conics-general-equation-identification — complete-the-square ──
  {
    atomKey: "conics-general-equation-identification:formula:0",
    stem: "To classify a general second-degree equation \\(Ax^2+Cy^2+Dx+Ey+F=0\\) (no \\(xy\\) term), what is the standard first step?",
    distractors: [
      f("\\text{differentiate term by term}"),
      f("\\text{set } A=C \\text{ and solve}"),
      f("\\text{rotate axes by } 45^\\circ"),
    ],
    theme: "formula",
  },

  // ── conics-parabola-standard-forms — y²=4ax focus & directrix ──
  {
    atomKey: "conics-parabola-standard-forms:formula:0",
    stem: "For the parabola \\(y^2 = 4ax\\) (\\(a>0\\)), what are the focus and directrix?",
    distractors: [
      f("\\text{focus } (-a,0), \\ \\text{directrix } x = a"),
      f("\\text{focus } (0,a), \\ \\text{directrix } y = -a"),
      f("\\text{focus } (a,0), \\ \\text{directrix } x = a"),
    ],
    theme: "formula",
  },

  // ── conics-parabola-latus-rectum — LR=4a (formula:1 endpoints SKIPPED) ──
  {
    atomKey: "conics-parabola-latus-rectum:formula:0",
    stem: "What is the length of the latus rectum of \\(y^2 = 4ax\\)?",
    distractors: [f("\\text{LR} = 2a"), f("\\text{LR} = a"), f("\\text{LR} = 4a^2")],
    theme: "formula",
  },

  // ── conics-parabola-focal-distance — x₁+a ──
  {
    atomKey: "conics-parabola-focal-distance:formula:0",
    stem: "For a point \\((x_1,y_1)\\) on \\(y^2 = 4ax\\), what is its focal distance (distance to the focus)?",
    distractors: [f("x_1 - a"), f("y_1 + a"), f("\\dfrac{x_1}{a} + 1")],
    theme: "formula",
  },

  // ── conics-parabola-tangent-and-chords — tangent of slope m (formula:1 SKIPPED) ──
  {
    atomKey: "conics-parabola-tangent-and-chords:formula:0",
    stem: "What is the tangent of slope \\(m\\) to the parabola \\(y^2 = 4ax\\)?",
    distractors: [
      f("y = mx - \\dfrac{a}{m}"),
      f("y = mx + \\dfrac{a}{m^2}"),
      f("y = mx + am"),
    ],
    theme: "formula",
  },

  // ── conics-ellipse-foci-eccentricity — c²=a²−b² | e=c/a ──
  {
    atomKey: "conics-ellipse-foci-eccentricity:formula:0",
    stem: "For the ellipse \\(\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}=1\\) (\\(a>b\\)), how is the focal distance \\(c\\) found?",
    distractors: [f("c^2 = a^2 + b^2"), f("c^2 = b^2 - a^2"), f("c^2 = a^2 b^2")],
    theme: "formula",
  },
  {
    atomKey: "conics-ellipse-foci-eccentricity:formula:1",
    stem: "What is the eccentricity of an ellipse in terms of \\(c\\) and \\(a\\)?",
    distractors: [f("e = \\dfrac{a}{c}"), f("e = \\dfrac{c}{b}"), f("e = \\dfrac{c^2}{a^2}")],
    theme: "formula",
  },

  // ── conics-ellipse-focal-distances — PF₁+PF₂=2a | LR=2b²/a ──
  {
    atomKey: "conics-ellipse-focal-distances:formula:0",
    stem: "For any point \\(P\\) on an ellipse with foci \\(F_1,F_2\\) and semi-major axis \\(a\\), what is \\(PF_1+PF_2\\)?",
    distractors: [f("PF_1 + PF_2 = a"), f("PF_1 + PF_2 = 2b"), f("PF_1 \\cdot PF_2 = 2a")],
    theme: "formula",
  },
  {
    atomKey: "conics-ellipse-focal-distances:formula:1",
    stem: "What is the length of the latus rectum of the ellipse \\(\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}=1\\) (\\(a>b\\))?",
    distractors: [
      f("\\text{latus rectum} = \\dfrac{2a^2}{b}"),
      f("\\text{latus rectum} = \\dfrac{b^2}{a}"),
      f("\\text{latus rectum} = \\dfrac{2b^2}{a^2}"),
    ],
    theme: "formula",
  },

  // ── conics-ellipse-from-conditions — c=ae | b²=a²−c² | LR=2b²/a ──
  {
    atomKey: "conics-ellipse-from-conditions:formula:0",
    stem: "For an ellipse with semi-major axis \\(a\\) and eccentricity \\(e\\), how is the focal distance \\(c\\) expressed?",
    distractors: [f("c = \\dfrac{a}{e}"), f("c = a^2 e"), f("c = ae^2")],
    theme: "formula",
  },
  {
    atomKey: "conics-ellipse-from-conditions:formula:1",
    stem: "For an ellipse with \\(a>b\\) and focal distance \\(c\\), how is \\(b^2\\) recovered from \\(a\\) and \\(c\\)?",
    distractors: [f("b^2 = a^2 + c^2"), f("b^2 = c^2 - a^2"), f("b^2 = a^2 c^2")],
    theme: "formula",
  },
  {
    atomKey: "conics-ellipse-from-conditions:formula:2",
    stem: "In terms of \\(a\\) and \\(b\\) (\\(a>b\\)), what is the latus rectum of an ellipse?",
    distractors: [
      f("\\text{LR} = \\dfrac{2a^2}{b}"),
      f("\\text{LR} = \\dfrac{b^2}{2a}"),
      f("\\text{LR} = \\dfrac{2b}{a^2}"),
    ],
    theme: "formula",
  },

  // ── conics-hyperbola-standard-form — c²=a²+b² | e=c/a>1 ──
  {
    atomKey: "conics-hyperbola-standard-form:formula:0",
    stem: "For the hyperbola \\(\\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1\\), how is the focal distance \\(c\\) found?",
    distractors: [f("c^2 = a^2 - b^2"), f("c^2 = b^2 - a^2"), f("c^2 = a^2 b^2")],
    theme: "formula",
  },
  {
    atomKey: "conics-hyperbola-standard-form:formula:1",
    stem: "What is the eccentricity of a hyperbola in terms of \\(c\\) and \\(a\\)?",
    distractors: [f("e = \\dfrac{a}{c} > 1"), f("e = \\dfrac{c}{a} < 1"), f("e = \\dfrac{c}{b} > 1")],
    theme: "formula",
  },

  // ── conics-hyperbola-parametric-properties — sec²θ−tan²θ=1 ──
  {
    atomKey: "conics-hyperbola-parametric-properties:formula:0",
    stem: "Which identity eliminates \\(\\theta\\) from the parametric point \\((a\\sec\\theta, b\\tan\\theta)\\) of a hyperbola?",
    distractors: [
      f("\\tan^2\\theta - \\sec^2\\theta = 1"),
      f("\\sec^2\\theta + \\tan^2\\theta = 1"),
      f("1 - \\tan^2\\theta = \\sec^2\\theta"),
    ],
    theme: "formula",
  },
];
