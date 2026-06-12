/**
 * NDA Maths · Applications of Integration · FORMULA-recall MCQs.
 * One entry per genuine `formula.latex` piece (concepts' bundles split on
 * \qquad/\quad → index = position in that concept's bundle, 0-based).
 * Distractors are full-equation permutations — wrong versions of the SAME
 * identity, same shape (no length/format tell).
 *
 * 13 genuine formulas authored; 3 pieces PARKED (left needs_review, never
 * published, harmless):
 *   aoi-integral-as-signed-area:formula:1  = "(f ≥ 0)"  — a CONDITION, not a formula
 *   aoi-parabola-latus-rectum-area:formula:0 = "y² = 4ax:" — a setup annotation
 *   aoi-step-and-piecewise-area:formula:1  = "[x] = n"   — a definition annotation
 *
 * No notes enrichment needed — this is a formula-rich chapter (13 ≫ 12 floor);
 * the genuine recall formulas (area-under-curve, area-between, segments, parabola
 * area, modulus polygons) are all already in the notes' formula.latex.
 *   npm run quiz:verify nda-maths__applications-of-integration-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── aoi-integral-as-signed-area: area under a curve above the axis ──
  {
    atomKey: "aoi-integral-as-signed-area:formula:0",
    stem: "Which gives the area under \\(y = f(x)\\) (with \\(f \\ge 0\\)) between \\(x = a\\) and \\(x = b\\)?",
    distractors: [
      f("A = \\int_a^b f'(x)\\,dx"),
      f("A = \\int_a^b x\\,f(x)\\,dx"),
      f("A = \\dfrac{1}{b-a}\\int_a^b f(x)\\,dx"),
    ],
    theme: "formula",
  },

  // ── aoi-area-under-curve: semicircle area shortcut ──
  {
    atomKey: "aoi-area-under-curve:formula:0",
    stem: "The curve \\(y = \\sqrt{r^2 - x^2}\\) is the upper semicircle of radius \\(r\\). What is the area it encloses with the x-axis?",
    distractors: [
      f("y = \\sqrt{r^2 - x^2}\\ \\Rightarrow\\ A = \\pi r^2"),
      f("y = \\sqrt{r^2 - x^2}\\ \\Rightarrow\\ A = \\tfrac{1}{4}\\pi r^2"),
      f("y = \\sqrt{r^2 - x^2}\\ \\Rightarrow\\ A = \\tfrac{1}{2}\\pi r"),
    ],
    theme: "formula",
  },

  // ── aoi-below-axis-and-symmetry: area with a sign change at c ──
  {
    atomKey: "aoi-below-axis-and-symmetry:formula:0",
    stem: "When \\(f\\) changes sign at \\(x = c\\) inside \\([a, b]\\), which gives the true (geometric) area?",
    distractors: [
      f("A = \\int_a^c f\\,dx + \\int_c^b f\\,dx"),
      f("A = \\left|\\int_a^b f\\,dx\\right|"),
      f("A = \\left|\\int_a^c f\\,dx\\right| - \\left|\\int_c^b f\\,dx\\right|"),
    ],
    theme: "formula",
  },

  // ── aoi-modulus-and-linear-regions: polygon areas ──
  {
    atomKey: "aoi-modulus-and-linear-regions:formula:0",
    stem: "What is the area of a rectangle of width \\(w\\) and height \\(h\\)?",
    distractors: [
      f("\\text{rectangle } = \\tfrac{1}{2}\\,w\\times h"),
      f("\\text{rectangle } = 2(w + h)"),
      f("\\text{rectangle } = w^2 + h^2"),
    ],
    theme: "formula",
  },
  {
    atomKey: "aoi-modulus-and-linear-regions:formula:1",
    stem: "What is the area of a triangle of base \\(b\\) and height \\(h\\)?",
    distractors: [
      f("\\text{triangle } = b\\,h"),
      f("\\text{triangle } = \\tfrac{1}{3}\\,b\\,h"),
      f("\\text{triangle } = \\tfrac{1}{2}(b + h)"),
    ],
    theme: "formula",
  },

  // ── aoi-parabola-latus-rectum-area: parabola–latus rectum area ──
  {
    atomKey: "aoi-parabola-latus-rectum-area:formula:1",
    stem: "What is the area enclosed by the parabola \\(y^2 = 4ax\\) and its latus rectum?",
    distractors: [
      f("A = 2\\int_0^{a}\\sqrt{4ax}\\,dx = \\tfrac{4}{3}a^2"),
      f("A = \\int_0^{a}\\sqrt{4ax}\\,dx = \\tfrac{8}{3}a^2"),
      f("A = 2\\int_0^{a}\\sqrt{4ax}\\,dx = \\tfrac{16}{3}a^2"),
    ],
    theme: "formula",
  },

  // ── aoi-step-and-piecewise-area: one step = one rectangle ──
  {
    atomKey: "aoi-step-and-piecewise-area:formula:0",
    stem: "For a step curve \\(y = [x]\\) holding the single value \\(n\\) across an interval, what is the area under it?",
    distractors: [
      f("A = n \\times (\\text{interval width})"),
      f("A = \\tfrac{1}{2}|n| \\times (\\text{interval width})"),
      f("A = |n| + (\\text{interval width})"),
    ],
    theme: "formula",
  },

  // ── aoi-circular-segment-area: segments of a circle ──
  {
    atomKey: "aoi-circular-segment-area:formula:0",
    stem: "How is the area of the MINOR segment of a circle cut by a chord found?",
    distractors: [
      f("A_2 = \\text{sector} + \\text{triangle}"),
      f("A_2 = \\text{triangle} - \\text{sector}"),
      f("A_2 = \\tfrac{1}{2}\\,\\text{sector}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "aoi-circular-segment-area:formula:1",
    stem: "Given the minor segment \\(A_2\\), what is the major segment \\(A_1\\)?",
    distractors: [
      f("A_1 = \\pi r^2 + A_2"),
      f("A_1 = 2\\pi r^2 - A_2"),
      f("A_1 = \\tfrac{1}{2}\\pi r^2 - A_2"),
    ],
    theme: "formula",
  },

  // ── aoi-intersection-points: intersection condition ──
  {
    atomKey: "aoi-intersection-points:formula:0",
    stem: "To find where \\(y = f(x)\\) and \\(y = g(x)\\) cross (the limits of the area integral), which condition do you solve?",
    distractors: [
      f("f(x) + g(x) = 0 \\ \\Rightarrow\\ \\text{the crossing } x\\text{-values}"),
      f("f'(x) = g'(x) \\ \\Rightarrow\\ \\text{the crossing } x\\text{-values}"),
      f("f(x)\\,g(x) = 0 \\ \\Rightarrow\\ \\text{the crossing } x\\text{-values}"),
    ],
    theme: "formula",
  },

  // ── aoi-top-minus-bottom: area between curves ──
  {
    atomKey: "aoi-top-minus-bottom:formula:0",
    stem: "What is the area between two curves on \\([a, b]\\)?",
    distractors: [
      f("A = \\int_a^b \\bigl(\\text{bottom} - \\text{top}\\bigr)\\,dx"),
      f("A = \\int_a^b \\bigl(\\text{top} + \\text{bottom}\\bigr)\\,dx"),
      f("A = \\int_a^b \\bigl(\\text{top} - \\text{bottom}\\bigr)^2\\,dx"),
    ],
    theme: "formula",
  },

  // ── aoi-curve-and-line-region: curve over a line ──
  {
    atomKey: "aoi-curve-and-line-region:formula:0",
    stem: "For a curve lying above a line on \\([a, b]\\), which integral gives the enclosed area?",
    distractors: [
      f("A = \\int_a^b \\bigl(y_{\\text{line}} - y_{\\text{curve}}\\bigr)\\,dx"),
      f("A = \\int_a^b \\bigl(y_{\\text{curve}} + y_{\\text{line}}\\bigr)\\,dx"),
      f("A = \\int_a^b y_{\\text{curve}}\\,y_{\\text{line}}\\,dx"),
    ],
    theme: "formula",
  },

  // ── aoi-composite-subtractive-regions: quarter-circle minus a curve ──
  {
    atomKey: "aoi-composite-subtractive-regions:formula:0",
    stem: "For the region inside a first-quadrant quarter-circle but above \\(y = f(x)\\), which gives its area?",
    distractors: [
      f("A = \\tfrac{1}{4}\\pi r^2 + \\int_a^b f(x)\\,dx"),
      f("A = \\tfrac{1}{2}\\pi r^2 - \\int_a^b f(x)\\,dx"),
      f("A = \\int_a^b f(x)\\,dx - \\tfrac{1}{4}\\pi r^2"),
    ],
    theme: "formula",
  },
];
