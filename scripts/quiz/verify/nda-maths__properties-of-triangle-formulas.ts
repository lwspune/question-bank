/**
 * NDA Maths · Properties of Triangle · FORMULA-recall MCQs.
 * One entry per `formula.latex` piece authored into the notes _data (bundles are
 * \qquad/\quad-joined, so the key index = position in that concept's bundle,
 * 0-based). Distractors are full-equation permutations — wrong versions of the
 * SAME identity, same shape (no length/format tell). The chapter already carries
 * 18 genuine recall formulas, so no prose enrichment was needed.
 *   npm run quiz:verify nda-maths__properties-of-triangle-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── pt-triangle-notation: angle sum | semi-perimeter ──
  {
    atomKey: "pt-triangle-notation:formula:0",
    stem: "Which is the angle-sum relation for a triangle \\(ABC\\)?",
    distractors: [f("A + B + C = \\dfrac{\\pi}{2}"), f("A + B + C = 2\\pi"), f("A + B - C = \\pi")],
    theme: "formula",
  },
  {
    atomKey: "pt-triangle-notation:formula:1",
    stem: "What is the semi-perimeter \\(s\\) of a triangle with sides \\(a,b,c\\)?",
    distractors: [f("s = a+b+c"), f("s = \\dfrac{a+b+c}{3}"), f("s = \\dfrac{ab+bc+ca}{2}")],
    theme: "formula",
  },

  // ── pt-sine-rule ──
  {
    atomKey: "pt-sine-rule:formula:0",
    stem: "Which is the sine rule (with circumradius \\(R\\))?",
    distractors: [
      f("\\dfrac{\\sin A}{a} = \\dfrac{\\sin B}{b} = \\dfrac{\\sin C}{c} = 2R"),
      f("\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = R"),
      f("\\dfrac{a}{\\cos A} = \\dfrac{b}{\\cos B} = \\dfrac{c}{\\cos C} = 2R"),
    ],
    theme: "formula",
  },

  // ── pt-cosine-rule ──
  {
    atomKey: "pt-cosine-rule:formula:0",
    stem: "Which is the cosine rule for angle \\(C\\)?",
    distractors: [
      f("\\cos C = \\dfrac{a^2 + b^2 + c^2}{2ab}"),
      f("\\cos C = \\dfrac{c^2 - a^2 - b^2}{2ab}"),
      f("\\cos C = \\dfrac{a^2 + b^2 - c^2}{2bc}"),
    ],
    theme: "formula",
  },

  // ── pt-nature-of-triangle ──
  {
    atomKey: "pt-nature-of-triangle:formula:0",
    stem: "Which condition signals a RIGHT-angled triangle (largest side \\(c\\))?",
    distractors: [
      f("c^2 = a^2 + b^2 \\iff C = 90^\\circ \\iff \\cos^2 A + \\cos^2 B + \\cos^2 C = 2"),
      f("c^2 = a^2 - b^2 \\iff C = 90^\\circ \\iff \\sin^2 A + \\sin^2 B + \\sin^2 C = 1"),
      f("c^2 = a^2 + b^2 \\iff C = 60^\\circ \\iff \\cos^2 A + \\cos^2 B + \\cos^2 C = 1"),
    ],
    theme: "formula",
  },

  // ── pt-area-of-triangle ──
  {
    atomKey: "pt-area-of-triangle:formula:0",
    stem: "Which gives the area \\(\\Delta\\) of a triangle?",
    distractors: [
      f("\\Delta = \\tfrac12 ab\\cos C = \\sqrt{s(s-a)(s-b)(s-c)} = \\dfrac{abc}{4R} = rs"),
      f("\\Delta = \\tfrac12 ab\\sin C = \\sqrt{s(a-s)(b-s)(c-s)} = \\dfrac{abc}{4R} = rs"),
      f("\\Delta = \\tfrac12 ab\\sin C = \\sqrt{s(s-a)(s-b)(s-c)} = \\dfrac{4R}{abc} = \\dfrac{r}{s}"),
    ],
    theme: "formula",
  },

  // ── pt-angles-sides-relations ──
  {
    atomKey: "pt-angles-sides-relations:formula:0",
    stem: "How are the side ratios related to the angles?",
    distractors: [
      f("a : b : c = \\cos A : \\cos B : \\cos C"),
      f("a : b : c = \\dfrac{1}{\\sin A} : \\dfrac{1}{\\sin B} : \\dfrac{1}{\\sin C}"),
      f("a : b : c = \\sin^2 A : \\sin^2 B : \\sin^2 C"),
    ],
    theme: "formula",
  },

  // ── pt-sine-rule-configurations ──
  {
    atomKey: "pt-sine-rule-configurations:formula:0",
    stem: "Applying the sine rule inside \\(\\triangle ABD\\), which holds?",
    distractors: [
      f("\\dfrac{AB}{\\sin(\\angle ABD)} = \\dfrac{AD}{\\sin(\\angle ADB)}"),
      f("\\dfrac{AB}{\\sin(\\angle ADB)} = \\dfrac{BD}{\\sin(\\angle ABD)}"),
      f("\\dfrac{\\sin(\\angle ADB)}{AB} = \\dfrac{AD}{\\sin(\\angle ABD)}"),
    ],
    theme: "formula",
  },

  // ── pt-angle-sum-consequences: half-angle complement | sin(B+C)=sinA ──
  {
    atomKey: "pt-angle-sum-consequences:formula:0",
    stem: "In a triangle, what does \\(\\sin\\dfrac{B+C}{2}\\) equal?",
    distractors: [
      f("\\sin\\dfrac{B+C}{2} = \\sin\\dfrac{A}{2}"),
      f("\\sin\\dfrac{B+C}{2} = \\cos A"),
      f("\\sin\\dfrac{B+C}{2} = -\\cos\\dfrac{A}{2}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "pt-angle-sum-consequences:formula:1",
    stem: "In a triangle, what does \\(\\sin(B+C)\\) equal?",
    distractors: [f("\\sin(B+C) = -\\sin A"), f("\\sin(B+C) = \\cos A"), f("\\sin(B+C) = \\sin\\dfrac{A}{2}")],
    theme: "formula",
  },

  // ── pt-tan-cot-product-identity ──
  {
    atomKey: "pt-tan-cot-product-identity:formula:0",
    stem: "Which identity holds for the angles of a triangle?",
    distractors: [
      f("\\tan A + \\tan B + \\tan C = \\cot A\\,\\cot B\\,\\cot C"),
      f("\\tan A\\,\\tan B\\,\\tan C = \\tan A + \\tan B - \\tan C"),
      f("\\tan A + \\tan B + \\tan C = 1"),
    ],
    theme: "formula",
  },

  // ── pt-cos2-sin2-identities ──
  {
    atomKey: "pt-cos2-sin2-identities:formula:0",
    stem: "Which sum-of-squares condition signals a right-angled triangle?",
    distractors: [
      f("\\sin^2 A + \\sin^2 B + \\sin^2 C = 1 \\iff \\text{right-angled}"),
      f("\\cos^2 A + \\cos^2 B + \\cos^2 C = 2 \\iff \\text{right-angled}"),
      f("\\sin^2 A + \\sin^2 B + \\sin^2 C = 3 \\iff \\text{right-angled}"),
    ],
    theme: "formula",
  },

  // ── pt-half-angle-and-sum-product ──
  {
    atomKey: "pt-half-angle-and-sum-product:formula:0",
    stem: "Which is the half-angle tangent \\(\\tan\\dfrac{A}{2}\\) in terms of the sides?",
    distractors: [
      f("\\tan\\dfrac{A}{2} = \\dfrac{r}{s} = \\sqrt{\\dfrac{(s-b)(s-c)}{s(s-a)}}"),
      f("\\tan\\dfrac{A}{2} = \\dfrac{r}{s-a} = \\sqrt{\\dfrac{s(s-a)}{(s-b)(s-c)}}"),
      f("\\tan\\dfrac{A}{2} = \\dfrac{s-a}{r} = \\sqrt{\\dfrac{(s-b)(s-c)}{bc}}"),
    ],
    theme: "formula",
  },

  // ── pt-incircle-circumcircle: r | R | central angle ──
  {
    atomKey: "pt-incircle-circumcircle:formula:0",
    stem: "What is the inradius \\(r\\) of a triangle?",
    distractors: [f("r = \\dfrac{s}{\\Delta}"), f("r = \\dfrac{abc}{4\\Delta}"), f("r = \\dfrac{\\Delta}{2s}")],
    theme: "formula",
  },
  {
    atomKey: "pt-incircle-circumcircle:formula:1",
    stem: "What is the circumradius \\(R\\) of a triangle?",
    distractors: [f("R = \\dfrac{4\\Delta}{abc}"), f("R = \\dfrac{abc}{2\\Delta}"), f("R = \\dfrac{\\Delta}{s}")],
    theme: "formula",
  },
  {
    atomKey: "pt-incircle-circumcircle:formula:2",
    stem: "How does the central angle \\(\\angle BOC\\) relate to the inscribed angle \\(\\angle BAC\\)?",
    distractors: [
      f("\\angle BOC = \\tfrac12\\,\\angle BAC"),
      f("\\angle BOC = \\angle BAC"),
      f("\\angle BOC = \\angle BAC + 90^\\circ"),
    ],
    theme: "formula",
  },

  // ── pt-regular-polygon-geometry: inradius | interior angle ──
  {
    atomKey: "pt-regular-polygon-geometry:formula:0",
    stem: "For a regular \\(n\\)-gon of side \\(s\\), what is the inradius?",
    distractors: [
      f("r = \\dfrac{s}{2}\\tan\\dfrac{\\pi}{n}"),
      f("r = \\dfrac{s}{2}\\csc\\dfrac{\\pi}{n}"),
      f("r = s\\cot\\dfrac{\\pi}{n}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "pt-regular-polygon-geometry:formula:1",
    stem: "What is each interior angle of a regular \\(n\\)-gon?",
    distractors: [
      f("\\text{interior angle} = \\dfrac{(n-2)180^\\circ}{n-1}"),
      f("\\text{interior angle} = \\dfrac{n\\cdot180^\\circ}{n-2}"),
      f("\\text{interior angle} = \\dfrac{360^\\circ}{n}"),
    ],
    theme: "formula",
  },
];
